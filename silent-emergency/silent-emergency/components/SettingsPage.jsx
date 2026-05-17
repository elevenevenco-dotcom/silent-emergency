'use client'
import { useState } from 'react'
import { COLORS } from './constants'
import Icon from './Icon'

function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: on ? COLORS.red : COLORS.border, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, background: 'white', borderRadius: '50%', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s' }} />
    </div>
  )
}

function Section({ title, items, toggles, onToggle }) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
      {items.map((item, i) => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: i < items.length - 1 ? 14 : 0, marginBottom: i < items.length - 1 ? 14 : 0, borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={item.icon} size={18} color={item.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 14, color: COLORS.text }}>{item.label}</div>
            {item.desc && <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 1 }}>{item.desc}</div>}
          </div>
          {item.toggle && <Toggle on={toggles[item.toggle]} onToggle={() => onToggle(item.toggle)} />}
          {item.action && <Icon name="chevron" size={16} color={COLORS.textDim} />}
        </div>
      ))}
    </div>
  )
}

export default function SettingsPage({ setPage }) {
  const [toggles, setToggles] = useState({
    pushNotifications: true,
    checkInAlerts:     true,
    lowBattery:        true,
    gpsTracking:       true,
    stealthVolume:     false,
    aiMonitoring:      true,
    shareLocation:     true,
    autoRecord:        false,
  })

  const toggle = (key) => setToggles(p => ({ ...p, [key]: !p[key] }))

  const medicalInfo = [
    ['Blood Type', 'A+',                     'heart'],
    ['Allergies',  'Penicillin, Shellfish',  'alert'],
    ['Conditions', 'None reported',           'activity'],
    ['Notes',      'EpiPen in right jacket', 'lock'],
  ]

  return (
    <div style={{ padding: '24px 20px', paddingBottom: 100 }} className="fade-in">
      {/* Profile */}
      <div className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, border: '1px solid rgba(232,51,58,0.2)' }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'white' }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, color: COLORS.text }}>Alex Rivera</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>alex.rivera@email.com</div>
          <div className="badge badge-red" style={{ marginTop: 6, fontSize: 10 }}>Premium · Active</div>
        </div>
        <Icon name="chevron" size={18} color={COLORS.textDim} />
      </div>

      {/* Medical info */}
      <div className="card" style={{ marginBottom: 12, border: '1px solid rgba(232,51,58,0.15)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 14 }}>Emergency Medical Info</div>
        {medicalInfo.map(([l, v, ic]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon name={ic} size={14} color={COLORS.red} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 12, color: COLORS.textDim }}>{l}: </span>
              <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{v}</span>
            </div>
          </div>
        ))}
      </div>

      <Section
        title="Notifications"
        toggles={toggles}
        onToggle={toggle}
        items={[
          { icon: 'bell',     label: 'Push Notifications', toggle: 'pushNotifications', color: COLORS.blue  },
          { icon: 'clock',    label: 'Check-In Alerts',    toggle: 'checkInAlerts',     color: COLORS.amber },
          { icon: 'battery',  label: 'Low Battery Alerts', toggle: 'lowBattery',        color: COLORS.green },
        ]}
      />

      <Section
        title="Privacy & Safety"
        toggles={toggles}
        onToggle={toggle}
        items={[
          { icon: 'location', label: 'GPS Tracking',       toggle: 'gpsTracking',    color: COLORS.green,  desc: '' },
          { icon: 'eye',      label: 'Volume Button SOS',  toggle: 'stealthVolume',  color: COLORS.purple, desc: 'Stealth trigger' },
          { icon: 'zap',      label: 'AI Risk Monitoring', toggle: 'aiMonitoring',   color: COLORS.red,    desc: 'Premium feature' },
          { icon: 'mic',      label: 'Auto Record on Panic', toggle: 'autoRecord',   color: COLORS.blue    },
        ]}
      />

      <Section
        title="Account"
        toggles={toggles}
        onToggle={toggle}
        items={[
          { icon: 'star',   label: 'Upgrade to Premium',   action: true, color: COLORS.amber  },
          { icon: 'bell',   label: 'Emergency Message',    action: true, color: COLORS.blue,   desc: 'Customize alert text' },
          { icon: 'lock',   label: 'Privacy & Security',   action: true, color: COLORS.purple },
          { icon: 'heart',  label: 'Emergency History',    action: true, color: COLORS.red    },
        ]}
      />

      <button className="btn-ghost" style={{ color: COLORS.red, borderColor: 'rgba(232,51,58,0.3)' }}>
        Sign Out
      </button>
    </div>
  )
}
