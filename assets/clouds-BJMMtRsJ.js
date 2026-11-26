import"./three-renderer-BP556_pn.js";import{W as yt,A as xt,s as wt,m as bt,a as et,S as st}from"./runtime-Fvu5jN8S.js";import{s as G,a as zt,b as $,c as St}from"./storm-cloud-CgEFPEzC.js";import{b_ as Ct,aF as Mt,U as kt,a3 as L,a0 as Tt,cX as rt,C as A,V as b,b as Y,n as Et,m as At,d1 as Ft,dj as Dt,an as nt,al as lt,co as Rt,g as I,F as Ht,cJ as Gt,M as W,a as S,cy as _,H as V,ak as ct,bP as ut,S as Lt,cj as Pt,ck as _t,bL as Nt,cg as Ut,av as $t}from"./three.core-BYa7ON5M.js";import{g as It}from"./saves-ClQI9LoD.js";import{s as Wt,m as Bt,e as jt}from"./lights-ZPpXjK36.js";import"./index-CNUyvlgf.js";import"./table-D89Xz1NR.js";import"./credits-page-dWtXkrRi.js";import"./music-CxylN_mZ.js";const H=[[[-.08,-.54,.08,.88,.52,.87],[-.23,-.1,-.42,.57,.59,.34],[.08,.25,.07,.62,.69,.42],[-.31,.02,.55,.48,.57,.35],[.56,-.23,.41,.34,.52,.42],[-.34,.49,.2,.25,.32,.22],[.2,.5,-.19,.26,.29,.18],[.18,.19,.65,.26,.25,.21],[-.45,.09,-.58,.22,.3,.23],[.39,.57,.13,.23,.31,.22],[-.2,.41,-.39,.22,.31,.23]],[[.04,-.54,0,.88,.52,.94],[-.21,.01,-.62,.5,.48,.31],[.17,.29,-.22,.55,.64,.37],[-.18,.03,.24,.56,.52,.35],[.13,-.22,.67,.45,.42,.28],[-.31,.26,-.64,.24,.25,.22],[-.12,.47,-.33,.24,.29,.24],[.34,.32,.3,.25,.29,.21],[.48,.53,-.09,.23,.28,.21],[-.21,.37,.42,.21,.33,.25]],[[.02,-.33,.02,.82,.53,.73],[.16,.22,.02,.63,.65,.53],[-.45,-.22,.34,.45,.62,.4],[.37,-.24,-.42,.54,.59,.46],[.04,-.19,.59,.56,.56,.31],[-.49,-.16,-.35,.33,.52,.48]],[[.02,-.44,.03,.96,.6,.88],[-.61,-.19,.01,.36,.54,.69],[-.29,.03,.13,.39,.64,.76],[.2,.25,-.12,.55,.67,.7],[.67,-.14,.05,.32,.52,.7]],[[-.11,-.74,.01,.46,.28,.86],[-.19,-.47,-.07,.34,.42,.76],[-.23,-.07,.03,.27,.49,.7],[-.16,.32,-.08,.29,.42,.63],[-.1,.54,.04,.29,.26,.67],[-.1,.71,.03,.47,.14,.75],[.28,.72,.02,.59,.114,.68],[.6,.718,-.03,.37,.092,.5],[-.49,.7,-.02,.28,.108,.52],[-.41,-.54,.28,.16,.24,.39],[-.42,-.25,.23,.16,.2,.42],[-.36,.02,.35,.16,.2,.35],[-.37,.27,.17,.15,.22,.39],[-.31,.5,.38,.17,.16,.33],[-.17,.35,.5,.15,.19,.36],[-.17,-.2,.52,.17,.27,.29],[.14,-.57,.36,.18,.24,.39],[.16,-.31,.19,.17,.29,.37],[.05,.01,.37,.17,.23,.37],[.09,.48,.25,.2,.2,.37],[-.34,-.36,-.43,.17,.24,.33],[-.29,-.06,-.46,.15,.2,.33],[-.15,.22,-.48,.2,.2,.29],[-.25,.49,-.37,.18,.18,.31]]],f=56,ht=H.length;function qt(){const h=new Uint8Array(f**3*H.length);for(const[s,o]of H.entries()){const e=s===G,a=e?-.884:s===2?-.79:-.83,l=e?.022:s===2?.055:.036;for(let r=1;r<f-1;r++)for(let i=1;i<f-1;i++)for(let n=1;n<f-1;n++){const u=n/(f-1)*2-1,c=i/(f-1)*2-1,d=r/(f-1)*2-1;let p=-1;for(const[j,E,R,q,Q,gt]of o){const Z=(1-Math.sqrt(((u-j)/q)**2+((c-E)/Q)**2+((d-R)/gt)**2))*.56,tt=Math.max(0,.1-Math.abs(Z-p));p=Math.max(p,Z)+tt*tt/.4}if(p<-.22)continue;const m=O(u*3.2+18*s,c*2.7,d*3.2),g=O(u*8.1,c*6.9+25*s,d*8.1),y=k((c+.54)/.65),x=e?(O(u*18,c*31,d*18)-.5)*.078:0,v=p+(m-.48)*(e?.21:.145)+(g-.5)*(.024+.098*y)+x,w=k((c-a+(m-.5)*.022)/(e?.041:.072)),D=k(e?(v+.025)/.1:(v+.017)/.071),z=l*k((v+.074)/.09),P=M(z,.78+.22*m,D)*w;h[n+f*(i+f*(r+f*s))]=Math.round(P*255)}}const t=new Ct(h,f,f,f*H.length);return t.format=Mt,t.type=kt,t.minFilter=t.magFilter=L,t.wrapS=t.wrapT=t.wrapR=Tt,t.needsUpdate=!0,t}function Qt(h,t,s,o,e){if(Math.max(Math.abs(s),Math.abs(o),Math.abs(e))>=1)return 0;const a=Math.round((s*.5+.5)*(f-1)),l=Math.round((o*.5+.5)*(f-1)),r=Math.round((e*.5+.5)*(f-1));return h.image.data[a+f*(l+f*(r+f*t))]/255}function C(h,t,s){let o=Math.imul(h,374761393)+Math.imul(t,668265263)+Math.imul(s,1274126177);return o=Math.imul(o^o>>>13,1274126177),((o^o>>>16)>>>0)/4294967295}function k(h){const t=Math.max(0,Math.min(1,h));return t*t*(3-2*t)}function M(h,t,s){return h+(t-h)*s}function O(h,t,s){const o=Math.floor(h),e=Math.floor(t),a=Math.floor(s),l=k(h-o),r=k(t-e),i=k(s-a),n=M(M(C(o,e,a),C(o+1,e,a),l),M(C(o,e+1,a),C(o+1,e+1,a),l),r),u=M(M(C(o,e,a+1),C(o+1,e,a+1),l),M(C(o,e+1,a+1),C(o+1,e+1,a+1),l),r);return M(n,u,i)}const dt=`
  uniform highp sampler3D uDensity;
  float densityAt(vec3 p, float shape) {
    if (any(greaterThan(abs(p), vec3(1.0)))) return 0.0;
    vec3 uv = p * 0.5 + 0.5;
    uv = (uv * ${f-1}.0 + 0.5) / ${f}.0;
    uv.z = (uv.z + shape) / ${H.length}.0;
    return texture(uDensity, uv).r;
  }
`,Vt=[[345,150,-191,173,80,154],[568,192,300,212,122,226],[-521,175,465,164,105,161],[-696,212,-411,241,142,236],[2260,970,-1330,420,17,1120],[-2620,1080,1490,1080,21,510]];class ot{constructor(t,s){this.seed=t;const o=s.find(({id:r})=>r==="home-lookkit")??s.find(({id:r})=>r==="graybox-a")??s[0];this.anchor=o?.origin??{x:0,y:0,z:0};const e=o?.anchors.roosts[0]?.position??{x:0,y:24,z:0},a=[{id:`${o?.id??"world"}/thermal0001`,x:this.anchor.x+e.x-28,y:this.anchor.y+e.y,z:this.anchor.z+e.z+6,warmth:1,radius:43,height:104}];o?.id==="home-lookkit"&&s.some(r=>r.id==="flipped-kits")&&a.push(It.crossingThermal);const l=new yt(t,s.map(({id:r,origin:i,farProxy:n})=>({id:r,origin:i,radius:n.radius})));this.air=new xt(l,{thermals:a});for(let r=0;r<3;r++)for(let i=0;i<10;i++){const n=r*10+i,u=N(Math.sin(n*324.5+t*.017)*43652.7),c=(i+.5+r*.36+(u-.5)*.67)*Math.PI/5,d=Math.cos(c)>.96?c+Math.sign(Math.sin(c))*(.26+r*.06):c,p=1660+r*1900+u*760,m={x:this.anchor.x+Math.cos(d)*p,y:130+r*215+u*(435+r*205),z:this.anchor.z+Math.sin(d)*p},g=.49+.59*N(u*13.27),y=.59+1.12*N(u*31.61),x=.7+.53*N(u*8.13),v={x:(235*g+r*85)*x,y:(88*g+r*31)*y,z:(216*g+r*71)/x};this.backgrounds.push({id:`cloud${String(n+7).padStart(4,"0")}`,center:m,bounds:v,baseHeight:m.y-v.y,shape:n%3===2?3:n%3,opacity:.71+u*.23,storm:0})}}seed;air;anchor;backgrounds=[];cloudsAt(t,s){const o=this.sampleClouds(t,s);for(;;){const e=o.next();if(e.done)return e.value}}*sampleClouds(t,s){const{weather:o}=this.air,e=o.weatherAt(this.anchor.x,this.anchor.z,0).cloudWind,a=[],l=8*Math.sin(t/120);for(const[c,[d,p,m,g,y,x]]of Vt.entries()){const v={x:this.anchor.x+d+l*e.x,y:this.anchor.y+p,z:this.anchor.z+m+l*e.z},w=o.weatherAt(v.x,v.z,t);a.push({id:`cloud000${c+1}`,center:v,baseHeight:v.y-y,bounds:{x:g,y,z:x},shape:c>=4?2:c,opacity:c>=4?.25+w.cover*.15:.84+w.cover*.17,storm:w.stormIntensity*.52}),yield}const r=this.air.thermalCapsAt(t).map(c=>({...c,shape:2,storm:0})),i=s?.fronts??o.frontsAt(t),n=[...a,...r,...this.backgrounds];if(i.length===0)return n;const u=[];for(const c of n){let d=0;for(const m of i){const g=c.center.x-m.center.x,y=c.center.z-m.center.z,x=Math.hypot(g,y),v=Math.max(m.halfWidth,m.halfLength)+Math.max(c.bounds.x,c.bounds.z);d=Math.max(d,m.strength*(1-wt(v*.91,v*1.34,x)))}const p=bt(c.opacity,0,d);p>.05&&u.push({...c,opacity:p}),yield}for(const c of i){const{x:d,z:p}=c.precipitationCenter,m=(s?.field??o).weatherAt(d,p,s?.time??t).cloudSteadyWind;u.push(zt(c,m)),yield}return u}}function N(h){return h-Math.floor(h)}const mt=`
uniform vec3 uMoon;
uniform float uStarPixelAngle;

vec3 nightGradient(float height) {
  float airglow = exp(-max(height, 0.0) * 7.0);
  return mix(vec3(0.002, 0.005, 0.015), vec3(0.019, 0.033, 0.077), airglow);
}

vec3 starHash(vec3 cell) {
  cell = fract(cell * vec3(0.1031, 0.1030, 0.0973));
  cell += dot(cell, cell.yxz + 33.33);
  return fract((cell.xxy + cell.yxx) * cell.zyx);
}

// A cubed sphere keeps the same scale near the zenith and the horizon.
vec3 starField(vec3 ray, float grid, float seconds) {
  vec3 axis = abs(ray);
  vec3 face;
  if (axis.x >= max(axis.y, axis.z)) face = vec3(ray.zy / axis.x, sign(ray.x));
  else if (axis.y >= axis.z) face = vec3(ray.xz / axis.y, 3.0 + sign(ray.y));
  else face = vec3(ray.xy / axis.z, 6.0 + sign(ray.z));
  vec2 field = (face.xy * 0.5 + 0.5) * grid;
  vec3 random = starHash(vec3(floor(field), face.z));
  vec2 offset = fract(field) - mix(vec2(0.29), vec2(0.71), random.xy);
  float brightness = clamp((random.z - 0.65) / 0.35, 0.0, 1.0);
  // Project the offset onto the tangent plane to keep stars round across cube faces.
  vec3 faceRay = vec3(face.xy, 1.0);
  float projected = dot(offset, face.xy) / length(faceRay);
  float distanceToStar = sqrt(max(0.0, dot(offset, offset) - projected * projected)) / length(faceRay);
  float size = mix(0.019, 0.060, brightness * brightness);
#ifndef DETAILED_NIGHT_SKY
  size *= 0.90;
#endif
  float pixel = min(0.12, uStarPixelAngle * grid * 0.5);
  float point = 1.0 - smoothstep(max(0.0, size - pixel * 0.25), size + pixel * 0.55, distanceToStar);
  float intensity = point * brightness * brightness * (0.16 + 0.86 * brightness * brightness);
  float extinction = smoothstep(0.012, 0.19, ray.y);
#ifdef DETAILED_NIGHT_SKY
  float twinkle = sin(seconds * mix(3.0, 7.0, random.x) + random.y * 47.0);
  intensity *= 1.0 + 0.30 * twinkle * (1.0 - smoothstep(0.08, 0.35, ray.y));
  vec3 tint = mix(vec3(1.0, 0.81, 0.65), vec3(0.68, 0.82, 1.0), random.y);
  return tint * intensity * extinction;
#else
  return vec3(0.71, 0.78, 0.92) * intensity * extinction;
#endif
}

#ifdef DETAILED_NIGHT_SKY
float galacticDust(vec2 p) {
  vec2 cell = floor(p);
  vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(p));
  float a = starHash(vec3(cell, 7.0)).x;
  float b = starHash(vec3(cell + vec2(1.0, 0.0), 7.0)).x;
  float c = starHash(vec3(cell + vec2(0.0, 1.0), 7.0)).x;
  float d = starHash(vec3(cell + 1.0, 7.0)).x;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

vec3 milkyWay(vec3 ray) {
  float latitude = dot(ray, vec3(0.73, 0.53, 0.43));
  vec2 region = vec2(dot(ray, vec3(0.51, 0.0, -0.86)), dot(ray, vec3(-0.46, 0.85, -0.27)));
  float broad = galacticDust(region * 9.0);
  float fine = galacticDust(region * 29.0 + 3.0);
  float band = 1.0 - smoothstep(0.025, 0.22 + 0.07 * broad, abs(latitude + 0.025 * (fine - 0.5)));
  float rift = smoothstep(0.009, 0.05, abs(latitude + 0.032 * (broad - 0.5)));
  return vec3(0.012, 0.014, 0.022) * band * (0.25 + 0.75 * rift) * (0.25 + 0.52 * broad + 0.23 * fine)
    * smoothstep(0.04, 0.28, ray.y);
}
#endif

float moonDisc(float lunarDistance) {
  return 1.0 - smoothstep(0.0145, 0.0165, lunarDistance);
}

vec3 nightStars(vec3 ray, float grid, float seconds) {
  if (ray.y <= 0.012) return vec3(0.0);
  vec3 starlight = starField(ray, grid, seconds);
#ifdef DETAILED_NIGHT_SKY
  starlight += milkyWay(ray);
#endif
  return starlight * (1.0 - moonDisc(length(ray - uMoon)));
}

vec3 moonGlow(vec3 ray) {
  vec3 side = normalize(cross(uMoon, vec3(0.0, 1.0, 0.0)));
  float lunarDistance = length(ray - uMoon);
  float disc = moonDisc(lunarDistance);
  float phase = smoothstep(0.013, 0.015, length(ray - normalize(uMoon + side * 0.009)));
  float halo = 0.076 * exp(-lunarDistance * 36.0) + 0.018 * exp(-lunarDistance * 11.0);
  return (disc * (0.009 + 1.36 * phase) + halo) * vec3(0.73, 0.83, 1.0);
}
`,pt=ht*3,T=16,F=5,Ot=`
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,J=`
uniform mat4 uWorldFromClip;
uniform vec3 uEye;
uniform sampler2D uDepth;
uniform vec2 uCameraPlanes;
vec3 worldAt(vec2 uv, float depth) {
  vec4 p = uWorldFromClip * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  return p.xyz / p.w;
}
float encoded(float metres) { return clamp(log2(1.0 + metres) / 15.0, 0.0, 1.0); }
float sceneLimit(float depth) { return depth < 1.0 ? length(worldAt(vUv, depth) - uEye) : 24000.0; }
float sceneGuide(float depth) {
  float near = uCameraPlanes.x, far = uCameraPlanes.y;
  return encoded(near / (1.0 - depth * (1.0 - near / far)));
}
`,K=`
uniform vec3 uSun;
uniform float uTwilight, uNight, uEvening;
uniform vec4 uStormMist;
vec3 cloudLight(float illumination, float storm, float glare) {
  vec3 shade = mix(vec3(0.22, 0.32, 0.52), vec3(0.27, 0.31, 0.49), uTwilight);
  vec3 light = mix(vec3(1.22, 1.19, 1.14), vec3(1.24, 0.98, 0.73), uTwilight);
  shade = mix(shade, vec3(0.073, 0.097, 0.140), storm);
  light = mix(light, mix(vec3(1.04, 1.03, 1.00), vec3(1.10, 0.78, 0.56), uTwilight), storm);
  shade = mix(shade, vec3(0.028, 0.047, 0.096), uNight);
  light = mix(light, vec3(0.15, 0.22, 0.37), uNight);
  return mix(shade, light, smoothstep(0.09, 0.84, illumination))
    + (1.0 - uNight) * glare * (1.0 - storm) * vec3(0.23, 0.16, 0.10);
}
`,ft=`
void basis(float bearing, float elevation, out vec3 look, out vec3 side, out vec3 up) {
  side = vec3(cos(bearing), 0.0, -sin(bearing));
  look = vec3(sin(bearing) * cos(elevation), sin(elevation), cos(bearing) * cos(elevation));
  up = cross(look, side);
}
`,Xt=`
in vec2 vUv;
out vec4 atlasColor;
${dt}
${ft}
void main() {
  vec2 cell = vUv * vec2(8.0, ${pt}.0);
  float row = floor(cell.y);
  float shape = floor(row / 3.0);
  vec3 look, side, up;
  basis(floor(cell.x) * 0.78539816, (mod(row, 3.0) - 1.0) * 0.68, look, side, up);
  vec2 offset = (fract(cell) * 2.0 - 1.0) * 1.65;
  vec3 origin = side * offset.x + up * offset.y;
  float transmittance = 1.0;
  float luminance = 0.0;
  for (int i = 0; i < 30; i++) {
    vec3 p = origin + look * (1.6 - (float(i) + 0.5) * (3.2 / 30.0));
    float d = densityAt(p, shape);
    if (d < 0.005) continue;
    float a = 1.0 - exp2(-d * 0.90);
    float shadow = densityAt(p + vec3(-0.11, 0.28, -0.09), shape);
    float lit = clamp(0.19 + p.y * 0.22 + 0.65 * (1.0 - shadow), 0.0, 1.0);
    if (shape == ${G}.0) {
      float upper = smoothstep(-0.84, 0.79, p.y);
      lit = (0.13 + 0.82 * (1.0 - shadow)) * mix(0.38, 1.0, upper);
    }
    luminance += transmittance * a * lit;
    transmittance *= 1.0 - a;
  }
  atlasColor = vec4(luminance, 0.0, 0.0, 1.0 - transmittance);
}
`,Yt=`
in vec2 vUv;
layout(location = 0) out vec4 cloud;
layout(location = 1) out vec4 guide;
${dt}
${J}
${K}
${ft}
uniform sampler2D uAtlas, uHistory, uHistoryGuide;
uniform mat4 uPreviousClipFromWorld;
uniform vec3 uPreviousEye;
uniform bool uReuse;
uniform float uJitter, uNearClear;
uniform int uCount, uSteps, uShadowSteps;
uniform vec4 uCenterShape[${T}], uExtentOpacity[${T}];
uniform vec4 uStormLod[${T}];
uniform vec4 uStormFlash;
uniform int uCasterCount;
uniform vec4 uCasterCenter[${F}], uCasterExtent[${F}];

