import{E as W,_ as et,B as q,q as st,$ as it,M as B,V as S,h as k,l as G,p as j,a0 as ot,a1 as Z,a2 as at,P as nt,n as L,a as rt,X as ht,m as I,t as R,Z as lt,W as ct,a3 as dt,a4 as ft,a5 as pt}from"./index-yC7XslmD.js";import{b as P,c as H}from"./storm-cloud-CgEFPEzC.js";import{a as ut,S as X}from"./storm-shade-DNpHE5wh.js";const N="weather.thunder",mt=343,K=13,Y=9;function b(r){let t=2166136261;for(let e=0;e<r.length;e++)t=Math.imul(t^r.charCodeAt(e),16777619);return t^=t>>>16,t=Math.imul(t,2146121005),((t^t>>>15)>>>0)/4294967296}function J(r,t){return r.startsAt+K+t*Y+3*b(`${r.id}:${t}:time`)}function D(r,t){return Math.floor((t-r.startsAt-K)/Y)}function xt(r){const t=r>=0?Math.max(0,1-r/.16):0,e=Math.max(0,1-Math.abs(r-4.05)/.11);return Math.max(t,.84*e)}function vt(r,t,e,s,i){const n=r.frontsAt(s).find(f=>f.id===t);if(!n||n.strength<.48)return;const o=`${t}:${e}`,p=(b(`${o}:side`)-.5)*n.precipitationHalfWidth*.8,l=(b(`${o}:along`)-.5)*n.precipitationHalfLength,{heading:c,precipitationCenter:a}=n,h=a.x+c.x*l-c.z*p,d=a.z+c.z*l+c.x*p,u=i(h,d);if(!(u>=n.baseHeight-20))return{id:o,frontId:t,at:s,origin:{x:h-c.x*32,y:n.baseHeight+n.depth*.12,z:d-c.z*32},impact:{x:h,y:u,z:d}}}function gt(r){return r<0||r>=.38?0:Math.max(Math.exp(-r*21),.65*Math.max(0,1-Math.abs(r-.13)*23))}class yt{position=new W(new Float32Array(648*3),3).setUsage(et);geometry=new q;material=new st({color:15854079,transparent:!0,depthWrite:!1,blending:it,toneMapped:!1});mesh=new B(this.geometry,this.material);id;constructor(){this.geometry.setAttribute("position",this.position),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.visible=!1}update(t,e){if(this.mesh.visible=!!t&&e>.04,!t||!this.mesh.visible)return;this.material.opacity=Math.min(1,e*1.65);const s=`${t.id}:${t.origin.x},${t.origin.z},${t.impact.y}`;s!==this.id&&(this.id=s,this.writeMesh(t))}writeMesh({id:t,origin:e,impact:s}){const i=new S(e.x,e.y,-e.z),n=new S(s.x,s.y,-s.z),o=[i];for(let a=1;a<15;a++){const h=i.clone().lerp(n,a/15),d=Math.min(54,(i.y-n.y)*.22)*Math.sin(a/15*Math.PI);h.x+=(.5*Math.sin(a*.63)+b(`${t}:x:${a}`)-.5)*d,h.z+=(.46*Math.sin(a*.73+1.2)+b(`${t}:z:${a}`)-.5)*d,o.push(h)}o.push(n);let p=0;const l=(a,h,d,u)=>{const f=h.clone().sub(a).normalize(),v=f.clone().cross(new S(1,0,0)).normalize(),m=v.clone().cross(f),g=[v,v.clone().multiplyScalar(-.5).addScaledVector(m,.866),v.clone().multiplyScalar(-.5).addScaledVector(m,-.866)],x=(y,w,z)=>{this.position.setXYZ(p++,y.x+w.x*z,y.y+w.y*z,y.z+w.z*z)};for(let y=0;y<3;y++){const w=g[y],z=g[(y+1)%3];x(a,w,d),x(h,w,u),x(a,z,d),x(a,z,d),x(h,w,u),x(h,z,u)}};for(let a=0;a<15;a++)l(o[a],o[a+1],1.79-a*.077,1.713-a*.077);const c=b(`${t}:bearing`)*Math.PI*2;for(const[a,h]of[[3,0],[5,2.1],[9,4.2]]){let d=o[a];const u=c+h;for(let f=0;f<5;f++){const v=9+b(`${t}:branch:${a}:${f}`)*12,m=u+(b(`${t}:fork:${a}:${f}`)-.5)*1.2,g=Math.min(5+b(`${t}:drop:${a}:${f}`)*16,d.y-n.y-2);if(g<=0)break;const x=d.clone().add(new S(Math.cos(m)*v,-g,Math.sin(m)*v));l(d,x,1.02-f*.18,.84-f*.18),d=x}}this.geometry.setDrawRange(0,p),this.position.needsUpdate=!0}}const wt=[0,1].map(r=>{const t=new nt(2,1,42,12);return t.setAttribute("shaftLayer",new W(new Float32Array(t.attributes.position.count).fill(r),1)),t});class Q{group=new Z;center=new S;axes=new G;wind=new k;material=new j({side:at,forceSinglePass:!0,transparent:!0,depthWrite:!1,uniforms:{core:{value:this.center},axes:{value:this.axes},wind:{value:this.wind},rates:{value:new k}},vertexShader:`
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
    `});sheets=wt.map(t=>new B(t,this.material));constructor(){this.group.add(...this.sheets),this.sheets.forEach(t=>{t.frustumCulled=!1,t.renderOrder=-3})}update(t,e,s,i){const{center:n,heading:o,halfWidth:p,halfLength:l,base:c}=t;if(this.group.visible=e>.01,!this.group.visible)return;this.center.set(n.x,-n.z,c),this.axes.set(o.x,-o.z,1/l,1/p);const a=i(n.x,c*.48,n.z);this.wind.set(a.x,-a.z).multiplyScalar(Math.min(42,c/9)),this.material.uniforms.rates.value.set(e,s);for(const[h,d]of this.sheets.entries()){const u=h===0?-1:1,f=u*l*.24,v=-u*p*.25;d.position.set(n.x+o.x*f-o.z*v,c*.56-5,-n.z-o.z*f-o.x*v),d.rotation.y=Math.atan2(o.x,-o.z)+u*.25,d.scale.set(p*(h===0?.82:.61),c*1.12+10,1)}}}const C=360,F=5,A=12;class zt{listener=new S;floorOrigin=new k;floors=new Float32Array(F**2);core=new S;axes=new G;geometry=new q;material=new j({transparent:!0,depthWrite:!1,uniforms:{listener:{value:this.listener},time:{value:0},floorOrigin:{value:this.floorOrigin},floors:{value:this.floors},core:{value:this.core},axes:{value:this.axes},wind:{value:new k},rates:{value:new k}},vertexShader:`
      uniform vec3 listener;
      uniform float time;
      uniform vec2 floorOrigin;
      uniform float floors[${F**2}];
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
        int start = index.y * ${F} + index.x;
        vec2 uv = fract(cell);
        return mix(mix(floors[start], floors[start + 1], uv.x),
          mix(floors[start + ${F}], floors[start + ${F+1}], uv.x), uv.y);
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
    `});mesh=new ot(this.geometry,this.material);sampledAt=-1/0;floorRefresh;nextFloors=new Float32Array(F**2);constructor(){const t=new Float32Array(C*6),e=new Float32Array(C*4);for(let s=0;s<C;s++){const i=b(`drop-x:${s}`),n=b(`drop-z:${s}`),o=b(`drop-phase:${s}`),p=b(`drop-size:${s}`);t.set([i,0,n,i,1,n],s*6),e.set([o,p,o,p],s*4)}this.geometry.setAttribute("position",new W(t,3)),this.geometry.setAttribute("drop",new W(e,2)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=7}update(t,e,s,i,n,o,p=1/0){if(this.mesh.visible=e.rainRate+e.snowRate>2&&t.y<(s?.base??1300),!this.mesh.visible){this.floorRefresh=void 0;return}const{x:l,y:c,z:a}=t;this.listener.set(l,c,-a),s?(this.core.set(s.center.x,-s.center.z,s.base),this.axes.set(s.heading.x,-s.heading.z,1/s.halfLength,1/s.halfWidth)):(this.core.z=1300,this.axes.set(0,0,0,0));const h=Math.floor(l/A)*A-2*A,d=Math.floor(-a/A)*A-2*A;if(this.floorRefresh&&i<this.floorRefresh.time&&(this.floorRefresh=void 0),i<this.sampledAt||i-this.sampledAt>.25||h!==this.floorOrigin.x||d!==this.floorOrigin.y){const m=this.floorRefresh??={x:h,z:d,time:i,next:0};for(;m.next<this.nextFloors.length&&performance.now()<p;){const g=m.next%F,x=Math.floor(m.next/F);this.nextFloors[m.next++]=o(m.x+g*A,-m.z-x*A)}m.next===this.nextFloors.length&&(this.sampledAt=m.time,this.floorOrigin.set(m.x,m.z),this.floors.set(this.nextFloors),this.floorRefresh=void 0)}const u=n(l,c,a);this.material.uniforms.time.value=i,this.material.uniforms.wind.value.set(u.x,-u.z);const f=e.rainRate,v=e.snowRate;this.material.uniforms.rates.value.set(Math.min(.56,.38*f/175+.49*v/55),v/(f+v))}}const bt=rt.islands.find(r=>r.id==="voxel-iceberg"),Mt=()=>Array.from({length:X},()=>new Q);function U(r){return{center:r.precipitationCenter,heading:r.heading,halfWidth:r.precipitationHalfWidth,halfLength:r.precipitationHalfLength,base:r.baseHeight}}class At{group=new Z;shade=new ut;layers=Mt();drops=new zt;peaks=new Q;bolt=new yt;frame;enabled=!0;metrics={fronts:0,nearPrecipitation:!1,rainRate:0,snowRate:0,lightning:!1,shade:1};constructor(){for(const t of this.layers)this.group.add(t.group);this.group.add(this.peaks.group,this.drops.mesh,this.bolt.mesh)}mount(t){const e=({child:s})=>this.shade.install(s);return this.shade.install(t),t.add(this.group),t.addEventListener("childadded",e),{update:({fixedView:s})=>{const i=this.frame;i&&this.update(t,i.run,i.listener,i.time,i.frontId,s||i.frontId?1/0:performance.now()+2)},dispose:()=>{t.removeEventListener("childadded",e),P.delete(t),this.group.removeFromParent()}}}prepare(t,e,s,i){this.frame={run:t,listener:e,time:s,frontId:i}}update(t,e,s,i,n,o){if(this.group.visible=this.enabled,!this.enabled){P.set(t,{field:e.field,time:i,fronts:[],precipitation:!1,mist:H}),this.shade.update([],void 0,0);return}const p=e.field.frontsAt(i).filter(m=>n?m.id===n:T(m,s)<6500);p.sort((m,g)=>T(m,s)-T(g,s));const l=p.slice(0,X),c=e.flash,a=c?gt(i-c.at):0,h=l[0],d=h&&e.windAt(h.precipitationCenter.x,h.baseHeight*.48,h.precipitationCenter.z);this.bolt.update(c,a);for(const[m,g]of this.layers.entries()){const x=l[m];if(!x){g.group.visible=!1;continue}const y=U(x),{x:w,z}=y.center,M=e.field.weatherAt(w,z,i),O=M.snowRate/Math.max(1,M.snowRate+M.rainRate);g.update(y,x.strength,O,e.windAt)}const u=e.field.weatherAt(s.x,s.z,i),f=p.find(({id:m})=>m===u.stormFrontId);let v=H;if(f&&u.stormIntensity>.12&&s.y<f.baseHeight){const m=L.smoothstep(u.stormIntensity,.12,.92)*.72*(1-L.smoothstep(s.y,f.baseHeight*.85,f.baseHeight)),{sunlight:g}=e.field.clock.clockAt(i),x=.22+.78*L.smoothstep(g,0,.73);v=[.098*x,.15*x,.215*x,m]}this.shade.update(l,c,a,d,v,i),this.drops.update(s,u,f&&U(f),i,e.windAt,e.floor,o),this.updatePeaks(e,s,i),P.set(t,{field:e.field,time:i,fronts:l,precipitation:!!h||this.drops.mesh.visible||this.peaks.group.visible,mist:v,flash:e.cloudFlash}),this.metrics={fronts:l.length,nearPrecipitation:this.drops.mesh.visible,rainRate:u.rainRate,snowRate:u.snowRate,lightning:a>.04,shade:u.transmission}}updatePeaks(t,e,s){const{origin:i,radius:n}=bt;if(this.peaks.group.visible=!1,Math.hypot(e.x-i.x,e.z-i.z)>2600)return;const o=t.field.weatherAt(i.x,i.z,s);if(o.snowRate<2||o.stormIntensity>.3)return;const p=Math.hypot(o.cloudWind.x,o.cloudWind.z),l=p>.001?{x:o.cloudWind.x/p,z:o.cloudWind.z/p}:{x:1,z:0};this.peaks.update({center:i,heading:l,halfWidth:n,halfLength:n*.8,base:560},Math.min(.62,o.snowRate/75),1,t.windAt)}}function T(r,t){return Math.hypot(r.center.x-t.x,r.center.z-t.z)-Math.max(r.halfLength,r.halfWidth)}class V{constructor(t,e,s,i=t.weather){this.air=t,this.queries=e,this.field=i,this.lastTime=s}air;queries;field;flash;cloudFlash;heard=new Set;strikes=new Map;recentFronts=new Map;lastTime;floor=(t,e)=>Math.max(this.queries.waterAt(t,e).level,this.queries.groundAt(t,e)?.height??ht);windAt=(t,e,s)=>{const i=this.field.weatherAt(t,s,this.lastTime),{river:n}=this.air.airAt(t,e,s,this.lastTime),o=L.clamp((e-this.floor(t,s))/320,0,1);return{x:I(i.surfaceWind.x,i.cloudWind.x,o)+n.x,z:I(i.surfaceWind.z,i.cloudWind.z,o)+n.z}};update(t,e,s){const i=this.lastTime;this.lastTime=t,this.flash=void 0,this.cloudFlash=void 0;for(const n of this.field.frontsAt(t))this.recentFronts.set(n.id,n);for(const[n,o]of this.recentFronts){if(t-o.startsAt-o.durationSeconds>13){this.recentFronts.delete(n);continue}const p=Math.max(0,D(o,t-13)-1),l=D(o,t);for(let c=p;c<=l;c++){const a=J(o,c);if(a>t||t-a>13)continue;const h=`${o.id}:${c}:${a}`;this.strikes.has(h)||this.strikes.set(h,vt(this.field,o.id,c,a,this.floor));const d=this.strikes.get(h);if(!d)continue;const u=t-a;u<.38&&(!this.flash||this.flash.at<a)&&(this.flash=d);const f=xt(u);if(f>(this.cloudFlash?.power??0)){const{x:w,y:z,z:M}=d.origin;this.cloudFlash={position:{x:w,y:z+(u>1?160:25),z:M},power:f}}if(!s)continue;i<a&&s("weather.lightning",d);const{x:v,y:m,z:g}=d.impact,x=Math.hypot(e.x-v,e.y-m,e.z-g),y=a+x/mt;x<=4200&&i<=y&&y<=t&&!this.heard.has(h)&&(this.heard.add(h),s(N,{cue:N,strikeId:d.id,position:d.impact,distance:x,at:y}))}}this.strikes.size>32&&this.strikes.delete(this.strikes.keys().next().value),this.heard.size>32&&this.heard.delete(this.heard.values().next().value)}}const _="storm-coming-harbour",$="storm-under-bank",E="storm-harbour-shot";class Ft{constructor(t,e,s,i){this.visuals=t,this.sim=e,this.environment=s,this.solo=i}visuals;sim;environment;solo;run;weather;shot;tick(){const{tick:t,gull:e,screen:s}=this.sim.state,i=this.shot;if(i&&(this.solo||i.id===s)){this.sim.teleport(i.listener,i.heading,.22);return}this.currentWeather().update(t*R,e.position,(n,o)=>this.sim.fact(n,o))}draw(t,e){const{tick:s,screen:i,gull:n}=this.sim.state;this.solo&&!this.shot&&this.enter(this.solo.shot===$?$:_);const o=this.shot;if(o&&(this.solo||i===o.id)&&t instanceof lt){const{position:p,target:l,fov:c}=o.camera;t.position.set(p.x,p.y,-p.z),t.lookAt(l.x,l.y,-l.z),t.fov!==c&&(t.fov=c,t.updateProjectionMatrix());const a=this.solo&&!this.solo.shot?o.time+e:o.time,{weather:h}=o;h.update(a,o.listener),this.visuals.prepare(h,o.listener,a,E);return}this.shot=void 0,this.visuals.prepare(this.currentWeather(),n.position,s*R)}enter(t){const e=t===$,{manifests:s}=this.environment,n=s.find(M=>M.id==="home-lookkit")??s.find(M=>M.id==="graybox-a");if(!n)return;const{origin:o,anchors:p}=n,l={x:o.x+p.entry.position.x,y:o.y,z:o.z+p.entry.position.z},c=e?.85:0,a=this.environment.airFor(this.sim.state),h=new ct(this.sim.state.seed,s.map(({id:M,origin:O,farProxy:tt})=>({id:M,origin:O,radius:tt.radius})),new dt);h.clock.setHour(13.2);const d=new V(a,this.environment.queries,c,h),u=J({id:E,startsAt:0},0)+(e?.27:.009),f={x:l.x+225,z:l.z-1870},v={x:-12,z:-15},m={id:E,startsAt:c-u,durationSeconds:150,velocity:v,origin:{x:f.x-u*v.x,z:f.z-u*v.z},halfLength:285,halfWidth:610,baseHeight:223,depth:980,intensity:1};d.field.scheduleFront(m);const g=e?{position:{x:f.x+55,y:77,z:f.z+55},target:{x:f.x-205,y:82,z:f.z-420},fov:60}:{position:{x:l.x-1150,y:l.y+145,z:l.z-110},target:{x:l.x+530,y:l.y+245,z:l.z-980},fov:62},{position:x,target:y}=g,w=Math.atan2(y.x-x.x,y.z-x.z);this.sim.state.target=null;const z={x:x.x+12*Math.sin(w),y:x.y-1.7,z:x.z+12*Math.cos(w)};this.sim.teleport(z,w,.22),this.shot={id:t,camera:g,listener:z,heading:w,time:c,weather:d}}registerShots(t,e){t.screens.set(_,()=>{e(),this.enter(_)}),t.screens.set($,()=>{e(),this.enter($)}),t.state.set("storm",()=>this.visuals.metrics),t.actions.set("set_storm_render",({enabled:s})=>(this.visuals.enabled=s!==!1,!0)),t.actions.set("schedule_storm",()=>{const s=this.sim.state.gull.heading,i=this.currentWeather(),n=i.field.scheduleLandfall({id:"storm-test-landfall",startsAt:this.sim.state.tick*R,target:this.sim.state.gull.position,heading:{x:-Math.sin(s),z:-Math.cos(s)}});return this.saveWeather(i),n})}saveWeather(t){const e=this.sim.state,s=ft(e),i=t.field.save();i.scheduledFronts=i.scheduledFronts.filter(n=>n.id!==s?.id),e.parts.stormWeather=i}currentWeather(){const t=this.sim.state,e=this.environment.airFor(t);return(this.run!==t||this.weather?.air!==e)&&(this.run=t,this.weather=new V(e,this.environment.queries,t.tick*R),this.weather.update(t.tick*R,t.gull.position)),this.weather}}const kt={layer:"weather",companions:["clouds","sea"],create(r){const t=new At,e=t.mount(r);let s;return{connect({sim:i,registrations:n,preview:o,refresh:p,takeOff:l,setHour:c}){const a=pt(i.airAt);if(!a)return;s=new Ft(t,i,a,o);const h=o?o.shot??"storm-coming-harbour":void 0;return s.registerShots(n,()=>{c(13.2),l(),p()}),h},syncWorld(){s?.tick()},prepareObject:i=>t.shade.install(i),update(i){s?.draw(i.camera,i.seconds),e.update(i)},dispose:()=>e.dispose()}}};export{kt as effect};
