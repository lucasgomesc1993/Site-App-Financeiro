import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { ScrollToTop } from './components/ScrollToTop';
import { PromoPopup } from './components/PromoPopup';

// Lazy load non-critical routes
const Terms = lazy(() => import('./components/Terms').then(module => ({ default: module.Terms })));
const Privacy = lazy(() => import('./components/Privacy').then(module => ({ default: module.Privacy })));
const Support = lazy(() => import('./components/Support').then(module => ({ default: module.Support })));
const Calculators = lazy(() => import('./components/Calculators').then(module => ({ default: module.Calculators })));
const InvestmentPage = lazy(() => import('./components/tools/InvestmentPage').then(module => ({ default: module.InvestmentPage })));
const VacationPage = lazy(() => import('./components/tools/VacationPage').then(module => ({ default: module.VacationPage })));
const EnergyPage = lazy(() => import('./components/tools/EnergyPage').then(module => ({ default: module.EnergyPage })));
const FuelPage = lazy(() => import('./components/tools/FuelPage').then(module => ({ default: module.FuelPage })));
const TerminationPage = lazy(() => import('./components/tools/TerminationPage').then(module => ({ default: module.TerminationPage })));
const INSSPage = lazy(() => import('./components/tools/INSSPage').then(module => ({ default: module.INSSPage })));

function App() {
  return (
    <Router>
      <HelmetProvider>
        <ScrollToTop />
        <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary">
          <Header />
          <main>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculadoras" element={<Calculators />} />
                <Route path="/calculadoras/investimentos" element={<InvestmentPage />} />
                <Route path="/calculadoras/ferias" element={<VacationPage />} />
                <Route path="/calculadoras/energia" element={<EnergyPage />} />
                <Route path="/calculadoras/combustivel" element={<FuelPage />} />
                <Route path="/calculadoras/rescisao" element={<TerminationPage />} />
                <Route path="/calculadoras/inss" element={<INSSPage />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/support" element={<Support />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <PromoPopup />
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;
