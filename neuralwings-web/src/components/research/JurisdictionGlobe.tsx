import { useEffect, useMemo, useRef, useState } from 'react';
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate, geoDistance } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Feature, Geometry } from 'geojson';
import worldData from 'world-atlas/countries-110m.json';
import jurisdictions from '../../content/jurisdictions.json';
import indiaPov from '../../content/india-pov-boundaries.json';

type Jurisdiction = (typeof jurisdictions)[number];

const SIZE = 460;
const NEUTRAL = '#DDE6F2';
const NEUTRAL_STROKE = '#ffffff';

/** name → jurisdiction, built once. */
const byCountry = new Map<string, Jurisdiction>();
for (const j of jurisdictions) for (const c of j.countries) byCountry.set(c, j);

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function JurisdictionGlobe({ selectedId, onSelect }: Props) {
  const [rotation, setRotation] = useState<[number, number]>([-20, -15]);
  const [spinning, setSpinning] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const dragState = useRef<{ x: number; y: number; r: [number, number] } | null>(null);
  const frame = useRef<number | undefined>(undefined);

  // Flight animation: a plane tracks the great circle from the last selected
  // jurisdiction to the new one while the globe turns to meet it.
  const [flight, setFlight] = useState<{ from: [number, number]; to: [number, number]; colour: string } | null>(null);
  const [progress, setProgress] = useState(1);
  const prevFocus = useRef<[number, number] | null>(null);
  const rotationRef = useRef<[number, number]>([-20, -15]);
  rotationRef.current = rotation;

  const countries = useMemo(() => {
    // world-atlas ships TopoJSON; the cast is the documented shape.
    const fc = feature(worldData as never, (worldData as never as { objects: { countries: never } }).objects.countries);
    const features = [...(fc as unknown as FeatureCollection).features];

    // India, Pakistan and China are replaced with Natural Earth's India
    // point-of-view boundaries. The default dataset draws the de-facto line of
    // control, which depicts India's territory incorrectly under Indian law.
    const overrides = new Map(indiaPov.map((o) => [o.name, o.geometry]));
    return features.map((f) => {
      const name = (f.properties as { name?: string })?.name ?? '';
      const geometry = overrides.get(name);
      return geometry ? ({ ...f, geometry } as Feature<Geometry>) : f;
    });
  }, []);

  // Idle auto-rotation, stopped by any interaction and by reduced-motion.
  useEffect(() => {
    if (!spinning) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setRotation((r) => [r[0] + dt * 0.008, r[1]]);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [spinning]);

  // Turn the globe to face the picked jurisdiction, flying a plane there.
  useEffect(() => {
    const j = jurisdictions.find((x) => x.id === selectedId);
    if (!j) return;
    setSpinning(false);

    const [lat, lon] = j.focus as [number, number];
    const to: [number, number] = [lon, lat];
    const from = prevFocus.current;
    prevFocus.current = to;

    const target: [number, number] = [-lon, -lat];
    const start = rotationRef.current;

    // First selection: no origin to fly from, so just settle there.
    if (!from) {
      setRotation(target);
      setProgress(1);
      return;
    }

    setFlight({ from, to, colour: j.colour });
    setProgress(0);

    // Rotate the short way round, or the globe spins most of the way home.
    const shortest = (a: number, b: number) => a + ((((b - a + 180) % 360) + 360) % 360 - 180);
    const endX = shortest(start[0], target[0]);
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const DURATION = 1500;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const e = ease(t);
      setRotation([start[0] + (endX - start[0]) * e, start[1] + (target[1] - start[1]) * e]);
      setProgress(e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRotation(target);
      setProgress(1);
      setFlight(null);
      return;
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [selectedId]);

  const projection = useMemo(
    () => geoOrthographic().scale(SIZE / 2 - 8).translate([SIZE / 2, SIZE / 2]).rotate([rotation[0], rotation[1]]),
    [rotation]
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  const startDrag = (clientX: number, clientY: number) => {
    setSpinning(false);
    dragState.current = { x: clientX, y: clientY, r: rotation };
  };

  const onDrag = (clientX: number, clientY: number) => {
    const d = dragState.current;
    if (!d) return;
    setRotation([d.r[0] + (clientX - d.x) * 0.35, Math.max(-80, Math.min(80, d.r[1] - (clientY - d.y) * 0.35))]);
  };

  const fillFor = (name: string) => {
    const j = byCountry.get(name);
    if (!j) return NEUTRAL;
    if (j.id === selectedId) return j.colour;
    if (hovered === j.id) return j.colour;
    return j.colour + '66'; // same hue, recessive until picked
  };

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[460px] touch-none select-none cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Rotatable globe. Select a jurisdiction to read its report."
        onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); startDrag(e.clientX, e.clientY); }}
        onPointerMove={(e) => onDrag(e.clientX, e.clientY)}
        onPointerUp={() => { dragState.current = null; }}
        onPointerLeave={() => { dragState.current = null; }}
      >
        <defs>
          <radialGradient id="ocean" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#F2F8FF" />
            <stop offset="100%" stopColor="#DCEBFA" />
          </radialGradient>
          <radialGradient id="rim" cx="50%" cy="50%">
            <stop offset="88%" stopColor="rgba(2,132,199,0)" />
            <stop offset="100%" stopColor="rgba(2,132,199,0.18)" />
          </radialGradient>
        </defs>

        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 8} fill="url(#ocean)" />
        <path d={path(geoGraticule10()) ?? ''} fill="none" stroke="#BBD4EC" strokeWidth={0.4} />

        {countries.map((f: Feature<Geometry>, i) => {
          const name = (f.properties as { name?: string })?.name ?? '';
          const j = byCountry.get(name);
          const d = path(f);
          if (!d) return null;
          return (
            <path
              key={`${name}-${i}`}
              d={d}
              fill={fillFor(name)}
              stroke={NEUTRAL_STROKE}
              strokeWidth={0.4}
              className={j ? 'cursor-pointer transition-[fill] duration-200' : ''}
              onPointerEnter={() => j && setHovered(j.id)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => j && onSelect(j.id)}
            >
              {j && <title>{`${j.region} — ${j.authority}`}</title>}
            </path>
          );
        })}

        {flight && (() => {
          const along = geoInterpolate(flight.from, flight.to);
          const here = along(progress);
          const ahead = along(Math.min(1, progress + 0.03));
          const centre: [number, number] = [-rotation[0], -rotation[1]];
          const p1 = projection(here);
          const p2 = projection(ahead);
          const onNearSide = geoDistance(here, centre) < Math.PI / 2;
          const arc = path({ type: 'LineString', coordinates: [flight.from, flight.to] } as never);
          const heading = p1 && p2 ? (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180) / Math.PI : 0;

          return (
            <g pointerEvents="none">
              {arc && (
                <path d={arc} fill="none" stroke={flight.colour} strokeWidth={1.6}
                  strokeDasharray="5 5" strokeLinecap="round" opacity={0.55} />
              )}
              {onNearSide && p1 && (
                <g transform={`translate(${p1[0]}, ${p1[1]}) rotate(${heading})`}>
                  <circle r={9} fill={flight.colour} opacity={0.18} />
                  {/* nose points along +x, matching the heading rotation */}
                  <path d="M 7 0 L -4 4 L -1.5 0 L -4 -4 Z" fill={flight.colour}
                    stroke="#ffffff" strokeWidth={0.7} strokeLinejoin="round" />
                </g>
              )}
            </g>
          );
        })()}

        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 8} fill="url(#rim)" pointerEvents="none" />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 8} fill="none" stroke="#C7DDF2" strokeWidth={1} pointerEvents="none" />
      </svg>

      <p className="font-sans text-[12px] text-zinc-400 mt-3 text-center">
        Drag to rotate · click a highlighted country, or choose below
      </p>
      <p className="font-sans text-[11px] text-zinc-400/90 mt-1.5 text-center max-w-[380px] leading-relaxed">
        Boundaries: Natural Earth, India point-of-view edition.
      </p>
    </div>
  );
}

export { jurisdictions };
