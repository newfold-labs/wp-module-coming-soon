/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sitePreviewPortal/comingSoon/index.js":
/*!***************************************************!*\
  !*** ./src/sitePreviewPortal/comingSoon/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComingSoon: () => (/* binding */ ComingSoon)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@newfold/ui-component-library'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _sitePreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sitePreview */ "./src/sitePreviewPortal/sitePreview/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style.scss */ "./src/sitePreviewPortal/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);







const ComingSoon = () => {
  const [isComingSoonEnabled, setIsComingSoonEnabled] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(window.NewfoldComingSoonPortal.isComingSoon);
  const viewUrl = window.NewfoldComingSoonPortal.viewUrl;
  const editUrl = window.NewfoldComingSoonPortal.editUrl;
  const previewUrl = window.NewfoldComingSoonPortal.previewUrl;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    window.NewfoldRuntime.comingSoon.isEnabled().then(isEnabled => {
      setIsComingSoonEnabled(isEnabled);
    });
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
    className: "coming-soon-fill nfd-app-section-content",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "nfd-coming-soon-content md:nfd-flex-row-reverse",
      "data-cy": "nfd-coming-soon-content",
      "data-coming-soon": isComingSoonEnabled ? 'true' : 'false',
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "nfd-flex nfd-flex-col nfd-gap-2 nfd-w-full md:nfd-w-1/2",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_sitePreview__WEBPACK_IMPORTED_MODULE_3__.SitePreview, {
          isComingSoonEnabled: isComingSoonEnabled,
          viewUrl: viewUrl,
          previewUrl: previewUrl
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "nfd-flex nfd-flex-col nfd-gap-2 nfd-w-full md:nfd-w-1/2",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@newfold/ui-component-library'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
          size: 2,
          as: "h2",
          className: "nfd-text-2xl nfd-mb-4 nfd-mt-4",
          children: !isComingSoonEnabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your website is live to the world!', 'wp-module-coming-soon') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your website is currently displaying a "Coming Soon" page.', 'wp-module-coming-soon')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "nfd-flex nfd-flex-row nfd-gap-4 nfd-mb-4 nfd-flex-wrap",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@newfold/ui-component-library'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            as: "a",
            "data-cy": "nfd-view-site",
            href: window.NewfoldRuntime?.linkTracker?.addUtmParams(viewUrl) || viewUrl,
            target: "_blank",
            variant: "secondary",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View', 'wp-module-coming-soon')]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@newfold/ui-component-library'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            as: "a",
            "data-cy": "nfd-edit-site",
            href: window.NewfoldRuntime?.linkTracker?.addUtmParams(editUrl) || editUrl,
            variant: "secondary",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit', 'wp-module-coming-soon')]
          }), !isComingSoonEnabled ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@newfold/ui-component-library'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            "data-cy": "nfd-coming-soon-enable",
            onClick: () => {
              window.NewfoldRuntime.comingSoon.enable().then(response => {
                setIsComingSoonEnabled(response.comingSoon);
              });
            },
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not ready to share it?', 'wp-module-coming-soon'),
            variant: "primary",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Coming Soon', 'wp-module-coming-soon')]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@newfold/ui-component-library'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
            "data-cy": "nfd-coming-soon-disable",
            onClick: () => {
              window.NewfoldRuntime.comingSoon.disable().then(response => {
                setIsComingSoonEnabled(response.comingSoon);
              });
            },
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ready to publish?', 'wp-module-coming-soon'),
            variant: "upsell",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Launch Site', 'wp-module-coming-soon')]
          })]
        })]
      })]
    })
  });
};

/***/ }),

/***/ "./src/sitePreviewPortal/portal/index.js":
/*!***********************************************!*\
  !*** ./src/sitePreviewPortal/portal/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComingSoonPortalApp: () => (/* binding */ ComingSoonPortalApp)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _comingSoon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../comingSoon */ "./src/sitePreviewPortal/comingSoon/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const ComingSoonPortalApp = () => {
  const [container, setContainer] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  console.log('comingSoonPortalApp component');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const registry = window.NFDPortalRegistry;
    // Check for required registry
    if (!registry) {
      return;
    }
    const updateContainer = el => {
      setContainer(el);
    };
    const clearContainer = () => {
      setContainer(null);
    };

    // Subscribe to portal readiness updates
    registry.onReady('coming-soon', updateContainer);
    registry.onRemoved('coming-soon', clearContainer);

    // Immediately try to get the container if already registered
    const current = registry.getElement('coming-soon');
    if (current) {
      updateContainer(current);
    }
  }, [container]);
  if (!container) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createPortal)(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_comingSoon__WEBPACK_IMPORTED_MODULE_1__.ComingSoon, {}), container);
};

