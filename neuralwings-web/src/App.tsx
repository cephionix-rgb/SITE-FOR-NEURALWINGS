import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useRouteMeta } from './lib/useRouteMeta';

function RouteMeta() {
  useRouteMeta();
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Let the new route paint before looking for the anchor.
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
import { Layout } from './components/layout/Layout';
import { IntroSequence } from './components/sections/IntroSequence';
import { Hero } from './components/sections/Hero';
import { Problem } from './components/sections/Problem';
import { Solution } from './components/sections/Solution';
import { SolarSystemExplorer } from './components/sections/SolarSystemExplorer';
import { RoleCarousel } from './components/sections/RoleCarousel';
import { InteractiveDemo } from './components/sections/InteractiveDemo';
import { RevenueSection } from './components/sections/RevenueSection';
import { TechStack } from './components/sections/TechStack';
import { Security } from './components/sections/Security';
import { CTA } from './components/sections/CTA';

// Secondary pages are code-split: a visitor landing on the home page should not
// download the legal pages, the AIRE page and the war-room dashboards up front.
const BookDemo = lazy(() => import('./pages/BookDemo').then((m) => ({ default: m.BookDemo })));
const WhyNeuralWings = lazy(() => import('./pages/WhyNeuralWings').then((m) => ({ default: m.WhyNeuralWings })));
const AirePage = lazy(() => import('./pages/AirePage').then((m) => ({ default: m.AirePage })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const CopyrightNotice = lazy(() => import('./pages/CopyrightNotice').then((m) => ({ default: m.CopyrightNotice })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const Glossary = lazy(() => import('./pages/Glossary').then((m) => ({ default: m.Glossary })));
const Research = lazy(() => import('./pages/Research').then((m) => ({ default: m.Research })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function LandingPage() {
  const [introFinished, setIntroFinished] = useState(() => {
    // If sessionStorage has the flag, intro is already finished.
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('introPlayed');
    }
    return false;
  });

  return (
    <>
      <IntroSequence onComplete={() => setIntroFinished(true)} />
      <div className={introFinished ? 'opacity-100' : 'opacity-0 h-[100vh] overflow-hidden'}>
        <Layout>
          {/* Main Content Sections */}
          <Hero />
          <Problem />
          <Solution />
          <SolarSystemExplorer />
          <RoleCarousel />
          <InteractiveDemo />
          <RevenueSection />
          <TechStack />
          <Security />
          <CTA />
        </Layout>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteMeta />
      <Suspense fallback={<div className="min-h-screen bg-[#F8FBFF]" />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/why-neural-wings" element={<WhyNeuralWings />} />
          <Route path="/aire" element={<AirePage />} />
          <Route path="/research" element={<Research />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms-of-service" element={<Terms />} />
          <Route path="/copyright" element={<CopyrightNotice />} />
          <Route path="/ip" element={<CopyrightNotice />} />
          <Route path="/intellectual-property" element={<CopyrightNotice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
