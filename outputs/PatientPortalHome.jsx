import { useState, useEffect } from "react";
import { Search, X, ChevronRight, Video, Send } from "lucide-react";
import mariaAvatar from "../assets/maria_avatar.png";

/* ─────────────────────────────────────────────
   BACKGROUND ANIMATION
   Soft oklch gradient cycle — rendered at 15% opacity
   Adapted from soft-gradient-background-animation
   ───────────────────────────────────────────── */
function BgradientAnim({ animationDuration = 8 }) {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @property --hue1 {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      @property --hue2 {
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
      }
      .oklch-gradient-bg {
        background-image:
          linear-gradient(
            in oklch longer hue to right,
            oklch(0.95 0.07 var(--hue1) / 60%),
            oklch(0.92 0.08 var(--hue2) / 60%)
          ),
          linear-gradient(
            in oklch longer hue to bottom,
            oklch(0.95 0.07 var(--hue1) / 60%),
            oklch(0.92 0.08 var(--hue2) / 60%)
          );
        background-size: 100% 100%;
        animation: anim_bg ${animationDuration}s linear infinite;
      }
      @keyframes anim_bg {
        0%   { --hue1: 30deg;  --hue2: 180deg; }
        100% { --hue1: 390deg; --hue2: 540deg; }
      }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, [animationDuration]);

  return (
    <div
      className="oklch-gradient-bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.15,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
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

/*
   Shared concave glass surface style.
   Semi-transparent white, white outline border, subtle inset shadow.
*/
const glass = {
  background:   "rgba(255,255,255,0.55)",
  border:       "1px solid rgba(255,255,255,0.85)",
  boxShadow:    "inset 0 2px 4px rgba(0,0,0,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.5), 0 0.5px 0 rgba(255,255,255,0.7)",
  backdropFilter:       "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

const glassHover = {
  background:   "rgba(255,255,255,0.72)",
  boxShadow:    "inset 0 2px 4px rgba(0,0,0,0.04), inset 0 0 0 0.5px rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.08)",
};


/* ─────────────────────────────────────────────
   ICON COMPONENTS
   ───────────────────────────────────────────── */
const Icon = ({ children, size = 24, className = "", style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size}
    viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className={className} style={style} aria-hidden="true"
  >
    {children}
  </svg>
);

const HomeIcon     = (p) => <Icon {...p}><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V14h6v7"/></Icon>;
const CalendarIcon = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const ClipboardIcon= (p) => <Icon {...p}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/><path d="M9 2h6v3H9z"/></Icon>;
const PillIcon     = (p) => <Icon {...p}><path d="M10.5 1.5a4.95 4.95 0 0 0-7 7l10 10a4.95 4.95 0 0 0 7-7z"/><line x1="7" y1="10" x2="14" y2="3"/></Icon>;
const MessageIcon  = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const SparkleIcon  = (p) => <Icon {...p}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></Icon>;
const ClockIcon    = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const BellIcon     = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */
const patient = { firstName: "Maria" };

const updates = [
  { id: "appt",    icon: CalendarIcon,  accent: colors.primary, accentBg: colors.skyTint,   label: "Upcoming appointment", title: "Dr. Sarah Chen — Primary care visit",  detail: "Tomorrow, April 9 · 2:00 PM",        action: "View details",      tag: null    },
  { id: "video",   icon: Video,         accent: colors.success, accentBg: colors.successBg, label: "Video visit",          title: "Your video visit is ready to join",    detail: "Dr. James Liu · Starts at 3:30 PM",   action: "Join video visit",  tag: "Live"  },
  { id: "results", icon: ClipboardIcon, accent: colors.purple,  accentBg: colors.purpleBg,  label: "New test result",      title: "A new lab result is ready to review",  detail: "Complete blood count · Posted today",  action: "View results",      tag: "New"   },
  { id: "message", icon: MessageIcon,   accent: colors.primary, accentBg: colors.skyTint,   label: "Unread message",       title: "You have a new message from your care team", detail: "Dr. Chen's office · Sent 2 hours ago", action: "Read message", tag: "1 new" },
  { id: "refill",  icon: PillIcon,      accent: colors.warning, accentBg: colors.warningBg, label: "Refill reminder",      title: "Your prescription is ready to renew",  detail: "Lisinopril 10 mg · Refill by April 12", action: "Renew prescription", tag: null },
];

const quickActions = [
  { icon: CalendarIcon,  label: "Book appointment",   color: colors.primary, bg: colors.skyTint,   route: "book-appointment" },
  { icon: ClipboardIcon, label: "View results",       color: colors.purple,  bg: colors.purpleBg,  route: "test-results" },
  { icon: PillIcon,      label: "Renew prescription", color: colors.warning, bg: colors.warningBg, route: "refill-request" },
  { icon: MessageIcon,   label: "Message care team",  color: colors.success, bg: colors.successBg, route: "messages" },
];

const navItems = [
  { icon: HomeIcon,      label: "Home",            id: "home",         active: true,  color: colors.orange,  bg: colors.orangeBg  },
  { icon: CalendarIcon,  label: "Appointments",    id: "appointments", active: false, color: colors.primary, bg: colors.skyTint   },
  { icon: ClipboardIcon, label: "Test Results",    id: "results",      active: false, color: colors.purple,  bg: colors.purpleBg  },
  { icon: PillIcon,      label: "Request Refills", id: "refills",      active: false, color: colors.warning, bg: colors.warningBg },
  { icon: MessageIcon,   label: "Messages",        id: "messages",     active: false, color: colors.success, bg: colors.successBg, badge: 1 },
];

/* ─────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────── */

/* ── Logo ── */
function Logo() {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}
      >
        <span className="text-white font-bold text-sm leading-none" aria-hidden="true">V</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-sm tracking-wide" style={{ color: colors.textDark }}>VALDERRAMA</span>
        <span className="text-xs tracking-widest -mt-0.5" style={{ color: colors.textMuted }}>HEALTH</span>
      </div>
    </div>
  );
}

/* ── Search bar (concave glass) ── */
function SearchBar() {
  return (
    <div className="relative w-full">
      <label htmlFor="portal-search" className="sr-only">Search appointments, results, messages, and more</label>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: colors.textMuted }} aria-hidden="true" />
      <input
        id="portal-search"
        type="search"
        placeholder="Search appointments, results, messages…"
        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
        style={{
          ...glass,
          color: colors.textDark,
          fontFamily: "inherit",
        }}
        onFocus={(e) => {
          e.target.style.background = "rgba(255,255,255,0.85)";
          e.target.style.border     = `1px solid ${colors.primary}`;
          e.target.style.boxShadow  = `0 0 0 3px ${colors.skyTint}, inset 0 1px 2px rgba(0,0,0,0.04)`;
        }}
        onBlur={(e) => {
          e.target.style.background = glass.background;
          e.target.style.border     = glass.border;
          e.target.style.boxShadow  = glass.boxShadow;
        }}
      />
    </div>
  );
}

