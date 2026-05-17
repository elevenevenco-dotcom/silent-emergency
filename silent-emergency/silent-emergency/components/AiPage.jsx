'use client'
import { COLORS } from './constants'
import Icon from './Icon'

const RISK_SCORE = 12

const SIGNALS = [
  { label: 'Phone Movement',    val: 85, color: '#22C55E', status: 'Normal'       },
  { label: 'Activity Pattern',  val: 90, color: '#22C55E', status: 'Regular'      },
  { label: 'Location Variance', val: 70, color: '#22C55E', status: 'Expected'     },
  { label: 'Response Time',     val: 95, color: '#22C55E', status: 'Excellent'    },
  { label: 'Night Movement',    val: 30, color: '#F59E0B', status: 'Slightly low' },
]

const INSIGHTS = [
  { time: 'Now',       msg: 'All behavioral patterns within normal range.',                    type: 'ok'   },
  { time: '2h ago',    msg: 'Minor inactivity spike detected. Resolved automatically.',        type: 'info' },
  { time: 'Yesterday', msg: 'Late-night movement flagged and cleared.',                         type: 'warn' },
  { time: '3 days',    msg: 'Risk score peaked at 34 during transit. Auto-resolved.',          type: 'info' },
]

export default function AiPage() {
  const risk      = RISK_SCORE < 30 ? 'low' : RISK_SCORE < 60 ? 'medium' : 'high'
  const riskColor = { low: COLORS.green, medium: COLORS.amber, high: COLORS.red }[risk]

  const circumference = 2 * Math.PI * 52
  const offset        = circumference - (circumference * RISK_SCORE / 100)

  return (
    <div style={{ padding: '24px 20px', paddingBottom: 100 }} className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 className="section-title">AI Risk Monitor</h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted }}>Real-time behavior analysis & threat detection</p>
      </div>

      {/* Gauge */}
      <div className="card" style={{ textAlign: 'center', padding: '32px 20px', marginBottom: 16, border: `1px solid ${riskColor}25` }}>
        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 20px' }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke={COLORS.border} strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke={riskColor} strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 1s ease' }} />
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 30, color: COLORS.text }}>{RISK_SCORE}</div>
            <div style={{ fontSize: 10, color: COLORS.textDim }}>RISK</div>
          </div>
        </div>
        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, color: riskColor, textTransform: 'uppercase', marginBottom: 6 }}>{risk} risk</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>Normal activity patterns detected. All systems nominal.</div>
      </div>

      {/* Signals */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 14 }}>Monitored Signals</div>
        {SIGNALS.map(s => (
          <div key={s.label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: COLORS.text }}>{s.label}</span>
              <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.status}</span>
            </div>
            <div className="risk-bar">
              <div style={{ height: '100%', width: `${s.val}%`, background: s.color, borderRadius: 2, transition: 'width 1s ease' }} />
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="card">
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 14 }}>AI Insights</div>
        {INSIGHTS.map((e, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < INSIGHTS.length - 1 ? 14 : 0, paddingBottom: i < INSIGHTS.length - 1 ? 14 : 0, borderBottom: i < INSIGHTS.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', marginTop: 5, background: e.type === 'ok' ? COLORS.green : e.type === 'warn' ? COLORS.amber : COLORS.blue, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.4 }}>{e.msg}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{e.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
