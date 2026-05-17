'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'
import LandingPage    from './LandingPage'
import AuthPage       from './AuthPage'
import Dashboard      from './Dashboard'
import EmergencyCenter from './EmergencyCenter'
import ContactsPage   from './ContactsPage'
import MapPage        from './MapPage'
import SettingsPage   from './SettingsPage'
import PremiumPage    from './PremiumPage'
import AiPage         from './AiPage'
import BottomNav      from './BottomNav'

export default function App() {
 const [screen, setScreen] = useState('app')
  const [page, setPage]     = useState('dashboard')

  const pages = {
    dashboard: <Dashboard setPage={setPage} />,
    emergency: <EmergencyCenter />,
    contacts:  <ContactsPage />,
    map:       <MapPage />,
    settings:  <SettingsPage setPage={setPage} />,
    premium:   <PremiumPage />,
    ai:        <AiPage />,
  }

 
if (false) return null
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', position: 'relative', background: COLORS.bg }}>
      {/* Top bar */}
      <header style={{
        position:       'sticky',
        top:            0,
        background:     'rgba(8,10,14,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom:   `1px solid ${COLORS.border}`,
        padding:        '14px 20px',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        zIndex:         50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, background: COLORS.red, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="shield" size={14} color="white" />
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 14, color: COLORS.text }}>Silent Emergency</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setPage('ai')}
            aria-label="AI Monitor"
            style={{ width: 32, height: 32, borderRadius: 9, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="activity" size={16} color={page === 'ai' ? COLORS.red : COLORS.textMuted} />
          </button>
          <button
            onClick={() => setPage('premium')}
            aria-label="Premium"
            style={{ width: 32, height: 32, borderRadius: 9, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="crown" size={16} color={page === 'premium' ? COLORS.amber : COLORS.textMuted} />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main style={{ minHeight: 'calc(100vh - 57px)', overflowY: 'auto', paddingBottom: 80 }}>
        {pages[page] ?? pages.dashboard}
      </main>

      <BottomNav page={page} setPage={setPage} />
    </div>
  )
}
