'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type * as ThreeNS from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import Media from '@/components/ui/Media';
import BuyButton from '@/components/ui/BuyButton';
import GwaliorSkyline from '@/components/art/GwaliorSkyline';
import NamkeenCart from '@/components/art/NamkeenCart';
import {
  BadgeRing,
  Birds,
  Bowl,
  Cashew,
  Cloud,
  CurryLeaf,
  Flourish,
  Peanut,
  Rays,
  SevStrands,
  Sparkle,
  SpiceScatter,
  Splash,
} from '@/components/art/Doodles';
import { BRANDS, productsByBrand, type BrandId } from '@/data/products';
import type { ImageKey } from '@/data/image-meta';
import { asset } from '@/lib/asset';
import './horizon-hero-section.css';

/**
 * The scroll-driven opening of the site.
 *
 * Three full-height panels travel over one pinned WebGL horizon: the house
 * brand, then Best Bites, then the namkeen range. Scrolling flies the camera
 * from in front of a Gwalior ridge, through it, and out over the range
 * beyond — so the type changes because the world moved, not because a slide
 * advanced.
 *
 * Two things are deliberately different from the usual "cosmic" version of
 * this effect:
 *
 *  - It is lit for day. The ground is parchment, the ink is brown and the
 *    only glow is the sun sitting on the horizon, because the rest of the
 *    site is printed on warm paper and a black void would tear a hole in it.
 *  - Progress is measured against this section, not the document. The page
 *    below the hero is long; scroll progress that counted the whole document
 *    would have the camera crawl for ten screens.
 *
 * Three.js loads on demand inside the effect rather than at module scope:
 * the panels are plain server-rendered HTML, so the copy is in the document
 * for search engines and for anyone whose JavaScript never arrives, and the
 * ~600 kB of renderer only lands once the page is interactive.
 */

/* -------------------------------------------------------------------------- */
/* content                                                                    */
/* -------------------------------------------------------------------------- */

/** The opening screen's copy. A newline in the title forces a line break. */
const OPENING = {
  eyebrow: 'Tradition since 1960',
  title: 'TWO BRANDS,\nONE LEGACY.',
  lines: [
    'Same taste. Same trust.',
    'Two packs — one for the shelf at home, one built to leave the city.',
  ],
} as const;

const BITES = BRANDS['best-bites'];
const HOUSE = BRANDS['bapu-best'];

/** Each brand's own range, split by whether the library has a pack shot: the
 *  ones it does are shown, the ones it does not are still named. */
const BITES_RANGE = productsByBrand('best-bites');
const BITES_SHOWN = BITES_RANGE.filter((product) => product.cutout);
const BITES_REST = BITES_RANGE.filter((product) => !product.cutout);
const HOUSE_RANGE = productsByBrand('bapu-best');
const HOUSE_SHOWN = HOUSE_RANGE.filter((product) => product.cutout);

/**
 * The three lines of small print under each brand.
 *
 * Every one is either counted from the data or listed in VERIFIED_CLAIMS —
 * nothing here is a positioning line dressed up as a fact.
 */
type Fact = {
  Icon: (props: { className?: string; strokeWidth?: number }) => React.ReactElement;
  label: string;
};

const BITES_FACTS: Fact[] = [
  { Icon: Bowl, label: `${BITES_RANGE.length} varieties` },
  { Icon: BadgeRing, label: 'ISO 22000:2018' },
  { Icon: CurryLeaf, label: '100% vegetarian' },
];

const HOUSE_FACTS: Fact[] = [
  { Icon: Rays, label: `Since ${HOUSE.since}` },
  { Icon: Bowl, label: HOUSE.lockup },
  { Icon: Flourish, label: 'Made in Gwalior' },
];

/** The two badges on the opening screen, in the order they are read. */
type BrandCard = {
  id: BrandId;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  pack: ImageKey;
  packAlt: string;
  accent: string;
};

const BRAND_CARDS: BrandCard[] = [
  {
    id: 'best-bites',
    // Cleaned up from the supplied screenshot by scripts/clean-logo.mjs.
    logo: '/brand/best-bites-logo.webp',
    logoWidth: 474,
    logoHeight: 238,
    pack: 'cut-milan-mixture',
    packAlt: 'Bapu Best Bites Milan Mixture pack',
    accent: 'var(--color-saffron)',
  },
  {
    id: 'bapu-best',
    logo: '/brand/bapu-best-logo.webp',
    logoWidth: 320,
    logoHeight: 320,
    pack: 'cut-khatta-meetha',
    packAlt: 'Bapu Best Khatta Meetha pack',
    accent: 'var(--color-maroon)',
  },
];

