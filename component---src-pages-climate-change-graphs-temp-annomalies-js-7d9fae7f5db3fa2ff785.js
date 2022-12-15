(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"NRL+":function(t,n,e){"use strict";var r={},a={};function o(t){return new Function("d","return {"+t.map((function(t,n){return JSON.stringify(t)+": d["+n+'] || ""'})).join(",")+"}")}function i(t){var n=Object.create(null),e=[];return t.forEach((function(t){for(var r in t)r in n||e.push(n[r]=r)})),e}function u(t,n){var e=t+"",r=e.length;return r<n?new Array(n-r+1).join(0)+e:e}function c(t){var n,e=t.getUTCHours(),r=t.getUTCMinutes(),a=t.getUTCSeconds(),o=t.getUTCMilliseconds();return isNaN(t)?"Invalid Date":((n=t.getUTCFullYear())<0?"-"+u(-n,6):n>9999?"+"+u(n,6):u(n,4))+"-"+u(t.getUTCMonth()+1,2)+"-"+u(t.getUTCDate(),2)+(o?"T"+u(e,2)+":"+u(r,2)+":"+u(a,2)+"."+u(o,3)+"Z":a?"T"+u(e,2)+":"+u(r,2)+":"+u(a,2)+"Z":r||e?"T"+u(e,2)+":"+u(r,2)+"Z":"")}n.a=function(t){var n=new RegExp('["'+t+"\n\r]"),e=t.charCodeAt(0);function u(t,n){var o,i=[],u=t.length,c=0,l=0,f=u<=0,s=!1;function h(){if(f)return a;if(s)return s=!1,r;var n,o,i=c;if(34===t.charCodeAt(i)){for(;c++<u&&34!==t.charCodeAt(c)||34===t.charCodeAt(++c););return(n=c)>=u?f=!0:10===(o=t.charCodeAt(c++))?s=!0:13===o&&(s=!0,10===t.charCodeAt(c)&&++c),t.slice(i+1,n-1).replace(/""/g,'"')}for(;c<u;){if(10===(o=t.charCodeAt(n=c++)))s=!0;else if(13===o)s=!0,10===t.charCodeAt(c)&&++c;else if(o!==e)continue;return t.slice(i,n)}return f=!0,t.slice(i,u)}for(10===t.charCodeAt(u-1)&&--u,13===t.charCodeAt(u-1)&&--u;(o=h())!==a;){for(var m=[];o!==r&&o!==a;)m.push(o),o=h();n&&null==(m=n(m,l++))||i.push(m)}return i}function l(n,e){return n.map((function(n){return e.map((function(t){return s(n[t])})).join(t)}))}function f(n){return n.map(s).join(t)}function s(t){return null==t?"":t instanceof Date?c(t):n.test(t+="")?'"'+t.replace(/"/g,'""')+'"':t}return{parse:function(t,n){var e,r,a=u(t,(function(t,a){if(e)return e(t,a-1);r=t,e=n?function(t,n){var e=o(t);return function(r,a){return n(e(r),a,t)}}(t,n):o(t)}));return a.columns=r||[],a},parseRows:u,format:function(n,e){return null==e&&(e=i(n)),[e.map(s).join(t)].concat(l(n,e)).join("\n")},formatBody:function(t,n){return null==n&&(n=i(t)),l(t,n).join("\n")},formatRows:function(t){return t.map(f).join("\n")},formatRow:f,formatValue:s}}},jPBu:function(t,n,e){"use strict";e.r(n);var r=e("kD0k"),a=e.n(r),o=(e("ls82"),e("/S4K")),i=e("q1tI"),u=e.n(i),c=e("cVA7"),l=e.n(c),f=e("MT78"),s=e("7NYn"),h=e("NRL+"),m=e("vBe5"),p=e("vOnD"),d=e("Wbzz"),g=e("Bje4"),v=p.a.div.withConfig({displayName:"tempAnnomalies__Graph",componentId:"sc-7yh1nx-0"})(["width:100%;box-sizing:border-box;margin-right:auto;margin-left:auto;padding-top:1.5em;padding-bottom:1.5em;"]),b=p.a.div.withConfig({displayName:"tempAnnomalies__Source",componentId:"sc-7yh1nx-1"})(["font-size:small;"]),A=p.a.div.withConfig({displayName:"tempAnnomalies__GraphTitle",componentId:"sc-7yh1nx-2"})(["font-weight:bold;"]),w=p.a.div.withConfig({displayName:"tempAnnomalies__GraphDescription",componentId:"sc-7yh1nx-3"})([""]);n.default=function(){var t=Object(i.useState)(Object(g.initialOption)()),n=t[0],e=t[1],r=function(){var t=Object(o.a)(a.a.mark((function t(){var n,r,o,i,u,c,l,p,d;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([Object(s.a)("/data/marcott2013.csv"),Object(s.a)("/data/647_Global_Temperature_Data_File.txt")]);case 2:n=t.sent,r=n[0],o=n[1],i=Object(g.parseGiss)(o).map((function(t){return[+t[0],+t[1]]})),u=Object(h.a)(";").parse(r).map((function(t){return[1950-+t["Age (yrs BP)"],parseFloat(t["Global (°C)"].replace(",","."))]})).filter((function(t){return isFinite(t[1])&&t[0]<i[0][0]})).reverse(),c=[1961,1990],l=Object(m.e)(i.filter((function(t){return t[0]>=c[0]&&t[1]<=c[1]})),(function(t){return t[1]})),p=u.map((function(t){return[t[0],t[1]-l]})),i.forEach((function(t){p.push(t)})),(d=Object(g.initialOption)()).xAxis.type="value",d.xAxis.axisLabel={formatter:function(t){return t.toString()}},d.xAxis.min=-9e3,d.xAxis.max=p[p.length-1][0],d.yAxis.min=-.7,d.yAxis.max=1.2,d.dataZoom=Object(g.initialDataZoom)(),d.dataZoom[0].startValue=-9e3,d.grid.bottom=60,d.tooltip.formatter=function(t){var n=Math.round(100*t[0].data[1])/100,e=n>=0?"+":"",r=t[0].data[0],a=r<0?r+" BC":r+" AD";return""+t[0].marker+e+n+" °C in "+a},d.series=[{name:"marcott",type:"line",showSymbol:!1,data:p,areaStyle:{normal:{color:new f.graphic.LinearGradient(0,0,0,1,[{offset:-1*d.yAxis.min/d.yAxis.max-.2,color:"rgb(255, 64, 30)"},{offset:1,color:"rgb(180, 200, 255)"}])}},markLine:{data:[{yAxis:p[p.length-1][1],x:"70%"}],label:{normal:{formatter:function(){return p[p.length-1][0]},position:"start"}}}},{name:"last",type:"scatter",data:[p[p.length-1]],symbolSize:10}],e(d);case 24:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i.useEffect)((function(){r()}),[]),u.a.createElement(v,null,u.a.createElement(A,null,"Temperature anomalies in the last 11 000 years"),u.a.createElement(w,null,"°C compared to 1951-1980 average"),u.a.createElement(l.a,{option:n,notMerge:!0}),u.a.createElement(b,null,"Source:"," ",u.a.createElement(d.a,{outward:!0,href:"http://science.sciencemag.org/content/339/6124/1198",target:"_blank",rel:"noopener noreferrer"},"A Reconstruction of Regional and Global Temperature for the Past 11,300 Years")," ","(",u.a.createElement(d.a,{outward:!0,href:"http://science.sciencemag.org/content/suppl/2013/03/07/339.6124.1198.DC1",target:"_blank",rel:"noopener noreferrer"},"data"),") before 1880,"," ",u.a.createElement(d.a,{outward:!0,href:"https://climate.nasa.gov/vital-signs/global-temperature/",target:"_blank",rel:"noopener noreferrer"},'NASA"s Goddard Institute for Space Studies (GISS)')," ","(",u.a.createElement(d.a,{outward:!0,href:"http://climate.nasa.gov/system/internal_resources/details/original/647_Global_Temperature_Data_File.txt",target:"_blank",rel:"noopener noreferrer"},"data"),") after 1880"))}},vBe5:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"a",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"d",(function(){return c})),e.d(n,"e",(function(){return A})),e.d(n,"f",(function(){return b})),e.d(n,"g",(function(){return s})),e.d(n,"h",(function(){return w})),e.d(n,"k",(function(){return d})),e.d(n,"i",(function(){return g})),e.d(n,"j",(function(){return v}));var r=function(t,n){return t<n?-1:t>n?1:t>=n?0:NaN},a=function(t){var n;return 1===t.length&&(n=t,t=function(t,e){return r(n(t),e)}),{left:function(n,e,r,a){for(null==r&&(r=0),null==a&&(a=n.length);r<a;){var o=r+a>>>1;t(n[o],e)<0?r=o+1:a=o}return r},right:function(n,e,r,a){for(null==r&&(r=0),null==a&&(a=n.length);r<a;){var o=r+a>>>1;t(n[o],e)>0?a=o:r=o+1}return r}}};var o=a(r),i=o.right,u=(o.left,i);var c=function(t,n){return n<t?-1:n>t?1:n>=t?0:NaN},l=function(t){return null===t?NaN:+t},f=Array.prototype,s=(f.slice,f.map,function(t,n,e){t=+t,n=+n,e=(a=arguments.length)<2?(n=t,t=0,1):a<3?1:+e;for(var r=-1,a=0|Math.max(0,Math.ceil((n-t)/e)),o=new Array(a);++r<a;)o[r]=t+r*e;return o}),h=Math.sqrt(50),m=Math.sqrt(10),p=Math.sqrt(2),d=function(t,n,e){var r,a,o,i,u=-1;if(e=+e,(t=+t)===(n=+n)&&e>0)return[t];if((r=n<t)&&(a=t,t=n,n=a),0===(i=g(t,n,e))||!isFinite(i))return[];if(i>0)for(t=Math.ceil(t/i),n=Math.floor(n/i),o=new Array(a=Math.ceil(n-t+1));++u<a;)o[u]=(t+u)*i;else for(t=Math.floor(t*i),n=Math.ceil(n*i),o=new Array(a=Math.ceil(t-n+1));++u<a;)o[u]=(t-u)/i;return r&&o.reverse(),o};function g(t,n,e){var r=(n-t)/Math.max(0,e),a=Math.floor(Math.log(r)/Math.LN10),o=r/Math.pow(10,a);return a>=0?(o>=h?10:o>=m?5:o>=p?2:1)*Math.pow(10,a):-Math.pow(10,-a)/(o>=h?10:o>=m?5:o>=p?2:1)}function v(t,n,e){var r=Math.abs(n-t)/Math.max(0,e),a=Math.pow(10,Math.floor(Math.log(r)/Math.LN10)),o=r/a;return o>=h?a*=10:o>=m?a*=5:o>=p&&(a*=2),n<t?-a:a}var b=function(t,n,e){if(null==e&&(e=l),r=t.length){if((n=+n)<=0||r<2)return+e(t[0],0,t);if(n>=1)return+e(t[r-1],r-1,t);var r,a=(r-1)*n,o=Math.floor(a),i=+e(t[o],o,t);return i+(+e(t[o+1],o+1,t)-i)*(a-o)}},A=function(t,n){var e,r=t.length,a=r,o=-1,i=0;if(null==n)for(;++o<r;)isNaN(e=l(t[o]))?--a:i+=e;else for(;++o<r;)isNaN(e=l(n(t[o],o,t)))?--a:i+=e;if(a)return i/a},w=function(t,n){var e,r=t.length,a=-1,o=0;if(null==n)for(;++a<r;)(e=+t[a])&&(o+=e);else for(;++a<r;)(e=+n(t[a],a,t))&&(o+=e);return o}}}]);
//# sourceMappingURL=component---src-pages-climate-change-graphs-temp-annomalies-js-7d9fae7f5db3fa2ff785.js.map