"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[714],{7714:function(e,n,t){t.d(n,{Z:function(){return z}});var r,o,a,c,i,u,l=function(){return(l=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)};function d(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>n.indexOf(r)&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)0>n.indexOf(r[o])&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]]);return t}"function"==typeof SuppressedError&&SuppressedError;var s=t(13920),f="right-scroll-bar-position",h="width-before-scroll-bar",p=(void 0===r&&(r={}),(void 0===o&&(o=function(e){return e}),a=[],c=!1,i={read:function(){if(c)throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return a.length?a[a.length-1]:null},useMedium:function(e){var n=o(e,c);return a.push(n),function(){a=a.filter(function(e){return e!==n})}},assignSyncMedium:function(e){for(c=!0;a.length;){var n=a;a=[],n.forEach(e)}a={push:function(n){return e(n)},filter:function(){return a}}},assignMedium:function(e){c=!0;var n=[];if(a.length){var t=a;a=[],t.forEach(e),n=a}var r=function(){var t=n;n=[],t.forEach(e)},o=function(){return Promise.resolve().then(r)};o(),a={push:function(e){n.push(e),o()},filter:function(e){return n=n.filter(e),a}}}}).options=l({async:!0,ssr:!1},r),i),v=function(){},m=s.forwardRef(function(e,n){var t,r,o,a=s.useRef(null),c=s.useState({onScrollCapture:v,onWheelCapture:v,onTouchMoveCapture:v}),i=c[0],u=c[1],f=e.forwardProps,h=e.children,m=e.className,g=e.removeScrollBar,y=e.enabled,w=e.shards,b=e.sideCar,E=e.noIsolation,C=e.inert,S=e.allowPinchZoom,k=e.as,R=void 0===k?"div":k,M=e.gapMode,x=d(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),L=(t=[a,n],r=function(e){return t.forEach(function(n){return"function"==typeof n?n(e):n&&(n.current=e),n})},(o=(0,s.useState)(function(){return{value:null,callback:r,facade:{get current(){return o.value},set current(value){var e=o.value;e!==value&&(o.value=value,o.callback(value,e))}}}})[0]).callback=r,o.facade),N=l(l({},x),i);return s.createElement(s.Fragment,null,y&&s.createElement(b,{sideCar:p,removeScrollBar:g,shards:w,noIsolation:E,inert:C,setCallbacks:u,allowPinchZoom:!!S,lockRef:a,gapMode:M}),f?s.cloneElement(s.Children.only(h),l(l({},N),{ref:L})):s.createElement(R,l({},N,{className:m,ref:L}),h))});m.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},m.classNames={fullWidth:h,zeroRight:f};var g=function(e){var n=e.sideCar,t=d(e,["sideCar"]);if(!n)throw Error("Sidecar: please provide `sideCar` property to import the right car");var r=n.read();if(!r)throw Error("Sidecar medium not found");return s.createElement(r,l({},t))};g.isSideCarExport=!0;var y=function(){var e=0,n=null;return{add:function(r){if(0==e&&(n=function(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var n=u||t.nc;return n&&e.setAttribute("nonce",n),e}())){var o,a;(o=n).styleSheet?o.styleSheet.cssText=r:o.appendChild(document.createTextNode(r)),a=n,(document.head||document.getElementsByTagName("head")[0]).appendChild(a)}e++},remove:function(){--e||!n||(n.parentNode&&n.parentNode.removeChild(n),n=null)}}},w=function(){var e=y();return function(n,t){s.useEffect(function(){return e.add(n),function(){e.remove()}},[n&&t])}},b=function(){var e=w();return function(n){return e(n.styles,n.dynamic),null}},E={left:0,top:0,right:0,gap:0},C=function(e){return parseInt(e||"",10)||0},S=function(e){var n=window.getComputedStyle(document.body),t=n["padding"===e?"paddingLeft":"marginLeft"],r=n["padding"===e?"paddingTop":"marginTop"],o=n["padding"===e?"paddingRight":"marginRight"];return[C(t),C(r),C(o)]},k=function(e){if(void 0===e&&(e="margin"),"undefined"==typeof window)return E;var n=S(e),t=document.documentElement.clientWidth,r=window.innerWidth;return{left:n[0],top:n[1],right:n[2],gap:Math.max(0,r-t+n[2]-n[0])}},R=b(),M=function(e,n,t,r){var o=e.left,a=e.top,c=e.right,i=e.gap;return void 0===t&&(t="margin"),"\n  .".concat("with-scroll-bars-hidden"," {\n   overflow: hidden ").concat(r,";\n   padding-right: ").concat(i,"px ").concat(r,";\n  }\n  body {\n    overflow: hidden ").concat(r,";\n    overscroll-behavior: contain;\n    ").concat([n&&"position: relative ".concat(r,";"),"margin"===t&&"\n    padding-left: ".concat(o,"px;\n    padding-top: ").concat(a,"px;\n    padding-right: ").concat(c,"px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(i,"px ").concat(r,";\n    "),"padding"===t&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),"\n  }\n  \n  .").concat(f," {\n    right: ").concat(i,"px ").concat(r,";\n  }\n  \n  .").concat(h," {\n    margin-right: ").concat(i,"px ").concat(r,";\n  }\n  \n  .").concat(f," .").concat(f," {\n    right: 0 ").concat(r,";\n  }\n  \n  .").concat(h," .").concat(h," {\n    margin-right: 0 ").concat(r,";\n  }\n  \n  body {\n    ").concat("--removed-body-scroll-bar-size",": ").concat(i,"px;\n  }\n")},x=function(e){var n=e.noRelative,t=e.noImportant,r=e.gapMode,o=void 0===r?"margin":r,a=s.useMemo(function(){return k(o)},[o]);return s.createElement(R,{styles:M(a,!n,o,t?"":"!important")})},L=!1;if("undefined"!=typeof window)try{var N=Object.defineProperty({},"passive",{get:function(){return L=!0,!0}});window.addEventListener("test",N,N),window.removeEventListener("test",N,N)}catch(e){L=!1}var T=!!L&&{passive:!1},O=function(e,n){var t=window.getComputedStyle(e);return"hidden"!==t[n]&&!(t.overflowY===t.overflowX&&"TEXTAREA"!==e.tagName&&"visible"===t[n])},P=function(e,n){var t=n.ownerDocument,r=n;do{if("undefined"!=typeof ShadowRoot&&r instanceof ShadowRoot&&(r=r.host),B(e,r)){var o=j(e,r);if(o[1]>o[2])return!0}r=r.parentNode}while(r&&r!==t.body);return!1},B=function(e,n){return"v"===e?O(n,"overflowY"):O(n,"overflowX")},j=function(e,n){return"v"===e?[n.scrollTop,n.scrollHeight,n.clientHeight]:[n.scrollLeft,n.scrollWidth,n.clientWidth]},I=function(e,n,t,r,o){var a,c=(a=window.getComputedStyle(n).direction,"h"===e&&"rtl"===a?-1:1),i=c*r,u=t.target,l=n.contains(u),d=!1,s=i>0,f=0,h=0;do{var p=j(e,u),v=p[0],m=p[1]-p[2]-c*v;(v||m)&&B(e,u)&&(f+=m,h+=v),u=u.parentNode}while(!l&&u!==document.body||l&&(n.contains(u)||n===u));return s&&(o&&0===f||!o&&i>f)?d=!0:!s&&(o&&0===h||!o&&-i>h)&&(d=!0),d},W=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},X=function(e){return[e.deltaX,e.deltaY]},Y=function(e){return e&&"current"in e?e.current:e},A=0,Z=[],_=(p.useMedium(function(e){var n=s.useRef([]),t=s.useRef([0,0]),r=s.useRef(),o=s.useState(A++)[0],a=s.useState(b)[0],c=s.useRef(e);s.useEffect(function(){c.current=e},[e]),s.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var n=(function(e,n,t){if(t||2==arguments.length)for(var r,o=0,a=n.length;o<a;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))})([e.lockRef.current],(e.shards||[]).map(Y),!0).filter(Boolean);return n.forEach(function(e){return e.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),n.forEach(function(e){return e.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var i=s.useCallback(function(e,n){if("touches"in e&&2===e.touches.length)return!c.current.allowPinchZoom;var o,a=W(e),i=t.current,u="deltaX"in e?e.deltaX:i[0]-a[0],l="deltaY"in e?e.deltaY:i[1]-a[1],d=e.target,s=Math.abs(u)>Math.abs(l)?"h":"v";if("touches"in e&&"h"===s&&"range"===d.type)return!1;var f=P(s,d);if(!f)return!0;if(f?o=s:(o="v"===s?"h":"v",f=P(s,d)),!f)return!1;if(!r.current&&"changedTouches"in e&&(u||l)&&(r.current=o),!o)return!0;var h=r.current||o;return I(h,n,e,"h"===h?u:l,!0)},[]),u=s.useCallback(function(e){if(Z.length&&Z[Z.length-1]===a){var t="deltaY"in e?X(e):W(e),r=n.current.filter(function(n){var r;return n.name===e.type&&n.target===e.target&&(r=n.delta)[0]===t[0]&&r[1]===t[1]})[0];if(r&&r.should){e.cancelable&&e.preventDefault();return}if(!r){var o=(c.current.shards||[]).map(Y).filter(Boolean).filter(function(n){return n.contains(e.target)});(o.length>0?i(e,o[0]):!c.current.noIsolation)&&e.cancelable&&e.preventDefault()}}},[]),l=s.useCallback(function(e,t,r,o){var a={name:e,delta:t,target:r,should:o};n.current.push(a),setTimeout(function(){n.current=n.current.filter(function(e){return e!==a})},1)},[]),d=s.useCallback(function(e){t.current=W(e),r.current=void 0},[]),f=s.useCallback(function(n){l(n.type,X(n),n.target,i(n,e.lockRef.current))},[]),h=s.useCallback(function(n){l(n.type,W(n),n.target,i(n,e.lockRef.current))},[]);s.useEffect(function(){return Z.push(a),e.setCallbacks({onScrollCapture:f,onWheelCapture:f,onTouchMoveCapture:h}),document.addEventListener("wheel",u,T),document.addEventListener("touchmove",u,T),document.addEventListener("touchstart",d,T),function(){Z=Z.filter(function(e){return e!==a}),document.removeEventListener("wheel",u,T),document.removeEventListener("touchmove",u,T),document.removeEventListener("touchstart",d,T)}},[]);var p=e.removeScrollBar,v=e.inert;return s.createElement(s.Fragment,null,v?s.createElement(a,{styles:"\n  .block-interactivity-".concat(o," {pointer-events: none;}\n  .allow-interactivity-").concat(o," {pointer-events: all;}\n")}):null,p?s.createElement(x,{gapMode:e.gapMode}):null)}),g),D=s.forwardRef(function(e,n){return s.createElement(m,l({},e,{ref:n,sideCar:_}))});D.classNames=m.classNames;var z=D}}]);