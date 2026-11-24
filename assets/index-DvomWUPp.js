const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./look-proof-0GUFuPuN.js","./index-yC7XslmD.js","./index-Cp0mtLuL.css","./lights-DHlWvTet.js","./picture-model-CmUHmaoX.js","./wooden_crate-4ENtV3ZQ.js","./index-C4wECZFs.js","./photo-DTQBwY-z.css","./storm-cloud-CgEFPEzC.js"])))=>i.map(i=>d[i]);
import{a9 as G,n as S,K as W,R as I,cP as q,cQ as H,L as A,H as y,U as N,c as w,cR as $,p as P,h as E,B as X,F as O,M as C,cS as V,r as j,cT as Y,d as K,e as J,S as Z,f as ee,D as te,V as F,aM as se,cU as re,W as ie}from"./index-yC7XslmD.js";import{l as U,a as D,W as ae,s as oe,m as ne}from"./lights-DHlWvTet.js";import{c as le}from"./index-C4wECZFs.js";import{b as he}from"./storm-cloud-CgEFPEzC.js";const de={plaster:{color:15718836,repeat:.54,texture:.15},roof:{color:13132860,repeat:.55,texture:.48},stone:{color:12099982,repeat:.37,texture:.34},wood:{color:10182720,repeat:.51,texture:.28},foliage:{color:5399363,repeat:.63,texture:.26},glass:{color:4615814,repeat:.7,texture:.1}},ue=`
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
`;function L({flatShading:u=!1,textureScale:e=1,...t}={},s){const i=s&&de[s],r=new G({color:i?i.color:16777215,...t});Object.assign(r,{flatShading:u});const a=s&&i?{surfaceTile:{value:me(s)},surfaceRepeat:{value:i.repeat*e},surfaceStrength:{value:i.texture}}:void 0;return r.customProgramCacheKey=()=>a?"gull:toon-surface":"gull:toon",r.onBeforeCompile=o=>{o.fragmentShader=o.fragmentShader.replace("#include <gradientmap_pars_fragment>",ue),a&&(Object.assign(o.uniforms,a),o.vertexShader=`varying vec3 vSurfaceWorld;
${o.vertexShader}`.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
${ce}`),o.fragmentShader=`varying vec3 vSurfaceWorld;
      uniform sampler2D surfaceTile;
      uniform float surfaceRepeat, surfaceStrength;
      ${o.fragmentShader}`.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${ge}`))},r}function De(u,e={}){return L({vertexColors:!0,...e},u)}const R=new Map;function me(u){const e=R.get(u);if(e)return e;const t=u==="stone"?128:64,s=new Uint8Array(t*t),i=a=>a-Math.floor(a);for(let a=0;a<t;a++)for(let o=0;o<t;o++){const n=o/t,h=a/t,d=n*Math.PI*2,g=h*Math.PI*2,p=.58+.14*Math.sin(3*d+Math.sin(2*g))+.09*Math.cos(3*g-d),f=.1*i(Math.sin(o*127.1+a*311.7)*43758.5453),m=Math.floor(h*4),x=i(h*4),l=i(n*4+m%2*.5),c=x>.1&&l>.075?.15:-.25,b=x>.068&&l>.059?.18+.06*Math.cos(g+d*4):-.34,T={plaster:p,roof:p+c+.11*Math.sin(l*Math.PI),stone:p+b,wood:p+.17*Math.cos(d*6+Math.sin(g)*.4)-.25*+(i(n*4)<.08),foliage:p+.14*Math.cos(d*6+g*5),glass:.69+.22*Math.cos(d-g)}[u];s[a*t+o]=Math.round(S.clamp(T+f,0,1)*255)}const r=new W(s,t,t,I);return r.wrapS=r.wrapT=q,r.generateMipmaps=!0,r.minFilter=H,r.magFilter=A,r.needsUpdate=!0,R.set(u,r),r}const v=16;function pe(u){const{saturation:e,shadow:t,light:s}=U[u].grade,i=new Uint8Array(v**3*4);let r=0;for(let o=0;o<v;o++)for(let n=0;n<v;n++)for(let h=0;h<v;h++){const d=[h,n,o].map(f=>f/(v-1)),g=d[0]*.2126+d[1]*.7152+d[2]*.0722,p=S.smoothstep(g,.05,.85);for(const[f,m]of d.entries()){const x=S.lerp(g,m,e),l=S.lerp(t[f],s[f],p);i[r++]=Math.round(255*S.clamp(x*l,0,1))}i[r++]=255}const a=new te(i,v,v,v);return a.minFilter=a.magFilter=A,a.needsUpdate=!0,a}const fe=`
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
`;class Se{constructor(e,t,s,i=!1){this.renderer=e,this.quality=t,this.gl=e.getContext(),this.timer=i?this.gl.getExtension("EXT_disjoint_timer_query_webgl2"):null;const r=this.gl.getExtension("EXT_color_buffer_float")?y:N;this.hdr=new w(1,1,{type:r,colorSpace:$,depthTexture:this.sceneDepth}),this.bright=new w(1,1,{type:r,depthBuffer:!1}),this.blur=new w(1,1,{type:r,depthBuffer:!1});const a={vertexShader:fe,depthTest:!1,depthWrite:!1,toneMapped:!1};this.brightPass=new P({...a,fragmentShader:ve,uniforms:{source:{value:this.hdr.texture},pixel:{value:new E}}}),this.blurPass=new P({...a,fragmentShader:xe,uniforms:{source:{value:this.bright.texture},pixel:{value:new E}}}),this.finishPass=new P({...a,fragmentShader:be,uniforms:{source:{value:this.hdr.texture},bright:{value:this.blur.texture},toneMappingExposure:{value:1},grade:{value:null},nextGrade:{value:null},gradeAmount:{value:1},gradeBlend:{value:0},bloomAmount:{value:0}}});const o=new X;o.setAttribute("position",new O([-1,-1,0,3,-1,0,-1,3,0],3)),this.triangle=new C(o,this.finishPass),this.triangle.frustumCulled=!1,this.screen.add(this.triangle),e.info.autoReset=!1,e.toneMapping=V,e.outputColorSpace=j,e.shadowMap.type=Y,this.setTime(s),this.setQuality(t)}renderer;hdr;sceneDepth=new K(1,1,J);graded=new w(1,1,{depthBuffer:!1});bright;blur;screen=new Z;screenCamera=new ee;triangle;brightPass;blurPass;finishPass;grades=new Map;gl;timer;queries=[];gpuSamples=[];quality;tier;setTime(e){this.blendTimes(e,e,0),this.resetTiming()}blendTimes(e,t,s,i=1){const r=this.finishPass.uniforms;r.grade.value=this.getGrade(e),r.nextGrade.value=this.getGrade(t),r.gradeBlend.value=s,r.toneMappingExposure.value=S.lerp(U[e].exposure,U[t].exposure,s)*i}getGrade(e){let t=this.grades.get(e);return t||(t=pe(e),this.grades.set(e,t)),t}setGrade(e){this.finishPass.uniforms.gradeAmount.value=Number(e)}renderTargetSize(){return{width:this.hdr.width,height:this.hdr.height}}setQuality(e){this.quality=e,this.tier=void 0;const t=D[e];this.renderer.shadowMap.enabled=t.shadowSize>0,this.finishPass.uniforms.bloomAmount.value=this.hdr.texture.type===y?t.bloom:0,this.resetTiming()}setTier(e){if(this.tier=e,this.renderer.shadowMap.enabled=e.shadowSize>0,this.setGrade(e.grade),this.finishPass.uniforms.bloomAmount.value=this.hdr.texture.type===y?e.bloom:0,!e.grade&&!e.bloom&&!e.lensPasses)for(const t of[this.hdr,this.graded,this.bright,this.blur])t.setSize(1,1);this.resetTiming()}resize(e,t,s){const i=D[this.quality],r=this.tier?s:Math.min(s,i.pixelRatio,Math.sqrt(i.maxPixels/(e*t))),a=Math.max(1,Math.floor(e*r)),o=Math.max(1,Math.floor(t*r)),n=Math.max(1,a>>2),h=Math.max(1,o>>2);this.renderer.setPixelRatio(1),this.renderer.setSize(a,o,!1),!(this.tier&&!this.tier.grade&&!this.tier.bloom&&!this.tier.lensPasses)&&(this.hdr.setSize(a,o),this.bright.setSize(n,h),this.blur.setSize(n,h),this.brightPass.uniforms.pixel.value.set(1/a,1/o),this.blurPass.uniforms.pixel.value.set(1/n,1/h),this.resetTiming())}render(e,t){this.renderSource(()=>this.renderer.render(e,t))}prepareShaders(){const e=this.renderer.getRenderTarget();try{for(const[t,s]of[[this.brightPass,this.bright],[this.blurPass,this.blur],[this.finishPass,this.graded],[this.finishPass,null]])this.triangle.material=t,this.renderer.setRenderTarget(s),this.renderer.compile(this.screen,this.screenCamera)}finally{this.triangle.material=this.finishPass,this.renderer.setRenderTarget(e)}}renderSource(e,t){if(this.tier&&!this.tier.grade&&!this.tier.bloom&&!t){this.renderer.info.reset(),this.renderer.setRenderTarget(null),e();return}const s=this.gl,i=this.timer;let r=null;if(i){for(s.getParameter(i.GPU_DISJOINT_EXT)&&this.resetTiming();this.queries.length&&s.getQueryParameter(this.queries[0],s.QUERY_RESULT_AVAILABLE);){const a=this.queries.shift();this.gpuSamples.push(s.getQueryParameter(a,s.QUERY_RESULT)/1e6),s.deleteQuery(a),this.gpuSamples.length>7200&&this.gpuSamples.shift()}this.queries.length<8&&!s.getQuery(i.TIME_ELAPSED_EXT,s.CURRENT_QUERY)&&(r=s.createQuery()),r&&s.beginQuery(i.TIME_ELAPSED_EXT,r)}try{this.renderer.info.reset(),this.renderer.setRenderTarget(this.hdr),e(),this.finishPass.uniforms.bloomAmount.value>0&&(this.triangle.material=this.brightPass,this.renderer.setRenderTarget(this.bright),this.renderer.render(this.screen,this.screenCamera),this.triangle.material=this.blurPass,this.renderer.setRenderTarget(this.blur),this.renderer.render(this.screen,this.screenCamera)),this.triangle.material=this.finishPass,t&&this.graded.setSize(this.hdr.width,this.hdr.height),this.renderer.setRenderTarget(t?this.graded:null),this.renderer.render(this.screen,this.screenCamera)}finally{i&&r&&(s.endQuery(i.TIME_ELAPSED_EXT),this.queries.push(r))}t&&(this.renderer.setRenderTarget(null),t({colour:this.graded.texture,depth:this.sceneDepth,width:this.hdr.width,height:this.hdr.height,linear:!0}))}resetTiming(){for(const e of this.queries)this.gl.deleteQuery(e);this.queries.length=this.gpuSamples.length=0}dispose(){this.resetTiming(),this.hdr.dispose(),this.graded.dispose(),this.bright.dispose(),this.blur.dispose(),this.triangle.geometry.dispose(),this.brightPass.dispose(),this.blurPass.dispose(),this.finishPass.dispose();for(const e of this.grades.values())e.dispose();this.grades.clear()}stats(){const e=[...this.gpuSamples].sort((t,s)=>t-s);return{resolution:`${this.hdr.width}x${this.hdr.height}`,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,gpuTimerAvailable:!!this.timer,gpuSamples:e.length,gpuMedianMs:e[Math.ceil(e.length/2)-1]??null,gpuP95Ms:e[Math.ceil(e.length*.95)-1]??null}}}const _=[[0,"night"],[4.75,"night"],[8,"dawn"],[12.5,"noon"],[15,"noon"],[18.5,"golden"],[20.3,"dusk"],[22,"night"],[24,"night"]];class Te{lighting;post;moon=new F;constructor(e,t,s="medium",i="golden",r=!1){this.lighting=new ae(e,s,i),this.post=new Se(t,s,i,r)}setTime(e){this.lighting.setTime(e),this.post.setTime(e)}setQuality(e){this.lighting.setQuality(e),this.post.setQuality(e)}resize(e,t,s){this.post.resize(e,t,s)}dispose(){this.post.dispose(),this.lighting.sun.shadow.dispose(),this.lighting.sun.removeFromParent(),this.lighting.sun.target.removeFromParent(),this.lighting.fill.removeFromParent()}updateEnvironment(e,t,s,i){const r=_.findIndex(([x])=>x>e);if(r<1)return;const[a,o]=_[r-1],[n,h]=_[r],d=o===h?0:S.smoothstep(e,a,n);this.lighting.blendTimes(o,h,d);const{direction:g}=this.lighting,p=oe(e,g),f=1-S.smoothstep(p,-.13,.04);g.y=Math.max(.025,g.y),f>0&&g.lerp(ne(e,this.moon),f),g.normalize();const m=Math.sqrt(s/Math.max(s,t.fogDensity));this.post.blendTimes(o,h,d,1-(1-m)*.12),this.lighting.setWeather(void 0,m,t.transmission,i)}}const Me={create(u,{scene:e,manifests:t,fallbackLights:s,gull:i,tintHorizon:r,invalidate:a}){const o=e.fog,n=new Te(e,u);let h=re.high;const d=le(u,()=>a?.(),new URLSearchParams(location.search)),g=t.map(({id:l,origin:c,farProxy:b})=>({id:l,origin:c,radius:b.radius})),p=new F;let f,m;s.visible=!1,i.traverse(l=>{l instanceof C&&(l.castShadow=!0)});const x=(l,c,b)=>{const T=he.get(e);let M=T?.field;M||((!m||f!==c.seed||c.seconds<m.clock.elapsedSeconds)&&(m=new ie(c.seed,g),f=c.seed),m.clock.advance(c.seconds-m.clock.elapsedSeconds),Math.abs(m.clock.clockAt().hour-c.hour)>1e-4&&m.clock.setHour(c.hour),M=m);const{x:z,y:k,z:Q}=l.position;n.updateEnvironment(c.hour,M.weatherAt(z,-Q,T?.time??c.seconds),M.clock.tuning.baseFogDensity,k),r(n.lighting.fog.color),p.copy(i.position),p.y=Math.max(0,p.y-15),n.lighting.focus(p),d.render(e,l,{render:(we,ye,B)=>n.post.renderSource(b,B)})};return{controls:d,terrainMaterial:l=>L(l),resize(l,c,b){n.resize(Math.max(1,l),Math.max(1,c),b)},setQuality(l){h=l,n.lighting.setQuality(h),n.post.setTier(h),d.setStyledLenses(h.lensPasses)},prepareShaders:()=>n.post.prepareShaders(),renderTargetSize:()=>n.post.renderTargetSize(),render(l,c,b){x(c,b,()=>u.render(l,c))},renderSource:x,dispose(){d.dispose(),n.dispose(),e.fog=o,s.visible=!0}}},async preview(u,e){const{loadCorner:t,createLookProof:s}=await se(async()=>{const{loadCorner:r,createLookProof:a}=await import("./look-proof-0GUFuPuN.js");return{loadCorner:r,createLookProof:a}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url),i=await t();return{create:(r,a)=>s(r,i,u,e?.id,a.invalidate)}}},Re=Object.freeze(Object.defineProperty({__proto__:null,lens:Me},Symbol.toStringTag,{value:"Module"}));export{Te as L,De as a,L as c,Re as i};
