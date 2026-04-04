import React from 'react';
import { IconClipboardCheck } from './Icons';

interface HeroProps {
  onOpenTest: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenTest }) => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Modern Business Meeting" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-business-blue/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-business-blue/90 via-business-blue/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-16">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 mb-4 border border-slate-400/30 rounded-full bg-slate-800/50 backdrop-blur-sm text-slate-200 text-xs tracking-wider uppercase font-semibold">
            Fundamentet
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
            Din virksomhed virker. <br />
            <span className="text-slate-300">Men kun med dig.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl font-light leading-relaxed opacity-90">
            Gør din virksomhed uafhængig af din tid. Vi erstatter personafhængighed med struktur og skræddersyede AI-løsninger.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center bg-[#848c48] hover:bg-[#727a3c] text-white px-8 py-3 rounded-sm font-semibold transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-sm"
            >
              Book 30 min. afklaring
            </a>
            <button 
              onClick={onOpenTest}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-sm bg-white text-business-blue hover:bg-slate-100 transition-colors uppercase tracking-wide text-sm font-bold shadow-md"
            >
              <IconClipboardCheck className="w-4 h-4" /> Tag Ejerleder-testen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;