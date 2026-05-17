'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

const FEATURES = [
  { icon: 'users',    label: 'Unlimited Contacts',   desc: 'Add up to 20 trusted contacts',     free: 'Up to 5'   },
  { icon: 'zap',      label: 'AI Risk Monitoring',   desc: 'Continuous behavior analysis',       free: false        },
  { icon: 'location', label: 'Advanced Tracking',    desc: 'Movement history & heatmaps',        free: 'Basic only' },
  { icon: 'mic',      label: 'Cloud Storage',        desc: '30 days of recordings',             free: false        },
  { icon: 'bell',     label: 'Priority Alerts',      desc: 'Faster notification delivery',      free: false        },
  { icon: 'activity', label: 'Incident Reports',     desc: 'Detailed AI-generated reports',     free: false        },
]

export default function PremiumPage() {
  const [plan, setPlan] = useState('annual')

  return (
    <div style={{ padding: '24px 20px', paddingBottom: 100 }} className="fade-in">
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
          <Icon name="crown" size={28} color={COLORS.amber} />
        </div>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28, color: COLORS.text, marginBottom: 8 }}>Go Premium</h1>
        <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.5 }}>Complete protection for you and your loved ones</p>
      </div>

      {/* Plan toggle */}
      <div style={{ display: 'flex', background: COLORS.bgCard, borderRadius: 14, padding: 4, marginBottom: 24, border: `1px solid ${COLORS.border}` }}>
        {['monthly', 'annual'].map(p => (
          <button key={p} onClick={() => setPlan(p)}
            style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', background: plan === p ? COLORS.bg : 'transparent', color: plan === p ? COLORS.text : COLORS.textMuted, fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', position: 'relative' }}>
            {p === 'annual' ? 'Annual' : 'Monthly'}
            {p === 'annual' && (
              <span style={{ position: 'absolute', top: -8, right: 4, background: COLORS.green, color: 'white', fontSize: 9, padding: '2px 6px', borderRadius: 6, fontWeight: 700 }}>-40%</span>
            )}
          </button>
        ))}
      </div>

      {/* Price cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 6 }}>Free</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, color: COLORS.text }}>$0</div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>forever</div>
        </div>
        <div className="card" style={{ textAlign: 'center', border: '1px solid rgba(245,158,11,0.4)', background: 'linear-gradient(135deg, #0D0B05, #0F1117)' }}>
          <div style={{ fontSize: 12, color: COLORS.amber, marginBottom: 6, fontWeight: 600 }}>Premium</div>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, color: COLORS.text }}>{plan === 'annual' ? '$5' : '$8'}</div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>per month</div>
        </div>
      </div>

      {/* Feature list */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 14 }}>What&apos;s included</div>
        {FEATURES.map((f, i) => (
          <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < FEATURES.length - 1 ? 16 : 0, paddingBottom: i < FEATURES.length - 1 ? 16 : 0, borderBottom: i < FEATURES.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={f.icon} size={16} color={COLORS.amber} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.text }}>{f.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim }}>{f.desc}</div>
            </div>
            <div style={{ flexShrink: 0 }}>
              {f.free === false
                ? <span className="badge badge-amber" style={{ fontSize: 10 }}>PRO</span>
                : <span style={{ fontSize: 11, color: COLORS.textDim }}>{f.free}</span>
              }
            </div>
          </div>
        ))}
      </div>

      <button className="btn-red" style={{ background: 'linear-gradient(135deg, #F59E0B, #E8333A)', marginBottom: 12 }}>
        Start 7-Day Free Trial
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: COLORS.textDim }}>Cancel anytime. No commitments.</p>
    </div>
  )
}
