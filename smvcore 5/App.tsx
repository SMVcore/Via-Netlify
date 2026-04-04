import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import OwnerTestModal from './components/OwnerTestModal';
import AIReadinessModal from './components/AIReadinessModal';

const App: React.FC = () => {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isAITestOpen, setIsAITestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="text-2xl font-bold text-business-blue tracking-tight">SMVcore</div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-business-blue transition-colors">Ydelser</a>
            <button onClick={() => setIsTestOpen(true)} className="hover:text-business-blue transition-colors">
              Ejerleder-Test
            </button>
            <button onClick={() => setIsAITestOpen(true)} className="hover:text-business-blue transition-colors">
              AI-Parathed
            </button>
            <a href="#contact" className="hover:text-business-blue transition-colors">Kontakt</a>
          </div>
          <a href="#contact" className="bg-business-blue text-white px-4 py-2 rounded text-sm font-medium hover:bg-slate-800 transition-colors">
            Book Møde
          </a>
        </div>
      </nav>

      <main>
        <Hero 
          onOpenTest={() => setIsTestOpen(true)}
        />
        <Services 
          onOpenOwnerTest={() => setIsTestOpen(true)}
          onOpenAITest={() => setIsAITestOpen(true)}
        />
        <About />
        <Contact />
      </main>

      <Footer />
      
      <OwnerTestModal isOpen={isTestOpen} onClose={() => setIsTestOpen(false)} />
      <AIReadinessModal isOpen={isAITestOpen} onClose={() => setIsAITestOpen(false)} />
    </div>
  );
};

export default App;