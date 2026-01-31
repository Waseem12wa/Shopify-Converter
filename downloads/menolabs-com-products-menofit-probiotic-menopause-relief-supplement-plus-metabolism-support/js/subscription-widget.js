/** 
Mon Jan 26 2026 19:11:48 GMT+0000 (Coordinated Universal Time) - 9a349bce4ca0cff0f16840c38fff26bd81c91c8e
subscription-widget.js | © Recharge Inc.
**/
var rc=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Ty=rc((qy,tc)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const fr=globalThis,yi=fr.ShadowRoot&&(fr.ShadyCSS===void 0||fr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_i=Symbol(),Ji=new WeakMap;let _a=class{constructor(e,r,n){if(this._$cssResult$=!0,n!==_i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(yi&&e===void 0){const n=r!==void 0&&r.length===1;n&&(e=Ji.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ji.set(r,e))}return e}toString(){return this.cssText}};const nc=t=>new _a(typeof t=="string"?t:t+"",void 0,_i),X=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((n,i,o)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new _a(r,t,_i)},ic=(t,e)=>{if(yi)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const n=document.createElement("style"),i=fr.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=r.cssText,t.appendChild(n)}},Zi=yi?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const n of e.cssRules)r+=n.cssText;return nc(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:oc,defineProperty:ac,getOwnPropertyDescriptor:sc,getOwnPropertyNames:cc,getOwnPropertySymbols:lc,getPrototypeOf:uc}=Object,Te=globalThis,Xi=Te.trustedTypes,dc=Xi?Xi.emptyScript:"",tn=Te.reactiveElementPolyfillSupport,Ot=(t,e)=>t,_r={toAttribute(t,e){switch(e){case Boolean:t=t?dc:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},vi=(t,e)=>!oc(t,e),eo={attribute:!0,type:String,converter:_r,reflect:!1,hasChanged:vi};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Te.litPropertyMetadata??(Te.litPropertyMetadata=new WeakMap);class st extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=eo){if(r.state&&(r.attribute=!1),this._$Ei(),this.elementProperties.set(e,r),!r.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,r);i!==void 0&&ac(this.prototype,e,i)}}static getPropertyDescriptor(e,r,n){const{get:i,set:o}=sc(this.prototype,e)??{get(){return this[r]},set(a){this[r]=a}};return{get(){return i==null?void 0:i.call(this)},set(a){const s=i==null?void 0:i.call(this);o.call(this,a),this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??eo}static _$Ei(){if(this.hasOwnProperty(Ot("elementProperties")))return;const e=uc(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ot("properties"))){const r=this.properties,n=[...cc(r),...lc(r)];for(const i of n)this.createProperty(i,r[i])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[n,i]of r)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[r,n]of this.elementProperties){const i=this._$Eu(r,n);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)r.unshift(Zi(i))}else e!==void 0&&r.push(Zi(e));return r}static _$Eu(e,r){const n=r.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const n of r.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ic(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var n;return(n=r.hostConnected)==null?void 0:n.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var n;return(n=r.hostDisconnected)==null?void 0:n.call(r)})}attributeChangedCallback(e,r,n){this._$AK(e,n)}_$EC(e,r){var o;const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const a=(((o=n.converter)==null?void 0:o.toAttribute)!==void 0?n.converter:_r).toAttribute(r,n.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,r){var o;const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const a=n.getPropertyOptions(i),s=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:_r;this._$Em=i,this[i]=s.fromAttribute(r,a.type),this._$Em=null}}requestUpdate(e,r,n){if(e!==void 0){if(n??(n=this.constructor.getPropertyOptions(e)),!(n.hasChanged??vi)(this[e],r))return;this.P(e,r,n)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,r,n){this._$AL.has(e)||this._$AL.set(e,r),n.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,a]of this._$Ep)this[o]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,a]of i)a.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],a)}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(n=this._$EO)==null||n.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(r)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(n=>{var i;return(i=n.hostUpdated)==null?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(r=>this._$EC(r,this[r]))),this._$EU()}updated(e){}firstUpdated(e){}}st.elementStyles=[],st.shadowRootOptions={mode:"open"},st[Ot("elementProperties")]=new Map,st[Ot("finalized")]=new Map,tn==null||tn({ReactiveElement:st}),(Te.reactiveElementVersions??(Te.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=globalThis,vr=$t.trustedTypes,to=vr?vr.createPolicy("lit-html",{createHTML:t=>t}):void 0,va="$lit$",$e=`lit$${Math.random().toFixed(9).slice(2)}$`,ma="?"+$e,pc=`<${ma}>`,He=document,Rt=()=>He.createComment(""),Bt=t=>t===null||typeof t!="object"&&typeof t!="function",ba=Array.isArray,fc=t=>ba(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",rn=`[ 	
\f\r]`,wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ro=/-->/g,no=/>/g,Re=RegExp(`>|${rn}(?:([^\\s"'>=/]+)(${rn}*=${rn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),io=/'/g,oo=/"/g,wa=/^(?:script|style|textarea|title)$/i,hc=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),_=hc(1),me=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),ao=new WeakMap,qe=He.createTreeWalker(He,129);function xa(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return to!==void 0?to.createHTML(e):e}const gc=(t,e)=>{const r=t.length-1,n=[];let i,o=e===2?"<svg>":"",a=wt;for(let s=0;s<r;s++){const c=t[s];let l,u,d=-1,f=0;for(;f<c.length&&(a.lastIndex=f,u=a.exec(c),u!==null);)f=a.lastIndex,a===wt?u[1]==="!--"?a=ro:u[1]!==void 0?a=no:u[2]!==void 0?(wa.test(u[2])&&(i=RegExp("</"+u[2],"g")),a=Re):u[3]!==void 0&&(a=Re):a===Re?u[0]===">"?(a=i??wt,d=-1):u[1]===void 0?d=-2:(d=a.lastIndex-u[2].length,l=u[1],a=u[3]===void 0?Re:u[3]==='"'?oo:io):a===oo||a===io?a=Re:a===ro||a===no?a=wt:(a=Re,i=void 0);const g=a===Re&&t[s+1].startsWith("/>")?" ":"";o+=a===wt?c+pc:d>=0?(n.push(l),c.slice(0,d)+va+c.slice(d)+$e+g):c+$e+(d===-2?s:g)}return[xa(t,o+(t[r]||"<?>")+(e===2?"</svg>":"")),n]};class jt{constructor({strings:e,_$litType$:r},n){let i;this.parts=[];let o=0,a=0;const s=e.length-1,c=this.parts,[l,u]=gc(e,r);if(this.el=jt.createElement(l,n),qe.currentNode=this.el.content,r===2){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=qe.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(const d of i.getAttributeNames())if(d.endsWith(va)){const f=u[a++],g=i.getAttribute(d).split($e),m=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:m[2],strings:g,ctor:m[1]==="."?_c:m[1]==="?"?vc:m[1]==="@"?mc:Nr}),i.removeAttribute(d)}else d.startsWith($e)&&(c.push({type:6,index:o}),i.removeAttribute(d));if(wa.test(i.tagName)){const d=i.textContent.split($e),f=d.length-1;if(f>0){i.textContent=vr?vr.emptyScript:"";for(let g=0;g<f;g++)i.append(d[g],Rt()),qe.nextNode(),c.push({type:2,index:++o});i.append(d[f],Rt())}}}else if(i.nodeType===8)if(i.data===ma)c.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf($e,d+1))!==-1;)c.push({type:7,index:o}),d+=$e.length-1}o++}}static createElement(e,r){const n=He.createElement("template");return n.innerHTML=e,n}}function pt(t,e,r=t,n){var a,s;if(e===me)return e;let i=n!==void 0?(a=r._$Co)==null?void 0:a[n]:r._$Cl;const o=Bt(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((s=i==null?void 0:i._$AO)==null||s.call(i,!1),o===void 0?i=void 0:(i=new o(t),i._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=i:r._$Cl=i),i!==void 0&&(e=pt(t,i._$AS(t,e.values),i,n)),e}class yc{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:n}=this._$AD,i=((e==null?void 0:e.creationScope)??He).importNode(r,!0);qe.currentNode=i;let o=qe.nextNode(),a=0,s=0,c=n[0];for(;c!==void 0;){if(a===c.index){let l;c.type===2?l=new Wt(o,o.nextSibling,this,e):c.type===1?l=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(l=new bc(o,this,e)),this._$AV.push(l),c=n[++s]}a!==(c==null?void 0:c.index)&&(o=qe.nextNode(),a++)}return qe.currentNode=He,i}p(e){let r=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}}class Wt{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,n,i){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=pt(this,e,r),Bt(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==me&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):fc(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==y&&Bt(this._$AH)?this._$AA.nextSibling.data=e:this.T(He.createTextNode(e)),this._$AH=e}$(e){var o;const{values:r,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=jt.createElement(xa(n.h,n.h[0]),this.options)),n);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(r);else{const a=new yc(i,this),s=a.u(this.options);a.p(r),this.T(s),this._$AH=a}}_$AC(e){let r=ao.get(e.strings);return r===void 0&&ao.set(e.strings,r=new jt(e)),r}k(e){ba(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let n,i=0;for(const o of e)i===r.length?r.push(n=new Wt(this.S(Rt()),this.S(Rt()),this,this.options)):n=r[i],n._$AI(o),i++;i<r.length&&(this._$AR(n&&n._$AB.nextSibling,i),r.length=i)}_$AR(e=this._$AA.nextSibling,r){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,r);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class Nr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,i,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=r,this._$AM=i,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=y}_$AI(e,r=this,n,i){const o=this.strings;let a=!1;if(o===void 0)e=pt(this,e,r,0),a=!Bt(e)||e!==this._$AH&&e!==me,a&&(this._$AH=e);else{const s=e;let c,l;for(e=o[0],c=0;c<o.length-1;c++)l=pt(this,s[n+c],r,c),l===me&&(l=this._$AH[c]),a||(a=!Bt(l)||l!==this._$AH[c]),l===y?e=y:e!==y&&(e+=(l??"")+o[c+1]),this._$AH[c]=l}a&&!i&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class _c extends Nr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}}class vc extends Nr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}}class mc extends Nr{constructor(e,r,n,i,o){super(e,r,n,i,o),this.type=5}_$AI(e,r=this){if((e=pt(this,e,r,0)??y)===me)return;const n=this._$AH,i=e===y&&n!==y||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==y&&(n===y||i);i&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class bc{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){pt(this,e)}}const nn=$t.litHtmlPolyfillSupport;nn==null||nn(jt,Wt),($t.litHtmlVersions??($t.litHtmlVersions=[])).push("3.1.4");const Mt=(t,e,r)=>{const n=(r==null?void 0:r.renderBefore)??e;let i=n._$litPart$;if(i===void 0){const o=(r==null?void 0:r.renderBefore)??null;n._$litPart$=i=new Wt(e.insertBefore(Rt(),o),o,void 0,r??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let U=class extends st{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Mt(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return me}};var ga;U._$litElement$=!0,U.finalized=!0,(ga=globalThis.litElementHydrateSupport)==null||ga.call(globalThis,{LitElement:U});const on=globalThis.litElementPolyfillSupport;on==null||on({LitElement:U});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.6");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ie=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wc={attribute:!0,type:String,converter:_r,reflect:!1,hasChanged:vi},xc=(t=wc,e,r)=>{const{kind:n,metadata:i}=r;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),o.set(r.name,t),n==="accessor"){const{name:a}=r;return{set(s){const c=e.get.call(this);e.set.call(this,s),this.requestUpdate(a,c,t)},init(s){return s!==void 0&&this.P(a,void 0,t),s}}}if(n==="setter"){const{name:a}=r;return function(s){const c=this[a];e.call(this,s),this.requestUpdate(a,c,t)}}throw Error("Unsupported decorator location: "+n)};function D(t){return(e,r)=>typeof r=="object"?xc(t,e,r):((n,i,o)=>{const a=i.hasOwnProperty(o);return i.constructor.createProperty(o,a?{...n,wrapped:!0}:n),a?Object.getOwnPropertyDescriptor(i,o):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function de(t){return D({...t,state:!0,attribute:!1})}const Sa="USD",Sc=new Map([["AED",2],["AFN",2],["ALL",2],["AMD",2],["ANG",2],["AOA",2],["ARS",2],["AUD",2],["AWG",2],["AZN",2],["BAM",2],["BBD",2],["BDT",2],["BGN",2],["BHD",3],["BIF",0],["BMD",2],["BND",2],["BOB",2],["BOV",2],["BRL",2],["BSD",2],["BTN",2],["BWP",2],["BYN",2],["BYR",0],["BZD",2],["CAD",2],["CDF",2],["CHE",2],["CHF",2],["CHW",2],["CLF",4],["CLP",0],["CNY",2],["COP",2],["COU",2],["CRC",2],["CUC",2],["CUP",2],["CVE",2],["CZK",2],["DJF",0],["DKK",2],["DOP",2],["DZD",2],["EGP",2],["ERN",2],["ETB",2],["EUR",2],["FJD",2],["FKP",2],["GBP",2],["GEL",2],["GHS",2],["GIP",2],["GMD",2],["GNF",0],["GTQ",2],["GYD",2],["HKD",2],["HNL",2],["HRK",2],["HTG",2],["HUF",2],["IDR",2],["ILS",2],["INR",2],["IQD",3],["IRR",2],["ISK",0],["JEP",2],["JMD",2],["JOD",3],["JPY",0],["KES",2],["KGS",2],["KHR",2],["KMF",0],["KPW",2],["KRW",0],["KWD",3],["KYD",2],["KZT",2],["LAK",2],["LBP",2],["LKR",2],["LRD",2],["LSL",2],["LYD",3],["MAD",2],["MDL",2],["MGA",2],["MKD",2],["MMK",2],["MNT",2],["MOP",2],["MRO",5],["MUR",2],["MVR",2],["MWK",2],["MXN",2],["MXV",2],["MYR",2],["MZN",2],["NAD",2],["NGN",2],["NIO",2],["NOK",2],["NPR",2],["NZD",2],["OMR",3],["PAB",2],["PEN",2],["PGK",2],["PHP",2],["PKR",2],["PLN",2],["PYG",0],["QAR",2],["RON",2],["RSD",2],["RUB",2],["RWF",0],["SAR",2],["SBD",2],["SCR",2],["SDG",2],["SEK",2],["SGD",2],["SHP",2],["SLL",2],["SOS",2],["SRD",2],["SSP",2],["STD",2],["STN",2],["SVC",2],["SYP",2],["SZL",2],["THB",2],["TJS",2],["TMT",2],["TND",3],["TOP",2],["TRY",2],["TTD",2],["TWD",2],["TZS",2],["UAH",2],["UGX",0],["USD",2],["USN",2],["UYI",0],["UYU",2],["UYW",4],["UZS",2],["VED",2],["VEF",2],["VES",2],["VND",0],["VUV",0],["WST",2],["XAF",0],["XAG",0],["XAU",0],["XBA",0],["XBB",0],["XBC",0],["XBD",0],["XCD",2],["XDR",0],["XOF",0],["XPD",0],["XPF",0],["XPT",0],["XSU",0],["XTS",0],["XUA",0],["YER",2],["ZAR",2],["ZMW",2],["ZWL",2]]),an=new Map;function mi(t,e){const r=Pc(t,e);if(an.has(r))return an.get(r);const n=new Intl.NumberFormat(t,e);return an.set(r,n),n}function Pc(t,e={}){return`${Array.isArray(t)?Array.from(t).sort().join("-"):t}-${JSON.stringify(e)}`}var Oc=Object.defineProperty,mr=Object.getOwnPropertySymbols,Pa=Object.prototype.hasOwnProperty,Oa=Object.prototype.propertyIsEnumerable,so=(t,e,r)=>e in t?Oc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,$c=(t,e)=>{for(var r in e||(e={}))Pa.call(e,r)&&so(t,r,e[r]);if(mr)for(var r of mr(e))Oa.call(e,r)&&so(t,r,e[r]);return t},Mc=(t,e)=>{var r={};for(var n in t)Pa.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&mr)for(var n of mr(t))e.indexOf(n)<0&&Oa.call(t,n)&&(r[n]=t[n]);return r};function Ec(t,e,r={}){var n=r,{as:i,precision:o}=n,a=Mc(n,["as","precision"]);return i==="currency"&&a.currency==null?(console.error("formatNumber(amount, {as: 'currency'}) cannot be called without a currency code."),""):mi(e,$c({style:i,maximumFractionDigits:o},a)).format(t)}var Cc=Object.defineProperty,Tc=Object.defineProperties,Dc=Object.getOwnPropertyDescriptors,br=Object.getOwnPropertySymbols,$a=Object.prototype.hasOwnProperty,Ma=Object.prototype.propertyIsEnumerable,co=(t,e,r)=>e in t?Cc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,wr=(t,e)=>{for(var r in e||(e={}))$a.call(e,r)&&co(t,r,e[r]);if(br)for(var r of br(e))Ma.call(e,r)&&co(t,r,e[r]);return t},Ac=(t,e)=>Tc(t,Dc(e)),kc=(t,e)=>{var r={};for(var n in t)$a.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&br)for(var n of br(t))e.indexOf(n)<0&&Ma.call(t,n)&&(r[n]=t[n]);return r};function Nc(t,e,r={}){var n=r,{form:i}=n,o=kc(n,["form"]),a,s;switch(o=Ac(wr({},o),{currency:(s=(a=o.currency)!=null?a:o.defaultCurrency)!=null?s:Sa}),i){case"auto":return Ic(t,e,o,o.defaultCurrency);case"explicit":return Ea(t,e,o);case"short":return bi(t,e,o);case"none":return Ca(t,e,o)}return Ec(t,e,wr({as:"currency"},o))}function Ic(t,e,r={},n=Sa){return r.currency===n?bi(t,e,r):Ea(t,e,r)}function Ea(t,e,r={}){const n=bi(t,e,r),i=r.currency||"";return n.includes(i)?n:`${n} ${i}`}function bi(t,e,r={}){const n=Ca(t,e,r),i=Lc(e,r),o=i.prefixed?`${i.shortSymbol}${n}`:`${n}${i.shortSymbol}`;return t<0?`-${o.replace(/[-−]/,"")}`:o}function Ca(t,e,r={}){let n=r.precision;if(n===void 0){const i=r.currency||"";n=Sc.get(i.toUpperCase())}return mi(e,wr({style:"decimal",minimumFractionDigits:n,maximumFractionDigits:n},r)).format(t)}function Lc(t,e){const r=",.",n=/[\u200E\u200F]/,i=new RegExp(`0[${r}]*0*`),a=mi(t,wr({style:"currency"},e)).format(0).replace(n,""),s=i.exec(a);if(!s)throw new Error(`Number input in locale ${t} is currently not supported.`);const c=s[0],[l,u]=a.split(c),d=l||u,f=Rc(d,e.currency);return{symbol:d,shortSymbol:f,prefixed:l!=="",currencyCode:e.currency}}function Rc(t,e){var r;const n=(r=e.substring(0,2))!=null?r:"",i=t.replace(n,"");return/[A-Za-zÀ-ÖØ-öø-ÿĀ-ɏḂ-ỳ]/.exec(i)?t:i}var ae=(t=>(t.Load="rc_widget_load",t.TypeChanged="rc_widget_type_changed",t.VariantChanged="rc_widget_variant_changed",t.AddToCart="add_to_cart",t.LoadLog="rc_widget_load_log",t.SellingPlanChanged="selling_plan_changed",t.BuyNow="rc_widget_buy_now_clicked",t))(ae||{}),Bc=Object.defineProperty,jc=Object.defineProperties,Uc=Object.getOwnPropertyDescriptors,lo=Object.getOwnPropertySymbols,qc=Object.prototype.hasOwnProperty,Fc=Object.prototype.propertyIsEnumerable,uo=(t,e,r)=>e in t?Bc(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Pe=(t,e)=>{for(var r in e||(e={}))qc.call(e,r)&&uo(t,r,e[r]);if(lo)for(var r of lo(e))Fc.call(e,r)&&uo(t,r,e[r]);return t},Ta=(t,e)=>jc(t,Uc(e)),$=(t=>(t.Subscription="subscription",t.Onetime="onetime",t.Prepaid="prepaid_subscription",t))($||{}),E=(t=>(t.MaxDiscount="{maxDiscount}",t.Discount="{discount}",t.Interval="{interval}",t.PrepaidUnitPrice="{unitPrice}",t.PrepaidChargeInterval="{chargeInterval}",t.DiscountPrice="{discountPrice}",t.InitialDiscountAmount="{initialDiscountAmount}",t.InitialDiscountPercentage="{initialDiscountPercentage}",t.RecurringDiscountAmount="{recurringDiscountAmount}",t.RecurringDiscountPercentage="{recurringDiscountPercentage}",t.RecurringDiscountCount="{recurringDiscountCount}",t.RecurringDiscountCountWithInterval="{recurringDiscountCountWithInterval}",t.ShippingInterval="{shippingInterval}",t.Amount="{amount}",t))(E||{}),se=(t=>(t.Default="default",t.Recharge="recharge",t.RechargePreview="recharge_preview",t.MerchantOverride="merchant_override",t))(se||{});function zc(t){if(!t)return!1;if(typeof t!="object")return console.error("Widget configuration is not an object"),!1;const e=new Set(["displayMode","benefitsImage","benefits","defaultSelection","firstSelectionOption","subscriptionWithDiscountLabel","subscriptionWithoutDiscountLabel","onetimeLabel","onetimeDrawbacks","frequencyLabel","learnMoreText","learnMoreContent","showStrikethroughPrice","staticPricingText","dynamicPricingText","badgeText","frequencyDisplayType","frequencyDisplayContent","frequencyIntervalTranslation","brand_color","brand_contrast_color","text_color","selected_bg_color","selected_text_color","badge_text_color","badge_bg_color","border_radius"]),r=t,n=Object.keys(r).filter(i=>!e.has(i));return n.length>0?(console.error("Invalid widget configuration keys:",n),!1):r.displayMode&&!["normal","compact"].includes(r.displayMode)?(console.error("Widget configuration displayMode is invalid"),!1):r.frequencyDisplayType&&!["dropdown","buttonGroup","buttonList"].includes(r.frequencyDisplayType)?(console.error("Widget configuration frequencyDisplayType is invalid"),!1):r.frequencyDisplayContent&&!["planName","interval"].includes(r.frequencyDisplayContent)?(console.error("Widget configuration frequencyDisplayContent is invalid"),!1):r.border_radius&&!["square","round","soft"].includes(r.border_radius)?(console.error("Widget configuration border_radius is invalid"),!1):!0}const Hc={badgeBestValue:!0,badgeBestValueText:"Best value",badgeBestValueTextColor:"#0BBB8D",badgeBestValueBackgroundColor:"#FFFFFF",badgeBestValueOutlineColor:"#0BBB8D",badgeRecommended:!0,badgeRecommendedText:"Recommended",badgeRecommendedTextColor:"#FFFFFF",badgeRecommendedBackgroundColor:"#0BBB8D",badgeRecommendedOutlineColor:"#0BBB8D",badgeSavingPercentage:!0,badgeSavingPercentageText:"Save {discount}",badgeSavingPercentageTextColor:"#FFFFFF",badgeSavingPercentageBackgroundColor:"#8A95A0",badgeSavingPercentageOutlineColor:"#8A95A0"},Vc={type:["default"],displayMode:"normal",benefitsImage:"",benefits:"<ul><li><p>Save {discount}</p></li><li><p>Free shipping</p></li><li><p>No commitment. Cancel anytime</p></li></ul>",defaultSelection:"subscription",firstSelectionOption:"subscription",subscriptionWithoutDiscountLabel:"Subscribe",subscriptionWithDiscountLabel:"Subscribe & save",frequencyIntervalTranslation:{days:"{interval} days",day:"{interval} day",weeks:"{interval} weeks",week:"{interval} week",months:"{interval} months",month:"{interval} month",save:"save {discount}",prepaidUnit:"{unitPrice}/ea",chargeInterval:"Pay every {chargeInterval}"},onetimeLabel:"One-time",onetimeDrawbacks:"",frequencyLabel:"Deliver every:",learnMoreText:"Learn more",learnMoreContent:Yc(),showStrikethroughPrice:!0,staticPricingText:"{discountPrice}",badgeText:"Save up to {maxDiscount}",frequencyDisplayType:"buttonGroup",frequencyDisplayContent:"interval",showPoweredByRecharge:!0,customCSS:""},Wc={use_theme_styles:!1,brand_color:"#121212",brand_contrast_color:"#FFFFFF",text_color:"#121212",selected_bg_color:"#FFFFFF",selected_text_color:"#121212",badge_text_color:"#FFFFFF",badge_bg_color:"#0F866A",border_radius:"soft"},Ir=W(Vc,Wc);W(Ir,{benefits:"<ul><li>{amount} units shipped every {shippingInterval}</li><li>{discountPrice} saved every {shippingInterval}</li><li>{unitPrice} per unit</li></ul>",quantity_upsell:Hc});function T(){return window.SubscriptionWidgetConfig?window.SubscriptionWidgetConfig:(console.warn("SubscriptionWidgetConfig not found."),null)}function Qc(t){if(!t)return null;const e=window[t];return zc(e)?Ta(Pe({},e),{type:"merchant_override"}):null}function W(t,e){let r=[];Array.isArray(t.type)?r=t.type:t.type&&(r=[t.type]);const n=e!=null&&e.type?Array.isArray(e.type)?e.type:[e.type]:[],i=Array.from(new Set([...r,...n]));return Ta(Pe(Pe(Pe({},t),e),i.length>0?{type:i}:{}),{frequencyIntervalTranslation:Pe(Pe({},t.frequencyIntervalTranslation),e==null?void 0:e.frequencyIntervalTranslation),quantity_upsell:t.quantity_upsell||e!=null&&e.quantity_upsell?Pe(Pe({},t.quantity_upsell),e==null?void 0:e.quantity_upsell):void 0})}function Yc(){return`<style>
  rc-learn-more-modal h1 {
    font-size: 40px;
    line-height: 48px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 32px;
    margin: 0;
  }
  rc-learn-more-modal h2 {
    padding: 0;
    margin: 0;
    font-size: 20px;
    line-height: 28px;
    font-weight: 600;
  }
  rc-learn-more-modal p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 24px;
  }
  rc-learn-more-modal .learn-more-content {
    padding: 0 20px 20px;
  }
  rc-learn-more-modal .learn-more-footer button {
    background-color: var(--rc-widget-brand-color);
    color: var(--rc-widget-brand-contrast-color);
    border: none;
    border-radius: var(--rc-widget-button-radius);
    padding: 12px;
    min-width: 335px;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    cursor: pointer;
    transition: background-color 0.1s ease;
    font-family: inherit;
  }
  rc-learn-more-modal .learn-more-footer button:hover {
    background-color: var(--rc-widget-brand-color-80);
  }
  rc-learn-more-modal .learn-more-footer {
    display: flex;
    justify-content: center;
  }
  rc-learn-more-modal .learn-more-group {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
  }
  rc-learn-more-modal .learn-more-group-item {
    display: flex;
    gap: 32px;
    align-items: center;
  }
  rc-learn-more-modal .learn-more-group-icon-container {
    display: flex;
    padding: 32px;
    background-color: #f6f8f9;
    border-radius: var(--rc-widget-card-radius);
  }
  rc-learn-more-modal svg,
  rc-learn-more-modal img {
    height: 40px;
    width: 40px;
  }
  @media (max-width: 560px) {
    rc-learn-more-modal h1 {
      font-size: 26px;
      line-height: 32px;
      padding-bottom: 16px;
    }
    rc-learn-more-modal h2 {
      font-size: 16px;
      line-height: 24px;
    }
    rc-learn-more-modal p {
      font-size: 14px;
      line-height: 20px;
    }
    rc-learn-more-modal .learn-more-content {
      padding: 0;
    }
    rc-learn-more-modal svg,
    rc-learn-more-modal img {
      height: 32px;
      width: 32px;
    }
    rc-learn-more-modal .learn-more-group-item {
      gap: 16px;
    }
    rc-learn-more-modal .learn-more-group-icon-container {
      padding: 20px;
    }
  }
</style>
<div class="learn-more-content">
  <h1 class="learn-more-header">Great reasons to subscribe</h1>
  <ul class="learn-more-group">
    <li class="learn-more-group-item">
      <div class="learn-more-group-icon-container">
        <span rc-calendar-icon></span>
      </div>
      <div>
        <h2 style="margin: 0">Flexible frequency</h2>
        <p style="margin: 0">
          Not sure how much of something you need, or how often? Adjust
          quantities and frequencies any time.
        </p>
      </div>
    </li>
    <li class="learn-more-group-item">
      <div class="learn-more-group-icon-container">
        <span rc-bell-icon></span>
      </div>
      <div>
        <h2>Order reminders</h2>
        <p>
          We'll let you know before each shipment. Delay, reschedule or cancel
          if you need to - we'll only bill you when your order ships.
        </p>
      </div>
    </li>
    <li class="learn-more-group-item">
      <div class="learn-more-group-icon-container">
        <span rc-phone-icon></span>
      </div>
      <div>
        <h2>You're in control</h2>
        <p>
          Add or remove subscriptions, cancel orders, and edit frequencies and
          quantities through our user-friendly customer portal.
        </p>
      </div>
    </li>
  </ul>
</div>
<div class="learn-more-footer"><button data-dismiss-modal>Got it</button></div>`}function Ve(){return window.Shopify?window.Shopify:(console.warn("Shopify instance not found."),null)}function Gc(t){var e;const r=(e=T())==null?void 0:e.product;switch(t){case"specific_product":if(!r)throw new Error("No product found on the SubscriptionWidgetConfig. This is required to preview a specific product.");return r;case"prepaid":return{external_product_id:1,hasOnetimePlan:!1,plans:[cn.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[cn.price]}]}],variantLevelPlans:{1:[cn.plan]}};case"subscription":return{external_product_id:1,hasOnetimePlan:!1,plans:[Z.plan,fe.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[Z.price,fe.price]}]}],variantLevelPlans:{1:[Z.plan,fe.plan]}};case"prepaid_v2":return{external_product_id:1,hasOnetimePlan:!0,plans:[L.plan,Z.plan,fe.plan,sn.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[L.price,Z.price,fe.price,sn.price]}]}],variantLevelPlans:{1:[Z.plan,fe.plan,sn.plan]}};case"subscription-and-onetime":return{external_product_id:1,hasOnetimePlan:!0,plans:[L.plan,Z.plan,fe.plan,dn.plan,tt.plan,ln.plan,un.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[L.price,Z.price,fe.price,dn.price,tt.price,ln.price,un.price]}]}],variantLevelPlans:{1:[Z.plan,fe.plan,dn.plan,tt.plan,ln.plan,un.plan]}};case"single_subscription":return{external_product_id:1,hasOnetimePlan:!0,plans:[L.plan,Z.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[L.price,Z.price]}]}],variantLevelPlans:{1:[Z.plan]}};case"quantity-upsell":return{external_product_id:1,hasOnetimePlan:!0,plans:[L.plan,yn.plan,gn.plan,hn.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[L.price,yn.price,gn.price,hn.price]}]}],variantLevelPlans:{1:[gn.plan,yn.plan,hn.plan]}};case"dynamic_pricing":return{external_product_id:1,hasOnetimePlan:!0,plans:[L.plan,pn.plan,fn.plan,tt.plan],variants:[{id:1,hasOnetimePlan:!1,external_variant_id:"1",option_values:["A"],prices:[{currency:"USD",unit_price:L.price.discounted_price,compare_at_price:null,plans:[L.price,pn.price,fn.price,tt.price]}]}],variantLevelPlans:{1:[pn.plan,fn.plan,tt.plan]}}}}const L={plan:{id:1,title:"Amazing Jerky Box",type:"onetime",discount_amount:null,discount_type:null,external_plan_id:null,external_plan_group_id:null,external_plan_name:null,sort_order:1,charge_interval_frequency:null,order_interval_frequency:null,interval_unit:null,external_variant_ids:[],has_variant_restrictions:!1,apply_custom_date_to_checkout:!1,pricing_progression:[]},price:{id:1,discounted_price:"29.99",discount_value:"0.00"}},sn={plan:{id:2,title:"3 month prepaid subscription",type:"prepaid_v2",discount_amount:"15.00",discount_type:"percentage",external_plan_id:2,external_plan_group_id:78105215345,external_plan_name:"3 month prepaid subscription",sort_order:7,charge_interval_frequency:3,order_interval_frequency:1,interval_unit:"month",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:2,discounted_price:"76.47",discount_value:"13.50"}},cn={plan:{id:3,title:"3 month prepaid subscription",type:"prepaid",discount_amount:"15.00",discount_type:"percentage",external_plan_id:3,external_plan_group_id:78105018737,external_plan_name:"3 month prepaid subscription with 15% discount",sort_order:1,charge_interval_frequency:3,order_interval_frequency:1,interval_unit:"month",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:3,discounted_price:"76.47",discount_value:"13.50"}},Z={plan:{id:4,title:"1 month subscription with 10% discount",type:"subscription",discount_amount:"10.00",discount_type:"percentage",external_plan_id:4,external_plan_group_id:78105051505,external_plan_name:"1 month subscription with 10% discount",sort_order:1,charge_interval_frequency:1,order_interval_frequency:1,interval_unit:"month",external_variant_ids:["51679065440625","51679065473393"],has_variant_restrictions:!0,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:4,discounted_price:"26.99",discount_value:"3.00"}},fe={plan:{id:5,title:"2 month subscription with 5% discount",type:"subscription",discount_amount:"5.00",discount_type:"percentage",external_plan_id:5,external_plan_group_id:78105018737,external_plan_name:"2 month subscription with 5% discount",sort_order:2,charge_interval_frequency:2,order_interval_frequency:2,interval_unit:"month",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:5,discounted_price:"28.49",discount_value:"1.50"}},ln={plan:{id:6,title:"1 day subscription",type:"subscription",discount_amount:"0",discount_type:"percentage",external_plan_id:6,external_plan_group_id:78105018737,external_plan_name:"3 month subscription",sort_order:3,charge_interval_frequency:1,order_interval_frequency:1,interval_unit:"day",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:6,discounted_price:"29.99",discount_value:"0.00"}},un={plan:{id:7,title:"2 day subscription",type:"subscription",discount_amount:"0",discount_type:"percentage",external_plan_id:7,external_plan_group_id:78105018737,external_plan_name:"3 month subscription",sort_order:4,charge_interval_frequency:2,order_interval_frequency:2,interval_unit:"day",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:7,discounted_price:"29.99",discount_value:"0.00"}},dn={plan:{id:8,title:"1 week subscription",type:"subscription",discount_amount:"0",discount_type:"percentage",external_plan_id:8,external_plan_group_id:78105018737,external_plan_name:"1 week subscription",sort_order:5,charge_interval_frequency:1,order_interval_frequency:1,interval_unit:"week",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:8,discounted_price:"29.99",discount_value:"0.00"}},tt={plan:{id:9,title:"2 week subscription",type:"subscription",discount_amount:"0",discount_type:"percentage",external_plan_id:9,external_plan_group_id:78105018737,external_plan_name:"2 week subscription",sort_order:6,charge_interval_frequency:2,order_interval_frequency:2,interval_unit:"week",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[]},price:{id:9,discounted_price:"29.99",discount_value:"0.00"}},pn={plan:{id:4,title:"1 month subscription with 10% discount",type:"subscription",discount_amount:"20.00",discount_type:"percentage",external_plan_id:4,external_plan_group_id:78105051505,external_plan_name:"1 month subscription with 10% discount",sort_order:1,charge_interval_frequency:1,order_interval_frequency:1,interval_unit:"month",external_variant_ids:["51679065440625","51679065473393"],has_variant_restrictions:!0,apply_cutoff_date_to_checkout:!1,pricing_progression:[{recurring_discount_after_cycle:0,recurring_discount_amount:10,recurring_discount_type:"percentage"}]},price:{id:4,discounted_price:"23.99",discount_value:"10.00"}},fn={plan:{id:5,title:"2 month subscription with 10% discount",type:"subscription",discount_amount:"20.00",discount_type:"percentage",external_plan_id:5,external_plan_group_id:78105051506,external_plan_name:"2 month subscription with 10% discount",sort_order:1,charge_interval_frequency:2,order_interval_frequency:2,interval_unit:"month",external_variant_ids:["51679065440626","51679065473394"],has_variant_restrictions:!0,apply_cutoff_date_to_checkout:!1,pricing_progression:[{recurring_discount_after_cycle:1,recurring_discount_amount:10,recurring_discount_type:"percentage"}]},price:{id:5,discounted_price:"23.99",discount_value:"10.00"}},hn={plan:{id:2,title:"1 month subscription",type:"subscription",discount_amount:"0",discount_type:"percentage",external_plan_id:2,external_plan_group_id:78105018737,external_plan_name:"1 month subscription",sort_order:3,charge_interval_frequency:1,order_interval_frequency:1,interval_unit:"month",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[],product_quantity:1},price:{id:2,discounted_price:"29.99",discount_value:"0.00"}},gn={plan:{id:3,title:"2 month subscription with 5% discount",type:"subscription",discount_amount:"5",discount_type:"percentage",external_plan_id:3,external_plan_group_id:78205028737,external_plan_name:"2 month subscription with 5% discount",sort_order:2,charge_interval_frequency:2,order_interval_frequency:2,interval_unit:"month",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[],product_quantity:2},price:{id:3,discounted_price:"28.49",discount_value:"1.50"}},yn={plan:{id:4,title:"3 month subscription with 10% discount",type:"subscription",discount_amount:"10",discount_type:"percentage",external_plan_id:4,external_plan_group_id:78305038737,external_plan_name:"3 month subscription with 10% discount",sort_order:1,charge_interval_frequency:3,order_interval_frequency:3,interval_unit:"month",external_variant_ids:[],has_variant_restrictions:!1,apply_cutoff_date_to_checkout:!1,pricing_progression:[],product_quantity:3},price:{id:4,discounted_price:"26.99",discount_value:"3.00"}},po=new Intl.NumberFormat("en-US",{style:"percent",minimumFractionDigits:0,maximumFractionDigits:2});function wi(t){return t===null?po.format(0):po.format(typeof t=="string"?parseFloat(t)/100:t/100)}function Me(t,e=(r=>(r=T())==null?void 0:r.shop.currency)()){return Nc(Number(t)||0,window.navigator.language,{currency:e})}function xi(t){const{discount_amount:e,discount_type:r}=t;return Number(e)===0||isNaN(Number(e))?"":r==="percentage"?wi(e):Me(e)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Da=class extends Event{constructor(e,r,n){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=r,this.subscribe=n??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let fo=class{constructor(e,r,n,i){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(o,a)=>{this.unsubscribe&&(this.unsubscribe!==a&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=o,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(o,a)),this.unsubscribe=a},this.host=e,r.context!==void 0){const o=r;this.context=o.context,this.callback=o.callback,this.subscribe=o.subscribe??!1}else this.context=r,this.callback=n,this.subscribe=i??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new Da(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Kc=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,r=!1){const n=r||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[r,{disposer:n}]of this.subscriptions)r(this.o,n)},e!==void 0&&(this.value=e)}addCallback(e,r,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:r});const{disposer:i}=this.subscriptions.get(e);e(this.value,i)}clearCallbacks(){this.subscriptions.clear()}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Jc=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}},ho=class extends Kc{constructor(e,r,n){var i,o;super(r.context!==void 0?r.initialValue:n),this.onContextRequest=a=>{const s=a.composedPath()[0];a.context===this.context&&s!==this.host&&(a.stopPropagation(),this.addCallback(a.callback,s,a.subscribe))},this.onProviderRequest=a=>{const s=a.composedPath()[0];if(a.context!==this.context||s===this.host)return;const c=new Set;for(const[l,{consumerHost:u}]of this.subscriptions)c.has(l)||(c.add(l),u.dispatchEvent(new Da(this.context,l,!0)));a.stopPropagation()},this.host=e,r.context!==void 0?this.context=r.context:this.context=r,this.attachListeners(),(o=(i=this.host).addController)==null||o.call(i,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Jc(this.context))}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Aa({context:t}){return(e,r)=>{const n=new WeakMap;if(typeof r=="object")return r.addInitializer(function(){n.set(this,new ho(this,{context:t}))}),{get(){return e.get.call(this)},set(i){var o;return(o=n.get(this))==null||o.setValue(i),e.set.call(this,i)},init(i){var o;return(o=n.get(this))==null||o.setValue(i),i}};{e.constructor.addInitializer(a=>{n.set(a,new ho(a,{context:t}))});const i=Object.getOwnPropertyDescriptor(e,r);let o;if(i===void 0){const a=new WeakMap;o={get(){return a.get(this)},set(s){n.get(this).setValue(s),a.set(this,s)},configurable:!0,enumerable:!0}}else{const a=i.set;o={...i,set(s){n.get(this).setValue(s),a==null||a.call(this,s)}}}return void Object.defineProperty(e,r,o)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Lr({context:t,subscribe:e}){return(r,n)=>{typeof n=="object"?n.addInitializer(function(){new fo(this,{context:t,callback:i=>{r.set.call(this,i)},subscribe:e})}):r.constructor.addInitializer(i=>{new fo(i,{context:t,callback:o=>{i[n]=o},subscribe:e})})}}const Si="production",Zc=Si==="development",ka=Si==="stage",Xc={release:"9a349bce4ca0cff0f16840c38fff26bd81c91c8e",dsn:"https://80d2f1d74a6745e273023731b2bd7304@o58632.ingest.us.sentry.io/4508846975680513",environment:Si};function Pi(t,e=null){return new URLSearchParams(window.location.search).get(t)??e}const el="rcswConfigId",tl="rcswSettings",rl="rcswDebug",nl="recharge",il="betaFlags";var ya;(ya=Pi(il))==null||ya.split(",");const re=ol();function ol(){try{let t=window.sessionStorage.getItem(tl);try{t=t?JSON.parse(t):void 0}catch{t=void 0}return{configId:window.sessionStorage.getItem(el),settings:t,debug:window.sessionStorage.getItem(rl)==="true"||Pi(nl)!=null||Zc}}catch{return}}function be(t,...e){console.error(`[Recharge Error] ${t}`,...e)}function Y(t,...e){console.warn(`[Recharge Warning] ${t}`,...e)}function v(t,...e){re!=null&&re.debug&&console.info(`%c[Recharge Debug] ${t}${e.length?":":""}`,"color: #fffbf6; background: #3901f1;",...e)}const al={887:"Dawn",1434:"Taste",1356:"Sense",1363:"Crave",1368:"Craft",1431:"Studio",1500:"Ride",1499:"Colorblock",1567:"Refresh"};function Na(){var r,n;const t=(r=Ve())==null?void 0:r.theme;if(!t)return;const e=t.theme_store_id;return{id:t.id,themeStoreId:t.theme_store_id,themeName:t.name,baseThemeName:e&&al[e]||"",isDesignMode:((n=Ve())==null?void 0:n.designMode)||!1,tokens:sl(e)}}function sl(t){if(!t)return;const e=rt("--color-button"),r=rt("--color-button-text"),n=rt("--color-background"),i=rt("--color-foreground"),o=rt("--buttons-radius-outset"),a=rt("--badge-corner-radius"),s={brandColor:e?"rgba(var(--color-button), 1)":void 0,brandContrastColor:r?"rgba(var(--color-button-text), 1)":void 0,selectedBgColor:n&&i?"color-mix(in srgb,rgba(var(--color-background), 1) 97%, rgba(var(--color-foreground), 1))":void 0,selectedTextColor:i?"rgba(var(--color-foreground), 1)":void 0,borderRadius:o?"var(--buttons-radius-outset)":void 0,badgeBorderRadius:a?"var(--badge-corner-radius)":void 0};if(Object.values(s).some(c=>c))return s}function rt(t,e=document.documentElement){return getComputedStyle(e).getPropertyValue(t).trim()!==""}var lt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function cl(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function ll(t){if(t.__esModule)return t;var e=t.default;if(typeof e=="function"){var r=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};r.prototype=e.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(t).forEach(function(n){var i=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(r,n,i.get?i:{enumerable:!0,get:function(){return t[n]}})}),r}var j=typeof globalThis<"u"&&globalThis||typeof self<"u"&&self||typeof j<"u"&&j,F={searchParams:"URLSearchParams"in j,iterable:"Symbol"in j&&"iterator"in Symbol,blob:"FileReader"in j&&"Blob"in j&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in j,arrayBuffer:"ArrayBuffer"in j};function ul(t){return t&&DataView.prototype.isPrototypeOf(t)}if(F.arrayBuffer)var dl=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],pl=ArrayBuffer.isView||function(t){return t&&dl.indexOf(Object.prototype.toString.call(t))>-1};function Qt(t){if(typeof t!="string"&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(t)||t==="")throw new TypeError('Invalid character in header field name: "'+t+'"');return t.toLowerCase()}function Oi(t){return typeof t!="string"&&(t=String(t)),t}function $i(t){var e={next:function(){var r=t.shift();return{done:r===void 0,value:r}}};return F.iterable&&(e[Symbol.iterator]=function(){return e}),e}function k(t){this.map={},t instanceof k?t.forEach(function(e,r){this.append(r,e)},this):Array.isArray(t)?t.forEach(function(e){this.append(e[0],e[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}k.prototype.append=function(t,e){t=Qt(t),e=Oi(e);var r=this.map[t];this.map[t]=r?r+", "+e:e};k.prototype.delete=function(t){delete this.map[Qt(t)]};k.prototype.get=function(t){return t=Qt(t),this.has(t)?this.map[t]:null};k.prototype.has=function(t){return this.map.hasOwnProperty(Qt(t))};k.prototype.set=function(t,e){this.map[Qt(t)]=Oi(e)};k.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)};k.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),$i(t)};k.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),$i(t)};k.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),$i(t)};F.iterable&&(k.prototype[Symbol.iterator]=k.prototype.entries);function _n(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function Ia(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function fl(t){var e=new FileReader,r=Ia(e);return e.readAsArrayBuffer(t),r}function hl(t){var e=new FileReader,r=Ia(e);return e.readAsText(t),r}function gl(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}function go(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function La(){return this.bodyUsed=!1,this._initBody=function(t){this.bodyUsed=this.bodyUsed,this._bodyInit=t,t?typeof t=="string"?this._bodyText=t:F.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:F.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:F.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():F.arrayBuffer&&F.blob&&ul(t)?(this._bodyArrayBuffer=go(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):F.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||pl(t))?this._bodyArrayBuffer=go(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||(typeof t=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):F.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},F.blob&&(this.blob=function(){var t=_n(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var t=_n(this);return t||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}else return this.blob().then(fl)}),this.text=function(){var t=_n(this);if(t)return t;if(this._bodyBlob)return hl(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(gl(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},F.formData&&(this.formData=function(){return this.text().then(vl)}),this.json=function(){return this.text().then(JSON.parse)},this}var yl=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function _l(t){var e=t.toUpperCase();return yl.indexOf(e)>-1?e:t}function We(t,e){if(!(this instanceof We))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e=e||{};var r=e.body;if(t instanceof We){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new k(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,!r&&t._bodyInit!=null&&(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",(e.headers||!this.headers)&&(this.headers=new k(e.headers)),this.method=_l(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&r)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(r),(this.method==="GET"||this.method==="HEAD")&&(e.cache==="no-store"||e.cache==="no-cache")){var n=/([?&])_=[^&]*/;if(n.test(this.url))this.url=this.url.replace(n,"$1_="+new Date().getTime());else{var i=/\?/;this.url+=(i.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}We.prototype.clone=function(){return new We(this,{body:this._bodyInit})};function vl(t){var e=new FormData;return t.trim().split("&").forEach(function(r){if(r){var n=r.split("="),i=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(i),decodeURIComponent(o))}}),e}function ml(t){var e=new k,r=t.replace(/\r?\n[\t ]+/g," ");return r.split("\r").map(function(n){return n.indexOf(`
`)===0?n.substr(1,n.length):n}).forEach(function(n){var i=n.split(":"),o=i.shift().trim();if(o){var a=i.join(":").trim();e.append(o,a)}}),e}La.call(We.prototype);function le(t,e){if(!(this instanceof le))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');e||(e={}),this.type="default",this.status=e.status===void 0?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText===void 0?"":""+e.statusText,this.headers=new k(e.headers),this.url=e.url||"",this._initBody(t)}La.call(le.prototype);le.prototype.clone=function(){return new le(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new k(this.headers),url:this.url})};le.error=function(){var t=new le(null,{status:0,statusText:""});return t.type="error",t};var bl=[301,302,303,307,308];le.redirect=function(t,e){if(bl.indexOf(e)===-1)throw new RangeError("Invalid status code");return new le(null,{status:e,headers:{location:t}})};var Be=j.DOMException;try{new Be}catch{Be=function(e,r){this.message=e,this.name=r;var n=Error(e);this.stack=n.stack},Be.prototype=Object.create(Error.prototype),Be.prototype.constructor=Be}function Ra(t,e){return new Promise(function(r,n){var i=new We(t,e);if(i.signal&&i.signal.aborted)return n(new Be("Aborted","AbortError"));var o=new XMLHttpRequest;function a(){o.abort()}o.onload=function(){var c={status:o.status,statusText:o.statusText,headers:ml(o.getAllResponseHeaders()||"")};c.url="responseURL"in o?o.responseURL:c.headers.get("X-Request-URL");var l="response"in o?o.response:o.responseText;setTimeout(function(){r(new le(l,c))},0)},o.onerror=function(){setTimeout(function(){n(new TypeError("Network request failed"))},0)},o.ontimeout=function(){setTimeout(function(){n(new TypeError("Network request failed"))},0)},o.onabort=function(){setTimeout(function(){n(new Be("Aborted","AbortError"))},0)};function s(c){try{return c===""&&j.location.href?j.location.href:c}catch{return c}}o.open(i.method,s(i.url),!0),i.credentials==="include"?o.withCredentials=!0:i.credentials==="omit"&&(o.withCredentials=!1),"responseType"in o&&(F.blob?o.responseType="blob":F.arrayBuffer&&i.headers.get("Content-Type")&&i.headers.get("Content-Type").indexOf("application/octet-stream")!==-1&&(o.responseType="arraybuffer")),e&&typeof e.headers=="object"&&!(e.headers instanceof k)?Object.getOwnPropertyNames(e.headers).forEach(function(c){o.setRequestHeader(c,Oi(e.headers[c]))}):i.headers.forEach(function(c,l){o.setRequestHeader(l,c)}),i.signal&&(i.signal.addEventListener("abort",a),o.onreadystatechange=function(){o.readyState===4&&i.signal.removeEventListener("abort",a)}),o.send(typeof i._bodyInit>"u"?null:i._bodyInit)})}Ra.polyfill=!0;j.fetch||(j.fetch=Ra,j.Headers=k,j.Request=We,j.Response=le);self.fetch.bind(self);var yt=TypeError;const wl={},xl=Object.freeze(Object.defineProperty({__proto__:null,default:wl},Symbol.toStringTag,{value:"Module"})),Sl=ll(xl);var Mi=typeof Map=="function"&&Map.prototype,vn=Object.getOwnPropertyDescriptor&&Mi?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,xr=Mi&&vn&&typeof vn.get=="function"?vn.get:null,yo=Mi&&Map.prototype.forEach,Ei=typeof Set=="function"&&Set.prototype,mn=Object.getOwnPropertyDescriptor&&Ei?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,Sr=Ei&&mn&&typeof mn.get=="function"?mn.get:null,_o=Ei&&Set.prototype.forEach,Pl=typeof WeakMap=="function"&&WeakMap.prototype,Et=Pl?WeakMap.prototype.has:null,Ol=typeof WeakSet=="function"&&WeakSet.prototype,Ct=Ol?WeakSet.prototype.has:null,$l=typeof WeakRef=="function"&&WeakRef.prototype,vo=$l?WeakRef.prototype.deref:null,Ml=Boolean.prototype.valueOf,El=Object.prototype.toString,Cl=Function.prototype.toString,Tl=String.prototype.match,Ci=String.prototype.slice,Ce=String.prototype.replace,Dl=String.prototype.toUpperCase,mo=String.prototype.toLowerCase,Ba=RegExp.prototype.test,bo=Array.prototype.concat,ce=Array.prototype.join,Al=Array.prototype.slice,wo=Math.floor,Vn=typeof BigInt=="function"?BigInt.prototype.valueOf:null,bn=Object.getOwnPropertySymbols,Wn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,ft=typeof Symbol=="function"&&typeof Symbol.iterator=="object",Tt=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===ft||!0)?Symbol.toStringTag:null,ja=Object.prototype.propertyIsEnumerable,xo=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(t){return t.__proto__}:null);function So(t,e){if(t===1/0||t===-1/0||t!==t||t&&t>-1e3&&t<1e3||Ba.call(/e/,e))return e;var r=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof t=="number"){var n=t<0?-wo(-t):wo(t);if(n!==t){var i=String(n),o=Ci.call(e,i.length+1);return Ce.call(i,r,"$&_")+"."+Ce.call(Ce.call(o,/([0-9]{3})/g,"$&_"),/_$/,"")}}return Ce.call(e,r,"$&_")}var Qn=Sl,Po=Qn.custom,Oo=Fa(Po)?Po:null,Ua={__proto__:null,double:'"',single:"'"},kl={__proto__:null,double:/(["\\])/g,single:/(['\\])/g},Rr=function t(e,r,n,i){var o=r||{};if(he(o,"quoteStyle")&&!he(Ua,o.quoteStyle))throw new TypeError('option "quoteStyle" must be "single" or "double"');if(he(o,"maxStringLength")&&(typeof o.maxStringLength=="number"?o.maxStringLength<0&&o.maxStringLength!==1/0:o.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var a=he(o,"customInspect")?o.customInspect:!0;if(typeof a!="boolean"&&a!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(he(o,"indent")&&o.indent!==null&&o.indent!=="	"&&!(parseInt(o.indent,10)===o.indent&&o.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(he(o,"numericSeparator")&&typeof o.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var s=o.numericSeparator;if(typeof e>"u")return"undefined";if(e===null)return"null";if(typeof e=="boolean")return e?"true":"false";if(typeof e=="string")return Ha(e,o);if(typeof e=="number"){if(e===0)return 1/0/e>0?"0":"-0";var c=String(e);return s?So(e,c):c}if(typeof e=="bigint"){var l=String(e)+"n";return s?So(e,l):l}var u=typeof o.depth>"u"?5:o.depth;if(typeof n>"u"&&(n=0),n>=u&&u>0&&typeof e=="object")return Yn(e)?"[Array]":"[Object]";var d=Jl(o,n);if(typeof i>"u")i=[];else if(za(i,e)>=0)return"[Circular]";function f(pe,Xe,nr){if(Xe&&(i=Al.call(i),i.push(Xe)),nr){var et={depth:o.depth};return he(o,"quoteStyle")&&(et.quoteStyle=o.quoteStyle),t(pe,et,n+1,i)}return t(pe,o,n+1,i)}if(typeof e=="function"&&!$o(e)){var g=Fl(e),m=ir(e,f);return"[Function"+(g?": "+g:" (anonymous)")+"]"+(m.length>0?" { "+ce.call(m,", ")+" }":"")}if(Fa(e)){var w=ft?Ce.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):Wn.call(e);return typeof e=="object"&&!ft?xt(w):w}if(Yl(e)){for(var S="<"+mo.call(String(e.nodeName)),b=e.attributes||[],M=0;M<b.length;M++)S+=" "+b[M].name+"="+qa(Nl(b[M].value),"double",o);return S+=">",e.childNodes&&e.childNodes.length&&(S+="..."),S+="</"+mo.call(String(e.nodeName))+">",S}if(Yn(e)){if(e.length===0)return"[]";var O=ir(e,f);return d&&!Kl(O)?"["+Gn(O,d)+"]":"[ "+ce.call(O,", ")+" ]"}if(Ll(e)){var I=ir(e,f);return!("cause"in Error.prototype)&&"cause"in e&&!ja.call(e,"cause")?"{ ["+String(e)+"] "+ce.call(bo.call("[cause]: "+f(e.cause),I),", ")+" }":I.length===0?"["+String(e)+"]":"{ ["+String(e)+"] "+ce.call(I,", ")+" }"}if(typeof e=="object"&&a){if(Oo&&typeof e[Oo]=="function"&&Qn)return Qn(e,{depth:u-n});if(a!=="symbol"&&typeof e.inspect=="function")return e.inspect()}if(zl(e)){var J=[];return yo&&yo.call(e,function(pe,Xe){J.push(f(Xe,e,!0)+" => "+f(pe,e))}),Mo("Map",xr.call(e),J,d)}if(Wl(e)){var rr=[];return _o&&_o.call(e,function(pe){rr.push(f(pe,e))}),Mo("Set",Sr.call(e),rr,d)}if(Hl(e))return wn("WeakMap");if(Ql(e))return wn("WeakSet");if(Vl(e))return wn("WeakRef");if(Bl(e))return xt(f(Number(e)));if(Ul(e))return xt(f(Vn.call(e)));if(jl(e))return xt(Ml.call(e));if(Rl(e))return xt(f(String(e)));if(typeof window<"u"&&e===window)return"{ [object Window] }";if(typeof globalThis<"u"&&e===globalThis||typeof lt<"u"&&e===lt)return"{ [object globalThis] }";if(!Il(e)&&!$o(e)){var Le=ir(e,f),Se=xo?xo(e)===Object.prototype:e instanceof Object||e.constructor===Object,Je=e instanceof Object?"":"null prototype",Ze=!Se&&Tt&&Object(e)===e&&Tt in e?Ci.call(Ne(e),8,-1):Je?"Object":"",bt=Se||typeof e.constructor!="function"?"":e.constructor.name?e.constructor.name+" ":"",ee=bt+(Ze||Je?"["+ce.call(bo.call([],Ze||[],Je||[]),": ")+"] ":"");return Le.length===0?ee+"{}":d?ee+"{"+Gn(Le,d)+"}":ee+"{ "+ce.call(Le,", ")+" }"}return String(e)};function qa(t,e,r){var n=r.quoteStyle||e,i=Ua[n];return i+t+i}function Nl(t){return Ce.call(String(t),/"/g,"&quot;")}function Ke(t){return!Tt||!(typeof t=="object"&&(Tt in t||typeof t[Tt]<"u"))}function Yn(t){return Ne(t)==="[object Array]"&&Ke(t)}function Il(t){return Ne(t)==="[object Date]"&&Ke(t)}function $o(t){return Ne(t)==="[object RegExp]"&&Ke(t)}function Ll(t){return Ne(t)==="[object Error]"&&Ke(t)}function Rl(t){return Ne(t)==="[object String]"&&Ke(t)}function Bl(t){return Ne(t)==="[object Number]"&&Ke(t)}function jl(t){return Ne(t)==="[object Boolean]"&&Ke(t)}function Fa(t){if(ft)return t&&typeof t=="object"&&t instanceof Symbol;if(typeof t=="symbol")return!0;if(!t||typeof t!="object"||!Wn)return!1;try{return Wn.call(t),!0}catch{}return!1}function Ul(t){if(!t||typeof t!="object"||!Vn)return!1;try{return Vn.call(t),!0}catch{}return!1}var ql=Object.prototype.hasOwnProperty||function(t){return t in this};function he(t,e){return ql.call(t,e)}function Ne(t){return El.call(t)}function Fl(t){if(t.name)return t.name;var e=Tl.call(Cl.call(t),/^function\s*([\w$]+)/);return e?e[1]:null}function za(t,e){if(t.indexOf)return t.indexOf(e);for(var r=0,n=t.length;r<n;r++)if(t[r]===e)return r;return-1}function zl(t){if(!xr||!t||typeof t!="object")return!1;try{xr.call(t);try{Sr.call(t)}catch{return!0}return t instanceof Map}catch{}return!1}function Hl(t){if(!Et||!t||typeof t!="object")return!1;try{Et.call(t,Et);try{Ct.call(t,Ct)}catch{return!0}return t instanceof WeakMap}catch{}return!1}function Vl(t){if(!vo||!t||typeof t!="object")return!1;try{return vo.call(t),!0}catch{}return!1}function Wl(t){if(!Sr||!t||typeof t!="object")return!1;try{Sr.call(t);try{xr.call(t)}catch{return!0}return t instanceof Set}catch{}return!1}function Ql(t){if(!Ct||!t||typeof t!="object")return!1;try{Ct.call(t,Ct);try{Et.call(t,Et)}catch{return!0}return t instanceof WeakSet}catch{}return!1}function Yl(t){return!t||typeof t!="object"?!1:typeof HTMLElement<"u"&&t instanceof HTMLElement?!0:typeof t.nodeName=="string"&&typeof t.getAttribute=="function"}function Ha(t,e){if(t.length>e.maxStringLength){var r=t.length-e.maxStringLength,n="... "+r+" more character"+(r>1?"s":"");return Ha(Ci.call(t,0,e.maxStringLength),e)+n}var i=kl[e.quoteStyle||"single"];i.lastIndex=0;var o=Ce.call(Ce.call(t,i,"\\$1"),/[\x00-\x1f]/g,Gl);return qa(o,"single",e)}function Gl(t){var e=t.charCodeAt(0),r={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return r?"\\"+r:"\\x"+(e<16?"0":"")+Dl.call(e.toString(16))}function xt(t){return"Object("+t+")"}function wn(t){return t+" { ? }"}function Mo(t,e,r,n){var i=n?Gn(r,n):ce.call(r,", ");return t+" ("+e+") {"+i+"}"}function Kl(t){for(var e=0;e<t.length;e++)if(za(t[e],`
`)>=0)return!1;return!0}function Jl(t,e){var r;if(t.indent==="	")r="	";else if(typeof t.indent=="number"&&t.indent>0)r=ce.call(Array(t.indent+1)," ");else return null;return{base:r,prev:ce.call(Array(e+1),r)}}function Gn(t,e){if(t.length===0)return"";var r=`
`+e.prev+e.base;return r+ce.call(t,","+r)+`
`+e.prev}function ir(t,e){var r=Yn(t),n=[];if(r){n.length=t.length;for(var i=0;i<t.length;i++)n[i]=he(t,i)?e(t[i],t):""}var o=typeof bn=="function"?bn(t):[],a;if(ft){a={};for(var s=0;s<o.length;s++)a["$"+o[s]]=o[s]}for(var c in t)he(t,c)&&(r&&String(Number(c))===c&&c<t.length||ft&&a["$"+c]instanceof Symbol||(Ba.call(/[^\w$]/,c)?n.push(e(c,t)+": "+e(t[c],t)):n.push(c+": "+e(t[c],t))));if(typeof bn=="function")for(var l=0;l<o.length;l++)ja.call(t,o[l])&&n.push("["+e(o[l])+"]: "+e(t[o[l]],t));return n}var Zl=Rr,Xl=yt,Br=function(t,e,r){for(var n=t,i;(i=n.next)!=null;n=i)if(i.key===e)return n.next=i.next,r||(i.next=t.next,t.next=i),i},eu=function(t,e){if(t){var r=Br(t,e);return r&&r.value}},tu=function(t,e,r){var n=Br(t,e);n?n.value=r:t.next={key:e,next:t.next,value:r}},ru=function(t,e){return t?!!Br(t,e):!1},nu=function(t,e){if(t)return Br(t,e,!0)},iu=function(){var e,r={assert:function(n){if(!r.has(n))throw new Xl("Side channel does not contain "+Zl(n))},delete:function(n){var i=e&&e.next,o=nu(e,n);return o&&i&&i===o&&(e=void 0),!!o},get:function(n){return eu(e,n)},has:function(n){return ru(e,n)},set:function(n,i){e||(e={next:void 0}),tu(e,n,i)}};return r},Va=Object,ou=Error,au=EvalError,su=RangeError,cu=ReferenceError,lu=SyntaxError,uu=URIError,du=Math.abs,pu=Math.floor,fu=Math.max,hu=Math.min,gu=Math.pow,yu=Math.round,_u=Number.isNaN||function(e){return e!==e},vu=_u,mu=function(e){return vu(e)||e===0?e:e<0?-1:1},bu=Object.getOwnPropertyDescriptor,hr=bu;if(hr)try{hr([],"length")}catch{hr=null}var Wa=hr,gr=Object.defineProperty||!1;if(gr)try{gr({},"a",{value:1})}catch{gr=!1}var wu=gr,xn,Eo;function xu(){return Eo||(Eo=1,xn=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var e={},r=Symbol("test"),n=Object(r);if(typeof r=="string"||Object.prototype.toString.call(r)!=="[object Symbol]"||Object.prototype.toString.call(n)!=="[object Symbol]")return!1;var i=42;e[r]=i;for(var o in e)return!1;if(typeof Object.keys=="function"&&Object.keys(e).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(e).length!==0)return!1;var a=Object.getOwnPropertySymbols(e);if(a.length!==1||a[0]!==r||!Object.prototype.propertyIsEnumerable.call(e,r))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var s=Object.getOwnPropertyDescriptor(e,r);if(s.value!==i||s.enumerable!==!0)return!1}return!0}),xn}var Sn,Co;function Su(){if(Co)return Sn;Co=1;var t=typeof Symbol<"u"&&Symbol,e=xu();return Sn=function(){return typeof t!="function"||typeof Symbol!="function"||typeof t("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:e()},Sn}var Pn,To;function Qa(){return To||(To=1,Pn=typeof Reflect<"u"&&Reflect.getPrototypeOf||null),Pn}var On,Do;function Ya(){if(Do)return On;Do=1;var t=Va;return On=t.getPrototypeOf||null,On}var Pu="Function.prototype.bind called on incompatible ",Ou=Object.prototype.toString,$u=Math.max,Mu="[object Function]",Ao=function(e,r){for(var n=[],i=0;i<e.length;i+=1)n[i]=e[i];for(var o=0;o<r.length;o+=1)n[o+e.length]=r[o];return n},Eu=function(e,r){for(var n=[],i=r,o=0;i<e.length;i+=1,o+=1)n[o]=e[i];return n},Cu=function(t,e){for(var r="",n=0;n<t.length;n+=1)r+=t[n],n+1<t.length&&(r+=e);return r},Tu=function(e){var r=this;if(typeof r!="function"||Ou.apply(r)!==Mu)throw new TypeError(Pu+r);for(var n=Eu(arguments,1),i,o=function(){if(this instanceof i){var u=r.apply(this,Ao(n,arguments));return Object(u)===u?u:this}return r.apply(e,Ao(n,arguments))},a=$u(0,r.length-n.length),s=[],c=0;c<a;c++)s[c]="$"+c;if(i=Function("binder","return function ("+Cu(s,",")+"){ return binder.apply(this,arguments); }")(o),r.prototype){var l=function(){};l.prototype=r.prototype,i.prototype=new l,l.prototype=null}return i},Du=Tu,jr=Function.prototype.bind||Du,Ti=Function.prototype.call,$n,ko;function Ga(){return ko||(ko=1,$n=Function.prototype.apply),$n}var Au=typeof Reflect<"u"&&Reflect&&Reflect.apply,ku=jr,Nu=Ga(),Iu=Ti,Lu=Au,Ru=Lu||ku.call(Iu,Nu),Bu=jr,ju=yt,Uu=Ti,qu=Ru,Ka=function(e){if(e.length<1||typeof e[0]!="function")throw new ju("a function is required");return qu(Bu,Uu,e)},Mn,No;function Fu(){if(No)return Mn;No=1;var t=Ka,e=Wa,r;try{r=[].__proto__===Array.prototype}catch(a){if(!a||typeof a!="object"||!("code"in a)||a.code!=="ERR_PROTO_ACCESS")throw a}var n=!!r&&e&&e(Object.prototype,"__proto__"),i=Object,o=i.getPrototypeOf;return Mn=n&&typeof n.get=="function"?t([n.get]):typeof o=="function"?function(s){return o(s==null?s:i(s))}:!1,Mn}var En,Io;function zu(){if(Io)return En;Io=1;var t=Qa(),e=Ya(),r=Fu();return En=t?function(i){return t(i)}:e?function(i){if(!i||typeof i!="object"&&typeof i!="function")throw new TypeError("getProto: not an object");return e(i)}:r?function(i){return r(i)}:null,En}var Cn,Lo;function Hu(){if(Lo)return Cn;Lo=1;var t=Function.prototype.call,e=Object.prototype.hasOwnProperty,r=jr;return Cn=r.call(t,e),Cn}var x,Vu=Va,Wu=ou,Qu=au,Yu=su,Gu=cu,ht=lu,ut=yt,Ku=uu,Ju=du,Zu=pu,Xu=fu,ed=hu,td=gu,rd=yu,nd=mu,Ja=Function,Tn=function(t){try{return Ja('"use strict"; return ('+t+").constructor;")()}catch{}},Ut=Wa,id=wu,Dn=function(){throw new ut},od=Ut?function(){try{return arguments.callee,Dn}catch{try{return Ut(arguments,"callee").get}catch{return Dn}}}():Dn,nt=Su()(),N=zu(),ad=Ya(),sd=Qa(),Za=Ga(),Yt=Ti,ct={},cd=typeof Uint8Array>"u"||!N?x:N(Uint8Array),ze={__proto__:null,"%AggregateError%":typeof AggregateError>"u"?x:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?x:ArrayBuffer,"%ArrayIteratorPrototype%":nt&&N?N([][Symbol.iterator]()):x,"%AsyncFromSyncIteratorPrototype%":x,"%AsyncFunction%":ct,"%AsyncGenerator%":ct,"%AsyncGeneratorFunction%":ct,"%AsyncIteratorPrototype%":ct,"%Atomics%":typeof Atomics>"u"?x:Atomics,"%BigInt%":typeof BigInt>"u"?x:BigInt,"%BigInt64Array%":typeof BigInt64Array>"u"?x:BigInt64Array,"%BigUint64Array%":typeof BigUint64Array>"u"?x:BigUint64Array,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?x:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Wu,"%eval%":eval,"%EvalError%":Qu,"%Float16Array%":typeof Float16Array>"u"?x:Float16Array,"%Float32Array%":typeof Float32Array>"u"?x:Float32Array,"%Float64Array%":typeof Float64Array>"u"?x:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?x:FinalizationRegistry,"%Function%":Ja,"%GeneratorFunction%":ct,"%Int8Array%":typeof Int8Array>"u"?x:Int8Array,"%Int16Array%":typeof Int16Array>"u"?x:Int16Array,"%Int32Array%":typeof Int32Array>"u"?x:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":nt&&N?N(N([][Symbol.iterator]())):x,"%JSON%":typeof JSON=="object"?JSON:x,"%Map%":typeof Map>"u"?x:Map,"%MapIteratorPrototype%":typeof Map>"u"||!nt||!N?x:N(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Vu,"%Object.getOwnPropertyDescriptor%":Ut,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?x:Promise,"%Proxy%":typeof Proxy>"u"?x:Proxy,"%RangeError%":Yu,"%ReferenceError%":Gu,"%Reflect%":typeof Reflect>"u"?x:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?x:Set,"%SetIteratorPrototype%":typeof Set>"u"||!nt||!N?x:N(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?x:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":nt&&N?N(""[Symbol.iterator]()):x,"%Symbol%":nt?Symbol:x,"%SyntaxError%":ht,"%ThrowTypeError%":od,"%TypedArray%":cd,"%TypeError%":ut,"%Uint8Array%":typeof Uint8Array>"u"?x:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?x:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?x:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?x:Uint32Array,"%URIError%":Ku,"%WeakMap%":typeof WeakMap>"u"?x:WeakMap,"%WeakRef%":typeof WeakRef>"u"?x:WeakRef,"%WeakSet%":typeof WeakSet>"u"?x:WeakSet,"%Function.prototype.call%":Yt,"%Function.prototype.apply%":Za,"%Object.defineProperty%":id,"%Object.getPrototypeOf%":ad,"%Math.abs%":Ju,"%Math.floor%":Zu,"%Math.max%":Xu,"%Math.min%":ed,"%Math.pow%":td,"%Math.round%":rd,"%Math.sign%":nd,"%Reflect.getPrototypeOf%":sd};if(N)try{null.error}catch(t){var ld=N(N(t));ze["%Error.prototype%"]=ld}var ud=function t(e){var r;if(e==="%AsyncFunction%")r=Tn("async function () {}");else if(e==="%GeneratorFunction%")r=Tn("function* () {}");else if(e==="%AsyncGeneratorFunction%")r=Tn("async function* () {}");else if(e==="%AsyncGenerator%"){var n=t("%AsyncGeneratorFunction%");n&&(r=n.prototype)}else if(e==="%AsyncIteratorPrototype%"){var i=t("%AsyncGenerator%");i&&N&&(r=N(i.prototype))}return ze[e]=r,r},Ro={__proto__:null,"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},Gt=jr,Pr=Hu(),dd=Gt.call(Yt,Array.prototype.concat),pd=Gt.call(Za,Array.prototype.splice),Bo=Gt.call(Yt,String.prototype.replace),Or=Gt.call(Yt,String.prototype.slice),fd=Gt.call(Yt,RegExp.prototype.exec),hd=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,gd=/\\(\\)?/g,yd=function(e){var r=Or(e,0,1),n=Or(e,-1);if(r==="%"&&n!=="%")throw new ht("invalid intrinsic syntax, expected closing `%`");if(n==="%"&&r!=="%")throw new ht("invalid intrinsic syntax, expected opening `%`");var i=[];return Bo(e,hd,function(o,a,s,c){i[i.length]=s?Bo(c,gd,"$1"):a||o}),i},_d=function(e,r){var n=e,i;if(Pr(Ro,n)&&(i=Ro[n],n="%"+i[0]+"%"),Pr(ze,n)){var o=ze[n];if(o===ct&&(o=ud(n)),typeof o>"u"&&!r)throw new ut("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:i,name:n,value:o}}throw new ht("intrinsic "+e+" does not exist!")},Di=function(e,r){if(typeof e!="string"||e.length===0)throw new ut("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof r!="boolean")throw new ut('"allowMissing" argument must be a boolean');if(fd(/^%?[^%]*%?$/,e)===null)throw new ht("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var n=yd(e),i=n.length>0?n[0]:"",o=_d("%"+i+"%",r),a=o.name,s=o.value,c=!1,l=o.alias;l&&(i=l[0],pd(n,dd([0,1],l)));for(var u=1,d=!0;u<n.length;u+=1){var f=n[u],g=Or(f,0,1),m=Or(f,-1);if((g==='"'||g==="'"||g==="`"||m==='"'||m==="'"||m==="`")&&g!==m)throw new ht("property names with quotes must have matching quotes");if((f==="constructor"||!d)&&(c=!0),i+="."+f,a="%"+i+"%",Pr(ze,a))s=ze[a];else if(s!=null){if(!(f in s)){if(!r)throw new ut("base intrinsic for "+e+" exists, but the property is not available.");return}if(Ut&&u+1>=n.length){var w=Ut(s,f);d=!!w,d&&"get"in w&&!("originalValue"in w.get)?s=w.get:s=s[f]}else d=Pr(s,f),s=s[f];d&&!c&&(ze[a]=s)}}return s},Xa=Di,es=Ka,vd=es([Xa("%String.prototype.indexOf%")]),ts=function(e,r){var n=Xa(e,!!r);return typeof n=="function"&&vd(e,".prototype.")>-1?es([n]):n},md=Di,Kt=ts,bd=Rr,wd=yt,jo=md("%Map%",!0),xd=Kt("Map.prototype.get",!0),Sd=Kt("Map.prototype.set",!0),Pd=Kt("Map.prototype.has",!0),Od=Kt("Map.prototype.delete",!0),$d=Kt("Map.prototype.size",!0),rs=!!jo&&function(){var e,r={assert:function(n){if(!r.has(n))throw new wd("Side channel does not contain "+bd(n))},delete:function(n){if(e){var i=Od(e,n);return $d(e)===0&&(e=void 0),i}return!1},get:function(n){if(e)return xd(e,n)},has:function(n){return e?Pd(e,n):!1},set:function(n,i){e||(e=new jo),Sd(e,n,i)}};return r},Md=Di,Ur=ts,Ed=Rr,or=rs,Cd=yt,it=Md("%WeakMap%",!0),Td=Ur("WeakMap.prototype.get",!0),Dd=Ur("WeakMap.prototype.set",!0),Ad=Ur("WeakMap.prototype.has",!0),kd=Ur("WeakMap.prototype.delete",!0),Nd=it?function(){var e,r,n={assert:function(i){if(!n.has(i))throw new Cd("Side channel does not contain "+Ed(i))},delete:function(i){if(it&&i&&(typeof i=="object"||typeof i=="function")){if(e)return kd(e,i)}else if(or&&r)return r.delete(i);return!1},get:function(i){return it&&i&&(typeof i=="object"||typeof i=="function")&&e?Td(e,i):r&&r.get(i)},has:function(i){return it&&i&&(typeof i=="object"||typeof i=="function")&&e?Ad(e,i):!!r&&r.has(i)},set:function(i,o){it&&i&&(typeof i=="object"||typeof i=="function")?(e||(e=new it),Dd(e,i,o)):or&&(r||(r=or()),r.set(i,o))}};return n}:or,Id=yt,Ld=Rr,Rd=iu,Bd=rs,jd=Nd,Ud=jd||Bd||Rd,qd=function(){var e,r={assert:function(n){if(!r.has(n))throw new Id("Side channel does not contain "+Ld(n))},delete:function(n){return!!e&&e.delete(n)},get:function(n){return e&&e.get(n)},has:function(n){return!!e&&e.has(n)},set:function(n,i){e||(e=Ud()),e.set(n,i)}};return r},Fd=String.prototype.replace,zd=/%20/g,Uo={RFC1738:"RFC1738",RFC3986:"RFC3986"},ns={default:Uo.RFC3986,formatters:{RFC1738:function(t){return Fd.call(t,zd,"+")},RFC3986:function(t){return String(t)}},RFC1738:Uo.RFC1738},Hd=ns,An=Object.prototype.hasOwnProperty,je=Array.isArray,oe=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),Vd=function(e){for(;e.length>1;){var r=e.pop(),n=r.obj[r.prop];if(je(n)){for(var i=[],o=0;o<n.length;++o)typeof n[o]<"u"&&i.push(n[o]);r.obj[r.prop]=i}}},is=function(e,r){for(var n=r&&r.plainObjects?Object.create(null):{},i=0;i<e.length;++i)typeof e[i]<"u"&&(n[i]=e[i]);return n},Wd=function t(e,r,n){if(!r)return e;if(typeof r!="object"){if(je(e))e.push(r);else if(e&&typeof e=="object")(n&&(n.plainObjects||n.allowPrototypes)||!An.call(Object.prototype,r))&&(e[r]=!0);else return[e,r];return e}if(!e||typeof e!="object")return[e].concat(r);var i=e;return je(e)&&!je(r)&&(i=is(e,n)),je(e)&&je(r)?(r.forEach(function(o,a){if(An.call(e,a)){var s=e[a];s&&typeof s=="object"&&o&&typeof o=="object"?e[a]=t(s,o,n):e.push(o)}else e[a]=o}),e):Object.keys(r).reduce(function(o,a){var s=r[a];return An.call(o,a)?o[a]=t(o[a],s,n):o[a]=s,o},i)},Qd=function(e,r){return Object.keys(r).reduce(function(n,i){return n[i]=r[i],n},e)},Yd=function(t,e,r){var n=t.replace(/\+/g," ");if(r==="iso-8859-1")return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch{return n}},Gd=function(e,r,n,i,o){if(e.length===0)return e;var a=e;if(typeof e=="symbol"?a=Symbol.prototype.toString.call(e):typeof e!="string"&&(a=String(e)),n==="iso-8859-1")return escape(a).replace(/%u[0-9a-f]{4}/gi,function(u){return"%26%23"+parseInt(u.slice(2),16)+"%3B"});for(var s="",c=0;c<a.length;++c){var l=a.charCodeAt(c);if(l===45||l===46||l===95||l===126||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122||o===Hd.RFC1738&&(l===40||l===41)){s+=a.charAt(c);continue}if(l<128){s=s+oe[l];continue}if(l<2048){s=s+(oe[192|l>>6]+oe[128|l&63]);continue}if(l<55296||l>=57344){s=s+(oe[224|l>>12]+oe[128|l>>6&63]+oe[128|l&63]);continue}c+=1,l=65536+((l&1023)<<10|a.charCodeAt(c)&1023),s+=oe[240|l>>18]+oe[128|l>>12&63]+oe[128|l>>6&63]+oe[128|l&63]}return s},Kd=function(e){for(var r=[{obj:{o:e},prop:"o"}],n=[],i=0;i<r.length;++i)for(var o=r[i],a=o.obj[o.prop],s=Object.keys(a),c=0;c<s.length;++c){var l=s[c],u=a[l];typeof u=="object"&&u!==null&&n.indexOf(u)===-1&&(r.push({obj:a,prop:l}),n.push(u))}return Vd(r),e},Jd=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},Zd=function(e){return!e||typeof e!="object"?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},Xd=function(e,r){return[].concat(e,r)},ep=function(e,r){if(je(e)){for(var n=[],i=0;i<e.length;i+=1)n.push(r(e[i]));return n}return r(e)},tp={arrayToObject:is,assign:Qd,combine:Xd,compact:Kd,decode:Yd,encode:Gd,isBuffer:Zd,isRegExp:Jd,maybeMap:ep,merge:Wd},os=qd,yr=tp,Dt=ns,rp=Object.prototype.hasOwnProperty,qo={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,r){return e+"["+r+"]"},repeat:function(e){return e}},ye=Array.isArray,np=Array.prototype.push,as=function(t,e){np.apply(t,ye(e)?e:[e])},ip=Date.prototype.toISOString,Fo=Dt.default,B={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:yr.encode,encodeValuesOnly:!1,format:Fo,formatter:Dt.formatters[Fo],indices:!1,serializeDate:function(e){return ip.call(e)},skipNulls:!1,strictNullHandling:!1},op=function(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="symbol"||typeof e=="bigint"},kn={},ap=function t(e,r,n,i,o,a,s,c,l,u,d,f,g,m,w,S){for(var b=e,M=S,O=0,I=!1;(M=M.get(kn))!==void 0&&!I;){var J=M.get(e);if(O+=1,typeof J<"u"){if(J===O)throw new RangeError("Cyclic object value");I=!0}typeof M.get(kn)>"u"&&(O=0)}if(typeof c=="function"?b=c(r,b):b instanceof Date?b=d(b):n==="comma"&&ye(b)&&(b=yr.maybeMap(b,function(et){return et instanceof Date?d(et):et})),b===null){if(o)return s&&!m?s(r,B.encoder,w,"key",f):r;b=""}if(op(b)||yr.isBuffer(b)){if(s){var rr=m?r:s(r,B.encoder,w,"key",f);return[g(rr)+"="+g(s(b,B.encoder,w,"value",f))]}return[g(r)+"="+g(String(b))]}var Le=[];if(typeof b>"u")return Le;var Se;if(n==="comma"&&ye(b))m&&s&&(b=yr.maybeMap(b,s)),Se=[{value:b.length>0?b.join(",")||null:void 0}];else if(ye(c))Se=c;else{var Je=Object.keys(b);Se=l?Je.sort(l):Je}for(var Ze=i&&ye(b)&&b.length===1?r+"[]":r,bt=0;bt<Se.length;++bt){var ee=Se[bt],pe=typeof ee=="object"&&typeof ee.value<"u"?ee.value:b[ee];if(!(a&&pe===null)){var Xe=ye(b)?typeof n=="function"?n(Ze,ee):Ze:Ze+(u?"."+ee:"["+ee+"]");S.set(e,O);var nr=os();nr.set(kn,S),as(Le,t(pe,Xe,n,i,o,a,n==="comma"&&m&&ye(b)?null:s,c,l,u,d,f,g,m,w,nr))}}return Le},sp=function(e){if(!e)return B;if(e.encoder!==null&&typeof e.encoder<"u"&&typeof e.encoder!="function")throw new TypeError("Encoder has to be a function.");var r=e.charset||B.charset;if(typeof e.charset<"u"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=Dt.default;if(typeof e.format<"u"){if(!rp.call(Dt.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var i=Dt.formatters[n],o=B.filter;return(typeof e.filter=="function"||ye(e.filter))&&(o=e.filter),{addQueryPrefix:typeof e.addQueryPrefix=="boolean"?e.addQueryPrefix:B.addQueryPrefix,allowDots:typeof e.allowDots>"u"?B.allowDots:!!e.allowDots,charset:r,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:B.charsetSentinel,delimiter:typeof e.delimiter>"u"?B.delimiter:e.delimiter,encode:typeof e.encode=="boolean"?e.encode:B.encode,encoder:typeof e.encoder=="function"?e.encoder:B.encoder,encodeValuesOnly:typeof e.encodeValuesOnly=="boolean"?e.encodeValuesOnly:B.encodeValuesOnly,filter:o,format:n,formatter:i,serializeDate:typeof e.serializeDate=="function"?e.serializeDate:B.serializeDate,skipNulls:typeof e.skipNulls=="boolean"?e.skipNulls:B.skipNulls,sort:typeof e.sort=="function"?e.sort:null,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:B.strictNullHandling}},cp=function(t,e){var r=t,n=sp(e),i,o;typeof n.filter=="function"?(o=n.filter,r=o("",r)):ye(n.filter)&&(o=n.filter,i=o);var a=[];if(typeof r!="object"||r===null)return"";var s;e&&e.arrayFormat in qo?s=e.arrayFormat:e&&"indices"in e?s=e.indices?"indices":"repeat":s="indices";var c=qo[s];if(e&&"commaRoundTrip"in e&&typeof e.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var l=c==="comma"&&e&&e.commaRoundTrip;i||(i=Object.keys(r)),n.sort&&i.sort(n.sort);for(var u=os(),d=0;d<i.length;++d){var f=i[d];n.skipNulls&&r[f]===null||as(a,ap(r[f],f,c,l,n.strictNullHandling,n.skipNulls,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.format,n.formatter,n.encodeValuesOnly,n.charset,u))}var g=a.join(n.delimiter),m=n.addQueryPrefix===!0?"?":"";return n.charsetSentinel&&(n.charset==="iso-8859-1"?m+="utf8=%26%2310003%3B&":m+="utf8=%E2%9C%93&"),g.length>0?m+g:""};const lp=cl(cp);let ss={storeIdentifier:"",environment:"prod"};function up(t){ss=t}function dp(){return ss}const pp=t=>{switch(t){case"prod":case"preprod":return"https://static.rechargecdn.com";case"stage":case"prestage":return"https://static.stage.rechargecdn.com"}};class ar{constructor(e,r){this.name="RechargeRequestError",this.message=e,this.status=r}}function fp(t){return lp(t,{encode:!1,indices:!1,arrayFormat:"comma"})}async function hp(t,e,r={}){const n=dp();return gp(t,`${pp(n.environment)}/store/${n.storeIdentifier}${e}`,r)}async function gp(t,e,{id:r,query:n,data:i,headers:o}={}){let a=e.trim();if(r&&(a=[a,`${r}`.trim()].join("/")),n){let d;[a,d]=a.split("?");const f=[d,fp(n)].join("&").replace(/^&/,"");a=`${a}${f?`?${f}`:""}`}let s;const c={Accept:"application/json","Content-Type":"application/json","X-Recharge-App":"storefront-client",...o||{}},l=await fetch(a,{method:t,headers:c,body:s});let u;try{u=await l.json()}catch{}if(!l.ok)throw l.status===502||l.status===504?new ar("A gateway error occurred while making the request",l.status):u&&u.error?new ar(u.error,l.status):u&&u.errors?new ar(JSON.stringify(u.errors),l.status):new ar("A connection error occurred while making the request");return u}var yp="[object Function]",_p="[object GeneratorFunction]",vp=/[\\^$.*+?()[\]{}|]/g,mp=/^\[object .+?Constructor\]$/,bp=typeof lt=="object"&&lt&&lt.Object===Object&&lt,wp=typeof self=="object"&&self&&self.Object===Object&&self,Ai=bp||wp||Function("return this")();function xp(t,e){return t==null?void 0:t[e]}function Sp(t){var e=!1;if(t!=null&&typeof t.toString!="function")try{e=!!(t+"")}catch{}return e}var Pp=Function.prototype,cs=Object.prototype,Nn=Ai["__core-js_shared__"],zo=function(){var t=/[^.]+$/.exec(Nn&&Nn.keys&&Nn.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ls=Pp.toString,Op=cs.hasOwnProperty,$p=cs.toString,Mp=RegExp("^"+ls.call(Op).replace(vp,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Ho=Ai.Symbol;Ho&&Ho.isConcatSpreadable;us(Ai,"Map");us(Object,"create");function Ep(t){if(!ds(t)||Cp(t))return!1;var e=Dp(t)||Sp(t)?Mp:mp;return e.test(Tp(t))}function us(t,e){var r=xp(t,e);return Ep(r)?r:void 0}function Cp(t){return!!zo&&zo in t}function Tp(t){if(t!=null){try{return ls.call(t)}catch{}try{return t+""}catch{}}return""}function Dp(t){var e=ds(t)?$p.call(t):"";return e==yp||e==_p}function ds(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function Ap(t){var r;const e=((r=t.subscription_options)==null?void 0:r.storefront_purchase_options)==="subscription_only";return{...t,is_subscription_only:e,isSubscriptionOnly:e}}const At=new Map;function kp(t,e){return At.has(t)||At.set(t,e()),At.get(t)}async function ps(t,e){if(t===void 0||t==="")throw new Error("ID is required");const r=(e==null?void 0:e.version)??"2020-12",{product:n}=await kp(`product.${t}.${r}`,()=>hp("get",`/product/${r}/${t}.json`));return r==="2020-12"?Ap(n):n}async function Np(){return Array.from(At.keys()).forEach(t=>At.delete(t))}function Ip(t){var r,n;if(t)return t;if((r=window==null?void 0:window.Shopify)!=null&&r.shop)return window.Shopify.shop;let e=window==null?void 0:window.domain;if(!e){const i=(n=location==null?void 0:location.href.match(/(?:http[s]*:\/\/)*(.*?)\.(?=admin\.rechargeapps\.com)/i))==null?void 0:n[1].replace(/-sp$/,"");i&&(e=`${i}.myshopify.com`)}if(e)return e;throw new Error("No storeIdentifier was passed into init.")}function fs(t={}){const e=t,{storefrontAccessToken:r}=t;if(r&&!r.startsWith("strfnt"))throw new Error("Incorrect storefront access token used. See https://storefront.rechargepayments.com/client/docs/getting_started/package_setup/#initialization-- for more information.");up({storeIdentifier:Ip(t.storeIdentifier),loginRetryFn:t.loginRetryFn,__unstable_twoFactorRetryFn:t.__unstable_twoFactorRetryFn,storefrontAccessToken:r,appName:t.appName,appVersion:t.appVersion,environment:e.environment?e.environment:"prod",environmentUri:e.environmentUri,customerHash:e.customerHash}),Np()}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var Kn=function(t,e){return Kn=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,n){r.__proto__=n}||function(r,n){for(var i in n)n.hasOwnProperty(i)&&(r[i]=n[i])},Kn(t,e)};function Jt(t,e){Kn(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}var h=function(){return h=Object.assign||function(e){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},h.apply(this,arguments)};function Qe(t){var e=typeof Symbol=="function"&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function G(t,e){var r=typeof Symbol=="function"&&t[Symbol.iterator];if(!r)return t;var n=r.call(t),i,o=[],a;try{for(;(e===void 0||e-- >0)&&!(i=n.next()).done;)o.push(i.value)}catch(s){a={error:s}}finally{try{i&&!i.done&&(r=n.return)&&r.call(n)}finally{if(a)throw a.error}}return o}function z(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(G(arguments[e]));return t}var De;(function(t){t.Fatal="fatal",t.Error="error",t.Warning="warning",t.Log="log",t.Info="info",t.Debug="debug",t.Critical="critical"})(De||(De={}));function Lp(t){t.then(null,function(e){console.error(e)})}function Rp(){return typeof __SENTRY_BROWSER_BUNDLE__<"u"&&!!__SENTRY_BROWSER_BUNDLE__}function ki(){return!Rp()&&Object.prototype.toString.call(typeof process<"u"?process:0)==="[object process]"}function Bp(t,e){return t.require(e)}var jp={};function R(){return ki()?global:typeof window<"u"?window:typeof self<"u"?self:jp}function Ni(t,e,r){var n=r||R(),i=n.__SENTRY__=n.__SENTRY__||{},o=i[t]||(i[t]=e());return o}var hs=Object.prototype.toString;function Ii(t){switch(hs.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":return!0;default:return _t(t,Error)}}function Zt(t,e){return hs.call(t)==="[object "+e+"]"}function Up(t){return Zt(t,"ErrorEvent")}function Vo(t){return Zt(t,"DOMError")}function qp(t){return Zt(t,"DOMException")}function Jn(t){return Zt(t,"String")}function gs(t){return t===null||typeof t!="object"&&typeof t!="function"}function gt(t){return Zt(t,"Object")}function qr(t){return typeof Event<"u"&&_t(t,Event)}function Fp(t){return typeof Element<"u"&&_t(t,Element)}function Li(t){return!!(t&&t.then&&typeof t.then=="function")}function zp(t){return gt(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Hp(t){return typeof t=="number"&&t!==t}function _t(t,e){try{return t instanceof e}catch{return!1}}function Zn(t,e){try{for(var r=t,n=5,i=80,o=[],a=0,s=0,c=" > ",l=c.length,u=void 0;r&&a++<n&&(u=Vp(r,e),!(u==="html"||a>1&&s+o.length*l+u.length>=i));)o.push(u),s+=u.length,r=r.parentNode;return o.reverse().join(c)}catch{return"<unknown>"}}function Vp(t,e){var r=t,n=[],i,o,a,s,c;if(!r||!r.tagName)return"";n.push(r.tagName.toLowerCase());var l=e&&e.length?e.filter(function(d){return r.getAttribute(d)}).map(function(d){return[d,r.getAttribute(d)]}):null;if(l&&l.length)l.forEach(function(d){n.push("["+d[0]+'="'+d[1]+'"]')});else if(r.id&&n.push("#"+r.id),i=r.className,i&&Jn(i))for(o=i.split(/\s+/),c=0;c<o.length;c++)n.push("."+o[c]);var u=["type","name","title","alt"];for(c=0;c<u.length;c++)a=u[c],s=r.getAttribute(a),s&&n.push("["+a+'="'+s+'"]');return n.join("")}var Wp=Object.setPrototypeOf||({__proto__:[]}instanceof Array?Qp:Yp);function Qp(t,e){return t.__proto__=e,t}function Yp(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(t,r)||(t[r]=e[r]);return t}var A=function(t){Jt(e,t);function e(r){var n=this.constructor,i=t.call(this,r)||this;return i.message=r,i.name=n.prototype.constructor.name,Wp(i,n.prototype),i}return e}(Error),vt=typeof __SENTRY_DEBUG__>"u"?!0:__SENTRY_DEBUG__,Gp=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;function Kp(t){return t==="http"||t==="https"}function Xt(t,e){e===void 0&&(e=!1);var r=t.host,n=t.path,i=t.pass,o=t.port,a=t.projectId,s=t.protocol,c=t.publicKey;return s+"://"+c+(e&&i?":"+i:"")+("@"+r+(o?":"+o:"")+"/"+(n&&n+"/")+a)}function Jp(t){var e=Gp.exec(t);if(!e)throw new A("Invalid Sentry Dsn: "+t);var r=G(e.slice(1),6),n=r[0],i=r[1],o=r[2],a=o===void 0?"":o,s=r[3],c=r[4],l=c===void 0?"":c,u=r[5],d="",f=u,g=f.split("/");if(g.length>1&&(d=g.slice(0,-1).join("/"),f=g.pop()),f){var m=f.match(/^\d+/);m&&(f=m[0])}return ys({host:s,pass:a,path:d,projectId:f,port:l,protocol:n,publicKey:i})}function ys(t){return"user"in t&&!("publicKey"in t)&&(t.publicKey=t.user),{user:t.publicKey||"",protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function Zp(t){if(vt){var e=t.port,r=t.projectId,n=t.protocol,i=["protocol","publicKey","host","projectId"];if(i.forEach(function(o){if(!t[o])throw new A("Invalid Sentry Dsn: "+o+" missing")}),!r.match(/^\d+$/))throw new A("Invalid Sentry Dsn: Invalid projectId "+r);if(!Kp(n))throw new A("Invalid Sentry Dsn: Invalid protocol "+n);if(e&&isNaN(parseInt(e,10)))throw new A("Invalid Sentry Dsn: Invalid port "+e);return!0}}function Ri(t){var e=typeof t=="string"?Jp(t):ys(t);return Zp(e),e}var Xp=["fatal","error","warning","log","info","debug","critical"],ef=R(),tf="Sentry Logger ",$r=["debug","info","warn","error","log","assert"];function _s(t){var e=R();if(!("console"in e))return t();var r=e.console,n={};$r.forEach(function(i){var o=r[i]&&r[i].__sentry_original__;i in e.console&&o&&(n[i]=r[i],r[i]=o)});try{return t()}finally{Object.keys(n).forEach(function(i){r[i]=n[i]})}}function Wo(){var t=!1,e={enable:function(){t=!0},disable:function(){t=!1}};return vt?$r.forEach(function(r){e[r]=function(){for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];t&&_s(function(){var o;(o=ef.console)[r].apply(o,z([tf+"["+r+"]:"],n))})}}):$r.forEach(function(r){e[r]=function(){}}),e}var P;vt?P=Ni("logger",Wo):P=Wo();function kt(t,e){return e===void 0&&(e=0),typeof t!="string"||e===0||t.length<=e?t:t.substr(0,e)+"..."}function Qo(t,e){if(!Array.isArray(t))return"";for(var r=[],n=0;n<t.length;n++){var i=t[n];try{r.push(String(i))}catch{r.push("[value cannot be serialized]")}}return r.join(e)}function ve(t,e,r){if(e in t){var n=t[e],i=r(n);if(typeof i=="function")try{rf(i,n)}catch{}t[e]=i}}function Bi(t,e,r){Object.defineProperty(t,e,{value:r,writable:!0,configurable:!0})}function rf(t,e){var r=e.prototype||{};t.prototype=e.prototype=r,Bi(t,"__sentry_original__",e)}function nf(t){return Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}function vs(t){var e=t;if(Ii(t))e=h({message:t.message,name:t.name,stack:t.stack},Go(t));else if(qr(t)){var r=t;e=h({type:r.type,target:Yo(r.target),currentTarget:Yo(r.currentTarget)},Go(r)),typeof CustomEvent<"u"&&_t(t,CustomEvent)&&(e.detail=r.detail)}return e}function Yo(t){try{return Fp(t)?Zn(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Go(t){var e={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}function of(t,e){e===void 0&&(e=40);var r=Object.keys(vs(t));if(r.sort(),!r.length)return"[object has no keys]";if(r[0].length>=e)return kt(r[0],e);for(var n=r.length;n>0;n--){var i=r.slice(0,n).join(", ");if(!(i.length>e))return n===r.length?i:kt(i,e)}return""}function Xn(t){var e,r;if(gt(t)){var n={};try{for(var i=Qe(Object.keys(t)),o=i.next();!o.done;o=i.next()){var a=o.value;typeof t[a]<"u"&&(n[a]=Xn(t[a]))}}catch(s){e={error:s}}finally{try{o&&!o.done&&(r=i.return)&&r.call(i)}finally{if(e)throw e.error}}return n}return Array.isArray(t)?t.map(Xn):t}var af=50;function sf(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=t.sort(function(n,i){return n[0]-i[0]}).map(function(n){return n[1]});return function(n,i){var o,a,s,c;i===void 0&&(i=0);var l=[];try{for(var u=Qe(n.split(`
`).slice(i)),d=u.next();!d.done;d=u.next()){var f=d.value;try{for(var g=(s=void 0,Qe(r)),m=g.next();!m.done;m=g.next()){var w=m.value,S=w(f);if(S){l.push(S);break}}}catch(b){s={error:b}}finally{try{m&&!m.done&&(c=g.return)&&c.call(g)}finally{if(s)throw s.error}}}}catch(b){o={error:b}}finally{try{d&&!d.done&&(a=u.return)&&a.call(u)}finally{if(o)throw o.error}}return cf(l)}}function cf(t){if(!t.length)return[];var e=t,r=e[0].function||"",n=e[e.length-1].function||"";return(r.indexOf("captureMessage")!==-1||r.indexOf("captureException")!==-1)&&(e=e.slice(1)),n.indexOf("sentryWrapped")!==-1&&(e=e.slice(0,-1)),e.slice(0,af).map(function(i){return h(h({},i),{filename:i.filename||e[0].filename,function:i.function||"?"})}).reverse()}var In="<anonymous>";function ms(t){try{return!t||typeof t!="function"?In:t.name||In}catch{return In}}function Fr(){if(!("fetch"in R()))return!1;try{return new Headers,new Request(""),new Response,!0}catch{return!1}}function ei(t){return t&&/^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function lf(){if(!Fr())return!1;var t=R();if(ei(t.fetch))return!0;var e=!1,r=t.document;if(r&&typeof r.createElement=="function")try{var n=r.createElement("iframe");n.hidden=!0,r.head.appendChild(n),n.contentWindow&&n.contentWindow.fetch&&(e=ei(n.contentWindow.fetch)),r.head.removeChild(n)}catch(i){vt&&P.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",i)}return e}function uf(){if(!Fr())return!1;try{return new Request("_",{referrerPolicy:"origin"}),!0}catch{return!1}}function df(){var t=R(),e=t.chrome,r=e&&e.app&&e.app.runtime,n="history"in t&&!!t.history.pushState&&!!t.history.replaceState;return!r&&n}var C=R(),Nt={},Ko={};function pf(t){if(!Ko[t])switch(Ko[t]=!0,t){case"console":ff();break;case"dom":xf();break;case"xhr":_f();break;case"fetch":hf();break;case"history":vf();break;case"error":Sf();break;case"unhandledrejection":Pf();break;default:vt&&P.warn("unknown instrumentation type:",t);return}}function St(t,e){Nt[t]=Nt[t]||[],Nt[t].push(e),pf(t)}function ne(t,e){var r,n;if(!(!t||!Nt[t]))try{for(var i=Qe(Nt[t]||[]),o=i.next();!o.done;o=i.next()){var a=o.value;try{a(e)}catch(s){vt&&P.error(`Error while triggering instrumentation handler.
Type: `+t+`
Name: `+ms(a)+`
Error:`,s)}}}catch(s){r={error:s}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}}function ff(){"console"in C&&$r.forEach(function(t){t in C.console&&ve(C.console,t,function(e){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];ne("console",{args:r,level:t}),e&&e.apply(C.console,r)}})})}function hf(){lf()&&ve(C,"fetch",function(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];var n={args:e,fetchData:{method:gf(e),url:yf(e)},startTimestamp:Date.now()};return ne("fetch",h({},n)),t.apply(C,e).then(function(i){return ne("fetch",h(h({},n),{endTimestamp:Date.now(),response:i})),i},function(i){throw ne("fetch",h(h({},n),{endTimestamp:Date.now(),error:i})),i})}})}function gf(t){return t===void 0&&(t=[]),"Request"in C&&_t(t[0],Request)&&t[0].method?String(t[0].method).toUpperCase():t[1]&&t[1].method?String(t[1].method).toUpperCase():"GET"}function yf(t){return t===void 0&&(t=[]),typeof t[0]=="string"?t[0]:"Request"in C&&_t(t[0],Request)?t[0].url:String(t[0])}function _f(){if("XMLHttpRequest"in C){var t=XMLHttpRequest.prototype;ve(t,"open",function(e){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var i=this,o=r[1],a=i.__sentry_xhr__={method:Jn(r[0])?r[0].toUpperCase():r[0],url:r[1]};Jn(o)&&a.method==="POST"&&o.match(/sentry_key/)&&(i.__sentry_own_request__=!0);var s=function(){if(i.readyState===4){try{a.status_code=i.status}catch{}ne("xhr",{args:r,endTimestamp:Date.now(),startTimestamp:Date.now(),xhr:i})}};return"onreadystatechange"in i&&typeof i.onreadystatechange=="function"?ve(i,"onreadystatechange",function(c){return function(){for(var l=[],u=0;u<arguments.length;u++)l[u]=arguments[u];return s(),c.apply(i,l)}}):i.addEventListener("readystatechange",s),e.apply(i,r)}}),ve(t,"send",function(e){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return this.__sentry_xhr__&&r[0]!==void 0&&(this.__sentry_xhr__.body=r[0]),ne("xhr",{args:r,startTimestamp:Date.now(),xhr:this}),e.apply(this,r)}})}}var sr;function vf(){if(!df())return;var t=C.onpopstate;C.onpopstate=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var i=C.location.href,o=sr;if(sr=i,ne("history",{from:o,to:i}),t)try{return t.apply(this,r)}catch{}};function e(r){return function(){for(var n=[],i=0;i<arguments.length;i++)n[i]=arguments[i];var o=n.length>2?n[2]:void 0;if(o){var a=sr,s=String(o);sr=s,ne("history",{from:a,to:s})}return r.apply(this,n)}}ve(C.history,"pushState",e),ve(C.history,"replaceState",e)}var mf=1e3,cr,lr;function bf(t,e){if(!t||t.type!==e.type)return!0;try{if(t.target!==e.target)return!0}catch{}return!1}function wf(t){if(t.type!=="keypress")return!1;try{var e=t.target;if(!e||!e.tagName)return!0;if(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)return!1}catch{}return!0}function Jo(t,e){return e===void 0&&(e=!1),function(r){if(!(!r||lr===r)&&!wf(r)){var n=r.type==="keypress"?"input":r.type;cr===void 0?(t({event:r,name:n,global:e}),lr=r):bf(lr,r)&&(t({event:r,name:n,global:e}),lr=r),clearTimeout(cr),cr=C.setTimeout(function(){cr=void 0},mf)}}}function xf(){if("document"in C){var t=ne.bind(null,"dom"),e=Jo(t,!0);C.document.addEventListener("click",e,!1),C.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(function(r){var n=C[r]&&C[r].prototype;!n||!n.hasOwnProperty||!n.hasOwnProperty("addEventListener")||(ve(n,"addEventListener",function(i){return function(o,a,s){if(o==="click"||o=="keypress")try{var c=this,l=c.__sentry_instrumentation_handlers__=c.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){var d=Jo(t);u.handler=d,i.call(this,o,d,s)}u.refCount+=1}catch{}return i.call(this,o,a,s)}}),ve(n,"removeEventListener",function(i){return function(o,a,s){if(o==="click"||o=="keypress")try{var c=this,l=c.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount-=1,u.refCount<=0&&(i.call(this,o,u.handler,s),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete c.__sentry_instrumentation_handlers__)}catch{}return i.call(this,o,a,s)}}))})}}var Ln=null;function Sf(){Ln=C.onerror,C.onerror=function(t,e,r,n,i){return ne("error",{column:n,error:i,line:r,msg:t,url:e}),Ln?Ln.apply(this,arguments):!1}}var Rn=null;function Pf(){Rn=C.onunhandledrejection,C.onunhandledrejection=function(t){return ne("unhandledrejection",t),Rn?Rn.apply(this,arguments):!0}}function Of(){var t=typeof WeakSet=="function",e=t?new WeakSet:[];function r(i){if(t)return e.has(i)?!0:(e.add(i),!1);for(var o=0;o<e.length;o++){var a=e[o];if(a===i)return!0}return e.push(i),!1}function n(i){if(t)e.delete(i);else for(var o=0;o<e.length;o++)if(e[o]===i){e.splice(o,1);break}}return[r,n]}function dt(){var t=R(),e=t.crypto||t.msCrypto;if(e!==void 0&&e.getRandomValues){var r=new Uint16Array(8);e.getRandomValues(r),r[3]=r[3]&4095|16384,r[4]=r[4]&16383|32768;var n=function(i){for(var o=i.toString(16);o.length<4;)o="0"+o;return o};return n(r[0])+n(r[1])+n(r[2])+n(r[3])+n(r[4])+n(r[5])+n(r[6])+n(r[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(i){var o=Math.random()*16|0,a=i==="x"?o:o&3|8;return a.toString(16)})}function Bn(t){if(!t)return{};var e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};var r=e[6]||"",n=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],relative:e[5]+r+n}}function bs(t){return t.exception&&t.exception.values?t.exception.values[0]:void 0}function $f(t){var e=t.message,r=t.event_id;if(e)return e;var n=bs(t);return n?n.type&&n.value?n.type+": "+n.value:n.type||n.value||r||"<unknown>":r||"<unknown>"}function Zo(t,e,r){var n=t.exception=t.exception||{},i=n.values=n.values||[],o=i[0]=i[0]||{};o.value||(o.value=e||""),o.type||(o.type="Error")}function ti(t,e){var r=bs(t);if(r){var n={type:"generic",handled:!0},i=r.mechanism;if(r.mechanism=h(h(h({},n),i),e),e&&"data"in e){var o=h(h({},i&&i.data),e.data);r.mechanism.data=o}}}function Xo(t){if(t&&t.__sentry_captured__)return!0;try{Bi(t,"__sentry_captured__",!0)}catch{}return!1}function Ue(t,e,r){e===void 0&&(e=1/0),r===void 0&&(r=1/0);try{return xs("",t,e,r)}catch(n){return{ERROR:"**non-serializable** ("+n+")"}}}function ws(t,e,r){e===void 0&&(e=3),r===void 0&&(r=100*1024);var n=Ue(t,e);return Cf(n)>r?ws(t,e-1,r):n}function xs(t,e,r,n,i){r===void 0&&(r=1/0),n===void 0&&(n=1/0),i===void 0&&(i=Of());var o=G(i,2),a=o[0],s=o[1],c=e;if(c&&typeof c.toJSON=="function")try{return c.toJSON()}catch{}if(e===null||["number","boolean","string"].includes(typeof e)&&!Hp(e))return e;var l=Mf(t,e);if(!l.startsWith("[object "))return l;if(r===0)return l.replace("object ","");if(a(e))return"[Circular ~]";var u=Array.isArray(e)?[]:{},d=0,f=Ii(e)||qr(e)?vs(e):e;for(var g in f)if(Object.prototype.hasOwnProperty.call(f,g)){if(d>=n){u[g]="[MaxProperties ~]";break}var m=f[g];u[g]=xs(g,m,r-1,n,i),d+=1}return s(e),u}function Mf(t,e){try{return t==="domain"&&e&&typeof e=="object"&&e._events?"[Domain]":t==="domainEmitter"?"[DomainEmitter]":typeof global<"u"&&e===global?"[Global]":typeof window<"u"&&e===window?"[Window]":typeof document<"u"&&e===document?"[Document]":zp(e)?"[SyntheticEvent]":typeof e=="number"&&e!==e?"[NaN]":e===void 0?"[undefined]":typeof e=="function"?"[Function: "+ms(e)+"]":typeof e=="symbol"?"["+String(e)+"]":typeof e=="bigint"?"[BigInt: "+String(e)+"]":"[object "+Object.getPrototypeOf(e).constructor.name+"]"}catch(r){return"**non-serializable** ("+r+")"}}function Ef(t){return~-encodeURI(t).split(/%..|./).length}function Cf(t){return Ef(JSON.stringify(t))}function Ye(t){return new Ie(function(e){e(t)})}function qt(t){return new Ie(function(e,r){r(t)})}var Ie=function(){function t(e){var r=this;this._state=0,this._handlers=[],this._resolve=function(n){r._setResult(1,n)},this._reject=function(n){r._setResult(2,n)},this._setResult=function(n,i){if(r._state===0){if(Li(i)){i.then(r._resolve,r._reject);return}r._state=n,r._value=i,r._executeHandlers()}},this._executeHandlers=function(){if(r._state!==0){var n=r._handlers.slice();r._handlers=[],n.forEach(function(i){i[0]||(r._state===1&&i[1](r._value),r._state===2&&i[2](r._value),i[0]=!0)})}};try{e(this._resolve,this._reject)}catch(n){this._reject(n)}}return t.prototype.then=function(e,r){var n=this;return new t(function(i,o){n._handlers.push([!1,function(a){if(!e)i(a);else try{i(e(a))}catch(s){o(s)}},function(a){if(!r)o(a);else try{i(r(a))}catch(s){o(s)}}]),n._executeHandlers()})},t.prototype.catch=function(e){return this.then(function(r){return r},e)},t.prototype.finally=function(e){var r=this;return new t(function(n,i){var o,a;return r.then(function(s){a=!1,o=s,e&&e()},function(s){a=!0,o=s,e&&e()}).then(function(){if(a){i(o);return}n(o)})})},t}();function Ss(t){var e=[];function r(){return t===void 0||e.length<t}function n(a){return e.splice(e.indexOf(a),1)[0]}function i(a){if(!r())return qt(new A("Not adding Promise due to buffer limit reached."));var s=a();return e.indexOf(s)===-1&&e.push(s),s.then(function(){return n(s)}).then(null,function(){return n(s).then(null,function(){})}),s}function o(a){return new Ie(function(s,c){var l=e.length;if(!l)return s(!0);var u=setTimeout(function(){a&&a>0&&s(!1)},a);e.forEach(function(d){Ye(d).then(function(){--l||(clearTimeout(u),s(!0))},c)})})}return{$:e,add:i,drain:o}}function Tf(t){return Xp.indexOf(t)!==-1}function Df(t){return t==="warn"?De.Warning:Tf(t)?t:De.Log}function Ps(t){return t>=200&&t<300?"success":t===429?"rate_limit":t>=400&&t<500?"invalid":t>=500?"failed":"unknown"}var ri={nowSeconds:function(){return Date.now()/1e3}};function Af(){var t=R().performance;if(!(!t||!t.now)){var e=Date.now()-t.now();return{now:function(){return t.now()},timeOrigin:e}}}function kf(){try{var t=Bp(tc,"perf_hooks");return t.performance}catch{return}}var jn=ki()?kf():Af(),ea=jn===void 0?ri:{nowSeconds:function(){return(jn.timeOrigin+jn.now())/1e3}},zr=ri.nowSeconds.bind(ri),ta=ea.nowSeconds.bind(ea);(function(){var t=R().performance;if(!(!t||!t.now)){var e=3600*1e3,r=t.now(),n=Date.now(),i=t.timeOrigin?Math.abs(t.timeOrigin+r-n):e,o=i<e,a=t.timing&&t.timing.navigationStart,s=typeof a=="number",c=s?Math.abs(a+r-n):e,l=c<e;return o||l?i<=c?t.timeOrigin:a:n}})();function Hr(t,e){return e===void 0&&(e=[]),[t,e]}function Nf(t){var e=G(t,2),r=G(e[1],1),n=G(r[0],1),i=n[0];return i.type}function Vr(t){var e=G(t,2),r=e[0],n=e[1],i=JSON.stringify(r);return n.reduce(function(o,a){var s=G(a,2),c=s[0],l=s[1],u=gs(l)?String(l):JSON.stringify(l);return o+`
`+JSON.stringify(c)+`
`+u},i)}function If(t,e,r){var n=[{type:"client_report"},{timestamp:zr(),discarded_events:t}];return Hr(e?{dsn:e}:{},[n])}var Lf=60*1e3;function Rf(t,e){e===void 0&&(e=Date.now());var r=parseInt(""+t,10);if(!isNaN(r))return r*1e3;var n=Date.parse(""+t);return isNaN(n)?Lf:n-e}function ji(t,e){return t[e]||t.all||0}function Os(t,e,r){return r===void 0&&(r=Date.now()),ji(t,e)>r}function $s(t,e,r){var n,i,o,a;r===void 0&&(r=Date.now());var s=h({},t),c=e["x-sentry-rate-limits"],l=e["retry-after"];if(c)try{for(var u=Qe(c.trim().split(",")),d=u.next();!d.done;d=u.next()){var f=d.value,g=f.split(":",2),m=parseInt(g[0],10),w=(isNaN(m)?60:m)*1e3;if(!g[1])s.all=r+w;else try{for(var S=(o=void 0,Qe(g[1].split(";"))),b=S.next();!b.done;b=S.next()){var M=b.value;s[M]=r+w}}catch(O){o={error:O}}finally{try{b&&!b.done&&(a=S.return)&&a.call(S)}finally{if(o)throw o.error}}}}catch(O){n={error:O}}finally{try{d&&!d.done&&(i=u.return)&&i.call(u)}finally{if(n)throw n.error}}else l&&(s.all=r+Rf(l,r));return s}var ra=100,Mr=function(){function t(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={}}return t.clone=function(e){var r=new t;return e&&(r._breadcrumbs=z(e._breadcrumbs),r._tags=h({},e._tags),r._extra=h({},e._extra),r._contexts=h({},e._contexts),r._user=e._user,r._level=e._level,r._span=e._span,r._session=e._session,r._transactionName=e._transactionName,r._fingerprint=e._fingerprint,r._eventProcessors=z(e._eventProcessors),r._requestSession=e._requestSession),r},t.prototype.addScopeListener=function(e){this._scopeListeners.push(e)},t.prototype.addEventProcessor=function(e){return this._eventProcessors.push(e),this},t.prototype.setUser=function(e){return this._user=e||{},this._session&&this._session.update({user:e}),this._notifyScopeListeners(),this},t.prototype.getUser=function(){return this._user},t.prototype.getRequestSession=function(){return this._requestSession},t.prototype.setRequestSession=function(e){return this._requestSession=e,this},t.prototype.setTags=function(e){return this._tags=h(h({},this._tags),e),this._notifyScopeListeners(),this},t.prototype.setTag=function(e,r){var n;return this._tags=h(h({},this._tags),(n={},n[e]=r,n)),this._notifyScopeListeners(),this},t.prototype.setExtras=function(e){return this._extra=h(h({},this._extra),e),this._notifyScopeListeners(),this},t.prototype.setExtra=function(e,r){var n;return this._extra=h(h({},this._extra),(n={},n[e]=r,n)),this._notifyScopeListeners(),this},t.prototype.setFingerprint=function(e){return this._fingerprint=e,this._notifyScopeListeners(),this},t.prototype.setLevel=function(e){return this._level=e,this._notifyScopeListeners(),this},t.prototype.setTransactionName=function(e){return this._transactionName=e,this._notifyScopeListeners(),this},t.prototype.setTransaction=function(e){return this.setTransactionName(e)},t.prototype.setContext=function(e,r){var n;return r===null?delete this._contexts[e]:this._contexts=h(h({},this._contexts),(n={},n[e]=r,n)),this._notifyScopeListeners(),this},t.prototype.setSpan=function(e){return this._span=e,this._notifyScopeListeners(),this},t.prototype.getSpan=function(){return this._span},t.prototype.getTransaction=function(){var e=this.getSpan();return e&&e.transaction},t.prototype.setSession=function(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this},t.prototype.getSession=function(){return this._session},t.prototype.update=function(e){if(!e)return this;if(typeof e=="function"){var r=e(this);return r instanceof t?r:this}return e instanceof t?(this._tags=h(h({},this._tags),e._tags),this._extra=h(h({},this._extra),e._extra),this._contexts=h(h({},this._contexts),e._contexts),e._user&&Object.keys(e._user).length&&(this._user=e._user),e._level&&(this._level=e._level),e._fingerprint&&(this._fingerprint=e._fingerprint),e._requestSession&&(this._requestSession=e._requestSession)):gt(e)&&(e=e,this._tags=h(h({},this._tags),e.tags),this._extra=h(h({},this._extra),e.extra),this._contexts=h(h({},this._contexts),e.contexts),e.user&&(this._user=e.user),e.level&&(this._level=e.level),e.fingerprint&&(this._fingerprint=e.fingerprint),e.requestSession&&(this._requestSession=e.requestSession)),this},t.prototype.clear=function(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._requestSession=void 0,this._span=void 0,this._session=void 0,this._notifyScopeListeners(),this},t.prototype.addBreadcrumb=function(e,r){var n=typeof r=="number"?Math.min(r,ra):ra;if(n<=0)return this;var i=h({timestamp:zr()},e);return this._breadcrumbs=z(this._breadcrumbs,[i]).slice(-n),this._notifyScopeListeners(),this},t.prototype.clearBreadcrumbs=function(){return this._breadcrumbs=[],this._notifyScopeListeners(),this},t.prototype.applyToEvent=function(e,r){if(this._extra&&Object.keys(this._extra).length&&(e.extra=h(h({},this._extra),e.extra)),this._tags&&Object.keys(this._tags).length&&(e.tags=h(h({},this._tags),e.tags)),this._user&&Object.keys(this._user).length&&(e.user=h(h({},this._user),e.user)),this._contexts&&Object.keys(this._contexts).length&&(e.contexts=h(h({},this._contexts),e.contexts)),this._level&&(e.level=this._level),this._transactionName&&(e.transaction=this._transactionName),this._span){e.contexts=h({trace:this._span.getTraceContext()},e.contexts);var n=this._span.transaction&&this._span.transaction.name;n&&(e.tags=h({transaction:n},e.tags))}return this._applyFingerprint(e),e.breadcrumbs=z(e.breadcrumbs||[],this._breadcrumbs),e.breadcrumbs=e.breadcrumbs.length>0?e.breadcrumbs:void 0,e.sdkProcessingMetadata=this._sdkProcessingMetadata,this._notifyEventProcessors(z(Ms(),this._eventProcessors),e,r)},t.prototype.setSDKProcessingMetadata=function(e){return this._sdkProcessingMetadata=h(h({},this._sdkProcessingMetadata),e),this},t.prototype._notifyEventProcessors=function(e,r,n,i){var o=this;return i===void 0&&(i=0),new Ie(function(a,s){var c=e[i];if(r===null||typeof c!="function")a(r);else{var l=c(h({},r),n);Li(l)?l.then(function(u){return o._notifyEventProcessors(e,u,n,i+1).then(a)}).then(null,s):o._notifyEventProcessors(e,l,n,i+1).then(a).then(null,s)}})},t.prototype._notifyScopeListeners=function(){var e=this;this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(function(r){r(e)}),this._notifyingListeners=!1)},t.prototype._applyFingerprint=function(e){e.fingerprint=e.fingerprint?Array.isArray(e.fingerprint)?e.fingerprint:[e.fingerprint]:[],this._fingerprint&&(e.fingerprint=e.fingerprint.concat(this._fingerprint)),e.fingerprint&&!e.fingerprint.length&&delete e.fingerprint},t}();function Ms(){return Ni("globalEventProcessors",function(){return[]})}function Es(t){Ms().push(t)}var Bf=function(){function t(e){this.errors=0,this.sid=dt(),this.duration=0,this.status="ok",this.init=!0,this.ignoreDuration=!1;var r=ta();this.timestamp=r,this.started=r,e&&this.update(e)}return t.prototype.update=function(e){if(e===void 0&&(e={}),e.user&&(!this.ipAddress&&e.user.ip_address&&(this.ipAddress=e.user.ip_address),!this.did&&!e.did&&(this.did=e.user.id||e.user.email||e.user.username)),this.timestamp=e.timestamp||ta(),e.ignoreDuration&&(this.ignoreDuration=e.ignoreDuration),e.sid&&(this.sid=e.sid.length===32?e.sid:dt()),e.init!==void 0&&(this.init=e.init),!this.did&&e.did&&(this.did=""+e.did),typeof e.started=="number"&&(this.started=e.started),this.ignoreDuration)this.duration=void 0;else if(typeof e.duration=="number")this.duration=e.duration;else{var r=this.timestamp-this.started;this.duration=r>=0?r:0}e.release&&(this.release=e.release),e.environment&&(this.environment=e.environment),!this.ipAddress&&e.ipAddress&&(this.ipAddress=e.ipAddress),!this.userAgent&&e.userAgent&&(this.userAgent=e.userAgent),typeof e.errors=="number"&&(this.errors=e.errors),e.status&&(this.status=e.status)},t.prototype.close=function(e){e?this.update({status:e}):this.status==="ok"?this.update({status:"exited"}):this.update()},t.prototype.toJSON=function(){return Xn({sid:""+this.sid,init:this.init,started:new Date(this.started*1e3).toISOString(),timestamp:new Date(this.timestamp*1e3).toISOString(),status:this.status,errors:this.errors,did:typeof this.did=="number"||typeof this.did=="string"?""+this.did:void 0,duration:this.duration,attrs:{release:this.release,environment:this.environment,ip_address:this.ipAddress,user_agent:this.userAgent}})},t}(),na=typeof __SENTRY_DEBUG__>"u"?!0:__SENTRY_DEBUG__,Ui=4,jf=100,Wr=function(){function t(e,r,n){r===void 0&&(r=new Mr),n===void 0&&(n=Ui),this._version=n,this._stack=[{}],this.getStackTop().scope=r,e&&this.bindClient(e)}return t.prototype.isOlderThan=function(e){return this._version<e},t.prototype.bindClient=function(e){var r=this.getStackTop();r.client=e,e&&e.setupIntegrations&&e.setupIntegrations()},t.prototype.pushScope=function(){var e=Mr.clone(this.getScope());return this.getStack().push({client:this.getClient(),scope:e}),e},t.prototype.popScope=function(){return this.getStack().length<=1?!1:!!this.getStack().pop()},t.prototype.withScope=function(e){var r=this.pushScope();try{e(r)}finally{this.popScope()}},t.prototype.getClient=function(){return this.getStackTop().client},t.prototype.getScope=function(){return this.getStackTop().scope},t.prototype.getStack=function(){return this._stack},t.prototype.getStackTop=function(){return this._stack[this._stack.length-1]},t.prototype.captureException=function(e,r){var n=this._lastEventId=r&&r.event_id?r.event_id:dt(),i=r;if(!r){var o=void 0;try{throw new Error("Sentry syntheticException")}catch(a){o=a}i={originalException:e,syntheticException:o}}return this._invokeClient("captureException",e,h(h({},i),{event_id:n})),n},t.prototype.captureMessage=function(e,r,n){var i=this._lastEventId=n&&n.event_id?n.event_id:dt(),o=n;if(!n){var a=void 0;try{throw new Error(e)}catch(s){a=s}o={originalException:e,syntheticException:a}}return this._invokeClient("captureMessage",e,r,h(h({},o),{event_id:i})),i},t.prototype.captureEvent=function(e,r){var n=r&&r.event_id?r.event_id:dt();return e.type!=="transaction"&&(this._lastEventId=n),this._invokeClient("captureEvent",e,h(h({},r),{event_id:n})),n},t.prototype.lastEventId=function(){return this._lastEventId},t.prototype.addBreadcrumb=function(e,r){var n=this.getStackTop(),i=n.scope,o=n.client;if(!(!i||!o)){var a=o.getOptions&&o.getOptions()||{},s=a.beforeBreadcrumb,c=s===void 0?null:s,l=a.maxBreadcrumbs,u=l===void 0?jf:l;if(!(u<=0)){var d=zr(),f=h({timestamp:d},e),g=c?_s(function(){return c(f,r)}):f;g!==null&&i.addBreadcrumb(g,u)}}},t.prototype.setUser=function(e){var r=this.getScope();r&&r.setUser(e)},t.prototype.setTags=function(e){var r=this.getScope();r&&r.setTags(e)},t.prototype.setExtras=function(e){var r=this.getScope();r&&r.setExtras(e)},t.prototype.setTag=function(e,r){var n=this.getScope();n&&n.setTag(e,r)},t.prototype.setExtra=function(e,r){var n=this.getScope();n&&n.setExtra(e,r)},t.prototype.setContext=function(e,r){var n=this.getScope();n&&n.setContext(e,r)},t.prototype.configureScope=function(e){var r=this.getStackTop(),n=r.scope,i=r.client;n&&i&&e(n)},t.prototype.run=function(e){var r=ia(this);try{e(this)}finally{ia(r)}},t.prototype.getIntegration=function(e){var r=this.getClient();if(!r)return null;try{return r.getIntegration(e)}catch{return na&&P.warn("Cannot retrieve integration "+e.id+" from the current Hub"),null}},t.prototype.startSpan=function(e){return this._callExtensionMethod("startSpan",e)},t.prototype.startTransaction=function(e,r){return this._callExtensionMethod("startTransaction",e,r)},t.prototype.traceHeaders=function(){return this._callExtensionMethod("traceHeaders")},t.prototype.captureSession=function(e){if(e===void 0&&(e=!1),e)return this.endSession();this._sendSessionUpdate()},t.prototype.endSession=function(){var e=this.getStackTop(),r=e&&e.scope,n=r&&r.getSession();n&&n.close(),this._sendSessionUpdate(),r&&r.setSession()},t.prototype.startSession=function(e){var r=this.getStackTop(),n=r.scope,i=r.client,o=i&&i.getOptions()||{},a=o.release,s=o.environment,c=R(),l=(c.navigator||{}).userAgent,u=new Bf(h(h(h({release:a,environment:s},n&&{user:n.getUser()}),l&&{userAgent:l}),e));if(n){var d=n.getSession&&n.getSession();d&&d.status==="ok"&&d.update({status:"exited"}),this.endSession(),n.setSession(u)}return u},t.prototype._sendSessionUpdate=function(){var e=this.getStackTop(),r=e.scope,n=e.client;if(r){var i=r.getSession&&r.getSession();i&&n&&n.captureSession&&n.captureSession(i)}},t.prototype._invokeClient=function(e){for(var r,n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];var o=this.getStackTop(),a=o.scope,s=o.client;s&&s[e]&&(r=s)[e].apply(r,z(n,[a]))},t.prototype._callExtensionMethod=function(e){for(var r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];var i=Qr(),o=i.__SENTRY__;if(o&&o.extensions&&typeof o.extensions[e]=="function")return o.extensions[e].apply(this,r);na&&P.warn("Extension method "+e+" couldn't be found, doing nothing.")},t}();function Qr(){var t=R();return t.__SENTRY__=t.__SENTRY__||{extensions:{},hub:void 0},t}function ia(t){var e=Qr(),r=Ee(e);return qi(e,t),r}function Ae(){var t=Qr();return(!Cs(t)||Ee(t).isOlderThan(Ui))&&qi(t,new Wr),ki()?Uf(t):Ee(t)}function Uf(t){try{var e=Qr().__SENTRY__,r=e&&e.extensions&&e.extensions.domain&&e.extensions.domain.active;if(!r)return Ee(t);if(!Cs(r)||Ee(r).isOlderThan(Ui)){var n=Ee(t).getStackTop();qi(r,new Wr(n.client,Mr.clone(n.scope)))}return Ee(r)}catch{return Ee(t)}}function Cs(t){return!!(t&&t.__SENTRY__&&t.__SENTRY__.hub)}function Ee(t){return Ni("hub",function(){return new Wr},t)}function qi(t,e){if(!t)return!1;var r=t.__SENTRY__=t.__SENTRY__||{};return r.hub=e,!0}var qf="7";function Er(t,e,r){return{initDsn:t,metadata:e||{},dsn:Ri(t),tunnel:r}}function Ts(t){var e=t.protocol?t.protocol+":":"",r=t.port?":"+t.port:"";return e+"//"+t.host+r+(t.path?"/"+t.path:"")+"/api/"}function Ds(t,e){return""+Ts(t)+t.projectId+"/"+e+"/"}function As(t){return nf({sentry_key:t.publicKey,sentry_version:qf})}function Ff(t){return Ds(t,"store")}function ks(t){return Ff(t)+"?"+As(t)}function zf(t){return Ds(t,"envelope")}function Yr(t,e){return e||zf(t)+"?"+As(t)}function Hf(t,e){var r=Ri(t),n=Ts(r)+"embed/error-page/",i="dsn="+Xt(r);for(var o in e)if(o!=="dsn")if(o==="user"){if(!e.user)continue;e.user.name&&(i+="&name="+encodeURIComponent(e.user.name)),e.user.email&&(i+="&email="+encodeURIComponent(e.user.email))}else i+="&"+encodeURIComponent(o)+"="+encodeURIComponent(e[o]);return n+"?"+i}var Q=typeof __SENTRY_DEBUG__>"u"?!0:__SENTRY_DEBUG__,oa=[];function aa(t){return t.reduce(function(e,r){return e.every(function(n){return r.name!==n.name})&&e.push(r),e},[])}function Vf(t){var e=t.defaultIntegrations&&z(t.defaultIntegrations)||[],r=t.integrations,n=z(aa(e));Array.isArray(r)?n=z(n.filter(function(a){return r.every(function(s){return s.name!==a.name})}),aa(r)):typeof r=="function"&&(n=r(n),n=Array.isArray(n)?n:[n]);var i=n.map(function(a){return a.name}),o="Debug";return i.indexOf(o)!==-1&&n.push.apply(n,z(n.splice(i.indexOf(o),1))),n}function Wf(t){oa.indexOf(t.name)===-1&&(t.setupOnce(Es,Ae),oa.push(t.name),Q&&P.log("Integration installed: "+t.name))}function Qf(t){var e={};return Vf(t).forEach(function(r){e[r.name]=r,Wf(r)}),Bi(e,"initialized",!0),e}var sa="Not capturing exception because it's already been captured.",Yf=function(){function t(e,r){this._integrations={},this._numProcessing=0,this._backend=new e(r),this._options=r,r.dsn&&(this._dsn=Ri(r.dsn))}return t.prototype.captureException=function(e,r,n){var i=this;if(Xo(e)){Q&&P.log(sa);return}var o=r&&r.event_id;return this._process(this._getBackend().eventFromException(e,r).then(function(a){return i._captureEvent(a,r,n)}).then(function(a){o=a})),o},t.prototype.captureMessage=function(e,r,n,i){var o=this,a=n&&n.event_id,s=gs(e)?this._getBackend().eventFromMessage(String(e),r,n):this._getBackend().eventFromException(e,n);return this._process(s.then(function(c){return o._captureEvent(c,n,i)}).then(function(c){a=c})),a},t.prototype.captureEvent=function(e,r,n){if(r&&r.originalException&&Xo(r.originalException)){Q&&P.log(sa);return}var i=r&&r.event_id;return this._process(this._captureEvent(e,r,n).then(function(o){i=o})),i},t.prototype.captureSession=function(e){if(!this._isEnabled()){Q&&P.warn("SDK not enabled, will not capture session.");return}typeof e.release!="string"?Q&&P.warn("Discarded session because of missing or non-string release"):(this._sendSession(e),e.update({init:!1}))},t.prototype.getDsn=function(){return this._dsn},t.prototype.getOptions=function(){return this._options},t.prototype.getTransport=function(){return this._getBackend().getTransport()},t.prototype.flush=function(e){var r=this;return this._isClientDoneProcessing(e).then(function(n){return r.getTransport().close(e).then(function(i){return n&&i})})},t.prototype.close=function(e){var r=this;return this.flush(e).then(function(n){return r.getOptions().enabled=!1,n})},t.prototype.setupIntegrations=function(){this._isEnabled()&&!this._integrations.initialized&&(this._integrations=Qf(this._options))},t.prototype.getIntegration=function(e){try{return this._integrations[e.id]||null}catch{return Q&&P.warn("Cannot retrieve integration "+e.id+" from the current Client"),null}},t.prototype._updateSessionFromEvent=function(e,r){var n,i,o=!1,a=!1,s=r.exception&&r.exception.values;if(s){a=!0;try{for(var c=Qe(s),l=c.next();!l.done;l=c.next()){var u=l.value,d=u.mechanism;if(d&&d.handled===!1){o=!0;break}}}catch(m){n={error:m}}finally{try{l&&!l.done&&(i=c.return)&&i.call(c)}finally{if(n)throw n.error}}}var f=e.status==="ok",g=f&&e.errors===0||f&&o;g&&(e.update(h(h({},o&&{status:"crashed"}),{errors:e.errors||Number(a||o)})),this.captureSession(e))},t.prototype._sendSession=function(e){this._getBackend().sendSession(e)},t.prototype._isClientDoneProcessing=function(e){var r=this;return new Ie(function(n){var i=0,o=1,a=setInterval(function(){r._numProcessing==0?(clearInterval(a),n(!0)):(i+=o,e&&i>=e&&(clearInterval(a),n(!1)))},o)})},t.prototype._getBackend=function(){return this._backend},t.prototype._isEnabled=function(){return this.getOptions().enabled!==!1&&this._dsn!==void 0},t.prototype._prepareEvent=function(e,r,n){var i=this,o=this.getOptions(),a=o.normalizeDepth,s=a===void 0?3:a,c=o.normalizeMaxBreadth,l=c===void 0?1e3:c,u=h(h({},e),{event_id:e.event_id||(n&&n.event_id?n.event_id:dt()),timestamp:e.timestamp||zr()});this._applyClientOptions(u),this._applyIntegrationsMetadata(u);var d=r;n&&n.captureContext&&(d=Mr.clone(d).update(n.captureContext));var f=Ye(u);return d&&(f=d.applyToEvent(u,n)),f.then(function(g){return g&&(g.sdkProcessingMetadata=h(h({},g.sdkProcessingMetadata),{normalizeDepth:Ue(s)+" ("+typeof s+")"})),typeof s=="number"&&s>0?i._normalizeEvent(g,s,l):g})},t.prototype._normalizeEvent=function(e,r,n){if(!e)return null;var i=h(h(h(h(h({},e),e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(function(o){return h(h({},o),o.data&&{data:Ue(o.data,r,n)})})}),e.user&&{user:Ue(e.user,r,n)}),e.contexts&&{contexts:Ue(e.contexts,r,n)}),e.extra&&{extra:Ue(e.extra,r,n)});return e.contexts&&e.contexts.trace&&(i.contexts.trace=e.contexts.trace),i.sdkProcessingMetadata=h(h({},i.sdkProcessingMetadata),{baseClientNormalized:!0}),i},t.prototype._applyClientOptions=function(e){var r=this.getOptions(),n=r.environment,i=r.release,o=r.dist,a=r.maxValueLength,s=a===void 0?250:a;"environment"in e||(e.environment="environment"in r?n:"production"),e.release===void 0&&i!==void 0&&(e.release=i),e.dist===void 0&&o!==void 0&&(e.dist=o),e.message&&(e.message=kt(e.message,s));var c=e.exception&&e.exception.values&&e.exception.values[0];c&&c.value&&(c.value=kt(c.value,s));var l=e.request;l&&l.url&&(l.url=kt(l.url,s))},t.prototype._applyIntegrationsMetadata=function(e){var r=Object.keys(this._integrations);r.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=z(e.sdk.integrations||[],r))},t.prototype._sendEvent=function(e){this._getBackend().sendEvent(e)},t.prototype._captureEvent=function(e,r,n){return this._processEvent(e,r,n).then(function(i){return i.event_id},function(i){Q&&P.error(i)})},t.prototype._processEvent=function(e,r,n){var i=this,o=this.getOptions(),a=o.beforeSend,s=o.sampleRate,c=this.getTransport();function l(d,f){c.recordLostEvent&&c.recordLostEvent(d,f)}if(!this._isEnabled())return qt(new A("SDK not enabled, will not capture event."));var u=e.type==="transaction";return!u&&typeof s=="number"&&Math.random()>s?(l("sample_rate","event"),qt(new A("Discarding event because it's not included in the random sample (sampling rate = "+s+")"))):this._prepareEvent(e,n,r).then(function(d){if(d===null)throw l("event_processor",e.type||"event"),new A("An event processor returned null, will not send event.");var f=r&&r.data&&r.data.__sentry__===!0;if(f||u||!a)return d;var g=a(d,r);return Gf(g)}).then(function(d){if(d===null)throw l("before_send",e.type||"event"),new A("`beforeSend` returned `null`, will not send event.");var f=n&&n.getSession&&n.getSession();return!u&&f&&i._updateSessionFromEvent(f,d),i._sendEvent(d),d}).then(null,function(d){throw d instanceof A?d:(i.captureException(d,{data:{__sentry__:!0},originalException:d}),new A(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: `+d))})},t.prototype._process=function(e){var r=this;this._numProcessing+=1,e.then(function(n){return r._numProcessing-=1,n},function(n){return r._numProcessing-=1,n})},t}();function Gf(t){var e="`beforeSend` method has to return `null` or a valid event.";if(Li(t))return t.then(function(r){if(!(gt(r)||r===null))throw new A(e);return r},function(r){throw new A("beforeSend rejected with "+r)});if(!(gt(t)||t===null))throw new A(e);return t}function Fi(t){if(!(!t.metadata||!t.metadata.sdk)){var e=t.metadata.sdk,r=e.name,n=e.version;return{name:r,version:n}}}function Ns(t,e){return e&&(t.sdk=t.sdk||{},t.sdk.name=t.sdk.name||e.name,t.sdk.version=t.sdk.version||e.version,t.sdk.integrations=z(t.sdk.integrations||[],e.integrations||[]),t.sdk.packages=z(t.sdk.packages||[],e.packages||[])),t}function Is(t,e){var r=Fi(e),n=h(h({sent_at:new Date().toISOString()},r&&{sdk:r}),!!e.tunnel&&{dsn:Xt(e.dsn)}),i="aggregates"in t?"sessions":"session",o=[{type:i},t],a=Hr(n,[o]);return[a,i]}function Kf(t,e){var r=G(Is(t,e),2),n=r[0],i=r[1];return{body:Vr(n),type:i,url:Yr(e.dsn,e.tunnel)}}function Jf(t,e){var r=Fi(e),n=t.type||"event",i=(t.sdkProcessingMetadata||{}).transactionSampling,o=i||{},a=o.method,s=o.rate;Ns(t,e.metadata.sdk),t.tags=t.tags||{},t.extra=t.extra||{},t.sdkProcessingMetadata&&t.sdkProcessingMetadata.baseClientNormalized||(t.tags.skippedNormalization=!0,t.extra.normalizeDepth=t.sdkProcessingMetadata?t.sdkProcessingMetadata.normalizeDepth:"unset"),delete t.sdkProcessingMetadata;var c=h(h({event_id:t.event_id,sent_at:new Date().toISOString()},r&&{sdk:r}),!!e.tunnel&&{dsn:Xt(e.dsn)}),l=[{type:n,sample_rates:[{id:a,rate:s}]},t];return Hr(c,[l])}function Zf(t,e){var r=Fi(e),n=t.type||"event",i=n==="transaction"||!!e.tunnel,o=(t.sdkProcessingMetadata||{}).transactionSampling,a=o||{},s=a.method,c=a.rate;Ns(t,e.metadata.sdk),t.tags=t.tags||{},t.extra=t.extra||{},t.sdkProcessingMetadata&&t.sdkProcessingMetadata.baseClientNormalized||(t.tags.skippedNormalization=!0,t.extra.normalizeDepth=t.sdkProcessingMetadata?t.sdkProcessingMetadata.normalizeDepth:"unset"),delete t.sdkProcessingMetadata;var l;try{l=JSON.stringify(t)}catch(w){t.tags.JSONStringifyError=!0,t.extra.JSONStringifyError=w;try{l=JSON.stringify(Ue(t))}catch(S){var u=S;l=JSON.stringify({message:"JSON.stringify error after renormalization",extra:{message:u.message,stack:u.stack}})}}var d={body:l,type:n,url:i?Yr(e.dsn,e.tunnel):ks(e.dsn)};if(i){var f=h(h({event_id:t.event_id,sent_at:new Date().toISOString()},r&&{sdk:r}),!!e.tunnel&&{dsn:Xt(e.dsn)}),g=[{type:n,sample_rates:[{id:s,rate:c}]},d.body],m=Hr(f,[g]);d.body=Vr(m)}return d}var Xf=function(){function t(){}return t.prototype.sendEvent=function(e){return Ye({reason:"NoopTransport: Event has been skipped because no Dsn is configured.",status:"skipped"})},t.prototype.close=function(e){return Ye(!0)},t}(),eh=function(){function t(e){this._options=e,this._options.dsn||Q&&P.warn("No DSN provided, backend will not do anything."),this._transport=this._setupTransport()}return t.prototype.eventFromException=function(e,r){throw new A("Backend has to implement `eventFromException` method")},t.prototype.eventFromMessage=function(e,r,n){throw new A("Backend has to implement `eventFromMessage` method")},t.prototype.sendEvent=function(e){if(this._newTransport&&this._options.dsn&&this._options._experiments&&this._options._experiments.newTransport){var r=Er(this._options.dsn,this._options._metadata,this._options.tunnel),n=Jf(e,r);this._newTransport.send(n).then(null,function(i){Q&&P.error("Error while sending event:",i)})}else this._transport.sendEvent(e).then(null,function(i){Q&&P.error("Error while sending event:",i)})},t.prototype.sendSession=function(e){if(!this._transport.sendSession){Q&&P.warn("Dropping session because custom transport doesn't implement sendSession");return}if(this._newTransport&&this._options.dsn&&this._options._experiments&&this._options._experiments.newTransport){var r=Er(this._options.dsn,this._options._metadata,this._options.tunnel),n=G(Is(e,r),1),i=n[0];this._newTransport.send(i).then(null,function(o){Q&&P.error("Error while sending session:",o)})}else this._transport.sendSession(e).then(null,function(o){Q&&P.error("Error while sending session:",o)})},t.prototype.getTransport=function(){return this._transport},t.prototype._setupTransport=function(){return new Xf},t}(),th=30;function Ls(t,e,r){r===void 0&&(r=Ss(t.bufferSize||th));var n={},i=function(a){return r.drain(a)};function o(a){var s=Nf(a),c=s==="event"?"error":s,l={category:c,body:Vr(a)};if(Os(n,c))return qt({status:"rate_limit",reason:ca(n,c)});var u=function(){return e(l).then(function(d){var f=d.body,g=d.headers,m=d.reason,w=d.statusCode,S=Ps(w);return g&&(n=$s(n,g)),S==="success"?Ye({status:S,reason:m}):qt({status:S,reason:m||f||(S==="rate_limit"?ca(n,c):"Unknown transport error")})})};return r.add(u)}return{send:o,flush:i}}function ca(t,e){return"Too many "+e+" requests, backing off until: "+new Date(ji(t,e)).toISOString()}var la="6.19.6",mt="?",rh=10,nh=20,ih=30,oh=40,ah=50;function er(t,e,r,n){var i={filename:t,function:e,in_app:!0};return r!==void 0&&(i.lineno=r),n!==void 0&&(i.colno=n),i}var sh=/^\s*at (?:(.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,ch=/\((\S*)(?::(\d+))(?::(\d+))\)/,lh=function(t){var e=sh.exec(t);if(e){var r=e[2]&&e[2].indexOf("eval")===0;if(r){var n=ch.exec(e[2]);n&&(e[2]=n[1],e[3]=n[2],e[4]=n[3])}var i=G(Rs(e[1]||mt,e[2]),2),o=i[0],a=i[1];return er(a,o,e[3]?+e[3]:void 0,e[4]?+e[4]:void 0)}},uh=[ih,lh],dh=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,ph=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,fh=function(t){var e,r=dh.exec(t);if(r){var n=r[3]&&r[3].indexOf(" > eval")>-1;if(n){var i=ph.exec(r[3]);i&&(r[1]=r[1]||"eval",r[3]=i[1],r[4]=i[2],r[5]="")}var o=r[3],a=r[1]||mt;return e=G(Rs(a,o),2),a=e[0],o=e[1],er(o,a,r[4]?+r[4]:void 0,r[5]?+r[5]:void 0)}},hh=[ah,fh],gh=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,yh=function(t){var e=gh.exec(t);return e?er(e[2],e[1]||mt,+e[3],e[4]?+e[4]:void 0):void 0},_h=[oh,yh],vh=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,mh=function(t){var e=vh.exec(t);return e?er(e[2],e[3]||mt,+e[1]):void 0},bh=[rh,mh],wh=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,xh=function(t){var e=wh.exec(t);return e?er(e[5],e[3]||e[4]||mt,+e[1],+e[2]):void 0},Sh=[nh,xh],Rs=function(t,e){var r=t.indexOf("safari-extension")!==-1,n=t.indexOf("safari-web-extension")!==-1;return r||n?[t.indexOf("@")!==-1?t.split("@")[0]:mt,r?"safari-extension:"+e:"safari-web-extension:"+e]:[t,e]};function Ph(t){var e=zi(t),r={type:t&&t.name,value:Eh(t)};return e.length&&(r.stacktrace={frames:e}),r.type===void 0&&r.value===""&&(r.value="Unrecoverable error caught"),r}function Oh(t,e,r){var n={exception:{values:[{type:qr(t)?t.constructor.name:r?"UnhandledRejection":"Error",value:"Non-Error exception captured with keys: "+of(t)}]},extra:{__serialized__:ws(t)}};if(e){var i=zi(e);i.length&&(n.stacktrace={frames:i})}return n}function Un(t){return{exception:{values:[Ph(t)]}}}function zi(t){var e=t.stacktrace||t.stack||"",r=Mh(t);try{return sf(bh,Sh,uh,_h,hh)(e,r)}catch{}return[]}var $h=/Minified React error #\d+;/i;function Mh(t){if(t){if(typeof t.framesToPop=="number")return t.framesToPop;if($h.test(t.message))return 1}return 0}function Eh(t){var e=t&&t.message;return e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function Ch(t,e,r){var n=e&&e.syntheticException||void 0,i=Dh(t,n,r);return ti(i),i.level=De.Error,e&&e.event_id&&(i.event_id=e.event_id),Ye(i)}function Th(t,e,r,n){e===void 0&&(e=De.Info);var i=r&&r.syntheticException||void 0,o=ni(t,i,n);return o.level=e,r&&r.event_id&&(o.event_id=r.event_id),Ye(o)}function Dh(t,e,r,n){var i;if(Up(t)&&t.error){var o=t;return Un(o.error)}if(Vo(t)||qp(t)){var a=t;if("stack"in t)i=Un(t);else{var s=a.name||(Vo(a)?"DOMError":"DOMException"),c=a.message?s+": "+a.message:s;i=ni(c,e,r),Zo(i,c)}return"code"in a&&(i.tags=h(h({},i.tags),{"DOMException.code":""+a.code})),i}if(Ii(t))return Un(t);if(gt(t)||qr(t)){var l=t;return i=Oh(l,e,n),ti(i,{synthetic:!0}),i}return i=ni(t,e,r),Zo(i,""+t),ti(i,{synthetic:!0}),i}function ni(t,e,r){var n={message:t};if(r&&e){var i=zi(e);i.length&&(n.stacktrace={frames:i})}return n}var _e=typeof __SENTRY_DEBUG__>"u"?!0:__SENTRY_DEBUG__,te=R(),ur;function Hi(){if(ur)return ur;if(ei(te.fetch))return ur=te.fetch.bind(te);var t=te.document,e=te.fetch;if(t&&typeof t.createElement=="function")try{var r=t.createElement("iframe");r.hidden=!0,t.head.appendChild(r);var n=r.contentWindow;n&&n.fetch&&(e=n.fetch),t.head.removeChild(r)}catch(i){_e&&P.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",i)}return ur=e.bind(te)}function Ah(t,e){var r=Object.prototype.toString.call(te&&te.navigator)==="[object Navigator]",n=r&&typeof te.navigator.sendBeacon=="function";if(n){var i=te.navigator.sendBeacon.bind(te.navigator);return i(t,e)}if(Fr()){var o=Hi();return Lp(o(t,{body:e,method:"POST",credentials:"omit",keepalive:!0}))}}function qn(t){var e=t;return e==="event"?"error":e}var Fn=R(),Bs=function(){function t(e){var r=this;this.options=e,this._buffer=Ss(30),this._rateLimits={},this._outcomes={},this._api=Er(e.dsn,e._metadata,e.tunnel),this.url=ks(this._api.dsn),this.options.sendClientReports&&Fn.document&&Fn.document.addEventListener("visibilitychange",function(){Fn.document.visibilityState==="hidden"&&r._flushOutcomes()})}return t.prototype.sendEvent=function(e){return this._sendRequest(Zf(e,this._api),e)},t.prototype.sendSession=function(e){return this._sendRequest(Kf(e,this._api),e)},t.prototype.close=function(e){return this._buffer.drain(e)},t.prototype.recordLostEvent=function(e,r){var n;if(this.options.sendClientReports){var i=qn(r)+":"+e;_e&&P.log("Adding outcome: "+i),this._outcomes[i]=(n=this._outcomes[i],(n??0)+1)}},t.prototype._flushOutcomes=function(){if(this.options.sendClientReports){var e=this._outcomes;if(this._outcomes={},!Object.keys(e).length){_e&&P.log("No outcomes to flush");return}_e&&P.log(`Flushing outcomes:
`+JSON.stringify(e,null,2));var r=Yr(this._api.dsn,this._api.tunnel),n=Object.keys(e).map(function(o){var a=G(o.split(":"),2),s=a[0],c=a[1];return{reason:c,category:s,quantity:e[o]}}),i=If(n,this._api.tunnel&&Xt(this._api.dsn));try{Ah(r,Vr(i))}catch(o){_e&&P.error(o)}}},t.prototype._handleResponse=function(e){var r=e.requestType,n=e.response,i=e.headers,o=e.resolve,a=e.reject,s=Ps(n.status);if(this._rateLimits=$s(this._rateLimits,i),this._isRateLimited(r)&&_e&&P.warn("Too many "+r+" requests, backing off until: "+this._disabledUntil(r)),s==="success"){o({status:s});return}a(n)},t.prototype._disabledUntil=function(e){var r=qn(e);return new Date(ji(this._rateLimits,r))},t.prototype._isRateLimited=function(e){var r=qn(e);return Os(this._rateLimits,r)},t}(),kh=function(t){Jt(e,t);function e(r,n){n===void 0&&(n=Hi());var i=t.call(this,r)||this;return i._fetch=n,i}return e.prototype._sendRequest=function(r,n){var i=this;if(this._isRateLimited(r.type))return this.recordLostEvent("ratelimit_backoff",r.type),Promise.reject({event:n,type:r.type,reason:"Transport for "+r.type+" requests locked till "+this._disabledUntil(r.type)+" due to too many requests.",status:429});var o={body:r.body,method:"POST",referrerPolicy:uf()?"origin":""};return this.options.fetchParameters!==void 0&&Object.assign(o,this.options.fetchParameters),this.options.headers!==void 0&&(o.headers=this.options.headers),this._buffer.add(function(){return new Ie(function(a,s){i._fetch(r.url,o).then(function(c){var l={"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")};i._handleResponse({requestType:r.type,response:c,headers:l,resolve:a,reject:s})}).catch(s)})}).then(void 0,function(a){throw a instanceof A?i.recordLostEvent("queue_overflow",r.type):i.recordLostEvent("network_error",r.type),a})},e}(Bs),Nh=function(t){Jt(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype._sendRequest=function(r,n){var i=this;return this._isRateLimited(r.type)?(this.recordLostEvent("ratelimit_backoff",r.type),Promise.reject({event:n,type:r.type,reason:"Transport for "+r.type+" requests locked till "+this._disabledUntil(r.type)+" due to too many requests.",status:429})):this._buffer.add(function(){return new Ie(function(o,a){var s=new XMLHttpRequest;s.onreadystatechange=function(){if(s.readyState===4){var l={"x-sentry-rate-limits":s.getResponseHeader("X-Sentry-Rate-Limits"),"retry-after":s.getResponseHeader("Retry-After")};i._handleResponse({requestType:r.type,response:s,headers:l,resolve:o,reject:a})}},s.open("POST",r.url);for(var c in i.options.headers)Object.prototype.hasOwnProperty.call(i.options.headers,c)&&s.setRequestHeader(c,i.options.headers[c]);s.send(r.body)})}).then(void 0,function(o){throw o instanceof A?i.recordLostEvent("queue_overflow",r.type):i.recordLostEvent("network_error",r.type),o})},e}(Bs);function Ih(t,e){e===void 0&&(e=Hi());function r(n){var i=h({body:n.body,method:"POST",referrerPolicy:"origin"},t.requestOptions);return e(t.url,i).then(function(o){return o.text().then(function(a){return{body:a,headers:{"x-sentry-rate-limits":o.headers.get("X-Sentry-Rate-Limits"),"retry-after":o.headers.get("Retry-After")},reason:o.statusText,statusCode:o.status}})})}return Ls({bufferSize:t.bufferSize},r)}var Lh=4;function Rh(t){function e(r){return new Ie(function(n,i){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===Lh){var s={body:o.response,headers:{"x-sentry-rate-limits":o.getResponseHeader("X-Sentry-Rate-Limits"),"retry-after":o.getResponseHeader("Retry-After")},reason:o.statusText,statusCode:o.status};n(s)}},o.open("POST",t.url);for(var a in t.headers)Object.prototype.hasOwnProperty.call(t.headers,a)&&o.setRequestHeader(a,t.headers[a]);o.send(r.body)})}return Ls({bufferSize:t.bufferSize},e)}var Bh=function(t){Jt(e,t);function e(){return t!==null&&t.apply(this,arguments)||this}return e.prototype.eventFromException=function(r,n){return Ch(r,n,this._options.attachStacktrace)},e.prototype.eventFromMessage=function(r,n,i){return n===void 0&&(n=De.Info),Th(r,n,i,this._options.attachStacktrace)},e.prototype._setupTransport=function(){if(!this._options.dsn)return t.prototype._setupTransport.call(this);var r=h(h({},this._options.transportOptions),{dsn:this._options.dsn,tunnel:this._options.tunnel,sendClientReports:this._options.sendClientReports,_metadata:this._options._metadata}),n=Er(r.dsn,r._metadata,r.tunnel),i=Yr(n.dsn,n.tunnel);if(this._options.transport)return new this._options.transport(r);if(Fr()){var o=h({},r.fetchParameters);return this._newTransport=Ih({requestOptions:o,url:i}),new kh(r)}return this._newTransport=Rh({url:i,headers:r.headers}),new Nh(r)},e}(eh),dr=R();function jh(t){if(t===void 0&&(t={}),!!dr.document){if(!t.eventId){_e&&P.error("Missing eventId option in showReportDialog call");return}if(!t.dsn){_e&&P.error("Missing dsn option in showReportDialog call");return}var e=dr.document.createElement("script");e.async=!0,e.src=Hf(t.dsn,t),t.onLoad&&(e.onload=t.onLoad);var r=dr.document.head||dr.document.body;r&&r.appendChild(e)}}var Uh=function(){function t(e){this.name=t.id,this._options=h({console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0},e)}return t.prototype.addSentryBreadcrumb=function(e){this._options.sentry&&Ae().addBreadcrumb({category:"sentry."+(e.type==="transaction"?"transaction":"event"),event_id:e.event_id,level:e.level,message:$f(e)},{event:e})},t.prototype.setupOnce=function(){this._options.console&&St("console",Fh),this._options.dom&&St("dom",qh(this._options.dom)),this._options.xhr&&St("xhr",zh),this._options.fetch&&St("fetch",Hh),this._options.history&&St("history",Vh)},t.id="Breadcrumbs",t}();function qh(t){function e(r){var n,i=typeof t=="object"?t.serializeAttribute:void 0;typeof i=="string"&&(i=[i]);try{n=r.event.target?Zn(r.event.target,i):Zn(r.event,i)}catch{n="<unknown>"}n.length!==0&&Ae().addBreadcrumb({category:"ui."+r.name,message:n},{event:r.event,name:r.name,global:r.global})}return e}function Fh(t){var e={category:"console",data:{arguments:t.args,logger:"console"},level:Df(t.level),message:Qo(t.args," ")};if(t.level==="assert")if(t.args[0]===!1)e.message="Assertion failed: "+(Qo(t.args.slice(1)," ")||"console.assert"),e.data.arguments=t.args.slice(1);else return;Ae().addBreadcrumb(e,{input:t.args,level:t.level})}function zh(t){if(t.endTimestamp){if(t.xhr.__sentry_own_request__)return;var e=t.xhr.__sentry_xhr__||{},r=e.method,n=e.url,i=e.status_code,o=e.body;Ae().addBreadcrumb({category:"xhr",data:{method:r,url:n,status_code:i},type:"http"},{xhr:t.xhr,input:o});return}}function Hh(t){t.endTimestamp&&(t.fetchData.url.match(/sentry_key/)&&t.fetchData.method==="POST"||(t.error?Ae().addBreadcrumb({category:"fetch",data:t.fetchData,level:De.Error,type:"http"},{data:t.error,input:t.args}):Ae().addBreadcrumb({category:"fetch",data:h(h({},t.fetchData),{status_code:t.response.status}),type:"http"},{input:t.args,response:t.response})))}function Vh(t){var e=R(),r=t.from,n=t.to,i=Bn(e.location.href),o=Bn(r),a=Bn(n);o.path||(o=i),i.protocol===a.protocol&&i.host===a.host&&(n=a.relative),i.protocol===o.protocol&&i.host===o.host&&(r=o.relative),Ae().addBreadcrumb({category:"navigation",data:{from:r,to:n}})}var Wh=function(t){Jt(e,t);function e(r){r===void 0&&(r={});var n=this;return r._metadata=r._metadata||{},r._metadata.sdk=r._metadata.sdk||{name:"sentry.javascript.browser",packages:[{name:"npm:@sentry/browser",version:la}],version:la},n=t.call(this,Bh,r)||this,n}return e.prototype.showReportDialog=function(r){r===void 0&&(r={});var n=R().document;if(n){if(!this._isEnabled()){_e&&P.error("Trying to call showReportDialog with Sentry Client disabled");return}jh(h(h({},r),{dsn:r.dsn||this.getDsn()}))}},e.prototype._prepareEvent=function(r,n,i){return r.platform=r.platform||"javascript",t.prototype._prepareEvent.call(this,r,n,i)},e.prototype._sendEvent=function(r){var n=this.getIntegration(Uh);n&&n.addSentryBreadcrumb(r),t.prototype._sendEvent.call(this,r)},e}(Yf);const Lt=class Lt{constructor(){this.name=Lt.id}setupOnce(){Es(e=>{if(Gh().getIntegration(Lt)){if(!window.navigator&&!window.location&&!window.document)return e;const r=e.request&&e.request.url||window.location&&window.location.href,{referrer:n}=window.document||{},{userAgent:i}=window.navigator||{},o={...e.request&&e.request.headers,...n&&{Referer:n},...i&&{"User-Agent":i}},a={...r&&{url:r},headers:o};return{...e,request:a}}return e})}};Lt.id="UserAgent";let ii=Lt;const Qh=[Xh,eg,tg],Yh=new Wh({integrations:[new ii],autoSessionTracking:!1,...Xc,beforeSend(t){return Qh.some(e=>e(t))?null:t}}),ue=new Wr(Yh);function Gh(){return ue}function Kh(t){var r;ue.configureScope(function(n){n.setTag("shop",t),n.setTag("platform","web-component")}),((r=ue.getScope())==null?void 0:r.getSession())||Jh()}function ge(t,e={}){typeof t=="string"?(be(t),ue.captureException(new Error(t),{captureContext:{contexts:e}})):(be(t instanceof Error?t.message:`${t}`),ue.captureException(t,{captureContext:{contexts:e}}))}var js=(t=>(t.DO_NOT_LOG_TO_SENTRY="DO NOT LOG TO SENTRY",t))(js||{});function V(t,e={},r="info"){switch(r){case"warning":Y(t,e);break;case"error":case"fatal":case"critical":be(t,e);break;default:v(t,e)}ue.captureMessage(t,r,{captureContext:{contexts:e}})}function Jh(){ue.startSession({ignoreDuration:!0}),ue.captureSession()}function ua(t,e){ue.setTag(t,e)}function Zh(t,e){ue.setContext(t,e)}function Xh(t){const r=["DO NOT LOG TO SENTRY"].some(n=>{var i,o;return(o=(i=t.exception)==null?void 0:i.values)==null?void 0:o.some(a=>a.value===n)});return r&&v("Filter dontLogErrors",t),r}function eg(t){const e=["info","debug","log"];return t.level!=null&&e.includes(t.level)}function tg(t){var n,i;const r=["Load failed","Failed to fetch","Cannot destructure property 'product' of '(intermediate value)' as it is undefined."].includes((i=(n=t.contexts)==null?void 0:n.error)==null?void 0:i.message);return r&&v("Filter fetch failure",t),r}function rg(t,e){return t.sort_order>e.sort_order?1:t.sort_order<e.sort_order?-1:0}function ng(t){return t.filter(e=>["prepaid","prepaid_v2","subscription","membership_subscription"].includes(e.type))}function ig(t,e){var n;const r={};for(const i of t){r[i.external_variant_id]=[];for(const o of e){if(!o.has_variant_restrictions){r[i.external_variant_id].push(o);continue}(n=o.external_variant_ids)!=null&&n.some(a=>String(a)===String(i.external_variant_id))&&r[i.external_variant_id].push(o)}}return r}function og(t,e){return e?(v("Using Shopify plan names",e),t.map(r=>{var i;const n=(i=e.find(o=>Number(o.id)===r.external_plan_id))==null?void 0:i.name;return n?{...r,title:n}:r})):(Y("Shopify plans not found, unable to override Recharge plan titles with translated Shopify plan titles"),t)}function ag(t){return t.plans!=null&&t.variants!=null&&t.variantLevelPlans==null}function sg(t,e){const r=t.plans,n=t.experiment_plans??[];let i=r;return e&&e.length>0&&n.length>0&&(r.every(o=>e.some(a=>a.plan_id===o.id))?(i=e.flatMap(({plan_id:o,override_plan_id:a,is_visible:s})=>{const c=n.find(d=>d.id===a),l=r.find(d=>d.id===o);!c&&a&&be(`Could not find experiment plan with id ${a}. Falling back to the normal plan.`);const u=c??l;return s&&u?[u]:[]}),v("Using experiment plans.",e,i)):be("Invalid planConfigs provided. All the normal plans are not defined in the experiment configurations. Falling back to the normal plans.")),i}function cg(t,e,r){const n=sg(t,e),i=t.variants.map(c=>({id:Number(c.external_variant_id),hasOnetimePlan:n.filter(l=>{var u;return l.has_variant_restrictions===!1||((u=l.external_variant_ids)==null?void 0:u.some(d=>d===c.external_variant_id))}).some(l=>l.type==="onetime"),...c})),o=ng(n).filter(c=>c.external_plan_id).sort(rg),a=og(o,r),s=ig(i,a);return{external_product_id:Number(t.external_product_id),hasOnetimePlan:n.some(c=>c.type==="onetime"),plans:a,variants:i,variantLevelPlans:s}}function Us(t){return!!t.plans.some(e=>e.product_quantity)}async function lg(t,e,r){try{return fs({storeIdentifier:e,environment:r?"stage":"prod"}),v("Fetching product from the cdn",t),await ps(t,{version:"2022-06"})}catch(n){const i=n instanceof Error?{name:n.name,message:n.message,stack:n.stack,productId:`product/2022-06/${t}.json`}:{message:"Unknown fetch error"};V("Error fetching product from the cdn",{error:i},"warning")}}const oi=t=>{var d;const e={};let r=t.brand_color,n=t.brand_contrast_color,i=t.text_color,o=t.selected_bg_color,a=t.selected_text_color,s=t.badge_text_color,c=t.badge_bg_color;const l=t.quantity_upsell,u=t.use_theme_styles?(d=Na())==null?void 0:d.tokens:void 0;if(u&&(i="initial",u.brandColor&&(r=u.brandColor,c=u.brandColor),u.brandContrastColor&&(s=u.brandContrastColor,n=u.brandContrastColor),u.selectedBgColor&&(o=u.selectedBgColor),u.selectedTextColor&&(a=u.selectedTextColor)),r&&(e["--rc-widget-brand-color"]=r,e["--rc-widget-brand-color-10"]=`color-mix(in srgb, ${r} 10%, #ffffff)`,e["--rc-widget-brand-color-20"]=`color-mix(in srgb, ${r} 20%, #ffffff)`,e["--rc-widget-brand-color-50"]=`color-mix(in srgb, ${r} 50%, #ffffff)`,e["--rc-widget-brand-color-70"]=`color-mix(in srgb, ${r} 70%, #ffffff)`,e["--rc-widget-brand-color-80"]=`color-mix(in srgb, ${r} 80%, #ffffff)`),n&&(e["--rc-widget-brand-contrast-color"]=n),i&&(e["--rc-widget-text-color"]=i),o&&(e["--rc-widget-selected-bg-color"]=o),a&&(e["--rc-widget-selected-text-color"]=a),s&&(e["--rc-widget-badge-text-color"]=s),c&&(e["--rc-widget-badge-bg-color"]=c),u!=null&&u.borderRadius){const f=u.borderRadius,g=`calc(${u.borderRadius} * 2px)`;e["--rc-widget-card-radius"]=f,e["--rc-widget-button-radius"]=g,e["--rc-widget-badge-radius"]=u.badgeBorderRadius||f,e["--rc-widget-field-radius"]=g}else t.border_radius&&(e["--rc-widget-card-radius"]=t.border_radius==="square"?"0":t.border_radius==="round"?"16px":"8px",e["--rc-widget-button-radius"]=t.border_radius==="square"?"0":t.border_radius==="round"?"8px":"4px",e["--rc-widget-badge-radius"]=t.border_radius==="square"?"0":t.border_radius==="round"?"16px":"4px",e["--rc-widget-field-radius"]=t.border_radius==="square"?"0":t.border_radius==="round"?"8px":"4px");return l&&(e["--rc-widget-recommended-badge-bg-color"]=l.badgeRecommendedBackgroundColor,e["--rc-widget-recommended-badge-text-color"]=l.badgeRecommendedTextColor,e["--rc-widget-recommended-badge-outline-color"]=l.badgeRecommendedOutlineColor,e["--rc-widget-best-value-badge-bg-color"]=l.badgeBestValueBackgroundColor,e["--rc-widget-best-value-badge-text-color"]=l.badgeBestValueTextColor,e["--rc-widget-best-value-badge-outline-color"]=l.badgeBestValueOutlineColor,e["--rc-widget-savings-badge-bg-color"]=l.badgeSavingPercentageBackgroundColor,e["--rc-widget-savings-badge-text-color"]=l.badgeSavingPercentageTextColor,e["--rc-widget-savings-badge-outline-color"]=l.badgeSavingPercentageOutlineColor),e};function ot(t,e){return(e==null?void 0:e.type)==null?!1:e.type===t||e.type.includes(t)}function ug(t){let e;const r=[t[0].percentage];for(e=1;e<t.length;e++)r[e]=t[e].percentage+r[e-1];const n=Math.random()*r[r.length-1];for(e=0;e<r.length&&!(r[e]>n);e++);return t[e]}const dg=t=>`rc_subscription_widget_config_${t.market_id}_${t.template}`,pg=(t,e)=>`rc_subscription_widget_config_${t.market_id}_product_id_${e}`;function zn(t,e){const r=Number(t);if(!r||isNaN(r))return null;for(const n of[...e.subscription_widget_v2.widget_configs,e.subscription_widget_v2.default_widget_config])for(const i of(n==null?void 0:n.ab_splits)??[]){const o=i.display_configs.find(a=>a.external_market_id==null);for(const a of i.display_configs)if(a.config_information.config_id===r)return{base:(o==null?void 0:o.config_information)??{},config:{...a.config_information,ab_split_id:i.ab_split_id,widget_flow_id:n==null?void 0:n.widget_flow_id,type:se.Recharge},market_id:a.external_market_id,plan_configs:i.plan_configs}}return null}async function fg(t,e,r,n,i,o){var b,M;const{default_widget_config:a,widget_configs:s,quantity_upsell_widget_config:c}=n.subscription_widget_v2,l=s.find(O=>{var I;return O.trigger_type==="external_product_id"&&((I=O.trigger_values)==null?void 0:I.includes(String(r)))}),u=s.find(O=>{var I;return O.trigger_type==="product_template"&&((I=O.trigger_values)==null?void 0:I.includes(t))}),d=s.find(O=>{var I;return(I=O.product_template_ids)==null?void 0:I.includes(t)});u==null&&d&&v("Found legacy product template key in widget config",d);let f=(l||u||d)??a;if(c&&await hg(r,o)&&(f=c),(f==null?void 0:f.ab_splits)==null||f.ab_splits.length===0)return{trigger_type:(f==null?void 0:f.trigger_type)??"product_template",plan_configs:null,config:null};const g=ug(f.ab_splits),m=(b=g.display_configs.find(O=>O.external_market_id==null))==null?void 0:b.config_information;if(!m)return{trigger_type:f.trigger_type??"product_template",plan_configs:null,config:null};const w=W(i,m??{}),S=(M=g.display_configs.find(O=>O.external_market_id===e))==null?void 0:M.config_information;return S!=null?v("Using market specific configuration",e):v("Using the default market configuration"),{trigger_type:f.trigger_type??"product_template",plan_configs:g.plan_configs,config:W(w,{...S??{},ab_split_id:g.ab_split_id,widget_flow_id:f==null?void 0:f.widget_flow_id,type:se.Recharge})}}async function hg(t,e){if(!t)return!1;const r=await lg(t,e,ka);return r?Us(r):!1}function gg(t){return t!=null&&Object.keys(t).length>0}async function yg(t,e,r){const{template:n,market_id:i,show_powered_by_recharge:o}=t.shop,a=Ir;if(Pi("recharge_preview")==="true"||r)if(t.preview_config==null)be("The preview configuration was requested but is not defined: The preview will not be used.");else return v("Using preview configuration"),{plan_configs:null,config:W(a,{...t.preview_config.preview_config,showPoweredByRecharge:o,type:se.RechargePreview})};if(!gg(t.configs))return be("The configuration is invalid or null: the widget will not show because a configuration is required."),{plan_configs:null,config:null};const s=zn(re==null?void 0:re.configId,t.configs);if(s)return v("Using test configuration"),s.market_id?v("Test configuration is for a specific market",s.market_id):v("Using the default market configuration"),{plan_configs:s.plan_configs,config:W(W(a,s.base),{...s.config,showPoweredByRecharge:o})};const c=dg(t.shop),l=pg(t.shop,e);function u(b){try{return window.sessionStorage.getItem(b)}catch{Y("Failed to get session storage",{sessionKey:{key:b}},"warning")}}function d(b,M){try{window.sessionStorage.setItem(b,String(M)),v("Market configuration found - saving to sessionStorage",b)}catch{Y("Failed to set session storage",{store:{sessionKey:b,configId:M}},"warning")}}const f=zn(u(c),t.configs),g=zn(u(l),t.configs);if(g!=null)return v("Loaded product configuration from sessionStorage",`Key: ${l}`,`Value: ${u(l)}`),g.market_id?v("Product configuration is for a specific market",g.market_id):v("Using the default market configuration"),{plan_configs:g.plan_configs,config:W(W(a,g.base),{...g.config,showPoweredByRecharge:o})};if(f!=null)return v("Loaded configuration from sessionStorage",`Key: ${c}`,`Value: ${u(c)}`),f.market_id?v("Template configuration is for a specific market",f.market_id):v("Using the default market configuration"),{plan_configs:f.plan_configs,config:W(W(a,f.base),{...f.config,showPoweredByRecharge:o})};const{trigger_type:m,config:w,plan_configs:S}=await fg(n,i,e,t.configs,a,t.shop.identifier);return(w==null?void 0:w.config_id)!=null?d(m==="external_product_id"?l:c,w.config_id):v("No configuration found for market - The widget will not be visible",`Market: ${i}`,`Template: ${n}`),w?{plan_configs:S,config:{...w,showPoweredByRecharge:o}}:{plan_configs:S,config:w}}const tr="settings";class _g{constructor(){this.listeners={}}addEventListener(e,r){var n;return e in this.listeners||(this.listeners[e]=[]),(n=this.listeners[e])==null||n.push(r),()=>this.removeEventListener(e,r)}removeEventListener(e,r){var n,i;e in this.listeners&&(this.listeners[e]=(n=this.listeners[e])==null?void 0:n.filter(o=>o!==r),((i=this.listeners[e])==null?void 0:i.length)===0&&delete this.listeners[e])}dispatchEvent(e,...r){var n;e in this.listeners&&((n=this.listeners[e])==null||n.forEach(i=>i.call(this,...r)))}reset(){this.listeners={}}}const we=new _g;function Gr(t,e){return we.addEventListener(`${t}:sellingPlan:change`,e),()=>we.removeEventListener(`${t}:sellingPlan:change`,e)}function ai(t,e){return we.addEventListener(`${t}:variant:change`,e),()=>we.removeEventListener(`${t}:variant:change`,e)}function qs(t,e){return we.addEventListener(`${t}:purchaseOption:change`,e),()=>we.removeEventListener(`${t}:purchaseOption:change`,e)}function vg(t,e,r){we.dispatchEvent(`${t}:sellingPlan:change`,e,r)}function mg(t,e){we.dispatchEvent(`${t}:variant:change`,e)}function bg(t,e){we.dispatchEvent(`${t}:purchaseOption:change`,e)}function wg(t){return{onSellingPlanChange:e=>Gr(t,e),onVariantChange:e=>ai(t,e),onPurchaseOptionChange:e=>qs(t,e)}}function xg(t,e){const r=e.toString();return`${t}${r?`?${r}`:""}`}function Sg(t,e){try{const r=history.replaceState;history.replaceState=function(n,i,o){const[a="",s]=typeof o=="string"?o.split("?"):[o==null?void 0:o.pathname,o==null?void 0:o.search],c=new URLSearchParams(s),l=new URLSearchParams(window.location.search);return c.get("variant")!==l.get("variant")&&setTimeout(()=>{var g;const d=(g=Kr(t))==null?void 0:g.variantId,f=Ge(e);d!==f&&ci(t,e)}),r.apply(history,[n,i,xg(a,c)])}}catch{}}function si(t){return t?(new DOMParser().parseFromString(t,"text/html").body.textContent||"").trim()==="":!0}function Fs(t,e){const r=document.createElement("input"),n=e==null?"":typeof e=="object"?JSON.stringify(e):String(e);return r.name=t,r.type="hidden",r.value=n,r}function Vi(t){return new DOMParser().parseFromString(t,"text/html").body.textContent||""}function zs(t,e){let r=t,n=0;for(;r.parentElement;){if(e){for(const i of e)if(r!=null&&r.contains(i))return i}else{const[i]=Array.from(r.querySelectorAll("form")).filter(o=>Hs(o));if(i)return i}if(r=r.parentElement,n++,n>=5)break}}function Hs(t,e=!0){var i;const r=(i=t.getAttribute("action"))==null?void 0:i.includes("/cart/add"),n=e?!!t.querySelector('button, [type="submit"]'):!0;return r&&n}function Vs(t=!0){return Array.from(document.forms).filter(e=>{const r=!!Ge(e);return Hs(e,t)&&r})}function Pg(t,e,r=!0){const n=Vs(r).filter(i=>Ge(i)===e);if(n.length>1){Y("Found multiple product forms for the same variant id",e,n);const i=Kr(t);if(i){const o=zs(i,n);if(o)return v("Found product form that is part of the closest parent",o),o}}return n[0]}function Ge(t){var e;return Number(new FormData(t).get("id")||((e=t.querySelector('[name="id"]'))==null?void 0:e.value))}function ci(t,e){const r=Ge(e);return mg(t,r),v("Variant Changed",r),r}const da={};function Og(t,e){let r=Ge(e);const n=e.querySelector('input[name="id"]');n&&new MutationObserver(()=>{da[t]=!0,ci(t,e)}).observe(n,{attributes:!0,childList:!1,attributeFilter:["value"]}),Sg(t,e),e.addEventListener("change",()=>{setTimeout(()=>{da[t]||Ge(e)!==r&&(r=ci(t,e),v("Variant Changed",r))})})}function $g(t,e){e.addEventListener("submit",()=>{const r=new FormData(e),n=Kr(t);if(n!=null&&n.sellingPlanId){const i=n.sellingPlanId,o=Number(r.get("selling_plan"))||"";if(v("Selling Plan added to cart",o),i!==o){const a={productId:t,variantId:n.variantId,expectedSellingPlan:i,submittedSellingPlan:o};V("Expected a selling plan to be submitted, but an incorrect one was found",{data:a},"error")}}})}function Kr(t){const e=document.querySelectorAll(`recharge-subscription-widget[product-id="${t}"]`);e.length>1&&Y("Found multiple widgets for the same product id",t,e);const r=Array.from(e).find(n=>{var i;return((i=n.checkVisibility)==null?void 0:i.call(n,{contentVisibilityAuto:!0}))??!0});return r||Y("No visible widget found for product id",t,e),r}const Mg=750,pa=75;async function li(t,e,r=0,n=!0){if(r>=Mg)return;const i=Pg(t,e,n);return i||new Promise(o=>{setTimeout(()=>o(li(t,e,r+pa,n)),pa)})}async function Eg(t,e,r){let n=await li(e,t,0,!0);if(!n&&(n=await li(e,t,0,!1),!n)){const i=Kr(e);if(i)n=zs(i);else return n}if(!n){const i=Vs(),o=i.map(Ge);let a="No valid product forms found.";o.includes(t)||(a="Initial variant could not be found in any forms"),Y('Could not infer a product form to dynamically add selling plans. Make sure you have a product form that has the variant associated with it ([name="id"]).',{details:{reason:a,inputs:{productId:e,initialVariantId:t,initialSellingPlanId:r},validProductForms:i,validProductFormVariants:o}})}return n}function Ws(t){return t.querySelector('input[name="quantity"]')}function Cg(t){return t.variants.reduce((e,r)=>{const n=r.prices[0];return{...e,[r.external_variant_id]:{discounted:Me(n.plans[0].discounted_price,n.currency),unit:Me(n.unit_price,n.currency),sellingPlans:n.plans.reduce((i,o)=>{const a=t.plans.find(c=>c.id===o.id);if(!a)return i;const s=a.type==="prepaid_v2";return{...i,[a.external_plan_id]:{price:Me(o.discounted_price,n.currency),discountType:s?"price":a.discount_type,discountValue:a.discount_type==="percentage"&&s?Number(o.discounted_price)*100:Number(a.discount_amount),quantityUpsell:a.product_quantity?{totalDiscountedPrice:Me(Number(o.discounted_price)*a.product_quantity,n.currency),totalDiscountAmount:Me(Number(a.discount_amount),n.currency)}:void 0}}},{})}}},{})}function Qs(t,e){const r=T();return(r==null?void 0:r.shop.identifier)!=="preview"&&Y("Falling back to Recharge variant prices because the price didn't exist on the Shopify formatted prices",t,e),Cg(t)[e]}function Wi(t,e,r){var s;const n=(s=T())==null?void 0:s.formattedPrices,i=(n==null?void 0:n[e])??Qs(t,e),o=i==null?void 0:i.sellingPlans[r],a=t==null?void 0:t.plans.find(c=>c.external_plan_id===r);if(o&&a)return{unit:Tg(a,o,i.unit),discounted:Vi(o.price),adjustmentType:o.discountType,adjustmentValue:o.discountValue,quantityUpsell:o.quantityUpsell};throw V("Could not find selling plan price for variant",{details:{variantId:e,sellingPlanId:r}},"critical"),new Error(js.DO_NOT_LOG_TO_SENTRY)}function ui(t,e){var i;const r=T(),n=(i=r==null?void 0:r.formattedPrices)==null?void 0:i[t];if(n)return Vi(n.unit);{const o=Qs(e,t);return o?o.unit:(V("Could not find variant price for variant",{product:{external_product_id:e.external_product_id,variant_id:t}},"error"),"")}}function Tg(t,e,r){const{shop:n}=T()??{},i=t.charge_interval_frequency,o=t.order_interval_frequency;return i&&o&&i>o&&i>1&&o>=1&&e.discountType==="price"?Me(e.discountValue/(i/o)/100,n==null?void 0:n.currency):Vi(r)}function Dg(t){return e=>t.reduce((r,n)=>n(r),e)}function Oe(t,e){return r=>e?r.replace(t,e):""}function Ag(t){return t.reduce((r,n)=>Number(n.discount_amount)>Number(r.discount_amount)?n:r,t[0])}function di(t,e,r){const n=Ag(t),{discount_amount:i,discount_type:o}=n;if(!i||Number(i)<=0)return"";const{discounted:a}=Wi(e,r,n.external_plan_id);return o==="percentage"?wi(i):`${a}`}function kg(t,e,r,n){const i=di(e,r,n);return i?t.replace(E.MaxDiscount,i):""}function pi(t,e){const r=xi(e);return r?t.replace(E.Discount,r):""}function Ng(t){var e,r;return(((r=(e=t.pricing_progression)==null?void 0:e[0])==null?void 0:r.recurring_discount_after_cycle)||0)+1}function Ig(t){var n,i,o,a;const e=(i=(n=t.pricing_progression)==null?void 0:n[0])==null?void 0:i.recurring_discount_amount,r=(a=(o=t.pricing_progression)==null?void 0:o[0])==null?void 0:a.recurring_discount_type;return!e||Number(e)<=0?"":r==="percentage"?wi(e):""}function Lg(t,e,r,n){var c,l,u,d;const i=((l=(c=t.pricing_progression)==null?void 0:c[0])==null?void 0:l.recurring_discount_amount)||0,o=e.variants.find(f=>f.external_variant_id===r),s=parseFloat(((d=(u=o==null?void 0:o.prices)==null?void 0:u[0])==null?void 0:d.unit_price)||"0")*(1-Number(i)/100);return Me(s,n)}function Rg(t,e,r){var n;return e[`${(n=t==null?void 0:t.interval_unit)==null?void 0:n.toLowerCase()}${r>1?"s":""}`]??""}function Bg(t,e,r){const n=Rg(t,e,r);return Oe(E.Interval,r.toString())(n)}function Cr(t,e,r){var i;const n=new DOMParser().parseFromString(t,"text/html");try{return(i=n.body.querySelectorAll("ul"))==null||i.forEach(o=>o.querySelectorAll("li").forEach(a=>{var s;(s=a.textContent)!=null&&s.includes(e)&&(r?a.innerHTML=a.innerHTML.replace(e,r):a.remove())})),typeof n.body.innerHTML.replaceAll!="function"?t:n.body.innerHTML.replaceAll(e,r)}catch(o){return ge(o,{context:{html:n}}),t}}const Ys=X`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    position: relative;
    padding-left: 1.75em;
  }
  li:not(:last-of-type) {
    margin-bottom: 8px;
  }
  li::before {
    content: '';
    height: 1em;
    width: 1em;
    position: absolute;
    top: 0.25em;
    left: 0;
    mask-image: var(--rc-widget-bullet-icon-image);
    mask-size: 140%;
    background-color: var(--rc-widget-bullet-icon-image-color, var(--rc-widget-brand-color));
    mask-position: calc(-0.25em + 1px) calc(-0.25em + 1px);
  }
  p:last-child {
    margin-bottom: 0;
  }
  .compact li {
    margin-bottom: 0;
  }
  .compact p {
    margin: 0.5em 0;
  }
`;var p=(t=>(t.BenefitsList="rc-benefits__list",t.BenefitsImage="rc-benefits__image",t.DesignModeBanner="rc-design-mode-banner",t.DesignModeBannerContent="rc-design-mode-banner__content",t.DesignModeBannerClose="rc-design-mode-banner__close",t.DesignModeBannerIcon="rc-design-mode-banner__icon",t.LearnMore="rc-learn-more",t.LearnMoreTrigger="rc-learn-more__trigger",t.LearnMoreTriggerCompact="rc-learn-more__trigger-compact",t.LearnMoreModal="rc-learn-more-modal",t.LearnMoreModalContent="rc-learn-more-modal__content",t.LearnMoreModalCloseButton="rc-learn-more-modal__close-button",t.LearnMoreModalContentBody="rc-learn-more-modal__content-body",t.LearnMoreModalContainer="rc-learn-more-modal__container",t.Loading="rc-loading",t.LoadingIcon="rc-loading__icon",t.Drawbacks="rc-drawbacks",t.PlansButton="rc-plans-button",t.PlansButtonSelected="rc-plans-button__selected",t.PlansButtonGroup="rc-plans-button-group",t.PlansButtonList="rc-plans-button-list",t.PlansLabel="rc-plans__label",t.PlansRadioButton="rc-plans-radio-button",t.PlansButtonDiscount="rc-plans-button__discount",t.PlansButtonInterval="rc-plans-button__interval",t.PlansDropdown="rc-plans-dropdown",t.PlansSelect="rc-plans-select",t.PurchaseOption="rc-purchase-option",t.PurchaseOptionGroup="rc-purchase-option-group",t.PurchaseOptionSelected="rc-purchase-option__selected",t.PurchaseOptionSelector="rc-purchase-option__selector",t.OnetimePurchaseOption="rc-purchase-option__onetime",t.OnetimePurchaseOptionLabel="rc-purchase-option__label",t.OnetimePurchaseOptionSelector="rc-purchase-option__selector_onetime",t.OnetimePurchaseOptionInput="rc-purchase-option__input",t.OnetimePurchaseOptionCheckedIndicator="rc-purchase-option__checked-indicator",t.OnetimePurchaseOptionPrice="rc-purchase-option__price",t.OnetimePurchaseOptionPrices="rc-purchase-option__prices",t.OnetimePurchaseOptionSubContainer="rc-purchase-option__sub-container",t.SubscriptionPurchaseOption="rc-purchase-option__subscription",t.SubscriptionPurchaseOptionLabel="rc-purchase-option__label",t.SubscriptionPurchaseOptionSelector="rc-purchase-option__selector_subscription",t.SubscriptionPurchaseOptionInput="rc-purchase-option__input",t.SubscriptionPurchaseOptionCheckedIndicator="rc-purchase-option__checked-indicator",t.SubscriptionPurchaseOptionSubContainer="rc-purchase-option__sub-container",t.SubscriptionPurchaseOptionOriginalPrice="rc-purchase-option__original-price",t.SubscriptionPurchaseOptionUnitPrice="rc-purchase-option__unit-price",t.SubscriptionPurchaseOptionPrices="rc-purchase-option__prices",t.SubscriptionPurchaseOptionDiscountedPrice="rc-purchase-option__discounted-price",t.SubscriptionPurchaseOptionDynamicPrice="rc-purchase-option__dynamic-price",t.SubscriptionBadge="rc-purchase-option__badge",t.PrepaidPlanTitle="rc-prepaid-plan__title",t.ContentWrap="rc-content-wrap",t.WidgetRoot="rc-widget__root",t.QuantityUpsellOption="rc-quantity-upsell-option",t.QuantityUpsellOptionSelected="rc-quantity-upsell-option__selected",t.QuantityUpsellOptionInput="rc-quantity-upsell-option__input",t.QuantityUpsellOptionLabel="rc-quantity-upsell-option__label",t.QuantityUpsellOptionSelector="rc-quantity-upsell-option__selector",t.QuantityUpsellOptionCheckedIndicator="rc-quantity-upsell-option__checked-indicator",t.QuantityUpsellRecommendedBadge="rc-quantity-upsell-badge__recommended",t.QuantityUpsellBestValueBadge="rc-quantity-upsell-badge__best-value",t.QuantityUpsellSavingsBadge="rc-quantity-upsell-badge__savings",t))(p||{}),jg=Object.defineProperty,Ug=Object.getOwnPropertyDescriptor,Jr=(t,e,r,n)=>{for(var i=n>1?void 0:n?Ug(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&jg(e,r,i),i};let ke=class extends U{constructor(){super(...arguments),this.sellingPlans=[]}unitText(t,e){var i;const r=e??0,n=t.interval_unit;if(n)return(((i=this.settings)==null?void 0:i.frequencyIntervalTranslation[`${n.toLowerCase()}${r>1?"s":""}`])??"").replace(E.Interval,r.toString()).replace(E.Discount,xi(t))}get frequencyDisplayOptions(){var e;const t=(e=this.settings)==null?void 0:e.frequencyDisplayContent;return this.sellingPlans.map(r=>{var n,i,o;switch(t){case"interval":{if(r.type==="prepaid")return{interval:r.title,value:r.external_plan_id};if(r.type==="prepaid_v2"){const a=this.unitText(r,r.charge_interval_frequency);return{interval:this.unitText(r,r.order_interval_frequency),chargeInterval:a&&((n=this.settings)==null?void 0:n.frequencyIntervalTranslation.chargeInterval.replace(E.PrepaidChargeInterval,a)),discount:pi(((i=this.settings)==null?void 0:i.frequencyIntervalTranslation.save)??"",r),value:r.external_plan_id}}return{interval:this.unitText(r,r.order_interval_frequency),discount:pi(((o=this.settings)==null?void 0:o.frequencyIntervalTranslation.save)??"",r),value:r.external_plan_id}}case"planName":default:return{interval:r.title,value:r.external_plan_id}}})}handleSellingPlanChange(t){this.value=Number(t);const e=new CustomEvent(ke.events.planChange,{detail:{sellingPlanId:this.value},bubbles:!0,composed:!0});this.dispatchEvent(e)}_buttonGroupOrList(){var t;return this.sellingPlans.some(e=>e.type==="prepaid_v2")?"buttonList":(t=this.settings)==null?void 0:t.frequencyDisplayType}render(){return this.settings==null||!this.sellingPlans.length?y:this.settings.frequencyDisplayType==="buttonGroup"||this.settings.frequencyDisplayType==="buttonList"?_`
        <fieldset
          class="${this._buttonGroupOrList()==="buttonGroup"?"rc-plans-button-group":"rc-plans-button-list"}"
          part="${p.PlansButtonGroup}"
        >
          <legend class="rc-plans__label" part="${p.PlansLabel}">${this.settings.frequencyLabel}</legend>
          ${this.frequencyDisplayOptions.map(t=>{const e=this.value===t.value,r=`rc-plan-${t.value}-option`;return _`<label part="${p.PlansRadioButton}">
              <input
                aria-label="${[t.interval,t.chargeInterval,t.discount].filter(Boolean).join(" ")}"
                id="${r}"
                type="radio"
                name="rc_plan"
                value=${t.value}
                ?checked=${e}
                @click=${()=>this.handleSellingPlanChange(t.value)}
              />
              <div
                class="rc-plans-button"
                ?data-checked=${e}
                aria-hidden="true"
                part="${p.PlansButton} ${e?p.PlansButtonSelected:""}"
              >
                <span class="rc-plans-button__interval" part="${p.PlansButtonInterval}">
                  ${t.interval}
                  ${t.chargeInterval?_`<span class="rc-plans-button__discount" part="${p.PlansButtonDiscount}"
                        >${t.chargeInterval}</span
                      >`:""}
                </span>
                ${t.discount?_`<span class="rc-plans-button__discount" part="${p.PlansButtonDiscount}"
                      >${t.discount}</span
                    >`:""}
              </div>
            </label>`})}
        </fieldset>
      `:_`<label class="rc-plans-dropdown" part="${p.PlansDropdown}">
      <span class="rc-plans__label" part="${p.PlansLabel}">${this.settings.frequencyLabel}</span>
      <div style="position: relative;">
        <select
          class="rc-plans-dropdown__select"
          name="rc_plan"
          part="${p.PlansSelect}"
          aria-label="${this.settings.frequencyLabel||Ir.frequencyLabel}"
          @change=${t=>this.handleSellingPlanChange(t.target.value)}
        >
          ${this.frequencyDisplayOptions.map(t=>{const e=this.value===t.value;return _`<option value="${t.value}" ?selected=${e}>
              ${t.interval}${t.chargeInterval?`: ${t.chargeInterval}`:""}${t.discount?`: ${t.discount}`:""}
            </option>`})}
        </select>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="rc-plans-dropdown__icon">
          <path
            d="M4.16699 7.5L10.0003 13.3333L15.8337 7.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </label>`}};ke.events={planChange:"planChange"};ke.styles=X`
    input {
      clip: rect(0, 0, 0, 0);
      border-width: 0;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      padding: 8px 12px;

      background: transparent;
      color: inherit;
      border-radius: var(--rc-widget-field-radius);
      border: 1px solid var(--rc-widget-brand-color-50);
      width: 100%;
      padding-right: 28px;
    }

    select:focus-visible {
      outline: 0;
      box-shadow: 0 0 0 2px white, 0 0 0 3px var(--rc-widget-brand-color-50);
    }

    .rc-plans-dropdown {
      font-size: 14px;
      position: relative;
    }

    .rc-plans__label {
      font-size: 1em;
      font-weight: 600;
      line-height: 1.75em;
      padding: 0;
    }

    .rc-plans-dropdown__icon {
      color: var(--rc-widget-brand-color);
      position: absolute;
      right: 8px;
      bottom: 0px;
      height: 100%;
      width: 20px;
      pointer-events: none;
    }

    .rc-plans-button-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      border: none;
      margin: 0;
      padding: 0;
    }

    .rc-plans-button-group label {
      display: flex;
      flex-grow: 1;
      width: calc(33% - 12px);
      transition: background-color 0.1s ease;
    }

    .rc-plans-button-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex-wrap: wrap;
      border: none;
      margin: 0;
      padding: 0;
    }
    .rc-plans-button-list label {
      display: flex;
      flex-grow: 1;
      width: 100%;
      transition: background-color 0.1s ease;
    }
    .rc-plans-button-list .rc-plans-button {
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
    }
    .rc-plans-button-list .rc-plans-button__interval {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .rc-plans-button-list .rc-plans-button__discount {
      text-align: right;
    }

    .rc-plans-button {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: background-color 0.1s ease;
      cursor: pointer;
      background: var(--rc-widget-brand-color-10);
      padding: 0.5em;
      border-radius: var(--rc-widget-button-radius);
      color: var(--rc-widget-text-color);
      border: none;
      flex-grow: 1;
      width: calc(33% - 12px);
      transition: background-color 0.1s ease;
    }

    .rc-plans-button:hover {
      background: var(--rc-widget-brand-color-20);
    }

    .rc-plans-button-group label input:focus-visible + .rc-plans-button {
      box-shadow: 0 0 0 1.5px white, 0 0 0 3px var(--rc-widget-brand-color-50);
    }

    .rc-plans-button[data-checked] {
      background: var(--rc-widget-brand-color);
      color: var(--rc-widget-brand-contrast-color);
    }

    .rc-plans-button__interval {
      font-size: 1em;
      line-height: 1.5em;
      font-weight: 600;
      hyphens: auto;
    }

    .rc-plans-button__discount {
      font-size: 0.88em;
      line-height: 1.25em;
      font-weight: 400;
    }
  `;Jr([Lr({context:tr})],ke.prototype,"settings",2);Jr([D({type:Array})],ke.prototype,"sellingPlans",2);Jr([D({type:Number})],ke.prototype,"value",2);ke=Jr([ie("rc-selling-plans")],ke);var qg=Object.getOwnPropertyDescriptor,Fg=(t,e,r,n)=>{for(var i=n>1?void 0:n?qg(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=a(i)||i);return i};let fi=class extends U{render(){return _`
      <div class="rc-loading" part="${p.Loading}">
        <div class="rc-loading__icon" part="${p.LoadingIcon}"></div>
        <span class="visually-hidden">Loading...</span>
      </div>
    `}};fi.styles=X`
    .rc-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%; /* Adjust height as needed */
    }

    .rc-loading__icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid var(--rc-widget-brand-color-50);
      border-top-color: var(--rc-widget-brand-color);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .visually-hidden {
      border: 0px;
      clip: rect(0px, 0px, 0px, 0px);
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0px;
      overflow: hidden;
      white-space: nowrap;
      position: absolute;
    }
  `;fi=Fg([ie("rc-loading")],fi);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zg=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zr={ATTRIBUTE:1,CHILD:2},Xr=t=>(...e)=>({_$litDirective$:t,values:e});let en=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It=(t,e)=>{var n;const r=t._$AN;if(r===void 0)return!1;for(const i of r)(n=i._$AO)==null||n.call(i,e,!1),It(i,e);return!0},Tr=t=>{let e,r;do{if((e=t._$AM)===void 0)break;r=e._$AN,r.delete(t),t=e}while((r==null?void 0:r.size)===0)},Gs=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(r===void 0)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),Wg(e)}};function Hg(t){this._$AN!==void 0?(Tr(this),this._$AM=t,Gs(this)):this._$AM=t}function Vg(t,e=!1,r=0){const n=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(e)if(Array.isArray(n))for(let o=r;o<n.length;o++)It(n[o],!1),Tr(n[o]);else n!=null&&(It(n,!1),Tr(n));else It(this,t)}const Wg=t=>{t.type==Zr.CHILD&&(t._$AP??(t._$AP=Vg),t._$AQ??(t._$AQ=Hg))};class Qg extends en{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,r,n){super._$AT(e,r,n),Gs(this),this.isConnected=e._$AU}_$AO(e,r=!0){var n,i;e!==this.isConnected&&(this.isConnected=e,e?(n=this.reconnected)==null||n.call(this):(i=this.disconnected)==null||i.call(this)),r&&(It(this,e),Tr(this))}setValue(e){if(zg(this._$Ct))this._$Ct._$AI(e,this);else{const r=[...this._$Ct._$AH];r[this._$Ci]=e,this._$Ct._$AI(r,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yg=()=>new Gg;class Gg{}const Hn=new WeakMap,Kg=Xr(class extends Qg{render(t){return y}update(t,[e]){var n;const r=e!==this.Y;return r&&this.Y!==void 0&&this.rt(void 0),(r||this.lt!==this.ct)&&(this.Y=e,this.ht=(n=t.options)==null?void 0:n.host,this.rt(this.ct=t.element)),y}rt(t){if(this.isConnected||(t=void 0),typeof this.Y=="function"){const e=this.ht??globalThis;let r=Hn.get(e);r===void 0&&(r=new WeakMap,Hn.set(e,r)),r.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),r.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=Hn.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let hi=class extends en{constructor(e){if(super(e),this.it=y,e.type!==Zr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===y||e==null)return this._t=void 0,this.it=e;if(e===me)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};hi.directiveName="unsafeHTML",hi.resultType=1;const Qi=Xr(hi);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ks="important",Jg=" !"+Ks,gi=Xr(class extends en{constructor(t){var e;if(super(t),t.type!==Zr.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const n=t[r];return n==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]==null&&(this.ft.delete(n),n.includes("-")?r.removeProperty(n):r[n]=null);for(const n in e){const i=e[n];if(i!=null){this.ft.add(n);const o=typeof i=="string"&&i.endsWith(Jg);n.includes("-")||o?r.setProperty(n,o?i.slice(0,-11):i,o?Ks:""):r[n]=i}}return me}});var Zg=Object.defineProperty,Xg=Object.getOwnPropertyDescriptor,Js=(t,e,r,n)=>{for(var i=n>1?void 0:n?Xg(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&Zg(e,r,i),i};let Dr=class extends U{constructor(){super(...arguments),this.modalRef=Yg()}onOpen(){if(this.settings==null)return y;if(this.modalRef.value)this.modalRef.value.show();else{const t=_`<rc-learn-more-modal
        ${Kg(this.modalRef)}
        exportparts="${p.LearnMoreModalContent}, ${p.LearnMoreModal}, ${p.LearnMoreModalCloseButton}, ${p.LearnMoreModalContentBody}, ${p.LearnMoreModalContainer}"
        ?show-powered-by-recharge=${this.settings.showPoweredByRecharge}
        style="${gi(oi(this.settings))}"
      >
        <div slot="body">
          ${this.settings.learnMoreContent?Qi(this.settings.learnMoreContent):ey()}
        </div>
      </rc-learn-more-modal>`;Mt(t,document.body)}}render(){return this.settings==null||!this.settings.learnMoreText?y:this.settings.displayMode==="compact"?_`<button
        class="rc-learn-more compact rc-learn-more__trigger"
        part="${p.LearnMoreTriggerCompact}"
        @click=${()=>this.onOpen()}
        aria-label=${this.settings.learnMoreText}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path
            d="M11.4584 15.7916H12.5417V11H11.4584V15.7916ZM11.9957 9.7404C12.1615 9.7404 12.302 9.68431 12.4171 9.57212C12.5322 9.45993 12.5898 9.32091 12.5898 9.15506C12.5898 8.98922 12.5337 8.84873 12.4215 8.7336C12.3093 8.61849 12.1703 8.56094 12.0045 8.56094C11.8386 8.56094 11.6981 8.61703 11.583 8.72923C11.4679 8.84142 11.4103 8.98044 11.4103 9.14629C11.4103 9.31214 11.4664 9.45262 11.5786 9.56773C11.6908 9.68284 11.8298 9.7404 11.9957 9.7404ZM12.0072 19.5833C10.964 19.5833 9.98148 19.386 9.05971 18.9912C8.13792 18.5965 7.3311 18.0534 6.63925 17.3619C5.94739 16.6703 5.40401 15.8642 5.0091 14.9434C4.6142 14.0226 4.41675 13.0388 4.41675 11.9919C4.41675 10.9449 4.61411 9.96406 5.00883 9.04923C5.40355 8.13438 5.94668 7.33104 6.63821 6.63919C7.32975 5.94733 8.13591 5.40394 9.05669 5.00904C9.97746 4.61414 10.9613 4.41669 12.0082 4.41669C13.0551 4.41669 14.036 4.61405 14.9508 5.00877C15.8657 5.40349 16.669 5.94662 17.3609 6.63815C18.0527 7.32969 18.5961 8.13422 18.991 9.05175C19.3859 9.96928 19.5834 10.9496 19.5834 11.9929C19.5834 13.0361 19.386 14.0186 18.9913 14.9404C18.5966 15.8621 18.0534 16.669 17.3619 17.3608C16.6704 18.0527 15.8658 18.5961 14.9483 18.991C14.0308 19.3859 13.0504 19.5833 12.0072 19.5833ZM12.0001 18.5C13.8056 18.5 15.3403 17.8681 16.6042 16.6042C17.8681 15.3403 18.5001 13.8056 18.5001 12C18.5001 10.1944 17.8681 8.65972 16.6042 7.39583C15.3403 6.13194 13.8056 5.5 12.0001 5.5C10.1945 5.5 8.65978 6.13194 7.39589 7.39583C6.132 8.65972 5.50006 10.1944 5.50006 12C5.50006 13.8056 6.132 15.3403 7.39589 16.6042C8.65978 17.8681 10.1945 18.5 12.0001 18.5Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>`:_`<div class="rc-learn-more" part="${p.LearnMore}">
      <button
        class="rc-learn-more__trigger"
        part="${p.LearnMoreTrigger}"
        @click=${()=>this.onOpen()}
        aria-label="Learn more about subscribe and save"
      >
        ${this.settings.learnMoreText}
      </button>
    </div>`}};Dr.styles=X`
    .rc-learn-more__trigger {
      cursor: pointer;
      padding: 0;
      font-size: 14px;
      color: var(--rc-widget-brand-color);
      background: transparent;
      border: 0;
      text-decoration: underline;
      text-underline-offset: 2px;
      font-family: inherit;
    }

    .rc-learn-more__trigger:focus-visible {
      outline: 0;
      box-shadow: 0 0 0 2px white, 0 0 0 3px var(--rc-widget-brand-color-50);
    }
    .rc-learn-more.compact {
      line-height: 0;
      display: inline-block;
    }
    .rc-learn-more.compact .rc-learn-more__trigger {
      line-height: 0;
    }
  `;Js([Lr({context:tr})],Dr.prototype,"settings",2);Dr=Js([ie("rc-learn-more")],Dr);function ey(){return _`
    <style>
      rc-learn-more-modal h1 {
        font-size: 40px;
        line-height: 48px;
        font-weight: 600;
        text-align: center;
        padding-bottom: 32px;
        margin: 0;
      }

      rc-learn-more-modal h2 {
        padding: 0;
        margin: 0;
        font-size: 20px;
        line-height: 28px;
        font-weight: 600;
      }

      rc-learn-more-modal p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        line-height: 24px;
      }

      rc-learn-more-modal .learn-more-content {
        padding: 0 20px 20px;
      }

      rc-learn-more-modal .learn-more-footer button {
        background-color: var(--rc-widget-brand-color);
        color: var(--rc-widget-brand-contrast-color);
        border: none;
        border-radius: var(--rc-widget-button-radius);
        padding: 12px;
        min-width: 335px;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        cursor: pointer;
        transition: background-color 0.1s ease;
        font-family: inherit;
      }

      rc-learn-more-modal .learn-more-footer button:hover {
        background-color: var(--rc-widget-brand-color-80);
      }

      rc-learn-more-modal .learn-more-footer {
        display: flex;
        justify-content: center;
      }

      rc-learn-more-modal .learn-more-group {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 24px;
      }

      rc-learn-more-modal .learn-more-group-item {
        display: flex;
        gap: 32px;
        align-items: center;
      }

      rc-learn-more-modal .learn-more-group-icon-container {
        display: flex;
        padding: 32px;
        background-color: #f6f8f9;
        border-radius: var(--rc-widget-card-radius);
      }

      rc-learn-more-modal svg, rc-learn-more-modal img {
        height: 40px;
        width: 40px;
      }

      @media (max-width: 560px) {
        rc-learn-more-modal h1 {
          font-size: 26px;
          line-height: 32px;
          padding-bottom: 16px;
        }


      rc-learn-more-modal h2 {
        font-size: 16px;
        line-height: 24px;
      }

      rc-learn-more-modal p {
        font-size: 14px;
        line-height: 20px;
      }

      rc-learn-more-modal .learn-more-content {
        padding: 0;
      }

      rc-learn-more-modal svg, rc-learn-more-modal img {
        height: 32px;
        width: 32px;
      }

      rc-learn-more-modal .learn-more-group-item {
        gap: 16px;
      }

      rc-learn-more-modal .learn-more-group-icon-container {
        padding: 20px;
      }
    }
    </style>
    <div class="learn-more-content">
      <h1 class="learn-more-header">Great reasons to subscribe</h1>
        <div class="learn-more-group">
          <div class="learn-more-group-item">
            <div class="learn-more-group-icon-container"><span rc-calendar-icon></span></div>
            <div>
              <h2 style="margin:0;">Flexible frequency</h2>
              <p style="margin:0;">
                Not sure how much of something you need, or how often? Adjust quantities and frequencies any time.
              </p>
            </div>
          </div>
          <div class="learn-more-group-item">
            <div class="learn-more-group-icon-container">
              <span rc-bell-icon></span>
            </div>
            <div>
              <h2>Order reminders</h2>
              <p>
                We'll let you know before each shipment. Delay, reschedule or cancel if you need to - we’ll only bill you
                when your order ships.
              </p>
            </div>
          </div>
          <div class="learn-more-group-item">
            <div class="learn-more-group-icon-container">
              <span rc-phone-icon></span>
            </div>
            <div>
              <h2>You're in control</h2>
              <p>
                Add or remove subscriptions, cancel orders, and edit frequencies and quantities through our user-friendly
                customer portal.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="learn-more-footer"><button data-dismiss-modal>Got it</button></div>
    </div>
  `}var ty=Object.defineProperty,ry=Object.getOwnPropertyDescriptor,Zs=(t,e,r,n)=>{for(var i=n>1?void 0:n?ry(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&ty(e,r,i),i};let Ft=class extends U{constructor(){super(),this.showPoweredByRecharge=!1,this.style.visibility="hidden"}show(){this.style.visibility="visible",document.body.style.overflow="hidden",this.toggleAttribute("data-open",!0),this.setAttribute("tabindex","-1"),setTimeout(()=>{this.focus()})}dismiss(){var e,r,n,i;this.toggleAttribute("data-open",!1),document.body.style.overflow="",setTimeout(()=>{this.style.visibility="hidden"},300);const t=(i=(n=(r=(e=document.querySelector("recharge-subscription-widget"))==null?void 0:e.shadowRoot)==null?void 0:r.querySelector("rc-learn-more"))==null?void 0:n.shadowRoot)==null?void 0:i.querySelector(".rc-learn-more__trigger");!t||!(t instanceof HTMLElement)||t.focus()}connectedCallback(){super.connectedCallback(),this.querySelectorAll("[data-dismiss-modal]").forEach(n=>n.addEventListener("click",()=>this.dismiss())),this.addEventListener("keydown",function(i){var u,d,f;if(i.key!=="Tab")return;const o="a[href], button:not([disabled]), textarea, input, select",a=[...((u=this.shadowRoot)==null?void 0:u.querySelectorAll(o))??[],...this.querySelectorAll(o)],s=a[0],c=a[a.length-1],l=((f=(d=document.activeElement)==null?void 0:d.shadowRoot)==null?void 0:f.activeElement)??document.activeElement;!(s instanceof HTMLElement)||!(c instanceof HTMLElement)||!(l instanceof HTMLElement)||(l===s&&i.shiftKey&&(i.preventDefault(),c.focus()),l===c&&!i.shiftKey&&(i.preventDefault(),s.focus()))});const t=this.querySelector("[rc-calendar-icon]"),e=this.querySelector("[rc-bell-icon]"),r=this.querySelector("[rc-phone-icon]");t&&Mt(iy,t),e&&Mt(oy,e),r&&Mt(ay,r),setTimeout(()=>this.show())}footer(){return this.showPoweredByRecharge?_`
      <footer class="rc-modal-content__footer" aria-label="Powered by Recharge">Powered by ${ny}</footer>
    `:y}render(){return _`
      <div
        class="rc-modal"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        aria-label="Great reasons to subscribe"
        part="${p.LearnMoreModal}"
      >
        <section class="rc-modal-content" part="${p.LearnMoreModalContent}">
          <div class="rc-modal__close-container" part="${p.LearnMoreModalContainer}">
            <button
              type="button"
              class="rc-modal__close"
              @click=${this.dismiss}
              aria-label="Close"
              part="${p.LearnMoreModalCloseButton}"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="32" height="32" rx="16" fill="white" />
                <path d="M10 10L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M10 22L22 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="rc-modal-content__body" part="${p.LearnMoreModalContentBody}">
            <slot name="body"></slot>
          </div>
          ${this.footer()}
        </section>
      </div>
    `}};Ft.shadowRootOptions={...U.shadowRootOptions,delegatesFocus:!0};Ft.styles=X`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: rgba(25, 29, 72, 0.25);
      z-index: 99998;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
    }

    :host([data-open]) {
      opacity: 1;
    }

    .rc-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999;
      transition: transform 0.3s ease-in-out; /* Animation for slide up */
    }

    rc-learn-more-modal[data-open] .rc-modal {
      opacity: 1;
    }

    .rc-modal-content {
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: var(--rc-widget-card-radius);
      max-width: 752px;
      max-height: calc(100vh - 48px);
      position: relative;
      overflow: hidden;
      margin: 24px;
      box-shadow: 0px 0px 32px 0px rgba(25, 29, 72, 0.2), 0px 2px 4px 0px rgba(25, 29, 72, 0.1);
    }

    .rc-modal-content__body {
      flex: 1 1 0%;
      padding: 0 20px 40px;
      overflow-y: auto;
      max-height: calc(100% - 72px);
    }

    .rc-modal-content__footer {
      display: flex;
      margin-top: 16px;
      background: var(--rc-widget-brand-color-10);
      color: var(--rc-widget-brand-color-50);
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }

    .rc-modal__close-container {
      flex: 0 1 0%;
      display: flex;
      justify-content: flex-end;
      padding: 24px 24px 0;
    }

    .rc-modal__close {
      height: 32px;
      width: 32px;
      border: none;
      background-color: transparent;
      color: var(--rc-widget-brand-color);
      cursor: pointer;
      padding: 0;
    }

    .rc-modal-content__footer svg {
      margin-left: 8px;
    }

    @media (max-width: 580px) {
      .rc-modal-content {
        margin: 0px;
        max-height: 100vh;
        height: 100%;
        width: 100vw;
      }

      :host {
        opacity: 1;
      }

      :host([data-open]) .rc-modal {
        transform: translateY(0);
      }

      .rc-modal {
        transform: translateY(100%);
      }
    }
  `;Zs([D({attribute:"show-powered-by-recharge",type:Boolean})],Ft.prototype,"showPoweredByRecharge",2);Ft=Zs([ie("rc-learn-more-modal")],Ft);const ny=_`<svg
  width="75"
  height="18"
  viewBox="0 0 75 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0.386866 4.02513H4.03777C4.2089 4.02513 4.32299 4.11989 4.28496 4.30941L4.0758 5.48443C4.79837 4.44207 5.8442 3.81666 6.90905 3.81666C7.44147 3.81666 8.01193 4.02513 8.31617 4.30941C8.4873 4.47998 8.4873 4.57474 8.37321 4.7453L7.30837 6.24251C7.17526 6.43203 7.08019 6.41308 6.87102 6.31832C6.66185 6.22356 6.39564 6.14775 6.11041 6.14775C4.8364 6.14775 3.77156 6.98164 3.27716 9.50225L2.53557 13.3116C2.47853 13.558 2.28838 13.6148 2.1933 13.6148H0.253761C0.10164 13.6148 -0.031466 13.4822 0.00656423 13.3116L1.45171 5.99613L0.234746 4.29046C0.13967 4.15779 0.21573 4.02513 0.386866 4.02513Z"
    fill="#3901F1"
  />
  <path
    d="M7.38431 8.74417C7.87871 5.76871 10.0654 3.81666 12.9177 3.81666C15.808 3.81666 17.1771 6.10985 16.7588 8.61151C16.6637 9.25587 16.4355 9.76758 15.9031 9.76758H9.74219C9.79923 11.17 10.769 11.8333 12.062 11.8333C12.9177 11.8333 13.7163 11.5112 14.3248 11.1132C14.477 10.9995 14.6481 10.9426 14.7622 11.1132L15.4657 12.2124C15.5798 12.3829 15.5228 12.4967 15.3516 12.6483C14.4389 13.4822 12.9557 13.8612 11.6057 13.8612C8.56325 13.8612 6.90894 11.6249 7.38431 8.74417ZM14.553 8.0998C14.6481 6.6026 13.6213 5.97718 12.6325 5.97718C11.3395 5.97718 10.3317 6.84897 9.95135 8.0998H14.553Z"
    fill="#3901F1"
  />
  <path
    d="M25.9621 13.3873L28.1678 2.16777L27.084 0.727424C27.0269 0.632664 27.103 0.5 27.2361 0.5h20.6208C30.8109 0.5 30.906 0.613712 30.868 0.78428L29.8792 5.73074C30.6398 4.59363 31.7807 3.81659 33.1117 3.81659C35.2414 3.81659 36.4584 5.63598 36.002 7.87232L34.8992 13.3115C34.8611 13.52 34.69 13.6148 34.5569 13.6148h22.5603C32.3702 13.6148 32.2751 13.5011 32.3131 13.3115L33.3019 8.40297C33.5681 7.07633 33.2068 6.2614 32.3892 6.2614C30.868 6.2614 29.67 7.96708 29.1566 10.374L28.5101 13.3873C28.4911 13.5011 28.396 13.6148 28.2629 13.6148H26.1522C26.0381 13.6148 25.9431 13.5011 25.9621 13.3873Z"
    fill="#3901F1"
  />
  <path
    d="M36.6866 8.85788C37.181 5.6929 39.4248 3.81666 42.0489 3.81666C43.437 3.81666 44.5208 4.44207 44.9392 5.48443L45.1673 4.32836C45.2054 4.11989 45.3575 4.02513 45.5286 4.02513H47.3731C47.5823 4.02513 47.6583 4.15779 47.6203 4.32836L45.8519 13.3305C45.8139 13.5011 45.6998 13.6148 45.4906 13.6148H43.6271C43.456 13.6148 43.3609 13.5201 43.3989 13.3305L43.5701 12.4019C42.6954 13.3874 41.6115 13.8802 40.4326 13.8802C37.7515 13.8802 36.2493 11.6628 36.6866 8.85788ZM41.1932 11.587C42.7334 11.587 43.8743 10.2982 44.1025 8.78207C44.3307 7.26592 43.513 6.1288 42.0869 6.1288C40.5657 6.1288 39.4628 7.36068 39.2156 8.80103C38.9684 10.2603 39.71 11.587 41.1932 11.587Z"
    fill="#3901F1"
  />
  <path
    d="M47.05 13.3116L48.8374 4.27151C48.8754 4.11989 48.9515 4.02513 49.0656 4.02513H51.0812C51.2523 4.02513 51.3664 4.11989 51.3284 4.30941L51.1192 5.48443C51.8418 4.44207 52.8876 3.81666 53.9525 3.81666C54.4849 3.81666 55.0554 4.02513 55.3596 4.30941C55.5307 4.47998 55.5307 4.57474 55.4166 4.7453L54.3518 6.24251C54.2187 6.43203 54.1236 6.41308 53.9144 6.31832C53.7053 6.22356 53.4391 6.14775 53.1538 6.14775C51.8798 6.14775 50.815 6.98164 50.3206 9.50225L49.579 13.3116C49.522 13.558 49.3318 13.6148 49.2367 13.6148H47.2972C47.1451 13.6148 47.012 13.4822 47.05 13.3116Z"
    fill="#3901F1"
  />
  <path
    d="M53.6862 16.3629C53.5721 16.2681 53.5721 16.1165 53.6482 15.9838L54.5419 14.5814C54.637 14.4298 54.7891 14.3919 54.9032 14.4866C55.7779 15.0362 56.6336 15.3774 57.6794 15.3774C59.5048 15.3774 61.026 14.6382 61.5585 12.1934C60.5507 13.141 59.6189 13.5959 58.2118 13.5959C55.4546 13.5959 54.0095 11.2837 54.4658 8.70627C54.9792 5.78766 57.166 3.81666 59.9232 3.81666C61.4444 3.81666 62.4902 4.6695 62.8135 5.37072L63.0416 4.32836C63.0797 4.11989 63.2128 4.02513 63.3649 4.02513H65.2284C65.4185 4.02513 65.5136 4.13884 65.4756 4.32836L63.9163 12.2503C63.2318 15.6995 60.8359 17.5 57.5843 17.5C56.2152 17.5 54.675 17.1588 53.6862 16.3629ZM58.9344 11.3785C60.4746 11.3785 61.6155 10.1466 61.8437 8.68731C62.0719 7.22801 61.2542 6.1288 59.8281 6.1288C58.3069 6.1288 57.204 7.32277 56.9568 8.70627C56.7096 10.1087 57.4512 11.3785 58.9344 11.3785Z"
    fill="#3901F1"
  />
  <path
    d="M65.5517 8.74417C66.0461 5.76871 68.2328 3.81666 71.0851 3.81666C73.9754 3.81666 75.3445 6.10985 74.9262 8.61151C74.8311 9.25587 74.6029 9.76758 74.0705 9.76758H67.9096C67.9666 11.17 68.9364 11.8333 70.2294 11.8333C71.0851 11.8333 71.8837 11.5112 72.4922 11.1132C72.6444 10.9995 72.8155 10.9426 72.9296 11.1132L73.6331 12.2124C73.7472 12.3829 73.6902 12.4967 73.5191 12.6483C72.6063 13.4822 71.1231 13.8612 69.7731 13.8612C66.7307 13.8612 65.0763 11.6249 65.5517 8.74417ZM72.7204 8.0998C72.8155 6.6026 71.7887 5.97718 70.7999 5.97718C69.5069 5.97718 68.4991 6.84897 68.1188 8.0998H72.7204Z"
    fill="#3901F1"
  />
  <path
    d="M21.7092 13.8802C22.9832 13.8802 24.2382 13.5201 25.3791 12.4398C25.5503 12.2882 25.5693 12.0797 25.4552 11.966L24.4094 10.8099C24.3143 10.6962 24.1622 10.6962 24.0291 10.791C23.5917 11.1132 22.8882 11.4922 22.0515 11.4922C20.5493 11.4922 19.7126 10.3172 19.9028 8.83893C20.0929 7.37963 21.2529 6.20461 22.717 6.20461C23.5157 6.20461 24.0291 6.48889 24.5995 7.05745C24.7516 7.20906 24.8467 7.20906 25.0179 7.0764L26.3679 5.92033C26.501 5.80662 26.5391 5.67395 26.444 5.52234C25.6263 4.36627 24.3523 3.81666 22.9452 3.81666C20.112 3.81666 17.8111 5.92033 17.4308 8.70627C17.0125 11.7386 19.0281 13.8802 21.7092 13.8802Z"
    fill="#3901F1"
  />
