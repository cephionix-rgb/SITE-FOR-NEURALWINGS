import { Suspense, lazy, useEffect, useRef, useState } from 'react';

// Same section the research report uses. Mounted only when it comes near the
// viewport, so the landing page never pays for d3 and the world atlas up front.
const JurisdictionReport = lazy(() =>
  import('../research/JurisdictionReport').then((m) => ({ default: m.JurisdictionReport }))
);

export function GlobalReach() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={<div className="h-[540px] bg-[#F8FBFF] border-y border-blue-100" />}>
          <JurisdictionReport flat />
        </Suspense>
      ) : (
        <div className="h-[540px] bg-[#F8FBFF] border-y border-blue-100" />
      )}
    </div>
  );
}
