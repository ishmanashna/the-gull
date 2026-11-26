import"./three-renderer-BP556_pn.js";import{al as g,ak as v,D as u,an as y,am as c,cM as n}from"./three.core-BYa7ON5M.js";class z{endpoints;corners;velocities;elapsed={value:0};geometry=new g;material=new v({side:u,transparent:!0,depthWrite:!1,uniforms:{tint:{value:[.92,.97,1]},elapsed:this.elapsed},vertexShader:`
      attribute vec3 endpoint;
      attribute vec3 stroke;
      attribute vec3 velocity;
      uniform float elapsed;
      varying float alpha;
      varying float edge;
      varying float distanceFromEye;
      void main() {
        vec4 a = viewMatrix * vec4(position + velocity * elapsed, 1.0);
        vec4 b = viewMatrix * vec4(endpoint + velocity * elapsed, 1.0);
        if (min(a.z, b.z) > -4.0) {
          gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
          return;
        }
        // Leave the last few metres to the near fade, without covering the screen at the clip plane.
        if (a.z > -4.0) a = mix(a, b, (-4.0 - a.z) / (b.z - a.z));
        if (b.z > -4.0) b = mix(b, a, (-4.0 - b.z) / (a.z - b.z));
        vec3 tangent = b.xyz - a.xyz;
        vec3 perpendicular = cross(tangent, -mix(a.xyz, b.xyz, 0.5));
        vec3 side = perpendicular / max(length(perpendicular), 0.0001);
        vec4 point = mix(a, b, stroke.x);
        point.xyz += side * stroke.y;
        gl_Position = projectionMatrix * point;
        alpha = stroke.z;
        edge = sign(stroke.y);
        distanceFromEye = length(point.xyz);
      }
    `,fragmentShader:`
      uniform vec3 tint;
      varying float alpha;
      varying float edge;
      varying float distanceFromEye;
      void main() {
        float soft = 1.0 - smoothstep(0.28, 0.98, abs(edge));
        float distanceFade = smoothstep(6.0, 19.0, distanceFromEye)
          * (1.0 - smoothstep(335.0, 545.0, distanceFromEye));
        gl_FragColor = vec4(tint, alpha * soft * distanceFade);
        #include <colorspace_fragment>
      }
    `});starts;count=0;mesh=new y(this.geometry,this.material);constructor(e,t){t&&(this.material.uniforms.tint.value=t),this.starts=new c(new Float32Array(e*12),3).setUsage(n),this.endpoints=this.starts.clone().setUsage(n),this.corners=this.starts.clone().setUsage(n),this.velocities=this.starts.clone().setUsage(n);const a=new Uint16Array(e*6);for(let i=0;i<e;i++){const s=i*4;a.set([s,s+1,s+2,s+2,s+1,s+3],i*6)}this.geometry.setIndex(new c(a,1)),this.geometry.setAttribute("position",this.starts),this.geometry.setAttribute("endpoint",this.endpoints),this.geometry.setAttribute("stroke",this.corners),this.geometry.setAttribute("velocity",this.velocities),this.geometry.setDrawRange(0,0),this.mesh.frustumCulled=!1}stroke(e,t,a,i,s,h,d=i){const m=this.count++*4;for(let o=0;o<4;o++){const r=m+o,l=o<2;this.starts.setXYZ(r,e.x,e.y,-e.z),this.endpoints.setXYZ(r,t.x,t.y,-t.z),this.velocities.setXYZ(r,a.x,a.y,-a.z);const p=l?i:d;this.corners.setXYZ(r,l?0:1,(o%2===0?-1:1)*p,l?s:h)}}flush(){this.geometry.setDrawRange(0,this.count*6);const e=this.count*12;if(this.count=0,!!e)for(const t of[this.starts,this.endpoints,this.corners,this.velocities])t.clearUpdateRanges(),t.addUpdateRange(0,e),t.needsUpdate=!0}interpolate(e){this.elapsed.value=e}dispose(){this.mesh.removeFromParent(),this.geometry.dispose(),this.material.dispose()}}export{z as W};
