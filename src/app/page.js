
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Stats from 'stats.js';

export default function SupernovaCanvas() {
  const canvasContainerRef = useRef(null);
  const audioRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState('amber');

  useEffect(() => {
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Append renderer to container
    const container = canvasContainerRef.current;
    if (!container) {
      console.error('Canvas container not found');
      return;
    }
    container.appendChild(renderer.domElement);

    // Stats
    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.cssText = 'position:absolute;top:0;left:0;opacity:0.9;display:none;';
    document.body.appendChild(stats.dom);

    // Color themes
    const colorThemes = {
      cosmic: { name: 'Cosmic Purple', baseColor: [0.7, 0.5, 1.0], accentColor: [0.8, 0.3, 0.8], edgeColor: [0.3, 0.1, 0.6], glowColor: [0.6, 0.2, 1.0], tintColor: [43, 0, 25], tintStrength: 0.36, bloomStrength: 0.05 },
      azure: { name: 'Azure Nebula', baseColor: [0.4, 0.7, 1.0], accentColor: [0.2, 0.5, 0.9], edgeColor: [0.0, 0.2, 0.5], glowColor: [0.5, 0.8, 1.0], tintColor: [0, 30, 60], tintStrength: 0.4, bloomStrength: 0.05 },
      emerald: { name: 'Emerald Dust', baseColor: [0.3, 0.8, 0.5], accentColor: [0.1, 0.6, 0.4], edgeColor: [0.0, 0.4, 0.2], glowColor: [0.4, 1.0, 0.6], tintColor: [0, 50, 30], tintStrength: 0.35, bloomStrength: 0.05 },
      crimson: { name: 'Crimson Nova', baseColor: [1.0, 0.4, 0.4], accentColor: [0.9, 0.2, 0.2], edgeColor: [0.5, 0.1, 0.1], glowColor: [1.0, 0.3, 0.3], tintColor: [60, 0, 10], tintStrength: 0.45, bloomStrength: 0.05 },
      amber: { name: 'Amber Glow', baseColor: [1.0, 0.8, 0.3], accentColor: [0.9, 0.6, 0.1], edgeColor: [0.6, 0.3, 0.0], glowColor: [1.0, 0.7, 0.2], tintColor: [43, 0, 25], tintStrength: 0, bloomStrength: 0.05 },
      twilight: { name: 'Twilight Gradient', baseColor: [0.6, 0.4, 0.8], accentColor: [0.3, 0.5, 0.9], edgeColor: [0.1, 0.0, 0.3], glowColor: [0.8, 0.6, 1.0], tintColor: [20, 10, 40], tintStrength: 0.38, bloomStrength: 0.05 },
      sunset: { name: 'Sunset Gradient', baseColor: [1.0, 0.6, 0.4], accentColor: [0.9, 0.4, 0.3], edgeColor: [0.5, 0.2, 0.0], glowColor: [1.0, 0.8, 0.5], tintColor: [43, 0, 25], tintStrength: 0, bloomStrength: 0.05 },
      oceanic: { name: 'Oceanic Gradient', baseColor: [0.3, 0.7, 0.8], accentColor: [0.1, 0.5, 0.7], edgeColor: [0.0, 0.3, 0.5], glowColor: [0.5, 0.9, 1.0], tintColor: [0, 40, 50], tintStrength: 0.37, bloomStrength: 0.05 },
      celestial: { name: 'Celestial Light', baseColor: [0.95, 0.95, 1.0], accentColor: [0.9, 0.9, 1.0], edgeColor: [0.8, 0.8, 0.9], glowColor: [1.0, 1.0, 1.0], tintColor: [240, 240, 255], tintStrength: 0.2, bloomStrength: 0.08 },
      abyss: { name: 'Abyssal Depths', baseColor: [0.25, 0.28, 0.35], accentColor: [0.15, 0.18, 0.25], edgeColor: [0.08, 0.1, 0.15], glowColor: [0.4, 0.45, 0.6], tintColor: [20, 22, 30], tintStrength: 0.3, bloomStrength: 0.12 },
    };

    // Settings
    const settings = {
      zoom: 1.4,
      maxZoom: 7.0,
      rotationSpeed: 0.1,
      autoRotation: false,
      dithering: false,
      background: true,
      toneMapping: false,
      mouseInteractionEnabled: true,
      mouseInteractionStrength: 0.07,
      zoomWithMouse: true,
      zoomStrength: 0.15,
      zoomSmoothness: 0.082,
      zoomStability: 0.41,
      easingSpeed: 0.2,
      tintColor: [43, 0, 25],
      tintStrength: 0,
      grainStrength: 0.16,
      bloomStrength: 0.05,
      bloomRadius: 0.14,
      bloomThreshold: 0.043,
      particleCount: 2000,
      particleSize: 0.5,
      particleSpeed: 0.2,
      particleDepth: 50,
      particleColor: '#ffffff',
      backgroundParticleCount: 5000,
      backgroundParticleSize: 0.3,
      backgroundParticleDepth: 100,
      backgroundParticleColor: '#666666',
    };

    // Mouse tracking
    const mouse = new THREE.Vector2(0, 0);
    const smoothedMouse = new THREE.Vector2(0, 0);
    let mouseDistance = 1.0;
    let isMouseInCanvas = false;

    const currentValues = { rotationAngle: 0, zoom: settings.zoom, zoomHistory: Array(10).fill(settings.zoom) };
    const targetValues = { rotationAngle: 0, zoom: settings.zoom };

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function easeZoom(current, target, factor, stability) {
      const diff = target - current;
      const zoomFactor = 1.0 / (1.0 + current * stability);
      return current + diff * factor * zoomFactor;
    }

    function getSmoothedZoom() {
      let totalWeight = 0;
      let weightedSum = 0;
      for (let i = 0; i < currentValues.zoomHistory.length; i++) {
        const weight = (i + 1) / currentValues.zoomHistory.length;
        weightedSum += currentValues.zoomHistory[i] * weight;
        totalWeight += weight;
      }
      return weightedSum / totalWeight;
    }

    function updateZoomHistory(newZoom) {
      currentValues.zoomHistory.shift();
      currentValues.zoomHistory.push(newZoom);
    }

    const handleMouseMove = (event) => {
      isMouseInCanvas = true;
      const rawMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const rawMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      smoothedMouse.x = lerp(smoothedMouse.x, rawMouseX, 0.1);
      smoothedMouse.y = lerp(smoothedMouse.y, rawMouseY, 0.1);
      mouse.x = smoothedMouse.x;
      mouse.y = smoothedMouse.y;
      mouseDistance = Math.min(1.0, Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y));
    };

    const handleMouseOut = () => {
      isMouseInCanvas = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);

    // Noise textures
    function createNoiseTexture(size = 256) {
      const data = new Uint8Array(size * size * 4);
      for (let i = 0; i < size * size * 4; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
      const texture = new THREE.DataTexture(data, size, size);
      texture.format = THREE.RGBAFormat;
      texture.needsUpdate = true;
      return texture;
    }

    function createRandomTexture(size = 4) {
      const data = new Uint8Array(size * size * 4);
      for (let i = 0; i < size * size * 4; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
      const texture = new THREE.DataTexture(data, size, size);
      texture.format = THREE.RGBAFormat;
      texture.needsUpdate = true;
      return texture;
    }

    const noiseTexture1 = createNoiseTexture();
    const noiseTexture2 = createNoiseTexture();
    const keyboardTexture = createRandomTexture();

    // Supernova shader
    const supernovaShader = {
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMouse: { value: new THREE.Vector4() },
        iChannel0: { value: noiseTexture1 },
        iChannel1: { value: keyboardTexture },
        iChannel2: { value: noiseTexture2 },
        zoom: { value: settings.zoom },
        dithering: { value: settings.dithering },
        background: { value: settings.background },
        toneMapping: { value: settings.toneMapping },
        tintColor: { value: new THREE.Vector3(settings.tintColor[0] / 255, settings.tintColor[1] / 255, settings.tintColor[2] / 255) },
        tintStrength: { value: settings.tintStrength },
        grainStrength: { value: settings.grainStrength },
        rotationAngle: { value: 0 },
        baseColor: { value: new THREE.Vector3(colorThemes.amber.baseColor[0], colorThemes.amber.baseColor[1], colorThemes.amber.baseColor[2]) },
        accentColor: { value: new THREE.Vector3(colorThemes.amber.accentColor[0], colorThemes.amber.accentColor[1], colorThemes.amber.accentColor[2]) },
        edgeColor: { value: new THREE.Vector3(colorThemes.amber.edgeColor[0], colorThemes.amber.edgeColor[1], colorThemes.amber.edgeColor[2]) },
        glowColor: { value: new THREE.Vector3(colorThemes.amber.glowColor[0], colorThemes.amber.glowColor[1], colorThemes.amber.glowColor[2]) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec4 iMouse;
        uniform sampler2D iChannel0;
        uniform sampler2D iChannel1;
        uniform sampler2D iChannel2;
        uniform float zoom;
        uniform bool dithering;
        uniform bool background;
        uniform bool toneMapping;
        uniform vec3 tintColor;
        uniform float tintStrength;
        uniform float grainStrength;
        uniform float rotationAngle;
        uniform vec3 baseColor;
        uniform vec3 accentColor;
        uniform vec3 edgeColor;
        uniform vec3 glowColor;
        varying vec2 vUv;
        
        #define pi 3.14159265
        #define R(p, a) p=cos(a)*p+sin(a)*vec2(p.y, -p.x)
        
        float noise(in vec3 x) {
            vec3 p = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
            vec2 rg = texture(iChannel0, (uv+0.5)/256.0).yx;
            return 1.0-0.82*mix(rg.x, rg.y, f.z);
        }
        
        float fbm(vec3 p) {
           return noise(p*.06125)*.5 + noise(p*.125)*.25 + noise(p*.25)*.125 + noise(p*.4)*.2;
        }
        
        float length2(vec2 p) {
            return sqrt(p.x*p.x + p.y*p.y);
        }
        
        float length8(vec2 p) {
            p = p*p; p = p*p; p = p*p;
            return pow(p.x + p.y, 1.0/8.0);
        }
        
        float Disk(vec3 p, vec3 t) {
            vec2 q = vec2(length2(p.xy)-t.x,p.z*0.5);
            return max(length8(q)-t.y, abs(p.z) - t.z);
        }
        
        const float nudge = 0.9;
        float normalizer = 1.0 / sqrt(1.0 + nudge*nudge);
        
        float SpiralNoiseC(vec3 p) {
            float n = 0.0;
            float iter = 2.0;
            for (int i = 0; i < 8; i++) {
                n += -abs(sin(p.y*iter) + cos(p.x*iter)) / iter;
                p.xy += vec2(p.y, -p.x) * nudge;
                p.xy *= normalizer;
                p.xz += vec2(p.z, -p.x) * nudge;
                p.xz *= normalizer;
                iter *= 1.733733;
            }
            return n;
        }
        
        float NebulaNoise(vec3 p) {
            float final = Disk(p.xzy, vec3(2.0, 1.8, 1.25));
            final += fbm(p*90.0);
            final += SpiralNoiseC(p.zxy*0.5123+100.0)*3.0;
            return final;
        }
        
        float map(vec3 p) {
            R(p.xz, rotationAngle);
            float NebNoise = abs(NebulaNoise(p/0.5)*0.5);
            return NebNoise+0.07;
        }
        
        vec3 computeColor(float density, float radius) {
            vec3 result = mix(baseColor, edgeColor, density);
            vec3 colCenter = 7.0 * accentColor;
            vec3 colEdge = 1.5 * glowColor;
            result *= mix(colCenter, colEdge, min((radius+.05)/.9, 1.15));
            return result;
        }
        
        bool RaySphereIntersect(vec3 org, vec3 dir, out float near, out float far) {
            float b = dot(dir, org);
            float c = dot(org, org) - 8.0;
            float delta = b*b - c;
            if(delta < 0.0) return false;
            float deltasqrt = sqrt(delta);
            near = -b - deltasqrt;
            far = -b + deltasqrt;
            return far > 0.0;
        }
        
        vec3 ToneMapFilmicALU(vec3 _color) {
            _color = max(vec3(0.0), _color - vec3(0.004));
            _color = (_color * (6.2*_color + vec3(0.5))) / (_color * (6.2*_color + vec3(1.7)) + vec3(0.06));
            return _color;
        }
        
        float hash21(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        float white_noise(vec2 p) {
            return hash21(p);
        }
        
        void main() {
            vec2 fragCoord = vUv * iResolution;
            float key = zoom - 1.0;
            vec3 rd = normalize(vec3((fragCoord.xy-0.5*iResolution.xy)/iResolution.y, 1.0));
            vec3 ro = vec3(0.0, 0.0, -6.0+key*1.6);
            float ld=0.0, td=0.0, w=0.0;
            float d=1.0, t=0.0;
            const float h = 0.1;
            vec4 sum = vec4(0.0);
            float min_dist=0.0, max_dist=2.0;
            if(RaySphereIntersect(ro, rd, min_dist, max_dist)) {
                t = min_dist*step(t,min_dist);
                for (int i=0; i<64; i++) {
                    vec3 pos = ro + t*rd;
                    if(td>0.7 || d<0.1*t || t>10.0 || sum.a > 0.99 || t>max_dist) break;
                    d = map(pos);
                    d = max(d,0.0);
                    vec3 ldst = vec3(0.0)-pos;
                    float lDist = max(length(ldst), 0.001);
                    vec3 lightColor = accentColor * 1.5;
                    sum.rgb+=(baseColor/(lDist*lDist*10.0)/80.0);
                    sum.rgb+=(lightColor/exp(lDist*lDist*lDist*.08)/30.0);
                    if (d<h) {
                        ld = h - d;
                        w = (1.0 - td) * ld;
                        td += w + 1.0/200.0;
                        vec4 col = vec4(computeColor(td,lDist), td);
                        sum += sum.a * vec4(sum.rgb, 0.0) * 0.2;
                        col.a *= 0.2;
                        col.rgb *= col.a;
                        sum = sum + col*(1.0 - sum.a);
                    }
                    td += 1.0/70.0;
                    if (dithering) {
                        vec2 uv = fragCoord.xy / iResolution.xy;
                        uv.y*=120.0;
                        uv.x*=280.0;
                        d=abs(d)*(.8+0.08*texture(iChannel2,vec2(uv.y,-uv.x+0.5*sin(4.0*iTime+uv.y*4.0))).r);
                    }
                    t += max(d * 0.12 * max(min(length(ldst),length(ro)),1.0), 0.01);
                }
                sum *= 1.0 / exp(ld * 0.02) * 0.57;
                sum = clamp(sum, 0.0, 1.0);
                sum.xyz = sum.xyz*sum.xyz*(3.0-2.0*sum.xyz);
            }
            if (background && td<.3) {
                vec3 stars = vec3(noise(rd*500.0)*0.5+0.5);
                vec3 starbg = vec3(0.0);
                starbg = mix(starbg, baseColor, smoothstep(0.99, 1.0, stars)*clamp(dot(vec3(0.0),rd)+0.75,0.0,1.0));
                starbg = clamp(starbg, 0.0, 1.0);
                sum.xyz += starbg;
            }
            if (toneMapping) {
                sum.xyz = ToneMapFilmicALU(sum.xyz*1.0);
            }
            float grain = white_noise(fragCoord + vec2(iTime * 100.0)) * grainStrength;
            sum.rgb += (grain * 2.0 - 1.0) * 0.05;
            sum.rgb = mix(sum.rgb, sum.rgb + tintColor, tintStrength);
            gl_FragColor = vec4(sum.xyz, 1.0);
        }
      `,
    };

    // Film grain shader
    const filmGrainShader = {
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        intensity: { value: settings.grainStrength },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform vec2 resolution;
        uniform float intensity;
        varying vec2 vUv;
        #define SHOW_NOISE 0
        #define SRGB 0
        #define BLEND_MODE 0
        #define SPEED 2.0
        #define MEAN 0.0
        #define VARIANCE 0.5
        vec3 channel_mix(vec3 a, vec3 b, vec3 w) {
          return vec3(mix(a.r, b.r, w.r), mix(a.g, b.g, w.g), mix(a.b, b.b, w.b));
        }
        float gaussian(float z, float u, float o) {
          return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
        }
        vec3 madd(vec3 a, vec3 b, float w) {
          return a + a * b * w;
        }
        vec3 screen(vec3 a, vec3 b, float w) {
          return mix(a, vec3(1.0) - (vec3(1.0) - a) * (vec3(1.0) - b), w);
        }
        vec3 overlay(vec3 a, vec3 b, float w) {
          return mix(a, channel_mix(2.0*a*b, vec3(1.0)-2.0*(vec3(1.0)-a)*(vec3(1.0)-b), step(vec3(0.5),a)), w);
        }
        vec3 soft_light(vec3 a, vec3 b, float w) {
          return mix(a, pow(a, pow(vec3(2.0), 2.0*(vec3(0.5)-b))), w);
        }
        void main() {
          vec2 uv = vUv;
          vec4 color = texture2D(tDiffuse, uv);
          #if SRGB
          color = pow(color, vec4(2.2));
          #endif
          float t = time * float(SPEED);
          float seed = dot(uv, vec2(12.9898, 78.233));
          float noise = fract(sin(seed) * 43758.5453 + t);
          noise = gaussian(noise, float(MEAN), float(VARIANCE) * float(VARIANCE));
          #if SHOW_NOISE
          color = vec4(noise);
          #else    
          float w = intensity;
          vec3 grain = vec3(noise) * (1.0 - color.rgb);
          #if BLEND_MODE == 0
          color.rgb += grain * w;
          #elif BLEND_MODE == 1
          color.rgb = screen(color.rgb, grain, w);
          #elif BLEND_MODE == 2
          color.rgb = overlay(color.rgb, grain, w);
          #elif BLEND_MODE == 3
          color.rgb = soft_light(color.rgb, grain, w);
          #elif BLEND_MODE == 4
          color.rgb = max(color.rgb, grain * w);
          #endif
          #if SRGB
          color = pow(color, vec4(1.0 / 2.2));
          #endif
          #endif
          gl_FragColor = color;
        }
      `,
    };

    // Main scene
    const mainScene = new THREE.Scene();
    const mainCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    mainCamera.position.z = 1;

    const supernovaQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: supernovaShader.uniforms,
        vertexShader: supernovaShader.vertexShader,
        fragmentShader: supernovaShader.fragmentShader,
        transparent: false,
        depthWrite: false,
      })
    );
    mainScene.add(supernovaQuad);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(mainScene, mainCamera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      settings.bloomStrength,
      settings.bloomRadius,
      settings.bloomThreshold
    );
    composer.addPass(bloomPass);

    const filmGrainPass = new ShaderPass(filmGrainShader);
    composer.addPass(filmGrainPass);

    // Particle scene
    const particleScene = new THREE.Scene();
    const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    perspectiveCamera.position.z = 50;

    let particles, particlesMaterial;
    let backgroundParticles, backgroundParticlesMaterial;

    function createForegroundParticles() {
      if (particles) {
        particleScene.remove(particles);
        particlesMaterial.dispose();
      }

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = settings.particleCount;
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);
      const seedArray = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const radius = settings.particleDepth * (0.2 + 0.8 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = radius * Math.cos(phi);
        scaleArray[i] = 0.5 + Math.random() * 0.5;
        seedArray[i] = Math.random() * 100;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      particlesGeometry.setAttribute('seed', new THREE.BufferAttribute(seedArray, 1));

      particlesMaterial = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, size: { value: settings.particleSize }, color: { value: new THREE.Color(settings.particleColor) } },
        vertexShader: `
          attribute float scale;
          attribute float seed;
          uniform float time;
          uniform float size;
          void main() {
            vec3 pos = position;
            float moveFactor = sin(time * 0.2 + seed) * 0.2;
            pos.y += moveFactor;
            pos.x += cos(time * 0.3 + seed) * 0.2;
            pos.z += sin(time * 0.1 + seed) * 0.1;
            float twinkle = 1.0 + 0.5 * sin(time * 2.0 + seed * 10.0);
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float dist = length(mvPosition.xyz);
            float sizeAttenuation = 1.0 / dist;
            gl_PointSize = size * scale * twinkle * sizeAttenuation * 100.0;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            vec2 uv = gl_PointCoord.xy - 0.5;
            float dist = length(uv);
            float circle = 1.0 - smoothstep(0.45, 0.5, dist);
            float glow = 1.0 - smoothstep(0.3, 0.5, dist);
            glow = pow(glow, 2.0) * 0.7;
            vec3 finalColor = color * (circle + glow);
            if (circle < 0.05) discard;
            gl_FragColor = vec4(finalColor, circle);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      particleScene.add(particles);
    }

    function createBackgroundParticles() {
      if (backgroundParticles) {
        particleScene.remove(backgroundParticles);
        backgroundParticlesMaterial.dispose();
      }

      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = settings.backgroundParticleCount;
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const radius = settings.backgroundParticleDepth * (0.5 + Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = radius * Math.cos(phi);
        scaleArray[i] = 0.3 + Math.random() * 0.4;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

      backgroundParticlesMaterial = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, size: { value: settings.backgroundParticleSize }, color: { value: new THREE.Color(settings.backgroundParticleColor) } },
        vertexShader: `
          attribute float scale;
          uniform float time;
          uniform float size;
          void main() {
            vec3 pos = position;
            pos.x += sin(time * 0.05) * 0.1;
            pos.y += cos(time * 0.05) * 0.1;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float dist = length(mvPosition.xyz);
            float sizeAttenuation = 1.0 / dist;
            gl_PointSize = size * scale * sizeAttenuation * 50.0;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            vec2 uv = gl_PointCoord.xy - 0.5;
            float dist = length(uv);
            float circle = 1.0 - smoothstep(0.45, 0.5, dist);
            float glow = 1.0 - smoothstep(0.4, 0.5, dist);
            glow = pow(glow, 2.0) * 0.3;
            vec3 finalColor = color * (circle + glow);
            if (circle < 0.05) discard;
            gl_FragColor = vec4(finalColor, circle * 0.5);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      backgroundParticles = new THREE.Points(particlesGeometry, backgroundParticlesMaterial);
      particleScene.add(backgroundParticles);
    }

    createForegroundParticles();
    createBackgroundParticles();

    // Apply theme
    function applyTheme(themeName) {
      if (!colorThemes[themeName]) return;
      const theme = colorThemes[themeName];
      settings.tintColor = theme.tintColor;
      settings.tintStrength = theme.tintStrength;
      settings.bloomStrength = theme.bloomStrength;
      supernovaShader.uniforms.tintColor.value.set(theme.tintColor[0] / 255, theme.tintColor[1] / 255, theme.tintColor[2] / 255);
      supernovaShader.uniforms.tintStrength.value = theme.tintStrength;
      supernovaShader.uniforms.baseColor.value.set(theme.baseColor[0], theme.baseColor[1], theme.baseColor[2]);
      supernovaShader.uniforms.accentColor.value.set(theme.accentColor[0], theme.accentColor[1], theme.accentColor[2]);
      supernovaShader.uniforms.edgeColor.value.set(theme.edgeColor[0], theme.edgeColor[1], theme.edgeColor[2]);
      supernovaShader.uniforms.glowColor.value.set(theme.glowColor[0], theme.glowColor[1], theme.glowColor[2]);
      bloomPass.strength = settings.bloomStrength;
      settings.particleColor = '#ffffff';
      settings.backgroundParticleColor = '#666666';
      if (particlesMaterial) particlesMaterial.uniforms.color.value.set(settings.particleColor);
      if (backgroundParticlesMaterial) backgroundParticlesMaterial.uniforms.color.value.set(settings.backgroundParticleColor);
      createForegroundParticles();
      createBackgroundParticles();
    }

    applyTheme(currentTheme);

    // Audio setup
    const audioElement = audioRef.current;
    const audioToggle = document.getElementById('audio-toggle');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const audioStatus = document.getElementById('audio-status');

    const handleAudioToggle = () => {
      if (audioElement.paused) {
        audioElement.play().then(() => {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
          audioStatus.textContent = 'Pause';
        }).catch((error) => console.error('Audio playback failed:', error));
      } else {
        audioElement.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        audioStatus.textContent = 'Play Music';
      }
    };

    if (audioToggle) audioToggle.addEventListener('click', handleAudioToggle);

    // Animation loop
    let time = 0;
    const animate = () => {
      stats.begin();
      animationFrameIdRef.current = requestAnimationFrame(animate);
      time += 0.01;

      if (settings.mouseInteractionEnabled) {
        if (isMouseInCanvas) {
          const angle = Math.atan2(mouse.y, mouse.x);
          const distance = mouseDistance;
          if (settings.autoRotation) {
            targetValues.rotationAngle = angle * distance * Math.PI * settings.mouseInteractionStrength + time * settings.rotationSpeed;
          } else {
            targetValues.rotationAngle = angle * distance * Math.PI * settings.mouseInteractionStrength;
          }
          if (settings.zoomWithMouse) {
            const zoomCurve = Math.pow(distance, 1.5);
            const zoomFactor = 1.0 + zoomCurve * settings.zoomStrength * settings.maxZoom;
            targetValues.zoom = settings.zoom * zoomFactor;
          } else {
            targetValues.zoom = settings.zoom;
          }
        } else {
          if (settings.autoRotation) {
            targetValues.rotationAngle = time * settings.rotationSpeed;
          }
          targetValues.zoom = settings.zoom;
        }
        currentValues.rotationAngle = lerp(currentValues.rotationAngle, targetValues.rotationAngle, settings.easingSpeed);
        const newZoom = easeZoom(currentValues.zoom, targetValues.zoom, settings.zoomSmoothness, settings.zoomStability);
        updateZoomHistory(newZoom);
        currentValues.zoom = getSmoothedZoom();
      } else {
        if (settings.autoRotation) {
          currentValues.rotationAngle = time * settings.rotationSpeed;
        }
        currentValues.zoom = settings.zoom;
      }

      supernovaShader.uniforms.iTime.value = time;
      supernovaShader.uniforms.iMouse.value.set(
        (mouse.x * window.innerWidth) / 2 + window.innerWidth / 2,
        (-mouse.y * window.innerHeight) / 2 + window.innerHeight / 2,
        0, 0
      );
      supernovaShader.uniforms.rotationAngle.value = currentValues.rotationAngle;
      supernovaShader.uniforms.zoom.value = currentValues.zoom;

      if (particlesMaterial) {
        particlesMaterial.uniforms.time.value = time;
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        const positions = particles.geometry.attributes.position.array;
        const count = positions.length / 3;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          positions[i3] += Math.sin(time * 0.1 + i * 0.1) * 0.01 * settings.particleSpeed;
          positions[i3 + 1] += Math.cos(time * 0.1 + i * 0.2) * 0.01 * settings.particleSpeed;
          positions[i3 + 2] += Math.sin(time * 0.1 + i * 0.3) * 0.01 * settings.particleSpeed;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      if (backgroundParticlesMaterial) {
        backgroundParticlesMaterial.uniforms.time.value = time;
        backgroundParticles.rotation.y += 0.0002;
      }

      filmGrainPass.uniforms.time.value = time;

      renderer.autoClear = false;
      renderer.clear();
      composer.render();
      renderer.render(particleScene, perspectiveCamera);
      renderer.autoClear = true;

      stats.end();
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      composer.setSize(width, height);
      supernovaShader.uniforms.iResolution.value.set(width, height);
      filmGrainPass.uniforms.resolution.value.set(width, height);
      perspectiveCamera.aspect = width / height;
      perspectiveCamera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      if (audioToggle) audioToggle.removeEventListener('click', handleAudioToggle);
      if (rendererRef.current && container) container.removeChild(rendererRef.current.domElement);
      renderer.dispose();
      noiseTexture1.dispose();
      noiseTexture2.dispose();
      keyboardTexture.dispose();
      document.body.removeChild(stats.dom);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=IBM+Plex+Mono&display=swap");

        *, *::after, *::before {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          --primary-font: "IBM Plex Mono", monospace;
          --secondary-font: "Inter", sans-serif;
          --primary-color: #f1efe9;
          --secondary-color: #d9d4c9;
          --bg-color: #121212;
        }

        body {
          display: grid;
          min-height: 100vh;
          margin: 0;
          padding: 24px;
          background-color: var(--bg-color);
          color: var(--primary-color);
          font-family: var(--primary-font);
          line-height: 1.2;
          position: relative;
          letter-spacing: -0.03em;
        }

        body::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: url('https://assets.iceable.com/img/noise-transparent.png') repeat 0 0;
          background-size: 300px 300px;
          animation: noise-animation 0.4s steps(5) infinite;
          opacity: 0.9;
          z-index: -1;
          pointer-events: none;
        }

        @keyframes noise-animation {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(-4%, 2%); }
          30% { transform: translate(2%, -4%); }
          40% { transform: translate(-2%, 4%); }
          50% { transform: translate(4%, -2%); }
          60% { transform: translate(3px, 0); }
          70% { transform: translate(0, 3px); }
          80% { transform: translate(-3px, 0); }
          90% { transform: translate(2px, 2%); }
          100% { transform: translate(0, 0); }
        }

        .canvas-container {
          width: 100%;
          height: 100%;
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 0;
        }

        canvas {
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          background: transparent;
        }

        .coordinates {
          font-family: var(--primary-font);
          font-size: 10px;
          color: var(--secondary-color);
          position: absolute;
        }

        .top-left {
          top: 24px;
          left: 24px;
        }

        .top-right {
          top: 24px;
          right: 24px;
        }

        .bottom-center {
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
        }

        .square {
          width: 8px;
          height: 8px;
          background-color: var(--secondary-color);
          pointer-events: none;
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          max-width: 300px;
          width: 100%;
          position: fixed;
          bottom: 16px;
          left: 16px;
          font-family: var(--secondary-font);
          color: var(--primary-color);
          line-height: 1;
          pointer-events: auto;
        }

        .profile-image {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .profile-name {
          font-size: 14px;
          font-weight: 500;
          margin: 0;
        }

        .profile-twitter {
          font-size: 12px;
          color: var(--secondary-color);
          margin: 0;
        }

        .profile-twitter a {
          text-decoration: none;
          color: inherit;
        }

        .profile-twitter a:hover {
          text-decoration: underline;
        }

        .audio-controls {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.4);
          padding: 6px 10px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: background 0.3s ease;
          pointer-events: auto;
        }

        .audio-controls:hover {
          background: rgba(0, 0, 0, 0.6);
        }

        .audio-button {
          background: none;
          border: none;
          color: var(--secondary-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          padding: 0;
          transition: transform 0.2s ease;
        }

        .audio-button:active {
          transform: scale(0.85);
        }

        .audio-button svg {
          width: 14px;
          height: 14px;
        }

        .audio-status {
          margin-left: 8px;
          font-size: 9px;
          font-family: var(--primary-font);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--secondary-color);
          transition: transform 0.2s ease;
        }

        .audio-controls:active .audio-status {
          transform: translateX(2px);
        }

        .center-content {
          position: absolute;
          top: 50%;
          left: 24px;
          transform: translateY(-50%);
          text-align: left;
          width: 90%;
          max-width: 600px;
          pointer-events: none;
        }

        .caption {
          font-family: var(--primary-font);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--secondary-color);
          margin-bottom: 24px;
        }

        .main-text {
          font-family: var(--secondary-font);
          font-size: 2.25rem;
          font-weight: 300;
          line-height: 1.1;
          margin: 0;
          text-wrap: balance;
        }

        .theme-select {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.4);
          color: var(--primary-color);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px;
          border-radius: 5px;
          font-family: var(--primary-font);
          font-size: 12px;
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
      <div className="canvas-container" ref={canvasContainerRef}></div>
      {/* <div className="coordinates top-left">COSMIC CONTEMPLATION</div> */}
      <div className="coordinates top-right">ALPHA CENTAURI: 4.37 LY</div>
      <div className="center-content">
        <div className="caption">DISTANT WORLDS BECKON</div>
        <h1 className="main-text">
          The universe holds its breath in the spaces between stars.
          Vastness creates the clarity we can't find in proximity.
        </h1>
      </div>
      <div className="coordinates bottom-center">
        <div className="square"></div>
      </div>
      <div className="audio-controls">
        <button id="audio-toggle" className="audio-button">
          <svg id="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg id="pause-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'none' }}>
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        <span id="audio-status" className="audio-status">Play Music</span>
      </div>
      <audio id="background-music" loop ref={audioRef}>
        <source src="https://dl.dropboxusercontent.com/scl/fi/kiioubd8rrkikem985ogn/the-shape-of-absence.mp3?rlkey=cy8jobnee3bocnlk1o9c2mjv8&dl=1" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="profile-card">
        <img className="profile-image" src="https://filip-zrnzevic-portfolio-2025-v3.vercel.app/_next/image?url=%2Fimages%2Fprofile003.jpg&w=48&q=75" alt="Filip Zrnzević" />
        <div className="profile-info">
          <p className="profile-name">Saya.DEV</p>
          <p className="profile-twitter">
            <a href="https://x.com/filipz" target="_blank" rel="noopener noreferrer">@saya</a>
          </p>
        </div>
      </div>
      {/* <select
        className="theme-select"
        value={currentTheme}
        onChange={(e) => setCurrentTheme(e.target.value)}
      >
        {Object.entries({
          amber: 'Amber Glow',
          celestial: 'Celestial Light',
          abyss: 'Abyssal Depths',
          cosmic: 'Cosmic Purple',
          azure: 'Azure Nebula',
          emerald: 'Emerald Dust',
          crimson: 'Crimson Nova',
          twilight: 'Twilight Gradient',
          sunset: 'Sunset Gradient',
          oceanic: 'Oceanic Gradient',
        }).map(([key, name]) => (
          <option key={key} value={key}>{name}</option>
        ))}
      </select> */}
    </>
  );
}
