import"./three-renderer-BP556_pn.js";import{b1 as L,b2 as w,b3 as O,b4 as X,b5 as f,b6 as p,b7 as Y,b8 as R,b9 as Z,ba as J,bb as Q,a7 as ee,bc as te,bd as W,be as _,bf as oe,bg as q,bh as ae,bi as se,bj as re,bk as ie,bl as ne,bm as le,bn as ce}from"./runtime-Fvu5jN8S.js";import{q as fe}from"./index-CNUyvlgf.js";import{cq as S,cx as de,dn as me,V as he,d4 as pe,cA as ue,cG as ge,cN as H,C as V,an as ve}from"./three.core-BYa7ON5M.js";import"./saves-ClQI9LoD.js";import"./table-D89Xz1NR.js";import"./credits-page-dWtXkrRi.js";import"./music-CxylN_mZ.js";function xe(){const o={value:0},r={value:0},t={value:0},e={value:1},a={value:1},s=new S({vertexColors:!0,roughness:.64,metalness:0});return s.onBeforeCompile=c=>{Object.assign(c.uniforms,{salTime:o,salNight:r,salWarmth:t,salEffects:e,salReflect:a});const i="varying vec2 saltUv; varying vec3 saltLocal; varying vec3 saltWorld;";c.vertexShader=i+`
`+c.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      saltUv=uv; saltLocal=position; saltWorld=(modelMatrix*vec4(position,1.0)).xyz;
    `),c.fragmentShader=i+`
      uniform float salTime, salNight, salWarmth, salEffects, salReflect;
      float saltHash(vec2 p) {
        vec3 q=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));
        q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z);
      }
      float saltNoise(vec2 p) {
        vec2 f=fract(p); f=f*f*(3.-2.*f); vec2 i=floor(p);
        return mix(mix(saltHash(i),saltHash(i+vec2(1,0)),f.x),
                   mix(saltHash(i+vec2(0,1)),saltHash(i+1.),f.x),f.y);
      }
      float crystalEdge(vec2 pos) {
        vec2 cell=floor(pos), f=fract(pos); float a=8., b=8.;
        for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
          vec2 d=vec2(float(x),float(y));
          vec2 v=d+.18+.64*vec2(saltHash(cell+d),saltHash(cell+d+43.7))-f;
          float dist=dot(v,v); b=min(b,max(a,dist)); a=min(a,dist);
        }
        return 1.-smoothstep(.015,.095,b-a);
      }
      // Intersect the reflected sightline with the stockpiles' conical profiles.
      float pileReflection(vec3 eye,vec3 ray,vec2 centre,float radius,float height){
        vec2 delta=centre-eye.xz; float t=dot(delta,ray.xz)/max(.001,dot(ray.xz,ray.xz));
        float r=length(delta-ray.xz*t);
        float crest=3.2+height*max(0.,1.-r/radius);
        return step(0.,t)*step(r,radius)*smoothstep(-.35,.35,crest-(eye.y+ray.y*t));
      }
      float pumpReflection(vec3 eye,vec3 ray,vec2 centre,float height,float phase){
        if(abs(ray.z)<.012)return 0.;
        float t=(centre.y-eye.z)/ray.z;
        if(t<0.)return 0.;
        vec2 hit=eye.xy+t*ray.xy-vec2(centre.x,3.2);
        float halfTower=height*mix(.16,.052,clamp(hit.y/height,0.,1.));
        float pole=(1.-smoothstep(.20,.43,abs(abs(hit.x)-halfTower)))*step(0.,hit.y)*step(hit.y,height);
        vec2 blade=hit-vec2(0.,height);
        float a=atan(blade.y,blade.x)-phase;
        float r=length(blade)/height;
        float sail=step(.14,r)*step(r,.54)*step(.93,cos(4.*a));
        return max(pole,sail);
      }
    `+c.fragmentShader,c.fragmentShader=c.fragmentShader.replace("#include <color_fragment>",`
      #include <color_fragment>
      vec2 ground=saltLocal.xz;
      float s=saltUv.x;
      float range=length(cameraPosition-saltWorld);
      float nearSalt=1.-smoothstep(42.,155.,range);
      float grain=.5;
      if(salEffects>1.5) grain=saltNoise(ground*1.3);
      if(salEffects<1.5) {
        // The graded vertex colours carry the distant pond. The cheap tier only adds depth and its salt rim.
        if(s>=0.) {
          float rim=1.-smoothstep(.02,.95,saltUv.y);
          vec3 depthTint=mix(vec3(.81,.96,.92),vec3(1.,.70,.83),smoothstep(.38,.65,s));
          diffuseColor.rgb*=mix(vec3(1.),depthTint,saltUv.y*(1.-smoothstep(.85,1.,s)));
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.96,.81,.76),rim*(.12+s*.42));
        }
      } else if(s<0.) {
        float dust=saltNoise(ground*.24)+.45*saltNoise(ground*2.8);
        diffuseColor.rgb*=.73+.29*dust+.14*grain;
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.82,.75,.61),smoothstep(.88,1.17,dust)*.42);
      } else {
        float rim=1.-smoothstep(.02,.95,saltUv.y);
        float crust=smoothstep(.84,.985,s);
        float mats=saltNoise(ground*.087)+.42*saltNoise(ground*.32);
        float deep=smoothstep(.18,1.17,mats)*saltUv.y;
        vec3 depthTint=mix(vec3(.66,.92,.85),vec3(1.,.39,.72),smoothstep(.38,.65,s));
        diffuseColor.rgb*=mix(vec3(1.),depthTint,deep*(1.-crust)*.72);
        float bloom=smoothstep(.90,1.19,mats+rim*.42);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.96,.81,.76),rim*(.12+s*.42)+bloom*(.075+crust*.12));
        if(salEffects>1.5 && crust>.002 && nearSalt>.001){
          float seam=crystalEdge(ground*.78);
          diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.58,.62),seam*crust*nearSalt*.42);
          diffuseColor.rgb+=crust*nearSalt*(grain-.4)*.09;
        }
      }
    `).replace("#include <opaque_fragment>",`
      if(s>=0. && salEffects>.5 && salEffects<1.5) {
        float phase=dot(ground,vec2(.80,.23))+salTime;
        float band=sin(phase);
        float visible=1.-smoothstep(.30,2.,fwidth(phase));
        float shimmer=smoothstep(.63,.99,band)*visible;
        float grainGlint=smoothstep(.88,.99,s)*smoothstep(.97,1.,band)
          *smoothstep(.92,1.,sin(dot(ground,vec2(.62,.63))-salTime))*nearSalt;
        outgoingLight+=vec3(1.,.86,.72)*(.046*shimmer+.42*grainGlint)*(1.-salNight);
      } else if(s>=0. && salEffects>1.5){
        vec2 pos=ground;
        float phase=pos.x*1.87+pos.y*.54+salTime*1.45+2.*sin(pos.y*.34+salTime*.24);
        float broad=cos(dot(pos,vec2(.42,-.58))+salTime*.8);
        float ripple=cos(phase)*(1.-smoothstep(.18,2.2,fwidth(phase)));
        vec3 N=normalize(vec3(.025*ripple+.009*broad,1.,.012*broad));
        vec3 V=normalize(cameraPosition-saltWorld);
        vec3 R=reflect(-V,N);
        float fresnel=.042+.32*pow(1.-max(0.,dot(N,V)),3.);
        float liquid=1.-smoothstep(.88,1.,s)*.90;
        vec3 sky=mix(vec3(.68,.79,.86),vec3(.29,.56,.79),smoothstep(0.,.7,R.y));
        vec3 sun=normalize(vec3(-.5,.72,.42));
        #if NUM_DIR_LIGHTS > 0
          sun=inverseTransformDirection(directionalLights[0].direction,viewMatrix);
        #endif
        float dusk=1.-smoothstep(.08,.52,sun.y);
        sky=mix(sky,vec3(1.,.48,.29),max(dusk*.48,salWarmth*.72));
        sky=mix(sky,vec3(.027,.048,.083),salNight);
        if(salReflect>.5){
          float mound=0.;
          ${L.cones.map(([l,u,m,d])=>`mound=max(mound,pileReflection(saltLocal,R,vec2(${l.toFixed(1)},${(-u).toFixed(1)}),${m.toFixed(1)},${d.toFixed(1)}));`).join(`
`)}
          sky=mix(sky,mix(vec3(.88,.78,.73),vec3(.105,.13,.17),salNight),mound);
          float mill=0.;
          ${L.mills.map(([l,u,m])=>`mill=max(mill,pumpReflection(saltLocal,R,vec2(${l.toFixed(1)},${(-u-1.87).toFixed(2)}),${m.toFixed(1)},${(.51+l*.031).toFixed(3)}+salTime*.32));`).join(`
`)}
          sky=mix(sky,vec3(.16,.115,.095)*(1.-salNight*.88),mill*.83);
        }
        vec2 field=R.xz/max(.14,.8+R.y)*188.;
        float star=step(.963,saltHash(floor(field)))*(1.-smoothstep(.045,.32,length(fract(field)-.5)));
        sky+=star*salNight*3.6;
        outgoingLight*=mix(vec3(1.),vec3(1.19,.87,.81),salWarmth*.68);
        outgoingLight=mix(outgoingLight,diffuseColor.rgb*(.85+.25*salWarmth),.23*liquid*(1.-salNight));
        outgoingLight=mix(outgoingLight,sky,liquid*fresnel);
        if(salEffects>1.5 && salWarmth>.03 && saltLocal.z < -15.){
          float shade=0.;
          ${L.cones.map(([l,u,m,d])=>`shade=max(shade,pileReflection(saltLocal,sun,vec2(${l.toFixed(1)},${(-u).toFixed(1)}),${m.toFixed(1)},${d.toFixed(1)}));`).join(`
`)}
          outgoingLight*=mix(vec3(1.),vec3(.64,.72,.86),shade*salWarmth*.68);
        }
        float streak=smoothstep(.60,.98,ripple)*smoothstep(.20,.82,grain);
        outgoingLight+=liquid*(.026+.12*salWarmth)*streak*(1.-salNight);
        float sparkle=pow(max(0.,dot(R,sun)),85.)*liquid;
        float fleck=step(.96,saltHash(floor(pos*7.)))*smoothstep(.75,.99,sin(phase+V.x*20.));
        sparkle+=smoothstep(.81,.96,s)*fleck*nearSalt;
        outgoingLight+=vec3(1.,.87,.69)*sparkle*.84*(1.-salNight);
      }
      #include <opaque_fragment>
    `)},{material:s,time:o,night:r,warmth:t,effects:e,reflections:a}}const D=["raker","bare-raker","seller","keeper","flamingo","egret","roof-cat"],F=o=>"salinas-cast/"+o;function ye(o){const r=new de,t=new S({vertexColors:!0,roughness:.86}),e=new w,a=[],s=(i,l,u,m,d)=>{const v=l.mesh(t);v.name=i,v.position.set(u,m,d),r.add(v)},c=(i,l,u)=>a.push(new ue(i,l,u.map(([m,d])=>new ge(m,d.map((v,n)=>l*n/(d.length-1)),d))));if(o==="flamingo"||o==="egret"){const i=o==="flamingo",l=i?15967150:15921124,u=i?15105684:14802640,m=i?11297897:5987403,d=i?1:.79;e.oval(0,1.03,0,.24,.25,.49,l,.06);const v=[[0,1.11,.28],[0,1.28,.46],[0,1.48,.48],[0,1.65,.37],[0,1.8,.35],[0,1.92,.5]],n=new w,g=new me(v.map(([h,x,y])=>new he(h,x-1.11,y-.28)));n.add(new pe(g,20,.071,8,!1),0,0,0,l),n.oval(0,.8,.26,.111,.124,.146,l),n.rod([0,.79,.36],[0,.75,.51],.073,i?16764861:14067537,.058),n.rod([0,.75,.51],[0,i?.6:.73,i?.55:.71],.058,i?3617597:12293205,.012);for(const h of[-1,1]){n.oval(h*.092,.836,.31,.021,.023,.022,2697004);const x=new w;x.rod([0,0,0],[0,-.38,-.07],.03,m,.025),x.rod([0,-.38,-.07],[0,-.91,.02],.025,m,.017),x.rod([0,-.91,.02],[0,-.92,.2],.022,m,.014),s(h<0?"LeftLeg":"RightLeg",x,h*.087,.94,h*.08);const y=new w;y.oval(h*.11,-.025,-.13,.135,.17,.46,u,.12),y.oval(h*.13,-.08,-.39,.085,.095,.27,i?5587530:12369588,-.2),s(h<0?"LeftWing":"RightWing",y,h*.13,1.1,.08)}s("Neck",n,0,1.11,.28),c("idle",4.8,[["Neck.rotation[x]",[-.08,.12,.02,-.08]],["Neck.rotation[y]",[-.13,.1,.2,-.13]]]),c("fly",.56,[["LeftWing.rotation[z]",[-1,-1.92,-.45,-1]],["RightWing.rotation[z]",[1,1.92,.45,1]],["LeftWing.scale[x]",[3.2,3.4,3.3,3.2]],["RightWing.scale[x]",[3.2,3.4,3.3,3.2]],["LeftLeg.rotation[x]",[1.05,1.18,1.05]],["RightLeg.rotation[x]",[1.12,1.25,1.12]]]),r.scale.setScalar(d)}else if(o==="roof-cat"){e.oval(0,.3,0,.16,.18,.38,12024907),e.oval(0,.49,.29,.16,.16,.14,13210460);for(const i of[-1,1]){e.rod([i*.1,.54,.28],[i*.12,.75,.26],.08,12024907,.006),e.oval(i*.08,.51,.414,.022,.025,.013,4346425);for(const l of[-.2,.2])e.rod([i*.1,.27,l],[i*.11,.04,l+.04],.047,11170375,.039)}e.rod([0,.32,-.26],[.12,.52,-.55],.058,13210460,.048),e.rod([.12,.52,-.55],[.17,.8,-.53],.048,8412225,.032)}else{const i=o.includes("raker"),l=12025953,u=i?14866873:o==="seller"?5540247:6450552;e.oval(0,1.12,0,.259,.37,.157,u),e.drum(0,.85,0,.213,.19,.16,4742504),e.oval(0,1.66,.015,.157,.197,.145,l),e.oval(0,1.66,.146,.042,.042,.055,l),o==="raker"?O(e,1.81):e.oval(0,1.79,-.014,.157,.092,.142,5654071);for(const d of[-1,1]){const v=new w;v.rod([0,0,0],[0,-.64,.015],.09,5663344,.071),v.oval(0,-.69,.054,.081,.07,.133,5851708),s(d<0?"LeftLeg":"RightLeg",v,d*.112,.76,0);const n=new w;if(n.rod([0,0,0],[d*.05,-.23,.03],.092,u,.074),n.rod([d*.05,-.23,.03],[d*.02,-.43,.16],.067,l,.058),d===1&&i){n.rod([0,-.93,.75],[0,.3,-.22],.027,8937274),n.box(0,-.93,.75,.69,.07,.08,9921596);for(let g=-3;g<=3;g++)n.rod([g*.094,-.94,.76],[g*.094,-1.05,.82],.017,8607285)}s(d<0?"LeftArm":"RightArm",n,d*.23,1.33,0)}const m=(d,v,n)=>c(d,v,[["LeftLeg.rotation[x]",[-n,n,-n]],["RightLeg.rotation[x]",[n,-n,n]],["LeftArm.rotation[x]",[n*.62,-n*.62,n*.62]],["RightArm.rotation[x]",[-n*.48,n*.48,-n*.48]]]);m("walk",1.05,.47),m("chase",.64,.72),c("shoo",.69,[["RightArm.rotation[x]",[-.7,-2.3,-.7]]])}return s("Body",e,0,0,0),{scene:r,animations:a}}const C="salinas-pans",M="salinas-village",k=(o,r)=>f(o,Y(o,r),r),T=[];function I(o){return{model:F(o),kind:o==="roof-cat"?"land":["egret","flamingo"].includes(o)?"bird":"person",height:o==="roof-cat"?.75:1.9,scale:1,tint:"#ffffff",clips:{}}}function A(o,r,t,e){T.push({id:o,archetype:r,model:I(r),position:t,route:e,place:t.x<146?C:M,behavior:{movementSpeed:1.28,noticeRange:5,reactions:{theft:r==="keeper"?"shoo":"chase",squawk:"shoo",close:"notice"}}})}A("raker-1","bare-raker",f(-82,p,-3),[f(-50,p,-3),f(-96,p,-3)]);for(const[o,[r,t]]of[[-206,49],[-53,-54],[53,-3],[108,49],[-129,104],[32,104]].entries())A("raker-"+(o+2),"raker",f(r,p,t),[f(r+14,p,t),f(r-11,p,t)]);A("fish-curer","raker",f(180,p,-102));A("cafe-owner","seller",k(195.5,20),[k(195.5,20),k(201.6,19),k(202,13)]);A("bell-keeper","keeper",k(211.4,32.1));for(const[o,[r,t]]of L.flocks.entries())for(let e=0;e<7;e++){const a=r+Math.sin(e*2.43)*Math.sqrt(e)*2.55,s=t+Math.cos(e*2.43)*Math.sqrt(e)*1.68,c=f(a,R-.16,s);T.push({id:`flamingo-${o+1}-${e+1}`,archetype:"flamingo",model:I("flamingo"),place:C,position:c,day:{position:c,heading:e*2.37},night:{position:c,heading:e*2.37},flock:"pan-flock-"+o,motion:"air",behavior:{movementSpeed:8.2,noticeRange:7,noiseRange:20,reactions:{theft:"flee",plunge:"flee",close:"flee",squawk:"flee"}}})}for(const[o,[r,t]]of[[-142,-54],[-115,49],[-187,-3],[94,104],[57,-54]].entries())T.push({id:"egret-"+o,archetype:"egret",model:I("egret"),position:f(r,p,t),place:C,motion:"air",behavior:{noticeRange:5,movementSpeed:5,reactions:{close:"flee",squawk:"flee"}}});T.push({id:"store-cat",archetype:"roof-cat",model:I("roof-cat"),position:f(207,p+8.6,-99),place:M,day:{position:f(207,p+8.6,-99),heading:-.85},behavior:{noticeRange:4,reactions:{close:"notice",squawk:"notice"}}});const N=(o,r,t,e,a={})=>({id:o,place:r,position:t,kind:"item",nameKey:"salinas.items."+o,color:e,visual:o,...a}),K=[N("straw-hat",C,f(-82,p+1.8,-3),"#d9b76f",{owner:"raker-1",ownerOffset:f(0,1.69,0)}),N("salted-fish",M,f(182,p+1.3,-103),"#bbac92",{owner:"fish-curer",food:!0,tags:["food"]}),N("sardine-tin",M,f(197,k(197,19).y+.87,19),"#c89058",{owner:"cafe-owner"}),N("bell-tassel",M,f(212.3,k(215,42).y+1.58,33.32),"#dcb567",{owner:"bell-keeper"}),N("flamingo-feather",C,f(-29,R+.015,31),"#e997aa",{owner:"flamingo-1-1"}),N("pink-salt-jar",M,f(192,p+1.05,-103),"#efb0bc",{souvenir:"pink-salt-jar",weight:.27}),...[[-225,49],[-105,-3],[96,104]].map(([o,r],t)=>({id:["brass-cotter","blue-pottery","salt-crystal"][t],nameKey:"salinas.items."+["brass-cotter","blue-pottery","salt-crystal"][t],position:f(o,p+.08,r),kind:"glint",glint:!0,tags:["trinket"],place:C,color:["#c7a065","#6296aa","#edd2cf"][t]}))],be={actors:{individuals:T},finds:K,landmarks:[{id:"salt-cone",position:X},{id:"church",position:f(215,32,42)},{id:"loading-jetty",position:f(270,p,-108)}],interactions:[{id:"salt-store-nest",position:f(194.2,p+8.72,-94),kind:"target",nest:!0,customVisual:!0,acceptRadius:2.4}],rules:K.map(o=>({id:"find-"+o.id,place:o.place,steps:[{fact:o.souvenir?"souvenir_in_nest":"grabbed",thing:o.id}],reward:{coins:o.souvenir?5:o.owner?2:1,...o.owner?{book:"salinas.finds."+o.id}:{}}}))};function we(o,r,t){const e=new S({vertexColors:!0,roughness:.88});return e.onBeforeCompile=a=>{a.uniforms.portNight=o,a.uniforms.yardDetail=r,a.uniforms.loadingTime=t;const s="varying vec3 yardPoint; varying vec3 yardNormal; varying float saltTravel;";a.vertexShader=s+`
