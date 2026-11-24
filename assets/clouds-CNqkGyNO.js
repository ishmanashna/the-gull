import{D as ct,R as ut,U as dt,L as D,C as mt,W as pt,A as ft,s as gt,m as yt,a as vt,F as xt,b as _,V as z,c as Q,d as wt,e as zt,S as St,f as bt,M as Ct,B as Mt,g as Tt,h as q,i as Et,j as kt,k as W,l as k,n as H,H as B,o as Ft,G as At,p as K}from"./index-qmOD1jXO.js";import{s as L,a as Rt,b as O,c as Dt}from"./storm-cloud-CgEFPEzC.js";const R=[[[-.08,-.54,.08,.88,.52,.87],[-.23,-.1,-.42,.57,.59,.34],[.08,.25,.07,.62,.69,.42],[-.31,.02,.55,.48,.57,.35],[.56,-.23,.41,.34,.52,.42],[-.34,.49,.2,.25,.32,.22],[.2,.5,-.19,.26,.29,.18],[.18,.19,.65,.26,.25,.21],[-.45,.09,-.58,.22,.3,.23],[.39,.57,.13,.23,.31,.22],[-.2,.41,-.39,.22,.31,.23]],[[.04,-.54,0,.88,.52,.94],[-.21,.01,-.62,.5,.48,.31],[.17,.29,-.22,.55,.64,.37],[-.18,.03,.24,.56,.52,.35],[.13,-.22,.67,.45,.42,.28],[-.31,.26,-.64,.24,.25,.22],[-.12,.47,-.33,.24,.29,.24],[.34,.32,.3,.25,.29,.21],[.48,.53,-.09,.23,.28,.21],[-.21,.37,.42,.21,.33,.25]],[[.02,-.33,.02,.82,.53,.73],[.16,.22,.02,.63,.65,.53],[-.45,-.22,.34,.45,.62,.4],[.37,-.24,-.42,.54,.59,.46],[.04,-.19,.59,.56,.56,.31],[-.49,-.16,-.35,.33,.52,.48]],[[.02,-.44,.03,.96,.6,.88],[-.61,-.19,.01,.36,.54,.69],[-.29,.03,.13,.39,.64,.76],[.2,.25,-.12,.55,.67,.7],[.67,-.14,.05,.32,.52,.7]],[[-.11,-.74,.01,.46,.28,.86],[-.19,-.47,-.07,.34,.42,.76],[-.23,-.07,.03,.27,.49,.7],[-.16,.32,-.08,.29,.42,.63],[-.1,.54,.04,.29,.26,.67],[-.1,.71,.03,.47,.14,.75],[.28,.72,.02,.59,.114,.68],[.6,.718,-.03,.37,.092,.5],[-.49,.7,-.02,.28,.108,.52],[-.41,-.54,.28,.16,.24,.39],[-.42,-.25,.23,.16,.2,.42],[-.36,.02,.35,.16,.2,.35],[-.37,.27,.17,.15,.22,.39],[-.31,.5,.38,.17,.16,.33],[-.17,.35,.5,.15,.19,.36],[-.17,-.2,.52,.17,.27,.29],[.14,-.57,.36,.18,.24,.39],[.16,-.31,.19,.17,.29,.37],[.05,.01,.37,.17,.23,.37],[.09,.48,.25,.2,.2,.37],[-.34,-.36,-.43,.17,.24,.33],[-.29,-.06,-.46,.15,.2,.33],[-.15,.22,-.48,.2,.2,.29],[-.25,.49,-.37,.18,.18,.31]]],g=56,et=R.length;function Lt(){const m=new Uint8Array(g**3*R.length);for(const[s,i]of R.entries()){const o=s===L,n=o?-.884:s===2?-.79:-.83,h=o?.022:s===2?.055:.036;for(let r=1;r<g-1;r++)for(let l=1;l<g-1;l++)for(let u=1;u<g-1;u++){const e=u/(g-1)*2-1,a=l/(g-1)*2-1,c=r/(g-1)*2-1;let d=-1;for(const[N,$,rt,nt,lt,ht]of i){const J=(1-Math.sqrt(((e-N)/nt)**2+((a-$)/lt)**2+((c-rt)/ht)**2))*.56,Y=Math.max(0,.1-Math.abs(J-d));d=Math.max(d,J)+Y*Y/.4}if(d<-.22)continue;const p=I(e*3.2+18*s,a*2.7,c*3.2),f=I(e*8.1,a*6.9+25*s,c*8.1),y=M((a+.54)/.65),x=o?(I(e*18,a*31,c*18)-.5)*.078:0,v=d+(p-.48)*(o?.21:.145)+(f-.5)*(.024+.098*y)+x,w=M((a-n+(p-.5)*.022)/(o?.041:.072)),A=M(o?(v+.025)/.1:(v+.017)/.071),S=h*M((v+.074)/.09),E=C(S,.78+.22*p,A)*w;m[u+g*(l+g*(r+g*s))]=Math.round(E*255)}}const t=new ct(m,g,g,g*R.length);return t.format=ut,t.type=dt,t.minFilter=t.magFilter=D,t.wrapS=t.wrapT=t.wrapR=mt,t.needsUpdate=!0,t}function Ht(m,t,s,i,o){if(Math.max(Math.abs(s),Math.abs(i),Math.abs(o))>=1)return 0;const n=Math.round((s*.5+.5)*(g-1)),h=Math.round((i*.5+.5)*(g-1)),r=Math.round((o*.5+.5)*(g-1));return m.image.data[n+g*(h+g*(r+g*t))]/255}function b(m,t,s){let i=Math.imul(m,374761393)+Math.imul(t,668265263)+Math.imul(s,1274126177);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967295}function M(m){const t=Math.max(0,Math.min(1,m));return t*t*(3-2*t)}function C(m,t,s){return m+(t-m)*s}function I(m,t,s){const i=Math.floor(m),o=Math.floor(t),n=Math.floor(s),h=M(m-i),r=M(t-o),l=M(s-n),u=C(C(b(i,o,n),b(i+1,o,n),h),C(b(i,o+1,n),b(i+1,o+1,n),h),r),e=C(C(b(i,o,n+1),b(i+1,o,n+1),h),C(b(i,o+1,n+1),b(i+1,o+1,n+1),h),r);return C(u,e,l)}const st=`
  uniform highp sampler3D uDensity;
  float densityAt(vec3 p, float shape) {
    if (any(greaterThan(abs(p), vec3(1.0)))) return 0.0;
    vec3 uv = p * 0.5 + 0.5;
    uv = (uv * ${g-1}.0 + 0.5) / ${g}.0;
    uv.z = (uv.z + shape) / ${R.length}.0;
    return texture(uDensity, uv).r;
  }
`,Ut=[[345,150,-191,173,80,154],[568,192,300,212,122,226],[-521,175,465,164,105,161],[-696,212,-411,241,142,236],[2260,970,-1330,420,17,1120],[-2620,1080,1490,1080,21,510]];class Z{constructor(t,s){this.seed=t;const i=s.find(({id:r})=>r==="home-lookkit")??s.find(({id:r})=>r==="graybox-a")??s[0];this.anchor=i?.origin??{x:0,y:0,z:0};const o=i?.anchors.roosts[0]?.position??{x:0,y:24,z:0},n=[{id:`${i?.id??"world"}/thermal0001`,x:this.anchor.x+o.x-28,y:this.anchor.y+o.y,z:this.anchor.z+o.z+6,warmth:1,radius:43,height:104}];i?.id==="home-lookkit"&&s.some(r=>r.id==="flipped-kits")&&n.push(vt.crossingThermal);const h=new pt(t,s.map(({id:r,origin:l,farProxy:u})=>({id:r,origin:l,radius:u.radius})));this.air=new ft(h,{thermals:n});for(let r=0;r<3;r++)for(let l=0;l<10;l++){const u=r*10+l,e=U(Math.sin(u*324.5+t*.017)*43652.7),a=(l+.5+r*.36+(e-.5)*.67)*Math.PI/5,c=Math.cos(a)>.96?a+Math.sign(Math.sin(a))*(.26+r*.06):a,d=1660+r*1900+e*760,p={x:this.anchor.x+Math.cos(c)*d,y:130+r*215+e*(435+r*205),z:this.anchor.z+Math.sin(c)*d},f=.49+.59*U(e*13.27),y=.59+1.12*U(e*31.61),x=.7+.53*U(e*8.13),v={x:(235*f+r*85)*x,y:(88*f+r*31)*y,z:(216*f+r*71)/x};this.backgrounds.push({id:`cloud${String(u+7).padStart(4,"0")}`,center:p,bounds:v,baseHeight:p.y-v.y,shape:u%3===2?3:u%3,opacity:.71+e*.23,storm:0})}}seed;air;anchor;backgrounds=[];cloudsAt(t,s){const{weather:i}=this.air,o=i.weatherAt(this.anchor.x,this.anchor.z,0).cloudWind,n=Ut.map(([e,a,c,d,p,f],y)=>{const x=8*Math.sin(t/120),v={x:this.anchor.x+e+x*o.x,y:this.anchor.y+a,z:this.anchor.z+c+x*o.z},w=i.weatherAt(v.x,v.z,t);return{id:`cloud000${y+1}`,center:v,baseHeight:v.y-p,bounds:{x:d,y:p,z:f},shape:y>=4?2:y,opacity:y>=4?.25+w.cover*.15:.84+w.cover*.17,storm:w.stormIntensity*.52}}),h=this.air.thermalCapsAt(t).map(e=>({...e,shape:2,storm:0})),r=s?.fronts??i.frontsAt(t),l=[...n,...h,...this.backgrounds];return r.length===0?l:[...l.flatMap(e=>{let a=0;for(const d of r){const p=e.center.x-d.center.x,f=e.center.z-d.center.z,y=Math.hypot(p,f),x=Math.max(d.halfWidth,d.halfLength)+Math.max(e.bounds.x,e.bounds.z);a=Math.max(a,d.strength*(1-gt(x*.91,x*1.34,y)))}const c=yt(e.opacity,0,a);return c>.05?[{...e,opacity:c}]:[]}),...r.map(e=>{const{x:a,z:c}=e.precipitationCenter,d=(s?.field??i).weatherAt(a,c,s?.time??t).cloudSteadyWind;return Rt(e,d)})]}}function U(m){return m-Math.floor(m)}const ot=et*3,T=16,F=5,Pt=`
out vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,V=`
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
`,X=`
uniform vec3 uSun;
uniform float uTwilight, uNight;
uniform vec4 uStormMist;
vec3 cloudLight(float illumination, float storm, float glare) {
  vec3 shade = mix(vec3(0.20, 0.24, 0.43), vec3(0.34, 0.20, 0.35), uTwilight);
  vec3 light = mix(vec3(1.0, 0.96, 0.80), vec3(1.0, 0.77, 0.48), uTwilight);
  shade = mix(shade, vec3(0.073, 0.097, 0.140), storm);
  light = mix(light, mix(vec3(1.04, 1.03, 1.00), vec3(1.10, 0.78, 0.56), uTwilight), storm);
  shade = mix(shade, vec3(0.023, 0.035, 0.079), uNight);
  light = mix(light, vec3(0.22, 0.28, 0.45), uNight);
  return mix(shade, light, smoothstep(0.09, 0.84, illumination))
    + (1.0 - uNight) * glare * (1.0 - storm) * vec3(0.23, 0.16, 0.10);
}
`,it=`
void basis(float bearing, float elevation, out vec3 look, out vec3 side, out vec3 up) {
  side = vec3(cos(bearing), 0.0, -sin(bearing));
  look = vec3(sin(bearing) * cos(elevation), sin(elevation), cos(bearing) * cos(elevation));
  up = cross(look, side);
}
`,Gt=`
in vec2 vUv;
out vec4 atlasColor;
${st}
${it}
void main() {
  vec2 cell = vUv * vec2(8.0, ${ot}.0);
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
    if (shape == ${L}.0) {
      float upper = smoothstep(-0.84, 0.79, p.y);
      lit = (0.13 + 0.82 * (1.0 - shadow)) * mix(0.38, 1.0, upper);
    }
    luminance += transmittance * a * lit;
    transmittance *= 1.0 - a;
  }
  atlasColor = vec4(luminance, 0.0, 0.0, 1.0 - transmittance);
}
`,Nt=`
in vec2 vUv;
layout(location = 0) out vec4 cloud;
layout(location = 1) out vec4 guide;
${st}
${V}
${X}
${it}
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
      vec2 uv = (vec2(index, shape * 3.0 + band) + clamp(local, 0.012, 0.988)) / vec2(8.0, ${ot}.0);
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
  bool tower = shape == ${L}.0;
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
      float lit = clamp(bounce + 0.27 * rise + (0.70 - 0.03 * rise) * direct, 0.0, 1.0);
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
      color += vec3(0.28, 0.115, 0.041) * uTwilight * rise * direct * (1.0 - storm);
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
    bool tower = shape == ${L}.0;
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
`,at=`
uniform vec3 uMoon, uSkyAnchor;
uniform float uTime;

