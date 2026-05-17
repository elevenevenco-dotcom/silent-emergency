import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#080A0E",
  bgCard: "#0F1117",
  bgCardHover: "#141720",
  border: "#1E2330",
  borderStrong: "#2A3045",
  red: "#E8333A",
  redGlow: "rgba(232,51,58,0.15)",
  redDim: "#7A1A1E",
  text: "#F0F2F8",
  textMuted: "#6B7280",
  textDim: "#3D4555",
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#3B82F6",
  purple: "#8B5CF6",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); opacity: 1; }
    70% { transform: scale(1.15); opacity: 0; }
    100% { transform: scale(0.95); opacity: 0; }
  }
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.04); }
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes count-down {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: 283; }
  }
  .fade-in { animation: fade-in 0.4s ease forwards; }
  .slide-up { animation: slide-up 0.5s ease forwards; }
  .card {
    background: ${COLORS.bgCard};
    border: 1px solid ${COLORS.border};
    border-radius: 20px;
    padding: 20px;
    transition: all 0.2s ease;
  }
  .card:hover { border-color: ${COLORS.borderStrong}; }
  .btn-red {
    background: ${COLORS.red};
    color: white;
    border: none;
    border-radius: 14px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }
  .btn-red:hover { background: #FF3D44; transform: translateY(-1px); }
  .btn-red:active { transform: scale(0.98); }
  .btn-ghost {
    background: transparent;
    color: ${COLORS.textMuted};
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    padding: 14px 24px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 100%;
  }
  .btn-ghost:hover { border-color: ${COLORS.borderStrong}; color: ${COLORS.text}; background: ${COLORS.bgCardHover}; }
  .input-field {
    background: #0A0C12;
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    padding: 14px 16px;
    color: ${COLORS.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-field:focus { border-color: ${COLORS.red}; }
  .input-field::placeholder { color: ${COLORS.textDim}; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.4px;
  }
  .badge-red { background: rgba(232,51,58,0.15); color: ${COLORS.red}; }
  .badge-green { background: rgba(34,197,94,0.12); color: ${COLORS.green}; }
  .badge-amber { background: rgba(245,158,11,0.12); color: ${COLORS.amber}; }
  .badge-blue { background: rgba(59,130,246,0.12); color: ${COLORS.blue}; }
  .nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 8px 12px;
    cursor: pointer;
    color: ${COLORS.textDim};
    transition: color 0.2s;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.3px;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-tab.active { color: ${COLORS.red}; }
  .nav-tab svg { width: 22px; height: 22px; stroke-width: 1.8; }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 22px;
    color: ${COLORS.text};
    margin-bottom: 6px;
  }
  .toggle {
    width: 44px;
    height: 24px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
  }
  .toggle::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: transform 0.2s;
  }
  .toggle.on { background: ${COLORS.red}; }
  .toggle.on::after { transform: translateX(20px); }
  .toggle.off { background: ${COLORS.border}; }
  .risk-bar {
    height: 4px;
    border-radius: 2px;
    background: ${COLORS.border};
    overflow: hidden;
    margin-top: 6px;
  }
`;

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const paths = {
    home: <><path d="M3 12L12 3L21 12V20A1 1 0 0120 21H15V16H9V21H4A1 1 0 013 20V12Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    shield: <><path d="M12 2L3 7V13C3 18.25 7 21 12 21C17 21 21 18.25 21 13V7L12 2Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12L11 14L15 10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    map: <><path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3V18M15 6V21" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    users: <><circle cx="9" cy="7" r="4" fill="none" stroke={color} strokeWidth="1.8"/><path d="M3 21V19A4 4 0 017 15H11A4 4 0 0115 19V21" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M16 3.13A4 4 0 0116 11" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M21 21V19A4 4 0 0016 15" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    settings: <><circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="1.8"/><path d="M19.4 15A1.65 1.65 0 0020 16.5 2 2 0 0117 19H7A2 2 0 014 16.5 1.65 1.65 0 004.6 15 2 2 0 012 12.5V11.5A2 2 0 014.6 9 1.65 1.65 0 004 7.5 2 2 0 017 5H17A2 2 0 0120 7.5 1.65 1.65 0 0019.4 9 2 2 0 0122 11.5V12.5A2 2 0 0119.4 15Z" fill="none" stroke={color} strokeWidth="1.8"/></>,
    bell: <><path d="M18 8A6 6 0 006 8C6 15 3 17 3 17H21S18 15 18 8Z" fill="none" stroke={color} strokeWidth="1.8"/><path d="M13.73 21A2 2 0 0110.27 21" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    location: <><path d="M12 22S4 16 4 10A8 8 0 0120 10C20 16 12 22 12 22Z" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="10" r="3" fill="none" stroke={color} strokeWidth="1.8"/></>,
    battery: <><rect x="2" y="7" width="18" height="10" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><path d="M22 11V13" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><rect x="4" y="9" width="11" height="6" rx="1" fill={color} opacity="0.7"/></>,
    phone: <><path d="M22 16.92V19.92A2 2 0 0120.07 21.92 19.92 19.92 0 012.08 3.92 2 2 0 014.08 2H7.08A2 2 0 019.08 3.72 12.84 12.84 0 0010.6 7.07A2 2 0 019.99 9.49L8.09 11.39A16 16 0 0012.61 15.91L14.51 14.01A2 2 0 0116.93 13.4 12.84 12.84 0 0020.28 14.92 2 2 0 0122 16.92Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    alert: <><path d="M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    check: <><polyline points="20 6 9 17 4 12" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    eye: <><path d="M1 12S5 4 12 4 23 12 23 12 19 20 12 20 1 12 1 12Z" fill="none" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="12" r="3" fill="none" stroke={color} strokeWidth="1.8"/></>,
    activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke={color} strokeWidth="1.8"/><path d="M7 11V7A5 5 0 0117 7V11" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    crown: <><path d="M2 20H22M5 20L3 7L8.5 12L12 5L15.5 12L21 7L19 20" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    wifi: <><path d="M5 12.55A11 11 0 0114.08 9M1.42 9A16 16 0 0122.58 9M8.53 16.11A6 6 0 0115.47 16" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="20" x2="12.01" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></>,
    mic: <><path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15 13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="none" stroke={color} strokeWidth="1.8"/><path d="M19 10V12A7 7 0 015 12V10" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    camera: <><path d="M23 19A2 2 0 0121 21H3A2 2 0 011 19V8A2 2 0 013 6H7L9 3H15L17 6H21A2 2 0 0123 8Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" fill="none" stroke={color} strokeWidth="1.8"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    chevron: <><polyline points="9 18 15 12 9 6" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" fill="none" stroke={color} strokeWidth="1.8"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    clock: <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.8"/><polyline points="12 6 12 12 16 14" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
    globe: <><circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.8"/><line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.8"/><path d="M12 2A15.3 15.3 0 0116 12 15.3 15.3 0 0112 22 15.3 15.3 0 018 12 15.3 15.3 0 0112 2Z" fill="none" stroke={color} strokeWidth="1.8"/></>,
    heart: <><path d="M20.84 4.61A5.5 5.5 0 0012 8.5 5.5 5.5 0 003.16 4.61A5.5 5.5 0 002 9C2 13 12 22 12 22 12 22 22 13 22 9A5.5 5.5 0 0020.84 4.61Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></>,
    volume: <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.07 4.93A10 10 0 0119.07 19.07M15.54 8.46A5 5 0 0115.54 15.54" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {paths[name] || null}
    </svg>
  );
};

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const contacts = [
  { id: 1, name: "Sarah Chen", relation: "Wife", phone: "+1 (312) 555-0182", avatar: "SC", color: "#8B5CF6", priority: 1, online: true },
  { id: 2, name: "Marcus Torres", relation: "Brother", phone: "+1 (415) 555-0237", avatar: "MT", color: "#3B82F6", priority: 2, online: false },
  { id: 3, name: "Dr. Aisha Patel", relation: "Doctor", phone: "+1 (773) 555-0098", avatar: "AP", color: "#22C55E", priority: 3, online: true },
  { id: 4, name: "James Whitfield", relation: "Friend", phone: "+1 (312) 555-0341", avatar: "JW", color: "#F59E0B", priority: 4, online: false },
];

const historyData = [
  { id: 1, type: "check-in", label: "Safety Check-In", time: "2h ago", status: "resolved", location: "Home, Chicago IL" },
  { id: 2, type: "alert", label: "Inactivity Alert", time: "Yesterday 11:42 PM", status: "resolved", location: "Downtown, Chicago IL" },
  { id: 3, type: "panic", label: "Panic Triggered", time: "3 days ago", status: "resolved", location: "Transit - Blue Line" },
  { id: 4, type: "check-in", label: "Check-In Missed", time: "1 week ago", status: "resolved", location: "Office, Loop District" },
];

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onGetStarted }) {
  const [faqOpen, setFaqOpen] = useState(null);
  const faqs = [
    { q: "How does Silent Emergency protect me?", a: "Our AI monitors your activity, location, and device behavior in real-time. If anything unusual is detected, it silently alerts your trusted contacts with your exact location and status." },
    { q: "Can I use it without anyone knowing?", a: "Yes. Stealth mode lets you trigger an SOS using volume buttons or hidden gestures, displaying a decoy calculator screen to anyone watching." },
    { q: "What happens if I miss a check-in?", a: "Your trusted contacts receive an automatic alert with your last known location, battery level, and movement status. Escalations happen in priority order." },
    { q: "Is my data private?", a: "All location data is end-to-end encrypted. We never sell your data. Your information is only shared with your designated trusted contacts during an emergency." },
  ];
  const stats = [
    { n: "2.4M+", l: "Users Protected" },
    { n: "98.7%", l: "Alert Accuracy" },
    { n: "<8s", l: "Alert Speed" },
    { n: "156", l: "Countries Active" },
  ];
  const testimonials = [
    { name: "Priya S.", city: "New York", text: "Silent Emergency saved me when my phone died in an unfamiliar neighborhood. My husband was notified automatically.", stars: 5 },
    { name: "David M.", city: "London", text: "The stealth mode is incredible. I triggered an alert without my attacker knowing. Police arrived within minutes.", stars: 5 },
    { name: "Carmen L.", city: "São Paulo", text: "As a solo traveler, this gives me real peace of mind. My family always knows I'm safe.", stars: 5 },
  ];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", overflowX: "hidden" }}>
      {/* Nav */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: COLORS.red, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="shield" size={18} color="white" />
          </div>
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: COLORS.text }}>Silent Emergency</span>
        </div>
        <button className="btn-red" style={{ width: "auto", padding: "10px 20px", fontSize: 13 }} onClick={onGetStarted}>Get Started</button>
      </nav>

      {/* Hero */}
      <div style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div className="badge badge-red" style={{ marginBottom: 20, fontSize: 12 }}>
          <span style={{ width: 6, height: 6, background: COLORS.red, borderRadius: "50%", display: "inline-block", animation: "blink 1.5s infinite" }} />
          AI-Powered Safety · Active Now
        </div>
        <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 38, lineHeight: 1.1, color: COLORS.text, marginBottom: 20, letterSpacing: "-0.5px" }}>
          Your Silent Guardian<br /><span style={{ color: COLORS.red }}>When You Need It Most</span>
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 1.6, maxWidth: 320, margin: "0 auto 36px" }}>
          Smart emergency protection powered by real-time AI safety monitoring. Always watching. Never intrusive.
        </p>
        <button className="btn-red" style={{ maxWidth: 280, margin: "0 auto 12px" }} onClick={onGetStarted}>
          Start Free — No Card Required
        </button>
        <p style={{ color: COLORS.textDim, fontSize: 13 }}>Available on iOS & Android</p>

        {/* App Store Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          {["App Store", "Google Play"].map(s => (
            <div key={s} className="card" style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", borderRadius: 14, flex: 1, maxWidth: 150, justifyContent: "center" }}>
              <Icon name={s === "App Store" ? "lock" : "grid"} size={16} color={COLORS.textMuted} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 9, color: COLORS.textDim }}>Download on the</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 24px 40px" }}>
        {stats.map(s => (
          <div key={s.n} className="card" style={{ textAlign: "center", padding: "20px 12px" }}>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 26, color: COLORS.red }}>{s.n}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: "0 24px 40px" }}>
        <h2 className="section-title" style={{ marginBottom: 20, textAlign: "center" }}>Everything You Need</h2>
        {[
          { icon: "zap", title: "Instant Panic Button", desc: "One tap sends your location, starts recording, and alerts all trusted contacts simultaneously." },
          { icon: "eye", title: "AI Risk Detection", desc: "Machine learning monitors behavior patterns and flags anomalies before they become emergencies." },
          { icon: "lock", title: "Stealth Mode", desc: "Hidden triggers via volume buttons and gestures. Displays a decoy screen to anyone watching." },
          { icon: "clock", title: "Smart Check-Ins", desc: "Customizable timers automatically alert contacts if you fail to check in on time." },
          { icon: "location", title: "Live Location Sharing", desc: "Real-time GPS tracking with movement history shared securely with your trusted circle." },
          { icon: "mic", title: "Audio & Video Record", desc: "Emergency mode auto-records audio and front camera for evidence preservation." },
        ].map(f => (
          <div key={f.title} className="card" style={{ marginBottom: 12, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: COLORS.redGlow, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid rgba(232,51,58,0.2)` }}>
              <Icon name={f.icon} size={20} color={COLORS.red} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ padding: "0 24px 40px" }}>
        <h2 className="section-title" style={{ marginBottom: 20, textAlign: "center" }}>Real People. Real Safety.</h2>
        {testimonials.map(t => (
          <div key={t.name} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {[...Array(t.stars)].map((_, i) => <Icon key={i} name="star" size={14} color={COLORS.amber} />)}
            </div>
            <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>"{t.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.redGlow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: COLORS.red }}>{t.name[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{t.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>{t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ padding: "0 24px 40px" }}>
        <h2 className="section-title" style={{ marginBottom: 20, textAlign: "center" }}>Common Questions</h2>
        {faqs.map((f, i) => (
          <div key={i} className="card" style={{ marginBottom: 10, cursor: "pointer" }} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 500, fontSize: 14, color: COLORS.text, paddingRight: 12 }}>{f.q}</span>
              <div style={{ transform: faqOpen === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>
                <Icon name="chevron" size={18} color={COLORS.textMuted} />
              </div>
            </div>
            {faqOpen === i && <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, marginTop: 12, borderTop: `1px solid ${COLORS.border}`, paddingTop: 12 }}>{f.a}</p>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: "0 24px 60px", textAlign: "center" }}>
        <div className="card" style={{ background: "linear-gradient(135deg, #120508 0%, #0F1117 100%)", border: `1px solid rgba(232,51,58,0.3)`, borderRadius: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🛡️</div>
          <h2 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: COLORS.text, marginBottom: 8 }}>Start Protecting Yourself Today</h2>
          <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 24, lineHeight: 1.5 }}>Join 2.4 million people who trust Silent Emergency with their safety.</p>
          <button className="btn-red" onClick={onGetStarted}>Create Free Account</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, background: COLORS.red, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="shield" size={14} color="white" />
          </div>
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, color: COLORS.text }}>Silent Emergency</span>
        </div>
        <p style={{ fontSize: 12, color: COLORS.textDim }}>© 2025 Silent Emergency Inc. · Privacy Policy · Terms of Use</p>
      </div>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────