/* ── Patient avatar ── */
function Avatar({ size = 40 }) {
  return (
    <img
      src={mariaAvatar}
      alt="Maria's profile photo"
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: "2px solid rgba(255,255,255,0.8)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
    />
  );
}

const navRoutes = { appointments: "book-appointment", messages: "messages", results: "test-results", refills: "refill-request" };

/* ── Mobile bottom navigation (glass) ── */
function MobileNav({ onNavigate }) {
  return (
    <nav
      aria-label="Main navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch justify-around"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 -2px 10px rgba(0,0,0,0.06)",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      {navItems.map((item) => {
        const IconComp = item.icon;
        const isActive = item.active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "page" : undefined}
            onClick={navRoutes[item.id] ? (e) => { e.preventDefault(); onNavigate(navRoutes[item.id]); } : undefined}
            className="relative flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 flex-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
            style={{ color: isActive ? item.color : colors.textMuted, minHeight: 56 }}
          >
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
                style={{ width: 24, height: 3, background: item.color }}
                aria-hidden="true"
              />
            )}
            <span className="relative">
              <IconComp size={20} />
              {item.badge && (
                <span
                  className="absolute -top-1 -right-1.5 flex items-center justify-center rounded-full text-white"
                  style={{ width: 15, height: 15, fontSize: 9, fontWeight: 600, background: colors.error }}
                  aria-label={`${item.badge} unread`}
                >
                  {item.badge}
                </span>
              )}
            </span>
            <span className="font-medium leading-tight" style={{ fontSize: 10 }}>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ── Welcome header ── */
function WelcomeHeader() {
  return (
    <section aria-label="Welcome" className="flex items-center gap-4">
      <Avatar size={52} />
      <div>
        <h1 className="font-semibold leading-snug" style={{ color: colors.textDark, fontSize: 26 }}>
          Welcome back, {patient.firstName}
        </h1>
        <p className="text-sm mt-0.5" style={{ color: colors.textMuted }}>
          Here is what needs your attention today.
        </p>
      </div>
    </section>
  );
}