/***/ }),

/***/ "./src/sitePreviewPortal/sitePreview/index.js":
/*!****************************************************!*\
  !*** ./src/sitePreviewPortal/sitePreview/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SitePreview: () => (/* binding */ SitePreview)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style.scss */ "./src/sitePreviewPortal/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const SitePreview = ({
  isComingSoonEnabled,
  viewUrl,
  previewUrl
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    id: "iframe-preview-wrap",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      id: "iframe-preview-label",
      className: "nfd-flex nfd-justify-center nfd-items-center nfd-p-1 nfd-bg-gray-200 nfd-border-b nfd-border-[#dbd1d1] nfd-z-10",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        className: "nfd-font-bold",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Site Preview', 'wp-module-coming-soon')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "iframe-wrap",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("iframe", {
        className: `nfd-iframe ${isComingSoonEnabled ? 'nfd-iframe-coming-soon' : 'nfd-iframe-live'}`,
        id: "iframe-preview",
        name: "iframe-preview",
        sandbox: "allow-scripts allow-same-origin",
        seamless: true,
        scrolling: "no",
        src: !isComingSoonEnabled ? viewUrl : previewUrl,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Site Preview', 'wp-module-coming-soon')
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "nfd-flex nfd-justify-between nfd-items-center nfd-p-1 nfd-px-6 nfd-bg-gray-200 nfd-border-t nfd-border-[#dbd1d1] nfd-z-10",
      id: "iframe-preview-detail",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
        className: "iframe-preview-domain nfd-font-semibold",
        children: viewUrl
      }), isComingSoonEnabled ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
        className: "iframe-preview-status status-coming-soon nfd-flex nfd-flex-row nfd-items-center nfd-gap-2 nfd-font-semibold",
        "data-cy": "iframe-preview-status-coming-soon",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Not Live', 'wp-module-coming-soon')]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
        className: "iframe-preview-status status-live nfd-flex nfd-flex-row nfd-items-center nfd-gap-2 nfd-font-semibold",
        "data-cy": "iframe-preview-status-live",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@heroicons/react/24/outline'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {}), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live', 'wp-module-coming-soon')]
      })]
    })]
  });
};

/***/ }),

/***/ "./src/sitePreviewPortal/style.scss":
/*!******************************************!*\
  !*** ./src/sitePreviewPortal/style.scss ***!
  \******************************************/
