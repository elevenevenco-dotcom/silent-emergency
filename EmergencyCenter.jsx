'use client'
import { useState, useRef } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

function StealthMode({ onExit }) {
  return (
    <div style={{ background: '#1C1C1E', minHeight: 'calc(100vh - 70px)', padding: '20px', fontFamily: 'monospace' }} className="fade-in">
      <div style={{ textAlign: 'right', marginBottom: 20 }}>
        <span style={{ color: '#666', fontSize: 13 }}>Calculator</span>
      </div>
      <div style={{ background: '#2C2C2E', borderRadius: 16, padding: '20px 16px', marginBottom: 16 }}>
        <div style={{ textAlign: 'right', fontSize: 44, color: 'white', fontWeight: 200, letterSpacing: -1 }}>0</div>
      </div>
      {[['C', '+/-', '%', '÷'], ['7', '8', '9', '×'], ['4', '5', '6', '-'], ['1', '2', '3', '+'], ['0', '.', '=']].map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          {row.map(k => (
            <button key={k} onClick={() => k === '=' && onExit()}
              style={{
                flex: k === '0' ? 2 : 1,
                padding: '18px 0',
                borderRadius: 14,
                border: 'none',
                background: ['÷', '×', '-', '+', '='].includes(k) ? '#FF9F0A'
                  : ['C', '+/-', '%'].includes(k) ? '#636366'
                  : '#333',
                color: 'white',
                fontSize: 20,
                cursor: 'pointer',
                fontFamily: 'monospace',
              }}>
              {k}
            </button>
          ))}
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <span style={{ fontSize: 11, color: '#444' }}>Tap = to exit stealth mode</span>
      </div>
    </div>
  )
}

export default function EmergencyCenter() {
  const [phase, setPhase]         = useState('idle')   // idle | countdown | active
  const [countdown, setCountdown] = useState(null)
  const [recording, setRecording] = useState(false)
  const [stealth, setStealth]     = useState(false)
  const timerRef = useRef(null)

  const handlePanicPress = () => {
    if (phase !== 'idle') return
    setPhase('countdown')
    setCountdown(3)
    timerRef.current = setInterval(() => {
      setCountdown(p => {
        if (p <= 1) {
          clearInterval(timerRef.current)
          setPhase('active')
          setRecording(true)
          return null
        }
        return p - 1
      })
    }, 1000)
  }

  const cancel = () => {
    clearInterval(timerRef.current)
    setPhase('idle')
    setCountdown(null)
    setRecording(false)
  }

  if (stealth) return <StealthMode onExit={() => setStealth(false)} />

  return (
    <div style={{ padding: '24px 20px', paddingBottom: 100, textAlign: 'center' }} className="fade-in">
      <div style={{ textAlign: 'left', marginBottom: 28 }}>
        <h1 className="section-title">Emergency Center</h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted }}>Hold the panic button to trigger emergency protocol</p>
      </div>

      {/* Panic Button */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: 40 }}>
        {(phase === 'active' || phase === 'countdown') && (<>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 220, height: 220, borderRadius: '50%', border: `2px solid ${COLORS.red}`, opacity: 0.3, animation: 'pulse-ring 2s ease-out infinite', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180, borderRadius: '50%', border: `2px solid ${COLORS.red}`, opacity: 0.2, animation: 'pulse-ring 2s ease-out infinite 0.5s', pointerEvents: 'none' }} />
        </>)}
        <button
          onMouseDown={handlePanicPress}
          onTouchStart={handlePanicPress}
          style={{
            width: 160, height: 160, borderRadius: '50%',
            background: phase === 'active'
              ? `radial-gradient(circle at 40% 35%, #FF5558, ${COLORS.red})`
              : phase === 'countdown' ? COLORS.redDim
              : `radial-gradient(circle at 40% 35%, #C0282E, #8B1A1E)`,
            border: `4px solid ${phase === 'active' ? COLORS.red : COLORS.redDim}`,
            cursor: 'pointer',
            transition: 'all 0.3s',
            animation: phase === 'active' ? 'pulse-dot 1s ease-in-out infinite' : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: phase === 'active' ? `0 0 60px rgba(232,51,58,0.5)` : `0 0 30px rgba(232,51,58,0.15)`,
          }}>
          <Icon name="alert" size={36} color="white" />
          <span style={{ color: 'white', fontFamily: 'Syne', fontWeight: 700, fontSize: phase === 'countdown' ? 32 : 15, letterSpacing: phase === 'countdown' ? 0 : 0.5 }}>
            {phase === 'countdown' ? countdown : phase === 'active' ? 'ACTIVE' : 'SOS'}
          </span>
        </button>
      </div>

      {/* Active state */}
      {phase === 'active' && (
        <div className="card" style={{ background: 'rgba(232,51,58,0.08)', border: '1px solid rgba(232,51,58,0.3)', marginBottom: 20 }}>
          <div style={{ fontWeight: 600, color: COLORS.red, marginBottom: 12 }}>🚨 EMERGENCY ACTIVE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: 'location', label: 'Live location shared', ok: true   },
              { icon: 'mic',      label: 'Audio recording',       ok: recording },
              { icon: 'camera',   label: 'Camera recording',      ok: recording },
              { icon: 'bell',     label: 'All 4 contacts notified', ok: true },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.ok ? COLORS.green : COLORS.textDim, animation: s.ok ? 'blink 1.5s infinite' : 'none', flexShrink: 0 }} />
                <span style={{ color: s.ok ? COLORS.text : COLORS.textDim }}>{s.label}</span>
              </div>
            ))}
          </div>
          <button className="btn-ghost" style={{ marginTop: 16, borderColor: 'rgba(232,51,58,0.4)', color: COLORS.red }} onClick={cancel}>
            Cancel Emergency
          </button>
        </div>
      )}

      {/* Countdown cancel */}
      {phase === 'countdown' && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 12 }}>Activating in {countdown}s...</p>
          <button className="btn-ghost" onClick={cancel}>Cancel</button>
        </div>
      )}

      {/* Action grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left', marginBottom: 20 }}>
        {[
          { icon: 'volume',   label: 'Siren',         desc: 'Loud alarm',    color: COLORS.amber  },
          { icon: 'mic',      label: 'Record Audio',   desc: 'Save evidence', color: COLORS.blue   },
          { icon: 'location', label: 'Share Location', desc: 'Real-time GPS', color: COLORS.green  },
          { icon: 'camera',   label: 'Record Video',   desc: 'Front camera',  color: COLORS.purple },
        ].map(a => (
          <div key={a.label} className="card" style={{ cursor: 'pointer', padding: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Icon name={a.icon} size={18} color={a.color} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.text, marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{a.desc}</div>
          </div>
        ))}
      </div>

      {/* Stealth mode */}
      <div className="card" style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${COLORS.purple}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="eye" size={20} color={COLORS.purple} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>Stealth Mode</div>
            <div style={{ fontSize: 12, color: COLORS.textDim }}>Hidden emergency activation</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 14 }}>
          Displays a calculator. Volume buttons trigger SOS silently. Nobody can see you&apos;re calling for help.
        </p>
        <button className="btn-ghost" onClick={() => setStealth(true)} style={{ borderColor: `${COLORS.purple}40`, color: COLORS.purple }}>
          Activate Stealth Mode
        </button>
      </div>
    </div>
  )
}
