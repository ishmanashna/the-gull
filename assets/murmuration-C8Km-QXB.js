import{M as L,eN as Pe,B as Fe,F as we,eO as j,p as te,c as Ie,eP as Te,eQ as be,K as Oe,C as oe,aD as Be,eR as Ge,P as Re,X as je,cq as Le,E as ce,cn as Se,k as Qe,a2 as Ee,_ as qe,b as Me,q as He,V as A,aL as Ae,t as Ne,a as Ce,H as We}from"./index-yC7XslmD.js";const Xe=new Pe(-1,1,1,-1,0,1);class $e extends Fe{constructor(){super(),this.setAttribute("position",new we([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new we([0,2,0,0,2,0],2))}}const Ke=new $e;class Ze{constructor(e){this._mesh=new L(Ke,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Xe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Je{constructor(e,r,n){this.variables=[],this.currentTextureIndex=0;let u=Te;const k={passThruTexture:{value:null}},p=O(Q(),k),_=new Ze(p);this.setDataType=function(o){return u=o,this},this.addVariable=function(o,t,i){const m=this.createShaderMaterial(t),a={name:o,initialValueTexture:i,material:m,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:j,magFilter:j};return this.variables.push(a),a},this.setVariableDependencies=function(o,t){o.dependencies=t},this.init=function(){if(n.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let o=0;o<this.variables.length;o++){const t=this.variables[o];t.renderTargets[0]=this.createRenderTarget(e,r,t.wrapS,t.wrapT,t.minFilter,t.magFilter),t.renderTargets[1]=this.createRenderTarget(e,r,t.wrapS,t.wrapT,t.minFilter,t.magFilter),this.renderTexture(t.initialValueTexture,t.renderTargets[0]),this.renderTexture(t.initialValueTexture,t.renderTargets[1]);const i=t.material,m=i.uniforms;if(t.dependencies!==null)for(let a=0;a<t.dependencies.length;a++){const v=t.dependencies[a];if(v.name!==t.name){let g=!1;for(let S=0;S<this.variables.length;S++)if(v.name===this.variables[S].name){g=!0;break}if(!g)return"Variable dependency not found. Variable="+t.name+", dependency="+v.name}m[v.name]={value:null},i.fragmentShader=`
uniform sampler2D `+v.name+`;
`+i.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const o=this.currentTextureIndex,t=this.currentTextureIndex===0?1:0;for(let i=0,m=this.variables.length;i<m;i++){const a=this.variables[i];if(a.dependencies!==null){const v=a.material.uniforms;for(let g=0,S=a.dependencies.length;g<S;g++){const q=a.dependencies[g];v[q.name].value=q.renderTargets[o].texture}}this.doRenderTarget(a.material,a.renderTargets[t])}this.currentTextureIndex=t},this.getCurrentRenderTarget=function(o){return o.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(o){return o.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){_.dispose();const o=this.variables;for(let t=0;t<o.length;t++){const i=o[t];i.initialValueTexture&&i.initialValueTexture.dispose();const m=i.renderTargets;for(let a=0;a<m.length;a++)m[a].dispose()}};function w(o){o.defines.resolution="vec2( "+e.toFixed(1)+", "+r.toFixed(1)+" )"}this.addResolutionDefine=w;function O(o,t){t=t||{};const i=new te({name:"GPUComputationShader",uniforms:t,vertexShader:T(),fragmentShader:o});return w(i),i}this.createShaderMaterial=O,this.createRenderTarget=function(o,t,i,m,a,v){return o=o||e,t=t||r,i=i||oe,m=m||oe,a=a||j,v=v||j,new Ie(o,t,{wrapS:i,wrapT:m,minFilter:a,magFilter:v,format:be,type:u,depthBuffer:!1})},this.createTexture=function(){const o=new Float32Array(e*r*4),t=new Oe(o,e,r,be,Te);return t.needsUpdate=!0,t},this.renderTexture=function(o,t){k.passThruTexture.value=o,this.doRenderTarget(p,t),k.passThruTexture.value=null},this.doRenderTarget=function(o,t){const i=n.getRenderTarget(),m=n.xr.enabled,a=n.shadowMap.autoUpdate;n.xr.enabled=!1,n.shadowMap.autoUpdate=!1,_.material=o,n.setRenderTarget(t),_.render(n),_.material=p,n.xr.enabled=m,n.shadowMap.autoUpdate=a,n.setRenderTarget(i)};function T(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function Q(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}class le{constructor(e){this.gl=e,this.extension=e.getExtension("EXT_disjoint_timer_query_webgl2")}gl;extension;pending=[];samples=[];active=null;cursor=0;begin(){const{gl:e,extension:r}=this;!r||this.active||this.pending.length>=6||e.getQuery(r.TIME_ELAPSED_EXT,e.CURRENT_QUERY)||(this.active=e.createQuery(),this.active&&e.beginQuery(r.TIME_ELAPSED_EXT,this.active))}end(){!this.active||!this.extension||(this.gl.endQuery(this.extension.TIME_ELAPSED_EXT),this.pending.push(this.active),this.active=null)}collect(){const{gl:e,extension:r}=this;if(!(!r||!this.pending.length)){if(e.getParameter(r.GPU_DISJOINT_EXT)){this.dispose(),this.samples.length=0,this.cursor=0;return}for(;this.pending.length&&e.getQueryParameter(this.pending[0],e.QUERY_RESULT_AVAILABLE);){const n=this.pending.shift();this.samples[this.cursor]=e.getQueryParameter(n,e.QUERY_RESULT)/1e6,this.cursor=(this.cursor+1)%120,e.deleteQuery(n)}}}summary(){if(!this.samples.length)return;const e=[...this.samples].sort((r,n)=>r-n);return{median:e[Math.ceil(.5*e.length)-1],p95:e[Math.ceil(.95*e.length)-1]}}dispose(){this.end(),this.pending.splice(0).forEach(e=>this.gl.deleteQuery(e))}}const De=`
  uniform float time;
  uniform vec3 hawk;
  const float TAU = 6.2831853;

  float hash(float n) { return fract(sin(n * 127.1 + 3.1) * 43758.5453); }

  float wingAngle(vec2 uv) {
    float phase = time * mix(48.0, 65.0, fract(uv.x * 27.3)) + uv.y * 173.0;
    float coast = smoothstep(-0.68, -0.15, cos(time * 2.1 + uv.x * 39.0 + uv.y * 71.0));
    return 0.15 + sin(phase) * coast * 0.95;
  }

  vec3 home(vec2 uv) {
    float id = floor(uv.y * resolution.y) * resolution.x + floor(uv.x * resolution.x);
    float u = (id + 0.5) / (resolution.x * resolution.y);
    float side = u < 0.5 ? -1.0 : 1.0;
    float s = sin(asin(2.0 * fract(2.0 * u) - 1.0) / 1.32);
    float theta = TAU * hash(id + 17.0) + time * (0.43 + 0.08 * s);
    // Each bank carries a dense spine and a softer fringe as it rolls.
    float core = 1.0 - step(3.0, mod(id, 5.0));
    float r = mix(sqrt(hash(id + 31.0)), 0.59 * pow(hash(id + 31.0), 0.85), core) *
              sqrt(max(0.0, 1.0 - s * s));
    float wave = 3.1 * s - time * 0.49 + side * 0.65;
    float ribbon = 0.5 + 0.5 * sin(time * 0.29 - s * 2.35 + side);
    vec2 section = r * vec2(cos(theta) * mix(20.0, 9.0, ribbon),
                            sin(theta) * mix(19.0, 7.0, ribbon));
    float roll = 1.15 * sin(s * 2.5 - time * 0.31);
    section = mat2(cos(roll), sin(roll), -sin(roll), cos(roll)) * section;
    float span = 19.0 + 8.0 * sin(wave + 0.9) + 10.0 * smoothstep(-0.24, 0.76, s);
    vec3 p = vec3(side * span + section.x,
                  2.0 + 12.0 * sin(wave) + 5.0 * sin(s * 5.6 + time * 0.27) + section.y,
                  -40.0 + s * (91.0 + 9.0 * sin(time * 0.2)) + 11.0 * cos(wave));
    p += vec3(3.2 * sin(time * 0.23), 3.0 * sin(time * 0.18), 5.0 * cos(time * 0.2));

    // A crosswise pass peels the two sides apart. The gap decays in the wake.
    float wake = smoothstep(-13.0, 3.0, hawk.z - p.z) *
                 (1.0 - smoothstep(13.0, 54.0, hawk.z - p.z));
    float reach = 1.0 - smoothstep(0.0, 27.0, abs(p.x - hawk.x));
    p.x += side * wake * reach * 11.0;
    p.y += wake * reach * 5.0 * (p.y < hawk.y ? -1.0 : 1.0);
    return p;
  }
`,Ye=`
  ${De}
  uniform float stepSeconds;
  uniform bool resetState;
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 p = texture2D(birdPosition, uv);
    vec3 v = texture2D(birdVelocity, uv).xyz;
    gl_FragColor = vec4(resetState ? home(uv) : p.xyz + v * stepSeconds, sin(wingAngle(uv)));
  }
`,et=`
  ${De}
  uniform float stepSeconds;
  uniform bool resetState;
  uniform vec3 gull;

  vec3 avoid(vec3 from, float radius, float force) {
    float d = length(from);
    return from * (force * (1.0 - smoothstep(0.0, radius, d)) / max(d, 0.2));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 p = texture2D(birdPosition, uv).xyz;
    vec3 v = texture2D(birdVelocity, uv).xyz;
    vec3 target = home(uv);
    float spread = cos(wingAngle(uv));
    if (resetState) {
      gl_FragColor = vec4(normalize(vec3(0.4, sin(uv.y * TAU) * 0.5, 0.8)) * 9.0, spread);
      return;
    }
    // Adjacent rows sample nearby slices of the same formation. The sampled
    // birds contribute only within reaction range, keeping the work linear.
    vec3 alignment = vec3(0.0);
    vec3 separation = vec3(0.0);
    for (int i = 0; i < 4; i++) {
      vec2 offset = vec2(float(i * 11 + 7), i < 2 ? -1.0 : 1.0);
      vec2 nearUV = vec2(fract(uv.x + offset.x / resolution.x),
                         clamp(uv.y + offset.y / resolution.y, 0.0, 1.0));
      vec3 offsetPosition = p - texture2D(birdPosition, nearUV).xyz;
      float distanceToBird = length(offsetPosition);
      float influence = 1.0 - smoothstep(2.0, 10.0, distanceToBird);
      alignment += (texture2D(birdVelocity, nearUV).xyz - v) * influence * 0.24;
      separation += avoid(offsetPosition, 1.25, 9.0);
    }
    vec3 toTarget = target - p;
    vec3 intent = toTarget * (23.0 / (13.0 + length(toTarget)));
    vec3 toGull = p - gull;
    toGull.z *= 0.40;
    vec3 acceleration = (intent - v) * 2.25 + alignment + separation +
                       avoid(toGull, 12.0, 112.0) + avoid(p - hawk, 18.0, 105.0);
    v += acceleration * stepSeconds;
    v *= min(1.0, 24.0 / max(length(v), 0.01));
    gl_FragColor = vec4(v, spread);
  }
`,tt=`
  attribute vec2 birdUV;
  attribute float birdCore;
  uniform sampler2D positions;
  uniform sampler2D velocities;
  uniform mat4 clipFromFlock;
  varying float shade;
  varying float core;

  void main() {
    vec4 p = texture2D(positions, birdUV);
    vec4 v = texture2D(velocities, birdUV);
    vec3 forward = normalize(v.xyz + vec3(0.001, 0.0, 0.002));
    vec3 side = normalize(vec3(v.z + 0.002, 0.0, -v.x - 0.001));
    vec3 up = cross(forward, side);
    float wing = step(0.2, abs(position.x));
    vec3 local = position;
    local.x *= mix(1.0, v.w, wing);
    local.y += abs(position.x) * p.w * wing;
    local.z += abs(position.x) * min(0.0, p.w) * 0.18 * wing;
    float size = mix(0.82, 1.16, fract(birdUV.x * 16.7 + birdUV.y * 11.3));
    shade = 0.55 + 0.25 * up.y + wing * (0.12 - 0.16 * p.w);
    core = birdCore;
    gl_Position = clipFromFlock * vec4(p.xyz + size * (side * local.x + up * local.y + forward * local.z), 1.0);
  }
`,ot=`
  varying float shade;
  varying float core;

  void main() {
    vec3 feather = mix(vec3(0.012, 0.010, 0.016), vec3(0.047, 0.036, 0.044), shade);
    gl_FragColor = vec4(feather * mix(1.0, 0.38, core), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function rt(s,e){const r=new Le;r.setAttribute("position",new ce(new Float32Array([0,0,.24,-.052,0,.065,0,0,-.22,.052,0,.065,-.3,0,.015,.3,0,.015]),3)),r.setIndex([0,1,2,0,2,3,1,4,2,3,2,5]);const n=s*e,u=new Float32Array(n*2),k=new Float32Array(n);for(let w=0;w<n;w++)u[2*w]=(w%s+.5)/s,u[2*w+1]=(Math.floor(w/s)+.5)/e,k[w]=w%5<3?1:0;r.setAttribute("birdUV",new Se(u,2)),r.setAttribute("birdCore",new Se(k,1)),r.instanceCount=n;const p=new te({vertexShader:tt,fragmentShader:ot,side:Ee,uniforms:{positions:{value:null},velocities:{value:null},clipFromFlock:{value:new Qe}}}),_=new L(r,p);return _.name="Murmuration starlings",_.renderOrder=20,_.frustumCulled=!1,_}function nt(){const s=[0,.05,.47,-.11,0,.16,-.2,.015,-.65,.2,.015,-.65,.11,0,.16],e=[0,0,.24,.31,0,.37,.81,0,.23,1.05,0,.05,1.05,0,-.04,.87,0,-.14,.64,0,-.22,.28,0,-.28,0,0,-.2],r=[0,1,7,0,7,8,1,2,6,1,6,7,2,3,4,2,4,5,2,5,6],n=s.length/3,u=e.length/3,k=new Fe,p=new ce(new Float32Array([...s,...e,...e]),3).setUsage(qe);k.setAttribute("position",p),k.setIndex([0,1,4,1,2,3,1,3,4,...r.map(o=>o+n),...r.map(o=>o+n+u)]);const _=new Me(3418418).toArray(),w=new Me(4797755).toArray(),O=Array.from({length:p.count},(o,t)=>t<n?_:w).flat();k.setAttribute("color",new ce(new Float32Array(O),3));const T=new L(k,new He({vertexColors:!0,side:Ee}));T.name="Murmuration hawk",T.scale.setScalar(3),T.frustumCulled=!1,T.renderOrder=21;const Q=new A;return{object:T,pose(o,t,i){T.position.copy(t),T.lookAt(Q.copy(t).add(i)),T.rotateX(-.25),T.rotateZ(.34*Math.cos(o*1.95)+.38);const m=.09+.46*Math.sin(o*14.2)*Math.max(0,Math.cos(o*1.71));for(let a=0;a<u;a++){const v=e[3*a]*Math.cos(m),g=e[3*a]*Math.sin(m),S=e[3*a+2];p.setXYZ(n+a,-v,g,S),p.setXYZ(n+u+a,v,g,S)}p.needsUpdate=!0},dispose(){T.geometry.dispose(),T.material.dispose()}}}function it(){const s="normalize(vec3(-0.47, 0.025, -0.88))",e=new L(new Be(8500,24,12),new te({side:Ge,depthTest:!1,depthWrite:!1,vertexShader:`
      varying vec3 direction;
      void main() {
        direction = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 direction;
      void main() {
        vec3 ray = normalize(direction);
        float height = ray.y;
        float glow = pow(max(0.0, dot(ray, ${s})), 8.0);
        vec3 horizon = vec3(0.64, 0.29, 0.22) + glow * vec3(0.24, 0.15, 0.046);
        vec3 sky = mix(horizon, vec3(0.075, 0.10, 0.24), smoothstep(-0.015, 0.43, height));
        sky = mix(sky, vec3(0.11, 0.13, 0.20), smoothstep(0.02, 0.27, -height));
        gl_FragColor = vec4(sky, 1.0);
        #include <colorspace_fragment>
      }
    `}));e.name="Murmuration preview dusk",e.renderOrder=-100,e.frustumCulled=!1;const r=new L(new Re(42e3,42e3),new te({uniforms:{time:{value:0}},polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,vertexShader:`
      varying vec3 world;
      void main() {
        world = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
      }
    `,fragmentShader:`
      uniform float time;
      varying vec3 world;
      void main() {
        vec3 ray = normalize(world - cameraPosition);
        vec3 reflection = vec3(ray.x, -ray.y, ray.z);
        float glow = pow(max(0.0, dot(reflection, ${s})), 13.0);
        float distanceToWater = length(world - cameraPosition);
        float wave = sin(world.x * 0.12 + world.z * 0.33 - time * 2.6 +
                         1.5 * sin(world.x * 0.021 - world.z * 0.013));
        wave += 0.45 * sin(world.x * 0.31 - world.z * 0.21 + time * 1.9);
        float ripples = smoothstep(0.62, 1.28, wave) * (1.0 - smoothstep(500.0, 1250.0, distanceToWater));
        vec3 deep = vec3(0.034, 0.065, 0.105) + ripples * vec3(0.035, 0.025, 0.033);
        vec3 horizon = vec3(0.64, 0.29, 0.22) + glow * vec3(0.24, 0.15, 0.046);
        vec3 color = mix(deep + glow * vec3(0.13, 0.063, 0.035), horizon, exp(ray.y * 24.0));
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `}));return r.rotation.x=-Math.PI/2,{object:e,water:r,update(n,u){e.position.copy(n.position),r.position.set(n.position.x,je+1.5,n.position.z),r.material.uniforms.time.value=u},dispose(){e.geometry.dispose(),e.material.dispose(),r.geometry.dispose(),r.material.dispose()}}}const Z=80,J=64,ke=17,I=Ce.windRivers.spurs.find(({from:s,to:e})=>s==="home-lookkit"&&e==="procedural-paris"),re=Ce.islands.find(({id:s})=>s===I.to),U=Math.atan2(re.origin.x-I.origin.x,re.origin.z-I.origin.z),Y=new A(0,1,0),ee=new A(I.origin.x+(re.origin.x-I.origin.x)*.18,86,-(I.origin.z+(re.origin.z-I.origin.z)*.18)),at=[{id:"murmuration-dusk",z:122,phase:7.1},{id:"murmuration-pass",z:12,phase:9.6},{id:"murmuration-exit",z:-59,phase:11.8}];function D(s){return s.applyAxisAngle(Y,-U).add(ee)}function st(s,e){return s>=Ae.duskHour&&s<Ae.nightStartHour&&e==="clear"}function _e(s,e,r){const n=(s+.4)%22,u=Math.PI*(n-9.5)/11;e.set(26*(1-Math.cos(u))-5,10+6*Math.sin(2*u),114*Math.sin(u)-47),r.set(26*Math.sin(u),12*Math.cos(2*u),114*Math.cos(u))}const ct={layer:"air",create(s,{renderer:e,preview:r,shot:n}){let u=0;function k({registrations:c,sim:l,refresh:P,takeOff:h,setHour:y}){if(!r)for(const b of at)c.screens.set(b.id,()=>{const R=D(new A(0,0,b.z));y(20.4),l.state.weather="clear",delete l.state.weatherPlace,l.state.target=null,h(),l.teleport({x:R.x,y:R.y,z:-R.z},U,0,0),c.camera.setOverride(null),u=b.phase-l.state.tick*Ne,P()})}const p=r?it():void 0;p&&s.add(p.object,p.water);const _=({camera:c,gullPosition:l,seconds:P})=>{if(!p)return;const h=P%ke;if(n)D(c.position.copy(w)),D(i.copy(O)),D(l.copy(T));else{const y=Math.min(1,Math.max(0,(h-1.5)/10));l.copy(Q),l.z+=122-241*y,l.x+=5*Math.sin(y*Math.PI),l.y+=9*Math.sin(y*Math.PI*.8),c.position.copy(l).add(o),i.copy(l).add(t);const b=Math.min(1,Math.max(0,(h-11.7)/3.4)),R=Math.PI*b*b*(3-2*b);i.x+=72*Math.sin(R),i.z+=144*(1-Math.cos(R))*.5,D(l),D(c.position),D(i)}return c.lookAt(i),p.update(c,h),-U},w=new A(18,-10,139),O=new A(0,1,0),T=new A(9,-12,116),Q=new A(-5,-8,0),o=new A(3,4,8),t=new A(0,3,-72),i=new A,m=()=>{p&&(p.object.removeFromParent(),p.water.removeFromParent(),p.dispose())};function*a(c){if(!e.extensions.has("EXT_color_buffer_float"))return;const l=new Je(Z,J,e),P=[];let h;try{return h=yield*v(l,P,c.seconds),h}finally{if(!h){for(const y of P)y.dispose();l.dispose()}}}function*v(c,l,P){c.setDataType(We);const h=new A,y=new A,b=new A,R=f=>r&&!n?f%ke:f+u,se={birdPosition:{value:null},birdVelocity:{value:null}},B={...se,time:{value:R(P)},stepSeconds:{value:0},resetState:{value:!0},hawk:{value:h}},fe=`uniform sampler2D birdPosition;
uniform sampler2D birdVelocity;
`,X=c.createShaderMaterial(fe+Ye,{...B});l.push(X),yield"position material";const $=c.createShaderMaterial(fe+et,{...B,gull:{value:b}});l.push($),yield"velocity material";const F=[],ve=()=>c.createRenderTarget(Z,J,oe,oe,j,j);for(let f=0;f<2;f++){const M=ve();l.push(M),e.initRenderTarget(M),yield"position target";const d=ve();l.push(d),e.initRenderTarget(d),F.push({position:M,velocity:d}),yield"velocity target"}const G=e.getContext(),ge=G.getExtension("KHR_parallel_shader_compile"),ye=new Re(2,2).deleteAttribute("normal");l.push(ye);const Ve=new Pe(-1,1,1,-1,0,1);function*xe(f,M,d){const z=new Set(e.info.programs),ze=e.getRenderTarget();try{e.setRenderTarget(M),e.compile(new L(ye,f),Ve)}finally{e.setRenderTarget(ze)}const Ue=e.info.programs?.filter(K=>!z.has(K))??[];if(yield d,!!ge)for(const K of Ue)for(;!ae&&K.program&&!G.isContextLost()&&!G.getProgramParameter(K.program,ge.COMPLETION_STATUS_KHR);)yield!1}yield*xe(X,F[0].position,"position shader"),yield*xe($,F[0].velocity,"velocity shader"),c.doRenderTarget(X,F[0].position),yield"position seed",c.doRenderTarget($,F[0].velocity),yield"velocity seed";let E=0;const x=rt(Z,J);l.push(x.geometry,x.material),x.material.uniforms.positions.value=F[E].position.texture,x.material.uniforms.velocities.value=F[E].velocity.texture,yield"flock mesh";const V=nt();x.position.copy(ee),x.rotation.y=-U,s.add(x,V.object);const H=new le(G),N=new le(G),W=new le(G);x.onBeforeRender=(f,M,d)=>{x.material.uniforms.clipFromFlock.value.copy(d.projectionMatrix).multiply(d.matrixWorldInverse).multiply(x.matrixWorld),N.begin()},x.onAfterRender=()=>N.end(),V.object.onBeforeRender=()=>W.begin(),V.object.onAfterRender=()=>W.end();let C=B.time.value;return _e(C,h,y),V.pose(C,D(i.copy(h)),y.applyAxisAngle(Y,-U)),{update(f,M){if(x.visible=V.object.visible=M,!M){C=-1/0;return}const d=R(f.seconds);if(H.collect(),N.collect(),W.collect(),d===C)return;const z=d<C||d-C>.25;B.time.value=d,B.stepSeconds.value=z?0:Math.min(.05,d-C),B.resetState.value=z,_e(d,h,y),b.copy(f.gullPosition).sub(ee).applyAxisAngle(Y,U),se.birdPosition.value=F[E].position.texture,se.birdVelocity.value=F[E].velocity.texture,E=1-E,H.begin(),c.doRenderTarget(X,F[E].position),c.doRenderTarget($,F[E].velocity),H.end(),x.material.uniforms.positions.value=F[E].position.texture,x.material.uniforms.velocities.value=F[E].velocity.texture,V.pose(d,D(i.copy(h)),y.applyAxisAngle(Y,-U)),C=d},reset(){C=-1/0},perf(){const f=H.summary(),M=N.summary(),d=W.summary(),z={murmurationBirds:x.visible?Z*J:0};return!f||!M||!d?z:{...z,murmurationGpuMedianMs:f.median+M.median+d.median,murmurationGpuP95Ms:f.p95+M.p95+d.p95,murmurationComputeP95Ms:f.p95,murmurationDrawP95Ms:M.p95+d.p95}},dispose(){H.dispose(),N.dispose(),W.dispose(),s.remove(x,V.object),V.dispose();for(const f of l)f.dispose();c.dispose()}}}let g,S,q=!1,ne=0,ue="",de=0,pe=0,me=0,ie=0,he=0,ae=!1;return{connect:k,preview:_,reset(){u=0,g?.reset()},update(c){ae=!!c.fixedView;const l=c.quality.murmurationDistance,P=l>0&&(r||st(c.hour,c.weather)&&c.camera.position.distanceToSquared(ee)<l*l);P&&!q&&(q=!0,pe=performance.now(),S=a(c));let h=!1;if(P&&S)do{const y=performance.now(),b=S.next(),R=performance.now()-y;if(R>ne&&(ne=R,ue=b.done?"publish":b.value||"wait for shader"),de++,!!b.done){g=b.value,h=!0,me=performance.now()-pe,S=void 0;break}}while(ae);if(g&&!h){const y=performance.now();g.update(c,P),P&&(ie=Math.max(ie,performance.now()-y),he++)}},perf:()=>({...g?.perf()??{murmurationBirds:0},murmurationStartupSlices:de,murmurationStartupMaxMs:ne,murmurationStartupElapsedMs:me,murmurationStartupSlowestStep:ue,murmurationSteadyMaxMs:ie,murmurationSteadyUpdates:he}),dispose(){S?.return(void 0),g?.dispose(),m()}}}};export{st as duskAppearance,ct as effect};
