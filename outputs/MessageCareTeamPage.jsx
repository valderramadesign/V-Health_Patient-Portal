import { useState, useEffect, useRef } from "react";
import { Search, X, Send, Check, ChevronLeft } from "lucide-react";
import vHealthLogo from "../assets/V-Health_logo.png";

/* ─────────────────────────────────────────────
   BACKGROUND ANIMATION  (matches other pages)
   ───────────────────────────────────────────── */
function BgradientAnim({ animationDuration = 8 }) {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "oklch-anim-msg";
    if (!document.getElementById("oklch-anim-msg")) {
      styleEl.textContent = `
        @property --hue1 { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        @property --hue2 { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        .oklch-gradient-bg {
          background-image:
            linear-gradient(in oklch longer hue to right,
              oklch(0.95 0.07 var(--hue1) / 60%),
              oklch(0.92 0.08 var(--hue2) / 60%)),
            linear-gradient(in oklch longer hue to bottom,
              oklch(0.95 0.07 var(--hue1) / 60%),
              oklch(0.92 0.08 var(--hue2) / 60%));
          background-size: 100% 100%;
          animation: anim_bg ${animationDuration}s linear infinite;
        }
        @keyframes anim_bg {
          0%   { --hue1: 30deg;  --hue2: 180deg; }
          100% { --hue1: 390deg; --hue2: 540deg; }
        }
      `;
      document.head.appendChild(styleEl);
    }
    return () => { const el = document.getElementById("oklch-anim-msg"); if (el) el.remove(); };
  }, [animationDuration]);
  return (
    <div className="oklch-gradient-bg" aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%",
        opacity: 0.15, pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (identical to other pages)
   ───────────────────────────────────────────── */
const colors = {
  primary:      "#2A9DFF",
  primaryDark:  "#1B8AE8",
  skyTint:      "#EAF6FF",
  bgPage:       "#ECEEF2",
  white:        "#FFFFFF",
  cloudGray:    "#F4F5F7",
  borderGray:   "#E4E7EC",
  textMuted:    "#6B7280",
  textDark:     "#1F2A37",
  success:      "#67C59A",
  successBg:    "#EEFBF3",
  warning:      "#F4C46A",
  warningBg:    "#FFF9ED",
  error:        "#E8887D",
  purple:       "#7C6FD8",
  purpleBg:     "#F3F1FE",
  orange:       "#F97316",
  orangeBg:     "#FFF7ED",
};

const glass = {
  background:           "rgba(255,255,255,0.55)",
  border:               "1px solid rgba(255,255,255,0.85)",
  boxShadow:            "inset 0 2px 4px rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 0.5px 0 rgba(255,255,255,0.7)",
  backdropFilter:       "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};
const glassHover = {
  background: "rgba(255,255,255,0.72)",
  boxShadow:  "inset 0 2px 4px rgba(0,0,0,0.04), inset 0 0 0 0.5px rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.08)",
};
const glassSelected = {
  background: "rgba(42,157,255,0.10)",
  border:     "1px solid rgba(42,157,255,0.40)",
  boxShadow:  "inset 0 2px 4px rgba(42,157,255,0.08), 0 0 0 2px rgba(42,157,255,0.15)",
};

/* ─────────────────────────────────────────────
   ICONS  (inline SVG, matches other pages)
   ───────────────────────────────────────────── */
const Icon = ({ children, size = 24, style = {}, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" style={style} className={className} aria-hidden="true">
    {children}
  </svg>
);
const HomeIcon      = (p) => <Icon {...p}><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V14h6v7"/></Icon>;
const CalendarIcon  = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const ClipboardIcon = (p) => <Icon {...p}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/><path d="M9 2h6v3H9z"/></Icon>;
const PillIcon      = (p) => <Icon {...p}><path d="M10.5 1.5a4.95 4.95 0 0 0-7 7l10 10a4.95 4.95 0 0 0 7-7z"/><line x1="7" y1="10" x2="14" y2="3"/></Icon>;
const MessageIcon   = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const SparkleIcon   = (p) => <Icon {...p}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></Icon>;
const BellIcon      = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const PenIcon       = (p) => <Icon {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 13.5-13.5z"/></Icon>;
const InboxIcon     = (p) => <Icon {...p}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></Icon>;

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */
const mockConversations = [
  {
    id: "thread-1",
    sender: "Dr. Sarah Lee",
    role: "Primary Care",
    subject: "Your recent lab results",
    preview: "Your results look good overall — there is one value I would like to discuss with you.",
    timestamp: "Today, 9:14 AM",
    unread: true,
    category: "care-team",
    avatarColor: "#67C59A",
    avatarInitials: "SL",
    messages: [
      {
        id: "m1",
        sender: "Dr. Sarah Lee",
        role: "Primary Care",
        time: "Today, 9:14 AM",
        isPatient: false,
        body: "Hi Marcus,\n\nYour recent lab results have come back and I wanted to share them with you. Overall, things look great — your cholesterol is well within range and your blood glucose levels are normal.\n\nThere is one value I would like to discuss: your vitamin D level is on the lower end of the normal range. I would recommend a vitamin D supplement, 2,000 IU daily. These are available over the counter at any pharmacy.\n\nPlease let me know if you have any questions, or if you'd like to schedule a follow-up call to go over anything in more detail.",
      },
    ],
  },
  {
    id: "thread-2",
    sender: "Primary Care Team",
    role: "Primary Care",
    subject: "Annual physical — preparation instructions",
    preview: "Your annual visit is coming up. Here is what to do to prepare for the best results.",
    timestamp: "Yesterday, 4:45 PM",
    unread: false,
    replied: true,
    category: "care-team",
    avatarColor: "#2A9DFF",
    avatarInitials: "PC",
    messages: [
      {
        id: "m1",
        sender: "Primary Care Team",
        role: "Primary Care",
        time: "Yesterday, 2:30 PM",
        isPatient: false,
        body: "Hello! Your annual physical exam is coming up on April 15, 2026. To prepare, please fast for 8 hours before your appointment — water and any regular medications are fine.\n\nPlease also bring a list of your current medications, or bring the bottles themselves. We will be updating your health history, so think about any changes to your health or family health history over the past year.",
      },
      {
        id: "m2",
        sender: "You",
        role: "Patient",
        time: "Yesterday, 4:05 PM",
        isPatient: true,
        body: "Thanks for the heads up! Quick question — should I bring my insurance card even though you already have it on file?",
      },
      {
        id: "m3",
        sender: "Primary Care Team",
        role: "Primary Care",
        time: "Yesterday, 4:45 PM",
        isPatient: false,
        body: "Great question — yes, please bring your insurance card just in case there have been any updates to your plan. See you on the 15th!",
      },
    ],
  },
  {
    id: "thread-3",
    sender: "Billing Support",
    role: "Billing & Payments",
    subject: "Question about my March visit bill",
    preview: "I received a bill for $42.50 from my March 22 visit and I am not sure what the charge is for.",
    timestamp: "Apr 7, 11:30 AM",
    unread: true,
    category: "support",
    avatarColor: "#7C6FD8",
    avatarInitials: "BS",
    messages: [
      {
        id: "m1",
        sender: "You",
        role: "Patient",
        time: "Apr 7, 10:00 AM",
        isPatient: true,
        body: "Hi, I received a bill for $42.50 from my March 22 visit, but I am not sure what the charge is for. My insurance should have covered the visit in full. Can you help clarify?",
      },
      {
        id: "m2",
        sender: "Billing Support",
        role: "Billing & Payments",
        time: "Apr 7, 11:30 AM",
        isPatient: false,
        body: "Hello! Thanks for reaching out. The $42.50 charge is a specialist consultation co-pay that applies under your current plan. Your insurance did cover the base visit itself.\n\nIf you believe this was billed in error, please call your insurance provider and reference claim number 2026-0322-MH. We are also happy to provide an itemized statement — just let us know.",
      },
    ],
  },
  {
    id: "thread-4",
    sender: "Cardiology Team",
    role: "Cardiology",
    subject: "Medication update — metoprolol dosage",
    preview: "Following your last visit, Dr. Park has adjusted your metoprolol dosage to 50mg daily.",
    timestamp: "Apr 5, 3:15 PM",
    unread: false,
    category: "care-team",
    avatarColor: "#F4A261",
    avatarInitials: "CT",
    messages: [
      {
        id: "m1",
        sender: "Cardiology Team",
        role: "Cardiology",
        time: "Apr 5, 3:15 PM",
        isPatient: false,
        body: "Hi Marcus,\n\nFollowing your appointment with Dr. Park on April 3, your metoprolol dosage has been adjusted from 25 mg to 50 mg, taken once daily in the morning with food.\n\nPlease monitor for any unusual side effects such as dizziness, significant fatigue, or an unusually slow heartbeat. If you experience these, contact us right away or seek care immediately.\n\nYour next cardiology follow-up is scheduled for June 2, 2026. We will send a reminder closer to the date.",
      },
    ],
  },
];

const careTeams = [
  { id: "primary",    name: "Primary Care Team", role: "Primary Care",       category: "care-team", color: "#2A9DFF", initials: "PC" },
  { id: "cardiology", name: "Cardiology",         role: "Cardiology",         category: "care-team", color: "#F4A261", initials: "CA" },
  { id: "pediatrics", name: "Pediatrics",         role: "Pediatrics",         category: "care-team", color: "#67C59A", initials: "PE" },
  { id: "billing",    name: "Billing Support",    role: "Billing & Payments", category: "support",   color: "#7C6FD8", initials: "BS" },
  { id: "pharmacy",   name: "Pharmacy",           role: "Pharmacy",           category: "care-team", color: "#E8887D", initials: "PH" },
];

/* ─────────────────────────────────────────────
   NAV DATA
   ───────────────────────────────────────────── */
const navItems = [
  { icon: HomeIcon,      label: "Home",            id: "home",         active: false, color: colors.orange,  bg: colors.orangeBg  },
  { icon: CalendarIcon,  label: "Appointments",    id: "appointments", active: false, color: colors.primary, bg: colors.skyTint   },
  { icon: ClipboardIcon, label: "Test Results",    id: "results",      active: false, color: colors.purple,  bg: colors.purpleBg  },
  { icon: PillIcon,      label: "Request Refills", id: "refills",      active: false, color: colors.warning, bg: colors.warningBg },
  { icon: MessageIcon,   label: "Messages",        id: "messages",     active: true,  color: colors.success, bg: colors.successBg, badge: 2 },
];

const navRoutes = { home: "home", appointments: "book-appointment", results: "test-results", refills: "refill-request" };

/* ─────────────────────────────────────────────
   SHARED LAYOUT COMPONENTS  (match other pages)
   ───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <img src={vHealthLogo} alt="V-Health Logo" className="flex-shrink-0" style={{ width: 36, height: 36, objectFit: "contain" }} />
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-sm tracking-wide" style={{ color: colors.textDark }}>VALDERRAMA</span>
        <span className="text-xs tracking-widest -mt-0.5" style={{ color: colors.textMuted }}>HEALTH</span>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="relative w-full">
      <label htmlFor="portal-search-msg" className="sr-only">Search</label>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: colors.textMuted }} aria-hidden="true" />
      <input id="portal-search-msg" type="search" placeholder="Search appointments, results, messages…"
        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
        style={{ ...glass, color: colors.textDark, fontFamily: "inherit" }}
        onFocus={(e) => { e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}, inset 0 1px 2px rgba(0,0,0,0.04)`; }}
        onBlur={(e)  => { e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
      />
    </div>
  );
}

function DesktopNav({ onNavigate }) {
  return (
    <nav aria-label="Main navigation" className="hidden lg:flex flex-col gap-[8px] pt-9 pb-6 px-4" style={{ width: 210 }}>
      {navItems.map((item) => {
        const IconComp = item.icon;
        const isActive = item.active;
        return (
          <a key={item.id} href={`#${item.id}`} aria-current={isActive ? "page" : undefined}
            onClick={navRoutes[item.id] ? (e) => { e.preventDefault(); onNavigate(navRoutes[item.id]); } : undefined}
            className="relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2"
            style={{
              color: colors.textDark,
              background: isActive ? item.bg : glass.background,
              border: isActive ? `1px solid ${item.color}35` : glass.border,
              boxShadow: isActive ? `0 2px 8px ${item.color}20, ${glass.boxShadow}` : glass.boxShadow,
              backdropFilter: glass.backdropFilter, WebkitBackdropFilter: glass.WebkitBackdropFilter,
            }}
            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background=glassHover.background; e.currentTarget.style.boxShadow=glassHover.boxShadow; e.currentTarget.style.border=`1px solid rgba(255,255,255,0.95)`; }}}
            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background=glass.background; e.currentTarget.style.boxShadow=glass.boxShadow; e.currentTarget.style.border=glass.border; }}}
          >
            <span className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ width:40, height:40, background: item.bg, color: item.color }}>
              <IconComp size={20} />
            </span>
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto flex items-center justify-center rounded-full text-white font-semibold"
                style={{ width:19, height:19, fontSize:10, background:colors.error }} aria-label={`${item.badge} unread`}>
                {item.badge}
              </span>
            )}
          </a>
        );
      })}
    </nav>
  );
}

function MobileNav({ onNavigate }) {
  return (
    <nav aria-label="Main navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch justify-around"
      style={{ background:"rgba(255,255,255,0.6)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
        borderTop:"1px solid rgba(255,255,255,0.8)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.5), 0 -2px 10px rgba(0,0,0,0.06)",
        paddingBottom:"env(safe-area-inset-bottom, 8px)" }}>
      {navItems.map((item) => {
        const IconComp = item.icon;
        const isActive = item.active;
        return (
          <a key={item.id} href={`#${item.id}`} aria-current={isActive ? "page" : undefined}
            onClick={navRoutes[item.id] ? (e) => { e.preventDefault(); onNavigate(navRoutes[item.id]); } : undefined}
            className="relative flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 flex-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
            style={{ color: isActive ? item.color : colors.textMuted, minHeight: 56 }}>
            {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
              style={{ width:24, height:3, background:item.color }} aria-hidden="true" />}
            <span className="relative">
              <IconComp size={20} />
              {item.badge && <span className="absolute -top-1 -right-1.5 flex items-center justify-center rounded-full text-white"
                style={{ width:15, height:15, fontSize:9, fontWeight:600, background:colors.error }}
                aria-label={`${item.badge} unread`}>{item.badge}</span>}
            </span>
            <span className="font-medium leading-tight" style={{ fontSize:10 }}>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   AI ASSISTANT  (matches other pages)
   ───────────────────────────────────────────── */
function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const suggestions = [
    "How do I message my care team?",
    "How soon will I get a reply?",
    "What if I have an urgent question?",
  ];
  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open assistant — Ask for help"
          className="fixed z-50 flex items-center gap-2 rounded-full px-5 py-3 text-white font-medium text-sm shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)`,
            bottom:"calc(env(safe-area-inset-bottom, 8px) + 80px)", right:24 }}>
          <SparkleIcon size={18} /><span className="hidden sm:inline">Ask for help</span>
        </button>
      )}
      {open && (
        <div role="dialog" aria-label="Health assistant"
          className="fixed z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{ background:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.9)",
            boxShadow:"inset 0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.15)",
            backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
            bottom:"calc(env(safe-area-inset-bottom, 8px) + 80px)", right:24,
            width:"min(380px, calc(100vw - 48px))", maxHeight:"min(520px, calc(100vh - 160px))" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom:"1px solid rgba(255,255,255,0.6)" }}>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center rounded-xl"
                style={{ width:34, height:34, background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
                <SparkleIcon size={17} className="text-white" />
              </span>
              <div>
                <h2 className="font-semibold text-sm" style={{ color:colors.textDark }}>Health assistant</h2>
                <p style={{ color:colors.textMuted, fontSize:12 }}>Ask a question about messaging</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"
              className="p-1.5 rounded-lg transition-colors focus:outline-none"
              style={{ color:colors.textMuted }}
              onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(0,0,0,0.05)")}
              onMouseLeave={(e)=>(e.currentTarget.style.background="transparent")}>
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <div className="rounded-xl p-4 mb-4"
              style={{ background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.8)", boxShadow:"inset 0 1px 2px rgba(0,0,0,0.04)" }}>
              <p className="text-sm leading-relaxed" style={{ color:colors.textDark }}>
                Hi! I can help you navigate your messages, understand how to reach your care team, and answer questions about the messaging process.
              </p>
            </div>
            <p className="text-xs font-medium mb-2.5" style={{ color:colors.textMuted }}>Suggested questions</p>
            <div className="flex flex-col gap-2 mb-5">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setQuery(s)}
                  className="text-left text-sm rounded-xl px-3.5 py-2.5 transition-all focus:outline-none"
                  style={{ background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.8)", boxShadow:"inset 0 1px 2px rgba(0,0,0,0.04)", color:colors.textDark }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(42,157,255,0.08)"; e.currentTarget.style.border=`1px solid ${colors.primary}40`; e.currentTarget.style.color=colors.primary; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.45)"; e.currentTarget.style.border="1px solid rgba(255,255,255,0.8)"; e.currentTarget.style.color=colors.textDark; }}>
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed rounded-lg p-3"
              style={{ background:"rgba(0,0,0,0.04)", border:"1px solid rgba(255,255,255,0.6)", color:colors.textMuted }}>
              This assistant does not provide medical advice or replace your care team. If you are having a medical emergency, call 911 right away.
            </p>
          </div>
          <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop:"1px solid rgba(255,255,255,0.6)" }}>
            <label htmlFor="ai-input-msg" className="sr-only">Type a question</label>
            <input id="ai-input-msg" type="text" value={query} onChange={(e)=>setQuery(e.target.value)}
              placeholder="Ask a question…" className="flex-1 text-sm outline-none rounded-lg px-3 py-1.5"
              style={{ background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.8)", boxShadow:"inset 0 1px 2px rgba(0,0,0,0.04)", color:colors.textDark }} />
            <button aria-label="Send question"
              className="flex items-center justify-center rounded-xl p-2 transition-colors focus:outline-none"
              style={{ background:query ? colors.primary:"rgba(255,255,255,0.45)", color:query ? "#fff":colors.textMuted }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   CONVERSATION LIST COMPONENTS
   ───────────────────────────────────────────── */

function ConversationItem({ conv, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left px-4 py-3.5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
      style={{
        background: isSelected
          ? "rgba(42,157,255,0.08)"
          : hovered ? "rgba(255,255,255,0.45)" : "transparent",
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        borderLeft: isSelected ? `3px solid ${colors.primary}` : "3px solid transparent",
      }}
      aria-current={isSelected ? "true" : undefined}
      aria-label={`${conv.unread ? "Unread: " : ""}${conv.sender} — ${conv.subject}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold text-white text-xs"
          style={{ width: 38, height: 38, background: conv.avatarColor || colors.primary, marginTop: 1 }}>
          {conv.avatarInitials}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-sm truncate"
              style={{ color: isSelected ? colors.primary : colors.textDark,
                fontWeight: conv.unread ? 700 : 500 }}>
              {conv.sender}
            </span>
            <span className="text-xs flex-shrink-0" style={{ color: colors.textMuted }}>
              {conv.timestamp}
            </span>
          </div>
          <p className="text-xs truncate mb-1"
            style={{ color: conv.unread ? colors.textDark : colors.textMuted,
              fontWeight: conv.unread ? 600 : 400 }}>
            {conv.subject}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs truncate flex-1 leading-snug" style={{ color: colors.textMuted }}>
              {conv.preview}
            </p>
            {conv.unread && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full" role="img"
                style={{ background: colors.primary }} aria-label="Unread message" />
            )}
            {conv.replied && !conv.unread && (
              <span className="flex-shrink-0 text-xs rounded-full px-2 py-0.5 font-medium"
                style={{ background: colors.successBg, color: colors.success, whiteSpace: "nowrap" }}>
                Replied
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function ConversationListPanel({
  conversations, selectedId, onSelect,
  filter, onFilterChange,
  search, onSearchChange,
  onNewMessage,
}) {
  const filterTabs = [
    { id: "all",       label: "All"       },
    { id: "unread",    label: "Unread"    },
    { id: "care-team", label: "Care team" },
    { id: "support",   label: "Support"   },
  ];

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Panel header */}
      <div className="px-4 pt-4 pb-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-sm" style={{ color: colors.textDark }}>Conversations</h2>
            {unreadCount > 0 && (
              <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
                {unreadCount} unread
              </p>
            )}
          </div>
          <button
            onClick={onNewMessage}
            className="flex items-center gap-1.5 text-xs font-semibold rounded-xl px-3 py-2 text-white transition-all focus:outline-none focus-visible:ring-2"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)`,
              boxShadow: "0 2px 8px rgba(42,157,255,0.3)" }}>
            <PenIcon size={12} />
            New message
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: colors.textMuted }} />
          <label htmlFor="msg-search" className="sr-only">Search messages</label>
          <input
            id="msg-search"
            type="search"
            placeholder="Search messages…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all"
            style={{ ...glass, color: colors.textDark, fontFamily: "inherit" }}
            onFocus={(e)=>{ e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; }}
            onBlur={(e) =>{ e.target.style.background=glass.background; e.target.style.border=glass.border; }}
          />
          {search && (
            <button onClick={() => onSearchChange("")} aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none"
              style={{ color: colors.textMuted }}>
              <X size={12} />
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 overflow-x-auto" role="tablist" aria-label="Filter messages"
          style={{ scrollbarWidth: "none" }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={filter === tab.id}
              onClick={() => onFilterChange(tab.id)}
              className="flex-shrink-0 text-xs font-medium rounded-lg px-3 py-1.5 transition-all focus:outline-none focus-visible:ring-2"
              style={filter === tab.id
                ? { ...glassSelected, color: colors.primary }
                : { ...glass, color: colors.textMuted }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto" role="list" aria-label="Conversations">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <InboxIcon size={28} style={{ color: colors.textMuted, marginBottom: 10 }} />
            <p className="text-sm font-medium" style={{ color: colors.textDark }}>
              {search ? "No messages found" : "Nothing here yet"}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: colors.textMuted }}>
              {search
                ? "Try searching for a different name or subject."
                : "Messages from your care team will appear here."}
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div key={conv.id} role="listitem">
              <ConversationItem
                conv={conv}
                isSelected={conv.id === selectedId}
                onClick={() => onSelect(conv.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Safety footer */}
      <div className="px-4 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.2)" }}>
        <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
          For <strong>non-urgent questions only.</strong> If you are having a medical emergency, call <strong>911</strong> right away.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MESSAGE THREAD COMPONENTS
   ───────────────────────────────────────────── */

function MessageBubble({ msg }) {
  return (
    <div className={`flex ${msg.isPatient ? "justify-end" : "justify-start"} mb-5`}>
      {/* Care team avatar */}
      {!msg.isPatient && (
        <div className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold text-white text-xs mr-2.5 self-end mb-1"
          style={{ width: 32, height: 32, background: colors.primary }}>
          {msg.sender.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </div>
      )}

      <div style={{ maxWidth: "72%" }}>
        {/* Sender label */}
        <div className="flex items-center gap-2 mb-1.5"
          style={{ justifyContent: msg.isPatient ? "flex-end" : "flex-start" }}>
          <span className="text-xs font-semibold" style={{ color: colors.textDark }}>
            {msg.sender}
          </span>
          {msg.role && msg.role !== "Patient" && (
            <span className="text-xs rounded-full px-2 py-0.5"
              style={{ background: "rgba(42,157,255,0.08)", color: colors.primary, border: "1px solid rgba(42,157,255,0.2)" }}>
              {msg.role}
            </span>
          )}
          <span className="text-xs" style={{ color: colors.textMuted }}>{msg.time}</span>
        </div>

        {/* Bubble */}
        <div className="rounded-2xl px-4 py-3"
          style={msg.isPatient
            ? { background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)`,
                boxShadow: "0 2px 8px rgba(42,157,255,0.25)" }
            : { ...glass }}>
          <p className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: msg.isPatient ? "#fff" : colors.textDark }}>
            {msg.body}
          </p>
        </div>
      </div>

      {/* Patient avatar */}
      {msg.isPatient && (
        <div className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold text-white text-xs ml-2.5 self-end mb-1"
          style={{ width: 32, height: 32, background: colors.success }}>
          Me
        </div>
      )}
    </div>
  );
}

function MessageThreadPanel({ conversation, onReply, onBack }) {
  const [replyText, setReplyText]   = useState("");
  const [replySent, setReplySent]   = useState(false);
  const [replyError, setReplyError] = useState(false);
  const bottomRef  = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to bottom when thread opens or messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.id, conversation?.messages?.length]);

  // Reset reply state when conversation changes
  useEffect(() => {
    setReplyText("");
    setReplySent(false);
    setReplyError(false);
  }, [conversation?.id]);

  const handleSend = () => {
    if (!replyText.trim()) return;
    try {
      onReply(replyText.trim());
      setReplyText("");
      setReplySent(true);
      setReplyError(false);
      setTimeout(() => setReplySent(false), 3000);
    } catch {
      setReplyError(true);
      setTimeout(() => setReplyError(false), 3000);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // Empty state — no conversation selected
  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center"
        role="region" aria-label="Message thread">
        <div className="flex items-center justify-center rounded-2xl mb-4"
          style={{ width: 56, height: 56, background: "rgba(42,157,255,0.08)",
            border: "1px solid rgba(42,157,255,0.15)" }}>
          <MessageIcon size={26} style={{ color: colors.primary }} />
        </div>
        <p className="font-semibold text-sm mb-1" style={{ color: colors.textDark }}>
          Select a message to read
        </p>
        <p className="text-xs leading-relaxed" style={{ color: colors.textMuted, maxWidth: 240 }}>
          Choose a conversation from the list, or start a new one using the "New message" button.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0" role="region"
      aria-label={`Thread: ${conversation.subject}`}>

      {/* Thread header */}
      <div className="px-4 sm:px-5 py-4 flex items-start gap-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
        {/* Back — mobile only */}
        <button onClick={onBack} aria-label="Back to conversations"
          className="lg:hidden flex-shrink-0 flex items-center gap-1 text-xs font-medium rounded-lg px-2.5 py-2 -ml-1 focus:outline-none focus-visible:ring-2 transition-all"
          style={{ color: colors.primary, background: "rgba(42,157,255,0.08)",
            border: "1px solid rgba(42,157,255,0.2)" }}>
          <ChevronLeft size={14} /> Back
        </button>

        {/* Avatar */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full font-semibold text-white text-xs"
          style={{ width: 38, height: 38, background: conversation.avatarColor || colors.primary }}>
          {conversation.avatarInitials}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-sm leading-snug truncate" style={{ color: colors.textDark }}>
            {conversation.subject}
          </h2>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs" style={{ color: colors.textMuted }}>{conversation.sender}</span>
            <span className="text-xs rounded-full px-2 py-0.5"
              style={{ background: "rgba(255,255,255,0.5)", color: colors.textMuted }}>
              {conversation.role}
            </span>
          </div>
        </div>
      </div>

      {/* Non-urgent notice bar */}
      <div className="px-4 sm:px-5 py-2 flex items-center gap-2 flex-shrink-0"
        style={{ background: "rgba(244,196,106,0.12)", borderBottom: "1px solid rgba(244,196,106,0.25)" }}>
        <span style={{ color: "#9A7D2A", flexShrink: 0, fontSize: 14 }}>⚠</span>
        <p className="text-xs leading-snug" style={{ color: "#9A7D2A" }}>
          For non-urgent questions only. Replies may take up to 2 business days.
          If you are having a medical emergency, call 911.
        </p>
      </div>

      {/* Messages — scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-5"
        style={{ minHeight: 0 }}>
        {conversation.messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {/* Send success/error feedback */}
        {replySent && (
          <div className="flex items-center gap-2 text-xs rounded-xl px-4 py-2.5 mb-3 justify-center mx-auto w-fit"
            style={{ background: colors.successBg, color: colors.success,
              border: "1px solid rgba(103,197,154,0.3)" }}>
            <Check size={12} strokeWidth={2.5} /> Message sent
          </div>
        )}
        {replyError && (
          <div className="flex items-center gap-2 text-xs rounded-xl px-4 py-2.5 mb-3 justify-center mx-auto w-fit"
            style={{ background: "rgba(232,136,125,0.1)", color: colors.error,
              border: "1px solid rgba(232,136,125,0.3)" }}>
            Something went wrong. Please try again.
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Reply area */}
      <div className="px-4 sm:px-5 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.5)",
          background: "rgba(255,255,255,0.2)" }}>
        <div className="flex items-end gap-2.5">
          <div className="flex-1">
            <label htmlFor="reply-textarea" className="sr-only">
              Reply to {conversation.sender}
            </label>
            <textarea
              id="reply-textarea"
              ref={textareaRef}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a reply… (⌘ Enter to send)"
              rows={2}
              className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none resize-none transition-all"
              style={{ ...glass, color: colors.textDark, fontFamily: "inherit", lineHeight: 1.5 }}
              onFocus={(e)=>{ e.target.style.background="rgba(255,255,255,0.8)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}`; }}
              onBlur={(e) =>{ e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!replyText.trim()}
            aria-label="Send reply"
            className="flex-shrink-0 flex items-center justify-center rounded-xl p-3 transition-all focus:outline-none focus-visible:ring-2"
            style={{
              background: replyText.trim()
                ? `linear-gradient(135deg, ${colors.primary}, #5BB8FF)`
                : "rgba(255,255,255,0.45)",
              color:   replyText.trim() ? "#fff" : colors.textMuted,
              cursor:  replyText.trim() ? "pointer" : "not-allowed",
              boxShadow: replyText.trim() ? "0 2px 8px rgba(42,157,255,0.25)" : "none",
            }}>
            <Send size={17} />
          </button>
        </div>
        <p className="text-xs mt-1.5 text-center" style={{ color: colors.textMuted }}>
          For non-urgent questions only · Replies within 2 business days
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NEW MESSAGE COMPOSER  (modal)
   ───────────────────────────────────────────── */
function NewMessageComposer({ onClose, onSend }) {
  const [team,    setTeam]    = useState("");
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [sent,    setSent]    = useState(false);

  const selectedTeam = careTeams.find((t) => t.id === team);
  const canSend = !!team && subject.trim().length > 0 && body.trim().length > 0;

  const handleSend = () => {
    if (!canSend || !selectedTeam) return;
    onSend({ team: selectedTeam, subject: subject.trim(), body: body.trim() });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setTeam(""); setSubject(""); setBody("");
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50" aria-hidden="true"
        style={{ background: "rgba(0,0,0,0.28)", backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        role="dialog" aria-modal="true" aria-label="New message"
        onKeyDown={handleKeyDown}
        className="fixed z-50 inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg"
      >
        <div className="rounded-2xl overflow-hidden flex flex-col"
          style={{ ...glass,
            boxShadow: "0 24px 60px rgba(0,0,0,0.18), inset 0 1px 2px rgba(255,255,255,0.8)",
            maxHeight: "min(90vh, 640px)" }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.6)" }}>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center rounded-xl"
                style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
                <PenIcon size={15} className="text-white" style={{ color: "#fff" }} />
              </span>
              <h2 className="font-semibold text-sm" style={{ color: colors.textDark }}>New message</h2>
            </div>
            <button onClick={onClose} aria-label="Close composer"
              className="p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(0,0,0,0.06)")}
              onMouseLeave={(e)=>(e.currentTarget.style.background="transparent")}>
              <X size={18} />
            </button>
          </div>

          {/* Form body */}
          <div className="overflow-y-auto flex-1 px-5 py-5 flex flex-col gap-4">
            {/* Non-urgent notice */}
            <div className="rounded-xl px-4 py-3"
              style={{ background: "rgba(244,196,106,0.1)", border: "1px solid rgba(244,196,106,0.25)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "#9A7D2A" }}>
                <span className="font-semibold">For non-urgent questions only.</span>{" "}
                If you are having a medical emergency, do not wait — call 911 right away.
              </p>
            </div>

            {/* Recipient / Team */}
            <div>
              <label htmlFor="new-msg-team" className="block text-xs font-semibold mb-1.5"
                style={{ color: colors.textDark }}>
                Send to <span aria-hidden="true" style={{ color: colors.error }}>*</span>
              </label>
              <select
                id="new-msg-team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none appearance-none cursor-pointer"
                style={{ ...glass, color: team ? colors.textDark : colors.textMuted,
                  fontFamily: "inherit" }}>
                <option value="">Select a care team</option>
                {careTeams.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="new-msg-subject" className="block text-xs font-semibold mb-1.5"
                style={{ color: colors.textDark }}>
                Subject <span aria-hidden="true" style={{ color: colors.error }}>*</span>
              </label>
              <input
                id="new-msg-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Question about my medication"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                style={{ ...glass, color: colors.textDark, fontFamily: "inherit" }}
                onFocus={(e)=>{ e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}`; }}
                onBlur={(e) =>{ e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
              />
            </div>

            {/* Message body */}
            <div>
              <label htmlFor="new-msg-body" className="block text-xs font-semibold mb-1.5"
                style={{ color: colors.textDark }}>
                Message <span aria-hidden="true" style={{ color: colors.error }}>*</span>
              </label>
              <textarea
                id="new-msg-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe your question or concern. Please be as specific as possible."
                rows={5}
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition-all"
                style={{ ...glass, color: colors.textDark, fontFamily: "inherit", lineHeight: 1.6 }}
                onFocus={(e)=>{ e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}`; }}
                onBlur={(e) =>{ e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
              />
            </div>

            {/* Helper note */}
            <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
              For appointment or billing questions, be sure to choose the correct team above.
              Replies are typically sent within 2 business days.
            </p>
          </div>

          {/* Footer actions */}
          <div className="px-5 py-4 flex items-center justify-between gap-3 flex-shrink-0"
            style={{ borderTop: "1px solid rgba(255,255,255,0.6)",
              background: "rgba(255,255,255,0.2)" }}>
            <button onClick={onClose}
              className="text-sm font-medium px-4 py-2.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2"
              style={{ ...glass, color: colors.textDark }}>
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={!canSend}
              className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all focus:outline-none focus-visible:ring-2"
              style={{
                background: canSend
                  ? `linear-gradient(135deg, ${colors.primary}, #5BB8FF)`
                  : "rgba(255,255,255,0.4)",
                color:  canSend ? "#fff" : colors.textMuted,
                cursor: canSend ? "pointer" : "not-allowed",
                boxShadow: canSend ? "0 2px 8px rgba(42,157,255,0.25)" : "none",
              }}>
              {sent
                ? <><Check size={14} strokeWidth={2.5} /> Sent!</>
                : <><Send size={14} /> Send message</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function MessageCareTeamPage({ onNavigate = () => {} }) {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedId,    setSelectedId]    = useState(null);
  const [filter,        setFilter]        = useState("all");
  const [search,        setSearch]        = useState("");
  const [mobilePanel,   setMobilePanel]   = useState("list"); // "list" | "thread"
  const [composeOpen,   setComposeOpen]   = useState(false);

  const selectedConv = conversations.find((c) => c.id === selectedId) ?? null;

  // Filtered conversations for the list
  const filteredConversations = conversations.filter((conv) => {
    const matchesFilter =
      filter === "all"       ? true :
      filter === "unread"    ? conv.unread :
      filter === "care-team" ? conv.category === "care-team" :
      filter === "support"   ? conv.category === "support" : true;

    const q = search.toLowerCase().trim();
    const matchesSearch = !q ||
      conv.sender.toLowerCase().includes(q)  ||
      conv.subject.toLowerCase().includes(q) ||
      conv.preview.toLowerCase().includes(q) ||
      conv.role.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleSelect = (id) => {
    setSelectedId(id);
    // Mark as read when opened
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
    setMobilePanel("thread");
  };

  const handleReply = (text) => {
    if (!selectedId || !text.trim()) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const timeLabel = `Today, ${now}`;
    const newMsg = {
      id:        `reply-${Date.now()}`,
      sender:    "You",
      role:      "Patient",
      time:      timeLabel,
      body:      text.trim(),
      isPatient: true,
    };
    const preview = text.length > 65 ? text.slice(0, 65) + "…" : text;
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== selectedId) return c;
        return {
          ...c,
          replied:   true,
          unread:    false,
          preview,
          timestamp: timeLabel,
          messages:  [...c.messages, newMsg],
        };
      })
    );
  };

  const handleNewMessage = ({ team, subject, body }) => {
    const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const timeLabel = `Today, ${now}`;
    const newConv = {
      id:             `conv-${Date.now()}`,
      sender:         team.name,
      role:           team.role,
      subject,
      preview:        body.length > 65 ? body.slice(0, 65) + "…" : body,
      timestamp:      timeLabel,
      unread:         false,
      category:       team.category,
      avatarColor:    team.color,
      avatarInitials: team.initials,
      messages: [
        {
          id:        "new-m1",
          sender:    "You",
          role:      "Patient",
          time:      timeLabel,
          isPatient: true,
          body,
        },
      ],
    };
    setConversations((prev) => [newConv, ...prev]);
    setSelectedId(newConv.id);
    setMobilePanel("thread");
    setComposeOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background:  colors.bgPage,
      position:    "relative",
      fontFamily:  "Aptos, 'Avenir Next', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      color:       colors.textDark,
      lineHeight:  1.55,
    }}>
      <BgradientAnim animationDuration={8} />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30" style={{
        background:           "rgba(255,255,255,0.6)",
        borderBottom:         "1px solid rgba(255,255,255,0.8)",
        boxShadow:            "inset 0 -1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}>
        <div className="max-w-screen-xl mx-auto flex items-center gap-4 px-5 lg:px-8 py-3.5">
          <Logo />
          <div className="hidden md:flex flex-1 px-6"><SearchBar /></div>
          <button aria-label="Notifications"
            className="relative p-2 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2"
            style={{ color:colors.textMuted, background:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.7)", boxShadow:"inset 0 1px 2px rgba(0,0,0,0.04)" }}
            onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(255,255,255,0.7)")}
            onMouseLeave={(e)=>(e.currentTarget.style.background="rgba(255,255,255,0.4)")}>
            <BellIcon size={20} />
            <span className="absolute top-1 right-1 rounded-full"
              style={{ width:8, height:8, background:colors.error, border:"1.5px solid rgba(255,255,255,0.8)" }}
              aria-label="New notifications" />
          </button>
        </div>
        <div className="md:hidden px-5 pb-3"><SearchBar /></div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block flex-shrink-0">
          <DesktopNav onNavigate={onNavigate} />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col px-5 lg:px-8 pt-7 pb-28 lg:pb-8" style={{ minWidth: 0 }}>

          {/* Page intro */}
          <div className="mb-5 flex-shrink-0">
            <h1 className="font-semibold mb-1" style={{ color: colors.textDark, fontSize: 24 }}>Messages</h1>
            <p className="text-sm" style={{ color: colors.textMuted }}>
              Read updates and send non-urgent messages to your care team.
            </p>
          </div>

          {/* Two-panel messaging area */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1" style={{ minHeight: 520 }}>

            {/* ── Left: Conversation list ── */}
            <div
              className={`${mobilePanel === "thread" ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-80 xl:w-96 flex-shrink-0 rounded-2xl overflow-hidden`}
              style={{ ...glass, minHeight: 480 }}>
              <ConversationListPanel
                conversations={filteredConversations}
                selectedId={selectedId}
                onSelect={handleSelect}
                filter={filter}
                onFilterChange={setFilter}
                search={search}
                onSearchChange={setSearch}
                onNewMessage={() => setComposeOpen(true)}
              />
            </div>

            {/* ── Right: Message thread ── */}
            <div
              className={`${mobilePanel === "list" ? "hidden lg:flex" : "flex"} flex-col flex-1 rounded-2xl overflow-hidden`}
              style={{ ...glass, minHeight: 480 }}>
              <MessageThreadPanel
                conversation={selectedConv}
                onReply={handleReply}
                onBack={() => setMobilePanel("list")}
              />
            </div>
          </div>
        </main>
      </div>

      {/* ── NEW MESSAGE COMPOSER ── */}
      {composeOpen && (
        <NewMessageComposer
          onClose={() => setComposeOpen(false)}
          onSend={handleNewMessage}
        />
      )}

      <MobileNav onNavigate={onNavigate} />
      <AIAssistant />
    </div>
  );
}
