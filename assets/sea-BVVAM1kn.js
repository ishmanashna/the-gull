import{s as ie}from"./lights-DHlWvTet.js";import{S as E}from"./storm-shade-DNpHE5wh.js";import{u as S,v as ne,w as U,P as G,h as re,l as _,V as A,b as ce,p as N,M as J,n as R,x as P,y as j,z as X,B as le,E as he,J as fe,K as de,L as pe,N as ve,Q as me,t as ue,X as xe,O as ge,j as we,k as ye,Y as be,Z as Me}from"./index-yC7XslmD.js";import{b as K}from"./storm-cloud-CgEFPEzC.js";const D=18,V=12,B=4,ee=a=>`
  a = (${a.calm} + ${a.storm} * state.b * state.b)
      * (0.65 + 0.35 * dot(vec2(${a.x.toFixed(2)}, ${a.z.toFixed(2)}), state.rg * 2.0 - 1.0));
  d = vec2(${a.x.toFixed(2)}, ${a.z.toFixed(2)});
  phase = ${a.k} * dot(d, p) - ${a.speed} * elapsed + ${a.phase.toFixed(2)};
`,Se=S.map(a=>`
  ${ee(a)}
  displacement += vec3(d.x * ${U} * cos(phase), sin(phase), d.y * ${U} * cos(phase)) * a;
`).join(""),te=`
  vec3 gerstner(vec2 p, vec4 state) {
    vec3 displacement = vec3(0.0);
    float a, phase;
    vec2 d;
    ${Se}
    return displacement;
  }
`,ze=S.map(a=>`
    ${ee(a)}
    curvature = a * ${a.k*a.k};
    height += a * sin(phase);
    peak += a;
    convexity += curvature * sin(phase);
    maxConvexity += curvature;
    slope += d * a * ${a.k} * cos(phase);
`).join(""),Fe=`
  uniform float elapsed, weatherBlend;
  uniform sampler2D weatherA, weatherB;
  uniform vec4 weatherMap;
  varying vec3 vWorld;
  varying vec4 vWeather;
  varying float vWindFoam;
#ifdef STORM_SEA
  varying vec2 vWavePosition;
#endif

  ${te}

  void main() {
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    vec2 p = vec2(vWorld.x, -vWorld.z);
    vec2 uv = (p - weatherMap.xy) * weatherMap.z + weatherMap.w;
    uv.x = clamp(uv.x, weatherMap.w, 1.0 - weatherMap.w) * 0.5;
    vWeather = mix(texture2D(weatherA, uv), texture2D(weatherB, uv), weatherBlend);
    uv.x += 0.5;
    vWindFoam = mix(texture2D(weatherA, uv).r, texture2D(weatherB, uv).r, weatherBlend);
    vec2 q = p;
    for (int i = 0; i < ${ne}; ++i) q = p - gerstner(q, vWeather).xz;
#ifdef STORM_SEA
    vWavePosition = q;
#endif
    vWorld.y += gerstner(q, vWeather).y;
    gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
  }
`,ke=`
  uniform float elapsed, daylight, golden;
  uniform vec3 sky, sun;
  uniform sampler2D nearShore, farShore;
  uniform vec4 nearMap, farMap;
  uniform int contactCount, schoolCount, splashCount;
  uniform vec4 contacts[${D}], schools[${V}], splashes[${B}];
  uniform float headings[${D}];
  uniform vec4 wake;
  uniform vec2 wakeDirection;
  varying vec3 vWorld;
  varying vec4 vWeather;
  varying float vWindFoam;
#ifdef STORM_SEA
  varying vec2 vWavePosition;

  ${te}
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
    ${ze}
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
    vec2 primaryDir = vec2(${S[0].x.toFixed(2)}, ${S[0].z.toFixed(2)});
    vec2 crossDir = vec2(${S[1].x.toFixed(2)}, ${S[1].z.toFixed(2)});
    float primary = dot(p, primaryDir) * ${S[0].k} - elapsed * ${S[0].speed} + ${S[0].phase.toFixed(2)};
    float crossing = dot(p, crossDir) * ${S[1].k} - elapsed * ${S[1].speed} + ${S[1].phase.toFixed(2)};
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
      float runupPhase = elapsed * ${S[0].speed} - dot(shorePoint, primaryDir) * ${S[0].k};
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

    for (int i = 0; i < ${D}; ++i) {
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
    for (int i = 0; i < ${V}; ++i) {
      if (i >= schoolCount) break;
      vec4 school = schools[i];
      float radius = length(p - school.xy);
      if (radius > school.z) continue;
      float ring = sin(radius * 4.2 - elapsed * 5.8 + school.w);
      rings = max(rings, smoothstep(0.78, 0.97, ring) * (1.0 - smoothstep(school.z * 0.24, school.z, radius)));
    }
    for (int i = 0; i < ${B}; ++i) {
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

#ifndef NO_REFLECTIONS
    vec3 halfAngle = normalize(sun + view);
    float spec = max(0.0, dot(halfAngle, normal));
    float sunAxis = dot(normalize(-view.xz + vec2(1e-6)), normalize(sun.xz));
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
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,M=40,Ce=144,Re=3,T=a=>Math.round(255*Math.max(0,Math.min(1,a))),L=(a,s)=>Math.hypot(a.x-s.x,a.z-s.z);function*H(a,s,e,t){const o=[];for(const i of a)for(const n of i){const c=L(n.position,s);if(c<e){const r=o.findIndex(h=>h.range>c);r>=0?o.splice(r,0,{value:n,range:c}):o.length<t&&o.push({value:n,range:c}),o.length>t&&o.pop()}yield}return o.map(i=>i.value)}function oe(a,s=a){const e=new Uint8Array(s*a*4),t=new de(e,s,a);return t.minFilter=t.magFilter=pe,{data:e,texture:t,size:a,x:1/0,z:1/0,revision:-1/0}}function Z(a){return{...oe(a),nextData:new Uint8Array(a*a*4),floor:new Uint8Array(a*a),nextFloor:new Uint8Array(a*a),coast:new Float64Array(a*a),nextCoast:new Float64Array(a*a),foamRevision:-1,refresh:void 0}}function Ae(){const a=oe(M,M*2);for(let s=0;s<M;s++)for(let e=0;e<M;e++)a.data.set([128,128,0,255],(s*M*2+e)*4);return a.texture.needsUpdate=!0,a}function Ee(){const a=[0];let s=.85;for(;a[a.length-1]<22e3;){const n=a[a.length-1];a.push(n+s),n>=400?s*=1.36:n>=44&&(s*=1.14)}const e=[...a.slice(1).reverse().map(n=>-n),...a],t=e.length-1,o=new G(1,1,t,t);o.rotateX(-Math.PI/2);const i=o.getAttribute("position");for(let n=0;n<=t;n++)for(let c=0;c<=t;c++)i.setXYZ(n*(t+1)+c,e[c],0,e[n]);return o}const $=a=>Array.from({length:a},()=>new _),se=18;function De(){const a=new le;a.setAttribute("position",new he(new Float32Array(B*se*3),3));const s=new N({transparent:!0,depthWrite:!1,vertexShader:`
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
    `}),e=new fe(a,s);return e.visible=!1,e.frustumCulled=!1,e}class We{detailedGeometry=Ee();flatGeometry=new G(44e3,44e3).rotateX(-Math.PI/2);weather=Array.from({length:4},Ae);weatherPair=[this.weather[0],this.weather[1]];weatherRefresh;contactRefresh;weatherSlot=0;near=Z(Ce);far=Z(208);footprints=new Map;foamBands=new Set;foamRevision=0;source;weatherRevision=-1;shoreRefreshMaxMs=0;splashes=[];lastBird;uniforms={elapsed:{value:0},daylight:{value:1},golden:{value:0},sky:{value:new ce},sun:{value:new A},weatherA:{value:this.weather[0].texture},weatherB:{value:this.weather[1].texture},weatherMap:{value:new _},weatherBlend:{value:0},nearShore:{value:this.near.texture},nearMap:{value:new _},farShore:{value:this.far.texture},farMap:{value:new _},contacts:{value:$(D)},contactCount:{value:0},headings:{value:new Float32Array(D)},oceanFrontCount:{value:0},oceanFrontCenter:{value:$(E)},oceanFrontAxis:{value:$(E)},schools:{value:$(V)},schoolCount:{value:0},splashes:{value:$(B)},splashCount:{value:0},wake:{value:new _},wakeDirection:{value:new re}};detailedMaterial=new N({uniforms:this.uniforms,vertexShader:Fe,fragmentShader:ke});flatMaterial=new N({uniforms:{...this.uniforms,simple:{value:0}},vertexShader:`
      varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,fragmentShader:`
      uniform vec3 sky;
      uniform float daylight, elapsed, simple;
      uniform sampler2D nearShore, farShore;
      uniform vec4 nearMap, farMap;
      varying vec3 vWorld;

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
        if (simple > 0.5 && range < 180.0) {
          float wave = sin(dot(p, vec2(0.74, 1.1)) + elapsed * 1.4);
          wave *= sin(dot(p, vec2(0.13, -0.61)) - elapsed * 0.8);
          color *= 1.0 + wave * 0.13 * (1.0 - smoothstep(32.0, 180.0, range));
        }
        color = mix(color, sky, smoothstep(90.0, 4800.0, range) * 0.93);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `});mesh=new J(this.detailedGeometry,this.detailedMaterial);spray=De();constructor(s){this.uniforms.sky.value=s,this.mesh.frustumCulled=!1,this.mesh.name="Sea",this.mesh.material.userData.stormWorldPosition="vWorld",this.mesh.material.userData.stormWater=!0,this.spray.name="Sea spray"}mountContact(s){if(s.isEmpty()||s.min.y>.8||s.max.y<-.8)return()=>{};const e=Symbol(),t=s.getCenter(new A),o=s.getSize(new A);return this.footprints.set(e,{position:{x:t.x,z:-t.z},halfWidth:Math.max(.3,o.x*.52),halfLength:Math.max(.3,o.z*.52),heading:0}),()=>{this.footprints.delete(e)}}mountShoreFoam(s,e){const t=({x:i,z:n})=>({x:i+e.x,z:n+e.z}),o=s.map(i=>({...i,from:t(i.from),to:t(i.to)}));return this.foamBands.add(o),this.foamRevision++,()=>{this.foamBands.delete(o)&&this.foamRevision++}}dispose(){this.mesh.removeFromParent(),this.spray.removeFromParent(),this.detailedGeometry.dispose(),this.flatGeometry.dispose(),this.detailedMaterial.dispose(),this.flatMaterial.dispose(),this.spray.geometry.dispose(),this.spray.material.dispose();for(const s of[...this.weather,this.near,this.far])s.texture.dispose()}update(s,e,t,o,i,n,c,r,h){const l=s.ocean;if(!l)return;const d=h.water==="full";this.mesh.geometry=d?this.detailedGeometry:this.flatGeometry,this.mesh.material=d?this.detailedMaterial:this.flatMaterial,this.mesh.position.set(Math.round(e.x/.85)*.85,0,Math.round(e.z/.85)*.85),this.uniforms.elapsed.value=o;const w=this.uniforms.sun.value,b=ie(i,w);if(w.z=-w.z,this.uniforms.daylight.value=R.smoothstep(b,-.12,.3),this.uniforms.golden.value=R.smoothstep(b,.015,.125)*(1-R.smoothstep(b,.31,.65)),l!==this.source){this.source=l,this.weatherRevision=-1,this.contactRefresh=void 0;for(const m of[...this.weather,this.near,this.far])m.revision=-1/0;for(const[m,g]of[[this.near,this.uniforms.nearMap.value],[this.far,this.uniforms.farMap.value]])m.refresh=void 0,g.set(0,0,0,0);this.splashes.length=0,this.lastBird=void 0}if(d&&l.weatherRevision!==this.weatherRevision){this.weatherRevision=l.weatherRevision,this.weatherRefresh=void 0;for(const m of this.weather)m.revision=-1/0}const f={x:e.x,z:-e.z},p=performance.now(),u=r?1/0:p+(d?Re:1);d&&(this.updateContacts(l,f,r?1/0:p+.35),this.updateWeather(l,f,o,r?1/0:p+1.6));const x=performance.now();if(this.updateShore(s,f,this.near,this.uniforms.nearMap.value,1.25,40,r?1/0:(x+u)/2),this.updateShore(s,f,this.far,this.uniforms.farMap.value,8,224,u),r||(this.shoreRefreshMaxMs=Math.max(this.shoreRefreshMaxMs,performance.now()-x)),!d){this.flatMaterial.uniforms.simple.value=+(h.water==="simple"),this.spray.visible=!1,this.lastBird=void 0,this.splashes.length=0;return}this.updateBird(s,t,o),this.uniforms.oceanFrontCount.value=Math.min(c?.length??0,E);for(let m=0;m<this.uniforms.oceanFrontCount.value;m++){const g=c[m];this.uniforms.oceanFrontCenter.value[m].set(g.center.x,g.center.z,g.strength,0),this.uniforms.oceanFrontAxis.value[m].set(g.heading.x,g.heading.z,1/g.halfLength,1/g.halfWidth)}const v=this.detailedMaterial;(n!==Object.hasOwn(v.defines,"STORM_SEA")||h.reflections!==!Object.hasOwn(v.defines,"NO_REFLECTIONS"))&&(v.defines={...n&&{STORM_SEA:1},...!h.reflections&&{NO_REFLECTIONS:1}},v.needsUpdate=!0)}perf(){return{shoreRefreshMaxMs:this.shoreRefreshMaxMs}}updateWeather(s,e,t,o){const i=Math.floor(e.x/(P*4))*4-M/2,n=Math.floor(e.z/(P*4))*4-M/2,c=Math.floor(t/j);if(o===1/0&&(this.weatherRefresh=void 0),!this.weatherPair.every((r,h)=>r.revision===c+h&&r.x===i&&r.z===n)){for(this.weatherRefresh??=this.rebuildWeather(s,i,n,c);performance.now()<o;)if(this.weatherRefresh.next().done){this.weatherRefresh=void 0;break}}this.uniforms.weatherBlend.value=R.clamp(t/j-this.weatherSlot,0,1)}*rebuildWeather(s,e,t,o){const i=[];for(let n=o;n<o+2;n++){const c=this.weather.find(l=>l.revision===n&&l.x===e&&l.z===t);if(c){i.push(c);continue}const r=this.weather.find(l=>!this.weatherPair.includes(l)&&!i.includes(l)),h=this.weatherPair.find(l=>l.revision===n);r.revision=-1/0;for(let l=0;l<M;l++)for(let d=0;d<M;d++){const w=(l*M*2+d)*4,b=h?e+d-h.x:-1,f=h?t+l-h.z:-1;if(h&&b>=0&&b<M&&f>=0&&f<M){const p=(f*M*2+b)*4;for(let u=0;u<4;u++)r.data[w+u]=h.data[p+u];r.data[w+M*4]=h.data[p+M*4]}else{const[p,u,x,v,m]=s.gridPoint(e+d,t+l,n);r.data[w]=p,r.data[w+1]=u,r.data[w+2]=x,r.data[w+3]=v,r.data[w+M*4]=m}yield}Object.assign(r,{x:e,z:t,revision:n}),r.texture.needsUpdate=!0,i.push(r)}this.weatherPair=i,this.weatherSlot=o,this.uniforms.weatherA.value=i[0].texture,this.uniforms.weatherB.value=i[1].texture,this.uniforms.weatherMap.value.set(e*P,t*P,1/(M*P),.5/M)}updateShore(s,e,t,o,i,n,c){c===1/0&&(t.refresh=void 0);const r=t.size;if(!t.refresh&&t.revision===s.shoreRevision&&t.foamRevision===this.foamRevision&&Math.abs(e.x-(t.x+r*i/2))<n&&Math.abs(e.z-(t.z+r*i/2))<n)return;const h=(Math.round(e.x/i)-r/2)*i,l=(Math.round(e.z/i)-r/2)*i;for(t.refresh??=this.rebuildShore(s,t,o,i,h,l);performance.now()<c;)if(t.refresh.next().done){t.refresh=void 0;break}}*rebuildShore(s,e,t,o,i,n){const c=s.ocean,r=s.shoreRevision,h=this.foamRevision,l=[...this.foamBands],d=e.size,w=(i-e.x)/o,b=(n-e.z)/o,f=s.shoreChangesSince(e.revision),p=Number.isFinite(e.revision);for(let x=0;x<d;x++)for(let v=0;v<d;v++){const m=i+v*o,g=n+x*o,y=v+w,z=x+b,k=p&&y>=0&&y<d&&z>=0&&z<d,C=z*d+y,F=k?e.coast[C]:c.coastAt(m,g),I=k&&f&&(m<f.min.x||m>f.max.x||g<f.min.z||g>f.max.z)?e.floor[C]:T((s.seaFloorAt(m,g,F,!0)+24)/32),W=x*d+v;e.nextCoast[W]=F,e.nextFloor[W]=I,yield}const u=e.nextData;for(let x=0;x<d;x++){for(let v=0;v<d;v++){const m=x*d+v,g=e.nextFloor[m];let y=T((e.nextCoast[m]+8)/32);const z=g*32/255-24;if(x>0&&x<d-1&&v>0&&v<d-1&&Math.abs(z)<=4&&y>=T(12/32)){const k=e.nextFloor[m+1]-e.nextFloor[m-1],C=e.nextFloor[m+d]-e.nextFloor[m-d],F=Math.hypot(k,C)*16/(255*o);F>.53&&(y=Math.min(y,T((8-z/F)/32)))}u[m*4]=g,u[m*4+1]=y,u[m*4+2]=0}yield}yield*this.paintShoreFoam(u,d,i,n,o,l),[e.coast,e.nextCoast]=[e.nextCoast,e.coast],[e.floor,e.nextFloor]=[e.nextFloor,e.floor],e.nextData=e.data,e.data=e.texture.image.data=u,Object.assign(e,{x:i,z:n,revision:r}),e.foamRevision=h,t.set(i,n,1/(d*o),.5/d),e.texture.needsUpdate=!0}*paintShoreFoam(s,e,t,o,i,n){for(const c of n)for(const{from:r,to:h,width:l,strength:d}of c){yield;const w=l+i*.58,b=Math.max(0,Math.ceil((Math.min(r.x,h.x)-t-w)/i)),f=Math.min(e-1,Math.floor((Math.max(r.x,h.x)-t+w)/i)),p=Math.max(0,Math.ceil((Math.min(r.z,h.z)-o-w)/i)),u=Math.min(e-1,Math.floor((Math.max(r.z,h.z)-o+w)/i));if(b>f||p>u)continue;const x=h.x-r.x,v=h.z-r.z,m=1/(x*x+v*v||1),g=d*Math.min(1,l*2.1/w);for(let y=p;y<=u;y++){for(let z=b;z<=f;z++){const k=t+z*i-r.x,C=o+y*i-r.z,F=Math.max(0,Math.min(1,(k*x+C*v)*m)),I=T(g*(1-Math.hypot(k-x*F,C-v*F)/w)),W=(y*e+z)*4+2;I>s[W]&&(s[W]=I)}yield}}}updateContacts(s,e,t){for(t===1/0&&(this.contactRefresh=void 0),this.contactRefresh??=this.sampleContacts(s,e);performance.now()<t;)if(this.contactRefresh.next().done){this.contactRefresh=void 0;break}}*sampleContacts(s,e){const t=yield*H([this.footprints.values(),s.contacts.values()],e,650,D),o=yield*H([s.schools.values()],e,450,V);this.uniforms.contactCount.value=t.length,t.forEach(({position:i,halfWidth:n,halfLength:c,heading:r},h)=>{this.uniforms.contacts.value[h].set(i.x,i.z,n,c),this.uniforms.headings.value[h]=r}),this.uniforms.schoolCount.value=o.length,o.forEach(({position:i,radius:n},c)=>{this.uniforms.schools.value[c].set(i.x,i.z,n,i.x*.89+i.z*.63)})}updateBird(s,e,t){const{position:o,mode:i,heading:n}=e,c=i==="swimming"||o.y<=X+2.25?s.waterAt(o.x,o.z,t):void 0,r=o.y-(c?.level??X),h=c?.type==="sea"&&c.depth>.22,l=this.lastBird,d=l?t-l.time:0;if(l&&(d<0||L(l.position,o)>45)&&(this.splashes.length=0),l&&c&&h&&d>0&&d<.2){const p=(l.clearance-r)/d;(l.clearance>.25&&r<=.25&&p>3.5||i==="plunging"&&l.mode!=="plunging"&&r<1.2)&&this.splashes.unshift({position:{...o,y:c.level},t,strength:R.clamp(.47+p*.055,.38,1)})}this.lastBird={position:o,time:t,clearance:r,mode:i};const w=h&&(i==="swimming"||r>=-.25&&r<2.25),b=l&&d>1e-6&&d<.2?L(l.position,o)/d:0,f=w?R.smoothstep(b,.1,6)*(1-.73*R.smoothstep(r,.1,2.25)):0;for((d>0||!w)&&this.uniforms.wake.value.set(o.x,o.z,Math.min(15,3+b*.55),f),this.uniforms.wakeDirection.value.set(Math.sin(n),Math.cos(n)),this.splashes.splice(B);this.splashes.length&&t-this.splashes[this.splashes.length-1].t>2.65;)this.splashes.pop();this.uniforms.splashCount.value=this.splashes.length,this.splashes.forEach(({position:p,t:u,strength:x},v)=>this.uniforms.splashes.value[v].set(p.x,p.z,u,x)),this.updateSpray(t)}updateSpray(s){const e=this.spray.geometry.getAttribute("position");let t=0;for(const{position:o,t:i,strength:n}of this.splashes){const c=s-i;if(!(c<0||c>.85))for(let r=0;r<se;r++){const h=r*2.399963,l=(1.6+r%5*.61)*n,d=c*(2+r%7*.51)*n-5*c*c;d<0||e.setXYZ(t++,o.x+Math.sin(h)*l*c,o.y+d,-o.z-Math.cos(h)*l*c)}}this.spray.visible=t>0,this.spray.geometry.setDrawRange(0,t),t&&(e.needsUpdate=!0)}}const Pe=(a,s)=>({x:(a.origin.x+s.origin.x)/2,z:(a.origin.z+s.origin.z)/2}),O={"sea-noon-channel":{heading:1.33,bearing:1.82,offshore:30,y:26,hour:12},"sea-golden-path":{heading:1.26,bearing:2.61,offshore:36,y:23,hour:20.03},"sea-storm-channel":{heading:1.34,bearing:2.25,offshore:27,y:20,hour:12,storm:!0},"sea-shallows-home":{heading:1.2,bearing:-2.02,offshore:25,y:28,hour:11.7}};function Te(a,s,e){let t=0,o=a.coast[a.coast.length-1];for(const i of a.coast){const n=i.x-o.x,c=i.z-o.z,r=s*c-e*n;if(Math.abs(r)>1e-6){const h=(e*o.x-s*o.z)/r,l=(o.x*c-o.z*n)/r;h>=0&&h<=1&&(t=Math.max(t,l))}o=i}return t||a.farProxy.radius}class $e{constructor(s,e){this.manifests=s,this.queries=e,this.home=s.find(t=>t.id==="home-lookkit")??s.find(t=>t.id==="graybox-a")??s[0],this.neighbor=s.find(t=>t.id===(this.home.id==="graybox-a"?"graybox-b":"procedural-paris"))??s.find(t=>t!==this.home)??this.home}manifests;queries;key;storm;field;frontRevision;frontKey;home;neighbor;sync(s,e=s.tick*ue,t=s.weather,o,i){const n=!o&&t==="storm";if(this.key!==s.seed||this.storm!==n||this.field!==o||this.frontKey!==i||this.frontRevision!==o?.frontRevision||!this.queries.ocean){const c=this.key!==s.seed;this.key=s.seed,this.storm=n,this.field=o,this.frontRevision=o?.frontRevision,this.frontKey=i;const r=o??ve(s.seed,this.manifests);if(n){const h=Pe(this.home,this.neighbor);r.scheduleFront({id:"channel-front",startsAt:-100,durationSeconds:540,intensity:1,origin:{x:h.x-350,z:h.z-430},velocity:{x:3.5,z:4.3},halfLength:690,halfWidth:460,baseHeight:350,depth:800})}c||!this.queries.ocean?this.queries.ocean=new me(r,this.manifests):this.queries.ocean.setWeather(r)}this.queries.ocean.time=e}placement(s,e){const t=Object.hasOwn(O,s)?O[s]:O["sea-shallows-home"],{origin:o}=this.home,i=Math.sin(t.bearing),n=Math.cos(t.bearing),c=Te(this.home,i,n)+t.offshore,r=typeof e=="number"&&Number.isFinite(e)?Math.max(10,Math.min(250,e))-8:t.y;return{position:{x:o.x+i*c,y:o.y+r,z:o.z+n*c},heading:t.heading,hour:t.hour,weather:"storm"in t?"storm":"clear"}}registerShots(s,e,t){for(const o of Object.keys(O))s.screens.set(o,(i,n)=>{const c=this.placement(o,n.height);i.state.target=null,t(c.hour),i.state.weather=c.weather,i.teleport(c.position,c.heading),e()})}}function _e(a){if(Object.hasOwn(O,a.screen))return ae(a.gull.position,a.gull.heading)}function ae(a,s){const e=Math.sin(s),t=Math.cos(s);return{position:{x:a.x-16*e-2.5*t,y:a.y+8,z:a.z-16*t+2.5*e},target:{x:a.x+29*e,y:a.y-10.5,z:a.z+29*t},fov:57}}const q=/boat|dory|skiff|hull|ferry|trawler|rock|boulder|quay|pier/i,Oe=new A(0,1,0);function Y(a){const s=typeof a=="object"&&a!==null&&"scene"in a?a.scene:a;if(!(s instanceof ge))return;const e=new we().setFromObject(s);return s.parent&&e.applyMatrix4(s.parent.matrixWorld.clone().invert()),e}function Q(a,s,{origin:e}){const{position:t,scale:o,heading:i=0}=s,n=new ye().compose(new A(e.x+t.x,e.y+t.y,-e.z-t.z),new be().setFromAxisAngle(Oe,-i),o?new A(o.x,o.y,o.z):new A(1,1,1));return a.clone().applyMatrix4(n)}const Le={layer:"sea",create(a,{horizon:s}){const e=a.children.find(f=>f instanceof J&&f.geometry instanceof G&&f.geometry.parameters.width===42e3&&f.geometry.parameters.height===42e3&&f.position.y===xe&&f.rotation.x===-Math.PI/2&&f.material instanceof N&&"sky"in f.material.uniforms),t=e?.visible;e&&(e.visible=!1);const o=new We(s);a.add(o.mesh,o.spray);let i,n,c,r,h=K.get(a),l,d=0;function w(){l?.fov===57&&(l.fov=d,l.updateProjectionMatrix()),l=void 0}return{perf:()=>o.perf(),prepareShaders(f,p){const u=o.mesh.material,x=u.defines;try{u.defines={...x,STORM_SEA:1},p.compile(o.mesh,f,a)}finally{u.defines=x,u.needsUpdate=!0}},connect(f){r=f.preview},syncWorld(f,p,u){p.length!==0&&(i!==f&&(i=f,n=new $e(p,f)),c=u,n?.sync(c,void 0,void 0,h?.field,b()))},registerShots(f,p){n?.registerShots(f,p,u=>{f.actions.get("set_hour")?.({hour:u})})},mountChunk(f,p,u){const x=[];p.shoreFoam?.length&&x.push(o.mountShoreFoam(p.shoreFoam,f.origin));for(const v of p.models??[]){if(v.seaContact===!1||!q.test(v.assetKey))continue;const m=Y(u.get(v.assetKey));m&&x.push(o.mountContact(Q(m,v,f)))}for(const v of p.instances??[]){if(!q.test(v.assetKey))continue;const m=Y(u.get(v.assetKey));if(m)for(const g of v.placements)x.push(o.mountContact(Q(m,g,f)))}return()=>{for(const v of x)v()}},update({seconds:f,camera:p,hour:u,weather:x,fixedView:v,quality:m}){if(!i||!n||!c)return;const g=r&&n.placement(r.shot??"sea-shallows-home"),y=g?ae(g.position,g.heading):_e(c);h=y?void 0:K.get(a),g?n.sync(c,f,g.weather):n.sync(c,h?.time,void 0,h?.field,b()),y?(p.position.set(y.position.x,y.position.y,-y.position.z),p.lookAt(y.target.x,y.target.y,-y.target.z),p instanceof Me&&(l!==p&&(w(),l=p,d=p.fov),p.fov!==y.fov&&(p.fov=y.fov,p.updateProjectionMatrix()))):w(),o.update(i,p.position,g??c.gull,i.ocean?.time??f,g?.hour??u,h?h.fronts.length>0:(g?.weather??x)==="storm",h?.fronts,!!(v||y),m)},dispose(){w(),e&&t!==void 0&&(e.visible=t),i&&(i.ocean=void 0),o.dispose()}};function b(){return h?.fronts.map(({id:f,startsAt:p})=>`${f}:${p}`).join("|")}}};export{Le as effect};
