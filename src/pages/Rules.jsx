import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Rules.css';
import bg2Img from '../assets/bg-2.jpg';
import Footer from '../components/Footer';
import {
  MdGavel,
  MdWarning,
  MdShield,
  MdBlock,
  MdBolt,
  MdHome,
  MdAttachMoney,
  MdVolumeOff,
  MdTimer,
  MdDangerous,
  MdCheckCircle,
  MdInfo,
  MdChat,
  MdSearch,
  MdApps,
  MdExpandMore,
  MdLocalFireDepartment,
  MdVerified,
  MdClose,
} from 'react-icons/md';

// ── Categories ──
const CATEGORIES = [
  { id: 'all',      label: 'All Rules',      icon: <MdApps /> },
  { id: 'general',  label: 'General',        icon: <MdShield /> },
  { id: 'building', label: 'Building',       icon: <MdHome /> },
  { id: 'pvp',      label: 'PvP & Combat',   icon: <MdBolt /> },
  { id: 'economy',  label: 'Economy',        icon: <MdAttachMoney /> },
  { id: 'chat',     label: 'Chat & Conduct', icon: <MdChat /> },
];

// ── Rules per category (Customized with helpful tips) ──
const RULES_DATA = {
  general: [
    {
      id: 'gen-1',
      title: 'No Cheating or Hacking',
      desc: 'Use of X-ray, fly hacks, kill aura, auto-clickers, or any modified client that gives unfair advantage is strictly prohibited.',
      tip: 'Allowed mods: OptiFine, Sodium, Iris Shaders, LabyMod, MiniMaps (without entity/cave radar), and Fullbright.',
      severity: 'ban',
    },
    {
      id: 'gen-2',
      title: 'No Exploiting Bugs',
      desc: 'Duplication glitches, server crash exploits, or chunk-loading abuse must be reported to staff immediately, not used for personal gain.',
      tip: 'Reporting a genuine bug or dupe glitch responsibly in Discord earns bug-hunter recognition!',
      severity: 'high',
    },
    {
      id: 'gen-3',
      title: 'One Account Per Player',
      desc: 'Alt accounts are not allowed for gameplay advantages (double voting, bypassing bans, etc.) unless approved by staff.',
      tip: 'Sharing an IP with siblings or friends at home? Open a Discord ticket so staff can whitelist your connection.',
      severity: 'high',
    },
    {
      id: 'gen-4',
      title: 'No Lag Machines',
      desc: 'Building redstone contraptions, entity farms, or hopper clocks that cause server-wide lag is forbidden.',
      tip: 'Keep redstone clocks toggleable with an on/off lever and avoid stacking hundreds of mobs in a 1x1 block.',
      severity: 'medium',
    },
    {
      id: 'gen-5',
      title: 'Respect Staff Decisions',
      desc: 'Staff have final say on rule interpretations. Disagreements should be raised via a support ticket, not in public chat.',
      tip: 'Stay polite in tickets and attach screenshots or coordinates when requesting a review.',
      severity: 'low',
    },
  ],
  building: [
    {
      id: 'bld-1',
      title: 'No Griefing',
      desc: 'Destroying, altering, or stealing from another player\'s build without explicit permission is a bannable offense.',
      tip: 'Only add players you fully trust to your land claim with /trust <player>.',
      severity: 'ban',
    },
    {
      id: 'bld-2',
      title: 'Claim Your Base',
      desc: 'Use /claim to protect your builds. AlooSMP staff cannot recover unclaimed builds that get griefed.',
      tip: 'Use a golden shovel or /claim to secure chests, villagers, and farms as soon as you settle.',
      severity: 'low',
    },
    {
      id: 'bld-3',
      title: 'No Offensive Builds',
      desc: 'Builds depicting hate symbols, NSFW content, or offensive imagery will be removed without warning.',
      tip: 'Keep all builds, signs, and map art family-friendly across public areas.',
      severity: 'high',
    },
    {
      id: 'bld-4',
      title: 'No Spawn Camping Builds',
      desc: 'Do not build structures that block or interfere with the protected spawn area.',
      tip: 'Move at least 150+ blocks away from spawn before constructing permanent bases or shops.',
      severity: 'medium',
    },
    {
      id: 'bld-5',
      title: 'Keep Builds Within Border',
      desc: 'All construction must remain within the 6000x6000 world border. Builds outside will be removed.',
      tip: 'Check your F3 coordinates so your builds stay safely inside the active survival border.',
      severity: 'low',
    },
  ],
  pvp: [
    {
      id: 'pvp-1',
      title: 'PvP is Enabled Everywhere',
      desc: 'Except in the protected spawn zone, PvP is active across the entire map. Travel prepared.',
      tip: 'Carry totems, ender pearls, and backup armor whenever venturing outside spawn.',
      severity: 'low',
    },
    {
      id: 'pvp-2',
      title: 'No Spawn Killing',
      desc: 'Attacking players within 100 blocks of spawn or immediately after they respawn is not allowed.',
      tip: 'Give freshly spawned or teleporting players a fair chance to step outside the spawn perimeter.',
      severity: 'medium',
    },
    {
      id: 'pvp-3',
      title: 'Hardcore Means Hardcore',
      desc: 'Death is permanent for the season. Combat logging (disconnecting to avoid death) results in your character being killed regardless.',
      tip: 'Wait for your DeluxeCombat timer tag to expire before logging out after a fight.',
      severity: 'high',
    },
    {
      id: 'pvp-4',
      title: 'No Team Griefing Within Clans',
      desc: 'Betraying or killing your own clan members for loot is against the clan agreement system and may void clan rewards.',
      tip: 'Leave the clan formally before initiating rivalry or PvP against former teammates.',
      severity: 'medium',
    },
    {
      id: 'pvp-5',
      title: 'Report Combat Bugs',
      desc: 'If you find a PvP exploit (hit registration bugs, knockback abuse), report it — using it for kills will void your stats.',
      tip: 'Record short clips of combat glitches and send them in Discord for quick fixes.',
      severity: 'high',
    },
  ],
  economy: [
    {
      id: 'eco-1',
      title: 'No Real Money Trading',
      desc: 'Buying or selling in-game items, currency, or accounts for real-world money outside our official store is prohibited.',
      tip: 'All rank and key purchases must go strictly through official AlooSMP store channels.',
      severity: 'ban',
    },
    {
      id: 'eco-2',
      title: 'Shop Pricing Must Be Fair',
      desc: 'Extreme price manipulation to exploit new players (e.g. selling dirt for 1M coins) may be flagged and adjusted by staff.',
      tip: 'Double-check chest shop signs and auction house prices before confirming.',
      severity: 'low',
    },
    {
      id: 'eco-3',
      title: 'No Duping',
      desc: 'Any form of item or currency duplication results in an immediate permanent ban and rollback of affected accounts.',
      tip: 'If you accidentally receive glitched/duped items, dispose of them or inform staff right away.',
      severity: 'ban',
    },
    {
      id: 'eco-4',
      title: 'Auction House Etiquette',
      desc: 'Do not spam-list items to clog the auction house. Excessive listings may be auto-removed.',
      tip: 'Bundle stackable materials (like cobblestone or logs) before listing on /ah.',
      severity: 'low',
    },
  ],
  chat: [
    {
      id: 'cht-1',
      title: 'No Hate Speech',
      desc: 'Racism, sexism, homophobia, or any form of discriminatory language results in an immediate permanent ban — no warnings.',
      tip: 'Zero tolerance applies in global chat, signs, renamed items, and Discord.',
      severity: 'ban',
    },
    {
      id: 'cht-2',
      title: 'No Toxicity or Harassment',
      desc: 'Bullying, excessive insults, or targeted harassment of other players in chat or voice is not tolerated.',
      tip: 'Friendly competitive banter is fine — personal attacks, doxxing, and threats are not.',
      severity: 'high',
    },
    {
      id: 'cht-3',
      title: 'English Primary in Global Chat',
      desc: 'Please keep global chat in English so staff can moderate effectively. Other languages are fine in DMs or private channels.',
      tip: 'Use /msg <player> or clan chat whenever conversing in regional languages.',
      severity: 'low',
    },
    {
      id: 'cht-4',
      title: 'No Spam or Advertising',
      desc: 'Advertising other servers, Discord links, or spamming messages/caps will result in a mute.',
      tip: 'Avoid sending repeated messages, IP addresses, or external promo links in public chat.',
      severity: 'medium',
    },
    {
      id: 'cht-5',
      title: 'No Impersonating Staff',
      desc: 'Pretending to be a staff member, using fake ranks, or imitating staff usernames is a serious offense.',
      tip: 'Official staff always have verified badges in-game and on Discord.',
      severity: 'high',
    },
  ],
};

