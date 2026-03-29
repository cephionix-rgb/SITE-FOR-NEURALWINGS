import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logoUrl from '../../assets/logo.png';
import videoUrl from '../../assets/POV_flight_through.mp4';

interface IntroSequenceProps {
  onComplete: () => void;
}

export function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [isPlaying, setIsPlaying] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem('introPlayed')
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
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

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introPlayed', 'true');
        setIsPlaying(false);
        onComplete();
      }
    });

    // Phase 2: text animations
    // 1.5s
    tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.5);
    // 2.8s
    tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 2.8);
    // 4.0s
    tl.to([text1Ref.current, text2Ref.current], { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 4.0);

    // Phase 3: White wash out & Logo
    tl.to(whiteOverlayRef.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' }, 4.5);
    tl.to(burstRef.current, { opacity: 0.15, scale: 2, duration: 1.5, ease: 'power2.out' }, 5.0);
    tl.to(logoRef.current, { scale: 1, opacity: 1, duration: 1.0, ease: 'back.out(1.7)' }, 5.0);

    // Phase 4: Dissolve downward
    tl.to(containerRef.current, { y: '100%', duration: 1.5, ease: 'power3.inOut' }, 7.5);

    return () => {
      tl.kill();
    };
  }, [isPlaying, onComplete]);

  if (!isPlaying) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#04011A] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
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
            className="absolute font-heading font-bold text-[36px] md:text-[52px] text-zinc-900 tracking-[0.08em] drop-shadow-xl opacity-0 translate-y-10 text-center px-4"
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

      {/* White washout overlay & Logo */}
      <div ref={whiteOverlayRef} className="absolute inset-0 bg-[#04011A] opacity-0 z-20 flex items-center justify-center pointer-events-none">
        <div 
          ref={burstRef}
          className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,cyan,blue)] blur-[40px] opacity-0 scale-50"
        />
        <img 
          ref={logoRef}
          src={logoUrl} 
          alt="Neural Wings"
          className="relative w-[200px] h-auto object-contain scale-0 opacity-0 drop-shadow-2xl z-30"
        />
      </div>
    </div>
  );
}