function AuthPage({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email || !pass) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onAuth(); }, 1400);
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", display: "flex", flexDirection: "column", padding: "40px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
        <div style={{ width: 36, height: 36, background: COLORS.red, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="shield" size={20} color="white" />
        </div>
        <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: COLORS.text }}>Silent Emergency</span>
      </div>

      <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: COLORS.text, marginBottom: 6 }}>
        {mode === "login" ? "Welcome back" : "Create account"}
      </h1>
      <p style={{ color: COLORS.textMuted, fontSize: 15, marginBottom: 32 }}>
        {mode === "login" ? "Your guardian is ready when you are." : "Set up your safety network in minutes."}
      </p>

      {/* Social */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {[{ label: "Apple", icon: "lock" }, { label: "Google", icon: "globe" }].map(s => (
          <button key={s.label} className="btn-ghost" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={handleSubmit}>
            <Icon name={s.icon} size={16} color={COLORS.textMuted} />
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: COLORS.border }} />
        <span style={{ fontSize: 12, color: COLORS.textDim }}>or continue with email</span>
        <div style={{ flex: 1, height: 1, background: COLORS.border }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {mode === "signup" && (
          <input className="input-field" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        )}
        <input className="input-field" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input-field" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
        {mode === "login" && (
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 13, color: COLORS.red, cursor: "pointer" }}>Forgot password?</span>
          </div>
        )}
        <button className="btn-red" onClick={handleSubmit} disabled={loading} style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> : null}
          {loading ? "Authenticating..." : mode === "login" ? "Sign In Securely" : "Create Account"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <span style={{ fontSize: 14, color: COLORS.textMuted }}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span style={{ color: COLORS.red, cursor: "pointer", fontWeight: 600 }} onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Create account" : "Sign in"}
          </span>
        </span>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <Icon name="lock" size={14} color={COLORS.textDim} />
        <span style={{ fontSize: 12, color: COLORS.textDim }}>End-to-end encrypted · SOC 2 Certified</span>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ setPage }) {
  const [riskScore] = useState(12);
  const [checkInActive, setCheckInActive] = useState(false);
  const [timerMin, setTimerMin] = useState(60);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  const startCheckIn = (mins) => {
    setTimerMin(mins);
    setCheckInActive(true);
    setTimeLeft(mins * 60);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(timerRef.current); setCheckInActive(false); return null; }
        return p - 1;
      });
    }, 1000);
  };

  const formatTime = s => {
    if (!s) return "--:--";
    const m = Math.floor(s / 60), sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }} className="fade-in">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 2 }}>Good evening,</p>
          <h1 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 24, color: COLORS.text }}>Alex Rivera</h1>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>A</div>
          <div style={{ width: 10, height: 10, background: COLORS.green, borderRadius: "50%", position: "absolute", bottom: 0, right: 0, border: `2px solid ${COLORS.bg}` }} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="card" style={{ background: "linear-gradient(135deg, #0D0508 0%, #0F1117 100%)", border: `1px solid rgba(232,51,58,0.25)`, marginBottom: 16, borderRadius: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div className="badge badge-green" style={{ marginBottom: 6 }}>
              <span style={{ width: 5, height: 5, background: COLORS.green, borderRadius: "50%", display: "inline-block", animation: "blink 2s infinite" }} />
              PROTECTED
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Safety status · Active</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 32, color: COLORS.text }}>{riskScore}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>Risk Score</div>
          </div>
        </div>
        <div className="risk-bar">
          <div style={{ height: "100%", width: `${riskScore}%`, background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.amber})`, borderRadius: 2, transition: "width 1s ease" }} />
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {[
          { icon: "battery", label: "Battery", val: "84%", color: COLORS.green },
          { icon: "location", label: "GPS", val: "Active", color: COLORS.blue },
          { icon: "wifi", label: "Network", val: "Strong", color: COLORS.purple },
          { icon: "activity", label: "Movement", val: "Normal", color: COLORS.amber },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={s.icon} size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Check-In Timer */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>Safety Check-In</div>
          {checkInActive && <span className="badge badge-amber"><span style={{ animation: "blink 1s infinite", display: "inline-block", width: 6, height: 6, background: COLORS.amber, borderRadius: "50%" }} />ACTIVE</span>}
        </div>
        {checkInActive ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 40, color: COLORS.red, marginBottom: 6 }}>{formatTime(timeLeft)}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>Time until automatic alert</div>
            <button className="btn-red" onClick={() => { clearInterval(timerRef.current); setCheckInActive(false); setTimeLeft(null); }}>
              ✓ I'm Safe — Check In Now
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12 }}>Set a timer. If you don't check in, your contacts are notified automatically.</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[30, 60, 120].map(m => (
                <button key={m} className="btn-ghost" style={{ flex: 1, padding: "10px 8px", fontSize: 13 }} onClick={() => startCheckIn(m)}>
                  {m < 60 ? `${m}m` : `${m / 60}h`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trusted Contacts Preview */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>Trusted Contacts</div>
          <span style={{ fontSize: 13, color: COLORS.red, cursor: "pointer" }} onClick={() => setPage("contacts")}>View all</span>
        </div>
        <div style={{ display: "flex", gap: -8 }}>
          {contacts.slice(0, 4).map((c, i) => (
            <div key={c.id} style={{ width: 38, height: 38, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", border: `2px solid ${COLORS.bgCard}`, marginLeft: i > 0 ? -10 : 0, position: "relative", zIndex: 4 - i }}>
              {c.avatar}
              {c.online && <div style={{ width: 8, height: 8, background: COLORS.green, borderRadius: "50%", position: "absolute", bottom: 0, right: 0, border: `1.5px solid ${COLORS.bgCard}` }} />}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", paddingLeft: 14 }}>
            <span style={{ fontSize: 13, color: COLORS.textMuted }}>{contacts.length} contacts ready</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>Recent Activity</div>
        {historyData.slice(0, 3).map(h => (
          <div key={h.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: h.type === "panic" ? COLORS.redGlow : `${COLORS.blue}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={h.type === "panic" ? "alert" : h.type === "alert" ? "bell" : "check"} size={16} color={h.type === "panic" ? COLORS.red : h.type === "alert" ? COLORS.amber : COLORS.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14, color: COLORS.text, marginBottom: 2 }}>{h.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim }}>{h.location}</div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textDim, flexShrink: 0 }}>{h.time}</div>
          </div>
        ))}
        <div style={{ fontSize: 13, color: COLORS.textDim, textAlign: "center" }}>All clear · No active threats</div>
      </div>
    </div>
  );
}

