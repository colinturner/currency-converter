(this["webpackJsonpcurrency-converter-react"]=this["webpackJsonpcurrency-converter-react"]||[]).push([[0],{26:function(n,e,t){n.exports=t(50)},50:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),c=t(19),u=t.n(c),o=t(5),i=t.n(o),l=t(20),s=t(7),p=t(2),f=t(3),d=t(21),m=t.n(d),v=t(22),b=t.n(v);function x(){var n=Object(p.a)([""]);return x=function(){return n},n}function O(){var n=Object(p.a)(["\n  padding-right: 8px;\n"]);return O=function(){return n},n}function h(){var n=Object(p.a)(["\n  display: flex;\n  flex-direction: row;\n  > * {\n    padding-bottom: 8px;\n  }\n"]);return h=function(){return n},n}function j(){var n=Object(p.a)(["\n  padding-bottom: 16px;\n"]);return j=function(){return n},n}function E(){var n=Object(p.a)(["\n  padding-left: 8px;\n"]);return E=function(){return n},n}function g(){var n=Object(p.a)([""]);return g=function(){return n},n}function y(){var n=Object(p.a)(["\n  display: flex;\n  flex-direction: row;\n  padding-bottom: 8px;\n"]);return y=function(){return n},n}function w(){var n=Object(p.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 100px;\n  font-size: 18px;\n  font-family: Arial;\n"]);return w=function(){return n},n}var D=f.a.div(w()),N=f.a.div(y()),k=f.a.input(g()),A=f.a.span(E()),C=f.a.div(j()),S=f.a.div(h()),K=f.a.div(O()),U=f.a.div(x());var B=["USD","AUD","NZD","EUR","GBP","NOK","SEK","DKK","CHF"];var F=function(){var n=Object(r.useState)({rates:{},date:""}),e=Object(s.a)(n,2),t=e[0],c=e[1],u=Object(r.useState)(0),o=Object(s.a)(u,2),p=o[0],f=o[1];return Object(r.useEffect)((function(){(function(){var n=Object(l.a)(i.a.mark((function n(){var e;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return"https://cors-anywhere.herokuapp.com/","http://api.openrates.io/latest?base=CAD",n.next=4,m()("https://cors-anywhere.herokuapp.com/http://api.openrates.io/latest?base=CAD");case 4:e=n.sent,c(e.data),console.log("result!!! ",e.data);case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}})()()}),[]),a.a.createElement(D,null,a.a.createElement(N,null,a.a.createElement(k,{value:p,onChange:function(n){return f((e=n.target.value,Number.isNaN(Number(e))?0:Number(e)));var e}}),a.a.createElement(A,null,"CAD")),a.a.createElement(C,null,"Information accurate as of: ",b()(t.date).format("LL")),Object.keys(t.rates).map((function(n){return B.includes(n)?a.a.createElement(S,null,a.a.createElement(K,null,(t.rates[n]*p).toFixed(2)),a.a.createElement(U,null,n)):null})))};u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(F,null)),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.1e1833ab.chunk.js.map