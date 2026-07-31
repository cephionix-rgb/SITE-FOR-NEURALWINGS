import { Link } from 'react-router-dom';
import {
  Code2, Palette, Camera, LayoutGrid, Brain, BadgeCheck,
  ShieldAlert, Gavel, XCircle, CheckCircle2,
} from 'lucide-react';
import { DocPage, DocSection } from '../components/layout/DocPage';
import { CONTACT_EMAIL } from '../lib/contact';

const protectedWorks = [
  {
    icon: Code2,
    tone: 'sky',
    title: 'The application itself',
    body: 'All source code, architecture, database design, APIs, and integrations behind Neural Wings — built in-house by Cephionix, owned entirely by Cephionix.',
  },
  {
    icon: BadgeCheck,
    tone: 'amber',
    title: 'The logo and the brand',
    body: 'The Neural Wings winged logo and wordmark, the Cephionix name, AIRE, EARNWINGS, VERIOS, and "Built by Pilots. Built for Pilots." are our trade marks. No copies, no lookalikes.',
  },
  {
    icon: Camera,
    tone: 'violet',
    title: 'Screenshots and demos',
    body: 'Every screen, dashboard, chart, and screenshot on this site or in a live demo is a copyrighted work. Capturing or republishing them needs our written permission.',
  },
  {
    icon: LayoutGrid,
    tone: 'emerald',
    title: 'How the information is presented',
    body: 'The module structure, role-based dashboards, the grouping and hierarchy of every number and alert, the terminology, the workflow from signal to decision — the arrangement is the invention, and it is protected.',
  },
  {
    icon: Brain,
    tone: 'blue',
    title: 'The AIRE engine',
    body: 'The rules, parameters, thresholds, scoring logic, and models behind the Go/No-Go engine and the scheduler are proprietary and confidential.',
  },
  {
    icon: Palette,
    tone: 'rose',
    title: 'The design and the words',
    body: 'Layouts, interaction patterns, animations, icons, colour systems, illustrations, module names, feature copy, and documentation — all original work, all ours.',
  },
];

