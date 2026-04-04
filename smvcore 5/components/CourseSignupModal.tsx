import { useState } from 'react';
import type { Course } from './Courses';

interface CourseSignupModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function CourseSignupModal({ course, onClose }: CourseSignupModalProps) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    participants: '1',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send to backend/email service
    console.log('Course signup:', { course: course.id, ...form });
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-top">
            <div>
              <div className="modal-title">Tilmeld dig kurset</div>
              <div className="modal-sub">Udfyld formularen og jeg vender tilbage inden for 24 timer.</div>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Luk">✕</button>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-course-info">
            <div className="modal-course-name">{course.title}</div>
            <div className="modal-course-detail">
              {course.duration} · {course.format} · {course.price}
            </div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#1B2A4A', marginBottom: 8 }}>
                Tilmelding modtaget!
              </div>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>
                Tak, {form.name.split(' ')[0]}! Jeg sender dig en bekræftelse
                på <strong>{form.email}</strong> inden for 24 timer med alle detaljer.
              </p>
              <button className="btn btn-primary w-full mt-4" onClick={onClose} style={{ marginTop: 24 }}>
                Luk
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Navn *</label>
                  <input
                    className="form-input"
                    name="name"
                    type="text"
                    placeholder="Dit fulde navn"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Virksomhed *</label>
                  <input
                    className="form-input"
                    name="company"
                    type="text"
                    placeholder="Virksomhedens navn"
                    required
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">E-mail *</label>
                  <input
                    className="form-input"
                    name="email"
                    type="email"
                    placeholder="din@email.dk"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input
                    className="form-input"
                    name="phone"
                    type="tel"
                    placeholder="+45 00 00 00 00"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Antal deltagere</label>
                <select
                  className="form-select"
                  name="participants"
                  value={form.participants}
                  onChange={handleChange}
                >
                  <option value="1">1 deltager</option>
                  <option value="2">2 deltagere</option>
                  <option value="3">3 deltagere (kontakt for pris)</option>
                  <option value="4+">4+ deltagere (virksomhedspris)</option>
                </select>
                {parseInt(form.participants) >= 3 || form.participants === '4+' ? (
                  <div className="form-hint">
                    ✦ Vi kontakter dig med et samlet tilbud for gruppen.
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label className="form-label">Særlige ønsker eller spørgsmål</label>
                <textarea
                  className="form-input"
                  name="message"
                  placeholder="Fx særlige fokusområder, spørgsmål til indholdet..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full" style={{ width: '100%', justifyContent: 'center' }}>
                Send tilmelding
              </button>

              <p className="privacy-note">
                Dine oplysninger deles ikke med tredjepart og bruges kun til at bekræfte din tilmelding.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
