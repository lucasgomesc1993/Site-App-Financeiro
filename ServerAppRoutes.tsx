import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Static imports for critical SEO pages (Server Side)
import { Home } from './components/Home';
import { Terms } from './components/Terms';
import { Privacy } from './components/Privacy';
import { Support } from './components/Support';
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
import { PixGeneratorPage } from './components/tools/PixGeneratorPage';
import { WebStoryPage } from './components/tools/WebStoryPage';
import { BlogIndex } from './pages/blog/BlogIndex';
import { CategoryPage } from './pages/blog/CategoryPage';
import { BlogPost } from './pages/blog/BlogPost';

export const ServerAppRoutes = () => {
    return (
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
            <Route path="/ferramentas/gerador-pix" element={<PixGeneratorPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/categoria/:categorySlug" element={<CategoryPage />} />
            <Route path="/stories/:storyId" element={<WebStoryPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/support" element={<Support />} />
        </Routes>
    );
};
