const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./look-proof-DZ_xOuMc.js","./index-qmOD1jXO.js","./index-BQcqpvTg.css","./picture-model-CfKMSgh3.js","./wooden_crate-4ENtV3ZQ.js","./index-CPYqby2k.js","./photo-DTQBwY-z.css"])))=>i.map(i=>d[i]);
import{a4 as W,n as f,w as I,R as q,cM as G,cO as j,L as F,dj as O,dM as V,dN as $,V as w,b as S,H as U,U as X,c as P,dO as H,o as z,h as k,B as Y,F as J,M as C,dP as K,aD as Z,dQ as ee,d as te,e as se,S as re,f as ie,D as ae,aJ as oe,W as ne}from"./index-qmOD1jXO.js";import{c as he}from"./index-CPYqby2k.js";const le={plaster:{color:15718836,repeat:.54,texture:.15},roof:{color:13132860,repeat:.55,texture:.48},stone:{color:12099982,repeat:.37,texture:.34},wood:{color:10182720,repeat:.51,texture:.28},foliage:{color:5399363,repeat:.63,texture:.26},glass:{color:4615814,repeat:.7,texture:.1}},ce=`
vec3 getGradientIrradiance(vec3 normal, vec3 direction) {
  float light = dot(normal, direction);
  float shoulder = clamp(fwidth(light), 0.025, 0.12);
  float low = smoothstep(0.015 - shoulder, 0.17 + shoulder, light);
  float high = smoothstep(0.52 - shoulder, 0.78 + shoulder, light);
  return vec3(low * 0.51 + high * 0.49);
}
`,de=`
  vec4 surfaceWorld = vec4(transformed, 1.0);
  #ifdef USE_BATCHING
    surfaceWorld = batchingMatrix * surfaceWorld;
  #endif
  #ifdef USE_INSTANCING
    surfaceWorld = instanceMatrix * surfaceWorld;
  #endif
  vSurfaceWorld = (modelMatrix * surfaceWorld).xyz;
`,ue=`
  vec3 axis = abs(inverseTransformDirection(normal, viewMatrix));
  axis *= axis;
  axis *= axis;
  axis /= dot(axis, vec3(1.0));
  vec3 p = vSurfaceWorld * surfaceRepeat;
  float brush = dot(axis, vec3(
    texture2D(surfaceTile, p.zy).r, texture2D(surfaceTile, p.xz).r, texture2D(surfaceTile, p.xy).r));
  diffuseColor.rgb *= 1.0 + (brush - 0.65) * surfaceStrength;
`;function A({flatShading:h=!1,textureScale:e=1,...t}={},s){const r=s&&le[s],i=new W({color:r?r.color:16777215,...t});Object.assign(i,{flatShading:h});const a=s&&r?{surfaceTile:{value:ge(s)},surfaceRepeat:{value:r.repeat*e},surfaceStrength:{value:r.texture}}:void 0;return i.customProgramCacheKey=()=>a?"gull:toon-surface":"gull:toon",i.onBeforeCompile=o=>{o.fragmentShader=o.fragmentShader.replace("#include <gradientmap_pars_fragment>",ce),a&&(Object.assign(o.uniforms,a),o.vertexShader=`varying vec3 vSurfaceWorld;
${o.vertexShader}`.replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
${de}`),o.fragmentShader=`varying vec3 vSurfaceWorld;
      uniform sampler2D surfaceTile;
      uniform float surfaceRepeat, surfaceStrength;
      ${o.fragmentShader}`.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
${ue}`))},i}function De(h,e={}){return A({vertexColors:!0,...e},h)}const D=new Map;function ge(h){const e=D.get(h);if(e)return e;const t=h==="stone"?128:64,s=new Uint8Array(t*t),r=a=>a-Math.floor(a);for(let a=0;a<t;a++)for(let o=0;o<t;o++){const n=o/t,c=a/t,d=n*Math.PI*2,u=c*Math.PI*2,p=.58+.14*Math.sin(3*d+Math.sin(2*u))+.09*Math.cos(3*u-d),m=.1*r(Math.sin(o*127.1+a*311.7)*43758.5453),M=Math.floor(c*4),x=r(c*4),y=r(n*4+M%2*.5),l=x>.1&&y>.075?.15:-.25,g=x>.068&&y>.059?.18+.06*Math.cos(u+d*4):-.34,b={plaster:p,roof:p+l+.11*Math.sin(y*Math.PI),stone:p+g,wood:p+.17*Math.cos(d*6+Math.sin(u)*.4)-.25*+(r(n*4)<.08),foliage:p+.14*Math.cos(d*6+u*5),glass:.69+.22*Math.cos(d-u)}[h];s[a*t+o]=Math.round(f.clamp(b+m,0,1)*255)}const i=new I(s,t,t,q);return i.wrapS=i.wrapT=G,i.generateMipmaps=!0,i.minFilter=j,i.magFilter=F,i.needsUpdate=!0,D.set(h,i),i}const fe={dawn:{azimuth:73,elevation:15,sun:"#ffdbaa",key:4.5,sky:"#b3c9f4",ground:"#c5a38c",fill:2.6,zenith:"#669ed6",horizon:"#f6c79a",fog:"#bdabc2",fogNear:160,fogFar:1700,exposure:1.02,grade:{saturation:1.16,shadow:[.97,1,1.1],light:[1.06,1.02,.94]},beacon:.4},golden:{azimuth:307,elevation:12,sun:"#ffc57e",key:6.1,sky:"#a6bcff",ground:"#c9ab93",fill:2.58,zenith:"#4799ea",horizon:"#ffc08b",fog:"#b8aac3",fogNear:225,fogFar:2050,exposure:1.08,grade:{saturation:1.23,shadow:[.97,.99,1.09],light:[1.08,1.01,.93]},beacon:.6},noon:{azimuth:253,elevation:69,sun:"#fff3db",key:3.5,sky:"#b8d9ff",ground:"#ac8e6e",fill:2,zenith:"#4b9cd6",horizon:"#c6e6ee",fog:"#a8ccd9",fogNear:200,fogFar:2100,exposure:.98,grade:{saturation:1.08,shadow:[.98,1,1.04],light:[1.01,1,.98]},beacon:0},dusk:{azimuth:292,elevation:4,sun:"#ff995f",key:2.7,sky:"#a9bbf3",ground:"#91697d",fill:1.6,zenith:"#6269ad",horizon:"#ef9a80",fog:"#a795ad",fogNear:225,fogFar:1775,exposure:.94,grade:{saturation:1.13,shadow:[1.02,.98,1.08],light:[1.07,1,.97]},beacon:1.6},night:{azimuth:36,elevation:34,sun:"#b8ccff",key:.85,sky:"#94afff",ground:"#68628e",fill:.7,zenith:"#192446",horizon:"#394873",fog:"#384775",fogNear:110,fogFar:1400,exposure:.83,grade:{saturation:1.1,shadow:[.91,.99,1.12],light:[.98,1,1.06]},beacon:3}},pe={low:{pixelRatio:1,maxPixels:921600,shadowSize:0,shadowRange:0,bloom:0},medium:{pixelRatio:1,maxPixels:1166400,shadowSize:1024,shadowRange:120,bloom:.1},high:{pixelRatio:1.25,maxPixels:2073600,shadowSize:2048,shadowRange:145,bloom:.16}},L={times:fe,quality:pe},T=L.times,_=L.quality,me=new S("#7c7f94"),E=Object.fromEntries(Object.entries(T).map(([h,e])=>[h,{sun:new S(e.sun),sky:new S(e.sky),ground:new S(e.ground),fog:new S(e.fog),direction:ve(e.azimuth,e.elevation)}]));function ve(h,e){const t=f.degToRad(h),s=f.degToRad(e);return new w(Math.sin(t)*Math.cos(s),Math.sin(s),-Math.cos(t)*Math.cos(s))}class xe{sun=new O;fill=new V;fog=new $(16777215);direction=new w;target=new w;right=new w;up=new w;center=new w;haze=new S;fogNear=0;fogFar=1;key=1;quality;constructor(e,t,s){this.quality=t,e.fog=this.fog,e.add(this.sun,this.sun.target,this.fill),this.setQuality(t),this.setTime(s)}setQuality(e){this.quality=e;const{shadowSize:t,shadowRange:s}=_[e];this.sun.castShadow=t>0;const r=this.sun.shadow;r.map?.dispose(),r.map=null,r.mapSize.setScalar(t||1);const i=s/2;Object.assign(r.camera,{left:-i,right:i,top:i,bottom:-i,near:1,far:290}),r.camera.updateProjectionMatrix(),r.normalBias=.055,r.bias=-1e-4,r.intensity=.9,this.focus(this.center)}setTime(e){this.blendTimes(e,e,0),this.focus(this.center)}blendTimes(e,t,s){const r=T[e],i=T[t],a=E[e],o=E[t],n=f.lerp;this.direction.copy(a.direction).lerp(o.direction,s).normalize(),this.sun.color.copy(a.sun).lerp(o.sun,s),this.fill.color.copy(a.sky).lerp(o.sky,s),this.fill.groundColor.copy(a.ground).lerp(o.ground,s),this.fill.intensity=n(r.fill,i.fill,s),this.key=n(r.key,i.key,s),this.fogNear=n(r.fogNear,i.fogNear,s),this.fogFar=n(r.fogFar,i.fogFar,s),this.haze.copy(a.fog).lerp(o.fog,s),this.setWeather()}setWeather(e,t=1,s=1,r=0){const i=f.clamp(t*(1+Math.max(0,r)/500),.05,2);this.fog.color.copy(this.haze).lerp(me,f.clamp(1-t,0,1)*.68),e!==void 0&&this.fog.color.set(e),this.fog.near=this.fogNear*i,this.fog.far=this.fogFar*i,this.sun.intensity=this.key*f.clamp(s,0,1)}focus(e){this.center.copy(e),this.target.copy(e);const{shadowSize:t,shadowRange:s}=_[this.quality];if(t){const r=s/t;this.right.set(this.direction.z,0,-this.direction.x).normalize(),this.up.crossVectors(this.direction,this.right);for(const i of[this.right,this.up]){const a=this.target.dot(i);this.target.addScaledVector(i,Math.round(a/r)*r-a)}}this.sun.target.position.copy(this.target),this.sun.position.copy(this.target).addScaledVector(this.direction,135)}}const v=16;function be(h){const{saturation:e,shadow:t,light:s}=T[h].grade,r=new Uint8Array(v**3*4);let i=0;for(let o=0;o<v;o++)for(let n=0;n<v;n++)for(let c=0;c<v;c++){const d=[c,n,o].map(m=>m/(v-1)),u=d[0]*.2126+d[1]*.7152+d[2]*.0722,p=f.smoothstep(u,.05,.85);for(const[m,M]of d.entries()){const x=f.lerp(u,M,e),y=f.lerp(t[m],s[m],p);r[i++]=Math.round(255*f.clamp(x*y,0,1))}r[i++]=255}const a=new ae(r,v,v,v);return a.minFilter=a.magFilter=F,a.needsUpdate=!0,a}const ye=`
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,we=`
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
`,Me=`
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
`,Se=`
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
`;class Te{constructor(e,t,s,r=!1){this.renderer=e,this.quality=t,this.gl=e.getContext(),this.timer=r?this.gl.getExtension("EXT_disjoint_timer_query_webgl2"):null;const i=this.gl.getExtension("EXT_color_buffer_float")?U:X;this.hdr=new P(1,1,{type:i,colorSpace:H,depthTexture:this.sceneDepth}),this.bright=new P(1,1,{type:i,depthBuffer:!1}),this.blur=new P(1,1,{type:i,depthBuffer:!1});const a={vertexShader:ye,depthTest:!1,depthWrite:!1,toneMapped:!1};this.brightPass=new z({...a,fragmentShader:we,uniforms:{source:{value:this.hdr.texture},pixel:{value:new k}}}),this.blurPass=new z({...a,fragmentShader:Me,uniforms:{source:{value:this.bright.texture},pixel:{value:new k}}}),this.finishPass=new z({...a,fragmentShader:Se,uniforms:{source:{value:this.hdr.texture},bright:{value:this.blur.texture},toneMappingExposure:{value:1},grade:{value:null},nextGrade:{value:null},gradeAmount:{value:1},gradeBlend:{value:0},bloomAmount:{value:0}}});const o=new Y;o.setAttribute("position",new J([-1,-1,0,3,-1,0,-1,3,0],3)),this.triangle=new C(o,this.finishPass),this.triangle.frustumCulled=!1,this.screen.add(this.triangle),e.info.autoReset=!1,e.toneMapping=K,e.outputColorSpace=Z,e.shadowMap.type=ee,this.setTime(s),this.setQuality(t)}renderer;hdr;sceneDepth=new te(1,1,se);graded=new P(1,1,{depthBuffer:!1});bright;blur;screen=new re;screenCamera=new ie;triangle;brightPass;blurPass;finishPass;grades=new Map;gl;timer;queries=[];gpuSamples=[];quality;setTime(e){this.blendTimes(e,e,0),this.resetTiming()}blendTimes(e,t,s){const r=this.finishPass.uniforms;r.grade.value=this.getGrade(e),r.nextGrade.value=this.getGrade(t),r.gradeBlend.value=s,r.toneMappingExposure.value=f.lerp(T[e].exposure,T[t].exposure,s)}getGrade(e){let t=this.grades.get(e);return t||(t=be(e),this.grades.set(e,t)),t}setGrade(e){this.finishPass.uniforms.gradeAmount.value=Number(e)}setQuality(e){this.quality=e;const t=_[e];this.renderer.shadowMap.enabled=t.shadowSize>0,this.finishPass.uniforms.bloomAmount.value=this.hdr.texture.type===U?t.bloom:0,this.resetTiming()}resize(e,t,s){const r=_[this.quality],i=Math.min(s,r.pixelRatio,Math.sqrt(r.maxPixels/(e*t))),a=Math.max(1,Math.floor(e*i)),o=Math.max(1,Math.floor(t*i)),n=Math.max(1,a>>2),c=Math.max(1,o>>2);this.renderer.setPixelRatio(1),this.renderer.setSize(a,o,!1),this.hdr.setSize(a,o),this.bright.setSize(n,c),this.blur.setSize(n,c),this.brightPass.uniforms.pixel.value.set(1/a,1/o),this.blurPass.uniforms.pixel.value.set(1/n,1/c),this.resetTiming()}render(e,t){this.renderSource(()=>this.renderer.render(e,t))}prepareShaders(){const e=this.renderer.getRenderTarget();try{for(const[t,s]of[[this.brightPass,this.bright],[this.blurPass,this.blur],[this.finishPass,this.graded],[this.finishPass,null]])this.triangle.material=t,this.renderer.setRenderTarget(s),this.renderer.compile(this.screen,this.screenCamera)}finally{this.triangle.material=this.finishPass,this.renderer.setRenderTarget(e)}}renderSource(e,t){const s=this.gl,r=this.timer;let i=null;if(r){for(s.getParameter(r.GPU_DISJOINT_EXT)&&this.resetTiming();this.queries.length&&s.getQueryParameter(this.queries[0],s.QUERY_RESULT_AVAILABLE);){const a=this.queries.shift();this.gpuSamples.push(s.getQueryParameter(a,s.QUERY_RESULT)/1e6),s.deleteQuery(a),this.gpuSamples.length>7200&&this.gpuSamples.shift()}this.queries.length<8&&!s.getQuery(r.TIME_ELAPSED_EXT,s.CURRENT_QUERY)&&(i=s.createQuery()),i&&s.beginQuery(r.TIME_ELAPSED_EXT,i)}try{this.renderer.info.reset(),this.renderer.setRenderTarget(this.hdr),e(),this.finishPass.uniforms.bloomAmount.value>0&&(this.triangle.material=this.brightPass,this.renderer.setRenderTarget(this.bright),this.renderer.render(this.screen,this.screenCamera),this.triangle.material=this.blurPass,this.renderer.setRenderTarget(this.blur),this.renderer.render(this.screen,this.screenCamera)),this.triangle.material=this.finishPass,t&&this.graded.setSize(this.hdr.width,this.hdr.height),this.renderer.setRenderTarget(t?this.graded:null),this.renderer.render(this.screen,this.screenCamera)}finally{r&&i&&(s.endQuery(r.TIME_ELAPSED_EXT),this.queries.push(i))}t&&(this.renderer.setRenderTarget(null),t({colour:this.graded.texture,depth:this.sceneDepth,width:this.hdr.width,height:this.hdr.height,linear:!0}))}resetTiming(){for(const e of this.queries)this.gl.deleteQuery(e);this.queries.length=this.gpuSamples.length=0}dispose(){this.resetTiming(),this.hdr.dispose(),this.graded.dispose(),this.bright.dispose(),this.blur.dispose(),this.triangle.geometry.dispose(),this.brightPass.dispose(),this.blurPass.dispose(),this.finishPass.dispose();for(const e of this.grades.values())e.dispose();this.grades.clear()}stats(){const e=[...this.gpuSamples].sort((t,s)=>t-s);return{resolution:`${this.hdr.width}x${this.hdr.height}`,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,gpuTimerAvailable:!!this.timer,gpuSamples:e.length,gpuMedianMs:e[Math.ceil(e.length/2)-1]??null,gpuP95Ms:e[Math.ceil(e.length*.95)-1]??null}}}const R=[[0,"night"],[4.75,"night"],[7.5,"dawn"],[12.5,"noon"],[16.5,"golden"],[19,"dusk"],[21.25,"night"],[24,"night"]];class Pe{lighting;post;constructor(e,t,s="medium",r="golden",i=!1){this.lighting=new xe(e,s,r),this.post=new Te(t,s,r,i)}setTime(e){this.lighting.setTime(e),this.post.setTime(e)}setQuality(e){this.lighting.setQuality(e),this.post.setQuality(e)}resize(e,t,s){this.post.resize(e,t,s)}dispose(){this.post.dispose(),this.lighting.sun.shadow.dispose(),this.lighting.sun.removeFromParent(),this.lighting.sun.target.removeFromParent(),this.lighting.fill.removeFromParent()}updateEnvironment(e,t,s,r){const i=R.findIndex(([p])=>p>e);if(i<1)return;const[a,o]=R[i-1],[n,c]=R[i],d=o===c?0:f.smoothstep(e,a,n);this.lighting.blendTimes(o,c,d),this.post.blendTimes(o,c,d);const u=Math.sqrt(s/Math.max(s,t.fogDensity));this.lighting.setWeather(void 0,u,t.transmission,r)}}const _e={create(h,{scene:e,manifests:t,fallbackLights:s,gull:r,tintHorizon:i,invalidate:a}){const o=e.fog,n=new Pe(e,h),c=n.lighting.sun.shadow,d=c.intensity,u=he(h,()=>a?.(),new URLSearchParams(location.search)),p=t.map(({id:l,origin:g,farProxy:b})=>({id:l,origin:g,radius:b.radius})),m=new w;let M,x;s.visible=!1,r.traverse(l=>{l instanceof C&&(l.castShadow=!0)});const y=(l,g,b)=>{(!x||M!==g.seed)&&(x=new ne(g.seed,p,x?.clock),M=g.seed);const{x:Q,z:N}=g.position;n.updateEnvironment(g.hour,x.weatherAt(Q,N,g.seconds),x.clock.tuning.baseFogDensity,l.position.y),i(n.lighting.fog.color),m.copy(r.position),m.y=Math.max(0,m.y-15),n.lighting.focus(m),u.render(e,l,{render:(ze,Re,B)=>n.post.renderSource(b,B)})};return{controls:u,terrainMaterial:l=>A(l),resize(l,g,b){n.resize(Math.max(1,l),Math.max(1,g),b)},setLowQuality(l){n.post.setQuality(l?"low":"medium"),h.shadowMap.enabled=!0,h.shadowMap.autoUpdate=!l,c.intensity=l?0:d},prepareShaders:()=>n.post.prepareShaders(),render(l,g,b){y(g,b,()=>h.render(l,g))},renderSource:y,dispose(){u.dispose(),n.dispose(),e.fog=o,s.visible=!0}}},async preview(h,e){const{loadCorner:t,createLookProof:s}=await oe(async()=>{const{loadCorner:i,createLookProof:a}=await import("./look-proof-DZ_xOuMc.js");return{loadCorner:i,createLookProof:a}},__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url),r=await t();return{create:(i,a)=>s(i,r,h,e?.id,a.invalidate)}}},Ee=Object.freeze(Object.defineProperty({__proto__:null,lens:_e},Symbol.toStringTag,{value:"Module"}));export{Pe as L,De as a,_ as b,A as c,Ee as i,T as l};
