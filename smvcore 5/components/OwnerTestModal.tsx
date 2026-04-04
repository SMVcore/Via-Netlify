import React, { useState } from 'react';
import { IconClipboardCheck, IconClose, IconArrowRight, IconCheck, IconShield } from './Icons';

interface OwnerTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  title: string;
  description: string;
  lowLabel: string;
  highLabel: string;
  feedbackLow: string; // New field for specific feedback on low scores (<4)
}

const questions: Question[] = [
  { 
    id: 1, 
    title: "Beslutningskompetence", 
    description: "Kritiske beslutninger kan træffes og eksekveres uden ejerens involvering.", 
    lowLabel: "Aldrig", 
    highLabel: "Konsekvent",
    feedbackLow: "Når du skal godkende alt, bliver du virksomhedens største bremseklods. Det dræber momentum og gør organisationen passiv."
  },
  { 
    id: 2, 
    title: "Kundeansvar", 
    description: "Kunderelationer bæres primært af organisationen – ikke af ejeren personligt.", 
    lowLabel: "Ejerbåret", 
    highLabel: "Organisationsbåret",
    feedbackLow: "Hvis kunderne køber 'dig' og ikke virksomheden, er din virksomhed reelt usælgelig, og du kan aldrig holde rigtig fri."
  },
  { 
    id: 3, 
    title: "Operationel viden", 
    description: "Vigtig viden om drift, kunder og prioritering er dokumenteret og tilgængelig for relevante roller.", 
    lowLabel: "I ejerens hoved", 
    highLabel: "Systematiseret",
    feedbackLow: "Når viden bor i dit hoved, er din virksomhed én sygemelding fra kollaps. Det skaber utryghed og fejl i driften."
  },
  { 
    id: 4, 
    title: "Ledelsesmæssig eskalering", 
    description: "Ledelsesbeslutninger træffes på rette niveau uden automatisk eskalering til ejeren.", 
    lowLabel: "Altid ejeren", 
    highLabel: "Klart mandat",
    feedbackLow: "Du bruger din tid på brandslukning i stedet for strategi. Medarbejderne lærer at 'spørge chefen' i stedet for at tænke selv."
  },
  { 
    id: 5, 
    title: "Prioriteringslogik", 
    description: "Organisationen kan selv prioritere opgaver korrekt uden ejerens indgriben.", 
    lowLabel: "Kaos uden ejer", 
    highLabel: "Klart defineret",
    feedbackLow: "Uden klar struktur arbejder teamet på det, der larmer mest, frem for det, der er vigtigst. Det skaber ineffektivitet."
  },
  { 
    id: 6, 
    title: "Driftens robusthed", 
    description: "Den daglige drift fungerer stabilt ved ejerens fravær i flere uger.", 
    lowLabel: "Stopper op", 
    highLabel: "Uændret",
    feedbackLow: "Hvis omsætningen falder, når du holder ferie, ejer du ikke en virksomhed – du ejer et job med CVR-nummer."
  },
  { 
    id: 7, 
    title: "Performance-opfølgning", 
    description: "Nøgletal kan forstås og handles på uden ejerens tolkning.", 
    lowLabel: "Ejer nødvendig", 
    highLabel: "Fuldt operationelt",
    feedbackLow: "Du styrer efter mavefornemmelse. Det gør det umuligt at skalere, da du ikke kan være overalt på én gang."
  },
  { 
    id: 8, 
    title: "Medarbejdermandat", 
    description: "Medarbejdere med ansvar kan træffe beslutninger – også når ejeren er uenig.", 
    lowLabel: "Ikke muligt", 
    highLabel: "Accepteret praksis",
    feedbackLow: "Du undergraver dine egne ledere. Dygtige folk forsvinder, hvis de ikke får reelt mandat til at handle."
  },
  { 
    id: 9, 
    title: "Salgsafhængighed", 
    description: "Salg og tilbud kan gennemføres og lukkes uden ejerens personlige deltagelse.", 
    lowLabel: "Ejeren lukker alt", 
    highLabel: "Salgsorganisationen",
    feedbackLow: "Væksten er begrænset af antallet af timer i din kalender. Du er blevet loftet for virksomhedens omsætning."
  },
  { 
    id: 10, 
    title: "Udviklingskapacitet", 
    description: "Virksomheden kan udvikle nye tiltag og forbedringer uden at ejeren driver processen.", 
    lowLabel: "Ejer driver alt", 
    highLabel: "Decentral udvikling",
    feedbackLow: "Virksomheden står stille, når du er træt eller travl. Innovation skal være systemisk, ikke personbåret."
  },
  { 
    id: 11, 
    title: "Skalerbarhed", 
    description: "Virksomhedens vækst er ikke begrænset af ejerens tid og tilgængelighed.", 
    lowLabel: "Direkte flaskehals", 
    highLabel: "Skalerbar struktur",
    feedbackLow: "Hver ny kunde giver dig mere arbejde i stedet for mere frihed. Det er opskriften på stress, ikke succes."
  },
  { 
    id: 12, 
    title: "Erstatningsbarhed (exit-testen)", 
    description: "Virksomheden kan fungere med en anden leder/rolle i ejerens sted uden væsentligt værditab.", 
    lowLabel: "Kritisk afhængig", 
    highLabel: "Lav personrisiko",
    feedbackLow: "En køber vil se din rolle som en risiko, ikke et aktiv. Det sænker virksomhedens værdi markant."
  },
];

