import { Suspense, lazy, useEffect, useState } from 'react';

// The globe pulls in d3-geo and the world atlas. Lazy so it never sits on the
// critical path — the hero headline paints first, the globe arrives after.
const JurisdictionGlobe = lazy(() =>
  import('../research/JurisdictionGlobe').then((m) => ({ default: m.JurisdictionGlobe }))
);

// Only the label fields the caption needs. Importing jurisdictions.json here
// would drag all thirteen full reports into the main bundle; the globe chunk
// already carries them.
const TOUR = [
  { id: 'dgca', authority: 'DGCA', region: 'India', colour: '#0284C7' },
  { id: 'easa', authority: 'EASA', region: 'Europe', colour: '#7C3AED' },
  { id: 'faa', authority: 'FAA', region: 'United States', colour: '#D97706' },
  { id: 'canada', authority: 'Transport Canada', region: 'Canada', colour: '#DC2626' },
  { id: 'seasia', authority: 'National authorities', region: 'Southeast Asia', colour: '#0D9488' },
  { id: 'middleeast', authority: 'GCAA / regional', region: 'Middle East', colour: '#0891B2' },
];

function Placeholder() {
  return (
    <div className="w-full max-w-[420px] aspect-square rounded-full bg-gradient-to-br from-[#F2F8FF] to-[#DCEBFA] border border-[#C7DDF2]" />
  );
}

export function HeroGlobe() {
  const [selectedId, setSelectedId] = useState('dgca');
  const [touring, setTouring] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Defer mounting until the browser is idle, so the globe chunk never competes
  // with the hero's own first paint.
  useEffect(() => {
    const start = () => setMounted(true);
    if ('requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, o?: object) => number })
        .requestIdleCallback(start, { timeout: 2500 });
      return () => (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  // Slow tour through the regulators until the visitor takes over.
  useEffect(() => {
    if (!touring || !mounted) return;
    const id = setInterval(() => {
      setSelectedId((cur) => {
        const i = TOUR.findIndex((t) => t.id === cur);
        return TOUR[(i + 1) % TOUR.length].id;
      });
    }, 3800);
    return () => clearInterval(id);
  }, [touring, mounted]);

  const active = TOUR.find((j) => j.id === selectedId) ?? TOUR[0];

  const pick = (id: string) => {
    setTouring(false);
    setSelectedId(id);
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="relative w-full max-w-[420px]">
        {mounted ? (
          <Suspense fallback={<Placeholder />}>
            <JurisdictionGlobe selectedId={selectedId} onSelect={pick} />
          </Suspense>
        ) : (
          <Placeholder />
        )}
      </div>

      {/* Live caption for whichever authority is in view */}
      <div
        className="mt-1 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border shadow-sm transition-colors duration-500"
        style={{ borderColor: `${active.colour}55` }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: active.colour }} />
        <span className="font-sans text-[13px] font-bold text-zinc-800">{active.authority}</span>
        <span className="font-sans text-[13px] text-zinc-400">·</span>
        <span className="font-sans text-[13px] text-zinc-500">{active.region}</span>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-1.5 max-w-[420px]">
        {TOUR.map((j) => {
          const id = j.id;
          const on = id === selectedId;
          return (
            <button
              key={id}
              onClick={() => pick(id)}
              aria-label={`Show ${j.region}`}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                on ? 'text-white shadow-sm' : 'bg-white/70 text-zinc-500 hover:text-zinc-800 border border-zinc-200'
              }`}
              style={on ? { background: j.colour } : undefined}
            >
              {j.authority.length > 16 ? j.region : j.authority}
            </button>
          );
        })}
      </div>
    </div>
  );
}
