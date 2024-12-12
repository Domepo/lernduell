var w=Object.create;var i=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames,p=Object.getOwnPropertySymbols,A=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var g=(e,t,r)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||={})m.call(t,r)&&g(e,r,t[r]);if(p)for(var r of p(t))E.call(t,r)&&g(e,r,t[r]);return e};var _=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var c=(e,t)=>()=>(e&&(t=e(e=0)),t);var M=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),L=(e,t)=>{for(var r in t)i(e,r,{get:t[r],enumerable:!0})},P=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of y(t))!m.call(e,n)&&n!==r&&i(e,n,{get:()=>t[n],enumerable:!(s=C(t,n))||s.enumerable});return e};var U=(e,t,r)=>(r=e!=null?w(A(e)):{},P(t||!e||!e.__esModule?i(r,"default",{value:e,enumerable:!0}):r,e));import{createRequire as T}from"module";var l=c(()=>{"use strict";globalThis.require??=T(import.meta.url)});import x from"./angular-app-engine-manifest.mjs";var d=c(()=>{"use strict";S();R(x)});function R(e){h=e}function N(){if(!h)throw new Error("Angular app engine manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.");return h}function b(e,t){let{pathname:r}=e,s=t.length;r[s]==="/"&&s++;let n=r.indexOf("/",s);return n===-1&&(n=r.length),r.slice(s,n)}var h,a,f,I,V,k,z,S=c(()=>{"use strict";l();d();a=function(e){return e[e.Server=0]="Server",e[e.Client=1]="Client",e[e.Prerender=2]="Prerender",e}(a||{}),f=class{store=new Map;async run(t,r){let s=this.store.get(t);switch(t){case"html:transform:pre":{if(!s)return r.html;let n=v({},r);for(let o of s)n.html=await o(n);return n.html}default:throw new Error(`Running hook "${t}" is not supported.`)}}on(t,r){let s=this.store.get(t);s?s.push(r):this.store.set(t,[r])}has(t){return!!this.store.get(t)?.length}},I="ngCspMedia",V=`
(() => {
  const CSP_MEDIA_ATTR = '${I}';
  const documentElement = document.documentElement;

  // Listener for load events on link tags.
  const listener = (e) => {
    const target = e.target;
    if (
      !target ||
      target.tagName !== 'LINK' ||
      !target.hasAttribute(CSP_MEDIA_ATTR)
    ) {
      return;
    }

    target.media = target.getAttribute(CSP_MEDIA_ATTR);
    target.removeAttribute(CSP_MEDIA_ATTR);

    if (!document.head.querySelector(\`link[\${CSP_MEDIA_ATTR}]\`)) {
      documentElement.removeEventListener('load', listener);
    }
  };

  documentElement.addEventListener('load', listener, true);
})();`,k={[a.Prerender]:"ssg",[a.Server]:"ssr",[a.Client]:""};z=(()=>{class e{static \u0275allowStaticRouteRender=!1;static \u0275hooks=new f;manifest=N();entryPointsCache=new Map;async handle(r,s){let n=await this.getAngularServerAppForRequest(r);return n?n.handle(r,s):null}async getAngularServerAppForRequest(r){let s=new URL(r.url),n=await this.getEntryPointExportsForUrl(s);if(!n)return null;let o=n.\u0275getOrCreateAngularServerApp;return o({allowStaticRouteRender:e.\u0275allowStaticRouteRender,hooks:e.\u0275hooks})}getEntryPointExports(r){let s=this.entryPointsCache.get(r);if(s)return s;let{entryPoints:n}=this.manifest,o=n.get(r);if(!o)return;let u=o();return this.entryPointsCache.set(r,u),u}getEntryPointExportsForUrl(r){let{entryPoints:s,basePath:n}=this.manifest;if(s.size===1)return this.getEntryPointExports("");let o=b(r,n);return this.getEntryPointExports(o)}}return e})()});export{_ as a,M as b,L as c,U as d,l as e,z as f,S as g,d as h};
