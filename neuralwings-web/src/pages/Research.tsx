import type { ReactNode } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell,
} from 'recharts';
import { Info, ExternalLink } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import data from '../content/research.json';
import { JurisdictionReport } from '../components/research/JurisdictionReport';
import { ArgumentChain } from '../components/research/ArgumentChain';

/* Palette validated for colour-vision deficiency, chroma and contrast against a
   light surface (sky-600 / amber-600). Single-hue where a chart shows one
   measure across categories; the two-hue pair only where segments must be told
   apart. */
const BLUE = '#0284C7';
const AMBER = '#D97706';
const INK = '#18181b';
const MUTED = '#71717a';

const compact = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
};

function Figure({
  number, title, subtitle, source, children, table,
}: {
  number: string; title: string; subtitle: string; source: string; children: ReactNode; table: ReactNode;
}) {
  return (
    <figure className="rounded-3xl border border-zinc-200 bg-white p-5 md:p-7 shadow-sm">
      <figcaption className="mb-5">
        <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-sky-600 uppercase">
          Figure {number}
        </span>
        <h3 className="font-heading font-bold text-[19px] md:text-[22px] text-zinc-900 leading-snug mt-1.5">
          {title}
        </h3>
        <p className="font-sans text-[14px] text-zinc-500 leading-relaxed mt-1.5">{subtitle}</p>
      </figcaption>

      {children}

      <details className="mt-4 group">
        <summary className="cursor-pointer font-sans text-[13px] font-semibold text-zinc-500 hover:text-sky-600 transition-colors">
          View the numbers
        </summary>
        <div className="mt-3 overflow-x-auto">{table}</div>
      </details>

      <p className="font-sans text-[12px] text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
        Source: {source}
      </p>
    </figure>
  );
}

function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} className="py-2 pr-6 font-sans text-[12px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className={`py-2 pr-6 font-sans text-[14px] border-b border-zinc-100 ${j === 0 ? 'text-zinc-600' : 'font-bold text-zinc-900'}`}>
                {typeof cell === 'number' ? cell.toLocaleString('en-IN') : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: '1px solid #e4e4e7',
    boxShadow: '0 8px 30px -12px rgba(0,0,0,0.25)',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
  },
  cursor: { fill: 'rgba(2,132,199,0.06)' },
};

function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="p-5 rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <p className="font-heading font-extrabold text-[30px] md:text-[36px] text-zinc-900 leading-none tracking-tight">
        {value}
      </p>
      <p className="font-sans text-[14px] font-semibold text-zinc-700 mt-2 leading-snug">{label}</p>
      {note && <p className="font-sans text-[12px] text-zinc-400 mt-1.5 leading-snug">{note}</p>}
    </div>
  );
}

