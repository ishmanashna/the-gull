import{c as f}from"./storm-cloud-CgEFPEzC.js";import{V as h,a as c,g as p,an as v,cq as g,dl as x,dd as S,dc as u,ak as y,av as z}from"./three.core-BYa7ON5M.js";const m=2,l=`
  uniform vec3 stormCenter[${m}];
  uniform vec4 stormAxis[${m}];
  uniform vec4 stormStrike;
  uniform vec4 stormRainFoot;
  uniform vec4 stormMist;
  uniform vec2 stormWind;
  uniform float stormTime;
  vec3 applyStormShade(vec3 color, vec3 point, bool water) {
    float shade = 0.0;
    for (int i = 0; i < ${m}; ++i) {
      if (stormCenter[i].z <= 0.0) continue;
      vec2 d = point.xz - stormCenter[i].xy;
      vec4 a = stormAxis[i];
      vec2 ellipse = vec2(dot(d, a.xy) * a.z, dot(d, vec2(-a.y, a.x)) * a.w);
      float radius = dot(ellipse, ellipse);
      float edge = 1.0 + 0.055 * sin(ellipse.y * 17.0 + 2.0 * ellipse.x);
      shade = max(shade, (1.0 - smoothstep(0.17, edge, radius)) * stormCenter[i].z);
    }
    vec3 tint = water ? vec3(0.51, 0.55, 0.64) : vec3(0.40, 0.47, 0.58);
    vec3 shaded = color * mix(vec3(1.0), tint, shade);
    if (water) shaded = mix(shaded, dot(shaded, vec3(0.22, 0.64, 0.14)) * vec3(0.86, 0.95, 1.16), shade * 0.61);
    vec2 across = vec2(-stormWind.y, stormWind.x);
    if (water && shade > 0.025) {
      vec2 delta = point.xz - stormRainFoot.xy;
      vec2 head = stormAxis[0].xy;
      vec2 core = vec2(dot(delta, head), dot(delta, vec2(-head.y, head.x))) * stormRainFoot.zw;
      float wet = 1.0 - smoothstep(0.12, 1.0, dot(core, core));
      shaded = mix(shaded, shaded * 0.66 + vec3(0.012, 0.019, 0.028), wet * shade * 0.55);
      if (wet > 0.06) {
        vec2 toEye = point.xz - cameraPosition.xz;
        float distanceSquared = dot(toEye, toEye);
        float distant = smoothstep(110000.0, 360000.0, distanceSquared);
        if (distant > 0.0) {
          vec2 p = vec2(dot(delta, stormWind), dot(delta, across));
          float crests = sin(p.x * 0.26 + sin(p.y * 0.091) * 1.2 - stormTime * 1.9);
          float breaks = sin(p.y * 0.23 + p.x * 0.11) * sin(p.y * 0.41 - p.x * 0.27);
          float foam = smoothstep(0.62, 0.98, crests) * smoothstep(-0.10, 0.73, breaks);
          shaded += foam * wet * distant * shade * vec3(0.068, 0.086, 0.104);
        }
      }
    }
    if (stormStrike.w > 0.0) {
      vec3 d = point - stormStrike.xyz;
      float glow = stormStrike.w * (1.0 - smoothstep(0.02, 1.0, dot(d, d) / 67600.0));
      shaded += glow * (shaded * 0.7 + vec3(0.036, 0.030, 0.073));
      if (water && dot(d, d) < 9600.0) {
        vec2 glintPosition = vec2(dot(d.xz, stormWind), dot(d.xz, across));
        vec2 ellipse = glintPosition / vec2(59.0, 33.0);
        float pool = 1.0 - smoothstep(0.0, 1.0, dot(ellipse, ellipse));
        float ripples = smoothstep(0.08, 0.95, sin(glintPosition.x * 0.68 + sin(glintPosition.y * 0.18) * 1.3));
        float gaps = smoothstep(-0.5, 0.65, sin(glintPosition.y * 0.43 + glintPosition.x * 0.08));
        float pin = 1.0 - smoothstep(0.0, 55.0, dot(d.xz, d.xz));
        shaded += stormStrike.w * (pool * (0.16 + 1.72 * ripples * gaps) + pin) * vec3(0.64, 0.79, 1.0);
      }
    }
    if (stormMist.w > 0.0) {
      float mist = stormMist.w * (1.0 - exp2(-distance(point, cameraPosition) * 0.0036));
      shaded = mix(shaded, stormMist.rgb, mist);
    }
    return shaded;
  }
`;class b{materials=new WeakSet;centers=Array.from({length:m},()=>new h);axes=Array.from({length:m},()=>new c);strike=new c;rainFoot=new c;mist=new c;wind=new p(1,0);uniforms={stormCenter:{value:this.centers},stormAxis:{value:this.axes},stormStrike:{value:this.strike},stormWind:{value:this.wind},stormRainFoot:{value:this.rainFoot},stormMist:{value:this.mist},stormTime:{value:0}};update(o,i,t,s,d=f,e=0){this.mist.fromArray(d),this.uniforms.stormTime.value=e,s&&Math.hypot(s.x,s.z)>.05?this.wind.set(s.x,-s.z).normalize():o[0]&&this.wind.set(o[0].heading.x,-o[0].heading.z);const r=o[0];if(r){const a=Math.min(42,r.baseHeight/9)*.79;this.rainFoot.set(r.precipitationCenter.x+(s?.x??0)*a,-r.precipitationCenter.z-(s?.z??0)*a,1/r.precipitationHalfLength,1/r.precipitationHalfWidth)}for(let a=0;a<m;a++){const n=o[a];if(!n){this.centers[a].z=0;continue}this.centers[a].set(n.center.x,-n.center.z,n.strength),this.axes[a].set(n.heading.x,-n.heading.z,1/n.halfLength,1/n.halfWidth)}i?this.strike.set(i.impact.x,i.impact.y,-i.impact.z,t):this.strike.w=0}install(o){o.traverse(i=>{if(i instanceof v){for(const t of Array.isArray(i.material)?i.material:[i.material])if(!t.userData.skipStormShade){if(t instanceof g||t instanceof x||t instanceof S||t instanceof u)this.bind(t);else if(t instanceof y){const s=i.geometry,d=s instanceof z&&s.parameters.width>=42e3&&t.fragmentShader.includes("varying vec3 world;"),e=t.userData.stormWorldPosition??(d?"world":void 0);e&&this.bind(t,e,d||t.userData.stormWater===!0)}}}})}bind(o,i,t=!1){if(this.materials.has(o))return;this.materials.add(o);const s=o.onBeforeCompile,d=o.customProgramCacheKey();o.onBeforeCompile=(e,r)=>{s.call(o,e,r),Object.assign(e.uniforms,this.uniforms),!e.fragmentShader.includes("vec3 applyStormShade(")&&(i?e.fragmentShader=e.fragmentShader.replace("void main()",`${l}
void main()`):(e.vertexShader=`varying vec3 stormWorld;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`
          #include <project_vertex>
          vec4 stormPosition = vec4(transformed, 1.0);
          #ifdef USE_BATCHING
            stormPosition = batchingMatrix * stormPosition;
          #endif
          #ifdef USE_INSTANCING
            stormPosition = instanceMatrix * stormPosition;
          #endif
          stormWorld = (modelMatrix * stormPosition).xyz;
        `),e.fragmentShader=`varying vec3 stormWorld;
${l}
`+e.fragmentShader),e.fragmentShader=e.fragmentShader.replace("#include <tonemapping_fragment>",`gl_FragColor.rgb = applyStormShade(gl_FragColor.rgb, ${i??"stormWorld"}, ${t});
        #include <tonemapping_fragment>`),i&&!e.fragmentShader.includes("gl_FragColor.rgb = applyStormShade")&&(e.fragmentShader=e.fragmentShader.replace("#include <colorspace_fragment>",`gl_FragColor.rgb = applyStormShade(gl_FragColor.rgb, ${i}, ${t});
#include <colorspace_fragment>`)))},o.customProgramCacheKey=()=>`${d}:storm-shade:${i??"mesh"}:${t}`,o.needsUpdate=!0}}export{m as S,b as a};
