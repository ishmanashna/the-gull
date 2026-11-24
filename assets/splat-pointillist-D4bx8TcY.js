import{K as L,co as ie,e as q,cp as se,cn as re,_ as ae,cq as ce,F as le,h as pe,p as ue,G as de,V as m,cr as fe,M as me,k,i as J,cs as ve,ct as Z,cu as xe,Z as Q,a1 as ge,cv as I,S as ye,cw as T,n as b,aR as K,cx as he}from"./index-yC7XslmD.js";import{a as G,m as H,v as N,r as $,c as we}from"./content-D56s6ydN.js";import{underpaintingMaterial as be,underpaintingKey as Me}from"./underpainting-Nlic6U6Y.js";import"./street-cast-DYn1YrLN.js";const ke=`
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
`,ze=`
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
`;function Ae(e,t,n,r=!1,i){const o=new Worker(new URL(""+new URL("sort.worker-DBlGJI4R.js",import.meta.url).href,import.meta.url),{type:"module"}),a=e.centers.slice().buffer;o.postMessage({centers:a,tiles:e.tiles},[a]);let s=new ArrayBuffer(H*4);const l=e.centers.length/(4*G),p=new L(e.centers,G,l,ie,q),u=new L(e.paint,G,l,se,q);p.needsUpdate=u.needsUpdate=!0;const c=new re(new Uint32Array(H),1).setUsage(ae);n&&c.array.set(n);const d=new ce;d.setAttribute("position",new le([-1,-1,0,1,-1,0,1,1,0,-1,1,0],3)),d.setIndex([0,1,2,0,2,3]),d.setAttribute("sortedIndex",c),d.instanceCount=n?.length??0;let v;const z=()=>{v?.(),v=void 0};o.onmessage=({data:x})=>{s=x.output,c.array.set(new Uint32Array(s,0,x.count)),c.clearUpdateRanges(),x.count&&(c.addUpdateRange(0,x.count),c.needsUpdate=!0),d.instanceCount=x.count,z()},o.onerror=z;const j=new pe,f=new ue({glslVersion:de,vertexShader:ke,fragmentShader:ze,fog:!0,transparent:!0,depthWrite:r,uniforms:{...fe.clone(ve.basic.uniforms),centers:{value:p},paint:{value:u},viewport:{value:j},seconds:{value:0},hiddenGroups:{value:0},sunset:{value:0},night:{value:0},sunDirection:{value:new m(-.81,.25,.53).normalize()},paintEdges:{value:Number(r)}}}),R=new me(d,f);R.frustumCulled=!1;const A=new k,S=new k,U=new J,h=new m,w=new m,_=new m(1/0,0,0),B=new m,C=new k;let F=-1/0;return f.onBeforeRender=(x,X,g,Re,W)=>{const{seconds:Y,sunset:O,night:ee,sunDirection:V,hiddenGroups:te}=t(X);x.getDrawingBufferSize(j),f.uniforms.seconds.value=Y,f.uniforms.sunset.value=O,f.uniforms.night.value=ee??0,V&&f.uniforms.sunDirection.value.copy(V),f.uniforms.hiddenGroups.value=te;const E=performance.now();if(!s||E-F<32||(A.copy(W.matrixWorld).invert(),h.setFromMatrixPosition(g.matrixWorld).applyMatrix4(A),g.getWorldDirection(w).transformDirection(A),h.distanceToSquared(_)<.012&&w.dot(B)>.99997&&C.equals(g.projectionMatrix)))return;_.copy(h),B.copy(w),C.copy(g.projectionMatrix),F=E,S.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse).multiply(W.matrixWorld),U.setFromProjectionMatrix(S);const ne={eye:h.toArray(),forward:w.toArray(),planes:U.planes.flatMap(({normal:D,constant:oe})=>[D.x,D.y,D.z,oe])};o.postMessage({view:ne,output:s},[s]),v=i?.(),s=void 0},{mesh:R,dispose(){o.terminate(),z(),d.dispose(),f.dispose(),u.dispose(),p.dispose()}}}function De(){const e=new URLSearchParams(location.search);if(e.get("solo")===`island:${Z}`)return xe.find(t=>t.id===e.get("shot"))}function Ge(e){const t=new Q(e.fov,innerWidth/Math.max(1,innerHeight),.075,2e4);t.position.set(e.eye.x,e.eye.y,-e.eye.z),t.lookAt(e.look.x,e.look.y,-e.look.z),t.updateMatrixWorld();const n=new k().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),r=new J().setFromProjectionMatrix(n);return{eye:t.position.toArray(),forward:t.getWorldDirection(new m).toArray(),planes:r.planes.flatMap(({normal:i,constant:o})=>[i.x,i.y,i.z,o])}}class Pe extends ge{install;setup(t){const{origin:n}=I,r=({x:s,y:l,z:p})=>new m(n.x+s,n.y+l,-n.z-p),i=r(t.eye),o=r(t.look);let a=()=>{};return this.install=s=>{const l=s.onBeforeRender,p=(...u)=>{l.apply(s,u);const c=u[2];c instanceof Q&&c.fov!==t.fov&&(c.fov=t.fov,c.updateProjectionMatrix()),c.position.copy(i),c.lookAt(o),c.updateMatrixWorld()};s.onBeforeRender=p,a=()=>{s.onBeforeRender===p&&(s.onBeforeRender=l)}},()=>a()}copy(t,n){super.copy(t,n);const r=t.install;if(r){let i=function(o){if(o instanceof ye){r(o);return}if(o.parent){i(o.parent);return}const a=()=>{o.removeEventListener("added",a),o.parent&&i(o.parent)};o.addEventListener("added",a)};i(this)}return this}}function Ie(){const e=new m(-.81,.25,.53).normalize();return(t,n)=>{const r=t.children.find(l=>l.visible&&l instanceof T);r instanceof T&&e.copy(r.position).sub(r.target.position).normalize();const i=b.smoothstep(n,4.75,7.4),o=b.smoothstep(n,19.45,21.35),a=1-i+o;return{sunset:Math.max(1-b.smoothstep(n,7.4,10.2),b.smoothstep(n,15.8,19))*(1-a),night:a,sunDirection:e}}}const P="pointille-paint",je={x:0,y:0,z:0};let y=0,M;const Ce={manifest:I,async loadContent(){return we},async buildChunk({signal:e}){return e.throwIfAborted(),{models:[{assetKey:P,position:je}],meshes:[await K("pointilleGround",{},e)],surfaces:he(I.anchors.roosts[0])}},async loadAssets(e,{seed:t,signal:n,beginVisualUpdate:r}){if(!e.includes(P))throw new Error("Pointille requested an unknown asset");const i=De(),{island:o,order:a}=await K("pointillePaint",{seed:t,view:i&&Ge(i)},n);n.throwIfAborted();const s=Ie(),l=v=>s(v,i?.hour??M?.hour??12.5),p=be(l),u=Ae(o,v=>({seconds:i?.seconds??M?.seconds??0,...l(v),hiddenGroups:y}),a,!0,r),c=new Pe,d=i&&c.setup(i);return c.add(u.mesh),{handles:new Map([[P,c],[Me,p]]),release(){d?.(),u.dispose(),p.dispose()}}},activate({facts:e,frames:t,state:n}){const r=`${Z}:`,i=t.subscribe(a=>{M=a});y=typeof n.hiddenGroups=="number"?n.hiddenGroups:0,n.ribbonTaken===!0&&(y|=1<<N.get($));const o=e.subscribe(a=>{const s=a.data;if(a.type!=="grabbed"||!s?.thing?.startsWith(r))return;const l=s.thing.slice(r.length),p=N.get(l);p!==void 0&&(y|=1<<p,n.hiddenGroups=y,l===$&&(n.ribbonTaken=!0))});return()=>{i(),o(),M=void 0,y=0}}};export{Ce as island};
