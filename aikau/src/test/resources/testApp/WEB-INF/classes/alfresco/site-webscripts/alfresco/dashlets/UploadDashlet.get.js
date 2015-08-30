/*jshint maxlen:false*/

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
      "alfresco/services/DialogService",
      "aikauTesting/mockservices/UploadHistoryMockService"
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
                        },
                        {
                           name: "alfresco/upload/UploadHistory",
                           config: {
                              
                           }
                        }
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