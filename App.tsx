import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { PromoPopup } from './components/PromoPopup';

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <>
      <ScrollToTop />
      <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <PromoPopup />
      </div>
    </>
  );
}

export default App;
