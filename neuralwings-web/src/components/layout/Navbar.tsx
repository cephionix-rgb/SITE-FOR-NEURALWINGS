import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import logoUrl from '../../assets/logo.png';

const WA_LINK =
  'https://wa.me/919646341001?text=Hi%2C%20I%27d%20like%20to%20book%20a%20Neural%20Wings%20demo';

const navLinks = [
  { label: 'Features',   href: '#features' },
  { label: 'Modules',    href: '#modules' },
  { label: 'AI Engine',  href: '#demo',     tab: 'ops' },
  { label: 'Dashboards', href: '#dashboards' },
  { label: 'Pricing',    href: '#pricing' },
  { label: 'Demo',       href: '#demo' },
];

function WhatsAppIcon({ size = 20, color = '#25D366' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setFloatingVisible(y > 300);
    };
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
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}
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
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-sky-500 text-white font-sans text-sm font-bold transition-all duration-300 hover:bg-sky-600 shadow-sm"
            >
              Contact Sales
            </a>
          </div>

          {/* Mobile right side: Book Demo + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-sky-500 text-white shadow-sm hover:bg-sky-600 transition-colors"
            >
              <WhatsAppIcon size={14} color="white" />
              <span className="hidden xs:inline">Contact Sales</span>
            </a>
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
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[15px] font-bold text-white shadow-md bg-sky-500 hover:bg-sky-600 transition-colors"
                  >
                    <WhatsAppIcon size={16} color="white" />
                    Contact Sales
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating bottom-right CTA — appears after 300px scroll */}
      <AnimatePresence>
        {floatingVisible && (
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-[999] flex items-center gap-2.5 px-4 py-3 bg-white border border-[#e2e8f0] rounded-full shadow-lg text-sm font-bold text-zinc-800 hover:shadow-xl hover:border-green-200 transition-shadow"
          >
            <WhatsAppIcon size={20} color="#25D366" />
            Contact Sales
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