const toneMap: Record<string, { bg: string; text: string; border: string }> = {
  sky: { bg: 'bg-sky-50', text: 'text-sky-500', border: 'hover:border-sky-300' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-500', border: 'hover:border-amber-300' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-500', border: 'hover:border-violet-300' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500', border: 'hover:border-emerald-300' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-500', border: 'hover:border-blue-300' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500', border: 'hover:border-rose-300' },
};

const prohibited = [
  'Copying our code, designs, screens, or text — in whole or in part.',
  'Rebuilding the same product after studying this site, a screenshot, a demo, or a live instance.',
  'Renaming our modules, changing our colours, or re-drawing our screens and calling it your own.',
  'Handing our screenshots to a developer or agency as a specification or reference.',
  'Using our screens in a pitch deck, tender, RFP response, brochure, or comparison.',
  'Scraping this site, or using our content to train an AI model.',
  'Using our name, logo, or a confusingly similar mark, domain, or app name.',
  'Reverse engineering the platform or the AIRE logic.',
];

const permitted = [
  'Browsing this site to evaluate Neural Wings for your organisation.',
  'Saving or printing a page for your own internal reference.',
  'Linking to us, without framing or implying a relationship that does not exist.',
  'Quoting a short extract for genuine news reporting or review, with attribution.',
  'Anything else we have agreed to in writing — just ask us first.',
];

export function CopyrightNotice() {
  return (
    <DocPage
      eyebrow="Intellectual Property"
      title="This is our work. All of it."
      updated="31 July 2026"
      intro="Neural Wings — the application, the logo, the screens, the screenshots, and the way information is presented inside it — is the exclusive property of Cephionix. It is not open source, not free to reuse, and not available to be rebuilt by anyone else."
    >
      {/* Headline notice */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-[19px] md:text-[21px] text-zinc-900 mb-2">
              © 2026 Cephionix. All rights reserved.
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-zinc-700">
              Neural Wings was designed and developed entirely in-house, over a long period and at substantial
              cost. Every part of it is protected under the Copyright Act, 1957, the Trade Marks Act, 1999, the
              Designs Act, 2000, the Information Technology Act, 2000, and Indian law on confidence and trade
              secrets — plus equivalent law and international treaties wherever this site can be reached.{' '}
              <strong className="text-zinc-900">
                Viewing this site, attending a demo, or being a customer gives you no licence to reproduce any
                of it.
              </strong>
            </p>
          </div>
        </div>
      </div>

      <DocSection title="What is protected">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {protectedWorks.map((item) => {
            const tone = toneMap[item.tone];
            return (
              <div
                key={item.title}
                className={`p-5 rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all ${tone.border} hover:shadow-md`}
              >
                <div className={`w-10 h-10 rounded-xl ${tone.bg} flex items-center justify-center mb-3`}>
                  <item.icon className={`w-[18px] h-[18px] ${tone.text}`} />
                </div>
                <h3 className="font-heading font-bold text-[16px] text-zinc-900 mb-1.5">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-zinc-600">{item.body}</p>
              </div>
            );
          })}
        </div>
      </DocSection>

      <DocSection title="Copying the presentation counts as copying">
        <p>
          The most valuable thing about Neural Wings is not any single screen — it is the arrangement. Which
          role sees which numbers. What is raised as an alert and what stays quiet. How a dispatch decision is
          broken into its parts. How compliance is scored, coloured, and ranked. How nineteen modules are named,
          grouped, and sequenced so an FTO can actually run on them.
        </p>
        <p>
          That selection, structure, sequence, and organisation is our original expression, our trade dress, and
          our confidential know-how.{' '}
          <strong className="text-zinc-800">
            Reproducing it is an infringement whether you copy our files or simply study our product and rebuild
            what you saw.
          </strong>{' '}
          A different colour palette, renamed modules, or redrawn screens do not make a copy lawful — and they
          do not make one hard to recognise.
        </p>
      </DocSection>

      <DocSection title="Specifically, you may not">
        <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5 md:p-6 mt-1">
          <ul className="flex flex-col gap-3">
            {prohibited.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                <span className="text-[15px] leading-relaxed text-zinc-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2">
          This applies to everyone equally — visitors, prospects, customers, former customers, employees,
          contractors, vendors, and investors.
        </p>
      </DocSection>

      <DocSection title="What you may do">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 md:p-6 mt-1">
          <ul className="flex flex-col gap-3">
            {permitted.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-[15px] leading-relaxed text-zinc-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection title="What happens if you copy it">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
              <Gavel className="w-[18px] h-[18px] text-zinc-600" />
            </div>
            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-zinc-600">
              <p>
                We monitor for copies of our software, designs, and screens, and we act on what we find —
                takedown notices to your host, registrar, app store, and search engines; urgent injunctions and
                evidence-preservation orders; claims for damages, an account of your profits, delivery-up of
                infringing material, and our legal costs; immediate termination of any access or agreement you
                have with us; and notice to your customers, investors, or regulator where their interests are
                affected.
              </p>
              <p>
                Copyright infringement is also a criminal offence in India under section 63 of the Copyright
                Act, 1957 — imprisonment of six months to three years and a fine of ₹50,000 to ₹2,00,000. Trade
                mark falsification carries comparable penalties under sections 103 and 104 of the Trade Marks
                Act, 1999, and unauthorised access to or extraction from our systems attracts liability under
                sections 43, 65, and 66 of the Information Technology Act, 2000.
              </p>
              <p className="font-semibold text-zinc-800">
                Put simply: building something like this out of our work will cost you far more than licensing
                it would have.
              </p>
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection title="If you want to use something of ours">
        <p>
          Permission is often available. Press and analysts can request logo and screenshot assets, partners can
          discuss integrations, and vendors can ask about licensing. Write to{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Permission%20request`}
            className="text-sky-600 font-semibold hover:text-sky-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          and ask. Taking it without asking is the only option that ends badly.
        </p>
        <p>
          Found someone copying Neural Wings? Tell us at the same address — we follow up on every report.
        </p>
        <p className="text-[14px] text-zinc-500">
          This page states our position in plain language. The binding terms are in our{' '}
          <Link to="/terms" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Terms of Service
          </Link>
          , sections 7 to 15.
        </p>
      </DocSection>
    </DocPage>
  );
}
