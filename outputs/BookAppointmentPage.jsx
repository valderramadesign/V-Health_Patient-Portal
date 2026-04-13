import { useState, useEffect, useRef } from "react";
import { Search, X, ChevronRight, Video, Send, Check, MapPin, ChevronLeft, Clock } from "lucide-react";

/* ─────────────────────────────────────────────
   BACKGROUND ANIMATION  (matches homepage)
   ───────────────────────────────────────────── */
function BgradientAnim({ animationDuration = 8 }) {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "oklch-anim-book";
    if (!document.getElementById("oklch-anim-book")) {
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
    return () => { const el = document.getElementById("oklch-anim-book"); if (el) el.remove(); };
  }, [animationDuration]);
  return (
    <div className="oklch-gradient-bg" aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%",
        opacity: 0.15, pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (identical to homepage)
   ───────────────────────────────────────────── */
const colors = {
  primary:     "#2A9DFF",
  primaryDark: "#1B8AE8",
  skyTint:     "#EAF6FF",
  bgPage:      "#ECEEF2",
  white:       "#FFFFFF",
  cloudGray:   "#F4F5F7",
  borderGray:  "#E4E7EC",
  textMuted:   "#6B7280",
  textDark:    "#1F2A37",
  success:     "#67C59A",
  successBg:   "#EEFBF3",
  warning:     "#F4C46A",
  warningBg:   "#FFF9ED",
  error:       "#E8887D",
  purple:      "#7C6FD8",
  purpleBg:    "#F3F1FE",
  orange:      "#F97316",
  orangeBg:    "#FFF7ED",
};

const glass = {
  background:          "rgba(255,255,255,0.55)",
  border:              "1px solid rgba(255,255,255,0.85)",
  boxShadow:           "inset 0 2px 4px rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 0.5px 0 rgba(255,255,255,0.7)",
  backdropFilter:      "blur(12px)",
  WebkitBackdropFilter:"blur(12px)",
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
   ICONS  (inline SVG, matches homepage style)
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
const HeartIcon     = (p) => <Icon {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Icon>;
const ScopeIcon     = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></Icon>;
const RefreshIcon   = (p) => <Icon {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>;
const ZapIcon       = (p) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
const MoreIcon      = (p) => <Icon {...p}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></Icon>;
const BuildingIcon  = (p) => <Icon {...p}><rect x="4" y="2" width="16" height="20" rx="1"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><rect x="9" y="12" width="6" height="10"/><line x1="9" y1="7" x2="9" y2="7.01"/><line x1="15" y1="7" x2="15" y2="7.01"/><line x1="9" y1="4" x2="9" y2="4.01"/><line x1="15" y1="4" x2="15" y2="4.01"/></Icon>;
const UserIcon      = (p) => <Icon {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const CheckCircle   = (p) => <Icon {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></Icon>;
const EditIcon      = (p) => <Icon {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Icon>;
const VideoIcon     = (p) => <Icon {...p}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></Icon>;

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */
const careTypes = [
  { id: "primary",   label: "Primary care",    icon: ScopeIcon,   desc: "General health and wellness visits" },
  { id: "specialty", label: "Specialty care",  icon: HeartIcon,   desc: "See a specialist for a specific condition" },
  { id: "followup",  label: "Follow-up visit", icon: RefreshIcon, desc: "Continue care after a recent visit" },
  { id: "annual",    label: "Annual physical", icon: ClipboardIcon, desc: "Yearly wellness exam and preventive care" },
  { id: "video",     label: "Video visit",     icon: VideoIcon,   desc: "See your provider from home" },
  { id: "urgent",    label: "Urgent care",     icon: ZapIcon,     desc: "Non-emergency concerns that need attention soon" },
  { id: "other",     label: "Other reason",    icon: MoreIcon,    desc: "Something else — your care team can help" },
];

const providers = [
  { id: "first",   name: "First available",     specialty: "Any provider",          initials: null,  location: "All locations",                  next: "Tomorrow, 8:30 AM" },
  { id: "chen",    name: "Dr. Sarah Chen",       specialty: "Family Medicine",        initials: "SC",  location: "Main Campus",                    next: "Tomorrow, 9:00 AM",  color: "#5BB8FF" },
  { id: "liu",     name: "Dr. James Liu",        specialty: "Internal Medicine",      initials: "JL",  location: "Westside Clinic",                next: "Thu Apr 11, 2:30 PM", color: "#67C59A" },
  { id: "park",    name: "Dr. Emily Park",       specialty: "Cardiology",             initials: "EP",  location: "Main Campus",                    next: "Fri Apr 12, 11:00 AM", color: "#7C6FD8" },
];

const formats = [
  { id: "inperson", label: "In-person visit",  icon: BuildingIcon, desc: "Visit a clinic near you. We will confirm your location in the next step." },
  { id: "video",    label: "Video visit",       icon: VideoIcon,    desc: "Meet with your provider from anywhere. A secure link will be sent to you." },
];

const locations = [
  { id: "main",     name: "Valderrama Health — Main Campus",       address: "1234 Wellness Ave, San Francisco, CA 94105", distance: "0.8 mi",  parking: "Free parking available" },
  { id: "westside", name: "Valderrama Health — Westside Clinic",    address: "567 Pacific Blvd, San Francisco, CA 94117",  distance: "2.1 mi",  parking: "Street parking nearby" },
  { id: "mission",  name: "Valderrama Health — Mission District",   address: "890 Mission St, San Francisco, CA 94103",    distance: "1.4 mi",  parking: "Paid garage adjacent" },
];

// Generate the next 10 weekdays from April 10, 2026
const generateDates = () => {
  const dates = [];
  const start = new Date(2026, 3, 10); // April 10
  let count = 0;
  let i = 0;
  while (count < 10) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) { dates.push(d); count++; }
    i++;
  }
  return dates;
};
const availableDates = generateDates();

const morningSlots  = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM"];
const afternoonSlots= ["12:00 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM", "4:30 PM"];
const unavailableSlots = new Set(["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"]);

const navItems = [
  { icon: HomeIcon,      label: "Home",            id: "home",         active: false, color: colors.orange,  bg: colors.orangeBg  },
  { icon: CalendarIcon,  label: "Appointments",    id: "appointments", active: true,  color: colors.primary, bg: colors.skyTint   },
  { icon: ClipboardIcon, label: "Test Results",    id: "results",      active: false, color: colors.purple,  bg: colors.purpleBg  },
  { icon: PillIcon,      label: "Request Refills", id: "refills",      active: false, color: colors.warning, bg: colors.warningBg },
  { icon: MessageIcon,   label: "Messages",        id: "messages",     active: false, color: colors.success, bg: colors.successBg, badge: 1 },
];

/* ─────────────────────────────────────────────
   SHARED LAYOUT COMPONENTS  (match homepage)
   ───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
        <span className="text-white font-bold text-sm leading-none" aria-hidden="true">V</span>
      </div>
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
      <label htmlFor="portal-search" className="sr-only">Search</label>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: colors.textMuted }} aria-hidden="true" />
      <input id="portal-search" type="search" placeholder="Search appointments, results, messages…"
        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
        style={{ ...glass, color: colors.textDark, fontFamily: "inherit" }}
        onFocus={(e) => { e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}, inset 0 1px 2px rgba(0,0,0,0.04)`; }}
        onBlur={(e) => { e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
      />
    </div>
  );
}

const navRoutes = { home: "home", results: "test-results", messages: "messages", refills: "refill-request" };

function DesktopNav({ onNavigate }) {
  return (
    <nav aria-label="Main navigation" className="hidden lg:flex flex-col gap-1.5 py-6 px-4" style={{ width: 210 }}>
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
              style={{ width: 40, height: 40, background: item.bg, color: item.color }}>
              <IconComp size={20} />
            </span>
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto flex items-center justify-center rounded-full text-white font-semibold"
                style={{ width: 19, height: 19, fontSize: 10, background: colors.error }} aria-label={`${item.badge} unread`}>
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
              style={{ width: 24, height: 3, background: item.color }} aria-hidden="true" />}
            <span className="relative">
              <IconComp size={20} />
              {item.badge && <span className="absolute -top-1 -right-1.5 flex items-center justify-center rounded-full text-white"
                style={{ width: 15, height: 15, fontSize: 9, fontWeight: 600, background: colors.error }}
                aria-label={`${item.badge} unread`}>{item.badge}</span>}
            </span>
            <span className="font-medium leading-tight" style={{ fontSize: 10 }}>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   AI ASSISTANT  (matches homepage)
   ───────────────────────────────────────────── */
function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const suggestions = [
    "What appointment type should I choose?",
    "How do video visits work?",
    "Can I book with the first available provider?",
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
                <p style={{ color:colors.textMuted, fontSize:12 }}>Ask a question about booking</p>
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
                Hi, how can I help you book your visit today? I can explain visit types, help you choose a provider, and answer questions about the booking process.
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
            <label htmlFor="ai-input-book" className="sr-only">Type a question</label>
            <input id="ai-input-book" type="text" value={query} onChange={(e)=>setQuery(e.target.value)}
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
   BOOKING STEP COMPONENTS
   ───────────────────────────────────────────── */

/* ── Glass option card — reusable selection tile ── */
function OptionCard({ selected, onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-4 transition-all duration-150 focus:outline-none focus-visible:ring-2 ${className}`}
      style={selected ? glassSelected : glass}
      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.background=glassHover.background; e.currentTarget.style.boxShadow=glassHover.boxShadow; }}}
      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.background=glass.background; e.currentTarget.style.boxShadow=glass.boxShadow; e.currentTarget.style.border=glass.border; }}}
    >
      {children}
    </button>
  );
}

/* ── Step shell: pure glass card, header lives outside in the carousel ── */
function StepShell({ isLocked, children }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ ...glass, borderRadius: 16, height: "100%", padding: 24, opacity: isLocked ? 0.45 : 1 }}>
      {children}
    </div>
  );
}

/* ── Completed step summary row ── */
function CompletedSummary({ label, icon: IconComp }) {
  return (
    <div className="flex items-center gap-2.5 text-sm" style={{ color: colors.textDark }}>
      {IconComp && <IconComp size={15} style={{ color: colors.primary, flexShrink: 0 }} />}
      <span className="font-medium">{label}</span>
    </div>
  );
}

/* ── Step 1: Care type ── */
function CareTypeStep({ value, onSelect }) {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Choose the type of care you need. Not sure? Your care team can help.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {careTypes.map((ct) => {
          const IconComp = ct.icon;
          const isSelected = value?.id === ct.id;
          return (
            <OptionCard key={ct.id} selected={isSelected} onClick={() => onSelect(ct)}>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width:38, height:38,
                    background: isSelected ? "rgba(42,157,255,0.15)" : "rgba(255,255,255,0.6)",
                    color: isSelected ? colors.primary : colors.textMuted }}>
                  <IconComp size={18} />
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-sm leading-tight" style={{ color: isSelected ? colors.primary : colors.textDark }}>{ct.label}</p>
                  <p className="text-xs mt-0.5 leading-tight" style={{ color: colors.textMuted }}>{ct.desc}</p>
                </div>
                {isSelected && <Check size={16} className="ml-auto flex-shrink-0" style={{ color: colors.primary }} />}
              </div>
            </OptionCard>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 2: Provider ── */
function ProviderStep({ value, onSelect }) {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Select a provider or choose the first available appointment.</p>
      <div className="flex flex-col gap-2.5">
        {providers.map((prov) => {
          const isSelected = value?.id === prov.id;
          const isFirstAvail = prov.id === "first";
          return (
            <OptionCard key={prov.id} selected={isSelected} onClick={() => onSelect(prov)}>
              <div className="flex items-center gap-3.5">
                {/* Avatar or icon */}
                {isFirstAvail ? (
                  <span className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width:42, height:42, background:"rgba(255,255,255,0.6)", color:colors.textMuted,
                      border:"1px solid rgba(255,255,255,0.9)" }}>
                    <UserIcon size={20} />
                  </span>
                ) : (
                  <span className="flex items-center justify-center rounded-full flex-shrink-0 font-semibold text-white text-sm"
                    style={{ width:42, height:42, background: prov.color || colors.primary }}>
                    {prov.initials}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight" style={{ color: isSelected ? colors.primary : colors.textDark }}>{prov.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>{prov.specialty}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {!isFirstAvail && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: colors.textMuted }}>
                        <MapPin size={11} /> {prov.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs font-medium" style={{ color: colors.success }}>
                      <Clock size={11} /> Next: {prov.next}
                    </span>
                  </div>
                </div>
                {isSelected && <Check size={16} className="flex-shrink-0" style={{ color: colors.primary }} />}
              </div>
            </OptionCard>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 3: Visit format ── */
function FormatStep({ value, onSelect }) {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Choose how you would like to meet with your provider.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {formats.map((fmt) => {
          const IconComp = fmt.icon;
          const isSelected = value?.id === fmt.id;
          return (
            <OptionCard key={fmt.id} selected={isSelected} onClick={() => onSelect(fmt)}>
              <div className="flex flex-col gap-3 p-1">
                <span className="flex items-center justify-center rounded-xl self-start"
                  style={{ width:44, height:44,
                    background: isSelected ? "rgba(42,157,255,0.15)" : "rgba(255,255,255,0.6)",
                    color: isSelected ? colors.primary : colors.textMuted }}>
                  <IconComp size={22} />
                </span>
                <div>
                  <p className="font-semibold text-sm" style={{ color: isSelected ? colors.primary : colors.textDark }}>{fmt.label}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: colors.textMuted }}>{fmt.desc}</p>
                </div>
                {isSelected && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 self-start"
                    style={{ background:"rgba(42,157,255,0.1)", color:colors.primary, border:`1px solid rgba(42,157,255,0.25)` }}>
                    <Check size={10} /> Selected
                  </span>
                )}
              </div>
            </OptionCard>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 4: Location ── */
function LocationStep({ value, onSelect }) {
  return (
    <div>
      <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Choose a clinic location that is convenient for you.</p>
      <div className="flex flex-col gap-2.5">
        {locations.map((loc) => {
          const isSelected = value?.id === loc.id;
          return (
            <OptionCard key={loc.id} selected={isSelected} onClick={() => onSelect(loc)}>
              <div className="flex items-start gap-3.5">
                <span className="flex items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                  style={{ width:38, height:38,
                    background: isSelected ? "rgba(42,157,255,0.15)" : "rgba(255,255,255,0.6)",
                    color: isSelected ? colors.primary : colors.textMuted }}>
                  <BuildingIcon size={18} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm leading-tight" style={{ color: isSelected ? colors.primary : colors.textDark }}>{loc.name}</p>
                  <p className="text-xs mt-1" style={{ color: colors.textMuted }}>{loc.address}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-xs font-medium" style={{ color: colors.success }}>{loc.distance} away</span>
                    <span className="text-xs" style={{ color: colors.textMuted }}>{loc.parking}</span>
                  </div>
                </div>
                {isSelected && <Check size={16} className="flex-shrink-0" style={{ color: colors.primary }} />}
              </div>
            </OptionCard>
          );
        })}
      </div>
    </div>
  );
}

/* ── Step 5: Date & time ── */
function DateTimeStep({ date, time, onDateSelect, onTimeSelect }) {
  const dateRefs = useRef({});
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div>
      {/* Date selector */}
      <p className="text-sm font-medium mb-3" style={{ color: colors.textDark }}>Select a date</p>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth:"none" }}>
        {availableDates.map((d) => {
          const key = d.toISOString().split("T")[0];
          const isSelected = date?.toISOString().split("T")[0] === key;
          return (
            <button key={key}
              ref={el => dateRefs.current[key] = el}
              onClick={() => onDateSelect(d)}
              className="flex-shrink-0 flex flex-col items-center rounded-xl px-3.5 py-2.5 transition-all duration-150 focus:outline-none focus-visible:ring-2"
              style={isSelected ? glassSelected : glass}
              aria-pressed={isSelected}
              aria-label={`${dayNames[d.getDay()]} ${monthNames[d.getMonth()]} ${d.getDate()}`}>
              <span className="text-xs font-medium" style={{ color: isSelected ? colors.primary : colors.textMuted }}>
                {dayNames[d.getDay()]}
              </span>
              <span className="text-lg font-bold leading-tight mt-0.5" style={{ color: isSelected ? colors.primary : colors.textDark }}>
                {d.getDate()}
              </span>
              <span className="text-xs" style={{ color: isSelected ? colors.primary : colors.textMuted }}>
                {monthNames[d.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="mt-6">
        {date ? (
          <>
            <p className="text-sm font-medium mb-3" style={{ color: colors.textDark }}>Available times</p>
            {/* Morning */}
            <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: colors.textMuted }}>Morning</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
              {morningSlots.map((slot) => {
                const isUnavail = unavailableSlots.has(slot);
                const isSelected = time === slot;
                return (
                  <button key={slot} disabled={isUnavail} onClick={() => onTimeSelect(slot)}
                    className="rounded-xl py-2 px-2 text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2"
                    style={isUnavail
                      ? { background:"rgba(255,255,255,0.25)", border:"1px solid rgba(255,255,255,0.5)", color:colors.textMuted, opacity:0.4, cursor:"not-allowed" }
                      : isSelected ? glassSelected
                      : glass}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavail}>
                    <span style={{ color: isSelected ? colors.primary : isUnavail ? colors.textMuted : colors.textDark }}>{slot}</span>
                  </button>
                );
              })}
            </div>
            {/* Afternoon */}
            <p className="text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: colors.textMuted }}>Afternoon</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {afternoonSlots.map((slot) => {
                const isUnavail = unavailableSlots.has(slot);
                const isSelected = time === slot;
                return (
                  <button key={slot} disabled={isUnavail} onClick={() => onTimeSelect(slot)}
                    className="rounded-xl py-2 px-2 text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2"
                    style={isUnavail
                      ? { background:"rgba(255,255,255,0.25)", border:"1px solid rgba(255,255,255,0.5)", color:colors.textMuted, opacity:0.4, cursor:"not-allowed" }
                      : isSelected ? glassSelected
                      : glass}
                    aria-pressed={isSelected}
                    aria-disabled={isUnavail}>
                    <span style={{ color: isSelected ? colors.primary : isUnavail ? colors.textMuted : colors.textDark }}>{slot}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-xl py-6 text-center"
            style={{ background:"rgba(255,255,255,0.3)", border:"1px solid rgba(255,255,255,0.6)" }}>
            <CalendarIcon size={28} style={{ color: colors.textMuted, margin:"0 auto 8px" }} />
            <p className="text-sm" style={{ color: colors.textMuted }}>Select a date above to see available times.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Step 6: Review ── */
function ReviewStep({ booking, format, onConfirm }) {
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const rows = [
    { label: "Care type",    value: booking.careType?.label,       icon: ScopeIcon    },
    { label: "Provider",     value: booking.provider?.name,        icon: UserIcon     },
    { label: "Visit format", value: booking.format?.label,         icon: VideoIcon    },
    ...(format?.id === "inperson" ? [{ label:"Location", value:booking.location?.name, icon:BuildingIcon }] : []),
    { label: "Date",
      value: booking.date ? `${dayNames[booking.date.getDay()]}, ${monthNames[booking.date.getMonth()]} ${booking.date.getDate()}, 2026` : null,
      icon: CalendarIcon },
    { label: "Time",         value: booking.time,                  icon: Clock        },
  ];

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: colors.textMuted }}>Review your appointment details before confirming.</p>
      <div className="rounded-2xl overflow-hidden mb-5" style={{ border:"1px solid rgba(255,255,255,0.7)" }}>
        {rows.map((row, i) => {
          const IconComp = row.icon;
          return (
            <div key={row.label}
              className="flex items-center gap-3.5 px-5 py-3.5"
              style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.5)" : "none" }}>
              <span className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{ width:30, height:30, background:"rgba(255,255,255,0.5)", color:colors.primary }}>
                <IconComp size={15} />
              </span>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide mb-0.5" style={{ color:colors.textMuted }}>{row.label}</p>
                <p className="text-sm font-medium" style={{ color:colors.textDark }}>{row.value || "—"}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Estimated visit length note */}
      <div className="flex items-center gap-2.5 rounded-xl px-4 py-3 mb-5"
        style={{ background:"rgba(42,157,255,0.07)", border:"1px solid rgba(42,157,255,0.2)" }}>
        <Clock size={15} style={{ color:colors.primary, flexShrink:0 }} />
        <p className="text-xs" style={{ color:colors.textDark }}>
          <span className="font-medium">Estimated visit length:</span> 30–45 minutes. You will receive a confirmation and reminder by email.
        </p>
      </div>
      {/* Confirm button */}
      <button onClick={onConfirm}
        className="w-full rounded-2xl py-4 font-semibold text-white text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-lg hover:shadow-xl"
        style={{ background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
        Confirm appointment
      </button>
    </div>
  );
}

/* ── Appointment summary panel (desktop sticky, mobile inline) ── */
function AppointmentSummary({ booking, format, currentStep }) {
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const summaryRows = [
    { label:"Care type",   value:booking.careType?.label,  icon:ScopeIcon,    filled:!!booking.careType    },
    { label:"Provider",    value:booking.provider?.name,   icon:UserIcon,     filled:!!booking.provider    },
    { label:"Format",      value:booking.format?.label,    icon:VideoIcon,    filled:!!booking.format      },
    ...(format?.id === "inperson" ? [{ label:"Location", value:booking.location?.name, icon:BuildingIcon, filled:!!booking.location }] : []),
    { label:"Date",
      value:booking.date ? `${dayNames[booking.date.getDay()]} ${monthNames[booking.date.getMonth()]} ${booking.date.getDate()}` : null,
      icon:CalendarIcon, filled:!!booking.date },
    { label:"Time",        value:booking.time,             icon:Clock,        filled:!!booking.time        },
  ];

  const filledCount = summaryRows.filter(r => r.filled).length;

  return (
    <aside className="rounded-2xl overflow-hidden" style={{ ...glass }}>
      <div className="px-5 pt-5 pb-4" style={{ borderBottom:"1px solid rgba(255,255,255,0.5)" }}>
        <h2 className="font-semibold text-sm" style={{ color:colors.textDark }}>Appointment summary</h2>
        <p className="text-xs mt-0.5" style={{ color:colors.textMuted }}>
          {filledCount === 0 ? "Your selections will appear here." : `${filledCount} of ${summaryRows.length} details added`}
        </p>
        {/* Progress bar */}
        <div className="mt-3 rounded-full overflow-hidden" style={{ height:4, background:"rgba(255,255,255,0.4)" }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width:`${(filledCount/summaryRows.length)*100}%`,
              background:`linear-gradient(90deg, ${colors.primary}, #5BB8FF)` }} />
        </div>
      </div>
      <div className="px-5 py-4 flex flex-col gap-3">
        {summaryRows.map((row) => {
          const IconComp = row.icon;
          return (
            <div key={row.label} className="flex items-center gap-3">
              <span className="flex items-center justify-center rounded-lg flex-shrink-0"
                style={{ width:28, height:28,
                  background: row.filled ? "rgba(42,157,255,0.12)" : "rgba(255,255,255,0.45)",
                  color: row.filled ? colors.primary : colors.textMuted }}>
                <IconComp size={13} />
              </span>
              <div className="min-w-0">
                <p className="text-xs" style={{ color:colors.textMuted }}>{row.label}</p>
                <p className="text-xs font-medium truncate"
                  style={{ color: row.filled ? colors.textDark : colors.textMuted, opacity: row.filled ? 1 : 0.5 }}>
                  {row.value || "Not selected"}
                </p>
              </div>
              {row.filled && <Check size={13} className="ml-auto flex-shrink-0" style={{ color:colors.success }} />}
            </div>
          );
        })}
      </div>
      {/* Estimated duration note */}
      {booking.careType && (
        <div className="mx-5 mb-5 rounded-xl px-3.5 py-2.5"
          style={{ background:"rgba(103,197,154,0.1)", border:"1px solid rgba(103,197,154,0.25)" }}>
          <p className="text-xs" style={{ color:colors.textDark }}>
            <span className="font-medium" style={{ color:colors.success }}>Est. duration:</span>{" "}
            30–45 minutes
          </p>
        </div>
      )}
    </aside>
  );
}

/* ── Confirmed screen ── */
function ConfirmedScreen({ booking, onReset, onNavigate }) {
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <div className="flex items-center justify-center rounded-full mb-5"
        style={{ width:72, height:72, background:`rgba(103,197,154,0.15)`, border:`2px solid rgba(103,197,154,0.35)` }}>
        <CheckCircle size={36} style={{ color:colors.success }} />
      </div>
      <h1 className="font-semibold mb-2" style={{ color:colors.textDark, fontSize:24 }}>Your appointment is confirmed</h1>
      <p className="text-sm mb-6" style={{ color:colors.textMuted, maxWidth:380 }}>
        A confirmation has been sent to your email. You can view or manage this appointment from the Appointments page.
      </p>
      <div className="rounded-2xl w-full max-w-sm mb-8 text-left" style={{ ...glass }}>
        <div className="px-5 py-4 flex flex-col gap-3">
          {[
            { label:"Care type",   value:booking.careType?.label },
            { label:"Provider",    value:booking.provider?.name  },
            { label:"Format",      value:booking.format?.label   },
            { label:"Date",        value:booking.date ? `${dayNames[booking.date.getDay()]}, ${monthNames[booking.date.getMonth()]} ${booking.date.getDate()}, 2026` : null },
            { label:"Time",        value:booking.time            },
          ].filter(r => r.value).map((row,i,arr) => (
            <div key={row.label} className="flex justify-between items-center py-2"
              style={{ borderBottom: i < arr.length-1 ? "1px solid rgba(255,255,255,0.5)" : "none" }}>
              <span className="text-xs font-medium" style={{ color:colors.textMuted }}>{row.label}</span>
              <span className="text-xs font-semibold" style={{ color:colors.textDark }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={() => onNavigate("home")}
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all"
          style={{ background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
          Back to home
        </button>
        <button onClick={onReset}
          className="rounded-xl px-5 py-2.5 text-sm font-medium transition-all"
          style={{ ...glass, color:colors.textDark }}>
          Book another visit
        </button>
      </div>
    </div>
  );
}

/* ── Support section ── */
function SupportSection() {
  return (
    <aside className="rounded-2xl px-5 py-5" style={{ ...glass }}>
      <h3 className="font-semibold text-sm mb-1" style={{ color:colors.textDark }}>Need help booking?</h3>
      <p className="text-xs leading-relaxed mb-3" style={{ color:colors.textMuted }}>
        Not sure which visit type to choose? Your care team can help you find the right option.
      </p>
      <div className="flex flex-col gap-2">
        <a href="#messages"
          className="inline-flex items-center gap-1.5 text-xs font-medium rounded-lg px-3 py-2 transition-all"
          style={{ color:colors.primary, background:"rgba(42,157,255,0.08)", border:"1px solid rgba(42,157,255,0.2)" }}
          onMouseEnter={(e)=>(e.currentTarget.style.background="rgba(42,157,255,0.14)")}
          onMouseLeave={(e)=>(e.currentTarget.style.background="rgba(42,157,255,0.08)")}>
          <MessageIcon size={13} /> Message your care team
        </a>
      </div>
      <p className="text-xs mt-4 leading-relaxed pt-4" style={{ color:colors.textMuted, borderTop:"1px solid rgba(255,255,255,0.5)" }}>
        If you need urgent medical attention, do not wait — seek care right away or call 911.
      </p>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   3D BOOKING STEPS CAROUSEL
   ───────────────────────────────────────────── */
function BookingStepsCarousel3D({
  stepFlow, stepLabels, booking, currentStep,
  isComplete, isActive, isLocked, editStep,
  handleCareType, handleProvider, handleFormat,
  handleLocation, handleDate, handleTime, handleConfirm,
}) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  useEffect(() => {
    const h = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const isMobile   = windowWidth < 768;
  const RADIUS     = isMobile ? 260 : 400;
  const PERSP      = isMobile ? 1400 : 2200;
  const stageScale = PERSP / (PERSP - RADIUS);
  const CARD_W     = isMobile ? (windowWidth - 40) / stageScale : 430;
  
  const nItems     = stepFlow.length;
  const ANGLE      = 360 / nItems;
  const activeIndex = stepFlow.indexOf(currentStep);

  const cardRefs = useRef([]);
  const [activeCardHeight, setActiveCardHeight] = useState(680);

  const TOP_MARGIN = isMobile ? 44 : 54;
  
  // Stage height calculated exactly so the perspective-projected card bottom lands
  // exactly at the stage boundary on both mobile and desktop.
  // We subtract 150px as requested to remove the anomalous gap before the step dots.
  const STAGE_H    = Math.round(TOP_MARGIN + activeCardHeight * stageScale) - 150;

  // Track the rotation as a running accumulator so transitions always go the
  // short way round and we never "wrap" through 360°.
  // When nItems changes (e.g. video vs in-person), ANGLE changes too
  const rotRef = useRef(-activeIndex * ANGLE);
  const [rotation, setRotation] = useState(rotRef.current);
  const prevIdxRef    = useRef(activeIndex);
  const prevNItemsRef = useRef(nItems);

  useEffect(() => {
    const el = cardRefs.current[activeIndex];
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.height > 0) {
          setActiveCardHeight(entry.contentRect.height);
        }
      }
    });
    observer.observe(el);
    setActiveCardHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, [activeIndex, windowWidth]);

  useEffect(() => {
    const flowChanged = prevNItemsRef.current !== nItems;
    prevNItemsRef.current = nItems;

    if (flowChanged) {
      // stepFlow length changed — discard accumulated value and snap to
      // the exact absolute angle for the new index / new ANGLE.
      const newRot = -activeIndex * ANGLE;
      rotRef.current = newRot;
      setRotation(newRot);
      prevIdxRef.current = activeIndex;
      return;
    }

    if (prevIdxRef.current === activeIndex) return;
    const delta = activeIndex - prevIdxRef.current;
    rotRef.current -= delta * ANGLE;
    setRotation(rotRef.current);
    prevIdxRef.current = activeIndex;
  }, [activeIndex, ANGLE, nItems]);

  // Opacity for each card based on its apparent angle from front.
  // — Explicitly 0 for back-hemisphere cards (fromFront ≥ 90°) so ghost
  //   completed cards never show through even if backfaceVisibility fails.
  // — Also 0 for the wrap-around "prev" at step 1 and "next" at the last
  //   step so phantom cards don't appear at the flow boundaries.
  const cardOpacity = (i) => {
    if (isMobile && i !== activeIndex) return 0;
    const wrapPrev = (activeIndex - 1 + nItems) % nItems;
    const wrapNext = (activeIndex + 1) % nItems;
    if (activeIndex === 0          && i === wrapPrev) return 0;
    if (activeIndex === nItems - 1 && i === wrapNext) return 0;
    const worldAngle = ((i * ANGLE) - (activeIndex * ANGLE) + 3600) % 360;
    const fromFront  = worldAngle > 180 ? 360 - worldAngle : worldAngle;
    if (fromFront >= 90) return 0;
    return Math.max(0.18, 1 - (fromFront / 160) * 0.85);
  };

  const canGoPrev = activeIndex > 0;
  const goPrev    = () => { if (canGoPrev) editStep(stepFlow[activeIndex - 1]); };

  const dayNames   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div style={{ position: "relative", width: "100%" }}>

      {/* ── 3D stage — header is rendered AFTER the rotating container so it
           paints on top of the 3D layer; marginTop pushes cards below header ── */}
      <div style={{
        height: STAGE_H,
        perspective: PERSP,
        perspectiveOrigin: `50% ${TOP_MARGIN}px`,
        overflow: "visible",
        position: "relative",
      }}>
        <div style={{
          height: activeCardHeight,
          marginTop: TOP_MARGIN,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotation}deg)`,
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), height 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          {stepFlow.map((stepId, i) => {
            const complete = isComplete(stepId);
            const active   = isActive(stepId);
            const locked   = isLocked(stepId);
            const opacity  = cardOpacity(i);

            return (
              <div
                ref={el => cardRefs.current[i] = el}
                key={stepId}
                onClick={!active && complete ? () => editStep(stepId) : undefined}
                style={{
                  position: "absolute",
                  width:    CARD_W,
                  height:   "auto",
                  left:     `calc(50% - ${CARD_W / 2}px)`,
                  top:      0,
                  transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px) scale(${active ? 1 : 0.85})`,
                  opacity,
                  cursor:   !active && complete ? "pointer" : "default",
                  transition: "opacity 0.35s, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  backfaceVisibility:       "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* ── Header: lives in the card's 3D space, above the glass card ── */}
                {active && (
                  <div className="flex items-start gap-3"
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      marginBottom: isMobile ? 14 : 24,
                      left: 0,
                      width: CARD_W,
                    }}>
                    {canGoPrev && (
                      <button
                        onClick={goPrev}
                        className="flex-shrink-0 flex items-center justify-center rounded-lg transition-all focus:outline-none focus-visible:ring-2"
                        style={{ width: 30, height: 30, color: colors.textMuted, background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.85)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = colors.textDark; e.currentTarget.style.background = "rgba(255,255,255,0.8)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.background = "rgba(255,255,255,0.55)"; }}
                        aria-label="Go back to previous step"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    )}
                    <span className="flex-shrink-0 flex items-center justify-center rounded-full w-7 h-7 text-xs font-bold"
                      style={{ background: colors.primary, color: "#fff" }}>
                      {activeIndex + 1}
                    </span>
                    <h2 className="font-semibold" style={{ color: colors.textDark, fontSize: 18, lineHeight: "25px" }}>
                      {stepLabels[currentStep]}
                    </h2>
                  </div>
                )}
                {/* Gradient fade overlay for prev/next cards — skip at flow boundaries */}
                {!active && activeIndex > 0 && i === (activeIndex - 1 + nItems) % nItems && (
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0, borderRadius: 16, zIndex: 2, pointerEvents: "none",
                    background: `linear-gradient(to right, transparent, rgba(236,238,242,0.3))`,
                  }} />
                )}
                {!active && activeIndex < nItems - 1 && i === (activeIndex + 1) % nItems && (
                  <div aria-hidden="true" style={{
                    position: "absolute", inset: 0, borderRadius: 16, zIndex: 2, pointerEvents: "none",
                    background: `linear-gradient(to right, rgba(236,238,242,0.3), transparent)`,
                  }} />
                )}
                <StepShell isLocked={locked}>
                  {complete && (
                    <CompletedSummary
                      icon={
                        stepId === "careType"  ? ScopeIcon    :
                        stepId === "provider"  ? UserIcon     :
                        stepId === "format"    ? VideoIcon    :
                        stepId === "location"  ? BuildingIcon : CalendarIcon
                      }
                      label={
                        stepId === "careType"  ? booking.careType?.label  :
                        stepId === "provider"  ? booking.provider?.name   :
                        stepId === "format"    ? booking.format?.label    :
                        stepId === "location"  ? booking.location?.name   :
                        `${booking.date
                          ? `${dayNames[booking.date.getDay()]} ${monthNames[booking.date.getMonth()]} ${booking.date.getDate()}`
                          : ""}${booking.time ? " · " + booking.time : ""}`
                      }
                    />
                  )}
                  {active && (
                    stepId === "careType"  ? <CareTypeStep  value={booking.careType}  onSelect={handleCareType}  /> :
                    stepId === "provider"  ? <ProviderStep  value={booking.provider}  onSelect={handleProvider}  /> :
                    stepId === "format"    ? <FormatStep    value={booking.format}    onSelect={handleFormat}    /> :
                    stepId === "location"  ? <LocationStep  value={booking.location}  onSelect={handleLocation}  /> :
                    stepId === "datetime"  ? <DateTimeStep  date={booking.date} time={booking.time}
                                              onDateSelect={handleDate} onTimeSelect={handleTime} /> :
                    stepId === "review"    ? <ReviewStep    booking={booking} format={booking.format}
                                              onConfirm={handleConfirm} /> :
                    null
                  )}
                </StepShell>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Step progress dots ── */}
      <div className="flex items-center justify-center gap-2" style={{ marginTop: 60, marginBottom: isMobile ? 27 : 0, position: "relative", zIndex: 10 }}>
        {stepFlow.map((stepId, i) => {
          const active    = isActive(stepId);
          const complete  = isComplete(stepId);
          return (
            <button
              key={stepId}
              onClick={complete ? () => editStep(stepId) : undefined}
              aria-label={`${active ? "Current" : complete ? "Completed" : "Upcoming"}: ${stepLabels[stepId]}`}
              style={{
                width:      active ? 28 : 8,
                height:     8,
                borderRadius: 4,
                padding:    0,
                border:     "none",
                background: active ? colors.primary : complete ? colors.success : "rgba(0,0,0,0.12)",
                transition: "all 0.3s",
                cursor:     complete ? "pointer" : "default",
                flexShrink: 0,
              }}
            />
          );
        })}
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function BookAppointmentPage({ onNavigate = () => {} }) {
  const [booking, setBooking] = useState({
    careType: null, provider: null, format: null,
    location: null, date: null,    time: null,
  });
  const [currentStep, setCurrentStep] = useState("careType");
  const [confirmed, setConfirmed] = useState(false);

  // Ordered step IDs — skip "location" for video visits
  const stepFlow = booking.format?.id === "video"
    ? ["careType","provider","format","datetime","review"]
    : ["careType","provider","format","location","datetime","review"];

  const stepLabels = {
    careType: "What type of care do you need?",
    provider: "Choose a provider",
    format:   "How would you like to visit?",
    location: "Choose a location",
    datetime: "Choose a date and time",
    review:   "Review and confirm",
  };

  const stepIndex = (id) => stepFlow.indexOf(id);
  const isComplete = (id) => stepIndex(id) < stepIndex(currentStep);
  const isActive   = (id) => id === currentStep;
  const isLocked   = (id) => stepIndex(id) > stepIndex(currentStep);

  const advance = () => {
    const idx = stepIndex(currentStep);
    if (idx < stepFlow.length - 1) setCurrentStep(stepFlow[idx + 1]);
  };

  const editStep = (id) => {
    // Clear all selections after this step
    const idx = stepFlow.indexOf(id);
    const toClear = stepFlow.slice(idx + 1);
    const cleared = { ...booking };
    const fieldMap = { careType:"careType", provider:"provider", format:"format", location:"location", datetime_date:"date", datetime_time:"time" };
    toClear.forEach(s => {
      if (s === "datetime") { cleared.date = null; cleared.time = null; }
      else cleared[s] = null;
    });
    setBooking(cleared);
    setCurrentStep(id);
  };

  const handleCareType = (ct) => { setBooking(b => ({ ...b, careType: ct })); advance(); };
  const handleProvider = (p)  => { setBooking(b => ({ ...b, provider: p  })); advance(); };
  const handleFormat   = (f)  => {
    setBooking(b => ({ ...b, format: f, location: null, date: null, time: null }));
    // advance after format selected
    const nextIdx = stepFlow.indexOf("format") + 1;
    if (f.id === "video") {
      // re-derive flow after this selection
      const newFlow = ["careType","provider","format","datetime","review"];
      setCurrentStep(newFlow[newFlow.indexOf("format") + 1]);
    } else {
      setCurrentStep("location");
    }
  };
  const handleLocation = (l)  => { setBooking(b => ({ ...b, location: l })); advance(); };
  const handleDate     = (d)  => { setBooking(b => ({ ...b, date: d, time: null })); };
  const handleTime     = (t)  => {
    setBooking(b => ({ ...b, time: t }));
    // Auto-advance to review when both date and time are set
    if (booking.date) {
      setTimeout(() => setCurrentStep("review"), 300);
    }
  };
  const handleConfirm  = ()  => setConfirmed(true);
  const handleReset    = ()  => {
    setBooking({ careType:null, provider:null, format:null, location:null, date:null, time:null });
    setCurrentStep("careType");
    setConfirmed(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: colors.bgPage, position:"relative",
      fontFamily:"Aptos, 'Avenir Next', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      color: colors.textDark, lineHeight: 1.55,
    }}>
      <BgradientAnim animationDuration={8} />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30" style={{
        background:"rgba(255,255,255,0.6)", borderBottom:"1px solid rgba(255,255,255,0.8)",
        boxShadow:"inset 0 -1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
        backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
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

        {/* Desktop sidebar — position:relative + zIndex:2 so it paints on top
             of any 3D carousel cards that bleed into this area */}
        <aside className="hidden lg:block flex-shrink-0"
          style={{ borderRight:"1px solid rgba(255,255,255,0.6)", background: colors.bgPage, position:"relative", zIndex:2 }}>
          <DesktopNav onNavigate={onNavigate} />
        </aside>

        {/* Main */}
        <main className="flex-1 px-5 lg:px-8 pt-7 pb-28 lg:pb-8" style={{ minWidth:0 }}>

          {confirmed ? (
            <ConfirmedScreen booking={booking} onReset={handleReset} onNavigate={onNavigate} />
          ) : (
            <>
              {/* Page intro */}
              <div>
                <h1 className="font-semibold mb-1" style={{ color:colors.textDark, fontSize:26 }}>Book appointment</h1>
                <p className="text-sm" style={{ color:colors.textMuted, marginBottom: 44 }}>Find the right visit and choose a time that works for you.</p>
              </div>

              {/* Two-column layout on desktop */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">

                {/* ── 3D Booking carousel ── */}
                <div className="flex-1 min-w-0 w-full mt-0">
                  <BookingStepsCarousel3D
                    stepFlow={stepFlow}
                    stepLabels={stepLabels}
                    booking={booking}
                    currentStep={currentStep}
                    isComplete={isComplete}
                    isActive={isActive}
                    isLocked={isLocked}
                    editStep={editStep}
                    handleCareType={handleCareType}
                    handleProvider={handleProvider}
                    handleFormat={handleFormat}
                    handleLocation={handleLocation}
                    handleDate={handleDate}
                    handleTime={handleTime}
                    handleConfirm={handleConfirm}
                  />
                </div>

                {/* ── Right panel (desktop) ── */}
                <div className="hidden lg:block flex-shrink-0" style={{ width: 280, position:"sticky", top:96, marginTop: 55 }}>
                  <div className="flex flex-col gap-4">
                    <AppointmentSummary booking={booking} format={booking.format} currentStep={currentStep} />
                    <SupportSection />
                  </div>
                </div>
              </div>

              {/* Mobile: support below flow */}
              <div className="lg:hidden mt-6 flex flex-col gap-4" style={{ paddingBottom: 27 }}>
                <SupportSection />
              </div>
            </>
          )}
        </main>
      </div>

      <MobileNav onNavigate={onNavigate} />
      <AIAssistant />
    </div>
  );
}
