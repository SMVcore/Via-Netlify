import React, { useState } from 'react';
import { IconCpu, IconClose, IconArrowRight, IconBrain } from './Icons';

interface AIReadinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  title: string;
  description: string;
  lowLabel: string;
  highLabel: string;
}

const questions: Question[] = [
  { 
    id: 1, 
    title: "Anvendelsesniveau", 
    description: "AI anvendes som en integreret del af arbejdsgange – ikke kun som et “søgeværktøj”.", 
    lowLabel: "Svarer til Google", 
    highLabel: "Indlejret i processer" 
  },
  { 
    id: 2, 
    title: "Prompt-kompetence", 
    description: "Medarbejdere forstår og anvender promptning bevidst for at styre kvalitet, kontekst og output.", 
    lowLabel: "Tilfældig brug", 
    highLabel: "Fælles metode" 
  },
  { 
    id: 3, 
    title: "Assistenter og automatisering", 
    description: "Virksomheden har opbygget eller taget aktive valg omkring AI-assistenter, copilots eller automatiserede arbejdsgange.", 
    lowLabel: "Ingen", 
    highLabel: "Flere i drift" 
  },
  { 
    id: 4, 
    title: "Data- og videngrundlag", 
    description: "Virksomheden har taget stilling til, hvilket data- og videngrundlag AI må/skal arbejde ud fra.", 
    lowLabel: "Ingen kontrol", 
    highLabel: "Klart defineret" 
  },
  { 
    id: 5, 
    title: "Ledelsesmæssig retning", 
    description: "Ledelsen har truffet bevidste valg om, hvor AI skal anvendes – og hvor det ikke giver mening.", 
    lowLabel: "Tilfældig brug", 
    highLabel: "Klare principper" 
  },
  { 
    id: 6, 
    title: "Fremadrettet plan", 
    description: "Virksomheden har en plan for, hvordan AI gradvist skal bruges til effektivitet, kvalitet eller nye muligheder de kommende 12–24 måneder.", 
    lowLabel: "Ingen plan", 
    highLabel: "Prioriteret roadmap" 
  },
];

const AIReadinessModal: React.FC<AIReadinessModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'lead' | 'results'>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleScore = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const calculateTotal = () => Object.values(answers).reduce((a, b) => a + b, 0);

  // Max score is 42 (6 questions * 7 points)
  const getResultCategory = (score: number) => {
    if (score <= 18) return {
      title: "Ad-hoc / Eksperimentel",
      color: "text-red-600",
      bg: "bg-red-50",
      desc: "I bruger primært AI som en avanceret søgemaskine. Der mangler struktur, sikkerhed og fælles retning. Potentialet er stort, men risikoen for spildtid er høj."
    };
    if (score <= 30) return {
      title: "Delvist struktureret",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      desc: "I er i gang, og enkelte nøglepersoner driver værket. Der mangler dog bred forankring og en strategisk plan for at skalere gevinsterne."
    };
    return {
      title: "Strategisk AI-parat",
      color: "text-green-600",
      bg: "bg-green-50",
      desc: "I har knækket koden. AI er ikke bare 'noget vi leger med', men en integreret del af drift og strategi. Fokus bør nu være på automatisering af komplekse flows."
    };
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending data
    console.log(`--- AI READINESS TEST SUBMITTED ---`);
    console.log(`User: ${formData.name} (${formData.email})`);
    console.log(`Score: ${calculateTotal()}`);
    console.log(`Answers:`, answers);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('results');
    }, 1500);
  };

  const isAllAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-business-blue">
            <IconBrain className="w-6 h-6" />
            <h3 className="font-semibold text-lg">AI-Parathedstest</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          
          {/* STEP: INTRO */}
          {step === 'intro' && (
            <div className="text-center space-y-6 py-8">
              <h2 className="text-2xl font-bold text-business-blue">Er jeres virksomhed klar til AI?</h2>
              <p className="text-slate-600 max-w-lg mx-auto">
                Mange bruger AI, men få bruger det strategisk. Tag testen og få en score fra 1-7 på jeres modenhed.
                Vi måler på alt fra prompt-kompetencer til datasikkerhed.
              </p>
              <div className="flex justify-center gap-8 text-sm text-slate-500 my-8">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div>Ad-hoc</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div>Delvis</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-400"></div>Strategisk</div>
              </div>
              <button 
                onClick={() => setStep('questions')}
                className="bg-business-blue text-white px-8 py-3 rounded hover:bg-slate-800 font-semibold transition-colors inline-flex items-center gap-2"
              >
                Start AI-testen <IconArrowRight className="w-4 h-4" />
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
                Indtast dine oplysninger for at låse op for din score og få AI-analysen tilsendt.
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
                  ) : 'Vis min AI-score'}
                </button>
              </form>
            </div>
          )}

          {/* STEP: RESULTS */}
          {step === 'results' && (
            <div className="text-center space-y-6 animate-in fade-in duration-500">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" fill="transparent" stroke="#e2e8f0" strokeWidth="8" />
                  <circle 
                    cx="64" cy="64" r="60" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className={getResultCategory(calculateTotal()).color}
                    strokeDasharray={377}
                    strokeDashoffset={377 - (377 * calculateTotal()) / 42}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-business-blue">{calculateTotal()}</span>
                  <span className="text-xs text-slate-400">/ 42</span>
                </div>
              </div>

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

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={onClose} className="text-slate-500 hover:text-business-blue px-4 py-2">
                  Luk test
                </button>
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="bg-business-blue text-white px-6 py-2 rounded font-medium hover:bg-slate-800 transition-colors"
                >
                  Få hjælp til AI-Roadmap
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AIReadinessModal;