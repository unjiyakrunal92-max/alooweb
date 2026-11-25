import React, { useState } from 'react';
import '../styles/TwoBTwoT.css';
import Footer from '../components/Footer';
import {
  MdLocalFireDepartment,
  MdContentCopy,
  MdCheckCircle,
  MdBolt,
  MdDangerous,
  MdLayers,
  MdLockOpen,
  MdPublic,
  MdHelpOutline,
  MdExpandMore,
  MdTerminal,
  MdOpenInNew,
  MdSportsKabaddi,
  MdExplore,
  MdDesktopWindows,
  MdPhoneAndroid,
} from 'react-icons/md';
import { RiDiscordFill } from 'react-icons/ri';

const SERVER_IP = 'play.aloosmp.fun';
const BEDROCK_PORT = '19132';
const ANARCHY_COMMAND = '/server 2b2t';

const TwoBTwoT = () => {
  const [platform, setPlatform] = useState('java');
  const [copiedIP, setCopiedIP] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const copyToClipboard = (text, setFn) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const FAQS = [
    {
      q: 'What is 2b2t India and how does it connect to AlooSMP?',
      a: '2b2t India is the official Minecraft Anarchy realm hosted on the AlooSMP Network. It delivers a raw, lawless survival experience with zero map resets, no gameplay rules, and complete freedom to grief, raid, hack, and build massive bases.',
    },
    {
      q: 'How do I join 2b2t India using /server 2b2t?',
      a: 'Connect to the main AlooSMP IP (play.aloosmp.fun, Bedrock Port 19132). Once inside the lobby or survival hub, type "/server 2b2t" in chat or right-click the 2b2t NPC to enter the anarchy realm immediately.',
    },
    {
      q: 'Can I play 2b2t India on Bedrock, MCPE, or PojavLauncher?',
      a: 'Yes! 2b2t India supports full cross-play. Java Edition (1.16 - 1.21+), Bedrock Edition (Windows, Xbox, PlayStation, Switch), MCPE, and PojavLauncher players can all connect together using Port 19132.',
    },
    {
      q: 'Is 2b2t India free and does it support cracked accounts?',
      a: 'Yes, 2b2t India is 100% free with no whitelist required. Both premium and cracked Minecraft accounts (including TLauncher, PojavLauncher, and Feather) are welcome.',
    },
    {
      q: 'Are hacked clients and utility mods allowed?',
      a: 'Yes! Utility and anarchy clients (such as Meteor, Aristois, LiquidBounce, and Wurst) are permitted. Combat, movement, and automation modules will not trigger bans on the 2b2t realm. Only packet-flood exploits meant to crash server hardware are blocked.',
    },
  ];

  return (
    <div className="tb-page">
      <div className="tb-bg-ambient" />
      <div className="tb-grid-overlay" />

      {/* Subtle Floating Embers */}
      <div className="tb-embers" aria-hidden="true">
        <span className="tb-ember" />
        <span className="tb-ember" />
        <span className="tb-ember" />
        <span className="tb-ember" />
        <span className="tb-ember" />
        <span className="tb-ember" />
        <span className="tb-ember" />
        <span className="tb-ember" />
      </div>

      <div className="tb-container">
        {/* ════════ HERO SECTION ════════ */}
        <section className="tb-hero">
          <div className="tb-badge-row tb-anim-1">
            <span className="tb-pill">
              <span className="tb-pill-dot" />
              <MdLocalFireDepartment /> 2b2t India Anarchy • Online
            </span>
            <span className="tb-pill gold">
              <MdBolt /> AlooSMP Network
            </span>
          </div>

          <h1 className="tb-hero-title tb-anim-2">
            2B2T <span className="highlight">INDIA</span>
          </h1>

          <p className="tb-hero-subtitle tb-anim-3">
            India&apos;s rawest <strong>Minecraft Anarchy &amp; Survival Server</strong>.
            Zero rules, hacking &amp; griefing allowed, never-resetting world, and true anarchy survival.
            Connect to <strong>{SERVER_IP}</strong> and run <strong>{ANARCHY_COMMAND}</strong>.
          </p>

          {/* Interactive Connect Panel */}
          <div className="tb-connect-panel tb-anim-4">
            {/* Server IP Box with Java / Bedrock Switch */}
            <div className="tb-connect-box">
              <div className="tb-box-top">
                <span className="tb-connect-label">
                  <MdPublic /> Server Address
                </span>
                <div className="tb-platform-tabs">
                  <button
                    type="button"
                    className={`tb-platform-tab ${platform === 'java' ? 'active' : ''}`}
                    onClick={() => setPlatform('java')}
                  >
                    <MdDesktopWindows /> Java
                  </button>
                  <button
                    type="button"
                    className={`tb-platform-tab ${platform === 'bedrock' ? 'active' : ''}`}
                    onClick={() => setPlatform('bedrock')}
                  >
                    <MdPhoneAndroid /> Bedrock
                  </button>
                </div>
              </div>

              <div className="tb-box-bottom">
                <div className="tb-connect-value-wrap">
                  <span className="tb-connect-value">{SERVER_IP}</span>
                  <span className="tb-connect-port">
                    {platform === 'java'
                      ? 'Port: 25565 (1.16 – 1.21.x)'
                      : `Port: ${BEDROCK_PORT} (MCPE / Pojav / Console)`}
                  </span>
                </div>
                <button
                  type="button"
                  className={`tb-copy-btn ${copiedIP ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(SERVER_IP, setCopiedIP)}
                >
                  {copiedIP ? <MdCheckCircle /> : <MdContentCopy />}
                  {copiedIP ? 'Copied!' : 'Copy IP'}
                </button>
              </div>
            </div>

            {/* In-Game Realm Switch Box */}
            <div className="tb-connect-box command-box">
              <div className="tb-box-top">
                <span className="tb-connect-label">
                  <MdTerminal /> Switch Realm In-Game
                </span>
              </div>

              <div className="tb-box-bottom">
                <div className="tb-connect-value-wrap">
                  <span className="tb-connect-value">{ANARCHY_COMMAND}</span>
                  <span className="tb-connect-port">Or right-click the 2b2t NPC</span>
                </div>
                <button
                  type="button"
                  className={`tb-copy-btn ${copiedCmd ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(ANARCHY_COMMAND, setCopiedCmd)}
                >
                  {copiedCmd ? <MdCheckCircle /> : <MdContentCopy />}
                  {copiedCmd ? 'Copied!' : 'Copy Cmd'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="tb-stats-grid tb-anim-5">
            <div className="tb-stat-item">
              <div className="tb-stat-num">0 Rules</div>
              <div className="tb-stat-lbl">Pure Anarchy</div>
            </div>
            <div className="tb-stat-item">
              <div className="tb-stat-num">No Resets</div>
              <div className="tb-stat-lbl">Permanent Map</div>
            </div>
            <div className="tb-stat-item">
              <div className="tb-stat-num">Java + PE</div>
              <div className="tb-stat-lbl">Port {BEDROCK_PORT}</div>
            </div>
            <div className="tb-stat-item">
              <div className="tb-stat-num">20.0 TPS</div>
              <div className="tb-stat-lbl">Low Ping India</div>
            </div>
          </div>
        </section>

        {/* ════════ HOW TO JOIN 2B2T INDIA ════════ */}
        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-section-tag">
              <MdExplore /> Connection Guide
            </span>
            <h2 className="tb-section-title">
              How to Join <span>2b2t India</span>
            </h2>
            <p className="tb-section-desc">
              Enter the anarchy wasteland in under 30 seconds from Java Edition, Bedrock, or PojavLauncher.
            </p>
          </div>

          <div className="tb-steps-grid">
            <div className="tb-step-card">
              <span className="tb-step-badge">01</span>
              <div className="tb-step-icon">
                <MdPublic />
              </div>
              <h3>Join AlooSMP</h3>
              <p>
                Open Minecraft Multiplayer and add <strong>{SERVER_IP}</strong>. Bedrock &amp; MCPE players connect using Port <strong>{BEDROCK_PORT}</strong>. Cracked &amp; premium accounts supported.
              </p>
              <div className="tb-command-chip">
                <span>{SERVER_IP}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(SERVER_IP, setCopiedIP)}
                  title="Copy IP"
                >
                  {copiedIP ? <MdCheckCircle style={{ color: '#22c55e' }} /> : <MdContentCopy />}
                </button>
              </div>
            </div>

            <div className="tb-step-card">
              <span className="tb-step-badge">02</span>
              <div className="tb-step-icon">
                <MdTerminal />
              </div>
              <h3>Enter 2b2t Realm</h3>
              <p>
                Once in the main server lobby, right-click the <strong>2b2t NPC</strong> or run <strong>{ANARCHY_COMMAND}</strong> in chat to teleport directly into the anarchy world.
              </p>
              <div className="tb-command-chip">
                <span>{ANARCHY_COMMAND}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(ANARCHY_COMMAND, setCopiedCmd)}
                  title="Copy Command"
                >
                  {copiedCmd ? <MdCheckCircle style={{ color: '#22c55e' }} /> : <MdContentCopy />}
                </button>
              </div>
            </div>

            <div className="tb-step-card">
              <span className="tb-step-badge">03</span>
              <div className="tb-step-icon">
                <MdDangerous />
              </div>
              <h3>Escape &amp; Dominate</h3>
              <p>
                Spawn is a cratered obsidian wasteland. Escape spawn, stash gear far from highways, raid rival bases, and carve your own history into 2b2t India.
              </p>
              <div className="tb-command-chip">
                <span>No Rules • Pure Survival</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CORE ANARCHY FEATURES ════════ */}
        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-section-tag">
              <MdLocalFireDepartment /> Anarchy Features
            </span>
            <h2 className="tb-section-title">
              Built for <span>True Anarchy</span>
            </h2>
            <p className="tb-section-desc">
              No land claims, no moderation interference, no rollbacks — just raw Minecraft chaos on dedicated Indian hardware.
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
                Griefing, raiding, stealing, and PvP anywhere are completely unrestricted. Trust nobody and protect your coordinates.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdBolt />
                </div>
                <h4 className="tb-feature-title">Hacks &amp; Clients Allowed</h4>
              </div>
              <p className="tb-feature-desc">
                Utility clients like Meteor, Aristois, LiquidBounce, and Wurst are permitted without unfair bans for movement or combat modules.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdLayers />
                </div>
                <h4 className="tb-feature-title">Never-Resetting World</h4>
              </div>
              <p className="tb-feature-desc">
                The map never wipes. Ruined monuments, nether highways, megabases, and server lore remain permanently etched in history.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdLockOpen />
                </div>
                <h4 className="tb-feature-title">Cracked &amp; Crossplay</h4>
              </div>
              <p className="tb-feature-desc">
                Play seamlessly across Java, Bedrock, MCPE, and PojavLauncher with full support for both cracked and premium accounts.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdSportsKabaddi />
                </div>
                <h4 className="tb-feature-title">Crystal PvP &amp; Clan Wars</h4>
              </div>
              <p className="tb-feature-desc">
                Form anarchy clans, control nether highways, hunt stashes, and battle in high-stakes crystal PvP skirmishes.
              </p>
            </div>

            <div className="tb-feature-card">
              <div className="tb-feature-top">
                <div className="tb-feature-icon">
                  <MdPublic />
                </div>
                <h4 className="tb-feature-title">Low-Ping Indian Host</h4>
              </div>
              <p className="tb-feature-desc">
                Skip 250ms overseas lag and hours-long queues — enjoy smooth 20 TPS performance hosted directly in India.
              </p>
            </div>
          </div>
        </section>

        {/* ════════ DISCORD COMMUNITY BANNER ════════ */}
        <section className="tb-discord-banner">
          <div className="tb-discord-content">
            <span className="tb-discord-tag">
              <RiDiscordFill /> AlooSMP Community
            </span>
            <h2 className="tb-discord-title">
              Join the <span>2b2t India</span> Discord
            </h2>
            <p className="tb-discord-desc">
              Find anarchy teammates, trade coordinates, track server updates, or get help from the community in our official Discord server.
            </p>
          </div>

          <a
            href="https://discord.gg/Ecf6UJq8MR"
            target="_blank"
            rel="noopener noreferrer"
            className="tb-btn-discord"
          >
            <RiDiscordFill style={{ fontSize: '22px' }} />
            Join Discord <MdOpenInNew />
          </a>
        </section>

        {/* ════════ FAQ SECTION ════════ */}
        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-section-tag">
              <MdHelpOutline /> Questions &amp; Info
            </span>
            <h2 className="tb-section-title">
              2b2t India <span>FAQ</span>
            </h2>
            <p className="tb-section-desc">
              Quick answers about joining, commands, cross-play, and anarchy rules on 2b2t India.
            </p>
          </div>

          <div className="tb-faq-list">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`tb-faq-item ${openFaq === idx ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="tb-faq-question"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <MdExpandMore className="tb-faq-chevron" />
                </button>
                <div className="tb-faq-collapse">
                  <div className="tb-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TwoBTwoT;
