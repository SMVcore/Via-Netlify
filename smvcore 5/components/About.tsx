import React from 'react';
import { IconShield, IconUsers, IconBriefcase } from './Icons';

const About: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-stretch shadow-lg border border-slate-100 rounded-lg overflow-hidden">
          
          {/* Image Section - Full height cover */}
          <div className="w-full md:w-5/12 relative min-h-[400px] bg-slate-50">
             {/* 
                NOTE: To use your own image:
                1. Save your file as 'frank.jpg' in the public folder.
                2. Change src below to "/frank.jpg" 
             */}
             <img 
               src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
               alt="Frank Poulsen Kirk" 
               className="absolute inset-0 w-full h-full object-cover object-top grayscale"
             />
             {/* Gradient Overlay for text readability - Adjusted for better visibility of the photo */}
             <div className="absolute inset-0 bg-gradient-to-t from-business-blue/90 via-business-blue/30 to-transparent"></div>
             
             <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                <h3 className="text-2xl font-bold">Frank Poulsen Kirk</h3>
                <p className="text-slate-200 text-sm uppercase tracking-wide">Stifter & Konsulent</p>
             </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-business-blue mb-4">Om SMVcore</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Min mission er at øge virksomhedens værdi ved at gøre den uafhængig af ejeren. Jeg kombinerer klassisk forretningsforståelse med moderne teknologi. Jeg tror på "Struktur før AI" – for hvis vi automatiserer kaos, får vi bare hurtigere kaos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <IconBriefcase className="w-6 h-6 text-business-blue mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">SMV konsulent</h4>
                <p className="text-slate-500 text-xs mt-1">Specialist i effektivisering og værdioptimering.</p>
              </div>

              <div>
                <IconUsers className="w-6 h-6 text-business-blue mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Change Management</h4>
                <p className="text-slate-500 text-xs mt-1">E-MBA fundament for forankring af nye vaner.</p>
              </div>

              <div>
                <IconShield className="w-6 h-6 text-business-blue mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">AI Konsulent</h4>
                <p className="text-slate-500 text-xs mt-1">Certificeret analyse, implementering og data konsulent.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;