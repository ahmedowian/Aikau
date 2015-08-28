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
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/UploadHistory.html",
        "alfresco/documentlibrary/_AlfDndDocumentUploadMixin",
        "alfresco/core/Core",
        "dojo/_base/lang",
        "dojo/on"], 
        function(declare, _WidgetBase, _TemplatedMixin, template, _AlfDndDocumentUploadMixin, Core, lang, on) {

   return declare([_WidgetBase, _TemplatedMixin, _AlfDndDocumentUploadMixin, Core], {

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

      nodeRef: null,

      /**
       * @instance
       */
      getUploadConfig: function alfresco_upload_UploadTarget__getUploadConfig() {
         return {
            destination: this.nodeRef
         };
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
            nodeRef: this.nodeRef
         };
      }
   });
});