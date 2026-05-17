'use client'
import { useState } from 'react'
import { COLORS, CONTACTS } from './constants'
import Icon from './Icon'

const PALETTE = ['#F59E0B', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899']

export default function ContactsPage() {
  const [list, setList]       = useState(CONTACTS)
  const [adding, setAdding]   = useState(false)
  const [newName, setNewName] = useState('')
  const [newRel, setNewRel]   = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addContact = () => {
    if (!newName.trim()) return
    setList(p => [...p, {
      id:       Date.now(),
      name:     newName,
      relation: newRel || 'Contact',
      phone:    newPhone,
      avatar:   newName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      color:    PALETTE[p.length % PALETTE.length],
      priority: p.length + 1,
      online:   false,
    }])
    setAdding(false)
    setNewName(''); setNewRel(''); setNewPhone('')
  }

  const removeContact = (id) => setList(p => p.filter(c => c.id !== id))

  return (
    <div style={{ padding: '24px 20px', paddingBottom: 100 }} className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Trusted Contacts</h1>
          <p style={{ fontSize: 14, color: COLORS.textMuted }}>{list.length}/10 contacts added</p>
        </div>
        {list.length < 10 && (
          <button onClick={() => setAdding(true)} style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.redGlow, border: '1px solid rgba(232,51,58,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="plus" size={18} color={COLORS.red} />
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <div className="card" style={{ marginBottom: 16, border: '1px solid rgba(232,51,58,0.3)' }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>Add Contact</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input className="input-field" placeholder="Full name *" value={newName} onChange={e => setNewName(e.target.value)} />
            <input className="input-field" placeholder="Relationship (e.g. Wife, Doctor)" value={newRel} onChange={e => setNewRel(e.target.value)} />
            <input className="input-field" placeholder="Phone number" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setAdding(false)}>Cancel</button>
              <button className="btn-red"   style={{ flex: 1 }} onClick={addContact}>Add Contact</button>
            </div>
          </div>
        </div>
      )}

      {/* Contact list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((c, i) => (
          <div key={c.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: 'white', flexShrink: 0, position: 'relative' }}>
              {c.avatar}
              <div style={{ width: 10, height: 10, background: c.online ? COLORS.green : COLORS.textDim, borderRadius: '50%', position: 'absolute', bottom: 0, right: 0, border: `2px solid ${COLORS.bgCard}` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>{c.name}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim }}>{c.relation} · Priority #{i + 1}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 2 }}>{c.phone}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span className="badge" style={{ background: c.online ? 'rgba(34,197,94,0.12)' : `${COLORS.textDim}15`, color: c.online ? COLORS.green : COLORS.textDim }}>
                {c.online ? 'Online' : 'Offline'}
              </span>
              <button onClick={() => removeContact(c.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 2 }}>
                <Icon name="close" size={14} color={COLORS.textDim} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: 'center', border: `1px dashed ${COLORS.border}`, background: 'transparent' }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>Contacts are notified in priority order during emergencies.</div>
      </div>
    </div>
  )
}
