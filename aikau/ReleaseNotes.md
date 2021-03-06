Aikau 1.0.33 Release Notes
===

New deprecations: 
---
None

Previous deprecations:
---
* alfresco/buttons/AlfFormDialogButton.js                        (use alfresco/services/DialogService)
* alfresco/core/NotificationUtils.js                             (use alfresco/services/NotificationService)
* alfresco/core/UrlUtils.js                                      (use alfresco/util/urlUtils or alfresco/core/UrlUtilsMixin)
* alfresco/dialogs/_AlfCreateFormDialogMixin.js                  (use alfresco/services/DialogService)
* alfresco/documentlibrary/AlfDocumentListInfiniteScroll.js      (use: alfresco/services/InfiniteScrollService)
* alfresco/documentlibrary/AlfDocumentListPaginator              (use: alfresco/lists/Paginator)
* alfresco/documentlibrary/AlfResultsPerPageGroup                (use: alfresco/lists/ResultsPerPageGroup)
* alfresco/documentlibrary/views/AlfDocumentListView             (use: alfresco/lists/views/AlfListView)
* alfresco/documentlibrary/views/DocumentListRenderer            (use: alfresco/lists/views/ListRenderer)
* alfresco/documentlibrary/views/_AlfAdditionalViewControlMixin  (use: alfresco/lists/views/_AlfAdditionalViewControlMixin)
* alfresco/documentlibrary/views/layouts/Carousel                (use: alfresco/lists/views/layouts/Carousel)
* alfresco/documentlibrary/views/layouts/Cell                    (use: alfresco/lists/views/layouts/Cell)
* alfresco/documentlibrary/views/layouts/Column                  (use: alfresco/lists/views/layouts/Column)
* alfresco/documentlibrary/views/layouts/Grid                    (use: alfresco/lists/views/layouts/Grid)
* alfresco/documentlibrary/views/layouts/HeaderCell              (use: alfresco/lists/views/layouts/HeaderCell)
* alfresco/documentlibrary/views/layouts/Popup                   (use: alfresco/lists/views/layouts/Popup)
* alfresco/documentlibrary/views/layouts/Row                     (use: alfresco/lists/views/layouts/Row)
* alfresco/documentlibrary/views/layouts/Table                   (use: alfresco/lists/views/layouts/Table)
* alfresco/documentlibrary/views/layouts/XhrLayout               (use: alfresco/lists/views/layouts/XhrLayout)
* alfresco/documentlibrary/views/layouts/_MultiItemRendererMixin (use: alfresco/lists/views/layouts/_MultiItemRendererMixin)
* alfresco/documentlibrary/AlfSearchList                         (use: alfresco/search/AlfSearchList)
* alfresco/documentlibrary/views/AlfSearchListView               (use: alfresco/search/AlfSearchListView)
* alfresco/renderers/SearchResultPropertyLink                    (use: alfresco/search/SearchResultPropertyLink)
* alfresco/renderers/SearchThumbnail                             (use: alfresco/search/SearchThumbnail)
* alfresco/upload/AlfUpload                                      (use: alfresco/services/UploadService)
* alfresco/dialogs/AlfDialogService                              (use: alfresco/services/Dialog) 
* alfresco/forms/controls/DojoValidationTextBox                  (use: alfresco/forms/controls/TextBox)
* alfresco/forms/controls/DojoCheckBox                           (use: alfresco/forms/controls/CheckBox)
* alfresco/forms/controls/DojoDateTextBox                        (use: alfresco/forms/controls/DateTextBox)
* alfresco/forms/controls/DojoRadioButtons                       (use: alfresco/forms/controls/RadioButtons)
* alfresco/forms/controls/DojoSelect                             (use: alfresco/forms/controls/Select)
* alfresco/forms/controls/DojoTextarea                           (use: alfresco/forms/controls/TextArea)

