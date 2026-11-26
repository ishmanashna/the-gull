import{l as le,s as ce,m as he,e as fe}from"./lights-ZPpXjK36.js";import{S as E}from"./storm-shade-CQyIEidH.js";import{g as pe,b as z,c as de,d as H,e as T,f as U,h as j,o as me,O as ve,S as ue,i as xe}from"./runtime-Fvu5jN8S.js";import{av as G,g as ge,a as A,C as X,V as W,ak as I,an as ee,cy as k,al as we,am as ye,cw as be,dk as Se,a3 as Me,cj as ze,cJ as Fe,M as ke,ch as We,P as Ce}from"./three.core-BYa7ON5M.js";import{b as K}from"./storm-cloud-CgEFPEzC.js";import"./index-CNUyvlgf.js";import"./saves-ClQI9LoD.js";import"./three-renderer-BP556_pn.js";import"./table-D89Xz1NR.js";import"./credits-page-dWtXkrRi.js";import"./music-CxylN_mZ.js";const P=18,L=12,N=4,te=i=>`
  a = (${i.calm} + ${i.storm} * state.b * state.b)
      * (0.65 + 0.35 * dot(vec2(${i.x.toFixed(2)}, ${i.z.toFixed(2)}), state.rg * 2.0 - 1.0));
  d = vec2(${i.x.toFixed(2)}, ${i.z.toFixed(2)});
  phase = ${i.k} * dot(d, p) - ${i.speed} * elapsed + ${i.phase.toFixed(2)};
`,Re=z.map(i=>`
  ${te(i)}
  displacement += vec3(d.x * ${H} * cos(phase), sin(phase), d.y * ${H} * cos(phase)) * a;
`).join(""),oe=`
  vec3 gerstner(vec2 p, vec4 state) {
    vec3 displacement = vec3(0.0);
    float a, phase;
    vec2 d;
    ${Re}
    return displacement;
  }
`,Ae=z.map(i=>`
    ${te(i)}
    curvature = a * ${i.k*i.k};
    height += a * sin(phase);
    peak += a;
    convexity += curvature * sin(phase);
    maxConvexity += curvature;
    slope += d * a * ${i.k} * cos(phase);
`).join(""),Ee=`
  uniform float elapsed, weatherBlend;
  uniform sampler2D weatherA, weatherB;
  uniform vec4 weatherMap;
  varying vec3 vWorld;
  varying vec4 vWeather;
  varying float vWindFoam;
#ifdef STORM_SEA
  varying vec2 vWavePosition;
#endif

  ${oe}

  void main() {
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    vec2 p = vec2(vWorld.x, -vWorld.z);
    vec2 uv = (p - weatherMap.xy) * weatherMap.z + weatherMap.w;
    uv.x = clamp(uv.x, weatherMap.w, 1.0 - weatherMap.w) * 0.5;
    vWeather = mix(texture2D(weatherA, uv), texture2D(weatherB, uv), weatherBlend);
    uv.x += 0.5;
    vWindFoam = mix(texture2D(weatherA, uv).r, texture2D(weatherB, uv).r, weatherBlend);
    vec2 q = p;
    for (int i = 0; i < ${de}; ++i) q = p - gerstner(q, vWeather).xz;
#ifdef STORM_SEA
    vWavePosition = q;
#endif
    vWorld.y += gerstner(q, vWeather).y;
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
  }
`,ae=`
  uniform vec3 nightSea;
  uniform float moonlight;

  vec3 moonlitWater(vec3 color) {
    float brightness = dot(color, vec3(0.2126, 0.7152, 0.0722));
    return nightSea * (0.45 + 2.2 * sqrt(brightness));
  }
`,se=`
  float hash(vec2 point) {
    vec3 p = fract(vec3(point.xyx) * 0.1031);
    p += dot(p, p.yzx + 33.33);
    return fract((p.x + p.y) * p.z);
  }

  float noise(vec2 p) {
    vec2 cell = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(mix(hash(cell), hash(cell + vec2(1, 0)), f.x),
               mix(hash(cell + vec2(0, 1)), hash(cell + vec2(1, 1)), f.x), f.y);
  }
`,Pe=`
  ${pe}
  uniform float elapsed, daylight, golden, evening;
  uniform vec3 sky, sun, moon;
  ${ae}
  uniform sampler2D nearShore, farShore;
  uniform vec4 nearMap, farMap;
  uniform int contactCount, schoolCount, splashCount;
  uniform vec4 contacts[${P}], schools[${L}], splashes[${N}];
  uniform float headings[${P}];
  uniform vec4 wake;
  uniform vec2 wakeDirection;
  varying vec3 vWorld;
  varying vec4 vWeather;
  varying float vWindFoam;
#ifdef STORM_SEA
  varying vec2 vWavePosition;

  ${oe}
#endif

  ${se}

  vec3 shore(vec2 p, sampler2D tex, vec4 mapping) {
    vec2 uv = (p - mapping.xy) * mapping.z + mapping.w;
    vec2 nearestEdge = min(uv, 1.0 - uv);
    float blend = smoothstep(0.0, 0.07, min(nearestEdge.x, nearestEdge.y));
    vec3 encoded = texture2D(tex, uv).rgb;
    return mix(vec3(-24.0, 24.0, 0.0), vec3(encoded.rg * 32.0 + vec2(-24.0, -8.0), encoded.b), blend);
  }

  float line(float dist, float width) {
    float edge = min(fwidth(dist) * 0.75, width);
    return 1.0 - smoothstep(max(0.0, width - edge), width + edge + 0.001, abs(dist));
  }

  float filteredSin(float phase) {
    return sin(phase) * (1.0 - smoothstep(0.70, 3.0, fwidth(phase)));
  }

  vec3 noiseSlope(vec2 p) {
    vec2 cell = floor(p), f = fract(p);
    vec2 curve = f * f * (3.0 - 2.0 * f);
    vec2 derivative = 6.0 * f * (1.0 - f);
    float a = hash(cell), b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0)), d = hash(cell + vec2(1.0, 1.0));
    return vec3(
      derivative.x * mix(b - a, d - c, curve.y),
      derivative.y * mix(c - a, d - b, curve.x),
      mix(mix(a, b, curve.x), mix(c, d, curve.x), curve.y)
    );
  }

  vec4 wavePacket(vec2 p, vec2 dx, vec2 dy, vec2 id, vec2 wind, float gust) {
    float angle = mix(-0.55, 1.11, hash(id + vec2(17.0, 45.0)));
    vec2 heading = vec2(cos(angle), sin(angle));
    vec2 across = vec2(-heading.y, heading.x);
    float waveNumber = mix(0.98, 2.56, hash(id + vec2(91.0, 10.0)));
    float speed = sqrt(9.81 * waveNumber);
    float phase = dot(p, heading) * waveNumber - elapsed * speed + 6.2832 * hash(id);
    float footprint = (abs(dot(dx, heading)) + abs(dot(dy, heading))) * waveNumber;
    float visible = 1.0 - smoothstep(0.9, 3.0, footprint);
    float fineVisible = 1.0 - smoothstep(0.42, 1.5, footprint);
    float side = dot(p, across);
    float tooth = cos(phase * 2.11 + side * 0.64 + elapsed * 1.11);
    float face = cos(phase) + 0.32 * cos(2.0 * phase + 0.55);
    float bend = smoothstep(0.07, 0.43 + footprint * 0.12, face);
    float lightFace = (0.60 * face + 0.40 * (bend * 2.0 - 1.0)) * visible;
    float crest = smoothstep(0.72, 0.994, sin(phase)) * visible;
    float breaks = cos(side * 1.56 + 2.2 * sin(phase * 0.28) + 1.3 * sin(side * 0.65 - phase * 0.47));
    float fragments = smoothstep(-0.36, 0.63, breaks);
    float alignment = 0.83 + 0.17 * dot(heading, wind);
    vec2 slope = heading * (0.072 * face * visible + 0.039 * tooth * fineVisible)
      + across * (0.020 * tooth * fineVisible);
    return vec4(slope * alignment * gust * mix(0.55, 1.0, fragments), lightFace * mix(0.38, 1.0, fragments), crest * fragments);
  }

  vec4 surfaceRipples(vec2 p, vec2 wind, float gust) {
    // Neighboring wave packets have distinct periods and bearings. The triangular weights meet
    // continuously at the cell boundary and keep the strongest wave direction local.
    vec2 skew = vec2(p.x - p.y * 0.5773503, p.y * 1.1547005) * 0.087;
    vec2 cell = floor(skew), f = fract(skew);
    float upper = step(1.0, f.x + f.y);
    vec3 weights = mix(vec3(1.0 - f.x - f.y, f.x, f.y), vec3(f.x + f.y - 1.0, 1.0 - f.y, 1.0 - f.x), upper);
    weights = weights * weights * (3.0 - 2.0 * weights);
    vec2 dx = dFdx(p), dy = dFdy(p);
    vec4 a = wavePacket(p, dx, dy, cell + vec2(upper), wind, gust);
    vec4 b = wavePacket(p, dx, dy, cell + vec2(1.0, 0.0), wind, gust);
    vec4 c = wavePacket(p, dx, dy, cell + vec2(0.0, 1.0), wind, gust);
    return (a * weights.x + b * weights.y + c * weights.z) / (weights.x + weights.y + weights.z);
  }

  // The difference between the two nearest cells picks out the borders of the foam bubbles.
  float cellBorder(vec2 p) {
    vec2 cell = floor(p);
    vec2 local = fract(p);
    float nearest = 8.0;
    float nextNearest = 8.0;
    for (int z = -1; z <= 1; ++z) {
      for (int x = -1; x <= 1; ++x) {
        vec2 neighbor = vec2(float(x), float(z));
        vec2 id = cell + neighbor;
        vec2 point = neighbor + 0.12 + 0.76 * vec2(hash(id), hash(id + vec2(37.1, 19.7))) - local;
        float d = dot(point, point);
        nextNearest = min(nextNearest, max(nearest, d));
        nearest = min(nearest, d);
      }
    }
    return nextNearest - nearest;
  }

  float crestFoam(vec2 p, vec2 direction, float phase, float strength) {
    vec2 axes = vec2(dot(p, direction), dot(p, vec2(-direction.y, direction.x)));
    float foamGroup = noise(axes * vec2(0.13, 0.072) + vec2(-elapsed * 0.18, 0.0));
    float fray = noise(axes * vec2(1.08, 0.30) + vec2(-elapsed * 0.31, 0.3));
    float crest = filteredSin(phase + 0.41 + (foamGroup - 0.5) * 0.75 + (fray - 0.5) * 0.34);
    float leadingEdge = smoothstep(0.89, 0.995, crest + (foamGroup - 0.65) * 0.21);
    return leadingEdge * smoothstep(0.51, 0.73, foamGroup) * mix(0.46, 1.0, fray) * strength;
  }

#ifdef STORM_SEA
  uniform int oceanFrontCount;
  uniform vec4 oceanFrontCenter[${E}], oceanFrontAxis[${E}];
  float stormFootprint(vec2 point) {
    if (oceanFrontCount == 0) return 1.0;
    float strength = 0.0;
    for (int i = 0; i < ${E}; i++) {
      if (i >= oceanFrontCount) break;
      vec4 center = oceanFrontCenter[i], axis = oceanFrontAxis[i];
      vec2 delta = point - center.xy;
      vec2 local = vec2(dot(delta, axis.xy), dot(delta, vec2(-axis.y, axis.x))) * axis.zw;
      strength = max(strength, (1.0 - smoothstep(0.42, 1.0, length(local))) * center.z);
    }
    return strength;
  }
  vec4 stormSurface(vec2 p, vec4 state) {
    float a, phase, curvature;
    float height = 0.0, peak = 0.0, convexity = 0.0, maxConvexity = 0.0;
    vec2 d, slope = vec2(0.0);
    ${Ae}
    return vec4(slope, height / max(peak, 0.001), convexity / max(maxConvexity, 0.001));
  }

  // Independently oriented scales break up the clumps along each physical crest.
  const mat2 foamTurn = mat2(0.80, 0.60, -0.60, 0.80);
  const mat2 laceTurn = mat2(0.91, -0.42, 0.42, 0.91);

  float stormCaps(vec2 p, vec4 surface, vec2 wind, float force, float pixel) {
    float crest = smoothstep(0.37, 0.71, surface.z) * smoothstep(0.08, 0.52, surface.w);
    vec2 drift = p - wind * elapsed * 0.91;
    vec2 warp = vec2(noise(foamTurn * drift * 0.29), noise(laceTurn * drift * 0.23 + 13.0));
    vec2 windNormal = vec2(-wind.y, wind.x);
    vec2 windSpace = vec2(dot(drift, wind), dot(drift, windNormal));
    float groups = noise(foamTurn * (windSpace * vec2(0.36, 0.23)) + warp * 1.38);
    float clumps = smoothstep(mix(0.55, 0.40, force), 0.71, groups);
    float strands = noise(laceTurn * drift * 1.81 + warp * 3.7);
    float lace = 1.0 - smoothstep(0.032, 0.16, abs(strands - 0.52));
    float fine = 1.0 - smoothstep(0.10, 0.52, pixel);
    float coverage = smoothstep(0.08, 0.66, crest * clumps - (1.0 - lace) * fine * 0.20);
    float resolve = 1.0 - smoothstep(0.58, 2.3, pixel);
    return coverage * mix(0.58, 0.33 + 0.59 * lace, fine) * force * resolve;
  }

  vec4 stormRipples(vec2 p, vec2 wind, float pixel) {
    vec2 bend = vec2(noise(foamTurn * p * 0.31), noise(laceTurn * p * 0.38 + 9.0));
    vec2 first = normalize(vec2(0.88, 0.48) + wind * 0.18);
    vec2 second = laceTurn * first;
    float a = 3.65 * dot(p, first) + 10.0 * bend.x - elapsed * 5.3;
    float b = 6.75 * dot(p, second) + 12.0 * bend.y - elapsed * 8.9;
    float coarse = 1.0 - smoothstep(0.18, 0.63, pixel);
    float fine = 1.0 - smoothstep(0.09, 0.34, pixel);
    float fineFold = cos(b) * fine;
    float fold = cos(a) * 0.68 + fineFold * 0.32;
    float flecks = smoothstep(0.32, 0.69, noise(laceTurn * p * 0.86 + bend * 2.3));
    float lightFace = fold * coarse * (0.13 + 0.46 * flecks);
    float edges = smoothstep(0.44, 0.86, fold) * coarse * flecks * 0.62;
    vec2 slope = first * fold * coarse * (0.025 + 0.050 * flecks) + second * fineFold * (0.014 + 0.023 * flecks);
    return vec4(slope, lightFace, edges);
  }
#endif

  void main() {
    vec2 p = vec2(vWorld.x, -vWorld.z);
    vec2 dx = dFdx(p), dy = dFdy(p);
    float pixel = max(length(dx), length(dy));
    vec3 view = normalize(cameraPosition - vWorld) * vec3(1.0, 1.0, -1.0);
    float distanceToEye = length(cameraPosition - vWorld);
    float distanceFade = 1.0 - smoothstep(270.0, 1900.0, distanceToEye);
    float swell = vWeather.b;
    float shade = vWeather.a;
    vec2 wind = vWeather.rg * 2.0 - 1.0;
    vec2 nearUV = (p - nearMap.xy) * nearMap.z + nearMap.w;
    vec2 nearEdge = min(nearUV, 1.0 - nearUV);
    vec3 shoreData = mix(shore(p, farShore, farMap), shore(p, nearShore, nearMap),
      smoothstep(0.07, 0.18, min(nearEdge.x, nearEdge.y)));
    float depth = max(0.0, -shoreData.x);

    float warp = noise(p * 0.12 - wind * elapsed * 0.052);
    float drift = noise(p * 0.036 + vec2(0.017, -0.011) * elapsed);
    vec2 primaryDir = vec2(${z[0].x.toFixed(2)}, ${z[0].z.toFixed(2)});
    vec2 crossDir = vec2(${z[1].x.toFixed(2)}, ${z[1].z.toFixed(2)});
    float primary = dot(p, primaryDir) * ${z[0].k} - elapsed * ${z[0].speed} + ${z[0].phase.toFixed(2)};
    float crossing = dot(p, crossDir) * ${z[1].k} - elapsed * ${z[1].speed} + ${z[1].phase.toFixed(2)};
    float broad = filteredSin(primary + warp * 1.2) * 0.68 + filteredSin(crossing + drift * 1.6) * 0.32;
    float grain = noise(p * 0.34 + vec2(0.27, 0.1) - wind * elapsed * 0.14);
    vec2 warped = p + vec2(warp * 1.65 + grain * 0.62, drift * 2.30 + broad * 0.75);
    vec4 ripples = surfaceRipples(warped, wind, 0.79 + 0.52 * swell);
    float ripple = ripples.z;
    float waveEdges = ripples.w * smoothstep(0.32, 0.69, grain * 0.69 + warp * 0.31);
    vec2 facetAxis = vec2(0.90, 0.44);
    vec2 facetAcross = vec2(-0.44, 0.90);
    vec2 facetSpace = vec2(dot(warped, facetAxis), dot(warped, facetAcross));
    vec3 facets = noiseSlope(facetSpace * vec2(1.10, 0.59) - vec2(elapsed * 1.97, elapsed * 0.26));
    float facetVisibility = 1.0 - smoothstep(0.46, 1.50, pixel);
    vec2 slope = (primaryDir * filteredSin(primary + 1.5708) * (0.048 + 0.20 * swell * swell)
      + crossDir * filteredSin(crossing + 1.5708) * (0.033 + 0.11 * swell * swell)) * distanceFade;
#ifdef STORM_SEA
    float footprint = stormFootprint(p);
    float closeDetail = 1.0 - smoothstep(145.0, 345.0, distanceToEye);
    float stormDetail = footprint * closeDetail;
    vec4 surface = vec4(0.0);
    if (stormDetail > 0.0) {
      // Refine the interpolated inverse Gerstner position before evaluating the crest.
      vec2 phasePosition = p - gerstner(vWavePosition, vWeather).xz;
      surface = stormSurface(phasePosition, vWeather);
      vec4 rough = stormRipples(p, wind, pixel);
      broad = oceanFrontCount == 0 ? surface.z * stormDetail : mix(broad, surface.z, stormDetail);
      ripples = oceanFrontCount == 0 ? rough * stormDetail : mix(ripples, rough, stormDetail);
      ripple = ripples.z;
      waveEdges = ripples.w;
      facetVisibility *= oceanFrontCount == 0 ? 0.0 : 1.0 - stormDetail;
    }
    slope = oceanFrontCount == 0 ? surface.xy * stormDetail : mix(slope, surface.xy, stormDetail);
#endif
    slope += ripples.xy;
    slope += (facetAxis * facets.x * 0.065 + facetAcross * facets.y * 0.040) * facetVisibility;
    vec3 normal = normalize(vec3(-slope.x, 1.0, -slope.y));
    float facing = max(dot(normal, view), 0.0);
    float fresnel = pow(1.0 - facing, 4.2);

    vec3 bed = mix(vec3(0.016, 0.37, 0.32), vec3(0.052, 0.53, 0.42), warp);
    vec3 sandTint = mix(vec3(0.18, 0.44, 0.195), vec3(0.28, 0.60, 0.36), drift);
    bed = mix(bed, sandTint, (1.0 - smoothstep(0.05, 1.55, depth)) * (0.38 + 0.37 * warp));
    vec3 shelf = vec3(0.007, 0.30, 0.37);
    vec3 channel = vec3(0.005, 0.179, 0.345);
    vec3 deep = mix(vec3(0.004, 0.060, 0.235), vec3(0.011, 0.127, 0.355), drift);
    vec3 color = mix(bed, shelf, smoothstep(0.65, 4.4, depth));
    color = mix(color, channel, smoothstep(2.5, 8.6, depth));
    color = mix(color, deep, smoothstep(9.0, 23.0, depth));
    float bands = smoothstep(-0.68, 0.77, broad);
    float faceLight = ripple * (0.56 + 0.44 * warp);
    float facetLight = smoothstep(-0.08, 0.44, facets.x) * smoothstep(0.38, 0.73, facets.z) * facetVisibility;
    color *= (0.78 + 0.36 * bands) * (1.0 + (0.16 + 0.11 * swell) * faceLight);
    color += vec3(0.013, 0.072, 0.108) * max(waveEdges * 0.62, facetLight * 0.72) * distanceFade;
    float cloudShade = smoothstep(0.14, 0.86, shade);
    color = mix(color * vec3(0.94, 0.70, 0.61), color, cloudShade);
#ifndef NO_REFLECTIONS
    vec3 reflectedSky = mix(vec3(0.031, 0.104, 0.216), vec3(0.048, 0.190, 0.445), cloudShade);
    reflectedSky = mix(reflectedSky, sky * vec3(0.35, 0.55, 0.85), 0.23);
    color = mix(color, reflectedSky, fresnel * (0.31 + 0.13 * clamp(faceLight, -0.5, 0.5)));
#endif

    vec2 shoreGradient = dFdx(shoreData.y) * vec2(dy.y, -dy.x)
      + dFdy(shoreData.y) * vec2(-dx.y, dx.x);
    shoreGradient *= sign(dx.x * dy.y - dx.y * dy.x);
    vec2 outward = shoreGradient / max(length(shoreGradient), 0.00001);
    float onshore = -dot(outward, wind);
    float exposure = clamp(0.36 + onshore * 0.39 + swell * 0.47, 0.04, 1.0);

    float beach = 0.0;
    if (shoreData.y < 11.0 || depth < 4.6) {
      float cellsScale = 0.89;
      vec2 cells = p * cellsScale + outward * (0.44 * sin(elapsed * 1.27 + drift * 6.0))
        + vec2(noise(p * 0.63) - 0.5, noise(p * 0.71 + vec2(9.5, 3.1)) - 0.5) * 0.46;
      float border = cellBorder(cells);
      float resolve = 1.0 - smoothstep(0.45, 1.35, pixel * cellsScale);
      float edge = min(0.14, pixel * cellsScale * 0.23);
      float threads = (1.0 - smoothstep(0.028, 0.075 + edge, border)) * resolve;
      float sunFloor = exp(-depth * 0.53) * (1.0 - smoothstep(2.5, 4.6, depth)) * (0.38 + 0.62 * grain);
      color += vec3(0.16, 0.24, 0.078) * threads * sunFloor * (0.4 + 0.6 * warp) * cloudShade;

      vec2 shorePoint = p - shoreData.y * outward;
      float breaking = noise(shorePoint * 0.14 + vec2(0.08 * elapsed, 1.5 * drift));
      float tangle = noise(p * 0.69 + vec2(-0.13 * elapsed, 0.22 * elapsed));
      float runupPhase = elapsed * ${z[0].speed} - dot(shorePoint, primaryDir) * ${z[0].k};
      float pulse = sin(runupPhase + 2.9 * drift);
      float runup = shoreData.y - (0.77 + 1.05 * exposure) - pulse * (0.53 + 0.70 * exposure);
      runup += (tangle - 0.5) * 0.58 + (warp - 0.5) * 1.16;
      float groups = smoothstep(mix(0.43, 0.27, exposure), 0.68, breaking);
      float edgeWidth = 0.13 + exposure * 0.19 + tangle * 0.13;
      float leading = 1.0 - smoothstep(edgeWidth, edgeWidth + min(0.28, pixel * 0.35), abs(runup));
      float backwash = smoothstep(-1.9 - exposure, -0.22, runup) * (1.0 - smoothstep(-0.12, 0.66, runup));
      float slack = smoothstep(-0.77, 0.50, pulse);
      beach = groups * (leading * (0.35 + 0.57 * tangle) + backwash * max(0.08, threads) * (0.55 + slack * 0.34));

      float second = runup - (1.3 + exposure * 2.0) + 0.32 * sin(elapsed * 2.11 + 8.0 * warp);
      float secondLip = 1.0 - smoothstep(0.12 + exposure * 0.18, 0.37 + min(0.23, pixel * 0.3), abs(second));
      float secondWash = smoothstep(-1.6, -0.20, second) * (1.0 - smoothstep(0.0, 0.42, second));
      beach += (secondLip * (0.28 + tangle * 0.48) + secondWash * threads * 0.62)
        * smoothstep(0.35, 0.76, breaking * 0.73 + (1.0 - tangle) * 0.27) * (0.34 + 0.61 * exposure);
      beach *= smoothstep(-0.45, 0.22, vWorld.y - shoreData.x);
    }
    float windy = smoothstep(0.10, 0.76, vWindFoam);
    float caps = crestFoam(p, primaryDir, primary, 0.08 + 0.99 * windy);
    float betweenCrests = 1.0 - smoothstep(0.45, 0.92, sin(primary + 0.41));
    caps += crestFoam(p, crossDir, crossing, (0.026 + 0.41 * windy) * betweenCrests);
    caps *= mix(0.38, 1.0, smoothstep(-0.04, 0.39, vWorld.y)) * distanceFade;
    float sprayGroups = smoothstep(mix(0.71, 0.50, windy), 0.83, noise(p * 0.13 - wind * elapsed * 0.27));
    caps += waveEdges * sprayGroups * windy * 0.51 * distanceFade;
#ifdef STORM_SEA
    float roughCaps = stormDetail > 0.0 ? stormCaps(p, surface, wind, windy, pixel) : 0.0;
    if (oceanFrontCount == 0) caps = roughCaps * stormDetail;
    else caps = mix(caps, roughCaps, stormDetail);
#endif
    float contactWash = 0.0;
    if (shoreData.z > 0.025) {
      float lip = smoothstep(0.16, 0.66, shoreData.z);
      float breaks = smoothstep(0.30, 0.68, grain * 0.38 + facets.z * 0.42 + warp * 0.20);
      float spray = smoothstep(0.53, 0.83, facets.z) * smoothstep(0.09, 0.53, shoreData.z);
      contactWash = lip * (0.31 + 0.75 * breaks) * (0.68 + 0.32 * bands) + 0.19 * spray;
    }
    float foam = max(max(beach, caps), contactWash);

    for (int i = 0; i < ${P}; ++i) {
      if (i >= contactCount) break;
      vec4 contact = contacts[i];
      vec2 offset = p - contact.xy;
      if (max(abs(offset.x), abs(offset.y)) > max(contact.z, contact.w) + 3.0) continue;
      vec2 direction = vec2(sin(headings[i]), cos(headings[i]));
      vec2 hull = vec2(dot(offset, vec2(direction.y, -direction.x)), dot(offset, direction));
      float ring = (length(hull / contact.zw) - 1.0) * min(contact.z, contact.w);
      foam = max(foam, line(ring - 0.35 + (warp - 0.46) * 1.15, 0.46) * (0.57 + 0.41 * warp));
    }

    float rings = 0.0;
    for (int i = 0; i < ${L}; ++i) {
      if (i >= schoolCount) break;
      vec4 school = schools[i];
      float radius = length(p - school.xy);
      if (radius > school.z) continue;
      float ring = sin(radius * 4.2 - elapsed * 5.8 + school.w);
      rings = max(rings, smoothstep(0.78, 0.97, ring) * (1.0 - smoothstep(school.z * 0.24, school.z, radius)));
    }
    for (int i = 0; i < ${N}; ++i) {
      if (i >= splashCount) break;
      vec4 splash = splashes[i];
      float age = elapsed - splash.z;
      float radius = length(p - splash.xy);
      if (radius > 16.0 || age < 0.0) continue;
      float ring = radius - age * 4.6 + (warp - 0.5) * age * 0.95;
      float circle = max(line(ring, 0.32), line(ring + 1.25, 0.22) * smoothstep(0.3, 0.55, age));
      foam = max(foam, circle * (1.0 - smoothstep(0.25, 2.6, age)) * splash.w);
    }
    if (wake.w > 0.0) {
      vec2 offset = p - wake.xy;
      float aft = -dot(offset, wakeDirection);
      float across = abs(dot(offset, vec2(wakeDirection.y, -wakeDirection.x)));
      float edge = line(across - 0.22 - 0.23 * aft + (warp - 0.5) * 0.68, 0.24);
      foam = max(foam, edge * smoothstep(-0.3, 0.4, aft) * (1.0 - smoothstep(0.5, wake.z, aft))
        * (0.33 + 0.66 * ripple * ripple) * wake.w);
    }
    color = mix(color, vec3(0.64, 0.91, 0.88), rings * 0.53);
    color = mix(color, mix(vec3(0.39, 0.61, 0.76), vec3(0.95, 0.99, 1.0), cloudShade), min(0.96, foam));

    float sunAxis = dot(normalize(-view.xz + vec2(1e-6)), normalize(sun.xz));
    if (evening > 0.0) {
      float reflectedHeight = abs(view.y - sun.y);
      float path = smoothstep(0.95, 0.999, sunAxis) * (1.0 - smoothstep(0.018, 0.22, reflectedHeight));
      float flicker = smoothstep(0.34, 0.76, bands * 0.49 + grain * 0.22 + waveEdges * 0.43);
      color += vec3(1.0, 0.47, 0.066) * path * (0.12 + 1.30 * flicker) * evening * cloudShade * daylight;
    }
#ifndef NO_REFLECTIONS
    vec3 halfAngle = normalize(sun + view);
    float spec = max(0.0, dot(halfAngle, normal));
    float lane = smoothstep(0.948, 0.9996, sunAxis);
    float glaze = pow(spec, 48.0) * (0.030 + 0.08 * golden);
    float flashes = smoothstep(0.25, 0.72, bands * 0.30 + grain * 0.24 + waveEdges * 0.32 + facets.z * 0.28);
    float glitter = pow(spec, mix(225.0, 230.0, golden)) * flashes * (0.82 + 4.25 * golden);
    vec3 highlight = mix(vec3(0.64, 0.83, 0.99), vec3(1.0, 0.58, 0.14), golden);
    color += highlight * (glaze + glitter) * lane * cloudShade * daylight;
#endif
    vec3 horizon = mix(vec3(0.024, 0.145, 0.38), sky * vec3(0.44, 0.70, 1.0), 0.31 + 0.12 * golden);
    horizon *= mix(vec3(0.72, 0.73, 0.75), vec3(1.0), cloudShade);
    float haze = 1.0 - exp(-distanceToEye * mix(0.00030, 0.00015, cloudShade));
#ifdef STORM_SEA
    // Keep the distant shelf colour as the surface detail drops out offshore.
    horizon = mix(horizon, mix(shelf, channel, smoothstep(3.0, 9.0, depth)) * 0.80,
      footprint * (1.0 - smoothstep(7.0, 17.0, depth)));
    if (oceanFrontCount == 0) haze = max(haze, 1.0 - stormDetail);
#endif
    float rim = smoothstep(3800.0, 20000.0, distanceToEye) * 0.29;
    color = mix(color, mix(horizon, sky * vec3(0.72, 0.87, 1.0), rim), haze);
    color *= mix(vec3(0.29, 0.36, 0.61), vec3(1.0), daylight);
    if (moonlight > 0.0) {
      vec3 nightHorizon = mix(nightSea, sky * 0.55, rim);
      color = mix(color, mix(moonlitWater(color), nightHorizon, haze), moonlight);
      vec3 lunarHalf = normalize(moon + view);
      float spec = max(0.0, dot(lunarHalf, normal));
      float lane = smoothstep(0.91, 0.997, dot(normalize(-view.xz + vec2(1e-6)), normalize(moon.xz)));
      float sparkle = smoothstep(0.35, 0.75, bands * 0.48 + facets.z * 0.38 + waveEdges * 0.32);
      float glint = 0.041 * pow(spec, 42.0) + 0.22 * pow(spec, 195.0) * sparkle;
      color += glint * lane * cloudShade * moonlight * (1.0 - haze) * vec3(0.76, 0.86, 1.0);
    }
    gl_FragColor = vec4(color * (1.0 - gullShadowAt(p)), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,M=40,De=144,Te=3,$=i=>Math.round(255*Math.max(0,Math.min(1,i))),V=(i,o)=>Math.hypot(i.x-o.x,i.z-o.z);function*q(i,o,e,t){const s=[];for(const a of i)for(const n of a){const l=V(n.position,o);if(l<e){const r=s.findIndex(p=>p.range>l);r>=0?s.splice(r,0,{value:n,range:l}):s.length<t&&s.push({value:n,range:l}),s.length>t&&s.pop()}yield}return s.map(a=>a.value)}function ie(i,o=i){const e=new Uint8Array(o*i*4),t=new Se(e,o,i);return t.minFilter=t.magFilter=Me,{data:e,texture:t,size:i,x:1/0,z:1/0,revision:-1/0}}function Z(i){return{...ie(i),nextData:new Uint8Array(i*i*4),floor:new Uint8Array(i*i),nextFloor:new Uint8Array(i*i),coast:new Float64Array(i*i),nextCoast:new Float64Array(i*i),foamRevision:-1,refresh:void 0}}function $e(){const i=ie(M,M*2);for(let o=0;o<M;o++)for(let e=0;e<M;e++)i.data.set([128,128,0,255],(o*M*2+e)*4);return i.texture.needsUpdate=!0,i}function _e(){const i=[0];let o=.85;for(;i[i.length-1]<22e3;){const n=i[i.length-1];i.push(n+o),n>=400?o*=1.36:n>=44&&(o*=1.14)}const e=[...i.slice(1).reverse().map(n=>-n),...i],t=e.length-1,s=new G(1,1,t,t);s.rotateX(-Math.PI/2);const a=s.getAttribute("position");for(let n=0;n<=t;n++)for(let l=0;l<=t;l++)a.setXYZ(n*(t+1)+l,e[l],0,e[n]);return s}const _=i=>Array.from({length:i},()=>new A),ne=18;function Oe(){const i=new we;i.setAttribute("position",new ye(new Float32Array(N*ne*3),3));const o=new I({transparent:!0,depthWrite:!1,vertexShader:`
      void main() {
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * p;
        gl_PointSize = clamp(42.0 / -p.z, 1.5, 7.0);
      }
    `,fragmentShader:`
      void main() {
        float opacity = 1.0 - smoothstep(0.23, 0.5, length(gl_PointCoord - 0.5));
        gl_FragColor = vec4(0.74, 0.91, 0.89, 0.85 * opacity);
        #include <colorspace_fragment>
      }
    `}),e=new be(i,o);return e.visible=!1,e.frustumCulled=!1,e}class Ne{detailedGeometry=_e();flatGeometry=new G(44e3,44e3).rotateX(-Math.PI/2);weather=Array.from({length:4},$e);weatherPair=[this.weather[0],this.weather[1]];weatherRefresh;contactRefresh;weatherSlot=0;near=Z(De);far=Z(208);footprints=new Map;foamBands=new Set;foamRevision=0;source;weatherRevision=-1;shoreRefreshMaxMs=0;splashes=[];lastBird;uniforms={elapsed:{value:0},daylight:{value:1},golden:{value:0},evening:{value:0},sky:{value:new X},sun:{value:new W},moon:{value:new W},moonlight:{value:0},gullShadow:{value:new A},nightSea:{value:new X(le.night.sea)},weatherA:{value:this.weather[0].texture},weatherB:{value:this.weather[1].texture},weatherMap:{value:new A},weatherBlend:{value:0},nearShore:{value:this.near.texture},nearMap:{value:new A},farShore:{value:this.far.texture},farMap:{value:new A},contacts:{value:_(P)},contactCount:{value:0},headings:{value:new Float32Array(P)},oceanFrontCount:{value:0},oceanFrontCenter:{value:_(E)},oceanFrontAxis:{value:_(E)},schools:{value:_(L)},schoolCount:{value:0},splashes:{value:_(N)},splashCount:{value:0},wake:{value:new A},wakeDirection:{value:new ge}};detailedMaterial=new I({uniforms:this.uniforms,vertexShader:Ee,fragmentShader:Pe});flatMaterial=new I({uniforms:{...this.uniforms,simple:{value:0}},vertexShader:`
      uniform vec3 sun, moon;
      varying vec3 vWorld;
      varying vec3 vSunPath;
      varying vec3 vMoonPath;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vec2 toWater = (vWorld.xz - cameraPosition.xz) * vec2(1.0, -1.0);
        float forward = dot(toWater, sun.xz);
        vSunPath = vec3(forward, toWater.x * sun.z - toWater.y * sun.x, forward * sun.y);
        float moonward = dot(toWater, moon.xz);
        vMoonPath = vec3(moonward, toWater.x * moon.z - toWater.y * moon.x, moonward * moon.y);
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,fragmentShader:`
      uniform vec3 sky;
      uniform float daylight, elapsed, simple, evening;
      ${ae}
      uniform sampler2D nearShore, farShore;
      uniform vec4 nearMap, farMap;
      varying vec3 vWorld;
      varying vec3 vSunPath;
      varying vec3 vMoonPath;

      ${se}

      float shoreFloor(sampler2D shore, vec2 uv) {
        vec2 edge = min(uv, 1.0 - uv);
        float blend = smoothstep(0.0, 0.07, min(edge.x, edge.y));
        return -24.0 + texture2D(shore, uv).r * 32.0 * blend;
      }

      void main() {
        vec2 p = vec2(vWorld.x, -vWorld.z);
        vec2 nearUV = (p - nearMap.xy) * nearMap.z + nearMap.w;
        vec2 farUV = (p - farMap.xy) * farMap.z + farMap.w;
        vec2 nearEdge = min(nearUV, 1.0 - nearUV);
        float floorHeight = mix(shoreFloor(farShore, farUV), shoreFloor(nearShore, nearUV),
          smoothstep(0.07, 0.18, min(nearEdge.x, nearEdge.y)));
        if (floorHeight > 0.12) discard;
        float range = length(cameraPosition - vWorld);
        vec3 color = mix(vec3(0.014, 0.074, 0.13), vec3(0.032, 0.29, 0.42), daylight);
        vec3 shallows = mix(vec3(0.045, 0.12, 0.11), vec3(0.23, 0.46, 0.31), daylight);
        color = mix(shallows, color, smoothstep(0.0, 3.5, -floorHeight));
        if (simple > 0.5) {
          float path = 0.0;
          float forward = vSunPath.x;
          float across = abs(vSunPath.y);
          if (evening > 0.0 && forward > 4.0 && across < 0.14 * forward) {
            // The flat sea catches the sun where the reflected ray reaches the eye.
            float eyeHeight = max(0.5, cameraPosition.y);
            float lift = vSunPath.z;
            float reach = smoothstep(0.34 * eyeHeight, 0.79 * eyeHeight, lift)
              * (1.0 - smoothstep(2.1 * eyeHeight, 5.0 * eyeHeight, lift));
            path = reach * (1.0 - smoothstep(0.006 * forward, 0.14 * forward, across)) * evening;
          }
          bool nearWaves = range < 180.0;
          if (nearWaves || path > 0.0) {
            float wave = sin(dot(p, vec2(0.74, 1.1)) + elapsed * 1.4);
            wave *= sin(dot(p, vec2(0.13, -0.61)) - elapsed * 0.8);
            if (nearWaves) {
              color *= 1.0 + wave * 0.13 * (1.0 - smoothstep(32.0, 180.0, range));
              float wash = 1.0 - smoothstep(0.02, 0.22, abs(floorHeight + 0.18 + wave * 0.095));
              color = mix(color, vec3(0.69, 0.79, 0.76), wash * (0.28 + wave * 0.17) * max(daylight, 0.18 * moonlight));
            }
            if (path > 0.0) {
              float glint = mix(smoothstep(0.12, 0.64, wave), 0.16, smoothstep(320.0, 850.0, range));
              color += vec3(0.72, 0.32, 0.050) * path * (0.035 + 0.965 * glint) * daylight;
            }
          }
        }
        float haze = smoothstep(90.0, 4800.0, range) * 0.93;
        if (moonlight > 0.0) {
          color = mix(color, moonlitWater(color), moonlight);
          float forward = vMoonPath.x;
          float across = abs(vMoonPath.y);
          if (forward > 4.0 && across < 0.25 * forward) {
            float lift = vMoonPath.z / max(0.5, cameraPosition.y);
            float path = smoothstep(0.46, 0.95, lift) * (1.0 - smoothstep(1.08, 1.85, lift));
            path *= 1.0 - smoothstep(0.018 * forward, 0.25 * forward, across);
            float glint = 0.0;
            if (simple > 0.5) {
              float grain = noise(p * 0.63 + vec2(-elapsed * 0.51, elapsed * 0.19));
              float wave = 0.5 + 0.5 * sin(dot(p, vec2(0.81, 1.23)) + elapsed * 1.4 + 5.4 * grain);
              glint = 0.14 * smoothstep(0.36, 0.82, wave * grain) * (1.0 - smoothstep(200.0, 520.0, range));
            }
            color += vec3(0.76, 0.86, 1.0) * path * (0.024 + glint) * moonlight;
          }
        }
        color = mix(color, sky * mix(1.0, 0.48, moonlight), haze);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `});mesh=new ee(this.detailedGeometry,this.detailedMaterial);spray=Oe();constructor(o,e){this.uniforms.sky.value=o,e&&(this.uniforms.gullShadow.value=e.value),this.mesh.frustumCulled=!1,this.mesh.name="Sea",this.mesh.material.userData.stormWorldPosition="vWorld",this.mesh.material.userData.stormWater=!0,this.spray.name="Sea spray"}mountContact(o){if(o.isEmpty()||o.min.y>.8||o.max.y<-.8)return()=>{};const e=Symbol(),t=o.getCenter(new W),s=o.getSize(new W);return this.footprints.set(e,{position:{x:t.x,z:-t.z},halfWidth:Math.max(.3,s.x*.52),halfLength:Math.max(.3,s.z*.52),heading:0}),()=>{this.footprints.delete(e)}}mountShoreFoam(o,e){const t=({x:a,z:n})=>({x:a+e.x,z:n+e.z}),s=o.map(a=>({...a,from:t(a.from),to:t(a.to)}));return this.foamBands.add(s),this.foamRevision++,()=>{this.foamBands.delete(s)&&this.foamRevision++}}dispose(){this.mesh.removeFromParent(),this.spray.removeFromParent(),this.detailedGeometry.dispose(),this.flatGeometry.dispose(),this.detailedMaterial.dispose(),this.flatMaterial.dispose(),this.spray.geometry.dispose(),this.spray.material.dispose();for(const o of[...this.weather,this.near,this.far])o.texture.dispose()}selectWater(o){const e=o.water==="full";return this.mesh.geometry=e?this.detailedGeometry:this.flatGeometry,this.mesh.material=e?this.detailedMaterial:this.flatMaterial,e}prepareShaders(o,e,t,s){if(!this.selectWater(s)){t.compile(this.mesh,e,o);return}const a=this.detailedMaterial,n=a.defines,l=s.reflections?{}:{NO_REFLECTIONS:1};try{a.defines=l,t.compile(this.mesh,e,o),a.defines={...l,STORM_SEA:1},t.compile(this.mesh,e,o)}finally{a.defines=n,a.needsUpdate=!0}}update(o,e,t,s,a,n,l,r,p){const c=o.ocean;if(!c)return;const f=this.selectWater(p);this.mesh.position.set(Math.round(e.x/.85)*.85,0,Math.round(e.z/.85)*.85),this.uniforms.elapsed.value=s;const w=this.uniforms.sun.value,S=ce(a,w);w.z=-w.z,this.uniforms.daylight.value=k.smoothstep(S,-.12,.3);const b=1-k.smoothstep(S,-.13,.04);if(this.uniforms.moonlight.value=b*b,b>0){const x=he(a,this.uniforms.moon.value);x.z=-x.z}if(this.uniforms.evening.value=fe(a),this.uniforms.golden.value=k.smoothstep(S,.015,.125)*(1-k.smoothstep(S,.31,.65)),c!==this.source){this.source=c,this.weatherRevision=-1,this.contactRefresh=void 0;for(const x of[...this.weather,this.near,this.far])x.revision=-1/0;for(const[x,u]of[[this.near,this.uniforms.nearMap.value],[this.far,this.uniforms.farMap.value]])x.refresh=void 0,u.set(0,0,0,0);this.splashes.length=0,this.lastBird=void 0}if(f&&c.weatherRevision!==this.weatherRevision){this.weatherRevision=c.weatherRevision,this.weatherRefresh=void 0;for(const x of this.weather)x.revision=-1/0}const h={x:e.x,z:-e.z},d=performance.now(),v=r?1/0:d+(f?Te:1);f&&(this.updateContacts(c,h,r?1/0:d+.35),this.updateWeather(c,h,s,r?1/0:d+1.6));const g=performance.now();if(this.updateShore(o,h,this.near,this.uniforms.nearMap.value,1.25,40,r?1/0:(g+v)/2),this.updateShore(o,h,this.far,this.uniforms.farMap.value,8,224,v),r||(this.shoreRefreshMaxMs=Math.max(this.shoreRefreshMaxMs,performance.now()-g)),!f){this.flatMaterial.uniforms.simple.value=+(p.water==="simple"),this.spray.visible=!1,this.lastBird=void 0,this.splashes.length=0;return}this.updateBird(o,t,s),this.uniforms.oceanFrontCount.value=Math.min(l?.length??0,E);for(let x=0;x<this.uniforms.oceanFrontCount.value;x++){const u=l[x];this.uniforms.oceanFrontCenter.value[x].set(u.center.x,u.center.z,u.strength,0),this.uniforms.oceanFrontAxis.value[x].set(u.heading.x,u.heading.z,1/u.halfLength,1/u.halfWidth)}const m=this.detailedMaterial;(n!==Object.hasOwn(m.defines,"STORM_SEA")||p.reflections!==!Object.hasOwn(m.defines,"NO_REFLECTIONS"))&&(m.defines={...n&&{STORM_SEA:1},...!p.reflections&&{NO_REFLECTIONS:1}},m.needsUpdate=!0)}perf(){return{shoreRefreshMaxMs:this.shoreRefreshMaxMs}}updateWeather(o,e,t,s){const a=Math.floor(e.x/(T*4))*4-M/2,n=Math.floor(e.z/(T*4))*4-M/2,l=Math.floor(t/U);if(s===1/0&&(this.weatherRefresh=void 0),!this.weatherPair.every((r,p)=>r.revision===l+p&&r.x===a&&r.z===n)){for(this.weatherRefresh??=this.rebuildWeather(o,a,n,l);performance.now()<s;)if(this.weatherRefresh.next().done){this.weatherRefresh=void 0;break}}this.uniforms.weatherBlend.value=k.clamp(t/U-this.weatherSlot,0,1)}*rebuildWeather(o,e,t,s){const a=[];for(let n=s;n<s+2;n++){const l=this.weather.find(c=>c.revision===n&&c.x===e&&c.z===t);if(l){a.push(l);continue}const r=this.weather.find(c=>!this.weatherPair.includes(c)&&!a.includes(c)),p=this.weatherPair.find(c=>c.revision===n);r.revision=-1/0;for(let c=0;c<M;c++)for(let f=0;f<M;f++){const w=(c*M*2+f)*4,S=p?e+f-p.x:-1,b=p?t+c-p.z:-1;if(p&&S>=0&&S<M&&b>=0&&b<M){const h=(b*M*2+S)*4;for(let d=0;d<4;d++)r.data[w+d]=p.data[h+d];r.data[w+M*4]=p.data[h+M*4]}else{const[h,d,v,g,m]=o.gridPoint(e+f,t+c,n);r.data[w]=h,r.data[w+1]=d,r.data[w+2]=v,r.data[w+3]=g,r.data[w+M*4]=m}yield}Object.assign(r,{x:e,z:t,revision:n}),r.texture.needsUpdate=!0,a.push(r)}this.weatherPair=a,this.weatherSlot=s,this.uniforms.weatherA.value=a[0].texture,this.uniforms.weatherB.value=a[1].texture,this.uniforms.weatherMap.value.set(e*T,t*T,1/(M*T),.5/M)}updateShore(o,e,t,s,a,n,l){l===1/0&&(t.refresh=void 0);const r=t.size;if(!t.refresh&&t.revision===o.shoreRevision&&t.foamRevision===this.foamRevision&&Math.abs(e.x-(t.x+r*a/2))<n&&Math.abs(e.z-(t.z+r*a/2))<n)return;const p=(Math.round(e.x/a)-r/2)*a,c=(Math.round(e.z/a)-r/2)*a;for(t.refresh??=this.rebuildShore(o,t,s,a,p,c);performance.now()<l;)if(t.refresh.next().done){t.refresh=void 0;break}}*rebuildShore(o,e,t,s,a,n){const l=o.ocean,r=o.shoreRevision,p=this.foamRevision,c=[...this.foamBands],f=e.size,w=(a-e.x)/s,S=(n-e.z)/s,b=o.shoreChangesSince(e.revision),h=Number.isFinite(e.revision);for(let v=0;v<f;v++)for(let g=0;g<f;g++){const m=a+g*s,x=n+v*s,u=g+w,y=v+S,C=h&&u>=0&&u<f&&y>=0&&y<f,R=y*f+u,F=C?e.coast[R]:l.coastAt(m,x),B=C&&b&&(m<b.min.x||m>b.max.x||x<b.min.z||x>b.max.z)?e.floor[R]:$((o.seaFloorAt(m,x,F,!0)+24)/32),D=v*f+g;e.nextCoast[D]=F,e.nextFloor[D]=B,yield}const d=e.nextData;for(let v=0;v<f;v++){for(let g=0;g<f;g++){const m=v*f+g,x=e.nextFloor[m];let u=$((e.nextCoast[m]+8)/32);const y=x*32/255-24;if(v>0&&v<f-1&&g>0&&g<f-1&&Math.abs(y)<=4&&u>=$(12/32)){const C=e.nextFloor[m+1]-e.nextFloor[m-1],R=e.nextFloor[m+f]-e.nextFloor[m-f],F=Math.hypot(C,R)*16/(255*s);F>.53&&(u=Math.min(u,$((8-y/F)/32)))}d[m*4]=x,d[m*4+1]=u,d[m*4+2]=0}yield}yield*this.paintShoreFoam(d,f,a,n,s,c),[e.coast,e.nextCoast]=[e.nextCoast,e.coast],[e.floor,e.nextFloor]=[e.nextFloor,e.floor],e.nextData=e.data,e.data=e.texture.image.data=d,Object.assign(e,{x:a,z:n,revision:r}),e.foamRevision=p,t.set(a,n,1/(f*s),.5/f),e.texture.needsUpdate=!0}*paintShoreFoam(o,e,t,s,a,n){for(const l of n)for(const{from:r,to:p,width:c,strength:f}of l){yield;const w=c+a*.58,S=Math.max(0,Math.ceil((Math.min(r.x,p.x)-t-w)/a)),b=Math.min(e-1,Math.floor((Math.max(r.x,p.x)-t+w)/a)),h=Math.max(0,Math.ceil((Math.min(r.z,p.z)-s-w)/a)),d=Math.min(e-1,Math.floor((Math.max(r.z,p.z)-s+w)/a));if(S>b||h>d)continue;const v=p.x-r.x,g=p.z-r.z,m=1/(v*v+g*g||1),x=f*Math.min(1,c*2.1/w);for(let u=h;u<=d;u++){for(let y=S;y<=b;y++){const C=t+y*a-r.x,R=s+u*a-r.z,F=Math.max(0,Math.min(1,(C*v+R*g)*m)),B=$(x*(1-Math.hypot(C-v*F,R-g*F)/w)),D=(u*e+y)*4+2;B>o[D]&&(o[D]=B)}yield}}}updateContacts(o,e,t){for(t===1/0&&(this.contactRefresh=void 0),this.contactRefresh??=this.sampleContacts(o,e);performance.now()<t;)if(this.contactRefresh.next().done){this.contactRefresh=void 0;break}}*sampleContacts(o,e){const t=yield*q([this.footprints.values(),o.contacts.values()],e,650,P),s=yield*q([o.schools.values()],e,450,L);this.uniforms.contactCount.value=t.length,t.forEach(({position:a,halfWidth:n,halfLength:l,heading:r},p)=>{this.uniforms.contacts.value[p].set(a.x,a.z,n,l),this.uniforms.headings.value[p]=r}),this.uniforms.schoolCount.value=s.length,s.forEach(({position:a,radius:n},l)=>{this.uniforms.schools.value[l].set(a.x,a.z,n,a.x*.89+a.z*.63)})}updateBird(o,e,t){const{position:s,mode:a,heading:n}=e,l=a==="swimming"||s.y<=j+2.25?o.waterAt(s.x,s.z,t):void 0,r=s.y-(l?.level??j),p=l?.type==="sea"&&l.depth>.22,c=this.lastBird,f=c?t-c.time:0;if(c&&(f<0||V(c.position,s)>45)&&(this.splashes.length=0),c&&l&&p&&f>0&&f<.2){const h=(c.clearance-r)/f;(c.clearance>.25&&r<=.25&&h>3.5||a==="plunging"&&c.mode!=="plunging"&&r<1.2)&&this.splashes.unshift({position:{...s,y:l.level},t,strength:k.clamp(.47+h*.055,.38,1)})}this.lastBird={position:s,time:t,clearance:r,mode:a};const w=p&&(a==="swimming"||r>=-.25&&r<2.25),S=c&&f>1e-6&&f<.2?V(c.position,s)/f:0,b=w?k.smoothstep(S,.1,6)*(1-.73*k.smoothstep(r,.1,2.25)):0;for((f>0||!w)&&this.uniforms.wake.value.set(s.x,s.z,Math.min(15,3+S*.55),b),this.uniforms.wakeDirection.value.set(Math.sin(n),Math.cos(n)),this.splashes.splice(N);this.splashes.length&&t-this.splashes[this.splashes.length-1].t>2.65;)this.splashes.pop();this.uniforms.splashCount.value=this.splashes.length,this.splashes.forEach(({position:h,t:d,strength:v},g)=>this.uniforms.splashes.value[g].set(h.x,h.z,d,v)),this.updateSpray(t)}updateSpray(o){const e=this.spray.geometry.getAttribute("position");let t=0;for(const{position:s,t:a,strength:n}of this.splashes){const l=o-a;if(!(l<0||l>.85))for(let r=0;r<ne;r++){const p=r*2.399963,c=(1.6+r%5*.61)*n,f=l*(2+r%7*.51)*n-5*l*l;f<0||e.setXYZ(t++,s.x+Math.sin(p)*c*l,s.y+f,-s.z-Math.cos(p)*c*l)}}this.spray.visible=t>0,this.spray.geometry.setDrawRange(0,t),t&&(e.needsUpdate=!0)}}const Be=(i,o)=>({x:(i.origin.x+o.origin.x)/2,z:(i.origin.z+o.origin.z)/2}),O={"sea-noon-channel":{heading:1.33,bearing:1.82,offshore:30,y:26,hour:12},"sea-golden-path":{heading:1.26,bearing:2.61,offshore:36,y:23,hour:20.03},"sea-storm-channel":{heading:1.34,bearing:2.25,offshore:27,y:20,hour:12,storm:!0},"sea-shallows-home":{heading:1.2,bearing:-2.02,offshore:25,y:28,hour:11.7}};function Ie(i,o,e){let t=0,s=i.coast[i.coast.length-1];for(const a of i.coast){const n=a.x-s.x,l=a.z-s.z,r=o*l-e*n;if(Math.abs(r)>1e-6){const p=(e*s.x-o*s.z)/r,c=(s.x*l-s.z*n)/r;p>=0&&p<=1&&(t=Math.max(t,c))}s=a}return t||i.farProxy.radius}class Le{constructor(o,e){this.manifests=o,this.queries=e,this.home=o.find(t=>t.id==="home-lookkit")??o.find(t=>t.id==="graybox-a")??o[0],this.neighbor=o.find(t=>t.id===(this.home.id==="graybox-a"?"graybox-b":"procedural-paris"))??o.find(t=>t!==this.home)??this.home}manifests;queries;key;storm;field;frontRevision;frontKey;home;neighbor;sync(o,e=o.tick*ue,t=o.weather,s,a){const n=!s&&t==="storm";if(this.key!==o.seed||this.storm!==n||this.field!==s||this.frontKey!==a||this.frontRevision!==s?.frontRevision||!this.queries.ocean){const l=this.key!==o.seed;this.key=o.seed,this.storm=n,this.field=s,this.frontRevision=s?.frontRevision,this.frontKey=a;const r=s??me(o.seed,this.manifests);if(n){const p=Be(this.home,this.neighbor);r.scheduleFront({id:"channel-front",startsAt:-100,durationSeconds:540,intensity:1,origin:{x:p.x-350,z:p.z-430},velocity:{x:3.5,z:4.3},halfLength:690,halfWidth:460,baseHeight:350,depth:800})}l||!this.queries.ocean?this.queries.ocean=new ve(r,this.manifests):this.queries.ocean.setWeather(r)}this.queries.ocean.time=e}placement(o,e){const t=Object.hasOwn(O,o)?O[o]:O["sea-shallows-home"],{origin:s}=this.home,a=Math.sin(t.bearing),n=Math.cos(t.bearing),l=Ie(this.home,a,n)+t.offshore,r=typeof e=="number"&&Number.isFinite(e)?Math.max(10,Math.min(250,e))-8:t.y;return{position:{x:s.x+a*l,y:s.y+r,z:s.z+n*l},heading:t.heading,hour:t.hour,weather:"storm"in t?"storm":"clear"}}registerShots(o,e,t){for(const s of Object.keys(O))o.screens.set(s,(a,n)=>{const l=this.placement(s,n.height);a.state.target=null,t(l.hour),a.state.weather=l.weather,a.teleport(l.position,l.heading),e()})}}function Ve(i){if(Object.hasOwn(O,i.screen))return re(i.gull.position,i.gull.heading)}function re(i,o){const e=Math.sin(o),t=Math.cos(o);return{position:{x:i.x-16*e-2.5*t,y:i.y+8,z:i.z-16*t+2.5*e},target:{x:i.x+29*e,y:i.y-10.5,z:i.z+29*t},fov:57}}const Y=/boat|dory|skiff|hull|ferry|trawler|rock|boulder|quay|pier/i,Ge=new W(0,1,0);function J(i){const o=typeof i=="object"&&i!==null&&"scene"in i?i.scene:i;if(!(o instanceof ze))return;const e=new Fe().setFromObject(o);return o.parent&&e.applyMatrix4(o.parent.matrixWorld.clone().invert()),e}function Q(i,o,{origin:e}){const{position:t,scale:s,heading:a=0}=o,n=new ke().compose(new W(e.x+t.x,e.y+t.y,-e.z-t.z),new We().setFromAxisAngle(Ge,-a),s?new W(s.x,s.y,s.z):new W(1,1,1));return i.clone().applyMatrix4(n)}const tt={layer:"sea",create(i,{horizon:o,gullShadow:e}){const t=i.children.find(h=>h instanceof ee&&h.geometry instanceof G&&h.geometry.parameters.width===42e3&&h.geometry.parameters.height===42e3&&h.position.y===xe&&h.rotation.x===-Math.PI/2&&h.material instanceof I&&"sky"in h.material.uniforms),s=t?.visible;t&&(t.visible=!1);const a=new Ne(o,e);i.add(a.mesh,a.spray);let n,l,r,p,c=K.get(i),f,w=0;function S(){f?.fov===57&&(f.fov=w,f.updateProjectionMatrix()),f=void 0}return{perf:()=>a.perf(),prepareShaders(h,d,v){a.prepareShaders(i,h,d,v)},connect(h){p=h.preview},syncWorld(h,d,v){d.length!==0&&(n!==h&&(n=h,l=new Le(d,h)),r=v,l?.sync(r,void 0,void 0,c?.field,b()))},registerShots(h,d){l?.registerShots(h,d,v=>{h.actions.get("set_hour")?.({hour:v})})},mountChunk(h,d,v){const g=[];d.shoreFoam?.length&&g.push(a.mountShoreFoam(d.shoreFoam,h.origin));for(const m of d.models??[]){if(m.seaContact===!1||!Y.test(m.assetKey))continue;const x=J(v.get(m.assetKey));x&&g.push(a.mountContact(Q(x,m,h)))}for(const m of d.instances??[]){if(!Y.test(m.assetKey))continue;const x=J(v.get(m.assetKey));if(x)for(const u of m.placements)g.push(a.mountContact(Q(x,u,h)))}return()=>{for(const m of g)m()}},update({seconds:h,camera:d,hour:v,weather:g,fixedView:m,quality:x}){if(!n||!l||!r)return;const u=p&&l.placement(p.shot??"sea-shallows-home"),y=u?re(u.position,u.heading):Ve(r);c=y?void 0:K.get(i),u?l.sync(r,h,u.weather):l.sync(r,c?.time,void 0,c?.field,b()),y?(d.position.set(y.position.x,y.position.y,-y.position.z),d.lookAt(y.target.x,y.target.y,-y.target.z),d instanceof Ce&&(f!==d&&(S(),f=d,w=d.fov),d.fov!==y.fov&&(d.fov=y.fov,d.updateProjectionMatrix()))):S(),a.update(n,d.position,u??r.gull,n.ocean?.time??h,u?.hour??v,c?c.fronts.length>0:(u?.weather??g)==="storm",c?.fronts,!!(m||y),x)},dispose(){S(),t&&s!==void 0&&(t.visible=s),n&&(n.ocean=void 0),a.dispose()}};function b(){return c?.fronts.map(({id:h,startsAt:d})=>`${h}:${d}`).join("|")}}};export{tt as effect};