// ─── Emergency Center ─────────────────────────────────────────────────────────
function EmergencyCenter() {
  const [panicActive, setPanicActive] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | countdown | active
  const [recording, setRecording] = useState(false);
  const [stealthMode, setStealthMode] = useState(false);
  const timerRef = useRef(null);

  const handlePanicPress = () => {
    if (phase === "idle") {
      setPhase("countdown");
      setCountdown(3);
      timerRef.current = setInterval(() => {
        setCountdown(p => {
          if (p <= 1) {
            clearInterval(timerRef.current);
            setPhase("active");
            setPanicActive(true);
            setRecording(true);
            return null;
          }
          return p - 1;
        });
      }, 1000);
    }
  };

  const cancelEmergency = () => {
    clearInterval(timerRef.current);
    setPanicActive(false);
    setCountdown(null);
    setPhase("idle");
    setRecording(false);
  };

  if (stealthMode) {
    return (
      <div style={{ background: "#1C1C1E", minHeight: "calc(100vh - 70px)", padding: "20px", fontFamily: "monospace" }} className="fade-in">
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <span style={{ color: "#666", fontSize: 13 }}>Calculator</span>
        </div>
        <div style={{ background: "#2C2C2E", borderRadius: 16, padding: "20px 16px", marginBottom: 16 }}>
          <div style={{ textAlign: "right", fontSize: 44, color: "white", fontWeight: 200, letterSpacing: -1 }}>0</div>
        </div>
        {[["C", "+/-", "%", "÷"], ["7", "8", "9", "×"], ["4", "5", "6", "-"], ["1", "2", "3", "+"], ["0", ".", "="]].map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            {row.map(k => (
              <button key={k} onClick={() => { if (k === "=") setStealthMode(false); }}
                style={{ flex: k === "0" ? 2 : 1, padding: "18px 0", borderRadius: 14, border: "none", background: ["÷", "×", "-", "+", "="].includes(k) ? "#FF9F0A" : ["C", "+/-", "%"].includes(k) ? "#636366" : "#333", color: "white", fontSize: 20, cursor: "pointer", fontFamily: "monospace" }}>
                {k}
              </button>
            ))}
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontSize: 11, color: "#444" }}>Tap = to exit stealth mode</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100, textAlign: "center" }} className="fade-in">
      <div style={{ textAlign: "left", marginBottom: 28 }}>
        <h1 className="section-title">Emergency Center</h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted }}>Hold the panic button to trigger emergency protocol</p>
      </div>

      {/* Main Panic Button */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: 40 }}>
        {(phase === "active" || phase === "countdown") && (
          <>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 220, height: 220, borderRadius: "50%", border: `2px solid ${COLORS.red}`, opacity: 0.3, animation: "pulse-ring 2s ease-out infinite" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 180, height: 180, borderRadius: "50%", border: `2px solid ${COLORS.red}`, opacity: 0.2, animation: "pulse-ring 2s ease-out infinite 0.5s" }} />
          </>
        )}
        <button
          onMouseDown={handlePanicPress}
          onTouchStart={handlePanicPress}
          style={{
            width: 160, height: 160, borderRadius: "50%",
            background: phase === "active" ? `radial-gradient(circle at 40% 35%, #FF5558, ${COLORS.red})` : phase === "countdown" ? COLORS.redDim : `radial-gradient(circle at 40% 35%, #C0282E, #8B1A1E)`,
            border: `4px solid ${phase === "active" ? COLORS.red : COLORS.redDim}`,
            cursor: "pointer", transition: "all 0.3s",
            animation: phase === "active" ? "pulse-dot 1s ease-in-out infinite" : "none",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: phase === "active" ? `0 0 60px rgba(232,51,58,0.5)` : `0 0 30px rgba(232,51,58,0.15)`,
          }}>
          <Icon name="alert" size={36} color="white" />
          <span style={{ color: "white", fontFamily: "Syne", fontWeight: 700, fontSize: phase === "countdown" ? 32 : 15, letterSpacing: phase === "countdown" ? 0 : 0.5 }}>
            {phase === "countdown" ? countdown : phase === "active" ? "ACTIVE" : "SOS"}
          </span>
        </button>
      </div>

      {phase === "active" && (
        <div className="card" style={{ background: "rgba(232,51,58,0.08)", border: `1px solid rgba(232,51,58,0.3)`, marginBottom: 20, animation: "fade-in 0.4s ease" }}>
          <div style={{ fontWeight: 600, color: COLORS.red, marginBottom: 12 }}>🚨 EMERGENCY ACTIVE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "location", label: "Live location shared", ok: true },
              { icon: "mic", label: "Audio recording", ok: recording },
              { icon: "camera", label: "Camera recording", ok: recording },
              { icon: "bell", label: "All 4 contacts notified", ok: true },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.ok ? COLORS.green : COLORS.textDim, animation: s.ok ? "blink 1.5s infinite" : "none" }} />
                <span style={{ color: s.ok ? COLORS.text : COLORS.textDim }}>{s.label}</span>
              </div>
            ))}
          </div>
          <button className="btn-ghost" style={{ marginTop: 16, borderColor: "rgba(232,51,58,0.4)", color: COLORS.red }} onClick={cancelEmergency}>
            Cancel Emergency
          </button>
        </div>
      )}

      {phase === "countdown" && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 12 }}>Activating in {countdown}s...</p>
          <button className="btn-ghost" onClick={cancelEmergency}>Cancel</button>
        </div>
      )}

      {/* Action Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, textAlign: "left", marginBottom: 20 }}>
        {[
          { icon: "volume", label: "Siren", desc: "Loud alarm", color: COLORS.amber },
          { icon: "mic", label: "Record Audio", desc: "Save evidence", color: COLORS.blue },
          { icon: "location", label: "Share Location", desc: "Real-time GPS", color: COLORS.green },
          { icon: "camera", label: "Record Video", desc: "Front camera", color: COLORS.purple },
        ].map(a => (
          <div key={a.label} className="card" style={{ cursor: "pointer", padding: "16px" }} onClick={() => {}}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Icon name={a.icon} size={18} color={a.color} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.text, marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{a.desc}</div>
          </div>
        ))}
      </div>

      {/* Stealth Mode */}
      <div className="card" style={{ textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${COLORS.purple}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="eye" size={20} color={COLORS.purple} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>Stealth Mode</div>
            <div style={{ fontSize: 12, color: COLORS.textDim }}>Hidden emergency activation</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 14 }}>
          Displays a calculator. Use volume buttons to trigger SOS. Nobody can see you're calling for help.
        </p>
        <button className="btn-ghost" onClick={() => setStealthMode(true)} style={{ borderColor: `${COLORS.purple}40`, color: COLORS.purple }}>
          Activate Stealth Mode
        </button>
      </div>
    </div>
  );
}

