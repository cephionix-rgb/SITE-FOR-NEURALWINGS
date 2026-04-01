import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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

// Import the new BookDemo page
import { BookDemo } from './pages/BookDemo';
import { WhyNeuralWings } from './pages/WhyNeuralWings';

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/why-neural-wings" element={<WhyNeuralWings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
