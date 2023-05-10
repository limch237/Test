(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MyApplication/i18n/i18n.properties":
/*!**************************************************************!*\
  !*** ./build.definitions/MyApplication/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/AppUpdateFailure.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/AppUpdateFailure.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MyApplication/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/AppUpdateSuccess.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/AppUpdateSuccess.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MyApplication/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MyApplication/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/Authors_Cancel.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/Authors_Cancel.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MyApplication/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/Authors_CreateBooks.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/Authors_CreateBooks.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateRelatedEntity)
/* harmony export */ });
function CreateRelatedEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        let readLink = clientAPI.binding['@odata.readLink'];
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Authors/Authors_CreateBooks.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors',
                        'ReadLink': readLink
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/Authors_CreateBooks.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/Authors_CreateEntity.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/Authors_CreateEntity.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Authors/Authors_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/Authors_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/Authors_DeleteConfirmation.js":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/Authors_DeleteConfirmation.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MyApplication/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MyApplication/Actions/Authors/Authors_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/Authors_UpdateEntity.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/Authors_UpdateEntity.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Authors/Authors_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Authors'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/Authors_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/NavToAuthors_CreateBooks.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/NavToAuthors_CreateBooks.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToCreate)
/* harmony export */ });
function NavToCreate(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Authors/NavToAuthors_Edit.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Authors/NavToAuthors_Edit.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Authors')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Authors'
                },
                'OnSuccess': '/MyApplication/Actions/Authors/NavToAuthors_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Authors/NavToAuthors_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Books/Books_Cancel.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Books/Books_Cancel.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cancel)
