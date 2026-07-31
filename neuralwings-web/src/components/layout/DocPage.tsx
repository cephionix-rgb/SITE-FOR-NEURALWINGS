import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, LifeBuoy } from 'lucide-react';
import { Layout } from './Layout';
import { CONTACT_EMAIL, SUPPORT_EMAIL } from '../../lib/contact';

interface DocPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  children: ReactNode;
}

export function DocPage({ eyebrow, title, intro, updated, children }: DocPageProps) {
  return (
    <Layout>
      <div className="relative pt-28 md:pt-32 pb-20 md:pb-24 bg-gradient-to-b from-[#F0F7FF] to-white overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-200/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-sky-200/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-[840px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 font-sans text-[12px] font-semibold text-sky-600 tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            {eyebrow}
          </span>

          <h1 className="font-heading font-extrabold text-[34px] md:text-[52px] text-zinc-900 leading-tight mb-5">
            {title}
          </h1>

          <p className="font-sans text-[16px] md:text-[17px] text-zinc-500 leading-relaxed max-w-[640px]">
            {intro}
          </p>

          {updated && (
            <p className="font-sans text-[13px] text-zinc-400 mt-4">Last updated: {updated}</p>
          )}

          <div className="h-px w-full bg-gradient-to-r from-sky-300 to-transparent my-10" />

          <div className="flex flex-col gap-10">{children}</div>

          {/* Contact strip */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-sky-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">General</span>
                <span className="text-[14px] font-semibold text-zinc-800 group-hover:text-sky-600 transition-colors truncate">
                  {CONTACT_EMAIL}
                </span>
              </div>
            </a>

            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 bg-white hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                <LifeBuoy className="w-4 h-4 text-violet-500" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Support</span>
                <span className="text-[14px] font-semibold text-zinc-800 group-hover:text-violet-600 transition-colors truncate">
                  {SUPPORT_EMAIL}
                </span>
              </div>
            </a>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-10 font-sans text-[14px] font-semibold text-zinc-500 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export function DocSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-heading font-bold text-[21px] md:text-[26px] text-zinc-900 leading-snug mb-3">
        {title}
      </h2>
      <div className="flex flex-col gap-3 font-sans text-[15px] leading-relaxed text-zinc-600">
        {children}
      </div>
    </section>
  );
}

export function DocList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5 mt-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}