float surfaceShadow(vec3 receiver) {
  float daylight = smoothstep(0.07, 0.25, uSun.y);
  if (daylight <= 0.0 || uNight > 0.8) return 0.0;
  vec2 sunSlope = uSun.xz / uSun.y;
  float shade = 0.0;
  for (int i = 0; i < ${F}; i++) {
    if (i >= uCasterCount) break;
    vec4 center = uCasterCenter[i], extent = uCasterExtent[i];
    if (receiver.y >= center.y + extent.y) continue;
    vec2 shear = sunSlope * extent.y / extent.xz;
    vec2 p = (receiver.xz - center.xz + (center.y - receiver.y) * sunSlope) / extent.xz;
    if (any(greaterThan(abs(p), vec2(1.0) + abs(shear)))) continue;
    vec2 low = p - shear * 0.40, high = p + shear * 0.31;
    float d = densityAt(vec3(low.x, -0.40, low.y), center.w) * 0.67;
    d += densityAt(vec3(high.x, 0.31, high.y), center.w) * 0.46;
    shade = max(shade, (1.0 - exp2(-d * 2.6)) * extent.w);
  }
  return 0.59 * shade * daylight;
}

vec4 sampleAtlas(vec3 eye, vec3 ray, float shape, float storm, float glare) {
  vec3 normal = normalize(eye);
  vec3 p = eye - ray * dot(eye, normal) / min(-0.0001, dot(ray, normal));
  float azimuth = mod(atan(normal.x, normal.z) * 1.27323954 + 8.0, 8.0);
  float elev = clamp(asin(normal.y) / 0.68 + 1.0, 0.0, 2.0);
  vec2 average = vec2(0.0);
  for (int i = 0; i < 2; i++) {
    float index = mod(floor(azimuth) + float(i), 8.0);
    for (int j = 0; j < 2; j++) {
      float band = min(2.0, floor(elev) + float(j));
      vec3 look, side, up;
      basis(index * 0.78539816, (band - 1.0) * 0.68, look, side, up);
      vec2 local = vec2(dot(p, side), dot(p, up)) / 3.3 + 0.5;
      vec2 uv = (vec2(index, shape * 3.0 + band) + clamp(local, 0.012, 0.988)) / vec2(8.0, ${pt}.0);
      float weight = (i == 0 ? 1.0 - fract(azimuth) : fract(azimuth)) * (j == 0 ? 1.0 - fract(elev) : fract(elev));
      average += texture(uAtlas, uv).ra * weight;
    }
  }
  return vec4(cloudLight(average.x / max(0.01, average.y), storm, glare) * average.y, average.y);
}

