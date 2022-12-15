(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{DRwZ:function(t,e,a){"use strict";a.r(e);var n=a("kD0k"),r=a.n(n),o=(a("ls82"),a("/S4K")),i=a("q1tI"),c=a.n(i),l=a("cVA7"),s=a.n(l),p=a("MT78"),m=a("7NYn"),u=a("vOnD"),f=a("Wbzz"),d=a("+rN2"),h=u.a.div.withConfig({displayName:"atmosphericCo2__Graph",componentId:"sc-1g8e3if-0"})(["width:100%;box-sizing:border-box;margin-right:auto;margin-left:auto;padding-top:1.5em;padding-bottom:1.5em;"]),g=u.a.div.withConfig({displayName:"atmosphericCo2__Source",componentId:"sc-1g8e3if-1"})(["font-size:small;"]),w=u.a.div.withConfig({displayName:"atmosphericCo2__GraphTitle",componentId:"sc-1g8e3if-2"})(["font-weight:bold;"]),b=u.a.div.withConfig({displayName:"atmosphericCo2__GraphDescription",componentId:"sc-1g8e3if-3"})([""]);e.default=function(){var t=Object(i.useState)(Object(d.initialOption)()),e=t[0],a=t[1],n=function(){var t=Object(o.a)(r.a.mark((function t(){var e,n,o,i,c,l;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[],n=1959,t.next=4,Promise.all([Object(m.a)("/data/antarctica2015co2composite.txt"),Object(m.a)("/data/co2_annmean_mlo.txt")]);case 4:o=t.sent,i=o[0],c=o[1],i.split("\n").filter((function(t,e){return e>=138})).map((function(t){var e=t.split("\t");return[1950-+e[0],+e[1]]})).filter((function(t){return t[0]<n&&isFinite(t[1])})).reverse().forEach((function(t){e.push(t)})),c.split("\n").filter((function(t){return"#"!==t[0]})).map((function(t){var e=t.split("   ");return[+e[0],+e[1]]})).filter((function(t){return t[0]>=n})).forEach((function(t){e.push(t)})),(l=Object(d.initialOption)()).xAxis.type="value",l.xAxis.axisLabel={formatter:function(t){return t.toString()}},l.xAxis.min=-9e5,l.yAxis.min=150,l.yAxis.max=420,l.dataZoom=Object(d.initialDataZoom)(),l.dataZoom[0].startValue=-4e4,l.grid.bottom=60,l.tooltip.formatter=function(t){var e=t[0].data[1],a=t[0].data[0],n=a<0?Math.round(a)+" BC":Math.round(a)+" AD";return t[0].marker+" "+e+" ppm in "+n},l.series=[{name:"",type:"line",showSymbol:!1,data:e,areaStyle:{normal:{color:new p.graphic.LinearGradient(0,0,0,1,[{offset:.5,color:"rgb(255, 64, 30)"},{offset:1,color:"orange"}])}},markLine:{data:[{x:"70%",yAxis:e[e.length-1][1]}],label:{normal:{formatter:function(){return e[e.length-1][0]},position:"start"}}}},{name:"last",type:"scatter",data:[e[e.length-1]],symbolSize:10}],a(l);case 21:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(i.useEffect)((function(){n()}),[]),c.a.createElement(h,null,c.a.createElement(w,null,"Atmospheric CO2 concentration in the last 40 000 to 800 000 years"),c.a.createElement(b,null,"in ppm (particles per million)"),c.a.createElement(s.a,{option:e,notMerge:!0}),c.a.createElement(g,null,"Source: National Oceanic and Atmospheric Administration (NOAA) "," ",c.a.createElement(f.a,{outward:!0,href:"https://www.ncdc.noaa.gov/paleo-search/study/17975",target:"_blank",rel:"noopener noreferrer"},"Ice Core records")," "," (",c.a.createElement(f.a,{outward:!0,href:"https://www1.ncdc.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt",target:"_blank",rel:"noopener noreferrer"},"data"),") before 1959 and "," ",c.a.createElement(f.a,{outward:!0,href:"https://www.esrl.noaa.gov/gmd/ccgg/trends/data.html",target:"_blank",rel:"noopener noreferrer"},"Mauna Loa records")," ","(",c.a.createElement(f.a,{outward:!0,href:"ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_annmean_mlo.txt",target:"_blank",rel:"noopener noreferrer"},"data"),") after 1959."))}}}]);
//# sourceMappingURL=component---src-pages-climatechange-graphs-atmospheric-co-2-js-8c9f5f5d16032f7295bb.js.map