`+a.vertexShader.replace("#include <begin_vertex>",`
      #include <begin_vertex>
      yardPoint=vec3(position.x,position.y,-position.z);
      yardNormal=normal;
      saltTravel=uv.x==${Z.toFixed(1)} ? uv.y : -1.;
    `),a.fragmentShader=s+`
      uniform float portNight, yardDetail, loadingTime;
      float yardHash(vec2 v){return fract(sin(mod(dot(v,vec2(37.1,13.7)),6.283185))*4375.13);}
      float yardNoise(vec2 v){
        vec2 i=floor(v),f=fract(v);f=f*f*(3.-2.*f);
        return mix(mix(yardHash(i),yardHash(i+vec2(1,0)),f.x),mix(yardHash(i+vec2(0,1)),yardHash(i+1.),f.x),f.y);
      }
    `+a.fragmentShader.replace("#include <color_fragment>",`
      #include <color_fragment>
      vec3 q=yardPoint;
      vec2 st=abs(yardNormal.y)>.65?q.xz:vec2(abs(yardNormal.x)>.65?q.z:q.x,q.y);
      float coarse=.5,fine=.5;
      if(yardDetail>1.5){coarse=yardNoise(st*.71);fine=yardNoise(st*4.6);}
      diffuseColor.rgb*=.88+.13*coarse+.085*fine;
      if(saltTravel>=0.){
        float travel=saltTravel-3.6*loadingTime;
        float stripe=sin(4.5*travel+1.6*sin(1.8*travel+.61*q.z));
        float grains=sin(15.*travel+8.*q.x+12.*q.z);
        diffuseColor.rgb*=.81+.21*stripe+.07*grains;
      }
      if(q.z>103. && q.x<90. && q.y>3.28 && yardNormal.y>.20){
        float rakes=sin(dot(q.xz,vec2(.87,1.32))*3.4+1.8*coarse);
        diffuseColor.rgb*=.95+.05*rakes+.065*fine;
      }
      if(yardDetail>1.5 && q.z < -116. && q.x>248. && q.y<5.27 && abs(yardNormal.y)<.29){
        float rust=yardNoise(st*vec2(.96,.16))*.75+yardNoise(st*vec2(3.,.62))*.25;
        rust+=.24*smoothstep(2.4,5.1,q.y);
        diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.36,.126,.068),smoothstep(.67,.87,rust)*.9);
        float seam=min(abs(fract((st.x+1.)/6.)-.5)*6.,abs(fract((q.y+.25)/1.42)-.5)*1.42);
        diffuseColor.rgb*=.79+.21*smoothstep(.012,.064,seam);
      }
    `).replace("#include <opaque_fragment>",`
      if(portNight>.001 && yardNormal.y>.50 && q.y<5.8 && q.x>205. && q.x<335. && q.z < -100.){
        vec2 lamp=vec2(mod(q.x-215.+15.,30.)-15.,q.z+104.);
        outgoingLight+=vec3(.46,.249,.091)*exp(-dot(lamp,lamp)*.044)*portNight;
      }
      #include <opaque_fragment>
    `)},e}const b=8410941,j=5326141,z=4806229,$=16116440,B=["barrow","sluice","terrace","parasol","olive","vine","fish-rack","tipper"];function ke(o,r){const t=new w;switch(o){case"sluice":for(const e of[-.85,.85])t.box(e,.52,0,.23,1.24,.25,b);for(let e=0;e<4;e++)t.box(0,.16+e*.19,0,1.65,.16,.15,10518102);t.box(0,1.18,0,2,.17,.36,j),t.drum(0,1.3,0,.18,.19,.13,z);break;case"barrow":t.add(new H(.3,.3,.13,12).rotateZ(Math.PI/2),0,.3,.72,z);for(const e of[-1,1])t.rod([e*.12,.37,.75],[e*.42,.89,-1],.036,b),t.rod([e*.3,.07,-.17],[e*.32,.63,-.24],.038,z);t.box(0,.61,.08,.72,.23,.94,9731161),t.oval(0,.76,.08,.36,.21,.47,$);break;case"fish-rack":for(const e of[-1.7,1.7])for(const a of[-.55,.55])t.rod([e,0,a],[e,1.8,0],.073,b);t.box(0,1.72,0,3.9,.15,.15,b);for(const e of[-1.31,-.87,.64,1.18])t.rod([e,1.7,0],[e,1.37,0],.014,j),J(t,e,1.3,0);break;case"terrace":t.drum(0,.81,0,.69,.7,.1,$,16),t.drum(0,.42,0,.09,.11,.78,z),t.drum(0,.08,0,.38,.4,.11,z);for(const e of[-1,1]){t.box(e*1.02,.47,0,.53,.09,.52,4618892),t.box(e*1.27,.79,0,.085,.56,.54,5014161);for(const a of[-.2,.2])for(const s of[-.2,.2])t.rod([e*1.02+a,0,s],[e*1.02+a,.47,s],.033,b)}t.drum(.25,.94,-.17,.09,.07,.15,13602651);break;case"parasol":t.rod([0,0,0],[0,3.15,0],.052,b);for(let e=0;e<12;e++){const a=e*Math.PI/6;t.add(new H(.045,1.95,.6,1,1,!0,a,Math.PI/6),0,2.85,0,e%2?$:14056290)}break;case"vine":t.rod([0,0,0],[-.3,2,.03],.078,b,.045);for(let e=0;e<17;e++){const a=Math.sin(e*2.41)*1.25+Math.max(0,e-8)*.19,s=1.7+e*.17,c=Math.cos(e*2)*.18;t.oval(a,s,c,.52,.4,.35,6718810),t.oval(a+.13,s+.17,c+.19,.34,.28,.23,[13058672,14374276,11746664][e%3])}break;case"olive":t.rod([0,0,0],[.25,2.1,0],.28,9271646,.18);for(let e=0;e<7;e++){const a=e*2.4,s=Math.cos(a)*1.4,c=Math.sin(a)*1.4,i=3.2+e%3*.39;t.rod([.2,1.7,0],[s,i,c],.13,9271646,.06),t.oval(s,i,c,1.4,.87,1.25,[8689017,9477503,7703408][e%3])}break;case"tipper":for(const e of[-.76,.76])for(const a of[-.54,.54])t.add(new H(.31,.31,.13,12).rotateX(Math.PI/2),e,.32,a,z);t.box(0,.62,0,2.58,.23,1.31,j),t.add(new H(1.1,.59,.88,4).rotateY(Math.PI/4).scale(1.55,1,1.05),0,1.21,0,11367765),t.oval(0,1.56,0,1.08,.31,.69,$);break}return t.mesh(r)}const qe=["salinas-masonry","salinas-brine","salinas-lights","sails",...B,...D.map(F)];function Ne(o){const r=new Map,t=[],e=new S({vertexColors:!0,roughness:.91}),a=new S({color:4352377,vertexColors:!0,emissive:16759399,emissiveIntensity:0}),s=xe(),c=we(s.night,s.effects,s.time);r.set("salinas-masonry",c),r.set("salinas-brine",s.material),r.set("salinas-lights",a);for(const i of D)o.includes(F(i))&&r.set(F(i),{createActor:()=>ye(i)});for(const i of B)if(o.includes(i)){const l=ke(i,e);l.castShadow=l.receiveShadow=!0,r.set(i,{scene:l}),t.push(l)}if(o.includes("sails")){const i=new le("");ie(i,f(0,0,0),9.55);const l=new ve(ne(i.finish()[0]).rotateY(Math.PI/2),e);l.castShadow=l.receiveShadow=!0,r.set("sails",{scene:l}),t.push(l)}return{handles:r,brine:s,lamps:a,release(){for(const i of t)i.geometry.dispose();e.dispose(),c.dispose(),a.dispose(),s.material.dispose(),r.clear()}}}const U=new WeakMap,ze=new V(16766359),Me=new V(4352377);function Ce(o){const r=[];for(const[t,e,a]of L.mills)if(_(t)===o){const s={position:f(t,p+a,e+1.87),heading:Math.PI/2,scale:f(a/18,a/18,a/18)};r.push({assetKey:"sails",...s,seaContact:!1,poseAt:c=>({...s,pitch:.51+t*.031+c*.32})})}if(o===3)for(let t=0;t<3;t++){const e=a=>({position:f(234+78*Math.sin(a*.029+.55)+t*3.32,p+.26,-108)});r.push({assetKey:"tipper",...e(0),poseAt:e,seaContact:!1})}return r}function Le(o){const r=_(ce)===o,t=(e,a)=>_(e)===o?q(e,a):void 0;return{terrainBounds:{min:{x:W[o],z:-135},max:{x:W[o+1],z:170}},cameraBoxes:r?te:void 0,raycast({origin:e,direction:a,distance:s}){const c=r?re({origin:e,direction:a,distance:s}):void 0;let i=0,l=c?.distance??s;for(const[n,g,h]of[["x",W[o],W[o+1]],["z",-135,170],["y",-2,34]]){if(Math.abs(a[n])<1e-9){if(e[n]<g||e[n]>h)return c;continue}const x=(g-e[n])/a[n],y=(h-e[n])/a[n];i=Math.max(i,Math.min(x,y)),l=Math.min(l,Math.max(x,y))}if(i>l)return c;const u=n=>f(e.x+a.x*n,e.y+a.y*n,e.z+a.z*n),m=n=>{const g=u(n),h=t(g.x,g.z);return h!==void 0&&g.y<=h},d=Math.max(1,Math.ceil((l-i)/1.4));let v=i;for(let n=0;n<=d;n++){const g=i+(l-i)*n/d;if(m(g)){let h=v,x=g;for(let G=0;G<11;G++){const P=(h+x)/2;m(P)?x=P:h=P}const y=u(x),E=this.groundAt(y.x,y.z);return{id:E.id,point:y,distance:x,normal:E.normal}}v=g}return c},groundAt(e,a){if(r&&ae(e,a))return{id:"coaster-deck",height:se,normal:f(0,1,0),walkable:!0};const s=t(e,a);if(s===void 0)return;const c=((q(e+.1,a)??s)-(q(e-.1,a)??s))/.2,i=((q(e,a+.1)??s)-(q(e,a-.1)??s))/.2,l=Math.hypot(c,1,i);return{id:"saltworks-ground",height:s,normal:f(-c/l,1/l,-i/l),walkable:!0}},waterAt(e,a){if(_(e)!==o||!oe(e,a))return;const s=q(e,a);if(!(s>=R))return{level:R,floor:s,depth:R-s,flow:f(0,0,0),type:"brine"}},renderFloorAt:t,seaFloorAt:t}}const Fe={manifest:Q,async loadContent({signal:o}){return o.throwIfAborted(),{...be,assetKeys:qe}},async buildChunk({key:o,lod:r,signal:t}){const{meshes:e,instances:a,boxes:s,perches:c}=await ee("saltworks",{key:o,lod:r},t);return{meshes:e,instances:a,models:Ce(Number(o)),surfaces:{...Le(Number(o)),boxes:s,perches:c}}},async loadAssets(o,{signal:r}){r.throwIfAborted();const t=Ne(o);return U.set(t,t),t},activate({assets:o,frames:r}){const t=U.get(o);return t?r.subscribe(({seconds:e,hour:a,quality:s=fe.high})=>{const c=Math.max(0,Math.min(1,Math.max((a-18.3)/2.3,(7.3-a)/1.6)));t.lamps.color.copy(Me).lerp(ze,c),t.lamps.emissiveIntensity=c*1.65,t.brine.time.value=e,t.brine.night.value=c,t.brine.warmth.value=Math.max(0,1-Math.abs(a-18.7)/1.8),t.brine.effects.value=s.water==="flat"?0:s.water==="simple"?1:2,t.brine.reflections.value=Number(s.reflections)}):()=>{}}};export{Fe as island,Q as manifest,Le as surfaces};