Resolved issues:
---
1.0.33:
* [AKU-478](https://issues.alfresco.com/jira/browse/AKU-478)       - Dynamic visibility width calculations in HorizontalWidgets
* [AKU-516](https://issues.alfresco.com/jira/browse/AKU-516)       - Reduce options calls to server from MultiSelectInput
* [AKU-518](https://issues.alfresco.com/jira/browse/AKU-518)       - Add default primary button to certain dialogs
* [AKU-532](https://issues.alfresco.com/jira/browse/AKU-532)       - Multi-select download as zip in search support
* [AKU-534](https://issues.alfresco.com/jira/browse/AKU-534)       - Changed default search style in FilteringSelect
* [AKU-536](https://issues.alfresco.com/jira/browse/AKU-536)       - Remove encoding from AlfShareFooter
* [AKU-537](https://issues.alfresco.com/jira/browse/AKU-537)       - Take AlfGalleryViewSlider columns configuration from AlfGalleryView
* [AKU-539](https://issues.alfresco.com/jira/browse/AKU-539)       - Fix SingleTextFieldForm layout (also in 1.0.32.1)
* [AKU-540](https://issues.alfresco.com/jira/browse/AKU-540)       - Fix default InlinedEditProperty permissions (also in 1.0.31.1 and 1.0.32.2)
* [AKU-542](https://issues.alfresco.com/jira/browse/AKU-542)       - Remove animation from dialog fade in/out (now configurable)
* [AKU-549](https://issues.alfresco.com/jira/browse/AKU-549)       - Remove default facets from SearchService

1.0.32:
* [AKU-460](https://issues.alfresco.com/jira/browse/AKU-460)       - Improved handling of hidden terms in alfresco/headers/SearchBox
* [AKU-515](https://issues.alfresco.com/jira/browse/AKU-515)       - Fixed pubSubScope handling in alfresco/renderers/Thumbnail
* [AKU-521](https://issues.alfresco.com/jira/browse/AKU-521)       - Improved change event handling in alfresco/forms/controls/DateTextBox
* [AKU-523](https://issues.alfresco.com/jira/browse/AKU-523)       - Added support for dynamic warning configuration in forms
* [AKU-526](https://issues.alfresco.com/jira/browse/AKU-526)       - Updated alfresco/documentlibrary/views/AlfFilmStripView to support infinite scrolling mode
* [AKU-528](https://issues.alfresco.com/jira/browse/AKU-528)       - LESS support for global link colour and decoration
* [AKU-529](https://issues.alfresco.com/jira/browse/AKU-529)       - Fixed alfresco/layout/FixedHeaderFooter resizing issue
* [AKU-531](https://issues.alfresco.com/jira/browse/AKU-531)       - Created service registry to prevent duplicate service subscriptions

1.0.31:
* [AKU-290](https://issues.alfresco.com/jira/browse/AKU-290)       - Added configurable support for alfresco/lists/Paginator to hide when list data is requested
* [AKU-483](https://issues.alfresco.com/jira/browse/AKU-483)       - Update alfresco/layout/FixedHeaderFooter to assume numeric height is intended to be pixels
* [AKU-492](https://issues.alfresco.com/jira/browse/AKU-492)       - Improved undefined variable handling by widgets used by doclib.lib.js
* [AKU-494](https://issues.alfresco.com/jira/browse/AKU-494)       - Updated alfresco/navigation/PathTree to support useHash configuration
* [AKU-498](https://issues.alfresco.com/jira/browse/AKU-498)       - Added support to enable list item focus highlighting
* [AKU-499](https://issues.alfresco.com/jira/browse/AKU-499)       - Correction of search icon placement in alfresco/header/SearchBox
* [AKU-502](https://issues.alfresco.com/jira/browse/AKU-502)       - Improved alt text for alfresco/renderers/InlineEditProperty with missing propertyToRender
* [AKU-503](https://issues.alfresco.com/jira/browse/AKU-503)       - Updated default views and alfresco/renderers/MoreInfo to have a consistent approach to inline editing title and description
* [AKU-504](https://issues.alfresco.com/jira/browse/AKU-504)       - Ensure cross-browser tag creation via keyboard in alfresco/renderers/Tags
* [AKU-505](https://issues.alfresco.com/jira/browse/AKU-505)       - Ensure browser back button re-applies filters for alfresco/lists/AlfFilteredList
* [AKU-506](https://issues.alfresco.com/jira/browse/AKU-506)       - Improved resizing behaviour in alfresco/layout/AlfSideBarContainer, alfresco/layout/AlfTabContainer and alfresco/layout/FixedHeaderFooter
* [AKU-507](https://issues.alfresco.com/jira/browse/AKU-507)       - Resolved alfresco/lists/AlfFilteredList regressions
* [AKU-508](https://issues.alfresco.com/jira/browse/AKU-508)       - Ensure that lists don't reload when dialogs are displayed
* [AKU-509](https://issues.alfresco.com/jira/browse/AKU-509)       - Ensure alfresco/renderers/AvatarThumbnail uses correct URL for user names containing %
* [AKU-510](https://issues.alfresco.com/jira/browse/AKU-510)       - Ensure alfresco/accessibility/AccessibilityMenu focues on items accessed via skip links
* [AKU-514](https://issues.alfresco.com/jira/browse/AKU-514)       - Updates to alfresco/layout/AlfSideBarContainer layout to prevent resizer overlapping content
* [AKU-520](https://issues.alfresco.com/jira/browse/AKU-520)       - Accessibilitt contrast correction on button colours
* [AKU-522](https://issues.alfresco.com/jira/browse/AKU-522)       - Added configuration option to prevent lists automatically requesting data when created
* [AKU-527](https://issues.alfresco.com/jira/browse/AKU-527)       - Update to make alfresco/services/SearchService APIs configurable

1.0.30:
* [AKU-452](https://issues.alfresco.com/jira/browse/AKU-452)       - Button re-styling and LESS updates
* [AKU-472](https://issues.alfresco.com/jira/browse/AKU-472)       - Support search without URL hashing
* [AKU-475](https://issues.alfresco.com/jira/browse/AKU-475)       - AlfCheckableMenuItem hashName fix
* [AKU-476](https://issues.alfresco.com/jira/browse/AKU-476)       - Improved local storage fallbacks in lists
* [AKU-477](https://issues.alfresco.com/jira/browse/AKU-477)       - Publish ALF_PAGE_WIGETS_READY when dynamically creating widgets
* [AKU-488](https://issues.alfresco.com/jira/browse/AKU-488)       - Ensure AlfSearchList honours selectedScope configuration
* [AKU-489](https://issues.alfresco.com/jira/browse/AKU-489)       - Improved initial height calculations for AlfSideBarContainer and AlfTabContainer
* [AKU-490](https://issues.alfresco.com/jira/browse/AKU-490)       - Ensure pending form validation errors are cleared on valid data entry
* [AKU-491](https://issues.alfresco.com/jira/browse/AKU-491)       - Ensure NumberSpinner can accept empty value
* [AKU-493](https://issues.alfresco.com/jira/browse/AKU-493)       - Prevent duplicates in MultiSelectInput
* [AKU-495](https://issues.alfresco.com/jira/browse/AKU-495)       - Fixed filter display in AlfBreadcrumbTrail
* [AKU-496](https://issues.alfresco.com/jira/browse/AKU-496)       - All documents filter message update
* [AKU-497](https://issues.alfresco.com/jira/browse/AKU-497)       - Fixed list paging with hash enabled
* [AKU-500](https://issues.alfresco.com/jira/browse/AKU-500)       - Fixed alfResponseScope issues with global scope logic processing

1.0.29:
* [AKU-405](https://issues.alfresco.com/jira/browse/AKU-405)       - Added alfresco/forms/TabbedControls
* [AKU-421](https://issues.alfresco.com/jira/browse/AKU-421)       - Updates to alfresco/renderers/InlineEditPropertyLink publications
* [AKU-422](https://issues.alfresco.com/jira/browse/AKU-422)       - Fixed alfresco/documentlibrary/AlfBreadcrumbTrail scoping issues
* [AKU-424](https://issues.alfresco.com/jira/browse/AKU-428)       - Ensure gallery views render correct column count initially
* [AKU-447](https://issues.alfresco.com/jira/browse/AKU-447)       - Updates to action handling to support multiple scoped Document Library instances
* [AKU-448](https://issues.alfresco.com/jira/browse/AKU-448)       - Long dialog layout tweaks
* [AKU-449](https://issues.alfresco.com/jira/browse/AKU-449)       - Updated ESC key handling for dialogs
* [AKU-450](https://issues.alfresco.com/jira/browse/AKU-450)       - Updated alfresco/search/AlfSearchResult to make it more configurable/extendable
* [AKU-453](https://issues.alfresco.com/jira/browse/AKU-453)       - Encode search result folder name characters for navigation purposes
* [AKU-455](https://issues.alfresco.com/jira/browse/AKU-455)       - Hide Dojo error display in alfresco/forms/controls/NumberSpinner
* [AKU-456](https://issues.alfresco.com/jira/browse/AKU-456)       - Allow menu bar popups to open on hover
* [AKU-457](https://issues.alfresco.com/jira/browse/AKU-457)       - Decimal place support in alfresco/forms/controls/NumberSpinner
* [AKU-458](https://issues.alfresco.com/jira/browse/AKU-458)       - Support read only mode for alfresco/forms/controls/MultiSelectInput
* [AKU-466](https://issues.alfresco.com/jira/browse/AKU-466)       - Ensure alfresco/layout/AlfTabContainer will render in dialogs
* [AKU-479](https://issues.alfresco.com/jira/browse/AKU-479)       - Support accented characters in facet filters
* [AKU-480](https://issues.alfresco.com/jira/browse/AKU-480)       - Further updates to alfresco/renderers/InlineEditPropertyLink publications
* [AKU-487](https://issues.alfresco.com/jira/browse/AKU-487)       - Further alfresco/documentlibrary/AlfBreadcrumbTrail updates
* [AKU-462](https://issues.alfresco.com/jira/browse/AKU-462)       - General Document Library tweaks

1.0.28:
* [AKU-415](https://issues.alfresco.com/jira/browse/AKU-415)       - Add hash support to [`AlfFilteredList`](src/main/resources/alfresco/lists/AlfFilteredList.js)
* [AKU-437](https://issues.alfresco.com/jira/browse/AKU-437)       - It is now possible to initialise a [`Picker`](src/main/resources/alfresco/forms/controls/Picker.js) with the `currentItem` as its value, by specifying `useCurrentItemAsValue: true` in the Picker config
* [AKU-451](https://issues.alfresco.com/jira/browse/AKU-451)       - Ensure form controls can be displayed (events are now setup correctly) on tabs
* [AKU-459](https://issues.alfresco.com/jira/browse/AKU-459)       - Ability to set user home page preference (`org.alfresco.share.user.homePage`) via a publish to the [`UserService`](src/main/resources/alfresco/services/UserService.js) on the topic `ALF_SET_USER_HOME_PAGE`

1.0.27:
* [AKU-420](https://issues.alfresco.com/jira/browse/AKU-420)       - `currentPageSize` being reset by [`AlfSortablePaginatedList`](src/main/resources/alfresco/lists/AlfSortablePaginatedList.js) in `postMixInProperties()` because of hardcoded preference name (fixed by making configurable property)
* [AKU-423](https://issues.alfresco.com/jira/browse/AKU-423)       - `formSubmissionGlobal` and `formSubmissionScope` properties added to [`DialogService`](src/main/resources/alfresco/services/DialogService.js) `publishPayload` config property, to give greater control over resultant dialog-form submission
* [AKU-425](https://issues.alfresco.com/jira/browse/AKU-425)       - Resolve all Blocker and Critical issues on Sonar raised by the SQALE plugin
* [AKU-430](https://issues.alfresco.com/jira/browse/AKU-430)       - [`DateTextBox`](src/main/resources/alfresco/forms/controls/DateTextBox.js) does not handle empty values very well (converts it to "epoch" date, i.e. 1/1/1970)
* [AKU-431](https://issues.alfresco.com/jira/browse/AKU-431)       - [`NumberSpinner`](src/main/resources/alfresco/forms/controls/NumberSpinner.js) cannot be submitted with empty value (fixed by adding optional `permitEmpty` property)
* [AKU-436](https://issues.alfresco.com/jira/browse/AKU-436)       - [`NotificationService`](src/main/resources/alfresco/services/NotificationService.js) notifications could be scrolled or even appear off screen (fixed) and also added new close button for manual closing of long-lasting notifications

1.0.26:
* [AKU-18](https://issues.alfresco.com/jira/browse/AKU-18)         - Update [`DebugLog`](src/main/resources/alfresco/logging/DebugLog.js) to make it more useful for testing
* [AKU-267](https://issues.alfresco.com/jira/browse/AKU-267)       - Add a mechanism to allow a "Create Another" pattern for dialogs
* [AKU-403](https://issues.alfresco.com/jira/browse/AKU-403)       - [`Dashlet`](src/main/resources/alfresco/dashlets/Dashlet.js) does not support LESS theming
* [AKU-407](https://issues.alfresco.com/jira/browse/AKU-407)       - Add support for publishing when clicking on an [`AvatarThumbnail`](src/main/resources/alfresco/renderers/AvatarThumbnail.js)
* [AKU-409](https://issues.alfresco.com/jira/browse/AKU-409)       - Fix [`DateTextBox`](src/main/resources/alfresco/forms/controls/DateTextBox.js) to handle invalid initial values better
* [AKU-410](https://issues.alfresco.com/jira/browse/AKU-410)       - Create prototype [`Dashlet`](src/main/resources/alfresco/dashlets/Dashlet.js) for displaying _Favorites_ and _Recents_
* [AKU-412](https://issues.alfresco.com/jira/browse/AKU-412)       - Fix intermittent unit test failures
* [AKU-413](https://issues.alfresco.com/jira/browse/AKU-413)       - Fix "dragging an item containing nested items causes single-use palette to empty"
* [AKU-414](https://issues.alfresco.com/jira/browse/AKU-414)       - [`AlfSearchList`](src/main/resources/alfresco/search/AlfSearchList.js) does not work with [`Paginator`](src/main/resources/alfresco/lists/Paginator.js)

1.0.25:
* [AKU-367](https://issues.alfresco.com/jira/browse/AKU-367)       - Added alfresco/html/HR widget
* [AKU-377](https://issues.alfresco.com/jira/browse/AKU-377)       - Update alfresco/layout/InfiniteScrollArea to request more list data when vertical space is available
* [AKU-378](https://issues.alfresco.com/jira/browse/AKU-378)       - Update form to provide option to not validate on load
* [AKU-390](https://issues.alfresco.com/jira/browse/AKU-390)       - Drag and drop nested item re-ordering fixes
* [AKU-396](https://issues.alfresco.com/jira/browse/AKU-396)       - Update alfresco/search/AlfSearchResult to include manage aspects in filtered actions
* [AKU-397](https://issues.alfresco.com/jira/browse/AKU-397)       - Refactor of alfresco/core/UrlUtils and including abstraction of addQueryParam from alfresco/services/CrudService
* [AKU-398](https://issues.alfresco.com/jira/browse/AKU-398)       - Added alfresco/forms/controls/SitePicker
* [AKU-399](https://issues.alfresco.com/jira/browse/AKU-399)       - Drag amd drop nested acceptance type verification handling
* [AKU-400](https://issues.alfresco.com/jira/browse/AKU-400)       - Update alfresco/core/NotificationUtils to fix displayPrompt function regression

1.0.24:
* [AKU-337](https://issues.alfresco.com/jira/browse/AKU-337)       - Remove Share dependencies from alfresco/dashlets/Dashlet
* [AKU-375](https://issues.alfresco.com/jira/browse/AKU-375)       - Improvements to alfresco/layout/Twister
* [AKU-376](https://issues.alfresco.com/jira/browse/AKU-376)       - Improvements to alfresco/services/InfiniteScrollService
* [AKU-379](https://issues.alfresco.com/jira/browse/AKU-379)       - Prevent single use DND times being added via keyboard actions
* [AKU-380](https://issues.alfresco.com/jira/browse/AKU-380)       - Support for DND nested accept types 
* [AKU-382](https://issues.alfresco.com/jira/browse/AKU-382)       - Fixes for alfresco/forms/Form useHash behaviour
* [AKU-383](https://issues.alfresco.com/jira/browse/AKU-383)       - Fixes for alfresco/forms/Form auto-save behaviour
* [AKU-385](https://issues.alfresco.com/jira/browse/AKU-385)       - Apply logging filters to pub/sub console output
* [AKU-388](https://issues.alfresco.com/jira/browse/AKU-388)       - Ensure alfresco/menus/AlfMenuItem supports PROCESS payload type
* [AKU-392](https://issues.alfresco.com/jira/browse/AKU-392)       - Fix reload behaviour on infinite scroll lists
* [AKU-395](https://issues.alfresco.com/jira/browse/AKU-395)       - Ensure dashlet supports alfresco/layout/InfiniteScrollArea

1.0.23.2:
* [AKU-394](https://issues.alfresco.com/jira/browse/AKU-394)       - Revert URI encoding back to false on alfresco/core/CoreXhr

1.0.23.1:
* [AKU-393](https://issues.alfresco.com/jira/browse/AKU-393)       - Added service-filtering.lib.js

1.0.23:
* [AKU-66](https://issues.alfresco.com/jira/browse/AKU-66)       - Improved concurrent request handling in alfresco/lists/AlfList and alfresco/search/AlfSearchList
* [AKU-353](https://issues.alfresco.com/jira/browse/AKU-353)       - Improved testability of alfresco/renderers/PublishingDropDownMenu
* [AKU-359](https://issues.alfresco.com/jira/browse/AKU-359)       - Added alfresco/node/MetdataGroups widget for node metadata rendering
* [AKU-360](https://issues.alfresco.com/jira/browse/AKU-360)       - Further improvements to alfresco/header/SeachBox configurability
* [AKU-361](https://issues.alfresco.com/jira/browse/AKU-361)       - Support ability to merge REST API and custom  actions in alfresco/renderers/Actions
* [AKU-362](https://issues.alfresco.com/jira/browse/AKU-362)       - Ensure that alfresco/documentlibrary/AlfBreadcrumbList supports useHash false
* [AKU-366](https://issues.alfresco.com/jira/browse/AKU-366)       - Added support for zebra striping using LESS variables in lists 
* [AKU-368](https://issues.alfresco.com/jira/browse/AKU-368)       - Ensure that text only content in dialogs is centered
* [AKU-370](https://issues.alfresco.com/jira/browse/AKU-370)       - Fixed issues with ManageAspects action
* [AKU-381](https://issues.alfresco.com/jira/browse/AKU-381)       - Remove unnecessary whitespace from dialog without buttons


1.0.22:
* [AKU-299](https://issues.alfresco.com/jira/browse/AKU-299)       - Add support for clearing alfresco/forms/controls/DragAndDropTargetControl via pub/sub
* [AKU-332](https://issues.alfresco.com/jira/browse/AKU-332)       - Added classes to improve testing for list state
* [AKU-354](https://issues.alfresco.com/jira/browse/AKU-354)       - Ensure consistency in favourites display in alfresco/header/AlfSitesMenu
* [AKU-356](https://issues.alfresco.com/jira/browse/AKU-356)       - Added support for auto-save in forms
* [AKU-364](https://issues.alfresco.com/jira/browse/AKU-364)       - Added alfresco/layout/InfiniteScrollArea
* [AKU-365](https://issues.alfresco.com/jira/browse/AKU-365)       - Improvements to alfresco/misc/AlfTooltip

1.0.21:
* [AKU-331](https://issues.alfresco.com/jira/browse/AKU-331)       - Updated alfresco/services/CoreXhr to support configurable encoding of URLs
* [AKU-336](https://issues.alfresco.com/jira/browse/AKU-336)       - Began to annotate modules with support status
* [AKU-341](https://issues.alfresco.com/jira/browse/AKU-341)       - Ensure alfresco/forms/controls/NumberSpinner can be initialised with value over 999 without initial validation error
* [AKU-343](https://issues.alfresco.com/jira/browse/AKU-343)       - Improved alfresco/lists/Paginator preference handling
* [AKU-344](https://issues.alfresco.com/jira/browse/AKU-344)       - Improved cancellation handling in alfresco/renderers/PublishingDropDownMenu
* [AKU-347](https://issues.alfresco.com/jira/browse/AKU-347)       - Ensure alfresco/documentlibrary/AlfBreadcrumbTrail can be wrapped
* [AKU-350](https://issues.alfresco.com/jira/browse/AKU-350)       - Improved default config rendering of alfresco/layout/FixedHeaderFooter
* [AKU-352](https://issues.alfresco.com/jira/browse/AKU-352)       - Improved alfresco/lists/Paginator control visibility handling on invalid data
 

1.0.20:
* [AKU-298](https://issues.alfresco.com/jira/browse/AKU-298)       - Global support for "additionalCssClasses" attribute
* [AKU-301](https://issues.alfresco.com/jira/browse/AKU-301)       - Configurable edit publication for drag and dropped items
* [AKU-316](https://issues.alfresco.com/jira/browse/AKU-316)       - Added support for "hashVarsForUpdate" to alfresco/forms/Form
* [AKU-317](https://issues.alfresco.com/jira/browse/AKU-317)       - Added support for automatic cache busting to alfresco/core/CoreXhr
* [AKU-318](https://issues.alfresco.com/jira/browse/AKU-318)       - Ensure nested drag and dropped item label data is retained when editing parent item
* [AKU-321](https://issues.alfresco.com/jira/browse/AKU-321)       - Added alfresco/lists/views/HtmlListView
* [AKU-322](https://issues.alfresco.com/jira/browse/AKU-322)       - Ensure form controls nested within alfresco/forms/ControlRow publish initial value
* [AKU-328](https://issues.alfresco.com/jira/browse/AKU-328)       - Prevent event bubbling on alfresco/debug/WidgetInfo image click
* [AKU-330](https://issues.alfresco.com/jira/browse/AKU-330)       - Added support for automatic scroll to item in list
* [AKU-342](https://issues.alfresco.com/jira/browse/AKU-342)       - Infinite scroll support in all paginated lists
* [AKU-345](https://issues.alfresco.com/jira/browse/AKU-345)       - Improvements to logging in alfresco/services/NavigationService
* [AKU-346](https://issues.alfresco.com/jira/browse/AKU-346)       - Ensure assign workflow URL is generated correctly

1.0.19:
* [AKU-290](https://issues.alfresco.com/jira/browse/AKU-290)       - Prevent menu items opening on hover
* [AKU-293](https://issues.alfresco.com/jira/browse/AKU-293)       - Fix URL hash sorting/pagination support
* [AKU-296](https://issues.alfresco.com/jira/browse/AKU-296)       - Dialog CSS tweaks
* [AKU-297](https://issues.alfresco.com/jira/browse/AKU-297)       - Remove "flutter" on DND, set explicit target
* [AKU-300](https://issues.alfresco.com/jira/browse/AKU-300)       - Improved search result calendar links
* [AKU-302](https://issues.alfresco.com/jira/browse/AKU-302)       - Page size URL hash attribute fix
* [AKU-307](https://issues.alfresco.com/jira/browse/AKU-307)       - Fix potential memory leak in ResizeMixin
* [AKU-313](https://issues.alfresco.com/jira/browse/AKU-313)       - Added configurable display for "alfresco/dnd/DroppedItem" widget
* [AKU-314](https://issues.alfresco.com/jira/browse/AKU-314)       - Improved JSDoc on "alfresco/forms/controls/HiddenValue"
* [AKU-319](https://issues.alfresco.com/jira/browse/AKU-319)       - "alfresco/services/ActionService" createLinkContent fix
* [AKU-323](https://issues.alfresco.com/jira/browse/AKU-323)       - "alfresco/services/DocumentService" fixes
* [AKU-325](https://issues.alfresco.com/jira/browse/AKU-325)       - "alfresco/forms/controls/MultiSelectInput" keyboard navigation fixes

1.0.18: 
* [AKU-204](https://issues.alfresco.com/jira/browse/AKU-204)       - Add support for "document-upload-new-version" action
* [AKU-281](https://issues.alfresco.com/jira/browse/AKU-281)       - NavigationService postToPage ignores target
* [AKU-282](https://issues.alfresco.com/jira/browse/AKU-282)       - ActionService is ignoring the currentTarget config value for action type "link"
* [AKU-283](https://issues.alfresco.com/jira/browse/AKU-283)       - MultiSelectInput: Loading... message is not replaced by results
* [AKU-284](https://issues.alfresco.com/jira/browse/AKU-284)       - Pub/sub logging goes directly to console when client-debug is enabled
* [AKU-285](https://issues.alfresco.com/jira/browse/AKU-285)       - Create activity summary widget
* [AKU-286](https://issues.alfresco.com/jira/browse/AKU-286)       - Update alfresco/header package widgets to use LESS variables
* [AKU-289](https://issues.alfresco.com/jira/browse/AKU-289)       - PublishingDropDownMenu does not always render options if loaded within a List
* [AKU-291](https://issues.alfresco.com/jira/browse/AKU-291)       - Update tutorial 1 to include instructions on using remote Repo
* [AKU-294](https://issues.alfresco.com/jira/browse/AKU-294)       - Fixed header and footer
* [AKU-295](https://issues.alfresco.com/jira/browse/AKU-295)       - PublishingDropDownMenu does not support aborted change requests.
* [AKU-305](https://issues.alfresco.com/jira/browse/AKU-305)       - Right Click on header menu issue
* [AKU-306](https://issues.alfresco.com/jira/browse/AKU-306)       - Keyboard navigation for the multi select input widget does not work with IE11
* [AKU-312](https://issues.alfresco.com/jira/browse/AKU-312)       - MultiSelectInput: Dropdown list not populated fully if previous item was selected using keyboard.

1.0.17.1:
* [AKU-304](https://issues.alfresco.com/jira/browse/AKU-304)       - The confirmation dialog is not displayed correctly

1.0.17:
* [AKU-19](https://issues.alfresco.com/jira/browse/AKU-19)         - Upgrade to use Dojo 1.10.4
* [AKU-203](https://issues.alfresco.com/jira/browse/AKU-203)       - Added support for document-locate action
* [AKU-244](https://issues.alfresco.com/jira/browse/AKU-244)       - Added HTML sanitizing proxy WebScript
* [AKU-262](https://issues.alfresco.com/jira/browse/AKU-262)       - Made alfresco/documentlibrary/AlfBreadcrumbTrail more abstract
* [AKU-275](https://issues.alfresco.com/jira/browse/AKU-275)       - Ensure form button disabled HTML attribute is set correctly
* [AKU-277](https://issues.alfresco.com/jira/browse/AKU-277)       - Fix keybord navigation of MultiSelectInput form control
* [AKU-278](https://issues.alfresco.com/jira/browse/AKU-278)       - Added "alfresco/layout/StripedContent" widget
* [AKU-279](https://issues.alfresco.com/jira/browse/AKU-279)       - Support for add tab in "alfresco/layout/AlfTabContainer"
* [AKU-280](https://issues.alfresco.com/jira/browse/AKU-280)       - Improved handling of long text in MultiSelectInput

1.0.16:
* [AKU-247](https://issues.alfresco.com/jira/browse/AKU-247)       - Ensure value is retained when options updated
* [AKU-248](https://issues.alfresco.com/jira/browse/AKU-248)       - Ensure filter selection resets pagination
* [AKU-249](https://issues.alfresco.com/jira/browse/AKU-249)       - Fix to tag render filter selection publication
* [AKU-250](https://issues.alfresco.com/jira/browse/AKU-250)       - Ensure initially rendered view is marked as selected
* [AKU-251](https://issues.alfresco.com/jira/browse/AKU-251)       - Fix favouriting and PreferenceService for use in standalone clients
* [AKU-252](https://issues.alfresco.com/jira/browse/AKU-252)       - Make create content dialog wider
* [AKU-253](https://issues.alfresco.com/jira/browse/AKU-253)       - Improve sidebar defaults and preference handling
* [AKU-254](https://issues.alfresco.com/jira/browse/AKU-254)       - Ensure templated content can be created on standalone clients
* [AKU-257](https://issues.alfresco.com/jira/browse/AKU-257)       - Ensure Gallery View folder thumbnail can be selected
* [AKU-266](https://issues.alfresco.com/jira/browse/AKU-266)       - Create tooltip that supports widget models
* [AKU-268](https://issues.alfresco.com/jira/browse/AKU-268)       - Update renderFilter to support array data
* [AKU-271](https://issues.alfresco.com/jira/browse/AKU-271)       - Ensure required NumberSpinner can have 0 as a valid value
* [AKU-272](https://issues.alfresco.com/jira/browse/AKU-272)       - NumberSpinner validation handling improvements
* [AKU-273](https://issues.alfresco.com/jira/browse/AKU-273)       - Add scroll bar to dialog body as content grows

1.0.15:
* [AKU-195](https://issues.alfresco.com/jira/browse/AKU-195)       - Basic support for edit document properties
* [AKU-220](https://issues.alfresco.com/jira/browse/AKU-220)       - PubSub options handling improvements
* [AKU-232](https://issues.alfresco.com/jira/browse/AKU-232)       - ActionService updates for deleting content
* [AKU-234](https://issues.alfresco.com/jira/browse/AKU-234)       - Added alfresco/renderers/AvatarThumbnail
* [AKU-235](https://issues.alfresco.com/jira/browse/AKU-235)       - Update test app and archetype to not use Maven snapshots
* [AKU-238](https://issues.alfresco.com/jira/browse/AKU-238)       - Ensure MultiSelectInput options are not clipped in dialog
* [AKU-239](https://issues.alfresco.com/jira/browse/AKU-239)       - Include empty array data as missing required value
* [AKU-242](https://issues.alfresco.com/jira/browse/AKU-242)       - Support configurable page sizes in alfresco/lists/Paginator
* [AKU-243](https://issues.alfresco.com/jira/browse/AKU-243)       - Added pagination and sorting to alfresco/renderers/CommentsList

1.0.14:
* [AKU-158](https://issues.alfresco.com/jira/browse/AKU-158)       - Improved publication/subscription log
* [AKU-219](https://issues.alfresco.com/jira/browse/AKU-219)       - Nested "use-once" items returned to palette
* [AKU-220](https://issues.alfresco.com/jira/browse/AKU-220)       - PubSub options on form controls honour previous value
* [AKU-221](https://issues.alfresco.com/jira/browse/AKU-221)       - Prevent dropped items being added to palette
* [AKU-227](https://issues.alfresco.com/jira/browse/AKU-227)       - CommentsList widget improvements
* [AKU-229](https://issues.alfresco.com/jira/browse/AKU-229)       - Support nested drop targets
* [AKU-230](https://issues.alfresco.com/jira/browse/AKU-230)       - InlineEditProperty with renderOnNewLine enabled layout fix
* [AKU-231](https://issues.alfresco.com/jira/browse/AKU-231)       - Simple mode for alfresco/renderers/Date
* [AKU-233](https://issues.alfresco.com/jira/browse/AKU-233)       - alfresco/renderers/Thumbnail enhancements
* [AKU-236](https://issues.alfresco.com/jira/browse/AKU-236)       - Updates to alfresco/dnd/DragAndDropItemsListView widget
* [AKU-245](https://issues.alfresco.com/jira/browse/AKU-245)       - Localize alfresco/services/CrudService messages

1.0.13:
* [AKU-163](https://issues.alfresco.com/jira/browse/AKU-163)       - alfresco/lists/AlfHashList can update load payload from hash parameters
* [AKU-178](https://issues.alfresco.com/jira/browse/AKU-178)       - New alfresco/forms/controls/MultiSelectInput widget
* [AKU-191](https://issues.alfresco.com/jira/browse/AKU-191)       - New alfresco/dnd/DragAndDropItemsListView widget
* [AKU-196](https://issues.alfresco.com/jira/browse/AKU-196)       - Added support for "document-approve" action
* [AKU-197](https://issues.alfresco.com/jira/browse/AKU-197)       - Added support for "document-reject" action
* [AKU-216](https://issues.alfresco.com/jira/browse/AKU-216)       - Updated ContainerPicker to support configurable repository root node.
* [AKU-218](https://issues.alfresco.com/jira/browse/AKU-218)       - Added modelling service config creator

1.0.12:
* [AKU-14](https://issues.alfresco.com/jira/browse/AKU-14)       - Code Mirror form control updates
* [AKU-150](https://issues.alfresco.com/jira/browse/AKU-150)     - CSS updates to support Share title bar
* [AKU-188](https://issues.alfresco.com/jira/browse/AKU-188)     - Hide edit button on DND items by default
* [AKU-189](https://issues.alfresco.com/jira/browse/AKU-189)     - Use-once DND items
* [AKU-190](https://issues.alfresco.com/jira/browse/AKU-190)     - Multiple DND source keyboard control fix
* [AKU-192](https://issues.alfresco.com/jira/browse/AKU-192)     - Added alfresco/lists/AlfFilteredList widget
* [AKU-193](https://issues.alfresco.com/jira/browse/AKU-193)     - Form control options localization fix
* [AKU-217](https://issues.alfresco.com/jira/browse/AKU-217)     - CSS correction for Logo

1.0.11:
* [AKU-3](https://issues.alfresco.com/jira/browse/AKU-3)     - Updated tests to work against Selenium Grid
* [AKU-37](https://issues.alfresco.com/jira/browse/AKU-37)   - Added folder view preference handling
* [AKU-159](https://issues.alfresco.com/jira/browse/AKU-159) - Support for truncated property rendering
* [AKU-175](https://issues.alfresco.com/jira/browse/AKU-175) - Improved image source logo width handling
* [AKU-177](https://issues.alfresco.com/jira/browse/AKU-177) - Fixed scoping on AlfDetailedViewItem
* [AKU-180](https://issues.alfresco.com/jira/browse/AKU-180) - PDF.js preview faults test fix
* [AKU-182](https://issues.alfresco.com/jira/browse/AKU-182) - Update archetype to include repo connection config
* [AKU-183](https://issues.alfresco.com/jira/browse/AKU-183) - Index page for unit test application
* [AKU-184](https://issues.alfresco.com/jira/browse/AKU-184) - DND item label localization

1.0.10:
* [AKU-133](https://issues.alfresco.com/jira/browse/AKU-133)     - FileType configurable images
* [AKU-157](https://issues.alfresco.com/jira/browse/AKU-157)     - Ensure HiddenValue form control can be set
* [AKU-170](https://issues.alfresco.com/jira/browse/AKU-170)     - Improvements to test reporter
* [AKU-172](https://issues.alfresco.com/jira/browse/AKU-172)     - SearchBox configurability updates
* [AKU-176](https://issues.alfresco.com/jira/browse/AKU-176)     - Form dialog width setting updates

1.0.9:
* [AKU-33](https://issues.alfresco.com/jira/browse/AKU-33)     - Add dedicated Detailed View result widget for performance
* [AKU-115](https://issues.alfresco.com/jira/browse/AKU-115)   - Use keyboard to add DND items
* [AKU-116](https://issues.alfresco.com/jira/browse/AKU-116)   - Re-order DND items using keyboard navigation
* [AKU-148](https://issues.alfresco.com/jira/browse/AKU-148)   - Alias AlfDocumentListPaginator
* [AKU-149](https://issues.alfresco.com/jira/browse/AKU-149)   - When a publishPayloadType 'BUILD' updates
* [AKU-150](https://issues.alfresco.com/jira/browse/AKU-150)   - Title overflow handling
* [AKU-155](https://issues.alfresco.com/jira/browse/AKU-155)   - Improved form dialog submission failures
* [AKU-160](https://issues.alfresco.com/jira/browse/AKU-160)   - Duplicate BaseFormControlfunctions
* [AKU-161](https://issues.alfresco.com/jira/browse/AKU-161)   - Fix noValueUpdateWhenHiddenOrDisabled
* [AKU-164](https://issues.alfresco.com/jira/browse/AKU-164)   - SearchBox styling
* [AKU-168](https://issues.alfresco.com/jira/browse/AKU-168)   - PickedItem fails in singleItemMode

1.0.8:
* [AKU-5](https://issues.alfresco.com/jira/browse/AKU-5)       - Remove YUI2 and Share dependencies from TinyMCE modules
* [AKU-30](https://issues.alfresco.com/jira/browse/AKU-30)     - Updates to Indicators renderer
* [AKU-112](https://issues.alfresco.com/jira/browse/AKU-112)   - Drag and drop items and post form value
* [AKU-113](https://issues.alfresco.com/jira/browse/AKU-113)   - Re-order items and post updated value 
* [AKU-114](https://issues.alfresco.com/jira/browse/AKU-114)   - Delete dropped items and post updated value
* [AKU-117](https://issues.alfresco.com/jira/browse/AKU-117)   - Render widgets as dropped items
* [AKU-118](https://issues.alfresco.com/jira/browse/AKU-118)   - Implement drag and drop modelling service
* [AKU-140](https://issues.alfresco.com/jira/browse/AKU-140)   - Search scope issues resolved
* [AKU-142](https://issues.alfresco.com/jira/browse/AKU-142)   - Add hash fragment support to AlfDynamicPayloadButton
* [AKU-151](https://issues.alfresco.com/jira/browse/AKU-151)   - Fixed DialogService config issue

* 1.0.7:
* [AKU-13](https://issues.alfresco.com/jira/browse/AKU-13)   - Added support for stacked dialogs
* [AKU-27](https://issues.alfresco.com/jira/browse/AKU-27)   - Add support for create folder templated content
* [AKU-94](https://issues.alfresco.com/jira/browse/AKU-94)   - Added Grunt task for patching clients
* [AKU-124](https://issues.alfresco.com/jira/browse/AKU-124) - Added alfresco/lists/views/layouts/EditableRow
* [AKU-127](https://issues.alfresco.com/jira/browse/AKU-127) - Add alt text to developer mode widgets
* [AKU-131](https://issues.alfresco.com/jira/browse/AKU-131) - Ensure pub/sub options for form controls work in dialogs
* [AKU-139](https://issues.alfresco.com/jira/browse/AKU-139) - Updated tests for more reliable code coverage

1.0.6:
* [AKU-41](https://issues.alfresco.com/jira/browse/AKU-41)   - Add Manage Aspects support
* [AKU-41](https://issues.alfresco.com/jira/browse/AKU-72)   - Add colspan support to Cell
* [AKU-102](https://issues.alfresco.com/jira/browse/AKU-101) - Add additionalCssClasses support to Row
* [AKU-102](https://issues.alfresco.com/jira/browse/AKU-102) - NLS updates for alfresco/html/Heading
* [AKU-103](https://issues.alfresco.com/jira/browse/AKU-103) - NLS updates for alfresco/header/SetTitle
* [AKU-105](https://issues.alfresco.com/jira/browse/AKU-105) - Add notification after joining site
* [AKU-108](https://issues.alfresco.com/jira/browse/AKU-108) - Allow form values to be set via publication
* [AKU-109](https://issues.alfresco.com/jira/browse/AKU-109) - Fix typo in sites menu
* [AKU-119](https://issues.alfresco.com/jira/browse/AKU-119) - Add IDs to dialogs from alfresco/services/DialogService

1.0.5:
* [AKU-40](https://issues.alfresco.com/jira/browse/AKU-40) - Remove picked items from simple picker available list
* [AKU-81](https://issues.alfresco.com/jira/browse/AKU-81) - Allow copy/move content into empty document libraries
* [AKU-96](https://issues.alfresco.com/jira/browse/AKU-96) - CSS updates to copy/move action dialogs
* [AKU-97](https://issues.alfresco.com/jira/browse/AKU-97) - Ensure en locale files are generated

1.0.4:
* [AKU-17](https://issues.alfresco.com/jira/browse/AKU-17) - Implement standalone Aikau transient notifications
* [AKU-76](https://issues.alfresco.com/jira/browse/AKU-76) - Updated NPM to use specific tested versions
* [AKU-78](https://issues.alfresco.com/jira/browse/AKU-78) - Clean up Vagrant image configuration files that shouldn't have been committed
* [AKU-79](https://issues.alfresco.com/jira/browse/AKU-79) - Add callback to LogoutService to ensure logout redirection
* [AKU-80](https://issues.alfresco.com/jira/browse/AKU-80) - Modifications to Vagrant provisioned versions
* [AKU-83](https://issues.alfresco.com/jira/browse/AKU-83) - Resolve issues in filtered search page introduced by v1.0.3 updates

1.0.3:
* [AKU-9](https://issues.alfresco.com/jira/browse/AKU-9)   - Add release notes
* [AKU-21](https://issues.alfresco.com/jira/browse/AKU-21) - Filmstrip view fixes
* [AKU-22](https://issues.alfresco.com/jira/browse/AKU-22) - Inline edit cursor update
* [AKU-24](https://issues.alfresco.com/jira/browse/AKU-24) - Remove potential XSS vulnerability in alfresco/forms/controls/Select
* [AKU-65](https://issues.alfresco.com/jira/browse/AKU-65) - Pagination handling updates
* [AKU-71](https://issues.alfresco.com/jira/browse/AKU-71) - Improvements to alfresco/renderers/InlineEditPropertyLink