/***/ (() => {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nError: Cannot find module '@newfold/ui-component-library'\nRequire stack:\n- /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/tailwind.config.js\n    at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)\n    at Function.resolve (node:internal/modules/helpers:145:19)\n    at _resolve (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:246378)\n    at jiti (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:249092)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/tailwind.config.js:1:102\n    at evalModule (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:251913)\n    at jiti (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:249841)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/load-config.js:52:26\n    at loadConfig (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/load-config.js:62:6)\n    at getTailwindConfig (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:71:116)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:100:92\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/processTailwindFeatures.js:46:11\n    at plugins (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/plugin.js:38:69)\n    at LazyResult.runOnRoot (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss/lib/lazy-result.js:361:16)\n    at LazyResult.runAsync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss/lib/lazy-result.js:290:26)\n    at async Object.loader (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss-loader/dist/index.js:97:14)\n    at tryRunOrWebpackError (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/HookWebpackError.js:86:9)\n    at __webpack_require_module__ (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5464:12)\n    at __webpack_require__ (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5411:18)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5498:20\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/Hook.js:20:14)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5386:43\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3463:5)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5348:16\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3463:5)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5316:15\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3527:9)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5262:8\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:3677:6\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/HookWebpackError.js:67:2\n    at Hook.eval [as callAsync] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Cache.store (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:113:20)\n    at ItemCacheFacade.store (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/CacheFacade.js:142:15)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:3676:11\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:97:34\n    at Array.<anonymous> (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/cache/MemoryCachePlugin.js:46:13)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:97:19\n    at Hook.eval [as callAsync] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:19:1)\n    at Cache.get (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:81:18)\n    at ItemCacheFacade.get (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/CacheFacade.js:116:15)\n    at Compilation._codeGenerationModule (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:3644:9)\n    at codeGen (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5250:11)\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3463:5)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5280:14\n    at processQueue (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/util/processAsyncTree.js:61:4)\n    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)\n-- inner error --\nError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\nError: Cannot find module '@newfold/ui-component-library'\nRequire stack:\n- /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/tailwind.config.js\n    at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)\n    at Function.resolve (node:internal/modules/helpers:145:19)\n    at _resolve (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:246378)\n    at jiti (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:249092)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/tailwind.config.js:1:102\n    at evalModule (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:251913)\n    at jiti (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:249841)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/load-config.js:52:26\n    at loadConfig (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/load-config.js:62:6)\n    at getTailwindConfig (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:71:116)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:100:92\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/processTailwindFeatures.js:46:11\n    at plugins (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/plugin.js:38:69)\n    at LazyResult.runOnRoot (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss/lib/lazy-result.js:361:16)\n    at LazyResult.runAsync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss/lib/lazy-result.js:290:26)\n    at async Object.loader (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss-loader/dist/index.js:97:14)\n    at Object.<anonymous> (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[4].use[3]!/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/src/sitePreviewPortal/style.scss:1:7)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:518:10\n    at Hook.eval [as call] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at Hook.CALL_DELEGATE [as _call] (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/Hook.js:16:14)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5466:39\n    at tryRunOrWebpackError (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/HookWebpackError.js:81:7)\n    at __webpack_require_module__ (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5464:12)\n    at __webpack_require__ (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5411:18)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5498:20\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/Hook.js:20:14)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5386:43\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3463:5)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5348:16\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3485:9)\n    at timesSync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3463:5)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5316:15\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3527:9)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5262:8\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:3677:6\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/HookWebpackError.js:67:2\n    at Hook.eval [as callAsync] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Cache.store (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:113:20)\n    at ItemCacheFacade.store (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/CacheFacade.js:142:15)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:3676:11\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:97:34\n    at Array.<anonymous> (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/cache/MemoryCachePlugin.js:46:13)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:97:19\n    at Hook.eval [as callAsync] (eval at create (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:19:1)\n    at Cache.get (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Cache.js:81:18)\n    at ItemCacheFacade.get (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/CacheFacade.js:116:15)\n    at Compilation._codeGenerationModule (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:3644:9)\n    at codeGen (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5250:11)\n    at symbolIterator (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:2297:7)\n    at Object.eachLimit (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/neo-async/async.js:3463:5)\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/Compilation.js:5280:14\n    at processQueue (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/webpack/lib/util/processAsyncTree.js:61:4)\n    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)\n\nGenerated code for /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[4].use[1]!/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[4].use[2]!/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[4].use[3]!/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/src/sitePreviewPortal/style.scss\n1 | throw new Error(\"Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):\\nError: Cannot find module '@newfold/ui-component-library'\\nRequire stack:\\n- /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/tailwind.config.js\\n    at Function._resolveFilename (node:internal/modules/cjs/loader:1401:15)\\n    at Function.resolve (node:internal/modules/helpers:145:19)\\n    at _resolve (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:246378)\\n    at jiti (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:249092)\\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/tailwind.config.js:1:102\\n    at evalModule (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:251913)\\n    at jiti (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/jiti/dist/jiti.js:1:249841)\\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/load-config.js:52:26\\n    at loadConfig (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/load-config.js:62:6)\\n    at getTailwindConfig (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:71:116)\\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/lib/setupTrackingContext.js:100:92\\n    at /Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/processTailwindFeatures.js:46:11\\n    at plugins (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/tailwindcss/lib/plugin.js:38:69)\\n    at LazyResult.runOnRoot (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss/lib/lazy-result.js:361:16)\\n    at LazyResult.runAsync (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss/lib/lazy-result.js:290:26)\\n    at async Object.loader (/Users/carlosrodriguez/Local Sites/solutions/app/public/wp-content/plugins/wp-module-coming-soon/node_modules/postcss-loader/dist/index.js:97:14)\");");

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************************!*\
  !*** ./src/sitePreviewPortal/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _portal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./portal */ "./src/sitePreviewPortal/portal/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const WP_COMINGSOON_FILL_ELEMENT = 'nfd-coming-soon-portal';
let root = null;
const App = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_portal__WEBPACK_IMPORTED_MODULE_2__.ComingSoonPortalApp, {});
};
const ComingSoonPortalAppRender = () => {
  const DOM_ELEMENT = document.getElementById(WP_COMINGSOON_FILL_ELEMENT);
  if (null !== DOM_ELEMENT) {
    if ('undefined' !== typeof _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot) {
      if (!root) {
        root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(DOM_ELEMENT);
      }
      root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(App, {}));
    }
  }
};
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(ComingSoonPortalAppRender);
})();

((window.newfold = window.newfold || {}).ComingSoon = window.newfold.ComingSoon || {}).sitePreviewPortal = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=bundle.js.map