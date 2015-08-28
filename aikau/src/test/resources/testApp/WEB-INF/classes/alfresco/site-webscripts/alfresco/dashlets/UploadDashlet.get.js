/*jshint maxlen:false*/

   
var data = [{
   "node": {
      "isLink": false,
      "aspects": ["cm:auditable", "sys:referenceable", "cm:titled", "sys:localized"],
      "permissions": {
         "roles": ["ALLOWED;GROUP_EVERYONE;Consumer;INHERITED"],
         "inherited": true,
         "user": {
            "ChangePermissions": true,
            "CancelCheckOut": false,
            "CreateChildren": true,
            "Write": true,
            "Delete": true,
            "Unlock": false
         }
      },
      "nodeRef": "workspace:\/\/SpacesStore\/e44ff6c0-7e10-44f8-9ac3-bfcffe393539",
      "properties": {
         "cm:modified": {
            "value": "Fri Aug 28 13:39:40 BST 2015",
            "iso8601": "2015-08-28T12:39:40.789Z"
         },
         "sys:node-dbid": null,
         "cm:description": "Somewhere else altogether",
         "cm:creator": {
            "lastName": "",
            "userName": "admin",
            "displayName": "Administrator",
            "firstName": "Administrator"
         },
         "sys:node-uuid": null,
         "cm:created": {
            "value": "Fri Aug 28 13:39:40 BST 2015",
            "iso8601": "2015-08-28T12:39:40.789Z"
         },
         "cm:name": "Location 3",
         "cm:title": "",
         "sys:store-protocol": null,
         "sys:locale": null,
         "cm:modifier": {
            "lastName": "",
            "userName": "admin",
            "displayName": "Administrator",
            "firstName": "Administrator"
         },
         "sys:store-identifier": null
      },
      "type": "cm:folder",
      "isContainer": true,
      "isLocked": false
   },

   "version": "1.0",
   "webdavUrl": "\/webdav\/Folder1\/Location%203",

   "isFavourite": false,

   "likes": {
      "isLiked": false,
      "totalLikes": 0
   },
   "location": {
      "repositoryId": "1df45b73-b268-43a6-82f0-9f475a057acf",
      "path": "\/Folder1",
      "repoPath": "\/Folder1",
      "file": "Location 3",
      "parent": {}
   }
}, {
   "node": {
      "isLink": false,
      "aspects": ["cm:auditable", "sys:referenceable", "cm:titled", "sys:localized"],
      "permissions": {
         "roles": ["ALLOWED;GROUP_EVERYONE;Consumer;INHERITED"],
         "inherited": true,
         "user": {
            "ChangePermissions": true,
            "CancelCheckOut": false,
            "CreateChildren": true,
            "Write": true,
            "Delete": true,
            "Unlock": false
         }
      },
      "nodeRef": "workspace:\/\/SpacesStore\/1e6ed872-f830-4414-9985-b6e64d3a43a1",
      "properties": {
         "cm:modified": {
            "value": "Fri Aug 28 13:39:25 BST 2015",
            "iso8601": "2015-08-28T12:39:25.568Z"
         },
         "sys:node-dbid": null,
         "cm:description": "Some place else",
         "cm:creator": {
            "lastName": "",
            "userName": "admin",
            "displayName": "Administrator",
            "firstName": "Administrator"
         },
         "sys:node-uuid": null,
         "cm:created": {
            "value": "Fri Aug 28 13:39:25 BST 2015",
            "iso8601": "2015-08-28T12:39:25.568Z"
         },
         "cm:name": "Location 2",
         "cm:title": "",
         "sys:store-protocol": null,
         "sys:locale": null,
         "cm:modifier": {
            "lastName": "",
            "userName": "admin",
            "displayName": "Administrator",
            "firstName": "Administrator"
         },
         "sys:store-identifier": null
      },
      "type": "cm:folder",
      "isContainer": true,
      "isLocked": false
   },

   "version": "1.0",
   "webdavUrl": "\/webdav\/Folder1\/Location%202",

   "isFavourite": false,

   "likes": {
      "isLiked": false,
      "totalLikes": 0
   },
   "location": {
      "repositoryId": "1df45b73-b268-43a6-82f0-9f475a057acf",
      "path": "\/Folder1",
      "repoPath": "\/Folder1",
      "file": "Location 2",
      "parent": {}
   }
}, {
   "node": {
      "isLink": false,
      "aspects": ["cm:auditable", "sys:referenceable", "cm:titled", "sys:localized"],
      "permissions": {
         "roles": ["ALLOWED;GROUP_EVERYONE;Consumer;INHERITED"],
         "inherited": true,
         "user": {
            "ChangePermissions": true,
            "CancelCheckOut": false,
            "CreateChildren": true,
            "Write": true,
            "Delete": true,
            "Unlock": false
         }
      },
      "nodeRef": "workspace:\/\/SpacesStore\/42d14b1b-2805-4ee3-9204-477075db975b",
      "properties": {
         "cm:modified": {
            "value": "Fri Aug 28 13:39:16 BST 2015",
            "iso8601": "2015-08-28T12:39:16.567Z"
         },
         "sys:node-dbid": null,
         "cm:description": "Some place",
         "cm:creator": {
            "lastName": "",
            "userName": "admin",
            "displayName": "Administrator",
            "firstName": "Administrator"
         },
         "sys:node-uuid": null,
         "cm:created": {
            "value": "Fri Aug 28 13:39:16 BST 2015",
            "iso8601": "2015-08-28T12:39:16.567Z"
         },
         "cm:name": "Location 1",
         "cm:title": "",
         "sys:store-protocol": null,
         "sys:locale": null,
         "cm:modifier": {
            "lastName": "",
            "userName": "admin",
            "displayName": "Administrator",
            "firstName": "Administrator"
         },
         "sys:store-identifier": null
      },
      "type": "cm:folder",
      "isContainer": true,
      "isLocked": false
   },

   "version": "1.0",
   "webdavUrl": "\/webdav\/Folder1\/Location%201",

   "isFavourite": false,

   "likes": {
      "isLiked": false,
      "totalLikes": 0
   },
   "location": {
      "repositoryId": "1df45b73-b268-43a6-82f0-9f475a057acf",
      "path": "\/Folder1",
      "repoPath": "\/Folder1",
      "file": "Location 1",
      "parent": {}
   }
}];

