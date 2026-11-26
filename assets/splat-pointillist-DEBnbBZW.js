import{d2 as Q,d3 as se,d4 as S,a7 as H,d5 as ae}from"./runtime-Fvu5jN8S.js";import{a as ce}from"./three-renderer-BP556_pn.js";import{a as j,m as M,v as K,r as N,c as le}from"./content-vpGvzjtB.js";import{dk as $,aJ as pe,m as J,aI as ue,ci as de,cM as me,ds as fe,cX as ve,g as ge,ak as xe,bP as ye,V as f,by as he,an as we,M as P,F as Y,P as Z,cx as be,d1 as Me,cf as X,cy as k}from"./three.core-BYa7ON5M.js";import{underpaintingMaterial as ke,underpaintingKey as ze}from"./underpainting-CvKwv0-h.js";import"./index-CNUyvlgf.js";import"./saves-ClQI9LoD.js";import"./table-D89Xz1NR.js";import"./credits-page-dWtXkrRi.js";import"./music-CxylN_mZ.js";import"./street-cast-DYn1YrLN.js";const Pe=`
  uniform highp usampler2D centers;
  uniform highp usampler2D paint;
  uniform float seconds;
  uniform vec2 viewport;
  uniform float sunset;
  uniform float night;
  uniform vec3 sunDirection;
  uniform float paintEdges;
  uniform uint hiddenGroups;
  in uint sortedIndex;
  out vec2 dab;
  flat out vec4 pigment;
  #include <fog_pars_vertex>

  vec4 bytes(uint packedValue) {
    return vec4(uvec4(packedValue, packedValue >> 8u, packedValue >> 16u, packedValue >> 24u) & 255u) / 255.0;
  }

  vec3 octNormal(vec2 uv) {
    vec2 f = uv * 2.0 - 1.0;
    vec3 n = vec3(f, 1.0 - abs(f.x) - abs(f.y));
    n.xy -= vec2(n.x >= 0.0 ? 1.0 : -1.0, n.y >= 0.0 ? 1.0 : -1.0) * max(-n.z, 0.0);
    return normalize(n);
  }

  vec3 linearSRGB(vec3 c) {
    return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
  }

  vec2 projectAxis(vec3 axis, vec3 p, float reciprocalDepth) {
    return vec2(projectionMatrix[0][0], projectionMatrix[1][1])
      * (axis.xy + p.xy * axis.z * reciprocalDepth) * reciprocalDepth;
  }

  void main() {
    uint id = sortedIndex & 4194303u;
    ivec2 address = ivec2(int(id & 2047u), int(id >> 11u));
    uvec4 point = texelFetch(centers, address, 0);
    uvec2 style = texelFetch(paint, address, 0).rg;
    vec3 p = uintBitsToFloat(point.xyz);
    float wind = float((style.y >> 24u) & 15u) / 15.0;
    float phase = p.x * 0.20 + p.z * 0.13;
    p += wind * vec3(0.094 * sin(seconds * 1.35 + phase),
      0.045 * cos(seconds * 1.60 + phase * 1.8), 0.068 * sin(seconds + phase * 1.3));
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    float depth = -mvPosition.z;
    uint group = style.y >> 28u;
    if (depth < 0.075 || (hiddenGroups & (1u << group)) != 0u) {
      gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
      return;
    }
    vec3 normal = octNormal(bytes(style.y).xy);
    vec3 t = normalize(cross(abs(normal.y) < 0.92 ? vec3(0.0, 1.0, 0.0) : vec3(0.0, 0.0, 1.0), normal));
    vec3 b = cross(normal, t);
    float angle = float((style.y >> 16u) & 255u) * (6.2831853 / 256.0);
    float c = cos(angle), s = sin(angle);
    vec2 sigma = unpackHalf2x16(point.w) * exp2(float(sortedIndex >> 22u) / 16.0);
    mat3 view = mat3(modelViewMatrix);
    float inv = 1.0 / depth;
    vec2 a0 = projectAxis(view * (c * t + s * b) * sigma.x, mvPosition.xyz, inv);
    vec2 a1 = projectAxis(view * (c * b - s * t) * sigma.y, mvPosition.xyz, inv);
    vec2 a2 = projectAxis(view * normal * (sigma.y * 0.38), mvPosition.xyz, inv);
    // Cholesky of the projected covariance with a subpixel reconstruction filter.
    vec2 px = 2.0 / viewport;
    float xx = a0.x*a0.x + a1.x*a1.x + a2.x*a2.x + px.x*px.x*0.30;
    float yy = a0.y*a0.y + a1.y*a1.y + a2.y*a2.y + px.y*px.y*0.30;
    float xy = a0.x*a0.y + a1.x*a1.y + a2.x*a2.y;
    float l00 = sqrt(xx);
    float l10 = xy / l00;
    float l11 = sqrt(max(yy - l10*l10, 1e-12));
    dab = position.xy * 2.25;
    // Keep near-plane strokes bounded without flattening their orientation.
    float footprint = max(l00 / px.x, (abs(l10) + l11) / px.y);
    float limit = mix(22.0, 4.5, paintEdges);
    vec2 delta = vec2(l00 * dab.x, l10 * dab.x + l11 * dab.y) * min(1.0, limit / footprint);
    gl_Position = projectionMatrix * mvPosition;
    gl_Position.xy += delta * gl_Position.w;
    pigment = bytes(style.x);
    float sunlight = smoothstep(-0.36, 0.58, dot(normal, sunDirection));
    float value = dot(pigment.rgb, vec3(0.29, 0.56, 0.15));
    vec3 shade = pigment.rgb * vec3(0.61, 0.62, 0.88) + vec3(0.065, 0.032, 0.13);
    vec3 light = pigment.rgb * vec3(1.08, 0.82, 0.63) + vec3(0.12 + 0.16 * value, 0.07, 0.025);
    vec3 warm = mix(shade, light, sunlight);
    // The island's own painted water takes broken amber highlights downstream.
    float water = 1.0 - smoothstep(0.12, 0.18, abs(p.y));
    float streak = (p.z - 66.0 + p.x * 0.10) / 7.0;
    float reflection = exp(-streak * streak);
    warm = mix(warm, mix(vec3(0.23, 0.28, 0.66), vec3(1.0, 0.72, 0.26), smoothstep(0.43, 0.74, value)),
      water * reflection * 0.83);
    vec3 day = mix(pigment.rgb, warm, sunset);
    vec3 moonlit = day * vec3(0.33, 0.39, 0.62) + vec3(0.035, 0.031, 0.09);
    vec3 colors = mix(day, moonlit, night);
    if (paintEdges > 0.5 && group == 15u) {
      colors = mix(day, vec3(1.0, 0.76, 0.32), clamp(sunset * 0.44 + night, 0.0, 1.0));
    }
    pigment.rgb = linearSRGB(clamp(colors, 0.0, 1.0));
    #include <fog_vertex>
  }
`,Ae=`
  out vec4 splatColor;
  #define gl_FragColor splatColor
  in vec2 dab;
  flat in vec4 pigment;
  uniform float paintEdges;
  #include <fog_pars_fragment>
  void main() {
    float r2 = dot(dab, dab);
    if (r2 > 5.0) discard;
    float gaussian = exp(-0.45 * r2) * (1.0 - smoothstep(2.5, 5.0, r2));
    float paint = (1.0 - smoothstep(2.4, 4.6, r2)) * (1.0 - 0.065 * r2);
    float opacity = pigment.a * mix(gaussian, paint, paintEdges);
    if (paintEdges > 0.5 && opacity < 0.12) discard;
    gl_FragColor = vec4(pigment.rgb, opacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;function De(e,t,o,s=!1,i){const n=new Worker(new URL(""+new URL("sort.worker-BP6Swob_.js",import.meta.url).href,import.meta.url),{type:"module"}),a=e.centers.slice().buffer;n.postMessage({centers:a,tiles:e.tiles},[a]);let r=new ArrayBuffer(M*4);const l=e.centers.length/(4*j),p=new $(e.centers,j,l,pe,J),u=new $(e.paint,j,l,ue,J);p.needsUpdate=u.needsUpdate=!0;const c=new de(new Uint32Array(M),1).setUsage(me);o&&c.array.set(o);const d=new fe;d.setAttribute("position",new ve([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),d.setIndex([0,1,2,0,2,3]),d.setAttribute("sortedIndex",c),d.instanceCount=o?.length??0;let v;const A=()=>{v?.(),v=void 0};n.onmessage=({data:g})=>{r=g.output,c.array.set(new Uint32Array(r,0,g.count)),c.clearUpdateRanges(),g.count&&(c.addUpdateRange(0,g.count),c.needsUpdate=!0),d.instanceCount=g.count,A()},n.onerror=A;const h=new ge,m=new xe({glslVersion:ye,vertexShader:Pe,fragmentShader:Ae,fog:!0,transparent:!0,depthWrite:s,uniforms:{...he.clone(ce.basic.uniforms),centers:{value:p},paint:{value:u},viewport:{value:h},seconds:{value:0},hiddenGroups:{value:0},sunset:{value:0},night:{value:0},sunDirection:{value:new f(-.81,.25,.53).normalize()},paintEdges:{value:Number(s)}}}),U=new we(d,m);U.frustumCulled=!1;const D=new P,_=new P,C=new Y,w=new f,b=new f,F=new f(1/0,0,0),R=new f,W=new P;let V=-1/0,E=0;return m.onBeforeRender=(g,O,x,Ue,L)=>{const{seconds:ee,sunset:te,night:oe,sunDirection:T,hiddenGroups:ne}=t(O);g.getDrawingBufferSize(h);const G=Math.min(M,Math.max(12e3,Math.round(M*h.x*h.y/(1920*1080))));m.uniforms.seconds.value=ee,m.uniforms.sunset.value=te,m.uniforms.night.value=oe??0,T&&m.uniforms.sunDirection.value.copy(T),m.uniforms.hiddenGroups.value=ne;const q=performance.now();if(!r||q-V<32||(D.copy(L.matrixWorld).invert(),w.setFromMatrixPosition(x.matrixWorld).applyMatrix4(D),x.getWorldDirection(b).transformDirection(D),w.distanceToSquared(F)<.012&&b.dot(R)>.99997&&W.equals(x.projectionMatrix)&&E===G))return;F.copy(w),R.copy(b),W.copy(x.projectionMatrix),V=q,E=G,_.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse).multiply(L.matrixWorld),C.setFromProjectionMatrix(_);const ie={eye:w.toArray(),forward:b.toArray(),planes:C.planes.flatMap(({normal:I,constant:re})=>[I.x,I.y,I.z,re]),budget:G};n.postMessage({view:ie,output:r},[r]),v=i?.(),r=void 0},{mesh:U,dispose(){n.terminate(),A(),d.dispose(),m.dispose(),u.dispose(),p.dispose()}}}function Ge(){const e=new URLSearchParams(location.search);if(e.get("solo")===`island:${Q}`)return se.find(t=>t.id===e.get("shot"))}function Ie(e){const t=new Z(e.fov,innerWidth/Math.max(1,innerHeight),.075,2e4);t.position.set(e.eye.x,e.eye.y,-e.eye.z),t.lookAt(e.look.x,e.look.y,-e.look.z),t.updateMatrixWorld();const o=new P().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),s=new Y().setFromProjectionMatrix(o);return{eye:t.position.toArray(),forward:t.getWorldDirection(new f).toArray(),planes:s.planes.flatMap(({normal:i,constant:n})=>[i.x,i.y,i.z,n])}}class je extends be{install;setup(t){const{origin:o}=S,s=({x:r,y:l,z:p})=>new f(o.x+r,o.y+l,-o.z-p),i=s(t.eye),n=s(t.look);let a=()=>{};return this.install=r=>{const l=r.onBeforeRender,p=(...u)=>{l.apply(r,u);const c=u[2];c instanceof Z&&c.fov!==t.fov&&(c.fov=t.fov,c.updateProjectionMatrix()),c.position.copy(i),c.lookAt(n),c.updateMatrixWorld()};r.onBeforeRender=p,a=()=>{r.onBeforeRender===p&&(r.onBeforeRender=l)}},()=>a()}copy(t,o){super.copy(t,o);const s=t.install;if(s){let i=function(n){if(n instanceof Me){s(n);return}if(n.parent){i(n.parent);return}const a=()=>{n.removeEventListener("added",a),n.parent&&i(n.parent)};n.addEventListener("added",a)};i(this)}return this}}function Be(){const e=new f(-.81,.25,.53).normalize();return(t,o)=>{const s=t.children.find(l=>l.visible&&l instanceof X);s instanceof X&&e.copy(s.position).sub(s.target.position).normalize();const i=k.smoothstep(o,4.75,7.4),n=k.smoothstep(o,19.45,21.35),a=1-i+n;return{sunset:Math.max(1-k.smoothstep(o,7.4,10.2),k.smoothstep(o,15.8,19))*(1-a),night:a,sunDirection:e}}}const B="pointille-paint",Se={x:0,y:0,z:0};let y=0,z;const Ke={manifest:S,async loadContent(){return le},async buildChunk({signal:e}){return e.throwIfAborted(),{models:[{assetKey:B,position:Se}],meshes:[await H("pointilleGround",{},e)],surfaces:ae(S.anchors.roosts[0])}},async loadAssets(e,{seed:t,signal:o,beginVisualUpdate:s}){if(!e.includes(B))throw new Error("Pointille requested an unknown asset");const i=Ge(),{island:n,order:a}=await H("pointillePaint",{seed:t,view:i&&Ie(i)},o);o.throwIfAborted();const r=Be(),l=v=>r(v,i?.hour??z?.hour??12.5),p=ke(l),u=De(n,v=>({seconds:i?.seconds??z?.seconds??0,...l(v),hiddenGroups:y}),a,!0,s),c=new je,d=i&&c.setup(i);return c.add(u.mesh),{handles:new Map([[B,c],[ze,p]]),release(){d?.(),u.dispose(),p.dispose()}}},activate({facts:e,frames:t,state:o}){const s=`${Q}:`,i=t.subscribe(a=>{z=a});y=typeof o.hiddenGroups=="number"?o.hiddenGroups:0,o.ribbonTaken===!0&&(y|=1<<K.get(N));const n=e.subscribe(a=>{const r=a.data;if(a.type!=="grabbed"||!r?.thing?.startsWith(s))return;const l=r.thing.slice(s.length),p=K.get(l);p!==void 0&&(y|=1<<p,o.hiddenGroups=y,l===N&&(o.ribbonTaken=!0))});return()=>{i(),n(),z=void 0,y=0}}};export{Ke as island};
