import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, ChevronLeft, Check } from "lucide-react";
import vHealthLogo from "../assets/V-Health_logo.png";

/* ─────────────────────────────────────────────
   BACKGROUND ANIMATION  (matches other pages)
   ───────────────────────────────────────────── */
function BgradientAnim({ animationDuration = 8 }) {
  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.id = "oklch-anim-results";
    if (!document.getElementById("oklch-anim-results")) {
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
    return () => { const el = document.getElementById("oklch-anim-results"); if (el) el.remove(); };
  }, [animationDuration]);
  return (
    <div className="oklch-gradient-bg" aria-hidden="true"
      style={{ position:"fixed", inset:0, width:"100%", height:"100%",
        opacity:0.15, pointerEvents:"none", zIndex:0 }} />
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
   STATUS CONFIGS
   ───────────────────────────────────────────── */
const resultStatusConfig = {
  "new":           { label: "New",           color: colors.primaryDark, bg: colors.skyTint },
  "normal":        { label: "Normal",        color: "#2D9F6E",          bg: colors.successBg },
  "outside-range": { label: "Outside range", color: "#C85500",          bg: "rgba(200,85,0,0.10)" },
  "reviewed":      { label: "Reviewed",      color: colors.textMuted,   bg: "rgba(255,255,255,0.6)" },
};

const compStatusConfig = {
  "normal": { label: "Normal", color: "#2D9F6E", bg: "#EEFBF3",                  symbol: "→" },
  "high":   { label: "High",   color: "#C85500", bg: "rgba(200,85,0,0.08)",       symbol: "↑" },
  "low":    { label: "Low",    color: "#9A7D2A", bg: "rgba(154,125,42,0.09)",     symbol: "↓" },
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
const HomeIcon       = (p) => <Icon {...p}><path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V14h6v7"/></Icon>;
const CalendarIcon   = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
const ClipboardIcon  = (p) => <Icon {...p}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/><path d="M9 2h6v3H9z"/></Icon>;
const PillIcon       = (p) => <Icon {...p}><path d="M10.5 1.5a4.95 4.95 0 0 0-7 7l10 10a4.95 4.95 0 0 0 7-7z"/><line x1="7" y1="10" x2="14" y2="3"/></Icon>;
const MessageIcon    = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const SparkleIcon    = (p) => <Icon {...p}><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></Icon>;
const BellIcon       = (p) => <Icon {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Icon>;
const SendIcon       = (p) => <Icon {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></Icon>;
const DownloadIcon   = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
const FlaskIcon      = (p) => <Icon {...p}><path d="M9 3h6l1 7H8L9 3z"/><path d="M8 10c0 5 8 5 8 0"/><line x1="5" y1="21" x2="19" y2="21"/><path d="M8 10l-3 11h14l-3-11"/></Icon>;
const ImageIcon      = (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></Icon>;
const InboxIcon      = (p) => <Icon {...p}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></Icon>;
const ChevronDownIcon= (p) => <Icon {...p}><polyline points="6 9 12 15 18 9"/></Icon>;
const ClockIcon      = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
const UserIcon       = (p) => <Icon {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Icon>;
const AlertIcon      = (p) => <Icon {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>;
const HistoryIcon    = (p) => <Icon {...p}><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></Icon>;

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */
const mockResults = [
  {
    id: "r1",
    name: "Complete Blood Count (CBC)",
    category: "Lab",
    collectionDate: "Apr 8, 2026",
    collectionDateSort: new Date(2026, 3, 8),
    reportedDate: "Apr 9, 2026",
    clinician: "Dr. Sarah Lee",
    status: "outside-range",
    isNew: true,
    shortPreview: "WBC slightly elevated at 11.2 K/µL",
    clinicianNote: "Your white blood cell count is mildly elevated. This can be a normal response to a minor infection or stress. Please monitor and let us know if you develop a fever, unusual fatigue, or other new symptoms.",
    interpretationSummary: "Most values in this panel are within the expected normal range. Your white blood cell count (WBC) is slightly above the upper limit, which may reflect a minor infection or temporary stress response.",
    followUp: "Message your care team if you develop fever, significant fatigue, or other new symptoms.",
    components: [
      { name: "White Blood Cells (WBC)", value: "11.2", unit: "K/µL",  range: "4.5–11.0",   status: "high"   },
      { name: "Red Blood Cells (RBC)",   value: "4.8",  unit: "M/µL",  range: "4.2–5.4",    status: "normal" },
      { name: "Hemoglobin",              value: "14.2", unit: "g/dL",  range: "12.0–17.5",  status: "normal" },
      { name: "Hematocrit",              value: "42.1", unit: "%",     range: "36.0–48.0",  status: "normal" },
      { name: "Platelets",               value: "245",  unit: "K/µL",  range: "150–400",    status: "normal" },
      { name: "MCV",                     value: "88",   unit: "fL",    range: "80–100",     status: "normal" },
    ],
  },
  {
    id: "r2",
    name: "Cholesterol Panel (Lipid Panel)",
    category: "Lab",
    collectionDate: "Apr 8, 2026",
    collectionDateSort: new Date(2026, 3, 8),
    reportedDate: "Apr 9, 2026",
    clinician: "Dr. Sarah Lee",
    status: "normal",
    isNew: true,
    shortPreview: "All values within normal range",
    interpretationSummary: "All values in this lipid panel are within the expected normal range. Your cardiovascular risk markers look healthy.",
    components: [
      { name: "Total Cholesterol",     value: "178", unit: "mg/dL", range: "<200",  status: "normal" },
      { name: "LDL (Bad) Cholesterol", value: "108", unit: "mg/dL", range: "<130",  status: "normal" },
      { name: "HDL (Good) Cholesterol",value: "52",  unit: "mg/dL", range: ">40",   status: "normal" },
      { name: "Triglycerides",         value: "88",  unit: "mg/dL", range: "<150",  status: "normal" },
      { name: "Non-HDL Cholesterol",   value: "126", unit: "mg/dL", range: "<160",  status: "normal" },
    ],
    priorValues: [
      { date: "Jan 2026", value: "180 mg/dL" },
      { date: "Oct 2025", value: "192 mg/dL" },
      { date: "Jul 2025", value: "188 mg/dL" },
    ],
  },
  {
    id: "r3",
    name: "Hemoglobin A1C",
    category: "Lab",
    collectionDate: "Apr 8, 2026",
    collectionDateSort: new Date(2026, 3, 8),
    reportedDate: "Apr 9, 2026",
    clinician: "Dr. Sarah Lee",
    status: "outside-range",
    isNew: false,
    shortPreview: "5.8% — slightly above normal range",
    clinicianNote: "Your A1C is 5.8%, which is slightly above the normal range and falls in the pre-diabetic category. I recommend reducing refined sugars and increasing daily activity. Please schedule a follow-up in 3 months so we can track your progress.",
    interpretationSummary: "Your A1C level is slightly above the normal range. This may indicate early changes in how your body manages blood sugar.",
    followUp: "Schedule a follow-up visit to discuss a blood sugar monitoring plan and dietary adjustments.",
    components: [
      { name: "Hemoglobin A1C", value: "5.8", unit: "%", range: "<5.7", status: "high" },
    ],
    priorValues: [
      { date: "Jan 2026", value: "5.6%" },
      { date: "Aug 2025", value: "5.5%" },
      { date: "Mar 2025", value: "5.4%" },
    ],
  },
  {
    id: "r4",
    name: "Chest X-Ray",
    category: "Imaging",
    collectionDate: "Mar 22, 2026",
    collectionDateSort: new Date(2026, 2, 22),
    reportedDate: "Mar 23, 2026",
    clinician: "Dr. Emily Park",
    status: "normal",
    isNew: false,
    shortPreview: "No acute abnormality detected",
    interpretationSummary: "This imaging result shows no significant abnormalities. Your lungs and heart appear healthy.",
    narrativeSummary: "Frontal and lateral chest X-rays were obtained. The lungs are clear without focal consolidation, pleural effusion, or pneumothorax. The cardiomediastinal silhouette is within normal limits. Bony structures are unremarkable.",
    impression: "No acute cardiopulmonary abnormality.",
  },
  {
    id: "r5",
    name: "Vitamin D (25-OH)",
    category: "Lab",
    collectionDate: "Mar 22, 2026",
    collectionDateSort: new Date(2026, 2, 22),
    reportedDate: "Mar 24, 2026",
    clinician: "Dr. Sarah Lee",
    status: "outside-range",
    isNew: false,
    shortPreview: "22 ng/mL — below normal range",
    clinicianNote: "Your vitamin D is lower than ideal. We recommend supplementing with 2,000 IU of vitamin D3 daily — available over the counter. We will recheck your levels in about 3 months.",
    interpretationSummary: "Your vitamin D level is below the normal reference range. Low vitamin D is common and is usually manageable with daily supplementation.",
    followUp: "Begin vitamin D3 supplement (2,000 IU daily). Your care team will recheck levels in 3 months.",
    components: [
      { name: "Vitamin D, 25-Hydroxy", value: "22", unit: "ng/mL", range: "30–100", status: "low" },
    ],
    priorValues: [
      { date: "Sep 2025", value: "28 ng/mL" },
      { date: "Mar 2025", value: "26 ng/mL" },
    ],
  },
];

/* ─────────────────────────────────────────────
   NAV DATA
   ───────────────────────────────────────────── */
const navItems = [
  { icon: HomeIcon,      label: "Home",            id: "home",         active: false, color: colors.orange,  bg: colors.orangeBg  },
  { icon: CalendarIcon,  label: "Appointments",    id: "appointments", active: false, color: colors.primary, bg: colors.skyTint   },
  { icon: ClipboardIcon, label: "Test Results",    id: "results",      active: true,  color: colors.purple,  bg: colors.purpleBg  },
  { icon: PillIcon,      label: "Request Refills", id: "refills",      active: false, color: colors.warning, bg: colors.warningBg },
  { icon: MessageIcon,   label: "Messages",        id: "messages",     active: false, color: colors.success, bg: colors.successBg, badge: 2 },
];

const navRoutes = {
  home:         "home",
  appointments: "book-appointment",
  messages:     "messages",
  refills:      "refill-request",
};

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

function PageSearchBar() {
  return (
    <div className="relative w-full">
      <label htmlFor="portal-search-results" className="sr-only">Search</label>
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color:colors.textMuted }} aria-hidden="true" />
      <input id="portal-search-results" type="search" placeholder="Search appointments, results, messages…"
        className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
        style={{ ...glass, color:colors.textDark, fontFamily:"inherit" }}
        onFocus={(e)=>{ e.target.style.background="rgba(255,255,255,0.85)"; e.target.style.border=`1px solid ${colors.primary}`; e.target.style.boxShadow=`0 0 0 3px ${colors.skyTint}, inset 0 1px 2px rgba(0,0,0,0.04)`; }}
        onBlur={(e) =>{ e.target.style.background=glass.background; e.target.style.border=glass.border; e.target.style.boxShadow=glass.boxShadow; }}
      />
    </div>
  );
}

function DesktopNav({ onNavigate }) {
  return (
    <nav aria-label="Main navigation" className="hidden lg:flex flex-col gap-1 pt-8 pb-6 px-4" style={{ width:210 }}>
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
            onMouseEnter={(e)=>{ if (!isActive) { e.currentTarget.style.background=glassHover.background; e.currentTarget.style.boxShadow=glassHover.boxShadow; e.currentTarget.style.border=`1px solid rgba(255,255,255,0.95)`; }}}
            onMouseLeave={(e)=>{ if (!isActive) { e.currentTarget.style.background=glass.background; e.currentTarget.style.boxShadow=glass.boxShadow; e.currentTarget.style.border=glass.border; }}}
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
            style={{ color: isActive ? item.color : colors.textMuted, minHeight:56 }}>
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
    "What does 'outside range' mean?",
    "How do I read my lab results?",
    "When should I contact my care team?",
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
                <p style={{ color:colors.textMuted, fontSize:12 }}>Ask about your results</p>
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
              style={{ background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.8)" }}>
              <p className="text-sm leading-relaxed" style={{ color:colors.textDark }}>
                Hi! I can help explain what your results mean, what reference ranges are, and when to reach out to your care team.
              </p>
            </div>
            <p className="text-xs font-medium mb-2.5" style={{ color:colors.textMuted }}>Suggested questions</p>
            <div className="flex flex-col gap-2 mb-5">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setQuery(s)}
                  className="text-left text-sm rounded-xl px-3.5 py-2.5 transition-all focus:outline-none"
                  style={{ background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.8)", color:colors.textDark }}
                  onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(42,157,255,0.08)"; e.currentTarget.style.color=colors.primary; }}
                  onMouseLeave={(e)=>{ e.currentTarget.style.background="rgba(255,255,255,0.45)"; e.currentTarget.style.color=colors.textDark; }}>
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed rounded-lg p-3"
              style={{ background:"rgba(0,0,0,0.04)", color:colors.textMuted }}>
              This assistant does not provide medical advice. If you are having a medical emergency, call 911 right away.
            </p>
          </div>
          <div className="px-4 py-3 flex items-center gap-2" style={{ borderTop:"1px solid rgba(255,255,255,0.6)" }}>
            <label htmlFor="ai-input-results" className="sr-only">Type a question</label>
            <input id="ai-input-results" type="text" value={query} onChange={(e)=>setQuery(e.target.value)}
              placeholder="Ask a question…" className="flex-1 text-sm outline-none rounded-lg px-3 py-1.5"
              style={{ background:"rgba(255,255,255,0.45)", border:"1px solid rgba(255,255,255,0.8)", color:colors.textDark }} />
            <button aria-label="Send"
              className="flex items-center justify-center rounded-xl p-2"
              style={{ background:query ? colors.primary:"rgba(255,255,255,0.45)", color:query ? "#fff":colors.textMuted }}>
              <SendIcon size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   RESULTS LIST COMPONENTS
   ───────────────────────────────────────────── */

function StatusBadge({ status }) {
  const cfg = resultStatusConfig[status] ?? resultStatusConfig["reviewed"];
  return (
    <span className="inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-1"
      style={{ background: cfg.bg, color: cfg.color }}>
      {status === "outside-range" && <AlertIcon size={10} style={{ marginRight: 3, flexShrink: 0 }} />}
      {status === "normal" && <Check size={10} strokeWidth={3} style={{ marginRight: 3, flexShrink: 0 }} />}
      {cfg.label}
    </span>
  );
}

function CategoryChip({ category }) {
  const iconMap = { Lab: FlaskIcon, Imaging: ImageIcon };
  const IconComp = iconMap[category] ?? ClipboardIcon;
  return (
    <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5"
      style={{ background: "rgba(255,255,255,0.5)", color: colors.textMuted,
        border: "1px solid rgba(255,255,255,0.8)" }}>
      <IconComp size={10} /> {category}
    </span>
  );
}

function ResultCard({ result, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left px-4 py-4 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
      style={{
        background: isSelected
          ? "rgba(42,157,255,0.08)"
          : hovered ? "rgba(255,255,255,0.45)" : "transparent",
        borderBottom: "1px solid rgba(255,255,255,0.4)",
        borderLeft: isSelected ? `3px solid ${colors.primary}` : "3px solid transparent",
      }}
      aria-current={isSelected ? "true" : undefined}
      aria-label={`${result.isNew ? "New: " : ""}${result.name} — ${result.status}`}
    >
      {/* Top row: name + status */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-sm leading-snug"
          style={{ color: isSelected ? colors.primary : colors.textDark,
            fontWeight: result.isNew ? 700 : 500 }}>
          {result.name}
        </span>
        <span className="flex-shrink-0 mt-0.5"><StatusBadge status={result.status} /></span>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <CategoryChip category={result.category} />
        <span className="text-xs" style={{ color: colors.textMuted }}>
          {result.collectionDate}
        </span>
        {result.isNew && (
          <span className="w-2 h-2 rounded-full flex-shrink-0" role="img" aria-label="New result"
            style={{ background: colors.primary }} />
        )}
      </div>

      {/* Preview */}
      <p className="text-xs leading-snug truncate" style={{ color: colors.textMuted }}>
        {result.shortPreview}
      </p>

      {/* Clinician */}
      <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
        {result.clinician}
      </p>
    </button>
  );
}

function ResultsSummaryBar({ results }) {
  const total       = results.length;
  const newCount    = results.filter((r) => r.isNew).length;
  const outOfRange  = results.filter((r) => r.status === "outside-range").length;

  const stats = [
    { label: "Total results",  value: total,      color: colors.primary  },
    { label: "New",            value: newCount,   color: colors.success  },
    { label: "Outside range",  value: outOfRange, color: colors.warning  },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6" role="region" aria-label="Results summary">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl px-4 py-3.5 flex flex-col gap-0.5" style={{ ...glass }}>
          <span className="text-2xl font-bold leading-none" style={{ color: s.color }}>{s.value}</span>
          <span className="text-xs leading-snug mt-1" style={{ color: colors.textMuted }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function ResultsListPanel({
  results, allResults, selectedId, onSelect,
  statusFilter, onStatusFilterChange,
  categoryFilter, onCategoryFilterChange,
  search, onSearchChange,
  sort, onSortChange,
}) {
  const filterTabs = [
    { id: "all",           label: "All"           },
    { id: "new",           label: "New"           },
    { id: "normal",        label: "Normal"        },
    { id: "outside-range", label: "Outside range" },
  ];

  const categories = [...new Set(allResults.map((r) => r.category))];

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Summary stats */}
      <div className="px-4 pt-4 pb-0 flex-shrink-0">
        <ResultsSummaryBar results={allResults} />
      </div>

      {/* Search + controls */}
      <div className="px-4 pb-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: colors.textMuted }} />
          <label htmlFor="results-search" className="sr-only">Search results</label>
          <input
            id="results-search"
            type="search"
            placeholder="Search by name, category, or clinician…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl py-2 pl-9 pr-8 text-xs outline-none transition-all"
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
        <div className="flex gap-1.5 overflow-x-auto mb-2.5" role="tablist" aria-label="Filter by status"
          style={{ scrollbarWidth: "none" }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={statusFilter === tab.id}
              onClick={() => onStatusFilterChange(tab.id)}
              className="flex-shrink-0 text-xs font-medium rounded-lg px-3 py-1.5 transition-all focus:outline-none focus-visible:ring-2"
              style={statusFilter === tab.id
                ? { ...glassSelected, color: colors.primary }
                : { ...glass, color: colors.textMuted }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category + sort row */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <div className="relative">
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => onCategoryFilterChange(e.target.value)}
                className="w-full rounded-xl pl-3 pr-7 py-1.5 text-xs outline-none appearance-none cursor-pointer"
                style={{ ...glass, color: categoryFilter ? colors.textDark : colors.textMuted, fontFamily:"inherit" }}>
                <option value="">All categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDownIcon size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: colors.textMuted }} />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="results-sort" className="sr-only">Sort results</label>
            <div className="relative">
              <select
                id="results-sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full rounded-xl pl-3 pr-7 py-1.5 text-xs outline-none appearance-none cursor-pointer"
                style={{ ...glass, color: colors.textDark, fontFamily:"inherit" }}>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
              <ChevronDownIcon size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: colors.textMuted }} />
            </div>
          </div>
        </div>
      </div>

      {/* Results list */}
      <div className="flex-1 overflow-y-auto" role="list" aria-label="Test results">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <InboxIcon size={28} style={{ color: colors.textMuted, marginBottom: 10 }} />
            <p className="text-sm font-medium" style={{ color: colors.textDark }}>
              {search || statusFilter !== "all" || categoryFilter ? "No results match your search" : "No test results yet"}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: colors.textMuted }}>
              {search || statusFilter !== "all" || categoryFilter
                ? "Try adjusting your search or filters."
                : "Your test results will appear here when they are available."}
            </p>
          </div>
        ) : (
          results.map((result) => (
            <div key={result.id} role="listitem">
              <ResultCard
                result={result}
                isSelected={result.id === selectedId}
                onClick={() => onSelect(result.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Safety footer */}
      <div className="px-4 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.2)" }}>
        <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
          Some results may appear before your care team reviews them.{" "}
          <strong>Reference ranges may vary by lab.</strong>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RESULT DETAIL COMPONENTS
   ───────────────────────────────────────────── */

function ComponentRow({ comp, isLast }) {
  const cfg = compStatusConfig[comp.status] ?? compStatusConfig["normal"];
  const isAbnormal = comp.status !== "normal";
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3"
      style={{
        background: isAbnormal ? cfg.bg : "rgba(255,255,255,0.3)",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.5)",
      }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-snug" style={{ color: colors.textDark }}>{comp.name}</p>
        <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
          Reference: {comp.range} {comp.unit}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-right">
          <p className="text-sm font-bold" style={{ color: isAbnormal ? cfg.color : colors.textDark }}>
            {comp.value}
          </p>
          <p className="text-xs" style={{ color: colors.textMuted }}>{comp.unit}</p>
        </div>
        <span className="flex items-center gap-0.5 text-xs font-semibold rounded-full px-2.5 py-1"
          style={{ background: cfg.bg, color: cfg.color, border: isAbnormal ? `1px solid ${cfg.color}30` : "none" }}
          aria-label={`${comp.name}: ${cfg.label}`}>
          {cfg.symbol} {cfg.label}
        </span>
      </div>
    </div>
  );
}

function PriorValuesSection({ priorValues }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ ...glass }}>
      <div className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
        <HistoryIcon size={14} style={{ color: colors.primary }} />
        <h3 className="font-semibold text-sm" style={{ color: colors.textDark }}>Prior values</h3>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2.5">
        {priorValues.map((pv, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: colors.textMuted }}>{pv.date}</span>
            <span className="text-xs font-semibold" style={{ color: colors.textDark }}>{pv.value}</span>
          </div>
        ))}
        <p className="text-xs mt-1 pt-2" style={{ color: colors.textMuted, borderTop: "1px solid rgba(255,255,255,0.5)" }}>
          Historical reference ranges may vary by lab.
        </p>
      </div>
    </div>
  );
}

function ResultDetailPanel({ result, onBack, onNavigate }) {
  const detailTopRef = useRef(null);
  const [downloadState, setDownloadState] = useState("idle"); // "idle" | "loading" | "done"

  // Scroll to top when result changes
  useEffect(() => {
    detailTopRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [result?.id]);

  const handleDownload = () => {
    setDownloadState("loading");
    setTimeout(() => {
      setDownloadState("done");
      setTimeout(() => setDownloadState("idle"), 2500);
    }, 1200);
  };

  // Empty state
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center"
        role="region" aria-label="Result detail">
        <div className="flex items-center justify-center rounded-2xl mb-4"
          style={{ width:56, height:56, background:"rgba(42,157,255,0.08)", border:"1px solid rgba(42,157,255,0.15)" }}>
          <ClipboardIcon size={26} style={{ color: colors.primary }} />
        </div>
        <p className="font-semibold text-sm mb-1" style={{ color: colors.textDark }}>
          Select a result to review details
        </p>
        <p className="text-xs leading-relaxed" style={{ color: colors.textMuted, maxWidth: 240 }}>
          Choose a result from the list to see full details, reference ranges, and any notes from your care team.
        </p>
      </div>
    );
  }

  const statusCfg = resultStatusConfig[result.status] ?? resultStatusConfig["reviewed"];
  const isLab     = !!result.components;
  const isImaging = !!result.narrativeSummary;

  return (
    <div className="flex flex-col h-full min-h-0" role="region" aria-label={`Result: ${result.name}`}>

      {/* Detail header */}
      <div className="px-4 sm:px-6 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.5)" }}>
        {/* Back — mobile only */}
        <button onClick={onBack} aria-label="Back to results list"
          className="lg:hidden flex items-center gap-1 text-xs font-medium rounded-lg px-2.5 py-2 mb-3 focus:outline-none focus-visible:ring-2 transition-all"
          style={{ color: colors.primary, background: "rgba(42,157,255,0.08)",
            border: "1px solid rgba(42,157,255,0.2)" }}>
          <ChevronLeft size={14} /> Back to results
        </button>

        <div className="flex items-start gap-3">
          {/* Category icon */}
          <div className="flex-shrink-0 flex items-center justify-center rounded-xl mt-0.5"
            style={{ width:40, height:40,
              background: result.status === "outside-range" ? "rgba(200,85,0,0.1)" : "rgba(42,157,255,0.08)",
              color: result.status === "outside-range" ? "#C85500" : colors.primary }}>
            {isImaging ? <ImageIcon size={20} /> : <FlaskIcon size={20} />}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base leading-snug" style={{ color: colors.textDark }}>
              {result.name}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <StatusBadge status={result.status} />
              <CategoryChip category={result.category} />
            </div>
          </div>
        </div>

        {/* Date + clinician meta */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { icon: ClockIcon, label: "Collected",  value: result.collectionDate },
            { icon: ClockIcon, label: "Reported",   value: result.reportedDate   },
            { icon: UserIcon,  label: "Ordered by", value: result.clinician       },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.6)" }}>
              <row.icon size={13} style={{ color: colors.primary, flexShrink: 0 }} />
              <div className="min-w-0">
                <p className="text-xs" style={{ color: colors.textMuted }}>{row.label}</p>
                <p className="text-xs font-semibold truncate" style={{ color: colors.textDark }}>{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div ref={detailTopRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-5"
        style={{ minHeight: 0 }}>

        {/* ── Lab result: component table ── */}
        {isLab && result.components?.length > 0 && (
          <section aria-label="Test components">
            <h3 className="font-semibold text-sm mb-2" style={{ color: colors.textDark }}>
              Result values
            </h3>
            <div className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.7)" }}>
              {result.components.map((comp, i) => (
                <ComponentRow
                  key={comp.name}
                  comp={comp}
                  isLast={i === result.components.length - 1}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Imaging: narrative + impression ── */}
        {isImaging && (
          <section aria-label="Imaging summary">
            <h3 className="font-semibold text-sm mb-2" style={{ color: colors.textDark }}>Findings</h3>
            <div className="rounded-2xl px-4 py-4 mb-3"
              style={{ ...glass }}>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDark }}>
                {result.narrativeSummary}
              </p>
            </div>
            {result.impression && (
              <div className="rounded-xl px-4 py-3 flex items-start gap-2.5"
                style={{ background: colors.successBg, border: "1px solid rgba(103,197,154,0.3)" }}>
                <Check size={15} strokeWidth={2.5} style={{ color: colors.success, flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: colors.success }}>Impression</p>
                  <p className="text-sm" style={{ color: colors.textDark }}>{result.impression}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ── Interpretation ── */}
        {result.interpretationSummary && (
          <section aria-label="Plain-language interpretation">
            <h3 className="font-semibold text-sm mb-2" style={{ color: colors.textDark }}>
              What this means
            </h3>
            <div className="rounded-2xl px-4 py-4"
              style={{
                background: result.status === "outside-range"
                  ? "rgba(200,85,0,0.06)"
                  : "rgba(103,197,154,0.06)",
                border: result.status === "outside-range"
                  ? "1px solid rgba(200,85,0,0.18)"
                  : "1px solid rgba(103,197,154,0.2)",
              }}>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDark }}>
                {result.interpretationSummary}
              </p>
              <p className="text-xs mt-2" style={{ color: colors.textMuted }}>
                Reference ranges can vary by lab and by patient. Your care team can give you more context.
              </p>
            </div>
          </section>
        )}

        {/* ── Clinician note ── */}
        {result.clinicianNote && (
          <section aria-label="Clinician note">
            <h3 className="font-semibold text-sm mb-2" style={{ color: colors.textDark }}>
              Note from your care team
            </h3>
            <div className="rounded-2xl px-4 py-4"
              style={{ background: "rgba(42,157,255,0.06)", border: "1px solid rgba(42,157,255,0.18)" }}>
              <div className="flex items-center gap-2 mb-2">
                <UserIcon size={13} style={{ color: colors.primary }} />
                <span className="text-xs font-semibold" style={{ color: colors.primary }}>
                  {result.clinician}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDark }}>
                {result.clinicianNote}
              </p>
            </div>
          </section>
        )}

        {/* ── Follow-up guidance ── */}
        {result.followUp && (
          <div className="rounded-xl px-4 py-3 flex items-start gap-2.5"
            style={{ background: colors.warningBg, border: "1px solid rgba(244,196,106,0.4)" }}>
            <AlertIcon size={14} style={{ color: "#9A7D2A", flexShrink: 0, marginTop: 1 }} />
            <div>
              <p className="text-xs font-semibold mb-0.5" style={{ color: "#9A7D2A" }}>Recommended follow-up</p>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDark }}>{result.followUp}</p>
            </div>
          </div>
        )}

        {/* ── Prior values ── */}
        {result.priorValues?.length > 0 && (
          <section aria-label="Prior values">
            <PriorValuesSection priorValues={result.priorValues} />
          </section>
        )}

        {/* ── Safety notice ── */}
        <div className="rounded-xl px-4 py-3"
          style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <p className="text-xs leading-relaxed" style={{ color: colors.textMuted }}>
            If you have questions about this result, message your care team. If this is a medical emergency,
            do not wait — call <strong>911</strong> right away.
          </p>
        </div>
      </div>

      {/* ── Action footer ── */}
      <div className="px-4 sm:px-6 py-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.2)" }}>
        <button
          onClick={() => onNavigate("messages")}
          className="flex items-center gap-2 text-sm font-semibold rounded-xl px-4 py-2.5 text-white transition-all focus:outline-none focus-visible:ring-2"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, #5BB8FF)`,
            boxShadow: "0 2px 8px rgba(42,157,255,0.25)" }}>
          <MessageIcon size={15} /> Message care team
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 transition-all focus:outline-none focus-visible:ring-2"
          style={{ ...glass, color: downloadState === "done" ? colors.success : colors.textDark }}>
          {downloadState === "loading" && (
            <span className="text-xs" style={{ color: colors.textMuted }}>Preparing…</span>
          )}
          {downloadState === "done" && (
            <><Check size={14} strokeWidth={2.5} /> Saved</>
          )}
          {downloadState === "idle" && (
            <><DownloadIcon size={14} /> Download</>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function TestResultsPage({ onNavigate = () => {} }) {
  const [results,        setResults]        = useState(mockResults);
  const [selectedId,     setSelectedId]     = useState(null);
  const [statusFilter,   setStatusFilter]   = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search,         setSearch]         = useState("");
  const [sort,           setSort]           = useState("newest");
  const [mobilePanel,    setMobilePanel]    = useState("list"); // "list" | "detail"

  // Derived: filtered + sorted list
  const filteredResults = useMemo(() => {
    let list = [...results];

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter((r) => {
        if (statusFilter === "new")           return r.isNew;
        if (statusFilter === "normal")        return r.status === "normal";
        if (statusFilter === "outside-range") return r.status === "outside-range";
        return true;
      });
    }

    // Category filter
    if (categoryFilter) {
      list = list.filter((r) => r.category === categoryFilter);
    }

    // Search
    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter((r) =>
        r.name.toLowerCase().includes(q)      ||
        r.category.toLowerCase().includes(q)  ||
        r.clinician.toLowerCase().includes(q) ||
        r.shortPreview.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) =>
      sort === "newest"
        ? b.collectionDateSort - a.collectionDateSort
        : a.collectionDateSort - b.collectionDateSort
    );

    return list;
  }, [results, statusFilter, categoryFilter, search, sort]);

  // If selected result is filtered out, clear selection
  const selectedResult = filteredResults.find((r) => r.id === selectedId) ?? null;

  const handleSelect = (id) => {
    setSelectedId(id);
    // Optionally mark as no longer "new" when opened
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isNew: false } : r))
    );
    setMobilePanel("detail");
  };

  const handleStatusFilterChange = (f) => {
    setStatusFilter(f);
    // If selected result no longer visible after filter, reset
    if (selectedId) {
      const stillVisible = filteredResults.some((r) => r.id === selectedId);
      if (!stillVisible) setSelectedId(null);
    }
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
          <div className="hidden md:flex flex-1 px-6"><PageSearchBar /></div>
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
        <div className="md:hidden px-5 pb-3"><PageSearchBar /></div>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 max-w-screen-xl mx-auto w-full">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block flex-shrink-0"
          style={{ borderRight:"1px solid rgba(255,255,255,0.6)" }}>
          <DesktopNav onNavigate={onNavigate} />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col px-5 lg:px-8 pt-7 pb-28 lg:pb-8" style={{ minWidth: 0 }}>

          {/* Page intro */}
          <div className="mb-5 flex-shrink-0">
            <h1 className="font-semibold mb-1" style={{ color: colors.textDark, fontSize: 24 }}>
              Test results
            </h1>
            <p className="text-sm" style={{ color: colors.textMuted }}>
              Review your latest lab and diagnostic results.
            </p>
          </div>

          {/* Two-panel results area */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1" style={{ minHeight: 560 }}>

            {/* ── Left: Results list ── */}
            <div
              className={`${mobilePanel === "detail" ? "hidden lg:flex" : "flex"} flex-col w-full lg:w-96 flex-shrink-0 rounded-2xl overflow-hidden`}
              style={{ ...glass, minHeight: 500 }}>
              <ResultsListPanel
                results={filteredResults}
                allResults={results}
                selectedId={selectedId}
                onSelect={handleSelect}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                categoryFilter={categoryFilter}
                onCategoryFilterChange={setCategoryFilter}
                search={search}
                onSearchChange={setSearch}
                sort={sort}
                onSortChange={setSort}
              />
            </div>

            {/* ── Right: Result detail ── */}
            <div
              className={`${mobilePanel === "list" ? "hidden lg:flex" : "flex"} flex-col flex-1 rounded-2xl overflow-hidden`}
              style={{ ...glass, minHeight: 500 }}>
              <ResultDetailPanel
                result={selectedResult}
                onBack={() => setMobilePanel("list")}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        </main>
      </div>

      <MobileNav onNavigate={onNavigate} />
      <AIAssistant />
    </div>
  );
}
