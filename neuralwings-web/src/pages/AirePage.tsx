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
      {/* paddingTop clears the fixed navbar; flowchart has its own inner padding */}
      <div style={{ paddingTop: '72px', background: '#F5F8FF', marginTop: 0 }}>
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