const ALL_RULES = Object.entries(RULES_DATA).flatMap(([cat, items]) =>
  items.map((item) => ({ ...item, category: cat }))
);

// ── Punishment tiers ──
const PUNISHMENTS = [
  { id: 'warn',    icon: <MdInfo />,      step: 'Step 01', title: '1st Offense',     desc: 'Verbal warning + note added to your record by staff.' },
  { id: 'mute',    icon: <MdVolumeOff />, step: 'Step 02', title: '2nd Offense',     desc: 'Temporary mute (1–24 hours) depending on severity.' },
  { id: 'tempban', icon: <MdTimer />,     step: 'Step 03', title: '3rd Offense',     desc: 'Temporary ban (1–7 days) from the survival server.' },
  { id: 'ban',     icon: <MdDangerous />, step: 'Step 04', title: 'Severe / Repeat', desc: 'Permanent ban with no appeal for ban-tier offenses.' },
];

const SEVERITY_LABEL = {
  low:    { label: 'Minor',       icon: <MdCheckCircle /> },
  medium: { label: 'Moderate',    icon: <MdWarning /> },
  high:   { label: 'Serious',     icon: <MdBlock /> },
  ban:    { label: 'Instant Ban', icon: <MdDangerous /> },
};

const AGREEMENT_STORAGE_KEY = 'aloosmp_rules_agreed';
const READ_RULES_STORAGE_KEY = 'aloosmp_rules_checked';

