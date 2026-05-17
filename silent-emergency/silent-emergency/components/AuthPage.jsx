'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

export default function AuthPage({ onAuth }) {
  const [mode, setMode]       = useState('login')
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [name, setName]       = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!email || !pass) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onAuth() }, 1400)
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '40px 24px' }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
        <div style={{ width: 36, height: 36, background: COLORS.red, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="shield" size={20} color="white" />
        </div>
        <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, color: COLORS.text }}>Silent Emergency</span>
      </div>

      <h1 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, color: COLORS.text, marginBottom: 6 }}>
        {mode === 'login' ? 'Welcome back' : 'Create account'}
      </h1>
      <p style={{ color: COLORS.textMuted, fontSize: 15, marginBottom: 32 }}>
        {mode === 'login' ? 'Your guardian is ready when you are.' : 'Set up your safety network in minutes.'}
      </p>

      {/* Social */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {[{ label: 'Apple', icon: 'lock' }, { label: 'Google', icon: 'globe' }].map(s => (
          <button key={s.label} className="btn-ghost" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} onClick={handleSubmit}>
            <Icon name={s.icon} size={16} color={COLORS.textMuted} />
            {s.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: COLORS.border }} />
        <span style={{ fontSize: 12, color: COLORS.textDim }}>or continue with email</span>
        <div style={{ flex: 1, height: 1, background: COLORS.border }} />
      </div>

      {/* Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mode === 'signup' && (
          <input className="input-field" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKey} />
        )}
        <input className="input-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKey} />
        <input className="input-field" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={handleKey} />
        {mode === 'login' && (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 13, color: COLORS.red, cursor: 'pointer' }}>Forgot password?</span>
          </div>
        )}
        <button className="btn-red" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8, opacity: loading ? 0.8 : 1 }}>
          {loading && <div className="spinner" />}
          {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In Securely' : 'Create Account'}
        </button>
      </div>

      {/* Toggle */}
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <span style={{ fontSize: 14, color: COLORS.textMuted }}>
          {mode === 'login' ? 'New here? ' : 'Already have an account? '}
          <span style={{ color: COLORS.red, cursor: 'pointer', fontWeight: 600 }} onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Create account' : 'Sign in'}
          </span>
        </span>
      </div>

      {/* Security note */}
      <div style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Icon name="lock" size={14} color={COLORS.textDim} />
        <span style={{ fontSize: 12, color: COLORS.textDim }}>End-to-end encrypted · SOC 2 Certified</span>
      </div>
    </div>
  )
}
