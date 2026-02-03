
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import InstallModule from './components/InstallModule';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const toggleInstallModal = () => setIsInstallModalOpen(!isInstallModalOpen);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-slate-100 overflow-x-hidden">
      <Header />
      
      <main>
        <Hero onGetAppClick={toggleInstallModal} />
        
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <Features />
          </div>
        </section>
      </main>

      <Footer />

      {isInstallModalOpen && (
        <InstallModule 
          onClose={toggleInstallModal} 
          deferredPrompt={deferredPrompt}
          setDeferredPrompt={setDeferredPrompt}
        />
      )}
    </div>
  );
};

export default App;
