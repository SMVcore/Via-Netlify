import { useState } from 'react';

export interface Sidekick {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: 'free' | 'paid';
  price?: string;
  action: string;
  category: string;
}

const ALL_SIDEKICKS: Sidekick[] = [
  // Free
  {
    id: 'ai-readiness',
    icon: '🤖',
    title: 'AI-Parathedetstest',
    description:
      'Svar på 8 hurtige spørgsmål og få et øjeblikkeligt billede af, om din virksomhed er klar til at implementere AI.',
    type: 'free',
    action: 'Start testen',
    category: 'quiz',
  },
  {
    id: 'roi-calculator',
    icon: '📊',
    title: 'ROI-beregner for AI',
    description:
      'Beregn det potentielle afkast ved at automatisere dine mest tidskrævende processer med AI.',
    type: 'free',
    action: 'Beregn nu',
    category: 'tool',
  },
  {
    id: 'process-checklist',
    icon: '✅',
    title: 'Procesoptimerings-tjekliste',
    description:
      '25 konkrete spørgsmål der afslører, hvilke processer i din virksomhed der koster dig mest tid og penge.',
    type: 'free',
    action: 'Download gratis',
    category: 'download',
  },
  // Paid
  {
    id: 'ai-guide',
    icon: '🗺️',
    title: 'AI-implementeringsguide',
    description:
      'Trin-for-trin guide til at vælge, implementere og forankre AI i en SMV. 42 sider med konkrete eksempler.',
    type: 'paid',
    price: '149 kr.',
    action: 'Køb guide',
    category: 'download',
  },
  {
    id: 'process-kit',
    icon: '⚙️',
    title: 'Procesoptimerings-skabelon',
    description:
      'Excel-kit med alt du behøver: procesanalyse-ark, prioriteringsmatrix og handlingsplan-skabelon.',
    type: 'paid',
    price: '199 kr.',
    action: 'Køb kit',
    category: 'download',
  },
  {
    id: 'project-kit',
    icon: '🗂️',
    title: 'Projektstyrings-kit for SMV',
    description:
      'Skabeloner og guides til at styre projekter effektivt i en lille organisation — uden tung metodologi.',
    type: 'paid',
    price: '249 kr.',
    action: 'Køb kit',
    category: 'download',
  },
];

interface SidekicksProps {
  onOpenSidekick: (sidekick: Sidekick) => void;
}

export default function Sidekicks({ onOpenSidekick }: SidekicksProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'paid'>('all');

  const displayed =
    activeTab === 'all'
      ? ALL_SIDEKICKS
      : ALL_SIDEKICKS.filter(s => s.type === activeTab);

  return (
    <section className="sidekicks section" id="sidekicks">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label" style={{ color: 'rgba(255,160,77,1)' }}>Sidekicks</div>
        <h2 className="section-title section-title--white">
          Hurtige gevinster til din virksomhed
        </h2>
        <p className="section-sub">
          Mini-værktøjer og ressourcer du kan bruge med det samme. Gratis leadmagneter
          og betalte guides — alt samlet på ét sted.
        </p>

        <div className="sidekicks-tabs">
          {(['all', 'free', 'paid'] as const).map(tab => (
            <button
              key={tab}
              className={`sidekicks-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'Alle' : tab === 'free' ? '🎁 Gratis' : '⭐ Betalte'}
            </button>
          ))}
        </div>

        <div className="sidekicks-grid">
          {displayed.map(sidekick => (
            <div
              key={sidekick.id}
              className="sidekick-card"
              onClick={() => onOpenSidekick(sidekick)}
            >
              <div className="sidekick-card-top">
                <div className="sidekick-icon">{sidekick.icon}</div>
                <span className={`sidekick-pill sidekick-pill--${sidekick.type}`}>
                  {sidekick.type === 'free' ? '✦ Gratis' : '⭐ Betalt'}
                </span>
              </div>

              <div className="sidekick-title">{sidekick.title}</div>
              <div className="sidekick-desc">{sidekick.description}</div>

              <div className="sidekick-action">
                <div className={`sidekick-price ${sidekick.type === 'free' ? 'sidekick-price--free' : ''}`}>
                  {sidekick.type === 'free' ? 'Gratis' : sidekick.price}
                </div>
                <button
                  className="sidekick-btn"
                  onClick={e => { e.stopPropagation(); onOpenSidekick(sidekick); }}
                >
                  {sidekick.action} →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginBottom: 16 }}>
            Har du idéer til sidekicks du savner? Skriv til mig.
          </p>
          <a href="#kontakt" className="btn btn-outline-white btn-sm">
            Foreslå en sidekick
          </a>
        </div>
      </div>
    </section>
  );
}
