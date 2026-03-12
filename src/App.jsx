import { useState, useEffect, useRef } from "react";
import { STACK, CATEGORIES, PRIORITY_ORDER } from "./stackData";

const PRIORITY_STYLE = {
  CRITICAL: { bg: "rgba(255,107,53,0.12)", border: "rgba(255,107,53,0.4)", color: "#ff8855", dot: "#ff6b35" },
  HIGH: { bg: "rgba(255,179,71,0.12)", border: "rgba(255,179,71,0.4)", color: "#ffb347", dot: "#ffb347" },
  SITUATIONAL: { bg: "rgba(180,136,255,0.12)", border: "rgba(180,136,255,0.4)", color: "#b388ff", dot: "#b388ff" },
};

const TABS = [
  { id: "what", label: "What" },
  { id: "who", label: "Who" },
  { id: "how", label: "How" },
  { id: "install", label: "Install" },
  { id: "resources", label: "Resources" },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function ProgressBar({ value, color }) {
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden", width: 48 }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 2, boxShadow: `0 0 6px ${color}88` }} />
    </div>
  );
}

function DetailPanel({ item, onClose, isMobile }) {
  const [tab, setTab] = useState("what");
  const ps = PRIORITY_STYLE[item.priority];

  useEffect(() => setTab("what"), [item.id]);

  const content = {
    what: (
      <div>
        <p style={styles.bodyText}>{item.what}</p>
        {item.whyYouNeedIt && (
          <div style={{ marginTop: 16, padding: "14px 16px", background: `${item.color}10`, border: `1px solid ${item.color}30`, borderRadius: 10 }}>
            <div style={{ fontSize: 9, color: item.color, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>Why YOU need it</div>
            <p style={{ ...styles.bodyText, margin: 0, color: "#ccc" }}>{item.whyYouNeedIt}</p>
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          <div style={styles.sectionLabel}>Used for</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {item.usedFor.map(u => (
              <span key={u} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 20, background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>{u}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Time to learn</span>
          <span style={{ fontSize: 12, color: "#e0e0e0" }}>{item.timeToLearn}</span>
        </div>
      </div>
    ),
    who: <p style={styles.bodyText}>{item.who}</p>,
    how: <p style={styles.bodyText}>{item.how}</p>,
    install: (
      <div>
        <div style={styles.sectionLabel}>How to install</div>
        <p style={{ ...styles.bodyText, marginTop: 8 }}>{item.install}</p>
        <div style={{ ...styles.sectionLabel, marginTop: 16 }}>Commands</div>
        <div style={{ marginTop: 8, background: "#050510", border: "1px solid #1a1a2e", borderRadius: 8, padding: "14px 16px", overflowX: "auto" }}>
          <pre style={{ margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: item.color, lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{item.command}</pre>
        </div>
        <div style={{ ...styles.sectionLabel, marginTop: 16 }}>Key tools</div>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {item.tools.map(t => (
            <div key={t} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    resources: (
      <div>
        <div style={styles.sectionLabel}>Best resources to learn</div>
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {item.resources.map((r, i) => (
            <div key={r} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid #1a1a2e" }}>
              <span style={{ fontSize: 11, color: item.color, fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
              <span style={{ fontSize: 12, color: "#7eb8ff", wordBreak: "break-all" }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div style={{
      background: "#080814",
      border: `1px solid ${item.color}44`,
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: `0 0 40px ${item.color}12`,
      display: "flex",
      flexDirection: "column",
      maxHeight: isMobile ? "85vh" : "calc(100vh - 200px)",
    }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0", background: `linear-gradient(135deg, ${item.color}10, transparent)`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, gap: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.2 }}>{item.name}</h2>
              <span style={{ fontSize: 10, color: item.categoryColor }}>{item.category}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 8, padding: "3px 8px", borderRadius: 10, background: ps.bg, border: `1px solid ${ps.border}`, color: ps.color, letterSpacing: 1, fontWeight: 700, whiteSpace: "nowrap" }}>{item.priority}</span>
            <button onClick={onClose} style={{ background: "none", border: "1px solid #2a2a3e", color: "#555", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 12, flexShrink: 0 }}>✕</button>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#777", margin: "0 0 14px", lineHeight: 1.5 }}>{item.tagline}</p>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, overflowX: "auto", scrollbarWidth: "none" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "8px 14px", border: "none",
              borderBottom: `2px solid ${tab === t.id ? item.color : "transparent"}`,
              background: "transparent",
              color: tab === t.id ? item.color : "#555",
              fontSize: 11, cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: 1, textTransform: "uppercase",
              whiteSpace: "nowrap", transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "18px 20px", overflowY: "auto", flex: 1 }}>
        {content[tab]}
      </div>
    </div>
  );
}

function ToolCard({ item, isSelected, onClick }) {
  const ps = PRIORITY_STYLE[item.priority];
  return (
    <div onClick={onClick} style={{
      background: isSelected ? "#0d0d1f" : "#08080f",
      border: `1px solid ${isSelected ? item.color + "66" : "#141424"}`,
      borderLeft: `3px solid ${isSelected ? item.color : "#1e1e30"}`,
      borderRadius: 10,
      padding: "14px 16px",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isSelected ? `0 0 20px ${item.color}14` : "none",
      userSelect: "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#e8e8f0" }}>{item.name}</span>
            <span style={{ fontSize: 8, padding: "2px 7px", borderRadius: 8, background: ps.bg, border: `1px solid ${ps.border}`, color: ps.color, letterSpacing: 1, fontWeight: 700, flexShrink: 0 }}>{item.priority}</span>
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.tagline}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
          <span style={{ fontSize: 8, color: item.categoryColor, border: `1px solid ${item.categoryColor}33`, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>{item.category}</span>
          <ProgressBar value={item.level} color={item.color} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 10 }}>
        {item.usedFor.slice(0, 3).map(u => (
          <span key={u} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", color: "#444", border: "1px solid #1a1a28" }}>{u}</span>
        ))}
        {item.usedFor.length > 3 && <span style={{ fontSize: 9, color: "#333" }}>+{item.usedFor.length - 3}</span>}
      </div>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const catScrollRef = useRef(null);

  const filtered = STACK.filter(s => {
    const matchCat = cat === "All" || s.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || s.name.toLowerCase().includes(q) ||
      s.tagline.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.usedFor.some(u => u.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }).sort((a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority));

  const selectedItem = selectedId ? STACK.find(s => s.id === selectedId) : null;

  const handleSelect = (id) => {
    setSelectedId(id);
    if (isMobile) setShowMobileDetail(true);
  };

  const handleClose = () => {
    setSelectedId(null);
    setShowMobileDetail(false);
  };

  const criticalCount = STACK.filter(s => s.priority === "CRITICAL").length;
  const highCount = STACK.filter(s => s.priority === "HIGH").length;

  return (
    <div style={{ minHeight: "100vh", background: "#05050b", color: "#e8e8f0", fontFamily: "'IBM Plex Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #05050b; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .tool-card:hover { background: #0a0a18 !important; }
        .cat-btn:hover { opacity: 0.8; }
        input:focus { outline: none; border-color: #2a2a4e !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(5,5,11,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #111122", padding: "14px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00e5a0", boxShadow: "0 0 10px #00e5a0", animation: "pulse 2s infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: -0.5 }}>Stack Bible</span>
            <span style={{ fontSize: 9, color: "#444", letterSpacing: 1 }}>· SOLO BUILDER 2026</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: 10, color: "#ff8855" }}>● {criticalCount} CRITICAL</span>
              <span style={{ fontSize: 10, color: "#ffb347" }}>● {highCount} HIGH</span>
              <span style={{ fontSize: 10, color: "#666" }}>{STACK.length} total</span>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: "linear-gradient(180deg, #0a0a18 0%, #05050b 100%)", borderBottom: "1px solid #111122", padding: isMobile ? "28px 20px 20px" : "40px 20px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>
            <span style={{ fontSize: 10, color: "#ff8855", letterSpacing: 2, textTransform: "uppercase" }}>Rakibul's Personal Stack Reference</span>
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: isMobile ? 28 : 44, fontWeight: 800, letterSpacing: -2, margin: "0 0 10px", lineHeight: 1.05 }}>
            Your Complete<br />
            <span style={{ color: "#00e5a0" }}>Tech Stack Bible</span>
          </h1>
          <p style={{ color: "#555", fontSize: isMobile ? 12 : 13, lineHeight: 1.8, margin: "0 0 20px", maxWidth: 600 }}>
            Web · Mobile · Voice Agents · AI Tools · Automation · OSINT · OSS · Lead Gen · Games · SaaS<br />
            Click any tool for full details — what it is, who uses it, how to use it, install commands, and resources.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: isMobile ? 16 : 28, flexWrap: "wrap" }}>
            {[
              { label: "Total Tools", val: STACK.length, color: "#00e5a0" },
              { label: "Critical", val: criticalCount, color: "#ff8855" },
              { label: "Categories", val: CATEGORIES.length - 1, color: "#7eb8ff" },
              { label: "All covered", val: "✓", color: "#b388ff" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: -1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#444", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH + FILTERS */}
      <div style={{ background: "#06060f", borderBottom: "1px solid #111122", padding: "14px 20px", position: "sticky", top: 52, zIndex: 90 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#333", pointerEvents: "none" }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools, categories, use cases... (e.g. voice, mobile, OSINT)"
              style={{ width: "100%", background: "#0a0a18", border: "1px solid #1a1a2e", borderRadius: 8, padding: "10px 14px 10px 38px", color: "#e8e8f0", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>×</button>
            )}
          </div>
          {/* Category filters */}
          <div ref={catScrollRef} style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 2 }}>
            {CATEGORIES.map(c => (
              <button key={c} className="cat-btn" onClick={() => setCat(c)} style={{
                whiteSpace: "nowrap", padding: "5px 12px", borderRadius: 20,
                border: `1px solid ${cat === c ? "#00e5a0" : "#1a1a2e"}`,
                background: cat === c ? "rgba(0,229,160,0.1)" : "transparent",
                color: cat === c ? "#00e5a0" : "#555",
                fontSize: 10, cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.5, transition: "all 0.15s",
              }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "16px" : "24px 20px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#333" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 14, color: "#555" }}>No tools found for "{search}"</div>
            <button onClick={() => { setSearch(""); setCat("All"); }} style={{ marginTop: 12, background: "none", border: "1px solid #2a2a3e", color: "#666", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: (!isMobile && selectedItem) ? "1fr 1fr" : "1fr", gap: 20, alignItems: "start" }}>
            {/* Cards */}
            <div>
              <div style={{ fontSize: 10, color: "#333", marginBottom: 12, letterSpacing: 1 }}>{filtered.length} tools · click to expand</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {filtered.map(item => (
                  <ToolCard
                    key={item.id}
                    item={item}
                    isSelected={selectedId === item.id}
                    onClick={() => handleSelect(selectedId === item.id ? null : item.id)}
                  />
                ))}
              </div>
            </div>

            {/* Desktop detail panel */}
            {!isMobile && selectedItem && (
              <div style={{ position: "sticky", top: 140, animation: "fadeUp 0.25s ease" }}>
                <DetailPanel item={selectedItem} onClose={handleClose} isMobile={false} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile detail modal */}
      {isMobile && showMobileDetail && selectedItem && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", flexDirection: "column" }}>
          <div onClick={handleClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }} />
          <div style={{ position: "relative", marginTop: "auto", maxHeight: "90vh", borderRadius: "16px 16px 0 0", overflow: "hidden", animation: "fadeUp 0.25s ease" }}>
            <DetailPanel item={selectedItem} onClose={handleClose} isMobile={true} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #111122", padding: "24px 20px", marginTop: 40 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00e5a0" }} />
            <span style={{ fontSize: 11, color: "#333" }}>Stack Bible · Built for Rakibul · 2026</span>
          </div>
          <span style={{ fontSize: 10, color: "#2a2a3e" }}>Python · React · React Native · FastAPI · LangChain · Voice · n8n · OSINT · OSS · Games</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  bodyText: { fontSize: 13, color: "#bbb", lineHeight: 1.85, margin: 0 },
  sectionLabel: { fontSize: 9, color: "#555", letterSpacing: 2, textTransform: "uppercase" },
};
