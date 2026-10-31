(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mo="180",ph=0,Ko=1,mh=2,pc=1,mc=2,Cn=3,Wn=0,Oe=1,je=2,Ln=0,li=1,Je=2,Zo=3,Jo=4,gh=5,ii=100,vh=101,xh=102,_h=103,yh=104,Mh=200,Sh=201,wh=202,bh=203,Ta=204,Aa=205,Eh=206,Th=207,Ah=208,Ch=209,Rh=210,Ph=211,Lh=212,Dh=213,Ih=214,Ca=0,Ra=1,Pa=2,Hi=3,La=4,Da=5,Ia=6,Ua=7,gc=0,Uh=1,Nh=2,Gn=0,vc=1,xc=2,_c=3,So=4,yc=5,Mc=6,Sc=7,wc=300,Vi=301,Gi=302,Na=303,Fa=304,Pr=306,xs=1e3,ai=1001,Oa=1002,tn=1003,Fh=1004,Us=1005,vn=1006,Or=1007,oi=1008,yn=1009,bc=1010,Ec=1011,_s=1012,wo=1013,hi=1014,xn=1015,Dn=1016,bo=1017,Eo=1018,ys=1020,Tc=35902,Ac=35899,Cc=1021,Rc=1022,dn=1023,Ms=1026,Ss=1027,To=1028,Ao=1029,Pc=1030,Co=1031,Ro=1033,mr=33776,gr=33777,vr=33778,xr=33779,Ba=35840,ka=35841,za=35842,Ha=35843,Va=36196,Ga=37492,Wa=37496,Xa=37808,qa=37809,Ya=37810,$a=37811,Ka=37812,Za=37813,Ja=37814,ja=37815,Qa=37816,to=37817,eo=37818,no=37819,io=37820,so=37821,ro=36492,ao=36494,oo=36495,lo=36283,co=36284,ho=36285,uo=36286,Oh=3200,Bh=3201,Lc=0,kh=1,Vn="",Re="srgb",Wi="srgb-linear",Er="linear",ce="srgb",gi=7680,jo=519,zh=512,Hh=513,Vh=514,Dc=515,Gh=516,Wh=517,Xh=518,qh=519,fo=35044,Qo="300 es",_n=2e3,Tr=2001;class $i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Br=Math.PI/180,Ar=180/Math.PI;function In(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Zt(s,t,e){return Math.max(t,Math.min(e,s))}function Yh(s,t){return(s%t+t)%t}function kr(s,t,e){return(1-e)*s+e*t}function gn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ue(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class st{constructor(t=0,e=0){st.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ki{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*v,S=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const A=Math.sqrt(M),C=Math.atan2(A,p*S);m=Math.sin(m*C)/A,o=Math.sin(o*C)/A}const x=o*S;if(l=l*m+d*x,c=c*m+f*x,h=h*m+g*x,u=u*m+v*x,m===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,n=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zr.copy(this).projectOnVector(t),this.sub(zr)}reflect(t){return this.sub(zr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zr=new T,tl=new Ki;class qt{constructor(t,e,n,i,r,a,o,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],S=i[1],M=i[4],x=i[7],A=i[2],C=i[5],R=i[8];return r[0]=a*v+o*S+l*A,r[3]=a*m+o*M+l*C,r[6]=a*p+o*x+l*R,r[1]=c*v+h*S+u*A,r[4]=c*m+h*M+u*C,r[7]=c*p+h*x+u*R,r[2]=d*v+f*S+g*A,r[5]=d*m+f*M+g*C,r[8]=d*p+f*x+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*c-h*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(h*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Hr.makeScale(t,e)),this}rotate(t){return this.premultiply(Hr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Hr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Hr=new qt;function Ic(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Cr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function $h(){const s=Cr("canvas");return s.style.display="block",s}const el={};function ws(s){s in el||(el[s]=!0,console.warn(s))}function Kh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const nl=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),il=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zh(){const s={enabled:!0,workingColorSpace:Wi,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ce&&(i.r=Un(i.r),i.g=Un(i.g),i.b=Un(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ce&&(i.r=Oi(i.r),i.g=Oi(i.g),i.b=Oi(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Vn?Er:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ws("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ws("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Wi]:{primaries:t,whitePoint:n,transfer:Er,toXYZ:nl,fromXYZ:il,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Re},outputColorSpaceConfig:{drawingBufferColorSpace:Re}},[Re]:{primaries:t,whitePoint:n,transfer:ce,toXYZ:nl,fromXYZ:il,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Re}}}),s}const ne=Zh();function Un(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Oi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let vi;class Jh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{vi===void 0&&(vi=Cr("canvas")),vi.width=t.width,vi.height=t.height;const i=vi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Cr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jh=0;class Po{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=In(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Vr(i[a].image)):r.push(Vr(i[a]))}else r=Vr(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Vr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Jh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qh=0;const Gr=new T;class Be extends $i{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=ai,i=ai,r=vn,a=oi,o=dn,l=yn,c=Be.DEFAULT_ANISOTROPY,h=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=In(),this.name="",this.source=new Po(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Gr).x}get height(){return this.source.getSize(Gr).y}get depth(){return this.source.getSize(Gr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xs:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case Oa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xs:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case Oa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=wc;Be.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,x=(f+1)/2,A=(p+1)/2,C=(h+d)/4,R=(u+v)/4,L=(g+m)/4;return M>x&&M>A?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=C/n,r=R/n):x>A?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=C/i,r=L/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=R/r,i=L/r),this.set(n,i,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-v)/S,this.z=(d-h)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tu extends $i{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new Be(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new Po(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends tu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Uc extends Be{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class eu extends Be{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fi{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(r,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ns.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ns.copy(n.boundingBox)),Ns.applyMatrix4(t.matrixWorld),this.union(Ns)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ns),Fs.subVectors(this.max,ns),xi.subVectors(t.a,ns),_i.subVectors(t.b,ns),yi.subVectors(t.c,ns),Fn.subVectors(_i,xi),On.subVectors(yi,_i),$n.subVectors(xi,yi);let e=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-$n.z,$n.y,Fn.z,0,-Fn.x,On.z,0,-On.x,$n.z,0,-$n.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-$n.y,$n.x,0];return!Wr(e,xi,_i,yi,Fs)||(e=[1,0,0,0,1,0,0,0,1],!Wr(e,xi,_i,yi,Fs))?!1:(Os.crossVectors(Fn,On),e=[Os.x,Os.y,Os.z],Wr(e,xi,_i,yi,Fs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const wn=[new T,new T,new T,new T,new T,new T,new T,new T],ln=new T,Ns=new fi,xi=new T,_i=new T,yi=new T,Fn=new T,On=new T,$n=new T,ns=new T,Fs=new T,Os=new T,Kn=new T;function Wr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Kn.fromArray(s,r);const o=i.x*Math.abs(Kn.x)+i.y*Math.abs(Kn.y)+i.z*Math.abs(Kn.z),l=t.dot(Kn),c=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const nu=new fi,is=new T,Xr=new T;class Zi{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):nu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;is.subVectors(t,this.center);const e=is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(is.copy(t.center).add(Xr)),this.expandByPoint(is.copy(t.center).sub(Xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const bn=new T,qr=new T,Bs=new T,Bn=new T,Yr=new T,ks=new T,$r=new T;class Nc{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bn.copy(this.origin).addScaledVector(this.direction,e),bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){qr.copy(t).add(e).multiplyScalar(.5),Bs.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(qr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Bs),o=Bn.dot(this.direction),l=-Bn.dot(Bs),c=Bn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qr).addScaledVector(Bs,d),f}intersectSphere(t,e){bn.subVectors(t.center,this.origin);const n=bn.dot(this.direction),i=bn.dot(bn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,bn)!==null}intersectTriangle(t,e,n,i,r){Yr.subVectors(e,t),ks.subVectors(n,t),$r.crossVectors(Yr,ks);let a=this.direction.dot($r),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bn.subVectors(this.origin,t);const l=o*this.direction.dot(ks.crossVectors(Bn,ks));if(l<0)return null;const c=o*this.direction.dot(Yr.cross(Bn));if(c<0||l+c>a)return null;const h=-o*Bn.dot($r);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class oe{constructor(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m){oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m)}set(t,e,n,i,r,a,o,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new oe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),a=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(iu,t,su)}lookAt(t,e,n){const i=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),kn.crossVectors(n,Ke),kn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),kn.crossVectors(n,Ke)),kn.normalize(),zs.crossVectors(Ke,kn),i[0]=kn.x,i[4]=zs.x,i[8]=Ke.x,i[1]=kn.y,i[5]=zs.y,i[9]=Ke.y,i[2]=kn.z,i[6]=zs.z,i[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],S=n[3],M=n[7],x=n[11],A=n[15],C=i[0],R=i[4],L=i[8],w=i[12],y=i[1],D=i[5],U=i[9],V=i[13],F=i[2],B=i[6],z=i[10],W=i[14],H=i[3],Z=i[7],et=i[11],ft=i[15];return r[0]=a*C+o*y+l*F+c*H,r[4]=a*R+o*D+l*B+c*Z,r[8]=a*L+o*U+l*z+c*et,r[12]=a*w+o*V+l*W+c*ft,r[1]=h*C+u*y+d*F+f*H,r[5]=h*R+u*D+d*B+f*Z,r[9]=h*L+u*U+d*z+f*et,r[13]=h*w+u*V+d*W+f*ft,r[2]=g*C+v*y+m*F+p*H,r[6]=g*R+v*D+m*B+p*Z,r[10]=g*L+v*U+m*z+p*et,r[14]=g*w+v*V+m*W+p*ft,r[3]=S*C+M*y+x*F+A*H,r[7]=S*R+M*D+x*B+A*Z,r[11]=S*L+M*U+x*z+A*et,r[15]=S*w+M*V+x*W+A*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+v*(+e*l*f-e*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+e*c*u-e*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-e*l*u+e*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],S=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,M=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,x=h*v*c-g*u*c+g*o*f-a*v*f-h*o*p+a*u*p,A=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,C=e*S+n*M+i*x+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return t[0]=S*R,t[1]=(v*d*r-u*m*r-v*i*f+n*m*f+u*i*p-n*d*p)*R,t[2]=(o*m*r-v*l*r+v*i*c-n*m*c-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*R,t[4]=M*R,t[5]=(h*m*r-g*d*r+g*i*f-e*m*f-h*i*p+e*d*p)*R,t[6]=(g*l*r-a*m*r-g*i*c+e*m*c+a*i*p-e*l*p)*R,t[7]=(a*d*r-h*l*r+h*i*c-e*d*c-a*i*f+e*l*f)*R,t[8]=x*R,t[9]=(g*u*r-h*v*r-g*n*f+e*v*f+h*n*p-e*u*p)*R,t[10]=(a*v*r-g*o*r+g*n*c-e*v*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*f-e*o*f)*R,t[12]=A*R,t[13]=(h*v*i-g*u*i+g*n*d-e*v*d-h*n*m+e*u*m)*R,t[14]=(g*o*i-a*v*i-g*n*l+e*v*l+a*n*m-e*o*m)*R,t[15]=(a*u*i-h*o*i+h*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,v=a*h,m=a*u,p=o*u,S=l*c,M=l*h,x=l*u,A=n.x,C=n.y,R=n.z;return i[0]=(1-(v+p))*A,i[1]=(f+x)*A,i[2]=(g-M)*A,i[3]=0,i[4]=(f-x)*C,i[5]=(1-(d+p))*C,i[6]=(m+S)*C,i[7]=0,i[8]=(g+M)*R,i[9]=(m-S)*R,i[10]=(1-(d+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Mi.set(i[0],i[1],i[2]).length();const a=Mi.set(i[4],i[5],i[6]).length(),o=Mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],cn.copy(this);const c=1/r,h=1/a,u=1/o;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,e.setFromRotationMatrix(cn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=_n,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-i),d=(e+t)/(e-t),f=(n+i)/(n-i);let g,v;if(l)g=r/(a-r),v=a*r/(a-r);else if(o===_n)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Tr)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=_n,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-i),d=-(e+t)/(e-t),f=-(n+i)/(n-i);let g,v;if(l)g=1/(a-r),v=a/(a-r);else if(o===_n)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Tr)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Mi=new T,cn=new oe,iu=new T(0,0,0),su=new T(1,1,1),kn=new T,zs=new T,Ke=new T,sl=new oe,rl=new Ki;class an{constructor(t=0,e=0,n=0,i=an.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return sl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rl.setFromEuler(this),this.setFromQuaternion(rl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}an.DEFAULT_ORDER="XYZ";class Fc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ru=0;const al=new T,Si=new Ki,En=new oe,Hs=new T,ss=new T,au=new T,ou=new Ki,ol=new T(1,0,0),ll=new T(0,1,0),cl=new T(0,0,1),hl={type:"added"},lu={type:"removed"},wi={type:"childadded",child:null},Kr={type:"childremoved",child:null};class be extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=In(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new T,e=new an,n=new Ki,i=new T(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new oe},normalMatrix:{value:new qt}}),this.matrix=new oe,this.matrixWorld=new oe,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(ol,t)}rotateY(t){return this.rotateOnAxis(ll,t)}rotateZ(t){return this.rotateOnAxis(cl,t)}translateOnAxis(t,e){return al.copy(t).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ol,t)}translateY(t){return this.translateOnAxis(ll,t)}translateZ(t){return this.translateOnAxis(cl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Hs.copy(t):Hs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(ss,Hs,this.up):En.lookAt(Hs,ss,this.up),this.quaternion.setFromRotationMatrix(En),i&&(En.extractRotation(i.matrixWorld),Si.setFromRotationMatrix(En),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hl),wi.child=t,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lu),Kr.child=t,this.dispatchEvent(Kr),Kr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hl),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,t,au),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ss,ou,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}be.DEFAULT_UP=new T(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new T,Tn=new T,Zr=new T,An=new T,bi=new T,Ei=new T,ul=new T,Jr=new T,jr=new T,Qr=new T,ta=new fe,ea=new fe,na=new fe;class rn{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),hn.subVectors(t,e),i.cross(hn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){hn.subVectors(i,e),Tn.subVectors(n,e),Zr.subVectors(t,e);const a=hn.dot(hn),o=hn.dot(Tn),l=hn.dot(Zr),c=Tn.dot(Tn),h=Tn.dot(Zr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(a,An.y),l.addScaledVector(o,An.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return ta.setScalar(0),ea.setScalar(0),na.setScalar(0),ta.fromBufferAttribute(t,e),ea.fromBufferAttribute(t,n),na.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ta,r.x),a.addScaledVector(ea,r.y),a.addScaledVector(na,r.z),a}static isFrontFacing(t,e,n,i){return hn.subVectors(n,e),Tn.subVectors(t,e),hn.cross(Tn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),hn.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;bi.subVectors(i,n),Ei.subVectors(r,n),Jr.subVectors(t,n);const l=bi.dot(Jr),c=Ei.dot(Jr);if(l<=0&&c<=0)return e.copy(n);jr.subVectors(t,i);const h=bi.dot(jr),u=Ei.dot(jr);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(bi,a);Qr.subVectors(t,r);const f=bi.dot(Qr),g=Ei.dot(Qr);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ei,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ul.subVectors(r,i),o=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(ul,o);const p=1/(m+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(bi,a).addScaledVector(Ei,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Oc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function ia(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Re){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=ne.workingColorSpace){if(t=Yh(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ia(a,r,t+1/3),this.g=ia(a,r,t),this.b=ia(a,r,t-1/3)}return ne.colorSpaceToWorking(this,i),this}setStyle(t,e=Re){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Re){const n=Oc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Re){return ne.workingToColorSpace(Fe.copy(this),t),Math.round(Zt(Fe.r*255,0,255))*65536+Math.round(Zt(Fe.g*255,0,255))*256+Math.round(Zt(Fe.b*255,0,255))}getHexString(t=Re){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(Fe.copy(this),e);const n=Fe.r,i=Fe.g,r=Fe.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=Re){ne.workingToColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,i=Fe.b;return t!==Re?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(zn),this.setHSL(zn.h+t,zn.s+e,zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zn),t.getHSL(Vs);const n=kr(zn.h,Vs.h,e),i=kr(zn.s,Vs.s,e),r=kr(zn.l,Vs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new It;It.NAMES=Oc;let cu=0;class pi extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=In(),this.name="",this.type="Material",this.blending=li,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ta,this.blendDst=Aa,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==li&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ta&&(n.blendSrc=this.blendSrc),this.blendDst!==Aa&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Qe extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=gc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new T,Gs=new st;let hu=0;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fo,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Gs.fromBufferAttribute(this,e),Gs.applyMatrix3(t),this.setXY(e,Gs.x,Gs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array),r=ue(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fo&&(t.usage=this.usage),t}}class Bc extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class kc extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let uu=0;const sn=new oe,sa=new be,Ti=new T,Ze=new fi,rs=new fi,Ce=new T;class Me extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=In(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ic(t)?kc:Bc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new te(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Ze.min,rs.min),Ze.expandByPoint(Ce),Ce.addVectors(Ze.max,rs.max),Ze.expandByPoint(Ce)):(Ze.expandByPoint(rs.min),Ze.expandByPoint(rs.max))}Ze.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ce.fromBufferAttribute(o,c),l&&(Ti.fromBufferAttribute(t,c),Ce.add(Ti)),i=Math.max(i,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new T,l[L]=new T;const c=new T,h=new T,u=new T,d=new st,f=new st,g=new st,v=new T,m=new T;function p(L,w,y){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,L),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),o[L].add(v),o[w].add(v),o[y].add(v),l[L].add(m),l[w].add(m),l[y].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let L=0,w=S.length;L<w;++L){const y=S[L],D=y.start,U=y.count;for(let V=D,F=D+U;V<F;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const M=new T,x=new T,A=new T,C=new T;function R(L){A.fromBufferAttribute(i,L),C.copy(A);const w=o[L];M.copy(w),M.sub(A.multiplyScalar(A.dot(w))).normalize(),x.crossVectors(C,w);const D=x.dot(l[L])<0?-1:1;a.setXYZW(L,M.x,M.y,M.z,D)}for(let L=0,w=S.length;L<w;++L){const y=S[L],D=y.start,U=y.count;for(let V=D,F=D+U;V<F;V+=3)R(t.getX(V+0)),R(t.getX(V+1)),R(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new T,r=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Pe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dl=new oe,Zn=new Nc,Ws=new Zi,fl=new T,Xs=new T,qs=new T,Ys=new T,ra=new T,$s=new T,pl=new T,Ks=new T;class ot extends be{constructor(t=new Me,e=new Qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){$s.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(ra.fromBufferAttribute(u,t),a?$s.addScaledVector(ra,h):$s.addScaledVector(ra.sub(e),h))}e.add($s)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ws.copy(n.boundingSphere),Ws.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(Ws.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Ws,fl)===null||Zn.origin.distanceToSquared(fl)>(t.far-t.near)**2))&&(dl.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(dl),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=S,A=M;x<A;x+=3){const C=o.getX(x),R=o.getX(x+1),L=o.getX(x+2);i=Zs(this,p,t,n,c,h,u,C,R,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const S=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);i=Zs(this,a,t,n,c,h,u,S,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=S,A=M;x<A;x+=3){const C=x,R=x+1,L=x+2;i=Zs(this,p,t,n,c,h,u,C,R,L),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const S=m,M=m+1,x=m+2;i=Zs(this,a,t,n,c,h,u,S,M,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function du(s,t,e,n,i,r,a,o){let l;if(t.side===Oe?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===Wn,o),l===null)return null;Ks.copy(o),Ks.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Ks);return c<e.near||c>e.far?null:{distance:c,point:Ks.clone(),object:s}}function Zs(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Xs),s.getVertexPosition(l,qs),s.getVertexPosition(c,Ys);const h=du(s,t,e,n,Xs,qs,Ys,pl);if(h){const u=new T;rn.getBarycoord(pl,Xs,qs,Ys,u),i&&(h.uv=rn.getInterpolatedAttribute(i,o,l,c,u,new st)),r&&(h.uv1=rn.getInterpolatedAttribute(r,o,l,c,u,new st)),a&&(h.normal=rn.getInterpolatedAttribute(a,o,l,c,u,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new T,materialIndex:0};rn.getNormal(Xs,qs,Ys,d.normal),h.face=d,h.barycoord=u}return h}class De extends Me{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new te(c,3)),this.setAttribute("normal",new te(h,3)),this.setAttribute("uv",new te(u,2));function g(v,m,p,S,M,x,A,C,R,L,w){const y=x/R,D=A/L,U=x/2,V=A/2,F=C/2,B=R+1,z=L+1;let W=0,H=0;const Z=new T;for(let et=0;et<z;et++){const ft=et*D-V;for(let Pt=0;Pt<B;Pt++){const zt=Pt*y-U;Z[v]=zt*S,Z[m]=ft*M,Z[p]=F,c.push(Z.x,Z.y,Z.z),Z[v]=0,Z[m]=0,Z[p]=C>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Pt/R),u.push(1-et/L),W+=1}}for(let et=0;et<L;et++)for(let ft=0;ft<R;ft++){const Pt=d+ft+B*et,zt=d+ft+B*(et+1),$t=d+(ft+1)+B*(et+1),Jt=d+(ft+1)+B*et;l.push(Pt,zt,Jt),l.push(zt,$t,Jt),H+=6}o.addGroup(f,H,w),f+=H,d+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new De(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ve(s){const t={};for(let e=0;e<s.length;e++){const n=Xi(s[e]);for(const i in n)t[i]=n[i]}return t}function fu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function zc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const bs={clone:Xi,merge:Ve};var pu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Le extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pu,this.fragmentShader=mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Hc extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new oe,this.projectionMatrix=new oe,this.projectionMatrixInverse=new oe,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hn=new T,ml=new st,gl=new st;class We extends Hc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ar*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z),Hn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hn.x,Hn.y).multiplyScalar(-t/Hn.z)}getViewSize(t,e){return this.getViewBounds(t,ml,gl),e.subVectors(gl,ml)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Br*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ai=-90,Ci=1;class gu extends be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new We(Ai,Ci,t,e);i.layers=this.layers,this.add(i);const r=new We(Ai,Ci,t,e);r.layers=this.layers,this.add(r);const a=new We(Ai,Ci,t,e);a.layers=this.layers,this.add(a);const o=new We(Ai,Ci,t,e);o.layers=this.layers,this.add(o);const l=new We(Ai,Ci,t,e);l.layers=this.layers,this.add(l);const c=new We(Ai,Ci,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===_n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vc extends Be{constructor(t=[],e=Vi,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vu extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Vc(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new De(5,5,5),r=new Le({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:Ln});r.uniforms.tEquirect.value=e;const a=new ot(i,r),o=e.minFilter;return e.minFilter===oi&&(e.minFilter=vn),new gu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}class se extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xu={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xu)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Lo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new It(t),this.density=e}clone(){return new Lo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Gc extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class _u{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=fo,this.updateRanges=[],this.version=0,this.uuid=In()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=In()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ze=new T;class Rr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ue(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ue(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ue(e,this.array),n=ue(n,this.array),i=ue(i,this.array),r=ue(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Rr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ps extends pi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ri;const as=new T,Pi=new T,Li=new T,Di=new st,os=new st,Wc=new oe,Js=new T,ls=new T,js=new T,vl=new st,oa=new st,xl=new st;class _r extends be{constructor(t=new ps){if(super(),this.isSprite=!0,this.type="Sprite",Ri===void 0){Ri=new Me;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new _u(e,5);Ri.setIndex([0,1,2,0,2,3]),Ri.setAttribute("position",new Rr(n,3,0,!1)),Ri.setAttribute("uv",new Rr(n,2,3,!1))}this.geometry=Ri,this.material=t,this.center=new st(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),Wc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Li.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Li.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Qs(Js.set(-.5,-.5,0),Li,a,Pi,i,r),Qs(ls.set(.5,-.5,0),Li,a,Pi,i,r),Qs(js.set(.5,.5,0),Li,a,Pi,i,r),vl.set(0,0),oa.set(1,0),xl.set(1,1);let o=t.ray.intersectTriangle(Js,ls,js,!1,as);if(o===null&&(Qs(ls.set(-.5,.5,0),Li,a,Pi,i,r),oa.set(0,1),o=t.ray.intersectTriangle(Js,js,ls,!1,as),o===null))return;const l=t.ray.origin.distanceTo(as);l<t.near||l>t.far||e.push({distance:l,point:as.clone(),uv:rn.getInterpolation(as,Js,ls,js,vl,oa,xl,new st),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Qs(s,t,e,n,i,r){Di.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(os.x=r*Di.x-i*Di.y,os.y=i*Di.x+r*Di.y):os.copy(Di),s.copy(t),s.x+=os.x,s.y+=os.y,s.applyMatrix4(Wc)}class yu extends Be{constructor(t=null,e=1,n=1,i,r,a,o,l,c=tn,h=tn,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _l extends Pe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ii=new oe,yl=new oe,tr=[],Ml=new fi,Mu=new oe,cs=new ot,hs=new Zi;class la extends ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new _l(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Mu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),Ml.copy(t.boundingBox).applyMatrix4(Ii),this.boundingBox.union(Ml)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),hs.copy(t.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(hs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hs.copy(this.boundingSphere),hs.applyMatrix4(n),t.ray.intersectsSphere(hs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ii),yl.multiplyMatrices(n,Ii),cs.matrixWorld=yl,cs.raycast(t,tr);for(let a=0,o=tr.length;a<o;a++){const l=tr[a];l.instanceId=r,l.object=this,e.push(l)}tr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new _l(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new yu(new Float32Array(i*this.count),i,this.count,To,xn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ca=new T,Su=new T,wu=new qt;class ei{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ca.subVectors(n,e).cross(Su.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ca),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||wu.getNormalMatrix(t),i=this.coplanarPoint(ca).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jn=new Zi,bu=new st(.5,.5),er=new T;class Do{constructor(t=new ei,e=new ei,n=new ei,i=new ei,r=new ei,a=new ei){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_n,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],S=r[12],M=r[13],x=r[14],A=r[15];if(i[0].setComponents(c-a,f-h,p-g,A-S).normalize(),i[1].setComponents(c+a,f+h,p+g,A+S).normalize(),i[2].setComponents(c+o,f+u,p+v,A+M).normalize(),i[3].setComponents(c-o,f-u,p-v,A-M).normalize(),n)i[4].setComponents(l,d,m,x).normalize(),i[5].setComponents(c-l,f-d,p-m,A-x).normalize();else if(i[4].setComponents(c-l,f-d,p-m,A-x).normalize(),e===_n)i[5].setComponents(c+l,f+d,p+m,A+x).normalize();else if(e===Tr)i[5].setComponents(l,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jn)}intersectsSprite(t){Jn.center.set(0,0,0);const e=bu.distanceTo(t.center);return Jn.radius=.7071067811865476+e,Jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(er.x=i.normal.x>0?t.max.x:t.min.x,er.y=i.normal.y>0?t.max.y:t.min.y,er.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(er)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yr extends pi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Sl=new oe,po=new Nc,nr=new Zi,ir=new T;class Mr extends be{constructor(t=new Me,e=new yr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(i),nr.radius+=r,t.ray.intersectsSphere(nr)===!1)return;Sl.copy(i).invert(),po.copy(t.ray).applyMatrix4(Sl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);ir.fromBufferAttribute(u,m),wl(ir,m,l,i,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,v=f;g<v;g++)ir.fromBufferAttribute(u,g),wl(ir,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function wl(s,t,e,n,i,r,a){const o=po.distanceSqToPoint(s);if(o<e){const l=new T;po.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Xn extends Be{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xc extends Be{constructor(t,e,n=hi,i,r,a,o=tn,l=tn,c,h=Ms,u=1){if(h!==Ms&&h!==Ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Po(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class qc extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Io extends Me{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=e/2,u=Math.PI/2*t,d=e,f=2*u+d,g=n*2+r,v=i+1,m=new T,p=new T;for(let S=0;S<=g;S++){let M=0,x=0,A=0,C=0;if(S<=n){const w=S/n,y=w*Math.PI/2;x=-h-t*Math.cos(y),A=t*Math.sin(y),C=-t*Math.cos(y),M=w*u}else if(S<=n+r){const w=(S-n)/r;x=-h+w*e,A=t,C=0,M=u+w*d}else{const w=(S-n-r)/n,y=w*Math.PI/2;x=h+t*Math.sin(y),A=t*Math.cos(y),C=t*Math.sin(y),M=u+d+w*u}const R=Math.max(0,Math.min(1,M/f));let L=0;S===0?L=.5/i:S===g&&(L=-.5/i);for(let w=0;w<=i;w++){const y=w/i,D=y*Math.PI*2,U=Math.sin(D),V=Math.cos(D);p.x=-A*V,p.y=x,p.z=A*U,o.push(p.x,p.y,p.z),m.set(-A*V,C,A*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(y+L,R)}if(S>0){const w=(S-1)*v;for(let y=0;y<i;y++){const D=w+y,U=w+y+1,V=S*v+y,F=S*v+y+1;a.push(D,U,V),a.push(U,F,V)}}}this.setIndex(a),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class Es extends Me{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new T,h=new st;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(o,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Es(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ae extends Me{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;S(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new te(u,3)),this.setAttribute("normal",new te(d,3)),this.setAttribute("uv",new te(f,2));function S(){const x=new T,A=new T;let C=0;const R=(e-t)/n;for(let L=0;L<=r;L++){const w=[],y=L/r,D=y*(e-t)+t;for(let U=0;U<=i;U++){const V=U/i,F=V*l+o,B=Math.sin(F),z=Math.cos(F);A.x=D*B,A.y=-y*n+m,A.z=D*z,u.push(A.x,A.y,A.z),x.set(B,R,z).normalize(),d.push(x.x,x.y,x.z),f.push(V,1-y),w.push(g++)}v.push(w)}for(let L=0;L<i;L++)for(let w=0;w<r;w++){const y=v[w][L],D=v[w+1][L],U=v[w+1][L+1],V=v[w][L+1];(t>0||w!==0)&&(h.push(y,D,V),C+=3),(e>0||w!==r-1)&&(h.push(D,U,V),C+=3)}c.addGroup(p,C,0),p+=C}function M(x){const A=g,C=new st,R=new T;let L=0;const w=x===!0?t:e,y=x===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const D=g;for(let U=0;U<=i;U++){const F=U/i*l+o,B=Math.cos(F),z=Math.sin(F);R.x=w*z,R.y=m*y,R.z=w*B,u.push(R.x,R.y,R.z),d.push(0,y,0),C.x=B*.5+.5,C.y=z*.5*y+.5,f.push(C.x,C.y),g++}for(let U=0;U<i;U++){const V=A+U,F=D+U;x===!0?h.push(F,F+1,V):h.push(F+1,F,V),L+=3}c.addGroup(p,L,x===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ae(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ue extends ae{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ue(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ps extends Me{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new te(r,3)),this.setAttribute("normal",new te(r.slice(),3)),this.setAttribute("uv",new te(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const M=new T,x=new T,A=new T;for(let C=0;C<e.length;C+=3)f(e[C+0],M),f(e[C+1],x),f(e[C+2],A),l(M,x,A,S)}function l(S,M,x,A){const C=A+1,R=[];for(let L=0;L<=C;L++){R[L]=[];const w=S.clone().lerp(x,L/C),y=M.clone().lerp(x,L/C),D=C-L;for(let U=0;U<=D;U++)U===0&&L===C?R[L][U]=w:R[L][U]=w.clone().lerp(y,U/D)}for(let L=0;L<C;L++)for(let w=0;w<2*(C-L)-1;w++){const y=Math.floor(w/2);w%2===0?(d(R[L][y+1]),d(R[L+1][y]),d(R[L][y])):(d(R[L][y+1]),d(R[L+1][y+1]),d(R[L+1][y]))}}function c(S){const M=new T;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(S),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function h(){const S=new T;for(let M=0;M<r.length;M+=3){S.x=r[M+0],S.y=r[M+1],S.z=r[M+2];const x=m(S)/2/Math.PI+.5,A=p(S)/Math.PI+.5;a.push(x,1-A)}g(),u()}function u(){for(let S=0;S<a.length;S+=6){const M=a[S+0],x=a[S+2],A=a[S+4],C=Math.max(M,x,A),R=Math.min(M,x,A);C>.9&&R<.1&&(M<.2&&(a[S+0]+=1),x<.2&&(a[S+2]+=1),A<.2&&(a[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function f(S,M){const x=S*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function g(){const S=new T,M=new T,x=new T,A=new T,C=new st,R=new st,L=new st;for(let w=0,y=0;w<r.length;w+=9,y+=6){S.set(r[w+0],r[w+1],r[w+2]),M.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),C.set(a[y+0],a[y+1]),R.set(a[y+2],a[y+3]),L.set(a[y+4],a[y+5]),A.copy(S).add(M).add(x).divideScalar(3);const D=m(A);v(C,y+0,S,D),v(R,y+2,M,D),v(L,y+4,x,D)}}function v(S,M,x,A){A<0&&S.x===1&&(a[M]=S.x-1),x.x===0&&x.z===0&&(a[M]=A/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.vertices,t.indices,t.radius,t.details)}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new st:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new T,i=[],r=[],a=[],o=new T,l=new oe;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new T)}r[0]=new T,a[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Zt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Zt(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Uo extends Mn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new st){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Eu extends Uo{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function No(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const sr=new T,ha=new No,ua=new No,da=new No;class Tu extends Mn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new T){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(sr.subVectors(i[0],i[1]).add(i[0]),c=sr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(sr.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=sr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ha.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),ua.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),da.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(ha.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ua.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),da.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(ha.calc(l),ua.calc(l),da.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new T().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Au(s,t){const e=1-s;return e*e*t}function Cu(s,t){return 2*(1-s)*s*t}function Ru(s,t){return s*s*t}function ms(s,t,e,n){return Au(s,t)+Cu(s,e)+Ru(s,n)}function Pu(s,t){const e=1-s;return e*e*e*t}function Lu(s,t){const e=1-s;return 3*e*e*s*t}function Du(s,t){return 3*(1-s)*s*s*t}function Iu(s,t){return s*s*s*t}function gs(s,t,e,n,i){return Pu(s,t)+Lu(s,e)+Du(s,n)+Iu(s,i)}class Yc extends Mn{constructor(t=new st,e=new st,n=new st,i=new st){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new st){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(gs(t,i.x,r.x,a.x,o.x),gs(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Uu extends Mn{constructor(t=new T,e=new T,n=new T,i=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new T){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(gs(t,i.x,r.x,a.x,o.x),gs(t,i.y,r.y,a.y,o.y),gs(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $c extends Mn{constructor(t=new st,e=new st){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new st){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new st){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nu extends Mn{constructor(t=new T,e=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new T){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new T){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kc extends Mn{constructor(t=new st,e=new st,n=new st){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new st){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ms(t,i.x,r.x,a.x),ms(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fu extends Mn{constructor(t=new T,e=new T,n=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new T){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(ms(t,i.x,r.x,a.x),ms(t,i.y,r.y,a.y),ms(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zc extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new st){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(bl(o,l.x,c.x,h.x,u.x),bl(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new st().fromArray(i))}return this}}var mo=Object.freeze({__proto__:null,ArcCurve:Eu,CatmullRomCurve3:Tu,CubicBezierCurve:Yc,CubicBezierCurve3:Uu,EllipseCurve:Uo,LineCurve:$c,LineCurve3:Nu,QuadraticBezierCurve:Kc,QuadraticBezierCurve3:Fu,SplineCurve:Zc});class Ou extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new mo[i.type]().fromJSON(i))}return this}}class El extends Ou{constructor(t){super(),this.type="Path",this.currentPoint=new st,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new $c(this.currentPoint.clone(),new st(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Kc(this.currentPoint.clone(),new st(t,e),new st(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Yc(this.currentPoint.clone(),new st(t,e),new st(n,i),new st(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Zc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const c=new Uo(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ji extends El{constructor(t){super(t),this.uuid=In(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new El().fromJSON(i))}return this}}function Bu(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Jc(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Gu(s,t,r,e)),s.length>80*e){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=e;d<i;d+=e){const f=s[d],g=s[d+1];f<o&&(o=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return Ts(r,a,e,o,l,c,0),a}function Jc(s,t,e,n,i){let r;if(i===td(s,t,e,n)>0)for(let a=t;a<e;a+=n)r=Tl(a/n|0,s[a],s[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Tl(a/n|0,s[a],s[a+1],r);return r&&qi(r,r.next)&&(Cs(r),r=r.next),r}function ui(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(qi(e,e.next)||ye(e.prev,e,e.next)===0)){if(Cs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ts(s,t,e,n,i,r,a){if(!s)return;!a&&r&&$u(s,n,i,r);let o=s;for(;s.prev!==s.next;){const l=s.prev,c=s.next;if(r?zu(s,n,i,r):ku(s)){t.push(l.i,s.i,c.i),Cs(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Hu(ui(s),t),Ts(s,t,e,n,i,r,2)):a===2&&Vu(s,t,e,n,i,r):Ts(ui(s),t,e,n,i,r,1);break}}}function ku(s){const t=s.prev,e=s,n=s.next;if(ye(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(i,r,a),u=Math.min(o,l,c),d=Math.max(i,r,a),f=Math.max(o,l,c);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&ds(i,o,r,l,a,c,g.x,g.y)&&ye(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function zu(s,t,e,n){const i=s.prev,r=s,a=s.next;if(ye(i,r,a)>=0)return!1;const o=i.x,l=r.x,c=a.x,h=i.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),v=Math.max(o,l,c),m=Math.max(h,u,d),p=go(f,g,t,e,n),S=go(v,m,t,e,n);let M=s.prevZ,x=s.nextZ;for(;M&&M.z>=p&&x&&x.z<=S;){if(M.x>=f&&M.x<=v&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ds(o,h,l,u,c,d,M.x,M.y)&&ye(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&ds(o,h,l,u,c,d,x.x,x.y)&&ye(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=v&&M.y>=g&&M.y<=m&&M!==i&&M!==a&&ds(o,h,l,u,c,d,M.x,M.y)&&ye(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=S;){if(x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&ds(o,h,l,u,c,d,x.x,x.y)&&ye(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Hu(s,t){let e=s;do{const n=e.prev,i=e.next.next;!qi(n,i)&&Qc(n,e,e.next,i)&&As(n,i)&&As(i,n)&&(t.push(n.i,e.i,i.i),Cs(e),Cs(e.next),e=s=i),e=e.next}while(e!==s);return ui(e)}function Vu(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ju(a,o)){let l=th(a,o);a=ui(a,a.next),l=ui(l,l.next),Ts(a,t,e,n,i,r,0),Ts(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Gu(s,t,e,n){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,c=Jc(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Zu(c))}i.sort(Wu);for(let r=0;r<i.length;r++)e=Xu(i[r],e);return e}function Wu(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){const n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Xu(s,t){const e=qu(s,t);if(!e)return t;const n=th(e,s);return ui(n,n.next),ui(e,e.next)}function qu(s,t){let e=t;const n=s.x,i=s.y;let r=-1/0,a;if(qi(s,e))return e;do{if(qi(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){const u=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,a=e.x<e.next.x?e:e.next,u===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&jc(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){const u=Math.abs(i-e.y)/(n-e.x);As(e,s)&&(u<h||u===h&&(e.x>a.x||e.x===a.x&&Yu(a,e)))&&(a=e,h=u)}e=e.next}while(e!==o);return a}function Yu(s,t){return ye(s.prev,s,t.prev)<0&&ye(t.next,s,s.next)<0}function $u(s,t,e,n){let i=s;do i.z===0&&(i.z=go(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Ku(i)}function Ku(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,e*=2}while(t>1);return s}function go(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Zu(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function jc(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function ds(s,t,e,n,i,r,a,o){return!(s===a&&t===o)&&jc(s,t,e,n,i,r,a,o)}function Ju(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!ju(s,t)&&(As(s,t)&&As(t,s)&&Qu(s,t)&&(ye(s.prev,s,t.prev)||ye(s,t.prev,t))||qi(s,t)&&ye(s.prev,s,s.next)>0&&ye(t.prev,t,t.next)>0)}function ye(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function qi(s,t){return s.x===t.x&&s.y===t.y}function Qc(s,t,e,n){const i=ar(ye(s,t,e)),r=ar(ye(s,t,n)),a=ar(ye(e,n,s)),o=ar(ye(e,n,t));return!!(i!==r&&a!==o||i===0&&rr(s,e,t)||r===0&&rr(s,n,t)||a===0&&rr(e,s,n)||o===0&&rr(e,t,n))}function rr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ar(s){return s>0?1:s<0?-1:0}function ju(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Qc(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function As(s,t){return ye(s.prev,s,s.next)<0?ye(s,t,s.next)>=0&&ye(s,s.prev,t)>=0:ye(s,t,s.prev)<0||ye(s,s.next,t)<0}function Qu(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function th(s,t){const e=vo(s.i,s.x,s.y),n=vo(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Tl(s,t,e,n){const i=vo(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Cs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function vo(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function td(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class ed{static triangulate(t,e,n=2){return Bu(t,e,n)}}class Pn{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Pn.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Al(t),Cl(n,t);let a=t.length;e.forEach(Al);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Cl(n,e[l]);const o=ed.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Al(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Cl(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Ls extends Me{constructor(t=new Ji([new st(.5,.5),new st(-.5,.5),new st(-.5,-.5),new st(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new te(i,3)),this.setAttribute("uv",new te(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:nd;let M,x=!1,A,C,R,L;p&&(M=p.getSpacedPoints(h),x=!0,d=!1,A=p.computeFrenetFrames(h,!1),C=new T,R=new T,L=new T),d||(m=0,f=0,g=0,v=0);const w=o.extractPoints(c);let y=w.shape;const D=w.holes;if(!Pn.isClockWise(y)){y=y.reverse();for(let it=0,Q=D.length;it<Q;it++){const j=D[it];Pn.isClockWise(j)&&(D[it]=j.reverse())}}function V(it){const j=10000000000000001e-36;let J=it[0];for(let mt=1;mt<=it.length;mt++){const lt=mt%it.length,gt=it[lt],Vt=gt.x-J.x,Ht=gt.y-J.y,E=Vt*Vt+Ht*Ht,_=Math.max(Math.abs(gt.x),Math.abs(gt.y),Math.abs(J.x),Math.abs(J.y)),k=j*_*_;if(E<=k){it.splice(lt,1),mt--;continue}J=gt}}V(y),D.forEach(V);const F=D.length,B=y;for(let it=0;it<F;it++){const Q=D[it];y=y.concat(Q)}function z(it,Q,j){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(Q,j)}const W=y.length;function H(it,Q,j){let J,mt,lt;const gt=it.x-Q.x,Vt=it.y-Q.y,Ht=j.x-it.x,E=j.y-it.y,_=gt*gt+Vt*Vt,k=gt*E-Vt*Ht;if(Math.abs(k)>Number.EPSILON){const q=Math.sqrt(_),nt=Math.sqrt(Ht*Ht+E*E),$=Q.x-Vt/q,Lt=Q.y+gt/q,pt=j.x-E/nt,At=j.y+Ht/nt,Ct=((pt-$)*E-(At-Lt)*Ht)/(gt*E-Vt*Ht);J=$+gt*Ct-it.x,mt=Lt+Vt*Ct-it.y;const ct=J*J+mt*mt;if(ct<=2)return new st(J,mt);lt=Math.sqrt(ct/2)}else{let q=!1;gt>Number.EPSILON?Ht>Number.EPSILON&&(q=!0):gt<-Number.EPSILON?Ht<-Number.EPSILON&&(q=!0):Math.sign(Vt)===Math.sign(E)&&(q=!0),q?(J=-Vt,mt=gt,lt=Math.sqrt(_)):(J=gt,mt=Vt,lt=Math.sqrt(_/2))}return new st(J/lt,mt/lt)}const Z=[];for(let it=0,Q=B.length,j=Q-1,J=it+1;it<Q;it++,j++,J++)j===Q&&(j=0),J===Q&&(J=0),Z[it]=H(B[it],B[j],B[J]);const et=[];let ft,Pt=Z.concat();for(let it=0,Q=F;it<Q;it++){const j=D[it];ft=[];for(let J=0,mt=j.length,lt=mt-1,gt=J+1;J<mt;J++,lt++,gt++)lt===mt&&(lt=0),gt===mt&&(gt=0),ft[J]=H(j[J],j[lt],j[gt]);et.push(ft),Pt=Pt.concat(ft)}let zt;if(m===0)zt=Pn.triangulateShape(B,D);else{const it=[],Q=[];for(let j=0;j<m;j++){const J=j/m,mt=f*Math.cos(J*Math.PI/2),lt=g*Math.sin(J*Math.PI/2)+v;for(let gt=0,Vt=B.length;gt<Vt;gt++){const Ht=z(B[gt],Z[gt],lt);Ut(Ht.x,Ht.y,-mt),J===0&&it.push(Ht)}for(let gt=0,Vt=F;gt<Vt;gt++){const Ht=D[gt];ft=et[gt];const E=[];for(let _=0,k=Ht.length;_<k;_++){const q=z(Ht[_],ft[_],lt);Ut(q.x,q.y,-mt),J===0&&E.push(q)}J===0&&Q.push(E)}}zt=Pn.triangulateShape(it,Q)}const $t=zt.length,Jt=g+v;for(let it=0;it<W;it++){const Q=d?z(y[it],Pt[it],Jt):y[it];x?(R.copy(A.normals[0]).multiplyScalar(Q.x),C.copy(A.binormals[0]).multiplyScalar(Q.y),L.copy(M[0]).add(R).add(C),Ut(L.x,L.y,L.z)):Ut(Q.x,Q.y,0)}for(let it=1;it<=h;it++)for(let Q=0;Q<W;Q++){const j=d?z(y[Q],Pt[Q],Jt):y[Q];x?(R.copy(A.normals[it]).multiplyScalar(j.x),C.copy(A.binormals[it]).multiplyScalar(j.y),L.copy(M[it]).add(R).add(C),Ut(L.x,L.y,L.z)):Ut(j.x,j.y,u/h*it)}for(let it=m-1;it>=0;it--){const Q=it/m,j=f*Math.cos(Q*Math.PI/2),J=g*Math.sin(Q*Math.PI/2)+v;for(let mt=0,lt=B.length;mt<lt;mt++){const gt=z(B[mt],Z[mt],J);Ut(gt.x,gt.y,u+j)}for(let mt=0,lt=D.length;mt<lt;mt++){const gt=D[mt];ft=et[mt];for(let Vt=0,Ht=gt.length;Vt<Ht;Vt++){const E=z(gt[Vt],ft[Vt],J);x?Ut(E.x,E.y+M[h-1].y,M[h-1].x+j):Ut(E.x,E.y,u+j)}}}K(),rt();function K(){const it=i.length/3;if(d){let Q=0,j=W*Q;for(let J=0;J<$t;J++){const mt=zt[J];Tt(mt[2]+j,mt[1]+j,mt[0]+j)}Q=h+m*2,j=W*Q;for(let J=0;J<$t;J++){const mt=zt[J];Tt(mt[0]+j,mt[1]+j,mt[2]+j)}}else{for(let Q=0;Q<$t;Q++){const j=zt[Q];Tt(j[2],j[1],j[0])}for(let Q=0;Q<$t;Q++){const j=zt[Q];Tt(j[0]+W*h,j[1]+W*h,j[2]+W*h)}}n.addGroup(it,i.length/3-it,0)}function rt(){const it=i.length/3;let Q=0;wt(B,Q),Q+=B.length;for(let j=0,J=D.length;j<J;j++){const mt=D[j];wt(mt,Q),Q+=mt.length}n.addGroup(it,i.length/3-it,1)}function wt(it,Q){let j=it.length;for(;--j>=0;){const J=j;let mt=j-1;mt<0&&(mt=it.length-1);for(let lt=0,gt=h+m*2;lt<gt;lt++){const Vt=W*lt,Ht=W*(lt+1),E=Q+J+Vt,_=Q+mt+Vt,k=Q+mt+Ht,q=Q+J+Ht;jt(E,_,k,q)}}}function Ut(it,Q,j){l.push(it),l.push(Q),l.push(j)}function Tt(it,Q,j){me(it),me(Q),me(j);const J=i.length/3,mt=S.generateTopUV(n,i,J-3,J-2,J-1);P(mt[0]),P(mt[1]),P(mt[2])}function jt(it,Q,j,J){me(it),me(Q),me(J),me(Q),me(j),me(J);const mt=i.length/3,lt=S.generateSideWallUV(n,i,mt-6,mt-3,mt-2,mt-1);P(lt[0]),P(lt[1]),P(lt[3]),P(lt[1]),P(lt[2]),P(lt[3])}function me(it){i.push(l[it*3+0]),i.push(l[it*3+1]),i.push(l[it*3+2])}function P(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return id(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new mo[i.type]().fromJSON(i)),new Ls(n,t.options)}}const nd={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new st(r,a),new st(o,l),new st(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new st(a,1-l),new st(c,1-u),new st(d,1-g),new st(v,1-p)]:[new st(o,1-l),new st(h,1-u),new st(f,1-g),new st(m,1-p)]}};function id(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Fo extends Ps{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Fo(t.radius,t.detail)}}class Lr extends Ps{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Lr(t.radius,t.detail)}}class Xe extends Me{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const S=p*d-a;for(let M=0;M<c;M++){const x=M*u-r;g.push(x,-S,0),v.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const M=S+c*p,x=S+c*(p+1),A=S+1+c*(p+1),C=S+1+c*p;f.push(M,x,C),f.push(x,A,C)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(v,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.width,t.height,t.widthSegments,t.heightSegments)}}class Dr extends Me{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new T,g=new st;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const S=p+m,M=S,x=S+n+1,A=S+n+2,C=S+1;o.push(M,x,C),o.push(x,A,C)}}this.setIndex(o),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Oo extends Me{constructor(t=new Ji([new st(0,.5),new st(-.5,-.5),new st(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],i=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new te(i,3)),this.setAttribute("normal",new te(r,3)),this.setAttribute("uv",new te(a,2));function c(h){const u=i.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;Pn.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const S=g[m];Pn.isClockWise(S)===!0&&(g[m]=S.reverse())}const v=Pn.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const S=g[m];f=f.concat(S)}for(let m=0,p=f.length;m<p;m++){const S=f[m];i.push(S.x,S.y,0),r.push(0,0,1),a.push(S.x,S.y)}for(let m=0,p=v.length;m<p;m++){const S=v[m],M=S[0]+u,x=S[1]+u,A=S[2]+u;n.push(M,x,A),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return sd(e,t)}static fromJSON(t,e){const n=[];for(let i=0,r=t.shapes.length;i<r;i++){const a=e[t.shapes[i]];n.push(a)}return new Oo(n,t.curveSegments)}}function sd(s,t){if(t.shapes=[],Array.isArray(s))for(let e=0,n=s.length;e<n;e++){const i=s[e];t.shapes.push(i.uuid)}else t.shapes.push(s.uuid);return t}class we extends Me{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new T,d=new T,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const S=[],M=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let A=0;A<=e;A++){const C=A/e;u.x=-t*Math.cos(i+C*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(i+C*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(C+x,1-M),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const M=h[p][S+1],x=h[p][S],A=h[p+1][S],C=h[p+1][S+1];(p!==0||a>0)&&f.push(M,x,C),(p!==n-1||l<Math.PI)&&f.push(x,A,C)}this.setIndex(f),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(v,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Bo extends Ps{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Bo(t.radius,t.detail)}}class Ie extends Me{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new T,u=new T,d=new T;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,S=(i+1)*f+g;a.push(v,m,S),a.push(m,p,S)}this.setIndex(a),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ie(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class rd extends Le{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wt extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ad extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class od extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ir extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ld extends Ir{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fa=new oe,Rl=new T,Pl=new T;class ko{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Do,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Rl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Rl),Pl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pl),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class cd extends ko{constructor(){super(new We(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=Ar*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class hd extends Ir{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new cd}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ll=new oe,us=new T,pa=new T;class ud extends ko{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new st(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),us.setFromMatrixPosition(t.matrixWorld),n.position.copy(us),pa.copy(n.position),pa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pa),n.updateMatrixWorld(),i.makeTranslation(-us.x,-us.y,-us.z),Ll.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ll,n.coordinateSystem,n.reversedDepth)}}class Bi extends Ir{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new ud}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class zo extends Hc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class dd extends ko{constructor(){super(new zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ma extends Ir{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new dd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class fd extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class eh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Dl(s,t,e,n){const i=pd(n);switch(e){case Cc:return s*t;case To:return s*t/i.components*i.byteLength;case Ao:return s*t/i.components*i.byteLength;case Pc:return s*t*2/i.components*i.byteLength;case Co:return s*t*2/i.components*i.byteLength;case Rc:return s*t*3/i.components*i.byteLength;case dn:return s*t*4/i.components*i.byteLength;case Ro:return s*t*4/i.components*i.byteLength;case mr:case gr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case vr:case xr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ka:case Ha:return Math.max(s,16)*Math.max(t,8)/4;case Ba:case za:return Math.max(s,8)*Math.max(t,8)/2;case Va:case Ga:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Wa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case $a:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Za:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Ja:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ja:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case to:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case eo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case no:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case io:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case so:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ro:case ao:case oo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case lo:case co:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ho:case uo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function pd(s){switch(s){case yn:case bc:return{byteLength:1,components:1};case _s:case Ec:case Dn:return{byteLength:2,components:1};case bo:case Eo:return{byteLength:2,components:4};case hi:case wo:case xn:return{byteLength:4,components:1};case Tc:case Ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function md(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];s.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var gd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_d=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Md=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ed=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ad=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Id=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,kd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Hd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$d=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Kd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Qd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,af=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,df=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Af=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,If=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,zf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$f=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Kf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ep=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,np=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ip=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ap=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,up=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,bp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ep=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ap=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ip=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Np=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Op=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$p=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:gd,alphahash_pars_fragment:vd,alphamap_fragment:xd,alphamap_pars_fragment:_d,alphatest_fragment:yd,alphatest_pars_fragment:Md,aomap_fragment:Sd,aomap_pars_fragment:wd,batching_pars_vertex:bd,batching_vertex:Ed,begin_vertex:Td,beginnormal_vertex:Ad,bsdfs:Cd,iridescence_fragment:Rd,bumpmap_pars_fragment:Pd,clipping_planes_fragment:Ld,clipping_planes_pars_fragment:Dd,clipping_planes_pars_vertex:Id,clipping_planes_vertex:Ud,color_fragment:Nd,color_pars_fragment:Fd,color_pars_vertex:Od,color_vertex:Bd,common:kd,cube_uv_reflection_fragment:zd,defaultnormal_vertex:Hd,displacementmap_pars_vertex:Vd,displacementmap_vertex:Gd,emissivemap_fragment:Wd,emissivemap_pars_fragment:Xd,colorspace_fragment:qd,colorspace_pars_fragment:Yd,envmap_fragment:$d,envmap_common_pars_fragment:Kd,envmap_pars_fragment:Zd,envmap_pars_vertex:Jd,envmap_physical_pars_fragment:cf,envmap_vertex:jd,fog_vertex:Qd,fog_pars_vertex:tf,fog_fragment:ef,fog_pars_fragment:nf,gradientmap_pars_fragment:sf,lightmap_pars_fragment:rf,lights_lambert_fragment:af,lights_lambert_pars_fragment:of,lights_pars_begin:lf,lights_toon_fragment:hf,lights_toon_pars_fragment:uf,lights_phong_fragment:df,lights_phong_pars_fragment:ff,lights_physical_fragment:pf,lights_physical_pars_fragment:mf,lights_fragment_begin:gf,lights_fragment_maps:vf,lights_fragment_end:xf,logdepthbuf_fragment:_f,logdepthbuf_pars_fragment:yf,logdepthbuf_pars_vertex:Mf,logdepthbuf_vertex:Sf,map_fragment:wf,map_pars_fragment:bf,map_particle_fragment:Ef,map_particle_pars_fragment:Tf,metalnessmap_fragment:Af,metalnessmap_pars_fragment:Cf,morphinstance_vertex:Rf,morphcolor_vertex:Pf,morphnormal_vertex:Lf,morphtarget_pars_vertex:Df,morphtarget_vertex:If,normal_fragment_begin:Uf,normal_fragment_maps:Nf,normal_pars_fragment:Ff,normal_pars_vertex:Of,normal_vertex:Bf,normalmap_pars_fragment:kf,clearcoat_normal_fragment_begin:zf,clearcoat_normal_fragment_maps:Hf,clearcoat_pars_fragment:Vf,iridescence_pars_fragment:Gf,opaque_fragment:Wf,packing:Xf,premultiplied_alpha_fragment:qf,project_vertex:Yf,dithering_fragment:$f,dithering_pars_fragment:Kf,roughnessmap_fragment:Zf,roughnessmap_pars_fragment:Jf,shadowmap_pars_fragment:jf,shadowmap_pars_vertex:Qf,shadowmap_vertex:tp,shadowmask_pars_fragment:ep,skinbase_vertex:np,skinning_pars_vertex:ip,skinning_vertex:sp,skinnormal_vertex:rp,specularmap_fragment:ap,specularmap_pars_fragment:op,tonemapping_fragment:lp,tonemapping_pars_fragment:cp,transmission_fragment:hp,transmission_pars_fragment:up,uv_pars_fragment:dp,uv_pars_vertex:fp,uv_vertex:pp,worldpos_vertex:mp,background_vert:gp,background_frag:vp,backgroundCube_vert:xp,backgroundCube_frag:_p,cube_vert:yp,cube_frag:Mp,depth_vert:Sp,depth_frag:wp,distanceRGBA_vert:bp,distanceRGBA_frag:Ep,equirect_vert:Tp,equirect_frag:Ap,linedashed_vert:Cp,linedashed_frag:Rp,meshbasic_vert:Pp,meshbasic_frag:Lp,meshlambert_vert:Dp,meshlambert_frag:Ip,meshmatcap_vert:Up,meshmatcap_frag:Np,meshnormal_vert:Fp,meshnormal_frag:Op,meshphong_vert:Bp,meshphong_frag:kp,meshphysical_vert:zp,meshphysical_frag:Hp,meshtoon_vert:Vp,meshtoon_frag:Gp,points_vert:Wp,points_frag:Xp,shadow_vert:qp,shadow_frag:Yp,sprite_vert:$p,sprite_frag:Kp},xt={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},mn={basic:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new It(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ve([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ve([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ve([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new It(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ve([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ve([xt.points,xt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ve([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ve([xt.common,xt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ve([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ve([xt.sprite,xt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ve([xt.common,xt.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ve([xt.lights,xt.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};mn.physical={uniforms:Ve([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const or={r:0,b:0,g:0},jn=new an,Zp=new oe;function Jp(s,t,e,n,i,r,a){const o=new It(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function v(M){let x=!1;const A=g(M);A===null?p(o,l):A&&A.isColor&&(p(A,1),x=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(M,x){const A=g(x);A&&(A.isCubeTexture||A.mapping===Pr)?(h===void 0&&(h=new ot(new De(1,1,1),new Le({name:"BackgroundCubeMaterial",uniforms:Xi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),jn.copy(x.backgroundRotation),jn.x*=-1,jn.y*=-1,jn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zp.makeRotationFromEuler(jn)),h.material.toneMapped=ne.getTransfer(A.colorSpace)!==ce,(u!==A||d!==A.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new ot(new Xe(2,2),new Le({name:"BackgroundMaterial",uniforms:Xi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ne.getTransfer(A.colorSpace)!==ce,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=s.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(or,zc(s)),n.buffers.color.setClear(or.r,or.g,or.b,x,a)}function S(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:v,addToRenderList:m,dispose:S}}function jp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(y,D,U,V,F){let B=!1;const z=u(V,U,D);r!==z&&(r=z,c(r.object)),B=f(y,V,U,F),B&&g(y,V,U,F),F!==null&&t.update(F,s.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,x(y,D,U,V),F!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,D,U){const V=U.wireframe===!0;let F=n[y.id];F===void 0&&(F={},n[y.id]=F);let B=F[D.id];B===void 0&&(B={},F[D.id]=B);let z=B[V];return z===void 0&&(z=d(l()),B[V]=z),z}function d(y){const D=[],U=[],V=[];for(let F=0;F<e;F++)D[F]=0,U[F]=0,V[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:V,object:y,attributes:{},index:null}}function f(y,D,U,V){const F=r.attributes,B=D.attributes;let z=0;const W=U.getAttributes();for(const H in W)if(W[H].location>=0){const et=F[H];let ft=B[H];if(ft===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),et===void 0||et.attribute!==ft||ft&&et.data!==ft.data)return!0;z++}return r.attributesNum!==z||r.index!==V}function g(y,D,U,V){const F={},B=D.attributes;let z=0;const W=U.getAttributes();for(const H in W)if(W[H].location>=0){let et=B[H];et===void 0&&(H==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),H==="instanceColor"&&y.instanceColor&&(et=y.instanceColor));const ft={};ft.attribute=et,et&&et.data&&(ft.data=et.data),F[H]=ft,z++}r.attributes=F,r.attributesNum=z,r.index=V}function v(){const y=r.newAttributes;for(let D=0,U=y.length;D<U;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const U=r.newAttributes,V=r.enabledAttributes,F=r.attributeDivisors;U[y]=1,V[y]===0&&(s.enableVertexAttribArray(y),V[y]=1),F[y]!==D&&(s.vertexAttribDivisor(y,D),F[y]=D)}function S(){const y=r.newAttributes,D=r.enabledAttributes;for(let U=0,V=D.length;U<V;U++)D[U]!==y[U]&&(s.disableVertexAttribArray(U),D[U]=0)}function M(y,D,U,V,F,B,z){z===!0?s.vertexAttribIPointer(y,D,U,F,B):s.vertexAttribPointer(y,D,U,V,F,B)}function x(y,D,U,V){v();const F=V.attributes,B=U.getAttributes(),z=D.defaultAttributeValues;for(const W in B){const H=B[W];if(H.location>=0){let Z=F[W];if(Z===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor)),Z!==void 0){const et=Z.normalized,ft=Z.itemSize,Pt=t.get(Z);if(Pt===void 0)continue;const zt=Pt.buffer,$t=Pt.type,Jt=Pt.bytesPerElement,K=$t===s.INT||$t===s.UNSIGNED_INT||Z.gpuType===wo;if(Z.isInterleavedBufferAttribute){const rt=Z.data,wt=rt.stride,Ut=Z.offset;if(rt.isInstancedInterleavedBuffer){for(let Tt=0;Tt<H.locationSize;Tt++)p(H.location+Tt,rt.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Tt=0;Tt<H.locationSize;Tt++)m(H.location+Tt);s.bindBuffer(s.ARRAY_BUFFER,zt);for(let Tt=0;Tt<H.locationSize;Tt++)M(H.location+Tt,ft/H.locationSize,$t,et,wt*Jt,(Ut+ft/H.locationSize*Tt)*Jt,K)}else{if(Z.isInstancedBufferAttribute){for(let rt=0;rt<H.locationSize;rt++)p(H.location+rt,Z.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let rt=0;rt<H.locationSize;rt++)m(H.location+rt);s.bindBuffer(s.ARRAY_BUFFER,zt);for(let rt=0;rt<H.locationSize;rt++)M(H.location+rt,ft/H.locationSize,$t,et,ft*Jt,ft/H.locationSize*rt*Jt,K)}}else if(z!==void 0){const et=z[W];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(H.location,et);break;case 3:s.vertexAttrib3fv(H.location,et);break;case 4:s.vertexAttrib4fv(H.location,et);break;default:s.vertexAttrib1fv(H.location,et)}}}}S()}function A(){L();for(const y in n){const D=n[y];for(const U in D){const V=D[U];for(const F in V)h(V[F].object),delete V[F];delete D[U]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const U in D){const V=D[U];for(const F in V)h(V[F].object),delete V[F];delete D[U]}delete n[y.id]}function R(y){for(const D in n){const U=n[D];if(U[y.id]===void 0)continue;const V=U[y.id];for(const F in V)h(V[F].object),delete V[F];delete U[y.id]}}function L(){w(),a=!0,r!==i&&(r=i,c(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:L,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:S}}function Qp(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function tm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==dn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const L=R===Dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==yn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xn&&!L)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,C=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:A,maxSamples:C}}function em(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new ei,o=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const S=r?0:n,M=S*4;let x=p.clippingState||null;l.value=x,x=h(g,d,M,f);for(let A=0;A!==M;++A)x[A]=e[A];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=f;M!==v;++M,x+=4)a.copy(u[M]).applyMatrix4(S,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function nm(s){let t=new WeakMap;function e(a,o){return o===Na?a.mapping=Vi:o===Fa&&(a.mapping=Gi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Na||o===Fa)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new vu(l.height);return c.fromEquirectangularTexture(s,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Fi=4,Il=[.125,.215,.35,.446,.526,.582],si=20,ga=new zo,Ul=new It;let va=null,xa=0,_a=0,ya=!1;const ni=(1+Math.sqrt(5))/2,Ui=1/ni,Nl=[new T(-ni,Ui,0),new T(ni,Ui,0),new T(-Ui,0,ni),new T(Ui,0,ni),new T(0,ni,-Ui),new T(0,ni,Ui),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)],im=new T;class xo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=im}=r;va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ol(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(va,xa,_a),this._renderer.xr.enabled=ya,t.scissorTest=!1,lr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),_a=this._renderer.getActiveMipmapLevel(),ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Dn,format:dn,colorSpace:Wi,depthBuffer:!1},i=Fl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sm(r)),this._blurMaterial=rm(r,t,e)}return i}_compileMaterial(t){const e=new ot(this._lodPlanes[0],t);this._renderer.compile(e,ga)}_sceneToCubeUV(t,e,n,i,r){const l=new We(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ul),u.toneMapping=Gn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));const v=new Qe({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),m=new ot(new De,v);let p=!1;const S=t.background;S?S.isColor&&(v.color.copy(S),t.background=null,p=!0):(v.color.copy(Ul),p=!0);for(let M=0;M<6;M++){const x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const A=this._cubeSize;lr(i,x*A,M>2?A:0,A,A),u.setRenderTarget(i),p&&u.render(m,l),u.render(t,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=S}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Vi||t.mapping===Gi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ol());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new ot(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;lr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ga)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Nl[(i-r-1)%Nl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ot(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*si-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):si;m>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const p=[];let S=0;for(let R=0;R<si;++R){const L=R/v,w=Math.exp(-L*L/2);p.push(w),R===0?S+=w:R<m&&(S+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/S;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const x=this._sizeLods[i],A=3*x*(i>M-Fi?i-M+Fi:0),C=4*(this._cubeSize-x);lr(e,A,C,3*x,2*x),l.setRenderTarget(e),l.render(u,ga)}}function sm(s){const t=[],e=[],n=[];let i=s;const r=s-Fi+1+Il.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-Fi?l=Il[a-s+Fi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,S=new Float32Array(v*g*f),M=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let C=0;C<f;C++){const R=C%3*2/3-1,L=C>2?0:-1,w=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];S.set(w,v*g*C),M.set(d,m*g*C);const y=[C,C,C,C,C,C];x.set(y,p*g*C)}const A=new Me;A.setAttribute("position",new Pe(S,v)),A.setAttribute("uv",new Pe(M,m)),A.setAttribute("faceIndex",new Pe(x,p)),t.push(A),i>Fi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Fl(s,t,e){const n=new fn(s,t,e);return n.texture.mapping=Pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function rm(s,t,e){const n=new Float32Array(si),i=new T(0,1,0);return new Le({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ol(){return new Le({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Bl(){return new Le({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ho(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ho(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function am(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Na||l===Fa,h=l===Vi||l===Gi;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new xo(s)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new xo(s)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function om(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ws("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function lm(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const S=f.array;v=f.version;for(let M=0,x=S.length;M<x;M+=3){const A=S[M+0],C=S[M+1],R=S[M+2];d.push(A,C,C,R,R,A)}}else if(g!==void 0){const S=g.array;v=g.version;for(let M=0,x=S.length/3-1;M<x;M+=3){const A=M+0,C=M+1,R=M+2;d.push(A,C,C,R,R,A)}}else return;const m=new(Ic(d)?kc:Bc)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function cm(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*v[S];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function um(s,t,e){const n=new WeakMap,i=new fe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let y=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let A=o.attributes.position.count*x,C=1;A>t.maxTextureSize&&(C=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const R=new Float32Array(A*C*4*u),L=new Uc(R,A,C,u);L.type=xn,L.needsUpdate=!0;const w=x*4;for(let D=0;D<u;D++){const U=p[D],V=S[D],F=M[D],B=A*C*4*D;for(let z=0;z<U.count;z++){const W=z*w;g===!0&&(i.fromBufferAttribute(U,z),R[B+W+0]=i.x,R[B+W+1]=i.y,R[B+W+2]=i.z,R[B+W+3]=0),v===!0&&(i.fromBufferAttribute(V,z),R[B+W+4]=i.x,R[B+W+5]=i.y,R[B+W+6]=i.z,R[B+W+7]=0),m===!0&&(i.fromBufferAttribute(F,z),R[B+W+8]=i.x,R[B+W+9]=i.y,R[B+W+10]=i.z,R[B+W+11]=F.itemSize===4?i.w:1)}}d={count:u,texture:L,size:new st(A,C)},n.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function dm(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const ih=new Be,kl=new Xc(1,1),sh=new Uc,rh=new eu,ah=new Vc,zl=[],Hl=[],Vl=new Float32Array(16),Gl=new Float32Array(9),Wl=new Float32Array(4);function ji(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=zl[i];if(r===void 0&&(r=new Float32Array(i),zl[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Te(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ae(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ur(s,t){let e=Hl[t];e===void 0&&(e=new Int32Array(t),Hl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function fm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function pm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2fv(this.addr,t),Ae(e,t)}}function mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;s.uniform3fv(this.addr,t),Ae(e,t)}}function gm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4fv(this.addr,t),Ae(e,t)}}function vm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Wl.set(n),s.uniformMatrix2fv(this.addr,!1,Wl),Ae(e,n)}}function xm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Gl.set(n),s.uniformMatrix3fv(this.addr,!1,Gl),Ae(e,n)}}function _m(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Vl.set(n),s.uniformMatrix4fv(this.addr,!1,Vl),Ae(e,n)}}function ym(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Mm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2iv(this.addr,t),Ae(e,t)}}function Sm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3iv(this.addr,t),Ae(e,t)}}function wm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4iv(this.addr,t),Ae(e,t)}}function bm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Em(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2uiv(this.addr,t),Ae(e,t)}}function Tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3uiv(this.addr,t),Ae(e,t)}}function Am(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4uiv(this.addr,t),Ae(e,t)}}function Cm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(kl.compareFunction=Dc,r=kl):r=ih,e.setTexture2D(t||r,i)}function Rm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||rh,i)}function Pm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||ah,i)}function Lm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||sh,i)}function Dm(s){switch(s){case 5126:return fm;case 35664:return pm;case 35665:return mm;case 35666:return gm;case 35674:return vm;case 35675:return xm;case 35676:return _m;case 5124:case 35670:return ym;case 35667:case 35671:return Mm;case 35668:case 35672:return Sm;case 35669:case 35673:return wm;case 5125:return bm;case 36294:return Em;case 36295:return Tm;case 36296:return Am;case 35678:case 36198:case 36298:case 36306:case 35682:return Cm;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Pm;case 36289:case 36303:case 36311:case 36292:return Lm}}function Im(s,t){s.uniform1fv(this.addr,t)}function Um(s,t){const e=ji(t,this.size,2);s.uniform2fv(this.addr,e)}function Nm(s,t){const e=ji(t,this.size,3);s.uniform3fv(this.addr,e)}function Fm(s,t){const e=ji(t,this.size,4);s.uniform4fv(this.addr,e)}function Om(s,t){const e=ji(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Bm(s,t){const e=ji(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function km(s,t){const e=ji(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function zm(s,t){s.uniform1iv(this.addr,t)}function Hm(s,t){s.uniform2iv(this.addr,t)}function Vm(s,t){s.uniform3iv(this.addr,t)}function Gm(s,t){s.uniform4iv(this.addr,t)}function Wm(s,t){s.uniform1uiv(this.addr,t)}function Xm(s,t){s.uniform2uiv(this.addr,t)}function qm(s,t){s.uniform3uiv(this.addr,t)}function Ym(s,t){s.uniform4uiv(this.addr,t)}function $m(s,t,e){const n=this.cache,i=t.length,r=Ur(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||ih,r[a])}function Km(s,t,e){const n=this.cache,i=t.length,r=Ur(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||rh,r[a])}function Zm(s,t,e){const n=this.cache,i=t.length,r=Ur(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||ah,r[a])}function Jm(s,t,e){const n=this.cache,i=t.length,r=Ur(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||sh,r[a])}function jm(s){switch(s){case 5126:return Im;case 35664:return Um;case 35665:return Nm;case 35666:return Fm;case 35674:return Om;case 35675:return Bm;case 35676:return km;case 5124:case 35670:return zm;case 35667:case 35671:return Hm;case 35668:case 35672:return Vm;case 35669:case 35673:return Gm;case 5125:return Wm;case 36294:return Xm;case 36295:return qm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return $m;case 35679:case 36299:case 36307:return Km;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return Jm}}class Qm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Dm(e.type)}}class tg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jm(e.type)}}class eg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ma=/(\w+)(\])?(\[|\.)?/g;function Xl(s,t){s.seq.push(t),s.map[t.id]=t}function ng(s,t,e){const n=s.name,i=n.length;for(Ma.lastIndex=0;;){const r=Ma.exec(n),a=Ma.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Xl(e,c===void 0?new Qm(o,s,t):new tg(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new eg(o),Xl(e,u)),e=u}}}class Sr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);ng(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function ql(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const ig=37297;let sg=0;function rg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Yl=new qt;function ag(s){ne._getMatrix(Yl,ne.workingColorSpace,s);const t=`mat3( ${Yl.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(s)){case Er:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function $l(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+rg(s.getShaderSource(t),o)}else return r}function og(s,t){const e=ag(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function lg(s,t){let e;switch(t){case vc:e="Linear";break;case xc:e="Reinhard";break;case _c:e="Cineon";break;case So:e="ACESFilmic";break;case Mc:e="AgX";break;case Sc:e="Neutral";break;case yc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const cr=new T;function cg(){ne.getLuminanceCoefficients(cr);const s=cr.x.toFixed(4),t=cr.y.toFixed(4),e=cr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function ug(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function dg(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function fs(s){return s!==""}function Kl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const fg=/^[ \t]*#include +<([\w\d./]+)>/gm;function _o(s){return s.replace(fg,mg)}const pg=new Map;function mg(s,t){let e=Yt[t];if(e===void 0){const n=pg.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return _o(e)}const gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jl(s){return s.replace(gg,vg)}function vg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function jl(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function xg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===pc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===mc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function _g(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Vi:case Gi:t="ENVMAP_TYPE_CUBE";break;case Pr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function Mg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case gc:t="ENVMAP_BLENDING_MULTIPLY";break;case Uh:t="ENVMAP_BLENDING_MIX";break;case Nh:t="ENVMAP_BLENDING_ADD";break}return t}function Sg(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function wg(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=xg(e),c=_g(e),h=yg(e),u=Mg(e),d=Sg(e),f=hg(e),g=ug(r),v=i.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fs).join(`
`),p.length>0&&(p+=`
`)):(m=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),p=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Gn?lg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,og("linearToOutputTexel",e.outputColorSpace),cg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fs).join(`
`)),a=_o(a),a=Kl(a,e),a=Zl(a,e),o=_o(o),o=Kl(o,e),o=Zl(o,e),a=Jl(a),o=Jl(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=S+m+a,x=S+p+o,A=ql(i,i.VERTEX_SHADER,M),C=ql(i,i.FRAGMENT_SHADER,x);i.attachShader(v,A),i.attachShader(v,C),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(D){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(v)||"",V=i.getShaderInfoLog(A)||"",F=i.getShaderInfoLog(C)||"",B=U.trim(),z=V.trim(),W=F.trim();let H=!0,Z=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,A,C);else{const et=$l(i,A,"vertex"),ft=$l(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+et+`
`+ft)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(z===""||W==="")&&(Z=!1);Z&&(D.diagnostics={runnable:H,programLog:B,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:p}})}i.deleteShader(A),i.deleteShader(C),L=new Sr(i,v),w=dg(i,v)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,ig)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=sg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let bg=0;class Eg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Tg(t),e.set(t,n)),n}}class Tg{constructor(t){this.id=bg++,this.code=t,this.usedTimes=0}}function Ag(s,t,e,n,i,r,a){const o=new Fc,l=new Eg,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,D,U,V){const F=U.fog,B=V.geometry,z=w.isMeshStandardMaterial?U.environment:null,W=(w.isMeshStandardMaterial?e:t).get(w.envMap||z),H=W&&W.mapping===Pr?W.image.height:null,Z=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const et=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ft=et!==void 0?et.length:0;let Pt=0;B.morphAttributes.position!==void 0&&(Pt=1),B.morphAttributes.normal!==void 0&&(Pt=2),B.morphAttributes.color!==void 0&&(Pt=3);let zt,$t,Jt,K;if(Z){const re=mn[Z];zt=re.vertexShader,$t=re.fragmentShader}else zt=w.vertexShader,$t=w.fragmentShader,l.update(w),Jt=l.getVertexShaderID(w),K=l.getFragmentShaderID(w);const rt=s.getRenderTarget(),wt=s.state.buffers.depth.getReversed(),Ut=V.isInstancedMesh===!0,Tt=V.isBatchedMesh===!0,jt=!!w.map,me=!!w.matcap,P=!!W,it=!!w.aoMap,Q=!!w.lightMap,j=!!w.bumpMap,J=!!w.normalMap,mt=!!w.displacementMap,lt=!!w.emissiveMap,gt=!!w.metalnessMap,Vt=!!w.roughnessMap,Ht=w.anisotropy>0,E=w.clearcoat>0,_=w.dispersion>0,k=w.iridescence>0,q=w.sheen>0,nt=w.transmission>0,$=Ht&&!!w.anisotropyMap,Lt=E&&!!w.clearcoatMap,pt=E&&!!w.clearcoatNormalMap,At=E&&!!w.clearcoatRoughnessMap,Ct=k&&!!w.iridescenceMap,ct=k&&!!w.iridescenceThicknessMap,Mt=q&&!!w.sheenColorMap,Bt=q&&!!w.sheenRoughnessMap,Dt=!!w.specularMap,_t=!!w.specularColorMap,Xt=!!w.specularIntensityMap,I=nt&&!!w.transmissionMap,dt=nt&&!!w.thicknessMap,vt=!!w.gradientMap,bt=!!w.alphaMap,ht=w.alphaTest>0,tt=!!w.alphaHash,Rt=!!w.extensions;let Gt=Gn;w.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Gt=s.toneMapping);const ge={shaderID:Z,shaderType:w.type,shaderName:w.name,vertexShader:zt,fragmentShader:$t,defines:w.defines,customVertexShaderID:Jt,customFragmentShaderID:K,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Tt,batchingColor:Tt&&V._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&V.instanceColor!==null,instancingMorph:Ut&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Wi,alphaToCoverage:!!w.alphaToCoverage,map:jt,matcap:me,envMap:P,envMapMode:P&&W.mapping,envMapCubeUVHeight:H,aoMap:it,lightMap:Q,bumpMap:j,normalMap:J,displacementMap:d&&mt,emissiveMap:lt,normalMapObjectSpace:J&&w.normalMapType===kh,normalMapTangentSpace:J&&w.normalMapType===Lc,metalnessMap:gt,roughnessMap:Vt,anisotropy:Ht,anisotropyMap:$,clearcoat:E,clearcoatMap:Lt,clearcoatNormalMap:pt,clearcoatRoughnessMap:At,dispersion:_,iridescence:k,iridescenceMap:Ct,iridescenceThicknessMap:ct,sheen:q,sheenColorMap:Mt,sheenRoughnessMap:Bt,specularMap:Dt,specularColorMap:_t,specularIntensityMap:Xt,transmission:nt,transmissionMap:I,thicknessMap:dt,gradientMap:vt,opaque:w.transparent===!1&&w.blending===li&&w.alphaToCoverage===!1,alphaMap:bt,alphaTest:ht,alphaHash:tt,combine:w.combine,mapUv:jt&&v(w.map.channel),aoMapUv:it&&v(w.aoMap.channel),lightMapUv:Q&&v(w.lightMap.channel),bumpMapUv:j&&v(w.bumpMap.channel),normalMapUv:J&&v(w.normalMap.channel),displacementMapUv:mt&&v(w.displacementMap.channel),emissiveMapUv:lt&&v(w.emissiveMap.channel),metalnessMapUv:gt&&v(w.metalnessMap.channel),roughnessMapUv:Vt&&v(w.roughnessMap.channel),anisotropyMapUv:$&&v(w.anisotropyMap.channel),clearcoatMapUv:Lt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:pt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&v(w.sheenRoughnessMap.channel),specularMapUv:Dt&&v(w.specularMap.channel),specularColorMapUv:_t&&v(w.specularColorMap.channel),specularIntensityMapUv:Xt&&v(w.specularIntensityMap.channel),transmissionMapUv:I&&v(w.transmissionMap.channel),thicknessMapUv:dt&&v(w.thicknessMap.channel),alphaMapUv:bt&&v(w.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(J||Ht),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!B.attributes.uv&&(jt||bt),fog:!!F,useFog:w.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:wt,skinning:V.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Pt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Gt,decodeVideoTexture:jt&&w.map.isVideoTexture===!0&&ne.getTransfer(w.map.colorSpace)===ce,decodeVideoTextureEmissive:lt&&w.emissiveMap.isVideoTexture===!0&&ne.getTransfer(w.emissiveMap.colorSpace)===ce,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===je,flipSided:w.side===Oe,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Rt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Rt&&w.extensions.multiDraw===!0||Tt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)y.push(D),y.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(S(y,w),M(y,w),y.push(s.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function S(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function M(w,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),w.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),w.push(o.mask)}function x(w){const y=g[w.type];let D;if(y){const U=mn[y];D=bs.clone(U.uniforms)}else D=w.uniforms;return D}function A(w,y){let D;for(let U=0,V=h.length;U<V;U++){const F=h[U];if(F.cacheKey===y){D=F,++D.usedTimes;break}}return D===void 0&&(D=new wg(s,y,w,r),h.push(D)),D}function C(w){if(--w.usedTimes===0){const y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function R(w){l.remove(w)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:A,releaseProgram:C,releaseShaderCache:R,programs:h,dispose:L}}function Cg(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Rg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Ql(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function tc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,g,v,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Rg),n.length>1&&n.sort(d||Ql),i.length>1&&i.sort(d||Ql)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Pg(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new tc,s.set(n,[a])):i>=r.length?(a=new tc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Lg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new It};break;case"SpotLight":e={position:new T,direction:new T,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new T,halfWidth:new T,halfHeight:new T};break}return s[t.id]=e,e}}}function Dg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Ig=0;function Ug(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ng(s){const t=new Lg,e=Dg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);const i=new T,r=new oe,a=new oe;function o(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,S=0,M=0,x=0,A=0,C=0,R=0;c.sort(Ug);for(let w=0,y=c.length;w<y;w++){const D=c[w],U=D.color,V=D.intensity,F=D.distance,B=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=U.r*V,u+=U.g*V,d+=U.b*V;else if(D.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(D.sh.coefficients[z],V);R++}else if(D.isDirectionalLight){const z=t.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,H=e.get(D);H.shadowIntensity=W.intensity,H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=D.shadow.matrix,S++}n.directional[f]=z,f++}else if(D.isSpotLight){const z=t.get(D);z.position.setFromMatrixPosition(D.matrixWorld),z.color.copy(U).multiplyScalar(V),z.distance=F,z.coneCos=Math.cos(D.angle),z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),z.decay=D.decay,n.spot[v]=z;const W=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,W.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[v]=W.matrix,D.castShadow){const H=e.get(D);H.shadowIntensity=W.intensity,H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=B,x++}v++}else if(D.isRectAreaLight){const z=t.get(D);z.color.copy(U).multiplyScalar(V),z.halfWidth.set(D.width*.5,0,0),z.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=z,m++}else if(D.isPointLight){const z=t.get(D);if(z.color.copy(D.color).multiplyScalar(D.intensity),z.distance=D.distance,z.decay=D.decay,D.castShadow){const W=D.shadow,H=e.get(D);H.shadowIntensity=W.intensity,H.shadowBias=W.bias,H.shadowNormalBias=W.normalBias,H.shadowRadius=W.radius,H.shadowMapSize=W.mapSize,H.shadowCameraNear=W.camera.near,H.shadowCameraFar=W.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=B,n.pointShadowMatrix[g]=D.shadow.matrix,M++}n.point[g]=z,g++}else if(D.isHemisphereLight){const z=t.get(D);z.skyColor.copy(D.color).multiplyScalar(V),z.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[p]=z,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==S||L.numPointShadows!==M||L.numSpotShadows!==x||L.numSpotMaps!==A||L.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,L.directionalLength=f,L.pointLength=g,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=S,L.numPointShadows=M,L.numSpotShadows=x,L.numSpotMaps=A,L.numLightProbes=R,n.version=Ig++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const M=c[p];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(M.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function ec(s){const t=new Ng(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Fg(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new ec(s),t.set(i,[o])):r>=a.length?(o=new ec(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kg(s,t,e){let n=new Do;const i=new st,r=new st,a=new fe,o=new ad({depthPacking:Bh}),l=new od,c={},h=e.maxTextureSize,u={[Wn]:Oe,[Oe]:Wn,[je]:je},d=new Le({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:Og,fragmentShader:Bg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ot(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pc;let p=this.type;this.render=function(C,R,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const w=s.getRenderTarget(),y=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Ln),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=p!==Cn&&this.type===Cn,F=p===Cn&&this.type!==Cn;for(let B=0,z=C.length;B<z;B++){const W=C[B],H=W.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const Z=H.getFrameExtents();if(i.multiply(Z),r.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Z.x),i.x=r.x*Z.x,H.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Z.y),i.y=r.y*Z.y,H.mapSize.y=r.y)),H.map===null||V===!0||F===!0){const ft=this.type!==Cn?{minFilter:tn,magFilter:tn}:{};H.map!==null&&H.map.dispose(),H.map=new fn(i.x,i.y,ft),H.map.texture.name=W.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const et=H.getViewportCount();for(let ft=0;ft<et;ft++){const Pt=H.getViewport(ft);a.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),U.viewport(a),H.updateMatrices(W,ft),n=H.getFrustum(),x(R,L,H.camera,W,this.type)}H.isPointLightShadow!==!0&&this.type===Cn&&S(H,L),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,y,D)};function S(C,R){const L=t.update(v);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new fn(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(R,null,L,d,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(R,null,L,f,v,null)}function M(C,R,L,w){let y=null;const D=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)y=D;else if(y=L.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const U=y.uuid,V=R.uuid;let F=c[U];F===void 0&&(F={},c[U]=F);let B=F[V];B===void 0&&(B=y.clone(),F[V]=B,R.addEventListener("dispose",A)),y=B}if(y.visible=R.visible,y.wireframe=R.wireframe,w===Cn?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=s.properties.get(y);U.light=L}return y}function x(C,R,L,w,y){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===Cn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const V=t.update(C),F=C.material;if(Array.isArray(F)){const B=V.groups;for(let z=0,W=B.length;z<W;z++){const H=B[z],Z=F[H.materialIndex];if(Z&&Z.visible){const et=M(C,Z,w,y);C.onBeforeShadow(s,C,R,L,V,et,H),s.renderBufferDirect(L,null,V,et,C,H),C.onAfterShadow(s,C,R,L,V,et,H)}}}else if(F.visible){const B=M(C,F,w,y);C.onBeforeShadow(s,C,R,L,V,B,null),s.renderBufferDirect(L,null,V,B,C,null),C.onAfterShadow(s,C,R,L,V,B,null)}}const U=C.children;for(let V=0,F=U.length;V<F;V++)x(U[V],R,L,w,y)}function A(C){C.target.removeEventListener("dispose",A);for(const L in c){const w=c[L],y=C.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const zg={[Ca]:Ra,[Pa]:Ia,[La]:Ua,[Hi]:Da,[Ra]:Ca,[Ia]:Pa,[Ua]:La,[Da]:Hi};function Hg(s,t){function e(){let I=!1;const dt=new fe;let vt=null;const bt=new fe(0,0,0,0);return{setMask:function(ht){vt!==ht&&!I&&(s.colorMask(ht,ht,ht,ht),vt=ht)},setLocked:function(ht){I=ht},setClear:function(ht,tt,Rt,Gt,ge){ge===!0&&(ht*=Gt,tt*=Gt,Rt*=Gt),dt.set(ht,tt,Rt,Gt),bt.equals(dt)===!1&&(s.clearColor(ht,tt,Rt,Gt),bt.copy(dt))},reset:function(){I=!1,vt=null,bt.set(-1,0,0,0)}}}function n(){let I=!1,dt=!1,vt=null,bt=null,ht=null;return{setReversed:function(tt){if(dt!==tt){const Rt=t.get("EXT_clip_control");tt?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),dt=tt;const Gt=ht;ht=null,this.setClear(Gt)}},getReversed:function(){return dt},setTest:function(tt){tt?rt(s.DEPTH_TEST):wt(s.DEPTH_TEST)},setMask:function(tt){vt!==tt&&!I&&(s.depthMask(tt),vt=tt)},setFunc:function(tt){if(dt&&(tt=zg[tt]),bt!==tt){switch(tt){case Ca:s.depthFunc(s.NEVER);break;case Ra:s.depthFunc(s.ALWAYS);break;case Pa:s.depthFunc(s.LESS);break;case Hi:s.depthFunc(s.LEQUAL);break;case La:s.depthFunc(s.EQUAL);break;case Da:s.depthFunc(s.GEQUAL);break;case Ia:s.depthFunc(s.GREATER);break;case Ua:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}bt=tt}},setLocked:function(tt){I=tt},setClear:function(tt){ht!==tt&&(dt&&(tt=1-tt),s.clearDepth(tt),ht=tt)},reset:function(){I=!1,vt=null,bt=null,ht=null,dt=!1}}}function i(){let I=!1,dt=null,vt=null,bt=null,ht=null,tt=null,Rt=null,Gt=null,ge=null;return{setTest:function(re){I||(re?rt(s.STENCIL_TEST):wt(s.STENCIL_TEST))},setMask:function(re){dt!==re&&!I&&(s.stencilMask(re),dt=re)},setFunc:function(re,Sn,pn){(vt!==re||bt!==Sn||ht!==pn)&&(s.stencilFunc(re,Sn,pn),vt=re,bt=Sn,ht=pn)},setOp:function(re,Sn,pn){(tt!==re||Rt!==Sn||Gt!==pn)&&(s.stencilOp(re,Sn,pn),tt=re,Rt=Sn,Gt=pn)},setLocked:function(re){I=re},setClear:function(re){ge!==re&&(s.clearStencil(re),ge=re)},reset:function(){I=!1,dt=null,vt=null,bt=null,ht=null,tt=null,Rt=null,Gt=null,ge=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,S=null,M=null,x=null,A=null,C=null,R=new It(0,0,0),L=0,w=!1,y=null,D=null,U=null,V=null,F=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,W=0;const H=s.getParameter(s.VERSION);H.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(H)[1]),z=W>=1):H.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),z=W>=2);let Z=null,et={};const ft=s.getParameter(s.SCISSOR_BOX),Pt=s.getParameter(s.VIEWPORT),zt=new fe().fromArray(ft),$t=new fe().fromArray(Pt);function Jt(I,dt,vt,bt){const ht=new Uint8Array(4),tt=s.createTexture();s.bindTexture(I,tt),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Rt=0;Rt<vt;Rt++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,bt,0,s.RGBA,s.UNSIGNED_BYTE,ht):s.texImage2D(dt+Rt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ht);return tt}const K={};K[s.TEXTURE_2D]=Jt(s.TEXTURE_2D,s.TEXTURE_2D,1),K[s.TEXTURE_CUBE_MAP]=Jt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[s.TEXTURE_2D_ARRAY]=Jt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),K[s.TEXTURE_3D]=Jt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(s.DEPTH_TEST),a.setFunc(Hi),j(!1),J(Ko),rt(s.CULL_FACE),it(Ln);function rt(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function wt(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function Ut(I,dt){return u[I]!==dt?(s.bindFramebuffer(I,dt),u[I]=dt,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=dt),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function Tt(I,dt){let vt=f,bt=!1;if(I){vt=d.get(dt),vt===void 0&&(vt=[],d.set(dt,vt));const ht=I.textures;if(vt.length!==ht.length||vt[0]!==s.COLOR_ATTACHMENT0){for(let tt=0,Rt=ht.length;tt<Rt;tt++)vt[tt]=s.COLOR_ATTACHMENT0+tt;vt.length=ht.length,bt=!0}}else vt[0]!==s.BACK&&(vt[0]=s.BACK,bt=!0);bt&&s.drawBuffers(vt)}function jt(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const me={[ii]:s.FUNC_ADD,[vh]:s.FUNC_SUBTRACT,[xh]:s.FUNC_REVERSE_SUBTRACT};me[_h]=s.MIN,me[yh]=s.MAX;const P={[Mh]:s.ZERO,[Sh]:s.ONE,[wh]:s.SRC_COLOR,[Ta]:s.SRC_ALPHA,[Rh]:s.SRC_ALPHA_SATURATE,[Ah]:s.DST_COLOR,[Eh]:s.DST_ALPHA,[bh]:s.ONE_MINUS_SRC_COLOR,[Aa]:s.ONE_MINUS_SRC_ALPHA,[Ch]:s.ONE_MINUS_DST_COLOR,[Th]:s.ONE_MINUS_DST_ALPHA,[Ph]:s.CONSTANT_COLOR,[Lh]:s.ONE_MINUS_CONSTANT_COLOR,[Dh]:s.CONSTANT_ALPHA,[Ih]:s.ONE_MINUS_CONSTANT_ALPHA};function it(I,dt,vt,bt,ht,tt,Rt,Gt,ge,re){if(I===Ln){v===!0&&(wt(s.BLEND),v=!1);return}if(v===!1&&(rt(s.BLEND),v=!0),I!==gh){if(I!==m||re!==w){if((p!==ii||x!==ii)&&(s.blendEquation(s.FUNC_ADD),p=ii,x=ii),re)switch(I){case li:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Je:s.blendFunc(s.ONE,s.ONE);break;case Zo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Jo:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case li:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Je:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Zo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Jo:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}S=null,M=null,A=null,C=null,R.set(0,0,0),L=0,m=I,w=re}return}ht=ht||dt,tt=tt||vt,Rt=Rt||bt,(dt!==p||ht!==x)&&(s.blendEquationSeparate(me[dt],me[ht]),p=dt,x=ht),(vt!==S||bt!==M||tt!==A||Rt!==C)&&(s.blendFuncSeparate(P[vt],P[bt],P[tt],P[Rt]),S=vt,M=bt,A=tt,C=Rt),(Gt.equals(R)===!1||ge!==L)&&(s.blendColor(Gt.r,Gt.g,Gt.b,ge),R.copy(Gt),L=ge),m=I,w=!1}function Q(I,dt){I.side===je?wt(s.CULL_FACE):rt(s.CULL_FACE);let vt=I.side===Oe;dt&&(vt=!vt),j(vt),I.blending===li&&I.transparent===!1?it(Ln):it(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const bt=I.stencilWrite;o.setTest(bt),bt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),lt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?rt(s.SAMPLE_ALPHA_TO_COVERAGE):wt(s.SAMPLE_ALPHA_TO_COVERAGE)}function j(I){y!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),y=I)}function J(I){I!==ph?(rt(s.CULL_FACE),I!==D&&(I===Ko?s.cullFace(s.BACK):I===mh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):wt(s.CULL_FACE),D=I}function mt(I){I!==U&&(z&&s.lineWidth(I),U=I)}function lt(I,dt,vt){I?(rt(s.POLYGON_OFFSET_FILL),(V!==dt||F!==vt)&&(s.polygonOffset(dt,vt),V=dt,F=vt)):wt(s.POLYGON_OFFSET_FILL)}function gt(I){I?rt(s.SCISSOR_TEST):wt(s.SCISSOR_TEST)}function Vt(I){I===void 0&&(I=s.TEXTURE0+B-1),Z!==I&&(s.activeTexture(I),Z=I)}function Ht(I,dt,vt){vt===void 0&&(Z===null?vt=s.TEXTURE0+B-1:vt=Z);let bt=et[vt];bt===void 0&&(bt={type:void 0,texture:void 0},et[vt]=bt),(bt.type!==I||bt.texture!==dt)&&(Z!==vt&&(s.activeTexture(vt),Z=vt),s.bindTexture(I,dt||K[I]),bt.type=I,bt.texture=dt)}function E(){const I=et[Z];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{s.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function q(){try{s.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function nt(){try{s.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{s.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Lt(){try{s.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{s.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function At(){try{s.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{s.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(){try{s.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Mt(I){zt.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),zt.copy(I))}function Bt(I){$t.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),$t.copy(I))}function Dt(I,dt){let vt=c.get(dt);vt===void 0&&(vt=new WeakMap,c.set(dt,vt));let bt=vt.get(I);bt===void 0&&(bt=s.getUniformBlockIndex(dt,I.name),vt.set(I,bt))}function _t(I,dt){const bt=c.get(dt).get(I);l.get(dt)!==bt&&(s.uniformBlockBinding(dt,bt,I.__bindingPointIndex),l.set(dt,bt))}function Xt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},Z=null,et={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,S=null,M=null,x=null,A=null,C=null,R=new It(0,0,0),L=0,w=!1,y=null,D=null,U=null,V=null,F=null,zt.set(0,0,s.canvas.width,s.canvas.height),$t.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:wt,bindFramebuffer:Ut,drawBuffers:Tt,useProgram:jt,setBlending:it,setMaterial:Q,setFlipSided:j,setCullFace:J,setLineWidth:mt,setPolygonOffset:lt,setScissorTest:gt,activeTexture:Vt,bindTexture:Ht,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:k,texImage2D:Ct,texImage3D:ct,updateUBOMapping:Dt,uniformBlockBinding:_t,texStorage2D:pt,texStorage3D:At,texSubImage2D:q,texSubImage3D:nt,compressedTexSubImage2D:$,compressedTexSubImage3D:Lt,scissor:Mt,viewport:Bt,reset:Xt}}function Vg(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return f?new OffscreenCanvas(E,_):Cr("canvas")}function v(E,_,k){let q=1;const nt=Ht(E);if((nt.width>k||nt.height>k)&&(q=k/Math.max(nt.width,nt.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const $=Math.floor(q*nt.width),Lt=Math.floor(q*nt.height);u===void 0&&(u=g($,Lt));const pt=_?g($,Lt):u;return pt.width=$,pt.height=Lt,pt.getContext("2d").drawImage(E,0,0,$,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+$+"x"+Lt+")."),pt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){s.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(E,_,k,q,nt=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=_;if(_===s.RED&&(k===s.FLOAT&&($=s.R32F),k===s.HALF_FLOAT&&($=s.R16F),k===s.UNSIGNED_BYTE&&($=s.R8)),_===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.R8UI),k===s.UNSIGNED_SHORT&&($=s.R16UI),k===s.UNSIGNED_INT&&($=s.R32UI),k===s.BYTE&&($=s.R8I),k===s.SHORT&&($=s.R16I),k===s.INT&&($=s.R32I)),_===s.RG&&(k===s.FLOAT&&($=s.RG32F),k===s.HALF_FLOAT&&($=s.RG16F),k===s.UNSIGNED_BYTE&&($=s.RG8)),_===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RG8UI),k===s.UNSIGNED_SHORT&&($=s.RG16UI),k===s.UNSIGNED_INT&&($=s.RG32UI),k===s.BYTE&&($=s.RG8I),k===s.SHORT&&($=s.RG16I),k===s.INT&&($=s.RG32I)),_===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RGB8UI),k===s.UNSIGNED_SHORT&&($=s.RGB16UI),k===s.UNSIGNED_INT&&($=s.RGB32UI),k===s.BYTE&&($=s.RGB8I),k===s.SHORT&&($=s.RGB16I),k===s.INT&&($=s.RGB32I)),_===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&($=s.RGBA8UI),k===s.UNSIGNED_SHORT&&($=s.RGBA16UI),k===s.UNSIGNED_INT&&($=s.RGBA32UI),k===s.BYTE&&($=s.RGBA8I),k===s.SHORT&&($=s.RGBA16I),k===s.INT&&($=s.RGBA32I)),_===s.RGB&&(k===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&($=s.R11F_G11F_B10F)),_===s.RGBA){const Lt=nt?Er:ne.getTransfer(q);k===s.FLOAT&&($=s.RGBA32F),k===s.HALF_FLOAT&&($=s.RGBA16F),k===s.UNSIGNED_BYTE&&($=Lt===ce?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(E,_){let k;return E?_===null||_===hi||_===ys?k=s.DEPTH24_STENCIL8:_===xn?k=s.DEPTH32F_STENCIL8:_===_s&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===hi||_===ys?k=s.DEPTH_COMPONENT24:_===xn?k=s.DEPTH_COMPONENT32F:_===_s&&(k=s.DEPTH_COMPONENT16),k}function A(E,_){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==tn&&E.minFilter!==vn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function C(E){const _=E.target;_.removeEventListener("dispose",C),L(_),_.isVideoTexture&&h.delete(_)}function R(E){const _=E.target;_.removeEventListener("dispose",R),y(_)}function L(E){const _=n.get(E);if(_.__webglInit===void 0)return;const k=E.source,q=d.get(k);if(q){const nt=q[_.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&w(E),Object.keys(q).length===0&&d.delete(k)}n.remove(E)}function w(E){const _=n.get(E);s.deleteTexture(_.__webglTexture);const k=E.source,q=d.get(k);delete q[_.__cacheKey],a.memory.textures--}function y(E){const _=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let nt=0;nt<_.__webglFramebuffer[q].length;nt++)s.deleteFramebuffer(_.__webglFramebuffer[q][nt]);else s.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)s.deleteFramebuffer(_.__webglFramebuffer[q]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const k=E.textures;for(let q=0,nt=k.length;q<nt;q++){const $=n.get(k[q]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(k[q])}n.remove(E)}let D=0;function U(){D=0}function V(){const E=D;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),D+=1,E}function F(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function B(E,_){const k=n.get(E);if(E.isVideoTexture&&gt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&k.__version!==E.version){const q=E.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(k,E,_);return}}else E.isExternalTexture&&(k.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+_)}function z(E,_){const k=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){K(k,E,_);return}e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+_)}function W(E,_){const k=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&k.__version!==E.version){K(k,E,_);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+_)}function H(E,_){const k=n.get(E);if(E.version>0&&k.__version!==E.version){rt(k,E,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+_)}const Z={[xs]:s.REPEAT,[ai]:s.CLAMP_TO_EDGE,[Oa]:s.MIRRORED_REPEAT},et={[tn]:s.NEAREST,[Fh]:s.NEAREST_MIPMAP_NEAREST,[Us]:s.NEAREST_MIPMAP_LINEAR,[vn]:s.LINEAR,[Or]:s.LINEAR_MIPMAP_NEAREST,[oi]:s.LINEAR_MIPMAP_LINEAR},ft={[zh]:s.NEVER,[qh]:s.ALWAYS,[Hh]:s.LESS,[Dc]:s.LEQUAL,[Vh]:s.EQUAL,[Xh]:s.GEQUAL,[Gh]:s.GREATER,[Wh]:s.NOTEQUAL};function Pt(E,_){if(_.type===xn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===vn||_.magFilter===Or||_.magFilter===Us||_.magFilter===oi||_.minFilter===vn||_.minFilter===Or||_.minFilter===Us||_.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,Z[_.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,Z[_.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,Z[_.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,et[_.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,et[_.minFilter]),_.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,ft[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===tn||_.minFilter!==Us&&_.minFilter!==oi||_.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function zt(E,_){let k=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",C));const q=_.source;let nt=d.get(q);nt===void 0&&(nt={},d.set(q,nt));const $=F(_);if($!==E.__cacheKey){nt[$]===void 0&&(nt[$]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),nt[$].usedTimes++;const Lt=nt[E.__cacheKey];Lt!==void 0&&(nt[E.__cacheKey].usedTimes--,Lt.usedTimes===0&&w(_)),E.__cacheKey=$,E.__webglTexture=nt[$].texture}return k}function $t(E,_,k){return Math.floor(Math.floor(E/k)/_)}function Jt(E,_,k,q){const $=E.updateRanges;if($.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,k,q,_.data);else{$.sort((ct,Mt)=>ct.start-Mt.start);let Lt=0;for(let ct=1;ct<$.length;ct++){const Mt=$[Lt],Bt=$[ct],Dt=Mt.start+Mt.count,_t=$t(Bt.start,_.width,4),Xt=$t(Mt.start,_.width,4);Bt.start<=Dt+1&&_t===Xt&&$t(Bt.start+Bt.count-1,_.width,4)===_t?Mt.count=Math.max(Mt.count,Bt.start+Bt.count-Mt.start):(++Lt,$[Lt]=Bt)}$.length=Lt+1;const pt=s.getParameter(s.UNPACK_ROW_LENGTH),At=s.getParameter(s.UNPACK_SKIP_PIXELS),Ct=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let ct=0,Mt=$.length;ct<Mt;ct++){const Bt=$[ct],Dt=Math.floor(Bt.start/4),_t=Math.ceil(Bt.count/4),Xt=Dt%_.width,I=Math.floor(Dt/_.width),dt=_t,vt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Xt),s.pixelStorei(s.UNPACK_SKIP_ROWS,I),e.texSubImage2D(s.TEXTURE_2D,0,Xt,I,dt,vt,k,q,_.data)}E.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,pt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,At),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ct)}}function K(E,_,k){let q=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=s.TEXTURE_3D);const nt=zt(E,_),$=_.source;e.bindTexture(q,E.__webglTexture,s.TEXTURE0+k);const Lt=n.get($);if($.version!==Lt.__version||nt===!0){e.activeTexture(s.TEXTURE0+k);const pt=ne.getPrimaries(ne.workingColorSpace),At=_.colorSpace===Vn?null:ne.getPrimaries(_.colorSpace),Ct=_.colorSpace===Vn||pt===At?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let ct=v(_.image,!1,i.maxTextureSize);ct=Vt(_,ct);const Mt=r.convert(_.format,_.colorSpace),Bt=r.convert(_.type);let Dt=M(_.internalFormat,Mt,Bt,_.colorSpace,_.isVideoTexture);Pt(q,_);let _t;const Xt=_.mipmaps,I=_.isVideoTexture!==!0,dt=Lt.__version===void 0||nt===!0,vt=$.dataReady,bt=A(_,ct);if(_.isDepthTexture)Dt=x(_.format===Ss,_.type),dt&&(I?e.texStorage2D(s.TEXTURE_2D,1,Dt,ct.width,ct.height):e.texImage2D(s.TEXTURE_2D,0,Dt,ct.width,ct.height,0,Mt,Bt,null));else if(_.isDataTexture)if(Xt.length>0){I&&dt&&e.texStorage2D(s.TEXTURE_2D,bt,Dt,Xt[0].width,Xt[0].height);for(let ht=0,tt=Xt.length;ht<tt;ht++)_t=Xt[ht],I?vt&&e.texSubImage2D(s.TEXTURE_2D,ht,0,0,_t.width,_t.height,Mt,Bt,_t.data):e.texImage2D(s.TEXTURE_2D,ht,Dt,_t.width,_t.height,0,Mt,Bt,_t.data);_.generateMipmaps=!1}else I?(dt&&e.texStorage2D(s.TEXTURE_2D,bt,Dt,ct.width,ct.height),vt&&Jt(_,ct,Mt,Bt)):e.texImage2D(s.TEXTURE_2D,0,Dt,ct.width,ct.height,0,Mt,Bt,ct.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&dt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,bt,Dt,Xt[0].width,Xt[0].height,ct.depth);for(let ht=0,tt=Xt.length;ht<tt;ht++)if(_t=Xt[ht],_.format!==dn)if(Mt!==null)if(I){if(vt)if(_.layerUpdates.size>0){const Rt=Dl(_t.width,_t.height,_.format,_.type);for(const Gt of _.layerUpdates){const ge=_t.data.subarray(Gt*Rt/_t.data.BYTES_PER_ELEMENT,(Gt+1)*Rt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ht,0,0,Gt,_t.width,_t.height,1,Mt,ge)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ht,0,0,0,_t.width,_t.height,ct.depth,Mt,_t.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ht,Dt,_t.width,_t.height,ct.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?vt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ht,0,0,0,_t.width,_t.height,ct.depth,Mt,Bt,_t.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ht,Dt,_t.width,_t.height,ct.depth,0,Mt,Bt,_t.data)}else{I&&dt&&e.texStorage2D(s.TEXTURE_2D,bt,Dt,Xt[0].width,Xt[0].height);for(let ht=0,tt=Xt.length;ht<tt;ht++)_t=Xt[ht],_.format!==dn?Mt!==null?I?vt&&e.compressedTexSubImage2D(s.TEXTURE_2D,ht,0,0,_t.width,_t.height,Mt,_t.data):e.compressedTexImage2D(s.TEXTURE_2D,ht,Dt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?vt&&e.texSubImage2D(s.TEXTURE_2D,ht,0,0,_t.width,_t.height,Mt,Bt,_t.data):e.texImage2D(s.TEXTURE_2D,ht,Dt,_t.width,_t.height,0,Mt,Bt,_t.data)}else if(_.isDataArrayTexture)if(I){if(dt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,bt,Dt,ct.width,ct.height,ct.depth),vt)if(_.layerUpdates.size>0){const ht=Dl(ct.width,ct.height,_.format,_.type);for(const tt of _.layerUpdates){const Rt=ct.data.subarray(tt*ht/ct.data.BYTES_PER_ELEMENT,(tt+1)*ht/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,tt,ct.width,ct.height,1,Mt,Bt,Rt)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Mt,Bt,ct.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Dt,ct.width,ct.height,ct.depth,0,Mt,Bt,ct.data);else if(_.isData3DTexture)I?(dt&&e.texStorage3D(s.TEXTURE_3D,bt,Dt,ct.width,ct.height,ct.depth),vt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Mt,Bt,ct.data)):e.texImage3D(s.TEXTURE_3D,0,Dt,ct.width,ct.height,ct.depth,0,Mt,Bt,ct.data);else if(_.isFramebufferTexture){if(dt)if(I)e.texStorage2D(s.TEXTURE_2D,bt,Dt,ct.width,ct.height);else{let ht=ct.width,tt=ct.height;for(let Rt=0;Rt<bt;Rt++)e.texImage2D(s.TEXTURE_2D,Rt,Dt,ht,tt,0,Mt,Bt,null),ht>>=1,tt>>=1}}else if(Xt.length>0){if(I&&dt){const ht=Ht(Xt[0]);e.texStorage2D(s.TEXTURE_2D,bt,Dt,ht.width,ht.height)}for(let ht=0,tt=Xt.length;ht<tt;ht++)_t=Xt[ht],I?vt&&e.texSubImage2D(s.TEXTURE_2D,ht,0,0,Mt,Bt,_t):e.texImage2D(s.TEXTURE_2D,ht,Dt,Mt,Bt,_t);_.generateMipmaps=!1}else if(I){if(dt){const ht=Ht(ct);e.texStorage2D(s.TEXTURE_2D,bt,Dt,ht.width,ht.height)}vt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,Bt,ct)}else e.texImage2D(s.TEXTURE_2D,0,Dt,Mt,Bt,ct);m(_)&&p(q),Lt.__version=$.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function rt(E,_,k){if(_.image.length!==6)return;const q=zt(E,_),nt=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+k);const $=n.get(nt);if(nt.version!==$.__version||q===!0){e.activeTexture(s.TEXTURE0+k);const Lt=ne.getPrimaries(ne.workingColorSpace),pt=_.colorSpace===Vn?null:ne.getPrimaries(_.colorSpace),At=_.colorSpace===Vn||Lt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);const Ct=_.isCompressedTexture||_.image[0].isCompressedTexture,ct=_.image[0]&&_.image[0].isDataTexture,Mt=[];for(let tt=0;tt<6;tt++)!Ct&&!ct?Mt[tt]=v(_.image[tt],!0,i.maxCubemapSize):Mt[tt]=ct?_.image[tt].image:_.image[tt],Mt[tt]=Vt(_,Mt[tt]);const Bt=Mt[0],Dt=r.convert(_.format,_.colorSpace),_t=r.convert(_.type),Xt=M(_.internalFormat,Dt,_t,_.colorSpace),I=_.isVideoTexture!==!0,dt=$.__version===void 0||q===!0,vt=nt.dataReady;let bt=A(_,Bt);Pt(s.TEXTURE_CUBE_MAP,_);let ht;if(Ct){I&&dt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,bt,Xt,Bt.width,Bt.height);for(let tt=0;tt<6;tt++){ht=Mt[tt].mipmaps;for(let Rt=0;Rt<ht.length;Rt++){const Gt=ht[Rt];_.format!==dn?Dt!==null?I?vt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,0,0,Gt.width,Gt.height,Dt,Gt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,Xt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,0,0,Gt.width,Gt.height,Dt,_t,Gt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,Xt,Gt.width,Gt.height,0,Dt,_t,Gt.data)}}}else{if(ht=_.mipmaps,I&&dt){ht.length>0&&bt++;const tt=Ht(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,bt,Xt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ct){I?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Mt[tt].width,Mt[tt].height,Dt,_t,Mt[tt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Xt,Mt[tt].width,Mt[tt].height,0,Dt,_t,Mt[tt].data);for(let Rt=0;Rt<ht.length;Rt++){const ge=ht[Rt].image[tt].image;I?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,0,0,ge.width,ge.height,Dt,_t,ge.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,Xt,ge.width,ge.height,0,Dt,_t,ge.data)}}else{I?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Dt,_t,Mt[tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Xt,Dt,_t,Mt[tt]);for(let Rt=0;Rt<ht.length;Rt++){const Gt=ht[Rt];I?vt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,0,0,Dt,_t,Gt.image[tt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,Xt,Dt,_t,Gt.image[tt])}}}m(_)&&p(s.TEXTURE_CUBE_MAP),$.__version=nt.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function wt(E,_,k,q,nt,$){const Lt=r.convert(k.format,k.colorSpace),pt=r.convert(k.type),At=M(k.internalFormat,Lt,pt,k.colorSpace),Ct=n.get(_),ct=n.get(k);if(ct.__renderTarget=_,!Ct.__hasExternalTextures){const Mt=Math.max(1,_.width>>$),Bt=Math.max(1,_.height>>$);nt===s.TEXTURE_3D||nt===s.TEXTURE_2D_ARRAY?e.texImage3D(nt,$,At,Mt,Bt,_.depth,0,Lt,pt,null):e.texImage2D(nt,$,At,Mt,Bt,0,Lt,pt,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),lt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,nt,ct.__webglTexture,0,mt(_)):(nt===s.TEXTURE_2D||nt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,nt,ct.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(E,_,k){if(s.bindRenderbuffer(s.RENDERBUFFER,E),_.depthBuffer){const q=_.depthTexture,nt=q&&q.isDepthTexture?q.type:null,$=x(_.stencilBuffer,nt),Lt=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=mt(_);lt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,pt,$,_.width,_.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,pt,$,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,$,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Lt,s.RENDERBUFFER,E)}else{const q=_.textures;for(let nt=0;nt<q.length;nt++){const $=q[nt],Lt=r.convert($.format,$.colorSpace),pt=r.convert($.type),At=M($.internalFormat,Lt,pt,$.colorSpace),Ct=mt(_);k&&lt(_)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,At,_.width,_.height):lt(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ct,At,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,At,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Tt(E,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(_.depthTexture);q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),B(_.depthTexture,0);const nt=q.__webglTexture,$=mt(_);if(_.depthTexture.format===Ms)lt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,nt,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,nt,0);else if(_.depthTexture.format===Ss)lt(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,nt,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function jt(E){const _=n.get(E),k=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const q=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const nt=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",nt)};q.addEventListener("dispose",nt),_.__depthDisposeCallback=nt}_.__boundDepthTexture=q}if(E.depthTexture&&!_.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const q=E.texture.mipmaps;q&&q.length>0?Tt(_.__webglFramebuffer[0],E):Tt(_.__webglFramebuffer,E)}else if(k){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=s.createRenderbuffer(),Ut(_.__webglDepthbuffer[q],E,!1);else{const nt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,nt,s.RENDERBUFFER,$)}}else{const q=E.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),Ut(_.__webglDepthbuffer,E,!1);else{const nt=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,nt,s.RENDERBUFFER,$)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function me(E,_,k){const q=n.get(E);_!==void 0&&wt(q.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&jt(E)}function P(E){const _=E.texture,k=n.get(E),q=n.get(_);E.addEventListener("dispose",R);const nt=E.textures,$=E.isWebGLCubeRenderTarget===!0,Lt=nt.length>1;if(Lt||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=_.version,a.memory.textures++),$){k.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer[pt]=[];for(let At=0;At<_.mipmaps.length;At++)k.__webglFramebuffer[pt][At]=s.createFramebuffer()}else k.__webglFramebuffer[pt]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){k.__webglFramebuffer=[];for(let pt=0;pt<_.mipmaps.length;pt++)k.__webglFramebuffer[pt]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Lt)for(let pt=0,At=nt.length;pt<At;pt++){const Ct=n.get(nt[pt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&lt(E)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let pt=0;pt<nt.length;pt++){const At=nt[pt];k.__webglColorRenderbuffer[pt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[pt]);const Ct=r.convert(At.format,At.colorSpace),ct=r.convert(At.type),Mt=M(At.internalFormat,Ct,ct,At.colorSpace,E.isXRRenderTarget===!0),Bt=mt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Bt,Mt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,k.__webglColorRenderbuffer[pt])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),Ut(k.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Pt(s.TEXTURE_CUBE_MAP,_);for(let pt=0;pt<6;pt++)if(_.mipmaps&&_.mipmaps.length>0)for(let At=0;At<_.mipmaps.length;At++)wt(k.__webglFramebuffer[pt][At],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,At);else wt(k.__webglFramebuffer[pt],E,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(_)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let pt=0,At=nt.length;pt<At;pt++){const Ct=nt[pt],ct=n.get(Ct);let Mt=s.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Mt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Mt,ct.__webglTexture),Pt(Mt,Ct),wt(k.__webglFramebuffer,E,Ct,s.COLOR_ATTACHMENT0+pt,Mt,0),m(Ct)&&p(Mt)}e.unbindTexture()}else{let pt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(pt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(pt,q.__webglTexture),Pt(pt,_),_.mipmaps&&_.mipmaps.length>0)for(let At=0;At<_.mipmaps.length;At++)wt(k.__webglFramebuffer[At],E,_,s.COLOR_ATTACHMENT0,pt,At);else wt(k.__webglFramebuffer,E,_,s.COLOR_ATTACHMENT0,pt,0);m(_)&&p(pt),e.unbindTexture()}E.depthBuffer&&jt(E)}function it(E){const _=E.textures;for(let k=0,q=_.length;k<q;k++){const nt=_[k];if(m(nt)){const $=S(E),Lt=n.get(nt).__webglTexture;e.bindTexture($,Lt),p($),e.unbindTexture()}}}const Q=[],j=[];function J(E){if(E.samples>0){if(lt(E)===!1){const _=E.textures,k=E.width,q=E.height;let nt=s.COLOR_BUFFER_BIT;const $=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Lt=n.get(E),pt=_.length>1;if(pt)for(let Ct=0;Ct<_.length;Ct++)e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const At=E.texture.mipmaps;At&&At.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Ct=0;Ct<_.length;Ct++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(nt|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(nt|=s.STENCIL_BUFFER_BIT)),pt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ct]);const ct=n.get(_[Ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ct,0)}s.blitFramebuffer(0,0,k,q,0,0,k,q,nt,s.NEAREST),l===!0&&(Q.length=0,j.length=0,Q.push(s.COLOR_ATTACHMENT0+Ct),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Q.push($),j.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,j)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Q))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pt)for(let Ct=0;Ct<_.length;Ct++){e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ct]);const ct=n.get(_[Ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Lt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ct,s.TEXTURE_2D,ct,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const _=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function mt(E){return Math.min(i.maxSamples,E.samples)}function lt(E){const _=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function gt(E){const _=a.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function Vt(E,_){const k=E.colorSpace,q=E.format,nt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||k!==Wi&&k!==Vn&&(ne.getTransfer(k)===ce?(q!==dn||nt!==yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),_}function Ht(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=z,this.setTexture3D=W,this.setTextureCube=H,this.rebindTextures=me,this.setupRenderTarget=P,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=lt}function Gg(s,t){function e(n,i=Vn){let r;const a=ne.getTransfer(i);if(n===yn)return s.UNSIGNED_BYTE;if(n===bo)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Eo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Tc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Ac)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===bc)return s.BYTE;if(n===Ec)return s.SHORT;if(n===_s)return s.UNSIGNED_SHORT;if(n===wo)return s.INT;if(n===hi)return s.UNSIGNED_INT;if(n===xn)return s.FLOAT;if(n===Dn)return s.HALF_FLOAT;if(n===Cc)return s.ALPHA;if(n===Rc)return s.RGB;if(n===dn)return s.RGBA;if(n===Ms)return s.DEPTH_COMPONENT;if(n===Ss)return s.DEPTH_STENCIL;if(n===To)return s.RED;if(n===Ao)return s.RED_INTEGER;if(n===Pc)return s.RG;if(n===Co)return s.RG_INTEGER;if(n===Ro)return s.RGBA_INTEGER;if(n===mr||n===gr||n===vr||n===xr)if(a===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ba||n===ka||n===za||n===Ha)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ba)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Va||n===Ga||n===Wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Va||n===Ga)return a===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xa||n===qa||n===Ya||n===$a||n===Ka||n===Za||n===Ja||n===ja||n===Qa||n===to||n===eo||n===no||n===io||n===so)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$a)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ka)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Za)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ja)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ja)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qa)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===to)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===eo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===no)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===io)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===so)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ro||n===ao||n===oo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ro)return a===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ao)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lo||n===co||n===ho||n===uo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===lo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===co)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ho)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ys?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const Wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new qc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Le({vertexShader:Wg,fragmentShader:Xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ot(new Xe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yg extends $i{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new qg,p={},S=e.getContextAttributes();let M=null,x=null;const A=[],C=[],R=new st;let L=null;const w=new We;w.viewport=new fe;const y=new We;y.viewport=new fe;const D=[w,y],U=new fd;let V=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let rt=A[K];return rt===void 0&&(rt=new aa,A[K]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(K){let rt=A[K];return rt===void 0&&(rt=new aa,A[K]=rt),rt.getGripSpace()},this.getHand=function(K){let rt=A[K];return rt===void 0&&(rt=new aa,A[K]=rt),rt.getHandSpace()};function B(K){const rt=C.indexOf(K.inputSource);if(rt===-1)return;const wt=A[rt];wt!==void 0&&(wt.update(K.inputSource,K.frame,c||a),wt.dispatchEvent({type:K.type,data:K.inputSource}))}function z(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",W);for(let K=0;K<A.length;K++){const rt=C[K];rt!==null&&(C[K]=null,A[K].disconnect(rt))}V=null,F=null,m.reset();for(const K in p)delete p[K];t.setRenderTarget(M),f=null,d=null,u=null,i=null,x=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,e)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(M=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",z),i.addEventListener("inputsourceschange",W),S.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let wt=null,Ut=null,Tt=null;S.depth&&(Tt=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=S.stencil?Ss:Ms,Ut=S.stencil?ys:hi);const jt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(jt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new fn(d.textureWidth,d.textureHeight,{format:dn,type:yn,depthTexture:new Xc(d.textureWidth,d.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const wt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,wt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new fn(f.framebufferWidth,f.framebufferHeight,{format:dn,type:yn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Jt.setContext(i),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function W(K){for(let rt=0;rt<K.removed.length;rt++){const wt=K.removed[rt],Ut=C.indexOf(wt);Ut>=0&&(C[Ut]=null,A[Ut].disconnect(wt))}for(let rt=0;rt<K.added.length;rt++){const wt=K.added[rt];let Ut=C.indexOf(wt);if(Ut===-1){for(let jt=0;jt<A.length;jt++)if(jt>=C.length){C.push(wt),Ut=jt;break}else if(C[jt]===null){C[jt]=wt,Ut=jt;break}if(Ut===-1)break}const Tt=A[Ut];Tt&&Tt.connect(wt)}}const H=new T,Z=new T;function et(K,rt,wt){H.setFromMatrixPosition(rt.matrixWorld),Z.setFromMatrixPosition(wt.matrixWorld);const Ut=H.distanceTo(Z),Tt=rt.projectionMatrix.elements,jt=wt.projectionMatrix.elements,me=Tt[14]/(Tt[10]-1),P=Tt[14]/(Tt[10]+1),it=(Tt[9]+1)/Tt[5],Q=(Tt[9]-1)/Tt[5],j=(Tt[8]-1)/Tt[0],J=(jt[8]+1)/jt[0],mt=me*j,lt=me*J,gt=Ut/(-j+J),Vt=gt*-j;if(rt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Vt),K.translateZ(gt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Tt[10]===-1)K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const Ht=me+gt,E=P+gt,_=mt-Vt,k=lt+(Ut-Vt),q=it*P/E*Ht,nt=Q*P/E*Ht;K.projectionMatrix.makePerspective(_,k,q,nt,Ht,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ft(K,rt){rt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(rt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let rt=K.near,wt=K.far;m.texture!==null&&(m.depthNear>0&&(rt=m.depthNear),m.depthFar>0&&(wt=m.depthFar)),U.near=y.near=w.near=rt,U.far=y.far=w.far=wt,(V!==U.near||F!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),V=U.near,F=U.far),U.layers.mask=K.layers.mask|6,w.layers.mask=U.layers.mask&3,y.layers.mask=U.layers.mask&5;const Ut=K.parent,Tt=U.cameras;ft(U,Ut);for(let jt=0;jt<Tt.length;jt++)ft(Tt[jt],Ut);Tt.length===2?et(U,w,y):U.projectionMatrix.copy(w.projectionMatrix),Pt(K,U,Ut)};function Pt(K,rt,wt){wt===null?K.matrix.copy(rt.matrixWorld):(K.matrix.copy(wt.matrixWorld),K.matrix.invert(),K.matrix.multiply(rt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(rt.projectionMatrix),K.projectionMatrixInverse.copy(rt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ar*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(K){return p[K]};let zt=null;function $t(K,rt){if(h=rt.getViewerPose(c||a),g=rt,h!==null){const wt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let Ut=!1;wt.length!==U.cameras.length&&(U.cameras.length=0,Ut=!0);for(let P=0;P<wt.length;P++){const it=wt[P];let Q=null;if(f!==null)Q=f.getViewport(it);else{const J=u.getViewSubImage(d,it);Q=J.viewport,P===0&&(t.setRenderTargetTextures(x,J.colorTexture,J.depthStencilTexture),t.setRenderTarget(x))}let j=D[P];j===void 0&&(j=new We,j.layers.enable(P),j.viewport=new fe,D[P]=j),j.matrix.fromArray(it.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(it.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Q.x,Q.y,Q.width,Q.height),P===0&&(U.matrix.copy(j.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ut===!0&&U.cameras.push(j)}const Tt=i.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const P=u.getDepthInformation(wt[0]);P&&P.isValid&&P.texture&&m.init(P,i.renderState)}if(Tt&&Tt.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let P=0;P<wt.length;P++){const it=wt[P].camera;if(it){let Q=p[it];Q||(Q=new qc,p[it]=Q);const j=u.getCameraImage(it);Q.sourceTexture=j}}}}for(let wt=0;wt<A.length;wt++){const Ut=C[wt],Tt=A[wt];Ut!==null&&Tt!==void 0&&Tt.update(Ut,rt,c||a)}zt&&zt(K,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const Jt=new nh;Jt.setAnimationLoop($t),this.setAnimationLoop=function(K){zt=K},this.dispose=function(){}}}const Qn=new an,$g=new oe;function Kg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,zc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),M=S.envMap,x=S.envMapRotation;M&&(m.envMap.value=M,Qn.copy(x),Qn.x*=-1,Qn.y*=-1,Qn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Qn.y*=-1,Qn.z*=-1),m.envMapRotation.value.setFromMatrix4($g.makeRotationFromEuler(Qn)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Zg(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const x=M.program;n.uniformBlockBinding(S,x)}function c(S,M){let x=i[S.id];x===void 0&&(g(S),x=h(S),i[S.id]=x,S.addEventListener("dispose",m));const A=M.program;n.updateUBOMapping(S,A);const C=t.render.frame;r[S.id]!==C&&(d(S),r[S.id]=C)}function h(S){const M=u();S.__bindingPointIndex=M;const x=s.createBuffer(),A=S.__size,C=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,A,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,x),x}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const M=i[S.id],x=S.uniforms,A=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let C=0,R=x.length;C<R;C++){const L=Array.isArray(x[C])?x[C]:[x[C]];for(let w=0,y=L.length;w<y;w++){const D=L[w];if(f(D,C,w,A)===!0){const U=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let F=0;for(let B=0;B<V.length;B++){const z=V[B],W=v(z);typeof z=="number"||typeof z=="boolean"?(D.__data[0]=z,s.bufferSubData(s.UNIFORM_BUFFER,U+F,D.__data)):z.isMatrix3?(D.__data[0]=z.elements[0],D.__data[1]=z.elements[1],D.__data[2]=z.elements[2],D.__data[3]=0,D.__data[4]=z.elements[3],D.__data[5]=z.elements[4],D.__data[6]=z.elements[5],D.__data[7]=0,D.__data[8]=z.elements[6],D.__data[9]=z.elements[7],D.__data[10]=z.elements[8],D.__data[11]=0):(z.toArray(D.__data,F),F+=W.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(S,M,x,A){const C=S.value,R=M+"_"+x;if(A[R]===void 0)return typeof C=="number"||typeof C=="boolean"?A[R]=C:A[R]=C.clone(),!0;{const L=A[R];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return A[R]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(S){const M=S.uniforms;let x=0;const A=16;for(let R=0,L=M.length;R<L;R++){const w=Array.isArray(M[R])?M[R]:[M[R]];for(let y=0,D=w.length;y<D;y++){const U=w[y],V=Array.isArray(U.value)?U.value:[U.value];for(let F=0,B=V.length;F<B;F++){const z=V[F],W=v(z),H=x%A,Z=H%W.boundary,et=H+Z;x+=Z,et!==0&&A-et<W.storage&&(x+=A-et),U.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=W.storage}}}const C=x%A;return C>0&&(x+=A-C),S.__size=x,S.__cache={},this}function v(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function m(S){const M=S.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const S in i)s.deleteBuffer(i[S]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Jg{constructor(t={}){const{canvas:e=$h(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const S=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let A=!1;this._outputColorSpace=Re;let C=0,R=0,L=null,w=-1,y=null;const D=new fe,U=new fe;let V=null;const F=new It(0);let B=0,z=e.width,W=e.height,H=1,Z=null,et=null;const ft=new fe(0,0,z,W),Pt=new fe(0,0,z,W);let zt=!1;const $t=new Do;let Jt=!1,K=!1;const rt=new oe,wt=new T,Ut=new fe,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let jt=!1;function me(){return L===null?H:1}let P=n;function it(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Mo}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),P===null){const N="webgl2";if(P=it(N,b),P===null)throw it(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Q,j,J,mt,lt,gt,Vt,Ht,E,_,k,q,nt,$,Lt,pt,At,Ct,ct,Mt,Bt,Dt,_t,Xt;function I(){Q=new om(P),Q.init(),Dt=new Gg(P,Q),j=new tm(P,Q,t,Dt),J=new Hg(P,Q),j.reversedDepthBuffer&&d&&J.buffers.depth.setReversed(!0),mt=new hm(P),lt=new Cg,gt=new Vg(P,Q,J,lt,j,Dt,mt),Vt=new nm(x),Ht=new am(x),E=new md(P),_t=new jp(P,E),_=new lm(P,E,mt,_t),k=new dm(P,_,E,mt),ct=new um(P,j,gt),pt=new em(lt),q=new Ag(x,Vt,Ht,Q,j,_t,pt),nt=new Kg(x,lt),$=new Pg,Lt=new Fg(Q),Ct=new Jp(x,Vt,Ht,J,k,f,l),At=new kg(x,k,j),Xt=new Zg(P,mt,j,J),Mt=new Qp(P,Q,mt),Bt=new cm(P,Q,mt),mt.programs=q.programs,x.capabilities=j,x.extensions=Q,x.properties=lt,x.renderLists=$,x.shadowMap=At,x.state=J,x.info=mt}I();const dt=new Yg(x,P);this.xr=dt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=Q.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Q.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(b){b!==void 0&&(H=b,this.setSize(z,W,!1))},this.getSize=function(b){return b.set(z,W)},this.setSize=function(b,N,G=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,W=N,e.width=Math.floor(b*H),e.height=Math.floor(N*H),G===!0&&(e.style.width=b+"px",e.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(z*H,W*H).floor()},this.setDrawingBufferSize=function(b,N,G){z=b,W=N,H=G,e.width=Math.floor(b*G),e.height=Math.floor(N*G),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(ft)},this.setViewport=function(b,N,G,X){b.isVector4?ft.set(b.x,b.y,b.z,b.w):ft.set(b,N,G,X),J.viewport(D.copy(ft).multiplyScalar(H).round())},this.getScissor=function(b){return b.copy(Pt)},this.setScissor=function(b,N,G,X){b.isVector4?Pt.set(b.x,b.y,b.z,b.w):Pt.set(b,N,G,X),J.scissor(U.copy(Pt).multiplyScalar(H).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(b){J.setScissorTest(zt=b)},this.setOpaqueSort=function(b){Z=b},this.setTransparentSort=function(b){et=b},this.getClearColor=function(b){return b.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,G=!0){let X=0;if(b){let O=!1;if(L!==null){const ut=L.texture.format;O=ut===Ro||ut===Co||ut===Ao}if(O){const ut=L.texture.type,yt=ut===yn||ut===hi||ut===_s||ut===ys||ut===bo||ut===Eo,Et=Ct.getClearColor(),St=Ct.getClearAlpha(),Ot=Et.r,kt=Et.g,Nt=Et.b;yt?(g[0]=Ot,g[1]=kt,g[2]=Nt,g[3]=St,P.clearBufferuiv(P.COLOR,0,g)):(v[0]=Ot,v[1]=kt,v[2]=Nt,v[3]=St,P.clearBufferiv(P.COLOR,0,v))}else X|=P.COLOR_BUFFER_BIT}N&&(X|=P.DEPTH_BUFFER_BIT),G&&(X|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),Ct.dispose(),$.dispose(),Lt.dispose(),lt.dispose(),Vt.dispose(),Ht.dispose(),k.dispose(),_t.dispose(),Xt.dispose(),q.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",pn),dt.removeEventListener("sessionend",Go),qn.stop()};function vt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=mt.autoReset,N=At.enabled,G=At.autoUpdate,X=At.needsUpdate,O=At.type;I(),mt.autoReset=b,At.enabled=N,At.autoUpdate=G,At.needsUpdate=X,At.type=O}function ht(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function tt(b){const N=b.target;N.removeEventListener("dispose",tt),Rt(N)}function Rt(b){Gt(b),lt.remove(b)}function Gt(b){const N=lt.get(b).programs;N!==void 0&&(N.forEach(function(G){q.releaseProgram(G)}),b.isShaderMaterial&&q.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,G,X,O,ut){N===null&&(N=Tt);const yt=O.isMesh&&O.matrixWorld.determinant()<0,Et=lh(b,N,G,X,O);J.setMaterial(X,yt);let St=G.index,Ot=1;if(X.wireframe===!0){if(St=_.getWireframeAttribute(G),St===void 0)return;Ot=2}const kt=G.drawRange,Nt=G.attributes.position;let Qt=kt.start*Ot,he=(kt.start+kt.count)*Ot;ut!==null&&(Qt=Math.max(Qt,ut.start*Ot),he=Math.min(he,(ut.start+ut.count)*Ot)),St!==null?(Qt=Math.max(Qt,0),he=Math.min(he,St.count)):Nt!=null&&(Qt=Math.max(Qt,0),he=Math.min(he,Nt.count));const Se=he-Qt;if(Se<0||Se===1/0)return;_t.setup(O,X,Et,G,St);let ve,pe=Mt;if(St!==null&&(ve=E.get(St),pe=Bt,pe.setIndex(ve)),O.isMesh)X.wireframe===!0?(J.setLineWidth(X.wireframeLinewidth*me()),pe.setMode(P.LINES)):pe.setMode(P.TRIANGLES);else if(O.isLine){let Ft=X.linewidth;Ft===void 0&&(Ft=1),J.setLineWidth(Ft*me()),O.isLineSegments?pe.setMode(P.LINES):O.isLineLoop?pe.setMode(P.LINE_LOOP):pe.setMode(P.LINE_STRIP)}else O.isPoints?pe.setMode(P.POINTS):O.isSprite&&pe.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ws("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pe.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))pe.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Ft=O._multiDrawStarts,xe=O._multiDrawCounts,ie=O._multiDrawCount,Ye=St?E.get(St).bytesPerElement:1,mi=lt.get(X).currentProgram.getUniforms();for(let $e=0;$e<ie;$e++)mi.setValue(P,"_gl_DrawID",$e),pe.render(Ft[$e]/Ye,xe[$e])}else if(O.isInstancedMesh)pe.renderInstances(Qt,Se,O.count);else if(G.isInstancedBufferGeometry){const Ft=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,xe=Math.min(G.instanceCount,Ft);pe.renderInstances(Qt,Se,xe)}else pe.render(Qt,Se)};function ge(b,N,G){b.transparent===!0&&b.side===je&&b.forceSinglePass===!1?(b.side=Oe,b.needsUpdate=!0,Is(b,N,G),b.side=Wn,b.needsUpdate=!0,Is(b,N,G),b.side=je):Is(b,N,G)}this.compile=function(b,N,G=null){G===null&&(G=b),p=Lt.get(G),p.init(N),M.push(p),G.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),b!==G&&b.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const X=new Set;return b.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ut=O.material;if(ut)if(Array.isArray(ut))for(let yt=0;yt<ut.length;yt++){const Et=ut[yt];ge(Et,G,O),X.add(Et)}else ge(ut,G,O),X.add(ut)}),p=M.pop(),X},this.compileAsync=function(b,N,G=null){const X=this.compile(b,N,G);return new Promise(O=>{function ut(){if(X.forEach(function(yt){lt.get(yt).currentProgram.isReady()&&X.delete(yt)}),X.size===0){O(b);return}setTimeout(ut,10)}Q.get("KHR_parallel_shader_compile")!==null?ut():setTimeout(ut,10)})};let re=null;function Sn(b){re&&re(b)}function pn(){qn.stop()}function Go(){qn.start()}const qn=new nh;qn.setAnimationLoop(Sn),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(b){re=b,dt.setAnimationLoop(b),b===null?qn.stop():qn.start()},dt.addEventListener("sessionstart",pn),dt.addEventListener("sessionend",Go),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(N),N=dt.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,N,L),p=Lt.get(b,M.length),p.init(N),M.push(p),rt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$t.setFromProjectionMatrix(rt,_n,N.reversedDepth),K=this.localClippingEnabled,Jt=pt.init(this.clippingPlanes,K),m=$.get(b,S.length),m.init(),S.push(m),dt.enabled===!0&&dt.isPresenting===!0){const ut=x.xr.getDepthSensingMesh();ut!==null&&Nr(ut,N,-1/0,x.sortObjects)}Nr(b,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Z,et),jt=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,jt&&Ct.addToRenderList(m,b),this.info.render.frame++,Jt===!0&&pt.beginShadows();const G=p.state.shadowsArray;At.render(G,b,N),Jt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,O=m.transmissive;if(p.setupLights(),N.isArrayCamera){const ut=N.cameras;if(O.length>0)for(let yt=0,Et=ut.length;yt<Et;yt++){const St=ut[yt];Xo(X,O,b,St)}jt&&Ct.render(b);for(let yt=0,Et=ut.length;yt<Et;yt++){const St=ut[yt];Wo(m,b,St,St.viewport)}}else O.length>0&&Xo(X,O,b,N),jt&&Ct.render(b),Wo(m,b,N);L!==null&&R===0&&(gt.updateMultisampleRenderTarget(L),gt.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(x,b,N),_t.resetDefaultState(),w=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],Jt===!0&&pt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Nr(b,N,G,X){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||$t.intersectsSprite(b)){X&&Ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(rt);const yt=k.update(b),Et=b.material;Et.visible&&m.push(b,yt,Et,G,Ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||$t.intersectsObject(b))){const yt=k.update(b),Et=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ut.copy(b.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Ut.copy(yt.boundingSphere.center)),Ut.applyMatrix4(b.matrixWorld).applyMatrix4(rt)),Array.isArray(Et)){const St=yt.groups;for(let Ot=0,kt=St.length;Ot<kt;Ot++){const Nt=St[Ot],Qt=Et[Nt.materialIndex];Qt&&Qt.visible&&m.push(b,yt,Qt,G,Ut.z,Nt)}}else Et.visible&&m.push(b,yt,Et,G,Ut.z,null)}}const ut=b.children;for(let yt=0,Et=ut.length;yt<Et;yt++)Nr(ut[yt],N,G,X)}function Wo(b,N,G,X){const O=b.opaque,ut=b.transmissive,yt=b.transparent;p.setupLightsView(G),Jt===!0&&pt.setGlobalState(x.clippingPlanes,G),X&&J.viewport(D.copy(X)),O.length>0&&Ds(O,N,G),ut.length>0&&Ds(ut,N,G),yt.length>0&&Ds(yt,N,G),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Xo(b,N,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new fn(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?Dn:yn,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const ut=p.state.transmissionRenderTarget[X.id],yt=X.viewport||D;ut.setSize(yt.z*x.transmissionResolutionScale,yt.w*x.transmissionResolutionScale);const Et=x.getRenderTarget(),St=x.getActiveCubeFace(),Ot=x.getActiveMipmapLevel();x.setRenderTarget(ut),x.getClearColor(F),B=x.getClearAlpha(),B<1&&x.setClearColor(16777215,.5),x.clear(),jt&&Ct.render(G);const kt=x.toneMapping;x.toneMapping=Gn;const Nt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),Jt===!0&&pt.setGlobalState(x.clippingPlanes,X),Ds(b,G,X),gt.updateMultisampleRenderTarget(ut),gt.updateRenderTargetMipmap(ut),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let he=0,Se=N.length;he<Se;he++){const ve=N[he],pe=ve.object,Ft=ve.geometry,xe=ve.material,ie=ve.group;if(xe.side===je&&pe.layers.test(X.layers)){const Ye=xe.side;xe.side=Oe,xe.needsUpdate=!0,qo(pe,G,X,Ft,xe,ie),xe.side=Ye,xe.needsUpdate=!0,Qt=!0}}Qt===!0&&(gt.updateMultisampleRenderTarget(ut),gt.updateRenderTargetMipmap(ut))}x.setRenderTarget(Et,St,Ot),x.setClearColor(F,B),Nt!==void 0&&(X.viewport=Nt),x.toneMapping=kt}function Ds(b,N,G){const X=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ut=b.length;O<ut;O++){const yt=b[O],Et=yt.object,St=yt.geometry,Ot=yt.group;let kt=yt.material;kt.allowOverride===!0&&X!==null&&(kt=X),Et.layers.test(G.layers)&&qo(Et,N,G,St,kt,Ot)}}function qo(b,N,G,X,O,ut){b.onBeforeRender(x,N,G,X,O,ut),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),O.onBeforeRender(x,N,G,X,b,ut),O.transparent===!0&&O.side===je&&O.forceSinglePass===!1?(O.side=Oe,O.needsUpdate=!0,x.renderBufferDirect(G,N,X,O,b,ut),O.side=Wn,O.needsUpdate=!0,x.renderBufferDirect(G,N,X,O,b,ut),O.side=je):x.renderBufferDirect(G,N,X,O,b,ut),b.onAfterRender(x,N,G,X,O,ut)}function Is(b,N,G){N.isScene!==!0&&(N=Tt);const X=lt.get(b),O=p.state.lights,ut=p.state.shadowsArray,yt=O.state.version,Et=q.getParameters(b,O.state,ut,N,G),St=q.getProgramCacheKey(Et);let Ot=X.programs;X.environment=b.isMeshStandardMaterial?N.environment:null,X.fog=N.fog,X.envMap=(b.isMeshStandardMaterial?Ht:Vt).get(b.envMap||X.environment),X.envMapRotation=X.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ot===void 0&&(b.addEventListener("dispose",tt),Ot=new Map,X.programs=Ot);let kt=Ot.get(St);if(kt!==void 0){if(X.currentProgram===kt&&X.lightsStateVersion===yt)return $o(b,Et),kt}else Et.uniforms=q.getUniforms(b),b.onBeforeCompile(Et,x),kt=q.acquireProgram(Et,St),Ot.set(St,kt),X.uniforms=Et.uniforms;const Nt=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Nt.clippingPlanes=pt.uniform),$o(b,Et),X.needsLights=hh(b),X.lightsStateVersion=yt,X.needsLights&&(Nt.ambientLightColor.value=O.state.ambient,Nt.lightProbe.value=O.state.probe,Nt.directionalLights.value=O.state.directional,Nt.directionalLightShadows.value=O.state.directionalShadow,Nt.spotLights.value=O.state.spot,Nt.spotLightShadows.value=O.state.spotShadow,Nt.rectAreaLights.value=O.state.rectArea,Nt.ltc_1.value=O.state.rectAreaLTC1,Nt.ltc_2.value=O.state.rectAreaLTC2,Nt.pointLights.value=O.state.point,Nt.pointLightShadows.value=O.state.pointShadow,Nt.hemisphereLights.value=O.state.hemi,Nt.directionalShadowMap.value=O.state.directionalShadowMap,Nt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Nt.spotShadowMap.value=O.state.spotShadowMap,Nt.spotLightMatrix.value=O.state.spotLightMatrix,Nt.spotLightMap.value=O.state.spotLightMap,Nt.pointShadowMap.value=O.state.pointShadowMap,Nt.pointShadowMatrix.value=O.state.pointShadowMatrix),X.currentProgram=kt,X.uniformsList=null,kt}function Yo(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Sr.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function $o(b,N){const G=lt.get(b);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function lh(b,N,G,X,O){N.isScene!==!0&&(N=Tt),gt.resetTextureUnits();const ut=N.fog,yt=X.isMeshStandardMaterial?N.environment:null,Et=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Wi,St=(X.isMeshStandardMaterial?Ht:Vt).get(X.envMap||yt),Ot=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,kt=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Nt=!!G.morphAttributes.position,Qt=!!G.morphAttributes.normal,he=!!G.morphAttributes.color;let Se=Gn;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Se=x.toneMapping);const ve=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,pe=ve!==void 0?ve.length:0,Ft=lt.get(X),xe=p.state.lights;if(Jt===!0&&(K===!0||b!==y)){const ke=b===y&&X.id===w;pt.setState(X,b,ke)}let ie=!1;X.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==xe.state.version||Ft.outputColorSpace!==Et||O.isBatchedMesh&&Ft.batching===!1||!O.isBatchedMesh&&Ft.batching===!0||O.isBatchedMesh&&Ft.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ft.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ft.instancing===!1||!O.isInstancedMesh&&Ft.instancing===!0||O.isSkinnedMesh&&Ft.skinning===!1||!O.isSkinnedMesh&&Ft.skinning===!0||O.isInstancedMesh&&Ft.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ft.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ft.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ft.instancingMorph===!1&&O.morphTexture!==null||Ft.envMap!==St||X.fog===!0&&Ft.fog!==ut||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==pt.numPlanes||Ft.numIntersection!==pt.numIntersection)||Ft.vertexAlphas!==Ot||Ft.vertexTangents!==kt||Ft.morphTargets!==Nt||Ft.morphNormals!==Qt||Ft.morphColors!==he||Ft.toneMapping!==Se||Ft.morphTargetsCount!==pe)&&(ie=!0):(ie=!0,Ft.__version=X.version);let Ye=Ft.currentProgram;ie===!0&&(Ye=Is(X,N,O));let mi=!1,$e=!1,es=!1;const _e=Ye.getUniforms(),en=Ft.uniforms;if(J.useProgram(Ye.program)&&(mi=!0,$e=!0,es=!0),X.id!==w&&(w=X.id,$e=!0),mi||y!==b){J.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),_e.setValue(P,"projectionMatrix",b.projectionMatrix),_e.setValue(P,"viewMatrix",b.matrixWorldInverse);const Ge=_e.map.cameraPosition;Ge!==void 0&&Ge.setValue(P,wt.setFromMatrixPosition(b.matrixWorld)),j.logarithmicDepthBuffer&&_e.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&_e.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,$e=!0,es=!0)}if(O.isSkinnedMesh){_e.setOptional(P,O,"bindMatrix"),_e.setOptional(P,O,"bindMatrixInverse");const ke=O.skeleton;ke&&(ke.boneTexture===null&&ke.computeBoneTexture(),_e.setValue(P,"boneTexture",ke.boneTexture,gt))}O.isBatchedMesh&&(_e.setOptional(P,O,"batchingTexture"),_e.setValue(P,"batchingTexture",O._matricesTexture,gt),_e.setOptional(P,O,"batchingIdTexture"),_e.setValue(P,"batchingIdTexture",O._indirectTexture,gt),_e.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&_e.setValue(P,"batchingColorTexture",O._colorsTexture,gt));const nn=G.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&ct.update(O,G,Ye),($e||Ft.receiveShadow!==O.receiveShadow)&&(Ft.receiveShadow=O.receiveShadow,_e.setValue(P,"receiveShadow",O.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(en.envMap.value=St,en.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&N.environment!==null&&(en.envMapIntensity.value=N.environmentIntensity),$e&&(_e.setValue(P,"toneMappingExposure",x.toneMappingExposure),Ft.needsLights&&ch(en,es),ut&&X.fog===!0&&nt.refreshFogUniforms(en,ut),nt.refreshMaterialUniforms(en,X,H,W,p.state.transmissionRenderTarget[b.id]),Sr.upload(P,Yo(Ft),en,gt)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Sr.upload(P,Yo(Ft),en,gt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&_e.setValue(P,"center",O.center),_e.setValue(P,"modelViewMatrix",O.modelViewMatrix),_e.setValue(P,"normalMatrix",O.normalMatrix),_e.setValue(P,"modelMatrix",O.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const ke=X.uniformsGroups;for(let Ge=0,Fr=ke.length;Ge<Fr;Ge++){const Yn=ke[Ge];Xt.update(Yn,Ye),Xt.bind(Yn,Ye)}}return Ye}function ch(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function hh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,N,G){const X=lt.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),lt.get(b.texture).__webglTexture=N,lt.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:G,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){const G=lt.get(b);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0};const uh=P.createFramebuffer();this.setRenderTarget=function(b,N=0,G=0){L=b,C=N,R=G;let X=!0,O=null,ut=!1,yt=!1;if(b){const St=lt.get(b);if(St.__useDefaultFramebuffer!==void 0)J.bindFramebuffer(P.FRAMEBUFFER,null),X=!1;else if(St.__webglFramebuffer===void 0)gt.setupRenderTarget(b);else if(St.__hasExternalTextures)gt.rebindTextures(b,lt.get(b.texture).__webglTexture,lt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Nt=b.depthTexture;if(St.__boundDepthTexture!==Nt){if(Nt!==null&&lt.has(Nt)&&(b.width!==Nt.image.width||b.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(b)}}const Ot=b.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(yt=!0);const kt=lt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(kt[N])?O=kt[N][G]:O=kt[N],ut=!0):b.samples>0&&gt.useMultisampledRTT(b)===!1?O=lt.get(b).__webglMultisampledFramebuffer:Array.isArray(kt)?O=kt[G]:O=kt,D.copy(b.viewport),U.copy(b.scissor),V=b.scissorTest}else D.copy(ft).multiplyScalar(H).floor(),U.copy(Pt).multiplyScalar(H).floor(),V=zt;if(G!==0&&(O=uh),J.bindFramebuffer(P.FRAMEBUFFER,O)&&X&&J.drawBuffers(b,O),J.viewport(D),J.scissor(U),J.setScissorTest(V),ut){const St=lt.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,St.__webglTexture,G)}else if(yt){const St=N;for(let Ot=0;Ot<b.textures.length;Ot++){const kt=lt.get(b.textures[Ot]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ot,kt.__webglTexture,G,St)}}else if(b!==null&&G!==0){const St=lt.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,St.__webglTexture,G)}w=-1},this.readRenderTargetPixels=function(b,N,G,X,O,ut,yt,Et=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=lt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(St=St[yt]),St){J.bindFramebuffer(P.FRAMEBUFFER,St);try{const Ot=b.textures[Et],kt=Ot.format,Nt=Ot.type;if(!j.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!j.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-X&&G>=0&&G<=b.height-O&&(b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Et),P.readPixels(N,G,X,O,Dt.convert(kt),Dt.convert(Nt),ut))}finally{const Ot=L!==null?lt.get(L).__webglFramebuffer:null;J.bindFramebuffer(P.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(b,N,G,X,O,ut,yt,Et=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=lt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&yt!==void 0&&(St=St[yt]),St)if(N>=0&&N<=b.width-X&&G>=0&&G<=b.height-O){J.bindFramebuffer(P.FRAMEBUFFER,St);const Ot=b.textures[Et],kt=Ot.format,Nt=Ot.type;if(!j.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!j.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Qt),P.bufferData(P.PIXEL_PACK_BUFFER,ut.byteLength,P.STREAM_READ),b.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Et),P.readPixels(N,G,X,O,Dt.convert(kt),Dt.convert(Nt),0);const he=L!==null?lt.get(L).__webglFramebuffer:null;J.bindFramebuffer(P.FRAMEBUFFER,he);const Se=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Kh(P,Se,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Qt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ut),P.deleteBuffer(Qt),P.deleteSync(Se),ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,G=0){const X=Math.pow(2,-G),O=Math.floor(b.image.width*X),ut=Math.floor(b.image.height*X),yt=N!==null?N.x:0,Et=N!==null?N.y:0;gt.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,yt,Et,O,ut),J.unbindTexture()};const dh=P.createFramebuffer(),fh=P.createFramebuffer();this.copyTextureToTexture=function(b,N,G=null,X=null,O=0,ut=null){ut===null&&(O!==0?(ws("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ut=O,O=0):ut=0);let yt,Et,St,Ot,kt,Nt,Qt,he,Se;const ve=b.isCompressedTexture?b.mipmaps[ut]:b.image;if(G!==null)yt=G.max.x-G.min.x,Et=G.max.y-G.min.y,St=G.isBox3?G.max.z-G.min.z:1,Ot=G.min.x,kt=G.min.y,Nt=G.isBox3?G.min.z:0;else{const nn=Math.pow(2,-O);yt=Math.floor(ve.width*nn),Et=Math.floor(ve.height*nn),b.isDataArrayTexture?St=ve.depth:b.isData3DTexture?St=Math.floor(ve.depth*nn):St=1,Ot=0,kt=0,Nt=0}X!==null?(Qt=X.x,he=X.y,Se=X.z):(Qt=0,he=0,Se=0);const pe=Dt.convert(N.format),Ft=Dt.convert(N.type);let xe;N.isData3DTexture?(gt.setTexture3D(N,0),xe=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(gt.setTexture2DArray(N,0),xe=P.TEXTURE_2D_ARRAY):(gt.setTexture2D(N,0),xe=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const ie=P.getParameter(P.UNPACK_ROW_LENGTH),Ye=P.getParameter(P.UNPACK_IMAGE_HEIGHT),mi=P.getParameter(P.UNPACK_SKIP_PIXELS),$e=P.getParameter(P.UNPACK_SKIP_ROWS),es=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ve.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ve.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ot),P.pixelStorei(P.UNPACK_SKIP_ROWS,kt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Nt);const _e=b.isDataArrayTexture||b.isData3DTexture,en=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){const nn=lt.get(b),ke=lt.get(N),Ge=lt.get(nn.__renderTarget),Fr=lt.get(ke.__renderTarget);J.bindFramebuffer(P.READ_FRAMEBUFFER,Ge.__webglFramebuffer),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,Fr.__webglFramebuffer);for(let Yn=0;Yn<St;Yn++)_e&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,lt.get(b).__webglTexture,O,Nt+Yn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,lt.get(N).__webglTexture,ut,Se+Yn)),P.blitFramebuffer(Ot,kt,yt,Et,Qt,he,yt,Et,P.DEPTH_BUFFER_BIT,P.NEAREST);J.bindFramebuffer(P.READ_FRAMEBUFFER,null),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||b.isRenderTargetTexture||lt.has(b)){const nn=lt.get(b),ke=lt.get(N);J.bindFramebuffer(P.READ_FRAMEBUFFER,dh),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,fh);for(let Ge=0;Ge<St;Ge++)_e?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,nn.__webglTexture,O,Nt+Ge):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,nn.__webglTexture,O),en?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ke.__webglTexture,ut,Se+Ge):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ke.__webglTexture,ut),O!==0?P.blitFramebuffer(Ot,kt,yt,Et,Qt,he,yt,Et,P.COLOR_BUFFER_BIT,P.NEAREST):en?P.copyTexSubImage3D(xe,ut,Qt,he,Se+Ge,Ot,kt,yt,Et):P.copyTexSubImage2D(xe,ut,Qt,he,Ot,kt,yt,Et);J.bindFramebuffer(P.READ_FRAMEBUFFER,null),J.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else en?b.isDataTexture||b.isData3DTexture?P.texSubImage3D(xe,ut,Qt,he,Se,yt,Et,St,pe,Ft,ve.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(xe,ut,Qt,he,Se,yt,Et,St,pe,ve.data):P.texSubImage3D(xe,ut,Qt,he,Se,yt,Et,St,pe,Ft,ve):b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ut,Qt,he,yt,Et,pe,Ft,ve.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ut,Qt,he,ve.width,ve.height,pe,ve.data):P.texSubImage2D(P.TEXTURE_2D,ut,Qt,he,yt,Et,pe,Ft,ve);P.pixelStorei(P.UNPACK_ROW_LENGTH,ie),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ye),P.pixelStorei(P.UNPACK_SKIP_PIXELS,mi),P.pixelStorei(P.UNPACK_SKIP_ROWS,$e),P.pixelStorei(P.UNPACK_SKIP_IMAGES,es),ut===0&&N.generateMipmaps&&P.generateMipmap(xe),J.unbindTexture()},this.initRenderTarget=function(b){lt.get(b).__webglFramebuffer===void 0&&gt.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?gt.setTextureCube(b,0):b.isData3DTexture?gt.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?gt.setTexture2DArray(b,0):gt.setTexture2D(b,0),J.unbindTexture()},this.resetState=function(){C=0,R=0,L=null,J.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}const wr={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Qi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const jg=new zo(-1,1,1,-1,0,1);class Qg extends Me{constructor(){super(),this.setAttribute("position",new te([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new te([0,2,0,0,2,0],2))}}const t0=new Qg;class Vo{constructor(t){this._mesh=new ot(t0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,jg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class e0 extends Qi{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Le?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=bs.clone(t.uniforms),this.material=new Le({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Vo(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class nc extends Qi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class n0 extends Qi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class i0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new st);this._width=n.width,this._height=n.height,e=new fn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Dn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new e0(wr),this.copyPass.material.blending=Ln,this.clock=new eh}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}nc!==void 0&&(a instanceof nc?n=!0:a instanceof n0&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new st);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class s0 extends Qi{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new It}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}}const r0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new It(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Yi extends Qi{constructor(t,e=1,n,i){super(),this.strength=e,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new st(t.x,t.y):new st(256,256),this.clearColor=new It(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new fn(r,a,{type:Dn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new fn(r,a,{type:Dn});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new fn(r,a,{type:Dn});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=r0;this.highPassUniforms=bs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Le({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new st(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=bs.clone(wr.uniforms),this.blendMaterial=new Le({uniforms:this.copyUniforms,vertexShader:wr.vertexShader,fragmentShader:wr.fragmentShader,blending:Je,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new It,this._oldClearAlpha=1,this._basic=new Qe,this._fsQuad=new Vo(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new st(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Yi.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Yi.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Le({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new st(.5,.5)},direction:{value:new st(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Le({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Yi.BlurDirectionX=new st(1,0);Yi.BlurDirectionY=new st(0,1);const hr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class a0 extends Qi{constructor(){super(),this.uniforms=bs.clone(hr.uniforms),this.material=new rd({name:hr.name,uniforms:this.uniforms,vertexShader:hr.vertexShader,fragmentShader:hr.fragmentShader}),this._fsQuad=new Vo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===vc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===xc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===_c?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===So?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Mc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Sc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===yc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Kt=(s,t,e)=>Math.max(t,Math.min(e,s)),le=(s,t,e)=>s+(t-s)*e,ee=(s,t,e,n)=>le(s,t,1-Math.exp(-e*n)),Y=(s=0,t=1)=>s+Math.random()*(t-s),o0=s=>s[Math.floor(Math.random()*s.length)],Rn=s=>Math.random()<s;function ur(s,t,e,n){let i=(t-s+Math.PI)%(Math.PI*2)-Math.PI;return i<-Math.PI&&(i+=Math.PI*2),s+i*(1-Math.exp(-e*n))}function dr(s,t){let e=(t-s+Math.PI)%(Math.PI*2)-Math.PI;return e<-Math.PI&&(e+=Math.PI*2),e}function Nn(s=1){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Rs(s=1){const t=(e,n)=>{let i=Math.sin(e*127.1+n*311.7+s*74.7)*43758.5453;return i-Math.floor(i)};return(e,n)=>{const i=Math.floor(e),r=Math.floor(n),a=e-i,o=n-r,l=a*a*(3-2*a),c=o*o*(3-2*o);return le(le(t(i,r),t(i+1,r),l),le(t(i,r+1),t(i+1,r+1),l),c)}}function di(s,t,e,n=4){let i=0,r=.5,a=1;for(let o=0;o<n;o++)i+=s(t*a,e*a)*r,a*=2,r*=.5;return i}function un(s){return Math.max(0,Math.floor(s)).toLocaleString("en-US")}function ri(s){const t=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];let e="";for(const[n,i]of t)for(;s>=n;)e+=i,s-=n;return e||"I"}function l0(s,t=!0,e=!0){s.traverse(n=>{n.isMesh&&(n.castShadow=t,n.receiveShadow=e)})}const ki=[{id:"ashen-longsword",name:"ASHEN LONGSWORD",type:"ONE-HANDED SWORD",icon:"🗡",kind:"sword",damage:29,heavy:56,reach:2.75,speed:1,stamina:13,stagger:1,cost:0,bleed:0,break:1,desc:"A vigil blade, notched by a hundred nameless duels. Balanced, quick, and honest."},{id:"butchers-axe",name:"BUTCHER'S AXE",type:"ONE-HANDED AXE",icon:"🪓",kind:"axe",damage:35,heavy:66,reach:2.55,speed:.88,stamina:17,stagger:1.25,cost:420,bleed:.35,break:1.1,desc:"Not forged for war. It cleaves bone all the same. Deep wounds bleed the strong dry."},{id:"mourning-star",name:"MOURNING STAR",type:"ONE-HANDED MACE",icon:"✦",kind:"mace",damage:39,heavy:74,reach:2.45,speed:.78,stamina:21,stagger:1.6,cost:680,bleed:0,break:1.7,desc:"A heavy iron prayer. Plate remembers every word. Splinters shields and the arms behind them."},{id:"iron-psalm",name:"IRON PSALM",type:"WAR HAMMER",icon:"🔨",kind:"hammer",damage:47,heavy:92,reach:2.6,speed:.64,stamina:26,stagger:2.1,cost:980,bleed:0,break:2.2,desc:"The last argument of the Vigil. A two-handed sermon that ends most conversations in one blow."},{id:"gravekeeper",name:"GRAVEKEEPER",type:"GREATSWORD",icon:"⚔",kind:"greatsword",damage:42,heavy:82,reach:3.15,speed:.7,stamina:24,stagger:1.45,cost:1250,bleed:.18,break:1.45,desc:"Six feet of consecrated steel. Wide arcs, terrible reach, and no forgiveness at the edge."},{id:"crownsplitter",name:"CROWNSPLITTER",type:"CHAMPION GREATSWORD",icon:"♜",kind:"greatsword",damage:51,heavy:104,reach:3.35,speed:.74,stamina:23,stagger:1.8,cost:2200,bleed:.2,break:1.8,desc:"Torn from the Pale Warden. The gold still remembers the hand that owned it. Now it remembers yours."}],zi=[{id:"vigil-plate",name:"VIGIL PLATE",type:"BALANCED ARMOR",icon:"◈",cost:0,health:100,stamina:100,defense:.18,speed:1,desc:"Blackened steel over a pilgrim’s habit. The last uniform of a dead order."},{id:"bloodletter-harness",name:"BLOODLETTER'S HARNESS",type:"LIGHT ARMOR",icon:"♨",cost:360,health:88,stamina:128,defense:.08,speed:1.13,desc:"Less iron, more room for lungs. Trade safety for the breath to keep swinging."},{id:"ironclad",name:"IRONCLAD",type:"HEAVY ARMOR",icon:"⬢",cost:760,health:132,stamina:84,defense:.3,speed:.91,desc:"A walking reliquary of dents. Slower on the sand, harder to put in it."},{id:"regent-shroud",name:"REGENT SHROUD",type:"CHAMPION ARMOR",icon:"♛",cost:1650,health:118,stamina:112,defense:.24,speed:1.04,desc:"Taken from a champion who had never known the taste of sand. It fits you better than him."}],c0={steel:{color:9344150,metalness:.9,roughness:.3},dark:{color:3882300,metalness:.85,roughness:.42},gold:{color:10975806,metalness:.86,roughness:.28},iron:{color:5987934,metalness:.72,roughness:.48},leather:{color:2759444,metalness:.03,roughness:.94},blood:{color:6099726,metalness:.2,roughness:.5}};function qe(s,t={}){return new Wt({...c0[s],...t})}function de(s,t){const e=new ot(s,t);return e.castShadow=!0,e.receiveShadow=!0,e}function Sa(s,t,e=!1,n=!1){const i=new se,r=qe(n?"gold":"steel"),a=qe("dark"),o=qe("leather"),l=de(new De(t*4.3,.065,.12),a);l.position.y=.06,i.add(l);for(const m of[-1,1]){const p=de(new Ue(.045,.16,4),r);p.position.set(m*t*2.1,.08,0),p.rotation.z=m*Math.PI/2,i.add(p)}const c=de(new ae(t*.12,t*.5,s,4),r);c.position.y=.07+s/2,c.rotation.y=Math.PI/4,c.scale.z=.3,i.add(c);const h=de(new De(.014,s*.8,.02),qe("dark"));h.position.y=.11+s/2,h.position.z=.018,i.add(h);const u=new Ue(t*.34,.28,4),d=de(u,r);d.position.y=s+.21,d.rotation.y=Math.PI/4,d.scale.z=.3,i.add(d);const f=de(new ae(.026,.03,e?.42:.25,8),o);f.position.y=-.13,i.add(f);for(let m=0;m<3;m++){const p=de(new Ie(.031,.004,4,10),a);p.rotation.x=Math.PI/2,p.position.y=-.05-m*.075,i.add(p)}const g=de(new Lr(.055,0),n?r:a);g.position.y=e?-.38:-.28,i.add(g);const v=de(new De(.006,s*.45,.007),new Wt({color:9382936,emissive:10430994,emissiveIntensity:1.4,roughness:.3}));return v.position.set(0,.25+s*.52,.024),i.add(v),i.userData.tip=d,i.userData.bladeLength=s,i}function ic(s=1.3,t=!1,e=!1){const n=new se,i=new Wt({color:3875863,roughness:.93,metalness:.02}),r=qe(e?"gold":"steel"),a=qe("dark"),o=de(new ae(.026,.031,s,8),i);o.position.y=s/2,n.add(o);for(let d=0;d<4;d++){const f=de(new Ie(.03,.006,4,10),a);f.rotation.x=Math.PI/2,f.position.y=.12+d*.12,n.add(f)}const l=new Ji;l.moveTo(0,-.1),l.lineTo(.3,-.17),l.quadraticCurveTo(.52,-.02,.48,.18),l.quadraticCurveTo(.36,.31,.13,.24),l.lineTo(0,.14),l.closePath();const c=new Ls(l,{depth:.055,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.012,bevelThickness:.012});c.center();const h=de(c,r);if(h.position.set(.22,s-.16,0),h.rotation.y=Math.PI/2,h.scale.set(1.1,1.05,1),n.add(h),t){const d=h.clone();d.position.x=-.22,d.rotation.y=-Math.PI/2,d.scale.x=-1.1,n.add(d)}const u=de(new Ue(.055,.24,4),r);return u.position.set(0,s+.03,0),n.add(u),n.userData.tip=u,n.userData.bladeLength=s,n}function h0(){const s=new se,t=qe("steel"),e=qe("dark"),n=de(new ae(.025,.03,1.16,8),qe("iron"));n.position.y=.58,s.add(n);const i=de(new ae(.032,.036,.24,8),qe("leather"));i.position.y=.08,s.add(i);const r=de(new Fo(.175,1),t);r.position.y=1.24,s.add(r);for(let o=0;o<10;o++){const l=o/10*Math.PI*2,c=(o%3-1)*.62,h=de(new Ue(.032,.17,4),e);h.position.set(Math.cos(l)*.22,1.24+Math.sin(c)*.2,Math.sin(l)*.22),h.lookAt(h.position.clone().multiplyScalar(2)),s.add(h)}const a=de(new Ie(.055,.012,5,12),e);return a.rotation.x=Math.PI/2,a.position.y=1.05,s.add(a),s.userData.tip=r,s.userData.bladeLength=1.35,s}function u0(){const s=new se,t=qe("dark"),e=qe("steel"),n=new Wt({color:4008218,roughness:.92}),i=de(new ae(.03,.038,1.55,8),n);i.position.y=.775,s.add(i);for(let l=0;l<5;l++){const c=de(new Ie(.038,.006,4,10),t);c.rotation.x=Math.PI/2,c.position.y=.1+l*.13,s.add(c)}const r=de(new De(.56,.25,.29),e);r.position.y=1.63,s.add(r);for(const l of[-.25,.25]){const c=de(new De(.08,.32,.35),t);c.position.set(l,1.63,0),s.add(c)}const a=de(new De(.2,.07,.012),new Wt({color:7610390,emissive:9315349,emissiveIntensity:.9}));a.position.set(0,1.63,.151),s.add(a);const o=de(new Ue(.065,.26,4),e);return o.position.y=1.86,s.add(o),s.userData.tip=o,s.userData.bladeLength=1.9,s}function sc(s,t=0){let e;return s==="sword"?e=Sa(1.02,.105,!1,t===2):s==="greatsword"?e=Sa(1.55,.145,!0,t!==0):s==="axe"?e=ic(1.24,!1,t===2):s==="dualaxe"?e=ic(1.02,!1,!1):s==="mace"?e=h0():s==="hammer"?e=u0():e=Sa(1,.1),e.userData.kind=s,l0(e),e}function d0(s=4002064){const t=new se,e=new Wt({color:3482137,roughness:.9}),n=qe("dark"),i=new Wt({color:s,roughness:.72,metalness:.08}),r=de(new ae(.38,.35,.07,12),e);r.rotation.x=Math.PI/2,r.scale.z=1.18,t.add(r);const a=de(new Es(.36,12),i);a.position.z=.042,a.scale.y=1.18,t.add(a);const o=de(new Ie(.36,.023,6,20),n);o.scale.y=1.18,o.position.z=.045,t.add(o);const l=de(new we(.09,10,6),qe("steel"));return l.scale.z=.42,l.position.z=.075,t.add(l),t}function wa(s){return ki.find(t=>t.id===s)||ki[0]}function ba(s){return zi.find(t=>t.id===s)||zi[0]}function on(s=512){const t=document.createElement("canvas");return t.width=t.height=s,[t,t.getContext("2d")]}function ts(s,t=1,e=!0){const n=new Xn(s);return n.wrapS=n.wrapT=xs,n.repeat.set(t,t),n.anisotropy=4,e&&(n.colorSpace=Re),n}function rc(s=0,t=512){const[e,n]=on(t),i=n.createImageData(t,t),r=Rs(12+s),a=s===2?[31,29,29]:s===1?[43,42,39]:[66,58,48],o=Nn(23+s);for(let l=0;l<t;l++)for(let c=0;c<t;c++){const h=di(r,c/46,l/46,5),u=di(r,c/8,l/8,2),d=(o()-.5)*18,f=(h*34+u*21+d)*(s===2?.64:1),g=(l*t+c)*4;i.data[g]=Kt(a[0]+f,0,255),i.data[g+1]=Kt(a[1]+f*.93,0,255),i.data[g+2]=Kt(a[2]+f*.82,0,255),i.data[g+3]=255}n.putImageData(i,0,0),n.globalAlpha=.25;for(let l=0;l<90;l++){const c=o()*t,h=o()*t,u=4+o()*28,d=n.createRadialGradient(c,h,0,c,h,u);d.addColorStop(0,s===0?"#0a0907":"#080808"),d.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=d,n.fillRect(c-u,h-u,u*2,u*2)}if(n.globalAlpha=1,s===0){n.strokeStyle="rgba(40,45,28,.2)",n.lineWidth=1;for(let l=0;l<20;l++){n.beginPath();let c=o()*t,h=o()*t;n.moveTo(c,h);for(let u=0;u<8;u++)c+=(o()-.5)*36,h+=(o()-.2)*26,n.lineTo(c,h);n.stroke()}}n.strokeStyle=s===2?"rgba(154,58,21,.18)":"rgba(13,11,9,.38)",n.lineWidth=1.5;for(let l=0;l<13;l++){n.beginPath();let c=o()*t,h=o()*t;n.moveTo(c,h);for(let u=0;u<10;u++)c+=(o()-.5)*48,h+=o()*34,n.lineTo(c,h);n.stroke()}return ts(e,1)}function f0(s=512){const[t,e]=on(s),n=e.createImageData(s,s),i=Rs(72),r=Rs(46),a=Nn(19);for(let o=0;o<s;o++)for(let l=0;l<s;l++){const c=di(i,l/38,o/38,4),h=Math.sin((l+di(r,l/30,o/30,2)*80)*.11)*.5+.5,u=(a()-.5)*30,d=(c-.5)*28+h*14+u,f=(o*s+l)*4;n.data[f]=Kt(118+d,0,255),n.data[f+1]=Kt(99+d*.89,0,255),n.data[f+2]=Kt(72+d*.7,0,255),n.data[f+3]=255}e.putImageData(n,0,0),e.globalAlpha=.14;for(let o=0;o<38;o++){const l=a()*s,c=a()*s,h=10+a()*32,u=e.createRadialGradient(l,c,0,l,c,h);u.addColorStop(0,"#3a2719"),u.addColorStop(1,"rgba(58,39,25,0)"),e.fillStyle=u,e.fillRect(l-h,c-h,h*2,h*2)}return e.globalAlpha=1,ts(t,1)}function p0(s=512){const[t,e]=on(s),n=e.createImageData(s,s),i=Rs(112),r=Nn(81);for(let a=0;a<s;a++)for(let o=0;o<s;o++){const l=di(i,o/28,a/28,5),c=(r()-.5)*16,h=l*31+c,u=(a*s+o)*4;n.data[u]=Kt(31+h,0,255),n.data[u+1]=Kt(27+h*.82,0,255),n.data[u+2]=Kt(26+h*.78,0,255),n.data[u+3]=255}e.putImageData(n,0,0),e.lineCap="round";for(let a=0;a<22;a++){e.beginPath();let o=r()*s,l=r()*s;e.moveTo(o,l);for(let c=0;c<12;c++)o+=(r()-.5)*30,l+=r()*27,e.lineTo(o,l);e.strokeStyle=`rgba(${70+r()*35|0},${27+r()*13|0},14,.35)`,e.lineWidth=.6+r()*1.6,e.stroke()}return ts(t,1)}function m0(s=512){const[t,e]=on(s);e.fillStyle="#000",e.fillRect(0,0,s,s);const n=Nn(22);e.lineCap="round";for(let i=0;i<16;i++){e.beginPath();let r=n()*s,a=n()*s;e.moveTo(r,a);for(let o=0;o<14;o++)r+=(n()-.5)*45,a+=n()*30,e.lineTo(r,a);e.strokeStyle=`rgba(${190+n()*60|0},${55+n()*80|0},18,${.25+n()*.45})`,e.lineWidth=1+n()*4,e.shadowColor="#ff4d18",e.shadowBlur=7,e.stroke()}return e.shadowBlur=0,ts(t,1)}function g0(s=0,t=512){const[e,n]=on(t),i=[["#4b110e","#1b0907","#b28a51"],["#232a2d","#0d1011","#788987"],["#3f0b08","#120504","#a86f3d"]],r=i[s%i.length],a=n.createLinearGradient(0,0,0,t);a.addColorStop(0,r[0]),a.addColorStop(.72,r[1]),a.addColorStop(1,"#080504"),n.fillStyle=a,n.fillRect(0,0,t,t),n.globalAlpha=.25;const o=Nn(90+s);for(let l=0;l<120;l++)n.fillStyle=l%2?"#000":"#fff",n.fillRect(o()*t,o()*t,o()*2,26+o()*80);n.globalAlpha=1,n.strokeStyle=r[2],n.lineWidth=2,n.strokeRect(20,20,t-40,t-40),n.lineWidth=1,n.strokeRect(28,28,t-56,t-56),n.translate(t/2,t*.39),n.fillStyle=r[2],n.globalAlpha=.78,n.beginPath(),n.arc(0,0,67,0,Math.PI*2),n.strokeStyle=r[2],n.lineWidth=4,n.stroke(),n.beginPath(),n.moveTo(-43,-18),n.quadraticCurveTo(-26,-54,0,-55),n.quadraticCurveTo(26,-54,43,-18),n.lineTo(33,15),n.quadraticCurveTo(20,40,0,49),n.quadraticCurveTo(-20,40,-33,15),n.closePath(),n.fill(),n.fillStyle="#110705",n.beginPath(),n.ellipse(-17,-7,12,8,.2,0,7),n.fill(),n.beginPath(),n.ellipse(17,-7,12,8,-.2,0,7),n.fill(),n.beginPath(),n.moveTo(0,3),n.lineTo(-7,21),n.lineTo(7,21),n.closePath(),n.fill(),n.fillRect(-21,28,42,5),n.strokeStyle=r[2],n.lineWidth=3,n.beginPath(),n.moveTo(-95,112),n.lineTo(95,112),n.stroke(),n.globalAlpha=.65,n.beginPath(),n.moveTo(0,66),n.lineTo(-9,94),n.lineTo(0,122),n.lineTo(9,94),n.closePath(),n.fill(),n.globalAlpha=1,n.translate(-t/2,-t*.39),n.globalCompositeOperation="destination-out";for(let l=0;l<t;l+=8){const c=7+o()*22;n.fillRect(l,t-c,9,c)}return n.globalCompositeOperation="source-over",ts(e,1)}function v0(s=256){const[t,e]=on(s),n=e.createImageData(s,s),i=Rs(44),r=Nn(301);for(let a=0;a<s;a++)for(let o=0;o<s;o++){const l=Math.sin(o/s*Math.PI*6+di(i,o/42,a/42,2)*2.2)*.5+.5,c=di(i,o/18,a/18,3),h=(o%3===0?2.5:0)+(a%3===0?2.5:0),u=214+c*26-l*30-h,d=(a*s+o)*4;n.data[d]=n.data[d+1]=n.data[d+2]=Kt(u,0,255),n.data[d+3]=255}e.putImageData(n,0,0),e.globalAlpha=.16;for(let a=0;a<18;a++){const o=r()*s,l=r()*s,c=10+r()*42,h=e.createRadialGradient(o,l,0,o,l,c);h.addColorStop(0,"#1a0a06"),h.addColorStop(1,"rgba(20,8,5,0)"),e.fillStyle=h,e.fillRect(o-c,l-c,c*2,c*2)}return e.globalAlpha=1,ts(t,1)}function oh(s=256){const[t,e]=on(s);e.clearRect(0,0,s,s);const n=Nn(67),i=s/2,r=s/2;for(let o=0;o<30;o++){const l=i+(n()-.5)*s*.55,c=r+(n()-.5)*s*.55,h=4+n()*30,u=e.createRadialGradient(l,c,1,l,c,h);u.addColorStop(0,"rgba(73,4,3,.94)"),u.addColorStop(.6,"rgba(91,6,4,.72)"),u.addColorStop(1,"rgba(68,4,3,0)"),e.fillStyle=u,e.beginPath(),e.arc(l,c,h,0,Math.PI*2),e.fill()}for(let o=0;o<45;o++){const l=n()*Math.PI*2,c=s*(.16+n()*.34);e.fillStyle=`rgba(${55+n()*40|0},3,2,${.3+n()*.55})`,e.beginPath(),e.ellipse(i+Math.cos(l)*c,r+Math.sin(l)*c,1+n()*5,1+n()*10,l,0,Math.PI*2),e.fill()}const a=new Xn(t);return a.colorSpace=Re,a}function ac(s=!1,t=64){const[e,n]=on(t),i=n.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);s?(i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.35,"rgba(255,255,255,.95)"),i.addColorStop(.7,"rgba(255,255,255,.35)"),i.addColorStop(1,"rgba(255,255,255,0)")):(i.addColorStop(0,"rgba(255,255,255,.8)"),i.addColorStop(.32,"rgba(255,255,255,.42)"),i.addColorStop(1,"rgba(255,255,255,0)")),n.fillStyle=i,n.fillRect(0,0,t,t);const r=new Xn(e);return r.colorSpace=Re,r}function br(s=256){const[t,e]=on(s),n=e.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);n.addColorStop(0,"rgba(255,255,255,.9)"),n.addColorStop(.12,"rgba(255,229,181,.72)"),n.addColorStop(.42,"rgba(255,158,75,.16)"),n.addColorStop(1,"rgba(255,100,25,0)"),e.fillStyle=n,e.fillRect(0,0,s,s);const i=new Xn(t);return i.colorSpace=Re,i}function oc(s=512,t="#ff6a35"){const[e,n]=on(s);n.clearRect(0,0,s,s);const i=s/2,r=s/2;n.strokeStyle=t,n.lineWidth=2,n.globalAlpha=.8,n.beginPath(),n.arc(i,r,s*.44,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(i,r,s*.34,0,Math.PI*2),n.stroke();for(let l=0;l<12;l++){const c=l/12*Math.PI*2;n.save(),n.translate(i,r),n.rotate(c),n.beginPath(),n.moveTo(s*.35,0),n.lineTo(s*.42,-6),n.lineTo(s*.42,6),n.closePath(),n.stroke(),n.restore()}n.font=`600 ${s*.07}px serif`,n.textAlign="center",n.textBaseline="middle",n.globalAlpha=.65;const a="ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ";for(let l=0;l<18;l++){const c=l/18*Math.PI*2;n.save(),n.translate(i+Math.cos(c)*s*.39,r+Math.sin(c)*s*.39),n.rotate(c+Math.PI/2),n.fillStyle=t,n.fillText(a[l%a.length],0,0),n.restore()}n.globalAlpha=1;const o=new Xn(e);return o.colorSpace=Re,o}function x0(s=512){const[t,e]=on(s);e.fillStyle="#000",e.fillRect(0,0,s,s);const n=Nn(314);e.strokeStyle="#fff",e.shadowColor="#fff",e.shadowBlur=5;for(let r=0;r<18;r++){e.beginPath();let a=n()*s,o=n()*s;e.moveTo(a,o);for(let l=0;l<15;l++)a+=(n()-.5)*38,o+=(n()-.2)*24,e.lineTo(a,o);e.lineWidth=.4+n()*2.2,e.stroke()}const i=new Xn(t);return i.wrapS=i.wrapT=xs,i}function lc(s=256){const[t,e]=on(s),n=e.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);return n.addColorStop(0,"rgba(255,255,255,.6)"),n.addColorStop(.5,"rgba(255,255,255,.15)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,s,s),new Xn(t)}const yo={gladiator:{name:"GLADIATOR",title:"THE HUNGRY",health:92,speed:2.2,damage:10,attackRange:2.3,windup:.54,recover:.7,armor:62,weapon:"sword",shield:!0,scale:.98,score:90,marks:9,aggressive:.62,color:7162415,accent:10316860,cloth:5313808},knight:{name:"OATHBOUND KNIGHT",title:"THE OATHBOUND",health:156,speed:1.46,damage:17,attackRange:2.7,windup:.82,recover:.85,armor:175,weapon:"mace",shield:!0,scale:1.03,score:150,marks:15,aggressive:.45,color:5988449,accent:9739680,cloth:3094587},berserker:{name:"BERSERKER",title:"THE UNQUIET",health:118,speed:2.75,damage:14,attackRange:2.25,windup:.4,recover:.48,armor:34,weapon:"axe",shield:!1,scale:1.05,score:130,marks:13,aggressive:.92,color:7287589,accent:3089696,cloth:3544591},champion:{name:"THE PALE WARDEN",title:"CHAMPION OF THE PIT",health:520,speed:1.72,damage:25,attackRange:3.05,windup:.94,recover:.92,armor:380,weapon:"greatsword",shield:!1,scale:1.24,score:850,marks:80,aggressive:.5,color:3355958,accent:11635276,cloth:4722956,boss:!0}};let ci={},fr=null,Ea=null;function ti(s,t,e,n,i=7){const r=`${s}-${t}-${e}-${i}`;ci[r]||(ci[r]=new ae(s,t,e,i));const a=new ot(ci[r],n);return a.castShadow=!0,a.receiveShadow=!0,a}function He(s,t,e,n,i){if(!ci[`rb-${s}-${t}-${e}-${n}`]){const a=new Ji,o=-s/2,l=-t/2;a.moveTo(o+n,l),a.lineTo(o+s-n,l),a.quadraticCurveTo(o+s,l,o+s,l+n),a.lineTo(o+s,l+t-n),a.quadraticCurveTo(o+s,l+t,o+s-n,l+t),a.lineTo(o+n,l+t),a.quadraticCurveTo(o,l+t,o,l+t-n),a.lineTo(o,l+n),a.quadraticCurveTo(o,l,o+n,l);const c=new Ls(a,{depth:e,bevelEnabled:!0,bevelSegments:2,steps:1,bevelSize:Math.min(.025,n*.35),bevelThickness:.012});c.center(),ci[`rb-${s}-${t}-${e}-${n}`]=c}const r=new ot(ci[`rb-${s}-${t}-${e}-${n}`],i);return r.castShadow=!0,r.receiveShadow=!0,r}function Ni(s,t=.72,e=.38){return new Wt({color:s,metalness:t,roughness:e})}function _0(s,t=.97){return Ea||(Ea=v0(256)),new Wt({color:s,map:Ea,metalness:0,roughness:t,side:je})}class cc{constructor(t,e={}){this.scene=t,this.isPlayer=!!e.player,this.type=e.type||"gladiator",this.def=this.isPlayer?{name:"VIGIL",title:"THE LAST WATCH",health:e.health||100,speed:4,scale:e.scale||1}:yo[this.type],this.scale=e.scale||this.def.scale||1,this.weaponData=e.weaponData,this.armorData=e.armorData,this.health=e.health||this.def.health,this.maxHealth=this.health,this.armor=e.armor??(this.def.armor||0),this.maxArmor=this.armor,this.speed=this.def.speed||3,this.damage=this.def.damage||10,this.dead=!1,this.deathTime=0,this.state="idle",this.stateTime=0,this.attackType="light",this.attackDuration=.5,this.attackProgress=0,this.events={swing:!1,hit:!1,footstep:!1},this.movePhase=Math.random()*Math.PI*2,this.speedActual=0,this.flinch=0,this.flinchSide=0,this.hitFlash=0,this.blocking=!1,this.shieldBroken=!1,this.staminaDrain=0,this.wounds=0,this.root=new se,this.root.position.set(0,0,0),this.visual=new se,this.visual.scale.setScalar(this.scale),this.root.add(this.visual),this.scene.add(this.root),fr||(fr=oh()),this.armorPieces={},this.materials=[],this.build(),this.root.traverse(n=>{n.isMesh&&(n.castShadow=!0,n.receiveShadow=!0)}),this.state="idle",this.root.visible=!0}build(){const t=this.isPlayer,e=this.def,n=t?11567976:this.type==="berserker"?10316625:9265741,i=Ni(n,.02,.82),r=Ni(t?5593946:this.type==="champion"?3882045:this.type==="knight"?7370101:5913899,.64,.42),a=Ni(t?10133663:this.type==="champion"?7895669:9145737,.8,.32),o=Ni(this.type==="champion"?11700812:t?9793855:this.type==="gladiator"?11895117:e.accent,.68,.36),l=_0(t?6165003:e.cloth,.95),c=Ni(2891029,.04,.91),h=new Wt({color:3155743,roughness:1,metalness:0}),u=Ni(1513497,.62,.56),d=new Qe({color:t?14201708:this.type==="champion"?16728868:1773064});this.mats={skin:i,darkSteel:r,steel:a,accent:o,cloth:l,leather:c,fur:h,black:u,eyeMat:d},this.materials.push(i,r,a,o,l,c,h,u);const f=new se;f.position.y=1.01,this.visual.add(f),this.hips=f;const g=He(.34,.22,.23,.055,c);g.position.y=-.015,f.add(g);const v=new se;v.position.y=.16,f.add(v),this.torso=v;const m=new ot(new ae(.255,.195,.5,14,1),t||this.type==="knight"?r:i);m.position.y=.25,m.scale.z=.68,m.rotation.y=Math.PI/14,m.castShadow=!0,m.receiveShadow=!0,v.add(m);const p=new ot(new Ie(.115,.021,5,14),a);if(p.rotation.x=Math.PI/2,p.position.y=.5,p.scale.z=.78,v.add(p),t||this.type!=="berserker"){const F=He(.355,.36,.055,.045,t?r:this.type==="gladiator"?c:a);F.position.set(0,.27,.135),v.add(F),this.armorPieces.chest=this.registerArmor("chest",F,Math.max(30,(this.maxArmor||50)*.35),"CHEST");const B=He(.225,.195,.015,.028,o);B.position.set(0,.3,.168),v.add(B);const z=He(.195,.165,.028,.024,t?r:a);z.position.set(0,.3,.18),v.add(z);for(const[W,H]of[[-.135,.39],[.135,.39],[-.135,.16],[.135,.16]]){const Z=new ot(new we(.012,5,4),o);Z.position.set(W,H,.158),v.add(Z)}if(t){const W=new ot(new Ie(.05,.008,4,12),o);W.position.set(0,.3,.195),v.add(W)}if(this.type==="champion"){const W=new ot(new Lr(.045,0),new Wt({color:10296850,emissive:11937298,emissiveIntensity:1.8,roughness:.3}));W.position.set(0,.3,.2),v.add(W)}}else{const F=new ot(new Xe(.13,.32),new Qe({color:5121050,transparent:!0,opacity:.65}));F.position.set(.12,.23,.14),F.rotation.z=-.35,v.add(F)}const S=He(.37,.12,.25,.03,c);S.position.y=.015,v.add(S);const M=He(.38,.055,.26,.02,o);M.position.y=.04,v.add(M);const x=new ot(new De(.075,.06,.02),a);x.position.set(0,.04,.143),v.add(x);const A=new ot(new Xe(.23,.52,1,4),l);A.position.set(0,-.24,.135),v.add(A),this.tabard=A;const C=[{x:-.15,z:.015,ry:.12,rz:.42,side:"L",breakable:!0},{x:.15,z:.015,ry:-.12,rz:-.42,side:"R",breakable:!0},{x:-.075,z:.115,ry:.32,rz:.1,side:"FL",breakable:!1},{x:.075,z:.115,ry:-.32,rz:-.1,side:"FR",breakable:!1},{x:0,z:-.125,ry:Math.PI,rz:0,side:"B",breakable:!1}];for(const F of C){const B=He(.145,.21,.042,.028,this.type==="berserker"?c:r);B.position.set(F.x,-.165,F.z),B.rotation.set(-.08,F.ry,F.rz),v.add(B);const z=new ot(new we(.011,5,4),o);z.position.set(F.x,-.08,F.z+.025),z.rotation.copy(B.rotation),v.add(z),F.breakable&&this.type!=="berserker"&&(this.armorPieces[`tasset${F.side}`]=this.registerArmor(`tasset${F.side}`,B,Math.max(18,this.maxArmor*.1),"TASSET",!1))}const R=ti(.065,.075,.1,i,8);R.position.y=.53,v.add(R);const L=new se;L.position.y=.64,v.add(L),this.head=L;const w=new ot(new we(.137,14,10),i);w.scale.set(.93,1.1,.96),w.position.y=.02,w.castShadow=!0,L.add(w);const y=He(.16,.1,.13,.04,i);if(y.position.set(0,-.08,.035),L.add(y),this.type==="berserker"){const F=new ot(new Ue(.11,.23,7),h);F.position.set(0,-.15,.07),F.rotation.x=.12,L.add(F);const B=new ot(new we(.15,8,6,0,Math.PI*2,0,Math.PI*.55),r);B.position.y=.065,L.add(B);for(const z of[-1,1]){const W=new ot(new Ue(.035,.26,5),new Wt({color:12825489,roughness:.8}));W.position.set(z*.14,.14,-.02),W.rotation.z=z*.55,W.rotation.x=-.15,L.add(W)}}else{const F=new ot(new we(.15,14,10,0,Math.PI*2,0,Math.PI*.64),t?a:this.type==="gladiator"?o:r);F.position.y=.05,F.scale.set(1,.98,1),L.add(F),this.armorPieces.helmet=this.registerArmor("helmet",F,Math.max(22,(this.maxArmor||50)*.22),"HELM");const B=new ot(new ae(.151,.153,.052,14,1,!0),a);B.position.y=.012,B.scale.z=.94,L.add(B),this.armorPieces.visor=this.registerArmor("visor",B,Math.max(15,this.maxArmor*.1),"VISOR",!1);for(const Z of[-1,1]){const et=He(.052,.125,.062,.022,a);et.position.set(Z*.102,-.045,.075),et.rotation.set(-.04,Z*.12,Z*.07),L.add(et)}const z=He(.02,.115,.024,.008,a);z.position.set(0,-.022,.154),L.add(z);const W=new ot(new De(.17,.062,.012),u);W.position.set(0,.012,.148),L.add(W);const H=He(.12,.055,.058,.02,a);H.position.set(0,-.108,.113),H.rotation.x=-.12,L.add(H);for(const Z of[-.05,.05]){const et=new ot(new De(.034,.011,.012),d);et.position.set(Z,.014,.161),L.add(et)}if(t){const Z=He(.042,.028,.23,.01,o);Z.position.set(0,.175,-.005),L.add(Z);const et=new Ji;et.moveTo(-.155,0),et.quadraticCurveTo(-.13,.175,-.02,.17),et.quadraticCurveTo(.09,.16,.145,.01),et.lineTo(.16,-.012),et.lineTo(.12,-.03),et.lineTo(-.12,-.03),et.closePath();const ft=new Ls(et,{depth:.025,bevelEnabled:!0,bevelSegments:1,steps:1,bevelSize:.007,bevelThickness:.005});ft.center();const Pt=new ot(ft,l);Pt.rotation.y=Math.PI/2,Pt.position.set(0,.2,.01),L.add(Pt)}if(this.type==="gladiator"){const Z=new ot(new ae(.035,.055,.27,8),new Wt({color:8134678,roughness:.95}));Z.position.set(0,.24,-.015),Z.scale.z=.4,L.add(Z)}if(this.type==="champion"){for(let Z=0;Z<5;Z++){const et=new ot(new Ue(.018,.12,4),o),ft=(Z/5-.5)*1.4;et.position.set(Math.sin(ft)*.14,.19,Math.cos(ft)*.07-.05),et.rotation.z=-ft*.4,L.add(et)}for(const Z of[-1,1]){const et=new ot(new Ue(.03,.34,5),u);et.position.set(Z*.14,.18,-.02),et.rotation.z=Z*.48,et.rotation.x=-.15,L.add(et)}}}if(this.type==="champion")for(const F of[-.045,.045]){const B=new ot(new we(.012,5,4),d);B.position.set(F,.015,.169),L.add(B)}const D=new se;D.position.set(-.255,.46,0),v.add(D),this.armR=D;const U=new se;U.position.set(.255,.46,0),v.add(U),this.armL=U;for(const[F,B,z]of[[D,-1,"R"],[U,1,"L"]]){const W=this.type==="berserker"?h:this.type==="gladiator"&&z==="L"?c:r,H=new ot(new we(.118,14,9,0,Math.PI*2,0,Math.PI*.58),W);H.position.set(B*.035,.015,0),H.scale.set(1.18,.72,1.08),F.add(H),this.type!=="berserker"&&(this.armorPieces[`pauldron${z}`]=this.registerArmor(`pauldron${z}`,H,Math.max(20,this.maxArmor*.14),"PAULDRON",!1));const Z=He(.19,.062,.205,.022,W);if(Z.position.set(B*.058,-.068,.004),Z.rotation.z=B*.34,F.add(Z),(this.type==="champion"||this.type==="knight")&&z==="R"){const K=new ot(new Ue(.03,.2,4),o);K.position.set(B*.17,.07,0),K.rotation.z=B*1.25,F.add(K)}const et=ti(.06,.08,.32,this.type==="berserker"?i:r,10);et.position.y=-.16,F.add(et);const ft=new se;ft.position.y=-.32,F.add(ft);const Pt=ti(.045,.06,.31,this.type==="berserker"?i:a,10);Pt.position.y=-.155,ft.add(Pt);const zt=ti(.063,.077,.19,r,10);zt.position.y=-.18,ft.add(zt),this.type!=="berserker"&&(this.armorPieces[`bracer${z}`]=this.registerArmor(`bracer${z}`,zt,Math.max(16,this.maxArmor*.1),"BRACER",!1));const $t=new se;$t.position.y=-.315,ft.add($t);const Jt=new ot(new we(.057,7,6),c);Jt.scale.set(.9,.9,1.1),$t.add(Jt),z==="R"?(this.elbowR=ft,this.handR=$t):(this.elbowL=ft,this.handL=$t)}for(const[F,B]of[["R",-.145],["L",.145]]){const z=new se;z.position.set(B,-.04,0),f.add(z);const W=ti(.084,.1,.42,this.type==="berserker"?c:r,10);W.position.y=-.21,z.add(W);const H=new se;H.position.y=-.42,z.add(H);const Z=new ot(new we(.085,10,7),a);Z.position.set(0,.015,.045),Z.scale.set(1.05,.82,.9),H.add(Z);const et=ti(.058,.078,.41,this.type==="berserker"?c:r,10);et.position.y=-.205,H.add(et);const ft=ti(.075,.09,.28,a,10);ft.position.y=-.24,H.add(ft),this.armorPieces[`greave${F}`]=this.registerArmor(`greave${F}`,ft,Math.max(18,this.maxArmor*.1),"GREAVE",!1);const Pt=He(.14,.12,.28,.035,c);Pt.position.set(0,-.44,.055),H.add(Pt);const zt=He(.132,.055,.1,.022,a);zt.position.set(0,-.462,.15),H.add(zt);const $t=new ot(new Ie(.083,.016,4,10),o);$t.rotation.x=Math.PI/2,$t.position.set(0,-.39,.02),H.add($t),F==="R"?this.legR=z:this.legL=z,F==="R"?this.kneeR=H:this.kneeL=H}if(this.type==="berserker")for(let F=0;F<7;F++){const B=new ot(new Ue(.07,.28,5),h);B.position.set(Y(-.24,.24),.49+Y(-.02,.04),Y(-.1,.1)),B.rotation.set(Y(-.3,.3),Y(0,6),Y(-.8,.8)),v.add(B)}if(t||this.type==="champion"||this.type==="knight"){const F=new se;F.position.set(0,.49,-.16),v.add(F),this.cape=F,this.capeSegments=[];let B=F;for(let z=0;z<5;z++){const W=new se;W.position.y=z===0?0:-.265;const H=.48-z*.045,Z=new Xe(H,.32,6,1),et=Z.attributes.position.array;for(let Pt=0;Pt<et.length;Pt+=3){const zt=et[Pt]/(H/2);et[Pt+2]=Math.cos(zt*Math.PI)*.022-Math.abs(zt)*.018,z===4&&et[Pt+1]<-.15&&(et[Pt+1]-=Math.abs(Math.sin(zt*9.5))*.045)}Z.attributes.position.needsUpdate=!0,Z.computeVertexNormals();const ft=new ot(Z,l);ft.position.y=-.15,ft.castShadow=!0,W.add(ft),B.add(W),B=W,this.capeSegments.push(W)}for(const z of[-.17,.17]){const W=new ot(new we(.026,8,6),o);W.position.set(z,.47,-.12),v.add(W)}}if(this.weapon=sc(this.weaponData?.kind||e.weapon,this.type==="champion"?2:this.type==="gladiator"?1:0),this.weapon.position.set(0,-.02,0),this.weapon.rotation.set(1.32,0,0),this.handR.add(this.weapon),this.isPlayer||this.weapon.scale.setScalar(this.type==="champion"?1.08:.96),e.shield?(this.shield=d0(this.type==="gladiator"?6101779:2964286),this.shield.position.set(.02,-.16,.03),this.shield.rotation.set(0,Math.PI/2,0),this.handL.add(this.shield)):this.type==="berserker"&&(this.offhandWeapon=sc("dualaxe",0),this.offhandWeapon.position.set(0,-.02,0),this.offhandWeapon.rotation.set(1.32,0,0),this.offhandWeapon.scale.setScalar(.9),this.handL.add(this.offhandWeapon)),this.type==="champion"){const F=new Bi(16727326,1.8,4.5,2);F.position.set(0,1.5,0),this.visual.add(F)}const V=new ot(new Xe(1,.7),new Qe({map:y0(),transparent:!0,opacity:.52,depthWrite:!1}));V.rotation.x=-Math.PI/2,V.position.y=.012,this.root.add(V),this.blob=V}registerArmor(t,e,n,i,r=!0){return e.userData.armorName=t,e.userData.armorLabel=i,{mesh:e,durability:n,maxDurability:n,broken:!1,label:i,breakable:r}}setState(t,e=0){this.dead||(this.state=t,this.stateTime=e,t==="idle"&&(this.blocking=!1))}startAttack(t="light",e=.55){this.dead||(this.state="attack",this.stateTime=0,this.attackType=t,this.attackDuration=e,this.attackProgress=0,this.events.swing=!1,this.events.hit=!1,this.hasHit=!1,this.hasSwung=!1,this.blocking=!1)}takeHit(t,e={}){if(this.dead)return null;const n=e.heavy||!1,i=e.breakPower||1;let r=null;if(this.armor>0){const l=Object.values(this.armorPieces).filter(c=>c.breakable&&!c.broken&&c.durability>0);if(l.length&&Rn(n?.85:.38)){const c=l[Math.floor(Math.random()*l.length)];c.durability-=t*(n?1.8:.85)*i,c.durability<=0?(c.broken=!0,c.mesh.visible=!1,this.armor=Math.max(0,this.armor-c.maxDurability*.3),r=c,this.onArmorBreak&&this.onArmorBreak(c)):this.armor=Math.max(0,this.armor-t*.1)}else this.armor=Math.max(0,this.armor-t*.24)}const a=e.ignoreArmor?0:this.armor/Math.max(1,this.maxArmor)*.2,o=Math.max(1,Math.round(t*(1-a)));return this.health-=o,this.hitFlash=.12,this.flinch=n?1:.6,this.flinchSide=e.side||(Math.random()<.5?-1:1),(this.state!=="attack"||n||this.type==="champion")&&(this.dead||this.setState("hit",0)),this.health<=0&&(this.health=0,this.die(e)),{damage:o,broken:r,killed:this.dead}}stagger(t=.9){if(this.dead||this.type==="champion"){this.type==="champion"&&this.setState("hit",0);return}this.setState("hit",0),this.staggerDuration=t,this.staggerTimer=t,this.staggered=!0}die(t={}){this.dead||(this.dead=!0,this.health=0,this.state="dead",this.stateTime=0,this.deathTime=0,this.deathDir=t.side||(Math.random()<.5?-1:1),this.blocking=!1,t.decapitate&&this.decapitate())}decapitate(){!this.head||this.head.userData.gone||(this.head.userData.gone=!0,this.head.visible=!1,this.onDecapitate&&this.onDecapitate(this))}update(t,e={}){this.animTime=(this.animTime||0)+t;const n=this.animTime;this.stateTime+=t,this.hitFlash>0&&(this.hitFlash-=t),this.speedActual>.15&&(this.movePhase+=t*(5.1+this.speedActual*1.2));const r=Kt(this.speedActual/3.1,0,1),a=Math.sin(n*1.65)*.018,o=Math.abs(Math.sin(this.movePhase))*.035*r,l={hipsX:0,hipsY:0,hipsZ:0,torsoX:a+.02,torsoY:0,torsoZ:0,headX:-a*.5,headY:Math.sin(n*.37)*.04,headZ:0,armRX:-.22+Math.sin(this.movePhase+Math.PI)*.34*r,armRY:0,armRZ:-.25,elbowRX:-.9,armLX:-.12+Math.sin(this.movePhase)*.4*r,armLY:0,armLZ:.09,elbowLX:-.3,legRX:Math.sin(this.movePhase)*.6*r,legLX:-Math.sin(this.movePhase)*.6*r,kneeRX:Math.max(0,-Math.sin(this.movePhase))*.85*r,kneeLX:Math.max(0,Math.sin(this.movePhase))*.85*r,legRZ:-.06,legLZ:.06,visualY:0};if(this.blocking=!1,this.flinch=ee(this.flinch,0,12,t),this.flinchSide=ee(this.flinchSide,0,10,t),this.state==="attack")this.attackProgress=Kt(this.stateTime/this.attackDuration,0,1),this.applyAttackPose(l,this.attackProgress),!this.hasSwung&&this.attackProgress>(this.attackType==="heavy"?.38:.27)&&(this.hasSwung=!0,this.events.swing=!0),!this.hasHit&&this.attackProgress>(this.attackType==="heavy"?.57:.47)&&(this.hasHit=!0,this.events.hit=!0),this.attackProgress>=1&&(this.state="idle",this.stateTime=0);else if(this.state==="hit"){const h=Kt(this.stateTime/.3,0,1),u=Math.sin(h*Math.PI);l.torsoX-=.22*u*(this.flinch||.5),l.torsoZ=this.flinchSide*.17*u,l.headX-=.2*u,l.armRX+=.35*u,l.armLX-=.25*u,l.visualY=-.02*u,this.staggered?(this.staggerTimer-=t,l.torsoX-=.3,l.hipsX=-.18,l.kneeRX+=.45,l.kneeLX+=.45,l.visualY=-.1,(this.staggerTimer<=0||this.stateTime>1.25)&&(this.staggered=!1,this.state="idle",this.stateTime=0)):this.stateTime>.32&&(this.state="idle",this.stateTime=0)}else if(this.state==="block")l.armRX=-1.22,l.armRZ=-.8,l.elbowRX=-1.5,l.armLX=-1.34,l.armLZ=.75,l.elbowLX=-1.25,l.torsoY=-.18,l.torsoX=.1,l.legRX=-.22,l.legLX=.16,l.kneeRX=.22,l.kneeLX=.2,l.visualY=-.035,this.blocking=!0;else if(this.state==="dodge"){const h=Kt(this.stateTime/.38,0,1),u=Math.sin(h*Math.PI);l.hipsX=.45,l.torsoX=.18,l.legRX=-.5,l.legLX=.4,l.kneeRX=.5,l.kneeLX=.7,l.armRX=-.75,l.armLX=-.5,l.visualY=-.15*u,this.stateTime>.45&&!this.isPlayer&&(this.state="idle",this.stateTime=0)}else this.state==="dead"?(this.deathTime+=t,this.applyDeathPose(l,t)):this.state==="execute"&&this.applyExecutePose(l,this.stateTime);const c=this;if(c.hips.rotation.x=ee(c.hips.rotation.x,l.hipsX,13,t),c.hips.rotation.y=ee(c.hips.rotation.y,l.hipsY,13,t),c.hips.rotation.z=ee(c.hips.rotation.z,l.hipsZ,13,t),c.torso.rotation.x=ee(c.torso.rotation.x,l.torsoX,12,t),c.torso.rotation.y=ee(c.torso.rotation.y,l.torsoY,13,t),c.torso.rotation.z=ee(c.torso.rotation.z,l.torsoZ,10,t),c.head.rotation.x=ee(c.head.rotation.x,l.headX,9,t),c.head.rotation.y=ee(c.head.rotation.y,l.headY,8,t),c.head.rotation.z=ee(c.head.rotation.z,l.headZ,8,t),c.armR.rotation.x=ee(c.armR.rotation.x,l.armRX,18,t),c.armR.rotation.y=ee(c.armR.rotation.y,l.armRY,15,t),c.armR.rotation.z=ee(c.armR.rotation.z,l.armRZ,15,t),c.armL.rotation.x=ee(c.armL.rotation.x,l.armLX,18,t),c.armL.rotation.y=ee(c.armL.rotation.y,l.armLY,15,t),c.armL.rotation.z=ee(c.armL.rotation.z,l.armLZ,15,t),c.elbowR.rotation.x=ee(c.elbowR.rotation.x,l.elbowRX,17,t),c.elbowL.rotation.x=ee(c.elbowL.rotation.x,l.elbowLX,17,t),c.legR.rotation.x=ee(c.legR.rotation.x,l.legRX,18,t),c.legL.rotation.x=ee(c.legL.rotation.x,l.legLX,18,t),c.legR.rotation.z=ee(c.legR.rotation.z,l.legRZ||0,12,t),c.legL.rotation.z=ee(c.legL.rotation.z,l.legLZ||0,12,t),c.kneeR.rotation.x=ee(c.kneeR.rotation.x,l.kneeRX,18,t),c.kneeL.rotation.x=ee(c.kneeL.rotation.x,l.kneeLX,18,t),c.visual.position.y=ee(c.visual.position.y,l.visualY+o,14,t),c.weapon&&(c.weapon.rotation.z=ee(c.weapon.rotation.z,this.state==="attack"?-this.attackProgress*.25:0,9,t)),this.capeSegments)for(let h=0;h<this.capeSegments.length;h++){const u=this.capeSegments[h],d=Math.sin(n*2.3+h*.8)*.035,f=(this.speedActual*.09+.08)*(h+1)/this.capeSegments.length;u.rotation.x=ee(u.rotation.x,f+d-(this.state==="attack"?.18:0),6,t),u.rotation.z=ee(u.rotation.z,Math.sin(n*1.3+h)*.025+this.flinchSide*.04,4,t)}this.offhandWeapon&&(this.offhandWeapon.rotation.z=Math.sin(n*1.2)*.04)}applyAttackPose(t,e){const n=this.attackType==="heavy",i=this.weaponData?.kind==="greatsword"||this.weaponData?.kind==="hammer"||this.type==="champion",r=n?.42:.25,a=n?.62:.5;let o=0,l=0;e<r?o=e/r:e<a?(o=1,l=(e-r)/(a-r)):(o=1,l=1);const c=d=>d*d*(3-2*d),h=c(o),u=c(l);n?(t.armRX=le(-.2,-2.55,h),t.elbowRX=le(-.9,-.35,h),t.armRZ=-.25,t.torsoX=le(.02,-.2,h),t.torsoY=le(0,-.38,h),t.armLX=le(-.1,-2.1,h),t.elbowLX=le(-.3,-.25,h),l>0&&(t.armRX=le(-2.55,-.72,u),t.elbowRX=le(-.35,-1.65,u),t.torsoX=le(-.2,.52,u),t.torsoY=le(-.38,.24,u),t.armLX=le(-2.1,-1,u),t.elbowLX=le(-.25,-1.25,u),t.legRX=-.25,t.legLX=.24,t.visualY=-.06*u)):(t.armRX=le(-.2,-1.35,h),t.elbowRX=le(-.9,-.65,h),t.armRZ=le(-.06,-.85,h),t.torsoY=le(0,-.72,h),t.armLX=le(-.1,-.6,h),t.elbowLX=-.55,l>0&&(t.armRX=le(-1.35,-1.05,u),t.armRZ=le(-.85,.82,u),t.elbowRX=le(-.65,-.3,u),t.torsoY=le(-.72,.76,u),t.headY=le(-.2,.25,u),t.legRX=-.2,t.legLX=.15)),i&&(t.armLX=t.armRX+.08,t.armLZ=.18,t.elbowLX=-.8)}applyDeathPose(t,e){const n=Kt(this.deathTime/.9,0,1),i=1-Math.pow(1-n,3);this.visual.rotation.z=ee(this.visual.rotation.z,this.deathDir*1.5*i,5,e),this.visual.position.y=ee(this.visual.position.y,.12*i,3,e),this.visual.position.x=ee(this.visual.position.x,this.deathDir*.25*i,2,e),t.armRX=-.4,t.armLX=.35,t.armRZ=-.6,t.armLZ=.7,t.elbowRX=-.3,t.elbowLX=-.25,t.legRX=.25,t.legLX=-.18,t.kneeRX=.2,t.kneeLX=.4,t.headX=-.3,t.torsoX=.1,this.deathTime>4.4&&(this.root.position.y-=e*.16)}applyExecutePose(t,e){if(!this.weapon)return;const n=Kt(e/.5,0,1);t.armRX=le(-.4,-1.2,n),t.elbowRX=le(-.8,-.5,n),t.armRZ=-.3,t.torsoY=le(0,.25,n),e>.55&&(t.armRX=1,t.elbowRX=-.5,t.torsoY=.55,t.torsoX=.25)}getHeadPosition(t=new T){return this.head?this.head.getWorldPosition(t):this.root.getWorldPosition(t),t.y+=.45*this.scale,t}getChestPosition(t=new T){return this.torso.getWorldPosition(t),t.y+=.28*this.scale,t}getWeaponTip(t=new T){if(!this.weapon)return this.getChestPosition(t);const e=this.weapon.userData.tip;return e?e.getWorldPosition(t):this.weapon.getWorldPosition(t)}getArmorPercent(){return this.maxArmor>0?Kt(this.armor/this.maxArmor,0,1):1}addWound(){if(!this.torso||this.wounds>=5)return;const t=new Xe(Y(.08,.16),Y(.1,.2)),e=new Qe({map:fr,transparent:!0,opacity:Y(.65,.92),depthWrite:!1}),n=new ot(t,e);n.position.set(Y(-.15,.15),Y(.1,.4),.17),n.rotation.z=Y(-1,1),this.torso.add(n),this.wounds++}dispose(){this.scene.remove(this.root),this.root.traverse(t=>{t.geometry&&!Object.values(ci).includes(t.geometry)&&t.geometry.dispose(),t.material&&!this.materials.includes(t.material)&&(t.material.map&&t.material.map!==fr&&t.material.map.dispose(),t.material.dispose())})}}let pr=null;function y0(){if(pr)return pr;const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,4,64,64,62);return e.addColorStop(0,"rgba(0,0,0,.75)"),e.addColorStop(.55,"rgba(0,0,0,.28)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),pr=new Xn(s),pr}const vs=[{name:"THE GILDED PIT",sub:"SURVIVE THE CROWD’S HUNGER",skyTop:461071,skyBottom:3808785,fog:2759697,fogDensity:.018,moon:16769968,ambient:6845317,sun:12044516,ground:"sand",torch:16747068,crowd:3809303,banner:0},{name:"THE ASHEN GALLOWS",sub:"NOTHING HERE DIES CLEAN",skyTop:329994,skyBottom:1780006,fog:1384477,fogDensity:.026,moon:12837330,ambient:5072483,sun:10142906,ground:"stone",torch:7659709,crowd:1515293,banner:1},{name:"THE CRIMSON KEEP",sub:"THE MOUNTAIN IS AWAKE",skyTop:525060,skyBottom:3803398,fog:2820871,fogDensity:.023,moon:16739141,ambient:7026218,sun:14388077,ground:"basalt",torch:16731170,crowd:2363405,banner:2}];function M0(s){const t=new Gc,e=new we(30,24,16),n=new Le({side:Oe,uniforms:{top:{value:new It(1647925)},mid:{value:new It(7293485)},bottom:{value:new It(1445128)}},vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; varying vec3 vP;
      void main(){ float h = normalize(vP).y * .5 + .5; vec3 c = mix(bottom, mid, smoothstep(.12,.52,h)); c = mix(c, top, smoothstep(.46,.96,h)); gl_FragColor = vec4(c, 1.); }`});t.add(new ot(e,n));const i=new Qe({color:16758636}),r=new ot(new we(1.8,8,8),i);r.position.set(10,2,-8),t.add(r);const a=new ot(new we(1.2,8,8),new Qe({color:5405862}));a.position.set(-9,12,4),t.add(a);const o=new xo(s),l=o.fromScene(t,.06).texture;return o.dispose(),e.dispose(),n.dispose(),i.dispose(),r.geometry.dispose(),l}function S0(s){return new Le({side:Oe,depthWrite:!1,uniforms:{topColor:{value:new It(s.skyTop)},bottomColor:{value:new It(s.skyBottom)},moonColor:{value:new It(s.moon)},moonPos:{value:new T(.48,.24,-.83).normalize()},time:{value:0}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
      varying vec3 vDir; uniform vec3 topColor; uniform vec3 bottomColor; uniform vec3 moonColor; uniform vec3 moonPos; uniform float time;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }
      void main(){
        float h = clamp(vDir.y * .5 + .5, 0., 1.);
        vec3 col = mix(bottomColor, topColor, smoothstep(.22, .84, h));
        float md = max(0., dot(normalize(vDir), normalize(moonPos)));
        col += moonColor * pow(md, 220.) * 1.7;
        col += moonColor * pow(md, 18.) * .12;
        float cloud = 0.;
        vec2 uv = vDir.xz / max(.1, vDir.y + .45) * .55;
        for(int i=0;i<4;i++){ float n = noise(uv * (1.8 + float(i)*1.2) + vec2(time*.003, time*.001)); cloud += (n-.5) * (0.22 / (1. + float(i))); }
        col += moonColor * smoothstep(.08, .4, cloud) * smoothstep(.05, .35, h) * .07;
        float star = step(.9975, hash(floor(vDir.xz * 700. + vDir.y * 120.)));
        col += vec3(star) * smoothstep(.42, .85, h) * (1. - cloud) * .9;
        gl_FragColor = vec4(col, 1.);
      }`})}class w0{constructor(t,e){this.scene=t,this.renderer=e,this.group=null,this.themeIndex=0,this.flames=[],this.banners=[],this.crowd=[],this.hazards=[],this.lights=[],this.sky=null,this.moon=null,this.stars=null,this.dust=null,this.emberStream=null,this.time=0,this.radius=21.5,this.crowdExcitement=0,this.arenaMoonDir=new T(.48,.24,-.83).normalize()}build(t=0,e="auto"){this.themeIndex=t%vs.length;const n=vs[this.themeIndex];this.group&&(this.scene.remove(this.group),this.disposeGroup(this.group)),this.group=new se,this.group.name="arena",this.scene.add(this.group),this.flames=[],this.banners=[],this.crowd=[],this.hazards=[],this.lights=[],this.quality=e,this.scene.fog=new Lo(n.fog,n.fogDensity),this.scene.background=new It(n.skyTop),this.buildSky(n),this.buildLights(n),this.buildGround(n),this.buildWalls(n),this.buildCrowd(n),this.buildProps(n),this.buildHazards(n),this.buildAtmosphere(n)}buildSky(t){this.sky&&(this.scene.remove(this.sky),this.sky.material.dispose(),this.sky.geometry.dispose()),this.sky=new ot(new we(170,32,20),S0(t)),this.sky.frustumCulled=!1,this.scene.add(this.sky),this.stars&&(this.scene.remove(this.stars),this.stars.geometry.dispose(),this.stars.material.dispose());const e=new Me,n=[];for(let r=0;r<900;r++){const a=new T(Y(-1,1),Y(.05,1),Y(-1,1)).normalize().multiplyScalar(140);n.push(a.x,a.y,a.z)}e.setAttribute("position",new te(n,3)),this.stars=new Mr(e,new yr({color:13621208,size:.22,transparent:!0,opacity:.52,depthWrite:!1,sizeAttenuation:!0})),this.scene.add(this.stars),this.moon&&(this.scene.remove(this.moon),this.moon.material.map?.dispose(),this.moon.material.dispose());const i=new ps({map:br(256),color:t.moon,transparent:!0,blending:Je,depthWrite:!1,opacity:.9});this.moon=new _r(i),this.moon.position.copy(this.arenaMoonDir).multiplyScalar(120),this.moon.scale.setScalar(28),this.scene.add(this.moon)}buildLights(t){const e=new ld(t.ambient,1182728,1.9);this.group.add(e),this.lights.push(e);const n=new ma(t.sun,3);n.position.set(-24,38,-26),n.castShadow=!0,n.shadow.mapSize.set(this.quality==="low"?1024:2048,this.quality==="low"?1024:2048),n.shadow.camera.near=5,n.shadow.camera.far=80,n.shadow.camera.left=-27,n.shadow.camera.right=27,n.shadow.camera.top=27,n.shadow.camera.bottom=-27,n.shadow.bias=-8e-4,n.shadow.normalBias=.025,this.group.add(n),this.lights.push(n),this.sun=n;const i=new ma(t.torch,.65);i.position.set(-10,8,22),this.group.add(i),this.lights.push(i);const r=new ma(16765858,1.15);r.position.set(14,11,18),this.group.add(r),this.lights.push(r);const a=new Bi(t.torch,1.8,23,2);a.position.set(0,7,-7),this.group.add(a),this.lights.push(a),this.centerLight=a}buildGround(t){let e,n,i=null,r=.96;t.ground==="sand"?(e=f0(512),e.repeat.set(4.5,4.5),n=e):t.ground==="basalt"?(e=p0(512),e.repeat.set(3.4,3.4),n=e,i=m0(512),i.repeat.set(3.4,3.4),r=.82):(e=rc(1,512),e.repeat.set(4,4),n=x0(512),n.repeat.set(4,4));const a=new Wt({map:e,bumpMap:n,bumpScale:.07,roughness:r,metalness:.04,color:t.ground==="sand"?11570017:t.ground==="basalt"?6573381:8355961});t.ground==="basalt"&&(a.emissive=new It(14043674),a.emissiveMap=i,a.emissiveIntensity=.7);const o=new ot(new Es(26.2,96),a);o.rotation.x=-Math.PI/2,o.receiveShadow=!0,this.group.add(o),this.ground=o;const l=new ot(new Dr(25.8,30,96),new Wt({color:1512208,roughness:.98,metalness:.02}));l.rotation.x=-Math.PI/2,l.position.y=.003,this.group.add(l);const c=oc(512,t.ground==="basalt"?"#ff5a2b":t.ground==="stone"?"#6bd3b2":"#b68b50"),h=new ot(new Xe(11,11),new Qe({map:c,transparent:!0,opacity:.28,depthWrite:!1,blending:Je,color:t.ground==="basalt"?16736312:t.ground==="stone"?6141589:13212509}));h.rotation.x=-Math.PI/2,h.position.y=.012,this.group.add(h),this.sigil=h;const u=new ot(new Ie(5.75,.04,6,96),new Wt({color:4995622,metalness:.6,roughness:.4}));u.rotation.x=Math.PI/2,u.position.y=.025,this.group.add(u);const d=new Wt({color:9865330,roughness:.86}),f=new we(.12,7,5),g=new ae(.018,.022,.34,5),v=Nn(48);for(let m=0;m<55;m++){const p=v()*Math.PI*2,S=8+v()*16.5,M=v()>.38?new ot(g,d):new ot(f,d);M.geometry===f&&M.scale.set(1,.82,1),M.position.set(Math.cos(p)*S,.03+v()*.015,Math.sin(p)*S),M.rotation.set(Math.PI/2+Y(-.3,.3),Y(0,6),Y(-.3,.3)),M.castShadow=!0,this.group.add(M)}}buildWalls(t){const e=rc(2,512);e.repeat.set(8,2);const n=new Wt({map:e,bumpMap:e,bumpScale:.12,color:t.ground==="stone"?7238253:t.ground==="basalt"?4929329:9074270,roughness:.93,side:je}),i=new ot(new ae(25.4,26.1,3.15,80,1,!0),n);i.position.y=1.575,i.receiveShadow=!0,i.castShadow=!0,this.group.add(i);const r=new Wt({color:3747881,roughness:.8,metalness:.18});for(const[S,M,x]of[[.32,25.45,.3],[3.05,25.2,.28],[1.6,25.35,.1]]){const A=new ot(new ae(M,M,x,80,1,!0),r);A.position.y=S,A.receiveShadow=!0,this.group.add(A)}const a=new Wt({color:854536,roughness:1});for(let S=0;S<10;S++){const M=S/10*Math.PI*2+.31;if(Math.abs((M+Math.PI)%(Math.PI*2)-Math.PI)<.35)continue;const x=new se,A=new ot(new Xe(2.2,2.2),a);A.position.z=-.04,x.add(A);const C=new ot(new Es(1.1,20,0,Math.PI),a);C.position.set(0,1.1,-.035),x.add(C);const R=new ot(new Ie(1.16,.08,5,18,Math.PI),r);R.position.set(0,1.08,0),x.add(R),x.position.set(Math.sin(M)*25.05,1.48,Math.cos(M)*25.05),x.lookAt(0,1.48,0),this.group.add(x)}const o=new se,l=new Wt({color:2893088,roughness:.84,metalness:.26});new Wt({color:2233615,roughness:.95});for(const S of[-4.7,4.7]){const M=new ot(new De(2.2,8,2.2),l);M.position.set(S,4,0),M.castShadow=!0,M.receiveShadow=!0,o.add(M);const x=new ot(new Ue(1.7,1.8,4),l);x.position.set(S,8.8,0),x.rotation.y=Math.PI/4,o.add(x)}const c=new ot(new De(11.4,1.25,2.1),l);c.position.y=7.35,c.castShadow=!0,o.add(c);const h=new Ji;h.moveTo(-4.1,0),h.lineTo(-4.1,4.3),h.absarc(0,4.3,4.1,Math.PI,0,!0),h.lineTo(4.1,0),h.closePath();const u=new Wt({color:722950,roughness:1}),d=new ot(new Oo(h,24),u);d.position.set(0,0,-.05),o.add(d);for(let S=-3;S<=3;S++){const M=new ot(new ae(.045,.055,6.8,6),new Wt({color:3881783,metalness:.8,roughness:.34}));M.position.set(S*.88,3.4,.2),o.add(M);const x=new ot(new Ue(.075,.3,4),M.material);x.position.set(S*.88,0,.2),x.rotation.x=Math.PI,o.add(x)}const f=new ot(new we(.28,8,6),new Wt({color:10523256,roughness:.9}));f.scale.set(1,1.2,.9),f.position.set(0,8.55,.9),o.add(f);const g=new ot(new Ie(.13,.035,5,12),l);g.position.set(0,8.55,1.15),o.add(g),o.position.set(0,0,-25.1),this.group.add(o),this.gate=o;const v=g0(t.banner,512);for(let S=0;S<8;S++){if(S===1||S===6)continue;const M=S/8*Math.PI*2+Math.PI,x=new se,A=new ot(new Xe(1.5,2.7,5,8),new Wt({map:v,transparent:!0,side:je,roughness:.98,metalness:0,color:13681322}));A.position.y=-1.37,A.castShadow=!0;const C=new ot(new ae(.045,.045,1.9,8),new Wt({color:4866098,metalness:.7,roughness:.4}));C.rotation.z=Math.PI/2,C.position.y=.04,x.add(C),x.add(A),x.position.set(Math.sin(M)*24.9,3.6,Math.cos(M)*24.9),x.lookAt(0,3.6,0),this.group.add(x),this.banners.push({group:x,cloth:A,phase:Y(0,6),base:A.geometry.attributes.position.array.slice()})}const m=new Wt({map:e,color:t.ground==="basalt"?5982017:8942685,roughness:.9}),p=new Wt({color:5127720,metalness:.72,roughness:.44});for(let S=0;S<8;S++){const M=S/8*Math.PI*2;if(S===2)continue;const x=21.6,A=Math.sin(M)*x,C=Math.cos(M)*x,R=new se,L=new ot(new ae(.62,.76,.5,8),m);L.position.y=.25,R.add(L);const w=new ot(new ae(.33,.45,4.5,10),m);w.position.y=2.7,w.castShadow=!0,w.receiveShadow=!0,R.add(w);const y=new ot(new ae(.62,.38,.42,8),m);y.position.y=5.12,R.add(y);const D=new ot(new ae(.52,.27,.36,10),p);D.position.y=5.5,R.add(D);const U=new ot(new Ie(.51,.05,5,16),p);U.rotation.x=Math.PI/2,U.position.y=5.67,R.add(U),R.position.set(A,0,C),R.rotation.y=-M,this.group.add(R),this.addFlame(A,5.75,C,1+S%3*.18,t,S<4)}for(let S=0;S<8;S++){const M=S/8*Math.PI*2+.32,x=Math.sin(M)*24.6,A=Math.cos(M)*24.6;this.addFlame(x,3.05,A,.58,t,!1);const C=new ot(new ae(.035,.035,.7,6),p);C.position.set(x*.98,2.65,A*.98),C.rotation.x=.3,this.group.add(C)}}addFlame(t,e,n,i,r,a=!1){const o=new ps({map:br(128),color:r.torch,transparent:!0,blending:Je,depthWrite:!1,opacity:.92}),l=new _r(o);l.position.set(t,e,n),l.scale.setScalar(.9*i),this.group.add(l);const c=new _r(new ps({map:br(128),color:16768924,transparent:!0,blending:Je,depthWrite:!1,opacity:.86}));c.position.set(t,e+.05,n),c.scale.setScalar(.4*i),this.group.add(c);let h=null;a&&(h=new Bi(r.torch,5.3*i,12,2),h.position.set(t,e+.25,n),this.group.add(h),this.lights.push(h)),this.flames.push({sprite:l,core:c,point:h,baseY:e,scale:i,phase:Y(0,10),rate:Y(.8,1.4)})}buildCrowd(t){const e=this.quality==="low"?160:280,n=new Io(.12,.32,2,5),i=new we(.1,6,5),r=new Wt({color:16777215,roughness:.98,metalness:0}),a=new Wt({color:16777215,roughness:.92}),o=new la(n,r,e),l=new la(i,a,e);o.castShadow=!1,o.receiveShadow=!1,l.castShadow=!1,l.receiveShadow=!1;const c=new oe,h=new Ki,u=new T,d=new T,f=[2560783,3220765,1841687,3807763,2894372,2300952];for(let g=0;g<e;g++){const v=g%4,m=Math.random()*Math.PI*2,p=27.6+v*2.1+Y(-.4,.4),S=2.7+v*.6,M=Y(.8,1.15);u.set(Math.sin(m)*p,S,Math.cos(m)*p),h.setFromEuler(new an(0,Math.atan2(-Math.sin(m),-Math.cos(m)),0)),d.set(M,M,M),c.compose(u,h,d),o.setMatrixAt(g,c),o.setColorAt(g,new It(o0(f))),u.y+=.39*M,c.compose(u,h,d),l.setMatrixAt(g,c),l.setColorAt(g,new It(Math.random()<.5?7229757:9136464)),this.crowd.push({angle:m,radius:p,baseY:S,scale:M,phase:Y(0,Math.PI*2)})}o.instanceMatrix.needsUpdate=!0,l.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),l.instanceColor&&(l.instanceColor.needsUpdate=!0),this.group.add(o,l),this.crowdBodies=o,this.crowdHeads=l,this.crowdMatrix=c,this.crowdQuat=h,this.crowdPos=u,this.crowdScl=d}buildProps(t){const e=new Wt({color:2956306,roughness:.97}),n=new Wt({color:3223338,metalness:.64,roughness:.5});if(this.themeIndex===1){for(let c=0;c<3;c++){const h=2.1+c*.67,u=18.2,d=new se,f=new ot(new ae(.13,.17,5.6,6),e);f.position.y=2.8,d.add(f);const g=new ot(new De(2.4,.2,.2),e);g.position.set(1.1,5.3,0),d.add(g);const v=new ot(new ae(.015,.015,1.4,4),new Wt({color:7100736,roughness:1}));v.position.set(1.8,4.55,0),d.add(v);const m=new ot(new Ie(.12,.018,4,10),v.material);m.position.set(1.8,3.83,0),d.add(m),d.position.set(Math.sin(h)*u,0,Math.cos(h)*u),d.rotation.y=-h,this.group.add(d)}const r=new se;for(let c=0;c<8;c++){const h=new ot(new ae(.025,.025,1.8,4),n),u=c/8*Math.PI*2;h.position.set(Math.cos(u)*.5,0,Math.sin(u)*.5),r.add(h)}const a=new ot(new Ie(.5,.035,4,12),n);a.rotation.x=Math.PI/2,a.position.y=.9,r.add(a);const o=a.clone();o.position.y=-.9,r.add(o);const l=new ot(new ae(.02,.02,3,4),n);l.position.y=2.9,r.add(l),r.position.set(-7,5.2,-19),this.group.add(r),this.hangingCage=r}if(this.themeIndex===2){const r=new Wt({color:1905684,metalness:.32,roughness:.52});for(let a=0;a<9;a++){const o=Y(0,Math.PI*2),l=Y(18.5,22.5),c=Y(1.1,3.4),h=new ot(new Ue(Y(.18,.48),c,5),r);h.position.set(Math.sin(o)*l,c/2,Math.cos(o)*l),h.rotation.z=Y(-.18,.18),this.group.add(h)}for(let a=0;a<4;a++){const o=a/4*Math.PI*2+.5,l=new Bi(16726802,2.2,9,2);l.position.set(Math.sin(o)*13,.35,Math.cos(o)*13),this.group.add(l),this.lights.push(l)}}const i=new Wt({color:3288101,roughness:.96});for(let r=0;r<4;r++){const a=27.3+r*2.1,o=new ot(new ae(a+1.15,a+1.15,.52,64,1,!0),i);o.position.y=2.48+r*.6,o.receiveShadow=!0,this.group.add(o);const l=new ot(new Ie(a+1.15,.055,4,64),new Wt({color:5128242,roughness:.72}));l.rotation.x=Math.PI/2,l.position.y=2.76+r*.6,this.group.add(l)}}buildHazards(t){const e=[{x:-8.5,z:2.5},{x:8.5,z:2.5},{x:-7.5,z:-10.5},{x:7.5,z:-10.5}],n=oc(256,t.ground==="basalt"?"#ff6a35":t.ground==="stone"?"#74dcb8":"#c79555");for(const i of e){const r=new se,a=new ot(new ae(1.45,1.54,.07,32),new Wt({color:2762530,metalness:.45,roughness:.65}));a.position.y=.035,a.receiveShadow=!0,r.add(a);const o=new ot(new Xe(2.4,2.4),new Qe({map:n,transparent:!0,opacity:.34,depthWrite:!1,blending:Je,color:t.ground==="stone"?7591088:16739131}));o.rotation.x=-Math.PI/2,o.position.y=.075,r.add(o);const l=new Ue(.1,1.1,5),c=new Wt({color:7829100,metalness:.85,roughness:.3}),h=new la(l,c,14);h.castShadow=!0;const u=new oe,d=[];for(let f=0;f<14;f++){const g=f/14*Math.PI*2,v=f<7?.5:.95;d.push({x:Math.cos(g)*v,z:Math.sin(g)*v,s:Y(.7,1.2)})}for(let f=0;f<14;f++)u.makeScale(1,.02,1),u.setPosition(d[f].x,0,d[f].z),h.setMatrixAt(f,u);r.add(h),r.position.set(i.x,0,i.z),this.group.add(r),this.hazards.push({group:r,spikes:h,rune:o,base:a,phase:Y(0,5),cycle:4.4,active:!1,spikeData:d,matrix:u,position:new T(i.x,0,i.z),wasActive:!1})}}buildAtmosphere(t){const e=this.quality==="low"?180:360,n=new Me,i=new Float32Array(e*3),r=new Float32Array(e);for(let d=0;d<e;d++)i[d*3]=Y(-24,24),i[d*3+1]=Y(.2,10),i[d*3+2]=Y(-24,24),r[d]=Y(0,Math.PI*2);n.setAttribute("position",new Pe(i,3));const a=lc(64),o=new yr({color:t.ground==="basalt"?16739130:t.ground==="stone"?9615786:14203015,size:.055,map:a,transparent:!0,opacity:.55,depthWrite:!1,blending:Je});this.dust=new Mr(n,o),o.opacity=.24,o.size=.038,this.group.add(this.dust),this.dustData={positions:i,phases:r,count:e};const l=this.quality==="low"?80:160,c=new Me,h=new Float32Array(l*3),u=new Float32Array(l*3);for(let d=0;d<l;d++){const f=Y(0,6.28),g=Y(7,23);h[d*3]=Math.sin(f)*g,h[d*3+1]=Y(0,12),h[d*3+2]=Math.cos(f)*g,u[d*3]=Y(-.15,.15),u[d*3+1]=Y(.35,1.2),u[d*3+2]=Y(-.15,.15)}c.setAttribute("position",new Pe(h,3)),this.emberStream=new Mr(c,new yr({color:t.torch,size:.08,map:lc(32),transparent:!0,opacity:.8,blending:Je,depthWrite:!1})),this.group.add(this.emberStream),this.emberData={positions:h,speed:u,count:l}}update(t,e=0){this.time+=t,this.crowdExcitement+=(e-this.crowdExcitement)*Math.min(1,t*1.5);const n=this.time;this.sky&&(this.sky.material.uniforms.time.value=n);for(const i of this.flames){const r=.82+Math.sin(n*12*i.rate+i.phase)*.1+Math.sin(n*19.7+i.phase*2)*.07;i.sprite.scale.setScalar(.92*i.scale*r),i.core.scale.setScalar(.48*i.scale*(.9+Math.sin(n*16+i.phase)*.12)),i.core.position.y=i.baseY+.06+Math.sin(n*9+i.phase)*.04,i.sprite.position.y=i.baseY+Math.sin(n*7+i.phase)*.03,i.point&&(i.point.intensity=(4.8+Math.sin(n*15+i.phase)*.7)*i.scale)}if(this.crowdBodies){const i=this.crowdMatrix,r=this.crowdQuat,a=this.crowdPos,o=this.crowdScl,l=this.crowd.length;for(let c=0;c<l;c++){const h=this.crowd[c],u=Math.sin(n*(1.2+this.crowdExcitement*3.2)+h.phase)*(.012+this.crowdExcitement*.07),d=Math.sin(n*.4+h.phase)*.04;a.set(Math.sin(h.angle+d*.02)*h.radius,h.baseY+u,Math.cos(h.angle+d*.02)*h.radius),r.setFromEuler(new an(0,Math.atan2(-Math.sin(h.angle),-Math.cos(h.angle)),0)),o.set(h.scale,h.scale,h.scale),i.compose(a,r,o),this.crowdBodies.setMatrixAt(c,i),a.y+=.39*h.scale+u*.6,i.compose(a,r,o),this.crowdHeads.setMatrixAt(c,i)}this.crowdBodies.instanceMatrix.needsUpdate=!0,this.crowdHeads.instanceMatrix.needsUpdate=!0}for(const i of this.banners){const r=i.cloth.geometry.attributes.position,a=i.base;for(let o=0;o<r.count;o++){const l=a[o*3],c=a[o*3+1],h=Math.sin(n*1.4+i.phase+c*.8+l*1.2)*.08*(1-(c+2)/4.2);r.setZ(o,h)}r.needsUpdate=!0}for(const i of this.hazards){i.phase+=t;const r=i.phase%6,a=r>3.75&&r<4.55,o=r>=4.55&&r<5.55;i.active=o,i.rune.material.opacity=a?.38+Math.sin(n*18)*.2:o?.16:.18;const l=o?Math.min(1,(r-4.55)*7):r>=5.55?Math.max(0,1-(r-5.55)*9):0;for(let c=0;c<i.spikeData.length;c++){const h=i.spikeData[c];i.matrix.makeScale(1,Math.max(.02,l*h.s),1),i.matrix.setPosition(h.x,.04+l*.42,h.z),i.spikes.setMatrixAt(c,i.matrix)}i.spikes.instanceMatrix.needsUpdate=!0}if(this.dust){const i=this.dust.geometry.attributes.position;for(let r=0;r<this.dustData.count;r++){let a=i.getY(r)+t*(.08+r%5*.02),o=i.getX(r)+Math.sin(n*.3+this.dustData.phases[r])*t*.08,l=i.getZ(r)+Math.cos(n*.24+this.dustData.phases[r])*t*.06;a>10&&(a=.2),o>24&&(o=-24),o<-24&&(o=24),l>24&&(l=-24),l<-24&&(l=24),i.setXYZ(r,o,a,l)}i.needsUpdate=!0}if(this.emberStream){const i=this.emberStream.geometry.attributes.position,{speed:r,count:a}=this.emberData;for(let o=0;o<a;o++){let l=i.getY(o)+t*r[o*3+1],c=i.getX(o)+Math.sin(n+o)*t*.08,h=i.getZ(o)+Math.cos(n*.7+o)*t*.06;l>13&&(l=0,c=Y(-23,23),h=Y(-23,23)),i.setXYZ(o,c,l,h)}i.needsUpdate=!0}this.hangingCage&&(this.hangingCage.rotation.z=Math.sin(n*.55)*.035),this.centerLight&&(this.centerLight.intensity=1.1+this.crowdExcitement*1.4),this.sigil&&(this.sigil.material.opacity=.22+Math.sin(n*.8)*.04+this.crowdExcitement*.05)}excite(t=.4){this.crowdExcitement=Math.min(1,this.crowdExcitement+t)}clampToArena(t,e=.45){const n=Math.hypot(t.x,t.z),i=this.radius-e;return n>i&&(t.x=t.x/n*i,t.z=t.z/n*i),t}distanceToEdge(t){return this.radius-Math.hypot(t.x,t.z)}disposeGroup(t){t.traverse(e=>{if(e.geometry&&e.geometry.dispose(),e.material){const n=Array.isArray(e.material)?e.material:[e.material];for(const i of n){for(const r of["map","bumpMap","emissiveMap","normalMap"])i[r]&&i[r].dispose();i.dispose()}}})}dispose(){this.group&&(this.scene.remove(this.group),this.disposeGroup(this.group)),this.sky&&(this.scene.remove(this.sky),this.sky.geometry.dispose(),this.sky.material.dispose()),this.stars&&(this.scene.remove(this.stars),this.stars.geometry.dispose(),this.stars.material.dispose()),this.moon&&(this.scene.remove(this.moon),this.moon.material.map?.dispose(),this.moon.material.dispose())}}const b0=`
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (340.0 / max(1.0, -mv.z));
  gl_Position = projectionMatrix * mv;
}`,E0=`
uniform sampler2D uMap;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec4 tex = texture2D(uMap, gl_PointCoord);
  if (tex.a * vAlpha < .01) discard;
  gl_FragColor = vec4(vColor, tex.a * vAlpha);
}`;class hc{constructor(t,e,n,i,r){this.max=e,this.particles=[],this.positions=new Float32Array(e*3),this.colors=new Float32Array(e*3),this.sizes=new Float32Array(e),this.alphas=new Float32Array(e),this.geo=new Me,this.geo.setAttribute("position",new Pe(this.positions,3)),this.geo.setAttribute("aColor",new Pe(this.colors,3)),this.geo.setAttribute("aSize",new Pe(this.sizes,1)),this.geo.setAttribute("aAlpha",new Pe(this.alphas,1)),this.geo.setDrawRange(0,0),this.mat=new Le({uniforms:{uMap:{value:i}},vertexShader:b0,fragmentShader:E0,transparent:!0,depthWrite:!1,blending:n?Je:li,vertexColors:!1}),this.points=new Mr(this.geo,this.mat),this.points.frustumCulled=!1,t.add(this.points),this.color=r}spawn(t,e,n={}){this.particles.length>=this.max&&this.particles.shift(),this.particles.push({x:t.x,y:t.y,z:t.z,vx:e.x,vy:e.y,vz:e.z,gravity:n.gravity??-9,drag:n.drag??1.2,life:n.life??.8,maxLife:n.life??.8,size:n.size??.08,color:new It(n.color??this.color),fade:n.fade??1,floor:n.floor??0})}update(t){let e=0;const n=this.particles;for(let i=n.length-1;i>=0;i--){const r=n[i];if(r.life-=t,r.life<=0){n.splice(i,1);continue}r.vy+=r.gravity*t;const a=Math.max(0,1-r.drag*t);r.vx*=a,r.vz*=a,r.x+=r.vx*t,r.y+=r.vy*t,r.z+=r.vz*t,r.y<r.floor+.02&&(r.y=r.floor+.02,r.vy=Math.abs(r.vy)*.25,r.vx*=.62,r.vz*=.62);const o=r.life/r.maxLife;this.positions[e*3]=r.x,this.positions[e*3+1]=r.y,this.positions[e*3+2]=r.z,this.colors[e*3]=r.color.r,this.colors[e*3+1]=r.color.g,this.colors[e*3+2]=r.color.b,this.sizes[e]=r.size*(.55+o*.65),this.alphas[e]=Math.min(1,o*2)*r.fade,e++}this.geo.setDrawRange(0,e),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aColor.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0,this.geo.attributes.aAlpha.needsUpdate=!0}}class T0{constructor(t,e){this.scene=t,this.camera=e,this.bloodTex=ac(!1),this.sparkTex=ac(!0),this.blood=new hc(t,900,!1,this.bloodTex,7014918),this.sparks=new hc(t,600,!0,this.sparkTex,16757599),this.decals=[],this.decalIndex=0,this.decalTexture=oh(256),this.debris=[],this.slashes=[],this.flashes=[],this.floaters=[],this.trauma=0,this.time=0,this.setupDecals(),this.setupFlashPool()}setupDecals(){const t=new Xe(1,1);for(let e=0;e<52;e++){const n=new Qe({map:this.decalTexture,transparent:!0,opacity:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),i=new ot(t,n);i.rotation.x=-Math.PI/2,i.position.y=.018,i.visible=!1,i.renderOrder=2,this.scene.add(i),this.decals.push(i)}}setupFlashPool(){this.flashTex=br(128);for(let t=0;t<10;t++){const e=new ps({map:this.flashTex,color:16760951,transparent:!0,blending:Je,depthWrite:!1,opacity:0}),n=new _r(e);n.visible=!1,this.scene.add(n),this.flashes.push({sprite:n,life:0,max:.2,start:1})}}bloodBurst(t,e,n=20,i=1){const r=e?e.clone().normalize():new T(0,0,1);for(let a=0;a<n;a++){const o=new T(r.x*Y(.4,3.1)*i+Y(-1.3,1.3),Y(.2,2.4)*i+r.y,r.z*Y(.4,3.1)*i+Y(-1.3,1.3)),l=new It().setHSL(.012+Y(-.01,.015),.82,Y(.09,.2));this.blood.spawn({x:t.x+Y(-.14,.14),y:t.y+Y(-.18,.18),z:t.z+Y(-.14,.14)},o,{gravity:-11,drag:.9,life:Y(.45,1.2),size:Y(.035,.115)*(i>1?1.3:1),color:l,floor:0})}for(let a=0;a<Math.max(3,n*.18);a++){const o=new It(4851974);this.blood.spawn({x:t.x,y:t.y,z:t.z},{x:Y(-.5,.5),y:Y(0,.6),z:Y(-.5,.5)},{gravity:.1,drag:2,life:Y(.3,.7),size:Y(.15,.32),color:o,fade:.55})}this.addDecal(t,i)}addDecal(t,e=1){const n=this.decals[this.decalIndex%this.decals.length];this.decalIndex++,n.position.y<.015&&(n.position.y=.017+Y(0,.006)),n.position.set(t.x+Y(-.15,.15),.019+Y(0,.006),t.z+Y(-.15,.15)),n.rotation.z=Y(0,Math.PI*2);const i=Y(.5,1.4)*e;n.scale.set(i,i,1),n.material.opacity=Y(.45,.78),n.visible=!0,n.userData.life=Y(16,30),n.userData.maxLife=n.userData.life}sparksBurst(t,e,n=15,i=1){const r=e?e.clone().normalize():new T(0,1,0);for(let a=0;a<n;a++){const o=new T(r.x*Y(1,4.5)+Y(-1.6,1.6),Y(.1,3.4)+r.y,r.z*Y(1,4.5)+Y(-1.6,1.6)).multiplyScalar(i),l=new It().setHSL(Y(.055,.11),1,Y(.5,.7));this.sparks.spawn({x:t.x,y:t.y,z:t.z},o,{gravity:-12,drag:.55,life:Y(.16,.6),size:Y(.025,.09),color:l,floor:0})}this.impactFlash(t,1.1*i)}embers(t,e=10,n=16742972){for(let i=0;i<e;i++){const r=new It(n).offsetHSL(Y(-.02,.02),0,Y(-.15,.15));this.sparks.spawn({x:t.x+Y(-.4,.4),y:t.y,z:t.z+Y(-.4,.4)},{x:Y(-.4,.4),y:Y(.4,1.8),z:Y(-.4,.4)},{gravity:.4,drag:.8,life:Y(.5,1.6),size:Y(.025,.08),color:r})}}dust(t,e=12,n=10322529,i=1){for(let r=0;r<e;r++){const a=new It(n);this.blood.spawn({x:t.x+Y(-.2,.2),y:.05+Y(0,.12),z:t.z+Y(-.2,.2)},{x:Y(-1.4,1.4)*i,y:Y(.1,.7)*i,z:Y(-1.4,1.4)*i},{gravity:-.15,drag:1.8,life:Y(.4,.9),size:Y(.18,.4)*i,color:a,fade:.22})}}impactFlash(t,e=1,n=16760442){const i=this.flashes.find(r=>r.life<=0)||this.flashes[0];i.life=.19,i.max=.19,i.start=e,i.sprite.position.copy(t),i.sprite.material.color.set(n),i.sprite.scale.setScalar(.45*e),i.sprite.visible=!0}spawnDebris(t,e,n=.16,i=null,r="metal"){const a=Math.random()<.5?new De(n*Y(.7,1.5),n*Y(.5,1.3),n*Y(.4,.9)):new Bo(n*Y(.6,1.2)),o=new Wt({color:e,metalness:r==="metal"?.8:.05,roughness:r==="metal"?.38:.9}),l=new ot(a,o);l.castShadow=!0,l.position.copy(t),this.scene.add(l);const c=i||new T(Y(-2.8,2.8),Y(1.5,5),Y(-2.8,2.8));this.debris.push({mesh:l,v:c,av:new T(Y(-8,8),Y(-8,8),Y(-8,8)),life:Y(5,8),floor:.04+Y(0,.08)})}spawnHead(t,e,n){const i=new se,r=new ot(new we(.16,9,7),new Wt({color:e,roughness:.7}));if(r.scale.set(.94,1.1,.96),i.add(r),n){const a=new ot(new we(.173,9,6,0,Math.PI*2,0,Math.PI*.62),new Wt({color:n,metalness:.8,roughness:.33}));a.position.y=.04,i.add(a)}i.position.copy(t),i.castShadow=!0,this.scene.add(i),this.debris.push({mesh:i,v:new T(Y(-2.5,2.5),Y(3,6),Y(-1,2.5)),av:new T(Y(-9,9),Y(-9,9),Y(-9,9)),life:9,floor:.18,head:!0,blood:!0});for(let a=0;a<24;a++)this.blood.spawn({x:t.x,y:t.y,z:t.z},{x:Y(-2,2),y:Y(1,4),z:Y(-2,2)},{gravity:-11,drag:.7,life:Y(.5,1.3),size:Y(.04,.11),color:new It(5900293)})}slash(t,e,n=!1){const i=n?1.05:.75,r=n?3:2.55,a=n?1.7:1.95,o=new Dr(i,r,24,1,-a/2,a),l=new Qe({color:n?16754024:15258542,transparent:!0,opacity:.5,side:je,blending:Je,depthWrite:!1}),c=new ot(o,l);c.position.copy(t),c.position.y+=n?1.3:1.1,n?c.rotation.set(0,-e+Math.PI/2,-.55):(c.rotation.set(-Math.PI/2+.32,0,0),c.rotation.z=-e),this.scene.add(c),this.slashes.push({mesh:c,life:.22,max:.22})}floatText(t,e,n=""){const i=document.createElement("div");i.className=`float-num ${n}`,i.textContent=e,document.getElementById("float-layer").appendChild(i),this.floaters.push({el:i,position:t.clone(),life:.72})}shake(t){this.trauma=Kt(this.trauma+t,0,1.3)}getShake(t){if(this.trauma<=0)return{x:0,y:0};this.trauma=Math.max(0,this.trauma-t*1.8);const e=this.trauma*this.trauma;return{x:(Math.sin(this.time*91.3)+Math.sin(this.time*57.1))*.045*e,y:(Math.cos(this.time*83.7)+Math.sin(this.time*47.9))*.035*e}}update(t,e=this.camera){this.time+=t,this.blood.update(t),this.sparks.update(t);for(const n of this.decals)if(n.visible){if(n.userData.life-=t,n.userData.life<=0){n.visible=!1;continue}n.userData.life<3&&(n.material.opacity=Math.max(0,n.material.opacity-t*.18))}for(let n=this.debris.length-1;n>=0;n--){const i=this.debris[n];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.traverse?.(r=>{r.geometry&&r.geometry.dispose(),r.material&&r.material.dispose()}),this.debris.splice(n,1);continue}i.v.y-=15*t,i.mesh.position.addScaledVector(i.v,t),i.mesh.position.y<i.floor&&(i.mesh.position.y=i.floor,Math.abs(i.v.y)>1.2?(i.v.y*=-.28,i.v.x*=.65,i.v.z*=.65):(i.v.y=0,i.v.multiplyScalar(.94)),i.av.multiplyScalar(.93),i.head&&Math.random()<.15&&this.blood.spawn({x:i.mesh.position.x,y:i.mesh.position.y,z:i.mesh.position.z},{x:Y(-.3,.3),y:.2,z:Y(-.3,.3)},{gravity:-9,drag:1,life:.4,size:.05,color:new It(5244676)})),i.mesh.rotation.x+=i.av.x*t,i.mesh.rotation.y+=i.av.y*t,i.mesh.rotation.z+=i.av.z*t,!i.head&&i.mesh.position.y<=i.floor+.1&&(i.v.x*=.985)}for(let n=this.slashes.length-1;n>=0;n--){const i=this.slashes[n];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mesh.geometry.dispose(),i.mesh.material.dispose(),this.slashes.splice(n,1);continue}const r=1-i.life/i.max;i.mesh.scale.setScalar(1+r*.34),i.mesh.material.opacity=(1-r)*.42}for(const n of this.flashes){if(n.life<=0)continue;n.life-=t;const i=1-n.life/n.max;n.sprite.scale.setScalar(n.start*(.45+i*1.9)),n.sprite.material.opacity=(1-i)*.7,n.life<=0&&(n.sprite.visible=!1)}for(let n=this.floaters.length-1;n>=0;n--){const i=this.floaters[n];if(i.life-=t,i.life<=0){i.el.remove(),this.floaters.splice(n,1);continue}const r=i.position.clone().project(e),a=(r.x*.5+.5)*window.innerWidth,o=(-r.y*.5+.5)*window.innerHeight;i.el.style.left=`${a}px`,i.el.style.top=`${o}px`}}}class A0{constructor(){this.ctx=null,this.master=null,this.sfxBus=null,this.ambientBus=null,this.volume=.75,this.muted=!1,this.started=!1,this.intensity=0,this.nextBeat=0,this.nextCrowd=0,this.stepTimer=0}start(){if(this.started){this.ctx?.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;this.ctx=new t,this.started=!0;const e=this.ctx;this.master=e.createGain(),this.master.gain.value=this.volume;const n=e.createDynamicsCompressor();n.threshold.value=-18,n.knee.value=18,n.ratio.value=5,n.attack.value=.003,n.release.value=.2,this.master.connect(n),n.connect(e.destination),this.sfxBus=e.createGain(),this.sfxBus.gain.value=.8,this.sfxBus.connect(this.master),this.ambientBus=e.createGain(),this.ambientBus.gain.value=.65,this.ambientBus.connect(this.master),this.noise=this.makeNoise(2,"pink"),this.white=this.makeNoise(1,"white"),this.buildAmbience(),this.nextBeat=e.currentTime+2,this.nextCrowd=e.currentTime+4}makeNoise(t,e="white"){const n=this.ctx,i=Math.floor(n.sampleRate*t),r=n.createBuffer(1,i,n.sampleRate),a=r.getChannelData(0);let o=0,l=0,c=0,h=0,u=0,d=0,f=0;for(let g=0;g<i;g++){const v=Math.random()*2-1;e==="pink"?(o=.99886*o+v*.0555179,l=.99332*l+v*.0750759,c=.969*c+v*.153852,h=.8665*h+v*.3104856,u=.55*u+v*.5329522,d=-.7616*d-v*.016898,a[g]=(o+l+c+h+u+d+f+v*.5362)*.11,f=v*.115926):a[g]=v}return r}buildAmbience(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.noise,e.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=260,n.Q.value=.7;const i=t.createGain();i.gain.value=.032;const r=t.createOscillator();r.frequency.value=.065;const a=t.createGain();a.gain.value=.018,r.connect(a),a.connect(i.gain),e.connect(n),n.connect(i),i.connect(this.ambientBus),e.start(),r.start();for(const[d,f]of[[41.2,.013],[61.7,.008],[82.4,.005]]){const g=t.createOscillator();g.type="sine",g.frequency.value=d;const v=t.createGain();v.gain.value=f;const m=t.createOscillator();m.frequency.value=.04+Math.random()*.05;const p=t.createGain();p.gain.value=f*.35,m.connect(p),p.connect(v.gain),g.connect(v),v.connect(this.ambientBus),g.start(),m.start()}const o=t.createBufferSource();o.buffer=this.noise,o.loop=!0;const l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=640,l.Q.value=.45;const c=t.createGain();c.gain.value=.012;const h=t.createOscillator();h.frequency.value=.11;const u=t.createGain();u.gain.value=.007,h.connect(u),u.connect(c.gain),o.connect(l),l.connect(c),c.connect(this.ambientBus),o.start(),h.start(),this.crowdGain=c}setVolume(t){this.volume=Kt(t,0,1),this.master&&this.master.gain.setTargetAtTime(this.muted?0:this.volume,this.ctx.currentTime,.05)}setMuted(t){this.muted=t,this.master&&this.master.gain.setTargetAtTime(t?0:this.volume,this.ctx.currentTime,.04)}now(){return this.ctx?.currentTime||0}tone({freq:t=220,end:e=t,duration:n=.25,gain:i=.1,type:r="sine",attack:a=.004,pan:o=0,bus:l=null,lowpass:c=null}){if(!this.ctx)return;const h=this.ctx,u=h.currentTime,d=h.createOscillator();d.type=r,d.frequency.setValueAtTime(t,u),e!==t&&d.frequency.exponentialRampToValueAtTime(Math.max(1,e),u+n);const f=h.createGain();f.gain.setValueAtTime(1e-4,u),f.gain.linearRampToValueAtTime(i,u+a),f.gain.exponentialRampToValueAtTime(1e-4,u+n);let g=d;if(c){const m=h.createBiquadFilter();m.type="lowpass",m.frequency.value=c,g.connect(m),g=m}const v=h.createStereoPanner();v.pan.value=o,g.connect(f),f.connect(v),v.connect(l||this.sfxBus),d.start(u),d.stop(u+n+.04)}noiseBurst({duration:t=.2,gain:e=.12,freq:n=1200,endFreq:i=n,q:r=1,type:a="bandpass",pan:o=0,attack:l=.002,bus:c=null}){if(!this.ctx)return;const h=this.ctx,u=h.currentTime,d=h.createBufferSource();d.buffer=this.white,d.playbackRate.value=Y(.9,1.1);const f=h.createBiquadFilter();f.type=a,f.Q.value=r,f.frequency.setValueAtTime(n,u),i!==n&&f.frequency.exponentialRampToValueAtTime(Math.max(30,i),u+t);const g=h.createGain();g.gain.setValueAtTime(1e-4,u),g.gain.linearRampToValueAtTime(e,u+l),g.gain.exponentialRampToValueAtTime(1e-4,u+t);const v=h.createStereoPanner();v.pan.value=Kt(o,-1,1),d.connect(f),f.connect(g),g.connect(v),v.connect(c||this.sfxBus),d.start(u),d.stop(u+t+.03)}swing(t=1){this.ctx&&(this.noiseBurst({duration:.18+t*.1,gain:.11*t,freq:700,endFreq:2200+t*900,q:1.6,type:"bandpass",attack:.045}),this.noiseBurst({duration:.22,gain:.035,freq:240,endFreq:110,q:.7,type:"lowpass"}))}hit(t=1,e=!1){if(this.ctx&&(this.tone({freq:92*t,end:43,duration:.18+t*.08,gain:.2*t,type:"sine"}),this.tone({freq:156,end:60,duration:.12,gain:.06,type:"triangle"}),this.noiseBurst({duration:.12,gain:.15,freq:480,endFreq:180,q:.8,type:"lowpass"}),this.noiseBurst({duration:.07,gain:.08,freq:1800,endFreq:600,q:.7}),e)){for(const n of[1420,2180,3170])this.tone({freq:n,end:n*.98,duration:.28,gain:.035,type:"sine"});this.noiseBurst({duration:.14,gain:.08,freq:4400,endFreq:2400,q:2})}}block(){if(this.ctx){for(const t of[920,1740,2780,4120])this.tone({freq:t,end:t*.96,duration:.32,gain:.045,type:"sine"});this.noiseBurst({duration:.18,gain:.12,freq:3900,endFreq:1400,q:2.2}),this.tone({freq:72,end:48,duration:.22,gain:.13,type:"sine"})}}parry(){if(this.ctx){for(const[t,e]of[[1240,.08],[2130,.06],[3290,.04],[4680,.02]])this.tone({freq:t,end:t*.985,duration:.62,gain:e,type:"sine",attack:.002});this.tone({freq:84,end:38,duration:.5,gain:.17,type:"sine"}),this.noiseBurst({duration:.18,gain:.12,freq:5600,endFreq:2200,q:1.8})}}flesh(t=1){this.ctx&&(this.noiseBurst({duration:.16,gain:.15,freq:340,endFreq:130,q:1.1,type:"lowpass"}),this.noiseBurst({duration:.07,gain:.07,freq:1300,endFreq:400,q:3}),this.tone({freq:61,end:34,duration:.28,gain:.11,type:"sine"}))}hurt(){this.ctx&&(this.tone({freq:110,end:46,duration:.38,gain:.17,type:"triangle"}),this.noiseBurst({duration:.2,gain:.1,freq:340,endFreq:90,q:.8,type:"lowpass"}),this.tone({freq:48,end:36,duration:.75,gain:.08,type:"sine"}))}footstep(t=0){this.ctx&&(this.noiseBurst({duration:.09,gain:.038,freq:t===0?240:530,endFreq:t===0?90:160,q:1.1,type:"lowpass"}),this.tone({freq:t===0?52:74,end:36,duration:.1,gain:.035,type:"sine"}))}roar(t=!1){if(!this.ctx)return;const e=t?74:126;for(let n=0;n<3;n++)this.tone({freq:e*(1+n*.03),end:e*.58,duration:t?1.1:.65,gain:.028,type:"sawtooth",attack:.07,lowpass:820});this.noiseBurst({duration:t?1.15:.7,gain:.075,freq:560,endFreq:240,q:.7}),this.tone({freq:e*.5,end:31,duration:.9,gain:.08,type:"sine"})}death(){this.ctx&&(this.tone({freq:130,end:43,duration:.75,gain:.055,type:"sawtooth",lowpass:460}),this.flesh(1.2))}execute(){this.ctx&&(this.tone({freq:58,end:24,duration:1.8,gain:.2,type:"sine",attack:.01}),this.tone({freq:146,end:36,duration:1.2,gain:.05,type:"sawtooth",lowpass:700}),this.noiseBurst({duration:.8,gain:.1,freq:1e3,endFreq:130,q:.65,type:"lowpass",attack:.03}),this.ctx.suspend)}heartbeat(){this.ctx&&(this.tone({freq:64,end:38,duration:.22,gain:.11,type:"sine",attack:.006}),setTimeout(()=>this.tone({freq:58,end:33,duration:.18,gain:.07,type:"sine"}),155))}ui(t=!1){this.ctx&&(this.tone({freq:t?392:620,end:t?523:560,duration:t?.24:.09,gain:t?.035:.018,type:"sine"}),t&&this.tone({freq:784,end:1046,duration:.3,gain:.018,type:"sine"}))}unlock(){if(this.ctx)for(const[t,e]of[[392,.15],[523.25,.2],[659.25,.26],[1046.5,.8]])this.tone({freq:t,end:t*1.002,duration:e,gain:.04,type:"sine",attack:.01})}waveHorn(t=!1){if(!this.ctx)return;const e=t?82:110;for(const[n,i]of[[e,.09],[e*1.5,.045],[e*2,.02]])this.tone({freq:n,end:n*.99,duration:t?2.2:1.4,gain:i,type:"sawtooth",attack:.22,lowpass:680});this.noiseBurst({duration:1.3,gain:.065,freq:520,endFreq:280,q:.5,type:"lowpass",attack:.2})}update(t,e=0,n=!1){if(!(!this.ctx||this.ctx.state!=="running")){if(this.intensity+=(e-this.intensity)*Math.min(1,t*.8),this.crowdGain&&this.crowdGain.gain.setTargetAtTime(.012+this.intensity*.018,this.ctx.currentTime,.8),this.ctx.currentTime>this.nextBeat){if(this.intensity>.16){const i=48+Math.random()*12;this.tone({freq:i,end:31,duration:.34,gain:.05+this.intensity*.08,type:"sine",bus:this.ambientBus}),this.noiseBurst({duration:.1,gain:.016+this.intensity*.012,freq:180,endFreq:70,q:.7,type:"lowpass",bus:this.ambientBus}),this.intensity>.65&&setTimeout(()=>this.tone({freq:i*.8,end:28,duration:.28,gain:.045,type:"sine",bus:this.ambientBus}),230)}this.nextBeat=this.ctx.currentTime+Math.max(.48,1.55-this.intensity*.7)+Math.random()*.15}this.ctx.currentTime>this.nextCrowd&&(this.intensity>.35&&Math.random()<.4&&this.noiseBurst({duration:.7,gain:.012,freq:760+Math.random()*500,endFreq:500,q:.9,bus:this.ambientBus}),this.nextCrowd=this.ctx.currentTime+3+Math.random()*4)}}}const at=s=>document.getElementById(s);class C0{constructor(t){this.audio=t,this.handlers={},this.currentOverlay=null,this.layout="desktop",this.enemyEls=new Map,this.bossEnemy=null,this.lastHealth=100,this.armoryState={tab:"weapons",selected:null},this.dom={loading:at("loading-screen"),title:at("title-screen"),hud:at("hud"),health:at("health-bar"),healthLag:at("health-lag"),healthText:at("health-text"),stamina:at("stamina-bar"),armorChip:at("armor-chip"),combo:at("combo-chip"),wave:at("wave-label"),arena:at("arena-name"),objective:at("wave-objective"),pips:at("wave-pips"),score:at("score-value"),marks:at("marks-value"),chain:at("chain-value"),chainTimer:at("chain-timer"),rage:at("rage-bar"),rageText:at("rage-text"),weapon:at("hud-weapon"),statReach:at("stat-reach"),statHit:at("stat-hit"),bossHud:at("boss-hud"),bossName:at("boss-name"),bossFill:at("boss-fill"),announce:at("announcement"),announceKicker:at("announce-kicker"),announceTitle:at("announce-title"),announceSub:at("announce-sub"),prompt:at("execution-prompt"),slow:at("slowmo-vignette"),hitmarker:at("hit-marker"),damage:at("damage-flash"),blood:at("blood-screen"),parry:at("parry-flash"),reticle:at("reticle"),touch:at("touch-ui"),executeBtn:document.querySelector('[data-touch="execute"]'),staminaWarning:at("stamina-warning"),controls:at("control-ribbon"),pause:at("pause-screen"),settings:at("settings-screen"),armory:at("armory-screen"),boon:at("boon-screen"),codex:at("codex-screen"),death:at("death-screen")},this.bindStatic()}bindStatic(){const t=(c,h)=>at(c)?.addEventListener("click",()=>{this.audio.ui(!0),h()});t("btn-start",()=>this.handlers.start?.()),t("btn-armory",()=>this.handlers.armory?.()),t("btn-settings",()=>this.handlers.settings?.()),t("btn-codex",()=>this.handlers.codex?.()),t("btn-resume",()=>this.handlers.resume?.()),t("btn-pause-settings",()=>this.handlers.settings?.()),t("btn-abandon",()=>this.handlers.abandon?.()),t("btn-retry",()=>this.handlers.retry?.()),t("btn-menu",()=>this.handlers.menu?.()),t("btn-next-wave",()=>this.handlers.nextWave?.()),document.querySelectorAll("[data-close]").forEach(c=>{c.addEventListener("click",()=>{this.audio.ui();const h=c.dataset.close;h==="settings"?this.handlers.closeSettings?.():this.closeOverlay(h)})}),document.querySelectorAll(".tab").forEach(c=>{c.addEventListener("click",()=>{this.audio.ui(),this.armoryState.tab=c.dataset.tab,this.renderArmory()})});const e=at("set-volume"),n=at("set-sens"),i=at("set-gore"),r=at("set-scale"),a=at("set-shake"),o=at("set-motion"),l=()=>{at("vol-val").textContent=`${e.value}%`,at("sens-val").textContent=(n.value/100).toFixed(1),at("gore-val").textContent=["SUBTLE","STANDARD","CINEMATIC"][i.value],at("scale-val").textContent=["AUTO","HIGH","PERFORMANCE"][r.value]};e.addEventListener("input",()=>{l(),this.handlers.setting?.("volume",Number(e.value))}),n.addEventListener("input",()=>{l(),this.handlers.setting?.("sensitivity",Number(n.value))}),i.addEventListener("input",()=>{l(),this.handlers.setting?.("gore",Number(i.value))}),r.addEventListener("input",()=>{l(),this.handlers.setting?.("scale",Number(r.value))}),a.addEventListener("change",()=>this.handlers.setting?.("shake",a.checked)),o.addEventListener("change",()=>this.handlers.setting?.("motion",o.checked)),l()}bind(t){this.handlers=t}setSettings(t){at("set-volume").value=Math.round(t.volume*100),at("set-sens").value=t.sensitivity,at("set-gore").value=t.gore,at("set-scale").value=t.scale,at("set-shake").checked=t.shake,at("set-motion").checked=t.motion,at("vol-val").textContent=`${Math.round(t.volume*100)}%`,at("sens-val").textContent=(t.sensitivity/100).toFixed(1),at("gore-val").textContent=["SUBTLE","STANDARD","CINEMATIC"][t.gore],at("scale-val").textContent=["AUTO","HIGH","PERFORMANCE"][t.scale]}hideLoading(){this.dom.loading.classList.add("is-leaving"),setTimeout(()=>this.dom.loading.classList.remove("is-active"),600)}showTitle(){document.body.classList.remove("in-game"),this.dom.title.classList.add("is-active"),this.dom.title.classList.remove("is-leaving"),this.dom.hud.setAttribute("aria-hidden","true"),this.clearEnemyBars()}hideTitle(){this.dom.title.classList.add("is-leaving"),setTimeout(()=>{this.dom.title.classList.remove("is-active")},600)}enterGame(){document.body.classList.add("in-game"),this.dom.hud.setAttribute("aria-hidden","false"),this.controlHint()}controlHint(){this.dom.controls.classList.remove("hide"),clearTimeout(this.controlTimer),this.controlTimer=setTimeout(()=>this.dom.controls.classList.add("hide"),9e3)}setTouch(t){document.body.classList.toggle("touch",t),this.touchEnabled=t}updateTitleLoadout(t){const e=ki.find(r=>r.id===t.weapon)||ki[0],n=zi.find(r=>r.id===t.armor)||zi[0];at("title-weapon").textContent=e.name,at("title-weapon-glyph").textContent=e.icon,at("title-armor").textContent=`${n.name} · RANK ${t.rank||1}`,at("title-renown").textContent=un(t.renown||0);const i=this.xpForRank(t.rank||1);at("title-xp").style.width=`${Kt((t.renown||0)%i/i*100,2,100)}%`}xpForRank(t){return 500+t*230}updateHUD(t){const e=this.dom;e.health.style.width=`${Kt(t.health/t.maxHealth*100,0,100)}%`,e.healthText.textContent=Math.ceil(t.health),t.health<this.lastHealth?e.healthLag.style.width=`${Kt(t.health/t.maxHealth*100,0,100)}%`:setTimeout(()=>{e.healthLag.style.width=`${Kt(t.health/t.maxHealth*100,0,100)}%`},300),this.lastHealth=t.health,e.stamina.style.width=`${Kt(t.stamina/t.maxStamina*100,0,100)}%`,e.armorChip.textContent=t.armor>0?`PLATE ${Math.ceil(t.armor/t.maxArmor*100)}%`:"PLATE BROKEN",e.combo.textContent=t.combo>1?`${t.combo} HIT CHAIN`:"NO CHAIN",e.score.textContent=String(Math.floor(t.score)).padStart(6,"0"),e.marks.textContent=un(t.runMarks),e.chain.textContent=`×${t.chain.toFixed(2)}`,e.chainTimer.style.transform=`scaleX(${Kt(t.chainTimer,0,1)})`,e.rage.style.width=`${Kt(t.rage,0,100)}%`,e.rageText.textContent=Math.floor(t.rage),e.weapon.textContent=t.weaponName,e.statReach.style.width=`${Kt(t.reach/3.5*100,10,100)}%`,e.statHit.style.width=`${Kt(t.damage/105*100,10,100)}%`,e.staminaWarning.classList.toggle("on",t.stamina<14),e.executeBtn?.classList.toggle("show",!!t.executable),e.prompt.classList.toggle("show",!!t.executable),e.slow.classList.toggle("on",!!t.slowmo)}setWave(t,e,n,i=!1){this.dom.wave.textContent=`WAVE ${ri(t)}`,this.dom.arena.textContent=e,this.dom.objective.textContent=n;let r="";const a=Math.min(10,Math.max(10,Math.ceil(t/5)*5));for(let o=1;o<=a;o++)r+=`<i class="${o<t?"filled":""} ${o%5===0?"boss":""}"></i>`;this.dom.pips.innerHTML=r}setBoss(t){this.bossEnemy=t,this.dom.bossHud.classList.toggle("active",!!t),t&&(this.dom.bossName.textContent=t.def.name,this.dom.bossName.parentElement.querySelector("span").textContent=t.def.title)}updateEnemyBars(t,e){const n=at("enemy-layer"),i=new Set,r=new T;for(const a of t){if(a.char.dead||a.removed)continue;i.add(a.id);let o=this.enemyEls.get(a.id);if(!o){const u=document.createElement("div");u.className=`enemy-bar ${a.def.boss?"boss":""}`,u.innerHTML=`<div class="name"><span>${a.def.name}</span><b>${a.char.health>0?Math.ceil(a.char.health):""}</b></div><div class="track"><i></i></div>`,n.appendChild(u),o={el:u,fill:u.querySelector(".track i"),name:u.querySelector(".name b")},this.enemyEls.set(a.id,o)}a.char.getHeadPosition(r),r.y+=.42;const l=r.clone().project(e),c=e.position.distanceTo(r),h=l.z<1&&c<26&&c>1.4;o.el.classList.toggle("show",h),h&&(o.el.style.left=`${(l.x*.5+.5)*window.innerWidth}px`,o.el.style.top=`${(-l.y*.5+.5)*window.innerHeight}px`,o.fill.style.width=`${Kt(a.char.health/a.char.maxHealth*100,0,100)}%`,o.name.textContent=Math.ceil(a.char.health))}for(const[a,o]of this.enemyEls)i.has(a)||(o.el.remove(),this.enemyEls.delete(a));if(this.bossEnemy){const a=this.bossEnemy;a.char.dead||a.removed?this.setBoss(null):this.dom.bossFill.style.width=`${Kt(a.char.health/a.char.maxHealth*100,0,100)}%`}}clearEnemyBars(){for(const[,t]of this.enemyEls)t.el.remove();this.enemyEls.clear(),this.setBoss(null)}setReticle(t){this.dom.reticle.classList.toggle("lock",t)}showAnnouncement(t,e,n,i=!1,r=2300){const a=this.dom;a.announceKicker.textContent=t,a.announceTitle.textContent=e,a.announceSub.textContent=n,a.announce.classList.toggle("boss",i),a.announce.classList.add("show"),clearTimeout(this.announceTimer),this.announceTimer=setTimeout(()=>a.announce.classList.remove("show"),r)}toast(t,e=""){const n=document.createElement("div");n.className=`toast ${e}`,n.textContent=t,at("toast-layer").appendChild(n),setTimeout(()=>n.remove(),3300)}flashDamage(){this.dom.damage.classList.add("hit"),setTimeout(()=>this.dom.damage.classList.remove("hit"),100)}flashBlood(){this.dom.blood.classList.add("active"),clearTimeout(this.bloodTimer),this.bloodTimer=setTimeout(()=>this.dom.blood.classList.remove("active"),1200)}flashParry(){this.dom.parry.classList.remove("on"),this.dom.parry.offsetWidth,this.dom.parry.classList.add("on")}hitMarker(t=!1){this.dom.hitmarker.classList.remove("on"),this.dom.hitmarker.offsetWidth,this.dom.hitmarker.style.borderColor=t?"rgba(255,106,63,.95)":"rgba(255,238,210,.9)",this.dom.hitmarker.classList.add("on")}showSlowmo(t){this.dom.slow.classList.toggle("on",t)}openOverlay(t){const e=this.dom[t==="boons"?"boon":t];e&&(this.currentOverlay=t,e.classList.add("is-active"),(t==="pause"||t==="settings"||t==="armory"||t==="codex")&&(this.dom.hud.style.opacity=t==="pause"?".25":".12"))}closeOverlay(t){const e=this.dom[t==="boons"?"boon":t];e&&(e.classList.remove("is-active"),this.currentOverlay=null,this.dom.hud.style.opacity="")}closeAllOverlays(){for(const t of[this.dom.pause,this.dom.settings,this.dom.armory,this.dom.codex,this.dom.boon,this.dom.death])t.classList.remove("is-active");this.currentOverlay=null,this.dom.hud.style.opacity=""}showPause(t){this.dom.pause.classList.toggle("is-active",t),this.dom.hud.style.opacity=t?".25":""}setPauseStats(t,e,n){at("pause-wave").textContent=ri(t),at("pause-kills").textContent=e,at("pause-score").textContent=un(n)}renderArmory(t=this.armoryMeta,e=this.armoryLoadout){if(!t)return;this.armoryMeta=t,this.armoryLoadout=e;const n=at("armory-grid"),i=this.armoryState.tab;if(at("armory-marks").textContent=un(t.marks),at("armory-progress").textContent=`BEST WAVE — ${ri(t.bestWave||0)}`,document.querySelectorAll(".tab").forEach(h=>h.classList.toggle("active",h.dataset.tab===i)),i==="boons"){n.innerHTML='<div class="gear-card" style="grid-column:1/-1;cursor:default;min-height:120px"><div class="gear-icon">✦</div><strong>BOONS OF THE FALLEN</strong><span>Survive a wave to claim a boon. Boons are lost when you fall.</span><div style="color:#8d7a60;font-size:12px;margin-top:12px;line-height:1.5">Each wave offers three gifts. Choose one: heal, harden your hide, sharpen your steel, or feed on the dying. Bosses grant greater boons.</div></div>',(!this.armoryState.selected||!this.armoryState.selected.startsWith("boon"))&&(this.armoryState.selected="boon-info"),this.renderDetail({id:"boon-info",name:"THE ARENA REMEMBERS",type:"PROGRESSION",icon:"✦",desc:"The crowd rewards endurance. Each wave cleared grants Bloodmarks and a boon. Fall, and the run ends — but your weapons and armor remain.",stats:[["RENOWN",78],["BLOODMARKS",60],["SURVIVAL",42]],owned:!0,equipped:!0,cost:0});return}const r=i==="weapons"?ki:zi,a=i==="weapons"?t.unlockedWeapons:t.unlockedArmor,o=i==="weapons"?e.weapon:e.armor;n.innerHTML="";for(const h of r){const u=a.includes(h.id),d=document.createElement("button"),f=o===h.id;d.className=`gear-card ${u?"":"locked"} ${f?"equipped":""} ${this.armoryState.selected===h.id?"selected":""}`,d.innerHTML=`<div class="gear-icon">${h.icon}</div><strong>${h.name}</strong><span>${h.type}</span><span class="gear-cost ${u?"owned":""}">${f?"EQUIPPED":u?"OWNED":`${un(h.cost)} BLOODMARKS`}</span>`,d.addEventListener("click",()=>{this.audio.ui(),this.armoryState.selected=h.id,this.renderArmory(t,e)}),n.appendChild(d),(!this.armoryState.selected||!r.find(g=>g.id===this.armoryState.selected))&&(this.armoryState.selected=r[0].id)}const l=r.find(h=>h.id===this.armoryState.selected)||r[0];a.includes(l.id);const c=i==="weapons"?[["DAMAGE",l.damage/105*100],["REACH",l.reach/3.5*100],["SPEED",l.speed*100],["STAGGER",l.stagger/2.2*100]]:[["VITALITY",l.health/140*100],["STAMINA",l.stamina/130*100],["DEFENSE",l.defense/.34*100],["MOBILITY",l.speed/1.15*100]];this.renderDetail({...l,owned:a.includes(l.id),equipped:o===l.id,stats:c,canAfford:t.marks>=l.cost})}renderDetail(t){at("detail-type").textContent=t.type,at("detail-name").textContent=t.name,at("detail-desc").textContent=t.desc,at("armory-icon").textContent=t.icon;const e=at("detail-stats");e.innerHTML="";for(const[i,r]of t.stats||[])e.innerHTML+=`<div class="detail-stat"><span>${i}</span><i><b style="width:${Kt(r,3,100)}%"></b></i></div>`;const n=at("armory-action");t.equipped?(n.textContent="EQUIPPED",n.disabled=!0):t.owned?(n.textContent="EQUIP",n.disabled=!1):t.canAfford?(n.textContent=`UNLOCK — ${un(t.cost)}`,n.disabled=!1):(n.textContent=`NEED ${un(t.cost-(this.armoryMeta?.marks||0))} MORE`,n.disabled=!0),n.onclick=()=>{t.id!=="boon-info"&&this.handlers.armoryAction?.(this.armoryState.tab,t.id)}}showArmory(t,e){this.openOverlay("armory"),this.renderArmory(t,e)}showBoons(t,e,n){this.openOverlay("boons"),at("boon-wave").textContent=ri(t),at("boon-reward").textContent=`+${un(n)} BLOODMARKS`;const i=at("boon-grid");i.innerHTML="",this.selectedBoon=null;const r=at("btn-next-wave");r.disabled=!0,r.textContent="CHOOSE A BOON";for(const a of e){const o=document.createElement("button");o.className="boon-card",o.innerHTML=`<div class="boon-sigil">${a.icon}</div><div><h3>${a.name}</h3><p>${a.desc}</p><em>${a.rarity}</em></div>`,o.addEventListener("click",()=>{this.audio.ui(!0),i.querySelectorAll(".boon-card").forEach(l=>l.classList.remove("selected")),o.classList.add("selected"),this.selectedBoon=a,r.disabled=!1,r.textContent="CLAIM & ENTER THE NEXT WAVE"}),i.appendChild(o)}r.onclick=()=>{this.selectedBoon&&(this.handlers.boonChosen?.(this.selectedBoon),this.closeOverlay("boons"),this.handlers.nextWave?.())}}showDeath(t){this.dom.hud.style.opacity=".1",this.dom.death.classList.add("is-active"),at("death-wave").textContent=ri(t.wave),at("death-kills").textContent=t.kills,at("death-score").textContent=un(t.score),at("death-marks").textContent=`+${un(t.marks)}`,at("death-sub").textContent=t.boss?`FELLED BY ${t.boss}`:"YOUR NAME JOINS THE SAND"}hideDeath(){this.dom.death.classList.remove("is-active"),this.dom.hud.style.opacity=""}hideGameUI(){document.body.classList.remove("in-game"),this.dom.hud.style.opacity="",this.dom.hud.setAttribute("aria-hidden","true"),this.clearEnemyBars(),this.showSlowmo(!1),this.setBoss(null)}showError(t){const e=at("boot-error");e.hidden=!1,e.textContent=t}}const uc="iron-requiem-save-v1",dc="iron-requiem-settings-v1",R0=[{id:"iron-skin",name:"IRON SKIN",icon:"⬢",desc:"Gain 20 maximum Vitality and heal 20. The plate grows around your bones.",rarity:"FORTITUDE",apply:s=>{s.maxHealth+=20,s.player.char.maxHealth+=20,s.heal(20)}},{id:"second-wind",name:"SECOND WIND",icon:"≋",desc:"Gain 24 maximum Stamina and regenerate it 20% faster.",rarity:"ENDURANCE",apply:s=>{s.maxStamina+=24,s.staminaRegen*=1.2}},{id:"keen-edge",name:"KEEN EDGE",icon:"⟡",desc:"All weapon damage increased by 14%.",rarity:"STEEL",apply:s=>{s.damageMul*=1.14}},{id:"bloodthirst",name:"BLOODTHIRST",icon:"♨",desc:"Heal for 9% of all damage dealt. The fallen feed you.",rarity:"HUNGER",apply:s=>{s.lifesteal+=.09}},{id:"butchers-rhythm",name:"BUTCHER'S RHYTHM",icon:"⌁",desc:"Attacks and dodges cost 22% less Stamina.",rarity:"TEMPO",apply:s=>{s.staminaCostMul*=.78}},{id:"thick-blood",name:"THICK BLOOD",icon:"◉",desc:"Take 14% less damage from all sources.",rarity:"SURVIVAL",apply:s=>{s.damageTakenMul*=.86}},{id:"executioner",name:"EXECUTIONER'S DUE",icon:"☠",desc:"Executions cost 10 less Bloodlust and restore 30 Vitality.",rarity:"CRUELTY",apply:s=>{s.executeCost=Math.max(20,s.executeCost-10),s.executeHeal+=18}},{id:"ruin",name:"RUIN",icon:"✦",desc:"Armor breaks 55% faster under your blows.",rarity:"RUIN",apply:s=>{s.breakMul*=1.55}},{id:"warlords-stride",name:"WARLORD'S STRIDE",icon:"➤",desc:"Move 10% faster and dodge 15% farther.",rarity:"MOTION",apply:s=>{s.moveSpeedMul*=1.1,s.dodgeMul*=1.15}},{id:"blood-price",name:"BLOOD PRICE",icon:"♦",desc:"Gain 40 Bloodlust now and 20 at the start of every wave.",rarity:"RAGE",apply:s=>{s.waveRage+=20,s.rage=Math.min(100,s.rage+40)}}];function fc(s,t){try{const e=JSON.parse(localStorage.getItem(s));return e&&typeof e=="object"?{...t,...e}:t}catch{return t}}class P0{constructor(){this.canvas=document.getElementById("stage"),this.scene=new Gc,this.camera=new We(55,innerWidth/innerHeight,.07,260),this.renderer=new Jg({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=Re,this.renderer.toneMapping=So,this.renderer.toneMappingExposure=1.3,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=mc,this.renderer.setClearColor(525829,1),this.applyPixelRatio(),this.composer=new i0(this.renderer),this.renderPass=new s0(this.scene,this.camera),this.composer.addPass(this.renderPass),this.bloom=new Yi(new st(innerWidth*.55,innerHeight*.55),.36,.66,.9),this.composer.addPass(this.bloom),this.composer.addPass(new a0),this.clock=new eh,this.time=0,this.realTime=0,this.state="title",this.arena=new w0(this.scene,this.renderer),this.effects=new T0(this.scene,this.camera),this.audio=new A0,this.ui=new C0(this.audio),this.meta=fc(uc,{marks:0,unlockedWeapons:["ashen-longsword"],unlockedArmor:["vigil-plate"],weapon:"ashen-longsword",armor:"vigil-plate",bestWave:0,renown:0,kills:0,runs:0}),this.settings=fc(dc,{volume:.75,sensitivity:100,gore:2,scale:0,shake:!0,motion:!1}),this.weapon=wa(this.meta.weapon),this.armor=ba(this.meta.armor),this.enemies=[],this.enemyId=1,this.spawnQueue=[],this.spawnTimer=0,this.activeLimit=2,this.yaw=0,this.pitch=.17,this.cameraDist=5.9,this.cameraShoulder=-1.12,this.intro=1,this.timeScale=1,this.slowmoTimer=0,this.freezeTimer=0,this.hitstop=0,this.execution=null,this.deathTimer=0,this.deathShown=!1,this.waveClearTimer=-1,this.wave=1,this.themeIndex=0,this.waveActive=!1,this.keys={},this.touch={active:!1,moveX:0,moveY:0,lookId:null,lastX:0,lastY:0},this.attackBuffer=null,this.uiTimer=0,this.lastStep=0,this.pointerLocked=!1,this.shakeEnabled=this.settings.shake&&!this.settings.motion,this.scene.environment=M0(this.renderer),this.scene.environmentIntensity=.95,this.setupWorld(),this.ui.setSettings(this.settings),this.ui.updateTitleLoadout(this.meta),this.audio.setVolume(this.settings.volume),this.bindUI(),this.bindInput(),this.resetRunData(),this.spawnPlayer(),this.arena.build(0),this.player.root.position.set(0,0,3.1),this.player.root.rotation.y=.16,this.player.state="idle",this.player.speedActual=0,this.ui.showTitle(),this.ui.setTouch(this.isTouchDevice()),this.resize(),addEventListener("resize",()=>this.resize()),this.animate=this.animate.bind(this),this.animate(),setTimeout(()=>this.ui.hideLoading(),260)}applyPixelRatio(){const t=this.settings?.scale===2?1:this.settings?.scale===1?2:1.5;this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t))}resize(){const t=innerWidth,e=innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e,!1),this.composer.setSize(t,e),this.bloom.setSize(t*.55,e*.55),this.applyPixelRatio()}isTouchDevice(){return matchMedia("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0}setupWorld(){this.rimLight=new Bi(16762250,8.5,11,2),this.scene.add(this.rimLight),this.playerLight=new Bi(11193343,2.4,10,2),this.scene.add(this.playerLight),this.heroLight=new hd(16769200,14,24,.44,.75,1.6),this.heroLight.position.set(0,14,6),this.heroLight.target.position.set(0,0,4),this.scene.add(this.heroLight,this.heroLight.target)}spawnPlayer(){this.player&&(this.player.dispose(),this.scene.remove(this.player.root));const t=ba(this.meta.armor),e=wa(this.meta.weapon);this.weapon=e,this.armor=t,this.baseMaxHealth=t.health,this.baseMaxStamina=t.stamina,this.maxHealth=this.baseMaxHealth,this.maxStamina=this.baseMaxStamina,this.damageMul=1,this.staminaRegen=21,this.staminaCostMul=1,this.damageTakenMul=1,this.lifesteal=0,this.breakMul=1,this.moveSpeedMul=1,this.dodgeMul=1,this.executeCost=40,this.executeHeal=12,this.waveRage=0,this.player=new cc(this.scene,{player:!0,health:this.maxHealth,armor:100,weaponData:e,healthScale:1}),this.player.maxHealth=this.maxHealth,this.player.health=this.maxHealth,this.player.speed=4*t.speed,this.player.root.position.set(0,0,8),this.player.root.rotation.y=Math.PI,this.player.onArmorBreak=n=>this.onPlayerArmorBreak(n),this.player.getWeaponTip()}resetRunData(){this.wave=1,this.kills=0,this.score=0,this.runMarks=0,this.chain=1,this.chainTimer=0,this.rage=0,this.combo=0,this.comboWindow=0,this.stamina=this.maxStamina||100,this.staminaDelay=0,this.blockStart=-10,this.blocking=!1,this.blockBroken=!1,this.lastDamageTime=-10,this.attackCooldown=0,this.attackStep=0,this.playerInvuln=0,this.hazardCooldown=0,this.waveActive=!1,this.spawnQueue=[],this.spawnTimer=0,this.waveClearTimer=-1,this.deathTimer=0,this.deathShown=!1,this.boons=[],this.boonChoices=[],this.enemyAttacks=0,this.runStart=this.realTime,this.themeIndex=0,this.playerKnockback=new T}bindUI(){this.ui.bind({start:()=>this.startRun(),armory:()=>this.openArmory("title"),settings:()=>this.openSettings(),codex:()=>this.ui.openOverlay("codex"),resume:()=>this.resume(),abandon:()=>this.abandonRun(),retry:()=>{this.ui.closeAllOverlays(),this.startRun()},menu:()=>{this.ui.closeAllOverlays(),this.toTitle()},nextWave:()=>this.nextWave(),boonChosen:t=>this.chooseBoon(t),setting:(t,e)=>this.changeSetting(t,e),closeSettings:()=>this.closeSettings(),armoryAction:(t,e)=>this.armoryAction(t,e)})}bindInput(){const t={KeyW:"forward",KeyS:"back",KeyA:"left",KeyD:"right",ShiftLeft:"sprint",ShiftRight:"sprint",Space:"dodge",KeyQ:"heavy",KeyE:"execute"};addEventListener("keydown",e=>{if(e.code==="Escape"){e.preventDefault(),this.togglePause();return}e.code==="Tab"&&e.preventDefault();const n=t[e.code];n&&(this.keys[n]=!0),!(this.state!=="playing"||this.ui.currentOverlay)&&(e.code==="Space"&&(e.preventDefault(),this.tryDodge()),e.code==="KeyQ"&&(e.preventDefault(),this.tryAttack("heavy")),e.code==="KeyE"&&(e.preventDefault(),this.tryExecute()))}),addEventListener("keyup",e=>{const n=t[e.code];n&&(this.keys[n]=!1)}),this.canvas.addEventListener("mousedown",e=>{this.state!=="playing"||this.ui.currentOverlay||(e.button===0?(!this.pointerLocked&&!this.isTouchDevice()&&this.requestLock(),this.tryAttack("light")):e.button===2&&this.startBlock())}),addEventListener("mouseup",e=>{e.button===2&&this.endBlock()}),this.canvas.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("mousemove",e=>{this.state!=="playing"||this.ui.currentOverlay||!this.pointerLocked&&!this.touch.dragging||this.touch.dragging||(this.yaw-=e.movementX*(this.settings.sensitivity/100)*.0022,this.pitch=Kt(this.pitch+e.movementY*(this.settings.sensitivity/100)*.0017,-.18,.82))}),document.addEventListener("pointerlockchange",()=>{this.pointerLocked=document.pointerLockElement===this.canvas,this.pointerLocked||this.endBlock()}),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&this.pause()}),this.bindTouch()}requestLock(){if(!this.isTouchDevice())try{this.canvas.requestPointerLock()}catch{}}bindTouch(){const t=document.getElementById("joystick"),e=t.querySelector("b");let n=null;const i=l=>{const c=t.getBoundingClientRect(),h=(l.clientX-c.left-c.width/2)/(c.width/2),u=(l.clientY-c.top-c.height/2)/(c.height/2),d=Math.hypot(h,u),f=d>1?h/d:h,g=d>1?u/d:u;this.touch.moveX=f,this.touch.moveY=g,e.style.transform=`translate(${f*27}px, ${g*27}px)`};t.addEventListener("pointerdown",l=>{n=l.pointerId,t.setPointerCapture(l.pointerId),i(l),l.preventDefault()}),t.addEventListener("pointermove",l=>{l.pointerId===n&&i(l)});const r=l=>{l.pointerId===n&&(n=null,this.touch.moveX=0,this.touch.moveY=0,e.style.transform="")};t.addEventListener("pointerup",r),t.addEventListener("pointercancel",r);const a=this.canvas;a.addEventListener("pointerdown",l=>{!this.isTouchDevice()||this.state!=="playing"||l.clientX<innerWidth*.42||(this.touch.lookId=l.pointerId,this.touch.lastX=l.clientX,this.touch.lastY=l.clientY,this.touch.dragging=!0,a.setPointerCapture?.(l.pointerId))}),a.addEventListener("pointermove",l=>{if(!this.touch.dragging||l.pointerId!==this.touch.lookId)return;const c=l.clientX-this.touch.lastX,h=l.clientY-this.touch.lastY;this.yaw-=c*.006*(this.settings.sensitivity/100),this.pitch=Kt(this.pitch+h*.0045,-.18,.82),this.touch.lastX=l.clientX,this.touch.lastY=l.clientY});const o=l=>{l.pointerId===this.touch.lookId&&(this.touch.dragging=!1,this.touch.lookId=null)};a.addEventListener("pointerup",o),a.addEventListener("pointercancel",o),document.querySelectorAll("[data-touch]").forEach(l=>{if(l.addEventListener("pointerdown",c=>{if(c.preventDefault(),this.state!=="playing")return;const h=l.dataset.touch;h==="attack"&&this.tryAttack("light"),h==="heavy"&&this.tryAttack("heavy"),h==="dodge"&&this.tryDodge(),h==="execute"&&this.tryExecute(),h==="block"&&this.startBlock()}),l.dataset.touch==="block"){const c=()=>this.endBlock();l.addEventListener("pointerup",c),l.addEventListener("pointercancel",c)}})}togglePause(){this.state==="playing"?this.pause():this.state==="paused"?this.resume():this.ui.currentOverlay&&this.ui.currentOverlay!=="boons"&&(this.state==="title"?this.ui.closeAllOverlays():this.ui.currentOverlay==="settings"&&this.closeSettings())}pause(){this.state==="playing"&&(this.state="paused",this.ui.setPauseStats(this.wave,this.kills,this.score),this.ui.showPause(!0),this.endBlock(),document.pointerLockElement&&document.exitPointerLock())}resume(){this.state==="paused"&&(this.state="playing",this.ui.showPause(!1),this.requestLock())}openSettings(){this.state==="playing"&&this.pause(),this.settingsReturn=this.ui.currentOverlay,this.ui.closeOverlay("pause"),this.ui.openOverlay("settings")}closeSettings(){this.ui.closeOverlay("settings"),this.state==="paused"&&this.ui.openOverlay("pause"),this.state==="title"&&this.ui.showTitle()}openArmory(t="title"){this.state==="playing"&&this.pause(),this.armoryContext=t,this.ui.showArmory(this.meta,{weapon:this.meta.weapon,armor:this.meta.armor})}armoryAction(t,e){const i=(t==="weapons"?ki:zi).find(l=>l.id===e);if(!i)return;const r=t==="weapons"?"unlockedWeapons":"unlockedArmor",a=t==="weapons"?"weapon":"armor";let o=this.meta[r];if(!o.includes(e)){if(this.meta.marks<i.cost)return;this.meta.marks-=i.cost,this.meta[r]=[...o,e],this.audio.unlock(),this.ui.toast(`${i.name} UNLOCKED`,"gold")}this.meta[a]=e,this.saveMeta(),this.ui.updateTitleLoadout(this.meta),t==="weapons"?(this.weapon=wa(e),this.meta.weapon=e):(this.armor=ba(e),this.meta.armor=e),this.ui.renderArmory(this.meta,{weapon:this.meta.weapon,armor:this.meta.armor}),this.ui.toast(`${i.name} EQUIPPED`,"gold"),this.state==="title"&&this.refreshTitlePlayer()}refreshTitlePlayer(){this.spawnPlayer(),this.player.root.position.set(0,0,3.1),this.player.root.rotation.y=.16,this.ui.updateTitleLoadout(this.meta)}saveMeta(){try{localStorage.setItem(uc,JSON.stringify(this.meta))}catch{}}saveSettings(){try{localStorage.setItem(dc,JSON.stringify(this.settings))}catch{}}changeSetting(t,e){this.settings[t]=e,t==="volume"&&this.audio.setVolume(e/100),t==="scale"&&(this.applyPixelRatio(),this.resize()),(t==="shake"||t==="motion")&&(this.shakeEnabled=this.settings.shake&&!this.settings.motion),this.saveSettings()}startRun(){this.audio.start(),this.ui.closeAllOverlays(),this.ui.hideTitle(),this.ui.enterGame(),this.state="playing",this.endBlock(),this.clearEnemies(),this.resetRunData(),this.spawnPlayer(),this.player.root.position.set(0,0,8),this.player.root.rotation.y=Math.PI,this.meta.runs=(this.meta.runs||0)+1,this.themeIndex=0,this.arena.build(0),this.yaw=0,this.pitch=.17,this.cameraDist=5.9,this.intro=1,this.startWave(1),this.requestLock(),this.ui.toast("THE CROWD REMEMBERS YOU","blood"),setTimeout(()=>this.ui.showAnnouncement("THE GATE OPENS","WAVE I","SURVIVE THE CROWD’S HUNGER",!1,2600),650)}clearEnemies(){for(const t of this.enemies)t.char.onArmorBreak=null,t.char.onDecapitate=null,t.char.dispose();this.enemies=[],this.ui.clearEnemyBars()}startWave(t){this.wave=t,this.waveActive=!0,this.waveClearTimer=-1,this.spawnTimer=0,this.attackStep=0,this.chain=1,this.chainTimer=0,this.combo=0,this.rage=Math.min(100,this.rage+this.waveRage);const e=Math.floor((t-1)/4)%3;e!==this.themeIndex&&(this.themeIndex=e,this.arena.build(e),this.ui.showAnnouncement("THE GROUND SHIFTS",vs[e].name,"A NEW TRIAL BEGINS",!1,3e3));const n=t%5===0;n||this.ui.setBoss(null),this.activeLimit=n?2:Math.min(4,1+Math.ceil(t/2.2)),this.spawnQueue=this.composeWave(t,n),this.ui.setWave(t,vs[this.themeIndex].name,n?"BREAK THE CHAMPION":vs[this.themeIndex].sub,n),this.audio.waveHorn(n),this.arena.excite(.35),n?this.ui.showAnnouncement("CHAMPION OF THE PIT",yo.champion.name,"NO MERCY IS GIVEN",!0,3400):this.ui.showAnnouncement("THE CROWD RISES",`WAVE ${ri(t)}`,"SURVIVE",!1,2200)}composeWave(t,e){const n=[];if(e)return n.push("champion"),t>=10&&n.push("knight"),t>=15&&n.push("berserker"),t>=20&&n.push("knight"),n;const i=Math.min(9,2+Math.floor((t-1)*.58));for(let r=0;r<i;r++){let a="gladiator";const o=Math.random();t>=9?a=o<.35?"gladiator":o<.68?"knight":"berserker":t>=6?a=o<.45?"gladiator":o<.72?"knight":"berserker":t>=3?a=o<.66?"gladiator":"berserker":t>=2&&(a=o<.85?"gladiator":"berserker"),n.push(a)}return n}updateSpawns(t){if(!this.waveActive||this.spawnQueue.length===0||this.enemies.filter(i=>!i.char.dead).length>=this.activeLimit||(this.spawnTimer-=t,this.spawnTimer>0))return;const n=this.spawnQueue.shift();this.spawnEnemy(n),this.spawnTimer=this.spawnQueue.length?Y(.6,1.1):0}spawnEnemy(t){const e=yo[t],n=t==="champion",i=1+(this.wave-1)*.055,r=Math.round(e.health*(n?1+Math.floor(this.wave/5)*.1:i)),a=new cc(this.scene,{type:t,health:r,armor:e.armor,weaponData:{kind:e.weapon}});a.def=e,a.maxHealth=r,a.health=r,a.speed=e.speed*(1+Math.min(.2,(this.wave-1)*.008));const o=new T(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),l=new T(-Math.cos(this.yaw),0,Math.sin(this.yaw)),c=n?16:Y(11.5,15.5);let h=this.player.root.position.clone().addScaledVector(o,c).addScaledVector(l,n?0:Y(-6,6));h.y=0,this.arena.clampToArena(h,1.2),a.root.position.copy(h),a.root.rotation.y=Math.atan2(this.player.root.position.x-h.x,this.player.root.position.z-h.z);const u={id:this.enemyId++,type:t,def:e,char:a,boss:n,state:"approach",cooldown:Y(.9,1.8),blockCd:Y(.8,2),blockTimer:0,guard:n?5:e.shield?2:0,strafe:Rn(.5)?1:-1,decision:0,removeTimer:0,hitFlash:0,knock:new T,staggerResist:n?1:0,dyingAwarded:!1};return a.onArmorBreak=d=>this.onEnemyArmorBreak(u,d),a.onDecapitate=()=>{const d=new T;a.getHeadPosition(d),d.y-=.3,this.effects.spawnHead(d,9265741,e.boss?3355444:6050128)},this.enemies.push(u),n?(this.ui.setBoss(u),this.arena.excite(.7),this.audio.roar(!0),this.effects.dust(a.root.position,18,9335644,1.6)):this.effects.dust(a.root.position,9,9073240,1),u}updatePlayer(t){const e=this.player;if(this.state==="dead"){e.update(t);return}if(this.execution){e.update(t);return}this.attackCooldown>0&&(this.attackCooldown-=t),this.playerInvuln>0&&(this.playerInvuln-=t),this.hazardCooldown>0&&(this.hazardCooldown-=t),this.chainTimer>0&&(this.chainTimer-=t,this.chainTimer<=0&&(this.chain=1,this.combo=0)),this.comboWindow>0&&(this.comboWindow-=t,this.comboWindow<=0&&(this.attackStep=0));const n=e.state!=="attack"&&e.state!=="hit"&&e.state!=="dead"&&!this.blocking;let i=new T;if(n){const o=new T(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),l=new T(-Math.cos(this.yaw),0,Math.sin(this.yaw));this.keys.forward&&i.add(o),this.keys.back&&i.sub(o),this.keys.right&&i.add(l),this.keys.left&&i.sub(l),(this.touch.moveX||this.touch.moveY)&&(i.addScaledVector(l,this.touch.moveX),i.addScaledVector(o,-this.touch.moveY)),i.lengthSq()>1&&i.normalize()}const r=this.keys.sprint&&i.lengthSq()>.01&&this.stamina>1;let a=this.player.speed*this.moveSpeedMul*(r?1.32:1);if(this.blocking&&(a*=.3),e.state==="dodge"&&(a=this.player.speed*2.35*this.dodgeMul),e.state==="hit"&&(a=0),r&&(this.stamina=Math.max(0,this.stamina-12*t),this.staminaDelay=.6),this.blocking&&(this.stamina=Math.max(0,this.stamina-5*t),this.staminaDelay=.4,this.stamina<=0&&this.breakGuard()),i.lengthSq()>.01&&(e.root.position.addScaledVector(i,a*t),n||e.state==="dodge")){const o=Math.atan2(i.x,i.z);e.root.rotation.y=ur(e.root.rotation.y,o,e.state==="dodge"?20:12,t)}if(e.root.position.addScaledVector(this.playerKnockback,t),this.playerKnockback.multiplyScalar(Math.max(0,1-t*12)),this.arena.clampToArena(e.root.position,.55),e.speedActual=i.lengthSq()>.01?a:0,e.state==="dodge"&&e.stateTime>.39&&(e.state="idle",e.stateTime=0),e.state==="dodge"&&(this.playerInvuln=Math.max(this.playerInvuln,.03)),this.staminaDelay=Math.max(0,this.staminaDelay-t),this.staminaDelay<=0&&!r&&!this.blocking&&(this.stamina=Math.min(this.maxStamina,this.stamina+this.staminaRegen*t)),e.state==="attack"){const o=new T(Math.sin(e.root.rotation.y),0,Math.cos(e.root.rotation.y));e.root.position.addScaledVector(o,t*(this.player.attackType==="heavy"?.8:1.2)),this.arena.clampToArena(e.root.position,.55)}if(e.update(t),e.events.swing){e.events.swing=!1,this.audio.swing(e.attackType==="heavy"?1.25:.9);const o=e.root.position.clone();this.effects.slash(o,e.root.rotation.y,e.attackType==="heavy")}if(e.events.hit&&(e.events.hit=!1,this.resolvePlayerAttack()),this.attackBuffer&&this.attackBuffer.time>0)if(this.attackBuffer.time-=t,e.state==="idle"&&this.attackCooldown<=0){const o=this.attackBuffer.type;this.attackBuffer=null,this.tryAttack(o)}else this.attackBuffer.time<=0&&(this.attackBuffer=null);e.state==="idle"&&(this.playerInvuln=Math.max(0,this.playerInvuln-t*10)),this.stamina<=.5&&(this.blockBroken=!0),e.speedActual>.3&&e.state==="idle"&&(this.stepTimer=(this.stepTimer||0)+t*e.speedActual,this.stepTimer>2.1&&(this.stepTimer=0,this.audio.footstep(this.themeIndex===0?0:1)))}tryAttack(t){if(this.state!=="playing"||this.execution||this.player.dead)return;const e=this.player;if(e.state==="hit"||e.state==="dodge")return;if(e.state==="attack"){this.attackBuffer={type:t,time:.38};return}if(this.attackCooldown>0)return;if(this.stamina<(t==="heavy"?20:9)){this.ui.toast("STAMINA SPENT","blood"),this.audio.ui();return}const n=t==="heavy",i=(n?this.weapon.stamina*1.65:this.weapon.stamina)*this.staminaCostMul;if(this.stamina<i){this.ui.toast("STAMINA SPENT","blood");return}this.stamina-=i,this.staminaDelay=.9,this.blocking=!1;const r=(n?.78:.43+this.attackStep%2*.015)/this.weapon.speed;this.player.attackType=n?"heavy":"light",e.startAttack(this.player.attackType,r);const a=this.closestEnemyInFront(4.7,1.25);if(a){const o=a.char.root.position.clone().sub(e.root.position);e.root.rotation.y=Math.atan2(o.x,o.z)}else e.root.rotation.y=Math.atan2(-Math.sin(this.yaw),-Math.cos(this.yaw));n?(this.attackStep=0,this.attackCooldown=.25):(this.attackStep++,this.comboWindow=1.05,this.attackCooldown=.08)}closestEnemyInFront(t=4.5,e=1.2){const n=this.player;let i=null,r=1/0;for(const a of this.enemies){if(a.char.dead||a.removed)continue;const o=a.char.root.position.clone().sub(n.root.position),l=o.length();if(l>t)continue;const c=Math.abs(dr(n.root.rotation.y,Math.atan2(o.x,o.z)));if(c>e)continue;const h=l+c*1.6;h<r&&(r=h,i=a)}return i}resolvePlayerAttack(){const t=this.player,e=t.attackType==="heavy",n=this.weapon.reach+(e?.35:.2),i=t.root.rotation.y,r=[];for(const o of this.enemies){if(o.char.dead||o.removed)continue;const l=o.char.root.position.clone().sub(t.root.position),c=Math.hypot(l.x,l.z);if(c>n+.35)continue;const h=Math.abs(dr(i,Math.atan2(l.x,l.z)));h>(e?.82:1.08)||r.push({e:o,dist:c,ang:h})}if(!r.length){this.audio.swing(.7);return}const a=e?this.weapon.heavy:this.weapon.damage;for(const{e:o}of r){const l=o.char.root.position.clone().sub(t.root.position).normalize(),c=Math.abs(dr(o.char.root.rotation.y,Math.atan2(-l.x,-l.z)))<1.25;if((o.char.state==="block"||o.blockTimer>0)&&c){o.guard-=e?2:1,this.effects.sparksBurst(o.char.getChestPosition(),l.clone().negate(),e?26:14,e?1.4:1),this.audio.block(),this.ui.hitMarker(e),this.effects.shake(e?.3:.12),this.hitstop=Math.max(this.hitstop,.035),this.chain=Math.max(1,this.chain*.75),o.guard<=0&&(o.blockTimer=0,o.char.stagger(1.4),o.char.shieldBroken=!0,o.char.shield&&(o.char.shield.visible=!1,this.effects.spawnDebris(o.char.root.position.clone().add(new T(0,1.2,0)),4859932,.2)),this.ui.toast("GUARD BROKEN","gold"),this.audio.parry(),o.guard=2);continue}let h=a*this.damageMul*Y(.93,1.07);o.char.state==="hit"&&(h*=1.12);const u=o.char.takeHit(h,{heavy:e,breakPower:this.weapon.break*this.breakMul,side:Math.sign(l.x)||1,ignoreArmor:!1});if(!u)continue;const d=o.char.getChestPosition(),f=Math.round((e?34:20)*(this.settings.gore/2+.15));this.effects.bloodBurst(d,l,f,e?1.25:.85),this.effects.sparksBurst(d,l.clone().negate(),e?14:6,.7),this.audio.hit(e?1.45:.9,o.char.armor>0),this.audio.flesh(e?1.4:.8),this.ui.hitMarker(e),this.ui.flashBlood(),this.hitstop=Math.max(this.hitstop,e?.085:.045),this.shakeEnabled&&this.effects.shake(e?.48:.2),this.effects.floatText(d,`${Math.round(u.damage)}`,u.broken?"crit":""),u.broken&&this.ui.toast(`${u.broken.label} SHATTERED`,"gold"),u.damage>0&&this.lifesteal>0&&this.heal(u.damage*this.lifesteal,!0),this.rage=Math.min(100,this.rage+(e?13:6.5)),this.chain=Math.min(4,this.chain+(e?.35:.22)),this.chainTimer=1.7,this.combo++,this.score+=Math.round(u.damage*8*this.chain),u.killed?this.onEnemyKilled(o,e):o.char.armor>0&&o.char.addWound()}}onEnemyArmorBreak(t,e){const n=new T;e.mesh.getWorldPosition(n),this.effects.spawnDebris(n,e.mesh.material?.color?.getHex?.()||6052956,.18,null,"metal"),this.settings.gore>0&&this.effects.bloodBurst(n,new T(0,.2,0),Math.round(7*this.settings.gore),.7),this.audio.hit(1.1,!0)}onPlayerArmorBreak(t){const e=new T;t.mesh.getWorldPosition(e),this.effects.spawnDebris(e,4869709,.16,null,"metal"),this.ui.toast(`${t.label} SHATTERED`,"blood")}onEnemyKilled(t,e=!1){if(t.dyingAwarded)return;t.dyingAwarded=!0,this.kills++,this.score+=Math.round(t.def.score*this.chain);const n=Math.round(t.def.marks*(1+this.wave*.035));if(this.runMarks+=n,this.rage=Math.min(100,this.rage+(t.boss?30:9)),this.audio.death(),this.arena.excite(t.boss?1:.28),t.boss&&(this.ui.setBoss(null),this.ui.showAnnouncement("THE CHAMPION FALLS",t.def.name,"THE CROWD HAS A NEW GOD",!0,3400),this.audio.waveHorn(!0),this.effects.sparksBurst(t.char.getChestPosition(),new T(0,1,0),60,1.8)),(e||t.boss)&&this.settings.gore>=1&&Rn(t.boss?.75:.22)&&t.char.decapitate(),this.settings.gore>=1){const i=t.char.getChestPosition();this.effects.bloodBurst(i,new T(Y(-.4,.4),1,Y(-.4,.4)),20,.8)}this.ui.toast(`${t.def.name} BROKEN`,t.boss?"gold":""),this.effects.floatText(t.char.getHeadPosition(),`+${n}`,"heal")}startBlock(){this.state!=="playing"||this.execution||this.player.dead||this.stamina<6||this.player.state==="hit"||this.player.state==="attack"||(this.blocking=!0,this.blockStart=this.realTime,this.player.setState("block",0))}endBlock(){this.blocking=!1,this.player&&this.player.state==="block"&&(this.player.state="idle",this.player.stateTime=0)}breakGuard(){this.blocking&&(this.endBlock(),this.player.setState("hit",0),this.player.stagger(1.1),this.player.staggered=!0,this.audio.hurt(),this.ui.toast("GUARD BROKEN","blood"),this.effects.shake(.35),this.stamina=0)}tryDodge(){if(this.state!=="playing"||this.execution||this.player.dead)return;const t=this.player;if(t.state==="attack"||t.state==="hit"||t.state==="dodge")return;const e=22*this.staminaCostMul;if(this.stamina<e){this.ui.toast("STAMINA SPENT","blood");return}this.stamina-=e,this.staminaDelay=.7,this.endBlock(),t.setState("dodge",0),t.attackType="light",this.playerInvuln=.33;const n=new T(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),i=new T(-Math.cos(this.yaw),0,Math.sin(this.yaw));let r=new T;this.keys.forward&&r.add(n),this.keys.back&&r.sub(n),this.keys.right&&r.add(i),this.keys.left&&r.sub(i),(this.touch.moveX||this.touch.moveY)&&(r.addScaledVector(i,this.touch.moveX),r.addScaledVector(n,-this.touch.moveY)),r.lengthSq()||r.copy(n).negate(),r.normalize();const a=t.root.position.clone().addScaledVector(r,2.7*this.dodgeMul);this.arena.clampToArena(a,.6),t.root.position.copy(a),t.root.rotation.y=Math.atan2(r.x,r.z),this.effects.dust(t.root.position,12,9073240,1.2),this.audio.noiseBurst({duration:.22,gain:.07,freq:900,endFreq:200,q:.6,type:"lowpass"})}tryExecute(){if(this.state!=="playing"||this.execution||this.player.dead)return;if(this.rage<this.executeCost){this.ui.toast("BLOODLUST TOO LOW","blood");return}let t=null,e=3.4;for(const i of this.enemies){if(i.char.dead||i.removed||i.char.health/i.char.maxHealth>(i.boss?.16:.34))continue;const a=i.char.root.position.distanceTo(this.player.root.position);a<e&&(e=a,t=i)}if(!t){this.ui.toast("NO BROKEN FOE","");return}this.rage-=this.executeCost,this.execution={enemy:t,time:0,killed:!1,start:this.player.root.position.clone()},this.state="executing",this.timeScale=.3,this.ui.showSlowmo(!0),this.endBlock(),this.attackBuffer=null,t.char.stagger(3),t.char.health=Math.max(1,t.char.health),this.audio.execute(),this.audio.heartbeat(),this.effects.shake(.2);const n=t.char.root.position.clone().sub(this.player.root.position);this.player.root.rotation.y=Math.atan2(n.x,n.z),this.player.setState("execute",0)}updateExecution(t){const e=this.execution;if(!e)return;e.time+=t;const n=e.enemy;if(e.killed)n.char.update(t*.45),this.player.update(t*.3);else{const i=n.char.root.position.clone().sub(this.player.root.position),r=Math.hypot(i.x,i.z);r>1.6&&(this.player.root.position.addScaledVector(i.normalize(),Math.min(r-1.6,t*4.5)),this.arena.clampToArena(this.player.root.position,.6)),this.player.root.rotation.y=ur(this.player.root.rotation.y,Math.atan2(i.x,i.z),12,t),this.player.update(t*.55),n.char.update(t*.45),e.time>.85&&(e.killed=!0,n.char.health=1,n.char.takeHit(99999,{heavy:!0,ignoreArmor:!0,side:1}),n.char.die({decapitate:!0}),this.onEnemyKilled(n,!0),this.effects.bloodBurst(n.char.getChestPosition(),new T(0,1.2,0),95,1.8),this.effects.sparksBurst(n.char.getChestPosition(),new T(0,1,0),30,1.3),this.effects.shake(.65),this.audio.hit(1.8,!0),this.audio.flesh(1.8),this.heal(this.executeHeal),this.score+=450,this.arena.excite(1),this.ui.hitMarker(!0),this.ui.flashBlood(),this.ui.showAnnouncement("A LIFE GIVEN","REQUIEM","THE SAND DRINKS DEEP",!0,1700))}e.time>1.72&&(this.execution=null,this.state="playing",this.timeScale=1,this.ui.showSlowmo(!1),this.player.state="idle",this.player.stateTime=0,this.attackCooldown=.32)}updateEnemies(t){const e=this.player.root.position;for(let n=this.enemies.length-1;n>=0;n--){const i=this.enemies[n],r=i.char;if(r.dead){r.update(t),i.removeTimer+=t,i.removeTimer>5.2&&(r.dispose(),this.enemies.splice(n,1),i.boss&&this.ui.setBoss(null));continue}const a=e.clone().sub(r.root.position),o=Math.hypot(a.x,a.z);i.cooldown-=t,i.blockCd-=t,i.blockTimer>0&&(i.blockTimer-=t);const l=Math.abs(dr(r.root.rotation.y,Math.atan2(a.x,a.z)))<1.35,c=i.boss,h=i.def,u=h.attackRange*.78;if(!c&&h.shield&&i.blockCd<=0&&i.blockTimer<=0&&r.state==="idle"&&o<4.4&&this.player.state==="attack"&&l&&this.settings.gore>=0&&Rn(t*3.1)&&(r.setState("block",0),i.blockTimer=.58,i.blockCd=Y(1.3,2.5)),i.blockTimer<=0&&r.state==="block"&&(r.state="idle",r.stateTime=0),r.state==="idle"||r.state==="dodge"){let d=new T;!r.blocking&&o>u+.15?(d.copy(a).normalize(),i.strafe&&d.addScaledVector(new T(-a.z,0,a.x).normalize(),.2)):o<u-.55?d.copy(a).normalize().multiplyScalar(-.65):d.set(-a.z,0,a.x).normalize().multiplyScalar(i.strafe*.45);for(const g of this.enemies){if(g===i||g.char.dead)continue;const v=r.root.position.clone().sub(g.char.root.position),m=v.length();m<1.35&&m>.01&&d.addScaledVector(v.normalize(),(1.35-m)*1.5)}d.lengthSq()>1&&d.normalize(),r.speedActual=d.length()*r.speed*(r.state==="dodge"?1.4:1),r.root.position.addScaledVector(d,r.speedActual*t);const f=Math.atan2(a.x,a.z);if(r.root.rotation.y=ur(r.root.rotation.y,f,6+h.aggressive*3,t),o<h.attackRange&&i.cooldown<=0&&l&&!r.blocking){const g=h.aggressive*(c?1.1:1)*(this.wave>8?1.12:1);if(Rn(t*(1.7+g*2.2))){const v=c&&Rn(.28);r.startAttack(v?"heavy":"light",v?1.12:h.windup+.22),i.cooldown=Y(h.windup+h.recover,h.windup+h.recover+1.2)*(c?.72:1),i.attackAngle=Math.atan2(a.x,a.z),r.root.rotation.y=i.attackAngle}}}else r.speedActual=0,r.state!=="attack"&&r.state!=="hit"&&r.state!=="block"&&(r.root.rotation.y=ur(r.root.rotation.y,Math.atan2(a.x,a.z),4,t));if(r.root.position.addScaledVector(i.knock,t),i.knock.multiplyScalar(Math.max(0,1-t*7)),this.arena.clampToArena(r.root.position,.75),r.update(t),r.events.swing&&(r.events.swing=!1,this.audio.swing(.7)),r.events.hit)if(r.events.hit=!1,r.root.position.distanceTo(e)<h.attackRange+.85&&l){const f=r.attackType==="heavy";this.enemyHitPlayer(i,h.damage*(c&&f?1.5:1),f),c&&f&&(this.effects.sparksBurst(e.clone().setY(.2),new T(0,1,0),35,1.5),this.effects.shake(.5),this.playerInvuln<=0&&this.damagePlayer(8,i,!0))}else this.audio.swing(.5);r.state==="attack"&&r.attackProgress<.5&&Math.random()<t*10&&this.effects.embers(r.getWeaponTip(),1,c?16723988:16751451)}}enemyHitPlayer(t,e,n){if(this.state!=="playing"||this.player.dead)return;if(this.playerInvuln>0){Rn(.4)&&this.effects.dust(this.player.root.position,6,9403235,.8);return}const i=t.char.root.position.clone().sub(this.player.root.position).normalize(),a=new T(Math.sin(this.player.root.rotation.y),0,Math.cos(this.player.root.rotation.y)).dot(i)>.12;if(this.blocking&&a){if(this.realTime-this.blockStart<.25){this.parry(t);return}const o=e*1.6;this.stamina=Math.max(0,this.stamina-o),this.staminaDelay=.8;const l=e*.14*this.damageTakenMul;this.damagePlayer(l,t,!0),this.effects.sparksBurst(this.player.root.position.clone().setY(1.25),i.clone().negate(),22,1.2),this.audio.block(),this.ui.hitMarker(!1),this.shakeEnabled&&this.effects.shake(.18),this.stamina<=0&&this.breakGuard();return}this.damagePlayer(e,t,n)}parry(t){this.audio.parry(),this.ui.flashParry(),this.ui.showAnnouncement("PARRY","PERFECT","",!1,900),this.effects.sparksBurst(this.player.root.position.clone().setY(1.3),new T(0,1,0),34,1.6),this.effects.shake(.24),this.effects.floatText(t.char.getChestPosition(),"PARRY","block"),t.char.stagger(1.45),this.rage=Math.min(100,this.rage+16),this.score+=180,this.chain=Math.min(4,this.chain+.4),this.stamina=Math.min(this.maxStamina,this.stamina+12),this.playerInvuln=.35,this.slowmoTimer=.3,this.arena.excite(.45),this.ui.setReticle(!0)}damagePlayer(t,e,n=!1){if(this.player.dead)return;const i=Math.max(1,t*(1-this.armor.defense)*this.damageTakenMul);if(this.player.takeHit(i,{heavy:n,side:Rn(.5)?1:-1,ignoreArmor:!1})){if(this.stamina=Math.max(0,this.stamina-(n?20:11)),this.staminaDelay=1.1,this.lastDamageTime=this.realTime,this.ui.flashDamage(),this.settings.gore>1&&this.ui.flashBlood(),this.shakeEnabled&&this.effects.shake(n?.68:.38),this.hitstop=Math.max(this.hitstop,n?.08:.035),this.audio.hurt(),this.effects.bloodBurst(this.player.root.position.clone().setY(1.25),new T(0,.4,0),10,.6),e){const a=this.player.root.position.clone().sub(e.char.root.position).normalize();this.playerKnockback.addScaledVector(a,n?5:2.4)}this.player.health<=0&&this.playerDied(e)}}heal(t,e=!1){if(!this.player||this.player.dead)return;const n=this.player.health;this.player.health=Math.min(this.maxHealth,this.player.health+t);const i=this.player.health-n;!e&&i>0&&this.effects.floatText(this.player.root.position.clone().setY(2),`+${Math.round(i)}`,"heal")}playerDied(t){this.state!=="dead"&&(this.state="dead",this.player.die({side:Rn(.5)?1:-1}),this.player.health=0,this.deathTimer=0,this.deathShown=!1,this.timeScale=.28,this.endBlock(),this.execution=null,this.audio.death(),this.audio.hurt(),this.ui.flashBlood(),this.ui.showSlowmo(!0),this.effects.shake(.7),this.effects.bloodBurst(this.player.root.position.clone().setY(1.2),new T(0,.5,0),40,1.2),this.arena.excite(.8),this.meta.bestWave=Math.max(this.meta.bestWave||0,this.wave),this.meta.kills=(this.meta.kills||0)+this.kills,this.meta.renown=(this.meta.renown||0)+Math.round(this.score*.07)+this.wave*30,this.meta.marks+=this.runMarks,this.saveMeta())}updateWave(t){if(this.waveClearTimer>0&&(this.waveClearTimer-=t,this.waveClearTimer<=0&&(this.state="boon",this.ui.showBoons(this.wave,this.boonChoices,this.waveReward),this.ui.dom.hud.style.opacity=".1",document.pointerLockElement&&document.exitPointerLock())),!this.waveActive)return;const e=this.enemies.filter(n=>!n.char.dead&&!n.removed).length;if(this.spawnQueue.length===0&&e===0&&this.state==="playing"){this.waveActive=!1,this.waveClearTimer=2.1;const n=Math.round(75+this.wave*28+(this.wave%5===0?220:0));this.runMarks+=n,this.score+=this.wave*120,this.boonChoices=this.rollBoons(),this.ui.showAnnouncement("THE SAND FALLS STILL",`WAVE ${ri(this.wave)} CLEARED`,`+${un(n)} BLOODMARKS`,!1,2600),this.audio.waveHorn(!1),this.arena.excite(1),this.waveReward=n}}rollBoons(){const t=new Set(this.boons.map(i=>i.id)),e=R0.filter(i=>!t.has(i.id)||["iron-skin","keen-edge","bloodthirst"].includes(i.id)),n=[];for(;n.length<3&&e.length;){const i=Math.floor(Math.random()*e.length);n.push(e.splice(i,1)[0])}return n}chooseBoon(t){t&&(this.boons.push(t),t.apply(this),this.audio.unlock(),this.ui.toast(`${t.name} CLAIMED`,"gold"),this.heal(Math.min(14,this.maxHealth-this.player.health),!0))}nextWave(){this.state==="boon"&&(this.ui.closeAllOverlays(),this.ui.dom.hud.style.opacity="",this.state="playing",this.wave++,this.stamina=this.maxStamina,this.rage=Math.min(100,this.rage+14),this.startWave(this.wave),this.requestLock())}abandonRun(){this.ui.closeAllOverlays(),this.toTitle()}toTitle(){this.state="title",this.clearEnemies(),this.ui.hideGameUI(),this.ui.showTitle(),this.ui.dom.hud.style.opacity="",this.ui.updateTitleLoadout(this.meta),this.spawnPlayer(),this.player.root.position.set(0,0,3.1),this.player.root.rotation.y=.16,this.arena.build(0),this.themeIndex=0,this.yaw=.4,this.pitch=.1,this.timeScale=1,this.execution=null,this.deathShown=!1,this.ui.hideDeath(),document.pointerLockElement&&document.exitPointerLock()}updateHazards(t){for(const e of this.arena.hazards){if(!e.active)continue;const n=[];this.player.dead||n.push({obj:this.player.root.position,player:!0});for(const i of this.enemies)i.char.dead||n.push({e:i,obj:i.char.root.position});for(const i of n)if(Math.hypot(i.obj.x-e.position.x,i.obj.z-e.position.z)<1.35){if(i.player)this.hazardCooldown<=0&&this.playerInvuln<=0&&(this.hazardCooldown=.65,this.damagePlayer(21,null,!0),this.ui.toast("IMPALED","blood"),this.effects.bloodBurst(i.obj.clone().setY(.5),new T(0,1,0),24,1));else if(!i.e.hazardCd||i.e.hazardCd<=0){i.e.hazardCd=.7;const a=i.e.char.takeHit(42,{heavy:!0,breakPower:1.5});a&&(this.effects.bloodBurst(i.e.char.getChestPosition(),new T(0,1,0),18,1),this.audio.hit(1.2,!0),a.killed&&this.onEnemyKilled(i.e,!0))}}}for(const e of this.enemies)e.hazardCd>0&&(e.hazardCd-=t)}updateCamera(t){const e=this.camera;let n=new T,i=new T,r=55;if(this.state==="title"){const a=this.realTime,o=.42+Math.sin(a*.055)*.1,l=6.4-Math.sin(a*.12)*.12;n.set(Math.sin(o)*l,2.35+Math.sin(a*.21)*.06,3.1+Math.cos(o)*l),i.set(-.62,1.38,3.1),e.position.lerp(n,1-Math.exp(-4*t)),e.lookAt(i),e.fov=47,e.updateProjectionMatrix(),this.rimLight.position.set(n.x-.6,2.6,n.z+.8),this.rimLight.intensity=15,this.playerLight.intensity=3,this.playerLight.position.set(-n.x*.4,3.3,n.z),this.heroLight.position.set(-2,6,8),this.heroLight.target.position.set(0,1,3)}else if(this.execution){const a=this.execution,o=a.enemy.char.getChestPosition(),l=this.player.root.position.clone().lerp(a.enemy.char.root.position,.5),c=new T(Math.cos(this.player.root.rotation.y),0,-Math.sin(this.player.root.rotation.y)),h=Kt(a.time/.9,0,1);n.copy(l).addScaledVector(c,2.6+h*.2).add(new T(0,1.5+Math.sin(a.time*2)*.03,0)),i.copy(o),e.position.lerp(n,1-Math.exp(-5*t)),e.lookAt(i),e.fov=38+Math.sin(h*Math.PI)*4,e.updateProjectionMatrix()}else if(this.state==="dead"){const a=this.deathTimer,o=this.player.root.position;n.set(o.x+Math.sin(a*.3)*4.3,2.2+Math.min(1.6,a*.35),o.z+Math.cos(a*.3)*4.3),e.position.lerp(n,1-Math.exp(-2*t)),e.lookAt(o.x,.7,o.z),e.fov=48,e.updateProjectionMatrix()}else{const a=this.player.root.position.clone().setY(1.48),o=new T(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),l=new T(-Math.cos(this.yaw),0,Math.sin(this.yaw));let c=this.cameraDist*(1+this.intro*.75);const h=c*Math.cos(this.pitch);n.copy(a).addScaledVector(o,-h).addScaledVector(l,this.cameraShoulder).add(new T(0,c*Math.sin(this.pitch)+.15,0)),i.copy(a).addScaledVector(o,7).add(new T(0,.08,0)),this.intro>0?(this.intro=Math.max(0,this.intro-t*1.5),e.position.lerp(n,1-Math.exp(-3.6*t))):e.position.copy(n),e.lookAt(i),r=55+(this.keys.sprint&&this.player.speedActual>2?3.5:0)+(this.player.state==="attack"?1.2:0),e.fov=ee(e.fov,r,4,t),e.updateProjectionMatrix(),this.rimLight.position.set(this.player.root.position.x-1.6,2.7,this.player.root.position.z+2.2),this.rimLight.intensity=9,this.playerLight.position.set(this.player.root.position.x+2.4,2.6,this.player.root.position.z-1.8),this.playerLight.intensity=2.8,this.heroLight.position.set(this.player.root.position.x,12,this.player.root.position.z+3),this.heroLight.target.position.copy(this.player.root.position)}if(this.shakeEnabled){const a=this.effects.getShake(t);e.position.x+=a.x,e.position.y+=a.y}}updateHUD(t){if(this.uiTimer-=t,this.uiTimer>0)return;this.uiTimer=.075;const e=!!this.execution||this.rage>=this.executeCost&&this.enemies.some(n=>!n.char.dead&&n.char.health/n.char.maxHealth<(n.boss?.16:.34)&&n.char.root.position.distanceTo(this.player.root.position)<3.4);this.execution||this.ui.updateHUD({health:Math.max(0,this.player.health),maxHealth:this.maxHealth,stamina:this.stamina,maxStamina:this.maxStamina,armor:this.player.armor,maxArmor:this.player.maxArmor,combo:this.combo,score:this.score,runMarks:this.runMarks,chain:this.chain,chainTimer:this.chainTimer/1.7,rage:this.rage,weaponName:this.weapon.name,reach:this.weapon.reach,damage:this.weapon.damage,executable:e,slowmo:this.slowmoTimer>0||!!this.execution}),this.ui.setReticle(!!this.closestEnemyInFront(4.4,.55)),this.ui.updateEnemyBars(this.enemies,this.camera)}update(t){this.realTime+=t,this.time+=t;const e=t*this.timeScale;if(this.settings.motion&&(this.bloom.strength=.32),this.state==="title"){this.arena.update(t,.05),this.player.update(t),this.player.speedActual=0,this.effects.update(t,this.camera),this.updateCamera(t),this.audio.update(t,.08,!1);return}if(this.state==="paused"||this.state==="boon"||this.state==="title"){this.arena.update(t*.25,.12),this.effects.update(t*.25,this.camera);return}if(this.state==="executing"){this.updateExecution(t),this.arena.update(e*.5,.6),this.effects.update(e*.5,this.camera),this.updateCamera(t),this.updateHUD(t),this.audio.update(t,.8,!1);return}if(this.state==="dead"){this.deathTimer+=t,this.player.update(e),this.arena.update(e,.1),this.effects.update(e,this.camera),this.updateCamera(t),this.deathTimer>2.4&&!this.deathShown&&(this.deathShown=!0,this.timeScale=1,this.ui.showSlowmo(!1),this.ui.showDeath({wave:this.wave,kills:this.kills,score:this.score,marks:this.runMarks,boss:this.enemies.find(a=>a.boss&&!a.char.dead)?.def.name})),this.audio.update(t,.1,!1);return}this.slowmoTimer>0&&(this.slowmoTimer-=t),this.hitstop>0?(this.hitstop-=t,this.freezeTimer=1):this.freezeTimer=0,this.freezeTimer&&e*.08,this.timeScale=ee(this.timeScale,this.slowmoTimer>0?.35:1,18,t),this.freezeTimer&&(this.timeScale=.08);const n=t*this.timeScale;this.updateSpawns(t),this.updatePlayer(n),this.updateEnemies(n),this.updateHazards(n),this.updateWave(t),this.arena.update(n,Kt(1-this.enemies.filter(a=>!a.char.dead).length/6,.1,1)),this.effects.update(n,this.camera),this.updateCamera(t),this.updateHUD(t);const i=this.enemies.filter(a=>!a.char.dead&&a.char.root.position.distanceTo(this.player.root.position)<9).length,r=Kt(.12+i*.19+this.combo*.03,0,1);this.audio.update(t,r,this.player.speedActual>.5),this.settings.gore>=2&&this.player.health<this.maxHealth*.3?this.ui.dom.blood.classList.add("active"):this.settings.gore||this.ui.dom.blood.classList.remove("active")}render(){this.composer.render()}animate(){requestAnimationFrame(this.animate);const t=Math.min(this.clock.getDelta(),.05);this.update(t),this.render()}}try{window.__ironRequiem=new P0}catch(s){console.error(s);const t=document.getElementById("boot-error");t&&(t.hidden=!1,t.textContent=`The arena failed to open: ${s.message}`)}
