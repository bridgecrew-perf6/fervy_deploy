(this["webpackJsonpferby-app"]=this["webpackJsonpferby-app"]||[]).push([[16],{104:function(t,e,r){t.exports=r(149)},119:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void r(s)}c.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}r.d(e,"a",(function(){return o}))},149:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(F){u=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new _(n||[]);return i._invoke=function(t,e,r){var n=h;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===o)throw i;return C()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=k(a,r);if(c){if(c===y)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=l(t,e,r);if("normal"===u.type){if(n=r.done?d:f,u.arg===y)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=d,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(F){return{type:"throw",arg:F}}}t.wrap=s;var h="suspendedStart",f="suspendedYield",p="executing",d="completed",y={};function v(){}function g(){}function b(){}var m={};u(m,i,(function(){return this}));var w=Object.getPrototypeOf,j=w&&w(w(S([])));j&&j!==r&&n.call(j,i)&&(m=j);var x=b.prototype=v.prototype=Object.create(m);function O(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,i,a,c){var u=l(t[o],t,i);if("throw"!==u.type){var s=u.arg,h=s.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,c)}),(function(t){r("throw",t,a,c)})):e.resolve(h).then((function(t){s.value=t,a(s)}),(function(t){return r("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return y;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=l(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,y;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,y):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function S(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:C}}function C(){return{value:e,done:!0}}return g.prototype=b,u(x,"constructor",b),u(b,"constructor",g),g.displayName=u(b,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,u(t,c,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},O(L.prototype),u(L.prototype,a,(function(){return this})),t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(s(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},O(x),u(x,c,"Generator"),u(x,i,(function(){return this})),u(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return c.type="throw",c.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;P(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),y}},t}(t.exports);try{regeneratorRuntime=n}catch(o){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},166:function(t,e,r){"use strict";var n=r(147),o=Object(n.a)();e.a=o},336:function(t,e,r){"use strict";r.r(e);var n=r(119),o=r(7),i=r(104),a=r.n(i),c=r(0),u=r(354),s=r(311),l=r(351),h=r(166),f=r(30),p=r(2);e.default=function(){var t={},e=Object(c.useState)(),r=Object(o.a)(e,2),i=r[0],d=r[1],y=Object(c.useState)(),v=Object(o.a)(y,2),g=v[0],b=v[1],m=Object(c.useState)(),w=Object(o.a)(m,2),j=w[0],x=w[1],O=Object(c.useState)(""),L=Object(o.a)(O,2),k=L[0],E=L[1],P=function(t){switch(t.target.id){case"upload-cert-btn":d(t.target.files);break;case"upload-key-btn":b(t.target.files);break;case"keypass":x(t.target.value);break;case"rfc":console.log(t.target.value),E(t.target.value)}},_=function(){var e=Object(n.a)(a.a.mark((function e(){var r,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=Object.entries(i).map((function(e){return new Promise((function(r,n){var i=Object(o.a)(e,2),a=i[0],c=i[1],u=new FileReader;u.readAsBinaryString(c),u.onload=function(e){t.Certificate="".concat(btoa(e.target.result)),console.log(a),r()},u.onerror=function(){console.log("No se pudo procesar el archivo"),console.log(a),n()}}))})),n=Object.entries(g).map((function(e){return new Promise((function(r,n){var i=Object(o.a)(e,2),a=i[0],c=i[1],u=new FileReader;u.readAsBinaryString(c),u.onload=function(e){t.PrivateKey="".concat(btoa(e.target.result)),window.FacturamaMulti.Certificates.Create({Rfc:k,Certificate:t.Certificate,PrivateKey:t.PrivateKey,PrivateKeyPassword:j},(function(t){console.log(t),console.log(a),r(t)}),(function(t){console.log(a),console.log(t),n(t)}))},u.onerror=function(){console.log("No se pudo procesar el archivo"),n()}}))})),Promise.all(r,n).then((function(t){return console.log(t),console.log("procesado"),console.log("Volver al escritorio o registrar otro ente?"),!0})).then((function(t){t?(f.a.push("/admin/dashboard"),window.location.reload()):window.location.reload()})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.jsx)("div",{style:{width:"100%",height:"100vh"},children:Object(p.jsxs)(h.a,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",height:"80%"},children:[Object(p.jsx)(u.a,{label:"RFC",onChange:P,id:"rfc"}),Object(p.jsx)(u.a,{label:"Contrase\xf1a de llave privada",id:"keypass",onChange:P}),Object(p.jsxs)("label",{htmlFor:"upload-cert-btn",children:[Object(p.jsx)(s.a,{inputProps:{type:"file",accept:".cer"},sx:{display:"none"},onChange:P,id:"upload-cert-btn"}),Object(p.jsx)(l.a,{sx:{background:"blue",color:"white",margin:"2vh"},component:"span",children:"Subir certificado"})]}),Object(p.jsxs)("label",{htmlFor:"upload-key-btn",children:[Object(p.jsx)(s.a,{inputProps:{type:"file",accept:".key"},sx:{display:"none"},onChange:P,id:"upload-key-btn"}),Object(p.jsx)(l.a,{sx:{background:"red",color:"white",margin:"2vh"},component:"span",children:"Subir llave privada"})]}),Object(p.jsx)(l.a,{sx:{background:"green",color:"white"},onClick:_,children:"Enviar todo"})]})})}}}]);
//# sourceMappingURL=16.54ebadb3.chunk.js.map