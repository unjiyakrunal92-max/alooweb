import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';
import {
  MdChat,
  MdPeople,
  MdHelp,
  MdBugReport,
  MdBusinessCenter,
  MdArrowForward,
  MdStar,
  MdShield,
  MdSecurity,
  MdSupport,
  MdOndemandVideo,
  MdTag,
  MdCameraAlt,
} from 'react-icons/md';

const getAvatarUrl = (name) => `https://mc-heads.net/avatar/${name}/64`;

// ── Support channel cards ──
const CHANNELS = [
  {
    id: 'support',
    cls: 'support',
    icon: <MdHelp />,
    title: 'General Support',
    desc: 'Got a question about gameplay, ranks, or how something works? Open a #support ticket and our helpers will assist.',
    linkText: 'Open Support Ticket',
  },
  {
    id: 'report',
    cls: 'report',
    icon: <MdBugReport />,
    title: 'Report a Player / Bug',
    desc: 'Caught a hacker or found a bug/exploit? Use #report with evidence (screenshots/video) for fast staff action.',
    linkText: 'Open Report Ticket',
  },
  {
    id: 'business',
    cls: 'business',
    icon: <MdBusinessCenter />,
    title: 'Business & Partnerships',
    desc: 'YouTubers, content creators, or businesses interested in partnering with AlooSMP — reach out here.',
    linkText: 'Contact Business Team',
  },
];

// ── Staff team ──
const STAFF = [
  { name: 'MrAlooYT',    role: 'owner',  roleLabel: 'Owner' },
  { name: 'ShadowArcher', role: 'admin',  roleLabel: 'Admin' },
  { name: 'CrimsonBlade', role: 'mod',    roleLabel: 'Moderator' },
  { name: 'PyroStrike',   role: 'helper', roleLabel: 'Helper' },
];

const ROLE_ICON = {
  owner: <MdStar />,
  admin: <MdShield />,
  mod: <MdSecurity />,
  helper: <MdSupport />,
};

// ── Ticket steps ──
const TICKET_STEPS = [
  { num: 1, title: 'Join Discord', desc: 'Click the big button above to join our Discord server.' },
  { num: 2, title: 'Go to #tickets', desc: 'Find the tickets channel in the sidebar and click "Create Ticket".' },
  { num: 3, title: 'Choose Category', desc: 'Select Support, Report, or Business based on your issue.' },
  { num: 4, title: 'Wait for Staff', desc: 'Our team typically responds within 1-24 hours depending on urgency.' },
];

const Contact = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const fetchDiscordStats = async () => {
      try {
        const response = await fetch(
          'https://discord.com/api/v10/invites/Vay8KmxWy?with_counts=true'
        );
        const data = await response.json();
        
        if (data && data.approximate_member_count) {
          setMemberCount(data.approximate_member_count);
          setOnlineCount(data.approximate_presence_count);
        }
      } catch (error) {
        console.error('Failed to fetch Discord stats:', error);
        setMemberCount(2841); 
        setOnlineCount(340);
      }
    };

    fetchDiscordStats();
    
    // Refresh stats every 60 seconds
    const interval = setInterval(fetchDiscordStats, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-inner">

        {/* ══ HERO ══ */}
        <div className="contact-hero">
          <div className="contact-hero-glow1" />
          <div className="contact-hero-glow2" />

          <div className="contact-discord-icon">
            <MdChat />
          </div>

          <h1 className="contact-hero-title">
            Join Our <span>Discord</span>
          </h1>
          <p className="contact-hero-desc">
            The official AlooSMP Discord is where the community lives —
            announcements, support, events, trading, and more. Need help?
            This is the fastest way to reach us.
          </p>

          <div className="contact-hero-stats">
            <div className="contact-hero-stat">
              <span className="contact-online-dot" />
              {onlineCount > 0 ? onlineCount.toLocaleString() : '...'} Online
            </div>
            <div className="contact-hero-stat">
              <MdPeople />
              {memberCount > 0 ? memberCount.toLocaleString() : '...'} Members
            </div>
          </div>

          <a
            href="https://discord.gg/Vay8KmxWy"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-discord-btn"
          >
            <MdChat />
            Join Discord Server
          </a>
        </div>

        {/* ══ SUPPORT CHANNELS ══ */}
        <p className="contact-section-title">
          <MdHelp /> How Can We Help?
        </p>
        <div className="contact-channels-grid">
          {CHANNELS.map(ch => (
            <a
              href="https://discord.gg/Vay8KmxWy"
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-channel-card ${ch.cls}`}
              key={ch.id}
            >
              <div className="contact-channel-icon">{ch.icon}</div>
              <h3 className="contact-channel-title">{ch.title}</h3>
              <p className="contact-channel-desc">{ch.desc}</p>
              <span className="contact-channel-link">
                {ch.linkText} <MdArrowForward />
              </span>
            </a>
          ))}
        </div>

        {/* ══ STAFF TEAM ══ */}
        <p className="contact-section-title">
          <MdShield /> Meet The Staff Team
        </p>
        <div className="contact-staff-grid">
          {STAFF.map(s => (
            <div className="contact-staff-card" key={s.name}>
              <div className="contact-staff-avatar">
                <img src={getAvatarUrl(s.name)} alt={s.name} />
              </div>
              <div className="contact-staff-name">{s.name}</div>
              <span className={`contact-staff-role ${s.role}`}>
                {ROLE_ICON[s.role]} {s.roleLabel}
              </span>
            </div>
          ))}
        </div>

        {/* ══ TICKET STEPS ══ */}
        <div className="contact-ticket-section">
          <h2 className="contact-ticket-title">
            How to Open a <span>Support Ticket</span>
          </h2>
          <div className="contact-ticket-steps">
            {TICKET_STEPS.map(step => (
              <div className="contact-ticket-step" key={step.num}>
                <div className="contact-ticket-circle">{step.num}</div>
                <div className="contact-ticket-step-title">{step.title}</div>
                <p className="contact-ticket-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ SOCIAL LINKS ══ */}
        <p className="contact-section-title">
          <MdTag /> Follow Us Everywhere
        </p>
        <div className="contact-socials-grid">
          <a
            href="https://discord.gg/Vay8KmxWy"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-card discord"
          >
            <div className="contact-social-icon"><MdChat /></div>
            <div>
              <div className="contact-social-name">Discord</div>
              <div className="contact-social-handle">discord.gg/Vay8KmxWy</div>
            </div>
          </a>
          <a
            href="https://youtube.com/@mralooyt"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-card youtube"
          >
            <div className="contact-social-icon"><MdOndemandVideo /></div>
            <div>
              <div className="contact-social-name">YouTube</div>
              <div className="contact-social-handle">@mralooyt</div>
            </div>
          </a>
          <a
            href="https://twitter.com/mralooyt"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-card twitter"
          >
            <div className="contact-social-icon"><MdTag /></div>
            <div>
              <div className="contact-social-name">Twitter / X</div>
              <div className="contact-social-handle">@mralooyt</div>
            </div>
          </a>
          <a
            href="https://instagram.com/mralooyt"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-social-card instagram"
          >
            <div className="contact-social-icon"><MdCameraAlt /></div>
            <div>
              <div className="contact-social-name">Instagram</div>
              <div className="contact-social-handle">@mralooyt</div>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Contact;