import React, { useState } from 'react';
import '../styles/Rules.css';
import {
  MdGavel,
  MdWarning,
  MdShield,
  MdBlock,
  MdBolt,
  MdGroups,
  MdBugReport,
  MdHome,
  MdAttachMoney,
  MdVolumeOff,
  MdTimer,
  MdDangerous,
  MdCheckCircle,
  MdInfo,
  MdChat,
} from 'react-icons/md';

// ── Categories ──
const CATEGORIES = [
  { id: 'general',  label: 'General',  icon: <MdShield /> },
  { id: 'building', label: 'Building', icon: <MdHome /> },
  { id: 'pvp',      label: 'PvP & Combat', icon: <MdBolt /> },
  { id: 'economy',  label: 'Economy', icon: <MdAttachMoney /> },
  { id: 'chat',     label: 'Chat & Conduct', icon: <MdChat /> },
];

// ── Rules per category ──
const RULES = {
  general: [
    { title: 'No Cheating or Hacking', desc: 'Use of X-ray, fly hacks, kill aura, auto-clickers, or any modified client that gives unfair advantage is strictly prohibited.', severity: 'ban' },
    { title: 'No Exploiting Bugs', desc: 'Duplication glitches, server crash exploits, or chunk-loading abuse must be reported to staff immediately, not used for personal gain.', severity: 'high' },
    { title: 'One Account Per Player', desc: 'Alt accounts are not allowed for gameplay advantages (double voting, bypassing bans, etc.) unless approved by staff.', severity: 'high' },
    { title: 'No Lag Machines', desc: 'Building redstone contraptions, entity farms, or hopper clocks that cause server-wide lag is forbidden.', severity: 'medium' },
    { title: 'Respect Staff Decisions', desc: 'Staff have final say on rule interpretations. Disagreements should be raised via a support ticket, not in public chat.', severity: 'low' },
  ],
  building: [
    { title: 'No Griefing', desc: 'Destroying, altering, or stealing from another player\'s build without explicit permission is a bannable offense.', severity: 'ban' },
    { title: 'Claim Your Base', desc: 'Use /claim to protect your builds. AlooSMP staff cannot recover unclaimed builds that get griefed.', severity: 'low' },
    { title: 'No Offensive Builds', desc: 'Builds depicting hate symbols, NSFW content, or offensive imagery will be removed without warning.', severity: 'high' },
    { title: 'No Spawn Camping Builds', desc: 'Do not build structures that block, trap, or interfere with the spawn area or other players\' access points.', severity: 'medium' },
    { title: 'Keep Builds Within Border', desc: 'All construction must remain within the 6000x6000 world border. Builds outside will be removed.', severity: 'low' },
  ],
  pvp: [
    { title: 'PvP is Enabled Everywhere', desc: 'Except in the protected spawn zone, PvP is active across the entire map. Travel prepared.', severity: 'low' },
    { title: 'No Spawn Killing', desc: 'Attacking players within 100 blocks of spawn or immediately after they respawn is not allowed.', severity: 'medium' },
    { title: 'Hardcore Means Hardcore', desc: 'Death is permanent for the season. Combat logging (disconnecting to avoid death) results in your character being killed regardless.', severity: 'high' },
    { title: 'No Team Griefing Within Clans', desc: 'Betraying or killing your own clan members for loot is against the clan agreement system and may void clan rewards.', severity: 'medium' },
    { title: 'Report Combat Bugs', desc: 'If you find a PvP exploit (hit registration bugs, knockback abuse), report it — using it for kills will void your stats.', severity: 'high' },
  ],
  economy: [
    { title: 'No Real Money Trading', desc: 'Buying or selling in-game items, currency, or accounts for real-world money outside our official store is prohibited.', severity: 'ban' },
    { title: 'No Scamming', desc: 'Deliberately deceiving players in trades, auctions, or shop transactions will result in a permanent ban and blacklist.', severity: 'ban' },
    { title: 'Shop Pricing Must Be Fair', desc: 'Extreme price manipulation to exploit new players (e.g. selling dirt for 1M coins) may be flagged and adjusted by staff.', severity: 'low' },
    { title: 'No Duping', desc: 'Any form of item or currency duplication results in an immediate permanent ban and rollback of affected accounts.', severity: 'ban' },
    { title: 'Auction House Etiquette', desc: 'Do not spam-list items to clog the auction house. Excessive listings may be auto-removed.', severity: 'low' },
  ],
  chat: [
    { title: 'No Hate Speech', desc: 'Racism, sexism, homophobia, or any form of discriminatory language results in an immediate permanent ban — no warnings.', severity: 'ban' },
    { title: 'No Toxicity or Harassment', desc: 'Bullying, excessive insults, or targeted harassment of other players in chat or voice is not tolerated.', severity: 'high' },
    { title: 'English Primary in Global Chat', desc: 'Please keep global chat in English so staff can moderate effectively. Other languages are fine in DMs or private channels.', severity: 'low' },
    { title: 'No Spam or Advertising', desc: 'Advertising other servers, Discord links, or spamming messages/caps will result in a mute.', severity: 'medium' },
    { title: 'No Impersonating Staff', desc: 'Pretending to be a staff member, using fake ranks, or imitating staff usernames is a serious offense.', severity: 'high' },
  ],
};

