import React, { useState } from 'react';
import { IconCheck, IconCpu, IconTrendingUp, IconBriefcase, IconCalculator, IconArrowRight, IconClipboardCheck, IconBrain } from './Icons';

interface ServicesProps {
  onOpenOwnerTest: () => void;
  onOpenAITest: () => void;
}

const ROICalculator = () => {
  const [hoursSaved, setHoursSaved] = useState<number>(20);
  const [hourlyWage, setHourlyWage] = useState<number>(250);
  const cost = 7500;
  
  // Calculate savings over 12 months
  const monthlySavings = hoursSaved * hourlyWage;
  const annualSavings = monthlySavings * 12;
  const firstYearProfit = annualSavings - cost;
  const breakEvenMonths = cost / monthlySavings;

  return (
    <div className="bg-slate-50 p-6 rounded border border-slate-200 shadow-inner">
      <div className="flex items-center gap-2 mb-4 text-business-blue">
        <IconCalculator className="w-5 h-5" />
        <h4 className="font-bold uppercase tracking-wide text-sm">Besparelses Beregner</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Sparet tid pr. md. (timer)</label>
          <input 
            type="number" 
            value={hoursSaved}
            onChange={(e) => setHoursSaved(Number(e.target.value))}
            className="w-full p-2 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-business-blue outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Gns. Timeløn (kr.)</label>
          <input 
            type="number" 
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            className="w-full p-2 border border-slate-300 rounded text-slate-900 focus:ring-1 focus:ring-business-blue outline-none"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded border border-slate-200">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-slate-600">Investering (engangsbeløb):</span>
          <span className="font-bold text-slate-900">7.500 kr.</span>
        </div>
        <div className="h-px bg-slate-100 my-2"></div>
        <div className="flex justify-between items-end mb-1">
          <span className="text-sm text-slate-600">Månedlig besparelse:</span>
          <span className="font-bold text-green-600">+{monthlySavings.toLocaleString('da-DK')} kr.</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-sm text-slate-600">Overskud år 1:</span>
          <span className="font-bold text-business-blue text-lg">+{firstYearProfit.toLocaleString('da-DK')} kr.</span>
        </div>
        <div className="mt-3 text-xs text-slate-400 text-center">
          Tjener sig hjem på <span className="font-semibold text-slate-600">{breakEvenMonths.toFixed(1)} måneder</span>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ onOpenOwnerTest, onOpenAITest }) => {
  return (
    <section id="services" className="bg-white">
      
      {/* INTRO */}
      <div className="py-16 container mx-auto px-6 text-center max-w-3xl">
        <h2 className="text-3xl font-bold text-business-blue mb-2">Fundamentet</h2>
        <p className="text-slate-600">
          Vi sælger ikke bare timer. Vi implementerer systemer, der frigør dig fra driften.
        </p>
      </div>

      {/* SECTION 1: ENKELTSTÅENDE LØSNINGER & CALCULATOR */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Product Description */}
          <div className="lg:w-1/2 space-y-8">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 text-business-blue rounded-full">
                  <IconCpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-business-blue">Enkeltstående Løsninger</h3>
             </div>
             
             {/* Digital Assistent Feature */}
             <div className="pl-4 border-l-2 border-slate-100 hover:border-blue-200 transition-colors">
               <h4 className="font-bold text-lg text-slate-900 mb-1">Digital Assistent</h4>
               <p className="text-slate-600 text-sm mb-3">
                 En skræddersyet GPT/GEM-løsning trænet på virksomhedens data. Vi automatiserer manuelle processer som tilbudsskrivning, referater eller kundesupport.
               </p>
               <p className="font-semibold text-business-blue">Pris: 7.500 kr. <span className="font-normal text-slate-500 text-sm">pr. leverance</span></p>
             </div>

             {/* Analyse Feature */}
             <div className="pl-4 border-l-2 border-slate-100 hover:border-blue-200 transition-colors">
               <h4 className="font-bold text-lg text-slate-900 mb-1">Analyse & AI-Roadmap</h4>
               <p className="text-slate-600 text-sm mb-3">
                 Grundig rapport baseret på interviews. Vi finder det højeste ROI potentiale i jeres forretning.
               </p>
               <p className="font-semibold text-business-blue">20.000 kr. <span className="font-normal text-slate-500 text-sm">(10.000 v/ &lt;10 ansatte)</span></p>
             </div>

             {/* Workshop Feature */}
             <div className="pl-4 border-l-2 border-slate-100 hover:border-blue-200 transition-colors">
               <h4 className="font-bold text-lg text-slate-900 mb-1">Workshop / Uddannelse</h4>
               <p className="text-slate-600 text-sm mb-3">
                 Opkvalificering af teamet. Lær at bruge de nye værktøjer effektivt.
               </p>
               <p className="font-semibold text-business-blue">Fra 7.500 kr.</p>
             </div>
          </div>

          {/* Right: ROI Calculator (Sticky) */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
               <h3 className="text-lg font-bold text-slate-900 mb-4">Er det investeringen værd?</h3>
               <p className="text-sm text-slate-600 mb-6">
                 Brug beregneren til at se, hvor hurtigt en "Digital Assistent" til 7.500 kr. er tjent hjem, hvis den blot fjerner et par timers administration om måneden.
               </p>
               <ROICalculator />
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: LØBENDE FUNDAMENT (Split Layout) */}
      <div className="bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Text Side */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-100 text-business-blue rounded-full">
                  <IconTrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-business-blue">Løbende Sparring & Struktur</h3>
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                Et fast abonnement der sikrer, at I holder momentum når hverdagen rammer. Vi står for løbende prioritering og projektledelse, understøttet af vores egne AI-værktøjer.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Månedlig strategisk sparring",
                  "AI-drevet projektstyring",
                  "Fjernelse af flaskehalse i realtid"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <IconCheck className="w-4 h-4 text-[#848c48]" /> {item}
                  </li>
                ))}
              </ul>
              <div>
                <span className="text-2xl font-bold text-business-blue">Fra 7.500 kr.</span>
                <span className="text-sm text-slate-500"> / md. ekskl. moms</span>
                <p className="text-xs text-slate-400 mt-1 italic">Prisen afhænger af opgavens omfang.</p>
              </div>
            </div>

            {/* Test Cards Side */}
            <div className="lg:w-1/2 w-full">
               <h4 className="font-semibold text-slate-900 mb-6">Kend jeres udgangspunkt før i starter</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 
                 {/* Ejerleder Test Card */}
                 <button 
                   onClick={onOpenOwnerTest}
                   className="bg-white p-6 rounded shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group"
                 >
                    <div className="p-2 bg-slate-100 rounded-full w-fit mb-4 group-hover:bg-blue-50 transition-colors">
                       <IconClipboardCheck className="w-6 h-6 text-slate-700 group-hover:text-business-blue" />
                    </div>
                    <h5 className="font-bold text-slate-900 mb-2">Ejerleder-testen</h5>
                    <p className="text-xs text-slate-500 mb-4 h-10">
                      Hvor afhængig er virksomheden af dig? Få svaret på 3 min.
                    </p>
                    <span className="text-business-blue text-sm font-semibold flex items-center gap-1">
                      Tag testen <IconArrowRight className="w-3 h-3" />
                    </span>
                 </button>

                 {/* AI Readiness Test Card */}
                 <button 
                   onClick={onOpenAITest}
                   className="bg-white p-6 rounded shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group"
                 >
                    <div className="p-2 bg-slate-100 rounded-full w-fit mb-4 group-hover:bg-blue-50 transition-colors">
                       <IconBrain className="w-6 h-6 text-slate-700 group-hover:text-business-blue" />
                    </div>
                    <h5 className="font-bold text-slate-900 mb-2">AI-Parathed</h5>
                    <p className="text-xs text-slate-500 mb-4 h-10">
                       Måler jeres digitale modenhed og potentiale for automatisering.
                    </p>
                    <span className="text-business-blue text-sm font-semibold flex items-center gap-1">
                      Mål parathed <IconArrowRight className="w-3 h-3" />
                    </span>
                 </button>

               </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default Services;