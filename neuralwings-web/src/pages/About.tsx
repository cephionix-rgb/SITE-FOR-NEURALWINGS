import { Link } from 'react-router-dom';
import { Plane, Activity, GraduationCap, ArrowRight, ArrowUpRight } from 'lucide-react';
import { DocPage, DocSection, DocList } from '../components/layout/DocPage';
import { CONTACT_EMAIL } from '../lib/contact';

const MailLink = ({ address }: { address: string }) => (
  <a href={`mailto:${address}`} className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
    {address}
  </a>
);

export function About() {
  return (
    <DocPage
      eyebrow="About Cephionix"
      title="Systems for work where mistakes are expensive."
      intro="Cephionix builds AI-assisted software for regulated, safety-critical industries — starting with aviation training and healthcare."
    >
      <DocSection title="What we do">
        <p>
          Cephionix designs operating systems for organisations that run on compliance, records, and timing —
          places where a missed renewal, an unrecorded snag, or an untracked duty hour is a real problem, not a
          spreadsheet inconvenience. Our approach is the same in every sector we work in: put every operational
          record in one system, let an intelligence layer watch it continuously, and surface the decision before
          it becomes an incident.
        </p>
      </DocSection>

      <DocSection title="Our products">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          <div id="neural-wings" className="scroll-mt-28 p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
              <Plane className="w-5 h-5 text-sky-500" />
            </div>
            <h3 className="font-heading font-bold text-[19px] text-zinc-900 mb-2">Neural Wings</h3>
            <p className="text-[14px] leading-relaxed text-zinc-600 mb-4">
              A complete aviation management platform for DGCA-approved flight training organisations — 19
              integrated modules covering flight operations, fleet airworthiness, cadet records, ground
              training, safety management, finance, and compliance, all driven by the AIRE intelligence engine.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Explore the platform <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div id="earnwings" className="scroll-mt-28 p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-heading font-bold text-[19px] text-zinc-900 mb-2">EARNWINGS</h3>
            <p className="text-[14px] leading-relaxed text-zinc-600 mb-4">
              The cadet side of the same problem. EARNWINGS is a DGCA CPL and ATPL preparation app — real-airway
              flight planning, an RT trainer, an AI Captain, visual notes, and full mock exams — built to get
              student pilots through their exams and into the right seat. Currently taking founding-cadet
              sign-ups.
            </p>
            <a
              href="https://earnwings.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-amber-600 hover:text-amber-700 transition-colors"
            >
              Visit earnwings.org <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div id="verios" className="scroll-mt-28 p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="font-heading font-bold text-[19px] text-zinc-900 mb-2">VERIOS — Oncology</h3>
            <p className="text-[14px] leading-relaxed text-zinc-600 mb-4">
              Cephionix's healthcare initiative, applying the same record-first, decision-support approach to
              oncology care coordination. VERIOS is in active development and is not yet generally available.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=VERIOS%20enquiry`}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-violet-600 hover:text-violet-700 transition-colors"
            >
              Request an introduction <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </DocSection>

      <DocSection title="How we build">
        <DocList
          items={[
            'Domain first. Neural Wings was specified with pilots, instructors, and FTO post holders — not inferred from a generic ERP template.',
            'Compliance is a feature, not a report. DGCA requirements are modelled inside the system, so the audit trail is a by-product of daily work.',
            'Intelligence with a paper trail. Every automated recommendation — a dispatch call, a roster, an alert — is logged with its inputs and remains reviewable by a qualified human.',
            'Deployed fast. A new FTO can be operational in under 72 hours.',
          ]}
        />
      </DocSection>

      <DocSection id="careers" title="Careers">
        <p>
          We are a small team based in India, working across aviation software, applied AI, and product design.
          We hire people who are unusually careful about details, and we are especially interested in pilots,
          instructors, and engineers who have lived inside the operations we are rebuilding.
        </p>
        <p>
          We do not always have formal openings posted. Applications are welcome year-round — send your CV and a
          short note about what you want to work on to{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Careers%20%E2%80%94%20application`}
            className="text-sky-600 font-semibold hover:text-sky-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          with the subject line "Careers".
        </p>
      </DocSection>

      <DocSection title="Talk to us">
        <p>
          For partnerships, press, or general enquiries, write to <MailLink address={CONTACT_EMAIL} />. If you
          run an FTO and want to see the platform on your own numbers,{' '}
          <Link to="/book-demo" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            book a demo
          </Link>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
