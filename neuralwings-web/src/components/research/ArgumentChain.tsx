import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Lock, ShieldAlert, Gauge, ArrowRight, ArrowDown } from 'lucide-react';

const steps = [
  {
    id: 'demand',
    icon: TrendingUp,
    tag: 'The pressure',
    title: 'Demand is large, sustained and everywhere',
    figure: '660,000',
    figureLabel: 'new pilots needed by 2044',
    body:
      'Europe needs more new aviation personnel than any other region on earth. North America has already absorbed a near-tripling of student pilots since 2016. South and Southeast Asia are growing fastest of all, with staffing demand expected to more than triple. No region on the forecast is exempt.',
    soWhat: 'Every academy on earth is being asked to produce more pilots than it used to.',
  },
  {
    id: 'capacity',
    icon: Lock,
    tag: 'The constraint',
    title: 'Capacity is capped by ratios you cannot waive',
    figure: '1 : 1 : 10',
    figureLabel: 'aircraft : instructor : students, mandated',
    body:
      'Supervision ratios are a regulatory floor on training quality, not a guideline. India’s 41 approved academies can hold roughly 3,500 cadets at any moment because of it. Capacity grows by adding aircraft or adding instructors — never by simply enrolling more students.',
    soWhat: 'You cannot solve a volume problem by accepting more cadets.',
  },
  {
    id: 'standard',
    icon: ShieldAlert,
    tag: 'The squeeze',
    title: 'And the standard you are held to is rising',
    figure: 'Nov 2026',
    figureLabel: 'ICAO Annex 19 Amendment 2 applies',
    body:
      'A functioning safety management system is required, and the next amendment tightens it. DGCA now ranks approved academies twice a year on published parameters. The administrative burden is increasing at precisely the moment the operational volume is.',
    soWhat: 'More flying to document, to a higher evidentiary standard, with the same staff.',
  },
  {
    id: 'lever',
    icon: Gauge,
    tag: 'What is left',
    title: 'So the only remaining lever is utilisation',
    figure: '41%',
    figureLabel: 'of new Indian CPLs already earned abroad',
    body:
      'An aircraft grounded because a 100-hour inspection was noticed late. A cadet stood down because a medical quietly expired. An instructor unavailable because duty hours lived in a different file. Each one is a training slot lost from a system that has very few to spare — and a lost slot is how a cadet ends up finishing somewhere else.',
    soWhat: 'The slots you already have are the only capacity you can win back this year.',
  },
];

export function ArgumentChain() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-8">
      {/* Step rail */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 ${
                isActive
                  ? 'border-sky-400 bg-white shadow-lg shadow-sky-100 scale-[1.02]'
                  : 'border-zinc-200 bg-white/70 hover:border-sky-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
                    isActive ? 'bg-sky-500 text-white' : isPast ? 'bg-sky-100 text-sky-600' : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {i + 1}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-500' : 'text-zinc-400'}`} />
              </div>
              <p className={`font-sans text-[11px] font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-sky-600' : 'text-zinc-400'}`}>
                {s.tag}
              </p>
              <p className={`font-sans text-[13px] font-semibold leading-snug ${isActive ? 'text-zinc-900' : 'text-zinc-600'}`}>
                {s.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Panels — all rendered so the argument is readable without JavaScript */}
      {steps.map((s, i) => (
        <div key={s.id} className={i === active ? 'block' : 'hidden'}>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-9">
              <div className="md:w-[220px] shrink-0">
                <p className="font-heading font-extrabold text-[38px] md:text-[44px] text-zinc-900 leading-none tracking-tight">
                  {s.figure}
                </p>
                <p className="font-sans text-[13px] text-zinc-500 mt-2 leading-snug">{s.figureLabel}</p>
              </div>

              <div className="flex-1">
                <h3 className="font-heading font-bold text-[20px] md:text-[24px] text-zinc-900 leading-snug mb-3">
                  {s.title}
                </h3>
                <p className="font-sans text-[15px] md:text-[16px] text-zinc-600 leading-relaxed mb-4">{s.body}</p>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sky-50 border border-sky-100">
                  <ArrowRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <p className="font-sans text-[14px] font-semibold text-zinc-800 leading-snug">{s.soWhat}</p>
                </div>
              </div>
            </div>

            {i < steps.length - 1 && (
              <button
                onClick={() => setActive(i + 1)}
                className="mt-6 inline-flex items-center gap-2 font-sans text-[14px] font-bold text-sky-600 hover:text-sky-700 transition-colors"
              >
                Then what? <ArrowDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Conclusion */}
      <div className="mt-6 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 md:p-9">
        <h3 className="font-heading font-extrabold text-[22px] md:text-[30px] text-zinc-900 leading-tight mb-4">
          That is the problem Neural Wings was built for
        </h3>
        <p className="font-sans text-[16px] text-zinc-600 leading-relaxed max-w-[760px] mb-4">
          Hold every operational record in one system. Let an intelligence layer watch the expiries, the hours
          and the conflicts continuously. Surface the decision before it becomes a cancellation. Not because
          software is interesting, but because the arithmetic above leaves very little room for avoidable losses.
        </p>
        <p className="font-sans text-[16px] text-zinc-600 leading-relaxed max-w-[760px] mb-7">
          <strong className="text-zinc-900">
            That arithmetic is the same whether you answer to DGCA, EASA or the FAA.
          </strong>{' '}
          It is why the operational core is built on ICAO standards rather than one country's rulebook — the
          reporting layer is what we localise. DGCA first, with EASA and FAA frameworks in development.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/book-demo"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-sky-500 text-white font-sans font-bold text-[15px] shadow-lg shadow-sky-200 hover:bg-sky-600 transition-colors"
          >
            See the platform <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#jurisdictions"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-zinc-200 bg-white text-zinc-800 font-sans font-bold text-[15px] hover:border-zinc-300 transition-all"
          >
            Read the case for my regulator
          </a>
        </div>
      </div>
    </div>
  );
}
