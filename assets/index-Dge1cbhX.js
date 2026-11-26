const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./look-proof-lUaEjru5.js","./three-renderer-BP556_pn.js","./three.core-BYa7ON5M.js","./runtime-Fvu5jN8S.js","./index-CNUyvlgf.js","./index-CgDjMGmM.css","./saves-ClQI9LoD.js","./table-D89Xz1NR.js","./credits-page-dWtXkrRi.js","./music-CxylN_mZ.js","./runtime-BP9lErRN.css","./lights-ZPpXjK36.js","./picture-model-Xtt30OUK.js","./wooden_crate-4ENtV3ZQ.js","./index-0TyJjkCd.js","./photo-DTQBwY-z.css","./storm-cloud-CgEFPEzC.js"])))=>i.map(i=>d[i]);
import{_ as W,q as B}from"./index-CNUyvlgf.js";import"./three-renderer-BP556_pn.js";import{dc as I,cy as S,dk as q,aF as N,a1 as H,L as $,a3 as R,H as y,U as X,b as w,f as j,ak as P,g as E,al as O,cX as V,an as C,N as Y,S as J,bR as K,n as Z,m as ee,d1 as te,dj as re,b_ as se,V as F}from"./three.core-BYa7ON5M.js";import{l as U,a as A,W as ie,s as ae,m as oe}from"./lights-ZPpXjK36.js";import{c as ne}from"./index-0TyJjkCd.js";import{b as le}from"./storm-cloud-CgEFPEzC.js";import{W as he}from"./runtime-Fvu5jN8S.js";const de={plaster:{color:15718836,repeat:.54,texture:.15},roof:{color:13132860,repeat:.55,texture:.48},stone:{color:12099982,repeat:.37,texture:.34},wood:{color:10182720,repeat:.51,texture:.28},foliage:{color:5399363,repeat:.63,texture:.26},glass:{color:4615814,repeat:.7,texture:.1}},ue=`
vec3 getGradientIrradiance(vec3 normal, vec3 direction) {
  float light = dot(normal, direction);
  float shoulder = clamp(fwidth(light), 0.025, 0.12);
  float low = smoothstep(0.015 - shoulder, 0.17 + shoulder, light);
  float high = smoothstep(0.52 - shoulder, 0.78 + shoulder, light);
  return vec3(low * 0.51 + high * 0.49);
}
`,ce=`
  vec4 surfaceWorld = vec4(transformed, 1.0);
  #ifdef USE_BATCHING
    surfaceWorld = batchingMatrix * surfaceWorld;
  #endif
  #ifdef USE_INSTANCING
    surfaceWorld = instanceMatrix * surfaceWorld;
  #endif
  vSurfaceWorld = (modelMatrix * surfaceWorld).xyz;
`,ge=`
  vec3 axis = abs(inverseTransformDirection(normal, viewMatrix));
  axis *= axis;
  axis *= axis;
  axis /= dot(axis, vec3(1.0));
  vec3 p = vSurfaceWorld * surfaceRepeat;
  float brush = dot(axis, vec3(
    texture2D(surfaceTile, p.zy).r, texture2D(surfaceTile, p.xz).r, texture2D(surfaceTile, p.xy).r));
  diffuseColor.rgb *= 1.0 + (brush - 0.65) * surfaceStrength;
`;function L({flatShading:u=!1,textureScale:e=1,...t}={},r){const i=r&&de[r],s=new I({color:i?i.color:16777215,...t});Object.assign(s,{flatShading:u});const a=r&&i?{surfaceTile:{value:me(r)},surfaceRepeat:{value:i.repeat*e},surfaceStrength:{value:i.texture}}:void 0;return s.customProgramCacheKey=()=>a?"gull:toon-surface":"gull:toon",s.onBeforeCompile=o=>{o.fragmentShader=o.fragmentShader.replace("#include <gradientmap_pars_fragment>",ue),a&&(Object.assign(o.uniforms,a),o.vertexShader=`varying vec3 vSurfaceWorld;
${o.vertexShader}`.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
${ce}`),o.fragmentShader=`varying vec3 vSurfaceWorld;
      uniform sampler2D surfaceTile;
      uniform float surfaceRepeat, surfaceStrength;
      ${o.fragmentShader}`.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${ge}`))},s}function Ce(u,e={}){return L({vertexColors:!0,...e},u)}const D=new Map;function me(u){const e=D.get(u);if(e)return e;const t=u==="stone"?128:64,r=new Uint8Array(t*t),i=a=>a-Math.floor(a);for(let a=0;a<t;a++)for(let o=0;o<t;o++){const n=o/t,h=a/t,d=n*Math.PI*2,g=h*Math.PI*2,p=.58+.14*Math.sin(3*d+Math.sin(2*g))+.09*Math.cos(3*g-d),f=.1*i(Math.sin(o*127.1+a*311.7)*43758.5453),m=Math.floor(h*4),x=i(h*4),l=i(n*4+m%2*.5),c=x>.1&&l>.075?.15:-.25,b=x>.068&&l>.059?.18+.06*Math.cos(g+d*4):-.34,T={plaster:p,roof:p+c+.11*Math.sin(l*Math.PI),stone:p+b,wood:p+.17*Math.cos(d*6+Math.sin(g)*.4)-.25*+(i(n*4)<.08),foliage:p+.14*Math.cos(d*6+g*5),glass:.69+.22*Math.cos(d-g)}[u];r[a*t+o]=Math.round(S.clamp(T+f,0,1)*255)}const s=new q(r,t,t,N);return s.wrapS=s.wrapT=H,s.generateMipmaps=!0,s.minFilter=$,s.magFilter=R,s.needsUpdate=!0,D.set(u,s),s}const v=16;function pe(u){const{saturation:e,shadow:t,light:r}=U[u].grade,i=new Uint8Array(v**3*4);let s=0;for(let o=0;o<v;o++)for(let n=0;n<v;n++)for(let h=0;h<v;h++){const d=[h,n,o].map(f=>f/(v-1)),g=d[0]*.2126+d[1]*.7152+d[2]*.0722,p=S.smoothstep(g,.05,.85);for(const[f,m]of d.entries()){const x=S.lerp(g,m,e),l=S.lerp(t[f],r[f],p);i[s++]=Math.round(255*S.clamp(x*l,0,1))}i[s++]=255}const a=new se(i,v,v,v);return a.minFilter=a.magFilter=R,a.needsUpdate=!0,a}const fe=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,ve=`
uniform sampler2D source;
uniform vec2 pixel;
varying vec2 vUv;
vec3 glint(vec2 uv) {
  vec3 c = texture2D(source, uv).rgb;
  float peak = max(max(c.r, c.g), c.b);
  return min(c * smoothstep(1.45, 2.6, peak), vec3(2.0));
}
void main() {
  vec2 d = pixel * 1.5;
  gl_FragColor = vec4((glint(vUv + d) + glint(vUv - d) +
    glint(vUv + vec2(d.x, -d.y)) + glint(vUv + vec2(-d.x, d.y))) * 0.25, 1.0);
}
`,xe=`
uniform sampler2D source;
uniform vec2 pixel;
varying vec2 vUv;
void main() {
  vec2 d = pixel * 0.85;
  vec3 sum = texture2D(source, vUv).rgb * 4.0;
  sum += texture2D(source, vUv + d).rgb + texture2D(source, vUv - d).rgb;
  sum += texture2D(source, vUv + vec2(d.x, -d.y)).rgb;
  sum += texture2D(source, vUv + vec2(-d.x, d.y)).rgb;
  gl_FragColor = vec4(sum * 0.125, 1.0);
}
`,be=`
#include <tonemapping_pars_fragment>
uniform sampler2D source, bright;
uniform highp sampler3D grade, nextGrade;
uniform float bloomAmount, gradeAmount, gradeBlend;
varying vec2 vUv;
void main() {
  vec3 hdr = texture2D(source, vUv).rgb;
  if (bloomAmount > 0.0) {
    hdr += min(texture2D(bright, vUv).rgb * bloomAmount, vec3(0.16));
  }
  vec3 mapped = AgXToneMapping(max(hdr, vec3(0.0)));
  vec3 coords = mapped * ${v-1}.0 / ${v}.0 + 0.5 / ${v}.0;
  vec3 graded = texture(grade, coords).rgb;
  if (gradeBlend > 0.0) graded = mix(graded, texture(nextGrade, coords).rgb, gradeBlend);
  gl_FragColor = vec4(mix(mapped, graded, gradeAmount), 1.0);
  #include <colorspace_fragment>
}
`;class Se{constructor(e,t,r,i=!1){this.renderer=e,this.quality=t,this.gl=e.getContext(),this.timer=i?this.gl.getExtension("EXT_disjoint_timer_query_webgl2"):null;const s=this.gl.getExtension("EXT_color_buffer_float")?y:X;this.hdr=new w(1,1,{type:s,colorSpace:j,depthTexture:this.sceneDepth}),this.bright=new w(1,1,{type:s,depthBuffer:!1}),this.blur=new w(1,1,{type:s,depthBuffer:!1});const a={vertexShader:fe,depthTest:!1,depthWrite:!1,toneMapped:!1};this.brightPass=new P({...a,fragmentShader:ve,uniforms:{source:{value:this.hdr.texture},pixel:{value:new E}}}),this.blurPass=new P({...a,fragmentShader:xe,uniforms:{source:{value:this.bright.texture},pixel:{value:new E}}}),this.finishPass=new P({...a,fragmentShader:be,uniforms:{source:{value:this.hdr.texture},bright:{value:this.blur.texture},toneMappingExposure:{value:1},grade:{value:null},nextGrade:{value:null},gradeAmount:{value:1},gradeBlend:{value:0},bloomAmount:{value:0}}});const o=new O;o.setAttribute("position",new V([-1,-1,0,3,-1,0,-1,3,0],3)),this.triangle=new C(o,this.finishPass),this.triangle.frustumCulled=!1,this.screen.add(this.triangle),e.info.autoReset=!1,e.toneMapping=Y,e.outputColorSpace=J,e.shadowMap.type=K,this.setTime(r),this.setQuality(t)}renderer;hdr;sceneDepth=new Z(1,1,ee);graded=new w(1,1,{depthBuffer:!1});bright;blur;screen=new te;screenCamera=new re;triangle;brightPass;blurPass;finishPass;grades=new Map;gl;timer;queries=[];gpuSamples=[];quality;tier;setTime(e){this.blendTimes(e,e,0),this.resetTiming()}blendTimes(e,t,r,i=1){const s=this.finishPass.uniforms;s.grade.value=this.getGrade(e),s.nextGrade.value=this.getGrade(t),s.gradeBlend.value=r,s.toneMappingExposure.value=S.lerp(U[e].exposure,U[t].exposure,r)*i}getGrade(e){let t=this.grades.get(e);return t||(t=pe(e),this.grades.set(e,t)),t}setGrade(e){this.finishPass.uniforms.gradeAmount.value=Number(e)}renderTargetSize(){return{width:this.hdr.width,height:this.hdr.height}}setQuality(e){this.quality=e,this.tier=void 0;const t=A[e];this.renderer.shadowMap.enabled=t.shadowSize>0,this.finishPass.uniforms.bloomAmount.value=this.hdr.texture.type===y?t.bloom:0,this.resetTiming()}setTier(e){if(this.tier=e,this.renderer.shadowMap.enabled=e.shadowSize>0,this.setGrade(e.grade),this.finishPass.uniforms.bloomAmount.value=this.hdr.texture.type===y?e.bloom:0,!e.grade&&!e.bloom&&!e.lensPasses)for(const t of[this.hdr,this.graded,this.bright,this.blur])t.setSize(1,1);this.resetTiming()}resize(e,t,r){const i=A[this.quality],s=this.tier?r:Math.min(r,i.pixelRatio,Math.sqrt(i.maxPixels/(e*t))),a=Math.max(1,Math.floor(e*s)),o=Math.max(1,Math.floor(t*s)),n=Math.max(1,a>>2),h=Math.max(1,o>>2);this.renderer.setPixelRatio(1),this.renderer.setSize(a,o,!1),!(this.tier&&!this.tier.grade&&!this.tier.bloom&&!this.tier.lensPasses)&&(this.hdr.setSize(a,o),this.bright.setSize(n,h),this.blur.setSize(n,h),this.brightPass.uniforms.pixel.value.set(1/a,1/o),this.blurPass.uniforms.pixel.value.set(1/n,1/h),this.resetTiming())}render(e,t){this.renderSource(()=>this.renderer.render(e,t))}prepareShaders(){if(this.tier&&!this.tier.grade&&!this.tier.bloom&&!this.tier.lensPasses)return;const e=this.renderer.getRenderTarget();try{for(const[t,r]of[[this.brightPass,this.bright],[this.blurPass,this.blur],[this.finishPass,this.graded],[this.finishPass,null]])this.triangle.material=t,this.renderer.setRenderTarget(r),this.renderer.compile(this.screen,this.screenCamera)}finally{this.triangle.material=this.finishPass,this.renderer.setRenderTarget(e)}}renderSource(e,t){if(this.tier&&!this.tier.grade&&!this.tier.bloom&&!t){this.renderer.info.reset(),this.renderer.setRenderTarget(null),e();return}const r=this.gl,i=this.timer;let s=null;if(i){for(r.getParameter(i.GPU_DISJOINT_EXT)&&this.resetTiming();this.queries.length&&r.getQueryParameter(this.queries[0],r.QUERY_RESULT_AVAILABLE);){const a=this.queries.shift();this.gpuSamples.push(r.getQueryParameter(a,r.QUERY_RESULT)/1e6),r.deleteQuery(a),this.gpuSamples.length>7200&&this.gpuSamples.shift()}this.queries.length<8&&!r.getQuery(i.TIME_ELAPSED_EXT,r.CURRENT_QUERY)&&(s=r.createQuery()),s&&r.beginQuery(i.TIME_ELAPSED_EXT,s)}try{this.renderer.info.reset(),this.renderer.setRenderTarget(this.hdr),e(),this.finishPass.uniforms.bloomAmount.value>0&&(this.triangle.material=this.brightPass,this.renderer.setRenderTarget(this.bright),this.renderer.render(this.screen,this.screenCamera),this.triangle.material=this.blurPass,this.renderer.setRenderTarget(this.blur),this.renderer.render(this.screen,this.screenCamera)),this.triangle.material=this.finishPass,t&&this.graded.setSize(this.hdr.width,this.hdr.height),this.renderer.setRenderTarget(t?this.graded:null),this.renderer.render(this.screen,this.screenCamera)}finally{i&&s&&(r.endQuery(i.TIME_ELAPSED_EXT),this.queries.push(s))}t&&(this.renderer.setRenderTarget(null),t({colour:this.graded.texture,depth:this.sceneDepth,width:this.hdr.width,height:this.hdr.height,linear:!0}))}resetTiming(){for(const e of this.queries)this.gl.deleteQuery(e);this.queries.length=this.gpuSamples.length=0}dispose(){this.resetTiming(),this.hdr.dispose(),this.graded.dispose(),this.bright.dispose(),this.blur.dispose(),this.triangle.geometry.dispose(),this.brightPass.dispose(),this.blurPass.dispose(),this.finishPass.dispose();for(const e of this.grades.values())e.dispose();this.grades.clear()}stats(){const e=[...this.gpuSamples].sort((t,r)=>t-r);return{resolution:`${this.hdr.width}x${this.hdr.height}`,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,gpuTimerAvailable:!!this.timer,gpuSamples:e.length,gpuMedianMs:e[Math.ceil(e.length/2)-1]??null,gpuP95Ms:e[Math.ceil(e.length*.95)-1]??null}}}const _=[[0,"night"],[4.75,"night"],[8,"dawn"],[12.5,"noon"],[15.8,"noon"],[18,"golden"],[19.35,"golden"],[20.3,"dusk"],[22,"night"],[24,"night"]];class Te{lighting;post;moon=new F;constructor(e,t,r="medium",i="golden",s=!1){this.lighting=new ie(e,r,i),this.post=new Se(t,r,i,s)}setTime(e){this.lighting.setTime(e),this.post.setTime(e)}setQuality(e){this.lighting.setQuality(e),this.post.setQuality(e)}resize(e,t,r){this.post.resize(e,t,r)}dispose(){this.post.dispose(),this.lighting.sun.shadow.dispose(),this.lighting.sun.removeFromParent(),this.lighting.sun.target.removeFromParent(),this.lighting.fill.removeFromParent()}updateEnvironment(e,t,r,i){const s=_.findIndex(([x])=>x>e);if(s<1)return;const[a,o]=_[s-1],[n,h]=_[s],d=o===h?0:S.smoothstep(e,a,n);this.lighting.blendTimes(o,h,d);const{direction:g}=this.lighting,p=ae(e,g),f=1-S.smoothstep(p,-.13,.04);g.y=Math.max(.025,g.y),f>0&&g.lerp(oe(e,this.moon),f),g.normalize();const m=Math.sqrt(r/Math.max(r,t.fogDensity));this.post.blendTimes(o,h,d,1-(1-m)*.12),this.lighting.setWeather(void 0,m,t.transmission,i)}}const Me={create(u,{scene:e,manifests:t,fallbackLights:r,gull:i,tintHorizon:s,invalidate:a}){const o=e.fog,n=new Te(e,u);let h=B.high;const d=ne(u,()=>a?.(),new URLSearchParams(location.search)),g=t.map(({id:l,origin:c,farProxy:b})=>({id:l,origin:c,radius:b.radius})),p=new F;let f,m;r.visible=!1,i.traverse(l=>{l instanceof C&&(l.castShadow=!0)});const x=(l,c,b)=>{const T=le.get(e);let M=T?.field;M||((!m||f!==c.seed||c.seconds<m.clock.elapsedSeconds)&&(m=new he(c.seed,g),f=c.seed),m.clock.advance(c.seconds-m.clock.elapsedSeconds),Math.abs(m.clock.clockAt().hour-c.hour)>1e-4&&m.clock.setHour(c.hour),M=m);const{x:z,y:k,z:Q}=l.position;n.updateEnvironment(c.hour,M.weatherAt(z,-Q,T?.time??c.seconds),M.clock.tuning.baseFogDensity,k),s(n.lighting.fog.color),p.copy(i.position),p.y=Math.max(0,p.y-15),n.lighting.focus(p),d.render(e,l,{render:(we,ye,G)=>n.post.renderSource(b,G)})};return{controls:d,terrainMaterial:l=>L(l),resize(l,c,b){n.resize(Math.max(1,l),Math.max(1,c),b)},setQuality(l){h=l,n.lighting.setQuality(h),n.post.setTier(h),d.setStyledLenses(h.lensPasses)},prepareShaders:()=>n.post.prepareShaders(),renderTargetSize:()=>n.post.renderTargetSize(),render(l,c,b){x(c,b,()=>u.render(l,c))},renderSource:x,dispose(){d.dispose(),n.dispose(),e.fog=o,r.visible=!0}}},async preview(u,e){const{loadCorner:t,createLookProof:r}=await W(async()=>{const{loadCorner:s,createLookProof:a}=await import("./look-proof-lUaEjru5.js");return{loadCorner:s,createLookProof:a}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]),import.meta.url),i=await t();return{create:(s,a)=>r(s,i,u,e?.id,a.invalidate)}}},Fe=Object.freeze(Object.defineProperty({__proto__:null,lens:Me},Symbol.toStringTag,{value:"Module"}));export{Te as L,Ce as a,L as c,Fe as i};
