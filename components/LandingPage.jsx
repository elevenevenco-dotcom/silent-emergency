'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

export default function LandingPage({ onGetStarted }) {
  const [faqOpen, setFaqOpen] = useState(null)

  const faqs = [
    { q: 'How does Silent Emergency protect me?', a: 'Our AI monitors your activity...' },
    { q: 'Can I use it without anyone knowing?', a: 'Yes. Stealth mode lets you trigger an SOS...' },
    { q: 'What happens if I miss a check-in?', a: 'Your trusted contacts receive an automatic alert...' },
    { q: 'Is my data private?', a: 'All location data is end-to-end encrypted...' },
  ]

  const stats = [
    { n: '2.4M+', l: 'Users Protected' },
    { n: '98.7%', l: 'Alert Accuracy' },
    { n: '<8s', l: 'Alert Speed' },
    { n: '156', l: 'Countries Active' },
  ]

  const testimonials = [
    { name: 'Priya S.', city: 'New York', text: 'Silent Emergency saved me when my phone died...', stars: 5 },
    { name: 'David M.', city: 'London', text: 'The stealth mode is incredible...', stars: 5 },
    { name: 'Carmen L.', city: 'Sao Paulo', text: 'As a solo traveler, this gives me real peace of mind...', stars: 5 },
  ]

  const features = [
    { icon: 'zap', title: 'Instant Panic Button', desc: 'One tap sends your location...' },
    { icon: 'eye', title: 'AI Risk Detection', desc: 'Machine learning monitors behavior patterns...' },
    { icon: 'lock', title: 'Stealth Mode', desc: 'Hidden triggers via volume buttons...' },
    { icon: 'clock', title: 'Smart Check-Ins', desc: 'Customizable timers automatically alert contacts...' },
  ]

  return (
    <div>
      {/* Features section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, padding: '40px 24px' }}>
        {features.map((f, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <Icon name={f.icon} size={32} color={COLORS.red} />
            <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: COLORS.textDim }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '40px 24px', background: COLORS.bgAlt }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.red }}>{s.n}</div>
            <div style={{ fontSize: 12, color: COLORS.textDim }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ padding: '40px 24px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30 }}>Trusted by Thousands</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                {[...Array(t.stars)].map((_, idx) => <Icon key={idx} name="star" size={14} color={COLORS.amber} />)}
              </div>
              <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: COLORS.redGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: COLORS.red }}>{t.name[0]}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textDim }}>{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ section */}
      <div style={{ padding: '0 24px 40px' }}>
        <h2 className="section-title" style={{ marginBottom: 20, textAlign: 'center' }}>Common Questions</h2>
        {faqs.map((f, i) => (
          <div key={i} className="card" style={{ marginBottom: 10, cursor: 'pointer' }} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500, fontSize: 14, color: COLORS.text, paddingRight: 12 }}>{f.q}</span>
              <div style={{ transform: faqOpen === i ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <Icon name="chevron" size={18} color={COLORS.textMuted} />
              </div>
            </div>
            {faqOpen === i && (
              <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, marginTop: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>{f.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div style={{ padding: '0 24px 60px', textAlign: 'center' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #120508 0%, #0F1117 100%)', border: '1px solid rgba(232,51,58,0.3)', borderRadius: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}></div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, color: COLORS.text, marginBottom: 8 }}>Start Protecting Yourself Today</h2>
          <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 24, lineHeight: 1.5 }}>Join 2.4 million people who trust Silent Emergency with their safety.</p>
          <a
            href="https://buy.stripe.com/4gMaEP59P62x6bA6nD4Ja01
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red"
            style={{ textDecoration: 'none' }}
          >
            Create Free Account
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, background: COLORS.red, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shield" size={14} color="white" />
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 14, color: COLORS.text }}>Silent Emergency</span>
        </div>
      </div>

      <p style={{ fontSize: 12, color: COLORS.textDim }}>
        2025 Silent Emergency Inc. Privacy Policy. Terms of Use
      </p>
    </div>
  );
}
