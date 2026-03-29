import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logoUrl from '../../assets/logo.png';
import videoUrl from '../../assets/POV_flight_through.mp4';

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [isPlaying] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem('introPlayed')
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) {
      onComplete();
      return;
    }

    const video = videoRef.current;

    // Text animations — appear early, gone before logo emerges from clouds (~5s)
    const textTl = gsap.timeline();
    textTl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.4);
    textTl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.2);
    textTl.to([text1Ref.current, text2Ref.current], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 3.2);

    // Logo reveal — triggered only when video actually ends
    const showLogo = () => {
      const logoTl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('introPlayed', 'true');
          onComplete();
        }
      });

      // Fade out texts
      logoTl.to([text1Ref.current, text2Ref.current], { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' });
      // Sky gradient fades in
      logoTl.to(whiteOverlayRef.current, { opacity: 1, duration: 1.2, ease: 'power2.inOut' });
      // Burst glow + logo pop in
      logoTl.to(burstRef.current, { opacity: 0.15, scale: 2, duration: 1.5, ease: 'power2.out' }, '-=0.6');
      logoTl.to(logoRef.current, { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.7)' }, '-=1.2');
      // Hold for 2s then slide down
      logoTl.to(containerRef.current, { y: '100%', duration: 1.5, ease: 'power3.inOut' }, '+=2.0');
    };

    if (video) {
      video.addEventListener('ended', showLogo);
    }

    return () => {
      textTl.kill();
      if (video) video.removeEventListener('ended', showLogo);
    };
  }, [isPlaying, onComplete]);

  if (!isPlaying) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#04011A] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* VEO Watermark Blur & Logo Replacement */}
      <div className="absolute bottom-[20px] right-[20px] z-[60] w-[140px] h-[45px] backdrop-blur-3xl bg-transparent/95 rounded-md flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/5">
        <img src={logoUrl} alt="Neural Wings" className="max-w-full max-h-full object-contain" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Text overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <h1
            ref={text1Ref}
            className="absolute font-heading font-bold text-[36px] md:text-[52px] text-white tracking-[0.08em] drop-shadow-xl opacity-0 translate-y-10 text-center px-4"
          >
            BUILT BY PILOTS.
          </h1>
          <h1
            ref={text2Ref}
            className="absolute mt-32 font-heading font-bold text-[36px] md:text-[52px] text-accent-gold tracking-[0.08em] drop-shadow-xl opacity-0 translate-y-10 text-center px-4"
          >
            BUILT FOR PILOTS.
          </h1>
        </div>
      </div>

      {/* Sky gradient overlay & Logo */}
      <div
        ref={whiteOverlayRef}
        className="absolute inset-0 opacity-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0EA5E9 0%, #38BDF8 25%, #7DD3FC 55%, #E0F2FE 80%, #ffffff 100%)' }}
      >
        <div
          ref={burstRef}
          className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-0 scale-50"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(186,230,253,0.4))' }}
        />
        <img
          ref={logoRef}
          src={logoUrl}
          alt="Neural Wings"
          className="relative w-[320px] md:w-[420px] h-auto object-contain scale-0 opacity-0 drop-shadow-2xl z-30"
        />
      </div>
    </div>
  );
}
