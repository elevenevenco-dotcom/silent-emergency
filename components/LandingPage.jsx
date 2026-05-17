'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

export default function LandingPage({ onGetStarted }) {
  const [faqOpen, setFaqOpen] = useState(null)

  const faqs = [
    { q: 'How does Silent Emergency protect me?', a: 'Our AI monitors your activity, location, and device behavior in real-time. If anything unusual is detected, it silently alerts your trusted contacts with your exact location and status.' },
    { q: 'Can I use it without anyone knowing?', a: 'Yes. Stealth mode lets you trigger an SOS using volume buttons or hidden gestures, displaying a decoy calculator screen to anyone watching.' },
    { q: 'What happens if I miss a check-in?', a: 'Your trusted contacts receive an automatic alert with your last known location, battery level, and movement status. Escalations happen in priority order.' },
    { q: 'Is my data private?', a: 'All location data is end-to-end encrypted. We never sell your data. Your information is only shared with your designated trusted contacts during an emergency.' },
  ]

  const stats = [
    { n: '2.4M+', l: 'Users Protected' },
    { n: '98.7%', l: 'Alert Accuracy' },
    { n: '<8s',   l: 'Alert Speed' },
    { n: '156',   l: 'Countries Active' },
  ]

  const testimonials = [
    { name: 'Priya S.',  city: 'New York',   text: 'Silent Emergency saved me when my phone died in an unfamiliar neighborhood. My husband was notified automatically.', stars: 5 },
    { name: 'David M.',  city: 'London',     text: 'The stealth mode is incredible. I triggered an alert without my attacker knowing. Police arrived within minutes.', stars: 5 },
    { name: 'Carmen L.', city: 'São Paulo',  text: 'As a solo traveler, this gives me real peace of mind. My family always knows I\'m safe.', stars: 5 },
  ]

  const features = [
    { icon: 'zap',      title: 'Instant Panic Button',   desc: 'One tap sends your location, starts recording, and alerts all trusted contacts simultaneously.' },
    { icon: 'eye',      title: 'AI Risk Detection',      desc: 'Machine learning monitors behavior patterns and flags anomalies before they become emergencies.' },
    { icon: 'lock',     title: 'Stealth Mode',           desc: 'Hidden triggers via volume buttons and gestures. Displays a decoy screen to anyone watching.' },
    { icon: 'clock',    title: 'Smart Check-Ins',        desc: 'Customizable timers automatically alert contacts if you fail to check in on time.' },
    { icon: 'location', title: 'Live Location Sharing',  desc: 'Real-time GPS tracking with movement history shared securely with your trusted circle.' },
    { icon: 'mic',      title: 'Audio & Video Record',   desc: 'Emergency mode auto-records audio and front camera for evidence preservation.' },
  ]

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: `1px solid ${COLORS.border}`, position: 'sticky', top: 0, background: 'rgba(8,10,14,0.92)', backdropFilter: 'blur(20px)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: COLORS.red, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shield" size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: COLORS.text }}>Silent Emergency</span>
        </div>
     </nav>
<a 
  href="https://buy.stripe.com/00w3cn8m13Up6bAdQ54Ja00"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-red"
  style={{
   maxWidth: 280,
   
    margin: '0 auto 12px',
    display: 'block',
    textAlign: 'center',
    padding: '14px 20px',
    textDecoration: 'none'
  }}
>
  Start Free — No Card Required
</a>
          
      
      

      {/* Hero */}
      <div style={{ padding: '60px 24px 40px', textAlign: 'center' }}>
        <div className="badge badge-red" style={{ marginBottom: 20, fontSize: 12 }}>
          <span style={{ width: 6, height: 6, background: COLORS.red, borderRadius: '50%', display: 'inline-block', animation: 'blink 1.5s infinite' }} />
          AI-Powered Safety · Active Now
        </div>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 38, lineHeight: 1.1, color: COLORS.text, marginBottom: 20, letterSpacing: '-0.5px' }}>
          Your Silent Guardian<br />
          <span style={{ color: COLORS.red }}>When You Need It Most</span>
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 1.6, maxWidth: 320, margin: '0 auto 36px' }}>
          Smart emergency protection powered by real-time AI safety monitoring. Always watching. Never intrusive.
        </p>

 <a
  href="https://buy.stripe.com/00w3cn8m13Up6bAdQ54Ja00"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-red"
  style={{
    maxWidth: 280,
    margin: '0 auto 12px',
    display: 'block',
    textAlign: 'center',
    padding: '14px 20px',
    textDecoration: 'none'
  }}
>
  Start Free — No Card Required
</a>
 

      
        <p style={{ color: COLORS.textDim, fontSize: 13 }}>Available on iOS & Android</p>

        {/* Store buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
        {['App Store', 'Google Play'].map(s => (
  <div
    key={s}
    className="card"
    style={{
      
      padding: '10px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      borderRadius: 14,
      flex: 1,
      maxWidth: 150,
      justifyContent: 'center'
    }}
  >
    <Icon
      name={s === 'App Store' ? 'apple' : 'grid'}
      size={16}
      color={COLORS.textMuted}
    />

    <div>
      <div style={{ fontSize: 9, color: COLORS.textDim }}>
        Download on the
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: COLORS.text
        }}
      >
        {s}
      </div>
    </div>
  </div>
 ))}
       
      
    

      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '0 24px 40px' }}>
        {stats.map(s => (
          <div key={s.n} className="card" style={{ textAlign: 'center', padding: '20px 12px' }}>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 26, color: COLORS.red }}>{s.n}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '0 24px 40px' }}>
        <h2 className="section-title" style={{ marginBottom: 20, textAlign: 'center' }}>Everything You Need</h2>
        {features.map(f => (
          <div key={f.title} className="card" style={{ marginBottom: 12, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: COLORS.redGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(232,51,58,0.2)' }}>
              <Icon name={f.icon} size={20} color={COLORS.red} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ padding: '0 24px 40px' }}>
        <h2 className="section-title" style={{ marginBottom: 20, textAlign: 'center' }}>Real People. Real Safety.</h2>
        {testimonials.map(t => (
          <div key={t.name} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
              {[...Array(t.stars)].map((_, i) => <Icon key={i} name="star" size={14} color={COLORS.amber} />)}
            </div>
            <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, marginBottom: 12, fontStyle: 'italic' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: COLORS.redGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: COLORS.red }}>{t.name[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{t.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>{t.city}</div>
          
         
          </div>
        
    
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

      {/* CTA */}
      <div style={{ padding: '0 24px 60px', textAlign: 'center' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #120508 0%, #0F1117 100%)', border: '1px solid rgba(232,51,58,0.3)', borderRadius: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}></div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, color: COLORS.text, marginBottom: 8 }}>Start Protecting Yourself Today</h2>
          <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 24, lineHeight: 1.5 }}>Join 2.4 million people who trust Silent Emergency with their safety.</p>
        <a
  href="https://buy.stripe.com/00w3cn8m13Up6bAdQ54Ja00"
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
        </div><p style={{ fontSize: 12, color: COLORS.textDim }}>© 2025 Silent Emergency Inc. · Privacy Policy · Terms of Use</p>
</div>
</div>
</div>
)
}
  
