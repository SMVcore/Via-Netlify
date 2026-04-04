interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  price: string;
  priceNote: string;
  duration: string;
  format: string;
  badge: string;
  badgeStyle: 'new' | 'popular';
  headerStyle: 'ai' | 'efficiency';
  topics: string[];
  nextDate?: string;
}

const COURSES: Course[] = [
  {
    id: 'ai-smv',
    title: 'AI for SMV',
    tagline: 'Praktisk AI-implementering der virker',
    description:
      'Få et konkret overblik over hvilke AI-løsninger der giver mening for netop din virksomhed — og en handlingsplan du kan eksekvere fra dag ét.',
    price: '4.995 kr.',
    priceNote: 'ekskl. moms · pr. deltager',
    duration: '1 dag',
    format: 'Fysisk eller online',
    badge: 'Nyhed',
    badgeStyle: 'new',
    headerStyle: 'ai',
    nextDate: 'Maj 2026',
    topics: [
      'AI-landskabet for SMV — hvad virker i praksis',
      'Kortlæg dine processer og find AI-potentialet',
      'Konkrete AI-tools du kan bruge fra i morgen',
      'Undgå faldgruber og spildte investeringer',
      'Byg din personlige AI-implementeringsplan',
    ],
  },
  {
    id: 'effektivisering',
    title: 'Effektivisering & Vækst',
    tagline: 'Slip for flaskehalse og tab af tid',
    description:
      'Et intensivt kursus i at kortlægge, prioritere og optimere arbejdsgange i din virksomhed — med konkrete metoder og skabeloner du tager hjem.',
    price: '3.995 kr.',
    priceNote: 'ekskl. moms · pr. deltager',
    duration: '1 dag',
    format: 'Fysisk eller online',
    badge: 'Populær',
    badgeStyle: 'popular',
    headerStyle: 'efficiency',
    nextDate: 'April 2026',
    topics: [
      'Procesanalyse: find og prioriter forbedringer',
      'Værdistrøms-kortlægning i praksis',
      'Digitalisering — hvornår og hvad',
      'Forandringsledelse i en lille organisation',
      'Handlingsplan med opfølgning',
    ],
  },
];

interface CoursesProps {
  onSignup: (course: Course) => void;
}

export default function Courses({ onSignup }: CoursesProps) {
  return (
    <section className="courses section" id="kurser">
      <div className="container">
        <div className="courses-header">
          <div className="section-label">Kurser</div>
          <h2 className="section-title">Lær at sætte handling bag ordene</h2>
          <p className="section-sub">
            Praktiske, hands-on kurser designet til travle SMV-ejere og ledere.
            Ingen tung teori — kun konkrete metoder og værktøjer du kan bruge næste dag.
          </p>
        </div>

        <div className="courses-grid">
          {COURSES.map(course => (
            <div key={course.id} className="course-card">
              <div className={`course-card-header course-card-header--${course.headerStyle}`}>
                <span className={`course-badge course-badge--${course.badgeStyle}`}>
                  {course.badge}
                </span>
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-tagline">{course.tagline}</p>
              </div>

              <div className="course-card-body">
                <div className="course-meta">
                  <div className="course-meta-item">
                    <span className="course-meta-icon">⏱</span>
                    {course.duration}
                  </div>
                  <div className="course-meta-item">
                    <span className="course-meta-icon">📍</span>
                    {course.format}
                  </div>
                  {course.nextDate && (
                    <div className="course-meta-item">
                      <span className="course-meta-icon">📅</span>
                      {course.nextDate}
                    </div>
                  )}
                </div>

                <p className="course-desc">{course.description}</p>

                <ul className="course-topics">
                  {course.topics.map(topic => (
                    <li key={topic} className="course-topic">
                      <span className="course-topic-check">✓</span>
                      {topic}
                    </li>
                  ))}
                </ul>

                <div className="course-footer">
                  <div>
                    <div className="course-price">{course.price}</div>
                    <div className="course-price-sub">{course.priceNote}</div>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onSignup(course)}
                  >
                    Tilmeld mig
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: '24px 32px', background: 'rgba(232,119,34,0.06)', borderRadius: 12, border: '1px solid rgba(232,119,34,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1B2A4A', marginBottom: 4 }}>
              Virksomhedsrabat ved 3+ deltagere
            </div>
            <div style={{ fontSize: 14, color: '#4B5563' }}>
              Kører du kurset internt i din organisation? Kontakt mig for skræddersyet tilbud.
            </div>
          </div>
          <a href="#kontakt" className="btn btn-outline btn-sm">
            Få tilbud
          </a>
        </div>
      </div>
    </section>
  );
}

export type { Course };
