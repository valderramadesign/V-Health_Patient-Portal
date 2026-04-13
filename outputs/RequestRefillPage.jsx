import { useState, useEffect, useRef } from "react";
import vHealthLogo from "../assets/V-Health_logo.png";

/* ─────────────────────────────────────────────
   BACKGROUND ANIMATION
   ───────────────────────────────────────────── */
function BgradientAnim({ animationDuration = 8 }) {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "oklch-anim-refill";
    if (!document.getElementById("oklch-anim-refill")) {
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
    return () => { const el = document.getElementById("oklch-anim-refill"); if (el) el.remove(); };
  }, [animationDuration]);
  return (
    <div className="oklch-gradient-bg" aria-hidden="true"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%",
        opacity: 0.15, pointerEvents: "none", zIndex: 0 }} />
  );
}

/* ─────────────────────────────────────────────
   DESIGN TOKENS
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
  errorBg:      "#FEF2F0",
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

/* ─────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────── */
const Icon = ({ children, size = 24, style = {}, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    strokeLinejoin="round" style={style} className={className} aria-hidden="true">
    {children}
  </svg>
);
const HomeIcon        = (p) => <Icon {...p}><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V14h6v7"/></Icon>;
const CalendarIcon    = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const ClipboardIcon   = (p) => <Icon {...p}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/><path d="M9 2h6v3H9z"/></Icon>;
const PillIcon        = (p) => <Icon {...p}><path d="M10.5 1.5a4.95 4.95 0 0 0-7 7l10 10a4.95 4.95 0 0 0 7-7z"/><line x1="7" y1="10" x2="14" y2="3"/></Icon>;
const MessageIcon     = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const SparkleIcon     = (p) => <Icon {...p}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></Icon>;
const BellIcon        = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const SearchIcon      = (p) => <Icon {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
const XIcon           = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
const ChevronRightIcon= (p) => <Icon {...p}><polyline points="9 18 15 12 9 6"/></Icon>;
const ChevronLeftIcon = (p) => <Icon {...p}><polyline points="15 18 9 12 15 6"/></Icon>;
const ChevronDownIcon = (p) => <Icon {...p}><polyline points="6 9 12 15 18 9"/></Icon>;
const CheckIcon       = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
const PhoneIcon       = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const MapPinIcon      = (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
const RefreshIcon     = (p) => <Icon {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Icon>;
const AlertIcon       = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
const ClockIcon       = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const SortIcon        = (p) => <Icon {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="9" y2="18"/></Icon>;

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */
const PHARMACIES = [
  { id: "pharm1", name: "Walgreens #4523", address: "1250 Market St, San Francisco, CA 94102", phone: "(415) 555-0192" },
  { id: "pharm2", name: "CVS Pharmacy",    address: "88 Valencia St, San Francisco, CA 94103",  phone: "(415) 555-0147" },
  { id: "pharm3", name: "Rite Aid",        address: "310 Castro St, San Francisco, CA 94114",   phone: "(415) 555-0183" },
];

const INITIAL_MEDICATIONS = [
  {
    id: "med1", name: "Lisinopril", strength: "10 mg",
    instructions: "Take 1 tablet by mouth once daily",
    clinician: "Dr. Sarah Chen", pharmacyId: "pharm1",
    status: "eligible", lastFilledDate: "March 12, 2026",
    refillsRemaining: 3, dueDate: "April 14, 2026",
    notes: "This medication can be requested online.",
    updatedAt: new Date("2026-03-12"),
  },
  {
    id: "med2", name: "Atorvastatin", strength: "20 mg",
    instructions: "Take 1 tablet by mouth at bedtime",
    clinician: "Dr. Sarah Chen", pharmacyId: "pharm1",
    status: "in-progress", lastFilledDate: "February 28, 2026",
    refillsRemaining: 2, dueDate: "April 10, 2026",
    notes: "Your refill request is being processed by the pharmacy.",
    updatedAt: new Date("2026-04-05"),
  },
  {
    id: "med3", name: "Metformin", strength: "500 mg",
    instructions: "Take 1 tablet by mouth twice daily with meals",
    clinician: "Dr. James Liu", pharmacyId: "pharm2",
    status: "not-eligible", lastFilledDate: "April 1, 2026",
    refillsRemaining: 5, dueDate: "May 15, 2026",
    notes: "This medication was recently filled and is not yet eligible for refill.",
    updatedAt: new Date("2026-04-01"),
  },
  {
    id: "med4", name: "Albuterol inhaler", strength: "90 mcg/actuation",
    instructions: "Inhale 2 puffs every 4–6 hours as needed for shortness of breath",
    clinician: "Dr. Priya Nair", pharmacyId: "pharm1",
    status: "eligible", lastFilledDate: "January 20, 2026",
    refillsRemaining: 1, dueDate: "April 12, 2026",
    notes: "This medication can be requested online.",
    updatedAt: new Date("2026-01-20"),
  },
  {
    id: "med5", name: "Levothyroxine", strength: "50 mcg",
    instructions: "Take 1 tablet by mouth once daily, 30–60 min before breakfast",
    clinician: "Dr. James Liu", pharmacyId: "pharm3",
    status: "not-eligible", lastFilledDate: "March 30, 2026",
    refillsRemaining: 0, dueDate: null,
    notes: "This prescription requires a care team review before refill. Contact your provider.",
    updatedAt: new Date("2026-03-30"),
  },
];

/* ─────────────────────────────────────────────
   STATUS CONFIG
   ───────────────────────────────────────────── */
const STATUS_CONFIG = {
  "eligible":          { label: "Eligible",         color: colors.success,  bg: colors.successBg },
  "in-progress":       { label: "In progress",      color: colors.primary,  bg: colors.skyTint   },
  "refill-requested":  { label: "Refill requested", color: colors.warning,  bg: colors.warningBg },
  "not-eligible":      { label: "Not eligible",     color: colors.textMuted, bg: "rgba(107,114,128,0.10)" },
};

/* ─────────────────────────────────────────────
   NAV DATA
   ───────────────────────────────────────────── */
const navItems = [
  { icon: HomeIcon,      label: "Home",            id: "home",         active: false, color: colors.orange,  bg: colors.orangeBg  },
  { icon: CalendarIcon,  label: "Appointments",    id: "appointments", active: false, color: colors.primary, bg: colors.skyTint   },
  { icon: ClipboardIcon, label: "Test Results",    id: "results",      active: false, color: colors.purple,  bg: colors.purpleBg  },
  { icon: PillIcon,      label: "Request Refills", id: "refills",      active: true,  color: colors.warning, bg: colors.warningBg },
  { icon: MessageIcon,   label: "Messages",        id: "messages",     active: false, color: colors.success, bg: colors.successBg },
];

const navRoutes = {
  home:         "home",
  appointments: "book-appointment",
  results:      "test-results",
  messages:     "messages",
};

/* ─────────────────────────────────────────────
   SHARED LAYOUT COMPONENTS
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

function HeaderSearchBar() {
  return (
    <div className="relative w-full">
      <label htmlFor="portal-search-refill" className="sr-only">Search</label>
      <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: colors.textMuted }} />
      <input id="portal-search-refill" type="search" placeholder="Search appointments, results, messages…"
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

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const suggestions = [
    "How do I request a refill online?",
    "Why is my medication not eligible?",
    "How long does a refill take?",
  ];
  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open assistant — Ask for help"
          className="fixed z-50 flex items-center gap-2 rounded-full px-5 py-3 text-white font-medium text-sm shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)`,
            bottom:"calc(env(safe-area-inset-bottom, 8px) + 80px)", right:24 }}>
          <SparkleIcon size={16} />
          <span className="hidden sm:inline">Ask for help</span>
        </button>
      )}
      {open && (
        <div className="fixed z-50 rounded-2xl overflow-hidden"
          style={{ bottom:"calc(env(safe-area-inset-bottom, 8px) + 80px)", right:24, width:320,
            ...glass, boxShadow:"0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.8)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor:"rgba(255,255,255,0.6)" }}>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center rounded-lg"
                style={{ width:28, height:28, background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
                <SparkleIcon size={14} className="text-white" />
              </span>
              <span className="font-semibold text-sm" style={{ color:colors.textDark }}>Ask for help</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant"
              className="rounded-lg p-1 focus:outline-none focus-visible:ring-2"
              style={{ color:colors.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.textDark)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.textMuted)}>
              <XIcon size={16} />
            </button>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm mb-3" style={{ color:colors.textMuted }}>How can I help with your refills?</p>
            <div className="flex flex-col gap-2 mb-3">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setQuery(s)}
                  className="text-left text-xs rounded-lg px-3 py-2 transition-all focus:outline-none focus-visible:ring-2"
                  style={{ background:colors.skyTint, color:colors.primary, border:`1px solid ${colors.primary}20` }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#D4EDFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = colors.skyTint)}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type a question…"
                className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.9)",
                  color:colors.textDark, fontFamily:"inherit" }} />
              <button aria-label="Send" className="rounded-xl px-3 py-2 text-white text-sm font-medium focus:outline-none focus-visible:ring-2"
                style={{ background:`linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}>
                <ChevronRightIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENTS
   ───────────────────────────────────────────── */

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["not-eligible"];
  return (
    <span className="inline-flex items-center flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.color}30` }}>
      {cfg.label}
    </span>
  );
}

function SummaryBar({ medications }) {
  const total      = medications.length;
  const eligible   = medications.filter(m => m.status === "eligible").length;
  const inProgress = medications.filter(m => m.status === "in-progress" || m.status === "refill-requested").length;
  const stats = [
    { label: "Active medications", value: total,      color: colors.primary, bg: colors.skyTint   },
    { label: "Eligible for refill", value: eligible,  color: colors.success, bg: colors.successBg },
    { label: "In progress",         value: inProgress, color: colors.warning, bg: colors.warningBg },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 mb-6" role="region" aria-label="Medication summary">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl px-4 py-3.5 flex flex-col gap-0.5" style={{ ...glass }}>
          <span className="text-2xl font-bold leading-none" style={{ color:s.color }}>{s.value}</span>
          <span className="text-xs leading-snug mt-1" style={{ color:colors.textMuted }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const FILTERS = [
  { id: "all",          label: "All"         },
  { id: "eligible",     label: "Eligible"    },
  { id: "in-progress",  label: "In progress" },
  { id: "not-eligible", label: "Not eligible"},
];
const SORT_OPTIONS = [
  { id: "eligible-first",   label: "Eligible first"    },
  { id: "a-z",              label: "A to Z"            },
  { id: "recently-updated", label: "Recently updated"  },
];

function SearchFilterBar({ search, onSearch, filter, onFilter, sort, onSort }) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);
  useEffect(() => {
    function handle(e) { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="relative">
        <label htmlFor="med-search" className="sr-only">Search medications</label>
        <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color:colors.textMuted }} />
        <input id="med-search" type="search" value={search} onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by medication, clinician, or pharmacy…"
          className="w-full rounded-xl py-2.5 pl-9 pr-8 text-sm outline-none transition-all"
          style={{ ...glass, color:colors.textDark, fontFamily:"inherit" }}
          onFocus={(e) => { e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}`; }}
          onBlur={(e)  => { e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
        />
        {search && (
          <button onClick={() => onSearch("")} aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 focus:outline-none focus-visible:ring-2"
            style={{ color:colors.textMuted }}>
            <XIcon size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div role="tablist" aria-label="Filter medications" className="flex gap-1 flex-1 min-w-0 overflow-x-auto">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => onFilter(f.id)}
              className="flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2"
              style={{
                background: filter === f.id ? colors.primary : glass.background,
                color:      filter === f.id ? colors.white   : colors.textMuted,
                border:     filter === f.id ? `1px solid ${colors.primary}` : glass.border,
                boxShadow:  filter === f.id ? `0 2px 8px ${colors.primary}30` : glass.boxShadow,
              }}>
              {f.label}
            </button>
          ))}
        </div>
        <div ref={sortRef} className="relative flex-shrink-0">
          <button onClick={() => setSortOpen(o => !o)} aria-expanded={sortOpen} aria-haspopup="listbox"
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2"
            style={{ ...glass, color:colors.textMuted }}>
            <SortIcon size={13} />
            <span className="hidden sm:inline">{SORT_OPTIONS.find(s => s.id === sort)?.label}</span>
            <ChevronDownIcon size={12} />
          </button>
          {sortOpen && (
            <div role="listbox" aria-label="Sort order"
              className="absolute right-0 top-full mt-1 z-20 rounded-xl overflow-hidden py-1"
              style={{ ...glass, boxShadow:"0 8px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)", minWidth:165 }}>
              {SORT_OPTIONS.map((opt) => (
                <button key={opt.id} role="option" aria-selected={sort === opt.id}
                  onClick={() => { onSort(opt.id); setSortOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs font-medium transition-colors focus:outline-none"
                  style={{ color: sort === opt.id ? colors.primary : colors.textDark,
                    background: sort === opt.id ? colors.skyTint : "transparent" }}
                  onMouseEnter={(e) => { if (sort !== opt.id) e.currentTarget.style.background="rgba(255,255,255,0.6)"; }}
                  onMouseLeave={(e) => { if (sort !== opt.id) e.currentTarget.style.background="transparent"; }}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MedicationCard({ med, isSelected, onClick }) {
  const pharmacy = PHARMACIES.find(p => p.id === med.pharmacyId);
  const cfg = STATUS_CONFIG[med.status];
  return (
    <button onClick={onClick} aria-pressed={isSelected}
      className="w-full text-left rounded-2xl px-4 py-3.5 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
      style={{
        ...glass,
        background: isSelected ? (cfg?.bg ?? glass.background) : glass.background,
        border:     isSelected ? `1px solid ${cfg?.color ?? colors.primary}30` : glass.border,
        boxShadow:  isSelected ? `0 2px 10px ${cfg?.color ?? colors.primary}20, ${glass.boxShadow}` : glass.boxShadow,
      }}
      onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.background=glassHover.background; e.currentTarget.style.boxShadow=glassHover.boxShadow; }}}
      onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.background=glass.background; e.currentTarget.style.boxShadow=glass.boxShadow; }}}
    >
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="min-w-0">
          <span className="font-semibold text-sm" style={{ color:colors.textDark }}>{med.name}</span>
          <span className="text-xs ml-1.5" style={{ color:colors.textMuted }}>{med.strength}</span>
        </div>
        <StatusBadge status={med.status} />
      </div>
      <p className="text-xs mb-2 leading-relaxed" style={{ color:colors.textMuted }}>{med.instructions}</p>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs" style={{ color:colors.textMuted }}>
        <span>{med.clinician}</span>
        {pharmacy && <span>· {pharmacy.name}</span>}
        {med.dueDate && med.status === "eligible" && (
          <span className="font-medium" style={{ color:colors.warning }}>· Due {med.dueDate}</span>
        )}
      </div>
    </button>
  );
}

function MedicationList({ medications, selectedId, onSelect }) {
  if (medications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center rounded-2xl" style={{ ...glass }}>
        <PillIcon size={32} style={{ color:colors.textMuted, marginBottom:12 }} />
        <p className="text-sm font-medium" style={{ color:colors.textMuted }}>No medications match your search.</p>
        <p className="text-xs mt-1" style={{ color:colors.textMuted }}>Try adjusting your filters or search term.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2" role="list" aria-label="Medications">
      {medications.map((med) => (
        <div key={med.id} role="listitem">
          <MedicationCard med={med} isSelected={selectedId === med.id} onClick={() => onSelect(med.id)} />
        </div>
      ))}
    </div>
  );
}

function PharmacySelector({ selectedPharmacyId, onChange }) {
  const pharmacy = PHARMACIES.find(p => p.id === selectedPharmacyId);
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ ...glass }}>
      <h3 className="text-sm font-semibold" style={{ color:colors.textDark }}>Pharmacy</h3>
      {pharmacy && (
        <div>
          <p className="text-sm font-medium" style={{ color:colors.textDark }}>{pharmacy.name}</p>
          <div className="flex items-start gap-1.5 mt-1">
            <MapPinIcon size={13} style={{ color:colors.textMuted, flexShrink:0, marginTop:2 }} />
            <p className="text-xs" style={{ color:colors.textMuted }}>{pharmacy.address}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <PhoneIcon size={13} style={{ color:colors.textMuted }} />
            <p className="text-xs" style={{ color:colors.textMuted }}>{pharmacy.phone}</p>
          </div>
        </div>
      )}
      <div>
        <label htmlFor="pharmacy-select" className="text-xs font-medium block mb-1.5" style={{ color:colors.textMuted }}>
          Change pharmacy
        </label>
        <select id="pharmacy-select" value={selectedPharmacyId} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl px-3 py-2 text-sm outline-none"
          style={{ ...glass, color:colors.textDark, fontFamily:"inherit", cursor:"pointer" }}>
          {PHARMACIES.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function RefillRequestForm({ med, pharmacyId, onPharmacyChange, onSubmit }) {
  const [confirmed, setConfirmed] = useState(false);
  const [comments, setComments] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!confirmed) return;
    onSubmit({ medId: med.id, pharmacyId, comments });
    setConfirmed(false);
    setComments("");
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Refill request form" className="flex flex-col gap-4">
      <PharmacySelector selectedPharmacyId={pharmacyId} onChange={onPharmacyChange} />

      <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ ...glass }}>
        <h3 className="text-sm font-semibold" style={{ color:colors.textDark }}>Request details</h3>
        <div>
          <label htmlFor="refill-comments" className="text-xs font-medium block mb-1.5" style={{ color:colors.textMuted }}>
            Comments <span className="font-normal">(optional)</span>
          </label>
          <textarea id="refill-comments" value={comments} onChange={(e) => setComments(e.target.value)}
            rows={3} placeholder="Any notes for your care team or pharmacy…"
            className="w-full rounded-xl px-3 py-2 text-sm outline-none resize-none"
            style={{ ...glass, color:colors.textDark, fontFamily:"inherit" }}
            onFocus={(e) => { e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}`; }}
            onBlur={(e)  => { e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
          />
        </div>
        <label className="flex items-start gap-3 cursor-pointer rounded-xl p-3 transition-colors"
          style={{ background: confirmed ? colors.successBg : "rgba(255,255,255,0.4)",
            border:`1px solid ${confirmed ? colors.success+"50" : "rgba(255,255,255,0.7)"}` }}>
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 flex-shrink-0 focus:outline-none focus-visible:ring-2" />
          <span className="text-xs leading-relaxed" style={{ color:colors.textDark }}>
            I confirm this refill request is for my current prescription and I have reviewed my medication details.
          </span>
        </label>
      </div>

      <button type="submit" disabled={!confirmed}
        className="w-full rounded-2xl py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: confirmed ? `linear-gradient(135deg, ${colors.warning}, #F59E0B)` : colors.borderGray,
          color:  confirmed ? colors.white : colors.textMuted,
          cursor: confirmed ? "pointer" : "not-allowed",
          boxShadow: confirmed ? `0 4px 16px ${colors.warning}40` : "none",
        }}>
        Request refill
      </button>
    </form>
  );
}

function SuccessConfirmation({ med, onDismiss }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col items-center text-center gap-3"
      style={{ background:colors.successBg, border:`1px solid ${colors.success}30` }}>
      <span className="flex items-center justify-center rounded-full"
        style={{ width:48, height:48, background:colors.success }}>
        <CheckIcon size={24} style={{ color:colors.white }} />
      </span>
      <div>
        <p className="font-semibold text-sm" style={{ color:colors.textDark }}>Refill requested</p>
        <p className="text-xs mt-1" style={{ color:colors.textMuted }}>
          Your refill request for <strong>{med.name} {med.strength}</strong> has been sent to the pharmacy.
          You will be notified when it is ready for pickup.
        </p>
      </div>
      <button onClick={onDismiss}
        className="rounded-xl px-4 py-2 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2"
        style={{ background:colors.success, color:colors.white }}>
        Done
      </button>
    </div>
  );
}

function DetailPanel({ med, pharmacyId, onPharmacyChange, onSubmit, successMedId, onDismissSuccess }) {
  if (!med) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl"
        style={{ ...glass, minHeight:280 }}>
        <PillIcon size={36} style={{ color:colors.textMuted, marginBottom:14 }} />
        <p className="text-sm font-medium" style={{ color:colors.textMuted }}>Select a medication to review refill options.</p>
      </div>
    );
  }

  const isEligible   = med.status === "eligible";
  const isInProgress = med.status === "in-progress" || med.status === "refill-requested";
  const justRequested = successMedId === med.id;

  return (
    <div className="flex flex-col gap-4">
      {/* Medication info card */}
      <div className="rounded-2xl p-5" style={{ ...glass }}>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="font-semibold text-base" style={{ color:colors.textDark }}>{med.name}</h2>
            <p className="text-sm" style={{ color:colors.textMuted }}>{med.strength}</p>
          </div>
          <StatusBadge status={med.status} />
        </div>

        <dl className="flex flex-col gap-3 text-sm">
          <div>
            <dt className="text-xs font-medium mb-0.5" style={{ color:colors.textMuted }}>Instructions</dt>
            <dd style={{ color:colors.textDark }}>{med.instructions}</dd>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <dt className="text-xs font-medium mb-0.5" style={{ color:colors.textMuted }}>Prescribing clinician</dt>
              <dd style={{ color:colors.textDark }}>{med.clinician}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium mb-0.5" style={{ color:colors.textMuted }}>Last filled</dt>
              <dd style={{ color:colors.textDark }}>{med.lastFilledDate}</dd>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {med.refillsRemaining > 0 && (
              <div>
                <dt className="text-xs font-medium mb-0.5" style={{ color:colors.textMuted }}>Refills remaining</dt>
                <dd style={{ color:colors.textDark }}>{med.refillsRemaining}</dd>
              </div>
            )}
            {med.dueDate && (
              <div>
                <dt className="text-xs font-medium mb-0.5" style={{ color:colors.textMuted }}>Refill due</dt>
                <dd className="font-medium" style={{ color:colors.warning }}>{med.dueDate}</dd>
              </div>
            )}
          </div>
        </dl>

        {med.notes && (
          <div className="mt-4 rounded-xl px-3 py-2.5 flex items-start gap-2"
            style={{
              background: isEligible ? colors.successBg : isInProgress ? colors.skyTint : "rgba(107,114,128,0.08)",
              border:`1px solid ${isEligible ? colors.success+"30" : isInProgress ? colors.primary+"20" : "rgba(107,114,128,0.15)"}`,
            }}>
            <AlertIcon size={14} style={{ color: isEligible ? colors.success : isInProgress ? colors.primary : colors.textMuted, flexShrink:0, marginTop:1 }} />
            <p className="text-xs" style={{ color:colors.textDark }}>{med.notes}</p>
          </div>
        )}
      </div>

      {/* Action area */}
      {justRequested ? (
        <SuccessConfirmation med={med} onDismiss={onDismissSuccess} />
      ) : isEligible ? (
        <RefillRequestForm med={med} pharmacyId={pharmacyId} onPharmacyChange={onPharmacyChange} onSubmit={onSubmit} />
      ) : isInProgress ? (
        <div className="rounded-2xl p-4 flex items-start gap-3"
          style={{ background:colors.skyTint, border:`1px solid ${colors.primary}20` }}>
          <RefreshIcon size={18} style={{ color:colors.primary, flexShrink:0, marginTop:1 }} />
          <div>
            <p className="text-sm font-medium" style={{ color:colors.textDark }}>Refill in progress</p>
            <p className="text-xs mt-0.5" style={{ color:colors.textMuted }}>
              Your refill request has been received and is being processed. Contact your pharmacy for an estimated pickup time.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl p-4 flex items-start gap-3"
          style={{ background:"rgba(107,114,128,0.06)", border:"1px solid rgba(107,114,128,0.15)" }}>
          <AlertIcon size={18} style={{ color:colors.textMuted, flexShrink:0, marginTop:1 }} />
          <div>
            <p className="text-sm font-medium" style={{ color:colors.textDark }}>Not eligible for online refill</p>
            <p className="text-xs mt-1" style={{ color:colors.textMuted }}>
              {med.notes || "This medication cannot be requested online at this time."}
            </p>
            <p className="text-xs mt-1.5" style={{ color:colors.textMuted }}>
              Contact your care team or call your pharmacy directly for assistance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function RefillStatusSection({ medications }) {
  const recent = medications.filter(m => m.status === "in-progress" || m.status === "refill-requested");
  if (recent.length === 0) return null;
  return (
    <div className="rounded-2xl p-4" style={{ ...glass }}>
      <div className="flex items-center gap-2 mb-3">
        <ClockIcon size={15} style={{ color:colors.textMuted }} />
        <h3 className="text-sm font-semibold" style={{ color:colors.textDark }}>Refill activity</h3>
      </div>
      <div className="flex flex-col">
        {recent.map((med, i) => (
          <div key={med.id} className="flex items-center justify-between gap-2 py-2.5"
            style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.6)" : "none" }}>
            <div>
              <p className="text-sm font-medium" style={{ color:colors.textDark }}>{med.name} {med.strength}</p>
              <p className="text-xs" style={{ color:colors.textMuted }}>{med.clinician}</p>
            </div>
            <StatusBadge status={med.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HelperContent() {
  return (
    <div className="rounded-2xl p-4" style={{ ...glass }}>
      <div className="flex items-center gap-2 mb-3">
        <AlertIcon size={15} style={{ color:colors.textMuted }} />
        <h3 className="text-sm font-semibold" style={{ color:colors.textDark }}>Important information</h3>
      </div>
      <ul className="flex flex-col gap-2">
        {[
          "Only medications eligible for online refill can be requested here.",
          "Some prescriptions may require a visit or care team approval.",
          "Contact your care team if you have questions about your medication.",
          "If this is a medical emergency, call 911 right away.",
        ].map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color:colors.textMuted }}>
            <span className="flex-shrink-0 rounded-full mt-1.5" style={{ width:4, height:4, background:colors.textMuted }} aria-hidden="true" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function RequestRefillPage({ onNavigate }) {
  const [medications, setMedications]   = useState(INITIAL_MEDICATIONS);
  const [selectedId,  setSelectedId]    = useState(null);
  const [search,      setSearch]        = useState("");
  const [filter,      setFilter]        = useState("all");
  const [sort,        setSort]          = useState("eligible-first");
  const [pharmacyId,  setPharmacyId]    = useState("pharm1");
  const [successMedId, setSuccessMedId] = useState(null);
  const [mobileView,  setMobileView]    = useState("list");

  // Filtered + sorted list
  const visibleMeds = (() => {
    let list = medications;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(m => {
        const ph = PHARMACIES.find(p => p.id === m.pharmacyId);
        return m.name.toLowerCase().includes(q) ||
               m.clinician.toLowerCase().includes(q) ||
               (ph && ph.name.toLowerCase().includes(q));
      });
    }
    if (filter === "in-progress") {
      list = list.filter(m => m.status === "in-progress" || m.status === "refill-requested");
    } else if (filter !== "all") {
      list = list.filter(m => m.status === filter);
    }
    if (sort === "a-z") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "recently-updated") {
      list = [...list].sort((a, b) => b.updatedAt - a.updatedAt);
    } else {
      const order = { "eligible":0, "refill-requested":1, "in-progress":1, "not-eligible":2 };
      list = [...list].sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3));
    }
    return list;
  })();

  // Always resolve selectedMed from full list so detail persists through filter changes
  const selectedMed = selectedId ? medications.find(m => m.id === selectedId) ?? null : null;

  function handleSelect(id) {
    setSelectedId(id);
    const med = medications.find(m => m.id === id);
    if (med) setPharmacyId(med.pharmacyId);
    setMobileView("detail");
  }

  function handleSubmitRefill({ medId, pharmacyId: chosenPharmacy }) {
    setMedications(prev => prev.map(m =>
      m.id === medId
        ? { ...m, status: "refill-requested", updatedAt: new Date(), pharmacyId: chosenPharmacy }
        : m
    ));
    setSuccessMedId(medId);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: colors.bgPage, position: "relative",
      fontFamily: "Aptos, 'Avenir Next', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
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
          <div className="hidden md:flex flex-1 px-6"><HeaderSearchBar /></div>
          <button aria-label="Notifications"
            className="relative p-2 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2"
            style={{ color:colors.textMuted, background:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.7)", boxShadow:"inset 0 1px 2px rgba(0,0,0,0.04)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background="rgba(255,255,255,0.7)")}
            onMouseLeave={(e) => (e.currentTarget.style.background="rgba(255,255,255,0.4)")}>
            <BellIcon size={20} />
            <span className="absolute top-1 right-1 rounded-full"
              style={{ width:8, height:8, background:colors.error, border:"1.5px solid rgba(255,255,255,0.8)" }}
              aria-label="New notifications" />
          </button>
        </div>
        <div className="md:hidden px-5 pb-3"><HeaderSearchBar /></div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block flex-shrink-0">
          <DesktopNav onNavigate={onNavigate} />
        </aside>

        {/* Main content */}
        <main className="flex-1 px-5 lg:px-8 pt-7 pb-28 lg:pb-8" style={{ minWidth:0 }}>

          {/* Page title */}
          <div className="mb-6">
            <h1 className="font-semibold mb-1" style={{ color:colors.textDark, fontSize:26 }}>Request a refill</h1>
            <p className="text-sm" style={{ color:colors.textMuted }}>Review eligible medications and request a refill.</p>
          </div>

          {/* Summary bar */}
          <SummaryBar medications={medications} />

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start">

            {/* Left: search, filter, list */}
            <div className={`min-w-0 ${mobileView === "detail" ? "hidden lg:block" : "block"}`}
              style={{ flex:"0 0 auto", width:"100%", maxWidth:460 }}>
              <SearchFilterBar
                search={search} onSearch={setSearch}
                filter={filter} onFilter={setFilter}
                sort={sort}     onSort={setSort}
              />
              <MedicationList
                medications={visibleMeds}
                selectedId={visibleMeds.find(m => m.id === selectedId) ? selectedId : null}
                onSelect={handleSelect}
              />
            </div>

            {/* Right: detail panel */}
            <div className={`flex-1 min-w-0 ${mobileView === "list" ? "hidden lg:block" : "block"}`}>
              {mobileView === "detail" && (
                <button onClick={() => setMobileView("list")}
                  className="lg:hidden flex items-center gap-1.5 mb-4 text-sm font-medium focus:outline-none focus-visible:ring-2"
                  style={{ color:colors.primary }}>
                  <ChevronLeftIcon size={16} />
                  Back to medications
                </button>
              )}
              <div className="flex flex-col gap-4" style={{ position:"sticky", top:96 }}>
                <DetailPanel
                  med={selectedMed}
                  pharmacyId={pharmacyId}
                  onPharmacyChange={setPharmacyId}
                  onSubmit={handleSubmitRefill}
                  successMedId={successMedId}
                  onDismissSuccess={() => setSuccessMedId(null)}
                />
                <RefillStatusSection medications={medications} />
                <HelperContent />
              </div>
            </div>
          </div>
        </main>
      </div>

      <MobileNav onNavigate={onNavigate} />
      <AIAssistant />
    </div>
  );
}