const OwnerTestModal: React.FC<OwnerTestModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'lead' | 'results'>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleScore = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateTotal = () => Object.values(answers).reduce((a, b) => a + b, 0);

  const getResultCategory = (score: number) => {
    if (score <= 36) return {
      title: "Kritisk ejerafhængighed",
      color: "text-red-600",
      bg: "bg-red-50",
      desc: "Virksomheden er så afhængig af dig, at den reelt ikke har nogen værdi uden din daglige tilstedeværelse. Du er flaskehalsen for vækst."
    };
    if (score <= 60) return {
      title: "Delvis modenhed, skjult risiko",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      desc: "Der er struktur på dele af driften, men kritiske funktioner (ofte salg eller ledelse) hænger stadig på dig. Det bremser skalering."
    };
    return {
      title: "Lav ejerafhængighed / Investerbar",
      color: "text-green-600",
      bg: "bg-green-50",
      desc: "Tillykke. Du har bygget en maskine, der virker. Fokus kan nu flyttes 100% til strategi, opkøb eller exit-planlægning."
    };
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending email
    console.log(`--- SENDING EMAIL TO Frank@smvcore.com ---`);
    console.log(`User: ${formData.name} (${formData.email})`);
    console.log(`Score: ${calculateTotal()}`);
    console.log(`Answers:`, answers);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('results');
    }, 1500);
  };

  const isAllAnswered = Object.keys(answers).length === questions.length;
  
  // Identify critical bottlenecks (scores < 4)
  const lowScoringQuestions = questions.filter(q => (answers[q.id] || 0) < 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-business-blue">
            <IconClipboardCheck className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Ejerleder-testen</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <div className="text-center space-y-6 py-8">
              <h2 className="text-2xl font-bold text-business-blue">Hvor afhængig er virksomheden af dig?</h2>
              <p className="text-slate-600 max-w-lg mx-auto">
                Tag testen og få en ærlig score fra 1-84. Det tager ca. 3 minutter. 
                Du får svar på, om du bygger en skalerbar forretning eller et "job med CVR-nummer".
              </p>
              <div className="flex justify-center gap-8 text-sm text-slate-500 my-8">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div>Kritisk</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div>Risiko</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-400"></div>Skalerbar</div>
              </div>
              <button 
                onClick={() => setStep('questions')}
                className="bg-business-blue text-white px-8 py-3 rounded hover:bg-slate-800 font-semibold transition-colors inline-flex items-center gap-2"
              >
                Start testen <IconArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP: QUESTIONS */}
          {step === 'questions' && (
            <div className="space-y-8">
              <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2">
                {questions.map((q) => (
                  <div key={q.id} className="border-b border-slate-100 pb-6 last:border-0">
                    <div className="mb-3">
                      <h4 className="font-bold text-slate-900 text-lg">
                        <span className="text-slate-400 mr-2">#{q.id}</span>
                        {q.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{q.description}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                      <span className="text-xs text-slate-400 font-medium uppercase w-24 text-right hidden sm:block">{q.lowLabel}</span>
                      
                      <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-center bg-slate-50 p-2 rounded-lg">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleScore(q.id, num)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                              answers[q.id] === num 
                                ? 'bg-business-blue text-white shadow-md scale-110' 
                                : 'bg-white text-slate-500 hover:bg-blue-50 border border-slate-200'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      
                      <span className="text-xs text-slate-400 font-medium uppercase w-24 hidden sm:block">{q.highLabel}</span>
                      
                      {/* Mobile Labels */}
                      <div className="flex justify-between w-full sm:hidden text-xs text-slate-400 px-1">
                        <span>{q.lowLabel}</span>
                        <span>{q.highLabel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-sm text-slate-500">
                  {Object.keys(answers).length} / {questions.length} besvaret
                </span>
                <button
                  onClick={() => isAllAnswered && setStep('lead')}
                  disabled={!isAllAnswered}
                  className={`px-6 py-3 rounded font-semibold transition-colors ${
                    isAllAnswered 
                      ? 'bg-business-blue text-white hover:bg-slate-800' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Se Resultat
                </button>
              </div>
            </div>
          )}

          {/* STEP: LEAD FORM */}
          {step === 'lead' && (
            <div className="max-w-md mx-auto py-8">
              <h3 className="text-xl font-bold text-business-blue mb-4 text-center">Næsten i mål...</h3>
              <p className="text-slate-600 text-center mb-8 text-sm">
                Indtast dine oplysninger for at låse op for din score og få analysen tilsendt.
              </p>
              
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Navn</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-business-blue outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-3 border border-slate-300 rounded focus:ring-2 focus:ring-business-blue outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-business-blue text-white font-bold py-3 rounded hover:bg-slate-800 transition-colors mt-4 flex justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : 'Vis min score'}
                </button>
              </form>
            </div>
          )}

          {/* STEP: RESULTS */}
          {step === 'results' && (
            <div className="text-center space-y-6 animate-in fade-in duration-500 max-h-[70vh] overflow-y-auto">
              {/* Score Circle */}
              <div className="relative inline-flex items-center justify-center mt-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                  <circle 
                    cx="64" cy="64" r="60" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className={getResultCategory(calculateTotal()).color}
                    strokeDasharray={377}
                    strokeDashoffset={377 - (377 * calculateTotal()) / 84}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-business-blue">{calculateTotal()}</span>
                  <span className="text-xs text-slate-400">/ 84</span>
                </div>
              </div>

              {/* Main Result */}
              <div>
                <h3 className={`text-xl font-bold mb-2 ${getResultCategory(calculateTotal()).color}`}>
                  {getResultCategory(calculateTotal()).title}
                </h3>
                <div className={`p-4 rounded-lg ${getResultCategory(calculateTotal()).bg} max-w-lg mx-auto border border-slate-100`}>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {getResultCategory(calculateTotal()).desc}
                  </p>
                </div>
              </div>

              {/* Detailed Feedback for Low Scores (<4) */}
              {lowScoringQuestions.length > 0 && (
                <div className="max-w-xl mx-auto text-left mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                     <IconShield className="w-5 h-5 text-red-600" />
                     <h4 className="font-bold text-slate-900 text-lg">Dine kritiske flaskehalse</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Du har scoret under middel på følgende områder. Her er konsekvensen for din virksomhed:
                  </p>
                  <div className="space-y-4">
                    {lowScoringQuestions.map(q => (
                      <div key={q.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                           <span className="font-bold text-red-900 text-sm">{q.title}</span>
                           <span className="text-xs font-bold bg-white text-red-600 px-2 py-1 rounded border border-red-100">Score: {answers[q.id]}</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-snug">
                          {q.feedbackLow}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center pb-8">
                <button onClick={onClose} className="text-slate-500 hover:text-business-blue px-4 py-2">
                  Luk test
                </button>
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="bg-business-blue text-white px-6 py-2 rounded font-medium hover:bg-slate-800 transition-colors"
                >
                  Book 30 min. gennemgang
                </a>
              </div>
              <p className="text-xs text-slate-400">Resultatet er sendt til Frank@smvcore.com</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OwnerTestModal;