/** Each brand's badge, on the ivory disc it wears everywhere in the hero. */
function BrandMark({ id, className = '' }: { id: BrandId; className?: string }) {
  const card = BRAND_CARDS.find((c) => c.id === id);
  if (!card) return null;
  return (
    <span className={`brand-medallion ${className}`.trim()}>
      {/* Decorative: the brand name is spelled out beside it either way. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(card.logo)} alt="" aria-hidden width={card.logoWidth} height={card.logoHeight} />
    </span>
  );
}

/** Lets a card pass its own accent down to the stylesheet. */
type CSSVars = React.CSSProperties & Record<'--accent', string>;


/** Camera stops, one per panel. Section 0 sits in front of the ridge, 1 is
 *  among it, 2 is out the far side in open haze. */
const CAMERA_STOPS = [
  { x: 0, y: 30, z: 300 },
  { x: 0, y: 48, z: -50 },
  { x: 0, y: 60, z: -650 },
];

/** Stops minus one: the number of scroll steps between them. */
const TOTAL_SECTIONS = CAMERA_STOPS.length - 1;

/* -------------------------------------------------------------------------- */
/* helpers                                                                    */
/* -------------------------------------------------------------------------- */

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Deterministic ridge noise: the same skyline every visit, on every device. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Words stay whole so the headline breaks sensibly; characters inside them
 *  are individually animated out from behind the word's clipping mask.
 *
 *  The space between the words is a real text node so the heading still reads
 *  "BAPU BEST" to a screen reader and to a crawler. A white-space-only child
 *  of a flex container is never rendered, so it costs nothing on screen — the
 *  gap you see is `column-gap`. */
function splitTitle(text: string) {
  return text.split('\n').map((line, l) => (
    <span key={`${line}-${l}`} className="title-line">
      {line.split(' ').map((word, w) => (
        <Fragment key={`${word}-${w}`}>
          {w > 0 ? ' ' : null}
          <span className="title-word">
            {word.split('').map((char, i) => (
              <span key={`${char}-${i}`} className="title-char">
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  ));
}

/** GSAP's own answer to `useLayoutEffect` on the server: the timeline has to
 *  set its start values before the browser paints, or the headline flashes in
 *  finished and then jumps back to animate. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/* -------------------------------------------------------------------------- */
/* scene refs                                                                 */
/* -------------------------------------------------------------------------- */

type ShaderPoints = ThreeNS.Points<ThreeNS.BufferGeometry, ThreeNS.ShaderMaterial>;
type ShaderMesh = ThreeNS.Mesh<ThreeNS.BufferGeometry, ThreeNS.ShaderMaterial>;
type HillMesh = ThreeNS.Mesh<ThreeNS.BufferGeometry, ThreeNS.MeshBasicMaterial>;

type SceneRefs = {
  scene: ThreeNS.Scene | null;
  camera: ThreeNS.PerspectiveCamera | null;
  renderer: ThreeNS.WebGLRenderer | null;
  composer: EffectComposer | null;
  /** Spice dust, in three depth layers. */
  motes: ShaderPoints[];
  haze: ShaderMesh | null;
  sky: ShaderMesh | null;
  hills: HillMesh[];
  /** Each hill's resting z, so the scroll parallax always has a base to work
   *  from rather than compounding its own offset frame after frame. */
  hillDepths: number[];
  animationId: number | null;
  target: { x: number; y: number; z: number };
};

/* -------------------------------------------------------------------------- */
/* component                                                                  */
/* -------------------------------------------------------------------------- */

export function HorizonHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 300 });
  const activeRef = useRef(true);
  const reducedRef = useRef(false);
  const offsetRef = useRef(-1);

  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const threeRefs = useRef<SceneRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    motes: [],
    haze: null,
    sky: null,
    hills: [],
    hillDepths: [],
    animationId: null,
    target: { x: 0, y: 30, z: 300 },
  });

  /* ---------------------------------------------------------------- three */
  useEffect(() => {
    const refs = threeRefs.current;
    let disposed = false;
    let cleanupResize: (() => void) | undefined;

    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initThree = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const [THREE, { EffectComposer: Composer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] =
        await Promise.all([
          import('three'),
          import('three/examples/jsm/postprocessing/EffectComposer.js'),
          import('three/examples/jsm/postprocessing/RenderPass.js'),
          import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
          import('three/examples/jsm/postprocessing/OutputPass.js'),
        ]);

      if (disposed) return;

      /** Brand palette, straight from the design tokens in globals.css. */
      const C = {
        ivory: 0xfcf8f1,
        parchment: 0xf4ecdd,
        cream: 0xefe4d1,
        sand: 0xe4d5bd,
        ink: 0x2b1a12,
        maroon: 0x6d1420,
        maroonDeep: 0x4a0d16,
        saffron: 0xe08a1e,
        saffronSoft: 0xf2b955,
        rose: 0xe8918a,
        olive: 0x5b6b47,
      };

      const width = window.innerWidth;
      const height = window.innerHeight;
      const small = width < 900;

      // --- scene -------------------------------------------------------
      refs.scene = new THREE.Scene();
      // Fog in the ground colour, so the far ridges dissolve into the paper
      // instead of ending on a hard edge.
      refs.scene.fog = new THREE.FogExp2(C.parchment, 0.00115);

      refs.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 6000);
      refs.camera.position.set(0, 30, 300);

      refs.renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: false });
      refs.renderer.setSize(width, height);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      // No tone mapping: this is flat, printed colour, and an ACES curve would
      // drag the parchment down into tan and desaturate the saffron.
      refs.renderer.toneMapping = THREE.NoToneMapping;
      refs.renderer.setClearColor(C.parchment, 1);

      // --- post ---------------------------------------------------------
      refs.composer = new Composer(refs.renderer);
      refs.composer.addPass(new RenderPass(refs.scene, refs.camera));

      // Bloom, but thresholded above everything except the sun itself: on a
      // light ground a low threshold would simply wash the whole frame out.
      const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.3, 0.85, 0.86);
      refs.composer.addPass(bloom);
      // Required once a composer is in play — it is what converts the linear
      // working colours back to sRGB for the canvas.
      refs.composer.addPass(new OutputPass());

      // --- elements -----------------------------------------------------
      createSky(THREE, C);
      createSpiceMotes(THREE, small);
      createHaze(THREE, C);
      createHills(THREE, C);
      createAtmosphere(THREE);
      cacheHillDepths();

      // --- resize -------------------------------------------------------
      const handleResize = () => {
        if (!refs.camera || !refs.renderer || !refs.composer) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        refs.camera.aspect = w / h;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(w, h);
        refs.composer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);
      cleanupResize = () => window.removeEventListener('resize', handleResize);

      animate();
    };

    /** The sky: one plane far behind everything, ivory overhead falling to a
     *  saffron band on the horizon with the sun sitting in it. The sun is the
     *  only thing in the frame bright enough to trip the bloom threshold, so
     *  it is also the only thing that glares. */
    const createSky = (THREE: typeof ThreeNS, C: Record<string, number>) => {
      const geometry = new THREE.PlaneGeometry(20000, 10000);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          top: { value: new THREE.Color(C.ivory) },
          horizon: { value: new THREE.Color(C.saffronSoft) },
          ground: { value: new THREE.Color(C.sand) },
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 top;
          uniform vec3 horizon;
          uniform vec3 ground;
          varying vec2 vUv;

          void main() {
            // 0.46 is where the ridge line sits once the camera is at rest.
            float sky = smoothstep(0.40, 0.78, vUv.y);
            vec3 color = mix(horizon, top, sky);
            color = mix(ground, color, smoothstep(0.34, 0.46, vUv.y));

            // The sun, sitting on the ridge and just bright enough to bloom.
            float sun = 1.0 - smoothstep(0.0, 0.13, distance(vUv, vec2(0.5, 0.47)));
            color += vec3(0.26, 0.17, 0.06) * pow(sun, 1.9);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
        depthWrite: false,
      });

      const sky = new THREE.Mesh(geometry, material);
      sky.position.z = -3400;
      sky.renderOrder = -1;
      refs.scene?.add(sky);
      refs.sky = sky as ShaderMesh;
    };

    /** Spice dust rather than stars: warm specks that read as ground masala
     *  hanging in the light. Normal blending, not additive — additive on a
     *  light ground only ever bleaches towards white. */
    const createSpiceMotes = (THREE: typeof ThreeNS, small: boolean) => {
      const count = small ? 900 : 1800;
      const rng = makeRng(0x5eed);

      for (let layer = 0; layer < 3; layer++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let j = 0; j < count; j++) {
          const radius = 200 + rng() * 800;
          const theta = rng() * Math.PI * 2;
          const phi = Math.acos(rng() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const pick = rng();
          if (pick < 0.55) {
            color.setHSL(0.08, 0.62, 0.44); // chilli-and-turmeric saffron
          } else if (pick < 0.8) {
            color.setHSL(0.98, 0.6, 0.3); // deep maroon
          } else {
            color.setHSL(0.24, 0.28, 0.34); // curry-leaf green
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = rng() * 2.2 + 0.6;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: layer },
            opacity: { value: 0.5 - layer * 0.13 },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;

            void main() {
              vColor = color;
              vec3 pos = position;

              // Each layer turns a little slower than the one in front of it.
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            uniform float opacity;

            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;

              float alpha = (1.0 - smoothstep(0.1, 0.5, dist)) * opacity;
              gl_FragColor = vec4(vColor, alpha);
            }
          `,
          transparent: true,
          depthWrite: false,
        });

        const motes = new THREE.Points(geometry, material);
        refs.scene?.add(motes);
        refs.motes.push(motes as ShaderPoints);
      }
    };

    /** The warm band of light behind the ridge — the light-ground answer to
     *  the original's nebula. Saffron folding into rose, breathing slowly. */
    const createHaze = (THREE: typeof ThreeNS, C: Record<string, number>) => {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 60, 60);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(C.saffronSoft) },
          color2: { value: new THREE.Color(C.rose) },
          opacity: { value: 0.44 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;

          void main() {
            vUv = uv;
            vec3 pos = position;

            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);

            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;

            gl_FragColor = vec4(color, max(alpha, 0.0));
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const haze = new THREE.Mesh(geometry, material);
      // Behind the furthest ridge, in front of the sky: the band of warm light
      // the whole range is standing in.
      haze.position.z = -2000;
      refs.scene?.add(haze);
      refs.haze = haze as ShaderMesh;
    };

    /** Four ridge layers, the Gwalior skyline abstracted. Distance is read as
     *  colour here: the near ridge is brand maroon, and each one behind it is
     *  lighter and thinner until it is barely more than a stain on the paper. */
    const createHills = (THREE: typeof ThreeNS, C: Record<string, number>) => {
      // Six of them, and the spacing matters: the camera flies through the
      // first four, so there has to be a range still standing behind them or
      // the last screen opens onto nothing. Distance is carried by the fog,
      // which washes the far ridges back towards the paper colour.
      const layers = [
        { distance: -50, height: 60, color: C.maroon, opacity: 0.92 },
        { distance: -150, height: 80, color: C.maroon, opacity: 0.66 },
        { distance: -300, height: 100, color: C.saffron, opacity: 0.42 },
        { distance: -500, height: 130, color: C.sand, opacity: 0.6 },
        { distance: -1000, height: 170, color: C.maroon, opacity: 0.4 },
        { distance: -1500, height: 210, color: C.maroon, opacity: 0.34 },
      ];

      const rng = makeRng(0x1960);

      layers.forEach((layer, index) => {
        const points: ThreeNS.Vector2[] = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            rng() * layer.height * 0.2 -
            100;
          points.push(new THREE.Vector2(x, y));
        }

        // The floor has to sit below the deepest trough of every ridge: a
        // baseline the profile dips under makes the outline cross itself, and
        // a self-intersecting shape triangulates to nothing at all. It also
        // has to reach past the bottom of the frame, which is roughly 0.77 of
        // the distance below the camera at this field of view.
        points.push(new THREE.Vector2(5000, -1200));
        points.push(new THREE.Vector2(-5000, -1200));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const hill = new THREE.Mesh(geometry, material);
        hill.position.z = layer.distance;
        hill.position.y = layer.distance;
        hill.userData = { baseZ: layer.distance, baseOpacity: layer.opacity, index };
        refs.scene?.add(hill);
        refs.hills.push(hill as HillMesh);
      });
    };

    /** A warm shell around the whole scene, brightest at the rim — the glare
     *  of a hot afternoon rather than the original's blue planetary halo. */
    const createAtmosphere = (THREE: typeof ThreeNS) => {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;

          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          uniform float time;

          void main() {
            // A true fresnel against the view direction, rather than against a
            // fixed axis. The camera flies *inside* this shell, and a fixed
            // axis reads every facing surface as rim — which on a light ground
            // adds enough light to bleach the entire frame white.
            float fresnel = 1.0 - abs(dot(normalize(vNormal), normalize(vView)));
            float intensity = pow(fresnel, 2.5);
            vec3 glow = vec3(1.0, 0.82, 0.55) * intensity;

            float pulse = sin(time * 2.0) * 0.08 + 0.92;
            glow *= pulse;

            gl_FragColor = vec4(glow, intensity * 0.22);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      });

      refs.scene?.add(new THREE.Mesh(geometry, material));
    };

    const cacheHillDepths = () => {
      refs.hillDepths = refs.hills.map((hill) => hill.position.z);
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      if (!refs.composer || !refs.camera) return;
      // Off-screen the frame would be paid for and never seen.
      if (!activeRef.current) return;

      const still = reducedRef.current;
      const time = still ? 0 : performance.now() * 0.001;

      refs.motes.forEach((layer) => {
        layer.material.uniforms.time.value = time;
      });

      if (refs.haze) refs.haze.material.uniforms.time.value = time * 0.5;

      // Easing towards the scroll target rather than snapping to it: the
      // camera arrives a beat after the scroll stops, which is what makes the
      // movement feel like weight rather than like a slider.
      const smoothing = 0.05;
      const target = refs.target;
      smoothCameraPos.current.x += (target.x - smoothCameraPos.current.x) * smoothing;
      smoothCameraPos.current.y += (target.y - smoothCameraPos.current.y) * smoothing;
      smoothCameraPos.current.z += (target.z - smoothCameraPos.current.z) * smoothing;

      const floatX = still ? 0 : Math.sin(time * 0.1) * 2;
      const floatY = still ? 0 : Math.cos(time * 0.15) * 1;

      refs.camera.position.x = smoothCameraPos.current.x + floatX;
      refs.camera.position.y = smoothCameraPos.current.y + floatY;
      refs.camera.position.z = smoothCameraPos.current.z;
      // Always looking down the flight path rather than at a fixed point: a
      // static target would have the camera turn round and stare back at empty
      // sky once it had flown past the ridge.
      refs.camera.lookAt(0, 10, refs.camera.position.z - 900);

      // The ridges drift against each other, so the horizon is never quite
      // still even when the page is — and each one dissolves as the camera
      // reaches it, because a ridge is a flat silhouette and flying through
      // one would wipe the whole frame in a single frame of maroon.
      const camZ = refs.camera.position.z;
      refs.hills.forEach((hill, i) => {
        const parallax = 1 + i * 0.5;
        hill.position.x = still ? 0 : Math.sin(time * 0.1) * 2 * parallax;
        hill.position.y = 50 + (still ? 0 : Math.cos(time * 0.15) * 1 * parallax);

        const approach = clamp((camZ - hill.position.z - 30) / 170, 0, 1);
        hill.material.opacity = (hill.userData.baseOpacity as number) * approach;
        hill.visible = approach > 0.01;
      });

      refs.composer.render();
    };

    // A machine without WebGL still gets the panels and the warm gradient
    // behind them; it just never gets the horizon.
    initThree()
      .catch(() => undefined)
      .finally(() => {
        if (!disposed) setIsReady(true);
      });

    return () => {
      disposed = true;
      cleanupResize?.();

      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      refs.animationId = null;

      refs.motes.forEach((layer) => {
        layer.geometry.dispose();
        layer.material.dispose();
      });
      refs.hills.forEach((hill) => {
        hill.geometry.dispose();
        hill.material.dispose();
      });
      refs.haze?.geometry.dispose();
      refs.haze?.material.dispose();
      refs.sky?.geometry.dispose();
      refs.sky?.material.dispose();
      refs.renderer?.dispose();

      refs.motes = [];
      refs.hills = [];
      refs.haze = null;
      refs.sky = null;
      refs.scene = null;
      refs.camera = null;
      refs.composer = null;
      refs.renderer = null;
    };
  }, []);

  /* ----------------------------------------------------------------- gsap */
  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedRef.current = reduced;
    if (reduced) return;

    // Scoped so every selector below is looked up inside the hero, and so one
    // `revert()` puts every element back exactly as the server rendered it.
    const ctx = gsap.context(() => {
      // `fromTo` with `clearProps`, not `from`, on purpose. `from` ends on
      // whatever value it read off the element, and it leaves that value
      // inline — where it would outrank the `[data-active]` rules that hide
      // the fixed furniture once the hero is done. Ending on an explicit
      // value and then handing the property back to the stylesheet keeps the
      // CSS in charge of every resting state.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      const rise = (y: number) => ({
        y,
        opacity: 0,
      });
      const settle = (extra?: gsap.TweenVars): gsap.TweenVars => ({
        y: 0,
        opacity: 1,
        clearProps: 'opacity,transform',
        ...extra,
      });
      // The drawn layer keeps its transform: the parallax below writes to the
      // same elements, and clearing the property would snap them back to zero
      // until the next scroll event moved them again.
      const land = (extra?: gsap.TweenVars): gsap.TweenVars => ({
        y: 0,
        opacity: 1,
        ...extra,
      });

      // Roughly two and a half seconds end to end, and heavily overlapped. A
      // hero that withholds its own brand names for four seconds is a hero
      // nobody waits for — and on a slow machine GSAP's lag smoothing stretches
      // whatever is written here.
      tl.fromTo(menuRef.current, { x: -60, opacity: 0 }, settle({ x: 0, duration: 0.9 }))
        .fromTo('.scene-fort', { opacity: 0, y: 18 }, land({ duration: 1.1 }), '-=0.8')
        .fromTo('.scene-cart', { opacity: 0, x: -30 }, land({ x: 0, duration: 1 }), '-=1')
        .fromTo(
          '.scene-doodle',
          { opacity: 0, scale: 0.6 },
          land({ scale: 1, duration: 0.7, stagger: 0.04 }),
          '-=0.9',
        )
        .fromTo('[data-panel="0"] .hero-eyebrow', rise(18), settle({ duration: 0.6 }), '-=1')
        .fromTo(
          '[data-panel="0"] .title-char',
          { yPercent: 120, opacity: 0 },
          settle({ yPercent: 0, duration: 1, stagger: 0.022, ease: 'power4.out' }),
          '-=0.4',
        )
        .fromTo(
          '[data-panel="0"] .legacy-rule',
          { scaleX: 0, opacity: 0 },
          settle({ scaleX: 1, duration: 0.6 }),
          '-=0.7',
        )
        .fromTo(
          '[data-panel="0"] .subtitle-line',
          rise(24),
          settle({ duration: 0.7, stagger: 0.12 }),
          '-=0.5',
        )
        .fromTo('.legacy-buy', rise(20), settle({ duration: 0.7 }), '-=0.45')
        .fromTo('.brand-col', rise(40), settle({ duration: 0.8, stagger: 0.12 }), '-=0.7')
        .fromTo(scrollProgressRef.current, rise(24), settle({ duration: 0.6 }), '-=0.5')
        .fromTo('.scroll-cue-inline', rise(16), settle({ duration: 0.6 }), '<');

      // Once the entrance is done the drawn layer takes over its own motion —
      // see the ambient loops in the stylesheet. Held back until now because a
      // running keyframe animation outranks the inline transform GSAP writes,
      // so the two would fight over every doodle for the length of the intro.
      tl.eventCallback('onComplete', () => {
        container.dataset.lively = 'true';
      });

      // Parallax. The drawn layer drifts against the panel it belongs to, and
      // the fort and the cart drift against the layer — three speeds, which is
      // what makes a flat sketch sit in front of a landscape rather than on it.
      gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel) => {
        const drift = (target: Element | null, from: number, to: number) => {
          if (!target) return;
          gsap.fromTo(
            target,
            { yPercent: from },
            {
              yPercent: to,
              ease: 'none',
              scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          );
        };

        drift(panel.querySelector('.hero-scene'), -4, 6);
        drift(panel.querySelector('.scene-fort'), 8, -8);
        drift(panel.querySelector('.scene-cart'), -4, 4);
      });

      // Each panel fades up into place and dissolves again as it leaves, so
      // the type moves with the camera instead of sitting on top of it.
      gsap.utils.toArray<HTMLElement>('[data-panel]').forEach((panel) => {
        const inner = panel.querySelector('.panel-inner');
        if (!inner) return;
        const first = panel.dataset.panel === '0';

        if (!first) {
          gsap.fromTo(
            inner,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: panel, start: 'top 85%', end: 'top 25%', scrub: 0.6 },
            },
          );
        }

        gsap.to(inner, {
          y: -70,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            start: first ? 'top top' : 'bottom 78%',
            end: first ? 'bottom 30%' : 'bottom 18%',
            scrub: 0.6,
          },
        });
      });
    }, container);

    // The preloader holds the page still while it plays; measurements taken
    // before it lifts are measurements of a locked document.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const settle = window.setTimeout(refresh, 1200);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(settle);
      ctx.revert();
    };
  }, []);

  /* --------------------------------------------------------------- scroll */
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const container = containerRef.current;
      if (!container) return;

      const viewport = window.innerHeight;
      const rect = container.getBoundingClientRect();

      // The hero starts below the announcement bar and the navbar, so a panel
      // of a full viewport would hang that far past the fold — and everything
      // the opening screen anchors to its own bottom edge would go with it.
      // Publishing the offset lets the first panel subtract it.
      const offset = Math.round(rect.top + window.scrollY);
      if (offset !== offsetRef.current) {
        offsetRef.current = offset;
        container.style.setProperty('--hero-offset', `${offset}px`);
      }
      // Measured against this section, not the document: everything below the
      // hero is a normal page and must not eat into the camera's travel.
      const span = Math.max(container.offsetHeight - viewport, 1);
      const progress = clamp(-rect.top / span, 0, 1);

      // The hero is done once it no longer fills the screen; the fixed canvas
      // has to be gone by then or it would cover the page below.
      const active = rect.bottom > viewport * 0.9 && rect.top < viewport;
      if (active !== activeRef.current) {
        activeRef.current = active;
        setIsActive(active);
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progress * 100}%`;
      }

      const section = Math.min(Math.floor(progress * TOTAL_SECTIONS), TOTAL_SECTIONS);
      // The counter names the panel you are looking at, so it snaps to the
      // nearest stop rather than to the one already passed — the first panel is
      // shorter than the others, which puts the two a few per cent out of step.
      const nearest = Math.round(progress * TOTAL_SECTIONS);
      setCurrentSection((prev) => (prev === nearest ? prev : nearest));

      // Interpolate between the two stops either side of where we are; the
      // easing in the render loop does the rest.
      const sectionProgress = progress * TOTAL_SECTIONS - section;
      const from = CAMERA_STOPS[section] ?? CAMERA_STOPS[0];
      const to = CAMERA_STOPS[section + 1] ?? from;
      const refs = threeRefs.current;
      refs.target = {
        x: from.x + (to.x - from.x) * sectionProgress,
        y: from.y + (to.y - from.y) * sectionProgress,
        z: from.z + (to.z - from.z) * sectionProgress,
      };

      // The ridges pull apart as the camera flies in — the far ones travel
      // fastest, so the range opens out rather than sliding past as one wall.
      // Fading them out as the camera arrives is the render loop's job.
      refs.hills.forEach((hill, i) => {
        const base = refs.hillDepths[i] ?? hill.position.z;
        const speed = 1 + i * 0.9;
        hill.position.z = base + progress * speed * 45;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    read();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* ------------------------------------------------------------------ jsx */
  return (
    <div
      ref={containerRef}
      className="hero-container cosmos-style"
      data-ready={isReady}
      data-active={isActive}
    >
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden />
      <div className="hero-veil" aria-hidden />

      {/* Side rail — where all of this is made. */}
      <div ref={menuRef} className="side-menu" aria-hidden>
        <div className="menu-icon">
          <span />
          <span />
          <span />
        </div>
        <div className="vertical-text">Gwalior</div>
      </div>

      {/* ---------------- panel one: the two brands ---------------- */}
      <div className="hero-content cosmos-content" data-panel="0">
        {/* The drawn layer. Line art over the render: the fort standing on the
            ridge the camera is looking at, and the cart parked in front of it. */}
        <div className="hero-scene" aria-hidden>
          <Cloud className="scene-doodle scene-cloud-a" />
          <Cloud className="scene-doodle scene-cloud-b" />
          <Birds className="scene-doodle scene-birds" />
          <GwaliorSkyline className="scene-fort" idPrefix="horizonfort" />
          <NamkeenCart className="scene-cart" idPrefix="horizoncart" />
          <Cashew className="scene-doodle scene-cashew-a" />
          <Cashew className="scene-doodle scene-cashew-b" />
          <Peanut className="scene-doodle scene-peanut" />
          <CurryLeaf className="scene-doodle scene-leaf" />
          <SevStrands className="scene-doodle scene-sev" />
          <Sparkle className="scene-doodle scene-sparkle" />
          <SpiceScatter className="scene-doodle scene-scatter" />
        </div>

        <div className="panel-inner panel-legacy">
          <div className="legacy-copy">
            <p className="hero-eyebrow">{OPENING.eyebrow}</p>
            <h1 className="hero-title">{splitTitle(OPENING.title)}</h1>
            <span className="legacy-rule" aria-hidden />
            <div className="hero-subtitle cosmos-subtitle">
              {OPENING.lines.map((line) => (
                <p key={line} className="subtitle-line">
                  {line}
                </p>
              ))}
            </div>

            {/* The site has no cart: every purchase is a hand-off to a
                marketplace, and the opening screen should not make anyone
                scroll three panels to find that out. */}
            <div className="legacy-buy">
              <BuyButton marketplace="amazon" size="md" />
              <BuyButton marketplace="flipkart" variant="outline" size="md" />
            </div>
          </div>

          <div className="legacy-brands">
            {BRAND_CARDS.map((card) => {
              const brand = BRANDS[card.id];
              return (
                <Link key={card.id} href={brand.href} className="brand-col" style={{ '--accent': card.accent } as CSSVars}>
                  <BrandMark id={card.id} />

                  <h2 className="brand-name">{brand.name}</h2>
                  <p className="brand-lockup">{brand.lockup}</p>
                  <p className="brand-tagline">{brand.blurb}</p>
                  <span className="brand-rule" aria-hidden />

                  <span className="brand-shot">
                    <Splash className="brand-splash" />
                    <Media
                      name={card.pack}
                      alt={card.packAlt}
                      priority
                      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 26vw, 18vw"
                      className="brand-pack"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="scroll-cue-inline" aria-hidden>
          Scroll to explore
          <span className="cue-rail">
            <span className="cue-dot" />
          </span>
        </div>
      </div>

      {/* ---------------- scroll indicator ---------------- */}
      <div ref={scrollProgressRef} className="scroll-progress" aria-hidden>
        <div className="progress-track">
          <div ref={progressFillRef} className="progress-fill" style={{ width: '0%' }} />
        </div>
        <div className="section-counter">
          {String(currentSection).padStart(2, '0')} / {String(TOTAL_SECTIONS).padStart(2, '0')}
        </div>
      </div>

      <div className="scroll-sections">
        {/* ---------------- panel two: Best Bites, and its shelf ----------------
            Copy left, the range standing in a row on the right. */}
        <section className="content-section panel-bites" data-panel="1">
          <div className="hero-scene" aria-hidden>
            <SevStrands className="scene-doodle bites-sev" />
            <Cashew className="scene-doodle bites-cashew" />
            <Peanut className="scene-doodle bites-peanut" />
            <Sparkle className="scene-doodle bites-sparkle" />
            <SpiceScatter className="scene-doodle bites-scatter" />
            <Birds className="scene-doodle bites-birds" />
          </div>

          <div className="panel-inner panel-brand">
            <div className="brand-copy">
              <BrandMark id="best-bites" className="panel-mark" />
              <h2 className="hero-title">{splitTitle('BEST BITES')}</h2>
              <p className="hero-lockup">{BITES.lockup}</p>
              <p className="brand-script">{BITES.blurb}</p>
              <p className="brand-copy-text">{BITES.copy}</p>

              <ul className="fact-row">
                {BITES_FACTS.map((fact) => (
                  <li key={fact.label} className="fact">
                    <span className="fact-icon" aria-hidden>
                      <fact.Icon className="w-full" />
                    </span>
                    {fact.label}
                  </li>
                ))}
              </ul>

              <Link href={BITES.href} className="hero-button">
                Explore {BITES.name}
                <span aria-hidden className="cta-arrow">
                  →
                </span>
              </Link>
            </div>

            <div className="pack-shelf">
              <Splash className="shelf-splash" />
              <ul className="pack-row">
                {BITES_SHOWN.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/namkeen/${product.slug}`} className="pack-item">
                      <Media
                        name={product.cutout as ImageKey}
                        alt={`${product.name} pack`}
                        sizes="(max-width: 640px) 28vw, (max-width: 1024px) 18vw, 12vw"
                        className="pack-item-shot"
                      />
                      <span className="pack-item-name">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="shelf-line" aria-hidden />

              {BITES_REST.length ? (
                <p className="also-line">
                  Also in the range:{' '}
                  {BITES_REST.map((product, i) => (
                    <Fragment key={product.slug}>
                      {i > 0 ? <span aria-hidden> · </span> : null}
                      <Link href={`/namkeen/${product.slug}`} className="link-underline">
                        {product.name}
                      </Link>
                    </Fragment>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* ---------------- panel three: Bapu Best ----------------
            The mirror of panel two on purpose: art left, copy right, one pack
            in front of a bowl rather than a row of them, and the range read as
            a list instead of a shelf. */}
        <section className="content-section panel-house" data-panel="2">
          <div className="hero-scene" aria-hidden>
            <CurryLeaf className="scene-doodle house-leaf" />
            <Cloud className="scene-doodle house-cloud" />
            <Sparkle className="scene-doodle house-sparkle" />
            <SpiceScatter className="scene-doodle house-scatter" />
            <Cashew className="scene-doodle house-cashew" />
          </div>

          <div className="panel-inner panel-brand panel-brand-reverse">
            <div className="house-art">
              <span className="house-ring spin-slow" aria-hidden>
                <BadgeRing className="w-full" />
              </span>
              <span className="house-photo">
                <Media
                  name="detail-bowl-khatta-meetha"
                  alt="A bowl of Bapu Best Khatta Meetha"
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  imgClassName="object-cover"
                />
              </span>
              {/* The range fanned in front of the bowl, overlapping like packs
                  actually stand on a counter — the other half of not repeating
                  the shelf on the panel above. */}
              <ul className="house-fan">
                {HOUSE_SHOWN.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/namkeen/${product.slug}`} className="fan-item">
                      <Media
                        name={product.cutout as ImageKey}
                        alt={`${product.name} pack`}
                        sizes="(max-width: 1024px) 22vw, 12vw"
                        className="fan-shot"
                      />
                      <span className="fan-name">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="brand-copy">
              <BrandMark id="bapu-best" className="panel-mark" />
              <h2 className="hero-title">{splitTitle('BAPU BEST')}</h2>
              <p className="hero-lockup">{HOUSE.lockup}</p>
              <p className="brand-script">{HOUSE.blurb}</p>
              <p className="brand-copy-text">{HOUSE.copy}</p>

              <ul className="house-list">
                {HOUSE_RANGE.map((product) => (
                  <li key={product.slug}>
                    <Link href={`/namkeen/${product.slug}`}>
                      <span className="house-list-name link-underline">{product.name}</span>
                      <span className="house-list-note">{product.strapline}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="fact-row">
                {HOUSE_FACTS.map((fact) => (
                  <li key={fact.label} className="fact">
                    <span className="fact-icon" aria-hidden>
                      <fact.Icon className="w-full" />
                    </span>
                    {fact.label}
                  </li>
                ))}
              </ul>

              <Link href="/namkeen" className="hero-button">
                See the whole range
                <span aria-hidden className="cta-arrow">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <div className="hero-outro" aria-hidden />
    </div>
  );
}

/** The name the reference implementation exports. */
export const Component = HorizonHero;

export default HorizonHero;
