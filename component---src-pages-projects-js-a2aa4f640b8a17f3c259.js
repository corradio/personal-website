(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"16l3":function(e,t,r){"use strict";r.r(t);var n=r("q1tI"),a=r.n(n),o=r("Bl7J"),i=r("vrFN"),c=(r("E9XD"),r("BIHw"),r("QGkA"),r("ToJy"),{generators:{g2:{type:"coal",energy:1,gridKey:"A"},g3:{type:"wind",energy:1,gridKey:"A"},g5:{type:"hydro",energy:1,gridKey:"B"}},consumers:{c1:{type:"household",gridKey:"A",emissionFactor:null,originMix:null},c2:{type:"factory",gridKey:"A",purchases:["g3"],emissionFactor:null,originMix:null},c3:{type:"factory",gridKey:"B",emissionFactor:null,originMix:null}}}),s={solar:"#f27406",wind:"#74cdb9",hydro:"#2772b2","hydro storage":"#0052cc",battery:"lightgray","battery storage":"#b76bcf",biomass:"#166a57",geothermal:"yellow",nuclear:"#AEB800",gas:"#bb2f51",coal:"#ac8c35",oil:"#867d66",unknown:"#ACACAC"},u=function(e){var t={};return Object.entries(e).forEach((function(e){var r=e[0],n=e[1];Object.entries(n).forEach((function(e){var n=e[0],a=e[1],o=a.gridKey;t[o]||(t[o]={}),t[o][r]||(t[o][r]={}),t[o][r][n]||(t[o][r][n]={}),t[o][r][n]=a}))})),t},l=function(e){var t=0,r={};return Object.entries(e).forEach((function(e){var n=e[0],a=e[1];t+=a.energy,r[n]=a.energy})),Object.keys(r).forEach((function(e){r[e]/=t})),r},f=function(e,t,r){var n={},a=e.map(r).reduce((function(e,t){return e+t}),0);return e.forEach((function(e){return Object.entries(t(e)).forEach((function(t){var a=t[0],o=t[1];n[a]=(n[a]||0)+r(e)*o}))})),Object.keys(n).forEach((function(e){n[e]/=a})),n},m=function(e,t,r){return!(!e.purchasers||e.purchasers&&!t.consumers[e.purchasers[0]][r])},p={locationBased:function(e){var t=JSON.parse(JSON.stringify(e)),r=u(t);return Object.entries(r).forEach((function(e){var r=e[0],n=e[1],a=l(n.generators);Object.values(t.consumers).filter((function(e){return e.gridKey===r})).forEach((function(e){e.originMix=a}))})),t},marketBased:function(e){return function(e,t){var r=JSON.parse(JSON.stringify(e)),n=u(r),a=[];Object.values(r.consumers).filter((function(e){return e[t]})).forEach((function(e){var r;a.push(e.key),e.originMix=((r={})[e[t][0]]=1,r)}));var o=Object.entries(n).map((function(e){var n=e[0],o=e[1],i=Object.values(o.generators).map((function(e){return e.energy})).reduce((function(e,t){return e+t}),0),c=i+Object.values(o.consumers).filter((function(e){return e[t]})).map((function(e){return r.generators[e[t][0]].energy})).reduce((function(e,t){return e+t}),0)-Object.values(o.generators).map((function(e){return(e.purchasers||[]).map((function(t){return[e,t]})).filter((function(e){e[0];var n=e[1];return r.consumers[n][t]})).map((function(e){var t=e[0];e[1];return t}))})).flat().map((function(e){return e.energy})).reduce((function(e,t){return e+t}),0);if(c>=i){var s={};Object.values(o.generators).filter((function(e){return!m(e,r,t)})).forEach((function(e){s[e.key]=e}));var u=l(s),f=Object.keys(o.generators).join("")!==Object.keys(s).join("");return Object.values(o.consumers).filter((function(e){return!a.includes(e.key)})).forEach((function(e){e.hasResidualMix=f,e.originMix=u})),{key:n,surplusLoad:c-i,residualMix:u}}return{key:n,surplusLoad:c-i}})),i=f(o.filter((function(e){return e.surplusLoad>0})),(function(e){return e.residualMix}),(function(e){return e.surplusLoad}));return o.filter((function(e){return e.surplusLoad<0})).forEach((function(e){var o=e.key,c=e.surplusLoad,s=n[o],u={};Object.entries(s.generators).filter((function(e){e[0];var n=e[1];return!m(n,r,t)})).forEach((function(e){var t=e[0],r=e[1];u[t]=r}));var p=Object.values(u).map((function(e){return e.energy})).reduce((function(e,t){return e+t}),0),y=f([{load:p,mix:l(u)},{load:-1*c,mix:i}],(function(e){return e.mix}),(function(e){return e.load})),d=Object.keys(s.generators).join("")!==Object.keys(u).join("");Object.values(s.consumers).filter((function(e){return!a.includes(e.key)})).forEach((function(e){e.hasResidualMix=d,e.originMix=y}))})),r}(e,"purchases")}},y=function(e){var t=e.type,r=e.style;return a.a.createElement("div",{style:Object.assign({width:"6px",height:"6px",backgroundColor:s[t]},r)})},d=function(e){var t=e.generator;return a.a.createElement("div",{key:t.key,style:{display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center"}},t.type+" generator",a.a.createElement("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",marginBottom:"5px"}},Array.from(Array(t.energy)).map((function(e,r){return a.a.createElement(y,{key:r,type:t.type,style:{margin:"1px"}})}))))},h=function(e){var t=e.consumer,r=e.config,n={};return Object.entries(t.originMix).forEach((function(e){var t=e[0],a=e[1],o=r.generators[t].type;n[o]||(n[o]=0),n[o]+=a})),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,"consumer "+t.key.slice(1)),a.a.createElement("small",null,t.hasResidualMix?"(residual mix)":null),a.a.createElement("small",null,Object.entries(n).sort((function(e,t){return t[1]-e[1]})).map((function(e){var t=e[0],r=e[1];return a.a.createElement("div",{key:t,style:{display:"flex",alignItems:"baseline"}},a.a.createElement(y,{key:t,type:t,style:{marginRight:"4px",width:30*r}}),t+": "+Math.round(100*r)+" %")}))))},g=function(e){var t=e.generators,r=Object.values(t);return a.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around"}},Object.entries(t).map((function(e,t){var n=e[0],o=e[1],i=r[t+1],c=r[t-1],s=o.gridKey===(null==i?void 0:i.gridKey),u=o.gridKey===(null==c?void 0:c.gridKey),l={};return(u||s)&&(l.borderBottom="1px solid",u&&s?l.borderColor="#000":l.borderImage="linear-gradient(to "+(s?"left":"right")+", #000 50%, rgba(0, 0, 0, 0) 50%) 100% 1"),a.a.createElement("div",{key:n,style:Object.assign({display:"flex",justifyContent:"center",flex:1},l)},a.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end"}},a.a.createElement(d,{key:o.key,generator:o}),a.a.createElement("div",{style:{backgroundColor:"#000",height:10,width:1}})))})))},v=function(e){var t=e.config,r=e.configByGrid,n=Object.values(r).reduce((function(e,t){return Object.values(e.generators).length+Object.values(t.generators).length}));return a.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-around"}},Object.entries(r).map((function(e){var r=e[0],o=e[1],i=Object.values(o.generators),c=Object.values(o.consumers);return a.a.createElement("div",{key:r,style:{display:"flex",flex:1,flexDirection:"column",alignItems:"stretch",flexBasis:i.length/n*100+"%"}},a.a.createElement("div",{style:{alignSelf:"center",backgroundColor:"#000",height:100,width:1}}),a.a.createElement("div",{style:{display:"flex",justifyContent:"space-around",flex:1}},c.map((function(e,r){var n=null!=c[r+1],o=null!=c[r-1],i={};return(o||n)&&(i.borderTop="1px solid",o&&n?i.borderColor="#000":i.borderImage="linear-gradient(to "+(n?"left":"right")+", #000 50%, rgba(0, 0, 0, 0) 50%) 100% 1"),a.a.createElement("div",{key:e.key,style:Object.assign({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",flex:1},i)},a.a.createElement("div",{style:{backgroundColor:"#000",height:10,width:1}}),a.a.createElement(h,{consumer:e,config:t}))}))))})))},b=function(e){var t=e.config,r=e.configByGrid,n=e.attributionRule,o=Object.keys(t.generators),i=Object.keys(r),c=Object.values(r).map((function(e){return Object.keys(e.generators).length/o.length})),s=n===p.marketBased?["contract"]:[],u=(n===p.marketBased?["purchases"]:[]).map((function(e,n){return Object.values(t.consumers).filter((function(t){var r;return null===(r=t[e])||void 0===r?void 0:r.length})).map((function(t){return t[e].map((function(e){return[e,t.key]}))})).flat().map((function(e){var a=e[0],u=e[1],l=100/o.length,f=.5*l+o.indexOf(a)*l,m=t.consumers[u].gridKey,p=i.indexOf(m),y=Object.keys(r[m].consumers),d=y.indexOf(u),h=c[p]/y.length*100,g=100*c.slice(0,p).reduce((function(e,t){return e+t}),0)+.5*h+d*h;return f+=3*(g-f>0?1:-1),Math.abs(g-f)>10&&(g+=3*(g-f<-10?1:-1)),{x1:f,y1:18,x2:g,y2:60,fromKey:a,toKey:u,label:s[n]}}))})).flat();return a.a.createElement("svg",{width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg",style:{position:"absolute",height:"100%",width:"100%"}},a.a.createElement("defs",null,a.a.createElement("marker",{id:"arrowhead",markerWidth:"10",markerHeight:"7",refX:"10",refY:"3.5",orient:"auto"},a.a.createElement("polygon",{points:"0 0, 10 3.5, 0 7"}))),u.map((function(e){var t=e.x1,r=e.y1,n=e.x2,o=e.y2,i=e.fromKey,c=e.toKey,s=e.label;return a.a.createElement("g",{key:s},a.a.createElement("line",{key:i+c,x1:t+"%",y1:r+"%",x2:n+"%",y2:o+"%",stroke:"darkblue",strokeDasharray:"4",markerEnd:"url(#arrowhead)"}),a.a.createElement("text",{x:.5*(t+n)+"%",y:.5*(r+o)+"%",textAnchor:"middle",style:{stroke:"white",strokeWidth:"0.6em"}},s),a.a.createElement("text",{x:.5*(t+n)+"%",y:.5*(r+o)+"%",textAnchor:"middle"},s))})))},E=function(e){var t,r=e.config,o=e.attributionRuleKey,i=e.style,c=Object(n.useState)(r.consumers.c2.purchases[0]),s=c[0],l=c[1],f=JSON.parse(JSON.stringify(r));f.consumers=Object.assign({},f.consumers,((t={}).c2=Object.assign({},f.consumers.c2,{purchases:[s]}),t)),Object.keys(f.generators).forEach((function(e){f.generators[e].key=e})),Object.entries(f.consumers).forEach((function(e){var t=e[0],r=e[1];r.key=t,["purchases"].forEach((function(e){(r[e]||[]).forEach((function(e){f.generators[e].purchasers||(f.generators[e].purchasers=[]),f.generators[e].purchasers.push(t)}))}))}));var m=p[o],y=m(f),d=u(y);return a.a.createElement("div",{style:Object.assign({display:"flex",flexDirection:"column",width:"90%",marginLeft:"auto",marginRight:"auto"},i)},a.a.createElement("div",{style:{position:"relative"}},a.a.createElement(b,{config:y,configByGrid:d,attributionRule:m}),a.a.createElement(g,{generators:y.generators}),a.a.createElement(v,{config:y,configByGrid:d})),"marketBased"===o?a.a.createElement("span",null,a.a.createElement("br",null),'"consumer 2" has a contract with the'," ",a.a.createElement("select",{onChange:function(e){l(e.target.value)}},Object.keys(r.generators).filter((function(e){return!["coal"].includes(r.generators[e].type)})).map((function(e){return a.a.createElement("option",{key:e,value:e,selected:e===s},r.generators[e].type)})))," generator"):null)},x=r("p3AD"),k=r("7oCb"),w=r.n(k);t.default=function(e){e.data;var t=e.location;return a.a.createElement(o.a,{location:t},a.a.createElement(i.a,{title:"Olivier Corradi | Projects"}),a.a.createElement("h1",{style:{marginTop:Object(x.a)(2)}},"Projects"),"This is a section containing projects I have worked on.",a.a.createElement("h2",{style:{marginTop:Object(x.a)(1)}},"Electricity Maps xbar plugin (2024)"),a.a.createElement("p",null,"A simple way to visualise how clean electricity is in your location. Check out the blog post ",a.a.createElement("a",{href:"/blog/electricity-maps-macos-statusbar/"},"here"),"."),a.a.createElement("p",null,a.a.createElement("center",null,a.a.createElement("a",{href:"https://polynomial.so"},a.a.createElement("img",{src:"https://static.electricitymaps.com/xbar-screenshot.png",alt:"polynomial.so"})))),a.a.createElement("h2",{style:{marginTop:Object(x.a)(1)}},"Polynomial: A central place to track your most vital KPIs (2023)"),a.a.createElement("p",null,"Polynomial is the fastest way to centralize the performance indicators that matter to you. Simply connect integrations, and Polynomial takes care of the rest. Check it out ",a.a.createElement("a",{href:"https://polynomial.so"},"here"),", or contribute to it ",a.a.createElement("a",{href:"https://github.com/corradio/polynomial/"},"here"),"."),a.a.createElement("p",null,a.a.createElement("center",null,a.a.createElement("a",{href:"https://polynomial.so"},a.a.createElement("img",{src:"https://polynomial.so/static/images/social.png",alt:"polynomial.so"})))),a.a.createElement("h2",{style:{marginTop:Object(x.a)(1)}},"Scope 2 widget (2022)"),"It can be tricky to understand scope 2 carbon accounting rules. A guide was written (",a.a.createElement("a",{href:"https://www.electricitymaps.com/guides/accounting-guide"},"Understanding Electricity Scope 2 Attribution Rules"),"), and a small widget was made as a complement. Feel free to play around with it below:",a.a.createElement(E,{config:c,attributionRuleKey:"marketBased",style:{padding:"2em"}}),a.a.createElement("h2",{style:{marginTop:Object(x.a)(1)}},"footprintMap: CO₂ emissions of the global economy (2021)"),a.a.createElement("p",null,"footprintMap is a visualisation of the CO₂ emissions of the global economy. It uses the electricityMap visualisation engine to visualise various indicators about the global econonomy: GDP, population, emissions and energy supply. Check it out ",a.a.createElement("a",{href:"https://footprintmap.org"},"here"),", or contribute to it ",a.a.createElement("a",{href:"https://github.com/corradio/footprintmap/"},"here"),"."),a.a.createElement("p",null,a.a.createElement("center",null,a.a.createElement("a",{href:"https://footprintmap.org"},a.a.createElement("img",{src:"https://footprintmap.org/images/social_image.png",alt:"footprintmap.org"})))),a.a.createElement("h2",{style:{marginTop:Object(x.a)(2)}},"The North app: automating your personal carbon footprint (2019-2020)"),a.a.createElement("p",null,"With the team at Tomorrow, we worked on the North app, which was envisioned as a way to automatically track and calculate the carbon footprint of your life. It worked by connecting to apps you already used in order to track the activities you perform in your daily life. For example, by connecting and parsing your emails, the app was able to detect all plane and train tickets purchased. By connecting to your bank, the app was able to assess all items purchased (e.g. groceries or clothing). Finally, by connecting to your smart meter or electric vehicle, the app was able to assess the time at which you used electricity."),a.a.createElement("p",null,"As the app had access to a significant amount of sensitive content, it was ",a.a.createElement("i",null,"private by design"),": all data processing was done on the phone, and it didn't upload any information onto our servers."),a.a.createElement("p",null,"All the carbon models and the integrations were ",a.a.createElement("a",{href:"https://github.com/tmrowco/northapp-contrib"},"open-sourced")," in order to create a community helping us to cover the whole ecosystem of potential integrations, and to enable trust in the carbon models."),a.a.createElement("p",null,"North was discontinued in August 2020 (read more ",a.a.createElement("a",{href:"https://www.tmrow.com/blog/sunsetting-north/"},"here"),")."),a.a.createElement("p",null,a.a.createElement("center",null,a.a.createElement("video",{width:"250",height:"445",controls:!0},a.a.createElement("source",{src:w.a,type:"video/mp4"})))),a.a.createElement("h2",{style:{marginTop:Object(x.a)(2)}},"brick: a build tool for mono-repositories (2019-2020)"),a.a.createElement("p",null,"Larger organisations such as Google, Facebook and Twitter have adopted the mono-repository approach as they have the means to maintain such an infrastructure, but unfortunately solutions for smaller organisations are limited. At electricityMap, we wanted to embrace the mono-repository structure. brick was therefore built as a simple build tool for mono-repositories. Read more about it ",a.a.createElement("a",{href:"https://electricitymap.org/blog/brick-a-build-tool-for-mono-repositories/"},"here")," and contribute to it ",a.a.createElement("a",{href:"https://github.com/electricitymap/brick"},"here"),"."))}},"2Zix":function(e,t,r){"use strict";var n=r("NC/Y");e.exports=/MSIE|Trident/.test(n)},"33Wh":function(e,t,r){"use strict";var n=r("yoRg"),a=r("eDl+");e.exports=Object.keys||function(e){return n(e,a)}},"6LWA":function(e,t,r){"use strict";var n=r("xrYK");e.exports=Array.isArray||function(e){return"Array"==n(e)}},"7oCb":function(e,t,r){e.exports=r.p+"static/north-0a9b426f5479022f62cc60e43d7a2272.mp4"},"9d/t":function(e,t,r){"use strict";var n=r("AO7/"),a=r("Fib7"),o=r("xrYK"),i=r("tiKp")("toStringTag"),c=Object,s="Arguments"==o(function(){return arguments}());e.exports=n?o:function(e){var t,r,n;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=function(e,t){try{return e[t]}catch(r){}}(t=c(e),i))?r:s?o(t):"Object"==(n=o(t))&&a(t.callee)?"Arguments":n}},A2ZE:function(e,t,r){"use strict";var n=r("RiVN"),a=r("We1y"),o=r("QNWe"),i=n(n.bind);e.exports=function(e,t){return a(e),void 0===t?e:o?i(e,t):function(){return e.apply(t,arguments)}}},"AO7/":function(e,t,r){"use strict";var n={};n[r("tiKp")("toStringTag")]="z",e.exports="[object z]"===String(n)},BIHw:function(e,t,r){"use strict";var n=r("I+eb"),a=r("or9q"),o=r("ewvW"),i=r("B/qT"),c=r("WSbT"),s=r("ZfDv");n({target:"Array",proto:!0},{flat:function(){var e=arguments.length?arguments[0]:void 0,t=o(this),r=i(t),n=s(t,0);return n.length=a(n,t,t,r,0,void 0===e?1:c(e)),n}})},BNF5:function(e,t,r){"use strict";var n=r("NC/Y").match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},C0Ia:function(e,t,r){"use strict";var n=r("6LWA"),a=r("aO6C"),o=r("hh1v"),i=r("tiKp")("species"),c=Array;e.exports=function(e){var t;return n(e)&&(t=e.constructor,(a(t)&&(t===c||n(t.prototype))||o(t)&&null===(t=t[i]))&&(t=void 0)),void 0===t?c:t}},CDr4:function(e,t,r){"use strict";var n=r("DVFp"),a=TypeError;e.exports=function(e,t){if(!delete e[t])throw a("Cannot delete property "+n(t)+" of "+n(e))}},"G+Rx":function(e,t,r){"use strict";var n=r("0GbY");e.exports=n("document","documentElement")},"N+g0":function(e,t,r){"use strict";var n=r("g6v/"),a=r("rtlb"),o=r("m/L8"),i=r("glrk"),c=r("/GqU"),s=r("33Wh");t.f=n&&!a?Object.defineProperties:function(e,t){i(e);for(var r,n=c(t),a=s(t),u=a.length,l=0;u>l;)o.f(e,r=a[l++],n[r]);return e}},NRFe:function(e,t,r){"use strict";var n=TypeError;e.exports=function(e){if(e>9007199254740991)throw n("Maximum allowed index exceeded");return e}},QGkA:function(e,t,r){"use strict";r("RNIs")("flat")},RNIs:function(e,t,r){"use strict";var n=r("tiKp"),a=r("fHMY"),o=r("m/L8").f,i=n("unscopables"),c=Array.prototype;null==c[i]&&o(c,i,{configurable:!0,value:a(null)}),e.exports=function(e){c[i][e]=!0}},RiVN:function(e,t,r){"use strict";var n=r("xrYK"),a=r("4zBA");e.exports=function(e){if("Function"===n(e))return a(e)}},Ta7t:function(e,t,r){"use strict";var n=r("I8vh"),a=r("B/qT"),o=r("hBjN"),i=Array,c=Math.max;e.exports=function(e,t,r){for(var s=a(e),u=n(t,s),l=n(void 0===r?s:r,s),f=i(c(l-u,0)),m=0;u<l;u++,m++)o(f,m,e[u]);return f.length=m,f}},ToJy:function(e,t,r){"use strict";var n=r("I+eb"),a=r("4zBA"),o=r("We1y"),i=r("ewvW"),c=r("B/qT"),s=r("CDr4"),u=r("V37c"),l=r("0Dky"),f=r("rdv8"),m=r("pkCn"),p=r("BNF5"),y=r("2Zix"),d=r("LQDL"),h=r("USzg"),g=[],v=a(g.sort),b=a(g.push),E=l((function(){g.sort(void 0)})),x=l((function(){g.sort(null)})),k=m("sort"),w=!l((function(){if(d)return d<70;if(!(p&&p>3)){if(y)return!0;if(h)return h<603;var e,t,r,n,a="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(n=0;n<47;n++)g.push({k:t+n,v:r})}for(g.sort((function(e,t){return t.v-e.v})),n=0;n<g.length;n++)t=g[n].k.charAt(0),a.charAt(a.length-1)!==t&&(a+=t);return"DGBEFHACIJK"!==a}}));n({target:"Array",proto:!0,forced:E||!x||!k||!w},{sort:function(e){void 0!==e&&o(e);var t=i(this);if(w)return void 0===e?v(t):v(t,e);var r,n,a=[],l=c(t);for(n=0;n<l;n++)n in t&&b(a,t[n]);for(f(a,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:u(t)>u(r)?1:-1}}(e)),r=c(a),n=0;n<r;)t[n]=a[n++];for(;n<l;)s(t,n++);return t}})},USzg:function(e,t,r){"use strict";var n=r("NC/Y").match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},V37c:function(e,t,r){"use strict";var n=r("9d/t"),a=String;e.exports=function(e){if("Symbol"===n(e))throw TypeError("Cannot convert a Symbol value to a string");return a(e)}},ZfDv:function(e,t,r){"use strict";var n=r("C0Ia");e.exports=function(e,t){return new(n(e))(0===t?0:t)}},aO6C:function(e,t,r){"use strict";var n=r("4zBA"),a=r("0Dky"),o=r("Fib7"),i=r("9d/t"),c=r("0GbY"),s=r("iSVu"),u=function(){},l=[],f=c("Reflect","construct"),m=/^\s*(?:class|function)\b/,p=n(m.exec),y=!m.exec(u),d=function(e){if(!o(e))return!1;try{return f(u,l,e),!0}catch(t){return!1}},h=function(e){if(!o(e))return!1;switch(i(e)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return y||!!p(m,s(e))}catch(t){return!0}};h.sham=!0,e.exports=!f||a((function(){var e;return d(d.call)||!d(Object)||!d((function(){e=!0}))||e}))?h:d},fHMY:function(e,t,r){"use strict";var n,a=r("glrk"),o=r("N+g0"),i=r("eDl+"),c=r("0BK2"),s=r("G+Rx"),u=r("zBJ4"),l=r("93I0"),f=l("IE_PROTO"),m=function(){},p=function(e){return"<script>"+e+"<\/script>"},y=function(e){e.write(p("")),e.close();var t=e.parentWindow.Object;return e=null,t},d=function(){try{n=new ActiveXObject("htmlfile")}catch(a){}var e,t;d="undefined"!=typeof document?document.domain&&n?y(n):((t=u("iframe")).style.display="none",s.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write(p("document.F=Object")),e.close(),e.F):y(n);for(var r=i.length;r--;)delete d.prototype[i[r]];return d()};c[f]=!0,e.exports=Object.create||function(e,t){var r;return null!==e?(m.prototype=a(e),r=new m,m.prototype=null,r[f]=e):r=d(),void 0===t?r:o.f(r,t)}},hBjN:function(e,t,r){"use strict";var n=r("oEtG"),a=r("m/L8"),o=r("XGwC");e.exports=function(e,t,r){var i=n(t);i in e?a.f(e,i,o(0,r)):e[i]=r}},or9q:function(e,t,r){"use strict";var n=r("6LWA"),a=r("B/qT"),o=r("NRFe"),i=r("A2ZE"),c=function(e,t,r,s,u,l,f,m){for(var p,y,d=u,h=0,g=!!f&&i(f,m);h<s;)h in r&&(p=g?g(r[h],h,t):r[h],l>0&&n(p)?(y=a(p),d=c(e,t,p,y,d,l-1)-1):(o(d+1),e[d]=p),d++),h++;return d};e.exports=c},rdv8:function(e,t,r){"use strict";var n=r("Ta7t"),a=Math.floor,o=function(e,t){var r=e.length,s=a(r/2);return r<8?i(e,t):c(e,o(n(e,0,s),t),o(n(e,s),t),t)},i=function(e,t){for(var r,n,a=e.length,o=1;o<a;){for(n=o,r=e[o];n&&t(e[n-1],r)>0;)e[n]=e[--n];n!==o++&&(e[n]=r)}return e},c=function(e,t,r,n){for(var a=t.length,o=r.length,i=0,c=0;i<a||c<o;)e[i+c]=i<a&&c<o?n(t[i],r[c])<=0?t[i++]:r[c++]:i<a?t[i++]:r[c++];return e};e.exports=o}}]);
//# sourceMappingURL=component---src-pages-projects-js-a2aa4f640b8a17f3c259.js.map