import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CalendarCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import logoUrl from '../../assets/logo.png';

const navLinks = [
  { label: 'Features',   href: '#features' },
  { label: 'Modules',    href: '#modules' },
  { label: 'AI Engine',  href: '#demo',     tab: 'ops' },
  { label: 'Dashboards', href: '#dashboards' },
  { label: 'Pricing',    href: '#pricing' },
  { label: 'Demo',       href: '#demo' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (link: typeof navLinks[0]) => {
    setMenuOpen(false);
    if (link.tab) {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('openDemoTab', { detail: { tab: link.tab } }));
    }
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-[1000] h-[72px] transition-all duration-300',
          'bg-white/90 backdrop-blur-xl border-b border-zinc-200',
          scrolled ? 'shadow-sm' : ''
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <img src={logoUrl} alt="Neural Wings" className="h-[36px] md:h-[40px] w-auto" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-[15px] md:text-[18px] leading-tight text-zinc-900 tracking-wide">
                NEURAL WINGS
              </span>
              <span className="font-sans font-light text-[10px] text-accent-gold leading-tight">
                by Cephionix
              </span>
            </div>
          </button>

          {/* Desktop center links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.tab ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="font-sans font-medium text-[14px] text-zinc-600 hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans font-medium text-[14px] text-zinc-600 hover:text-sky-600 transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/book-demo"
              className="px-6 py-2 rounded-xl bg-primary text-white font-sans text-sm font-medium transition-all duration-300 hover:bg-primary-hover shadow-sm"
            >
              Book a Demo
            </Link>
          </div>

          {/* Mobile right side: Book Demo + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/book-demo"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg,#06b6d4,#3b82f6)' }}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Book Demo</span>
            </Link>
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-[72px] left-0 w-full bg-white border-b border-zinc-200 shadow-xl z-[999] lg:hidden"
            >
              <div className="max-w-[1280px] mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  link.tab ? (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link)}
                      className="w-full flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-sky-600 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-[15px] font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                ))}

                <div className="mt-2 pt-3 border-t border-zinc-100">
                  <Link
                    to="/book-demo"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[15px] font-bold text-white shadow-md"
                    style={{ background: 'linear-gradient(135deg,#06b6d4,#3b82f6)' }}
                  >
                    <CalendarCheck className="w-4 h-4" />
                    Book a Live Demonstration
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
