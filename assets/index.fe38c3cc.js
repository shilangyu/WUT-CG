var Ie=Object.defineProperty,je=Object.defineProperties;var ke=Object.getOwnPropertyDescriptors;var oe=Object.getOwnPropertySymbols;var Be=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var ae=(s,e,t)=>e in s?Ie(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,V=(s,e)=>{for(var t in e||(e={}))Be.call(e,t)&&ae(s,t,e[t]);if(oe)for(var t of oe(e))Ve.call(e,t)&&ae(s,t,e[t]);return s},q=(s,e)=>je(s,ke(e));const qe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}};qe();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),le=new Map;class Oe{constructor(e,t){if(this._$cssResult$=!0,t!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=le.get(this.cssText);return Q&&e===void 0&&(le.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const ze=s=>new Oe(typeof s=="string"?s:s+"",ee),We=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new Oe(t,ee)},Ke=(s,e)=>{Q?s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),n=window.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,s.appendChild(i)})},he=Q?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ze(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const de=window.trustedTypes,Ye=de?de.emptyScript:"",ce=window.reactiveElementPolyfillSupport,Z={toAttribute(s,e){switch(e){case Boolean:s=s?Ye:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Te=(s,e)=>e!==s&&(e==e||s==s),W={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:Te};class E extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const n=this._$Eh(i,t);n!==void 0&&(this._$Eu.set(n,i),e.push(n))}),e}static createProperty(e,t=W){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(n){const r=this[e];this[t]=n,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of i)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)t.unshift(he(n))}else e!==void 0&&t.push(he(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ke(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=W){var n,r;const o=this.constructor._$Eh(e,i);if(o!==void 0&&i.reflect===!0){const h=((r=(n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==null&&r!==void 0?r:Z.toAttribute)(t,i.type);this._$Ei=e,h==null?this.removeAttribute(o):this.setAttribute(o,h),this._$Ei=null}}_$AK(e,t){var i,n,r;const o=this.constructor,h=o._$Eu.get(e);if(h!==void 0&&this._$Ei!==h){const a=o.getPropertyOptions(h),l=a.converter,v=(r=(n=(i=l)===null||i===void 0?void 0:i.fromAttribute)!==null&&n!==void 0?n:typeof l=="function"?l:null)!==null&&r!==void 0?r:Z.fromAttribute;this._$Ei=h,this[h]=v(t,a.type),this._$Ei=null}}requestUpdate(e,t,i){let n=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Te)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((n,r)=>this[r]=n),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(i)):this._$EU()}catch(n){throw t=!1,this._$EU(),n}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}E.finalized=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},ce==null||ce({ReactiveElement:E}),((z=globalThis.reactiveElementVersions)!==null&&z!==void 0?z:globalThis.reactiveElementVersions=[]).push("1.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var K;const O=globalThis.trustedTypes,pe=O?O.createPolicy("lit-html",{createHTML:s=>s}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,xe="?"+y,Fe=`<${xe}>`,T=document,U=(s="")=>T.createComment(s),M=s=>s===null||typeof s!="object"&&typeof s!="function",Re=Array.isArray,Je=s=>{var e;return Re(s)||typeof((e=s)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,ve=/>/g,A=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,fe=/'/g,_e=/"/g,Ue=/^(?:script|style|textarea|title)$/i,Ze=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),m=Ze(1),$=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),$e=new WeakMap,Xe=(s,e,t)=>{var i,n;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let o=r._$litPart$;if(o===void 0){const h=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new D(e.insertBefore(U(),h),h,void 0,t!=null?t:{})}return o._$AI(s),o},P=T.createTreeWalker(T,129,null,!1),Ge=(s,e)=>{const t=s.length-1,i=[];let n,r=e===2?"<svg>":"",o=R;for(let a=0;a<t;a++){const l=s[a];let v,c,p=-1,f=0;for(;f<l.length&&(o.lastIndex=f,c=o.exec(l),c!==null);)f=o.lastIndex,o===R?c[1]==="!--"?o=ue:c[1]!==void 0?o=ve:c[2]!==void 0?(Ue.test(c[2])&&(n=RegExp("</"+c[2],"g")),o=A):c[3]!==void 0&&(o=A):o===A?c[0]===">"?(o=n!=null?n:R,p=-1):c[1]===void 0?p=-2:(p=o.lastIndex-c[2].length,v=c[1],o=c[3]===void 0?A:c[3]==='"'?_e:fe):o===_e||o===fe?o=A:o===ue||o===ve?o=R:(o=A,n=void 0);const L=o===A&&s[a+1].startsWith("/>")?" ":"";r+=o===R?l+Fe:p>=0?(i.push(v),l.slice(0,p)+"$lit$"+l.slice(p)+y+L):l+y+(p===-2?(i.push(void 0),a):L)}const h=r+(s[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return[pe!==void 0?pe.createHTML(h):h,i]};class N{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let r=0,o=0;const h=e.length-1,a=this.parts,[l,v]=Ge(e,t);if(this.el=N.createElement(l,i),P.currentNode=this.el.content,t===2){const c=this.el.content,p=c.firstChild;p.remove(),c.append(...p.childNodes)}for(;(n=P.nextNode())!==null&&a.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const c=[];for(const p of n.getAttributeNames())if(p.endsWith("$lit$")||p.startsWith(y)){const f=v[o++];if(c.push(p),f!==void 0){const L=n.getAttribute(f.toLowerCase()+"$lit$").split(y),I=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:I[2],strings:L,ctor:I[1]==="."?et:I[1]==="?"?st:I[1]==="@"?it:k})}else a.push({type:6,index:r})}for(const p of c)n.removeAttribute(p)}if(Ue.test(n.tagName)){const c=n.textContent.split(y),p=c.length-1;if(p>0){n.textContent=O?O.emptyScript:"";for(let f=0;f<p;f++)n.append(c[f],U()),P.nextNode(),a.push({type:2,index:++r});n.append(c[p],U())}}}else if(n.nodeType===8)if(n.data===xe)a.push({type:2,index:r});else{let c=-1;for(;(c=n.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:r}),c+=y.length-1}r++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function x(s,e,t=s,i){var n,r,o,h;if(e===$)return e;let a=i!==void 0?(n=t._$Cl)===null||n===void 0?void 0:n[i]:t._$Cu;const l=M(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((r=a==null?void 0:a._$AO)===null||r===void 0||r.call(a,!1),l===void 0?a=void 0:(a=new l(s),a._$AT(s,t,i)),i!==void 0?((o=(h=t)._$Cl)!==null&&o!==void 0?o:h._$Cl=[])[i]=a:t._$Cu=a),a!==void 0&&(e=x(s,a._$AS(s,e.values),a,i)),e}class Qe{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:n}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:T).importNode(i,!0);P.currentNode=r;let o=P.nextNode(),h=0,a=0,l=n[0];for(;l!==void 0;){if(h===l.index){let v;l.type===2?v=new D(o,o.nextSibling,this,e):l.type===1?v=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(v=new nt(o,this,e)),this.v.push(v),l=n[++a]}h!==(l==null?void 0:l.index)&&(o=P.nextNode(),h++)}return r}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class D{constructor(e,t,i,n){var r;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cg=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=x(this,e,t),M(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==$&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Je(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==u&&M(this._$AH)?this._$AA.nextSibling.data=e:this.k(T.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=N.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(i);else{const o=new Qe(r,this),h=o.p(this.options);o.m(i),this.k(h),this._$AH=o}}_$AC(e){let t=$e.get(e.strings);return t===void 0&&$e.set(e.strings,t=new N(e)),t}S(e){Re(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const r of e)n===t.length?t.push(i=new D(this.M(U()),this.M(U()),this,this.options)):i=t[n],i._$AI(r),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class k{constructor(e,t,i,n,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,n){const r=this.strings;let o=!1;if(r===void 0)e=x(this,e,t,0),o=!M(e)||e!==this._$AH&&e!==$,o&&(this._$AH=e);else{const h=e;let a,l;for(e=r[0],a=0;a<r.length-1;a++)l=x(this,h[i+a],t,a),l===$&&(l=this._$AH[a]),o||(o=!M(l)||l!==this._$AH[a]),l===u?e=u:e!==u&&(e+=(l!=null?l:"")+r[a+1]),this._$AH[a]=l}o&&!n&&this.C(e)}C(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class et extends k{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===u?void 0:e}}const tt=O?O.emptyScript:"";class st extends k{constructor(){super(...arguments),this.type=4}C(e){e&&e!==u?this.element.setAttribute(this.name,tt):this.element.removeAttribute(this.name)}}class it extends k{constructor(e,t,i,n,r){super(e,t,i,n,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=x(this,e,t,0))!==null&&i!==void 0?i:u)===$)return;const n=this._$AH,r=e===u&&n!==u||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==u&&(n===u||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class nt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}}const ge=window.litHtmlPolyfillSupport;ge==null||ge(N,D),((K=globalThis.litHtmlVersions)!==null&&K!==void 0?K:globalThis.litHtmlVersions=[]).push("2.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Y,F;class _ extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Xe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return $}}_.finalized=!0,_._$litElement$=!0,(Y=globalThis.litElementHydrateSupport)===null||Y===void 0||Y.call(globalThis,{LitElement:_});const me=globalThis.litElementPolyfillSupport;me==null||me({LitElement:_});((F=globalThis.litElementVersions)!==null&&F!==void 0?F:globalThis.litElementVersions=[]).push("3.2.0");const w=s=>class extends s{constructor(){super(),this._observers=[]}update(e){X.start(),super.update(e),this._initStateObservers()}connectedCallback(){super.connectedCallback(),this._wasConnected&&(this.requestUpdate(),delete this._wasConnected)}disconnectedCallback(){super.disconnectedCallback(),this._wasConnected=!0,this._clearStateObservers()}_initStateObservers(){this._clearStateObservers(),this.isConnected&&this._addStateObservers(X.finish())}_addStateObservers(e){for(let[t,i]of e){const n=()=>this.requestUpdate();this._observers.push([t,n]),t.addObserver(n,i)}}_clearStateObservers(){for(let[e,t]of this._observers)e.removeObserver(t);this._observers=[]}};class rt{constructor(){this._observers=[],this._initStateVars()}addObserver(e,t){this._observers.push({observer:e,keys:t})}removeObserver(e){this._observers=this._observers.filter(t=>t.observer!==e)}_initStateVars(){if(this.constructor.stateVarOptions)for(let[e,t]of Object.entries(this.constructor.stateVarOptions))this._initStateVar(e,t);if(this.constructor.stateVars)for(let[e,t]of Object.entries(this.constructor.stateVars))this._initStateVar(e,{}),this[e]=t}_initStateVar(e,t){if(this.hasOwnProperty(e))return;t=this._parseOptions(t);const i=new t.handler({options:t,recordRead:()=>this._recordRead(e),notifyChange:()=>this._notifyChange(e)});Object.defineProperty(this,e,{get(){return i.get()},set(n){i.shouldSetValue(n)&&i.set(n)},configurable:!0,enumerable:!0})}_parseOptions(e){return e.handler?e.propertyMethod&&e.propertyMethod.kind==="method"&&Object.assign(e,e.propertyMethod.descriptor.value.call(this)):e.handler=ot,e}_recordRead(e){X.recordRead(this,e)}_notifyChange(e){for(const t of this._observers)(!t.keys||t.keys.includes(e))&&t.observer(e)}}class ot{constructor(e){this.options=e.options,this.recordRead=e.recordRead,this.notifyChange=e.notifyChange,this.value=void 0}get(){return this.recordRead(),this.value}shouldSetValue(e){return this.value!==e}set(e){this.value=e,this.notifyChange()}}class at{constructor(){this._log=null}start(){this._log=new Map}recordRead(e,t){if(this._log===null)return;const i=this._log.get(e)||[];i.includes(t)||i.push(t),this._log.set(e,i)}finish(){const e=this._log;return this._log=null,e}}const X=new at;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=s=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(s,e):((t,i)=>{const{kind:n,elements:r}=i;return{kind:n,elements:r,finisher(o){window.customElements.define(t,o)}}})(s,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=(s,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?q(V({},e),{finisher(t){t.createProperty(e.key,s)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,s)}};function te(s){return(e,t)=>t!==void 0?((i,n,r)=>{n.constructor.createProperty(r,i)})(s,e,t):lt(s,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=({finisher:s,descriptor:e})=>(t,i)=>{var n;if(i===void 0){const r=(n=t.originalKey)!==null&&n!==void 0?n:t.key,o=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:q(V({},t),{key:r});return s!=null&&(o.finisher=function(h){s(h,r)}),o}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),s==null||s(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(s,e){return ht({descriptor:t=>{const i={get(){var n,r;return(r=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(s))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const n=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,o;return this[n]===void 0&&(this[n]=(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(s))!==null&&o!==void 0?o:null),this[n]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var J;((J=window.HTMLSlotElement)===null||J===void 0?void 0:J.prototype.assignedElements)!=null;function B([s,e,t]){return`#${s.toString(16)}${e.toString(16)}${t.toString(16)}`}function ct(s){return[Number.parseInt(s.substring(1,3),16),Number.parseInt(s.substring(3,5),16),Number.parseInt(s.substring(5,7),16)]}class se{constructor(e){this.id=e,this.color=[0,0,0],this.thickness=1}}const Me=class extends se{constructor(){super(`Circle#${Me.num++}`),this.center=void 0,this.radius=void 0}addPoint(s){if(this.radius!==void 0)throw new Error("Cannot add a point after the circle was finished");return this.center===void 0?this.center=s:this.radius===void 0&&(this.radius=this.center.distance(s)),this.radius!==void 0}draw(s,e){this.center===void 0||this.radius===void 0||(s.strokeStyle=B(this.color),s.lineWidth=this.thickness,s.beginPath(),s.arc(this.center.x,this.center.y,this.radius,0,Math.PI*2),s.stroke())}move(s,e){if(this.center===void 0||this.radius===void 0)return;if(this.center.distance(s)<this.radius/2)this.center=this.center.add(e);else{const i=s.sub(this.center);i.dot(e)/(i.magnitude()*e.magnitude())>=0?this.radius+=e.magnitude():this.radius-=e.magnitude()}}};let Ne=Me;Ne.num=1;const S=class{constructor(s,e){this.x=s,this.y=e}distance(s){return Math.sqrt((this.x-s.x)**2+(this.y-s.y)**2)}distanceSq(s){return(this.x-s.x)**2+(this.y-s.y)**2}magnitude(){return this.distance(S.origin)}add(s){return new S(this.x+s.x,this.y+s.y)}sub(s){return new S(this.x-s.x,this.y-s.y)}div(s){return new S(this.x/s,this.y/s)}eq(s){return this.x===s.x&&this.y===s.y}dot(s){return this.x*s.x+this.y*s.y}static average(...s){return s.reduce((e,t)=>new S(e.x+t.x,e.y+t.y)).div(s.length)}};let g=S;g.origin=new S(0,0);const De=class extends se{constructor(){super(`Line#${De.num++}`),this.p1=void 0,this.p2=void 0}addPoint(s){if(this.p1!==void 0&&this.p2!==void 0)throw new Error("Cannot add a point after the line was created");return this.p1?this.p2||(this.p2=s):this.p1=s,this.p2!==void 0}draw(s,e){this.p1===void 0||this.p2===void 0||(s.strokeStyle=B(this.color),s.lineWidth=this.thickness,s.beginPath(),s.moveTo(this.p1.x,this.p1.y),s.lineTo(this.p2.x,this.p2.y),s.stroke())}move(s,e){if(this.p1===void 0||this.p2===void 0)return;const t=s.distanceSq(this.p1),i=s.distanceSq(this.p2),n=s.distanceSq(g.average(this.p1,this.p2)),r=Math.min(t,i,n);(r===t||r===n)&&(this.p1=this.p1.add(e)),(r===i||r===n)&&(this.p2=this.p2.add(e))}};let ie=De;ie.closeThreshold=10;ie.num=1;const G=class extends se{constructor(){super(`Polygon#${G.num++}`),this.points=[],this.isClosed=!1}addPoint(s){if(this.isClosed)throw new Error("Cannot add a point after the polygon was closed");return this.points.length===0?this.points.push(s):this.points.length>=3&&this.points[0].distance(s)<G.closeThreshold?this.isClosed=!0:this.points.push(s),this.isClosed}draw(s,e){if(this.points.length!==0){s.strokeStyle=B(this.color),s.lineWidth=this.thickness,s.beginPath(),s.moveTo(this.points[0].x,this.points[0].y);for(let t=1;t<this.points.length;t++){const{x:i,y:n}=this.points[t];s.lineTo(i,n)}this.isClosed&&s.closePath(),s.stroke()}}move(s,e){const t={center:g.average(...this.points),vertices:this.points,edges:this.points.map((r,o)=>g.average(r,this.points[(o+1)%this.points.length]))},i={center:t.center.distanceSq(s),vertices:t.vertices.map(r=>r.distanceSq(s)),edges:t.edges.map(r=>r.distanceSq(s))},n=Math.min(i.center,...i.vertices,...i.edges);if(n===i.center){this.points=this.points.map(r=>r.add(e));return}for(let r=0;r<i.vertices.length;r++)if(n===i.vertices[r]){this.points[r]=this.points[r].add(e);return}for(let r=0;r<i.edges.length;r++)if(n===i.edges[r]){this.points[r]=this.points[r].add(e),this.points[(r+1)%this.points.length]=this.points[(r+1)%this.points.length].add(e);return}}};let ne=G;ne.closeThreshold=10;ne.num=1;class He extends rt{get selectedShape(){return this.shapes.find(e=>e.id===this.selectedShapeId)}changeSelectedShapeThickness(e){this.selectedShape&&(this.selectedShape.thickness=e,this.shapes=[...this.shapes])}changeSelectedShapeColor(e){this.selectedShape&&(this.selectedShape.color=e,this.shapes=[...this.shapes])}deleteSelectedShape(){this.shapes=this.shapes.filter(e=>e.id!==this.selectedShapeId),this.selectedShapeId=void 0}deleteAllShapes(){this.selectedShapeId=void 0,this.shapes=[]}createCurrentShape(){switch(this.shapeMode){case"polygon":return new ne;case"line":return new ie;case"circle":return new Ne}}}He.stateVars={shapeMode:"polygon",antiAlias:!1,shapes:[],selectedShapeId:void 0};const d=new He;var pt=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,re=(s,e,t,i)=>{for(var n=i>1?void 0:i?ut(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&pt(e,t,n),n};class H extends _{constructor(){super(...arguments),this.width=400,this.height=400,this._lastRender=0}render(){return m`
      <canvas id="base" width=${this.width} height=${this.height}></canvas>
    `}firstUpdated(){requestAnimationFrame(t=>this._loop(t)),this.canvas.addEventListener("touchstart",t=>{t.preventDefault();const i=t.touches,n=[];for(let r=0;r<i.length;r++){const o=i[r];n.push(new g(o.clientX,o.clientY))}this.onTap(n)},!1),this.canvas.addEventListener("mousedown",t=>{t.preventDefault();var{left:i,top:n}=this.canvas.getBoundingClientRect(),r=t.clientX-i,o=t.clientY-n;this.onTap([new g(r,o)])},!1);let e;this.canvas.addEventListener("mousedown",({offsetX:t,offsetY:i})=>{e=new g(t,i)}),this.canvas.addEventListener("mouseup",()=>{e=void 0}),this.canvas.addEventListener("mousemove",({offsetX:t,offsetY:i})=>{if(e===void 0)return;const n=new g(t,i);n.eq(e)||(this.onMove(e,n.sub(e)),e=n)})}_loop(e){const t=e-this._lastRender;this.loop(t),this._lastRender=e;const i=this.canvas.getContext("2d");i&&(i.save(),i.clearRect(0,0,this.width,this.height),this.draw(i),i.restore()),requestAnimationFrame(n=>this._loop(n))}loop(e){}onTap(e){}onMove(e,t){}}re([dt("#base")],H.prototype,"canvas",2);re([te({type:Number})],H.prototype,"width",2);re([te({type:Number})],H.prototype,"height",2);var vt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,_t=(s,e,t,i)=>{for(var n=i>1?void 0:i?ft(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&vt(e,t,n),n};let ye=class extends w(H){firstUpdated(){super.firstUpdated(),d.addObserver(()=>{d.selectedShapeId!==void 0&&(this.active=void 0)},["selectedShapeId"]),d.addObserver(()=>{this.active=void 0},["shapeMode"])}draw(s){s.save(),s.fillStyle="#cccccc",s.fillRect(0,0,this.width,this.height),s.restore();for(const e of[...d.shapes,this.active])s.save(),e==null||e.draw(s,d.antiAlias),s.restore()}onTap(s){if(super.onTap(s),d.selectedShapeId||s.length===0)return;const e=s[0];this.active||(this.active=d.createCurrentShape()),this.active.addPoint(e)&&(d.shapes=[...d.shapes,this.active],this.active=void 0)}onMove(s,e){var t;(t=d.selectedShape)==null||t.move(s,e)}createRenderRoot(){return this}};ye=_t([b("app-canvas")],ye);var $t=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,Le=(s,e,t,i)=>{for(var n=i>1?void 0:i?gt(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&$t(e,t,n),n};let j=class extends H{constructor(){super(...arguments),this.pixelWindow=20,this.currPos=g.origin}async firstUpdated(){super.firstUpdated(),queueMicrotask(()=>{this.target=this.querySelector("canvas"),this.canvas.getContext("2d").imageSmoothingEnabled=!1,this.target.addEventListener("mousemove",({offsetX:s,offsetY:e})=>{this.currPos=new g(s,e)})})}draw(s){s.clearRect(0,0,this.width,this.height),s.drawImage(this.target,Math.min(Math.max(0,this.currPos.x-this.pixelWindow/2),this.target.width-this.pixelWindow),Math.min(Math.max(0,this.currPos.y-this.pixelWindow/2),this.target.height-this.pixelWindow),this.pixelWindow,this.pixelWindow,0,0,this.width,this.height)}render(){return m`
      <slot></slot>
      ${super.render()}
    `}};j.styles=We`
    :host > canvas {
      border: 1px solid black;
    }
  `;Le([te({type:Number})],j.prototype,"pixelWindow",2);j=Le([b("canvas-zoom")],j);var mt=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,bt=(s,e,t,i)=>{for(var n=i>1?void 0:i?yt(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&mt(e,t,n),n};let be=class extends w(_){render(){return m`
      <div>
        <input
          type="checkbox"
          id="antialias"
          name="antialias"
          @change=${this.onChange}
          ?checked=${d.antiAlias}
        />
        <label for="antialias">Anti-alias</label>
      </div>
    `}onChange(s){d.antiAlias=s.target.checked}};be=bt([b("antialias-checkbox")],be);var At=Object.defineProperty,St=Object.getOwnPropertyDescriptor,wt=(s,e,t,i)=>{for(var n=i>1?void 0:i?St(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&At(e,t,n),n};let Ae=class extends w(_){render(){var t,i,n,r;const s=(i=(t=d.selectedShape)==null?void 0:t.thickness)!=null?i:1,e=B((r=(n=d.selectedShape)==null?void 0:n.color)!=null?r:[0,0,0]);return m`
      <div>
        <div>
          <input
            type="color"
            id="shape-color"
            name="shape-color"
            @input=${this.onColorChange}
            .value=${e}
          />
          <label for="shape-color">Shape color</label>
        </div>
        <button @click=${this.onDelete}>Delete shape</button>
        <input
          type="range"
          id="thickness"
          name="thickness"
          min="1"
          max="10"
          @input=${this.onThicknessChange}
          .value=${s}
        />
        <label for="thickness">Thickness = ${s}</label>
      </div>
    `}onThicknessChange(s){const t=+s.target.value;d.changeSelectedShapeThickness(t)}onDelete(){d.deleteSelectedShape()}onColorChange(s){const e=s.target,t=ct(e.value);d.changeSelectedShapeColor(t)}};Ae=wt([b("manage-shape")],Ae);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ct=s=>(...e)=>({_$litDirective$:s,values:e});class Et{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=s=>s.strings===void 0,Ot={},Tt=(s,e=Ot)=>s._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=Ct(class extends Et{constructor(s){if(super(s),s.type!==C.PROPERTY&&s.type!==C.ATTRIBUTE&&s.type!==C.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Pt(s))throw Error("`live` bindings can only contain a single expression")}render(s){return s}update(s,[e]){if(e===$||e===u)return e;const t=s.element,i=s.name;if(s.type===C.PROPERTY){if(e===t[i])return $}else if(s.type===C.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return $}else if(s.type===C.ATTRIBUTE&&t.getAttribute(i)===e+"")return $;return Tt(s),e}});var xt=Object.defineProperty,Rt=Object.getOwnPropertyDescriptor,Ut=(s,e,t,i)=>{for(var n=i>1?void 0:i?Rt(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&xt(e,t,n),n};let we=class extends w(_){render(){return m`
      <label for="shape-select">Select shape:</label>

      <select name="shapes" id="shape-select" @change=${this.onChange}>
        <option
          value=""
          .selected=${Se(d.selectedShapeId===void 0)}
        >
          Drawing mode
        </option>
        ${d.shapes.map(s=>m`
              <option
                value=${s.id}
                .selected=${Se(s.id===d.selectedShapeId)}
              >
                ${s.id}
              </option>
            `)}
      </select>
    `}onChange(s){const t=s.target.selectedOptions[0].value;d.selectedShapeId=t===""?void 0:t}};we=Ut([b("pick-shape")],we);var Mt=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,Dt=(s,e,t,i)=>{for(var n=i>1?void 0:i?Nt(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Mt(e,t,n),n};let Ce=class extends w(_){render(){const s=new Blob([JSON.stringify(d.shapes)],{type:"application/json"}),e=URL.createObjectURL(s);return m`
      <a href=${e} download=${"shapes.json"}>
        <button ?disabled=${d.shapes.length===0}>Save shapes</button>
      </a>
    `}};Ce=Dt([b("save-shapes")],Ce);var Ht=Object.defineProperty,Lt=Object.getOwnPropertyDescriptor,It=(s,e,t,i)=>{for(var n=i>1?void 0:i?Lt(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&Ht(e,t,n),n};let Ee=class extends w(_){render(){return m`
      <div>
        <div>
          <input
            type="radio"
            id="polygon"
            name="drone"
            value="polygon"
            ?checked=${d.shapeMode==="polygon"}
            @change=${this.onChange}
          />
          <label for="polygon">polygon</label>
        </div>

        <div>
          <input
            type="radio"
            id="line"
            name="drone"
            value="line"
            ?checked=${d.shapeMode==="line"}
            @change=${this.onChange}
          />
          <label for="line">line</label>
        </div>

        <div>
          <input
            type="radio"
            id="circle"
            name="drone"
            value="circle"
            ?checked=${d.shapeMode==="circle"}
            @change=${this.onChange}
          />
          <label for="circle">circle</label>
        </div>
      </div>
    `}onChange(s){d.shapeMode=s.target.value}};Ee=It([b("shape-radio")],Ee);var jt=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,Bt=(s,e,t,i)=>{for(var n=i>1?void 0:i?kt(e,t):e,r=s.length-1,o;r>=0;r--)(o=s[r])&&(n=(i?o(e,t,n):o(n))||n);return i&&n&&jt(e,t,n),n};let Pe=class extends w(_){render(){return m`
      <canvas-zoom width="200" height="200">
        <app-canvas width="700" height="600" />
        <shape-radio></shape-radio>
        <save-shapes></save-shapes>
        <pick-shape></pick-shape>
        <antialias-checkbox></antialias-checkbox>
        <button @click=${()=>d.deleteAllShapes()}>
          Remove all shapes
        </button>
        ${d.selectedShapeId?m` <manage-shape></manage-shape> `:null}
      </canvas-zoom>
    `}};Pe=Bt([b("app-root")],Pe);