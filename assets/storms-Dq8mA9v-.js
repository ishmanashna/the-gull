import{j as at,i as nt,m as D,S as R,W as rt,k as ht,l as lt,n as N,p as ct}from"./runtime-Fvu5jN8S.js";import{W as dt}from"./wind-batch-BHr2d_4W.js";import{g as ft}from"./saves-ClQI9LoD.js";import{am as P,cM as pt,al as Z,bL as ut,bt as mt,an as K,V as S,g as $,a as X,ak as Y,ct as xt,cx as J,D as gt,av as vt,cy as W,P as yt}from"./three.core-BYa7ON5M.js";import{b as O,c as U}from"./storm-cloud-CgEFPEzC.js";import{a as wt,S as Q}from"./storm-shade-CQyIEidH.js";import"./three-renderer-BP556_pn.js";import"./index-CNUyvlgf.js";import"./table-D89Xz1NR.js";import"./credits-page-dWtXkrRi.js";import"./music-CxylN_mZ.js";const C=9,L=7,zt={x:0,y:0,z:0};function V(r,t,s,e){const i=s+e*5.3;return{x:r.x+Math.cos(i)*t+e*2.5,y:r.y+(e-.42)*r.verticalRange*1.55,z:r.z+Math.sin(i)*t}}class bt{batch=new dt(C*L*2,[.34,.94,.85]);route;drafts=[];constructor(t){t.add(this.batch.mesh)}update(t,s,e){if(t!==this.route&&(this.route=t,this.drafts=t?at(t):[]),!s){this.batch.flush();return}for(const i of this.drafts){const n=s.weather.weatherAt(i.x,i.z,e);if(n.stormFrontId===i.frontId)for(let o=0;o<C;o++){const f=(e*.25+o/C)%1,h=i.radius*(.26+o%3*.08),d=o*2.4,a=Math.sin(f*Math.PI)*n.stormIntensity;let l=V(i,h,d,f-.23);for(let c=0;c<L;c++){const u=c/L,p=(c+1)/L,g=V(i,h,d,f-.23*(1-p));this.batch.stroke(l,g,zt,.2+.06*u,Math.sin(u*Math.PI)*a,Math.sin(p*Math.PI)*a,.2+.06*p),l=g}}}this.batch.flush()}dispose(){this.batch.dispose()}}const q="weather.thunder",Mt=343,tt=13,et=9;function b(r){let t=2166136261;for(let s=0;s<r.length;s++)t=Math.imul(t^r.charCodeAt(s),16777619);return t^=t>>>16,t=Math.imul(t,2146121005),((t^t>>>15)>>>0)/4294967296}function st(r,t){return r.startsAt+tt+t*et+3*b(`${r.id}:${t}:time`)}function B(r,t){return Math.floor((t-r.startsAt-tt)/et)}function At(r){const t=r>=0?Math.max(0,1-r/.16):0,s=Math.max(0,1-Math.abs(r-4.05)/.11);return Math.max(t,.84*s)}function Ft(r,t,s,e,i){const n=r.frontsAt(e).find(p=>p.id===t);if(!n||n.strength<.48)return;const o=`${t}:${s}`,f=(b(`${o}:side`)-.5)*n.precipitationHalfWidth*.8,h=(b(`${o}:along`)-.5)*n.precipitationHalfLength,{heading:d,precipitationCenter:a}=n,l=a.x+d.x*h-d.z*f,c=a.z+d.z*h+d.x*f,u=i(l,c);if(!(u>=n.baseHeight-20))return{id:o,frontId:t,at:e,origin:{x:l-d.x*32,y:n.baseHeight+n.depth*.12,z:c-d.z*32},impact:{x:l,y:u,z:c}}}function St(r){return r<0||r>=.38?0:Math.max(Math.exp(-r*21),.65*Math.max(0,1-Math.abs(r-.13)*23))}class Rt{position=new P(new Float32Array(648*3),3).setUsage(pt);geometry=new Z;material=new ut({color:15854079,transparent:!0,depthWrite:!1,blending:mt,toneMapped:!1});mesh=new K(this.geometry,this.material);id;constructor(){this.geometry.setAttribute("position",this.position),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.visible=!1}update(t,s){if(this.mesh.visible=!!t&&s>.04,!t||!this.mesh.visible)return;this.material.opacity=Math.min(1,s*1.65);const e=`${t.id}:${t.origin.x},${t.origin.z},${t.impact.y}`;e!==this.id&&(this.id=e,this.writeMesh(t))}writeMesh({id:t,origin:s,impact:e}){const i=new S(s.x,s.y,-s.z),n=new S(e.x,e.y,-e.z),o=[i];for(let a=1;a<15;a++){const l=i.clone().lerp(n,a/15),c=Math.min(54,(i.y-n.y)*.22)*Math.sin(a/15*Math.PI);l.x+=(.5*Math.sin(a*.63)+b(`${t}:x:${a}`)-.5)*c,l.z+=(.46*Math.sin(a*.73+1.2)+b(`${t}:z:${a}`)-.5)*c,o.push(l)}o.push(n);let f=0;const h=(a,l,c,u)=>{const p=l.clone().sub(a).normalize(),g=p.clone().cross(new S(1,0,0)).normalize(),m=g.clone().cross(p),v=[g,g.clone().multiplyScalar(-.5).addScaledVector(m,.866),g.clone().multiplyScalar(-.5).addScaledVector(m,-.866)],x=(y,w,z)=>{this.position.setXYZ(f++,y.x+w.x*z,y.y+w.y*z,y.z+w.z*z)};for(let y=0;y<3;y++){const w=v[y],z=v[(y+1)%3];x(a,w,c),x(l,w,u),x(a,z,c),x(a,z,c),x(l,w,u),x(l,z,u)}};for(let a=0;a<15;a++)h(o[a],o[a+1],1.79-a*.077,1.713-a*.077);const d=b(`${t}:bearing`)*Math.PI*2;for(const[a,l]of[[3,0],[5,2.1],[9,4.2]]){let c=o[a];const u=d+l;for(let p=0;p<5;p++){const g=9+b(`${t}:branch:${a}:${p}`)*12,m=u+(b(`${t}:fork:${a}:${p}`)-.5)*1.2,v=Math.min(5+b(`${t}:drop:${a}:${p}`)*16,c.y-n.y-2);if(v<=0)break;const x=c.clone().add(new S(Math.cos(m)*g,-v,Math.sin(m)*g));h(c,x,1.02-p*.18,.84-p*.18),c=x}}this.geometry.setDrawRange(0,f),this.position.needsUpdate=!0}}const kt=[0,1].map(r=>{const t=new vt(2,1,42,12);return t.setAttribute("shaftLayer",new P(new Float32Array(t.attributes.position.count).fill(r),1)),t});class it{group=new J;center=new S;axes=new X;wind=new $;material=new Y({side:gt,forceSinglePass:!0,transparent:!0,depthWrite:!1,uniforms:{core:{value:this.center},axes:{value:this.axes},wind:{value:this.wind},rates:{value:new $}},vertexShader:`
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
    `});sheets=kt.map(t=>new K(t,this.material));constructor(){this.group.add(...this.sheets),this.sheets.forEach(t=>{t.frustumCulled=!1,t.renderOrder=-3})}update(t,s,e,i){const{center:n,heading:o,halfWidth:f,halfLength:h,base:d}=t;if(this.group.visible=s>.01,!this.group.visible)return;this.center.set(n.x,-n.z,d),this.axes.set(o.x,-o.z,1/h,1/f);const a=i(n.x,d*.48,n.z);this.wind.set(a.x,-a.z).multiplyScalar(Math.min(42,d/9)),this.material.uniforms.rates.value.set(s,e);for(const[l,c]of this.sheets.entries()){const u=l===0?-1:1,p=u*h*.24,g=-u*f*.25;c.position.set(n.x+o.x*p-o.z*g,d*.56-5,-n.z-o.z*p-o.x*g),c.rotation.y=Math.atan2(o.x,-o.z)+u*.25,c.scale.set(f*(l===0?.82:.61),d*1.12+10,1)}}}const T=360,F=5,A=12;class $t{listener=new S;floorOrigin=new $;floors=new Float32Array(F**2);core=new S;axes=new X;geometry=new Z;material=new Y({transparent:!0,depthWrite:!1,uniforms:{listener:{value:this.listener},time:{value:0},floorOrigin:{value:this.floorOrigin},floors:{value:this.floors},core:{value:this.core},axes:{value:this.axes},wind:{value:new $},rates:{value:new $}},vertexShader:`
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
    `});mesh=new xt(this.geometry,this.material);sampledAt=-1/0;floorRefresh;nextFloors=new Float32Array(F**2);constructor(){const t=new Float32Array(T*6),s=new Float32Array(T*4);for(let e=0;e<T;e++){const i=b(`drop-x:${e}`),n=b(`drop-z:${e}`),o=b(`drop-phase:${e}`),f=b(`drop-size:${e}`);t.set([i,0,n,i,1,n],e*6),s.set([o,f,o,f],e*4)}this.geometry.setAttribute("position",new P(t,3)),this.geometry.setAttribute("drop",new P(s,2)),this.mesh.frustumCulled=!1,this.mesh.renderOrder=7}update(t,s,e,i,n,o,f=1/0){if(this.mesh.visible=s.rainRate+s.snowRate>2&&t.y<(e?.base??1300),!this.mesh.visible){this.floorRefresh=void 0;return}const{x:h,y:d,z:a}=t;this.listener.set(h,d,-a),e?(this.core.set(e.center.x,-e.center.z,e.base),this.axes.set(e.heading.x,-e.heading.z,1/e.halfLength,1/e.halfWidth)):(this.core.z=1300,this.axes.set(0,0,0,0));const l=Math.floor(h/A)*A-2*A,c=Math.floor(-a/A)*A-2*A;if(this.floorRefresh&&i<this.floorRefresh.time&&(this.floorRefresh=void 0),i<this.sampledAt||i-this.sampledAt>.25||l!==this.floorOrigin.x||c!==this.floorOrigin.y){const m=this.floorRefresh??={x:l,z:c,time:i,next:0};for(;m.next<this.nextFloors.length&&performance.now()<f;){const v=m.next%F,x=Math.floor(m.next/F);this.nextFloors[m.next++]=o(m.x+v*A,-m.z-x*A)}m.next===this.nextFloors.length&&(this.sampledAt=m.time,this.floorOrigin.set(m.x,m.z),this.floors.set(this.nextFloors),this.floorRefresh=void 0)}const u=n(h,d,a);this.material.uniforms.time.value=i,this.material.uniforms.wind.value.set(u.x,-u.z);const p=s.rainRate,g=s.snowRate;this.material.uniforms.rates.value.set(Math.min(.56,.38*p/175+.49*g/55),g/(p+g))}}const Lt=ft.islands.find(r=>r.id==="voxel-iceberg"),Wt=()=>Array.from({length:Q},()=>new it);function G(r){return{center:r.precipitationCenter,heading:r.heading,halfWidth:r.precipitationHalfWidth,halfLength:r.precipitationHalfLength,base:r.baseHeight}}class Pt{group=new J;shade=new wt;layers=Wt();drops=new $t;peaks=new it;bolt=new Rt;frame;enabled=!0;metrics={fronts:0,nearPrecipitation:!1,rainRate:0,snowRate:0,lightning:!1,shade:1};constructor(){for(const t of this.layers)this.group.add(t.group);this.group.add(this.peaks.group,this.drops.mesh,this.bolt.mesh)}mount(t){const s=({child:e})=>this.shade.install(e);return this.shade.install(t),t.add(this.group),t.addEventListener("childadded",s),{update:({fixedView:e})=>{const i=this.frame;i&&this.update(t,i.run,i.listener,i.time,i.frontId,e||i.frontId?1/0:performance.now()+2)},dispose:()=>{t.removeEventListener("childadded",s),O.delete(t),this.group.removeFromParent()}}}prepare(t,s,e,i){this.frame={run:t,listener:s,time:e,frontId:i}}update(t,s,e,i,n,o){if(this.group.visible=this.enabled,!this.enabled){O.set(t,{field:s.field,time:i,fronts:[],precipitation:!1,mist:U}),this.shade.update([],void 0,0);return}const f=s.field.frontsAt(i).filter(m=>n?m.id===n:_(m,e)<6500);f.sort((m,v)=>_(m,e)-_(v,e));const h=f.slice(0,Q),d=s.flash,a=d?St(i-d.at):0,l=h[0],c=l&&s.windAt(l.precipitationCenter.x,l.baseHeight*.48,l.precipitationCenter.z);this.bolt.update(d,a);for(const[m,v]of this.layers.entries()){const x=h[m];if(!x){v.group.visible=!1;continue}const y=G(x),{x:w,z}=y.center,M=s.field.weatherAt(w,z,i),I=M.snowRate/Math.max(1,M.snowRate+M.rainRate);v.update(y,x.strength,I,s.windAt)}const u=s.field.weatherAt(e.x,e.z,i),p=f.find(({id:m})=>m===u.stormFrontId);let g=U;if(p&&u.stormIntensity>.12&&e.y<p.baseHeight){const m=W.smoothstep(u.stormIntensity,.12,.92)*.72*(1-W.smoothstep(e.y,p.baseHeight*.85,p.baseHeight)),{sunlight:v}=s.field.clock.clockAt(i),x=.22+.78*W.smoothstep(v,0,.73);g=[.098*x,.15*x,.215*x,m]}this.shade.update(h,d,a,c,g,i),this.drops.update(e,u,p&&G(p),i,s.windAt,s.floor,o),this.updatePeaks(s,e,i),O.set(t,{field:s.field,time:i,fronts:h,precipitation:!!l||this.drops.mesh.visible||this.peaks.group.visible,mist:g,flash:s.cloudFlash}),this.metrics={fronts:h.length,nearPrecipitation:this.drops.mesh.visible,rainRate:u.rainRate,snowRate:u.snowRate,lightning:a>.04,shade:u.transmission}}updatePeaks(t,s,e){const{origin:i,radius:n}=Lt;if(this.peaks.group.visible=!1,Math.hypot(s.x-i.x,s.z-i.z)>2600)return;const o=t.field.weatherAt(i.x,i.z,e);if(o.snowRate<2||o.stormIntensity>.3)return;const f=Math.hypot(o.cloudWind.x,o.cloudWind.z),h=f>.001?{x:o.cloudWind.x/f,z:o.cloudWind.z/f}:{x:1,z:0};this.peaks.update({center:i,heading:h,halfWidth:n,halfLength:n*.8,base:560},Math.min(.62,o.snowRate/75),1,t.windAt)}}function _(r,t){return Math.hypot(r.center.x-t.x,r.center.z-t.z)-Math.max(r.halfLength,r.halfWidth)}class j{constructor(t,s,e,i=t.weather){this.air=t,this.queries=s,this.field=i,this.lastTime=e}air;queries;field;flash;cloudFlash;heard=new Set;strikes=new Map;recentFronts=new Map;lastTime;floor=(t,s)=>Math.max(this.queries.waterAt(t,s).level,this.queries.groundAt(t,s)?.height??nt);windAt=(t,s,e)=>{const i=this.field.weatherAt(t,e,this.lastTime),{river:n}=this.air.airAt(t,s,e,this.lastTime),o=W.clamp((s-this.floor(t,e))/320,0,1);return{x:D(i.surfaceWind.x,i.cloudWind.x,o)+n.x,z:D(i.surfaceWind.z,i.cloudWind.z,o)+n.z}};update(t,s,e){const i=this.lastTime;this.lastTime=t,this.flash=void 0,this.cloudFlash=void 0;for(const n of this.field.frontsAt(t))this.recentFronts.set(n.id,n);for(const[n,o]of this.recentFronts){if(t-o.startsAt-o.durationSeconds>13){this.recentFronts.delete(n);continue}const f=Math.max(0,B(o,t-13)-1),h=B(o,t);for(let d=f;d<=h;d++){const a=st(o,d);if(a>t||t-a>13)continue;const l=`${o.id}:${d}:${a}`;this.strikes.has(l)||this.strikes.set(l,Ft(this.field,o.id,d,a,this.floor));const c=this.strikes.get(l);if(!c)continue;const u=t-a;u<.38&&(!this.flash||this.flash.at<a)&&(this.flash=c);const p=At(u);if(p>(this.cloudFlash?.power??0)){const{x:w,y:z,z:M}=c.origin;this.cloudFlash={position:{x:w,y:z+(u>1?160:25),z:M},power:p}}if(!e)continue;i<a&&e("weather.lightning",c);const{x:g,y:m,z:v}=c.impact,x=Math.hypot(s.x-g,s.y-m,s.z-v),y=a+x/Mt;x<=4200&&i<=y&&y<=t&&!this.heard.has(l)&&(this.heard.add(l),e(q,{cue:q,strikeId:c.id,position:c.impact,distance:x,at:y}))}}this.strikes.size>32&&this.strikes.delete(this.strikes.keys().next().value),this.heard.size>32&&this.heard.delete(this.heard.values().next().value)}}const E="storm-coming-harbour",k="storm-under-bank",H="storm-harbour-shot";class It{constructor(t,s,e,i){this.visuals=t,this.sim=s,this.environment=e,this.solo=i}visuals;sim;environment;solo;run;weather;shot;tick(){const{tick:t,gull:s,screen:e}=this.sim.state,i=this.shot;if(i&&(this.solo||i.id===e)){this.sim.teleport(i.listener,i.heading,.22);return}this.currentWeather().update(t*R,s.position,(n,o)=>this.sim.fact(n,o))}draw(t,s){const{tick:e,screen:i,gull:n}=this.sim.state;this.solo&&!this.shot&&this.enter(this.solo.shot===k?k:E);const o=this.shot;if(o&&(this.solo||i===o.id)&&t instanceof yt){const{position:f,target:h,fov:d}=o.camera;t.position.set(f.x,f.y,-f.z),t.lookAt(h.x,h.y,-h.z),t.fov!==d&&(t.fov=d,t.updateProjectionMatrix());const a=this.solo&&!this.solo.shot?o.time+s:o.time,{weather:l}=o;l.update(a,o.listener),this.visuals.prepare(l,o.listener,a,H);return}this.shot=void 0,this.visuals.prepare(this.currentWeather(),n.position,e*R)}enter(t){const s=t===k,{manifests:e}=this.environment,n=e.find(M=>M.id==="home-lookkit")??e.find(M=>M.id==="graybox-a");if(!n)return;const{origin:o,anchors:f}=n,h={x:o.x+f.entry.position.x,y:o.y,z:o.z+f.entry.position.z},d=s?.85:0,a=this.environment.airFor(this.sim.state),l=new rt(this.sim.state.seed,e.map(({id:M,origin:I,farProxy:ot})=>({id:M,origin:I,radius:ot.radius})),new ht);l.clock.setHour(13.2);const c=new j(a,this.environment.queries,d,l),u=st({id:H,startsAt:0},0)+(s?.27:.009),p={x:h.x+225,z:h.z-1870},g={x:-12,z:-15},m={id:H,startsAt:d-u,durationSeconds:150,velocity:g,origin:{x:p.x-u*g.x,z:p.z-u*g.z},halfLength:285,halfWidth:610,baseHeight:223,depth:980,intensity:1};c.field.scheduleFront(m);const v=s?{position:{x:p.x+55,y:77,z:p.z+55},target:{x:p.x-205,y:82,z:p.z-420},fov:60}:{position:{x:h.x-1150,y:h.y+145,z:h.z-110},target:{x:h.x+530,y:h.y+245,z:h.z-980},fov:62},{position:x,target:y}=v,w=Math.atan2(y.x-x.x,y.z-x.z);this.sim.state.target=null;const z={x:x.x+12*Math.sin(w),y:x.y-1.7,z:x.z+12*Math.cos(w)};this.sim.teleport(z,w,.22),this.shot={id:t,camera:v,listener:z,heading:w,time:d,weather:c}}registerShots(t,s){t.screens.set(E,()=>{s(),this.enter(E)}),t.screens.set(k,()=>{s(),this.enter(k)}),t.state.set("storm",()=>this.visuals.metrics),t.actions.set("set_storm_render",({enabled:e})=>(this.visuals.enabled=e!==!1,!0)),t.actions.set("schedule_storm",()=>{const e=this.sim.state.gull.heading,i=this.currentWeather(),n=i.field.scheduleLandfall({id:"storm-test-landfall",startsAt:this.sim.state.tick*R,target:this.sim.state.gull.position,heading:{x:-Math.sin(e),z:-Math.cos(e)}});return this.saveWeather(i),n})}saveWeather(t){const s=this.sim.state,e=lt(s),i=t.field.save();i.scheduledFronts=i.scheduledFronts.filter(n=>n.id!==e?.id),s.parts.stormWeather=i}currentWeather(){const t=this.sim.state,s=this.environment.airFor(t);return(this.run!==t||this.weather?.air!==s)&&(this.run=t,this.weather=new j(s,this.environment.queries,t.tick*R),this.weather.update(t.tick*R,t.gull.position)),this.weather}}const Bt={layer:"weather",companions:["clouds","sea"],create(r){const t=new Pt,s=t.mount(r);let e,i,n;return{connect({sim:o,registrations:f,preview:h,refresh:d,takeOff:a,setHour:l}){const c=N(o.airAt);if(!c)return;i=o,e=new It(t,o,c,h);const u=h?h.shot??"storm-coming-harbour":void 0;return e.registerShots(f,()=>{l(13.2),a(),d()}),u},syncWorld(){e?.tick()},prepareObject:o=>t.shade.install(o),update(o){if(i){const{state:f}=i,h=ct(f);h&&(n??=new bt(r));const d=h&&N(i.airAt)?.airFor(f);n?.update(h,d,f.tick*R)}e?.draw(o.camera,o.seconds),s.update(o)},dispose(){n?.dispose(),s.dispose()}}}};export{Bt as effect};