// ─── Contacts Page ────────────────────────────────────────────────────────────
function ContactsPage() {
  const [list, setList] = useState(contacts);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRel, setNewRel] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addContact = () => {
    if (!newName) return;
    const colors = ["#F59E0B", "#22C55E", "#3B82F6", "#8B5CF6", "#EC4899"];
    setList(p => [...p, { id: Date.now(), name: newName, relation: newRel || "Contact", phone: newPhone, avatar: newName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), color: colors[p.length % colors.length], priority: p.length + 1, online: false }]);
    setAdding(false); setNewName(""); setNewRel(""); setNewPhone("");
  };

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }} className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Trusted Contacts</h1>
          <p style={{ fontSize: 14, color: COLORS.textMuted }}>{list.length}/10 contacts added</p>
        </div>
        {list.length < 10 && (
          <button onClick={() => setAdding(true)} style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.redGlow, border: `1px solid rgba(232,51,58,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="plus" size={18} color={COLORS.red} />
          </button>
        )}
      </div>

      {adding && (
        <div className="card" style={{ marginBottom: 16, border: `1px solid rgba(232,51,58,0.3)` }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>Add Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <input className="input-field" placeholder="Full name *" value={newName} onChange={e => setNewName(e.target.value)} />
            <input className="input-field" placeholder="Relationship (e.g. Wife, Doctor)" value={newRel} onChange={e => setNewRel(e.target.value)} />
            <input className="input-field" placeholder="Phone number" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setAdding(false)}>Cancel</button>
              <button className="btn-red" style={{ flex: 1 }} onClick={addContact}>Add Contact</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {list.map((c, i) => (
          <div key={c.id} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "white", flexShrink: 0, position: "relative" }}>
              {c.avatar}
              <div style={{ width: 10, height: 10, background: c.online ? COLORS.green : COLORS.textDim, borderRadius: "50%", position: "absolute", bottom: 0, right: 0, border: `2px solid ${COLORS.bgCard}` }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text }}>{c.name}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim }}>{c.relation} · Priority #{i + 1}</div>
            </div>
            <div style={{ display: "flex", flex: "column", gap: 6, alignItems: "flex-end" }}>
              <span className={`badge ${c.online ? "badge-green" : ""}`} style={!c.online ? { background: `${COLORS.textDim}15`, color: COLORS.textDim } : {}}>{c.online ? "Online" : "Offline"}</span>
              <div style={{ fontSize: 12, color: COLORS.textDim, marginTop: 4 }}>{c.phone}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center", border: `1px dashed ${COLORS.border}`, background: "transparent" }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>Contacts are notified in priority order during emergencies. Drag to reorder.</div>
      </div>
    </div>
  );
}

// ─── Map Page ─────────────────────────────────────────────────────────────────
function MapPage() {
  const [tracking, setTracking] = useState(true);

  return (
    <div style={{ paddingBottom: 100 }} className="fade-in">
      <div style={{ padding: "24px 20px 16px" }}>
        <h1 className="section-title">Live Map</h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted }}>Real-time location & trusted contacts</p>
      </div>

      {/* Simulated Map */}
      <div style={{ margin: "0 20px", borderRadius: 20, overflow: "hidden", border: `1px solid ${COLORS.border}`, position: "relative", height: 280 }}>
        <svg width="100%" height="280" viewBox="0 0 380 280" style={{ display: "block" }}>
          <rect width="380" height="280" fill="#0A0D14" />
          {/* Grid lines */}
          {[40, 80, 120, 160, 200, 240].map(y => <line key={y} x1="0" y1={y} x2="380" y2={y} stroke="#1A2030" strokeWidth="1" />)}
          {[50, 100, 150, 200, 250, 300, 350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#1A2030" strokeWidth="1" />)}
          {/* Roads */}
          <line x1="0" y1="140" x2="380" y2="140" stroke="#1E2840" strokeWidth="14" />
          <line x1="190" y1="0" x2="190" y2="280" stroke="#1E2840" strokeWidth="14" />
          <line x1="0" y1="80" x2="380" y2="80" stroke="#151E2C" strokeWidth="8" />
          <line x1="100" y1="0" x2="100" y2="280" stroke="#151E2C" strokeWidth="8" />
          <line x1="290" y1="0" x2="290" y2="280" stroke="#151E2C" strokeWidth="8" />
          {/* Road lines */}
          <line x1="0" y1="140" x2="380" y2="140" stroke="#253050" strokeWidth="1" strokeDasharray="12,10" />
          {/* Blocks */}
          {[[30,30,55,35],[160,30,55,35],[30,105,55,20],[270,30,85,35],[30,160,55,60],[160,160,55,60],[270,160,85,60],[30,240,55,30],[160,240,55,30],[270,240,85,30]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#0E1520" rx="3" />
          ))}
          {/* Safe zone circle */}
          <circle cx="190" cy="140" r="50" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.2)" strokeWidth="1" strokeDasharray="4,4" />
          {/* User location */}
          <circle cx="190" cy="140" r="16" fill="rgba(232,51,58,0.15)" />
          <circle cx="190" cy="140" r="8" fill={COLORS.red} />
          <circle cx="190" cy="140" r="4" fill="white" />
          {/* Contact dots */}
          <circle cx="130" cy="100" r="6" fill="#8B5CF6" />
          <circle cx="130" cy="100" r="3" fill="white" />
          <circle cx="250" cy="170" r="6" fill="#22C55E" />
          <circle cx="250" cy="170" r="3" fill="white" />
          {/* Labels */}
          <text x="190" y="128" textAnchor="middle" fill="white" fontSize="9" fontFamily="DM Sans">You</text>
          <text x="130" y="92" textAnchor="middle" fill="#8B5CF6" fontSize="8" fontFamily="DM Sans">Sarah</text>
          <text x="250" y="162" textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="DM Sans">Dr. Patel</text>
        </svg>

        {/* Overlay controls */}
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {["plus", "activity"].map(ic => (
            <div key={ic} style={{ width: 36, height: 36, background: COLORS.bgCard, borderRadius: 10, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name={ic} size={16} color={COLORS.textMuted} />
            </div>
          ))}
        </div>

        {/* Live badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span className="badge badge-red">
            <span style={{ width: 5, height: 5, background: COLORS.red, borderRadius: "50%", display: "inline-block", animation: "blink 1s infinite" }} />
            LIVE
          </span>
        </div>
      </div>

      {/* Info cards */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="location" size={18} color={COLORS.green} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>Current Location</div>
                <div style={{ fontSize: 12, color: COLORS.textDim }}>Loop District, Chicago IL</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, background: tracking ? COLORS.green : COLORS.textDim, borderRadius: "50%", animation: tracking ? "blink 2s infinite" : "none" }} />
              <button className="toggle" style={{ width: 44, height: 24 }} onClick={() => setTracking(p => !p)}>
                <div style={{ width: 44, height: 24, borderRadius: 12, background: tracking ? COLORS.green : COLORS.border, position: "relative", cursor: "pointer" }}>
                  <div style={{ width: 18, height: 18, background: "white", borderRadius: "50%", position: "absolute", top: 3, left: tracking ? 23 : 3, transition: "left 0.2s" }} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Contact locations */}
        <div className="card">
          <div style={{ fontWeight: 600, fontSize: 15, color: COLORS.text, marginBottom: 14 }}>Contacts Nearby</div>
          {[
            { name: "Sarah Chen", loc: "0.4 mi away · Home", color: "#8B5CF6", online: true },
            { name: "Dr. Aisha Patel", loc: "1.2 mi away · Work", color: "#22C55E", online: true },
            { name: "Marcus Torres", loc: "Last seen 2h ago", color: "#3B82F6", online: false },
          ].map(c => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>{c.name.split(" ").map(w => w[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 13, color: COLORS.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>{c.loc}</div>
              </div>
              <div style={{ width: 8, height: 8, background: c.online ? COLORS.green : COLORS.textDim, borderRadius: "50%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage({ setPage }) {
  const [toggles, setToggles] = useState({
    pushNotifications: true, checkInAlerts: true, lowBattery: true,
    gpsTracking: true, stealthVolume: false, aiMonitoring: true,
    shareLocation: true, autoRecord: false,
  });

  const T = ({ id }) => (
    <div onClick={() => setToggles(p => ({ ...p, [id]: !p[id] }))}
      style={{ width: 44, height: 24, borderRadius: 12, background: toggles[id] ? COLORS.red : COLORS.border, position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, background: "white", borderRadius: "50%", position: "absolute", top: 3, left: toggles[id] ? 23 : 3, transition: "left 0.2s" }} />
    </div>
  );

  const Section = ({ title, items }) => (
    <div className="card" style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>{title}</div>
      {items.map((item, i) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: i < items.length - 1 ? 14 : 0, marginBottom: i < items.length - 1 ? 14 : 0, borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={item.icon} size={18} color={item.color} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500, fontSize: 14, color: COLORS.text }}>{item.label}</div>
            {item.desc && <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 1 }}>{item.desc}</div>}
          </div>
          {item.toggle && <T id={item.toggle} />}
          {item.action && <div style={{ cursor: "pointer" }}><Icon name="chevron" size={16} color={COLORS.textDim} /></div>}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }} className="fade-in">
      {/* Profile Card */}
      <div className="card" style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20, border: `1px solid rgba(232,51,58,0.2)` }}>
        <div style={{ width: 54, height: 54, borderRadius: "50%", background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, color: COLORS.text }}>Alex Rivera</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>alex.rivera@email.com</div>
          <div className="badge badge-red" style={{ marginTop: 6, fontSize: 10 }}>Premium · Active</div>
        </div>
        <Icon name="chevron" size={18} color={COLORS.textDim} />
      </div>

      {/* Medical Info */}
      <div className="card" style={{ marginBottom: 12, border: `1px solid rgba(232,51,58,0.15)` }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>Emergency Medical Info</div>
        {[["Blood Type", "A+", "heart"], ["Allergies", "Penicillin, Shellfish", "alert"], ["Conditions", "None reported", "activity"], ["Notes", "EpiPen in right jacket pocket", "lock"]].map(([l, v, ic]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Icon name={ic} size={14} color={COLORS.red} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 12, color: COLORS.textDim }}>{l}: </span>
              <span style={{ fontSize: 13, color: COLORS.text, fontWeight: 500 }}>{v}</span>
            </div>
          </div>
        ))}
      </div>

      <Section title="Notifications" items={[
        { icon: "bell", label: "Push Notifications", toggle: "pushNotifications", color: COLORS.blue },
        { icon: "clock", label: "Check-In Alerts", toggle: "checkInAlerts", color: COLORS.amber },
        { icon: "battery", label: "Low Battery Alerts", toggle: "lowBattery", color: COLORS.green },
      ]} />

      <Section title="Privacy & Safety" items={[
        { icon: "location", label: "GPS Tracking", toggle: "gpsTracking", color: COLORS.green },
        { icon: "eye", label: "Volume Button SOS", toggle: "stealthVolume", color: COLORS.purple, desc: "Stealth trigger" },
        { icon: "zap", label: "AI Risk Monitoring", toggle: "aiMonitoring", color: COLORS.red, desc: "Premium feature" },
        { icon: "mic", label: "Auto Record on Panic", toggle: "autoRecord", color: COLORS.blue },
      ]} />

      <Section title="Account" items={[
        { icon: "star", label: "Upgrade to Premium", action: true, color: COLORS.amber },
        { icon: "bell", label: "Emergency Message", action: true, color: COLORS.blue, desc: "Customize alert text" },
        { icon: "lock", label: "Privacy & Security", action: true, color: COLORS.purple },
        { icon: "heart", label: "Emergency History", action: true, color: COLORS.red },
      ]} />

      <button className="btn-ghost" style={{ color: COLORS.red, borderColor: "rgba(232,51,58,0.3)" }}>Sign Out</button>
    </div>
  );
}

// ─── Premium Page ─────────────────────────────────────────────────────────────
function PremiumPage() {
  const [plan, setPlan] = useState("annual");
  const features = [
    { icon: "users", label: "Unlimited Contacts", desc: "Add up to 20 trusted contacts", free: "Up to 5" },
    { icon: "zap", label: "AI Risk Monitoring", desc: "Continuous behavior analysis", free: false },
    { icon: "location", label: "Advanced Tracking", desc: "Movement history & heatmaps", free: "Basic only" },
    { icon: "mic", label: "Cloud Storage", desc: "30 days of recordings", free: false },
    { icon: "bell", label: "Priority Alerts", desc: "Faster notification delivery", free: false },
    { icon: "activity", label: "Incident Reports", desc: "Detailed AI-generated reports", free: false },
  ];

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }} className="fade-in">
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg, #F59E0B30, #F59E0B15)", border: `1px solid rgba(245,158,11,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <Icon name="crown" size={28} color={COLORS.amber} />
        </div>
        <h1 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, color: COLORS.text, marginBottom: 8 }}>Go Premium</h1>
        <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.5 }}>Complete protection for you and your loved ones</p>
      </div>

      {/* Plan Toggle */}
      <div style={{ display: "flex", background: COLORS.bgCard, borderRadius: 14, padding: 4, marginBottom: 24, border: `1px solid ${COLORS.border}` }}>
        {["monthly", "annual"].map(p => (
          <button key={p} onClick={() => setPlan(p)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: plan === p ? COLORS.bg : "transparent", color: plan === p ? COLORS.text : COLORS.textMuted, fontFamily: "DM Sans", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
            {p === "annual" ? "Annual" : "Monthly"}
            {p === "annual" && <span style={{ position: "absolute", top: -8, right: 4, background: COLORS.green, color: "white", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 700 }}>-40%</span>}
          </button>
        ))}
      </div>

      {/* Price Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 6 }}>Free</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: COLORS.text }}>$0</div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>forever</div>
        </div>
        <div className="card" style={{ textAlign: "center", border: `1px solid rgba(245,158,11,0.4)`, background: "linear-gradient(135deg, #0D0B05, #0F1117)" }}>
          <div style={{ fontSize: 12, color: COLORS.amber, marginBottom: 6, fontWeight: 600 }}>Premium</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, color: COLORS.text }}>{plan === "annual" ? "$5" : "$8"}</div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>per month</div>
        </div>
      </div>

      {/* Features */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>What's included</div>
        {features.map(f => (
          <div key={f.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `${COLORS.amber}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={f.icon} size={16} color={COLORS.amber} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.text }}>{f.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim }}>{f.desc}</div>
            </div>
            <div style={{ flexShrink: 0 }}>
              {f.free === false ? (
                <span className="badge badge-amber" style={{ fontSize: 10 }}>PRO</span>
              ) : (
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{f.free}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="btn-red" style={{ background: "linear-gradient(135deg, #F59E0B, #E8333A)", marginBottom: 12 }}>
        Start 7-Day Free Trial
      </button>
      <p style={{ textAlign: "center", fontSize: 12, color: COLORS.textDim }}>Cancel anytime. No commitments.</p>
    </div>
  );
}

// ─── AI Risk Center ───────────────────────────────────────────────────────────
function AiPage() {
  const [riskScore] = useState(12);
  const risk = riskScore < 30 ? "low" : riskScore < 60 ? "medium" : "high";
  const riskColor = { low: COLORS.green, medium: COLORS.amber, high: COLORS.red }[risk];

  return (
    <div style={{ padding: "24px 20px", paddingBottom: 100 }} className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h1 className="section-title">AI Risk Monitor</h1>
        <p style={{ fontSize: 14, color: COLORS.textMuted }}>Real-time behavior analysis & threat detection</p>
      </div>

      {/* Risk Score */}
      <div className="card" style={{ textAlign: "center", padding: "32px 20px", marginBottom: 16, border: `1px solid ${riskColor}25` }}>
        <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 20px" }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke={COLORS.border} strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke={riskColor} strokeWidth="8" strokeDasharray="327" strokeDashoffset={327 - (327 * riskScore / 100)} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: "stroke-dashoffset 1s ease" }} />
          </svg>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
            <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 30, color: COLORS.text }}>{riskScore}</div>
            <div style={{ fontSize: 10, color: COLORS.textDim }}>RISK</div>
          </div>
        </div>
        <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: riskColor, textTransform: "uppercase", marginBottom: 6 }}>{risk} risk</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>Normal activity patterns detected. All systems nominal.</div>
      </div>

      {/* Signals */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>Monitored Signals</div>
        {[
          { label: "Phone Movement", val: 85, color: COLORS.green, status: "Normal" },
          { label: "Activity Pattern", val: 90, color: COLORS.green, status: "Regular" },
          { label: "Location Variance", val: 70, color: COLORS.green, status: "Expected" },
          { label: "Response Time", val: 95, color: COLORS.green, status: "Excellent" },
          { label: "Night Movement", val: 30, color: COLORS.amber, status: "Slightly low" },
        ].map(s => (
          <div key={s.label} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: COLORS.text }}>{s.label}</span>
              <span style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>{s.status}</span>
            </div>
            <div className="risk-bar">
              <div style={{ height: "100%", width: `${s.val}%`, background: s.color, borderRadius: 2, transition: "width 1s ease" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events */}
      <div className="card">
        <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textDim, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 14 }}>AI Insights</div>
        {[
          { time: "Now", msg: "All behavioral patterns within normal range.", type: "ok" },
          { time: "2h ago", msg: "Minor inactivity spike detected. Resolved automatically.", type: "info" },
          { time: "Yesterday", msg: "Late-night movement flagged and cleared.", type: "warn" },
          { time: "3 days", msg: "Risk score peaked at 34 during transit. Auto-resolved.", type: "info" },
        ].map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 3 ? 14 : 0, paddingBottom: i < 3 ? 14 : 0, borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 5, background: e.type === "ok" ? COLORS.green : e.type === "warn" ? COLORS.amber : COLORS.blue, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.4 }}>{e.msg}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{e.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Home", icon: "home" },
  { id: "map", label: "Map", icon: "map" },
  { id: "emergency", label: "SOS", icon: "alert" },
  { id: "contacts", label: "Contacts", icon: "users" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function BottomNav({ page, setPage }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 430,
      background: "rgba(8,10,14,0.92)", backdropFilter: "blur(20px)",
      borderTop: `1px solid ${COLORS.border}`,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "8px 0 env(safe-area-inset-bottom, 8px)", zIndex: 100,
    }}>
      {NAV.map(n => (
        <button key={n.id} className={`nav-tab ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
          {n.id === "emergency" ? (
            <div style={{
              width: 46, height: 46, borderRadius: "50%", background: COLORS.red,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 20px rgba(232,51,58,0.4)`,
              animation: "pulse-dot 2s ease-in-out infinite",
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
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | auth | app
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard setPage={setPage} />,
    emergency: <EmergencyCenter />,
    contacts: <ContactsPage />,
    map: <MapPage />,
    settings: <SettingsPage setPage={setPage} />,
    premium: <PremiumPage />,
    ai: <AiPage />,
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", position: "relative", background: COLORS.bg, overflow: "hidden" }}>
        {screen === "landing" && <LandingPage onGetStarted={() => setScreen("auth")} />}
        {screen === "auth" && <AuthPage onAuth={() => setScreen("app")} />}
        {screen === "app" && (
          <div style={{ minHeight: "100vh", overflowY: "auto", paddingBottom: 80 }}>
            {/* Top bar */}
            <div style={{ position: "sticky", top: 0, background: "rgba(8,10,14,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${COLORS.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 50 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 26, height: 26, background: COLORS.red, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="shield" size={14} color="white" />
                </div>
                <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, color: COLORS.text }}>Silent Emergency</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div onClick={() => setPage("ai")} style={{ cursor: "pointer", width: 32, height: 32, borderRadius: 9, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="activity" size={16} color={page === "ai" ? COLORS.red : COLORS.textMuted} />
                </div>
                <div onClick={() => setPage("premium")} style={{ cursor: "pointer", width: 32, height: 32, borderRadius: 9, background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="crown" size={16} color={page === "premium" ? COLORS.amber : COLORS.textMuted} />
                </div>
              </div>
            </div>
            {pages[page] || pages.dashboard}
            <BottomNav page={page} setPage={setPage} />
          </div>
        )}
      </div>
    </>
  );
}
