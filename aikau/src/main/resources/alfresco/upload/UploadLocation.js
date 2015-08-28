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
 * @module alfresco/upload/UploadLocation
 * @extends external:dijit/_WidgetBase
 * @mixes external:dojo/_TemplatedMixin
 * @mixes module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin
 * @mixes module:alfresco/lists/views/layouts/_MultiItemRendererMixin
 * @mixes module:alfresco/lists/views/layouts/_LayoutMixin
 * @mixes module:alfresco/node/NodeDropTargetMixin
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 * @since 1.0.??
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/UploadLocation.html",
        "alfresco/documentlibrary/_AlfDndDocumentUploadMixin",
        "alfresco/lists/views/layouts/_MultiItemRendererMixin",
        "alfresco/lists/views/layouts/_LayoutMixin",
        "alfresco/node/NodeDropTargetMixin",
        "alfresco/core/CoreWidgetProcessing",
        "alfresco/core/Core",
        "alfresco/renderers/PropertyLink",
        "alfresco/renderers/Property",
        "alfresco/renderers/Thumbnail",
        "dojo/_base/lang",
        "dojo/on"], 
        function(declare, _Widget, _Templated, template, _AlfDndDocumentUploadMixin, _MultiItemRendererMixin, _LayoutMixin, 
                 NodeDropTargetMixin, CoreWidgetProcessing, Core, PropertyLink, Property, Thumbnail, lang, on) {
   
   return declare([_Widget, _Templated, _AlfDndDocumentUploadMixin, _MultiItemRendererMixin, _LayoutMixin, 
                   NodeDropTargetMixin, CoreWidgetProcessing, Core], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/UploadLocation.css"}]
       */
      cssRequirements: [{cssFile:"./css/UploadLocation.css"}],
         
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {string}
       */
      templateString: template,
      
      /**
       * 
       * 
       * @instance
       */
      postCreate: function alfresco_upload_UploadLocation__postCreate() {
         if (this.hasUploadPermissions() === true)
         {
            this.addUploadDragAndDrop(this.domNode);
            this.addNodeDropTarget(this.domNode);
            this._currentNode = this.currentItem.node;
         }
         this.createWidget({
            name: "alfresco/renderers/Thumbnail",
            config: {}
         }).placeAt(this.thumbnailNode);
         this.createWidget({
            name: "alfresco/renderers/PropertyLink",
            config: {
               propertyToRender: "node.properties.cm:name"
            }
         }).placeAt(this.nameNode);
         this.createWidget({
            name: "alfresco/renderers/Property",
            config: {
               propertyToRender: "node.properties.cm:description"}
         }).placeAt(this.descriptionNode);
      },

      /**
       * Focuses the domNode. This has been added to support the dijit/_KeyNavContainer functions mixed into 
       * the [document library views]{@link module:alfresco/lists/views/AlfListView} to 
       * allow easier keyboard navigation.
       * 
       * @instance
       */
      focus: function alfresco_upload_UploadLocation__focus() {
         this.domNode.focus();
      }
   });
});