import{S as z}from"./storm-shade-4exgMyBw.js";import{q as y,r as oe,t as V,h as se,l as E,V as M,b as ae,M as Z,o as I,n as C,u as A,v as L,w as ne,L as ie,P as H,B as re,x as ce,y as le,z as he,O as fe,p as pe,E as de,I as ve,j as ue,k as me,Q as xe,J as ge}from"./index-qmOD1jXO.js";import{b as G}from"./storm-cloud-CgEFPEzC.js";const F=18,O=12,$=4,Q=t=>`
  a = (${t.calm} + ${t.storm} * state.b * state.b)
      * (0.65 + 0.35 * dot(vec2(${t.x.toFixed(2)}, ${t.z.toFixed(2)}), state.rg * 2.0 - 1.0));
  d = vec2(${t.x.toFixed(2)}, ${t.z.toFixed(2)});
  phase = ${t.k} * dot(d, p) - ${t.speed} * elapsed + ${t.phase.toFixed(2)};
`,we=y.map(t=>`
  ${Q(t)}
  displacement += vec3(d.x * ${V} * cos(phase), sin(phase), d.y * ${V} * cos(phase)) * a;
`).join(""),Y=`
  vec3 gerstner(vec2 p, vec4 state) {
    vec3 displacement = vec3(0.0);
    float a, phase;
    vec2 d;
    ${we}
    return displacement;
  }
`,ye=y.map(t=>`
    ${Q(t)}
    curvature = a * ${t.k*t.k};
    height += a * sin(phase);
    peak += a;
    convexity += curvature * sin(phase);
    maxConvexity += curvature;
    slope += d * a * ${t.k} * cos(phase);
`).join(""),be=`
  uniform float elapsed, weatherBlend;
  uniform sampler2D weatherA, weatherB;
  uniform vec4 weatherMap;
  varying vec3 vWorld;
  varying vec4 vWeather;
  varying float vWindFoam;
#ifdef STORM_SEA
  varying vec2 vWavePosition;
#endif

  ${Y}

  void main() {
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    vec2 p = vec2(vWorld.x, -vWorld.z);
    vec2 uv = (p - weatherMap.xy) * weatherMap.z + weatherMap.w;
    uv.x = clamp(uv.x, weatherMap.w, 1.0 - weatherMap.w) * 0.5;
    vWeather = mix(texture2D(weatherA, uv), texture2D(weatherB, uv), weatherBlend);
    uv.x += 0.5;
    vWindFoam = mix(texture2D(weatherA, uv).r, texture2D(weatherB, uv).r, weatherBlend);
    vec2 q = p;
    for (int i = 0; i < ${oe}; ++i) q = p - gerstner(q, vWeather).xz;
#ifdef STORM_SEA
    vWavePosition = q;
#endif
    vWorld.y += gerstner(q, vWeather).y;
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
  }
`,Se=`
  uniform float elapsed, daylight, golden;
  uniform vec3 sky, sun;
  uniform sampler2D nearShore, farShore;
  uniform vec4 nearMap, farMap;
  uniform int contactCount, schoolCount, splashCount;
  uniform vec4 contacts[${F}], schools[${O}], splashes[${$}];
  uniform float headings[${F}];
  uniform vec4 wake;
  uniform vec2 wakeDirection;
  varying vec3 vWorld;
  varying vec4 vWeather;
  varying float vWindFoam;
#ifdef STORM_SEA
  varying vec2 vWavePosition;

  ${Y}
#endif

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

  vec2 shore(vec2 p, sampler2D tex, vec4 mapping) {
    vec2 uv = (p - mapping.xy) * mapping.z + mapping.w;
    vec2 nearestEdge = min(uv, 1.0 - uv);
    float blend = smoothstep(0.0, 0.07, min(nearestEdge.x, nearestEdge.y));
    vec2 encoded = texture2D(tex, uv).rg;
    return mix(vec2(-24.0, 24.0), encoded * 32.0 + vec2(-24.0, -8.0), blend);
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
  uniform vec4 oceanFrontCenter[${z}], oceanFrontAxis[${z}];
  float stormFootprint(vec2 point) {
    if (oceanFrontCount == 0) return 1.0;
    float strength = 0.0;
    for (int i = 0; i < ${z}; i++) {
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
    ${ye}
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
    vec2 shoreData = mix(shore(p, farShore, farMap), shore(p, nearShore, nearMap),
      smoothstep(0.07, 0.18, min(nearEdge.x, nearEdge.y)));
    float depth = max(0.0, vWorld.y - shoreData.x);

    float warp = noise(p * 0.12 - wind * elapsed * 0.052);
    float drift = noise(p * 0.036 + vec2(0.017, -0.011) * elapsed);
    vec2 primaryDir = vec2(${y[0].x.toFixed(2)}, ${y[0].z.toFixed(2)});
    vec2 crossDir = vec2(${y[1].x.toFixed(2)}, ${y[1].z.toFixed(2)});
    float primary = dot(p, primaryDir) * ${y[0].k} - elapsed * ${y[0].speed} + ${y[0].phase.toFixed(2)};
    float crossing = dot(p, crossDir) * ${y[1].k} - elapsed * ${y[1].speed} + ${y[1].phase.toFixed(2)};
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

    vec3 bed = mix(vec3(0.018, 0.45, 0.36), vec3(0.060, 0.62, 0.46), warp);
    vec3 sandTint = mix(vec3(0.18, 0.44, 0.195), vec3(0.28, 0.60, 0.36), drift);
    bed = mix(bed, sandTint, (1.0 - smoothstep(0.05, 1.55, depth)) * (0.38 + 0.37 * warp));
    vec3 shelf = vec3(0.006, 0.365, 0.404);
    vec3 channel = vec3(0.005, 0.179, 0.345);
    vec3 deep = mix(vec3(0.004, 0.060, 0.235), vec3(0.011, 0.127, 0.355), drift);
    vec3 color = mix(bed, shelf, smoothstep(0.65, 4.4, depth));
    color = mix(color, channel, smoothstep(3.1, 10.2, depth));
    color = mix(color, deep, smoothstep(9.0, 23.0, depth));
    float bands = smoothstep(-0.68, 0.77, broad);
    float faceLight = ripple * (0.56 + 0.44 * warp);
    float facetLight = smoothstep(-0.08, 0.44, facets.x) * smoothstep(0.38, 0.73, facets.z) * facetVisibility;
    color *= (0.78 + 0.36 * bands) * (1.0 + (0.16 + 0.11 * swell) * faceLight);
    color += vec3(0.013, 0.072, 0.108) * max(waveEdges * 0.62, facetLight * 0.72) * distanceFade;
    float cloudShade = smoothstep(0.14, 0.86, shade);
    color = mix(color * vec3(0.94, 0.70, 0.61), color, cloudShade);
    color *= mix(vec3(0.39, 0.50, 0.70), vec3(1.0), daylight);
    vec3 reflectedSky = mix(vec3(0.031, 0.104, 0.216), vec3(0.048, 0.190, 0.445), cloudShade);
    reflectedSky = mix(reflectedSky, sky * vec3(0.35, 0.55, 0.85), 0.23);
    color = mix(color, reflectedSky, fresnel * (0.31 + 0.13 * clamp(faceLight, -0.5, 0.5)));

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
      float runupPhase = elapsed * ${y[0].speed} - dot(shorePoint, primaryDir) * ${y[0].k};
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
    float foam = max(beach, caps);

    for (int i = 0; i < ${F}; ++i) {
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
    for (int i = 0; i < ${O}; ++i) {
      if (i >= schoolCount) break;
      vec4 school = schools[i];
      float radius = length(p - school.xy);
      if (radius > school.z) continue;
      float ring = sin(radius * 4.2 - elapsed * 5.8 + school.w);
      rings = max(rings, smoothstep(0.78, 0.97, ring) * (1.0 - smoothstep(school.z * 0.24, school.z, radius)));
    }
    for (int i = 0; i < ${$}; ++i) {
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

    vec3 halfAngle = normalize(sun + view);
    float spec = max(0.0, dot(halfAngle, normal));
    float sunAxis = dot(normalize(-view.xz + vec2(1e-6)), normalize(sun.xz));
    float lane = smoothstep(0.948, 0.9996, sunAxis);
    float glaze = pow(spec, 48.0) * (0.030 + 0.08 * golden);
    float flashes = smoothstep(0.25, 0.72, bands * 0.30 + grain * 0.24 + waveEdges * 0.32 + facets.z * 0.28);
    float glitter = pow(spec, mix(225.0, 230.0, golden)) * flashes * (0.82 + 4.25 * golden);
    vec3 highlight = mix(vec3(0.64, 0.83, 0.99), vec3(1.0, 0.58, 0.14), golden);
    color += highlight * (glaze + glitter) * lane * cloudShade * daylight;
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
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,S=40,Me=144,U=3,T=t=>Math.round(255*Math.max(0,Math.min(1,t))),_=(t,s)=>Math.hypot(t.x-s.x,t.z-s.z);function B(t,s=t){const e=new Uint8Array(s*t*4),o=new ne(e,s,t);return o.minFilter=o.magFilter=ie,{data:e,texture:o,size:t,x:1/0,z:1/0,revision:-1/0}}function j(t){return{...B(t),nextData:new Uint8Array(t*t*4),floor:new Uint8Array(t*t),nextFloor:new Uint8Array(t*t),coast:new Float64Array(t*t),nextCoast:new Float64Array(t*t),refresh:void 0}}function ze(){const t=[0];let s=.85;for(;t[t.length-1]<22e3;){const i=t[t.length-1];t.push(i+s),i>=44&&(s*=1.14)}const e=[...t.slice(1).reverse().map(i=>-i),...t],o=e.length-1,a=new H(1,1,o,o);a.rotateX(-Math.PI/2);const n=a.getAttribute("position");for(let i=0;i<=o;i++)for(let r=0;r<=o;r++)n.setXYZ(i*(o+1)+r,e[r],0,e[i]);return a}function Fe(t,s){const e=Math.PI*(t-5)/16,o=Math.asin(Math.max(.001,Math.sin(e)*.88)),a=-1.3+e*.94;return s.set(Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o)),Math.sin(e)}const D=t=>Array.from({length:t},()=>new E),J=18;function ke(){const t=new re;t.setAttribute("position",new ce(new Float32Array($*J*3),3));const s=new I({transparent:!0,depthWrite:!1,vertexShader:`
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
    `}),e=new le(t,s);return e.visible=!1,e.frustumCulled=!1,e}class Ce{weather=[B(S,S*2),B(S,S*2)];near=j(Me);far=j(208);footprints=new Map;source;weatherRevision=-1;shoreRefreshMaxMs=0;splashes=[];lastBird;uniforms={elapsed:{value:0},daylight:{value:1},golden:{value:0},sky:{value:new ae},sun:{value:new M},weatherA:{value:this.weather[0].texture},weatherB:{value:this.weather[1].texture},weatherMap:{value:new E},weatherBlend:{value:0},nearShore:{value:this.near.texture},nearMap:{value:new E},farShore:{value:this.far.texture},farMap:{value:new E},contacts:{value:D(F)},contactCount:{value:0},headings:{value:new Float32Array(F)},oceanFrontCount:{value:0},oceanFrontCenter:{value:D(z)},oceanFrontAxis:{value:D(z)},schools:{value:D(O)},schoolCount:{value:0},splashes:{value:D($)},splashCount:{value:0},wake:{value:new E},wakeDirection:{value:new se}};mesh=new Z(ze(),new I({uniforms:this.uniforms,vertexShader:be,fragmentShader:Se}));spray=ke();constructor(s){this.uniforms.sky.value=s,this.mesh.frustumCulled=!1,this.mesh.name="Sea",this.mesh.material.userData.stormWorldPosition="vWorld",this.mesh.material.userData.stormWater=!0,this.spray.name="Sea spray"}mountContact(s){if(s.isEmpty()||s.min.y>.8||s.max.y<-.8)return()=>{};const e=Symbol(),o=s.getCenter(new M),a=s.getSize(new M);return this.footprints.set(e,{position:{x:o.x,z:-o.z},halfWidth:Math.max(.3,a.x*.52),halfLength:Math.max(.3,a.z*.52),heading:0}),()=>{this.footprints.delete(e)}}dispose(){this.mesh.removeFromParent(),this.spray.removeFromParent(),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.spray.geometry.dispose(),this.spray.material.dispose();for(const s of[...this.weather,this.near,this.far])s.texture.dispose()}update(s,e,o,a,n,i,r,h=!1){const c=s.ocean;if(!c)return;if(c!==this.source){this.source=c;for(const f of[...this.weather,this.near,this.far])f.revision=-1/0;for(const[f,l]of[[this.near,this.uniforms.nearMap.value],[this.far,this.uniforms.farMap.value]])f.refresh=void 0,l.set(0,0,0,0);this.splashes.length=0,this.lastBird=void 0}if(c.weatherRevision!==this.weatherRevision){this.weatherRevision=c.weatherRevision;for(const f of this.weather)f.revision=-1/0}const p={x:e.x,z:-e.z};this.mesh.position.set(Math.round(e.x/.85)*.85,0,Math.round(e.z/.85)*.85),this.updateWeather(c,p,a);const m=performance.now();this.updateShore(s,p,this.near,this.uniforms.nearMap.value,1.25,40,h?1/0:m+U/2),this.updateShore(s,p,this.far,this.uniforms.farMap.value,8,224,h?1/0:m+U),h||(this.shoreRefreshMaxMs=Math.max(this.shoreRefreshMaxMs,performance.now()-m)),this.updateContacts(c,p),this.updateBird(s,o,a),this.uniforms.elapsed.value=a,this.uniforms.oceanFrontCount.value=Math.min(r?.length??0,z);for(let f=0;f<this.uniforms.oceanFrontCount.value;f++){const l=r[f];this.uniforms.oceanFrontCenter.value[f].set(l.center.x,l.center.z,l.strength,0),this.uniforms.oceanFrontAxis.value[f].set(l.heading.x,l.heading.z,1/l.halfLength,1/l.halfWidth)}const w=this.mesh.material;i!==Object.hasOwn(w.defines,"STORM_SEA")&&(w.defines=i?{STORM_SEA:1}:{},w.needsUpdate=!0);const b=Fe(n,this.uniforms.sun.value);this.uniforms.daylight.value=C.smoothstep(b,-.12,.35),this.uniforms.golden.value=(1-C.smoothstep(b,.12,.56))*(b>0?1:0)}perf(){return{shoreRefreshMaxMs:this.shoreRefreshMaxMs}}updateWeather(s,e,o){const a=Math.floor(e.x/(A*4))*4-S/2,n=Math.floor(e.z/(A*4))*4-S/2,i=Math.floor(o/L);for(let r=i;r<i+2;r++){const h=this.weather[(r%2+2)%2];if(!(h.revision===r&&h.x===a&&h.z===n)){for(let c=0;c<S;c++)for(let p=0;p<S;p++){const[m,w,b,f,l]=s.gridPoint(a+p,n+c,r),d=(c*S*2+p)*4;h.data[d]=m,h.data[d+1]=w,h.data[d+2]=b,h.data[d+3]=f,h.data[d+S*4]=l}Object.assign(h,{x:a,z:n,revision:r}),h.texture.needsUpdate=!0}}this.uniforms.weatherA.value=this.weather[(i%2+2)%2].texture,this.uniforms.weatherB.value=this.weather[(i%2+3)%2].texture,this.uniforms.weatherMap.value.set(a*A,n*A,1/(S*A),.5/S),this.uniforms.weatherBlend.value=o/L-i}updateShore(s,e,o,a,n,i,r){r===1/0&&(o.refresh=void 0);const h=o.size;if(!o.refresh&&o.revision===s.shoreRevision&&Math.abs(e.x-(o.x+h*n/2))<i&&Math.abs(e.z-(o.z+h*n/2))<i)return;const c=(Math.round(e.x/n)-h/2)*n,p=(Math.round(e.z/n)-h/2)*n;for(o.refresh??=this.rebuildShore(s,o,a,n,c,p);performance.now()<r;)if(o.refresh.next().done){o.refresh=void 0;break}}*rebuildShore(s,e,o,a,n,i){const r=s.ocean,h=s.shoreRevision,c=e.size,p=(n-e.x)/a,m=(i-e.z)/a,w=s.shoreChangesSince(e.revision),b=Number.isFinite(e.revision);for(let l=0;l<c;l++)for(let d=0;d<c;d++){const v=n+d*a,x=i+l*a,u=d+p,g=l+m,R=b&&u>=0&&u<c&&g>=0&&g<c,P=g*c+u,k=R?e.coast[P]:r.coastAt(v,x),te=R&&w&&(v<w.min.x||v>w.max.x||x<w.min.z||x>w.max.z)?e.floor[P]:T((s.seaFloorAt(v,x,k)+24)/32),N=l*c+d;e.nextCoast[N]=k,e.nextFloor[N]=te,(d&7)===7&&(yield)}const f=e.nextData;for(let l=0;l<c;l++){for(let d=0;d<c;d++){const v=l*c+d,x=e.nextFloor[v];let u=T((e.nextCoast[v]+8)/32);const g=x*32/255-24;if(l>0&&l<c-1&&d>0&&d<c-1&&Math.abs(g)<=4&&u>=T(12/32)){const R=e.nextFloor[v+1]-e.nextFloor[v-1],P=e.nextFloor[v+c]-e.nextFloor[v-c],k=Math.hypot(R,P)*16/(255*a);k>.53&&(u=Math.min(u,T((8-g/k)/32)))}f[v*4]=x,f[v*4+1]=u}yield}[e.coast,e.nextCoast]=[e.nextCoast,e.coast],[e.floor,e.nextFloor]=[e.nextFloor,e.floor],e.nextData=e.data,e.data=e.texture.image.data=f,Object.assign(e,{x:n,z:i,revision:h}),o.set(n,i,1/(c*a),.5/c),e.texture.needsUpdate=!0}updateContacts(s,e){const o=[...this.footprints.values(),...s.contacts.values()].map(n=>({contact:n,distance:_(n.position,e)})).filter(n=>n.distance<650).sort((n,i)=>n.distance-i.distance).slice(0,F);this.uniforms.contactCount.value=o.length,o.forEach(({contact:{position:n,halfWidth:i,halfLength:r,heading:h}},c)=>{this.uniforms.contacts.value[c].set(n.x,n.z,i,r),this.uniforms.headings.value[c]=h});const a=[...s.schools.values()].map(n=>({school:n,distance:_(n.position,e)})).filter(n=>n.distance<450).sort((n,i)=>n.distance-i.distance).slice(0,O);this.uniforms.schoolCount.value=a.length,a.forEach(({school:{position:n,radius:i}},r)=>{this.uniforms.schools.value[r].set(n.x,n.z,i,n.x*.89+n.z*.63)})}updateBird(s,e,o){const{position:a,mode:n,heading:i}=e,r=s.waterAt(a.x,a.z,o),h=a.y-r.level,c=r.type==="sea"&&r.depth>.22,p=this.lastBird,m=p?o-p.time:0;if(p&&(m<0||_(p.position,a)>45)&&(this.splashes.length=0),p&&c&&m>0&&m<.2){const l=(p.clearance-h)/m;(p.clearance>.25&&h<=.25&&l>3.5||n==="plunging"&&p.mode!=="plunging"&&h<1.2)&&this.splashes.unshift({position:{...a,y:r.level},t:o,strength:C.clamp(.47+l*.055,.38,1)})}this.lastBird={position:a,time:o,clearance:h,mode:n};const w=c&&(n==="swimming"||h>=-.25&&h<2.25),b=p&&m>1e-6&&m<.2?_(p.position,a)/m:0,f=w?C.smoothstep(b,.1,6)*(1-.73*C.smoothstep(h,.1,2.25)):0;for((m>0||!w)&&this.uniforms.wake.value.set(a.x,a.z,Math.min(15,3+b*.55),f),this.uniforms.wakeDirection.value.set(Math.sin(i),Math.cos(i)),this.splashes.splice($);this.splashes.length&&o-this.splashes[this.splashes.length-1].t>2.65;)this.splashes.pop();this.uniforms.splashCount.value=this.splashes.length,this.splashes.forEach(({position:l,t:d,strength:v},x)=>this.uniforms.splashes.value[x].set(l.x,l.z,d,v)),this.updateSpray(o)}updateSpray(s){const e=this.spray.geometry.getAttribute("position");let o=0;for(const{position:a,t:n,strength:i}of this.splashes){const r=s-n;if(!(r<0||r>.85))for(let h=0;h<J;h++){const c=h*2.399963,p=(1.6+h%5*.61)*i,m=r*(2+h%7*.51)*i-5*r*r;m<0||e.setXYZ(o++,a.x+Math.sin(c)*p*r,a.y+m,-a.z-Math.cos(c)*p*r)}}this.spray.visible=o>0,this.spray.geometry.setDrawRange(0,o),o&&(e.needsUpdate=!0)}}const Ae=(t,s)=>({x:(t.origin.x+s.origin.x)/2,z:(t.origin.z+s.origin.z)/2}),W={"sea-noon-channel":{heading:1.33,bearing:1.82,offshore:30,y:26,hour:12},"sea-golden-path":{heading:1.26,bearing:2.61,offshore:36,y:23,hour:20.03},"sea-storm-channel":{heading:1.34,bearing:2.25,offshore:27,y:20,hour:12,storm:!0},"sea-shallows-home":{heading:1.2,bearing:-2.02,offshore:25,y:28,hour:11.7}};function De(t,s,e){let o=0,a=t.coast[t.coast.length-1];for(const n of t.coast){const i=n.x-a.x,r=n.z-a.z,h=s*r-e*i;if(Math.abs(h)>1e-6){const c=(e*a.x-s*a.z)/h,p=(a.x*r-a.z*i)/h;c>=0&&c<=1&&(o=Math.max(o,p))}a=n}return o||t.farProxy.radius}class Ee{constructor(s,e){this.manifests=s,this.queries=e,this.home=s.find(o=>o.id==="home-lookkit")??s.find(o=>o.id==="graybox-a")??s[0],this.neighbor=s.find(o=>o.id===(this.home.id==="graybox-a"?"graybox-b":"procedural-paris"))??s.find(o=>o!==this.home)??this.home}manifests;queries;key;storm;field;frontRevision;frontKey;home;neighbor;sync(s,e=s.tick*pe,o=s.weather,a,n){const i=!a&&o==="storm";if(this.key!==s.seed||this.storm!==i||this.field!==a||this.frontKey!==n||this.frontRevision!==a?.frontRevision||!this.queries.ocean){const r=this.key!==s.seed;this.key=s.seed,this.storm=i,this.field=a,this.frontRevision=a?.frontRevision,this.frontKey=n;const h=a??he(s.seed,this.manifests);if(i){const c=Ae(this.home,this.neighbor);h.scheduleFront({id:"channel-front",startsAt:-100,durationSeconds:540,intensity:1,origin:{x:c.x-350,z:c.z-430},velocity:{x:3.5,z:4.3},halfLength:690,halfWidth:460,baseHeight:350,depth:800})}r||!this.queries.ocean?this.queries.ocean=new fe(h,this.manifests):this.queries.ocean.setWeather(h)}this.queries.ocean.time=e}placement(s,e){const o=Object.hasOwn(W,s)?W[s]:W["sea-shallows-home"],{origin:a}=this.home,n=Math.sin(o.bearing),i=Math.cos(o.bearing),r=De(this.home,n,i)+o.offshore,h=typeof e=="number"&&Number.isFinite(e)?Math.max(10,Math.min(250,e))-8:o.y;return{position:{x:a.x+n*r,y:a.y+h,z:a.z+i*r},heading:o.heading,hour:o.hour,weather:"storm"in o?"storm":"clear"}}registerShots(s,e,o){for(const a of Object.keys(W))s.screens.set(a,(n,i)=>{const r=this.placement(a,i.height);n.state.target=null,o(r.hour),n.state.weather=r.weather,n.teleport(r.position,r.heading),e()})}}function We(t){if(Object.hasOwn(W,t.screen))return ee(t.gull.position,t.gull.heading)}function ee(t,s){const e=Math.sin(s),o=Math.cos(s);return{position:{x:t.x-16*e-2.5*o,y:t.y+8,z:t.z-16*o+2.5*e},target:{x:t.x+29*e,y:t.y-10.5,z:t.z+29*o},fov:57}}const X=/boat|dory|skiff|hull|ferry|trawler|rock|boulder|quay|pier/i,$e=new M(0,1,0);function K(t){const s=typeof t=="object"&&t!==null&&"scene"in t?t.scene:t;if(!(s instanceof ve))return;const e=new ue().setFromObject(s);return s.parent&&e.applyMatrix4(s.parent.matrixWorld.clone().invert()),e}function q(t,s,{origin:e}){const{position:o,scale:a,heading:n=0}=s,i=new me().compose(new M(e.x+o.x,e.y+o.y,-e.z-o.z),new xe().setFromAxisAngle($e,-n),a?new M(a.x,a.y,a.z):new M(1,1,1));return t.clone().applyMatrix4(i)}const _e={layer:"sea",create(t,{horizon:s}){const e=t.children.find(f=>f instanceof Z&&f.geometry instanceof H&&f.geometry.parameters.width===42e3&&f.geometry.parameters.height===42e3&&f.position.y===de&&f.rotation.x===-Math.PI/2&&f.material instanceof I&&"sky"in f.material.uniforms),o=e?.visible;e&&(e.visible=!1);const a=new Ce(s);t.add(a.mesh,a.spray);let n,i,r,h,c=G.get(t),p,m=0;function w(){p?.fov===57&&(p.fov=m,p.updateProjectionMatrix()),p=void 0}return{perf:()=>a.perf(),prepareShaders(f,l){const d=a.mesh.material,v=d.defines;try{d.defines={...v,STORM_SEA:1},l.compile(a.mesh,f,t)}finally{d.defines=v,d.needsUpdate=!0}},connect(f){h=f.preview},syncWorld(f,l,d){l.length!==0&&(n!==f&&(n=f,i=new Ee(l,f)),r=d,i?.sync(r,void 0,void 0,c?.field,b()))},registerShots(f,l){i?.registerShots(f,l,d=>{f.actions.get("set_hour")?.({hour:d})})},mountChunk(f,l,d){const v=[];for(const x of l.models??[]){if(!X.test(x.assetKey))continue;const u=K(d.get(x.assetKey));u&&v.push(a.mountContact(q(u,x,f)))}for(const x of l.instances??[]){if(!X.test(x.assetKey))continue;const u=K(d.get(x.assetKey));if(u)for(const g of x.placements)v.push(a.mountContact(q(u,g,f)))}return()=>{for(const x of v)x()}},update({seconds:f,camera:l,hour:d,weather:v,fixedView:x}){if(!n||!i||!r)return;const u=h&&i.placement(h.shot??"sea-shallows-home"),g=u?ee(u.position,u.heading):We(r);c=g?void 0:G.get(t),u?i.sync(r,f,u.weather):i.sync(r,c?.time,void 0,c?.field,b()),g?(l.position.set(g.position.x,g.position.y,-g.position.z),l.lookAt(g.target.x,g.target.y,-g.target.z),l instanceof ge&&(p!==l&&(w(),p=l,m=l.fov),l.fov!==g.fov&&(l.fov=g.fov,l.updateProjectionMatrix()))):w(),a.update(n,l.position,u??r.gull,n.ocean?.time??f,u?.hour??d,c?c.fronts.length>0:(u?.weather??v)==="storm",c?.fronts,x||!!g)},dispose(){w(),e&&o!==void 0&&(e.visible=o),n&&(n.ocean=void 0),a.dispose()}};function b(){return c?.fronts.map(({id:f,startsAt:l})=>`${f}:${l}`).join("|")}}};export{_e as effect};
