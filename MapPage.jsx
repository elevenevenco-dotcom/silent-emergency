'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

export default function MapPage() {
  const [tracking, setTracking] = useState(true)

  const nearbyContacts = [
    { name: 'Sarah Chen',      loc: '0.4 mi away · Home',   color: '#8B5CF6', online: true  },
    { name: 'Dr. Aisha Patel', loc: '1.2 mi away · Work',   color: '#22C55E', online: true  },
    { name: 'Marcus Torres',   loc: 'Last seen 2h ago',      color: '#3B82F6', online: false },
  ]

  return (
    <div style={{ paddingBottom: 100 }} className="fade-in">
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 className="section-title">Live Map</h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted }}>Real-time location & trusted contacts</p>
      </div>

      {/* SVG Map */}
      <div style={{ margin: '0 20px', borderRadius: 20, overflow: 'hidden', border: `1px solid ${COLORS.border}`, position: 'relative', height: 280 }}>
        <svg width="100%" height="280" viewBox="0 0 380 280" style={{ display: 'block' }}>
          <rect width="380" height="280" fill="#0A0D14" />
          {/* Grid */}
          {[40,80,120,160,200,240].map(y => <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="#1A2030" strokeWidth="1" />)}
          {[50,100,150,200,250,300,350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#1A2030" strokeWidth="1" />)}
          {/* Roads */}
          <line x1="0"   y1="140" x2="380" y2="140" stroke="#1E2840" strokeWidth="14" />
          <line x1="190" y1="0"   x2="190" y2="280" stroke="#1E2840" strokeWidth="14" />
          <line x1="0"   y1="80"  x2="380" y2="80"  stroke="#151E2C" strokeWidth="8" />
          <line x1="100" y1="0"   x2="100" y2="280" stroke="#151E2C" strokeWidth="8" />
          <line x1="290" y1="0"   x2="290" y2="280" stroke="#151E2C" strokeWidth="8" />
          <line x1="0"   y1="140" x2="380" y2="140" stroke="#253050" strokeWidth="1" strokeDasharray="12,10" />
          {/* Blocks */}
          {[[30,30,55,35],[160,30,55,35],[30,105,55,20],[270,30,85,35],[30,160,55,60],[160,160,55,60],[270,160,85,60],[30,240,55,30],[160,240,55,30],[270,240,85,30]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#0E1520" rx="3" />
          ))}
          {/* Safe zone */}
          <circle cx="190" cy="140" r="50" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.2)" strokeWidth="1" strokeDasharray="4,4" />
          {/* User dot */}
          <circle cx="190" cy="140" r="16" fill="rgba(232,51,58,0.15)" />
          <circle cx="190" cy="140" r="8"  fill={COLORS.red} />
          <circle cx="190" cy="140" r="4"  fill="white" />
          {/* Contact dots */}
          <circle cx="130" cy="100" r="6" fill="#8B5CF6" /><circle cx="130" cy="100" r="3" fill="white" />
          <circle cx="250" cy="170" r="6" fill="#22C55E" /><circle cx="250" cy="170" r="3" fill="white" />
          {/* Labels */}
          <text x="190" y="128" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans">You</text>
          <text x="130" y="92"  textAnchor="middle" fill="#8B5CF6" fontSize="8" fontFamily="DM Sans">Sarah</text>
          <text x="250" y="162" textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="DM Sans">Dr. Patel</text>
        </svg>

        {/* Map controls */}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['plus', 'activity'].map(ic => (
            <div key={ic} style={{ width: 36, height: 36, background: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icon name={ic} size={16} color={COLORS.textMuted} />
            </div>
          ))}
        </div>

        {/* Live badge */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span className="badge badge-red">
            <span style={{ width: 5, height: 5, background: COLORS.red, borderRadius: '50%', display: 'inline-block', animation: 'blink 1s infinite' }} />
            LIVE
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Current location */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="location" size={18} color={COLORS.green} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>Current Location</div>
                <div style={{ fontSize: 12, color: COLORS.textDim }}>Loop District, Chicago IL</div>
              </div>
            </div>
            <div
              onClick={() => setTracking(p => !p)}
              style={{ width: 44, height: 24, borderRadius: 12, background: tracking ? COLORS.green : COLORS.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
              <div style={{ width: 18, height: 18, background: 'white', borderRadius: '50%', position: 'absolute', top: 3, left: tracking ? 23 : 3, transition: 'left 0.2s' }} />
            </div>
          </div>
        </div>

        {/* Contacts nearby */}
        <div className="card">
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>Contacts Nearby</div>
          {nearbyContacts.map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                {c.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13, color: COLORS.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>{c.loc}</div>
              </div>
              <div style={{ width: 8, height: 8, background: c.online ? COLORS.green : COLORS.textDim, borderRadius: '50%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
