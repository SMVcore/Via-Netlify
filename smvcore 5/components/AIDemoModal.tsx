import React, { useState } from 'react';
import { IconBrain, IconClose, IconArrowRight } from './Icons';
import { getQuickAnalysis } from '../services/geminiService';

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIDemoModal: React.FC<AIDemoModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await getQuickAnalysis(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-business-blue">
            <IconBrain className="w-6 h-6" />
            <h3 className="font-semibold text-lg">Digital Assistent Demo</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <IconClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!response ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-slate-600 text-sm">
                Beskriv din største flaskehals lige nu. Vores AI-model (trænet på SMVcore-principper) giver dig et øjeblikkeligt bud på en strukturel løsning.
              </p>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Din udfordring
                </label>
                <textarea
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-business-blue focus:border-transparent outline-none text-slate-800 text-sm min-h-[100px]"
                  placeholder="F.eks. Jeg bruger 2 timer dagligt på at godkende tilbud..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white font-medium transition-all ${
                  loading || !input.trim() 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-business-blue hover:bg-slate-800'
                }`}
              >
                {loading ? 'Analyserer struktur...' : (
                  <>
                    Få løsningsforslag <IconArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <p className="text-business-blue font-medium text-sm mb-2">SMVcore Analyse:</p>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {response}
                </p>
              </div>
              <button
                onClick={() => { setResponse(null); setInput(''); }}
                className="text-sm text-slate-500 hover:text-business-blue underline"
              >
                Prøv med en anden udfordring
              </button>
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                 <p className="text-xs text-slate-500 mb-2">Dette var en automatiseret smagsprøve.</p>
                 <a href="#contact" onClick={onClose} className="block w-full py-2 bg-slate-900 text-white rounded text-sm hover:bg-slate-800">
                   Book rigtig afklaring
                 </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDemoModal;