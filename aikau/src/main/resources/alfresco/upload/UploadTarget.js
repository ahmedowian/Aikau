/**
 * Copyright (C) 2005-2015 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @module alfresco/upload/UploadTarget
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/UploadTarget.html",
        "alfresco/documentlibrary/_AlfDndDocumentUploadMixin",
        "alfresco/node/NodeDropTargetMixin",
        "alfresco/core/CoreWidgetProcessing",
        "alfresco/core/ObjectProcessingMixin",
        "alfresco/services/_PreferenceServiceTopicMixin",
        "alfresco/core/Core",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/dom-construct"], 
        function(declare, _WidgetBase, _TemplatedMixin, template, _AlfDndDocumentUploadMixin, NodeDropTargetMixin,
                 CoreWidgetProcessing, ObjectProcessingMixin, _PreferenceServiceTopicMixin, Core, lang, array, domConstruct) {

   return declare([_WidgetBase, _TemplatedMixin, _AlfDndDocumentUploadMixin, _PreferenceServiceTopicMixin, 
                   NodeDropTargetMixin, ObjectProcessingMixin, CoreWidgetProcessing, Core], {

       /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/UploadTarget.css"}]
       */
      cssRequirements: [{cssFile:"./css/UploadTarget.css"}],
         
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,

      createUploadHistoryTarget: function alfresco_upload_UploadTarget__createUploadHistoryTarget(nodeRef, index) {
         this.currentItem = {
            nodeRef: nodeRef,
            index: index
         };
         var widgetModel = lang.clone(this.widgetsForUploadHistoryTargets);
         var targetNode = domConstruct.create("div", {
            className: "alfresco-upload-UploadTarget__historicalTarget"
         }, this.historyNode);
         this.processObject(["processCurrentItemTokens"], widgetModel);
         this.processWidgets(widgetModel, targetNode);

      },

      createUploadHistoryTargets: function alfresco_upload_UploadTarget__createUploadHistoryTargets(value) {
         if (value)
         {
            this.uploadDestinationHistory = value.split(",");
            array.forEach(this.uploadDestinationHistory, lang.hitch(this, this.createUploadHistoryTarget));
         }
      },

      /**
       * Override the [inherited function]{@link module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin#getUploadConfig}
       * to return a configuration object that indicates an overwrite action is required. This will cause the 
       * [onDndUploadDrop]{@link module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin#onDndUploadDrop} function 
       * to call [publishUpdateRequest]{@link module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin#publishUpdateRequest}.
       * 
       * @instance
       */
      getUploadConfig: function alfresco_upload_UploadTarget__getUploadConfig() {
         return {
            overwrite: true
         };
      },

      /**
       * [publishUpdateRequest description]
       * @param  {[type]} uploadConfig [description]
       * @param  {[type]} files        [description]
       * @return {[type]}              [description]
       */
      publishUpdateRequest: function alfresco_documentlibrary__AlfDndDocumentUploadMixin__publishUpdateRequest(uploadConfig, files) {
         // Set up a response topic for receiving notifications that the upload has completed...
         var responseTopic = this.generateUuid();
         this._uploadSubHandle = this.alfSubscribe(responseTopic, lang.hitch(this, this.onFileUploadComplete), true);

         // To avoid the issue with processing payloads containing files with native
         // code in them, it is necessary to temporarily store the files in the data model...
         var filesRef = this.generateUuid();
         this.alfSetData(filesRef, files);

         this.alfPublish("ALF_CREATE_FORM_DIALOG_REQUEST", {
            dialogId: "ALF_UPLOAD_TARGET_DIALOG",
            dialogTitle: "File Upload",
            dialogConfirmationButtonTitle: "Upload",
            dialogCancellationButtonTitle: "Cancel",
            formSubmissionTopic: "ALF_UPLOAD_REQUEST",
            formSubmissionPayloadMixin: {
               alfResponseTopic: responseTopic,
               filesRefs: filesRef,
               targetData: uploadConfig
            },
            fixedWidth: true,
            widgets: lang.clone(this.widgetsForLocationSelection)
         }, true);
      },

      /**
       * 
       * 
       * @instance
       */
      postCreate: function alfresco_upload_UploadTarget__postCreate() {
         this.inherited(arguments);
         this.addUploadDragAndDrop(this.domNode);
         this.addNodeDropTarget(this.domNode);
         
         // NOTE: A _currentNode needs to be set in order to avoid exceptions
         this._currentNode = {
            nodeRef: null
         };

         this.alfPublish(this.getPreferenceTopic, {
            preference: "org.alfresco.share.upload.destination.history",
            callback: this.createUploadHistoryTargets,
            callbackScope: this
         }, true);
      },

      widgetsForLocationSelection: [
         {
            name: "alfresco/forms/controls/ContainerPicker",
            config: {
               id: "FOLDER_PICKER",
               label: "Upload to",
               description: "Select a folder to upload to",
               name: "targetData.destination"
            }
         }
      ],

      widgetsForUploadHistoryTargets: [
         {
            name: "alfresco/documentlibrary/AlfDocument",
            config: {
               pubSubScope: "NODE_HISTORY_{index}",
               nodeRef: "{nodeRef}",
               xhrRequired: true,
               widgets: [
                  {
                     name: "alfresco/renderers/Thumbnail"
                  },
                  {
                     name: "alfresco/renderers/Property",
                     config: {
                        propertyToRender: "node.properties.cm:name",
                        renderSize: "large"
                     }
                  },
                  {
                     name: "alfresco/renderers/Property",
                     config: {
                        propertyToRender: "node.properties.cm:description"
                     }
                  }
               ]
            }
         }
      ]
   });
});