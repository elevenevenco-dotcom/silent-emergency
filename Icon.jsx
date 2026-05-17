'use client'

const PATHS = {
  home: (c) => <path d="M3 12L12 3L21 12V20A1 1 0 0120 21H15V16H9V21H4A1 1 0 013 20V12Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  shield: (c) => <>
    <path d="M12 2L3 7V13C3 18.25 7 21 12 21C17 21 21 18.25 21 13V7L12 2Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </>,
  map: (c) => <>
    <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3V18M15 6V21" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  users: (c) => <>
    <circle cx="9" cy="7" r="4" fill="none" stroke={c} strokeWidth="1.8"/>
    <path d="M3 21V19A4 4 0 017 15H11A4 4 0 0115 19V21" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 3.13A4 4 0 0116 11" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M21 21V19A4 4 0 0016 15" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  settings: (c) => <>
    <circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth="1.8"/>
    <path d="M19.4 15A1.65 1.65 0 0020 16.5 2 2 0 0117 19H7A2 2 0 014 16.5 1.65 1.65 0 004.6 15 2 2 0 012 12.5V11.5A2 2 0 014.6 9 1.65 1.65 0 004 7.5 2 2 0 017 5H17A2 2 0 0120 7.5 1.65 1.65 0 0019.4 9 2 2 0 0122 11.5V12.5A2 2 0 0119.4 15Z" fill="none" stroke={c} strokeWidth="1.8"/>
  </>,
  bell: (c) => <>
    <path d="M18 8A6 6 0 006 8C6 15 3 17 3 17H21S18 15 18 8Z" fill="none" stroke={c} strokeWidth="1.8"/>
    <path d="M13.73 21A2 2 0 0110.27 21" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  location: (c) => <>
    <path d="M12 22S4 16 4 10A8 8 0 0120 10C20 16 12 22 12 22Z" fill="none" stroke={c} strokeWidth="1.8"/>
    <circle cx="12" cy="10" r="3" fill="none" stroke={c} strokeWidth="1.8"/>
  </>,
  battery: (c) => <>
    <rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke={c} strokeWidth="1.8"/>
    <path d="M22 11V13" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <rect x="4" y="9" width="11" height="6" rx="1" fill={c} opacity="0.7"/>
  </>,
  phone: (c) => <path d="M22 16.92V19.92A2 2 0 0120.07 21.92 19.92 19.92 0 012.08 3.92 2 2 0 014.08 2H7.08A2 2 0 019.08 3.72 12.84 12.84 0 0010.6 7.07A2 2 0 019.99 9.49L8.09 11.39A16 16 0 0012.61 15.91L14.51 14.01A2 2 0 0116.93 13.4 12.84 12.84 0 0020.28 14.92 2 2 0 0122 16.92Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  plus: (c) => <>
    <line x1="12" y1="5" x2="12" y2="19" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  alert: (c) => <>
    <path d="M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
  </>,
  check: (c) => <polyline points="20 6 9 17 4 12" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  eye: (c) => <>
    <path d="M1 12S5 4 12 4 23 12 23 12 19 20 12 20 1 12 1 12Z" fill="none" stroke={c} strokeWidth="1.8"/>
    <circle cx="12" cy="12" r="3" fill="none" stroke={c} strokeWidth="1.8"/>
  </>,
  activity: (c) => <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  lock: (c) => <>
    <rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke={c} strokeWidth="1.8"/>
    <path d="M7 11V7A5 5 0 0117 7V11" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  star: (c) => <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  crown: (c) => <path d="M2 20H22M5 20L3 7L8.5 12L12 5L15.5 12L21 7L19 20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  wifi: (c) => <>
    <path d="M5 12.55A11 11 0 0114.08 9M1.42 9A16 16 0 0122.58 9M8.53 16.11A6 6 0 0115.47 16" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="20" x2="12.01" y2="20" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
  </>,
  mic: (c) => <>
    <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15 13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="none" stroke={c} strokeWidth="1.8"/>
    <path d="M19 10V12A7 7 0 015 12V10" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  camera: (c) => <>
    <path d="M23 19A2 2 0 0121 21H3A2 2 0 011 19V8A2 2 0 013 6H7L9 3H15L17 6H21A2 2 0 0123 8Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="4" fill="none" stroke={c} strokeWidth="1.8"/>
  </>,
  close: (c) => <>
    <line x1="18" y1="6" x2="6" y2="18" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  chevron: (c) => <polyline points="9 18 15 12 9 6" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  grid: (c) => <>
    <rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/>
    <rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/>
    <rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke={c} strokeWidth="1.8"/>
  </>,
  zap: (c) => <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  clock: (c) => <>
    <circle cx="12" cy="12" r="10" fill="none" stroke={c} strokeWidth="1.8"/>
    <polyline points="12 6 12 12 16 14" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
  globe: (c) => <>
    <circle cx="12" cy="12" r="10" fill="none" stroke={c} strokeWidth="1.8"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke={c} strokeWidth="1.8"/>
    <path d="M12 2A15.3 15.3 0 0116 12 15.3 15.3 0 0112 22 15.3 15.3 0 018 12 15.3 15.3 0 0112 2Z" fill="none" stroke={c} strokeWidth="1.8"/>
  </>,
  heart: (c) => <path d="M20.84 4.61A5.5 5.5 0 0012 8.5 5.5 5.5 0 003.16 4.61A5.5 5.5 0 002 9C2 13 12 22 12 22 12 22 22 13 22 9A5.5 5.5 0 0020.84 4.61Z" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  volume: (c) => <>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19.07 4.93A10 10 0 0119.07 19.07M15.54 8.46A5 5 0 0115.54 15.54" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
  </>,
}

export default function Icon({ name, size = 22, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {PATHS[name]?.(color) ?? null}
    </svg>
  )
}
