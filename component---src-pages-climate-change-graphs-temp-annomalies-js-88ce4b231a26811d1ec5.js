(window.webpackJsonp=window.webpackJsonp||[]).push([[21,23],{"7NYn":function(n,r,t){"use strict";function e(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);return n.text()}r.a=function(n,r){return fetch(n,r).then(e)}},"NRL+":function(n,r,t){"use strict";var e={},u={};function o(n){return new Function("d","return {"+n.map((function(n,r){return JSON.stringify(n)+": d["+r+'] || ""'})).join(",")+"}")}function i(n){var r=Object.create(null),t=[];return n.forEach((function(n){for(var e in n)e in r||t.push(r[e]=e)})),t}function a(n,r){var t=n+"",e=t.length;return e<r?new Array(r-e+1).join(0)+t:t}function f(n){var r,t=n.getUTCHours(),e=n.getUTCMinutes(),u=n.getUTCSeconds(),o=n.getUTCMilliseconds();return isNaN(n)?"Invalid Date":((r=n.getUTCFullYear())<0?"-"+a(-r,6):r>9999?"+"+a(r,6):a(r,4))+"-"+a(n.getUTCMonth()+1,2)+"-"+a(n.getUTCDate(),2)+(o?"T"+a(t,2)+":"+a(e,2)+":"+a(u,2)+"."+a(o,3)+"Z":u?"T"+a(t,2)+":"+a(e,2)+":"+a(u,2)+"Z":e||t?"T"+a(t,2)+":"+a(e,2)+"Z":"")}r.a=function(n){var r=new RegExp('["'+n+"\n\r]"),t=n.charCodeAt(0);function a(n,r){var o,i=[],a=n.length,f=0,c=0,l=a<=0,h=!1;function s(){if(l)return u;if(h)return h=!1,e;var r,o,i=f;if(34===n.charCodeAt(i)){for(;f++<a&&34!==n.charCodeAt(f)||34===n.charCodeAt(++f););return(r=f)>=a?l=!0:10===(o=n.charCodeAt(f++))?h=!0:13===o&&(h=!0,10===n.charCodeAt(f)&&++f),n.slice(i+1,r-1).replace(/""/g,'"')}for(;f<a;){if(10===(o=n.charCodeAt(r=f++)))h=!0;else if(13===o)h=!0,10===n.charCodeAt(f)&&++f;else if(o!==t)continue;return n.slice(i,r)}return l=!0,n.slice(i,a)}for(10===n.charCodeAt(a-1)&&--a,13===n.charCodeAt(a-1)&&--a;(o=s())!==u;){for(var d=[];o!==e&&o!==u;)d.push(o),o=s();r&&null==(d=r(d,c++))||i.push(d)}return i}function c(r,t){return r.map((function(r){return t.map((function(n){return h(r[n])})).join(n)}))}function l(r){return r.map(h).join(n)}function h(n){return null==n?"":n instanceof Date?f(n):r.test(n+="")?'"'+n.replace(/"/g,'""')+'"':n}return{parse:function(n,r){var t,e,u=a(n,(function(n,u){if(t)return t(n,u-1);e=n,t=r?function(n,r){var t=o(n);return function(e,u){return r(t(e),u,n)}}(n,r):o(n)}));return u.columns=e||[],u},parseRows:a,format:function(r,t){return null==t&&(t=i(r)),[t.map(h).join(n)].concat(c(r,t)).join("\n")},formatBody:function(n,r){return null==r&&(r=i(n)),c(n,r).join("\n")},formatRows:function(n){return n.map(l).join("\n")},formatRow:l,formatValue:h}}},vBe5:function(n,r,t){"use strict";t.d(r,"b",(function(){return a})),t.d(r,"a",(function(){return e})),t.d(r,"c",(function(){return u})),t.d(r,"d",(function(){return f})),t.d(r,"e",(function(){return C})),t.d(r,"f",(function(){return w})),t.d(r,"g",(function(){return h})),t.d(r,"h",(function(){return N})),t.d(r,"k",(function(){return M})),t.d(r,"i",(function(){return p})),t.d(r,"j",(function(){return g}));var e=function(n,r){return n<r?-1:n>r?1:n>=r?0:NaN},u=function(n){var r;return 1===n.length&&(r=n,n=function(n,t){return e(r(n),t)}),{left:function(r,t,e,u){for(null==e&&(e=0),null==u&&(u=r.length);e<u;){var o=e+u>>>1;n(r[o],t)<0?e=o+1:u=o}return e},right:function(r,t,e,u){for(null==e&&(e=0),null==u&&(u=r.length);e<u;){var o=e+u>>>1;n(r[o],t)>0?u=o:e=o+1}return e}}};var o=u(e),i=o.right,a=(o.left,i);var f=function(n,r){return r<n?-1:r>n?1:r>=n?0:NaN},c=function(n){return null===n?NaN:+n},l=Array.prototype,h=(l.slice,l.map,function(n,r,t){n=+n,r=+r,t=(u=arguments.length)<2?(r=n,n=0,1):u<3?1:+t;for(var e=-1,u=0|Math.max(0,Math.ceil((r-n)/t)),o=new Array(u);++e<u;)o[e]=n+e*t;return o}),s=Math.sqrt(50),d=Math.sqrt(10),v=Math.sqrt(2),M=function(n,r,t){var e,u,o,i,a=-1;if(t=+t,(n=+n)===(r=+r)&&t>0)return[n];if((e=r<n)&&(u=n,n=r,r=u),0===(i=p(n,r,t))||!isFinite(i))return[];if(i>0)for(n=Math.ceil(n/i),r=Math.floor(r/i),o=new Array(u=Math.ceil(r-n+1));++a<u;)o[a]=(n+a)*i;else for(n=Math.floor(n*i),r=Math.ceil(r*i),o=new Array(u=Math.ceil(n-r+1));++a<u;)o[a]=(n-a)/i;return e&&o.reverse(),o};function p(n,r,t){var e=(r-n)/Math.max(0,t),u=Math.floor(Math.log(e)/Math.LN10),o=e/Math.pow(10,u);return u>=0?(o>=s?10:o>=d?5:o>=v?2:1)*Math.pow(10,u):-Math.pow(10,-u)/(o>=s?10:o>=d?5:o>=v?2:1)}function g(n,r,t){var e=Math.abs(r-n)/Math.max(0,t),u=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),o=e/u;return o>=s?u*=10:o>=d?u*=5:o>=v&&(u*=2),r<n?-u:u}t("ToJy");var w=function(n,r,t){if(null==t&&(t=c),e=n.length){if((r=+r)<=0||e<2)return+t(n[0],0,n);if(r>=1)return+t(n[e-1],e-1,n);var e,u=(e-1)*r,o=Math.floor(u),i=+t(n[o],o,n);return i+(+t(n[o+1],o+1,n)-i)*(u-o)}},C=function(n,r){var t,e=n.length,u=e,o=-1,i=0;if(null==r)for(;++o<e;)isNaN(t=c(n[o]))?--u:i+=t;else for(;++o<e;)isNaN(t=c(r(n[o],o,n)))?--u:i+=t;if(u)return i/u},N=function(n,r){var t,e=n.length,u=-1,o=0;if(null==r)for(;++u<e;)(t=+n[u])&&(o+=t);else for(;++u<e;)(t=+r(n[u],u,n))&&(o+=t);return o}}}]);
//# sourceMappingURL=component---src-pages-climate-change-graphs-temp-annomalies-js-88ce4b231a26811d1ec5.js.map