import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

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
const NetSalaryPage = lazy(() => import('./components/tools/NetSalaryPage').then(module => ({ default: module.NetSalaryPage })));
const ThirteenthSalaryPage = lazy(() => import('./components/tools/ThirteenthSalaryPage').then(module => ({ default: module.ThirteenthSalaryPage })));
const OvertimePage = lazy(() => import('./components/tools/OvertimePage').then(module => ({ default: module.OvertimePage })));
const UnemploymentInsurancePage = lazy(() => import('./components/tools/UnemploymentInsurancePage').then(module => ({ default: module.UnemploymentInsurancePage })));
const NightShiftPage = lazy(() => import('./components/tools/NightShiftPage').then(module => ({ default: module.NightShiftPage })));
const FGTSPage = lazy(() => import('./components/tools/FGTSPage').then(module => ({ default: module.FGTSPage })));
const EmployeeCostPage = lazy(() => import('./components/tools/EmployeeCostPage').then(module => ({ default: module.EmployeeCostPage })));
const PLRPage = lazy(() => import('./components/tools/PLRPage').then(module => ({ default: module.PLRPage })));
const FIREPage = lazy(() => import('./components/tools/FIREPage').then(module => ({ default: module.FIREPage })));
const CompoundInterestPage = lazy(() => import('./components/tools/CompoundInterestPage').then(module => ({ default: module.CompoundInterestPage })));
const RentVsBuyPage = lazy(() => import('./components/tools/RentVsBuyPage').then(module => ({ default: module.RentVsBuyPage })));
const UberVsCarPage = lazy(() => import('./components/tools/UberVsCarPage').then(module => ({ default: module.UberVsCarPage })));
const FirstMillionPage = lazy(() => import('./components/tools/FirstMillionPage').then(module => ({ default: module.FirstMillionPage })));
const CurrencyConverterPage = lazy(() => import('./components/tools/CurrencyConverterPage').then(module => ({ default: module.CurrencyConverterPage })));
const PixGeneratorPage = lazy(() => import('./components/tools/PixGeneratorPage').then(module => ({ default: module.PixGeneratorPage })));

function App() {
  return (
    <>
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
              <Route path="/calculadoras/salario-liquido" element={<NetSalaryPage />} />
              <Route path="/calculadoras/decimo-terceiro" element={<ThirteenthSalaryPage />} />
              <Route path="/calculadoras/horas-extras" element={<OvertimePage />} />
              <Route path="/calculadoras/seguro-desemprego" element={<UnemploymentInsurancePage />} />
              <Route path="/calculadoras/adicional-noturno" element={<NightShiftPage />} />
              <Route path="/calculadoras/fgts" element={<FGTSPage />} />
              <Route path="/calculadoras/custo-funcionario" element={<EmployeeCostPage />} />
              <Route path="/calculadoras/plr" element={<PLRPage />} />
              <Route path="/calculadoras/fire" element={<FIREPage />} />
              <Route path="/calculadoras/juros-compostos" element={<CompoundInterestPage />} />
              <Route path="/calculadoras/alugar-ou-financiar" element={<RentVsBuyPage />} />
              <Route path="/calculadoras/uber-ou-carro" element={<UberVsCarPage />} />
              <Route path="/calculadoras/primeiro-milhao" element={<FirstMillionPage />} />
              <Route path="/calculadoras/conversor-moedas" element={<CurrencyConverterPage />} />
              <Route path="/ferramentas/gerador-pix" element={<PixGeneratorPage />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <PromoPopup />
      </div>
    </>
  );
}

export default App;