const Rules = () => {
  const [category, setCategory] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [checkedRules, setCheckedRules] = useState({});
  const [agreed, setAgreed] = useState(false);

  const pageRef = useRef(null);

  useEffect(() => {
    try {
      const savedChecks = JSON.parse(localStorage.getItem(READ_RULES_STORAGE_KEY) || '{}');
      setCheckedRules(savedChecks);
      setAgreed(localStorage.getItem(AGREEMENT_STORAGE_KEY) === 'true');
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleRuleChecked = (e, ruleId) => {
    e.stopPropagation();
    const updated = { ...checkedRules, [ruleId]: !checkedRules[ruleId] };
    setCheckedRules(updated);
    try {
      localStorage.setItem(READ_RULES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAgreeToggle = () => {
    const next = !agreed;
    setAgreed(next);
    if (next) {
      const allMap = {};
      ALL_RULES.forEach((r) => {
        allMap[r.id] = true;
      });
      setCheckedRules(allMap);
      try {
        localStorage.setItem(READ_RULES_STORAGE_KEY, JSON.stringify(allMap));
        localStorage.setItem(AGREEMENT_STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.setItem(AGREEMENT_STORAGE_KEY, 'false');
      } catch {
        // ignore
      }
    }
  };

  // Filtered rules
  const filteredRules = ALL_RULES.filter((rule) => {
    const matchCategory = category === 'all' || rule.category === category;
    const matchSeverity = severityFilter === 'all' || rule.severity === severityFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      rule.title.toLowerCase().includes(q) ||
      rule.desc.toLowerCase().includes(q) ||
      rule.tip.toLowerCase().includes(q);
    return matchCategory && matchSeverity && matchSearch;
  });

  const readCount = ALL_RULES.filter((r) => checkedRules[r.id]).length;
  const readPercent = Math.round((readCount / ALL_RULES.length) * 100);

  // Curved left-to-right scroll reveal observer
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll('.rp-reveal-curve'));
    if (elements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -15px 0px' }
    );

    elements.forEach((el) => {
      if (el.classList.contains('is-visible')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [filteredRules.length, category, severityFilter, searchQuery]);

  return (
    <div className="rulespage" ref={pageRef}>
      {/* Rich Visible Atmospheric Background */}
      <div className="rp-bg-wrap">
        <img src={bg2Img} alt="AlooSMP Background" className="rp-bg-img" />
        <div className="rp-bg-overlay" />
        <div className="rp-grid-pattern" />
      </div>

      <div className="rulespage-inner">
        {/* ════════ HEADER ════════ */}
        <div className="rp-header rp-reveal-curve" style={{ '--reveal-delay': '0ms' }}>
          <div className="rp-tag">
            <MdGavel /> Interactive Rulebook • {ALL_RULES.length} Guidelines
          </div>
          <h1 className="rp-title">
            The <span>AlooSMP</span> Code
          </h1>
          <p className="rp-desc">
            Fair, transparent rules to keep Survival fun for everyone. Click any rule to view tips, search across categories, or check off rules as you read!
          </p>
        </div>

        {/* ════════ NOTICE + ANARCHY LINK ════════ */}
        <div className="rp-banners-grid rp-reveal-curve" style={{ '--reveal-delay': '60ms' }}>
          <div className="rp-warning">
            <div className="rp-warning-icon">
              <MdWarning />
            </div>
            <div>
              <div className="rp-warning-title">Rules Apply Across Survival &amp; Discord</div>
              <p className="rp-warning-text">
                Staff decisions are final — appeals can be opened via a Discord ticket. Read carefully, as ignorance is not an excuse.
              </p>
            </div>
          </div>

          <Link to="/2b2t-india" className="rp-anarchy-callout">
            <div className="rp-anarchy-icon">
              <MdLocalFireDepartment />
            </div>
            <div className="rp-anarchy-body">
              <div className="rp-anarchy-title">Looking for 0 Rules? Play 2b2t India!</div>
              <p className="rp-anarchy-text">
                Our 2b2t India realm allows hacking, griefing, and pure anarchy. Click to view &rarr;
              </p>
            </div>
          </Link>
        </div>

        {/* ════════ INTERACTIVE PROGRESS & SEARCH TOOLBAR ════════ */}
        <div className="rp-controls-panel rp-reveal-curve" style={{ '--reveal-delay': '100ms' }}>
          {/* Read Progress Strip */}
          <div className="rp-progress-row">
            <div className="rp-progress-info">
              <span className="rp-progress-dot" />
              <span>
                Rulebook Checklist: <strong>{readCount}</strong> / <strong>{ALL_RULES.length}</strong> Read
              </span>
            </div>
            <div className="rp-progress-right">
              <span className="rp-progress-pct">{readPercent}%</span>
              {readCount < ALL_RULES.length && (
                <button
                  type="button"
                  className="rp-mark-all-btn"
                  onClick={handleAgreeToggle}
                >
                  Mark All Read
                </button>
              )}
            </div>
          </div>
          <div className="rp-progress-track">
            <div className="rp-progress-fill" style={{ width: `${readPercent}%` }} />
          </div>

          {/* Search + Severity Filter Row */}
          <div className="rp-filter-bar">
            <div className="rp-search-box">
              <MdSearch className="rp-search-icon" />
              <input
                type="text"
                placeholder="Search rules (e.g. claim, lag, xray, pvp, discord)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="rp-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <MdClose />
                </button>
              )}
            </div>

            <div className="rp-severity-filters">
              {[
                { id: 'all', label: 'All Tiers' },
                { id: 'ban', label: 'Instant Ban' },
                { id: 'high', label: 'Serious' },
                { id: 'medium', label: 'Moderate' },
                { id: 'low', label: 'Minor' },
              ].map((sev) => (
                <button
                  key={sev.id}
                  type="button"
                  className={`rp-sev-chip ${sev.id} ${severityFilter === sev.id ? 'active' : ''}`}
                  onClick={() => setSeverityFilter(sev.id)}
                >
                  {sev.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="rp-tabs">
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === 'all' ? ALL_RULES.length : (RULES_DATA[cat.id]?.length || 0);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`rp-tab-btn ${category === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setCategory(cat.id);
                    setExpandedId(null);
                  }}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                  <span className="rp-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════ INTERACTIVE RULES LIST ════════ */}
        <div className="rp-rules-list">
          {filteredRules.length > 0 ? (
            filteredRules.map((rule, i) => {
              const isExpanded = expandedId === rule.id;
              const isChecked = !!checkedRules[rule.id];

              return (
                <div
                  key={rule.id}
                  className={`rp-rule-card severity-${rule.severity} ${isExpanded ? 'expanded' : ''} ${isChecked ? 'checked' : ''} rp-reveal-curve`}
                  style={{ '--reveal-delay': `${Math.min(i, 6) * 55}ms` }}
                  onClick={() => setExpandedId(isExpanded ? null : rule.id)}
                >
                  <div className="rp-rule-main">
                    <button
                      type="button"
                      className={`rp-rule-check ${isChecked ? 'active' : ''}`}
                      onClick={(e) => toggleRuleChecked(e, rule.id)}
                      title={isChecked ? 'Marked as read' : 'Mark rule as read'}
                      aria-label={`Mark ${rule.title} as read`}
                    >
                      {isChecked ? <MdCheckCircle /> : <span>{i + 1}</span>}
                    </button>

                    <div className="rp-rule-body">
                      <div className="rp-rule-top">
                        <div className="rp-rule-title-group">
                          <h3 className="rp-rule-title">{rule.title}</h3>
                          {category === 'all' && (
                            <span className="rp-rule-cat-pill">{rule.category}</span>
                          )}
                        </div>
                        <div className="rp-rule-meta">
                          <span className={`rp-severity ${rule.severity}`}>
                            {SEVERITY_LABEL[rule.severity].icon}
                            {SEVERITY_LABEL[rule.severity].label}
                          </span>
                          <MdExpandMore className={`rp-expand-icon ${isExpanded ? 'rotated' : ''}`} />
                        </div>
                      </div>
                      <p className="rp-rule-desc">{rule.desc}</p>
                    </div>
                  </div>

                  {/* Expandable Pro-Tip Drawer */}
                  <div className="rp-rule-tip-collapse">
                    <div className="rp-rule-tip-inner">
                      <div className="rp-rule-tip-box">
                        <MdInfo className="rp-tip-icon" />
                        <div>
                          <strong>Player Tip &amp; Clarification:</strong> {rule.tip}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rp-empty-state rp-reveal-curve">
              <MdSearch className="rp-empty-icon" />
              <h3>No matching rules found</h3>
              <p>Try clearing your search or selecting &ldquo;All Rules&rdquo; and &ldquo;All Tiers&rdquo;.</p>
              <button
                type="button"
                className="rp-reset-filters-btn"
                onClick={() => {
                  setCategory('all');
                  setSeverityFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* ════════ PUNISHMENT ESCALATION ════════ */}
        <div className="rp-punish-section">
          <p className="rp-section-title rp-reveal-curve">
            <MdGavel /> Punishment Escalation
          </p>
          <div className="rp-punish-grid">
            {PUNISHMENTS.map((p, idx) => (
              <div
                className={`rp-punish-card ${p.id} rp-reveal-curve`}
                style={{ '--reveal-delay': `${idx * 90}ms` }}
                key={p.id}
              >
                <span className="rp-punish-step">{p.step}</span>
                <div className="rp-punish-icon">{p.icon}</div>
                <div className="rp-punish-title">{p.title}</div>
                <p className="rp-punish-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════ INTERACTIVE AGREEMENT BANNER ════════ */}
        <div className="rp-agreement rp-reveal-curve" style={{ '--reveal-delay': '60ms' }}>
          <div className="rp-agreement-icon">
            {agreed ? <MdVerified /> : <MdShield />}
          </div>
          <h2 className="rp-agreement-title">
            By playing on <span>AlooSMP</span>, you agree to these rules.
          </h2>
          <p className="rp-agreement-desc">
            Have questions about a rule or want to appeal a punishment? Open a support ticket in our Discord and our staff team will assist you.
          </p>

          <div className="rp-agreement-actions">
            <button
              type="button"
              className={`rp-ack-btn ${agreed ? 'agreed' : ''}`}
              onClick={handleAgreeToggle}
            >
              {agreed ? <MdVerified /> : <MdCheckCircle />}
              {agreed ? 'Rules Accepted!' : 'I Agree to the Rules'}
            </button>

            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="rp-agreement-btn"
            >
              <MdChat />
              Open a Ticket
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rules;
