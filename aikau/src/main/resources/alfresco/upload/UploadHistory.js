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
 * @module alfresco/upload/UploadHistory
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 * @since 1.0.34
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/UploadHistory.html",
        "alfresco/core/ObjectProcessingMixin",
        "alfresco/core/CoreWidgetProcessing",
        "alfresco/core/Core",
        "alfresco/core/topics",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/dom-construct"], 
        function(declare, _WidgetBase, _TemplatedMixin, template, ObjectProcessingMixin, CoreWidgetProcessing, Core, topics,
                 lang, array, domConstruct) {

   return declare([_WidgetBase, _TemplatedMixin, ObjectProcessingMixin, CoreWidgetProcessing, Core], {

      /**
       * An array of the i18n files to use with this widget.
       *
       * @instance
       * @type {object[]}
       * @default [{i18nFile: "./i18n/UploadHistory.properties"}]
       */
      i18nRequirements: [{i18nFile: "./i18n/UploadHistory.properties"}],

      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/UploadHistory.css"}]
       */
      cssRequirements: [{cssFile:"./css/UploadHistory.css"}],
         
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,

      /**
       * The preference name to use for storing and retrieving upload location history.
       * In order for this preference to be used it will also be necessary to ensure that the 
       * [PreferenceService]{@link module:alfresco/services/PreferenceService} is included on the page.
       * 
       * @instance
       * @type {string}
       * @default
       */
      preferenceName: "org.alfresco.share.upload.destination.history",

      /**
       * 
       * @instance
       * @param {string} nodeRef The nodeRef to create the upload target for
       * @param {number} index The index of the node
       */
      createUploadTarget: function alfresco_upload_UploadHistory__createUploadTarget(nodeRef, index) {
         this.currentItem = {
            nodeRef: nodeRef,
            index: index
         };
         var widgetModel = lang.clone(this.widgetsForUploadTargets);
         var targetNode = domConstruct.create("div", {
            className: "alfresco-upload-UploadHistory__target"
         }, this.domNode);
         this.processObject(["processCurrentItemTokens"], widgetModel);
         this.processWidgets(widgetModel, targetNode);
      },

      /**
       * 
       * @instance
       * @param {string} value The preference value containing the nodeRefs to create upload targets for
       */
      createUploadTargets: function alfresco_upload_UploadHistory__createUploadTargets(value) {
         if (value)
         {
            this.uploadDestinationHistory = value.split(",");
            array.forEach(this.uploadDestinationHistory, lang.hitch(this, this.createUploadTarget));
         }
      },

      /**
       * 
       * 
       * @instance
       */
      postCreate: function alfresco_upload_UploadHistory__postCreate() {
         this.alfPublish(topics.GET_PREFERENCE, {
            preference: this.preferenceName,
            callback: this.createUploadTargets,
            callbackScope: this
         }, true);
      },

      /**
       * 
       * @instance
       * @type {Array}
       */
      widgetsForUploadTargets: [
         {
            name: "alfresco/upload/UploadFolder",
            config: {
               pubSubScope: "NODE_HISTORY_{index}",
               nodeRef: "{nodeRef}",
               xhrRequired: true,
               widgets: [
                  {
                     name: "alfresco/layout/HorizontalWidgets",
                     config: {
                        widgets: [
                           {
                              name: "alfresco/renderers/Thumbnail",
                              widthPx: 80
                           },
                           {
                              name: "alfresco/layout/VerticalWidgets",
                              config: {
                                 widgets: [
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "node.properties.cm:name",
                                          renderSize: "large",
                                          renderOnNewLine: true
                                       }
                                    },
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "node.properties.cm:description",
                                          renderOnNewLine: true
                                       }
                                    },
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "location.site.title",
                                          label: "upload.history.site.prefix",
                                          renderOnNewLine: true,
                                          renderFilter: [
                                             {
                                                property: "location.site",
                                                values: [null],
                                                renderOnAbsentProperty: true,
                                                negate: true
                                             }
                                          ]
                                       }
                                    },
                                    {
                                       name: "alfresco/renderers/Property",
                                       config: {
                                          propertyToRender: "location.path",
                                          renderOnNewLine: true,
                                          label: "upload.history.path.prefix"
                                       }
                                    }
                                 ]
                              }
                           }
                        ]
                     }
                  }
               ]
            }
         }
      ]
   });
});