vec2 hash2(vec2 p) {
  vec3 q = fract(p.xyx * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy);
}
float wisp(vec2 p, float bend) {
  float envelope = 1.0 - smoothstep(0.12, 1.0, abs(p.x));
  float curve = bend * (0.45 * sin(p.x * 3.1) + 0.09 * sin(p.x * 9.0));
  float ribbon = 1.0 - smoothstep(0.10, 0.95, abs(p.y - curve) / max(0.06, envelope));
  float fibers = 0.76 + 0.24 * sin(p.x * 17.0 + p.y * 6.0);
  return ribbon * fibers * envelope;
}
vec3 dome(vec3 ray) {
  float height = max(0.0, ray.y);
  float sunDot = max(0.0, dot(ray, uSun));
  vec3 horizon = mix(vec3(0.57, 0.80, 0.93), vec3(0.95, 0.63, 0.40), uTwilight);
  vec3 zenith = mix(vec3(0.055, 0.27, 0.69), vec3(0.105, 0.24, 0.56), uTwilight);
  horizon = mix(horizon, vec3(0.074, 0.105, 0.205), uNight);
  zenith = mix(zenith, vec3(0.007, 0.018, 0.059), uNight);
  vec3 color = mix(horizon, zenith, pow(smoothstep(0.0, mix(0.62, 0.47, uTwilight), height), 0.63));
  if (uNight > 0.01 && ray.y > 0.01) {
    vec2 stars = vec2(atan(ray.z, ray.x) * 99.3127, ray.y * 178.0);
    vec2 rnd = hash2(floor(stars));
    float point = 1.0 - smoothstep(0.025, 0.15, length(fract(stars) - mix(vec2(0.19), vec2(0.81), rnd)));
    color += point * smoothstep(0.51, 0.99, rnd.x) * smoothstep(0.01, 0.13, height) * uNight * vec3(0.62, 0.73, 1.0);
  }
  float sun = 1.0 - smoothstep(0.012, 0.016, length(ray - uSun));
  color += (1.0 - uNight) * (sun * vec3(1.0, 0.89, 0.65)
    + pow(sunDot, 19.0) * mix(vec3(0.11, 0.09, 0.04), vec3(0.39, 0.20, 0.06), uTwilight)
    + pow(sunDot, 370.0) * vec3(0.28, 0.16, 0.06));
  vec3 moonSide = normalize(cross(uMoon, vec3(0.0, 1.0, 0.0)));
  float moon = 1.0 - smoothstep(0.015, 0.018, length(ray - uMoon));
  float crescent = smoothstep(0.011, 0.016, length(ray - normalize(uMoon + moonSide * 0.010)));
  color += uNight * moon * crescent * vec3(0.69, 0.78, 0.95);
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
  return mix(color, uStormMist.rgb, uStormMist.w);
}
`,$t=`
in vec2 vUv;
out vec4 outputColor;
#define gl_FragColor outputColor
${V}
${X}
${at}
void main() {
  gl_FragColor = vec4(dome(normalize(worldAt(vUv, 1.0) - uEye)), 1.0);
  #include <colorspace_fragment>
}
`,_t=`
in vec2 vUv;
out vec4 outputColor;
#define gl_FragColor outputColor
${V}
${X}
${at}
uniform sampler2D uScene, uCloud, uGuide;
uniform bool uSceneHasDome;
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
  vec3 background = (depth < 1.0 || uSceneHasDome) ? texture(uScene, vUv).rgb : dome(normalize(worldAt(vUv, 1.0) - uEye));
  vec4 cloud = texture(uCloud, vUv);
  vec2 guide = texture(uGuide, vUv).gb;
  float shade = depth < 1.0 ? guide.y : 0.0;
  if (cloud.a > 0.0 || shade > 0.0) {
    float limit = sceneGuide(depth);
    // Most pixels have smooth scene depth. Gather individually at silhouettes and disocclusions.
    if (limit < 0.89 && abs(guide.x - limit) > 0.004) cloud = depthUpsample(limit, shade);
  }
  background *= 1.0 - shade * vec3(1.0, 0.85, 0.70);
  gl_FragColor = vec4(background * (1.0 - cloud.a) + cloud.rgb, 1.0);
  #include <colorspace_fragment>
}
`,qt={low:{height:180,steps:10,shadows:1,near:12,far:110},default:{height:216,steps:17,shadows:2,near:720,far:1140},high:{height:400,steps:34,shadows:3,near:1150,far:1800}};function P(m,t){return new Ft({glslVersion:At,vertexShader:Pt,fragmentShader:m,uniforms:t,depthTest:!1,depthWrite:!1,toneMapped:!1})}function tt(){return new Q(1,1,{count:2,depthBuffer:!1,minFilter:D,magFilter:D})}class Wt{constructor(t,s){this.renderer=t,this.manifests=s,this.field=new Z(1,s),this.gl=t.getContext(),this.timer=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this.triangle.geometry.setAttribute("position",new xt([-1,-1,0,3,-1,0,-1,3,0],3)),this.triangle.frustumCulled=!1,this.passScene.add(this.triangle),this.autoReset=t.info.autoReset,t.info.autoReset=!1,t.domElement.addEventListener("webglcontextrestored",this.restoreContext)}renderer;manifests;field;horizon=new _;daylight={sun:new z,twilight:0,night:0};sceneColor=new Q(1,1,{depthTexture:new wt(1,1,zt),samples:2});history=[tt(),tt()];atlas=new Q(512,144*et,{depthBuffer:!1,minFilter:D,magFilter:D});density=Lt();atlasMaterial=P(Gt,{uDensity:{value:this.density}});passScene=new St;passCamera=new bt;triangle=new Ct(new Mt,new Tt);autoReset;outputSize=new q;cloudSize=new q;frustum=new Et;bounds=new kt;center=new z;extent=new z;worldFromClip=new W;clipFromWorld=new W;lastClipFromWorld=new W;lastEye=new z;lastForward=new z;forward=new z;moon=new z;anchor=new z;centers=Array.from({length:T},()=>new k);extents=Array.from({length:T},()=>new k);stormLod=Array.from({length:T},()=>new k);stormFlash=new k;stormMist=new k;flashed=!1;casterCenters=Array.from({length:F},()=>new k);casterExtents=Array.from({length:F},()=>new k);common={uWorldFromClip:{value:this.worldFromClip},uEye:{value:new z},uDepth:{value:this.sceneColor.depthTexture},uSun:{value:this.daylight.sun},uCameraPlanes:{value:new q},uTwilight:{value:0},uNight:{value:0},uStormMist:{value:this.stormMist}};clouds=P(Nt,{...this.common,uDensity:{value:this.density},uAtlas:{value:this.atlas.texture},uCenterShape:{value:this.centers},uExtentOpacity:{value:this.extents},uStormLod:{value:this.stormLod},uStormFlash:{value:this.stormFlash},uCasterCenter:{value:this.casterCenters},uCasterExtent:{value:this.casterExtents},uCasterCount:{value:0},uHistory:{value:null},uHistoryGuide:{value:null},uPreviousClipFromWorld:{value:this.lastClipFromWorld},uPreviousEye:{value:this.lastEye},uReuse:{value:!1},uJitter:{value:0},uNearClear:{value:0},uCount:{value:0},uSteps:{value:0},uShadowSteps:{value:0}});domeLight={uMoon:{value:this.moon},uTime:{value:0},uSkyAnchor:{value:this.anchor}};dome=P($t,{...this.common,...this.domeLight});composite=P(_t,{...this.common,...this.domeLight,uScene:{value:this.sceneColor.texture},uCloud:{value:null},uGuide:{value:null},uSceneHasDome:{value:!1}});gl;timer;timings={clouds:[],composite:[]};totals=[];queries=[];cloudTiming;preset="default";frame=0;lastHour=NaN;lastTime=-1/0;lastRequestedHour=NaN;atlasReady=!1;warmup=8;restoreContext=()=>{this.atlasReady=!1,this.timer=this.gl.getExtension("EXT_disjoint_timer_query_webgl2"),this.resetHistory()};prepareShaders(){const t=this.triangle.material,s=this.renderer.getRenderTarget();try{for(const[i,o]of[[this.dome,this.sceneColor],[this.atlasMaterial,this.atlas],[this.clouds,this.history[0]],[this.composite,s],[this.composite,null]])this.triangle.material=i,this.renderer.setRenderTarget(o),this.renderer.compile(this.passScene,this.passCamera)}finally{this.triangle.material=t,this.renderer.setRenderTarget(s)}}dispose(){this.renderer.domElement.removeEventListener("webglcontextrestored",this.restoreContext),this.renderer.info.autoReset=this.autoReset,this.resetHistory(),this.sceneColor.dispose();for(const t of this.history)t.dispose();this.atlas.dispose(),this.density.dispose(),this.atlasMaterial.dispose(),this.triangle.geometry.dispose(),this.clouds.dispose(),this.dome.dispose(),this.composite.dispose()}setSeed(t){this.field=new Z(t,this.manifests),this.lastRequestedHour=NaN,this.resetHistory()}setPreset(t){if(t!=="low"&&t!=="default"&&t!=="high")throw new RangeError("Unknown cloud preset");return t!==this.preset&&(this.preset=t,this.resetHistory()),t}resetHistory(){this.lastTime=-1/0,this.warmup=8;for(const{query:t}of this.queries)this.gl.deleteQuery(t);this.queries.length=this.timings.clouds.length=this.timings.composite.length=this.totals.length=0,this.cloudTiming=void 0}updateLight(t,s){const i=this.field.air.weather.clock;if(i.advance(Math.max(0,t-i.elapsedSeconds)),s!==this.lastRequestedHour){const{hour:d}=i.clockAt();i.setHour(s),this.lastRequestedHour=s,Math.abs(d-s)>.2&&this.resetHistory()}const{hour:o}=i.clockAt(),{nightStartHour:n,nightEndHour:h}=i.tuning,r=(o-h)/(n-h),l=Math.sin(r*Math.PI)*1.2,u=(r-.5)*3.19;this.daylight.sun.set(Math.sin(u)*Math.cos(l),Math.sin(l),-Math.cos(u)*Math.cos(l));const e=(o-n+24)%24/(24+h-n),a=.1+.7*Math.sin(Math.PI*e),c=.8-1.6*e;this.moon.set(Math.sin(c)*Math.cos(a),Math.sin(a),-Math.cos(c)*Math.cos(a)),this.daylight.night=this.common.uNight.value=1-H.smoothstep(l,-.13,.04),this.daylight.twilight=this.common.uTwilight.value=(1-H.smoothstep(l,.03,.76))*(1-this.daylight.night),this.horizon.setRGB(.57,.8,.93).lerp(this.sunsetColor,this.daylight.twilight).lerp(this.nightColor,this.daylight.night),this.currentHour=o}currentHour=10;sunsetColor=new _().setRGB(.95,.63,.4);nightColor=new _().setRGB(.074,.105,.205);render(t,s,i,o,n){const h=this.renderer,r=qt[this.preset],l=h.getRenderTarget();if(l?this.outputSize.set(l.width,l.height):h.getDrawingBufferSize(this.outputSize),l?.texture.type===B&&this.sceneColor.texture.type!==B){this.sceneColor.dispose(),this.sceneColor.texture.type=B;const S=this.gl.getInternalformatParameter(this.gl.RENDERBUFFER,this.gl.RGBA16F,this.gl.SAMPLES);this.sceneColor.samples=S.some(E=>E>=2)?2:0}const u=Math.min(1,r.height/Math.max(1,this.outputSize.y),r.height*2/Math.max(1,this.outputSize.x));if(this.cloudSize.set(Math.max(1,Math.floor(this.outputSize.x*u)),Math.max(1,Math.floor(this.outputSize.y*u))),this.sceneColor.setSize(this.outputSize.x,this.outputSize.y),this.history[0].width!==this.cloudSize.x||this.history[0].height!==this.cloudSize.y){for(const S of this.history)S.setSize(this.cloudSize.x,this.cloudSize.y);this.resetHistory()}h.info.reset(),this.atlasReady||(this.pass(this.atlasMaterial,this.atlas),this.atlasReady=!0),s.updateMatrixWorld(),this.worldFromClip.multiplyMatrices(s.matrixWorld,s.projectionMatrixInverse),this.clipFromWorld.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.clipFromWorld),this.common.uCameraPlanes.value.set(s.near,s.far);const e=this.common.uEye.value.copy(s.position);s.getWorldDirection(this.forward);const a=this.clouds.uniforms,c=O.get(t);this.stormMist.fromArray(c?.mist??Dt);const d=c?.flash;if(d){const{position:{x:S,y:E,z:N},power:$}=d;this.stormFlash.set(S,E,-N,$)}else this.stormFlash.w=0;a.uCount.value=this.selectClouds(i,e,r.near,r.far,c),a.uNearClear.value=H.clamp(e.distanceTo(o)-2,0,10),a.uSteps.value=r.steps,a.uShadowSteps.value=r.shadows,a.uJitter.value=this.frame%8*.61803399,a.uReuse.value=!d&&!this.flashed&&i>=this.lastTime&&i-this.lastTime<.22&&e.distanceToSquared(this.lastEye)<30**2&&this.forward.dot(this.lastForward)>.94&&Math.abs(this.currentHour-this.lastHour)<.1;const p=this.history[this.frame%2],f=this.history[(this.frame+1)%2];a.uHistory.value=f.textures[0],a.uHistoryGuide.value=f.textures[1],this.composite.uniforms.uCloud.value=p.textures[0],this.composite.uniforms.uGuide.value=p.textures[1],this.domeLight.uTime.value=i;const{x:y,y:x,z:v}=this.field.anchor;this.anchor.set(y,x,-v);const w=c?.precipitation??!1;this.composite.uniforms.uSceneHasDome.value=w,h.setRenderTarget(this.sceneColor),w?this.renderThroughDome(t,s):h.render(t,s),this.collectTimings();const A=this.timer&&this.gl.getQuery(this.timer.TIME_ELAPSED_EXT,this.gl.CURRENT_QUERY);this.warmup>0||A||this.queries.length>14?(this.warmup=Math.max(0,this.warmup-1),this.pass(this.clouds,p),this.pass(this.composite,l,n)):(this.measure("clouds",this.clouds,p),this.measure("composite",this.composite,l,n)),this.lastClipFromWorld.copy(this.clipFromWorld),this.lastEye.copy(e),this.lastForward.copy(this.forward),this.lastHour=this.currentHour,this.lastTime=i,this.flashed=!!d,this.frame++}renderThroughDome(t,s){const{renderer:i}=this,{autoClear:o}=i,{background:n}=t;i.autoClear=!1,t.background=null;try{i.clear(),this.pass(this.dome,this.sceneColor),i.render(t,s)}finally{t.background=n,i.autoClear=o}}perf(){this.collectTimings();const t=[...this.totals].sort((o,n)=>o-n),s=(o,n)=>o[Math.ceil(o.length*n)-1]??null,i=o=>s([...o].sort((n,h)=>n-h),.95);return{preset:this.preset,width:this.cloudSize.x,height:this.cloudSize.y,volumesInView:this.clouds.uniforms.uCount.value,gpuTimer:this.timer!==null,gpuSamples:this.timings.clouds.length,cloudsGpuMsP95:i(this.timings.clouds),compositeGpuMsP95:i(this.timings.composite),skyGpuMsMedian:s(t,.5),skyGpuMsP95:s(t,.95)}}at(t,s,i){let o=null;for(const{id:n,center:h,bounds:r,opacity:l,shape:u,heading:e}of this.field.cloudsAt(s,i)){const a=t.x-h.x,c=h.z-t.z,d=e?a*e.x-c*e.z:a,p=e?a*e.z+c*e.x:c,f=l*Ht(this.density,u,d/r.x,(t.y-h.y)/r.y,p/r.z);f>(o?.density??.015)&&(o={id:n,density:f})}return o}selectClouds(t,s,i,o,n){const h=this.field.cloudsAt(t,n),r=this.daylight.sun.y>.07?h.filter(({center:e,heading:a})=>!a&&e.y<510&&Math.hypot(e.x-s.x,e.z+s.z)<1900).sort((e,a)=>Math.hypot(e.center.x-s.x,e.center.z+s.z)-Math.hypot(a.center.x-s.x,a.center.z+s.z)).slice(0,F):[];for(const[e,{center:a,bounds:c,opacity:d,shape:p}]of r.entries())this.casterCenters[e].set(a.x,a.y,-a.z,p),this.casterExtents[e].set(c.x,c.y,c.z,d);this.clouds.uniforms.uCasterCount.value=r.length;const l=h.flatMap(e=>{if(this.center.set(e.center.x,e.baseHeight+e.bounds.y,-e.center.z),this.extent.set(e.bounds.x,e.bounds.y,e.bounds.z),e.heading){const a=Math.abs(e.heading.x),c=Math.abs(e.heading.z);this.extent.set(a*e.bounds.x+c*e.bounds.z,e.bounds.y,c*e.bounds.x+a*e.bounds.z)}return this.bounds.min.copy(this.center).sub(this.extent),this.bounds.max.copy(this.center).add(this.extent),this.frustum.intersectsBox(this.bounds)?[{cloud:e,distance:this.bounds.distanceToPoint(s)}]:[]});l.sort((e,a)=>e.distance-a.distance);const u=Math.min(T,l.length);for(let e=0;e<u;e++){const{cloud:a,distance:c}=l[e];this.centers[e].set(a.center.x,a.baseHeight+a.bounds.y,-a.center.z,a.shape),this.extents[e].set(a.bounds.x,a.bounds.y,a.bounds.z,a.opacity);const d=a.shape===L&&this.preset!=="low",p=d?Math.hypot(a.center.x-s.x,a.center.z+s.z):c;this.stormLod[e].set(a.storm,H.smoothstep(p,d?3250:i,d?4e3:o),a.heading?.x??1,-(a.heading?.z??0))}return u}pass(t,s,i){this.triangle.material!==t&&(this.triangle.material=t),this.renderer.setRenderTarget(s),i?i(this.passScene,this.passCamera):this.renderer.render(this.passScene,this.passCamera)}measure(t,s,i,o){const n=this.timer,h=n?this.gl.createQuery():null;if(!h||!n){this.pass(s,i,o);return}this.gl.beginQuery(n.TIME_ELAPSED_EXT,h),this.pass(s,i,o),this.gl.endQuery(n.TIME_ELAPSED_EXT),this.queries.push({name:t,query:h,frame:this.frame})}collectTimings(){if(this.timer){if(this.gl.getParameter(this.timer.GPU_DISJOINT_EXT)){for(const{query:t}of this.queries)this.gl.deleteQuery(t);this.queries.length=0,this.cloudTiming=void 0;return}for(;this.queries.length;){const{name:t,query:s,frame:i}=this.queries[0];if(!this.gl.getQueryParameter(s,this.gl.QUERY_RESULT_AVAILABLE))break;const o=this.timings[t],n=this.gl.getQueryParameter(s,this.gl.QUERY_RESULT)/1e6;o.push(n),o.length>120&&o.shift(),t==="clouds"?this.cloudTiming={frame:i,ms:n}:this.cloudTiming?.frame===i&&(this.totals.push(this.cloudTiming.ms+n),this.totals.length>120&&this.totals.shift()),this.gl.deleteQuery(s),this.queries.shift()}}}}const G={"sky-noon-harbour":{hour:12.5,heading:1.59,rise:10,distance:34,offset:{x:-23,y:43,z:1}},"sky-sunset-nest":{hour:20.65,heading:1.53,rise:10,distance:33,offset:{x:-21,y:57,z:-17}},"sky-inside-cloud":{hour:12.5,heading:4.6,rise:-2,distance:14,offset:{x:-29,y:-19,z:97}},"sky-under-cap":{hour:12.5,heading:1.25,rise:32,distance:40,offset:{x:-115,y:-60,z:-36}}};function Bt(m,t,s){const{offset:i}=G[m];let o=t.anchor;if(m==="sky-inside-cloud"||m==="sky-under-cap"){const n=t.cloudsAt(s),r=(m==="sky-under-cap"?n.find(l=>l.id.endsWith("/thermal0001")):n[0])??n[0];o=m==="sky-under-cap"?{...r.center,y:r.baseHeight}:r.center}return{x:o.x+i.x,y:o.y+i.y,z:o.z+i.z}}function It(m,t,s){const{rise:i,distance:o}=G[m],n=Math.sin(s),h=Math.cos(s);return{position:{x:t.x-n*o,y:t.y+7,z:t.z-h*o},target:{x:t.x+n*55,y:t.y+i,z:t.z+h*55},fov:60}}const j=({x:m,y:t,z:s})=>new z(m,t,-s),Vt={layer:"sky",create(m,{renderer:t,islands:s,horizon:i}){const o=new Wt(t,s),n=new URLSearchParams(location.search).get("sky");let h=n==="low"||n==="high"?n:"default",r;return{prepareShaders:()=>o.prepareShaders(),connect({sim:l,registrations:u,preview:e,takeOff:a,refresh:c,setHour:d}){const p=e?e.shot??"sky-noon-harbour":void 0;for(const f of Object.keys(G))u.screens.set(f,()=>{const{hour:y,heading:x}=G[f],v=l.state.tick*K;d(y),o.updateLight(v,y),a(),l.state.target=null;const w=Bt(f,o.field,v),{position:A,target:S,fov:E}=It(f,w,x);r={id:f,gull:j(w),eye:j(A),target:j(S),fov:E},l.teleport(w,x),o.resetHistory(),c()});{const f=()=>l.state.tick*K;u.state.set("clouds",()=>o.field.cloudsAt(f(),O.get(m))),u.state.set("cloudAtGull",()=>o.at(l.state.gull.position,f(),O.get(m))),u.actions.set("sky_preset",y=>(h=o.setPreset(y.preset),c(),!0))}return p},reset(l){r=void 0,o.setSeed(l)},update({seconds:l,camera:u,gullPosition:e,hour:a,screen:c,lowQuality:d}){o.setPreset(d?"low":h),r&&(c!==r.id||e.distanceToSquared(r.gull)>64)&&(r=void 0),r&&(u.position.copy(r.eye),u.lookAt(r.target),u.fov!==r.fov&&(u.fov=r.fov,u.updateProjectionMatrix())),o.updateLight(l,a),m.fog?.color.copy(o.horizon),i.copy(o.horizon)},render(l,{camera:u,seconds:e,gullPosition:a},c){o.render(l,u,e,a,c)},perf:()=>({sky:o.perf()}),dispose:()=>o.dispose()}}};export{Vt as effect};