vec3 toCloudFrame(vec3 point, vec2 heading) {
  return vec3(dot(point.xz, heading), point.y, dot(point.xz, vec2(-heading.y, heading.x)));
}

vec3 stormGlow(vec3 point) {
  vec3 delta = point - uStormFlash.xyz;
  float glow = uStormFlash.w * exp2(-dot(delta, delta) / (220.0 * 220.0));
  return glow * vec3(0.73, 0.70, 1.0);
}

vec4 integrate(vec3 eye, vec3 ray, vec3 worldRay, vec3 stepSun, vec3 size, vec2 span,
  float shape, float strength, float storm, float glare, float noise, out float moment) {
  bool tower = shape == ${G}.0;
  int steps = tower && uSteps == 17 ? (span.x > 1850.0 ? 20 : 23) : uSteps;
  float stride = (span.y - span.x) / float(steps);
  float t = span.x + stride * (tower ? 0.50 + (noise - 0.50) * 6.0 : noise);
  float extinction = 0.070 * mix(1.0, 1.3, storm) * strength * max(1.0, 24.0 / size.y);
  float lowCap = 1.0 - smoothstep(15.0, 17.0, size.y);
  float interior = 0.0;
  if (span.x < 0.25) interior = smoothstep(0.035, 0.33, densityAt(eye, shape)) * (1.0 - uNight) * (1.0 - storm);
  vec4 acc = vec4(0.0);
  moment = 0.0;
  for (int i = 0; i < 36; i++) {
    if (i >= steps || acc.a > 0.994) break;
    vec3 p = eye + ray * t;
    float d = densityAt(p, shape);
    if (d > 0.005) {
      float shadow = densityAt(p + stepSun * (tower ? 0.105 : 0.16), shape) * 0.86;
      if (uShadowSteps > 1) shadow += densityAt(p + stepSun * 0.39, shape) * 0.52;
      if (uShadowSteps > 2) shadow += densityAt(p + stepSun * 0.72, shape) * 0.31;
      float direct = exp2(-shadow * 2.65);
      float rise = smoothstep(-0.73, 0.72, p.y);
      float bounce = 0.08;
      if (lowCap > 0.0) {
        float folds = sin(p.x * 5.4 + p.z * 2.5) * sin(p.z * 4.4 - p.x * 1.8);
        float side = smoothstep(-0.7, 0.74, dot(p.xz, vec2(0.64, -0.77)));
        bounce = mix(bounce, 0.05 + (0.16 * side + 0.21 * smoothstep(-0.66, 0.76, folds)) * (1.0 - rise), lowCap);
      }
      float lit = clamp(bounce + 0.35 * rise + (0.55 + 0.21 * rise) * direct, 0.0, 1.0);
      if (tower) {
        float underside = smoothstep(-0.88, -0.24, p.y);
        float crown = smoothstep(0.50, 0.82, p.y);
        lit = (0.15 + 0.65 * direct + 0.21 * crown) * mix(0.42, 0.80 + 0.20 * crown, underside);
      }
      float edgeLight = glare * direct * (1.0 - d) * (1.0 + 1.20 * uTwilight);
      vec3 color = cloudLight(lit, storm, edgeLight);
      if (tower && uStormFlash.w > 0.0) {
        color += stormGlow(uEye + worldRay * t) * (0.65 + 0.35 * d);
      }
      color += vec3(0.16, 0.062, 0.024) * uTwilight * rise * direct * (1.0 - storm);
      if (interior > 0.01) {
        // Follow the sun to the upper part of the volume. Openings illuminate long paths in the mist.
        vec2 aperture = p.xz + stepSun.xz * (0.56 - p.y) / max(0.20, stepSun.y);
        float first = 1.0 - smoothstep(0.012, 0.135, abs(aperture.y - 0.31 * aperture.x + 0.76));
        float second = 1.0 - smoothstep(0.016, 0.098, abs(aperture.y + 0.16 * aperture.x + 0.52));
        float shafts = (first * 0.82 + second * 0.58) * (0.38 + 0.62 * direct);
        float curl = sin(3.7 * p.z - 1.7 * p.x);
        float bank = 1.0 - smoothstep(0.023, 0.19, abs(p.y + 0.25 + 0.19 * curl + 0.42 * p.x));
        float veil = 1.0 - smoothstep(0.018, 0.15, abs(p.y - 0.22 - 0.33 * p.x + 0.12 * curl));
        float scatter = clamp(direct + bank * 0.61 + veil * 0.57, 0.0, 1.0);
        vec3 multipleScatter = mix(vec3(0.47, 0.56, 0.71), vec3(0.98, 0.98, 0.97), scatter);
        color = mix(color, multipleScatter, interior * 0.79);
        color += shafts * interior * vec3(0.58, 0.49, 0.37);
      }
      float clear = smoothstep(uNearClear, uNearClear + 12.0, t);
      float a = 1.0 - exp2(-stride * d * extinction * clear);
      float weight = (1.0 - acc.a) * a;
      acc += weight * vec4(color, 1.0);
      moment += weight * t;
    }
    t += stride;
  }
  if (acc.a > 0.007 && interior < 0.01) {
    float luma = dot(acc.rgb, vec3(0.2126, 0.7152, 0.0722)) / acc.a;
    float contour = smoothstep(0.052, 0.86, acc.a);
    float scale = mix(1.0, contour / acc.a, 0.76 * smoothstep(0.47, 0.87, luma));
    acc *= scale;
    moment *= scale;
  }
  return acc;
}

