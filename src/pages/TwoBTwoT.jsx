import React, { useState } from 'react';
import '../styles/TwoBTwoT.css';
import {
  MdLocalFireDepartment,
  MdContentCopy,
  MdCheckCircle,
  MdShield,
  MdBolt,
  MdDangerous,
  MdLayers,
  MdLockOpen,
  MdPublic,
  MdHelpOutline,
  MdExpandMore,
  MdTerminal,
  MdOpenInNew,
  MdSupportAgent,
  MdSportsKabaddi,
  MdExplore,
} from 'react-icons/md';
import { RiDiscordFill } from 'react-icons/ri';

const SERVER_IP = 'play.aloosmp.fun';
const BEDROCK_PORT = '19132';
const ANARCHY_COMMAND = '/server 2b2t';
const HALLMARK_COMMAND = '/hallmark';

const TwoBTwoT = () => {
  const [copiedIP, setCopiedIP] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedHallmark, setCopiedHallmark] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const copyToClipboard = (text, setFn) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const FAQS = [
    {
      q: 'What is 2b2t India and how does it connect to AlooSMP?',
      a: '2b2t India is the premier official Minecraft Anarchy realm powered and hosted by the AlooSMP Network. It delivers the genuine, raw anarchy survival experience with no map resets, no gameplay rules, and full freedom to grief, raid, hack, and build monumental bases.',
    },
    {
      q: 'How do I join 2b2t India using the /server 2b2t command?',
      a: 'First, connect to the main AlooSMP server IP: play.aloosmp.fun (Bedrock Port: 19132). Once in the lobby or survival world, simply type "/server 2b2t" in chat or right-click the 2b2t NPC in the lobby to be instantly teleported into the anarchy realm.',
    },
    {
      q: 'Can I join 2b2t India on Bedrock, MCPE, or PojavLauncher?',
      a: 'Yes! 2b2t India features native cross-play support. Players using Minecraft Java Edition (1.16 - 1.21+), Bedrock Edition (Windows, Xbox, PlayStation, Switch), Minecraft Pocket Edition (PE/Mobile), and PojavLauncher can all join together using Port 19132.',
    },
    {
      q: 'Is 2b2t India free to play and does it support cracked accounts?',
      a: 'Yes, 2b2t India is 100% free with no whitelist required. Both premium and cracked Minecraft accounts (including TLauncher, PojavLauncher, and Feather) are fully supported.',
    },
    {
      q: 'Are hacked clients and utility mods allowed on 2b2t India?',
      a: 'Yes! Utility and anarchy clients (such as Meteor, Aristois, LiquidBounce, and Wurst) are allowed. Combat, movement, and automation utilities will not get you banned from the 2b2t realm. However, packet-flood exploits intended to crash the physical server hardware are blocked.',
    },
    {
      q: 'How do I get help or create a ticket using /hallmark?',
      a: 'If you encounter any connection issues, account problems, or hardware bugs, run the command "/hallmark" in-game to instantly submit a support ticket to the moderation team, or open a ticket in our official Discord server.',
    },
  ];

  return (
    <div className="tb-page">
      <div className="tb-bg-ambient" />
      <div className="tb-grid-overlay" />

      <div className="tb-container">
        {/* ════════ HERO SECTION ════════ */}
        <section className="tb-hero">
          <div className="tb-badge-row">
            <span className="tb-pill">
              <span className="tb-pill-dot" />
              <MdLocalFireDepartment /> Official 2b2t India Realm
            </span>
            <span className="tb-pill gold">
              <MdBolt /> Hosted by AlooSMP Network
            </span>
          </div>

          <div className="tb-title-wrap">
            <h1 className="tb-hero-title">
              2B2T <span className="highlight">INDIA</span>
            </h1>
          </div>

          <p className="tb-hero-subtitle">
            India's most notorious, lawless <strong>Minecraft Anarchy & Survival Server</strong>.
            Zero rules, hacking & griefing allowed, never-resetting world, and true survival anarchy.
            Connect via <strong>{SERVER_IP}</strong> or switch with <strong>{ANARCHY_COMMAND}</strong>.
          </p>

          {/* Quick Connect & Switch Boxes */}
          <div className="tb-connect-cards">
            {/* Box 1: Server IP */}
            <div className="tb-connect-box">
              <div className="tb-connect-info">
                <span className="tb-connect-label">
                  <MdPublic /> Direct Server IP (Java & Bedrock)
                </span>
                <span className="tb-connect-value">{SERVER_IP}</span>
              </div>
              <button
                className={`tb-copy-btn ${copiedIP ? 'copied' : ''}`}
                onClick={() => copyToClipboard(SERVER_IP, setCopiedIP)}
              >
                {copiedIP ? <MdCheckCircle /> : <MdContentCopy />}
                {copiedIP ? 'IP Copied!' : 'Copy IP'}
              </button>
            </div>

            {/* Box 2: Quick Command Switch */}
            <div className="tb-connect-box command-box">
              <div className="tb-connect-info">
                <span className="tb-connect-label">
                  <MdTerminal /> Switch Realm In-Game
                </span>
                <span className="tb-connect-value">{ANARCHY_COMMAND}</span>
              </div>
              <button
                className={`tb-copy-btn ${copiedCmd ? 'copied' : ''}`}
                onClick={() => copyToClipboard(ANARCHY_COMMAND, setCopiedCmd)}
              >
                {copiedCmd ? <MdCheckCircle /> : <MdContentCopy />}
                {copiedCmd ? 'Command Copied!' : 'Copy Command'}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="tb-stats-grid">
            <div className="tb-stat-item">
              <div className="tb-stat-num">0 Rules</div>
              <div className="tb-stat-lbl">Lawless Anarchy</div>
            </div>
            <div className="tb-stat-item">
              <div className="tb-stat-num">No Resets</div>
              <div className="tb-stat-lbl">Permanent World</div>
            </div>
            <div className="tb-stat-item">
              <div className="tb-stat-num">Java + PE</div>
              <div className="tb-stat-lbl">Port {BEDROCK_PORT}</div>
            </div>
            <div className="tb-stat-item">
              <div className="tb-stat-num">20.0 TPS</div>
              <div className="tb-stat-lbl">High-Performance Host</div>
            </div>
          </div>
        </section>

        {/* ════════ HOW TO JOIN 2B2T INDIA ════════ */}
        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-section-tag">
              <MdExplore /> Step-by-Step Connection Guide
            </span>
            <h2 className="tb-section-title">
              How to Join <span>2b2t India</span>
            </h2>
            <p className="tb-section-desc">
              Entering the lawless world of 2b2t India is quick and simple for both Java and Bedrock Edition players.
            </p>
          </div>

          <div className="tb-steps-grid">
            {/* Step 1 */}
            <div className="tb-step-card">
              <span className="tb-step-badge">01</span>
              <div className="tb-step-icon">
                <MdPublic />
              </div>
              <h3>Connect to AlooSMP</h3>
              <p>
                Open Minecraft multiplayer and add server IP <strong>{SERVER_IP}</strong>. Bedrock and PojavLauncher players use Port <strong>{BEDROCK_PORT}</strong>. Both cracked & premium are supported.
              </p>
              <div className="tb-command-chip">
                <span>{SERVER_IP}</span>
                <button
                  onClick={() => copyToClipboard(SERVER_IP, setCopiedIP)}
                  title="Copy IP"
                >
                  {copiedIP ? <MdCheckCircle style={{ color: '#22c55e' }} /> : <MdContentCopy />}
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="tb-step-card">
              <span className="tb-step-badge">02</span>
              <div className="tb-step-icon">
                <MdTerminal />
              </div>
              <h3>Switch to 2b2t Anarchy</h3>
              <p>
                Once you join the lobby/survival world, right-click the <strong>2b2t NPC</strong> or directly type <strong>{ANARCHY_COMMAND}</strong> in your in-game chat to instantly switch to the anarchy realm.
              </p>
              <div className="tb-command-chip">
                <span>{ANARCHY_COMMAND}</span>
                <button
                  onClick={() => copyToClipboard(ANARCHY_COMMAND, setCopiedCmd)}
                  title="Copy Command"
                >
                  {copiedCmd ? <MdCheckCircle style={{ color: '#22c55e' }} /> : <MdContentCopy />}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="tb-step-card">
              <span className="tb-step-badge">03</span>
              <div className="tb-step-icon">
                <MdDangerous />
              </div>
              <h3>Survive the Wasteland</h3>
              <p>
                Spawn is a chaotic, cratered wasteland of obsidian and lava. Escape the spawn radius, gather food, build hidden bases thousands of blocks away, and dominate the anarchy realm!
              </p>
              <div className="tb-command-chip">
                <span>Escape Spawn • Good Luck</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CORE ANARCHY FEATURES ════════ */}
        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-section-tag">
              <MdLocalFireDepartment /> Raw Minecraft Survival
            </span>
            <h2 className="tb-section-title">
              Why <span>2b2t India</span> Is The Ultimate Anarchy Server
            </h2>
            <p className="tb-section-desc">
              Experience Minecraft the way it was originally built for hardcore survivors. No moderators intervening, no land claims, no rollback.
            </p>
          </div>

          <div className="tb-features-grid">
            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdDangerous />
                </div>
                <h4 className="tb-feature-title">Pure Lawless Anarchy</h4>
              </div>
              <p className="tb-feature-desc">
                No griefing bans, no stealing rules, and no combat restrictions. Everything built can be destroyed; every player you meet is a potential threat or ally.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdBolt />
                </div>
                <h4 className="tb-feature-title">Hacks & Clients Permitted</h4>
              </div>
              <p className="tb-feature-desc">
                Utility clients and hacked clients (Meteor, Aristois, LiquidBounce, Wurst) are allowed. Enjoy freecam, baritone pathfinding, esp, and auto-crafting without bans.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdLayers />
                </div>
                <h4 className="tb-feature-title">Never-Ending World</h4>
              </div>
              <p className="tb-feature-desc">
                The world map never wipes or resets. Massive obsidian monuments, ruined bases, player highways, and deep lore persist across months and years.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdLockOpen />
                </div>
                <h4 className="tb-feature-title">Cracked & Premium Crossplay</h4>
              </div>
              <p className="tb-feature-desc">
                Accessible to all Indian and global players whether you use official Minecraft or TLauncher, PojavLauncher mobile, or Bedrock Edition.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdSportsKabaddi />
                </div>
                <h4 className="tb-feature-title">Dupe & Clan Incursions</h4>
              </div>
              <p className="tb-feature-desc">
                Join community dupe events, build impenetrable clan bases, fight high-stakes spawn incursions, and participate in legendary crystal PvP battles.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdPublic />
                </div>
                <h4 className="tb-feature-title">Ultra-Low Ping in India</h4>
              </div>
              <p className="tb-feature-desc">
                Unlike overseas anarchy servers with 250ms+ ping and endless queues, 2b2t India runs on dedicated low-ping Indian hardware with instantaneous hit registration.
              </p>
            </div>
          </div>
        </section>

        {/* ════════ HALLMARK TICKET & SUPPORT SYSTEM ════════ */}
        <section className="tb-hallmark-card">
          <div className="tb-hallmark-glow" />
          <div className="tb-hallmark-inner">
            <div className="tb-hallmark-content">
              <span className="tb-hallmark-tag">
                <MdSupportAgent /> Hallmark Ticket System
              </span>
              <h2 className="tb-hallmark-title">
                Need Help? Use <span>/hallmark</span> In-Game
              </h2>
              <p className="tb-hallmark-desc">
                Encountered network issues, hardware lag, or account problems on 2b2t India? Run the in-game command <strong>/hallmark</strong> to immediately open an automated support ticket, or connect directly with our 24/7 staff team on Discord.
              </p>
              <div className="tb-hallmark-cmd">
                <span>{HALLMARK_COMMAND}</span>
                <button
                  style={{ background: 'transparent', border: 'none', color: '#ffbe0b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  onClick={() => copyToClipboard(HALLMARK_COMMAND, setCopiedHallmark)}
                  title="Copy /hallmark"
                >
                  {copiedHallmark ? <MdCheckCircle style={{ color: '#22c55e' }} /> : <MdContentCopy />}
                </button>
              </div>
            </div>

            <div className="tb-hallmark-actions">
              <a
                href="https://discord.gg/Ecf6UJq8MR"
                target="_blank"
                rel="noopener noreferrer"
                className="tb-btn-discord"
              >
                <RiDiscordFill style={{ fontSize: '22px' }} />
                Open Discord Ticket <MdOpenInNew />
              </a>
            </div>
          </div>
        </section>

        {/* ════════ FAQ SECTION ════════ */}
        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-section-tag">
              <MdHelpOutline /> Answers & Information
            </span>
            <h2 className="tb-section-title">
              2b2t India <span>Frequently Asked Questions</span>
            </h2>
            <p className="tb-section-desc">
              Everything you need to know about joining, hacking, commands, and rules on 2b2t India by AlooSMP.
            </p>
          </div>

          <div className="tb-faq-list">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`tb-faq-item ${openFaq === idx ? 'open' : ''}`}
              >
                <button
                  className="tb-faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <MdExpandMore className="tb-faq-chevron" />
                </button>
                {openFaq === idx && (
                  <div className="tb-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TwoBTwoT;