/* ── Pill-style action button (glass) ── */
function PillButton({ href, color, children }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2"
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05), 0 0.5px 0 rgba(255,255,255,0.6)",
        color: colors.textMuted,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.78)";
        e.currentTarget.style.color      = color;
        e.currentTarget.style.border     = `1px solid ${color}50`;
        e.currentTarget.style.boxShadow  = `0 2px 8px ${color}15, inset 0 1px 2px rgba(0,0,0,0.03)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.5)";
        e.currentTarget.style.color      = colors.textMuted;
        e.currentTarget.style.border     = "1px solid rgba(255,255,255,0.85)";
        e.currentTarget.style.boxShadow  = "inset 0 1px 2px rgba(0,0,0,0.05), 0 0.5px 0 rgba(255,255,255,0.6)";
      }}
    >
      {children}
      <ChevronRight size={13} aria-hidden="true" />
    </a>
  );
}

/* ── Update card (glass) ── */
function UpdateCard({ item }) {
  const IconComp = item.icon;
  return (
    <article
      className="group flex items-start gap-4 rounded-2xl p-5 transition-all duration-200 focus-within:ring-2"
      style={{
        ...glass,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = glassHover.background;
        e.currentTarget.style.boxShadow  = glassHover.boxShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = glass.background;
        e.currentTarget.style.boxShadow  = glass.boxShadow;
      }}
    >
      {/* Icon */}
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-xl mt-0.5"
        style={{ width: 44, height: 44, background: item.accentBg, color: item.accent }}
      >
        <IconComp size={22} />
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium uppercase tracking-wide" style={{ color: item.accent }}>
            {item.label}
          </span>
          {item.tag && (
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 font-semibold"
              style={{
                background: `${item.accent}15`,
                border: `1px solid ${item.accent}30`,
                color: item.accent,
                fontSize: 11,
              }}
            >
              {item.tag}
            </span>
          )}
        </div>
        <h3 className="font-medium mt-1 leading-snug" style={{ color: colors.textDark, fontSize: 15 }}>
          {item.title}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: colors.textMuted }}>
          {item.detail}
        </p>
        <div className="mt-3">
          <PillButton href={`#${item.id}`} color={item.accent}>
            {item.action}
          </PillButton>
        </div>
      </div>
    </article>
  );
}

