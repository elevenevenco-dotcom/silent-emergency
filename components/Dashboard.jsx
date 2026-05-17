'use client'
import { useState, useRef } from 'react'
import { COLORS, CONTACTS, HISTORY } from './constants'
import Icon from './Icon'

export default function Dashboard({ setPage }) {
  const [riskScore]        = useState(12)
  const [checkInActive, setCheckInActive] = useState(false)
  const [timeLeft, setTimeLeft]           = useState(null)
  const timerRef = useRef(null)

  const startCheckIn = (mins) => {
    setCheckInActive(true)
    setTimeLeft(mins * 60)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(timerRef.current); setCheckInActive(false); return null }
        return p - 1
      })
    }, 1000)
  }

  const cancelCheckIn = () => {
    clearInterval(timerRef.current)
    setCheckInActive(false)
    setTimeLeft(null)
  }

  const fmt = (s) => {
    if (!s) return '--:--'
    const m = Math.floor(s / 60), sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const quickStats = [
    { icon: 'battery',  label: 'Battery',  val: '84%',    color: COLORS.green  },
    { icon: 'location', label: 'GPS',       val: 'Active', color: COLORS.blue   },
    { icon: 'wifi',     label: 'Network',   val: 'Strong', color: COLORS.purple },
    { icon: 'activity', label: 'Movement',  val: 'Normal', color: COLORS.amber  },
  ]

  return (
    <div style={{ padding: '24px 20px', paddingBottom: 100 }} className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 2 }}>Good evening,</p>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 24, color: COLORS.text }}>Alex Rivera</h1>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: 'white' }}>A</div>
          <div style={{ width: 10, height: 10, background: COLORS.green, borderRadius: '50%', position: 'absolute', bottom: 0, right: 0, border: `2px solid ${COLORS.bg}` }} />
        </div>
      </div>

      {/* Status card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0D0508 0%, #0F1117 100%)', border: '1px solid rgba(232,51,58,0.25)', marginBottom: 16, borderRadius: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div className="badge badge-green" style={{ marginBottom: 6 }}>
              <span style={{ width: 5, height: 5, background: COLORS.green, borderRadius: '50%', display: 'inline-block', animation: 'blink 2s infinite' }} />
              PROTECTED
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Safety status · Active</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 32, color: COLORS.text }}>{riskScore}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>Risk Score</div>
          </div>
        </div>
        <div className="risk-bar">
          <div style={{ height: '100%', width: `${riskScore}%`, background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.amber})`, borderRadius: 2, transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        {quickStats.map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={s.icon} size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Check-in timer */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>Safety Check-In</div>
          {checkInActive && (
            <span className="badge badge-amber">
              <span style={{ animation: 'blink 1s infinite', display: 'inline-block', width: 6, height: 6, background: COLORS.amber, borderRadius: '50%' }} />
              ACTIVE
            </span>
          )}
        </div>
        {checkInActive ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 40, color: COLORS.red, marginBottom: 6 }}>{fmt(timeLeft)}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>Time until automatic alert</div>
            <button className="btn-red" onClick={cancelCheckIn}>✓ I&apos;m Safe — Check In Now</button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12 }}>Set a timer. If you don&apos;t check in, your contacts are notified automatically.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[30, 60, 120].map(m => (
                <button key={m} className="btn-ghost" style={{ flex: 1, padding: '10px 8px', fontSize: 13 }} onClick={() => startCheckIn(m)}>
                  {m < 60 ? `${m}m` : `${m / 60}h`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contacts preview */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>Trusted Contacts</div>
          <span style={{ fontSize: 13, color: COLORS.red, cursor: 'pointer' }} onClick={() => setPage('contacts')}>View all</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {CONTACTS.slice(0, 4).map((c, i) => (
            <div key={c.id} style={{ width: 38, height: 38, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', border: `2px solid ${COLORS.bgCard}`, marginLeft: i > 0 ? -10 : 0, position: 'relative', zIndex: 4 - i }}>
              {c.avatar}
              {c.online && <div style={{ width: 8, height: 8, background: COLORS.green, borderRadius: '50%', position: 'absolute', bottom: 0, right: 0, border: `1.5px solid ${COLORS.bgCard}` }} />}
            </div>
          ))}
          <div style={{ paddingLeft: 14 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{CONTACTS.length} contacts ready</span>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>Recent Activity</div>
        {HISTORY.slice(0, 3).map((h, i) => (
          <div key={h.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < 2 ? 14 : 0, marginBottom: i < 2 ? 14 : 0, borderBottom: i < 2 ? `1px solid ${COLORS.border}` : 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: h.type === 'panic' ? COLORS.redGlow : `${COLORS.blue}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={h.type === 'panic' ? 'alert' : h.type === 'alert' ? 'bell' : 'check'} size={16} color={h.type === 'panic' ? COLORS.red : h.type === 'alert' ? COLORS.amber : COLORS.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14, color: COLORS.text, marginBottom: 2 }}>{h.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim }}>{h.location}</div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textDim, flexShrink: 0 }}>{h.time}</div>
          </div>
        ))}
        <div style={{ fontSize: 13, color: COLORS.textDim, textAlign: 'center', marginTop: 14 }}>All clear · No active threats</div>
      </div>
    </div>
  )
}
