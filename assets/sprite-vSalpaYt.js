import"./three-renderer-BP556_pn.js";import{cO as c$,S as i$,cx as H,cQ as r$,cP as l$,V as J,ch as p$,bF as d$,cy as G}from"./three.core-BYa7ON5M.js";const U=100,O=320,j=240,N=147,l="#252b37",F="#fff0d4",X="#f9b540",f$="#ffe8ac";function K(p,s,w=0){const b=document.createElement("canvas");b.width=O*2,b.height=j*2;const i=b.getContext("2d");i.scale(2,2),i.translate(O/2,N),i.lineJoin="round",i.lineCap="round";const y=p*Math.PI/4,h=Math.sin(y),m=Math.cos(y),P=Math.max(0,m),d=Math.max(0,-m),x=s==="float",k=s==="peck",v=x||k||s==="perch"||s.startsWith("step")||s==="sleep"||s==="call",$=x?3:-30,Q=$-(k?-9:s==="sleep"?12:23),M=(k?47:s==="sleep"?8:26)*h,c=-5*h,f=18+h*25,r=(o,t,e=l,n=2.4)=>{const a=new Path2D(o);i.fillStyle=t,i.fill(a),n&&(i.strokeStyle=e,i.lineWidth=n,i.stroke(a))},W=([o,t,e])=>[o*m+e*h,$-t+(o*h-e*m)*.35],E=o=>W(o).join(",");function C(o){const t=s==="up"?68:s==="down"?-40:s==="recover"?-14:s==="bank"?o*w>0?50:-27:s==="flare"?32:13,e=s==="dive"?60:s==="up"?105:s==="down"?111:137,n=s==="dive"?64:11,a=(D,Y,Z)=>E([o*D,Y,Z]),u=a(14,8+d*4,-11+d*5),R=a(e*.44,t*.54+12,6-n*.24),I=a(e*.72,t*.83,-5-n*.6),V=a(e,t,-34-n),_=a(e*.86,t*.92-7,-48-n*.92),t$=a(e*.58,t*.74-3,-28-n*.64),o$=a(e*.31,t*.34-5-d*12,-43-n*.32+d*10),e$=a(13,1-d*12,-28+d*6),z=a(e*.77,t*.85-8,-48-n*.87),A=`M ${u} Q ${R} ${I} Q ${a(e*.91,t*.97,-21-n*.83)} ${V}
      Q ${a(e*.99,t-8,-42-n)} ${_}
      Q ${a(e*.86,t*.89-12,-50-n*.9)} ${z}
      Q ${a(e*.72,t*.85-12,-45-n*.86)} ${o$}
      Q ${a(20,t*.07,-27)} ${e$} Z`;r(A,o>0?"#8f9dab":"#697b91"),r(`M ${I} Q ${a(e*.91,t*.97,-21-n*.83)} ${V}
      Q ${a(e*.99,t-8,-42-n)} ${_} L ${z} L ${t$} Z`,l,l,0),r(`M ${R} Q ${a(e*.57,t*.53+12,3-n*.5)} ${I}
      L ${a(e*.58,t*.67,-8-n*.54)} Q ${a(e*.34,t*.36+8,1-n*.23)} ${u} Z`,o>0?"#bec4be":"#9aa8ad",l,0),r(`M ${a(e*.87,t*.92-2,-30-n*.89)}
      L ${a(e*.947,t*.97-3,-34-n*.95)}
      L ${a(e*.912,t*.96-7,-40-n*.92)}
      L ${a(e*.865,t*.91-6,-36-n*.88)} Z`,F,l,0),i.save(),i.clip(new Path2D(A));const n$=["#d8cfb6","#afb6b5","#929fa7","#78899b"];for(const[D,Y]of n$.entries()){const Z=.22+.15*D,S=(q,s$,a$)=>a(q*e,t*q+s$,a$-n*q);r(`M ${S(Z-.09,12,7)} Q ${S(Z+.03,15,4)} ${S(Z+.15,3,-16)}
        Q ${S(Z+.23,-5,-42)} ${S(Z+.13,-9,-44)}
        Q ${S(Z+.01,-5,-28)} ${S(Z-.09,12,7)} Z`,Y,l,0)}i.restore()}if(v||(C(m>=0?-1:1),C(m>=0?1:-1)),!x&&(v||s==="flare"))for(const o of[-1,1]){const t=c+o*(8+Math.abs(m)*4),e=s==="step-left"?o*7:s==="step-right"?-o*7:0,n=(s==="flare"?-9:0)-Math.max(e,0)*.45,a=t+e,u=a+6+8*h;r(`M ${t-2.5},${$+12} L ${t+2.5},${$+12}
        L ${a+2},${n-6} Q ${u-3},${n-6} ${u+2},${n-4}
        Q ${u+4},${n-2} ${u},${n-2} L ${u-4},${n-2.5}
        Q ${u-1},${n+1} ${u-6},${n} L ${u-9},${n-1}
        Q ${u-10},${n+1} ${a-5},${n} Z`,X,l,1.65),r(`M ${a+1},${n-4} Q ${u-5},${n-3} ${u-4},${n-2.5}`,"#bc7140","#bc7140",.9)}const g=-62*h;d||r(`M ${c-17},${$-6} Q ${g+4},${$-2} ${g-10*Math.abs(m)},${$+3}
      Q ${g-8},${$+11} ${g+9},${$+13} L ${c+5},${$+11} Z`,"#ddd2ca");const T=d?`M ${M-13},${Q+7}
    Q ${M-18},${Q-9} ${M-2},${Q-13}
    Q ${M+16},${Q-16} ${M+17},${Q+4}
    Q ${c+23},${$-13} ${c+25},${$+2}
    Q ${c+19},${$+17} ${c-2},${$+18}
    Q ${c-26},${$+14} ${c-27},${$+4}
    Q ${c-32},${$-8} ${M-13},${Q+7} Z`:`M ${c-f},${$+2}
    Q ${c-f*.89},${$-18} ${c-8},${$-19}
    Q ${M-13},${Q-16} ${M+5},${Q-12}
    Q ${M+18},${Q-9} ${M+15},${Q+9}
    Q ${c+f+5},${$+9} ${c+f*.41},${$+19}
    Q ${c-11},${$+24} ${c-f},${$+2} Z`;r(T,F),i.save(),i.clip(new Path2D(T)),r(`M ${c-f-6},${$-2} Q ${c-13},${$+18} ${c+f+7},${$+9}
    L ${c+f+7},${$+30} L ${c-f-6},${$+30} Z`,"#c3bcc2",l,0),r(`M ${c-f+5},${$-1} Q ${c},${$+19} ${c+f-2},${$+8}
    Q ${c+5},${$+27} ${c-f+5},${$-1} Z`,"#e8d2bb",l,0);for(let o=0;o<29;o++){const t=Math.sin(o*2.39),e=c-f+9+o%15*f/9,n=$-8+(o<15?0:12)+t*3.6;i.strokeStyle=o%4?"#fff9e2b3":"#d5b8a268",i.lineWidth=.65+Math.abs(t),i.beginPath(),i.moveTo(e,n),i.quadraticCurveTo(e+4,n+1,e+7+t*3,n+2),i.stroke()}if(i.restore(),d){const o=c-10*h,t=-43*h,e=$+15+d*9,n=12+d*9;r(`M ${o-13},${$-1}
      Q ${t-n+3},${e-14} ${t-n},${e-4}
      Q ${t-n+3},${e+2} ${t-8},${e-1}
      Q ${t-3},${e+4} ${t+3},${e}
      Q ${t+10},${e+3} ${t+12},${e-2}
      Q ${t+n-1},${e} ${t+n},${e-5}
      L ${o+12},${$-1} Z`,"#e7d8c2",l,2);const a=v?24:28+d*11;r(`M ${o-a},${$-10}
      Q ${o-18},${$-15} ${o-5},${$-16}
      Q ${o+13},${$-16} ${o+a},${$-10}
      Q ${o+24},${$-5} ${o+17},${$+3}
      Q ${t+11},${e-6} ${t+1},${e-8}
      Q ${o-12},${$+12} ${o-20},${$+3} Z`,"#8392a4",l,0),r(`M ${o-a+5},${$-10} Q ${o-10},${$-17} ${o+6},${$-12}
      Q ${o+18},${$-11} ${o+a-4},${$-9}
      Q ${o+17},${$-4} ${o+8},${$-3}
      Q ${o-8},${$-8} ${o-a+5},${$-10} Z`,"#aab5b5",l,0)}else if(v){const o=c+10*h,t=c-f*.8;r(`M ${o+10},${$-10} Q ${o+17},${$+2} ${o},${$+9}
      Q ${t+3},${$+13} ${t-5},${$+6}
      Q ${t+3},${$-12} ${o+10},${$-10} Z`,"#909fac"),r(`M ${t+9},${$-1} Q ${t+21},${$+4} ${t+23},${$+9}
      Q ${t+2},${$+12} ${t-5},${$+6} Z`,l,l,0),r(`M ${t+1},${$+4} l 8,1 -3,3 -6,-1 Z`,F,l,0)}else{const o=c-13*h,t=c-f-8;i.save(),i.clip(new Path2D(T)),r(`M ${t},${$-16} Q ${o-7},${$-20} ${o+9},${$-8}
      Q ${o+5},${$-3} ${o-5},${$-2}
      Q ${o-10},${$+7} ${t},${$+8} Z`,"#919fac",l,0),r(`M ${t},${$-19} Q ${o-3},${$-17} ${o+4},${$-9}
      Q ${o-13},${$-14} ${t},${$-6} Z`,"#bec3bf",l,0),i.restore()}if(!d){const o=M+h*14,t=o+h*29,e=Q+3+9*P,n=s==="call"?9:0;r(`M ${o-5},${e-1} L ${t+1},${e+1}
      Q ${t-2},${e+6+n} ${o-5},${e+5} Z`,"#cd6832",l,1.6),r(`M ${o-6},${e-5} Q ${o+6},${e-9} ${t-2},${e-4}
      Q ${t+5},${e-2} ${t+3},${e+4}
      Q ${t+1},${e+4} ${t},${e+1} Q ${o+5},${e+2} ${o-6},${e+1} Z`,X,l,1.8),r(`M ${o-3},${e-4} Q ${o+5},${e-7} ${t+2},${e-3}
      L ${t+2},${e-2} Z`,f$,l,0)}const $$=P>.9?[-1,1]:[1];if(!d)for(const o of $$){const t=M+o*(3+P*6),e=Q-4+P*3;s==="sleep"?r(`M ${t-4},${e} q 4,4 8,0 q -4,7 -8,0 Z`,l,l,0):(r(`M ${t-4},${e} a 4,4 0 1 0 8,0 a 4,4 0 1 0 -8,0 Z`,"#d97c39",l,0),r(`M ${t-3},${e} a 3,3 0 1 0 6,0 a 3,3 0 1 0 -6,0 Z`,l,l,0),r(`M ${t},${e-2} l 2,0 0,2 -2,0 Z`,F,l,0))}const B=new c$(b);return B.colorSpace=i$,B}function h$(p){if(p.mode==="float")return"float";if(p.mode==="ground"){const s=p.action;if(s?.name==="sleep")return"sleep";if(s&&(s.name==="peck"||s.name==="eat")&&Math.sin(Math.PI*s.phase)*(s.weight??1)>.35)return"peck";if(p.beakOpen>.25)return"call";if(p.gait&&p.gait.weight>.25){const w=Math.floor(G.euclideanModulo(p.gait.phase,1)*4);return["step-left","perch","step-right","perch"][w]}return"perch"}if(p.mode==="plunge"||p.diveTuck>.55||p.wingFold>.65)return"dive";if(p.flare>.5||p.footState==="reaching")return"flare";if(p.flapPhase!==null){const s=Math.floor(G.clamp(p.flapPhase,0,.999)*8);return["glide","up","up","glide","down","down","recover","glide"][s]}return Math.abs(p.bank)>.23?"bank":"glide"}const u$={id:"sprite",name:"Sprite",method:"Eight-facing painted cel billboard",scaleAgainstHero:1,async create(){const p=new H;p.name="Sprite Gull";const s=new H,w=new r$({alphaTest:.1,toneMapped:!1}),b=new l$(w);b.center.set(.5,1-N/j),b.scale.set(O/U,j/U,1),b.frustumCulled=!1,s.rotation.x=Math.PI/2,p.add(b,s);const i=new Map,y=new J,h=new J,m=new p$,P=new d$;let d="perch",x=0,k=0;b.onBeforeRender=($,Q,L)=>{p.getWorldQuaternion(m).invert(),"isOrthographicCamera"in L?y.setFromMatrixColumn(L.matrixWorld,2):(y.setFromMatrixPosition(L.matrixWorld),h.setFromMatrixPosition(p.matrixWorld),y.sub(h));const M=y.applyQuaternion(m),c=Math.atan2(M.x,M.z),f=G.euclideanModulo(Math.round(c/(Math.PI/4)),8),r=Math.min(f,8-f),W=f<4&&f>0,E=d==="bank"?Math.sign(x)*(W?-1:1):0,C=`${r}/${d}/${E}`;let g=i.get(C);if(g)i.delete(C);else if(g=K(r,d,E),i.size>=24){const T=i.keys().next().value;i.get(T).dispose(),i.delete(T)}i.set(C,g),g.repeat.x=W?-1:1,g.offset.x=W?1:0,w.map=g,w.rotation=-Math.sin(c)*k+Math.cos(c)*x};const v=K(0,d);return w.map=v,i.set("0/perch/0",v),{object:p,carrySocket:s,pose($){d=h$($),x=$.bank,k=$.pitch;const Q=$.action?.name==="hop"?Math.sin(Math.PI*$.action.phase)*($.action.weight??1)*.11:0;b.position.y=Q+($.mode==="float"?Math.sin($.time*2.4)*.012:0);const L=d==="peck";s.position.set(0,L?.12:$.mode==="float"?.18:.48,L?.69:.62),$.mode!=="ground"&&$.mode!=="float"&&(P.set(-k,0,x),s.position.y-=.29,s.position.applyEuler(P),s.position.y+=.29),s.position.y+=b.position.y,s.rotation.x=Math.PI/2-k},dispose(){s.clear(),p.removeFromParent(),i.forEach($=>$.dispose()),w.dispose()}}}};export{u$ as gull,h$ as selectCel};
