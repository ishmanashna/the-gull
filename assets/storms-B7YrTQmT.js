import{x as R,K as et,B as V,N as st,T as it,M as q,V as F,h as L,l as B,o as G,X as ot,Y as j,Z as at,P as nt,n as W,a as rt,E as ht,m as E,p as $,J as lt,W as ct,_ as dt,$ as ft,a0 as pt}from"./index-qmOD1jXO.js";import{b as O,c as I}from"./storm-cloud-CgEFPEzC.js";import{a as ut,S as Z}from"./storm-shade-4exgMyBw.js";const H="weather.thunder",mt=343,K=13,X=9;function b(r){let t=2166136261;for(let s=0;s<r.length;s++)t=Math.imul(t^r.charCodeAt(s),16777619);return t^=t>>>16,t=Math.imul(t,2146121005),((t^t>>>15)>>>0)/4294967296}function Y(r,t){return r.startsAt+K+t*X+3*b(`${r.id}:${t}:time`)}function N(r,t){return Math.floor((t-r.startsAt-K)/X)}function xt(r){const t=r>=0?Math.max(0,1-r/.16):0,s=Math.max(0,1-Math.abs(r-4.05)/.11);return Math.max(t,.84*s)}function vt(r,t,s,e,i){const n=r.frontsAt(e).find(p=>p.id===t);if(!n||n.strength<.48)return;const o=`${t}:${s}`,l=(b(`${o}:side`)-.5)*n.precipitationHalfWidth*.8,f=(b(`${o}:along`)-.5)*n.precipitationHalfLength,{heading:c,precipitationCenter:a}=n,d=a.x+c.x*f-c.z*l,h=a.z+c.z*f+c.x*l,m=i(d,h);if(!(m>=n.baseHeight-20))return{id:o,frontId:t,at:e,origin:{x:d-c.x*32,y:n.baseHeight+n.depth*.12,z:h-c.z*32},impact:{x:d,y:m,z:h}}}function gt(r){return r<0||r>=.38?0:Math.max(Math.exp(-r*21),.65*Math.max(0,1-Math.abs(r-.13)*23))}class yt{position=new R(new Float32Array(648*3),3).setUsage(et);geometry=new V;material=new st({color:15854079,transparent:!0,depthWrite:!1,blending:it,toneMapped:!1});mesh=new q(this.geometry,this.material);id;constructor(){this.geometry.setAttribute("position",this.position),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.visible=!1}update(t,s){if(this.mesh.visible=!!t&&s>.04,!t||!this.mesh.visible)return;this.material.opacity=Math.min(1,s*1.65);const e=`${t.id}:${t.origin.x},${t.origin.z},${t.impact.y}`;e!==this.id&&(this.id=e,this.writeMesh(t))}writeMesh({id:t,origin:s,impact:e}){const i=new F(s.x,s.y,-s.z),n=new F(e.x,e.y,-e.z),o=[i];for(let a=1;a<15;a++){const d=i.clone().lerp(n,a/15),h=Math.min(54,(i.y-n.y)*.22)*Math.sin(a/15*Math.PI);d.x+=(.5*Math.sin(a*.63)+b(`${t}:x:${a}`)-.5)*h,d.z+=(.46*Math.sin(a*.73+1.2)+b(`${t}:z:${a}`)-.5)*h,o.push(d)}o.push(n);let l=0;const f=(a,d,h,m)=>{const p=d.clone().sub(a).normalize(),u=p.clone().cross(new F(1,0,0)).normalize(),v=u.clone().cross(p),g=[u,u.clone().multiplyScalar(-.5).addScaledVector(v,.866),u.clone().multiplyScalar(-.5).addScaledVector(v,-.866)],x=(y,w,z)=>{this.position.setXYZ(l++,y.x+w.x*z,y.y+w.y*z,y.z+w.z*z)};for(let y=0;y<3;y++){const w=g[y],z=g[(y+1)%3];x(a,w,h),x(d,w,m),x(a,z,h),x(a,z,h),x(d,w,m),x(d,z,m)}};for(let a=0;a<15;a++)f(o[a],o[a+1],1.79-a*.077,1.713-a*.077);const c=b(`${t}:bearing`)*Math.PI*2;for(const[a,d]of[[3,0],[5,2.1],[9,4.2]]){let h=o[a];const m=c+d;for(let p=0;p<5;p++){const u=9+b(`${t}:branch:${a}:${p}`)*12,v=m+(b(`${t}:fork:${a}:${p}`)-.5)*1.2,g=Math.min(5+b(`${t}:drop:${a}:${p}`)*16,h.y-n.y-2);if(g<=0)break;const x=h.clone().add(new F(Math.cos(v)*u,-g,Math.sin(v)*u));f(h,x,1.02-p*.18,.84-p*.18),h=x}}this.geometry.setDrawRange(0,l),this.position.needsUpdate=!0}}const wt=[0,1].map(r=>{const t=new nt(2,1,42,12);return t.setAttribute("shaftLayer",new R(new Float32Array(t.attributes.position.count).fill(r),1)),t});class J{group=new j;center=new F;axes=new B;wind=new L;material=new G({side:at,forceSinglePass:!0,transparent:!0,depthWrite:!1,uniforms:{core:{value:this.center},axes:{value:this.axes},wind:{value:this.wind},rates:{value:new L}},vertexShader:`
      uniform vec3 core;
      uniform vec4 axes;
      uniform vec2 wind;
      uniform vec2 rates;
      attribute float shaftLayer;
      varying vec4 rainColor;
      float shaft(float x, float center, float width) {
        float d = abs(x - center) / width;
        return 1.0 - smoothstep(0.06, 1.0, d);
      }
      void main() {
        vec2 sheet = vec2(position.x, uv.y);
        vec3 world = (modelMatrix * vec4(position, 1.0)).xyz;
        vec2 fall = wind * pow(1.0 - sheet.y, 1.20) * (0.79 + 0.20 * rates.y);
        world.xz += fall;
        world.y += sheet.y * core.z * sin(world.x * 0.012 + world.z * 0.020) * 0.025;
        vec2 d = world.xz - core.xy - fall * 0.43;
        vec2 ellipse = vec2(dot(d, axes.xy) * axes.z, dot(d, vec2(-axes.y, axes.x)) * axes.w);
        float footprint = 1.0 - smoothstep(0.13, 1.0, dot(ellipse, ellipse));
        float spread = 1.0 + 0.33 * (1.0 - sheet.y);
        float x = (sheet.x + 0.055 * sin(sheet.y * 6.5 + shaftLayer * 2.0)) / spread;
        float rolls = shaft(x, -0.53 + shaftLayer * 0.31, 0.32) * (0.46 + shaftLayer * 0.25)
          + shaft(x, -0.03 + shaftLayer * 0.25, 0.34 - shaftLayer * 0.13) * (0.94 - shaftLayer * 0.45)
          + shaft(x, 0.43 + shaftLayer * 0.18, 0.36) * (0.62 - shaftLayer * 0.23);
        float fibers = 0.86 + 0.14 * sin(48.0 * x + 1.8 * sin(11.0 * x + shaftLayer * 3.9));
        float top = 1.0 - smoothstep(0.86 + 0.11 * rolls, 1.0, sheet.y);
        vec3 eye = cameraPosition - world;
        float distanceToEye = length(eye);
        float distant = smoothstep(190.0, 560.0, distanceToEye);
        float floorFade = smoothstep(0.0, mix(0.24, 0.075, distant), sheet.y);
        float edge = 1.0 - smoothstep(0.72, 1.0, abs(sheet.x));
        float density = mix(0.11, 0.99, min(1.0, rolls)) * fibers * floorFade * top;
        vec3 sheetNormal = normalize(mat3(modelMatrix) * vec3(0.0, 0.0, 1.0));
        float distanceFade = smoothstep(40.0, 385.0, distanceToEye);
        float grazingFade = smoothstep(0.055, 0.21, abs(dot(sheetNormal, normalize(eye))));
        float opacity = rates.x * footprint * edge * distanceFade * grazingFade;
        float spray = smoothstep(0.015, 0.075, sheet.y) * (1.0 - smoothstep(0.075, 0.21, sheet.y));
        vec2 precipitation = opacity * vec2(density * 0.73, spray * distant * (0.10 + 0.47 * rolls));
        vec3 rain = mix(vec3(0.115, 0.143, 0.171), vec3(0.43, 0.49, 0.58), rates.y);
        vec3 mist = vec3(0.20, 0.24, 0.29);
        float alpha = precipitation.x + precipitation.y;
        vec3 color = (rain * precipitation.x + mist * precipitation.y) / max(alpha, 0.001);
        rainColor = vec4(color, alpha);
        gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
      }
    `,fragmentShader:`
      varying vec4 rainColor;
      void main() {
        if (rainColor.a < 0.008) discard;
        gl_FragColor = rainColor;
        #include <colorspace_fragment>
      }
    `});sheets=wt.map(t=>new q(t,this.material));constructor(){this.group.add(...this.sheets),this.sheets.forEach(t=>{t.frustumCulled=!1,t.renderOrder=-3})}update(t,s,e,i){const{center:n,heading:o,halfWidth:l,halfLength:f,base:c}=t;if(this.group.visible=s>.01,!this.group.visible)return;this.center.set(n.x,-n.z,c),this.axes.set(o.x,-o.z,1/f,1/l);const a=i(n.x,c*.48,n.z);this.wind.set(a.x,-a.z).multiplyScalar(Math.min(42,c/9)),this.material.uniforms.rates.value.set(s,e);for(const[d,h]of this.sheets.entries()){const m=d===0?-1:1,p=m*f*.24,u=-m*l*.25;h.position.set(n.x+o.x*p-o.z*u,c*.56-5,-n.z-o.z*p-o.x*u),h.rotation.y=Math.atan2(o.x,-o.z)+m*.25,h.scale.set(l*(d===0?.82:.61),c*1.12+10,1)}}}const P=360,S=5,A=12;class zt{listener=new F;floorOrigin=new L;floors=new Float32Array(S**2);core=new F;axes=new B;geometry=new V;material=new G({transparent:!0,depthWrite:!1,uniforms:{listener:{value:this.listener},time:{value:0},floorOrigin:{value:this.floorOrigin},floors:{value:this.floors},core:{value:this.core},axes:{value:this.axes},wind:{value:new L},rates:{value:new L}},vertexShader:`
      uniform vec3 listener;
      uniform float time;
      uniform vec2 floorOrigin;
      uniform float floors[${S**2}];
      uniform vec3 core;
      uniform vec4 axes;
      uniform vec2 wind;
      uniform vec2 rates;
      attribute vec2 drop;
      varying float opacity;
      varying float snow;
      float surfaceAt(vec2 point) {
        vec2 cell = clamp((point - floorOrigin) / ${A}.0, vec2(0.0), vec2(3.999));
        ivec2 index = ivec2(cell);
        int start = index.y * ${S} + index.x;
        vec2 uv = fract(cell);
        return mix(mix(floors[start], floors[start + 1], uv.x),
          mix(floors[start + ${S}], floors[start + ${S+1}], uv.x), uv.y);
      }
      void main() {
        snow = 1.0 - step(rates.y, drop.x);
        float speed = mix(8.5 + 4.5 * drop.y, 2.0 + 2.0 * drop.y, snow);
        float t = time - drop.x * 43.13;
        float tail = position.y;
        vec3 path = vec3(position.x * 44.0, drop.y * 34.0, position.z * 44.0);
        path.y -= t * speed;
        path.xz += t * wind * mix(1.0, 0.52, snow);
        path.x += sin(t * 2.5 + drop.x * 19.0) * snow * 0.65;
        vec3 tile = vec3(44.0, 34.0, 44.0);
        vec3 offset = mod(path - listener + tile * 0.5, tile) - tile * 0.5;
        vec3 point = listener + offset;
        vec2 delta = point.xz - core.xy;
        vec2 ellipse = vec2(dot(delta, axes.xy) * axes.z, dot(delta, vec2(-axes.y, axes.x)) * axes.w);
        float footprint = 1.0 - smoothstep(0.10, 1.0, dot(ellipse, ellipse));
        float bottom = surfaceAt(point.xz);
        float cutoff = step(bottom, point.y) * (1.0 - step(core.z, point.y));
        opacity = cutoff * rates.x * mix(1.0, footprint, step(0.00001, axes.z));
        opacity *= (1.0 - smoothstep(13.0, 20.0, length(offset.xz)))
          * (1.0 - smoothstep(12.0, 16.0, abs(offset.y)));
        opacity *= smoothstep(2.0, 7.0, length(point - cameraPosition)) * mix(1.0, 0.19, tail);
        float streakLength = tail * mix(0.72 + drop.y * 1.30, 0.24 + drop.y * 0.19, snow);
        point.xz -= wind / speed * streakLength * mix(1.0, 0.52, snow);
        point.y += streakLength;
        gl_Position = projectionMatrix * viewMatrix * vec4(point, 1.0);
      }
    `,fragmentShader:`
      varying float opacity;
      varying float snow;
      void main() {
        gl_FragColor = vec4(mix(vec3(0.48, 0.55, 0.68), vec3(0.92, 0.94, 1.0), snow), opacity);
        #include <colorspace_fragment>
      }
    `});mesh=new ot(this.geometry,this.material);sampledAt=-1/0;constructor(){const t=new Float32Array(P*6),s=new Float32Array(P*4);for(let e=0;e<P;e++){const i=b(`drop-x:${e}`),n=b(`drop-z:${e}`),o=b(`drop-phase:${e}`),l=b(`drop-size:${e}`);t.set([i,0,n,i,1,n],e*6),s.set([o,l,o,l],e*4)}this.geometry.setAttribute("position",new R(t,3)),this.geometry.setAttribute("drop",new R(s,2)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=7}update(t,s,e,i,n,o){if(this.mesh.visible=s.rainRate+s.snowRate>2&&t.y<(e?.base??1300),!this.mesh.visible)return;const{x:l,y:f,z:c}=t;this.listener.set(l,f,-c),e?(this.core.set(e.center.x,-e.center.z,e.base),this.axes.set(e.heading.x,-e.heading.z,1/e.halfLength,1/e.halfWidth)):(this.core.z=1300,this.axes.set(0,0,0,0));const a=Math.floor(l/A)*A-2*A,d=Math.floor(-c/A)*A-2*A;if(i<this.sampledAt||i-this.sampledAt>.25||a!==this.floorOrigin.x||d!==this.floorOrigin.y){this.sampledAt=i,this.floorOrigin.set(a,d);for(let u=0;u<S;u++)for(let v=0;v<S;v++)this.floors[u*S+v]=o(a+v*A,-d-u*A)}const h=n(l,f,c);this.material.uniforms.time.value=i,this.material.uniforms.wind.value.set(h.x,-h.z);const m=s.rainRate,p=s.snowRate;this.material.uniforms.rates.value.set(Math.min(.56,.38*m/175+.49*p/55),p/(m+p))}}const bt=rt.islands.find(r=>r.id==="voxel-iceberg"),Mt=()=>Array.from({length:Z},()=>new J);function D(r){return{center:r.precipitationCenter,heading:r.heading,halfWidth:r.precipitationHalfWidth,halfLength:r.precipitationHalfLength,base:r.baseHeight}}class At{group=new j;shade=new ut;layers=Mt();drops=new zt;peaks=new J;bolt=new yt;frame;enabled=!0;metrics={fronts:0,nearPrecipitation:!1,rainRate:0,snowRate:0,lightning:!1,shade:1};constructor(){for(const t of this.layers)this.group.add(t.group);this.group.add(this.peaks.group,this.drops.mesh,this.bolt.mesh)}mount(t){const s=({child:e})=>this.shade.install(e);return this.shade.install(t),t.add(this.group),t.addEventListener("childadded",s),{update:()=>{const e=this.frame;e&&this.update(t,e.run,e.listener,e.time,e.frontId)},dispose:()=>{t.removeEventListener("childadded",s),O.delete(t),this.group.removeFromParent()}}}prepare(t,s,e,i){this.frame={run:t,listener:s,time:e,frontId:i}}update(t,s,e,i,n){if(this.group.visible=this.enabled,!this.enabled){O.set(t,{field:s.field,time:i,fronts:[],precipitation:!1,mist:I}),this.shade.update([],void 0,0);return}const o=s.field.frontsAt(i).filter(u=>n?u.id===n:C(u,e)<6500);o.sort((u,v)=>C(u,e)-C(v,e));const l=o.slice(0,Z),f=s.flash,c=f?gt(i-f.at):0,a=l[0],d=a&&s.windAt(a.precipitationCenter.x,a.baseHeight*.48,a.precipitationCenter.z);this.bolt.update(f,c);for(const[u,v]of this.layers.entries()){const g=l[u];if(!g){v.group.visible=!1;continue}const x=D(g),{x:y,z:w}=x.center,z=s.field.weatherAt(y,w,i),M=z.snowRate/Math.max(1,z.snowRate+z.rainRate);v.update(x,g.strength,M,s.windAt)}const h=s.field.weatherAt(e.x,e.z,i),m=o.find(({id:u})=>u===h.stormFrontId);let p=I;if(m&&h.stormIntensity>.12&&e.y<m.baseHeight){const u=W.smoothstep(h.stormIntensity,.12,.92)*.94*(1-W.smoothstep(e.y,m.baseHeight*.85,m.baseHeight)),{sunlight:v}=s.field.clock.clockAt(i),g=.22+.78*W.smoothstep(v,0,.73);p=[.112*g,.154*g,.209*g,u]}this.shade.update(l,f,c,d,p,i),this.drops.update(e,h,m&&D(m),i,s.windAt,s.floor),this.updatePeaks(s,e,i),O.set(t,{field:s.field,time:i,fronts:l,precipitation:!!a||this.drops.mesh.visible||this.peaks.group.visible,mist:p,flash:s.cloudFlash}),this.metrics={fronts:l.length,nearPrecipitation:this.drops.mesh.visible,rainRate:h.rainRate,snowRate:h.snowRate,lightning:c>.04,shade:h.transmission}}updatePeaks(t,s,e){const{origin:i,radius:n}=bt;if(this.peaks.group.visible=!1,Math.hypot(s.x-i.x,s.z-i.z)>2600)return;const o=t.field.weatherAt(i.x,i.z,e);if(o.snowRate<2||o.stormIntensity>.3)return;const l=Math.hypot(o.cloudWind.x,o.cloudWind.z),f=l>.001?{x:o.cloudWind.x/l,z:o.cloudWind.z/l}:{x:1,z:0};this.peaks.update({center:i,heading:f,halfWidth:n,halfLength:n*.8,base:560},Math.min(.62,o.snowRate/75),1,t.windAt)}}function C(r,t){return Math.hypot(r.center.x-t.x,r.center.z-t.z)-Math.max(r.halfLength,r.halfWidth)}class U{constructor(t,s,e,i=t.weather){this.air=t,this.queries=s,this.field=i,this.lastTime=e}air;queries;field;flash;cloudFlash;heard=new Set;strikes=new Map;recentFronts=new Map;lastTime;floor=(t,s)=>Math.max(this.queries.waterAt(t,s).level,this.queries.groundAt(t,s)?.height??ht);windAt=(t,s,e)=>{const i=this.field.weatherAt(t,e,this.lastTime),{river:n}=this.air.airAt(t,s,e,this.lastTime),o=W.clamp((s-this.floor(t,e))/320,0,1);return{x:E(i.surfaceWind.x,i.cloudWind.x,o)+n.x,z:E(i.surfaceWind.z,i.cloudWind.z,o)+n.z}};update(t,s,e){const i=this.lastTime;this.lastTime=t,this.flash=void 0,this.cloudFlash=void 0;for(const n of this.field.frontsAt(t))this.recentFronts.set(n.id,n);for(const[n,o]of this.recentFronts){if(t-o.startsAt-o.durationSeconds>13){this.recentFronts.delete(n);continue}const l=Math.max(0,N(o,t-13)-1),f=N(o,t);for(let c=l;c<=f;c++){const a=Y(o,c);if(a>t||t-a>13)continue;const d=`${o.id}:${c}:${a}`;this.strikes.has(d)||this.strikes.set(d,vt(this.field,o.id,c,a,this.floor));const h=this.strikes.get(d);if(!h)continue;const m=t-a;m<.38&&(!this.flash||this.flash.at<a)&&(this.flash=h);const p=xt(m);if(p>(this.cloudFlash?.power??0)){const{x:w,y:z,z:M}=h.origin;this.cloudFlash={position:{x:w,y:z+(m>1?160:25),z:M},power:p}}if(!e)continue;i<a&&e("weather.lightning",h);const{x:u,y:v,z:g}=h.impact,x=Math.hypot(s.x-u,s.y-v,s.z-g),y=a+x/mt;x<=4200&&i<=y&&y<=t&&!this.heard.has(d)&&(this.heard.add(d),e(H,{cue:H,strikeId:h.id,position:h.impact,distance:x,at:y}))}}this.strikes.size>32&&this.strikes.delete(this.strikes.keys().next().value),this.heard.size>32&&this.heard.delete(this.heard.values().next().value)}}const T="storm-coming-harbour",k="storm-under-bank",_="storm-harbour-shot";class St{constructor(t,s,e,i){this.visuals=t,this.sim=s,this.environment=e,this.solo=i}visuals;sim;environment;solo;run;weather;shot;tick(){const{tick:t,gull:s,screen:e}=this.sim.state,i=this.shot;if(i&&(this.solo||i.id===e)){this.sim.teleport(i.listener,i.heading,.22);return}this.currentWeather().update(t*$,s.position,(n,o)=>this.sim.fact(n,o))}draw(t,s){const{tick:e,screen:i,gull:n}=this.sim.state;this.solo&&!this.shot&&this.enter(this.solo.shot===k?k:T);const o=this.shot;if(o&&(this.solo||i===o.id)&&t instanceof lt){const{position:l,target:f,fov:c}=o.camera;t.position.set(l.x,l.y,-l.z),t.lookAt(f.x,f.y,-f.z),t.fov!==c&&(t.fov=c,t.updateProjectionMatrix());const a=this.solo&&!this.solo.shot?o.time+s:o.time,{weather:d}=o;d.update(a,o.listener),this.visuals.prepare(d,o.listener,a,_);return}this.shot=void 0,this.visuals.prepare(this.currentWeather(),n.position,e*$)}enter(t){const s=t===k,{manifests:e}=this.environment,n=e.find(M=>M.id==="home-lookkit")??e.find(M=>M.id==="graybox-a");if(!n)return;const{origin:o,anchors:l}=n,f={x:o.x+l.entry.position.x,y:o.y,z:o.z+l.entry.position.z},c=s?.85:0,a=this.environment.airFor(this.sim.state),d=new ct(this.sim.state.seed,e.map(({id:M,origin:Q,farProxy:tt})=>({id:M,origin:Q,radius:tt.radius})),new dt);d.clock.setHour(13.2);const h=new U(a,this.environment.queries,c,d),m=Y({id:_,startsAt:0},0)+(s?.27:.009),p={x:f.x+225,z:f.z-1870},u={x:-12,z:-15},v={id:_,startsAt:c-m,durationSeconds:150,velocity:u,origin:{x:p.x-m*u.x,z:p.z-m*u.z},halfLength:285,halfWidth:610,baseHeight:223,depth:980,intensity:1};h.field.scheduleFront(v);const g=s?{position:{x:p.x+55,y:77,z:p.z+55},target:{x:p.x-205,y:82,z:p.z-420},fov:60}:{position:{x:f.x-1150,y:f.y+145,z:f.z-110},target:{x:f.x+530,y:f.y+245,z:f.z-980},fov:62},{position:x,target:y}=g,w=Math.atan2(y.x-x.x,y.z-x.z);this.sim.state.target=null;const z={x:x.x+12*Math.sin(w),y:x.y-1.7,z:x.z+12*Math.cos(w)};this.sim.teleport(z,w,.22),this.shot={id:t,camera:g,listener:z,heading:w,time:c,weather:h}}registerShots(t,s){t.screens.set(T,()=>{s(),this.enter(T)}),t.screens.set(k,()=>{s(),this.enter(k)}),t.state.set("storm",()=>this.visuals.metrics),t.actions.set("set_storm_render",({enabled:e})=>(this.visuals.enabled=e!==!1,!0)),t.actions.set("schedule_storm",()=>{const e=this.sim.state.gull.heading,i=this.currentWeather(),n=i.field.scheduleLandfall({id:"storm-test-landfall",startsAt:this.sim.state.tick*$,target:this.sim.state.gull.position,heading:{x:-Math.sin(e),z:-Math.cos(e)}});return this.saveWeather(i),n})}saveWeather(t){const s=this.sim.state,e=ft(s),i=t.field.save();i.scheduledFronts=i.scheduledFronts.filter(n=>n.id!==e?.id),s.parts.stormWeather=i}currentWeather(){const t=this.sim.state,s=this.environment.airFor(t);return(this.run!==t||this.weather?.air!==s)&&(this.run=t,this.weather=new U(s,this.environment.queries,t.tick*$),this.weather.update(t.tick*$,t.gull.position)),this.weather}}const Lt={layer:"weather",companions:["clouds","sea"],create(r){const t=new At,s=t.mount(r);let e;return{connect({sim:i,registrations:n,preview:o,refresh:l,takeOff:f,setHour:c}){const a=pt(i.airAt);if(!a)return;e=new St(t,i,a,o);const d=o?o.shot??"storm-coming-harbour":void 0;return e.registerShots(n,()=>{c(13.2),f(),l()}),d},syncWorld(){e?.tick()},prepareObject:i=>t.shade.install(i),update(i){e?.draw(i.camera,i.seconds),s.update(i)},dispose:()=>s.dispose()}}};export{Lt as effect};
