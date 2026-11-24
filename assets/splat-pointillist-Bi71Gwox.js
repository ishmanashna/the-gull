import{w as J,d3 as fe,e as Y,d4 as me,d5 as ge,K as ve,d6 as ye,F as xe,h as he,o as we,G as be,V as v,d7 as ke,M as Me,k as P,i as oe,d8 as ze,d9 as j,da as Ae,db as F,dc as m,dd as Z,de as C,df as Q,dg as X,dh as ne,di as Ce,J as ie,Y as De,S as Ge,dj as O,n as D,N as Pe,b as x,dk as I,dl as je,dm as Fe}from"./index-qmOD1jXO.js";const R=2048,ee=85e3,Se=`
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
`,Ue=`
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
`;function Ie(e,t,r,s=!1,n){const i=new Worker(new URL(""+new URL("sort.worker-Co4cSEFC.js",import.meta.url).href,import.meta.url),{type:"module"}),c=e.centers.slice().buffer;i.postMessage({centers:c,tiles:e.tiles},[c]);let o=new ArrayBuffer(ee*4);const l=e.centers.length/(4*R),p=new J(e.centers,R,l,fe,Y),d=new J(e.paint,R,l,me,Y);p.needsUpdate=d.needsUpdate=!0;const a=new ge(new Uint32Array(ee),1).setUsage(ve);r&&a.array.set(r);const u=new ye;u.setAttribute("position",new xe([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),u.setIndex([0,1,2,0,2,3]),u.setAttribute("sortedIndex",a),u.instanceCount=r?.length??0;let f;const h=()=>{f?.(),f=void 0};i.onmessage=({data:y})=>{o=y.output,a.array.set(new Uint32Array(o,0,y.count)),a.clearUpdateRanges(),y.count&&(a.addUpdateRange(0,y.count),a.needsUpdate=!0),u.instanceCount=y.count,h()},i.onerror=h;const w=new he,g=new we({glslVersion:be,vertexShader:Se,fragmentShader:Ue,fog:!0,transparent:!0,depthWrite:s,uniforms:{...ke.clone(ze.basic.uniforms),centers:{value:p},paint:{value:d},viewport:{value:w},seconds:{value:0},hiddenGroups:{value:0},sunset:{value:0},night:{value:0},sunDirection:{value:new v(-.81,.25,.53).normalize()},paintEdges:{value:Number(s)}}}),W=new Me(u,g);W.frustumCulled=!1;const S=new P,E=new P,L=new oe,z=new v,A=new v,V=new v(1/0,0,0),T=new v,q=new P;let K=-1/0;return g.onBeforeRender=(y,re,b,Ne,N)=>{const{seconds:ae,sunset:ce,night:le,sunDirection:H,hiddenGroups:pe}=t(re);y.getDrawingBufferSize(w),g.uniforms.seconds.value=ae,g.uniforms.sunset.value=ce,g.uniforms.night.value=le??0,H&&g.uniforms.sunDirection.value.copy(H),g.uniforms.hiddenGroups.value=pe;const $=performance.now();if(!o||$-K<32||(S.copy(N.matrixWorld).invert(),z.setFromMatrixPosition(b.matrixWorld).applyMatrix4(S),b.getWorldDirection(A).transformDirection(S),z.distanceToSquared(V)<.012&&A.dot(T)>.99997&&q.equals(b.projectionMatrix)))return;V.copy(z),T.copy(A),q.copy(b.projectionMatrix),K=$,E.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse).multiply(N.matrixWorld),L.setFromProjectionMatrix(E);const de={eye:z.toArray(),forward:A.toArray(),planes:L.planes.flatMap(({normal:U,constant:ue})=>[U.x,U.y,U.z,ue])};i.postMessage({view:de,output:o},[o]),f=n?.(),o=void 0},{mesh:W,dispose(){i.terminate(),h(),u.dispose(),g.dispose(),d.dispose(),p.dispose()}}}const M="parasol-ribbon",_=[{id:"amber-button",position:m(-89,C(-89)-5.6,.55),color:"#f4b461",place:"promenade"},{id:"blue-bead",position:m(-52,C(-52)+6.4,.21),color:"#719bea",place:"promenade"},{id:"copper-token",position:m(44,C(44)-2.3,.19),color:"#e49b76",place:"promenade"},{id:"violet-brooch",position:m(Q.x,Q.z,.44),color:"#c58fdb",place:"bandstand"},{id:"pearl-pin",position:m(89,C(89)-10,.24),color:"#ffebc6",place:"bandstand"},{id:"boat-bell",position:{x:F.x+.15,y:2.85,z:F.z-.78},color:"#ffcc69",place:"inlet"},{id:"glass-float",position:{x:22.12,y:2.6,z:X(20)-25.9},color:"#75d6c6",place:"inlet"},{id:"silver-thimble",position:m(-133,X(-133)+38,.46),color:"#a5c6de",place:"north-bank"},{id:"palette-knife",position:m(17,111,.23),color:"#ffe190",place:"north-bank",souvenir:"palette-knife"},{id:"sea-glass",position:m(-213,-130,.18),color:"#9fe1b2",place:"shore"}],te=new Map([M,..._.map(e=>e.id)].map((e,t)=>[e,t+1])),Re={finds:_.map(e=>({...e,kind:"glint",tags:["trinket"]})),interactions:[{id:M,kind:"item",place:"promenade",position:Ae,color:"#ed6b68",tags:["trinket"]},{id:"ribbon-parasol",kind:"perch",position:m(Z.x,Z.z,3.04),place:"promenade"},{id:"funnel",kind:"perch",position:{x:F.x+.43,y:4.85,z:F.z},place:"inlet"}],landmarks:j.anchors.roosts,rules:[..._.map(e=>({id:e.id,steps:[{fact:"grabbed",thing:e.id}],reward:{coins:1}})),{id:"snatch-the-ribbon",steps:[{fact:"grabbed",thing:M}],reward:{coins:2}}]};function Be(){const e=new URLSearchParams(location.search);if(e.get("solo")===`island:${ne}`)return Ce.find(t=>t.id===e.get("shot"))}function _e(e){const t=new ie(e.fov,innerWidth/Math.max(1,innerHeight),.075,2e4);t.position.set(e.eye.x,e.eye.y,-e.eye.z),t.lookAt(e.look.x,e.look.y,-e.look.z),t.updateMatrixWorld();const r=new P().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),s=new oe().setFromProjectionMatrix(r);return{eye:t.position.toArray(),forward:t.getWorldDirection(new v).toArray(),planes:s.planes.flatMap(({normal:n,constant:i})=>[n.x,n.y,n.z,i])}}class We extends De{install;setup(t){const{origin:r}=j,s=({x:o,y:l,z:p})=>new v(r.x+o,r.y+l,-r.z-p),n=s(t.eye),i=s(t.look);let c=()=>{};return this.install=o=>{const l=o.onBeforeRender,p=(...d)=>{l.apply(o,d);const a=d[2];a instanceof ie&&a.fov!==t.fov&&(a.fov=t.fov,a.updateProjectionMatrix()),a.position.copy(n),a.lookAt(i),a.updateMatrixWorld()};o.onBeforeRender=p,c=()=>{o.onBeforeRender===p&&(o.onBeforeRender=l)}},()=>c()}copy(t,r){super.copy(t,r);const s=t.install;if(s){let n=function(i){if(i instanceof Ge){s(i);return}if(i.parent){n(i.parent);return}const c=()=>{i.removeEventListener("added",c),i.parent&&n(i.parent)};i.addEventListener("added",c)};n(this)}return this}}function Ee(){const e=new v(-.81,.25,.53).normalize();return(t,r)=>{const s=t.children.find(l=>l.visible&&l instanceof O);s instanceof O&&e.copy(s.position).sub(s.target.position).normalize();const n=D.smoothstep(r,4.75,7.4),i=D.smoothstep(r,19.45,21.35),c=1-n+i;return{sunset:Math.max(1-D.smoothstep(r,7.4,10.2),D.smoothstep(r,15.8,19))*(1-c),night:c,sunDirection:e}}}const se="pointille-underpainting",Le=new Map([[13279864,new x(13279864)],[12556386,new x(12556386)],[4023666,new x(4023666)],[8889402,new x(8889402)]]);function Ve(){const s=new Float32Array(32631),n=new Float32Array(s.length*3),i=new Float32Array(n.length),c=[];for(let o=0;o<149;o++)for(let l=0;l<219;l++){const p=(l-109)*3,d=(o-148/2)*3,a=o*219+l,u=I(p,d),f=(u-I(p+.425,d))/.425,h=(u-I(p,d+.425))/.425,w=Le.get(je(p,u,d,f,h).base);s[a]=u,n.set([p,u-.42-.45*Math.hypot(f,h),d],a*3),i.set([w.r,w.g,w.b],a*3)}for(let o=0;o<148;o++)for(let l=0;l<218;l++){const p=o*219+l,d=p+1,a=p+219,u=a+1;Math.max(s[p],s[d],s[a],s[u])<-.5||c.push(p,a,d,d,a,u)}return{positions:n,colors:i,indices:Uint16Array.from(c),materialKey:se}}function Te(e){const t=new Pe({vertexColors:!0}),r=new x(16777215),s=new x(16758917),n=new x(6844569);return t.onBeforeRender=(i,c)=>{const o=e(c);t.color.copy(r).lerp(s,o.sunset*.58).lerp(n,o.night)},t}const B="pointille-paint",qe={x:0,y:0,z:0};let k=0,G;function Ke(e,t){return t.throwIfAborted(),new Promise((r,s)=>{const n=new Worker(new URL(""+new URL("paint.worker-DHSGNSZh.js",import.meta.url).href,import.meta.url),{type:"module"}),i=()=>{n.terminate(),t.removeEventListener("abort",c)},c=()=>{i(),s(t.reason)};t.addEventListener("abort",c,{once:!0}),n.onmessage=({data:o})=>{i(),r(o)},n.onerror=o=>{i(),s(new Error(o.message||"Pointille paint worker failed"))},n.postMessage(e)})}const $e={manifest:j,async loadContent(){return Re},async buildChunk({signal:e}){return e.throwIfAborted(),{models:[{assetKey:B,position:qe}],meshes:[Ve()],surfaces:Fe(j.anchors.roosts[0])}},async loadAssets(e,{seed:t,signal:r,beginVisualUpdate:s}){if(!e.includes(B))throw new Error("Pointille requested an unknown asset");const n=Be(),{island:i,order:c}=await Ke({seed:t,view:n&&_e(n)},r);r.throwIfAborted();const o=Ee(),l=f=>o(f,n?.hour??G?.hour??12.5),p=Te(l),d=Ie(i,f=>({seconds:n?.seconds??G?.seconds??0,...l(f),hiddenGroups:k}),c,!0,s),a=new We,u=n&&a.setup(n);return a.add(d.mesh),{handles:new Map([[B,a],[se,p]]),release(){u?.(),d.dispose(),p.dispose()}}},activate({facts:e,frames:t,state:r}){const s=`${ne}:`,n=t.subscribe(c=>{G=c});k=typeof r.hiddenGroups=="number"?r.hiddenGroups:0,r.ribbonTaken===!0&&(k|=1<<te.get(M));const i=e.subscribe(c=>{const o=c.data;if(c.type!=="grabbed"||!o?.thing?.startsWith(s))return;const l=o.thing.slice(s.length),p=te.get(l);p!==void 0&&(k|=1<<p,r.hiddenGroups=k,l===M&&(r.ribbonTaken=!0))});return()=>{n(),i(),G=void 0,k=0}}};export{$e as island};