/* ── Quick actions grid (glass cards) ── */
function QuickActions({ onNavigate }) {
  return (
    <section aria-label="Quick actions">
      <h2 className="sr-only">Quick actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((qa) => {
          const IconComp = qa.icon;
          return (
            <button
              key={qa.label}
              onClick={() => qa.route && onNavigate(qa.route)}
              className="group flex flex-col items-center justify-center gap-2.5 rounded-2xl py-5 px-3 transition-all duration-200 focus:outline-none focus-visible:ring-2"
              style={{
                ...glass,
                color: colors.textDark,
                cursor: qa.route ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = glassHover.background;
                e.currentTarget.style.boxShadow  = glassHover.boxShadow;
                e.currentTarget.style.border      = `1px solid rgba(255,255,255,0.95)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = glass.background;
                e.currentTarget.style.boxShadow  = glass.boxShadow;
                e.currentTarget.style.border      = glass.border;
              }}
            >
              <span
                className="flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, background: qa.bg, color: qa.color }}
              >
                <IconComp size={22} />
              </span>
              <span className="text-sm font-medium text-center leading-tight">{qa.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ── Latest updates section ── */
function LatestUpdates() {
  return (
    <section aria-label="Latest updates">
      <div className="flex items-center gap-2 mb-4">
        <BellIcon size={17} style={{ color: colors.textMuted }} />
        <h2 className="font-semibold" style={{ color: colors.textDark, fontSize: 17 }}>Latest updates</h2>
      </div>
      <div className="flex flex-col gap-3">
        {updates.map((item) => (
          <UpdateCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ── AI assistant launcher & panel ── */
function AIAssistant() {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");

  const suggestions = [
    "Where can I find my latest test results?",
    "How do I renew a prescription?",
    "When is my next appointment?",
  ];

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open assistant — Ask for help"
          className="fixed z-50 flex items-center gap-2 rounded-full px-5 py-3 text-white font-medium text-sm shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)`,
            bottom: "calc(env(safe-area-inset-bottom, 8px) + 80px)",
            right: 24,
          }}
        >
          <SparkleIcon size={18} />
          <span className="hidden sm:inline">Ask for help</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Health assistant"
          className="fixed z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background:   "rgba(255,255,255,0.7)",
            border:       "1px solid rgba(255,255,255,0.9)",
            boxShadow:    "inset 0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            bottom:       "calc(env(safe-area-inset-bottom, 8px) + 80px)",
            right:        24,
            width:        "min(380px, calc(100vw - 48px))",
            maxHeight:    "min(520px, calc(100vh - 160px))",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.6)" }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="flex items-center justify-center rounded-xl"
                style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)` }}
              >
                <SparkleIcon size={17} className="text-white" />
              </span>
              <div>
                <h2 className="font-semibold text-sm" style={{ color: colors.textDark }}>Health assistant</h2>
                <p style={{ color: colors.textMuted, fontSize: 12 }}>Ask a question about your portal</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="p-1.5 rounded-lg transition-colors focus:outline-none focus-visible:ring-2"
              style={{ color: colors.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {/* Greeting bubble — glass */}
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: colors.textDark }}>
                Hi {patient.firstName}, how can I help you today? I can help you find results,
                messages, appointments, and medications.
              </p>
            </div>

            <p className="text-xs font-medium mb-2.5" style={{ color: colors.textMuted }}>Suggested questions</p>
            <div className="flex flex-col gap-2 mb-5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="text-left text-sm rounded-xl px-3.5 py-2.5 transition-all focus:outline-none focus-visible:ring-2"
                  style={{
                    background: "rgba(255,255,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                    color: colors.textDark,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(42,157,255,0.08)";
                    e.currentTarget.style.border     = `1px solid ${colors.primary}40`;
                    e.currentTarget.style.color       = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.border     = "1px solid rgba(255,255,255,0.8)";
                    e.currentTarget.style.color       = colors.textDark;
                  }}
                  onClick={() => setQuery(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Disclaimer */}
            <p
              className="text-xs leading-relaxed rounded-lg p-3"
              style={{
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(255,255,255,0.6)",
                color: colors.textMuted,
              }}
            >
              This assistant can help you use the portal and answer general questions.
              It does not provide medical advice or replace your care team.
              If you are having a medical emergency, call 911 right away.
            </p>
          </div>

          {/* Input bar — glass */}
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.6)" }}
          >
            <label htmlFor="ai-input" className="sr-only">Type a question</label>
            <input
              id="ai-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 text-sm outline-none rounded-lg px-3 py-1.5"
              style={{
                background: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
                color: colors.textDark,
              }}
            />
            <button
              aria-label="Send question"
              className="flex items-center justify-center rounded-xl p-2 transition-colors focus:outline-none focus-visible:ring-2"
              style={{ background: query ? colors.primary : "rgba(255,255,255,0.45)", color: query ? "#fff" : colors.textMuted }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   MAIN HOMEPAGE
   ───────────────────────────────────────────── */
export default function PatientPortalHome({ onNavigate = () => {} }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:  colors.bgPage,
        fontFamily:  "Aptos, 'Avenir Next', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        color:       colors.textDark,
        lineHeight:  1.55,
        position:    "relative",
      }}
    >
      {/* ── BACKGROUND ANIMATION (15% opacity, behind all content) ── */}
      <BgradientAnim animationDuration={8} />

      {/* ── HEADER (glass bar) ── */}
      <header
        className="sticky top-0 z-30"
        style={{
          background:   "rgba(255,255,255,0.6)",
          borderBottom: "1px solid rgba(255,255,255,0.8)",
          boxShadow:    "inset 0 -1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-5 lg:px-8 py-3.5">
          <Logo />
          <div className="hidden md:flex flex-1 px-6">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2"
              style={{
                color: colors.textMuted,
                background: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.4)")}
            >
              <BellIcon size={20} />
              <span
                className="absolute top-1 right-1 rounded-full"
                style={{ width: 8, height: 8, background: colors.error, border: "1.5px solid rgba(255,255,255,0.8)" }}
                aria-label="New notifications"
              />
            </button>
          </div>
        </div>
        <div className="md:hidden px-5 pb-3">
          <SearchBar />
        </div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">

        {/* Main content */}
        <main
          className="flex-1 px-5 lg:px-8 pt-7 pb-28 lg:pb-8"
          style={{ maxWidth: 820, margin: "0 auto" }}
        >
          <div className="flex flex-col gap-8 lg:gap-10">

            <WelcomeHeader />

            {/* Reminder banner (glass) */}
            <div
              className="flex items-center gap-3 rounded-xl px-5 py-3.5"
              role="status"
              style={{
                ...glass,
              }}
            >
              <ClockIcon size={18} style={{ color: colors.primary, flexShrink: 0 }} />
              <p className="text-sm" style={{ color: colors.textDark }}>
                <span className="font-medium">Reminder:</span> Complete check-in before your appointment tomorrow at 2:00 PM.
              </p>
              <a
                href="#checkin"
                className="ml-auto text-sm font-medium whitespace-nowrap focus:outline-none focus-visible:ring-2 rounded-lg px-3 py-1.5 transition-all"
                style={{
                  color: colors.primary,
                  background: "rgba(42,157,255,0.1)",
                  border: `1px solid rgba(42,157,255,0.3)`,
                  boxShadow: "inset 0 1px 2px rgba(42,157,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(42,157,255,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(42,157,255,0.1)";
                }}
              >
                Start check-in
              </a>
            </div>

            <QuickActions onNavigate={onNavigate} />
            <LatestUpdates />

          </div>
        </main>
      </div>

      <MobileNav onNavigate={onNavigate} />
      <AIAssistant />
    </div>
  );
}
