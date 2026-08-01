import { useEffect, useRef } from 'react';
import { Layout } from '../components/layout/Layout';

export function AirePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resize = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc?.body) return;
        // Use scrollHeight so we capture full content height
        const h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
        iframe.style.height = h + 'px';
      } catch {
        // same-origin only — silently ignore
      }
    };

    // Resize on load, then poll to catch async font/image/animation load
    iframe.addEventListener('load', () => {
      resize();
      setTimeout(resize, 300);
      setTimeout(resize, 800);
      setTimeout(resize, 2000);
      setTimeout(resize, 4000);
    });
  }, []);

  return (
    <Layout>
      {/* The flowchart below lives in an iframe, whose text belongs to that document and not
          to this page. This header is what describes /aire to a reader or a crawler. */}
      <section className="pt-[112px] pb-10 px-6 bg-[#F5F8FF]">
        <div className="max-w-[860px] mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 font-sans text-[12px] font-semibold text-sky-600 tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            The engine inside Neural Wings
          </span>

          <h1 className="font-heading font-extrabold text-[34px] md:text-[52px] text-zinc-900 leading-tight mb-5">
            AIRE — the intelligence engine behind every dispatch decision
          </h1>

          <p className="font-sans text-[16px] md:text-[17px] text-zinc-600 leading-relaxed max-w-[720px] mx-auto mb-4">
            AIRE is the autonomous rostering and dispatch engine at the core of Neural Wings. It builds the
            daily flying programme, then evaluates more than fifteen parameters before any sortie is authorised
            — aircraft airworthiness, cadet and instructor currency, duty-time limits, weather minima, fuel
            sufficiency and active NOTAMs.
          </p>

          <p className="font-sans text-[15px] text-zinc-500 leading-relaxed max-w-[720px] mx-auto">
            Every authorisation it issues is logged with the inputs behind it, so the decision trail is
            reviewable by a Chief Flight Instructor and defensible in a DGCA audit. The diagram below walks
            through that logic end to end.
          </p>
        </div>
      </section>

      {/* flowchart has its own inner padding */}
      <div style={{ background: '#F5F8FF', marginTop: 0 }}>
        <iframe
          ref={iframeRef}
          src="/aire_flowchart.html"
          title="AIRE — AI Roster Engine"
          style={{
            width: '100%',
            minHeight: '100vh',
            height: 'auto',
            border: 'none',
            display: 'block',
          }}
        />
      </div>
    </Layout>
  );
}