export function Research() {
  const originTotal = data.cplOrigin.reduce((sum, d) => sum + d.value, 0);
  const abroadShare = Math.round((data.cplOrigin[1].value / originTotal) * 100);

  return (
    <Layout>
      {/* ── Header ── */}
      <section className="relative pt-28 md:pt-32 pb-12 bg-gradient-to-b from-[#F0F7FF] to-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-200/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-[900px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 font-sans text-[12px] font-semibold text-sky-600 tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            Industry research · independently published
          </span>

          <h1 className="font-heading font-extrabold text-[34px] md:text-[54px] text-zinc-900 leading-[1.08] mb-6">
            The world needs 660,000 new pilots.
            <br />
            <span className="text-gradient">Who is going to train them?</span>
          </h1>

          <p className="font-sans text-[17px] md:text-[18px] text-zinc-600 leading-relaxed max-w-[720px]">
            We pulled the published figures from Boeing, the FAA, EASA, ICAO and India's Ministry of Civil
            Aviation and put them in one place. Read together, they describe a worldwide industry being asked to
            train more pilots than ever, to a rising safety standard, on infrastructure that is already close to
            full — in Europe and North America as much as in Asia.
          </p>

          {/* Attribution — stated before any of the data */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
            <div className="flex items-start gap-3">
              <Info className="w-[18px] h-[18px] text-amber-600 shrink-0 mt-0.5" />
              <p className="font-sans text-[14px] leading-relaxed text-zinc-700">
                <strong className="text-zinc-900">None of this research is ours.</strong> Every figure on this
                page was published by the organisation named beside it — Boeing, ICAO, the Ministry of Civil
                Aviation and DGCA — and each is linked so you can read the original. We have collected and
                charted their data; we did not produce it, we do not own it, and its inclusion here is not an
                endorsement of Neural Wings by any of them. Where we draw a conclusion, it is labelled as ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Headline stats ── */}
      <section className="relative pb-4 bg-white">
        <div className="max-w-[900px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat value="660,000" label="New pilots needed by 2044" note="Boeing, global" />
          <Stat value="45,000" label="Of them, needed in South Asia" note="Boeing, regional" />
          <Stat value={`${abroadShare}%`} label="Of India's new commercial pilots trained abroad" note="Jan–Jun 2026, MoCA" />
          <Stat value="~3,500" label="Students India's FTOs can hold at once" note="41 FTOs, 63 bases, MoCA" />
        </div>
      </section>

      <JurisdictionReport />

      {/* ── Figures ── */}
      <section className="relative py-12 md:py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-6 flex flex-col gap-8">

          <Figure
            number="01"
            title="A twenty-year hiring wave, and pilots are the scarcest part"
            subtitle="Boeing's outlook puts global demand at 2.4 million aviation professionals through 2044. Pilots are the smallest of the three groups by headcount and the slowest to produce — a cabin crew member is trained in weeks, a commercial pilot in years."
            source="Boeing, Pilot and Technician Outlook 2025–2044 (22 July 2025)"
            table={<DataTable head={['Role', 'People needed by 2044']} rows={data.boeingDemand.map((d) => [d.role, d.people])} />}
          >
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.boeingDemand} layout="vertical" margin={{ top: 4, right: 56, bottom: 4, left: 4 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category" dataKey="role" width={96} tickLine={false} axisLine={false}
                    tick={{ fill: INK, fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  />
                  <Tooltip
                    {...tooltipStyle}
                    formatter={((v: unknown) => [Number(v).toLocaleString('en-IN'), 'People needed']) as never}
                  />
                  <Bar dataKey="people" fill={BLUE} radius={[0, 4, 4, 0]} barSize={26}>
                    <LabelList
                      dataKey="people" position="right" formatter={((v: unknown) => compact(Number(v))) as never}
                      style={{ fill: INK, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>

          <Figure
            number="02"
            title="Every region needs pilots — Europe most of all"
            subtitle="Boeing's forecast broken down by region. Eurasia, which covers Europe, needs more new personnel than anywhere else on earth at 550,000, ahead of North America at 435,000 and China at 426,000. This is not one country's problem, and no region is exempt."
            source="Boeing, Pilot and Technician Outlook 2025–2044 (22 July 2025)"
            table={<DataTable head={['Region', 'Pilots needed by 2044', 'All personnel']} rows={data.boeingByRegion.map((d) => [d.region, d.pilots, d.total])} />}
          >
            <div className="h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.boeingByRegion} layout="vertical" margin={{ top: 4, right: 56, bottom: 4, left: 4 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category" dataKey="region" width={132} tickLine={false} axisLine={false}
                    tick={{ fill: INK, fontSize: 12.5, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  />
                  <Tooltip {...tooltipStyle} formatter={((v: unknown) => [Number(v).toLocaleString('en-IN'), 'Pilots needed']) as never} />
                  <Bar dataKey="pilots" fill={BLUE} radius={[0, 4, 4, 0]} barSize={20}>
                    <LabelList
                      dataKey="pilots" position="right" formatter={((v: unknown) => compact(Number(v))) as never}
                      style={{ fill: INK, fontSize: 12.5, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>

          <Figure
            number="03"
            title="American flight schools have absorbed a near-tripling of students"
            subtitle="Active student pilot certificates on the FAA register. The United States went from 128,501 student pilots in 2016 to 370,286 at the end of 2025 — the same throughput pressure India is under, arriving earlier and at far greater scale."
            source="FAA, U.S. Civil Airmen Statistics (as at 31 December 2025)"
            table={<DataTable head={['Year', 'Active student pilot certificates']} rows={data.usStudentPilots.map((d) => [d.year, d.students])} />}
          >
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.usStudentPilots} margin={{ top: 24, right: 8, bottom: 4, left: 4 }}>
                  <XAxis
                    dataKey="year" tickLine={false} axisLine={{ stroke: '#e4e4e7' }}
                    tick={{ fill: MUTED, fontSize: 13, fontFamily: 'Inter, sans-serif' }}
                  />
                  <YAxis hide />
                  <Tooltip {...tooltipStyle} formatter={((v: unknown) => [Number(v).toLocaleString('en-IN'), 'Student certificates']) as never} />
                  <Bar dataKey="students" fill={BLUE} radius={[4, 4, 0, 0]} barSize={60}>
                    <LabelList
                      dataKey="students" position="top" formatter={((v: unknown) => compact(Number(v))) as never}
                      style={{ fill: INK, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="font-sans text-[13px] text-zinc-500 mt-3 leading-relaxed">
              The FAA counted <strong className="text-zinc-800">887,519</strong> active pilots in total at the
              end of 2025.
            </p>
          </Figure>

          <Figure
            number="04"
            title="India is issuing more commercial licences than a decade ago"
            subtitle="Full-year commercial pilot licences issued by DGCA. The trend is up, but it moves in steps rather than a straight line — capacity, weather and aircraft availability all cap how fast an academy can push cadets through."
            source="Ministry of Civil Aviation, stated in the Rajya Sabha (21 July 2026)"
            table={<DataTable head={['Year', 'CPLs issued']} rows={data.cplByYear.map((d) => [d.year, d.licences])} />}
          >
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.cplByYear} margin={{ top: 24, right: 8, bottom: 4, left: 4 }}>
                  <XAxis
                    dataKey="year" tickLine={false} axisLine={{ stroke: '#e4e4e7' }}
                    tick={{ fill: MUTED, fontSize: 13, fontFamily: 'Inter, sans-serif' }}
                  />
                  <YAxis hide />
                  <Tooltip {...tooltipStyle} formatter={((v: unknown) => [Number(v).toLocaleString('en-IN'), 'CPLs issued']) as never} />
                  <Bar dataKey="licences" fill={BLUE} radius={[4, 4, 0, 0]} barSize={54}>
                    <LabelList
                      dataKey="licences" position="top"
                      style={{ fill: INK, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="font-sans text-[13px] text-zinc-500 mt-3 leading-relaxed">
              A further <strong className="text-zinc-800">1,331</strong> licences were issued between January and
              June 2026. That half-year is shown separately below rather than charted here, because a partial
              year plotted beside full ones misleads.
            </p>
          </Figure>

          <Figure
            number="05"
            title={`${abroadShare}% of India's new commercial pilots earned their licence abroad`}
            subtitle="Of the 1,331 commercial pilot licences India issued in the first half of 2026, more than five hundred went to cadets who trained outside the country. That is demand Indian academies could serve and currently do not."
            source="Ministry of Civil Aviation, stated in the Rajya Sabha (21 July 2026)"
            table={<DataTable head={['Where the cadet trained', 'CPLs, Jan–Jun 2026']} rows={data.cplOrigin.map((d) => [d.label, d.value])} />}
          >
            <div className="h-[130px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[{ name: 'Jan–Jun 2026', indian: data.cplOrigin[0].value, abroad: data.cplOrigin[1].value }]}
                  layout="vertical"
                  margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
                  barCategoryGap={0}
                >
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip {...tooltipStyle} formatter={((v: unknown, k: unknown) => [Number(v).toLocaleString('en-IN'), k === 'indian' ? 'Trained at Indian FTOs' : 'Trained abroad']) as never} />
                  {/* 2px surface gap between segments, per mark spec */}
                  <Bar dataKey="indian" stackId="a" fill={BLUE} barSize={64} radius={[4, 0, 0, 4]}>
                    <LabelList dataKey="indian" position="center" style={{ fill: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }} />
                  </Bar>
                  <Bar dataKey="abroad" stackId="a" fill={AMBER} barSize={64} radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="abroad" position="center" style={{ fill: '#fff', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-1">
              <span className="inline-flex items-center gap-2 font-sans text-[13px] text-zinc-600">
                <span className="w-3 h-3 rounded-sm" style={{ background: BLUE }} /> Trained at Indian FTOs (791)
              </span>
              <span className="inline-flex items-center gap-2 font-sans text-[13px] text-zinc-600">
                <span className="w-3 h-3 rounded-sm" style={{ background: AMBER }} /> Trained abroad (540)
              </span>
            </div>
          </Figure>

          <Figure
            number="06"
            title="South Asia's share of the hiring wave"
            subtitle="Boeing projects 141,000 new aviation personnel for South Asia through 2044, and names it among the two fastest-growing regions in the world, with staffing demand expected to more than triple."
            source="Boeing, Pilot and Technician Outlook 2025–2044 (22 July 2025)"
            table={<DataTable head={['Role', 'People needed in South Asia by 2044']} rows={data.southAsia.map((d) => [d.role, d.people])} />}
          >
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.southAsia} layout="vertical" margin={{ top: 4, right: 56, bottom: 4, left: 4 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category" dataKey="role" width={96} tickLine={false} axisLine={false}
                    tick={{ fill: INK, fontSize: 13, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  />
                  <Tooltip {...tooltipStyle} formatter={((v: unknown) => [Number(v).toLocaleString('en-IN'), 'People needed']) as never} />
                  <Bar dataKey="people" radius={[0, 4, 4, 0]} barSize={26}>
                    {data.southAsia.map((d) => (
                      <Cell key={d.role} fill={d.role === 'Pilots' ? BLUE : '#93C5FD'} />
                    ))}
                    <LabelList
                      dataKey="people" position="right" formatter={((v: unknown) => compact(Number(v))) as never}
                      style={{ fill: INK, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </div>
      </section>

      {/* ── Regulators ── */}
      <section className="relative py-12 md:py-16 bg-white border-t border-zinc-100">
        <div className="max-w-[900px] mx-auto px-6">
          <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-sky-600 uppercase">
            One standard, three rulebooks
          </span>
          <h2 className="font-heading font-extrabold text-[26px] md:text-[36px] text-zinc-900 leading-tight mt-2 mb-4">
            The same aircraft, the same syllabus, different paperwork
          </h2>
          <p className="font-sans text-[16px] text-zinc-600 leading-relaxed max-w-[760px] mb-8">
            ICAO sets the standards that national authorities implement, which is why an academy in Pune, Prague
            and Phoenix teaches broadly the same exercises but files entirely different returns. The operational
            layer is common; the reporting layer is local.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                code: 'ICAO',
                name: 'The global baseline',
                body: 'Annex 19 requires a Safety Management System on four pillars — policy, risk management, assurance and promotion. Annex 1 sets the licensing baseline. National rules are built on top of these, which is why a system modelled on ICAO structure ports between countries.',
                note: 'Amendment 2 applicable November 2026',
                tone: 'sky',
              },
              {
                code: 'EASA',
                name: 'Europe',
                body: 'Training organisations are approved as ATOs under Regulation (EU) No 1178/2011. Registers are held by each national authority rather than centrally, so an operator working across member states answers to several authorities under one shared rulebook.',
                note: 'Largest regional demand: 550,000 people',
                tone: 'violet',
              },
              {
                code: 'FAA',
                name: 'United States',
                body: 'Approved schools operate under 14 CFR Part 141 with an FAA-approved syllabus and mandatory stage checks, which is what lowers the commercial minimum to 190 hours against 250 under the unstructured Part 61 route.',
                note: '370,286 student certificates on register',
                tone: 'amber',
              },
            ].map((r) => (
              <div key={r.code} className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm flex flex-col">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-heading font-extrabold text-[20px] ${
                    r.tone === 'sky' ? 'text-sky-600' : r.tone === 'violet' ? 'text-violet-600' : 'text-amber-600'
                  }`}>
                    {r.code}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-zinc-500">{r.name}</span>
                </div>
                <p className="font-sans text-[14px] text-zinc-600 leading-relaxed flex-1">{r.body}</p>
                <p className="font-sans text-[12px] font-semibold text-zinc-400 mt-4 pt-3 border-t border-zinc-100">
                  {r.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capacity ── */}
      <section className="relative py-12 md:py-16 bg-[#F8FBFF] border-y border-blue-100">
        <div className="max-w-[900px] mx-auto px-6">
          <span className="font-sans text-[11px] font-bold tracking-[0.18em] text-sky-600 uppercase">
            The capacity arithmetic
          </span>
          <h2 className="font-heading font-extrabold text-[26px] md:text-[36px] text-zinc-900 leading-tight mt-2 mb-6">
            41 academies. 63 bases. 3,500 seats.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
            <Stat value="41" label="DGCA-approved FTOs" />
            <Stat value="63" label="Bases they operate from" />
            <Stat value="400+" label="Training aircraft" />
            <Stat value="1:1:10" label="Mandated aircraft : instructor : student ratio" />
          </div>

          <p className="font-sans text-[16px] text-zinc-600 leading-relaxed max-w-[760px]">
            Those four numbers, all stated by the Ministry of Civil Aviation, produce a ceiling: about 3,500
            cadets in training across the country at any one moment. The ratio is a regulatory floor on
            supervision quality, so capacity cannot be expanded by simply enrolling more students. It grows only
            by adding aircraft, adding instructors — or by getting more training out of the aircraft and
            instructors already on the field.
          </p>
        </div>
      </section>

      {/* ── Our reading ── */}
      <section className="relative py-12 md:py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-300 bg-zinc-50 font-sans text-[12px] font-semibold text-zinc-600 mb-6">
            Our interpretation — not the sources'
          </div>

          <h2 className="font-heading font-extrabold text-[26px] md:text-[36px] text-zinc-900 leading-tight mb-6">
            What we take from this, and why we built Neural Wings
          </h2>

          <ArgumentChain />
        </div>
      </section>

      {/* ── Sources ── */}
      <section className="relative py-12 md:py-16 bg-[#F8FBFF] border-t border-blue-100">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="font-heading font-extrabold text-[26px] md:text-[34px] text-zinc-900 leading-tight mb-3">
            Sources
          </h2>
          <p className="font-sans text-[15px] text-zinc-500 leading-relaxed mb-8 max-w-[700px]">
            Each item below is the work of the organisation named, published by them, and linked to the
            original. Cephionix has no affiliation with these organisations and claims no ownership of their
            research.
          </p>

          <ol className="flex flex-col gap-4">
            {data.sources.map((s, i) => (
              <li key={s.id} className="p-5 md:p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="font-heading font-extrabold text-[15px] text-sky-500 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-heading font-bold text-[17px] text-zinc-900 leading-snug">{s.title}</h3>
                    <p className="font-sans text-[13px] font-semibold text-zinc-500 mt-1">
                      {s.publisher} · {s.date}
                    </p>
                    <p className="font-sans text-[14px] text-zinc-600 leading-relaxed mt-3">{s.finding}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-sans text-[13px] font-bold text-sky-600 hover:text-sky-700"
                      >
                        Read the original <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {s.secondaryUrl && (
                        <a
                          href={s.secondaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-zinc-500 hover:text-sky-600"
                        >
                          Secondary source <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <p className="font-sans text-[13px] text-zinc-400 leading-relaxed mt-8">
            Figures were current when this page was last updated on 1 August 2026. Organisations revise their
            forecasts and governments update their statistics — follow the links for the current position. If
            you believe something here is misattributed or out of date, write to hello@neuralwings.org and we
            will correct it.
          </p>
        </div>
      </section>
    </Layout>
  );
}
