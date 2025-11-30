import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Terms } from './components/Terms';
import { Privacy } from './components/Privacy';
import { Support } from './components/Support';
import { Calculators } from './components/Calculators';
import { InvestmentPage } from './components/tools/InvestmentPage';
import { VacationPage } from './components/tools/VacationPage';
import { EnergyPage } from './components/tools/EnergyPage';
import { FuelPage } from './components/tools/FuelPage';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculadoras" element={<Calculators />} />
            <Route path="/calculadoras/investimentos" element={<InvestmentPage />} />
            <Route path="/calculadoras/ferias" element={<VacationPage />} />
            <Route path="/calculadoras/energia" element={<EnergyPage />} />
            <Route path="/calculadoras/combustivel" element={<FuelPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
