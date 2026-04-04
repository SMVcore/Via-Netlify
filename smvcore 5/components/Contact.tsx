import React, { useState } from 'react';
import { IconArrowRight, IconMessage } from './Icons';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
          
          <div className="md:w-5/12 bg-business-blue p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Skal vi mødes til en kop virtuel kaffe?</h2>
              <p className="text-slate-300 mb-8">
                Book et uforpligtende møde for at se, om kemien passer. Ingen sælgere, kun Frank.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <IconMessage className="w-5 h-5" />
                  <span>Frank@smvcore.com</span>
                </div>
                 {/* Add more contact info if needed */}
              </div>
            </div>
            
            <div className="mt-12 md:mt-0">
               <p className="text-sm text-slate-400">
                 SMVcore<br/>
                 CVR 43603558<br/>
                 Viborg, Danmark
               </p>
            </div>
          </div>

          <div className="md:w-7/12 p-10">
            {submitted ? (
               <div className="h-full flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                   <IconArrowRight className="w-8 h-8 rotate-[-45deg]" /> {/* Checkmark surrogate */}
                 </div>
                 <h3 className="text-2xl font-bold text-business-blue mb-2">Tak for beskeden</h3>
                 <p className="text-slate-600">Vi vender tilbage inden for 24 timer.</p>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Navn</label>
                  <input type="text" id="name" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-business-blue focus:border-transparent outline-none" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <input type="email" id="email" required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-business-blue focus:border-transparent outline-none" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Udfordring / Besked</label>
                  <textarea id="message" rows={4} required className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-business-blue focus:border-transparent outline-none" placeholder="F.eks. Jeg har svært ved at delegere salgsopgaver..."></textarea>
                </div>
                <button type="submit" className="w-full bg-business-blue text-white font-bold py-3 px-6 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  Send besked <IconArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;