export const COLORS = {
  bg: '#080A0E',
  bgCard: '#0F1117',
  bgCardHover: '#141720',
  border: '#1E2330',
  borderStrong: '#2A3045',
  red: '#E8333A',
  redGlow: 'rgba(232,51,58,0.15)',
  redDim: '#7A1A1E',
  text: '#F0F2F8',
  textMuted: '#6B7280',
  textDim: '#3D4555',
  green: '#22C55E',
  amber: '#F59E0B',
  blue: '#3B82F6',
  purple: '#8B5CF6',
}

export const CONTACTS = [
  { id: 1, name: 'Sarah Chen',      relation: 'Wife',    phone: '+1 (312) 555-0182', avatar: 'SC', color: '#8B5CF6', priority: 1, online: true  },
  { id: 2, name: 'Marcus Torres',   relation: 'Brother', phone: '+1 (415) 555-0237', avatar: 'MT', color: '#3B82F6', priority: 2, online: false },
  { id: 3, name: 'Dr. Aisha Patel', relation: 'Doctor',  phone: '+1 (773) 555-0098', avatar: 'AP', color: '#22C55E', priority: 3, online: true  },
  { id: 4, name: 'James Whitfield', relation: 'Friend',  phone: '+1 (312) 555-0341', avatar: 'JW', color: '#F59E0B', priority: 4, online: false },
]

export const HISTORY = [
  { id: 1, type: 'check-in', label: 'Safety Check-In',  time: '2h ago',          status: 'resolved', location: 'Home, Chicago IL'        },
  { id: 2, type: 'alert',    label: 'Inactivity Alert', time: 'Yesterday 11:42 PM', status: 'resolved', location: 'Downtown, Chicago IL'   },
  { id: 3, type: 'panic',    label: 'Panic Triggered',  time: '3 days ago',       status: 'resolved', location: 'Transit - Blue Line'      },
  { id: 4, type: 'check-in', label: 'Check-In Missed',  time: '1 week ago',       status: 'resolved', location: 'Office, Loop District'   },
]
