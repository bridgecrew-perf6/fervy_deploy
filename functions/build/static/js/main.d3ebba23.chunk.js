(this["webpackJsonpferby-app"]=this["webpackJsonpferby-app"]||[]).push([[4],{30:function(e,t,n){"use strict";var a=n(6);t.a=Object(a.b)()},36:function(e,t,n){"use strict";var a=n(7),c=n(0),l=n(2),i=Object(c.createContext)(),r={Provider:function(e){var t=e.children,n=Object(c.useState)(!1),r=Object(a.a)(n,2),j=r[0],s=r[1],b={test:j,activeTest:function(){s(!0)},deactivateTest:function(){s(!1)}};return Object(l.jsx)(i.Provider,{value:b,children:t})},Consumer:i.Consumer};t.a=r},43:function(e,t,n){"use strict";n(0);var a=n(65),c=n(68),l=n(2),i=Object(a.a)((function(e){return{loading:{position:"fixed",left:0,right:0,top:"calc(50% - 20px)",margin:"auto",height:"40px",width:"40px","& img":{position:"absolute",height:"25px",width:"auto",top:0,bottom:0,left:0,right:0,margin:"auto"}}}}));t.a=function(e){var t=i();return Object(l.jsx)("div",{className:t.loading,children:Object(l.jsx)(c.a,{color:"primary"})})}},59:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(39),i=n.n(l),r=(n(59),n(92)),j=n(48),s=n(3),b=n(30),u=n(76),o={darkBlue:"#210D49",black:"#101111",limeGreen:"#1CF445",darkGreen:"#2D302E",white:"#FFFF"},O=Object(u.a)({palette:{primary:{main:o.darkBlue,light:o.limeGreen},secondary:{main:o.black,light:o.darkGreen}}}),d=n(43),h=n(2),m=function(e){var t=e.children;return Object(h.jsx)(a.Suspense,{fallback:Object(h.jsx)(d.a,{}),children:t})},x=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,343))})),p=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(10)]).then(n.bind(null,344))})),f=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(17)]).then(n.bind(null,329))})),y=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(18)]).then(n.bind(null,330))})),v=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(6)]).then(n.bind(null,352))})),P=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(7)]).then(n.bind(null,353))})),g=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(14),n.e(23)]).then(n.bind(null,331))})),z=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(11)]).then(n.bind(null,332))})),k=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(19)]).then(n.bind(null,333))})),F=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(12)]).then(n.bind(null,334))})),C=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(13)]).then(n.bind(null,335))})),w=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(16)]).then(n.bind(null,336))})),B=Object(a.lazy)((function(){return n.e(22).then(n.bind(null,337))})),G=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(15)]).then(n.bind(null,338))})),S=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(20)]).then(n.bind(null,339))})),T=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(21)]).then(n.bind(null,340))}));var D=function(){return Object(h.jsx)(r.a,{theme:O,children:Object(h.jsx)(j.a,{history:b.a,children:Object(h.jsx)(m,{children:Object(h.jsxs)(s.c,{children:[Object(h.jsx)(s.a,{path:"/",element:Object(h.jsx)(T,{})}),Object(h.jsx)(s.a,{path:"/carta",element:Object(h.jsx)(S,{})}),Object(h.jsx)(s.a,{path:"/service",element:Object(h.jsx)(G,{})}),Object(h.jsx)(s.a,{path:"/login",element:Object(h.jsx)(p,{})}),Object(h.jsx)(s.a,{path:"/register",element:Object(h.jsx)(x,{})}),Object(h.jsx)(s.a,{path:"/admin",element:Object(h.jsx)(f,{})}),Object(h.jsx)(s.a,{path:"/admin/serviceIndex",element:Object(h.jsx)(y,{})}),Object(h.jsx)(s.a,{path:"/admin/service",element:Object(h.jsx)(v,{})}),Object(h.jsx)(s.a,{path:"/admin/file",element:Object(h.jsx)(P,{})}),Object(h.jsx)(s.a,{path:"/admin/download",element:Object(h.jsx)(g,{})}),Object(h.jsx)(s.a,{path:"/admin/client",element:Object(h.jsx)(z,{})}),Object(h.jsx)(s.a,{path:"/admin/dashboard",element:Object(h.jsx)(k,{})}),Object(h.jsx)(s.a,{path:"/admin/operators",element:Object(h.jsx)(F,{})}),Object(h.jsx)(s.a,{path:"/admin/transports",element:Object(h.jsx)(C,{})}),Object(h.jsx)(s.a,{path:"/admin/certs",element:Object(h.jsx)(w,{})}),Object(h.jsx)(s.a,{path:"/admin/alv",element:Object(h.jsx)(B,{})})]})})})})},I=function(e){e&&e instanceof Function&&n.e(24).then(n.bind(null,341)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,l=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),l(e),i(e)}))},E=n(36);i.a.render(Object(h.jsx)(E.a.Provider,{children:Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(D,{})})}),document.getElementById("root")),I()}},[[63,5,9]]]);
//# sourceMappingURL=main.d3ebba23.chunk.js.map