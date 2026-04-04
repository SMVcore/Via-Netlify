import { useState } from 'react';
import type { Sidekick } from './Sidekicks';

// ─── AI Readiness Quiz ─────────────────────────────────────────────────────
const AI_QUESTIONS = [
  {
    q: 'Hvordan vil du beskrive jeres IT-modenhed?',
    opts: [
      'Vi bruger primært papir og e-mail',
      'Vi har grundlæggende systemer (regnskab, CRM)',
      'Vi bruger cloud-løsninger og integrerede systemer',
      'Vi har stærk digital infrastruktur',
    ],
    scores: [0, 1, 2, 3],
  },
  {
    q: 'Har I processer der er gentagne og regelbaserede?',
    opts: [
      'Nej, alt er meget forskelligt fra gang til gang',
      'Ja, men kun få processer',
      'Ja, en del af vores arbejde er gentaget',
      'Ja, størstedelen er struktureret og gentaget',
    ],
    scores: [0, 1, 2, 3],
  },
  {
    q: 'Hvordan er jeres datakvalitet?',
    opts: [
      'Vi har ikke meget data eller den er ustruktureret',
      'Vi har noget data, men det er spredt',
      'Vi har systematisk data i ét eller få systemer',
      'Vi har god, struktureret data med historik',
    ],
    scores: [0, 1, 2, 3],
  },
  {
    q: 'Hvad er din ledelses holdning til AI?',
    opts: [
      'Skeptisk — "det er ikke noget for os"',
      'Nysgerrig, men usikker',
      'Positiv og åben for at prøve',
      'Aktivt opsøgende og klar til at investere',
    ],
    scores: [0, 1, 2, 3],
  },
  {
    q: 'Har I ressourcer til at implementere nye løsninger?',
    opts: [
      'Nej, vi er presset på tid og budget',
      'Begrænset — vi kan prioritere lidt',
      'Vi kan afsætte tid og en lille budget',
      'Vi har dedikerede ressourcer til projekter',
    ],
    scores: [0, 1, 2, 3],
  },
];

interface AIReadinessQuizProps {
  onClose: () => void;
}

