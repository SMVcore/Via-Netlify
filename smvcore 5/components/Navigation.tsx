import { useState, useEffect } from 'react';

interface NavigationProps {
  onOpenAIReadiness: () => void;
}

export default function Navigation({ onOpenAIReadiness }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#ydelser', label: 'Ydelser' },
    { href: '#kurser', label: 'Kurser' },
    { href: '#sidekicks', label: 'Sidekicks' },
    { href: '#om', label: 'Om mig' },
  ];

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav className="nav" style={{ boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none' }}>
      <div className="container">
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            SMV<span>core</span>
          </a>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">{l.label}</a>
              </li>
            ))}
            <li>
              <button
                onClick={onOpenAIReadiness}
                className="nav-link"
                style={{ cursor: 'pointer', border: 'none', background: 'rgba(232,119,34,0.12)', color: 'rgba(255,160,77,1)' }}
              >
                AI-test ✦
              </button>
            </li>
            <li>
              <a href="#kontakt" className="nav-link nav-cta">Book møde</a>
            </li>
          </ul>

          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
        {links.map(l => (
          <a key={l.href} href={l.href} className="nav-mobile-link" onClick={handleLinkClick}>
            {l.label}
          </a>
        ))}
        <button
          onClick={() => { onOpenAIReadiness(); handleLinkClick(); }}
          className="nav-mobile-link"
          style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: 'rgba(255,160,77,1)' }}
        >
          AI-parathedetstest ✦
        </button>
        <a href="#kontakt" className="nav-mobile-link" onClick={handleLinkClick}
          style={{ color: 'rgba(232,119,34,1)', fontWeight: 700, borderBottom: 'none', marginTop: 8 }}>
          Book møde →
        </a>
      </div>
    </nav>
  );
}
