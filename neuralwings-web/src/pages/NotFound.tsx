import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { CONTACT_EMAIL } from '../lib/contact';

const links = [
  { label: 'Home', to: '/' },
  { label: 'AIRE Engine', to: '/aire' },
  { label: 'Why Neural Wings', to: '/why-neural-wings' },
  { label: 'Book a Demo', to: '/book-demo' },
  { label: 'About Cephionix', to: '/about' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Copyright & IP', to: '/copyright' },
];

export function NotFound() {
  return (
    <Layout>
      <div className="relative min-h-[70vh] pt-32 pb-24 bg-gradient-to-b from-[#F0F7FF] to-white overflow-hidden flex items-center">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-200/25 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[720px] mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 font-sans text-[12px] font-semibold text-sky-600 tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Error 404 — Off Course
          </span>

          <h1 className="font-heading font-extrabold text-[40px] md:text-[60px] text-zinc-900 leading-tight mb-4">
            This page isn't on the chart.
          </h1>

          <p className="font-sans text-[16px] text-zinc-500 leading-relaxed mb-10 max-w-[480px] mx-auto">
            The link may be outdated or mistyped. Here's the way back to somewhere useful.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2.5 rounded-full border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-700 hover:border-sky-300 hover:text-sky-600 shadow-sm transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sky-500 text-white font-sans font-bold text-[15px] shadow-lg shadow-sky-200 hover:bg-sky-600 transition-colors"
          >
            Book a Live Demonstration
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="font-sans text-[13px] text-zinc-400 mt-8">
            Still stuck? Write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-600 font-semibold hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
