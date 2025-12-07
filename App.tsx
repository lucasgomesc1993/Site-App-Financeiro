import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from "framer-motion"

import { Header } from './components/Header';
import { Footer } from './components/Footer';
// import { Home } from './components/Home'; // Lazy loaded below
import { ScrollToTop } from './components/ScrollToTop';

// Lazy load non-critical routes
const Home = lazy(() => import('./components/Home').then(module => ({ default: module.Home })));
const PromoPopup = lazy(() => import('./components/PromoPopup').then(module => ({ default: module.PromoPopup })));
const Terms = lazy(() => import('./components/Terms').then(module => ({ default: module.Terms })));
const Privacy = lazy(() => import('./components/Privacy').then(module => ({ default: module.Privacy })));
const Support = lazy(() => import('./components/Support').then(module => ({ default: module.Support })));

// Lazy load critical SEO pages and tools to reduce main bundle size
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
const PurchasingPowerPage = lazy(() => import('./components/tools/PurchasingPowerPage').then(module => ({ default: module.PurchasingPowerPage })));
const Budget503020Page = lazy(() => import('./components/tools/Budget503020Page').then(module => ({ default: module.Budget503020Page })));
const VehicleFinancingPage = lazy(() => import('./components/tools/VehicleFinancingPage').then(module => ({ default: module.VehicleFinancingPage })));
const RealEstateFinancingPage = lazy(() => import('./components/tools/RealEstateFinancingPage').then(module => ({ default: module.RealEstateFinancingPage })));
const EarlyRepaymentPage = lazy(() => import('./components/tools/EarlyRepaymentPage').then(module => ({ default: module.EarlyRepaymentPage })));
const CETCalculatorPage = lazy(() => import('./components/tools/CETCalculatorPage').then(module => ({ default: module.CETCalculatorPage })));
const CreditCardDebtPage = lazy(() => import('./components/tools/CreditCardDebtPage').then(module => ({ default: module.CreditCardDebtPage })));
const MEIDasPage = lazy(() => import('./components/tools/MEIDasPage').then(module => ({ default: module.MEIDasPage })));
const MarkupPage = lazy(() => import('./components/tools/MarkupPage').then(module => ({ default: module.MarkupPage })));
const BreakEvenPage = lazy(() => import('./components/tools/BreakEvenPage').then(module => ({ default: module.BreakEvenPage })));
const SimplesVsPresumidoPage = lazy(() => import('./components/tools/SimplesVsPresumidoPage').then(module => ({ default: module.SimplesVsPresumidoPage })));
const WorkingCapitalPage = lazy(() => import('./components/tools/WorkingCapitalPage').then(module => ({ default: module.WorkingCapitalPage })));
const ROICalculatorPage = lazy(() => import('./components/tools/ROICalculatorPage').then(module => ({ default: module.ROICalculatorPage })));
const BarbecueCalculatorPage = lazy(() => import('./components/tools/BarbecueCalculatorPage').then(module => ({ default: module.BarbecueCalculatorPage })));
const BusinessDaysPage = lazy(() => import('./components/tools/BusinessDaysPage').then(module => ({ default: module.BusinessDaysPage })));
const RuleOfThreePage = lazy(() => import('./components/tools/RuleOfThreePage').then(module => ({ default: module.RuleOfThreePage })));
const PercentageCalculatorPage = lazy(() => import('./components/tools/PercentageCalculatorPage').then(module => ({ default: module.PercentageCalculatorPage })));
const HoursCalculatorPage = lazy(() => import('./components/tools/HoursCalculatorPage').then(module => ({ default: module.HoursCalculatorPage })));

const TravelCostCalculatorPage = lazy(() => import('./components/tools/TravelCostCalculatorPage').then(module => ({ default: module.TravelCostCalculatorPage })));
const SecretSantaPage = lazy(() => import('./components/tools/SecretSantaPage').then(module => ({ default: module.SecretSantaPage })));
const CLTVsPJPage = lazy(() => import('./components/tools/CLTVsPJPage').then(module => ({ default: module.CLTVsPJPage })));
const MonetaryCorrectionPage = lazy(() => import('./components/tools/MonetaryCorrectionPage').then(module => ({ default: module.MonetaryCorrectionPage })));
const ImportTaxPage = lazy(() => import('./components/tools/ImportTaxPage').then(module => ({ default: module.ImportTaxPage })));
const AbusiveInterestPage = lazy(() => import('./components/tools/AbusiveInterestPage').then(module => ({ default: module.AbusiveInterestPage })));
const PixGeneratorPage = lazy(() => import('./components/tools/PixGeneratorPage').then(module => ({ default: module.PixGeneratorPage })));
const WebStoryPage = lazy(() => import('./components/tools/WebStoryPage').then(module => ({ default: module.WebStoryPage })));
const StoriesGallery = lazy(() => import('./components/StoriesGallery').then(module => ({ default: module.StoriesGallery })));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex').then(module => ({ default: module.BlogIndex })));
const CategoryPage = lazy(() => import('./pages/blog/CategoryPage').then(module => ({ default: module.CategoryPage })));
const BlogPost = lazy(() => import('./pages/blog/BlogPost').then(module => ({ default: module.BlogPost })));
const NotFound = lazy(() => import('./components/NotFound').then(module => ({ default: module.NotFound })));
const CalculatorLayout = lazy(() => import('./components/CalculatorLayout').then(module => ({ default: module.CalculatorLayout })));

function App() {
  const [isPopupMounted, setIsPopupMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupMounted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary">
        <Header />
        <main>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <LazyMotion features={domAnimation}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calculadoras" element={<Calculators />} />

                {/* Calculator Routes Wrapper */}
                <Route element={<CalculatorLayout />}>
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

                  <Route path="/calculadoras/custo-viagem" element={<TravelCostCalculatorPage />} />
                  <Route path="/calculadoras/amigo-secreto" element={<SecretSantaPage />} />
                  <Route path="/calculadoras/clt-vs-pj" element={<CLTVsPJPage />} />
                  <Route path="/calculadoras/correcao-monetaria" element={<MonetaryCorrectionPage />} />
                  <Route path="/calculadoras/impostos-importacao" element={<ImportTaxPage />} />
                  <Route path="/calculadoras/juros-abusivos" element={<AbusiveInterestPage />} />
                  <Route path="/calculadoras/gerador-pix" element={<PixGeneratorPage />} />
                </Route>

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
            </LazyMotion>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          {isPopupMounted && <PromoPopup />}
        </Suspense>
      </div>
    </>
  );
}

export default App;
