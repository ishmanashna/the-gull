import{M as B,d_ as de,B as ae,F as K,d$ as Q,o as N,c as pe,e0 as Y,e1 as ee,w as me,C as te,az as he,e2 as fe,P as ve,E as ge,d6 as xe,x as X,d5 as re,k as we,Z as le,K as ye,b as oe,N as Te,V as T,aI as ne,p as be,H as Me,a as ce}from"./index-qmOD1jXO.js";const Se=new de(-1,1,1,-1,0,1);class Ae extends ae{constructor(){super(),this.setAttribute("position",new K([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new K([0,2,0,0,2,0],2))}}const ke=new Ae;class _e{constructor(e){this._mesh=new B(ke,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Se)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Fe{constructor(e,n,o){this.variables=[],this.currentTextureIndex=0;let d=Y;const g={passThruTexture:{value:null}},w=D(I(),g),p=new _e(w);this.setDataType=function(r){return d=r,this},this.addVariable=function(r,t,l){const c=this.createShaderMaterial(t),i={name:r,initialValueTexture:l,material:c,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:Q,magFilter:Q};return this.variables.push(i),i},this.setVariableDependencies=function(r,t){r.dependencies=t},this.init=function(){if(o.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let r=0;r<this.variables.length;r++){const t=this.variables[r];t.renderTargets[0]=this.createRenderTarget(e,n,t.wrapS,t.wrapT,t.minFilter,t.magFilter),t.renderTargets[1]=this.createRenderTarget(e,n,t.wrapS,t.wrapT,t.minFilter,t.magFilter),this.renderTexture(t.initialValueTexture,t.renderTargets[0]),this.renderTexture(t.initialValueTexture,t.renderTargets[1]);const l=t.material,c=l.uniforms;if(t.dependencies!==null)for(let i=0;i<t.dependencies.length;i++){const m=t.dependencies[i];if(m.name!==t.name){let f=!1;for(let M=0;M<this.variables.length;M++)if(m.name===this.variables[M].name){f=!0;break}if(!f)return"Variable dependency not found. Variable="+t.name+", dependency="+m.name}c[m.name]={value:null},l.fragmentShader=`
uniform sampler2D `+m.name+`;
`+l.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const r=this.currentTextureIndex,t=this.currentTextureIndex===0?1:0;for(let l=0,c=this.variables.length;l<c;l++){const i=this.variables[l];if(i.dependencies!==null){const m=i.material.uniforms;for(let f=0,M=i.dependencies.length;f<M;f++){const s=i.dependencies[f];m[s.name].value=s.renderTargets[r].texture}}this.doRenderTarget(i.material,i.renderTargets[t])}this.currentTextureIndex=t},this.getCurrentRenderTarget=function(r){return r.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(r){return r.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){p.dispose();const r=this.variables;for(let t=0;t<r.length;t++){const l=r[t];l.initialValueTexture&&l.initialValueTexture.dispose();const c=l.renderTargets;for(let i=0;i<c.length;i++)c[i].dispose()}};function h(r){r.defines.resolution="vec2( "+e.toFixed(1)+", "+n.toFixed(1)+" )"}this.addResolutionDefine=h;function D(r,t){t=t||{};const l=new N({name:"GPUComputationShader",uniforms:t,vertexShader:x(),fragmentShader:r});return h(l),l}this.createShaderMaterial=D,this.createRenderTarget=function(r,t,l,c,i,m){return r=r||e,t=t||n,l=l||te,c=c||te,i=i||Q,m=m||Q,new pe(r,t,{wrapS:l,wrapT:c,minFilter:i,magFilter:m,format:ee,type:d,depthBuffer:!1})},this.createTexture=function(){const r=new Float32Array(e*n*4),t=new me(r,e,n,ee,Y);return t.needsUpdate=!0,t},this.renderTexture=function(r,t){g.passThruTexture.value=r,this.doRenderTarget(w,t),g.passThruTexture.value=null},this.doRenderTarget=function(r,t){const l=o.getRenderTarget(),c=o.xr.enabled,i=o.shadowMap.autoUpdate;o.xr.enabled=!1,o.shadowMap.autoUpdate=!1,p.material=r,o.setRenderTarget(t),p.render(o),p.material=w,o.xr.enabled=c,o.shadowMap.autoUpdate=i,o.setRenderTarget(l)};function x(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function I(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}class q{constructor(e){this.gl=e,this.extension=e.getExtension("EXT_disjoint_timer_query_webgl2")}gl;extension;pending=[];samples=[];active=null;cursor=0;begin(){const{gl:e,extension:n}=this;!n||this.active||this.pending.length>=6||e.getQuery(n.TIME_ELAPSED_EXT,e.CURRENT_QUERY)||(this.active=e.createQuery(),this.active&&e.beginQuery(n.TIME_ELAPSED_EXT,this.active))}end(){!this.active||!this.extension||(this.gl.endQuery(this.extension.TIME_ELAPSED_EXT),this.pending.push(this.active),this.active=null)}collect(){const{gl:e,extension:n}=this;if(!(!n||!this.pending.length)){if(e.getParameter(n.GPU_DISJOINT_EXT)){this.dispose(),this.samples.length=0,this.cursor=0;return}for(;this.pending.length&&e.getQueryParameter(this.pending[0],e.QUERY_RESULT_AVAILABLE);){const o=this.pending.shift();this.samples[this.cursor]=e.getQueryParameter(o,e.QUERY_RESULT)/1e6,this.cursor=(this.cursor+1)%120,e.deleteQuery(o)}}}summary(){if(!this.samples.length)return;const e=[...this.samples].sort((n,o)=>n-o);return{median:e[Math.ceil(.5*e.length)-1],p95:e[Math.ceil(.95*e.length)-1]}}dispose(){this.end(),this.pending.splice(0).forEach(e=>this.gl.deleteQuery(e))}}const ue=`
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
`,Pe=`
  ${ue}
  uniform float stepSeconds;
  uniform bool resetState;
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 p = texture2D(birdPosition, uv);
    vec3 v = texture2D(birdVelocity, uv).xyz;
    gl_FragColor = vec4(resetState ? home(uv) : p.xyz + v * stepSeconds, sin(wingAngle(uv)));
  }
`,Ce=`
  ${ue}
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
`,Ee=`
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
`,Ve=`
  varying float shade;
  varying float core;

  void main() {
    vec3 feather = mix(vec3(0.012, 0.010, 0.016), vec3(0.047, 0.036, 0.044), shade);
    gl_FragColor = vec4(feather * mix(1.0, 0.38, core), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function ze(a,e){const n=new xe;n.setAttribute("position",new X(new Float32Array([0,0,.24,-.052,0,.065,0,0,-.22,.052,0,.065,-.3,0,.015,.3,0,.015]),3)),n.setIndex([0,1,2,0,2,3,1,4,2,3,2,5]);const o=a*e,d=new Float32Array(o*2),g=new Float32Array(o);for(let h=0;h<o;h++)d[2*h]=(h%a+.5)/a,d[2*h+1]=(Math.floor(h/a)+.5)/e,g[h]=h%5<3?1:0;n.setAttribute("birdUV",new re(d,2)),n.setAttribute("birdCore",new re(g,1)),n.instanceCount=o;const w=new N({vertexShader:Ee,fragmentShader:Ve,side:le,uniforms:{positions:{value:null},velocities:{value:null},clipFromFlock:{value:new we}}}),p=new B(n,w);return p.name="Murmuration starlings",p.renderOrder=20,p.frustumCulled=!1,p}function De(){const a=[0,.05,.47,-.11,0,.16,-.2,.015,-.65,.2,.015,-.65,.11,0,.16],e=[0,0,.24,.31,0,.37,.81,0,.23,1.05,0,.05,1.05,0,-.04,.87,0,-.14,.64,0,-.22,.28,0,-.28,0,0,-.2],n=[0,1,7,0,7,8,1,2,6,1,6,7,2,3,4,2,4,5,2,5,6],o=a.length/3,d=e.length/3,g=new ae,w=new X(new Float32Array([...a,...e,...e]),3).setUsage(ye);g.setAttribute("position",w),g.setIndex([0,1,4,1,2,3,1,3,4,...n.map(r=>r+o),...n.map(r=>r+o+d)]);const p=new oe(3418418).toArray(),h=new oe(4797755).toArray(),D=Array.from({length:w.count},(r,t)=>t<o?p:h).flat();g.setAttribute("color",new X(new Float32Array(D),3));const x=new B(g,new Te({vertexColors:!0,side:le}));x.name="Murmuration hawk",x.scale.setScalar(3),x.frustumCulled=!1,x.renderOrder=21;const I=new T;return{object:x,pose(r,t,l){x.position.copy(t),x.lookAt(I.copy(t).add(l)),x.rotateX(-.25),x.rotateZ(.34*Math.cos(r*1.95)+.38);const c=.09+.46*Math.sin(r*14.2)*Math.max(0,Math.cos(r*1.71));for(let i=0;i<d;i++){const m=e[3*i]*Math.cos(c),f=e[3*i]*Math.sin(c),M=e[3*i+2];w.setXYZ(o+i,-m,f,M),w.setXYZ(o+d+i,m,f,M)}w.needsUpdate=!0},dispose(){x.geometry.dispose(),x.material.dispose()}}}function Re(){const a="normalize(vec3(-0.47, 0.025, -0.88))",e=new B(new he(8500,24,12),new N({side:fe,depthTest:!1,depthWrite:!1,vertexShader:`
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
        float glow = pow(max(0.0, dot(ray, ${a})), 8.0);
        vec3 horizon = vec3(0.64, 0.29, 0.22) + glow * vec3(0.24, 0.15, 0.046);
        vec3 sky = mix(horizon, vec3(0.075, 0.10, 0.24), smoothstep(-0.015, 0.43, height));
        sky = mix(sky, vec3(0.11, 0.13, 0.20), smoothstep(0.02, 0.27, -height));
        gl_FragColor = vec4(sky, 1.0);
        #include <colorspace_fragment>
      }
    `}));e.name="Murmuration preview dusk",e.renderOrder=-100,e.frustumCulled=!1;const n=new B(new ve(42e3,42e3),new N({uniforms:{time:{value:0}},polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,vertexShader:`
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
        float glow = pow(max(0.0, dot(reflection, ${a})), 13.0);
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
    `}));return n.rotation.x=-Math.PI/2,{object:e,water:n,update(o,d){e.position.copy(o.position),n.position.set(o.position.x,ge+1.5,o.position.z),n.material.uniforms.time.value=d},dispose(){e.geometry.dispose(),e.material.dispose(),n.geometry.dispose(),n.material.dispose()}}}const $=80,Z=64,ie=680,se=17,z=ce.windRivers.spurs.find(({from:a,to:e})=>a==="home-lookkit"&&e==="procedural-paris"),W=ce.islands.find(({id:a})=>a===z.to),R=Math.atan2(W.origin.x-z.origin.x,W.origin.z-z.origin.z),J=new T(0,1,0),L=new T(z.origin.x+(W.origin.x-z.origin.x)*.18,86,-(z.origin.z+(W.origin.z-z.origin.z)*.18)),Ie=[{id:"murmuration-dusk",z:122,phase:7.1},{id:"murmuration-pass",z:12,phase:9.6},{id:"murmuration-exit",z:-59,phase:11.8}];function C(a){return a.applyAxisAngle(J,-R).add(L)}function Ue(a,e){return a>=ne.duskHour&&a<ne.nightStartHour&&e==="clear"}function Ge(a,e,n){const o=(a+.4)%22,d=Math.PI*(o-9.5)/11;e.set(26*(1-Math.cos(d))-5,10+6*Math.sin(2*d),114*Math.sin(d)-47),n.set(26*Math.sin(d),12*Math.cos(2*d),114*Math.cos(d))}const Be={layer:"air",create(a,{renderer:e,quality:n,preview:o,shot:d}){let g=0;function w({registrations:s,sim:u,refresh:S,takeOff:k,setHour:F}){if(!o)for(const A of Ie)s.screens.set(A.id,()=>{const b=C(new T(0,0,A.z));F(20.4),u.state.weather="clear",delete u.state.weatherPlace,u.state.target=null,k(),u.teleport({x:b.x,y:b.y,z:-b.z},R,0,0),s.camera.setOverride(null),g=A.phase-u.state.tick*be,S()})}const p=o?Re():void 0;p&&a.add(p.object,p.water);const h=({camera:s,gullPosition:u,seconds:S})=>{if(!p)return;const k=S%se;if(d)C(s.position.copy(D)),C(c.copy(x)),C(u.copy(I));else{const F=Math.min(1,Math.max(0,(k-1.5)/10));u.copy(r),u.z+=122-241*F,u.x+=5*Math.sin(F*Math.PI),u.y+=9*Math.sin(F*Math.PI*.8),s.position.copy(u).add(t),c.copy(u).add(l);const A=Math.min(1,Math.max(0,(k-11.7)/3.4)),b=Math.PI*A*A*(3-2*A);c.x+=72*Math.sin(b),c.z+=144*(1-Math.cos(b))*.5,C(u),C(s.position),C(c)}return s.lookAt(c),p.update(s,k),-R},D=new T(18,-10,139),x=new T(0,1,0),I=new T(9,-12,116),r=new T(-5,-8,0),t=new T(3,4,8),l=new T(0,3,-72),c=new T,i=()=>{p&&(p.object.removeFromParent(),p.water.removeFromParent(),p.dispose())};if(n==="low")return{connect:w,preview:h,update(){},dispose:i,perf:()=>({murmurationBirds:0})};function m(){if(!e.extensions.has("EXT_color_buffer_float"))return;const s=new Fe($,Z,e);s.setDataType(Me);const u=s.addVariable("birdPosition",Pe,s.createTexture()),S=s.addVariable("birdVelocity",Ce,s.createTexture());s.setVariableDependencies(u,[u,S]),s.setVariableDependencies(S,[u,S]);const k=new T,F=new T,A=new T,b={time:{value:0},stepSeconds:{value:0},resetState:{value:!0},hawk:{value:k}};if(Object.assign(u.material.uniforms,b),Object.assign(S.material.uniforms,b,{gull:{value:A}}),s.init()){u.material.dispose(),S.material.dispose(),s.dispose();return}const y=ze($,Z),E=De();y.position.copy(L),y.rotation.y=-R,a.add(y,E.object);const H=e.getContext(),U=new q(H),G=new q(H),O=new q(H);y.onBeforeRender=(_,P,v)=>{y.material.uniforms.clipFromFlock.value.copy(v.projectionMatrix).multiply(v.matrixWorldInverse).multiply(y.matrixWorld),G.begin()},y.onAfterRender=()=>G.end(),E.object.onBeforeRender=()=>O.begin(),E.object.onAfterRender=()=>O.end();let V=-1/0;return{update(_,P){if(y.visible=E.object.visible=P,!P){V=-1/0;return}const v=o&&!d?_.seconds%se:_.seconds+g;if(U.collect(),G.collect(),O.collect(),v===V)return;const j=v<V||v-V>.25;b.time.value=v,b.stepSeconds.value=j?0:Math.min(.05,v-V),b.resetState.value=j,Ge(v,k,F),A.copy(_.gullPosition).sub(L).applyAxisAngle(J,R),U.begin(),s.compute(),U.end(),y.material.uniforms.positions.value=s.getCurrentRenderTarget(u).texture,y.material.uniforms.velocities.value=s.getCurrentRenderTarget(S).texture,E.pose(v,C(c.copy(k)),F.applyAxisAngle(J,-R)),V=v},reset(){V=-1/0},perf(){const _=U.summary(),P=G.summary(),v=O.summary(),j={murmurationBirds:y.visible?$*Z:0};return!_||!P||!v?j:{...j,murmurationGpuMedianMs:_.median+P.median+v.median,murmurationGpuP95Ms:_.p95+P.p95+v.p95,murmurationComputeP95Ms:_.p95,murmurationDrawP95Ms:P.p95+v.p95}},dispose(){U.dispose(),G.dispose(),O.dispose(),a.remove(y,E.object),E.dispose(),y.geometry.dispose(),y.material.dispose(),u.material.dispose(),S.material.dispose(),s.dispose()}}}let f,M=!1;return{connect:w,preview:h,reset(){g=0,f?.reset()},update(s){const u=!s.lowQuality&&(o||Ue(s.hour,s.weather)&&s.camera.position.distanceToSquared(L)<ie*ie);u&&!M&&(M=!0,f=m()),f?.update(s,u)},perf:()=>f?.perf()??{murmurationBirds:0},dispose(){f?.dispose(),i()}}}};export{Ue as duskAppearance,Be as effect};
