import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { DocPage } from '../components/layout/DocPage';
import faq from '../content/faq.json';
import { CONTACT_EMAIL } from '../lib/contact';

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-2xl bg-white overflow-hidden transition-colors hover:border-sky-200">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 text-left px-5 py-4"
      >
        <h3 className="font-heading font-bold text-[16px] md:text-[17px] text-zinc-900 leading-snug">{q}</h3>
        <ChevronDown
          className={`w-4 h-4 text-sky-500 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Rendered always, collapsed with CSS — crawlers and AI answer engines
          read the answer whether or not the visitor has expanded it. */}
      <div className={open ? 'block' : 'hidden'}>
        <p className="px-5 pb-5 font-sans text-[15px] leading-relaxed text-zinc-600">{a}</p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <DocPage
      eyebrow="Answers"
      title="Frequently asked questions"
      updated="1 August 2026"
      intro="What Neural Wings does, how it handles DGCA compliance, who owns your data, and what it takes to get an academy running on it."
    >
      {faq.map((section) => (
        <section key={section.section} className="scroll-mt-28">
          <h2 className="font-heading font-bold text-[21px] md:text-[26px] text-zinc-900 leading-snug mb-4">
            {section.section}
          </h2>
          <div className="flex flex-col gap-3">
            {section.items.map((item) => (
              <Item key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className="font-heading font-bold text-[21px] md:text-[26px] text-zinc-900 leading-snug mb-3">
          Still have a question?
        </h2>
        <p className="font-sans text-[15px] leading-relaxed text-zinc-600">
          Write to{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sky-600 font-semibold hover:text-sky-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          and a person will answer it — or{' '}
          <Link to="/book-demo" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            book a demonstration
          </Link>{' '}
          and ask it live. Unfamiliar terminology is explained in the{' '}
          <Link to="/glossary" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            aviation training glossary
          </Link>
          .
        </p>
      </section>
    </DocPage>
  );
}
