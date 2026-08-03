import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ExternalLink } from 'lucide-react';
import { JurisdictionGlobe, jurisdictions } from './JurisdictionGlobe';

export function JurisdictionReport({ flat = false }: { flat?: boolean } = {}) {
  const [selectedId, setSelectedId] = useState('dgca');
  const j = jurisdictions.find((x) => x.id === selectedId) ?? jurisdictions[0];

  return (
    <section id="jurisdictions" className="relative py-14 md:py-20 bg-[#F8FBFF] border-y border-blue-100 scroll-mt-24">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="max-w-[760px] mb-10">
          <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-sky-600 uppercase">
            Report by jurisdiction
          </span>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[40px] text-zinc-900 leading-tight mt-2 mb-4">
            Find your regulator. Read the case for your operation.
          </h2>
          <p className="font-sans text-[16px] md:text-[17px] text-zinc-600 leading-relaxed">
            The pressure on flight training is worldwide, but it arrives differently depending on who approves
            you. {flat ? 'Pick a region on the map' : 'Spin the globe or pick an authority'} — the figures, the
            regulatory position and our conclusion all change to match.
          </p>
        </div>

        <div className={flat ? "flex flex-col gap-8" : "grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 lg:gap-12 items-start"}>
          {/* Globe + picker */}
          <div className="flex flex-col gap-5">
            <JurisdictionGlobe selectedId={selectedId} onSelect={setSelectedId} flat={flat} />

            <div className={`flex flex-wrap gap-2 ${flat ? "justify-center" : "justify-center lg:justify-start"}`}>
              {jurisdictions.map((item) => {
                const active = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-[13px] font-semibold transition-all ${
                      active
                        ? 'border-transparent text-white shadow-md'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                    }`}
                    style={active ? { background: item.colour } : undefined}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: active ? 'rgba(255,255,255,0.85)' : item.colour }}
                    />
                    {item.authority.length > 16 ? item.region : item.authority}
                  </button>
                );
              })}
            </div>
          </div>

          {/* The selected report */}
          <article className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-9 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4" style={{ color: j.colour }} />
              <span className="font-sans text-[12px] font-bold tracking-[0.16em] uppercase" style={{ color: j.colour }}>
                {j.region} · {j.authority}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-[22px] md:text-[30px] text-zinc-900 leading-snug mb-6">
              {j.headline}
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {j.stats.map((s) => (
                <div key={s.label} className="p-4 rounded-2xl border border-zinc-200 bg-[#FAFCFF]">
                  <p className="font-heading font-extrabold text-[22px] md:text-[26px] text-zinc-900 leading-none tracking-tight">
                    {s.value}
                  </p>
                  <p className="font-sans text-[13px] font-semibold text-zinc-700 mt-2 leading-snug">{s.label}</p>
                  <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-snug">{s.note}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="font-sans text-[11px] font-bold tracking-[0.16em] text-zinc-400 uppercase mb-2">
                The regulatory position
              </h4>
              <p className="font-sans text-[15px] text-zinc-600 leading-relaxed">{j.regulator}</p>
            </div>

            <div
              className="rounded-2xl p-5 md:p-6 border"
              style={{ borderColor: `${j.colour}33`, background: `${j.colour}0A` }}
            >
              <h4 className="font-sans text-[11px] font-bold tracking-[0.16em] uppercase mb-2" style={{ color: j.colour }}>
                Why this matters for you — our reading
              </h4>
              <p className="font-sans text-[15px] text-zinc-700 leading-relaxed">{j.conclusion}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-7">
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-sans font-bold text-[14px] shadow-md hover:opacity-90 transition-opacity"
                style={{ background: j.colour }}
              >
                {j.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-100">
              <h4 className="font-sans text-[11px] font-bold tracking-[0.16em] text-zinc-400 uppercase mb-2.5">
                Where these figures come from
              </h4>
              <ul className="flex flex-col gap-1.5">
                {j.sources.map((src) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-[13px] text-zinc-500 hover:text-sky-600 transition-colors"
                    >
                      {src.label} <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[11px] text-zinc-400 mt-3 leading-relaxed">
                Published by the organisations named. Not our research, and not an endorsement of Neural Wings
                by any of them. Regional demand figures are Boeing's, for {j.demand.regionLabel}.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