void main() {
  vec3 ray = normalize(worldAt(vUv, 1.0) - uEye);
  float depth = texture(uDepth, vUv).r;
  float limit = sceneLimit(depth);
  vec3 pixel = fract(gl_FragCoord.xyx * vec3(0.1031, 0.11369, 0.13787));
  pixel += dot(pixel, pixel.yzx + 19.19);
  float noise = mix(0.465, 0.535, fract((pixel.x + pixel.y) * pixel.z + uJitter));
  float glare = pow(max(0.0, dot(ray, uSun)), 6.0);
  cloud = vec4(0.0);
  float totalMoment = 0.0;
  for (int i = 0; i < ${T}; i++) {
    if (i >= uCount || cloud.a > 0.993) break;
    vec3 size = uExtentOpacity[i].xyz;
    float shape = uCenterShape[i].w, storm = uStormLod[i].x;
    bool tower = shape == ${G}.0;
    vec2 heading = uStormLod[i].zw;
    vec3 offset = uEye - uCenterShape[i].xyz;
    vec3 eye = (tower ? toCloudFrame(offset, heading) : offset) / size;
    vec3 localRay = (tower ? toCloudFrame(ray, heading) : ray) / size;
    vec3 inv = 1.0 / mix(vec3(1e-7), localRay, greaterThan(abs(localRay), vec3(1e-7)));
    vec3 a = (-1.0 - eye) * inv, b = (1.0 - eye) * inv;
    vec3 entry = min(a, b), exit = max(a, b);
    float first = max(0.0, max(entry.x, max(entry.y, entry.z)));
    float last = min(limit, min(exit.x, min(exit.y, exit.z)));
    if (last <= first) continue;
    float strength = uExtentOpacity[i].w, lod = uStormLod[i].y;
    float moment = 0.0;
    vec4 contribution = vec4(0.0);
    if (lod < 0.999) {
      vec3 sun = uNight > 0.8 ? vec3(0.4, 0.8, -0.3) : uSun;
      vec3 stepSun = normalize((tower ? toCloudFrame(sun, heading) : sun) / size);
      contribution = integrate(eye, localRay, ray, stepSun, size, vec2(first, last), shape, strength, storm, glare, noise, moment);
    }
    if (lod > 0.001) {
      vec4 card = sampleAtlas(eye, localRay, shape, storm, glare);
      float plane = clamp(-dot(eye, localRay) / dot(localRay, localRay), first, last);
      if (tower && uStormFlash.w > 0.0) card.rgb += card.a * stormGlow(uEye + ray * plane);
      float air = smoothstep(1300.0, 8200.0, plane) * (1.0 - uNight) * (1.0 - storm);
      vec3 airColor = mix(vec3(0.55, 0.70, 0.86), vec3(0.82, 0.53, 0.46), uTwilight);
      card.rgb = mix(card.rgb, card.a * airColor, air * 0.62);
      card *= strength * smoothstep(first, first + 0.35 * length(size), last);
      moment = mix(moment, card.a * plane, lod);
      contribution = mix(contribution, card, lod);
    }
    totalMoment += (1.0 - cloud.a) * moment;
    cloud += (1.0 - cloud.a) * contribution;
  }
  float cloudDistance = totalMoment / max(0.0001, cloud.a);
  if (uStormMist.w > 0.0) {
    float mist = uStormMist.w * (1.0 - exp2(-cloudDistance * 0.008));
    cloud.rgb = mix(cloud.rgb, cloud.a * uStormMist.rgb, mist);
  }
  float groundShade = 0.0;
  if (depth < 1.0 && limit < 2900.0 && uCasterCount > 0) {
    groundShade = surfaceShadow(uEye + ray * limit) * (1.0 - smoothstep(2200.0, 2900.0, limit));
  }
  guide = vec4(encoded(cloudDistance), sceneGuide(depth), groundShade, 1.0);
  if (!uReuse || cloud.a < 0.008) return;
  vec3 point = uEye + ray * cloudDistance;
  vec4 oldClip = uPreviousClipFromWorld * vec4(point, 1.0);
  if (oldClip.w <= 0.0) return;
  vec2 oldUv = oldClip.xy / oldClip.w * 0.5 + 0.5;
  if (any(lessThan(oldUv, vec2(0.001))) || any(greaterThan(oldUv, vec2(0.999)))) return;
  vec2 oldGuide = texture(uHistoryGuide, oldUv).rg;
  vec4 history = texture(uHistory, oldUv);
  float delta = abs(oldGuide.x - encoded(distance(point, uPreviousEye)));
  float trust = 1.0 - smoothstep(0.009, 0.036, delta);
  trust *= 1.0 - smoothstep(0.011, 0.045, abs(oldGuide.y - guide.y));
  trust *= 1.0 - smoothstep(0.075, 0.31, abs(history.a - cloud.a));
  cloud = mix(cloud, history, trust * mix(0.62, 0.79, smoothstep(0.33, 0.96, cloud.a)));
}
`,vt=`
#define DETAILED_NIGHT_SKY
${mt}
uniform vec3 uSkyAnchor;
uniform float uTime;

