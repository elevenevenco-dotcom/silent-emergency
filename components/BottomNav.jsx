'use client'
import { COLORS } from './constants'
import Icon from './Icon'

const NAV = [
  { id: 'dashboard',  label: 'Home',     icon: 'home'     },
  { id: 'map',        label: 'Map',      icon: 'map'      },
  { id: 'emergency',  label: 'SOS',      icon: 'alert'    },
  { id: 'contacts',   label: 'Contacts', icon: 'users'    },
  { id: 'settings',   label: 'Settings', icon: 'settings' },
]

export default function BottomNav({ page, setPage }) {
  return (
    <nav style={{
      position:  'fixed',
      bottom:    0,
      left:      '50%',
      transform: 'translateX(-50%)',
      width:     '100%',
      maxWidth:  430,
      background:     'rgba(8,10,14,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${COLORS.border}`,
      display:   'flex',
      justifyContent: 'space-around',
      alignItems:     'center',
      padding:   '8px 0 env(safe-area-inset-bottom, 8px)',
      zIndex:    100,
    }}>
      {NAV.map(n => (
        <button
          key={n.id}
          className={`nav-tab${page === n.id ? ' active' : ''}`}
          onClick={() => setPage(n.id)}
          aria-label={n.label}>
          {n.id === 'emergency' ? (
            <div style={{
              width:  46,
              height: 46,
              borderRadius: '50%',
              background: COLORS.red,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 20px rgba(232,51,58,0.4)`,
              animation: 'pulse-dot 2s ease-in-out infinite',
              marginBottom: -2,
            }}>
              <Icon name="alert" size={22} color="white" />
            </div>
          ) : (
            <>
              <Icon name={n.icon} size={22} color={page === n.id ? COLORS.red : COLORS.textDim} />
              {n.label}
            </>
          )}
        </button>
      ))}
    </nav>
  )
}
