import{cy as s,cz as _,cA as J,B as Se,E as Pe,p as pe,J as ue,P as ke,$ as ze,a2 as Ie,M as B,a6 as U,aB as Ce,bF as Ae,cB as Q,cC as Fe,a1 as G,cD as Le,bv as Re,cE as me,aC as Ee,aD as w,cF as j,a3 as Be,cG as De,q as se,cH as Y,ab as Ge,I as Te,cn as _e,S as $e,n as Oe,b as te,cI as Ke,V as qe,b0 as Ne,cJ as D,b9 as Ue,b8 as ae,aR as ne,cK as Ve,cL as je,cM as He,t as We,cN as ie,as as Xe,cO as C}from"./index-yC7XslmD.js";import{s as Je}from"./street-cast-DYn1YrLN.js";import{iceFloor as V,iceSurfaces as Ye}from"./terrain-BL-B-k6H.js";import{g as $}from"./geometry-buffers-DY4QGWX1.js";import{t as F,P as T,n as ge,r as ce,s as Ze,p as Qe}from"./shore-Dm7RRGkr.js";const O=[s(174,-.55,-130.12),s(174,3.36,-130.12),s(175.22,3.32,-130.83),s(_.x,3.08,_.z),s(_.x,2.11,_.z),s(_.x,-1.2,_.z),s(181,-1.2,-141.5),s(174,-1.2,-130.12)],ve=1.15,ye=O.map((t,e)=>{const o=O[(e+1)%O.length];return{from:t,to:o,length:Math.hypot(o.x-t.x,o.y-t.y,o.z-t.z)}}),eo=ye.reduce((t,e)=>t+e.length,0);function oo(t){let e=t*ve%eo;for(const{from:o,to:a,length:i}of ye){if(e<i){const n=e/i;return s(o.x+(a.x-o.x)*n,o.y+(a.y-o.y)*n,o.z+(a.z-o.z)*n)}e-=i}return O[0]}const L=(t,e,o)=>s(t,V(t,e,o)+.24,e);function A(t,e,o,a,i){return{id:t,nameKey:e,place:o,position:a,color:i,kind:"item",tags:["trinket"]}}const we=[{...A("frozen-herring","Frozen herring","fishing-shelf",O[0],"#a4d7de"),ownerActor:"ice-fisher",souvenir:"frozen-herring",route:O.map(t=>({position:t})),speed:ve,loop:!0},A("tin-mug","Tin mug","station",L(103,-123),"#c7d9d8"),A("lost-mitten","Lost mitten","station",L(137,-121),"#d96f54"),A("radio-dial","Radio dial","station",L(129,-108),"#ca864b"),A("sample-vial","Sample vial","ice-cave",L(49,-43,24),"#87e5df"),A("ice-core-cap","Ice core cap","ice-cave",L(92,-20,25),"#e89545"),A("seaglass","Sea glass","ice-arch",L(-169,-133),"#71e4c7"),A("tide-gauge-float","Tide gauge float","fishing-shelf",L(185,-139),"#ff964d"),A("survey-pennant","Survey pennant","walrus-shelf",L(-218,-78),"#f5aa43"),A("snow-goggles","Snow goggles","summit",L(62,26),"#a5775d")],to=we.map(({id:t,place:e})=>({id:`find-${t}`,kind:"find",place:e,steps:[{fact:"grabbed",thing:t}],reward:t==="frozen-herring"?{coins:3,souvenir:t}:{coins:1}}));function so(t){const o=new Float32Array(6900);for(let r=0;r<2300;r++)o[r*3]=J(r,0,17),o[r*3+1]=J(r,1,17),o[r*3+2]=J(r,2,17);const a=new Se;a.setAttribute("position",new Pe(o,3));const i=new pe({uniforms:{time:{value:t.seconds}},transparent:!0,depthWrite:!1,vertexShader:`
      uniform float time;
      varying float opacity;
      void main() {
        vec3 anchor = (modelMatrix * vec4(0., 0., 0., 1.)).xyz;
        vec3 extent = vec3(112., 56., 112.);
        vec3 drift = vec3(1.4, -1.8 - position.x * 1.1, 0.9) * time;
        vec3 offset = mod(position * extent + drift - cameraPosition + anchor, extent) - extent * 0.5;
        vec3 world = cameraPosition + offset;
        float distanceToIce = length((world - anchor).xz);
        float fade = smoothstep(1.8, 6.0, length(offset)) *
          (1.0 - smoothstep(29.0, 48.0, length(offset))) *
          (1.0 - smoothstep(265.0, 515.0, distanceToIce));
        vec3 local = world - anchor;
        float cave = 1.0 - smoothstep(28.0, 44.0, length((local.xz - vec2(57.0, 28.0)) * vec2(1.0, .55)));
        float shelter = cave * (1.0 - smoothstep(28.0, 47.0, local.y));
        opacity = fade * (1.0 - shelter) * smoothstep(2.0, 15.0, world.y) * 0.62;
        vec4 eye = viewMatrix * vec4(world, 1.);
        gl_Position = projectionMatrix * eye;
        gl_PointSize = clamp((30.0 + position.y * 26.0) / max(1.0, -eye.z), 1.0, 4.0);
      }
    `,fragmentShader:`
      varying float opacity;
      void main() {
        float mask = 1.0 - smoothstep(0.12, 0.5, length(gl_PointCoord - 0.5));
        gl_FragColor = vec4(0.84, 0.94, 1.0, mask * opacity);
      }
    `}),n=new ue(a,i);return n.frustumCulled=!1,n}function ao(){const t=new ke(1320,166,144,14),e=new pe({transparent:!0,side:Ie,blending:ze,uniforms:{time:{value:0},strength:{value:0}},vertexShader:`
      uniform float time;
      varying vec2 curtain;
      void main() {
        curtain = uv;
        vec3 p = position;
        float t = uv.x;
        p.y += 35.0 * sin(t * 9.7 + time * .05) + 18. * sin(t * 23.0);
        p.z += 90.0 * cos(t * 17.0 + time * .025) + 33. * sin(t * 31.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      uniform float time;
      uniform float strength;
      varying vec2 curtain;
      void main() {
        float x = curtain.x;
        float h = curtain.y;
        float ray = .56 + .24 * sin(x * 531. + sin(x * 96.) * 1.4 + time * .14) + .16 * sin(x * 239.);
        float breadth = smoothstep(0., .17, x) * (1. - smoothstep(.69, 1., x));
        float fold = pow(.5 + .5 * cos(x * 32. + time * .045), 1.45);
        float veil = smoothstep(0., .085, h) * exp(-h * (2.45 + fold)) * (1. - smoothstep(.58, 1., h));
        float edgeDistance = (h - .103) * 12.5;
        float edge = exp(-edgeDistance * edgeDistance) * smoothstep(.06, .09, h);
        vec3 color = mix(vec3(.075, 1., .45), vec3(.39, .32, .95), smoothstep(.18, .72, h));
        float glow = (0.32 + 0.68 * ray) * (0.34 + 0.66 * fold) * veil + edge * fold * .35;
        float opacity = min(.93, strength * breadth * glow);
        float coverage = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
        if (opacity < .003 + .14 * coverage) discard;
        gl_FragColor = vec4(color, opacity);
      }
    `}),o=new B(t,e);return o.position.set(-20,307,-335),o.rotation.y=-.16,o}function no(t,e,o,a){const i=t.material,n=e.material;i.uniforms.time.value=n.uniforms.time.value=o,n.uniforms.strength.value=a?1.48:0,e.visible=a}function io(t){const e=new U({vertexColors:!0,roughness:.7});return e.onBeforeCompile=o=>{o.uniforms.polarDay=t;const a=`varying vec3 polarPosition, polarNormal;
      flat varying float polarPlane;
      varying vec2 polarFace;`;o.vertexShader=`${a}
${o.vertexShader}`.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      polarPosition = position;
      polarNormal = normal;
      polarPlane = round(dot(position, abs(normal)));
      polarFace = uv;
    `),o.fragmentShader=`${a}
      uniform float polarDay;

      float blockGrain(vec2 p) {
        return fract(21.71 * fract(dot(p, vec2(0.06711, 0.00584))));
      }
    ${o.fragmentShader}`.replace("#include <opaque_fragment>",`
      if (polarDay > 0.0 && polarFace.y >= 0.0) {
        vec3 p = polarPosition;
        vec3 face = polarNormal;
        float wall = 1.0 - abs(face.y);
        vec2 plane = abs(face.x) > 0.5 ? p.zy : p.xy;
        if (face.y != 0.0) plane = p.xz;
        vec2 grid = (plane - vec2(0.0, 2.0 * wall)) * 0.25;
        vec2 edge = fract(grid + 0.0002);
        vec2 aa = clamp(fwidth(grid), vec2(0.002), vec2(0.14));
        float slabId = floor((polarFace.x + 0.002) / 32.0);
        float snowDepth = polarFace.x - slabId * 32.0;
        float edgeId = floor((polarFace.y + 0.002) * 0.25);
        float recess = clamp(polarFace.y - edgeId * 4.0, 0.0, 1.0);
        vec4 exposed = mod(floor(edgeId / vec4(1.0, 2.0, 4.0, 8.0)), 2.0);
        vec4 distanceToEdge = vec4(edge.x, 1.0 - edge.x, edge.y, 1.0 - edge.y);
        vec4 rim = exposed * (1.0 - smoothstep(vec4(0.015), vec4(0.13) + aa.xxyy, distanceToEdge));
        float slab = blockGrain(vec2(slabId, polarPlane * 0.25));
        float bedding = (plane.x + 0.16 * plane.y) * 0.091;
        vec2 sheetId = vec2(floor(bedding), polarPlane * 0.20);
        float sheet = mix(blockGrain(sheetId), blockGrain(sheetId + vec2(1.0, 0.0)),
          smoothstep(0.10, 0.90, fract(bedding)));
        vec3 iceSun = normalize(vec3(-0.6, 0.7, 0.4));
        #if NUM_DIR_LIGHTS > 0
          iceSun = inverseTransformDirection(directionalLights[0].direction, viewMatrix);
        #endif
        float sunward = max(0.0, dot(face, iceSun));
        float lightU = abs(face.x) > 0.5 ? iceSun.z : iceSun.x;
        float lightV = abs(face.y) > 0.5 ? iceSun.z : iceSun.y;
        vec4 edgeLight = vec4(-lightU, lightU, -lightV, lightV);
        vec4 litRim = rim * clamp(0.42 + edgeLight * 0.65, 0.0, 1.0);
        vec4 shadedRim = rim * max(-edgeLight, 0.0);
        float shine = max(max(litRim.x, litRim.y), max(litRim.z, litRim.w));
        float shade = max(max(shadedRim.x, shadedRim.y), max(shadedRim.z, shadedRim.w));
        float lowSun = 1.0 - smoothstep(0.32, 0.78, iceSun.y);
        float key = clamp(0.14 + 0.94 * sunward + 0.17 * face.z, 0.0, 1.0);
        vec3 cool = vec3(0.029, 0.20, 0.54);
        vec3 pale = vec3(0.52, 0.77, 0.98);
        float frost = 1.0 - smoothstep(1.8, 10.0, snowDepth);
        float blueBedding = smoothstep(0.55, 0.95, sheet) * wall;
        vec3 ice = mix(cool, pale, 0.40 + 0.52 * frost - 0.32 * blueBedding + (slab - 0.5) * 0.24);
        ice *= mix(vec3(0.38, 0.54, 0.83), vec3(1.09, 1.12, 1.12), key);
        ice *= 1.0 - shade * 0.39;
        ice += shine * wall * vec3(0.32, 0.40, 0.41);

        vec3 cyan = mix(vec3(0.008, 0.10, 0.22), vec3(0.024, 0.26, 0.46), sheet);
        ice = mix(ice, cyan, recess * (0.84 - 0.22 * sunward));
        if (face.y < 0.0) ice = mix(ice, cyan * 0.49, 0.82);
        float tide = 1.0 - smoothstep(-0.4, 7.5, p.y);
        ice = mix(ice, vec3(0.010, 0.23, 0.32) * (0.62 + 0.73 * sunward), tide * 0.81);

        float lip = snowDepth + (slab - 0.5) * 0.67;
        float snowLip = 1.0 - smoothstep(1.38, 1.83, lip);
        float underCap = smoothstep(1.35, 1.86, lip) * (1.0 - smoothstep(1.86, 2.45, lip));
        ice *= 1.0 - underCap * wall * (0.23 - 0.085 * sunward);
        float snowCover = max(max(face.y, 0.0), snowLip * wall * smoothstep(-0.10, 0.70, p.y));
        vec3 snow = mix(vec3(0.67, 0.77, 0.91), vec3(1.24, 1.20, 1.11),
          max(face.y * 0.89, key));
        snow *= (0.98 + shine * 0.15 + (slab - 0.5) * 0.045) * (1.0 - 0.26 * recess);
        vec3 daylightIce = mix(ice, snow, snowCover);
        daylightIce *= mix(vec3(0.85, 0.93, 1.0), vec3(1.18, 1.02, 0.79),
          mix(0.46, sunward, lowSun));
        outgoingLight = mix(outgoingLight, daylightIce, polarDay * 0.89);
      }
      #include <opaque_fragment>
    `)},e}const co=["seal","puffin"],ro=[0,2,3,4,6,7],lo=[[-126,-145],[-117,-134],[-108,-143],[-99,-135],[-90,-138],[-81,-135]],re=1,fo=[[-113,-103],[-106,-100],[-98,-101],[-91,-99],[-17,-102],[-10,-102],[-3,-104],[16,-103],[23,-102],[30,-99]],ho=[[164,-140,-.83],[159,-144,.52],[155,-139,-.46],[-128,-149,.27],[-120,-149,-1.07]],po=[...[-3.4,2.7].map((t,e)=>{const[o,a,,i]=j[re];return{id:`walrus-${e+1}`,archetype:"walrus",position:s(o+2.5,i,a+t),floe:re,heading:Math.PI+(e===0?.85:-.7)}}),...lo.map(([t,e],o)=>({id:`walrus-${o+3}`,archetype:"walrus",position:s(t,V(t,e),e)})),...ro.map((t,e)=>{const[o,a,,i]=j[t];return{id:`seal-${e+1}`,archetype:"seal",position:s(o,i,a),floe:t}}),...fo.map(([t,e],o)=>({id:`puffin-${o+1}`,archetype:"puffin",position:s(t,V(t,e),e)})),...ho.map(([t,e,o],a)=>({id:`penguin-${a+1}`,archetype:"penguin",position:s(t,V(t,e),e),heading:o}))];async function uo(t){const e=new Ce,o=await Promise.allSettled(co.map(async n=>{const r=Ae.archetypes[n].model,v=await fetch(`./${r.slice(1)}`,{signal:t});if(!v.ok)throw new Error(`Could not load Blockhorn cast: ${r}`);return[n,await e.parseAsync(await v.arrayBuffer(),"")]})),a=o.flatMap(n=>n.status==="fulfilled"?[n.value]:[]),i=o.find(n=>n.status==="rejected");if(i||t.aborted){for(const[,n]of a)xe(n.scene);throw t.throwIfAborted(),i?.reason}return Object.fromEntries(a)}function xe(t){const e=new Set;t.traverse(o=>{if(o instanceof ue||o instanceof B){e.add(o.geometry);for(const a of[o.material].flat()){e.add(a);for(const i of Object.values(a))i instanceof Re&&e.add(i)}}o instanceof me&&e.add(o.skeleton)});for(const o of e)o.dispose()}function mo(t){const e=new T;function o(a,i,n,r,v,h=0){e.add(new w(1,9,6).scale(i,n,r).rotateX(h),a,v)}o(s(0,.66,-.39),.86,.66,1.54,"#80584b",.14),o(s(0,.8,.47),.79,.77,.86,"#956557"),o(s(0,1.15,1.03),.61,.59,.57,"#b2806d"),o(s(0,1.04,1.45),.42,.27,.28,"#a57969");for(const a of[-1,1])o(s(a*.19,1.08,1.64),.2,.16,.11,"#c58e72"),o(s(a*.38,1.39,1.38),.045,.045,.035,"#251d29"),o(s(a*.78,.19,.23),.26,.14,.62,"#684d48",.12),o(s(a*.34,.14,-1.69),.29,.14,.52,"#715149"),e.rod(s(a*.22,1.04,1.55),s(a*.22,.65,1.63),.093,"#f5dfbc"),e.add(new Ee(.094,.38,7).rotateZ(Math.PI).rotateX(-.22),s(a*.22,.47,1.65),"#f5dfbc");return o(s(0,1.14,1.72),.13,.083,.066,"#65483f"),e.mesh(t)}function go(t){const e=new T;e.add(new w(1,9,6).scale(.92,.72,1.91).rotateX(-.16),s(0,.7,-.3),"#4c6373"),e.add(new w(1,8,5).scale(.54,.58,.67),s(0,1.17,1.13),"#819ca4"),e.add(new w(1,7,5).scale(.45,.29,.42),s(0,1.02,1.54),"#afc3c5");for(const o of[-1,1])e.add(new w(1,7,4).scale(.25,.15,.71).rotateY(o*.46),s(o*.43,.18,-1.92),"#394e60"),e.add(new w(1,7,4).scale(.57,.13,.28),s(o*.64,.27,.31),"#394e60");return e.mesh(t)}function vo(t){const e=new T;e.box(s(0,.49,-.38),1.52,.94,2.72,"#465b67"),e.box(s(0,.84,.17),1.33,.6,1.49,"#536d78"),e.box(s(0,1.12,1),.91,.91,1.03,"#6b858d"),e.box(s(0,.94,1.56),.7,.41,.42,"#abc1c1"),e.box(s(0,1.09,1.79),.27,.16,.07,"#263946");for(const o of[-1,1])e.box(s(o*.35,.18,-1.94),.46,.35,.85,"#364a58"),e.box(s(o*.8,.25,.3),.6,.28,.89,"#3c5260"),e.box(s(o*.32,1.32,1.52),.12,.12,.03,"#263946");return e.mesh(t)}function yo(t){const e=new T,o="#243443";e.box(s(0,.85,0),.74,1.3,.67,o),e.box(s(0,.86,.32),.57,1.12,.2,"#fff2dc"),e.box(s(0,1.61,.07),.62,.5,.61,o),e.box(s(0,1.44,.38),.39,.25,.12,"#ffdd9d"),e.box(s(0,1.52,.52),.22,.14,.25,"#dba053");for(const a of[-1,1])e.box(s(a*.42,.79,-.1),.19,.75,.45,"#182b3b"),e.box(s(a*.2,.12,.17),.29,.23,.47,"#766058"),e.box(s(a*.17,1.72,.38),.06,.06,.015,"#f2e9e1");return e.mesh(t)}function wo(t){const e=new T;e.add(new w(1,8,6).scale(.57,.83,.48),s(0,.88,-.1),"#243743"),e.add(new w(1,8,6).scale(.49,.66,.34),s(0,.9,.23),"#fff8e9"),e.add(new w(1,8,5).scale(.44,.46,.41),s(0,1.66,.12),"#23333d"),e.add(new w(1,7,5).scale(.43,.31,.29),s(0,1.63,.37),"#fff8e9"),e.add(new w(1,6,4).scale(.25,.27,.42),s(0,1.53,.67),"#ff8536");for(const o of[-1,1])e.box(s(o*.23,.08,.27),.28,.16,.44,"#ea7834");return e.mesh(t)}function xo(t){const e=new T,o="#f08d35",a="#b6512f",i="#263746",n="#e6d8bb";e.box(s(0,.82,.02),.6,.62,.44,o),e.box(s(0,.51,-.07),.57,.18,.39,a),e.box(s(0,1.18,-.025),.56,.18,.52,a),e.box(s(0,.84,.25),.42,.08,.035,"#f5b657"),e.add(new w(1,9,6).scale(.31,.33,.28),s(0,1.44,.025),o),e.add(new w(1,8,6).scale(.25,.25,.18),s(0,1.41,.17),n),e.add(new w(1,8,6).scale(.16,.18,.11),s(0,1.41,.26),"#c89573"),e.box(s(0,1.45,.355),.27,.073,.044,"#384c52"),e.box(s(0,1.23,.26),.29,.11,.16,"#a44b39");for(const y of[-.18,.18])e.rod(s(y,.5,.04),s(y,.44,.34),.12,"#455866"),e.rod(s(y,.45,.34),s(y,.1,.36),.105,"#3a4a57"),e.box(s(y,.07,.46),.2,.14,.31,i);e.rod(s(-.26,1.04,.05),s(-.34,.72,.16),.099,a),e.rod(s(-.34,.72,.16),s(-.2,.62,.38),.076,o),e.box(s(-.2,.62,.38),.14,.14,.13,i);const r=s(.26,1.07,.065),v=new T;v.rod(r,s(.4,.91,.2),.106,a),v.rod(s(.4,.91,.2),s(.21,1.06,.34),.077,o),v.box(s(.21,1.06,.34),.15,.15,.14,i);const h=v.mesh(t);return h.name="fisher-arm",h.position.copy(F(r)),h.geometry.translate(-h.position.x,-h.position.y,-h.position.z),new G().add(e.mesh(t),h)}function bo(t,e){const o=mo(e),a=go(e),i=vo(e),n=yo(e),r=wo(e);return[...po.map((v,h)=>{const{archetype:y,position:m,heading:M,floe:g}=v;if(y==="walrus"){const c=o.clone();return c.scale.setScalar(g===void 0?2.84+h%4*.32:1.95),{node:c,position:m,heading:M??Math.sin(h*1.2)*.54,pose:"idle",floe:g}}if(M!==void 0){const c=n.clone();return c.scale.setScalar(1.47+h%3*.13),{node:c,position:m,heading:M,pose:"idle",daylightOnly:!0}}const p=y==="seal"?"seal":"puffin",S=t[p],x=Fe(S.scene),P=p==="seal";x.scale.multiplyScalar(P?2.72:4.1);const k=P?new G().add(a.clone(),i.clone()):r.clone();return k.scale.setScalar(P?2.2:2.38),P&&(k.rotation.y=Math.PI),{node:x,distant:k,position:m,heading:P?Math.PI:Math.sin(h*1.3)*.82,clips:S.animations,pose:"idle",floe:g}}),{node:xo(e),position:{...Q,y:2.04},heading:Math.PI,pose:"sit"}]}function Mo(t,e){t.position.copy(F(e.position)),t.rotation.y=Math.PI-e.heading}class le{constructor(e,o){this.node=e,this.actor=o,o.clips&&(this.mixer=new Le(e))}node;actor;mixer;action;pose;update(e,o){if(!(!this.mixer||!this.actor.clips)){if(e!==this.pose){this.action?.stop(),this.pose=e;const a=this.actor.clips.find(i=>i.name===e);a&&(this.action=this.mixer.clipAction(a).play())}this.mixer.setTime(o)}}stop(){this.mixer?.stopAllAction(),this.mixer?.uncacheRoot(this.node)}}const N="blockhorn-scenery",ee="blockhorn-ice-material",oe="blockhorn-cave-material",de=new te(ge),fe=new te("#e83f32"),he=new te("#ffc32c");function So(){const t=new U({vertexColors:!0,roughness:.66,emissive:"#90f0ff",emissiveIntensity:1.12});return t.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace("#include <emissivemap_fragment>",`
      #include <emissivemap_fragment>
      totalEmissiveRadiance *= vColor.rgb;
    `)},t}function Po(){const t=new G;for(const[e,o,a,i,n]of[[54,21,-81,2600,37],[-78,12,-109,1300,24],[64,25,5,1900,31]]){const r=new Ne("#52deff",i,n);r.position.copy(F(s(e,o,a))),t.add(r)}return t}function Z(t,e){const o=t*1.83,a=e*.043+o,i=e*.031+o;return s(Math.sin(a)*2.8,Math.sin(a*2.4)*.18,Math.cos(i)*2.2)}class H extends G{source;copies=new Map;actors=[];fleeing=new Map;frame={seconds:0,fishingSeconds:0};preview;clock=new Be;airSeconds=0;night=!1;daylight={value:0};lamps;cave;redPaint;yellowPaint;static async load(e,o){const a=await o;e.throwIfAborted();const i=await uo(e),n=new H,r=De(new URLSearchParams(location.search));r?.kind==="island"&&r.name==="voxel-iceberg"&&r.shot&&(n.preview={seconds:r.shot.seconds,hour:r.shot.view?.hour});const v=io(n.daylight),h=new U({vertexColors:!0,roughness:.7}),y=n.cave=So(),m=new U({vertexColors:!0,roughness:.85}),M=n.redPaint=new U({color:ge,roughness:.85}),g=n.yellowPaint=M.clone(),p=n.lamps=new se({vertexColors:!0});n.actors=bo(i,m);const S=so(n.frame),x=ao(),P=new G;for(const{geometry:l,heading:f}of a.floes){const z=new B($(l),m);z.rotation.y=f,P.add(z)}const k=new G;for(const l of n.actors)if(l.clips){const f=new Y;f.addLevel(l.node,0),l.distant&&f.addLevel(l.distant,l.floe!==void 0?145:120),k.add(f)}else k.add(l.node);const c=new Ge(.047,.047,1,6).translate(0,-.5,0),u=new B(c,new se({color:"#313a4a"}));u.position.copy(F(ce));const d=new G,R=[m,p,M,g];a.station.forEach((l,f)=>d.add(new B($(l),R[f])));const b=new Te($(a.brash),m,a.brashMatrices.length/16);b.instanceMatrix=new _e(a.brashMatrices,16),n.add(d,new B($(a.fishing),m),P,k,u,S,x,new B($(a.herring),m),new B($(a.arch),h),Po(),b);const I=n.actors.map(({node:l},f)=>new le(l,n.actors[f]));return n.apply(n,I),n.addEventListener("removed",()=>I.forEach(l=>l.stop())),{scenery:n,ice:v,cave:y,release(){I.forEach(l=>l.stop());for(const l of n.copies.values())l.forEach(f=>f.stop());n.copies.clear(),xe(n),v.dispose(),y.dispose();for(const l of Object.values(i))l.scene.traverse(f=>{f instanceof me&&f.skeleton.dispose()})}}}copy(e,o=!0){return super.copy(e,o),o&&(this.source=e,e.copies.set(this,[])),this}updateMatrixWorld(e){if(this.source){const o=this.source.copies.get(this);o&&!o.length&&this.source.actors.forEach((a,i)=>{const n=this.children[3].children[i];o.push(new le(n instanceof Y?n.levels[0].object:n,a))}),this.source.apply(this,o??[])}super.updateMatrixWorld(e)}advance(e){this.frame=e;for(const[o,a]of this.copies){let i=!1;for(let n=o.parent;n;n=n.parent)if(n instanceof $e){i=!0;break}i||(a.forEach(n=>n.stop()),this.copies.delete(o))}}renderFrame({hour:e,seconds:o}){this.clock.setHour(this.preview?.hour??e);const a=this.clock.clockAt();this.night=a.night;const i=Oe.smoothstep(a.sunlight,.03,.39);this.daylight.value=i,this.redPaint&&this.yellowPaint&&(this.redPaint.color.copy(de).lerp(fe,i),this.yellowPaint.color.copy(de).lerp(he,i),this.redPaint.emissive.copy(fe).multiplyScalar(.095*i),this.yellowPaint.emissive.copy(he).multiplyScalar(.14*i)),this.airSeconds=this.preview?.seconds??o,this.lamps?.color.setScalar(this.night?1.55:1),this.cave&&(this.cave.emissiveIntensity=this.night?1.35:1.12)}apply(e,o){const[,,a,i,n,r,v,h,,,y]=e.children,{position:m,stolen:M,fisher:g}=this.frame,p=this.preview?.seconds??this.frame.seconds,S=this.preview?.seconds??this.frame.fishingSeconds;y.visible=!this.night,y.position.set(Math.sin(p*.052)*.64,Math.sin(p*.78)*.11,(Math.cos(p*.063)-1)*.42),no(r,v,this.airSeconds,this.night),a.children.forEach((c,u)=>{const[d,R]=j[u],b=Z(u,p);c.position.copy(F(s(d+b.x,b.y,R+b.z)))});const x=oo(S);this.actors.forEach((c,u)=>{const d=i.children[u];c.daylightOnly&&(d.visible=!this.night);const R=p+u*.43;let b=c.pose;if(Mo(d,c),c.floe!==void 0&&!c.clips)d.position.add(F(Z(c.floe,p)));else if(c.floe!==void 0){const I=j[c.floe],l=Z(c.floe,p),f=m&&Math.hypot(m.x-c.position.x,m.y-c.position.y,m.z-c.position.z)<11,z=this.fleeing.get(u);f&&z===void 0&&this.fleeing.set(u,p),!f&&z!==void 0&&p-z>16&&this.fleeing.delete(u);const E=z===void 0?0:Math.min(1,(p-z)/3.2),K=z===void 0?0:Math.max(0,Math.min(12,p-z-3.2)),be=I[2]*.83,Me=Math.max(0,(E-.64)/.36);if(d.position.add(F(s(l.x,l.y-(I[3]+.26)*Me**2,l.z-E*be-K))),d.rotation.x=.24*Math.sin(Math.PI*E),b=E>=1?"swim":E>0?"flee":c.pose,d instanceof Y){const W=d.levels[1],X=!this.night&&E===0;W.distance=X?.01:145,W.object.children[0].visible=!X,W.object.children[1].visible=X}}else if(b==="sit"){const I=g&&(g.reaction||g.clip==="walk"),l=d.getObjectByName("fisher-arm");if(l.rotation.set(0,0,0),I){d.position.copy(F(g.position)),d.rotation.y=Math.PI-g.heading;const f=Math.min(1,Math.hypot(g.velocity.x,g.velocity.z));d.rotation.x=.14*f,d.position.y+=.12*f*Math.abs(Math.sin(p*9)),l.rotation.x=g.clip==="shoo"?-1.12-.46*Math.sin(p*12):.6*f*Math.sin(p*9)}else d.rotation.x=-Math.max(0,x.y-2)*.045}else c.clips||(d.scale.y=d.scale.x*(1+.022*Math.sin(R*1.6)));o[u]?.update(b,R)});const P=!M&&x.y>2&&x.x<175.9?x:s(Ke.x,.05,ce.z),k=F(P).sub(n.position);n.scale.y=k.length(),n.quaternion.setFromUnitVectors(new qe(0,-1,0),k.normalize()),h.visible=!M&&x.y>.12,h.position.copy(F(x)),h.rotation.set(-1.13,S*2.1,.06*Math.sin(S*8))}}const q=(t,e)=>s(t,V(t,e),e),ko={landmarks:[...je,{id:"ice-cave",position:He}],actors:{individuals:[...Je("station",101,[q(C.x-10,C.z-4),q(C.x-5,C.z-4),q(C.x-2,C.z-7),q(C.x-10,C.z-7)],[["ranger","notice"],["maintenance-worker","shoo"]]),{id:"CHARACTER0103",archetype:"penguin",place:"station",position:q(C.x-16,C.z-3),behavior:{noticeRange:6,reactions:{close:"flee",squawk:"flee"}}}]},finds:we,rules:to,assetKeys:[N,ee,oe],metadata:{climate:"snow",latitude:"polar"}},Lo={manifest:D,async loadContent({signal:t}){return t.throwIfAborted(),ko},async buildChunk({key:t,signal:e}){if(e.throwIfAborted(),t===Ve)return{models:[{assetKey:N,position:s(0,0,0)}],surfaces:{boxes:Qe,waterAt:Ze}};const o=await ne("ice",{key:t},e),{mesh:a,glow:i}=o,n=[];return a&&n.push({...a,materialKey:ee}),i&&n.push({...i,materialKey:oe}),{meshes:n,surfaces:Ye(t,o)}},async loadAssets(t,{signal:e}){if(!t.includes(N))return{handles:new Map,release(){}};const{scenery:o,ice:a,cave:i,release:n}=await H.load(e,ne("polarProps",{},e));return{handles:new Map([[N,o],[ee,a],[oe,i]]),release:n}},activate({assets:t,facts:e,ticks:o,frames:a,state:i,seed:n,queries:r,emitFact:v}){const h=t.handles.get(N);if(!(h instanceof H))return()=>{};const y=a.subscribe(c=>h.renderFrame(c));let m=typeof i.fishingSeconds=="number"?i.fishingSeconds:0,M=i.herringStolen===!0;const g=new Ue(D.id,{individuals:[{id:"ice-fisher",archetype:"fisher",position:Q,day:{position:Q,heading:Math.PI,activities:["sit"]},behavior:{reactions:{close:"ignore",theft:"chase",squawk:"shoo"}}}]},n),p=g.actors[0];let S;const x=e.subscribe(({type:c,data:u})=>{const d=u;c==="squawked"&&d?.position&&g.stimulate({kind:"squawk",position:ae(d.position,D.origin)}),!(c!=="grabbed"||d?.thing!==`${D.id}:frozen-herring`)&&(i.herringStolen=M=!0,d.actor===p.id&&g.stimulate({kind:"theft",actor:p.id,thing:d.thing}))}),P=c=>{const u=c.tick*We,d=ae(c.position,D.origin);if(S??=u-ie,u-S>=ie-1e-7){S=u;const{x:R,y:b,z:I}=D.origin;for(const l of g.update(c.tick,u,{gull:d,gullMode:"flying",night:!1,rain:!1,groundAt:r&&((f,z,E)=>{const K=r.groundAt(f+R,z+I,E+b);return K&&{...K,height:K.height-b}})})){const f=l.data;v?.({...l,data:f.position?{...f,position:Xe(f.position,D.origin)}:f})}}m+=c.dt,i.fishingSeconds=m,h.advance({seconds:u,position:d,fisher:p,fishingSeconds:m,stolen:M})},k=o.subscribe(P);return()=>{x(),k(),y()}}};export{Lo as island};