float wisp(vec2 p, float bend) {
  float envelope = 1.0 - smoothstep(0.12, 1.0, abs(p.x));
  float curve = bend * (0.45 * sin(p.x * 3.1) + 0.09 * sin(p.x * 9.0));
  float ribbon = 1.0 - smoothstep(0.10, 0.95, abs(p.y - curve) / max(0.06, envelope));
  float fibers = 0.76 + 0.24 * sin(p.x * 17.0 + p.y * 6.0);
  return ribbon * fibers * envelope;
}
float domeMist(vec3 ray) {
  return uStormMist.w * (1.0 - 0.5 * smoothstep(0.0, 0.65, ray.y));
}

vec3 dome(vec3 ray) {
  float height = max(0.0, ray.y);
  float sunDot = max(0.0, dot(ray, uSun));
  vec3 horizon = mix(vec3(0.53, 0.76, 0.93), vec3(0.47, 0.64, 0.85), uTwilight);
  horizon = mix(horizon, vec3(1.00, 0.67, 0.39), uTwilight * sunDot * sunDot);
  vec3 zenith = mix(vec3(0.039, 0.22, 0.63), vec3(0.075, 0.23, 0.54), uTwilight);
  horizon = mix(horizon, mix(vec3(0.75, 0.49, 0.31), vec3(1.0, 0.57, 0.22), sunDot), uEvening);
  zenith = mix(zenith, vec3(0.15, 0.36, 0.64), uEvening);
  vec3 color = mix(horizon, zenith, pow(smoothstep(0.0, mix(0.62, 0.47, uTwilight), height), 0.63));
  if (uNight > 0.0) {
    color = mix(color, nightGradient(height), uNight);
    color += moonGlow(ray) * uNight * uNight;
  }
  float sun = 1.0 - smoothstep(0.012, 0.016, length(ray - uSun));
  color += (1.0 - uNight) * (sun * vec3(1.0, 0.89, 0.65)
    + pow(sunDot, 19.0) * mix(vec3(0.11, 0.09, 0.04), vec3(0.39, 0.20, 0.06), uTwilight)
    + pow(sunDot, 370.0) * vec3(0.28, 0.16, 0.06));
  if (uTwilight > 0.02 && height > 0.035) {
    vec3 p = uEye - uSkyAnchor + ray * ((uSkyAnchor.y + 1280.0 - uEye.y) / height);
    p.z += uTime * 0.65;
    float first = wisp(vec2((p.z + 1590.0) / 610.0, (p.x - 3230.0 - p.z * 0.35) / 227.0), 0.84);
    float tail = wisp(vec2((p.z + 510.0) / 395.0, (p.x - 3140.0 - p.z * 0.35) / 130.0), 0.68);
    float second = wisp(vec2((p.z - 990.0) / 1050.0, (p.x - 5210.0 + p.z * 0.26) / 98.0), -0.89);
    float thread = wisp(vec2((p.z - 145.0) / 500.0, (p.x - 3690.0 + p.z * 0.09) / 119.0), 0.82);
    float wisps = max(max(first, tail * 0.81), max(second, thread * 0.69));
    color = mix(color, mix(vec3(0.77, 0.48, 0.49), vec3(1.0, 0.72, 0.47), sunDot), wisps * uTwilight * 0.61);
  }
  return mix(color, uStormMist.rgb, domeMist(ray));
}
`,Jt=`
in vec2 vUv;
out vec4 outputColor;
#define gl_FragColor outputColor
${J}
${K}
${vt}
void main() {
  // Start alpha at zero so scene blending records the coverage in front of the dome.
  gl_FragColor = vec4(dome(normalize(worldAt(vUv, 1.0) - uEye)), 0.0);
  #include <colorspace_fragment>
}
`,Kt=`
in vec2 vUv;
out vec4 outputColor;
#define gl_FragColor outputColor
${J}
${K}
${vt}
uniform sampler2D uScene, uCloud, uGuide;
uniform bool uSceneHasDome;
uniform vec4 uAdditiveBackground;
vec4 depthUpsample(float sceneDistance, inout float groundShade) {
  ivec2 dimensions = textureSize(uCloud, 0);
  vec2 p = vUv * vec2(dimensions) - 0.5;
  ivec2 start = ivec2(floor(p));
  vec2 f = fract(p);
  vec4 color = vec4(0.0);
  float total = 0.0;
  float shade = 0.0;
  for (int y = 0; y < 2; y++) {
    for (int x = 0; x < 2; x++) {
      ivec2 coord = clamp(start + ivec2(x, y), ivec2(0), dimensions - 1);
      vec2 guide = texelFetch(uGuide, coord, 0).gb;
      float bilinear = (x == 0 ? 1.0 - f.x : f.x) * (y == 0 ? 1.0 - f.y : f.y);
      float weight = bilinear * (1.0 - smoothstep(0.008, 0.042, abs(sceneDistance - guide.x)));
      color += texelFetch(uCloud, coord, 0) * weight;
      shade += guide.y * weight;
      total += weight;
    }
  }
  groundShade = shade / max(total, 0.065);
  return color / max(total, 0.065);
}