function AIReadinessQuiz({ onClose }: AIReadinessQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const total = AI_QUESTIONS.length;
  const isResult = step === total;
  const score = answers.reduce((s, a, i) => s + AI_QUESTIONS[i].scores[a], 0);
  const maxScore = total * 3;
  const pct = Math.round((score / maxScore) * 100);

  const level = pct < 40 ? 'low' : pct < 70 ? 'mid' : 'high';
  const levelText =
    level === 'low'
      ? 'Stadig tidligt stadie'
      : level === 'mid'
      ? 'Godt på vej'
      : 'Klar til AI-implementering';
  const levelDesc =
    level === 'low'
      ? 'Din virksomhed har et godt fundament at bygge på. Fokuser på at digitalisere kerneproceserne og skab et datamæssigt grundlag, inden du investerer i AI.'
      : level === 'mid'
      ? 'Du er klar til at begynde med AI på udvalgte processer. Kig på lavthængende frugter — gentagne, datarige opgaver med klar ROI.'
      : 'Din virksomhed er godt positioneret til at høste betydelige gevinster med AI. Lav en prioriteret implementeringsplan og kom i gang.';

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers, optIdx];
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AI Readiness result email:', { email, score, pct, level });
    setEmailSent(true);
  };

  if (isResult) {
    return (
      <div>
        <div className={`result-score-ring result-score-ring--${level}`}>{pct}%</div>
        <div className="result-title">{levelText}</div>
        <div className="result-desc">{levelDesc}</div>

        {!emailSent ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label className="form-label">Få den fulde analyse på e-mail</label>
              <input
                className="form-input"
                type="email"
                placeholder="din@virksomhed.dk"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <div className="form-hint">Inkl. 5 konkrete handlingspunkter for din virksomhed.</div>
            </div>
            <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', justifyContent: 'center' }}>
              Send analyse
            </button>
          </form>
        ) : (
          <div className="form-success">
            ✓ Analysen er på vej til {email}!
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <a href="#kurser" className="btn btn-outline btn-sm" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
            Se kurser
          </a>
          <button className="btn btn-outline btn-sm" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
            Luk
          </button>
        </div>
      </div>
    );
  }

  const q = AI_QUESTIONS[step];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#9CA3AF', marginBottom: 8 }}>
        <span>Spørgsmål {step + 1} af {total}</span>
        <span>{Math.round(((step) / total) * 100)}% færdig</span>
      </div>
      <div className="ai-readiness-progress">
        <div className="ai-readiness-bar" style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <div className="ai-readiness-question">
        <p style={{ fontWeight: 700, fontSize: 16, color: '#1B2A4A', lineHeight: 1.4 }}>{q.q}</p>
      </div>
      <div className="ai-readiness-options">
        {q.opts.map((opt, idx) => (
          <button
            key={idx}
            className="ai-readiness-option"
            onClick={() => handleAnswer(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ROI Calculator ────────────────────────────────────────────────────────
function ROICalculator({ onClose }: { onClose: () => void }) {
  const [hours, setHours] = useState('10');
  const [rate, setRate] = useState('350');
  const [automation, setAutomation] = useState('60');

  const weeklyHours = parseFloat(hours) || 0;
  const hourlyRate = parseFloat(rate) || 0;
  const automationPct = parseFloat(automation) / 100;
  const savedHoursWeek = weeklyHours * automationPct;
  const savedHoursYear = savedHoursWeek * 48;
  const savedKrYear = savedHoursYear * hourlyRate;
  const roi = savedKrYear;

  return (
    <div>
      <p style={{ fontSize: 14, color: '#4B5563', marginBottom: 20, lineHeight: 1.6 }}>
        Beregn det potentielle afkast ved at automatisere tidskrævende opgaver med AI.
      </p>
      <div className="form-group">
        <label className="form-label">Timer brugt på manuelle opgaver pr. uge</label>
        <input className="form-input" type="number" min="1" max="80" value={hours} onChange={e => setHours(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Timepris (kr./time)</label>
        <input className="form-input" type="number" min="100" max="2000" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label">Forventet automationsgrad: {automation}%</label>
        <input type="range" min="10" max="90" value={automation} onChange={e => setAutomation(e.target.value)}
          style={{ width: '100%', accentColor: '#E87722' }} />
        <div className="form-hint">Konservativt 30–40%, optimistisk 60–80%</div>
      </div>

      <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '20px 24px', border: '1px solid #E5E7EB', marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 14, color: '#4B5563' }}>Frigjorte timer/år</span>
          <span style={{ fontWeight: 700, color: '#1B2A4A' }}>{savedHoursYear.toFixed(0)} timer</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #E5E7EB' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1B2A4A' }}>Potentiel besparelse/år</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: '#E87722' }}>
            {roi.toLocaleString('da-DK', { maximumFractionDigits: 0 })} kr.
          </span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 10, lineHeight: 1.5 }}>
        * Beregningen er vejledende og baseret på dine input. Faktiske resultater afhænger af procestyper og implementeringskvalitet.
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <a href="#kurser" className="btn btn-primary btn-sm" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
          Se AI-kurset
        </a>
        <button className="btn btn-outline btn-sm" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
          Luk
        </button>
      </div>
    </div>
  );
}

// ─── Generic Sidekick Modal ────────────────────────────────────────────────
interface SidekickModalProps {
  sidekick: Sidekick | null;
  onClose: () => void;
}

export default function SidekickModal({ sidekick, onClose }: SidekickModalProps) {
  if (!sidekick) return null;

  const renderContent = () => {
    if (sidekick.id === 'ai-readiness') {
      return <AIReadinessQuiz onClose={onClose} />;
    }
    if (sidekick.id === 'roi-calculator') {
      return <ROICalculator onClose={onClose} />;
    }
    // Generic paid/download
    return (
      <div>
        <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.65, marginBottom: 24 }}>
          {sidekick.description}
        </p>
        {sidekick.type === 'free' ? (
          <div>
            <div className="form-group">
              <label className="form-label">Send til min e-mail</label>
              <input className="form-input" type="email" placeholder="din@virksomhed.dk" />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send mig {sidekick.title}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#F9FAFB', borderRadius: 10, marginBottom: 20, border: '1px solid #E5E7EB' }}>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#1B2A4A' }}>{sidekick.title}</span>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#E87722' }}>{sidekick.price}</span>
            </div>
            <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20, lineHeight: 1.5 }}>
              Betaling via MobilePay eller faktura. Du modtager downloa d-link på e-mail inden for 5 minutter.
            </p>
            <a href="#kontakt" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }} onClick={onClose}>
              Bestil via kontaktformular
            </a>
          </div>
        )}
        <button onClick={onClose} style={{ width: '100%', marginTop: 12, textAlign: 'center', color: '#9CA3AF', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}>
          Luk
        </button>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-top">
            <div>
              <div className="sidekick-modal-icon">{sidekick.icon}</div>
              <div className="modal-title">{sidekick.title}</div>
              <div className="modal-sub">
                <span className={`sidekick-pill sidekick-pill--${sidekick.type}`} style={{ fontSize: 11 }}>
                  {sidekick.type === 'free' ? '✦ Gratis' : `⭐ ${sidekick.price}`}
                </span>
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="modal-body">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