</svg> `,iy=_`
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M37.3438 35.0313C37.3438 36.2646 36.2646 37.3437 35.0313 37.3437H4.96875C3.73542 37.3437 2.65625 36.2646 2.65625 35.0313V9.59375C2.65625 8.36042 3.73542 7.28125 4.96875 7.28125h25.0313C36.2646 7.28125 37.3438 8.36042 37.3438 9.59375V35.0313Z"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.65625 16.5312h27.3438"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.9062 10.6729V2.65625"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M28.0938 10.6729V2.65625"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0561 22.2354C9.74776 22.2354 9.43942 22.5437 9.43942 22.8521C9.43942 23.1604 9.74776 23.4687 10.0561 23.4687"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0561 22.2354C10.3645 22.2354 10.6728 22.5437 10.6728 22.8521C10.6728 23.1604 10.3645 23.4687 10.0561 23.4687"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0561 30.4062C9.74776 30.4062 9.43942 30.7146 9.43942 31.0229C9.43942 31.3313 9.74776 31.6396 10.0561 31.6396"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.0561 30.4062C10.3645 30.4062 10.6728 30.7146 10.6728 31.0229C10.6728 31.3313 10.3645 31.6396 10.0561 31.6396"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9228 22.2354C19.6144 22.2354 19.3061 22.5437 19.3061 22.8521C19.3061 23.1604 19.6144 23.4687 19.9228 23.4687"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9228 22.2354C20.2311 22.2354 20.5394 22.5437 20.5394 22.8521C20.5394 23.1604 20.2311 23.4687 19.9228 23.4687"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9228 30.4062C19.6144 30.4062 19.3061 30.7146 19.3061 31.0229C19.3061 31.3313 19.6144 31.6396 19.9228 31.6396"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.9228 30.4062C20.2311 30.4062 20.5394 30.7146 20.5394 31.0229C20.5394 31.3313 20.2311 31.6396 19.9228 31.6396"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M29.7896 30.4062C29.4812 30.4062 29.1729 30.7146 29.1729 31.0229C29.1729 31.3313 29.4812 31.6396 29.7896 31.6396"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M29.7896 30.4062C30.0979 30.4062 30.4062 30.7146 30.4062 31.0229C30.4062 31.3313 30.0979 31.6396 29.7896 31.6396"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M29.7894 20.0769C28.2478 20.0769 27.0144 21.3103 27.0144 22.8519C27.0144 24.3936 28.2478 25.6269 29.7894 25.6269C31.3311 25.6269 32.5644 24.3936 32.5644 22.8519C32.5644 21.3103 31.3311 20.0769 29.7894 20.0769Z"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`,oy=_`
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.974 10.4833C25.974 11.7099 26.4612 12.8863 27.3286 13.7537C28.196 14.621 29.3723 15.1083 30.599 15.1083C31.8256 15.1083 33.002 14.621 33.8693 13.7537C34.7367 12.8863 35.224 11.7099 35.224 10.4833C35.224 9.25667 34.7367 8.08028 33.8693 7.21292C33.002 6.34557 31.8256 5.85829 30.599 5.85829C29.3723 5.85829 28.196 6.34557 27.3286 7.21292C26.4612 8.08028 25.974 9.25667 25.974 10.4833Z"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.5677 35.0312C15.7635 35.6983 16.1701 36.284 16.7267 36.7006C17.2832 37.1173 17.9597 37.3424 18.6549 37.3424C19.3501 37.3424 20.0266 37.1173 20.5831 36.7006C21.1397 36.284 21.5463 35.6983 21.7421 35.0312"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.651 6.125V2.65625"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M30.249 19.9399C30.5404 28.8137 32.526 30.4063 32.526 30.4063H4.77603C4.77603 30.4063 7.08853 27.4524 7.08853 17.6875C7.09026 15.8761 7.51716 14.0904 8.33488 12.4741C9.15259 10.8577 10.3383 9.4559 11.7966 8.38138C13.2549 7.30686 14.945 6.58965 16.731 6.28745C18.5171 5.98526 20.3491 6.10651 22.0797 6.64147"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`,ay=_`<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M25.7813 21.1563V33.1319C25.7813 33.6852 25.6723 34.233 25.4605 34.7441C25.2487 35.2552 24.9384 35.7196 24.5471 36.1107C24.1558 36.5018 23.6913 36.812 23.1801 37.0236C22.669 37.2352 22.1211 37.344 21.5679 37.3437H11.4946C10.9414 37.344 10.3935 37.2352 9.88235 37.0236C9.37117 36.812 8.90668 36.5018 8.51541 36.1107C8.12414 35.7196 7.81376 35.2552 7.602 34.7441C7.39024 34.233 7.28125 33.6852 7.28125 33.1319V9.18212C7.28125 8.06467 7.72516 6.99298 8.51532 6.20282C9.30548 5.41266 10.3772 4.96875 11.4946 4.96875H18.8438"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M7.28125 30.4062H25.7813"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M31.7629 8.23708L20 20L14.2188 21.1562L15.375 15.375L27.1379 3.61208C27.7497 3.00053 28.5792 2.65698 29.4442 2.65698C30.3093 2.65698 31.1388 3.00053 31.7506 3.61208L31.7629 3.62596C32.066 3.92853 32.3065 4.2879 32.4706 4.68352C32.6347 5.07913 32.7192 5.50323 32.7192 5.93152C32.7192 6.35981 32.6347 6.7839 32.4706 7.17952C32.3065 7.57514 32.066 7.93451 31.7629 8.23708Z"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;var sy=Object.defineProperty,cy=Object.getOwnPropertyDescriptor,Xs=(t,e,r,n)=>{for(var i=n>1?void 0:n?cy(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&sy(e,r,i),i};let Ar=class extends U{render(){return this.settings==null||!this.settings.benefitsImage?y:_`<img
      src="${this.settings.benefitsImage}"
      name="Benefits"
      alt="Benefits"
      part="${p.BenefitsImage}"
    />`}};Ar.styles=X`
    img {
      width: 100%;
      border-radius: var(--rc-widget-card-radius);
    }
  `;Xs([Lr({context:tr})],Ar.prototype,"settings",2);Ar=Xs([ie("rc-benefits-image")],Ar);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fe=Xr(class extends en{constructor(t){var e;if(super(t),t.type!==Zr.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var n,i;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in e)e[o]&&!((n=this.nt)!=null&&n.has(o))&&this.st.add(o);return this.render(e)}const r=t.element.classList;for(const o of this.st)o in e||(r.remove(o),this.st.delete(o));for(const o in e){const a=!!e[o];a===this.st.has(o)||(i=this.nt)!=null&&i.has(o)||(a?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return me}});var ly=Object.defineProperty,uy=Object.getOwnPropertyDescriptor,Yi=(t,e,r,n)=>{for(var i=n>1?void 0:n?uy(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&ly(e,r,i),i};let zt=class extends U{constructor(){super(...arguments),this.unsafeHTML="",this.compact=!1}get classes(){return{compact:this.compact,"rc-benefits__list":!0}}render(){return _`<div class=${Fe(this.classes)} part="${p.BenefitsList}">
      ${Qi(this.unsafeHTML)}
    </div>`}};zt.styles=[X`
      :host {
        --rc-widget-bullet-icon-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwLjkyMTUgMTQuNzExNUwxNS42MDc0IDEwLjA0NjVMMTQuODMzNCA5LjI3MjQ2TDEwLjkyMTUgMTMuMTYzNUw5LjE1MDcxIDExLjQxMzVMOC4zNzY2OSAxMi4xODc1TDEwLjkyMTUgMTQuNzExNVpNMTIuMDAxNSAxOS41ODMzQzEwLjk2MjEgMTkuNTgzMyA5Ljk4MTQ4IDE5LjM4NiA5LjA1OTcxIDE4Ljk5MTJDOC4xMzc5MiAxOC41OTY1IDcuMzMxMSAxOC4wNTM0IDYuNjM5MjUgMTcuMzYxOUM1Ljk0NzM5IDE2LjY3MDMgNS40MDQwMSAxNS44NjM5IDUuMDA5MSAxNC45NDI1QzQuNjE0MiAxNC4wMjEyIDQuNDE2NzUgMTMuMDQwOCA0LjQxNjc1IDEyLjAwMTRDNC40MTY3NSAxMC45NDgxIDQuNjE0MTEgOS45NjQwNiA1LjAwODgzIDkuMDQ5MjNDNS40MDM1NSA4LjEzNDM4IDUuOTQ2NjggNy4zMzEwNCA2LjYzODIxIDYuNjM5MTlDNy4zMjk3NSA1Ljk0NzMzIDguMTM2MiA1LjQwMzk0IDkuMDU3NTYgNS4wMDkwNEM5Ljk3ODkxIDQuNjE0MTQgMTAuOTU5MyA0LjQxNjY5IDExLjk5ODcgNC40MTY2OUMxMy4wNTE5IDQuNDE2NjkgMTQuMDM2IDQuNjE0MDUgMTQuOTUwOCA1LjAwODc3QzE1Ljg2NTcgNS40MDM0OSAxNi42NjkgNS45NDY2MiAxNy4zNjA5IDYuNjM4MTVDMTguMDUyNyA3LjMyOTY5IDE4LjU5NjEgOC4xMzI2NyAxOC45OTEgOS4wNDcwOEMxOS4zODU5IDkuOTYxNDkgMTkuNTgzNCAxMC45NDUzIDE5LjU4MzQgMTEuOTk4NkMxOS41ODM0IDEzLjAzOCAxOS4zODYgMTQuMDE4NiAxOC45OTEzIDE0Ljk0MDRDMTguNTk2NiAxNS44NjIxIDE4LjA1MzQgMTYuNjY5IDE3LjM2MTkgMTcuMzYwOEMxNi42NzA0IDE4LjA1MjcgMTUuODY3NCAxOC41OTYxIDE0Ljk1MyAxOC45OTFDMTQuMDM4NiAxOS4zODU5IDEzLjA1NDcgMTkuNTgzMyAxMi4wMDE1IDE5LjU4MzNaTTEyLjAwMDEgMTguNUMxMy44MDU2IDE4LjUgMTUuMzQwMyAxNy44NjgxIDE2LjYwNDIgMTYuNjA0MkMxNy44NjgxIDE1LjM0MDMgMTguNTAwMSAxMy44MDU2IDE4LjUwMDEgMTJDMTguNTAwMSAxMC4xOTQ0IDE3Ljg2ODEgOC42NTk3MiAxNi42MDQyIDcuMzk1ODNDMTUuMzQwMyA2LjEzMTk0IDEzLjgwNTYgNS41IDEyLjAwMDEgNS41QzEwLjE5NDUgNS41IDguNjU5NzggNi4xMzE5NCA3LjM5NTg5IDcuMzk1ODNDNi4xMzIgOC42NTk3MiA1LjUwMDA2IDEwLjE5NDQgNS41MDAwNiAxMkM1LjUwMDA2IDEzLjgwNTYgNi4xMzIgMTUuMzQwMyA3LjM5NTg5IDE2LjYwNDJDOC42NTk3OCAxNy44NjgxIDEwLjE5NDUgMTguNSAxMi4wMDAxIDE4LjVaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48L3N2Zz4K);
        --rc-widget-bullet-icon-image-color: var(--rc-widget-brand-color);
      }
    `,Ys];Yi([D({type:String})],zt.prototype,"unsafeHTML",2);Yi([D({type:Boolean})],zt.prototype,"compact",2);zt=Yi([ie("rc-benefits")],zt);const dy="product";function Pt(t){var e,r;v("Emitting Recharge Analytics",t.event_name,t),(r=(e=Ve())==null?void 0:e.analytics)==null||r.publish(t.event_name,t)}let at=null;const py=["shopify-accelerated-checkout button","shopify-accelerated-checkout #more-payment-options-link","shopify-accelerated-checkout shop-pay-wallet-button","shopify-accelerated-checkout shopify-google-pay-button","shopify-accelerated-checkout shopify-apple-pay-button"];function pr(t){function e(){var r,n;if(at==null){Y("NOT EMITTING Recharge Analytics - Buy Now Click context doesn't exist");return}v("Emitting Recharge Analytics - Buy Now Click",JSON.stringify(at)),(n=(r=Ve())==null?void 0:r.analytics)==null||n.publish(at.event_name,at)}if(at==null){let r=!1;py.forEach(n=>{const i=document.querySelector(n);i!=null&&(i.addEventListener("click",e),v("Added event listener to buy now button",n,i),r=!0)}),r||v("No buy now buttons found")}at=t}function fy(t,e){const r=Fs("selling_plan",e);return t&&Gr(t,n=>{r.value=String(n??""),v("Selling Plan Changed",n)}),r}function hy(t,e,r){r&&(r.value=String(e));const n=r??Fs("quantity",e);return Gr(t,i=>{var s;const o=T();if(!o)return n;const a=(s=o.product)==null?void 0:s.plans.find(c=>c.external_plan_id===i);if(!a){n.removeAttribute("value");return}a.product_quantity&&(n.value=String(a.product_quantity))}),n}async function gy({initialVariantId:t,initialSellingPlanId:e,productId:r,quantityUpsell:n}){var i;try{const o=Na();ua("designMode",((i=Ve())==null?void 0:i.designMode)??!1),o&&(Zh("theme",o),ua("theme",o.baseThemeName||o.themeName),v("Current Theme",o));const a=await Eg(t,r,e);if(!a)return;$g(r,a),v("Product Form",a),Og(r,a);const s=fy(r,e);if(a.prepend(s),v("Selling plan input created",s),n!=null&&n.isEnabled){const c=Ws(a),l=hy(r,n.initialQuantity,c);a.prepend(l)}return a}catch(o){ge(o)}}function yy(t,e){var r;try{const n=window;typeof n.RechargeSubscriptionWidgetReady=="function"&&(v("Calling RechargeSubscriptionWidgetReady"),(r=n.RechargeSubscriptionWidgetReady)==null||r.call(n,{...e,events:wg(t)}))}catch(n){be("Error calling RechargeSubscriptionWidgetReady",n)}}function fa(t,e){return Us(t)?e.quantity_upsell?!0:(V("Plan with `product_quantity` encountered, but no accompanying quantity upsell config",{context:{settings:e}},"warning"),!1):!1}function _y(t,e,r,n,i){if(!t.interval_unit||!t.product_quantity)return r;const o=`${t.interval_unit.toLowerCase()}${Number(t.order_interval_frequency)>1?"s":""}`,a=e[o].replace(E.Interval,String(t.order_interval_frequency)),s={[E.Amount]:String(t.product_quantity),[E.ShippingInterval]:a,[E.DiscountPrice]:i,[E.PrepaidUnitPrice]:n};return Object.entries(s).reduce((l,[u,d])=>Cr(l,u,d),r)}var vy=Object.defineProperty,my=Object.getOwnPropertyDescriptor,H=(t,e,r,n)=>{for(var i=n>1?void 0:n?my(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&vy(e,r,i),i};const ha="https://admin.rechargeapps.com/admin/login?next=/merchant/grow/product-page/overview?onboarding_redirect",by=X`
  :host {
    display: block;
    text-align: left;
    max-width: 44rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    --rc-widget-brand-color: #121212;
    --rc-widget-brand-color-10: #e7e7e7;
    --rc-widget-brand-color-20: #d0d0d0;
    --rc-widget-brand-color-50: #898989;
    --rc-widget-brand-color-70: #595959;
    --rc-widget-brand-color-80: #414141;
    --rc-widget-brand-contrast-color: #ffffff;
    --rc-widget-text-color: #121212;
    --rc-widget-selected-bg-color: #ffffff;
    --rc-widget-selected-text-color: #121212;
    --rc-widget-badge-text-color: #ffffff;
    --rc-widget-badge-bg-color: #0f866a;
    --rc-widget-card-radius: 8px;
    --rc-widget-button-radius: 4px;
    --rc-widget-badge-radius: 4px;
    --rc-widget-field-radius: 4px;
  }
  .rc-widget__root {
    color: var(--rc-widget-text-color);
  }

  .rc-selection__root {
    font-size: 16px;
    line-height: 24px;
  }
  .compact.rc-selection__root {
    font-size: 14px;
    line-height: 20px;
  }

  input {
    clip: rect(0, 0, 0, 0);
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  input:focus-visible + .rc-purchase-option__checked-indicator {
    border-radius: 50%;
    box-shadow: 0 0 0 2px white, 0 0 0 3px var(--rc-widget-brand-color-50);
  }

  .rc-purchase-option__checked-indicator {
    margin-right: 8px;
  }

  .rc-purchase-option__label.single-selection {
    cursor: auto;
  }
  .rc-purchase-option__label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    padding: 12px 20px 8px 20px;
  }
  .rc-purchase-option__label.rc-dynamic-pricing {
    padding-bottom: 0;
  }
  .compact .rc-purchase-option__label {
    font-size: 1em;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .compact [rc-not-selected] .rc-purchase-option__label {
    padding: 12px 20px;
  }
  .compact .rc-purchase-option__prices {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .compact rc-learn-more {
    line-height: 0;
    margin-left: 0.5rem;
  }

  .rc-purchase-option__selector {
    font-size: 1.25em;
    padding: 3px 0;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .rc-purchase-option__sub-container {
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rc-purchase-option {
    border: 1px solid var(--rc-widget-brand-color-50);
    border-radius: var(--rc-widget-card-radius);
    position: relative;
  }

  .rc-purchase-option[rc-selected] {
    border-color: var(--rc-widget-brand-color);
    background: var(--rc-widget-selected-bg-color);
    color: var(--rc-widget-selected-text-color);
  }

  .rc-purchase-option__badge {
    position: absolute;
    top: -1em;
    right: 1em;
    background: var(--rc-widget-badge-bg-color);
    color: var(--rc-widget-badge-text-color);
    font-size: 12px;
    line-height: 12px;
    padding: 0.5em;
    border-radius: var(--rc-widget-badge-radius);
  }

  .rc-purchase-option:not(:last-child) {
    margin-bottom: 1em;
  }

  .rc-purchase-option__prices {
    margin-left: 2em;
  }

  .rc-purchase-option__dynamic-price {
    margin-left: 3.3em;
    padding-bottom: 0.5em;
  }

  .rc-price {
    font-weight: 600;
    line-height: 1em;
  }

  .text-muted {
    color: var(--rc-widget-brand-color-70);
    font-weight: 400;
  }
  .strike-through {
    text-decoration-line: line-through;
  }

  .rc-subscription-only .rc-purchase-option__label {
    cursor: initial;
  }

  [rc-subscription-only] .rc-purchase-option__prices {
    margin-left: 0;
  }

  [rc-subscription-only] .rc-purchase-option__dynamic-price {
    margin-left: 1.2em;
  }

  .visually-hidden {
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0px;
    overflow: hidden;
    white-space: nowrap;
    position: absolute;
  }

  .rc-purchase-option-group {
    border: 0;
    padding: 0;
    margin: 0;
    min-width: 0;
  }
`;let q=class extends U{constructor(){super(...arguments),this.preview="",this.state="init",this.purchaseOption=$.Subscription,this.settings=Ir,this.styleBlock=null}get classes(){var t;return{compact:((t=this.settings)==null?void 0:t.displayMode)==="compact","rc-selection__root":!0}}get variantPlans(){return this.product?this.product.variantLevelPlans[this.variantId]||[]:[]}get variant(){return this.product?this.product.variants.find(t=>t.id===this.variantId):null}get selectedVariantPlan(){return this.variantPlans.find(t=>t.external_plan_id===this.sellingPlanId)||this.variantPlans[0]}get badgeLabel(){var e,r;if(!((e=this.settings)!=null&&e.badgeText)||!((r=this.product)!=null&&r.hasOnetimePlan))return"";let t=kg(this.settings.badgeText,this.variantPlans,this.product,this.variantId);return Number(this.selectedVariantPlan.discount_amount)>0&&(t=pi(t,this.selectedVariantPlan)),t}get maxDiscount(){return this.product?di(this.variantPlans,this.product,this.variantId):null}get isSelectedPlanPrepaidType(){var t;return["prepaid_v2","prepaid"].includes((t=this.selectedVariantPlan)==null?void 0:t.type)&&this.purchaseOption!==$.Onetime}get prices(){return this.product?Wi(this.product,this.variantId,this.sellingPlanId||this.variantPlans[0].external_plan_id):null}get staticPricingText(){var t,e,r;return(t=this.settings)!=null&&t.staticPricingText?Oe(E.DiscountPrice,(e=this.prices)==null?void 0:e.discounted)(this.settings.staticPricingText):(r=this.prices)==null?void 0:r.discounted}get dynamicPricingText(){var t,e,r,n,i;if(!this.product)return null;if((t=this.settings)!=null&&t.dynamicPricingText){const o=di(this.variantPlans,this.product,this.variantId),a=Ng(this.selectedVariantPlan),s=Ig(this.selectedVariantPlan)||((e=this.prices)==null?void 0:e.discounted),c=Lg(this.selectedVariantPlan,this.product,this.variantId.toString(),(n=(r=T())==null?void 0:r.shop)==null?void 0:n.currency),l=Bg(this.selectedVariantPlan,this.settings.frequencyIntervalTranslation,a);return Dg([Oe(E.InitialDiscountAmount,(i=this.prices)==null?void 0:i.discounted),Oe(E.InitialDiscountPercentage,o),Oe(E.RecurringDiscountPercentage,s),Oe(E.RecurringDiscountAmount,c),Oe(E.RecurringDiscountCount,a.toString()),Oe(E.RecurringDiscountCountWithInterval,l)])(this.settings.dynamicPricingText)}}async connectedCallback(){var t,e,r,n,i,o,a,s,c,l,u,d;try{super.connectedCallback();const f=T();if(Kh(((t=f==null?void 0:f.shop)==null?void 0:t.identifier)??"UNKNOWN"),!this.productId)throw new Error("A productId is required to render the subscription widget");if(!this.defaultVariantId)throw new Error("A default variant id is required to render the subscription widget");if(!this._isConfigScriptTagValid()||!this._isWidgetVisibleInDOM()||f==null)return;this.defaultVariantId&&(this.variantId=this.defaultVariantId);const{config:g,plan_configs:m}=await yg(f,this.productId,this.preview);if(this.settings=g,this.planConfigs=m,this.settings==null){v("No settings configuration found");return}re!=null&&re.settings&&(v("Using test settings",re.settings),this.settings=W(this.settings,re.settings));const w=Qc(this.settings.overrideSettingKey);w&&(v("Using merchant overrides",w),this.settings=W(this.settings,w)),v("Settings configuration used",this.settings),this.purchaseOption=this.settings.defaultSelection,await this.fetchProduct(f);const S=(e=this.product)==null?void 0:e.plans.find(M=>M.external_plan_id===this.sellingPlanId),b={productId:this.productId,initialVariantId:this.variantId,initialSellingPlanId:this.sellingPlanId,quantityUpsell:this.product?{isEnabled:fa(this.product,this.settings),initialQuantity:(S==null?void 0:S.product_quantity)??1}:void 0};if(this.preview||(this.productForm=await gy(b)),this._setupListeners(),this.defaultSellingPlanId?this.variantPlans.find(M=>M.external_plan_id===this.defaultSellingPlanId)==null?Y("The default selling plan id does not exist in the variant plans. Defaulting to first plan",this.defaultSellingPlanId):(v("Using the default selling plan assigned to the variant.",this.defaultSellingPlanId),this._handleSellingPlanChange(this.defaultSellingPlanId)):v("No default selling plan id provided. Defaulting to first plan."),!this.preview){const{order_frequency:M,charge_frequency:O,unit:I}=this._findOrderIntervalFrequency(this.sellingPlanId);if(this.product&&!ot(se.RechargePreview,this.settings)){Pt({event_name:ae.Load,rc_widget_config_id:((r=this.settings)==null?void 0:r.config_id)??null,ab_split_id:((n=this.settings)==null?void 0:n.ab_split_id)??null,widget_flow_id:((i=this.settings)==null?void 0:i.widget_flow_id)??null,external_product_id:this.productId.toString(),external_variant_id:this.variantId.toString(),widget_embed_template_name:(o=T())==null?void 0:o.shop.template,external_market_id:(a=T())==null?void 0:a.shop.market_id.toString(),onetime_item_type_option_displayed:this.product.hasOnetimePlan,subscription_item_type_option_displayed:this.variantPlans.some(J=>J.type==="subscription"),prepaid_subscription_item_type_option_displayed:this.variantPlans.some(J=>J.type==="prepaid_v2"||J.type==="prepaid"),preselected_item_type_option:this.isSelectedPlanPrepaidType?$.Prepaid:this.purchaseOption}),Pt({event_name:ae.SellingPlanChanged,rc_widget_config_id:this.settings.config_id??null,order_interval_frequency:M,charge_interval_frequency:O,interval_unit:I,external_plan_id:this.sellingPlanId??null});try{pr({event_name:ae.BuyNow,widget_config:((s=this.settings)==null?void 0:s.config_id)??null,ext_market:(c=T())==null?void 0:c.shop.market_id.toString(),template_name:(l=T())==null?void 0:l.shop.template,item_type:this.isSelectedPlanPrepaidType?$.Prepaid:this.purchaseOption,ab_split_id:((u=this.settings)==null?void 0:u.ab_split_id)??null,widget_flow_id:((d=this.settings)==null?void 0:d.widget_flow_id)??null})}catch(J){ge(J)}}}v("Widget created",{productId:this.productId,product:this.product,variantId:this.variantId,sellingPlanId:this.sellingPlanId}),yy(this.productId,{product:this.product,variantId:this.variantId,sellingPlanId:this.sellingPlanId,purchaseOption:this.purchaseOption,settings:this.settings,planConfigs:this.planConfigs})}catch(f){ge(f)}}_setupListeners(){ai(this.productId,t=>{var i,o;if(!this.product)return;const e=this.variantId,r=this.product.variantLevelPlans[e],n=r==null?void 0:r.find(a=>a.external_plan_id===this.sellingPlanId);if(this.variantId=t||Number(this.product.variants[0].external_variant_id),this.variantPlans.length===0&&!this.product.hasOnetimePlan&&v("The product does not have any plans or onetime."),this.purchaseOption===$.Subscription&&this.variantPlans.length===0)v("Selected product does not have subscription plans. Defaulting to onetime",this.productId),this._handlePurchaseOptionChange($.Onetime);else if(e&&(r==null?void 0:r.length)===0&&this.variantPlans.length>0&&((i=this.settings)==null?void 0:i.defaultSelection)===$.Subscription)v("Previous product does not have subscription plans but current product does. defaulting to subscription"),this._handlePurchaseOptionChange($.Subscription);else if(this.purchaseOption===$.Onetime&&!((o=this.variant)!=null&&o.hasOnetimePlan))v("Selected product does not have an onetime plan. Defaulting to subscription",this.productId),this._handlePurchaseOptionChange($.Subscription);else if(this.purchaseOption===$.Subscription&&(!this.sellingPlanId||(n==null?void 0:n.type)!=="prepaid_v2"&&!this.variantPlans.map(a=>a.external_plan_id).includes(this.sellingPlanId)))v("Selected selling plan not found in variant plans. Defaulting to first plan",this.sellingPlanId),this._handlePurchaseOptionChange($.Subscription);else if(this.purchaseOption===$.Subscription&&(n==null?void 0:n.type)==="prepaid_v2"&&this.sellingPlanId&&!this.variantPlans.map(a=>a.external_plan_id).includes(this.sellingPlanId)){v("Selected variant plan is prepaid_v2. Trying to find a similar plan",this.selectedVariantPlan);const a=this.variantPlans.find(s=>s.type==="prepaid_v2"&&s.order_interval_frequency===n.order_interval_frequency&&s.charge_interval_frequency===n.charge_interval_frequency&&s.interval_unit===n.interval_unit);a?(v("Found a similar plan. Defaulting to it",a),this._handleSellingPlanChange(a.external_plan_id)):(v("No similar plan found. Defaulting to first plan",this.variantPlans[0]),this._handlePurchaseOptionChange($.Subscription))}}),qs(this.productId,t=>{var e,r,n,i,o;if(this.product&&!this.preview&&!ot(se.RechargePreview,this.settings))try{pr({event_name:ae.BuyNow,widget_config:((e=this.settings)==null?void 0:e.config_id)??null,ext_market:(r=T())==null?void 0:r.shop.market_id.toString(),template_name:(n=T())==null?void 0:n.shop.template,item_type:this.isSelectedPlanPrepaidType?$.Prepaid:this.purchaseOption,ab_split_id:((i=this.settings)==null?void 0:i.ab_split_id)??null,widget_flow_id:((o=this.settings)==null?void 0:o.widget_flow_id)??null})}catch(a){ge(a)}}),ai(this.productId,t=>{var e,r,n,i,o,a;if(this.product&&!this.preview&&!ot(se.RechargePreview,this.settings)){Pt({event_name:ae.VariantChanged,rc_widget_config_id:((e=this.settings)==null?void 0:e.config_id)??null,external_product_id:this.productId.toString(),external_variant_id:t?t.toString():""});try{pr({event_name:ae.BuyNow,widget_config:((r=this.settings)==null?void 0:r.config_id)??null,ext_market:(n=T())==null?void 0:n.shop.market_id.toString(),template_name:(i=T())==null?void 0:i.shop.template,item_type:this.isSelectedPlanPrepaidType?$.Prepaid:this.purchaseOption,ab_split_id:((o=this.settings)==null?void 0:o.ab_split_id)??null,widget_flow_id:((a=this.settings)==null?void 0:a.widget_flow_id)??null})}catch(s){ge(s)}}}),Gr(this.productId,t=>{var i,o,a,s,c,l;if(this.productForm){const u=this.variantPlans.find(f=>f.external_plan_id===t),d=Ws(this.productForm);d&&u&&u.product_quantity&&(d.value=String(u.product_quantity))}const{order_frequency:e,charge_frequency:r,unit:n}=this._findOrderIntervalFrequency(t);if(this.product&&!this.preview&&!ot(se.RechargePreview,this.settings)){Pt({event_name:ae.SellingPlanChanged,rc_widget_config_id:((i=this.settings)==null?void 0:i.config_id)??null,order_interval_frequency:e,charge_interval_frequency:r,interval_unit:n,external_plan_id:t??null});try{pr({event_name:ae.BuyNow,widget_config:((o=this.settings)==null?void 0:o.config_id)??null,ext_market:(a=T())==null?void 0:a.shop.market_id.toString(),template_name:(s=T())==null?void 0:s.shop.template,item_type:this.isSelectedPlanPrepaidType?$.Prepaid:this.purchaseOption,ab_split_id:((c=this.settings)==null?void 0:c.ab_split_id)??null,widget_flow_id:((l=this.settings)==null?void 0:l.widget_flow_id)??null})}catch(u){ge(u)}}})}_findOrderIntervalFrequency(t){const e=this.variantPlans.find(r=>r.external_plan_id===t);return e?{order_frequency:e.order_interval_frequency,charge_frequency:e.charge_interval_frequency,unit:e.interval_unit}:{order_frequency:null,charge_frequency:null,unit:null}}_handleSellingPlanChange(t){var n;const e=this.variantPlans.find(i=>i.external_plan_id===this.sellingPlanId),r=this.variantPlans.find(i=>i.external_plan_id===t);this.sellingPlanId=t?Number(t):void 0,vg(this.productId,this.sellingPlanId,this.variantPlans.find(i=>i.external_plan_id===this.sellingPlanId)),(e==null?void 0:e.type)!==(r==null?void 0:r.type)&&!this.preview&&!ot(se.RechargePreview,this.settings)&&Pt({event_name:ae.TypeChanged,rc_widget_config_id:((n=this.settings)==null?void 0:n.config_id)??null,selected_item_type_option:this.isSelectedPlanPrepaidType?$.Prepaid:this.purchaseOption})}_handlePurchaseOptionChange(t){this.purchaseOption=t,v("Purchase option changed",this.purchaseOption),bg(this.productId,t),this._handleSellingPlanChange(this.purchaseOption===$.Subscription?this.variantPlans[0].external_plan_id:void 0)}async fetchProduct({shop:t}){var i;const e=T();this.state="loading";let r;if(this.preview){const o=Gc(this.preview);ag(o)?r=o:this.product=o,v("Previewing product",this.preview,this.product)}else try{fs({storeIdentifier:t.identifier,environment:ka?"stage":"prod"}),v("Fetching product from the cdn",this.productId),r=await ps(this.productId,{version:"2022-06"})}catch(o){const a=o instanceof Error?{name:o.name,message:o.message,stack:o.stack,productId:`product/2022-06/${this.productId}.json`}:{message:"Unknown fetch error"};V("Error fetching product from the cdn",{error:a},"warning"),this.state="error";return}if(r&&(r.plans.some(o=>o.type!=="onetime"&&!o.external_plan_id)&&V("Product plan record has no external_plan_id",{inputs:{productId:r.external_product_id}},"warning"),this.product=cg(r,this.planConfigs,e==null?void 0:e.shopifyPlans)),!this.product){this.state="error",V("Product not found",{error:{productId:this.productId,cdnProduct:r,previewType:this.preview}},"warning");return}!this.product.hasOnetimePlan&&((i=this.settings)==null?void 0:i.defaultSelection)===$.Onetime&&(this.purchaseOption=$.Subscription);const n=this.product.variantLevelPlans[this.variantId];if(n==null){V("There are no variants for this product",{details:{productId:this.productId,variantId:this.variantId}},"critical"),this.state="error";return}!this.sellingPlanId&&n.length>0&&this.purchaseOption===$.Subscription&&this._handleSellingPlanChange(n[0].external_plan_id),this.state="ready"}_getOnetime(){var i;if(!((i=this.product)!=null&&i.hasOnetimePlan))return null;const t=ui(this.variantId,this.product),e=this.purchaseOption===$.Onetime;if(this.settings==null)return y;const r=e?` ${p.PurchaseOptionSelected}`:"",n=!si(this.settings.onetimeDrawbacks);return _`
      <div
        class="rc-purchase-option rc-selection__onetime"
        part="${p.PurchaseOption} ${p.OnetimePurchaseOption}${r}"
        ?rc-selected=${e}
        ?rc-not-selected=${!e}
      >
        <label class="rc-purchase-option__label" part="${p.OnetimePurchaseOptionLabel}">
          <div
            class="rc-purchase-option__selector"
            part="${p.PurchaseOptionSelector} ${p.OnetimePurchaseOptionSelector}"
          >
            <input
              type="radio"
              part="${p.OnetimePurchaseOptionInput}"
              name="purchaseOption"
              value="onetime"
              class="rc-purchase-option__input"
              .checked=${e}
              @input=${o=>{this._handlePurchaseOptionChange(o.target.value)}}
              aria-details=${n&&e?"rc-drawbacks":y}
            />
            <rc-radio-icon
              part="${p.OnetimePurchaseOptionCheckedIndicator}"
              ?checked=${e}
              class="rc-purchase-option__checked-indicator"
            ></rc-radio-icon>
            ${this.settings.onetimeLabel}
          </div>
          <div class="rc-purchase-option__prices" part="${p.OnetimePurchaseOptionPrices}">
            <span class="rc-price" part="${p.OnetimePurchaseOptionPrice}">${t}</span>
          </div>
        </label>
        ${e&&n?_`<div class="rc-purchase-option__sub-container" part="${p.OnetimePurchaseOptionSubContainer}">
              <rc-onetime-drawbacks
                id="rc-drawbacks"
                .unsafeHTML=${Cr(this.settings.onetimeDrawbacks,E.MaxDiscount,String(this.maxDiscount))}
                .compact=${this.settings.displayMode==="compact"}
                exportparts="${p.Drawbacks}"
              ></rc-onetime-drawbacks>
            </div>`:null}
      </div>
    `}_getSubscription(){var u,d,f,g,m;if(!this.product)return null;const t=this.purchaseOption===$.Subscription,e=!this.product.hasOnetimePlan,r=this.selectedVariantPlan.type==="prepaid_v2",n=((u=this.prices)==null?void 0:u.unit)!==((d=this.prices)==null?void 0:d.discounted)&&Number(this.selectedVariantPlan.discount_amount)>0,i=ui(this.variantId,this.product),o=((f=this.selectedVariantPlan.pricing_progression)==null?void 0:f.length)>0;if(this.settings==null)return y;const a=t?` ${p.PurchaseOptionSelected}`:"",s={"rc-purchase-option__label":!0,"single-selection":e,"rc-dynamic-pricing":o},c=!si(this.settings.benefits),l=!!this.badgeLabel;return _`
      <div
        class="rc-purchase-option rc-purchase-option__subscription"
        part="${p.PurchaseOption} ${p.SubscriptionPurchaseOption}${a}"
        ?rc-selected=${t}
        ?rc-not-selected=${!t}
      >
        ${l?_`<span
              id="rc-subscription-badge"
              class="rc-purchase-option__badge"
              part="${p.SubscriptionBadge}"
              >${this.badgeLabel}</span
            >`:null}
        <label class=${Fe(s)} part="${p.SubscriptionPurchaseOptionLabel}">
          <div
            class="rc-purchase-option__selector"
            part="${p.PurchaseOptionSelector} ${p.SubscriptionPurchaseOptionSelector}"
          >
            <input
              .hidden=${e}
              part="${p.SubscriptionPurchaseOptionInput}"
              type="radio"
              name="purchaseOption"
              value="subscription"
              class="rc-purchase-option__input"
              .checked=${t}
              @change=${w=>this._handlePurchaseOptionChange(w.target.value)}
              aria-details=${c&&t?"rc-benefits":y}
              aria-describedby=${l?"rc-subscription-badge":y}
            />
            ${this.product.hasOnetimePlan?_`<rc-radio-icon
                  part="${p.SubscriptionPurchaseOptionCheckedIndicator}"
                  ?checked=${t}
                  class="rc-purchase-option__checked-indicator"
                ></rc-radio-icon>`:null}
            ${Number(this.selectedVariantPlan.discount_amount)?this.settings.subscriptionWithDiscountLabel:this.settings.subscriptionWithoutDiscountLabel}
            ${this.settings.displayMode==="compact"?this._getLearnMoreLink():null}
          </div>
          <div class="rc-purchase-option__prices" part="${p.SubscriptionPurchaseOptionPrices}">
            ${n&&this.settings.showStrikethroughPrice&&(!r||this.settings.displayMode!=="compact")?_`
                  <span class="visually-hidden">Original price strikethrough: </span>
                  <span
                    class="rc-price strike-through text-muted"
                    part="${p.SubscriptionPurchaseOptionOriginalPrice}"
                  >
                    ${r?i:(g=this.prices)==null?void 0:g.unit}
                  </span>
                `:null}
            ${r?_` <span class="visually-hidden">Unit price per shipment: </span>
                  <span class="rc-price text-muted" part="${p.SubscriptionPurchaseOptionUnitPrice}">
                    ${this.settings.frequencyIntervalTranslation.prepaidUnit.replace(E.PrepaidUnitPrice,((m=this.prices)==null?void 0:m.unit)??"")}</span
                  >`:null}
            ${o&&this.dynamicPricingText?y:_`<span class="rc-price" part="${p.SubscriptionPurchaseOptionDiscountedPrice}">
                  ${n?_`<span class="visually-hidden">, Discounted price:</span>`:y}
                  ${this.staticPricingText}
                </span>`}
          </div>
        </label>
        ${o&&this.dynamicPricingText?_`<div
              class="rc-purchase-option__dynamic-price"
              part="${p.SubscriptionPurchaseOptionDynamicPrice}"
            >
              ${this.dynamicPricingText}
            </div>`:y}
        ${t?_`<div
              class="rc-purchase-option__sub-container"
              part="${p.SubscriptionPurchaseOptionSubContainer}"
            >
              ${this.settings.benefitsImage?_`<rc-benefits-image exportparts="${p.BenefitsImage}"></rc-benefits-image>`:null}
              ${c?_`<rc-benefits
                    id="rc-benefits"
                    exportparts="${p.BenefitsList}"
                    .unsafeHTML=${Cr(this.settings.benefits,E.Discount,xi(this.selectedVariantPlan))}
                    .compact=${this.settings.displayMode==="compact"}
                  ></rc-benefits>`:null}
              ${this.settings.displayMode==="compact"?null:this._getLearnMoreLink()}

              <rc-selling-plans
                exportparts="${p.PlansButton}, ${p.PlansButtonSelected}, ${p.PlansButtonGroup}, ${p.PlansButtonList}, ${p.PlansLabel}, ${p.PlansRadioButton}, ${p.PlansButtonDiscount}, ${p.PlansButtonInterval}, ${p.PlansDropdown}, ${p.PlansSelect}"
                .sellingPlans=${this.variantPlans}
                .value=${this.sellingPlanId}
                @planChange=${w=>this._handleSellingPlanChange(w.detail.sellingPlanId)}
              ></rc-selling-plans>
            </div>`:null}
      </div>
    `}_getLearnMoreLink(){var t;return(t=this.settings)!=null&&t.learnMoreText?_`<rc-learn-more
          exportparts="${p.LearnMoreModalContent}, ${p.LearnMoreModal}, ${p.LearnMoreModalCloseButton}, ${p.LearnMoreModalContentBody}, ${p.LearnMoreModalContainer}, ${p.LearnMore}, ${p.LearnMoreTrigger}, ${p.LearnMoreTriggerCompact}"
        ></rc-learn-more>`:y}_getDesignModeBanner(){var t;return this.preview?y:this.settings!=null&&ot(se.RechargePreview,this.settings)?_`<rc-design-mode-banner
        exportparts="${p.DesignModeBanner}, ${p.DesignModeBannerContent}, ${p.DesignModeBannerClose}, ${p.DesignModeBannerIcon}"
        type="info"
      >
        This is a preview of the widget, not a live version.
      </rc-design-mode-banner>`:!((t=Ve())!=null&&t.designMode)||this.settings==null?y:_`<rc-design-mode-banner
      exportparts="${p.DesignModeBanner}, ${p.DesignModeBannerContent}, ${p.DesignModeBannerClose}, ${p.DesignModeBannerIcon}"
      type="warning"
    >
      <div>
        This subscription widget is managed in Recharge. To modify this widget, please update the settings on your
        <a href="${ha}" target="_blank">Recharge Product Page</a>.${this.settings.use_theme_styles?" Colors can be modified in your Shopify theme settings.":y}
      </div>
    </rc-design-mode-banner>`}quantityUpsellTemplate(){var e;const t=[p.QuantityUpsellOption,p.QuantityUpsellOptionCheckedIndicator,p.QuantityUpsellOptionInput,p.QuantityUpsellOptionLabel,p.QuantityUpsellOptionSelected,p.QuantityUpsellOptionSelector,p.QuantityUpsellSavingsBadge,p.QuantityUpsellRecommendedBadge,p.QuantityUpsellBestValueBadge,p.BenefitsList,p.BenefitsImage,p.Drawbacks,p.LearnMore,p.LearnMoreTrigger,p.LearnMoreTriggerCompact,p.SubscriptionBadge].join(", ");return _`
      <div class=${Fe(this.classes)} part="${p.ContentWrap}" data-testid="quantity-upsell-container">
        <recharge-quantity-upsell
          .product=${this.product}
          .variantId=${this.variantId}
          .variantPlans=${this.variantPlans}
          .initialPlanId=${this.sellingPlanId}
          .hasOnetimePlan=${(e=this.product)==null?void 0:e.hasOnetimePlan}
          .maxDiscount=${this.maxDiscount}
          @quantityUpsellChange=${r=>this._handleSellingPlanChange(r.detail.planId)}
          exportparts="${t}"
        />
      </div>
    `}_applyCustomCssToRoot(){var t,e;try{const r=this.parentElement;this.styleBlock==null&&r&&r instanceof HTMLElement&&((t=this.settings)!=null&&t.customCSS)&&(this.styleBlock=document.createElement("style"),this.styleBlock.append(document.createTextNode(this.settings.customCSS)),r.append(this.styleBlock),v("Custom CSS applied to root",this.settings.customCSS))}catch(r){be("Error applying custom CSS to root",r,(e=this.settings)==null?void 0:e.customCSS),ge(r)}}_isConfigScriptTagValid(){var e,r,n,i,o,a,s,c;const t=T();return t==null?(this.preview?v("A subscription widget config is required to render the subscription widget. Please add a subscription widget config to your theme."):V("A subscription widget config is required to render the subscription widget. Please add a subscription widget config to your theme.",{scriptElement:{configScript:((r=(e=this.parentElement)==null?void 0:e.querySelector("script#SubscriptionWidgetConfig__shopify_settings"))==null?void 0:r.innerText)||"NO SCRIPT TAG FOUND!"}},"critical"),!1):t.shop==null?(V("The shopify context was not loaded correctly and the widget is not loading correctly",{scriptElement:{configScript:((i=(n=this.parentElement)==null?void 0:n.querySelector("script#SubscriptionWidgetConfig__shopify_settings"))==null?void 0:i.innerText)||"NO SCRIPT TAG FOUND!"}},"critical"),!1):(t.preview_config===void 0&&V("The preview config is not properly formatted",{scriptElement:{previewScript:((a=(o=this.parentElement)==null?void 0:o.querySelector("script#SubscriptionWidgetConfig__preview_config"))==null?void 0:a.innerText)||"NO SCRIPT TAG FOUND!"}},"warning"),t.configs===void 0?(V("The config is not properly formatted and the widget is not loading correctly",{scriptElement:{configScript:((c=(s=this.parentElement)==null?void 0:s.querySelector("script#SubscriptionWidgetConfig__configs"))==null?void 0:c.innerText)||"NO SCRIPT TAG FOUND!"}},"critical"),!1):!0)}_isWidgetVisibleInDOM(){const t=document.body.contains(this);return t||Y("The widget element is not part of the document DOM. The widget will not be displayed"),t}render(){var t;try{if(this.settings==null){if((t=Ve())!=null&&t.designMode)return _`<rc-design-mode-banner
            exportparts="${p.DesignModeBanner}, ${p.DesignModeBannerContent}, ${p.DesignModeBannerClose}, ${p.DesignModeBannerIcon}"
            type="warning"
          >
            <div>
              Please <a href="${ha}" target="_blank">activate a subscription widget</a> for this product
              template in Recharge to display subscription options.
            </div>
          </rc-design-mode-banner>`;{const r=this.closest(".shopify-block.recharge-subscription-widget");return r&&r instanceof HTMLElement&&(r.style.display="none"),null}}if(this.state==="init"||this.state==="error")return null;if(this._applyCustomCssToRoot(),this.state==="loading")return _`<div
          data-testid="style-root"
          style="${gi(oi(this.settings))}"
          part="${p.WidgetRoot}"
        >
          <rc-loading exportparts="${p.Loading}, ${p.LoadingIcon}"></rc-loading>
        </div>`;if(!this.product)return Y("The product is not loaded. The widget will not be displayed"),null;if(this.variantPlans.length===0)return v("The selected variant does not have any plans. The widget will not be displayed"),null;let e;return fa(this.product,this.settings)?e=this.quantityUpsellTemplate():this.selectedVariantPlan.type==="prepaid"?e=_`
          <div part="${p.PrepaidPlanTitle}">${this.selectedVariantPlan.title}</div>
          ${this._getLearnMoreLink()}
        `:this.settings.firstSelectionOption===$.Onetime?e=_`
          <div
            class=${Fe(this.classes)}
            ?rc-subscription-only=${!this.product.hasOnetimePlan}
            part="${p.ContentWrap}"
          >
            ${this._getOnetime()}${this._getSubscription()}
          </div>
        `:e=_`
          <div
            class=${Fe(this.classes)}
            ?rc-subscription-only=${!this.product.hasOnetimePlan}
            part="${p.ContentWrap}"
          >
            ${this._getSubscription()}${this._getOnetime()}
          </div>
        `,_`
        <div
          class="rc-widget__root"
          data-testid="style-root"
          style="${gi(oi(this.settings))}"
          part="${p.WidgetRoot}"
        >
          ${this._getDesignModeBanner()}
          <fieldset class="${p.PurchaseOptionGroup}" part="${p.PurchaseOptionGroup}">
            <legend class="visually-hidden">Purchase options</legend>
            ${e}
          </fieldset>
        </div>
      `}catch(e){return ge(e),y}}};q.styles=by;H([D({attribute:"product-id",type:Number})],q.prototype,"productId",2);H([D({attribute:"default-variant-id",type:Number})],q.prototype,"defaultVariantId",2);H([D({attribute:"default-selling-plan-id",type:Number})],q.prototype,"defaultSellingPlanId",2);H([D({attribute:"preview",type:String})],q.prototype,"preview",2);H([de()],q.prototype,"state",2);H([de()],q.prototype,"sellingPlanId",2);H([de()],q.prototype,"variantId",2);H([de()],q.prototype,"purchaseOption",2);H([Aa({context:tr}),de()],q.prototype,"settings",2);H([Aa({context:dy}),de()],q.prototype,"product",2);H([de()],q.prototype,"planConfigs",2);H([de()],q.prototype,"styleBlock",2);H([de()],q.prototype,"productForm",2);q=H([ie("recharge-subscription-widget")],q);var wy=Object.defineProperty,xy=Object.getOwnPropertyDescriptor,ec=(t,e,r,n)=>{for(var i=n>1?void 0:n?xy(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&wy(e,r,i),i};let kr=class extends U{constructor(){super(...arguments),this.isChecked=!1}render(){return this.isChecked?_`<svg width="1.15em" height="1.15em" viewBox="0 0 24 24" fill="none" class="rc-checked-icon">
        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none" />
        <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="var(--rc-widget-brand-color)" />
        <circle cx="12" cy="12" r="6" fill="var(--rc-widget-brand-color)" />
      </svg> `:_`<svg width="1.15em" height="1.15em" viewBox="0 0 24 24" fill="none" class="rc-unchecked-icon">
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="none" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="var(--rc-widget-brand-color-50)" />
    </svg>`}};kr.styles=X`
    :host {
      display: flex;
    }
  `;ec([D({type:Boolean,attribute:"checked"})],kr.prototype,"isChecked",2);kr=ec([ie("rc-radio-icon")],kr);var Sy=Object.defineProperty,Py=Object.getOwnPropertyDescriptor,Gi=(t,e,r,n)=>{for(var i=n>1?void 0:n?Py(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&Sy(e,r,i),i};let Ht=class extends U{constructor(){super(...arguments),this.unsafeHTML="",this.compact=!1}get classes(){return{compact:this.compact,"rc-benefits__list":!0}}render(){return _`
      <div class=${Fe(this.classes)} part="${p.Drawbacks}">${Qi(this.unsafeHTML)}</div>
    `}};Ht.styles=[X`
      :host {
        --rc-widget-bullet-icon-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkuMDYyNTYgMTUuNzExNUwxMi4wMDAxIDEyLjc3NEwxNC45Mzc2IDE1LjcxMTVMMTUuNzExNiAxNC45Mzc1TDEyLjc3NDEgMTJMMTUuNzExNiA5LjA2MjVMMTQuOTM3NiA4LjI4ODQ4TDEyLjAwMDEgMTEuMjI2TDkuMDYyNTYgOC4yODg0OEw4LjI4ODU0IDkuMDYyNUwxMS4yMjYgMTJMOC4yODg1NCAxNC45Mzc1TDkuMDYyNTYgMTUuNzExNVpNMTIuMDAxNSAxOS41ODMzQzEwLjk2MjEgMTkuNTgzMyA5Ljk4MTQ4IDE5LjM4NiA5LjA1OTcxIDE4Ljk5MTJDOC4xMzc5MiAxOC41OTY1IDcuMzMxMSAxOC4wNTM0IDYuNjM5MjUgMTcuMzYxOUM1Ljk0NzM5IDE2LjY3MDMgNS40MDQwMSAxNS44NjM5IDUuMDA5MSAxNC45NDI1QzQuNjE0MiAxNC4wMjEyIDQuNDE2NzUgMTMuMDQwOCA0LjQxNjc1IDEyLjAwMTRDNC40MTY3NSAxMC45NDgxIDQuNjE0MTEgOS45NjQwNiA1LjAwODgzIDkuMDQ5MjNDNS40MDM1NSA4LjEzNDM4IDUuOTQ2NjggNy4zMzEwNCA2LjYzODIxIDYuNjM5MTlDNy4zMjk3NSA1Ljk0NzMzIDguMTM2MiA1LjQwMzk0IDkuMDU3NTYgNS4wMDkwNEM5Ljk3ODkxIDQuNjE0MTQgMTAuOTU5MyA0LjQxNjY5IDExLjk5ODcgNC40MTY2OUMxMy4wNTE5IDQuNDE2NjkgMTQuMDM2IDQuNjE0MDUgMTQuOTUwOCA1LjAwODc3QzE1Ljg2NTcgNS40MDM0OSAxNi42NjkgNS45NDY2MiAxNy4zNjA5IDYuNjM4MTVDMTguMDUyNyA3LjMyOTY5IDE4LjU5NjEgOC4xMzI2NyAxOC45OTEgOS4wNDcwOEMxOS4zODU5IDkuOTYxNDkgMTkuNTgzNCAxMC45NDUzIDE5LjU4MzQgMTEuOTk4NkMxOS41ODM0IDEzLjAzOCAxOS4zODYgMTQuMDE4NiAxOC45OTEzIDE0Ljk0MDRDMTguNTk2NiAxNS44NjIxIDE4LjA1MzQgMTYuNjY5IDE3LjM2MTkgMTcuMzYwOEMxNi42NzA0IDE4LjA1MjcgMTUuODY3NCAxOC41OTYxIDE0Ljk1MyAxOC45OTFDMTQuMDM4NiAxOS4zODU5IDEzLjA1NDcgMTkuNTgzMyAxMi4wMDE1IDE5LjU4MzNaTTEyLjAwMDEgMTguNUMxMy44MDU2IDE4LjUgMTUuMzQwMyAxNy44NjgxIDE2LjYwNDIgMTYuNjA0MkMxNy44NjgxIDE1LjM0MDMgMTguNTAwMSAxMy44MDU2IDE4LjUwMDEgMTJDMTguNTAwMSAxMC4xOTQ0IDE3Ljg2ODEgOC42NTk3MiAxNi42MDQyIDcuMzk1ODNDMTUuMzQwMyA2LjEzMTk0IDEzLjgwNTYgNS41IDEyLjAwMDEgNS41QzEwLjE5NDUgNS41IDguNjU5NzggNi4xMzE5NCA3LjM5NTg5IDcuMzk1ODNDNi4xMzIgOC42NTk3MiA1LjUwMDA2IDEwLjE5NDQgNS41MDAwNiAxMkM1LjUwMDA2IDEzLjgwNTYgNi4xMzIgMTUuMzQwMyA3LjM5NTg5IDE2LjYwNDJDOC42NTk3OCAxNy44NjgxIDEwLjE5NDUgMTguNSAxMi4wMDAxIDE4LjVaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48L3N2Zz4=);
        --rc-widget-bullet-icon-image-color: #d30000;
      }
    `,Ys];Gi([D({type:String})],Ht.prototype,"unsafeHTML",2);Gi([D({type:Boolean})],Ht.prototype,"compact",2);Ht=Gi([ie("rc-onetime-drawbacks")],Ht);var Oy=Object.defineProperty,$y=Object.getOwnPropertyDescriptor,Ki=(t,e,r,n)=>{for(var i=n>1?void 0:n?$y(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&Oy(e,r,i),i};let Vt=class extends U{constructor(){super(...arguments),this.type="info",this.isVisible=!0}render(){const t={"rc-design-mode-banner":!0,[`rc_design-mode-banner__${this.type}`]:!0};return this.isVisible?_`
      <div
        role="alert"
        data-testid="design-mode-banner"
        class=${Fe(t)}
        part="${p.DesignModeBanner}"
      >
        <div style="display: flex; align-items: flex-start; gap: 4px" part="${p.DesignModeBannerContent}">
          <span class="icon" part="${p.DesignModeBannerIcon}">
            <svg viewBox="0 0 20 20" focusable="false" style="display:block">
              <path
                id="info"
                d="M11.4584 15.7917H12.5416V11.0001H11.4584V15.7917ZM11.9956 9.74046C12.1615 9.74046 12.302 9.68437 12.4171 9.57219C12.5322 9.45999 12.5897 9.32097 12.5897 9.15512C12.5897 8.98928 12.5336 8.84879 12.4214 8.73367C12.3093 8.61855 12.1702 8.561 12.0044 8.561C11.8385 8.561 11.698 8.6171 11.5829 8.72929C11.4678 8.84148 11.4103 8.9805 11.4103 9.14635C11.4103 9.3122 11.4664 9.45268 11.5786 9.56779C11.6907 9.6829 11.8298 9.74046 11.9956 9.74046ZM12.0071 19.5834C10.9639 19.5834 9.98142 19.386 9.05965 18.9913C8.13785 18.5966 7.33103 18.0534 6.63919 17.3619C5.94733 16.6704 5.40394 15.8642 5.00904 14.9434C4.61414 14.0227 4.41669 13.0388 4.41669 11.9919C4.41669 10.945 4.61405 9.96412 5.00877 9.04929C5.40349 8.13444 5.94662 7.3311 6.63815 6.63925C7.32969 5.94739 8.13585 5.40401 9.05662 5.0091C9.9774 4.6142 10.9612 4.41675 12.0081 4.41675C13.0551 4.41675 14.0359 4.61411 14.9508 5.00883C15.8656 5.40355 16.669 5.94668 17.3608 6.63821C18.0527 7.32975 18.5961 8.13428 18.991 9.05181C19.3859 9.96934 19.5833 10.9497 19.5833 11.9929C19.5833 13.0361 19.386 14.0186 18.9912 14.9404C18.5965 15.8622 18.0534 16.669 17.3619 17.3609C16.6703 18.0527 15.8658 18.5961 14.9482 18.991C14.0307 19.3859 13.0504 19.5834 12.0071 19.5834ZM12 18.5001C13.8056 18.5001 15.3403 17.8681 16.6042 16.6042C17.8681 15.3403 18.5 13.8056 18.5 12.0001C18.5 10.1945 17.8681 8.65978 16.6042 7.39589C15.3403 6.13201 13.8056 5.50006 12 5.50006C10.1944 5.50006 8.65972 6.13201 7.39583 7.39589C6.13194 8.65978 5.5 10.1945 5.5 12.0001C5.5 13.8056 6.13194 15.3403 7.39583 16.6042C8.65972 17.8681 10.1944 18.5001 12 18.5001Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <slot></slot>
        </div>
        <button
          type="button"
          class="close"
          part="${p.DesignModeBannerClose}"
          @click=${()=>this.isVisible=!1}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.0625 14.7115L5.28848 13.9375L9.22598 9.99997L5.28848 6.06247L6.0625 5.28845L10 9.22595L13.9375 5.28845L14.7115 6.06247L10.774 9.99997L14.7115 13.9375L13.9375 14.7115L10 10.774L6.0625 14.7115Z"
              fill="#191D48"
            />
          </svg>
        </button>
      </div>
    `:y}};Vt.styles=X`
    .rc-design-mode-banner {
      border-radius: 4px;
      display: flex;
      gap: 4px;
      font-size: 14px;
      padding: 12px 16px;
      margin-bottom: 12px;
      justify-content: space-between;
      color: #191d48;
    }
    .rc-design-mode-banner span.icon {
      flex-shrink: 0;
      width: 20px;
      height: 22px;
      display: inherit;
    }

    .rc-design-mode-banner button.close {
      border-radius: 6px;
      cursor: pointer;
      display: block;
      border: 1.5px solid transparent;
      background-color: transparent;
      padding: 4px;
      height: 100%;
      line-height: 8px;
    }
    .rc-design-mode-banner button.close:focus,
    .rc-design-mode-banner button.close:hover {
      background-color: #e2e3ed;
      border-color: #060820;
    }

    .rc_design-mode-banner__info {
      border: 1px solid #3901f1;
      background-color: #e2e3ed;
    }
    .rc_design-mode-banner__info span.icon {
      color: #3901f1;
    }

    .rc_design-mode-banner__warning {
      border: 1px solid #e2e8f0;
      background-color: #feebc8;
    }
    .rc_design-mode-banner__warning span.icon {
      color: #dd6b20;
    }
  `;Ki([D({type:String,attribute:"type"})],Vt.prototype,"type",2);Ki([de()],Vt.prototype,"isVisible",2);Vt=Ki([ie("rc-design-mode-banner")],Vt);var My=Object.defineProperty,Ey=Object.getOwnPropertyDescriptor,xe=(t,e,r,n)=>{for(var i=n>1?void 0:n?Ey(e,r):e,o=t.length-1,a;o>=0;o--)(a=t[o])&&(i=(n?a(e,r,i):a(i))||i);return n&&i&&My(e,r,i),i};const Cy=X`
  .rc-quantity-upsell-option__label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
    padding: 20px;
  }

  .rc-quantity-upsell-option__selector {
    font-size: 0.875em;
    font-weight: 600;
    display: flex;
    align-items: start;
    line-height: 24px;
    width: 100%;
  }

  .rc-quantity-upsell-option__selector[rc-onetime] {
    line-height: 24px;
  }

  .rc-quantity-upsell-option {
    border: 1px solid var(--rc-widget-brand-color-50);
    border-radius: var(--rc-widget-card-radius);
    position: relative;
  }

  .rc-quantity-upsell-option[rc-selected] {
    border-color: var(--rc-widget-brand-color);
    background: var(--rc-widget-selected-bg-color);
    color: var(--rc-widget-selected-text-color);
  }

  .rc-quantity-upsell-option:not(:last-child) {
    margin-bottom: 1em;
  }

  input {
    clip: rect(0, 0, 0, 0);
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  input:focus-visible + .rc-quantity-upsell-option__checked-indicator {
    border-radius: 50%;
    box-shadow: 0 0 0 2px white, 0 0 0 3px var(--rc-widget-brand-color-50);
  }

  .rc-quantity-upsell-option__checked-indicator {
    margin-right: 8px;
    font-size: 21px;
  }

  .rc-quantity-upsell-option__content-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .rc-quantity-upsell-option__selector[rc-onetime] .rc-quantity-upsell-option__content-container {
    gap: 0px;
  }

  .rc-quantity-upsell-option__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .rc-quantity-upsell-option__title-container {
    display: flex;
    flex-direction: row;
  }

  .rc-quantity-upsell-option__title {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  ::part(rc-benefits__list),
  ::part(rc-drawbacks) {
    font-weight: 400;
  }

  .rc-purchase-option__recommended-badge {
    position: absolute;
    top: -0.875em;
    right: 1em;
    background: var(--rc-widget-recommended-badge-bg-color);
    color: var(--rc-widget-recommended-badge-text-color);
    font-size: 0.875em;
    font-weight: 600;
    line-height: 1.5em;
    border-radius: 16px;
    border: 1px solid var(--rc-widget-recommended-badge-outline-color);
    padding: 0 0.5em;
  }

  .rc-purchase-option__best-value-badge {
    position: absolute;
    top: -0.875em;
    right: 1em;
    background: var(--rc-widget-best-value-badge-bg-color);
    color: var(--rc-widget-best-value-badge-text-color);
    font-size: 0.875em;
    font-weight: 600;
    line-height: 1.5em;
    border-radius: 16px;
    border: 1px solid var(--rc-widget-best-value-badge-outline-color);
    padding: 0 0.5em;
  }

  .rc-purchase-option__plan-discount-badge {
    background: var(--rc-widget-savings-badge-bg-color);
    color: var(--rc-widget-savings-badge-text-color);
    font-size: 0.875em;
    font-weight: 600;
    line-height: 1.5em;
    border-radius: 16px;
    border: 1px solid var(--rc-widget-savings-badge-outline-color);
    padding: 0 0.5em;
    width: fit-content;
  }

  .learn-more__compact {
    height: 24px;
  }
`;let K=class extends U{constructor(){super(...arguments),this.variantPlans=[],this.maxDiscount=""}connectedCallback(){super.connectedCallback(),this.value=this.initialPlanId}get isCompact(){var t;return((t=this.settings)==null?void 0:t.displayMode)==="compact"}handleChange(t){this.value=Number(t);const e=new CustomEvent(K.events.quantityUpsellChange,{detail:{planId:this.value},bubbles:!0,composed:!0});this.dispatchEvent(e)}recommendedText(t){var e,r,n,i;if(!(t!==0||!((r=(e=this.settings)==null?void 0:e.quantity_upsell)!=null&&r.badgeRecommended)))return(i=(n=this.settings)==null?void 0:n.quantity_upsell)==null?void 0:i.badgeRecommendedText}bestValueText(t){var e,r,n,i;if(!(t!==1||!((r=(e=this.settings)==null?void 0:e.quantity_upsell)!=null&&r.badgeBestValue)))return(i=(n=this.settings)==null?void 0:n.quantity_upsell)==null?void 0:i.badgeBestValueText}savingsBadgeText(t){var e,r,n,i;if(!(!((r=(e=this.settings)==null?void 0:e.quantity_upsell)!=null&&r.badgeSavingPercentage)||!Number(t.discount_amount)))return(i=(n=this.settings)==null?void 0:n.quantity_upsell)==null?void 0:i.badgeSavingPercentageText.replace(E.Discount,`${Number(t.discount_amount)}%`)}getFormattedQuantityUpsellPrice(t,e){var n;const r=T();return r!=null&&r.formattedPrices?((n=r.formattedPrices[t].sellingPlans[e].quantityUpsell)==null?void 0:n.totalDiscountedPrice)??"":""}learnMoreLinkTemplate(){var t;return(t=this.settings)!=null&&t.learnMoreText?_`<rc-learn-more
          exportparts="${p.LearnMoreModalContent}, ${p.LearnMoreModal}, ${p.LearnMoreModalCloseButton}, ${p.LearnMoreModalContentBody}, ${p.LearnMoreModalContainer}, ${p.LearnMore}, ${p.LearnMoreTrigger}, ${p.LearnMoreTriggerCompact}"
          class="learn-more__compact"
        ></rc-learn-more>`:y}benefitsTemplate(t){if(!t.product_quantity||!t.interval_unit||!this.settings||!this.variantId||!this.product||si(this.settings.benefits))return y;const e=Wi(this.product,this.variantId,t.external_plan_id);if(!e.quantityUpsell)return y;const r=_y(t,this.settings.frequencyIntervalTranslation,this.settings.benefits,e.discounted,e.quantityUpsell.totalDiscountAmount);return _`<rc-benefits
      exportparts="${p.BenefitsList}"
      .unsafeHTML=${r}
      .compact=${this.isCompact}
    />`}drawbacksTemplate(){if(!this.settings)return y;const t=Cr(this.settings.onetimeDrawbacks,E.MaxDiscount,this.maxDiscount);return _`<rc-onetime-drawbacks
      exportparts="${p.Drawbacks}"
      .unsafeHTML=${t}
      .compact=${this.isCompact}
    />`}subscriptionPlanTemplate(t,e,r,n,i,o,a){var l,u,d;const s=(l=this.settings)!=null&&l.onlyDisplayBenefitsOnSelected?t:!0,c=(u=this.settings)!=null&&u.benefitsImage?(d=this.settings)!=null&&d.onlyDisplayBenefitsOnSelected?t:!0:!1;return _`
      <div
        class="rc-quantity-upsell-option"
        part="${p.QuantityUpsellOption}${e}"
        ?rc-selected=${t}
        ?rc-not-selected=${!t}
      >
        ${i?_`<span
              class="rc-purchase-option__recommended-badge"
              aria-hidden="true"
              part="${p.QuantityUpsellRecommendedBadge} ${p.SubscriptionBadge}"
            >
              ${i}
            </span>`:y}
        ${o?_`<span
              class="rc-purchase-option__best-value-badge"
              aria-hidden="true"
              part="${p.QuantityUpsellBestValueBadge} ${p.SubscriptionBadge}"
            >
              ${o}
            </span>`:y}
        <label class="rc-quantity-upsell-option__label" part="${p.QuantityUpsellOptionLabel}">
          <div class="rc-quantity-upsell-option__selector" part="${p.QuantityUpsellOptionSelector}">
            <input
              part="${p.QuantityUpsellOptionInput}"
              type="radio"
              name="quantityUpsellOption"
              value=${r.external_plan_id}
              class="rc-quantity-upsell-option__input"
              .checked=${t}
              @change=${f=>this.handleChange(f.target.value)}
            />
            <rc-radio-icon
              part="${p.QuantityUpsellOptionCheckedIndicator}"
              ?checked=${t}
              class="rc-quantity-upsell-option__checked-indicator"
            ></rc-radio-icon>
            <div class="rc-quantity-upsell-option__content-container">
              <div class="rc-quantity-upsell-option__header">
                <div class="rc-quantity-upsell-option__title-container">
                  <div class="rc-quantity-upsell-option__title">
                    ${r.title}
                    ${a?_`<span
                          class="rc-purchase-option__plan-discount-badge"
                          part="${p.QuantityUpsellSavingsBadge}"
                          >${a}</span
                        >`:y}
                  </div>
                  ${this.isCompact&&t?this.learnMoreLinkTemplate():y}
                </div>
                <div>${n}</div>
              </div>
              ${c?_`<rc-benefits-image exportparts="${p.BenefitsImage}"></rc-benefits-image>`:null}
              ${s?this.benefitsTemplate(r):y}
              ${this.isCompact?y:t?this.learnMoreLinkTemplate():y}
            </div>
          </div>
        </label>
      </div>
    `}onetimePlanTemplate(){var i;if(!this.variantId||!this.product)return y;const t=!this.value,e=t?` ${p.QuantityUpsellOptionSelected}`:"",r=ui(this.variantId,this.product),n=(i=this.settings)!=null&&i.onlyDisplayBenefitsOnSelected&&this.settings.onetimeDrawbacks.length?t:!0;return _`
      <div
        class="rc-quantity-upsell-option"
        part="${p.QuantityUpsellOption}${e}"
        ?rc-selected=${t}
        ?rc-not-selected=${!t}
      >
        <label class="rc-quantity-upsell-option__label" part="${p.QuantityUpsellOptionLabel}">
          <div
            class="rc-quantity-upsell-option__selector"
            part="${p.QuantityUpsellOptionSelector}"
            rc-onetime
          >
            <input
              part="${p.QuantityUpsellOptionInput}"
              type="radio"
              name="quantityUpsellOption"
              value=${void 0}
              class="rc-quantity-upsell-option__input"
              .checked=${t}
              @change=${()=>this.handleChange(void 0)}
            />
            <rc-radio-icon
              part="${p.QuantityUpsellOptionCheckedIndicator}"
              ?checked=${t}
              class="rc-quantity-upsell-option__checked-indicator"
            ></rc-radio-icon>
            <div class="rc-quantity-upsell-option__content-container">
              <div class="rc-quantity-upsell-option__header">
                <div>One-time purchase</div>
                <div>${r}</div>
              </div>
              ${n?this.drawbacksTemplate():y}
            </div>
          </div>
        </label>
      </div>
    `}render(){var t;return!((t=this.settings)!=null&&t.quantity_upsell)||!this.variantPlans.length||!this.product||!this.variantId?y:_`<div>
      ${this.variantPlans.map((e,r)=>{const n=e.external_plan_id===this.value,i=n?` ${p.QuantityUpsellOptionSelected}`:"",o=this.getFormattedQuantityUpsellPrice(this.variantId,e.external_plan_id)??"";return this.subscriptionPlanTemplate(n,i,e,o,this.recommendedText(r),this.bestValueText(r),this.savingsBadgeText(e))})}
      ${this.hasOnetimePlan?this.onetimePlanTemplate():y}
    </div>`}};K.events={quantityUpsellChange:"quantityUpsellChange"};K.styles=Cy;xe([Lr({context:tr})],K.prototype,"settings",2);xe([D({type:Object})],K.prototype,"product",2);xe([D({type:Number})],K.prototype,"variantId",2);xe([D({type:Array})],K.prototype,"variantPlans",2);xe([D({type:Number})],K.prototype,"initialPlanId",2);xe([D({type:Boolean})],K.prototype,"hasOnetimePlan",2);xe([D({type:Number})],K.prototype,"value",2);xe([D()],K.prototype,"maxDiscount",2);K=xe([ie("recharge-quantity-upsell")],K)});export default Ty();
