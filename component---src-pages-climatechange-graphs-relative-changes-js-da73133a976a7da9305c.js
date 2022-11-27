(window.webpackJsonp=window.webpackJsonp||[]).push([[21,20],{"7NYn":function(e,a,t){"use strict";function n(e){if(!e.ok)throw new Error(e.status+" "+e.statusText);return e.text()}a.a=function(e,a){return fetch(e,a).then(n)}},plep:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),r=t.n(n),o=t("cVA7"),i=t.n(o),l=(t("MT78"),t("7NYn")),s=t("vOnD"),c=t("Wbzz"),u=t("+rN2"),m=s.a.div.withConfig({displayName:"relativeChanges__Graph",componentId:"sc-1w9hvl9-0"})(["width:100%;box-sizing:border-box;margin-right:auto;margin-left:auto;padding-top:1.5em;padding-bottom:1.5em;"]),p=s.a.div.withConfig({displayName:"relativeChanges__Source",componentId:"sc-1w9hvl9-1"})(["font-size:small;"]),f=s.a.div.withConfig({displayName:"relativeChanges__GraphTitle",componentId:"sc-1w9hvl9-2"})(["font-weight:bold;"]),h=s.a.div.withConfig({displayName:"relativeChanges__GraphDescription",componentId:"sc-1w9hvl9-3"})([""]);a.default=function(){var e=Object(n.useState)(Object(u.initialOption)()),a=e[0],t=e[1];return Object(n.useEffect)((function(){Object(l.a)("/data/IPCC_WG1AR5_All_1_2.csv").then((function(e){var a=e.split("\n").filter((function(e,a){return a>=7&&a<270})).filter((function(e,a){return 0===a||"2011"===e.split(";")[0]})),n=a[0].split(";").filter((function(e,a){return a<=11})),r={};a.forEach((function(e,a){if(0!==a){var t=e.split(";");n.forEach((function(e,a){0!==a&&(void 0===r[e]&&(r[e]=0),r[e]+=+t[a].replace(",","."))}))}}));var o=[{name:"Other man-made changes",value:r["BC Snow"]+r.Contrails+r.LUC},{name:"Aerosols",value:r["Aerosol (Total)"]},{name:"Volcano erruptions",value:r.Volcano},{name:"Solar changes",value:r.Solar},{name:"Greenhouse gases",value:r.CO2+r["GHG OTher*"]+r["H2O (Strat)"]+r["O3 (Strat)"]+r["O3 (Trop)"]}],i=[0];o.forEach((function(e,a){0!==a&&(a=o.length-a-1,i.push(i[i.length-1]+(o[a+1].value>0?o[a+1].value:0)-(o[a].value<0?-o[a].value:0)))})),i.push(0),o.unshift({name:"Net observed warming",value:"-"}),i=i.reverse();var l=Object(u.initialOption)();l.grid.left=150,l.xAxis.name="Warming increase (W/m²)",l.xAxis.nameLocation="middle",l.xAxis.nameGap=30,l.grid.bottom+=30,l.xAxis.type="value",l.yAxis.data=o.map((function(e){return e.name})),l.tooltip.formatter=function(e){var a=e.filter((function(e){return"offset"!==e.seriesName})).filter((function(e){return"-"!==e.data}))[0];if(a.data){var t=a.data,n=(a.name,"pos"===a.seriesName);return(n?"Heating":"Cooling")+" with "+(n?"":"-")+t+" W/m<sup>2</sup>"}},l.series=[{name:"offset",type:"bar",stack:"common",data:i,itemStyle:{normal:{barBorderColor:"rgba(0,0,0,0)",color:"rgba(0,0,0,0)"},emphasis:{barBorderColor:"rgba(0,0,0,0)",color:"rgba(0,0,0,0)"}}},{name:"pos",type:"bar",stack:"common",data:o.map((function(e){return e.value<0?"-":e.value})),label:{normal:{show:!0,position:"right"}}},{name:"neg",type:"bar",stack:"common",barGap:0,data:o.map((function(e){return e.value>=0?"-":-e.value})),label:{normal:{show:!0,position:"left",formatter:"-{c}"}}},{name:"net",type:"bar",stack:"common",barGap:0,data:o.map((function(e,a){return 0===a?i[1]:"-"})),label:{normal:{show:!0,position:"right"}}}],t(l)}))}),[]),r.a.createElement(m,null,r.a.createElement(f,null,"Relative changes in"," ",r.a.createElement(c.a,{outward:!0,href:"https://en.wikipedia.org/wiki/Radiative_forcing",target:"_blank",rel:"noopener noreferrer"},"radiative forcing")," ","in 2011 compared to 1750"),r.a.createElement(h,null,"in W/m",r.a.createElement("sup",null,"2")),r.a.createElement(i.a,{option:a,notMerge:!0}),r.a.createElement(p,null,"Source: Intergovernmental Panel on Climate Change (IPCC)"," ",r.a.createElement(c.a,{outward:!0,href:"http://www.ipcc.ch/pdf/assessment-report/ar5/wg1/WG1AR5_Chapter08_FINAL.pdf",target:"_blank",rel:"noopener noreferrer"},"WG1 AR5, Fig. 8.15 p697")," ","(",r.a.createElement(c.a,{outward:!0,href:"http://www.ipcc.ch/report/ar5/wg1/docs/WG1AR5_AIISM_Datafiles.xlsx",target:"_blank",rel:"noopener noreferrer"},"data"),")"))}}}]);
//# sourceMappingURL=component---src-pages-climatechange-graphs-relative-changes-js-da73133a976a7da9305c.js.map