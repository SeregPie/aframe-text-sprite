!function(t,e){"use strict";function n(t){var e={exports:{}};return t(e,e.exports),e.exports}var o=n((function(t,n){t.exports=function(t){let e=class extends t.Texture{constructor(){super(document.createElement("canvas"));let e=null,n=()=>e||(e=this.createDrawable()),o=()=>n().width,i=()=>n().height,r=!0,a=1,l=()=>t.MathUtils.ceilPowerOfTwo(o()*a),s=()=>t.MathUtils.ceilPowerOfTwo(i()*a),f=t=>{if(a!==t){let e=l(),n=s();a=t;let o=l(),i=s();o===e&&i===n||(r=!0)}},c=(()=>{let e=new t.Vector3,n=new t.Vector2,r=new t.Vector3,a=new t.Vector3,l=new t.Vector2;return(s,f,c)=>{if(l.set(o(),i()),l.x&&l.y){s.getWorldPosition(r),c.getWorldPosition(e);let o=r.distanceTo(e);if(c.isPerspectiveCamera&&(o*=2*Math.tan(t.MathUtils.degToRad(c.fov)/2)),(c.isPerspectiveCamera||c.isOrthographicCamera)&&(o/=c.zoom),o){var d,h;s.getWorldScale(a);let t=null!==(d=null===(h=f.capabilities)||void 0===h?void 0:h.maxTextureSize)&&void 0!==d?d:1/0;return f.getDrawingBufferSize(n),Math.min(Math.max(a.x/o*(n.x/l.x),a.y/o*(n.y/l.y)),t/l.x,t/l.y)}}return 0}})();Object.defineProperties(this,{width:{get:o},height:{get:i},pixelRatio:{get:()=>a,set:f},needsRedraw:{set(t){t&&(r=!0,e=null)}}}),Object.assign(this,{redraw(){if(r){let t=this.image,e=t.getContext("2d");e.clearRect(0,0,t.width,t.height),t.width=l(),t.height=s(),t.width&&t.height?(e.save(),e.scale(t.width/o(),t.height/i()),((...t)=>{n().draw(...t)})(e),e.restore()):t.width=t.height=1,r=!1,this.needsUpdate=!0}},setOptimalPixelRatio(...t){f(c(...t))}})}};e.prototype.isDynamicTexture=!0;let n=class extends e{constructor({alignment:t="center",backgroundColor:e="rgba(0,0,0,0)",color:n="#fff",fontFamily:o="sans-serif",fontSize:i=16,fontStyle:r="normal",fontVariant:a="normal",fontWeight:l="normal",lineGap:s=1/4,padding:f=.5,strokeColor:c="#fff",strokeWidth:d=0,text:h=""}={}){super(),Object.entries({alignment:t,backgroundColor:e,color:n,fontFamily:o,fontSize:i,fontStyle:r,fontVariant:a,fontWeight:l,lineGap:s,padding:f,strokeColor:c,strokeWidth:d,text:h}).forEach((([t,e])=>{Object.defineProperty(this,t,{get:()=>e,set(t){e!==t&&(e=t,this.needsRedraw=!0)}})}))}get lines(){let{text:t}=this;return t?t.split("\n"):[]}get font(){return function(t,e,n,o,i){let r=document.createElement("span");return r.style.font="1px serif",r.style.fontFamily=t,r.style.fontSize="".concat(e,"px"),r.style.fontStyle=n,r.style.fontVariant=o,r.style.fontWeight=i,r.style.font}(this.fontFamily,this.fontSize,this.fontStyle,this.fontVariant,this.fontWeight)}checkFontFace(){try{let{font:t,lines:e}=this;return e.every((e=>document.fonts.check(t,e)))}catch{}return!0}async loadFontFace(){try{let{font:t,lines:e}=this;await Promise.all(e.map((e=>document.fonts.load(t,e))))}catch{}}createDrawable(){let{alignment:t,backgroundColor:e,color:n,font:o,fontSize:i,lineGap:r,lines:a,padding:l,strokeColor:s,strokeWidth:f}=this;l*=i,r*=i,f*=i;let c=a.length,d=i+r,h=c?(()=>{let t=document.createElement("canvas").getContext("2d");return t.font=o,Math.max(...a.map((e=>t.measureText(e).width)))})():0,p=l+f/2,g=h+2*p;return{width:g,height:(c?i+d*(c-1):0)+2*p,draw(r){let l;r.fillStyle=e,r.fillRect(0,0,r.canvas.width,r.canvas.height);let c=p+i/2;Object.assign(r,{fillStyle:n,font:o,lineWidth:f,miterLimit:1,strokeStyle:s,textAlign:(()=>{switch(t){case"left":return l=p,"left";case"right":return l=g-p,"right"}return l=g/2,"center"})(),textBaseline:"middle"}),a.forEach((t=>{r.fillText(t,l,c),f&&r.strokeText(t,l,c),c+=d}))}}}};return n.prototype.isTextTexture=!0,n}(e)})),i=n((function(t,n){t.exports=function(t,e){function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o=n(e);let i=class extends t.Sprite{constructor({fontSize:e=1,...n}={},i=new t.SpriteMaterial({depthWrite:!1})){super(i);let r=new o.default({fontSize:e,...n});this.material.map=r}onBeforeRender(t,e,n){let{material:o}=this,{map:i}=o;if(i.checkFontFace()){let{scale:e}=this,{height:o,width:r}=i;r&&o?(e.setX(r).setY(o),i.setOptimalPixelRatio(this,t,n),i.redraw()):e.setScalar(1)}else i.loadFontFace()}dispose(){let{material:t}=this,{map:e}=t;e.dispose(),t.dispose()}};return["alignment","backgroundColor","color","fontFamily","fontSize","fontStyle","fontVariant","fontWeight","lineGap","padding","strokeColor","strokeWidth","text"].forEach((t=>{Object.defineProperty(i.prototype,t,{get(){return this.material.map[t]},set(e){this.material.map[t]=e}})})),i.prototype.isTextSprite=!0,i}(e,o)})),r="text-sprite";t.registerComponent(r,{init:function(){let{data:t,el:e}=this,{alignment:n,backgroundColor:o,color:a,fontFamily:l,fontSize:s,fontStyle:f,fontVariant:c,fontWeight:d,lineGap:h,padding:p,strokeColor:g,strokeWidth:u,text:m}=t,y=new i({alignment:n,backgroundColor:o,color:a,fontFamily:l,fontSize:s,fontStyle:f,fontVariant:c,fontWeight:d,lineGap:h,padding:p,strokeColor:g,strokeWidth:u,text:m});e.setObject3D(r,y)},remove:function(){let{el:t}=this,e=t.getObject3D(r);e&&(e.dispose(),t.removeObject3D(r))},schema:{alignment:{type:"string",default:"center"},backgroundColor:{type:"color",default:"rgba(0,0,0,0)"},color:{type:"color",default:"#fff"},fog:{type:"boolean",default:!1},fontFamily:{type:"string",default:"sans-serif"},fontSize:{type:"number",default:1},fontStyle:{type:"string",default:"normal"},fontVariant:{type:"string",default:"normal"},fontWeight:{type:"string",default:"normal"},lineGap:{type:"number",default:.25},opacity:{type:"number",default:1},padding:{type:"number",default:.5},strokeColor:{type:"color",default:"#fff"},strokeWidth:{type:"number",default:0},text:{type:"string",default:""},transparent:{type:"boolean",default:!0}},update:function(t){let{data:e,el:n}=this,{alignment:o,backgroundColor:i,color:a,fog:l,fontFamily:s,fontSize:f,fontStyle:c,fontVariant:d,fontWeight:h,lineGap:p,opacity:g,padding:u,strokeColor:m,strokeWidth:y,text:x,transparent:b}=e,w=n.getObject3D(r);if(w){Object.keys(t).length&&Object.assign(w,{alignment:o,backgroundColor:i,color:a,fontFamily:s,fontSize:f,fontStyle:c,fontVariant:d,fontWeight:h,lineGap:p,padding:u,strokeColor:m,strokeWidth:y,text:x});let{material:e}=w;Object.assign(e,{fog:l,opacity:g,transparent:b})}}})}(AFRAME,THREE);
