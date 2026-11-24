import{B as L,o as st,Z as U,M as W,x as Y,K as F,a5 as P,V as N,I as J,a6 as Z,N as it,Y as nt,a1 as G,a7 as H,a8 as K,P as ot,a9 as at,aa as rt,_ as ht,W as ct,ab as _,A as lt}from"./index-qmOD1jXO.js";class dt{endpoints;corners;velocities;elapsed={value:0};geometry=new L;material=new st({side:U,transparent:!0,depthWrite:!1,uniforms:{tint:{value:[.92,.97,1]},elapsed:this.elapsed},vertexShader:`
      attribute vec3 endpoint;
      attribute vec3 stroke;
      attribute vec3 velocity;
      uniform float elapsed;
      varying float alpha;
      varying float edge;
      varying float distanceFromEye;
      void main() {
        vec4 a = viewMatrix * vec4(position + velocity * elapsed, 1.0);
        vec4 b = viewMatrix * vec4(endpoint + velocity * elapsed, 1.0);
        if (min(a.z, b.z) > -4.0) {
          gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
          return;
        }
        // Leave the last few metres to the near fade, without covering the screen at the clip plane.
        if (a.z > -4.0) a = mix(a, b, (-4.0 - a.z) / (b.z - a.z));
        if (b.z > -4.0) b = mix(b, a, (-4.0 - b.z) / (a.z - b.z));
        vec3 tangent = b.xyz - a.xyz;
        vec3 perpendicular = cross(tangent, -mix(a.xyz, b.xyz, 0.5));
        vec3 side = perpendicular / max(length(perpendicular), 0.0001);
        vec4 point = mix(a, b, stroke.x);
        point.xyz += side * stroke.y;
        gl_Position = projectionMatrix * point;
        alpha = stroke.z;
        edge = sign(stroke.y);
        distanceFromEye = length(point.xyz);
      }
    `,fragmentShader:`
      uniform vec3 tint;
      varying float alpha;
      varying float edge;
      varying float distanceFromEye;
      void main() {
        float soft = 1.0 - smoothstep(0.28, 0.98, abs(edge));
        float distanceFade = smoothstep(6.0, 19.0, distanceFromEye)
          * (1.0 - smoothstep(335.0, 545.0, distanceFromEye));
        gl_FragColor = vec4(tint, alpha * soft * distanceFade);
        #include <colorspace_fragment>
      }
    `});starts;count=0;mesh=new W(this.geometry,this.material);constructor(e){this.starts=new Y(new Float32Array(e*12),3).setUsage(F),this.endpoints=this.starts.clone().setUsage(F),this.corners=this.starts.clone().setUsage(F),this.velocities=this.starts.clone().setUsage(F);const t=new Uint16Array(e*6);for(let s=0;s<e;s++){const i=s*4;t.set([i,i+1,i+2,i+2,i+1,i+3],s*6)}this.geometry.setIndex(new Y(t,1)),this.geometry.setAttribute("position",this.starts),this.geometry.setAttribute("endpoint",this.endpoints),this.geometry.setAttribute("stroke",this.corners),this.geometry.setAttribute("velocity",this.velocities),this.geometry.setDrawRange(0,0),this.mesh.frustumCulled=!1}stroke(e,t,s,i,r,o,h=i){const n=this.count++*4;for(let d=0;d<4;d++){const g=n+d,f=d<2;this.starts.setXYZ(g,e.x,e.y,-e.z),this.endpoints.setXYZ(g,t.x,t.y,-t.z),this.velocities.setXYZ(g,s.x,s.y,-s.z);const l=f?i:h;this.corners.setXYZ(g,f?0:1,(d%2===0?-1:1)*l,f?r:o)}}flush(){this.geometry.setDrawRange(0,this.count*6);const e=this.count*12;if(this.count=0,!!e)for(const t of[this.starts,this.endpoints,this.corners,this.velocities])t.clearUpdateRanges(),t.addUpdateRange(0,e),t.needsUpdate=!0}interpolate(e){this.elapsed.value=e}dispose(){this.mesh.removeFromParent(),this.geometry.dispose(),this.material.dispose()}}const O=3,tt=9,S=97,C=4,ft=O*tt*C,pt=a=>(a%S+S)%S,j=a=>a*a*(3-2*a),T=a=>{const e=Math.imul(a^a>>>16,73244475);return((e^e>>>16)>>>0)/4294967296};class gt{source;courses=[];course;marks=[];refresh=0;get active(){return this.marks.length>0}get visible(){return this.marks.filter(e=>e.strength>.08).length}locate(e,t,s,i){this.source!==e&&(this.source=e,this.courses=e.map(ut),this.course=void 0,this.marks=[]);let r=420**2,o,h=0;for(const f of this.courses)for(const l of f.legs){const p=P(((t.x-l.start.x)*l.dx+(t.y-l.start.y)*l.dy+(t.z-l.start.z)*l.dz)/l.length**2),u=(t.x-l.start.x-p*l.dx)**2+(t.y-l.start.y-p*l.dy)**2+(t.z-l.start.z-p*l.dz)**2;u>=r||(r=u,o=f,h=l.distance+l.length*p)}const n=this.course===o?this.marks:[];if(this.course=o,this.marks=[],!o)return;const d=Math.floor(h/S)-4,g=Math.min(118,o.river.radius);for(let f=d;f<d+tt;f++)for(let l=0;l<O;l++){const p=f*O+l,u=f*S+l*S/O;if(u+S<0||u>o.length)continue;const c=n.find(y=>y.station===f&&y.lane===l);if(c){this.marks.push(c);continue}const m={station:f,lane:l,base:u,length:28+26*T(p+139),phase:T(p+522)*S,speed:0,strength:0,drift:0,edge:.8+T(p+937)*.2,lateral:(l-1)*g*(.45+.3*T(p+701)),height:g*(.23+.23*T(p+349))};this.sample(o,m,s,i),this.marks.push(m)}}step(e,t,s){const i=this.course;if(!i||!this.marks.length)return;const r=this.marks[this.refresh++%this.marks.length];this.sample(i,r,e,t);for(const o of this.marks)o.phase=pt(o.phase+o.speed*s)}draw(e){const t=this.course;if(t)for(const s of this.marks){const i=s.base+s.phase;if(i<s.length||i>t.length||s.strength<.04)continue;const o=j(P(Math.min(s.phase,S-s.phase)/15))*s.edge*j(P(s.strength/.7))*.98;if(o<.015)continue;const h=this.position(t,s,i+1),n=this.position(t,s,i),d={x:(h.x-n.x)*s.speed,y:(h.y-n.y)*s.speed,z:(h.z-n.z)*s.speed},g=[];let f=0;for(let p=0;p<=C;p++){const u=p===C?n:this.position(t,s,i-s.length*(1-p/C)),c=g[p-1];c&&(f+=Math.hypot(u.x-c.x,u.y-c.y,u.z-c.z)),g.push(u)}if(f<20||f>60)continue;const l=j(P(Math.min(f-20,60-f)/4));for(let p=1;p<=C;p++){const u=Math.sin(Math.PI*(p-1)/C),c=Math.sin(Math.PI*p/C);e.stroke(g[p-1],g[p],d,.08+u*.58,u*o*l,c*o*l,.08+c*.58)}}}sample(e,t,s,i){const r=Math.max(0,Math.min(e.length-1,t.base+t.phase)),o=this.position(e,t,r),h=this.position(e,t,r+1),n=h.x-o.x,d=h.z-o.z,g=Math.hypot(n,d)||1,f=s.airAt(o.x,o.y,o.z,i);t.speed=(f.wind.x*n+f.wind.z*d)/g,t.strength=Math.hypot(f.river.x,f.river.z)/(e.river.speed??s.tuning.windRiverSpeed);const l=(f.wind.z*n-f.wind.x*d)/g;t.drift+=(Math.max(-8,Math.min(8,l*1.6))-t.drift)*.32}position(e,t,s){const i=X(e,s-18),r=X(e,s+18),o=X(e,s),h=r.x-i.x,n=r.z-i.z,d=Math.hypot(h,n)||1,g=t.lateral+t.drift;return{x:(i.x+2*o.x+r.x)*.25-g*n/d,y:Math.max(8,(i.y+2*o.y+r.y)*.25+t.height),z:(i.z+2*o.z+r.z)*.25+g*h/d}}}function ut(a){let e=0;const t=[];for(let s=1;s<a.points.length;s++){const i=a.points[s-1],r=a.points[s],o=r.x-i.x,h=r.y-i.y,n=r.z-i.z,d=Math.hypot(o,h,n);d&&(t.push({start:i,dx:o,dy:h,dz:n,distance:e,length:d}),e+=d)}return{river:a,legs:t,length:e}}function X(a,e){const t=a.legs.find(i=>e<=i.distance+i.length)??a.legs[a.legs.length-1],s=P((e-t.distance)/t.length);return{x:t.start.x+t.dx*s,y:t.start.y+t.dy*s,z:t.start.z+t.dz*s}}class mt{wind={value:new N};seconds={value:0};update(e,t){this.wind.value.set(e.x,0,-e.z),this.seconds.value=t}bind(e,t){const s=t.kind==="flag",i=t.kind==="foliage"&&t.vertexWeights===!0,r=s?new N(0,t.span,1):new N(t.rootY,t.height,t.stiffness);if(r.y<=0)throw new Error("Wind sway height and flag span must be positive");const o=e.onBeforeCompile,h=e.customProgramCacheKey();return e.onBeforeCompile=(n,d)=>{o.call(e,n,d),n.uniforms.islandWind=this.wind,n.uniforms.islandWindTime=this.seconds,n.uniforms.islandWindShape={value:r},n.vertexShader=`
        uniform vec3 islandWind;
        uniform float islandWindTime;
        uniform vec3 islandWindShape;
        ${i?"attribute float windWeight;":""}
        ${n.vertexShader}
      `.replace("void main() {",`
        void main() {
        mat4 windModel = modelMatrix;
        #ifdef USE_INSTANCING
          windModel = windModel * instanceMatrix;
        #endif
        mat3 windToLocal = inverse(mat3(windModel));
        float windSpeed = length(islandWind.xz);
        float plantPhase = dot(windModel[3].xz, vec2(0.131, 0.173));
        ${s?yt:""}
      `).replace("#include <beginnormal_vertex>",`
        #include <beginnormal_vertex>
        ${s?xt:""}
      `).replace("#include <begin_vertex>",`
        #include <begin_vertex>
        ${s?wt:V(i?"clamp(windWeight, 0.0, 1.0)":"clamp((position.y - islandWindShape.x) / islandWindShape.y, 0.0, 1.0)")}
      `)},e.customProgramCacheKey=()=>`${h}:island-wind:${t.kind}:${i}`,e.needsUpdate=!0,e}}const yt=`
  vec3 flagDownwind = windToLocal * islandWind;
  vec2 flagAxis = normalize(mix(vec2(1.0, 0.0),
    flagDownwind.xz / max(length(flagDownwind.xz), 0.001), smoothstep(0.05, 0.7, windSpeed))
    + vec2(0.0, 0.0001));
  mat2 flagTurn = mat2(flagAxis, vec2(-flagAxis.y, flagAxis.x));
  float alongCloth = clamp(position.x / islandWindShape.y, 0.0, 1.0);
  float extension = smoothstep(0.0, 12.0, windSpeed);
  float frequency = 3.0 + 3.5 * extension;
  float waveA = 11.0 * alongCloth - frequency * islandWindTime + 0.8 * position.y + plantPhase;
  float waveB = 19.0 * alongCloth - 7.4 * islandWindTime + plantPhase;
  float sway = smoothstep(0.0, 4.0, windSpeed);
  float edge = alongCloth * alongCloth * islandWindShape.y;
  float wrinkle = (0.14 * sin(waveA) + 0.035 * sin(waveB)) * sway;
  float restScale = mix(0.35, 1.0, extension);
  float sag = mix(0.65, 0.07, extension);
`,xt=`
  float slopeX = 2.0 * alongCloth * wrinkle + alongCloth * alongCloth
    * (1.54 * cos(waveA) + 0.665 * cos(waveB)) * sway;
  float slopeY = edge * 0.112 * cos(waveA) * sway;
  vec3 across = vec3(restScale, -2.0 * alongCloth * sag, slopeX);
  vec3 upCloth = vec3(0.0, 1.0, slopeY);
  objectNormal = normalize(cross(across, upCloth)) * (normal.z < 0.0 ? -1.0 : 1.0);
  objectNormal.xz = flagTurn * objectNormal.xz;
`,wt=`
  transformed.x *= restScale;
  transformed.y -= edge * sag;
  transformed.z += edge * wrinkle;
  transformed.xz = flagTurn * transformed.xz;
`;function V(a){return`
    float rootWeight = ${a};
    float individual = 0.74 + 0.26 * sin(plantPhase * 1.91);
    float flex = 0.82 + 0.18 * sin(islandWindTime * 2.7 + plantPhase + rootWeight)
      + 0.08 * sin(islandWindTime * 5.9 + plantPhase * 1.6);
    vec3 push = islandWind / max(9.0, windSpeed);
    float worldHeight = length(windModel[1].xyz) * islandWindShape.y;
    transformed += windToLocal * (push * (rootWeight * rootWeight * individual
      * flex * worldHeight * islandWindShape.z));
  `}const D=new mt,I=5,A=7,B=36,$=4,v=.08,M=()=>({x:0,y:0,z:0}),Q=(a,e)=>(a.x-e.x)**2+(a.y-e.y)**2+(a.z-e.z)**2,bt=(a,e)=>Math.min(P(a/.45),P((e-a)/.65)),zt=()=>({position:M(),velocity:M(),age:0,life:0});function q(a,e,t){a.x+=e.x*t,a.y+=e.y*t,a.z+=e.z*t}class vt{batch=new dt(I*A+ft+B);rivers=new gt;ribbons=Array.from({length:I},()=>({...zt(),history:Array.from({length:A},M),end:0,length:0}));birds;bird=new J;birdDrift=M();eye=M();surfaceWind=M();plume;plumeRise=0;flockCenter;step;emission=0;randomState=1;world;constructor(e){const t=new L;t.setAttribute("position",new Y(new Float32Array([-1.15,.12,.32,-.44,.2,-.12,0,0,-.17,0,0,.3,.44,.2,-.12,1.15,.12,.32,0,.06,-.46]),3)),t.setIndex([0,1,3,1,2,3,2,4,3,3,4,5,2,6,4,1,6,2]),this.birds=new Z(t,new it({color:3621966,side:U}),$),this.birds.frustumCulled=!1,this.birds.count=0,e.add(this.batch.mesh,this.birds)}update(e,t,s){const i=Math.floor(s/v);if(this.world!==e||this.step===void 0||i<this.step||i-this.step>24||Q(this.eye,t)>180**2){for(const h of this.ribbons)h.life=0;Object.assign(this.birdDrift,M()),this.plume=void 0,this.flockCenter=void 0,this.plumeRise=0,this.world=e,this.step=i-15,this.emission=0,this.randomState=i^Math.imul(Math.floor(t.x),31)^Math.imul(Math.floor(t.z),107)||1,this.findSources(e,t,s)}Object.assign(this.eye,t);const r=this.step<i;for(;this.step<i;)this.step++,this.sample(e,t,this.step*v,this.step);r&&this.drawStrokes(i*v);const o=s-i*v;this.batch.interpolate(o),D.update(this.surfaceWind,s),this.drawBirds(s,o)}dispose(){D.update(M(),0),this.batch.dispose(),this.birds.removeFromParent(),this.birds.dispose(),this.birds.geometry.dispose(),this.birds.material.dispose()}get counters(){return{ribbons:this.ribbons.filter(e=>e.life>e.age).length+this.rivers.visible,riverRibbons:this.rivers.visible,motes:this.plume?B:0,birds:this.birds.count}}random(){return this.randomState^=this.randomState<<13,this.randomState^=this.randomState>>>17,this.randomState^=this.randomState<<5,(this.randomState>>>0)/4294967296}findSources(e,t,s){this.rivers.locate(e.rivers,t,e.air,s);const i=e.air.thermalCapsAt(s);let r=570**2,o;for(const h of e.thermals){const n=i.find(m=>m.id===h.id),d=n?n.center.y-h.y:(h.height??e.air.tuning.thermalHeight)*.94,g=Math.min(76,d*.58),f=n?n.center.x-h.x:0,l=n?n.center.z-h.z:0,p={x:h.x+f*(g/d)**2,y:h.y+g,z:h.z+l*(g/d)**2},u=Q(t,p);if(u>=r)continue;const c=e.air.airAt(p.x,p.y,p.z,s);c.thermal<.7||(o={site:h,center:p,height:d,bendX:f,bendZ:l,radius:Math.min(46,h.radius??e.air.tuning.thermalRadius),depth:Math.min(68,d*.57),rise:Math.max(1.25,Math.min(4.8,c.thermal*.8))},r=u)}this.plume?.site.id!==o?.site.id&&(this.flockCenter=o&&{...o.center},Object.assign(this.birdDrift,M()),this.plumeRise=0),this.plume=o}sample(e,t,s,i){i%6===0&&this.findSources(e,t,s),this.rivers.step(e.air,s,v);const r=n=>e.air.airAt(n.x,n.y,n.z,s),o=r(t);if(Object.assign(this.surfaceWind,{x:o.wind.x-o.river.x,y:0,z:o.wind.z-o.river.z}),!this.rivers.active&&i%6===0){const n=this.ribbons[this.emission%I];n.age>=n.life&&this.emitRibbon(n,t,r),this.emission++}const h=this.ribbons[(i%I+I)%I];for(const n of this.ribbons)n.age>=n.life||(n===h&&Object.assign(n.velocity,r(n.position).wind),Math.round(n.age/v)%2===1&&(n.end=(n.end+1)%A,n.length=Math.min(n.length+1,A),Object.assign(n.history[n.end],n.position)),n.age+=v,q(n.position,n.velocity,v));if(this.plume&&this.flockCenter){if(this.plumeRise+=this.plume.rise*v,i%4===0){const n=r(this.flockCenter).wind,d=this.plume.center;this.birdDrift.x=n.x*.24+(d.x-this.flockCenter.x)*.52,this.birdDrift.y=(d.y-this.flockCenter.y)*.7+n.y*.6,this.birdDrift.z=n.z*.24+(d.z-this.flockCenter.z)*.52}q(this.flockCenter,this.birdDrift,v)}}emitRibbon(e,t,s){const i=this.random()*Math.PI*2,r=145*Math.sqrt(this.random());Object.assign(e.position,{x:t.x+Math.cos(i)*r,y:Math.max(3,t.y+(this.random()-.5)*95),z:t.z+Math.sin(i)*r});const o=s(e.position);Math.hypot(o.wind.x,o.wind.z)<6.5||(Object.assign(e.velocity,o.wind),e.age=0,e.life=2+this.random(),e.end=0,e.length=1,Object.assign(e.history[0],e.position))}drawStrokes(e){this.rivers.draw(this.batch);for(const t of this.ribbons){if(t.age>=t.life)continue;const s=bt(t.age,t.life)*.27;for(let i=0;i<t.length;i++){const r=(t.end-i+A)%A,o=i===0?t.position:t.history[(r+1)%A],h=Math.sin(Math.PI*(i+1)/(t.length+1)),n=Math.sin(Math.PI*i/(t.length+1));this.batch.stroke(t.history[r],o,t.velocity,.55*(.7+h*.3),h*s,n*s)}}this.plume&&this.drawMotes(this.plume,e),this.batch.flush()}drawMotes(e,t){const{site:s,center:i,height:r,depth:o,bendX:h,bendZ:n,radius:d,rise:g}=e,f=Math.max(s.y+4,i.y-o*.52);for(let l=0;l<B;l++){const p=(l/B+this.plumeRise/o)%1,u=Math.min(s.y+r,f+p*o),c=Math.sin(Math.PI*p)**.7,m=Math.min(28,d*.82)*(.45+.47*p+l%5*.026),y=l%3*Math.PI*2/3+p*5+t*.17,b=((u-s.y)/r)**2,x={x:s.x+h*b+Math.cos(y)*m,y:u,z:s.z+n*b+Math.sin(y)*m},z=.17+5*g/o,w={x:-Math.sin(y)*m*z,y:g,z:Math.cos(y)*m*z},k={...x};q(k,w,-.2),this.batch.stroke(k,x,w,.24+l%4*.09,.2*c,.94*c,.48)}}drawBirds(e,t){const s=this.flockCenter;if(this.birds.count=s&&this.plume?$:0,!(!s||!this.plume)){for(let i=0;i<$;i++){const r=e*(.24+i*.009)+i*1.52,o=Math.min(33,this.plume.radius*.86)*(.96+i*.08);this.bird.position.set(s.x+this.birdDrift.x*t+Math.cos(r)*o,s.y+Math.sin(r*2)*2.2+(i-1.5)*4.3,-(s.z+this.birdDrift.z*t+Math.sin(r)*o)),this.bird.rotation.set(.05*Math.sin(r*2),r,-.32,"YXZ"),this.bird.scale.setScalar(1.44+i*.07),this.bird.updateMatrix(),this.birds.setMatrixAt(i,this.bird.matrix)}this.birds.instanceMatrix.needsUpdate=!0}}}const E={x:-10,y:8,z:-79},Mt=new N(0,6,61);function St(a){return a.position.set(E.x,E.y,-E.z),a.lookAt(Mt),E}function kt(){const a=new nt;a.position.set(0,0,61);const e=c=>new G({color:c,flatShading:!0}),t=e(6977392),s=e(10523514),i=e(7623490),r=e(4735555),o=e(5529910),h=(c,m,y,b,x,z,w)=>{const k=new W(new at(b,x,z),w);k.position.set(c,m,y),a.add(k)};h(0,.9,0,28,2.4,17,t),h(0,2.16,0,28.4,.5,17.4,s),h(5.5,2.5,.25,14.8,.28,11.4,o),h(5.5,2.4,6,15.1,.32,.46,t);for(let c=0;c<19;c++){const m=-13.5+c*1.5;h(m,1.58,8.53,1.38,.42,.16,c%3===0?s:t),h(m+.42,.82,8.53,1.35,.37,.16,c%3===1?s:t)}for(let c=0;c<5;c++)h(-11+c*3,2.55,7.7,.29,.43,.29,r);h(-9.8,3,-1.1,2.4,1.2,1.55,i),h(-9.8,3.63,-1.1,2.54,.12,1.62,s);const n=D.bind(new G({color:13787714,side:U,roughness:.86}),{kind:"flag",span:4.5});for(const[c,m,y]of[[-4.8,1.7,8.4],[-8.1,-4.6,7.2]]){const b=new W(new H(.08,.13,y,9),i);b.position.set(c,2.4+y/2,m),a.add(b);const x=new W(new K(.17),r);x.position.set(c,2.42+y,m),a.add(x);const z=new ot(4.5,1.8,18,7).translate(2.25,-.9,0),w=z.getAttribute("position");for(let R=0;R<w.count;R++){const et=w.getX(R)/4.5;w.setY(R,(w.getY(R)+.9)*(1-.44*et)-.9)}const k=new W(z,n);k.position.set(c,2.17+y,m),a.add(k)}const d=e(6966328),g=[4681796,5997132,7637326].map(c=>D.bind(e(c),{kind:"foliage",rootY:-1,height:2,stiffness:.86}));for(const[c,m,y]of[[2.6,-1.4,5.4],[8.3,-3,7.5],[10.3,2,5.6]]){const b=new W(new H(.14,.32,y*.78,7),d);b.position.set(c,2.6+y*.39,m),a.add(b);for(let x=0;x<5;x++){const z=x*2.4,w=new W(new K(1,1),g[x%g.length]);w.position.set(c+Math.cos(z)*(x===0?0:.85),2.45+y*(x===0?.82:.68),m+Math.sin(z)),w.scale.set(1.4+y*.06,1.6+y*.04,1.6),a.add(w)}}const f=new L;f.setAttribute("position",new Y(new Float32Array([-.1,0,0,.1,0,0,-.07,.44,0,.08,.46,0,.13,1,0,0,0,-.1,0,0,.1,0,.42,-.07,0,.44,.08,0,.88,.14]),3)),f.setIndex([0,1,2,1,3,2,2,3,4,5,6,7,6,8,7,7,8,9]),f.computeVertexNormals();const l=D.bind(new G({color:9214803,side:U,flatShading:!0}),{kind:"foliage",rootY:0,height:1,stiffness:.9}),p=new Z(f,l,250),u=new J;for(let c=0;c<p.count;c++){u.position.set(-1.5+c%25*.55+Math.sin(c*16.7)*.24,2.63,.4+Math.floor(c/25)*.51+Math.sin(c*12.3)*.25);const m=.52+.54*(Math.sin(c*28.7)*.5+.5);u.scale.setScalar(m),u.rotation.y=c*2.399,u.updateMatrix(),p.setMatrixAt(c,u.matrix)}return a.add(p),a}function Wt(a){a.removeFromParent();const e=new Set;a.traverse(t=>{t instanceof W&&(t.geometry.dispose(),e.add(t.material),t instanceof Z&&t.dispose())});for(const t of e)t.dispose()}function At(){const a=new ht;a.setHour(12);const e=new ct("wind-quay",[],a,{..._,offshore:{..._.offshore,wind:{x:1.1,z:.35}},front:{..._.front,ordinaryChance:0,outflowSpeed:17}});return e.scheduleFront({id:"quay-front",startsAt:9,durationSeconds:55,origin:{x:-309,z:-112},velocity:{x:9,z:2},halfLength:250,halfWidth:260,baseHeight:210,depth:290,intensity:1}),{air:new lt(e),rivers:[],thermals:[]}}function Ct(a,e,t){const s=e?At():void 0,i=e?kt():void 0;let r;return i&&a.add(i),{update(o){const{camera:h,seconds:n}=o,d=s??t?.(o);if(!d)return;r??=new vt(a);const{x:g,y:f,z:l}=h.position;r.update(d,s?St(h):{x:g,y:f,z:-l},n)},dispose(){r?.dispose(),i&&Wt(i)}}}const It={layer:"air",create(a){const e=new URLSearchParams(globalThis.location?.search);return Ct(a,e.get("solo")==="effect:visible-wind",rt)}};export{Ct as createWindEffect,It as effect};