// ── Punishment tiers ──
const PUNISHMENTS = [
  { id: 'warn',    icon: <MdInfo />,      title: '1st Offense', desc: 'Verbal warning + note added to your record by staff.' },
  { id: 'mute',    icon: <MdVolumeOff />, title: '2nd Offense', desc: 'Temporary mute (1-24 hours) depending on severity.' },
  { id: 'tempban', icon: <MdTimer />,     title: '3rd Offense', desc: 'Temporary ban (1-7 days) from the server.' },
  { id: 'ban',     icon: <MdDangerous />, title: 'Severe / Repeat', desc: 'Permanent ban with no appeal for ban-tier offenses.' },
];

const SEVERITY_LABEL = {
  low: { label: 'Minor', icon: <MdCheckCircle /> },
  medium: { label: 'Moderate', icon: <MdWarning /> },
  high: { label: 'Serious', icon: <MdBlock /> },
  ban: { label: 'Instant Ban', icon: <MdDangerous /> },
};

const Rules = () => {
  const [category, setCategory] = useState('general');

  return (
    <div className="rulespage">
      <div className="rulespage-inner">

        {/* Header */}
        <div className="rp-header">
          <div className="rp-tag">
            <MdGavel /> Server Rules
          </div>
          <h1 className="rp-title">
            The <span>AlooSMP</span> Code
          </h1>
          <p className="rp-desc">
            These rules keep AlooSMP fair, fun, and hardcore for everyone.
            Read carefully — ignorance is not an excuse for the ban hammer.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="rp-warning">
          <div className="rp-warning-icon">
            <MdWarning />
          </div>
          <div>
            <div className="rp-warning-title">Rules apply everywhere</div>
            <p className="rp-warning-text">
              These rules apply in-game, on our Discord server, and across all
              official AlooSMP social media. Staff decisions are final —
              appeals can be made via a Discord support ticket.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="rp-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`rp-tab-btn ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Rules List */}
        <div className="rp-rules-list">
          {RULES[category].map((rule, i) => (
            <div className="rp-rule-card" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="rp-rule-num">{i + 1}</div>
              <div className="rp-rule-body">
                <div className="rp-rule-top">
                  <h3 className="rp-rule-title">{rule.title}</h3>
                  <span className={`rp-severity ${rule.severity}`}>
                    {SEVERITY_LABEL[rule.severity].icon}
                    {SEVERITY_LABEL[rule.severity].label}
                  </span>
                </div>
                <p className="rp-rule-desc">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Punishment System */}
        <div className="rp-punish-section">
          <p className="rp-section-title">
            <MdGavel /> Punishment Escalation
          </p>
          <div className="rp-punish-grid">
            {PUNISHMENTS.map(p => (
              <div className={`rp-punish-card ${p.id}`} key={p.id}>
                <div className="rp-punish-icon">{p.icon}</div>
                <div className="rp-punish-title">{p.title}</div>
                <p className="rp-punish-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement Banner */}
        <div className="rp-agreement">
          <div className="rp-agreement-icon">
            <MdShield />
          </div>
          <h2 className="rp-agreement-title">
            By playing on <span>AlooSMP</span>, you agree to these rules.
          </h2>
          <p className="rp-agreement-desc">
            Have questions about a rule, or want to appeal a punishment?
            Open a ticket in our Discord and our staff team will assist you.
          </p>
          <a
            href="https://discord.gg/gXPwdwdB7F"
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
  );
};

export default Rules;