/* harmony export */ });
function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Books'
                },
                'OnSuccess': '/MyApplication/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/CloseModalPage_Cancel.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Books/Books_CreateEntity.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Books/Books_CreateEntity.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Books/Books_CreateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            let newEntity = JSON.parse(result.data);
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Books',
                        'ReadLink': newEntity['@odata.readLink']
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Books/Books_CreateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Books/Books_DeleteConfirmation.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Books/Books_DeleteConfirmation.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MyApplication/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MyApplication/Actions/Books/Books_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Books/Books_UpdateEntity.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Books/Books_UpdateEntity.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateEntity)
/* harmony export */ });
function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/Books/Books_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/MyApplication/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'Books'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Books/Books_UpdateEntity.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/Books/NavToBooks_Edit.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/Books/NavToBooks_Edit.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavToEdit)
/* harmony export */ });
function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/MyApplication/Services/service1.service').isDraftEnabled('Books')) {
        return clientAPI.executeAction({
            'Name': '/MyApplication/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'Books'
                },
                'OnSuccess': '/MyApplication/Actions/Books/NavToBooks_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/MyApplication/Actions/Books/NavToBooks_Edit.action');
    }
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/OnWillUpdate.js":
/*!***************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/OnWillUpdate.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MyApplication/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApplication/Rules/ResetAppSettingsAndLogout.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyApplication/Rules/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/MyApplication/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let myapplication_actions_appupdate_action = __webpack_require__(/*! ./MyApplication/Actions/AppUpdate.action */ "./build.definitions/MyApplication/Actions/AppUpdate.action")
let myapplication_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MyApplication/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MyApplication/Actions/AppUpdateFailureMessage.action")
let myapplication_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MyApplication/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MyApplication/Actions/AppUpdateProgressBanner.action")
let myapplication_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MyApplication/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MyApplication/Actions/AppUpdateSuccessMessage.action")
let myapplication_actions_authors_authors_createbooks_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/Authors_CreateBooks.action */ "./build.definitions/MyApplication/Actions/Authors/Authors_CreateBooks.action")
let myapplication_actions_authors_authors_createentity_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/Authors_CreateEntity.action */ "./build.definitions/MyApplication/Actions/Authors/Authors_CreateEntity.action")
let myapplication_actions_authors_authors_deleteentity_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/Authors_DeleteEntity.action */ "./build.definitions/MyApplication/Actions/Authors/Authors_DeleteEntity.action")
let myapplication_actions_authors_authors_detailpopover_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/Authors_DetailPopover.action */ "./build.definitions/MyApplication/Actions/Authors/Authors_DetailPopover.action")
let myapplication_actions_authors_authors_updateentity_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/Authors_UpdateEntity.action */ "./build.definitions/MyApplication/Actions/Authors/Authors_UpdateEntity.action")
let myapplication_actions_authors_navtoauthors_create_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/NavToAuthors_Create.action */ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Create.action")
let myapplication_actions_authors_navtoauthors_createbooks_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action */ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action")
let myapplication_actions_authors_navtoauthors_detail_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/NavToAuthors_Detail.action */ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Detail.action")
let myapplication_actions_authors_navtoauthors_edit_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/NavToAuthors_Edit.action */ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Edit.action")
let myapplication_actions_authors_navtoauthors_list_action = __webpack_require__(/*! ./MyApplication/Actions/Authors/NavToAuthors_List.action */ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_List.action")
let myapplication_actions_books_books_createentity_action = __webpack_require__(/*! ./MyApplication/Actions/Books/Books_CreateEntity.action */ "./build.definitions/MyApplication/Actions/Books/Books_CreateEntity.action")
let myapplication_actions_books_books_deleteentity_action = __webpack_require__(/*! ./MyApplication/Actions/Books/Books_DeleteEntity.action */ "./build.definitions/MyApplication/Actions/Books/Books_DeleteEntity.action")
let myapplication_actions_books_books_updateentity_action = __webpack_require__(/*! ./MyApplication/Actions/Books/Books_UpdateEntity.action */ "./build.definitions/MyApplication/Actions/Books/Books_UpdateEntity.action")
let myapplication_actions_books_navtobooks_create_action = __webpack_require__(/*! ./MyApplication/Actions/Books/NavToBooks_Create.action */ "./build.definitions/MyApplication/Actions/Books/NavToBooks_Create.action")
let myapplication_actions_books_navtobooks_detail_action = __webpack_require__(/*! ./MyApplication/Actions/Books/NavToBooks_Detail.action */ "./build.definitions/MyApplication/Actions/Books/NavToBooks_Detail.action")
let myapplication_actions_books_navtobooks_edit_action = __webpack_require__(/*! ./MyApplication/Actions/Books/NavToBooks_Edit.action */ "./build.definitions/MyApplication/Actions/Books/NavToBooks_Edit.action")
let myapplication_actions_books_navtobooks_list_action = __webpack_require__(/*! ./MyApplication/Actions/Books/NavToBooks_List.action */ "./build.definitions/MyApplication/Actions/Books/NavToBooks_List.action")
let myapplication_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MyApplication/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MyApplication/Actions/CloseModalPage_Cancel.action")
let myapplication_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MyApplication/Actions/CloseModalPage_Complete.action */ "./build.definitions/MyApplication/Actions/CloseModalPage_Complete.action")
let myapplication_actions_closepage_action = __webpack_require__(/*! ./MyApplication/Actions/ClosePage.action */ "./build.definitions/MyApplication/Actions/ClosePage.action")
let myapplication_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MyApplication/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MyApplication/Actions/CreateEntityFailureMessage.action")
let myapplication_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MyApplication/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MyApplication/Actions/CreateEntitySuccessMessage.action")
let myapplication_actions_deleteconfirmation_action = __webpack_require__(/*! ./MyApplication/Actions/DeleteConfirmation.action */ "./build.definitions/MyApplication/Actions/DeleteConfirmation.action")
let myapplication_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MyApplication/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MyApplication/Actions/DeleteEntityFailureMessage.action")
let myapplication_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MyApplication/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MyApplication/Actions/DeleteEntitySuccessMessage.action")
let myapplication_actions_draftdiscardentity_action = __webpack_require__(/*! ./MyApplication/Actions/DraftDiscardEntity.action */ "./build.definitions/MyApplication/Actions/DraftDiscardEntity.action")
let myapplication_actions_drafteditentity_action = __webpack_require__(/*! ./MyApplication/Actions/DraftEditEntity.action */ "./build.definitions/MyApplication/Actions/DraftEditEntity.action")
let myapplication_actions_draftsaveentity_action = __webpack_require__(/*! ./MyApplication/Actions/DraftSaveEntity.action */ "./build.definitions/MyApplication/Actions/DraftSaveEntity.action")
let myapplication_actions_logout_action = __webpack_require__(/*! ./MyApplication/Actions/Logout.action */ "./build.definitions/MyApplication/Actions/Logout.action")
let myapplication_actions_logoutmessage_action = __webpack_require__(/*! ./MyApplication/Actions/LogoutMessage.action */ "./build.definitions/MyApplication/Actions/LogoutMessage.action")
let myapplication_actions_onwillupdate_action = __webpack_require__(/*! ./MyApplication/Actions/OnWillUpdate.action */ "./build.definitions/MyApplication/Actions/OnWillUpdate.action")
let myapplication_actions_service_initializeonline_action = __webpack_require__(/*! ./MyApplication/Actions/Service/InitializeOnline.action */ "./build.definitions/MyApplication/Actions/Service/InitializeOnline.action")
let myapplication_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MyApplication/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MyApplication/Actions/Service/InitializeOnlineFailureMessage.action")
let myapplication_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MyApplication/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MyApplication/Actions/Service/InitializeOnlineSuccessMessage.action")
let myapplication_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MyApplication/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MyApplication/Actions/UpdateEntityFailureMessage.action")
let myapplication_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MyApplication/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MyApplication/Actions/UpdateEntitySuccessMessage.action")
let myapplication_globals_appdefinition_version_global = __webpack_require__(/*! ./MyApplication/Globals/AppDefinition_Version.global */ "./build.definitions/MyApplication/Globals/AppDefinition_Version.global")
let myapplication_i18n_i18n_properties = __webpack_require__(/*! ./MyApplication/i18n/i18n.properties */ "./build.definitions/MyApplication/i18n/i18n.properties")
let myapplication_jsconfig_json = __webpack_require__(/*! ./MyApplication/jsconfig.json */ "./build.definitions/MyApplication/jsconfig.json")
let myapplication_pages_authors_authors_create_page = __webpack_require__(/*! ./MyApplication/Pages/Authors/Authors_Create.page */ "./build.definitions/MyApplication/Pages/Authors/Authors_Create.page")
let myapplication_pages_authors_authors_createbooks_page = __webpack_require__(/*! ./MyApplication/Pages/Authors/Authors_CreateBooks.page */ "./build.definitions/MyApplication/Pages/Authors/Authors_CreateBooks.page")
let myapplication_pages_authors_authors_detail_page = __webpack_require__(/*! ./MyApplication/Pages/Authors/Authors_Detail.page */ "./build.definitions/MyApplication/Pages/Authors/Authors_Detail.page")
let myapplication_pages_authors_authors_edit_page = __webpack_require__(/*! ./MyApplication/Pages/Authors/Authors_Edit.page */ "./build.definitions/MyApplication/Pages/Authors/Authors_Edit.page")
let myapplication_pages_authors_authors_list_page = __webpack_require__(/*! ./MyApplication/Pages/Authors/Authors_List.page */ "./build.definitions/MyApplication/Pages/Authors/Authors_List.page")
let myapplication_pages_books_books_create_page = __webpack_require__(/*! ./MyApplication/Pages/Books/Books_Create.page */ "./build.definitions/MyApplication/Pages/Books/Books_Create.page")
let myapplication_pages_books_books_detail_page = __webpack_require__(/*! ./MyApplication/Pages/Books/Books_Detail.page */ "./build.definitions/MyApplication/Pages/Books/Books_Detail.page")
let myapplication_pages_books_books_edit_page = __webpack_require__(/*! ./MyApplication/Pages/Books/Books_Edit.page */ "./build.definitions/MyApplication/Pages/Books/Books_Edit.page")
let myapplication_pages_books_books_list_page = __webpack_require__(/*! ./MyApplication/Pages/Books/Books_List.page */ "./build.definitions/MyApplication/Pages/Books/Books_List.page")
let myapplication_pages_main_page = __webpack_require__(/*! ./MyApplication/Pages/Main.page */ "./build.definitions/MyApplication/Pages/Main.page")
let myapplication_rules_appupdatefailure_js = __webpack_require__(/*! ./MyApplication/Rules/AppUpdateFailure.js */ "./build.definitions/MyApplication/Rules/AppUpdateFailure.js")
let myapplication_rules_appupdatesuccess_js = __webpack_require__(/*! ./MyApplication/Rules/AppUpdateSuccess.js */ "./build.definitions/MyApplication/Rules/AppUpdateSuccess.js")
let myapplication_rules_authors_authors_cancel_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/Authors_Cancel.js */ "./build.definitions/MyApplication/Rules/Authors/Authors_Cancel.js")
let myapplication_rules_authors_authors_createbooks_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/Authors_CreateBooks.js */ "./build.definitions/MyApplication/Rules/Authors/Authors_CreateBooks.js")
let myapplication_rules_authors_authors_createentity_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/Authors_CreateEntity.js */ "./build.definitions/MyApplication/Rules/Authors/Authors_CreateEntity.js")
let myapplication_rules_authors_authors_deleteconfirmation_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/Authors_DeleteConfirmation.js */ "./build.definitions/MyApplication/Rules/Authors/Authors_DeleteConfirmation.js")
let myapplication_rules_authors_authors_updateentity_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/Authors_UpdateEntity.js */ "./build.definitions/MyApplication/Rules/Authors/Authors_UpdateEntity.js")
let myapplication_rules_authors_navtoauthors_createbooks_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/NavToAuthors_CreateBooks.js */ "./build.definitions/MyApplication/Rules/Authors/NavToAuthors_CreateBooks.js")
let myapplication_rules_authors_navtoauthors_edit_js = __webpack_require__(/*! ./MyApplication/Rules/Authors/NavToAuthors_Edit.js */ "./build.definitions/MyApplication/Rules/Authors/NavToAuthors_Edit.js")
let myapplication_rules_books_books_cancel_js = __webpack_require__(/*! ./MyApplication/Rules/Books/Books_Cancel.js */ "./build.definitions/MyApplication/Rules/Books/Books_Cancel.js")
let myapplication_rules_books_books_createentity_js = __webpack_require__(/*! ./MyApplication/Rules/Books/Books_CreateEntity.js */ "./build.definitions/MyApplication/Rules/Books/Books_CreateEntity.js")
let myapplication_rules_books_books_deleteconfirmation_js = __webpack_require__(/*! ./MyApplication/Rules/Books/Books_DeleteConfirmation.js */ "./build.definitions/MyApplication/Rules/Books/Books_DeleteConfirmation.js")
let myapplication_rules_books_books_updateentity_js = __webpack_require__(/*! ./MyApplication/Rules/Books/Books_UpdateEntity.js */ "./build.definitions/MyApplication/Rules/Books/Books_UpdateEntity.js")
let myapplication_rules_books_navtobooks_edit_js = __webpack_require__(/*! ./MyApplication/Rules/Books/NavToBooks_Edit.js */ "./build.definitions/MyApplication/Rules/Books/NavToBooks_Edit.js")
let myapplication_rules_onwillupdate_js = __webpack_require__(/*! ./MyApplication/Rules/OnWillUpdate.js */ "./build.definitions/MyApplication/Rules/OnWillUpdate.js")
let myapplication_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MyApplication/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MyApplication/Rules/ResetAppSettingsAndLogout.js")
let myapplication_services_service1_service = __webpack_require__(/*! ./MyApplication/Services/service1.service */ "./build.definitions/MyApplication/Services/service1.service")
let myapplication_styles_styles_css = __webpack_require__(/*! ./MyApplication/Styles/Styles.css */ "./build.definitions/MyApplication/Styles/Styles.css")
let myapplication_styles_styles_json = __webpack_require__(/*! ./MyApplication/Styles/Styles.json */ "./build.definitions/MyApplication/Styles/Styles.json")
let myapplication_styles_styles_less = __webpack_require__(/*! ./MyApplication/Styles/Styles.less */ "./build.definitions/MyApplication/Styles/Styles.less")
let myapplication_styles_styles_nss = __webpack_require__(/*! ./MyApplication/Styles/Styles.nss */ "./build.definitions/MyApplication/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	myapplication_actions_appupdate_action : myapplication_actions_appupdate_action,
	myapplication_actions_appupdatefailuremessage_action : myapplication_actions_appupdatefailuremessage_action,
	myapplication_actions_appupdateprogressbanner_action : myapplication_actions_appupdateprogressbanner_action,
	myapplication_actions_appupdatesuccessmessage_action : myapplication_actions_appupdatesuccessmessage_action,
	myapplication_actions_authors_authors_createbooks_action : myapplication_actions_authors_authors_createbooks_action,
	myapplication_actions_authors_authors_createentity_action : myapplication_actions_authors_authors_createentity_action,
	myapplication_actions_authors_authors_deleteentity_action : myapplication_actions_authors_authors_deleteentity_action,
	myapplication_actions_authors_authors_detailpopover_action : myapplication_actions_authors_authors_detailpopover_action,
	myapplication_actions_authors_authors_updateentity_action : myapplication_actions_authors_authors_updateentity_action,
	myapplication_actions_authors_navtoauthors_create_action : myapplication_actions_authors_navtoauthors_create_action,
	myapplication_actions_authors_navtoauthors_createbooks_action : myapplication_actions_authors_navtoauthors_createbooks_action,
	myapplication_actions_authors_navtoauthors_detail_action : myapplication_actions_authors_navtoauthors_detail_action,
	myapplication_actions_authors_navtoauthors_edit_action : myapplication_actions_authors_navtoauthors_edit_action,
	myapplication_actions_authors_navtoauthors_list_action : myapplication_actions_authors_navtoauthors_list_action,
	myapplication_actions_books_books_createentity_action : myapplication_actions_books_books_createentity_action,
	myapplication_actions_books_books_deleteentity_action : myapplication_actions_books_books_deleteentity_action,
	myapplication_actions_books_books_updateentity_action : myapplication_actions_books_books_updateentity_action,
	myapplication_actions_books_navtobooks_create_action : myapplication_actions_books_navtobooks_create_action,
	myapplication_actions_books_navtobooks_detail_action : myapplication_actions_books_navtobooks_detail_action,
	myapplication_actions_books_navtobooks_edit_action : myapplication_actions_books_navtobooks_edit_action,
	myapplication_actions_books_navtobooks_list_action : myapplication_actions_books_navtobooks_list_action,
	myapplication_actions_closemodalpage_cancel_action : myapplication_actions_closemodalpage_cancel_action,
	myapplication_actions_closemodalpage_complete_action : myapplication_actions_closemodalpage_complete_action,
	myapplication_actions_closepage_action : myapplication_actions_closepage_action,
	myapplication_actions_createentityfailuremessage_action : myapplication_actions_createentityfailuremessage_action,
	myapplication_actions_createentitysuccessmessage_action : myapplication_actions_createentitysuccessmessage_action,
	myapplication_actions_deleteconfirmation_action : myapplication_actions_deleteconfirmation_action,
	myapplication_actions_deleteentityfailuremessage_action : myapplication_actions_deleteentityfailuremessage_action,
	myapplication_actions_deleteentitysuccessmessage_action : myapplication_actions_deleteentitysuccessmessage_action,
	myapplication_actions_draftdiscardentity_action : myapplication_actions_draftdiscardentity_action,
	myapplication_actions_drafteditentity_action : myapplication_actions_drafteditentity_action,
	myapplication_actions_draftsaveentity_action : myapplication_actions_draftsaveentity_action,
	myapplication_actions_logout_action : myapplication_actions_logout_action,
	myapplication_actions_logoutmessage_action : myapplication_actions_logoutmessage_action,
	myapplication_actions_onwillupdate_action : myapplication_actions_onwillupdate_action,
	myapplication_actions_service_initializeonline_action : myapplication_actions_service_initializeonline_action,
	myapplication_actions_service_initializeonlinefailuremessage_action : myapplication_actions_service_initializeonlinefailuremessage_action,
	myapplication_actions_service_initializeonlinesuccessmessage_action : myapplication_actions_service_initializeonlinesuccessmessage_action,
	myapplication_actions_updateentityfailuremessage_action : myapplication_actions_updateentityfailuremessage_action,
	myapplication_actions_updateentitysuccessmessage_action : myapplication_actions_updateentitysuccessmessage_action,
	myapplication_globals_appdefinition_version_global : myapplication_globals_appdefinition_version_global,
	myapplication_i18n_i18n_properties : myapplication_i18n_i18n_properties,
	myapplication_jsconfig_json : myapplication_jsconfig_json,
	myapplication_pages_authors_authors_create_page : myapplication_pages_authors_authors_create_page,
	myapplication_pages_authors_authors_createbooks_page : myapplication_pages_authors_authors_createbooks_page,
	myapplication_pages_authors_authors_detail_page : myapplication_pages_authors_authors_detail_page,
	myapplication_pages_authors_authors_edit_page : myapplication_pages_authors_authors_edit_page,
	myapplication_pages_authors_authors_list_page : myapplication_pages_authors_authors_list_page,
	myapplication_pages_books_books_create_page : myapplication_pages_books_books_create_page,
	myapplication_pages_books_books_detail_page : myapplication_pages_books_books_detail_page,
	myapplication_pages_books_books_edit_page : myapplication_pages_books_books_edit_page,
	myapplication_pages_books_books_list_page : myapplication_pages_books_books_list_page,
	myapplication_pages_main_page : myapplication_pages_main_page,
	myapplication_rules_appupdatefailure_js : myapplication_rules_appupdatefailure_js,
	myapplication_rules_appupdatesuccess_js : myapplication_rules_appupdatesuccess_js,
	myapplication_rules_authors_authors_cancel_js : myapplication_rules_authors_authors_cancel_js,
	myapplication_rules_authors_authors_createbooks_js : myapplication_rules_authors_authors_createbooks_js,
	myapplication_rules_authors_authors_createentity_js : myapplication_rules_authors_authors_createentity_js,
	myapplication_rules_authors_authors_deleteconfirmation_js : myapplication_rules_authors_authors_deleteconfirmation_js,
	myapplication_rules_authors_authors_updateentity_js : myapplication_rules_authors_authors_updateentity_js,
	myapplication_rules_authors_navtoauthors_createbooks_js : myapplication_rules_authors_navtoauthors_createbooks_js,
	myapplication_rules_authors_navtoauthors_edit_js : myapplication_rules_authors_navtoauthors_edit_js,
	myapplication_rules_books_books_cancel_js : myapplication_rules_books_books_cancel_js,
	myapplication_rules_books_books_createentity_js : myapplication_rules_books_books_createentity_js,
	myapplication_rules_books_books_deleteconfirmation_js : myapplication_rules_books_books_deleteconfirmation_js,
	myapplication_rules_books_books_updateentity_js : myapplication_rules_books_books_updateentity_js,
	myapplication_rules_books_navtobooks_edit_js : myapplication_rules_books_navtobooks_edit_js,
	myapplication_rules_onwillupdate_js : myapplication_rules_onwillupdate_js,
	myapplication_rules_resetappsettingsandlogout_js : myapplication_rules_resetappsettingsandlogout_js,
	myapplication_services_service1_service : myapplication_services_service1_service,
	myapplication_styles_styles_css : myapplication_styles_styles_css,
	myapplication_styles_styles_json : myapplication_styles_styles_json,
	myapplication_styles_styles_less : myapplication_styles_styles_less,
	myapplication_styles_styles_nss : myapplication_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MyApplication/Styles/Styles.css":
/*!***********************************************************!*\
  !*** ./build.definitions/MyApplication/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MyApplication/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MyApplication/Styles/Styles.less":
/*!************************************************************!*\
  !*** ./build.definitions/MyApplication/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MyApplication/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MyApplication/Styles/Styles.nss":
/*!***********************************************************!*\
  !*** ./build.definitions/MyApplication/Styles/Styles.nss ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/cssWithMappingToString.js */ "../../../../css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/cssWithMappingToString.js":
/*!*********************************************************************!*\
  !*** ../../../../css-loader/dist/runtime/cssWithMappingToString.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Authors/Authors_Create.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Authors/Authors_Create.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MyApplication/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MyApplication/Rules/Authors/Authors_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Authors Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Authors_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Authors/Authors_CreateBooks.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Authors/Authors_CreateBooks.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MyApplication/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MyApplication/Rules/Authors/Authors_CreateBooks.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Books","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Authors_CreateBooks","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Authors/Authors_Detail.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Authors/Authors_Detail.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Authors Detail","DesignTimeTarget":{"Service":"/MyApplication/Services/service1.service","EntitySet":"Authors","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MyApplication/Rules/Authors/NavToAuthors_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MyApplication/Actions/Authors/Authors_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"","BodyText":"","Footnote":"","Description":"","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Name","Value":"{Name}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"books"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"","SubstatusText":"","OnPress":"/MyApplication/Actions/Books/NavToBooks_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/books","Service":"/MyApplication/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Books"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Authors_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Authors/Authors_Edit.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Authors/Authors_Edit.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Authors Detail","DesignTimeTarget":{"Service":"/MyApplication/Services/service1.service","EntitySet":"Authors","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/MyApplication/Rules/Authors/Authors_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/MyApplication/Rules/Authors/Authors_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Authors_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Authors/Authors_List.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Authors/Authors_List.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Authors","ActionBar":{"Items":[{"OnPress":"/MyApplication/Actions/Authors/NavToAuthors_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MyApplication/Actions/Authors/NavToAuthors_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Authors","Service":"/MyApplication/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Authors_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Books/Books_Create.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Books/Books_Create.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MyApplication/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MyApplication/Rules/Books/Books_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Books Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Books_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Books/Books_Detail.page":
/*!***********************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Books/Books_Detail.page ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Books Detail","DesignTimeTarget":{"Service":"/MyApplication/Services/service1.service","EntitySet":"Books","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MyApplication/Rules/Books/NavToBooks_Edit.js","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MyApplication/Rules/Books/Books_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{Name}","Subhead":"","BodyText":"","Footnote":"","Description":"","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Name","Value":"{Name}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Books_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Books/Books_Edit.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Books/Books_Edit.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Books Detail","DesignTimeTarget":{"Service":"/MyApplication/Services/service1.service","EntitySet":"Books","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","Caption":"Cancel","OnPress":"/MyApplication/Rules/Books/Books_Cancel.js"},{"Position":"Right","SystemItem":"Save","OnPress":"/MyApplication/Rules/Books/Books_UpdateEntity.js"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Books_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Books/Books_List.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Books/Books_List.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Books","ActionBar":{"Items":[{"OnPress":"/MyApplication/Actions/Books/NavToBooks_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MyApplication/Actions/Books/NavToBooks_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Books","Service":"/MyApplication/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Books_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApplication/Pages/Main.page":
/*!*********************************************************!*\
  !*** ./build.definitions/MyApplication/Pages/Main.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MyApplication/Actions/Authors/NavToAuthors_List.action","Alignment":"Center","Title":"Authors","ButtonType":"Text","Semantic":"Normal"},{"OnPress":"/MyApplication/Actions/Books/NavToBooks_List.action","Alignment":"Center","Title":"Books","ButtonType":"Text","Semantic":"Normal"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MyApplication/Actions/LogoutMessage.action"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/MyApplication/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MyApplication","Version":"/MyApplication/Globals/AppDefinition_Version.global","MainPage":"/MyApplication/Pages/Main.page","OnLaunch":["/MyApplication/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MyApplication/Rules/OnWillUpdate.js","OnDidUpdate":"/MyApplication/Actions/Service/InitializeOnline.action","Styles":"/MyApplication/Styles/Styles.less","Localization":"/MyApplication/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MyApplication/Styles/Styles.css","ios":"/MyApplication/Styles/Styles.nss","android":"/MyApplication/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/AppUpdate.action":
/*!******************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/AppUpdate.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MyApplication/Rules/AppUpdateFailure.js","OnSuccess":"/MyApplication/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/AppUpdateFailureMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/AppUpdateFailureMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/AppUpdateProgressBanner.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/AppUpdateProgressBanner.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MyApplication/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/AppUpdateSuccessMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/AppUpdateSuccessMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/Authors_CreateBooks.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/Authors_CreateBooks.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"books","Target":{"EntitySet":"Authors","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MyApplication/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MyApplication/Actions/CreateEntitySuccessMessage.action","Properties":{"Name":"#Control:Name/#Value"},"Target":{"EntitySet":"Books","Service":"/MyApplication/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/Authors_CreateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/Authors_CreateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MyApplication/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MyApplication/Actions/CreateEntitySuccessMessage.action","Properties":{"Name":"#Control:Name/#Value"},"Target":{"EntitySet":"Authors","Service":"/MyApplication/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/Authors_DeleteEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/Authors_DeleteEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Authors","Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MyApplication/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MyApplication/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/Authors_DetailPopover.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/Authors_DetailPopover.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Books","OnPress":"/MyApplication/Rules/Authors/NavToAuthors_CreateBooks.js"},{"Title":"Delete","OnPress":"/MyApplication/Rules/Authors/Authors_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/Authors_UpdateEntity.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/Authors_UpdateEntity.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Authors","Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"Name":"#Control:Name/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MyApplication/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MyApplication/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Create.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Create.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyApplication/Pages/Authors/Authors_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/NavToAuthors_CreateBooks.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyApplication/Pages/Authors/Authors_CreateBooks.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Detail.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Detail.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApplication/Pages/Authors/Authors_Detail.page"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Edit.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/NavToAuthors_Edit.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyApplication/Pages/Authors/Authors_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Authors/NavToAuthors_List.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Authors/NavToAuthors_List.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApplication/Pages/Authors/Authors_List.page"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/Books_CreateEntity.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/Books_CreateEntity.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MyApplication/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MyApplication/Actions/CreateEntitySuccessMessage.action","Properties":{"Name":"#Control:Name/#Value"},"Target":{"EntitySet":"Books","Service":"/MyApplication/Services/service1.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/Books_DeleteEntity.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/Books_DeleteEntity.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Books","Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MyApplication/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MyApplication/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/Books_UpdateEntity.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/Books_UpdateEntity.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Books","Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"Properties":{"Name":"#Control:Name/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MyApplication/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MyApplication/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/NavToBooks_Create.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/NavToBooks_Create.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyApplication/Pages/Books/Books_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/NavToBooks_Detail.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/NavToBooks_Detail.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApplication/Pages/Books/Books_Detail.page"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/NavToBooks_Edit.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/NavToBooks_Edit.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MyApplication/Pages/Books/Books_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Books/NavToBooks_List.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Books/NavToBooks_List.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApplication/Pages/Books/Books_List.page"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/ClosePage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/CreateEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/CreateEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/CreateEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/CreateEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MyApplication/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/DeleteConfirmation.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/DeleteConfirmation.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/DeleteEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/DeleteEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/DeleteEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/DeleteEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MyApplication/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/DraftDiscardEntity.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/DraftDiscardEntity.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Discard","Target":{"Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MyApplication/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Discarded"}},"OnFailure":"/MyApplication/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/DraftEditEntity.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/DraftEditEntity.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Edit","Target":{"Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MyApplication/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Edit"}},"OnFailure":"/MyApplication/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/DraftSaveEntity.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/DraftSaveEntity.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DraftEnabled.Save","Target":{"Service":"/MyApplication/Services/service1.service","ReadLink":"{@odata.readLink}"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"update"},"OnSuccess":{"Name":"/MyApplication/Actions/UpdateEntitySuccessMessage.action","Properties":{"Message":"Draft Saved"}},"OnFailure":"/MyApplication/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Logout.action":
/*!***************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Logout.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/LogoutMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/LogoutMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MyApplication/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/OnWillUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/OnWillUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Service/InitializeOnline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Service/InitializeOnline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MyApplication/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MyApplication/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MyApplication/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Service/InitializeOnlineFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/UpdateEntityFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/UpdateEntityFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Actions/UpdateEntitySuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MyApplication/Actions/UpdateEntitySuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MyApplication/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApplication/Globals/AppDefinition_Version.global":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyApplication/Globals/AppDefinition_Version.global ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MyApplication/Services/service1.service":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyApplication/Services/service1.service ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/Test/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/MyApplication/Styles/Styles.json":
/*!************************************************************!*\
  !*** ./build.definitions/MyApplication/Styles/Styles.json ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MyApplication/jsconfig.json":
/*!*******************************************************!*\
  !*** ./build.definitions/MyApplication/jsconfig.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map