void main() {
  float depth = texture(uDepth, vUv).r;
  vec4 cloud = texture(uCloud, vUv);
  vec2 guide = texture(uGuide, vUv).gb;
  float shade = depth < 1.0 ? guide.y : 0.0;
  if (cloud.a > 0.0 || shade > 0.0) {
    float limit = sceneGuide(depth);
    // Most pixels have smooth scene depth. Gather individually at silhouettes and disocclusions.
    if (limit < 0.89 && abs(guide.x - limit) > 0.004) cloud = depthUpsample(limit, shade);
  }
  vec3 background;
  if (depth < 1.0) {
    background = texture(uScene, vUv).rgb;
  } else {
    vec3 ray = normalize(worldAt(vUv, 1.0) - uEye);
    vec4 sky = uSceneHasDome ? texture(uScene, vUv) : vec4(dome(ray), 0.0);
    background = sky.rgb;
    // Rain blends into the scene's alpha. Thin volumetric cloud scatters point sources.
    float visibility = clamp(1.0 - sky.a, 0.0, 1.0) * (1.0 - smoothstep(0.025, 0.20, cloud.a));
    if (uNight > 0.0 && visibility > 0.0) {
      background += nightStars(ray, 132.0, uTime) * (uNight * uNight * visibility * (1.0 - domeMist(ray)));
    }
    // Carry additive light from the flat scene background into the procedural sky.
    if (uAdditiveBackground.w > 0.0) {
      background += max(vec3(0.0), texture(uScene, vUv).rgb - uAdditiveBackground.rgb);
    }
  }
  background *= 1.0 - shade * vec3(1.0, 0.85, 0.70);
  gl_FragColor = vec4(background * (1.0 - cloud.a) + cloud.rgb, 1.0);
  #include <colorspace_fragment>
}
`;function U(h,t){return new ct({glslVersion:ut,vertexShader:Ot,fragmentShader:h,uniforms:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}function it(){return new Y(1,1,{count:2,depthBuffer:!1,minFilter:L,magFilter:L})}class Zt{constructor(t,s){this.renderer=t,this.manifests=s,this.passScene.name="Sky",this.field=new ot(1,s),this.gl=t.getContext(),this.timer=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this.triangle.geometry.setAttribute("position",new rt([-1,-1,0,3,-1,0,-1,3,0],3)),this.triangle.frustumCulled=!1,this.passScene.add(this.triangle),this.autoReset=t.info.autoReset,t.info.autoReset=!1,t.domElement.addEventListener("webglcontextrestored",this.restoreContext)}renderer;manifests;field;cloudSamples=[];cloudRefresh;horizon=new A;daylight={sun:new b,moon:new b,twilight:0,night:0};sceneColor=new Y(1,1,{depthTexture:new Et(1,1,At),samples:2});history=[it(),it()];atlas=new Y(512,144*ht,{depthBuffer:!1,minFilter:L,magFilter:L});density;atlasMaterial=U(Xt,{uDensity:{value:null}});passScene=new Ft;passCamera=new Dt;triangle=new nt(new lt,new Rt);autoReset;outputSize=new I;cloudSize=new I;frustum=new Ht;bounds=new Gt;center=new b;extent=new b;worldFromClip=new W;clipFromWorld=new W;lastClipFromWorld=new W;lastEye=new b;lastForward=new b;forward=new b;anchor=new b;centers=Array.from({length:T},()=>new S);extents=Array.from({length:T},()=>new S);stormLod=Array.from({length:T},()=>new S);stormFlash=new S;stormMist=new S;flashed=!1;casterCenters=Array.from({length:F},()=>new S);casterExtents=Array.from({length:F},()=>new S);common={uWorldFromClip:{value:this.worldFromClip},uEye:{value:new b},uDepth:{value:this.sceneColor.depthTexture},uSun:{value:this.daylight.sun},uCameraPlanes:{value:new I},uTwilight:{value:0},uNight:{value:0},uEvening:{value:0},uStormMist:{value:this.stormMist}};clouds=U(Yt,{...this.common,uDensity:{value:this.density},uAtlas:{value:this.atlas.texture},uCenterShape:{value:this.centers},uExtentOpacity:{value:this.extents},uStormLod:{value:this.stormLod},uStormFlash:{value:this.stormFlash},uCasterCenter:{value:this.casterCenters},uCasterExtent:{value:this.casterExtents},uCasterCount:{value:0},uHistory:{value:null},uHistoryGuide:{value:null},uPreviousClipFromWorld:{value:this.lastClipFromWorld},uPreviousEye:{value:this.lastEye},uReuse:{value:!1},uJitter:{value:0},uNearClear:{value:0},uCount:{value:0},uSteps:{value:0},uShadowSteps:{value:0}});domeLight={uMoon:{value:this.daylight.moon},uTime:{value:0},uSkyAnchor:{value:this.anchor},uStarPixelAngle:{value:0}};dome=U(Jt,{...this.common,...this.domeLight});composite=U(Kt,{...this.common,...this.domeLight,uScene:{value:this.sceneColor.texture},uCloud:{value:null},uGuide:{value:null},uSceneHasDome:{value:!1},uAdditiveBackground:{value:new S(0,0,0,0)}});gl;timer;timings={clouds:[],composite:[]};totals=[];queries=[];cloudTiming;quality;frame=0;lastHour=NaN;lastTime=-1/0;lastRequestedHour=NaN;atlasReady=!1;warmup=8;restoreContext=()=>{this.atlasReady=!1,this.timer=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this.resetHistory()};prepareShaders(){this.prepareDensity();const t=this.triangle.material,s=this.renderer.getRenderTarget();try{for(const[o,e]of[[this.dome,this.sceneColor],[this.atlasMaterial,this.atlas],[this.clouds,this.history[0]],[this.composite,s],[this.composite,null]])this.triangle.material=o,this.renderer.setRenderTarget(e),this.renderer.compile(this.passScene,this.passCamera)}finally{this.triangle.material=t,this.renderer.setRenderTarget(s)}}dispose(){this.renderer.domElement.removeEventListener("webglcontextrestored",this.restoreContext),this.renderer.info.autoReset=this.autoReset,this.resetHistory(),this.sceneColor.dispose();for(const t of this.history)t.dispose();this.atlas.dispose(),this.density?.dispose(),this.atlasMaterial.dispose(),this.triangle.geometry.dispose(),this.clouds.dispose(),this.dome.dispose(),this.composite.dispose()}setSeed(t){this.field=new ot(t,this.manifests),this.cloudRefresh=void 0,this.lastRequestedHour=NaN,this.resetHistory()}resetHistory(){this.lastTime=-1/0,this.warmup=8;for(const{query:t}of this.queries)this.gl.deleteQuery(t);this.queries.length=this.timings.clouds.length=this.timings.composite.length=this.totals.length=0,this.cloudTiming=void 0}updateLight(t,s){const o=this.field.air.weather.clock;if(o.advance(Math.max(0,t-o.elapsedSeconds)),s!==this.lastRequestedHour){const{hour:r}=o.clockAt();o.setHour(s),this.lastRequestedHour=s,Math.abs(r-s)>.2&&this.resetHistory()}const{hour:e}=o.clockAt(),a=Wt(e,this.daylight.sun);Bt(e,this.daylight.moon),this.daylight.night=this.common.uNight.value=1-_.smoothstep(a,-.13,.04),this.daylight.twilight=this.common.uTwilight.value=(1-_.smoothstep(a,.09,.63))*(1-this.daylight.night);const l=this.common.uEvening.value=jt(e)*(1-this.daylight.night);this.horizon.setRGB(.53,.76,.93).lerp(this.sunsetColor,this.daylight.twilight).lerp(this.eveningFog,l).lerp(this.nightColor,this.daylight.night),this.currentHour=e}currentHour=10;get night(){return this.daylight.night}suspend(){this.sceneColor.setSize(1,1);for(const t of this.history)t.setSize(1,1);this.resetHistory()}sunsetColor=new A().setRGB(.47,.64,.85);eveningFog=new A().setRGB(.67,.45,.34);nightColor=new A().setRGB(.019,.033,.077);sampleClouds(t,s,o){const e=o?1/0:performance.now()+1.25;for(o&&(this.cloudRefresh=void 0),this.cloudRefresh??=this.field.sampleClouds(t,s);performance.now()<e;){const a=this.cloudRefresh.next();if(a.done){this.cloudSamples=a.value,this.cloudRefresh=void 0;break}}}render(t,s,o,e,a,l){const r=this.renderer;this.quality!==a&&(this.quality=a,this.resetHistory());const i=r.getRenderTarget();if(i?this.outputSize.set(i.width,i.height):r.getDrawingBufferSize(this.outputSize),this.domeLight.uStarPixelAngle.value=2/(s.projectionMatrix.elements[5]*Math.max(1,this.outputSize.y)),i?.texture.type===V&&this.sceneColor.texture.type!==V){this.sceneColor.dispose(),this.sceneColor.texture.type=V;const E=this.gl.getInternalformatParameter(this.gl.RENDERBUFFER,this.gl.RGBA16F,this.gl.SAMPLES);this.sceneColor.samples=E.some(R=>R>=2)?2:0}const n=Math.min(1,a.height/Math.max(1,this.outputSize.y),a.height*2/Math.max(1,this.outputSize.x));if(this.cloudSize.set(Math.max(1,Math.floor(this.outputSize.x*n)),Math.max(1,Math.floor(this.outputSize.y*n))),this.sceneColor.setSize(this.outputSize.x,this.outputSize.y),this.history[0].width!==this.cloudSize.x||this.history[0].height!==this.cloudSize.y){for(const E of this.history)E.setSize(this.cloudSize.x,this.cloudSize.y);this.resetHistory()}r.info.reset(),this.atlasReady||(this.prepareDensity(),this.pass(this.atlasMaterial,this.atlas),this.atlasReady=!0),s.updateMatrixWorld(),this.worldFromClip.multiplyMatrices(s.matrixWorld,s.projectionMatrixInverse),this.clipFromWorld.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.clipFromWorld),this.common.uCameraPlanes.value.set(s.near,s.far);const u=this.common.uEye.value.copy(s.position);s.getWorldDirection(this.forward);const c=this.clouds.uniforms,d=$.get(t);this.stormMist.fromArray(d?.mist??St);const p=d?.flash;if(p){const{position:{x:E,y:R,z:q},power:Q}=p;this.stormFlash.set(E,R,-q,Q)}else this.stormFlash.w=0;c.uCount.value=this.selectClouds(u,a.near,a.far),c.uNearClear.value=_.clamp(u.distanceTo(e)-2,0,10),c.uSteps.value=a.steps,c.uShadowSteps.value=a.shadows,c.uJitter.value=this.frame%8*.61803399,c.uReuse.value=!p&&!this.flashed&&o>=this.lastTime&&o-this.lastTime<.22&&u.distanceToSquared(this.lastEye)<30**2&&this.forward.dot(this.lastForward)>.94&&Math.abs(this.currentHour-this.lastHour)<.1;const m=this.history[this.frame%2],g=this.history[(this.frame+1)%2];c.uHistory.value=g.textures[0],c.uHistoryGuide.value=g.textures[1],this.composite.uniforms.uCloud.value=m.textures[0],this.composite.uniforms.uGuide.value=m.textures[1],this.domeLight.uTime.value=o;const{x:y,y:x,z:v}=this.field.anchor;this.anchor.set(y,x,-v);const w=d?.precipitation??!1;this.composite.uniforms.uSceneHasDome.value=w,et.delete(t),r.setRenderTarget(this.sceneColor),w?this.renderThroughDome(t,s):r.render(t,s);const D=et.delete(t),z=t.background,P=this.composite.uniforms.uAdditiveBackground.value;D&&!w&&z instanceof A?P.set(z.r,z.g,z.b,1):P.w=0,this.collectTimings();const j=this.timer&&this.gl.getQuery(this.timer.TIME_ELAPSED_EXT,this.gl.CURRENT_QUERY);this.warmup>0||j||this.queries.length>14?(this.warmup=Math.max(0,this.warmup-1),this.pass(this.clouds,m),this.pass(this.composite,i,l)):(this.measure("clouds",this.clouds,m),this.measure("composite",this.composite,i,l)),this.lastClipFromWorld.copy(this.clipFromWorld),this.lastEye.copy(u),this.lastForward.copy(this.forward),this.lastHour=this.currentHour,this.lastTime=o,this.flashed=!!p,this.frame++}prepareDensity(){return this.density??=qt(),this.atlasMaterial.uniforms.uDensity.value=this.density,this.density}renderThroughDome(t,s){const{renderer:o}=this,{autoClear:e}=o,{background:a}=t;o.autoClear=!1,t.background=null;try{o.clear(),this.pass(this.dome,this.sceneColor),o.render(t,s)}finally{t.background=a,o.autoClear=e}}perf(){this.collectTimings();const t=[...this.totals].sort((e,a)=>e-a),s=(e,a)=>e[Math.ceil(e.length*a)-1]??null,o=e=>s([...e].sort((a,l)=>a-l),.95);return{preset:this.quality?.name,width:this.cloudSize.x,height:this.cloudSize.y,volumesInView:this.clouds.uniforms.uCount.value,gpuTimer:this.timer!==null,gpuSamples:this.timings.clouds.length,cloudsGpuMsP95:o(this.timings.clouds),compositeGpuMsP95:o(this.timings.composite),skyGpuMsMedian:s(t,.5),skyGpuMsP95:s(t,.95)}}at(t,s,o){let e=null;for(const{id:a,center:l,bounds:r,opacity:i,shape:n,heading:u}of this.field.cloudsAt(s,o)){const c=t.x-l.x,d=l.z-t.z,p=u?c*u.x-d*u.z:c,m=u?c*u.z+d*u.x:d,g=i*Qt(this.prepareDensity(),n,p/r.x,(t.y-l.y)/r.y,m/r.z);g>(e?.density??.015)&&(e={id:a,density:g})}return e}selectClouds(t,s,o){const e=this.cloudSamples,a=this.daylight.sun.y>.07?e.filter(({center:i,heading:n})=>!n&&i.y<510&&Math.hypot(i.x-t.x,i.z+t.z)<1900).sort((i,n)=>Math.hypot(i.center.x-t.x,i.center.z+t.z)-Math.hypot(n.center.x-t.x,n.center.z+t.z)).slice(0,F):[];for(const[i,{center:n,bounds:u,opacity:c,shape:d}]of a.entries())this.casterCenters[i].set(n.x,n.y,-n.z,d),this.casterExtents[i].set(u.x,u.y,u.z,c);this.clouds.uniforms.uCasterCount.value=a.length;const l=e.flatMap(i=>{if(this.center.set(i.center.x,i.baseHeight+i.bounds.y,-i.center.z),this.extent.set(i.bounds.x,i.bounds.y,i.bounds.z),i.heading){const n=Math.abs(i.heading.x),u=Math.abs(i.heading.z);this.extent.set(n*i.bounds.x+u*i.bounds.z,i.bounds.y,u*i.bounds.x+n*i.bounds.z)}return this.bounds.min.copy(this.center).sub(this.extent),this.bounds.max.copy(this.center).add(this.extent),this.frustum.intersectsBox(this.bounds)?[{cloud:i,distance:this.bounds.distanceToPoint(t)}]:[]});l.sort((i,n)=>i.distance-n.distance);const r=Math.min(T,l.length);for(let i=0;i<r;i++){const{cloud:n,distance:u}=l[i];this.centers[i].set(n.center.x,n.baseHeight+n.bounds.y,-n.center.z,n.shape),this.extents[i].set(n.bounds.x,n.bounds.y,n.bounds.z,n.opacity);const c=n.shape===G,d=c?Math.hypot(n.center.x-t.x,n.center.z+t.z):u;this.stormLod[i].set(n.storm,_.smoothstep(d,c?3250:s,c?4e3:o),n.heading?.x??1,-(n.heading?.z??0))}return r}pass(t,s,o){this.triangle.material!==t&&(this.triangle.material=t),this.renderer.setRenderTarget(s),o?o(this.passScene,this.passCamera):this.renderer.render(this.passScene,this.passCamera)}measure(t,s,o,e){const a=this.timer,l=a?this.gl.createQuery():null;if(!l||!a){this.pass(s,o,e);return}this.gl.beginQuery(a.TIME_ELAPSED_EXT,l),this.pass(s,o,e),this.gl.endQuery(a.TIME_ELAPSED_EXT),this.queries.push({name:t,query:l,frame:this.frame})}collectTimings(){if(this.timer){if(this.gl.getParameter(this.timer.GPU_DISJOINT_EXT)){for(const{query:t}of this.queries)this.gl.deleteQuery(t);this.queries.length=0,this.cloudTiming=void 0;return}for(;this.queries.length;){const{name:t,query:s,frame:o}=this.queries[0];if(!this.gl.getQueryParameter(s,this.gl.QUERY_RESULT_AVAILABLE))break;const e=this.timings[t],a=this.gl.getQueryParameter(s,this.gl.QUERY_RESULT)/1e6;e.push(a),e.length>120&&e.shift(),t==="clouds"?this.cloudTiming={frame:o,ms:a}:this.cloudTiming?.frame===o&&(this.totals.push(this.cloudTiming.ms+a),this.totals.length>120&&this.totals.shift()),this.gl.deleteQuery(s),this.queries.shift()}}}}const te=""+new URL("sky_cloud_cumulus_01-CXWx1xUo.png",import.meta.url).href,ee=`
out vec2 vClip;
void main() {
  vClip = position.xy;
  gl_Position = vec4(vClip, 1.0, 1.0);
}
`,se=`
in vec2 vClip;
out vec4 outputColor;
#define gl_FragColor outputColor
uniform mat4 uClipToView;
uniform vec3 uHorizon;
uniform float uNight, uStarGrid;
${mt}
void main() {
  vec3 ray = normalize(transpose(mat3(viewMatrix)) * (uClipToView * vec4(vClip, 0.0, 1.0)).xyz);
  vec3 color = mix(uHorizon, nightGradient(ray.y), uNight);
  color += (nightStars(ray, uStarGrid, 0.0) + moonGlow(ray)) * uNight * uNight;
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;function oe(){const h=new lt;h.setAttribute("position",new rt([-1,-1,0,3,-1,0,-1,3,0],3));const t=new ct({glslVersion:ut,vertexShader:ee,fragmentShader:se,depthWrite:!1,toneMapped:!1,uniforms:{uClipToView:{value:new W},uHorizon:{value:new A},uMoon:{value:new b},uNight:{value:0},uStarGrid:{value:76},uStarPixelAngle:{value:0}}}),s=new nt(h,t);return s.name="Night sky behind painted cards",s.frustumCulled=!1,s.renderOrder=1e3,s}class at{constructor(t,s){this.scene=t,this.renderer=s,this.texture.colorSpace=Lt;const o=new Pt;for(let e=0;e<this.cards.count;e++){const a=e*Math.PI*2/this.cards.count,l=5650+720*Math.sin(e*8.7);o.position.set(Math.sin(a)*l,420+470*(.5+.5*Math.sin(e*4.9)),Math.cos(a)*l),o.lookAt(0,0,0);const r=1200+1200*(.5+.5*Math.cos(e*3.2));o.scale.set(r,r*.36,1),o.updateMatrix(),this.cards.setMatrixAt(e,o.matrix)}this.cards.name="Painted sky cards",this.cards.visible=!1,this.cards.frustumCulled=!1,t.add(this.cards)}scene;renderer;size=new I;backdrop;texture=new _t().load(te);material=new Nt({map:this.texture,color:16777215,transparent:!0,opacity:.82,depthWrite:!1,fog:!1,toneMapped:!1});nightCloud=new A().setRGB(.065,.088,.14);cards=new Ut(new $t(1,1),this.material,14);get visible(){return this.cards.visible}prepareShaders(t,s,o){s.compile(this.cards,t,o)}draw(t,s,o,e,a){if(this.cards.visible=!0,this.cards.position.copy(t.position),this.material.color.setRGB(1,1,1).lerp(s,.18),this.material.opacity=.84+.16*e,e<=0){this.backdrop?.removeFromParent();return}this.material.color.lerp(this.nightCloud,e);const l=this.backdrop??=oe();l.parent||this.scene.add(l);const r=l.material.uniforms;this.renderer.getDrawingBufferSize(this.size),r.uClipToView.value.copy(t.projectionMatrixInverse),r.uHorizon.value.copy(s),r.uMoon.value.copy(o),r.uNight.value=e,r.uStarGrid.value=a?45:76,r.uStarPixelAngle.value=2/(t.projectionMatrix.elements[5]*Math.max(1,this.size.y))}hide(){this.cards.visible=!1,this.backdrop?.removeFromParent()}dispose(){this.backdrop?.removeFromParent(),this.backdrop?.geometry.dispose(),this.backdrop?.material.dispose(),this.cards.removeFromParent(),this.cards.geometry.dispose(),this.material.dispose(),this.texture.dispose(),this.cards.dispose()}}const B={"sky-noon-harbour":{hour:12.5,heading:1.59,rise:10,distance:34,offset:{x:-23,y:43,z:1}},"sky-sunset-nest":{hour:20.65,heading:1.53,rise:10,distance:33,offset:{x:-21,y:57,z:-17}},"sky-inside-cloud":{hour:12.5,heading:4.6,rise:-2,distance:14,offset:{x:-29,y:-19,z:97}},"sky-under-cap":{hour:12.5,heading:1.25,rise:32,distance:40,offset:{x:-115,y:-60,z:-36}}};function ie(h,t,s){const{offset:o}=B[h];let e=t.anchor;if(h==="sky-inside-cloud"||h==="sky-under-cap"){const a=t.cloudsAt(s),r=(h==="sky-under-cap"?a.find(i=>i.id.endsWith("/thermal0001")):a[0])??a[0];e=h==="sky-under-cap"?{...r.center,y:r.baseHeight}:r.center}return{x:e.x+o.x,y:e.y+o.y,z:e.z+o.z}}function ae(h,t,s){const{rise:o,distance:e}=B[h],a=Math.sin(s),l=Math.cos(s);return{position:{x:t.x-a*e,y:t.y+7,z:t.z-l*e},target:{x:t.x+a*55,y:t.y+o,z:t.z+l*55},fov:60}}const X=({x:h,y:t,z:s})=>new b(h,t,-s),ge={layer:"sky",create(h,{renderer:t,islands:s,horizon:o}){const e=new Zt(t,s);let a,l;return{prepareShaders(r,i,n){n.clouds==="cards"?(a??=new at(h,i),a.prepareShaders(r,i,h)):e.prepareShaders()},connect({sim:r,registrations:i,preview:n,takeOff:u,refresh:c,setHour:d}){const p=n?n.shot??"sky-noon-harbour":void 0;for(const m of Object.keys(B))i.screens.set(m,()=>{const{hour:g,heading:y}=B[m],x=r.state.tick*st;d(g),e.updateLight(x,g),u(),r.state.target=null;const v=ie(m,e.field,x),{position:w,target:D,fov:z}=ae(m,v,y);l={id:m,gull:X(v),eye:X(w),target:X(D),fov:z},r.teleport(v,y),e.resetHistory(),c()});{const m=()=>r.state.tick*st;i.state.set("clouds",()=>e.field.cloudsAt(m(),$.get(h))),i.state.set("cloudAtGull",()=>e.at(r.state.gull.position,m(),$.get(h)))}return p},reset(r){l=void 0,e.setSeed(r)},update({seconds:r,camera:i,gullPosition:n,hour:u,screen:c,quality:d,fixedView:p}){l&&(c!==l.id||n.distanceToSquared(l.gull)>64)&&(l=void 0),l&&(i.position.copy(l.eye),i.lookAt(l.target),i.fov!==l.fov&&(i.fov=l.fov,i.updateProjectionMatrix())),e.updateLight(r,u),d.clouds!=="cards"&&e.sampleClouds(r,$.get(h),!!(p||l)),h.fog?.color.copy(e.horizon),o.copy(e.horizon)},render(r,{camera:i,seconds:n,gullPosition:u,quality:c},d){c.clouds==="cards"?(a??=new at(r,t),a.visible||e.suspend(),a.draw(i,e.horizon,e.daylight.moon,e.night,c.name==="potato"),t.info.reset(),d(r,i)):(a?.hide(),e.render(r,i,n,u,c.clouds,d))},perf:()=>({sky:a?.visible?{preset:"cards",width:0,height:0}:e.perf()}),dispose(){a?.dispose(),e.dispose()}}}};export{ge as effect};