model.jsonModel = {
   services: [
      {
         name: "alfresco/services/LoggingService",
         config: {
            loggingPreferences: {
               enabled: true,
               all: true
            }
         }
      },
      "alfresco/services/DashletService",
      "alfresco/services/UploadService",
      "alfresco/services/ContentService",
      "alfresco/services/DialogService"
   ],
   widgets: [
      {
         name: "alfresco/dashlets/Dashlet",
         id: "UPLOAD_DASHLET",
         config: {
            additionalCssClasses: "smallpad",
            pubSubScope: "UPLOAD_",
            title: "Upload",
            bodyHeight: 500,
            widgetsForTitleBarActions: [],
            widgetsForToolbar: [],
            widgetsForToolbar2: [],
            widgetsForBody: [
               {
                  name: "alfresco/layout/HorizontalWidgets",
                  config: {
                     widgets: [
                        {
                           name: "alfresco/upload/UploadTarget",
                           config: {
                              
                           }
                        }
                        // ,

                        // {
                        //    name: "alfresco/lists/AlfList",
                        //    config: {
                        //       currentData: {
                        //          items: data
                        //       },
                        //       widgets: [
                        //          {
                        //             name: "alfresco/lists/views/AlfListView",
                        //             config: {
                        //                widgets: [
                        //                   {
                        //                      name: "alfresco/upload/UploadLocation"
                        //                   }
                        //                ]
                        //             }
                        //          }
                        //       ]
                        //    }
                        // } 
                     ]
                  }
               }
            ]
         }
      },
      {
         name: "aikauTesting/mockservices/DashletServiceMockXhr"
      },
      {
         name: "aikauTesting/mockservices/UploadMockXhr"
      },
      {
         name: "alfresco/logging/DebugLog"
      }
   ]
};