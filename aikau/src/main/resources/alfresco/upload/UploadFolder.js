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
 * @module alfresco/upload/UploadFolder
 * @extends alfresco/documentlibrary/AlfDocument
 * @author Dave Draper
 * @since 1.0.34
 */
define(["dojo/_base/declare",
        "alfresco/documentlibrary/AlfDocument",
        "alfresco/documentlibrary/_AlfDndDocumentUploadMixin",
        "alfresco/node/NodeDropTargetMixin",
        "dojo/dom-class"], 
        function(declare, AlfDocument, _AlfDndDocumentUploadMixin, NodeDropTargetMixin, domClass) {

   return declare([AlfDocument, _AlfDndDocumentUploadMixin, NodeDropTargetMixin], {

       /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/UploadFolder.css"}]
       */
      cssRequirements: [{cssFile:"./css/UploadFolder.css"}],
         
      /**
       * @instance
       */
      getUploadConfig: function alfresco_upload_UploadFolder__getUploadConfig() {
         return {
            destination: this.nodeRef
         };
      },

      /**
       * 
       * 
       * @instance
       */
      postCreate: function alfresco_upload_UploadFolder__postCreate() {
         this.inherited(arguments);
         domClass.add(this.domNode, "alfresco-upload-UploadFolder");
         this.addUploadDragAndDrop(this.domNode);
         this.addNodeDropTarget(this.domNode);
         
         // NOTE: A _currentNode needs to be set in order to avoid exceptions
         this._currentNode = {
            nodeRef: this.nodeRef
         };
      }
   });
});