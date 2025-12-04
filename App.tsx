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

// Static imports for critical SEO pages
import { Calculators } from './components/Calculators';
import { Tools } from './components/Tools';
import { InvestmentPage } from './components/tools/InvestmentPage';
import { VacationPage } from './components/tools/VacationPage';
import { EnergyPage } from './components/tools/EnergyPage';
import { FuelPage } from './components/tools/FuelPage';
import { TerminationPage } from './components/tools/TerminationPage';
import { INSSPage } from './components/tools/INSSPage';
import { NetSalaryPage } from './components/tools/NetSalaryPage';
import { ThirteenthSalaryPage } from './components/tools/ThirteenthSalaryPage';
import { OvertimePage } from './components/tools/OvertimePage';
import { UnemploymentInsurancePage } from './components/tools/UnemploymentInsurancePage';
import { NightShiftPage } from './components/tools/NightShiftPage';
import { FGTSPage } from './components/tools/FGTSPage';
import { EmployeeCostPage } from './components/tools/EmployeeCostPage';
import { PLRPage } from './components/tools/PLRPage';
import { FIREPage } from './components/tools/FIREPage';
import { CompoundInterestPage } from './components/tools/CompoundInterestPage';
import { RentVsBuyPage } from './components/tools/RentVsBuyPage';
import { UberVsCarPage } from './components/tools/UberVsCarPage';
import { FirstMillionPage } from './components/tools/FirstMillionPage';
import { CurrencyConverterPage } from './components/tools/CurrencyConverterPage';
import { PurchasingPowerPage } from './components/tools/PurchasingPowerPage';
import { Budget503020Page } from './components/tools/Budget503020Page';
import { VehicleFinancingPage } from './components/tools/VehicleFinancingPage';
import { RealEstateFinancingPage } from './components/tools/RealEstateFinancingPage';
import { EarlyRepaymentPage } from './components/tools/EarlyRepaymentPage';
import { CETCalculatorPage } from './components/tools/CETCalculatorPage';
import { CreditCardDebtPage } from './components/tools/CreditCardDebtPage';
import { MEIDasPage } from './components/tools/MEIDasPage';
import { MarkupPage } from './components/tools/MarkupPage';
import { BreakEvenPage } from './components/tools/BreakEvenPage';
import { SimplesVsPresumidoPage } from './components/tools/SimplesVsPresumidoPage';
import { WorkingCapitalPage } from './components/tools/WorkingCapitalPage';
import { ROICalculatorPage } from './components/tools/ROICalculatorPage';
import { BarbecueCalculatorPage } from './components/tools/BarbecueCalculatorPage';
import { BusinessDaysPage } from './components/tools/BusinessDaysPage';
import { RuleOfThreePage } from './components/tools/RuleOfThreePage';
import { PercentageCalculatorPage } from './components/tools/PercentageCalculatorPage';
import { HoursCalculatorPage } from './components/tools/HoursCalculatorPage';
import { TileBricksCalculatorPage } from './components/tools/TileBricksCalculatorPage';
import { TravelCostCalculatorPage } from './components/tools/TravelCostCalculatorPage';
import { IMCCalculatorPage } from './components/tools/IMCCalculatorPage';
import { WaterIntakeCalculatorPage } from './components/tools/WaterIntakeCalculatorPage';
import { CulinaryConverterPage } from './components/tools/CulinaryConverterPage';
import { GestationalAgeCalculatorPage } from './components/tools/GestationalAgeCalculatorPage';
import { PixGeneratorPage } from './components/tools/PixGeneratorPage';
import { WebStoryPage } from './components/tools/WebStoryPage';
import { StoriesGallery } from './components/StoriesGallery';
import { BlogIndex } from './pages/blog/BlogIndex';
import { CategoryPage } from './pages/blog/CategoryPage';
import { BlogPost } from './pages/blog/BlogPost';
import { NotFound } from './components/NotFound';

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
              <Route path="/ferramentas" element={<Tools />} />
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
              <Route path="/calculadoras/poder-de-compra" element={<PurchasingPowerPage />} />
              <Route path="/calculadoras/regra-50-30-20" element={<Budget503020Page />} />
              <Route path="/calculadoras/financiamento-veiculos" element={<VehicleFinancingPage />} />
              <Route path="/calculadoras/financiamento-imobiliario" element={<RealEstateFinancingPage />} />
              <Route path="/calculadoras/quitacao-antecipada" element={<EarlyRepaymentPage />} />
              <Route path="/calculadoras/custo-efetivo-total" element={<CETCalculatorPage />} />
              <Route path="/calculadoras/divida-cartao-credito" element={<CreditCardDebtPage />} />
              <Route path="/calculadoras/das-mei" element={<MEIDasPage />} />
              <Route path="/calculadoras/markup" element={<MarkupPage />} />
              <Route path="/calculadoras/ponto-de-equilibrio" element={<BreakEvenPage />} />
              <Route path="/calculadoras/simples-vs-presumido" element={<SimplesVsPresumidoPage />} />
              <Route path="/calculadoras/capital-de-giro" element={<WorkingCapitalPage />} />
              <Route path="/calculadoras/roi" element={<ROICalculatorPage />} />
              <Route path="/calculadoras/churrasco" element={<BarbecueCalculatorPage />} />
              <Route path="/calculadoras/dias-uteis" element={<BusinessDaysPage />} />
              <Route path="/calculadoras/regra-de-tres" element={<RuleOfThreePage />} />
              <Route path="/calculadoras/porcentagem" element={<PercentageCalculatorPage />} />
              <Route path="/calculadoras/horas" element={<HoursCalculatorPage />} />
              <Route path="/calculadoras/tijolos-pisos" element={<TileBricksCalculatorPage />} />
              <Route path="/calculadoras/custo-viagem" element={<TravelCostCalculatorPage />} />
              <Route path="/calculadoras/imc" element={<IMCCalculatorPage />} />
              <Route path="/calculadoras/agua" element={<WaterIntakeCalculatorPage />} />
              <Route path="/calculadoras/conversor-culinario" element={<CulinaryConverterPage />} />
              <Route path="/calculadoras/idade-gestacional" element={<GestationalAgeCalculatorPage />} />
              <Route path="/ferramentas/gerador-pix" element={<PixGeneratorPage />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:category/:slug" element={<BlogPost />} />
              <Route path="/blog/:categorySlug" element={<CategoryPage />} />
              <Route path="/stories/:storyId" element={<WebStoryPage />} />
              <Route path="/stories" element={<StoriesGallery />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route path="*" element={<NotFound />} />
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
