import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServerOverview.css';
import {
  MdDns,
  MdDesktopWindows,
  MdPhoneAndroid,
  MdContentCopy,
  MdCheckCircle,
  MdPublic,
  MdLayers,
  MdLockOpen,
  MdShield,
  MdMilitaryTech,
  MdStorefront,
  MdTerrain,
  MdStars,
  MdOpenInNew,
  MdVerified,
  MdLocalFireDepartment,
} from 'react-icons/md';
import { RiDiscordFill } from 'react-icons/ri';

const SERVER_SPECS = [
  {
    label: 'Java Edition IP',
    value: 'play.aloosmp.fun',
    sub: 'Port: 25570 (Default)',
    icon: <MdDesktopWindows />,
    accent: '#38bdf8',
    copyText: 'play.aloosmp.fun',
  },
  {
    label: 'Bedrock / PE / Pojav',
    value: 'play.aloosmp.fun',
    sub: 'Port: 19132 • Cross-Play',
    icon: <MdPhoneAndroid />,
    accent: '#4ade80',
    copyText: 'play.aloosmp.fun:19132',
  },
  {
    label: 'Supported Versions',
    value: '1.16 – 26.x',
    sub: 'Native 1.21.10 World',
    icon: <MdLayers />,
    accent: '#818cf8',
  },
  {
    label: 'Account Access',
    value: 'Cracked & Premium',
    sub: 'No Whitelist • Free to Join',
    icon: <MdLockOpen />,
    accent: '#fbbf24',
  },
  {
    label: 'Server Location',
    value: 'India 🇮🇳 Host',
    sub: 'Low-Ping Mumbai Node',
    icon: <MdPublic />,
    accent: '#f97316',
  },
  {
    label: 'Uptime & Status',
    value: '24/7 Online',
    sub: '100% Monitored Uptime',
    icon: <MdCheckCircle />,
    accent: '#22c55e',
    live: true,
  },
];

const SERVER_PILLARS = [
  {
    icon: <MdTerrain />,
    title: 'Custom Terrain 26.x',
    description: 'TerraformGenerator custom biomes, dramatic mountains, and rich caverns.',
    badge: 'World Gen',
    accent: '#4ade80',
  },
  {
    icon: <MdMilitaryTech />,
    title: 'DeluxeCombat PvP',
    description: 'Smooth hit registration, DonutBounty hunts, and competitive clan wars.',
    badge: 'PvP',
    accent: '#fb7185',
  },
  {
    icon: <MdStars />,
    title: 'Crates & Enchants',
    description: 'Open ExcellentCrates for rare gear, custom enchants, and rank vouchers.',
    badge: 'Rewards',
    accent: '#fbbf24',
  },
  {
    icon: <MdStorefront />,
    title: 'Player Economy & AH',
    description: 'Clean GUI shops, player chest shops, and a live AxAuctions marketplace.',
    badge: 'Economy',
    accent: '#38bdf8',
  },
  {
    icon: <MdShield />,
    title: 'Grief Prevention',
    description: 'Protect builds, chests, and farms effortlessly with /claim land protection.',
    badge: 'Security',
    accent: '#a855f7',
  },
  {
    icon: <RiDiscordFill />,
    title: 'Discord Sync & Events',
    description: 'Live Discord bridge, ChatGames, frequent drop parties, and active staff.',
    badge: 'Community',
    accent: '#818cf8',
  },
  {
    icon: <MdLocalFireDepartment />,
    title: '2b2t India Anarchy',
    description: 'Lawless anarchy with zero rules — switch anytime using /server 2b2t.',
    badge: 'Anarchy',
    accent: '#ff6b1a',
    to: '/2b2t-india',
  },
];

const DIRECTORY_LINKS = [
  {
    name: 'PlanetMinecraft',
    url: 'https://www.planetminecraft.com/server/aloo-smp/',
  },
  {
    name: 'Minecraft-MP',
    url: 'https://minecraft-mp.com/server-s362586/',
  },
  {
    name: 'MC Pocket Servers',
    url: 'https://minecraftpocket-servers.com/server/134299/ping/',
  },
];

export const ServerOverview = () => {
  const [copiedKey, setCopiedKey] = useState(null);
  const sectionRef = useRef(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll('.ov-reveal'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
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
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overview-section" id="about-server" ref={sectionRef}>
      {/* Animated Dynamic Aurora + Grid + Fireflies Backdrop */}
      <div className="ov-dynamic-bg" aria-hidden="true">
        <div className="ov-aurora-orb orb-1" />
        <div className="ov-aurora-orb orb-2" />
        <div className="ov-aurora-orb orb-3" />
        <div className="ov-animated-grid" />
        <div className="ov-sparks">
          <span className="ov-spark" />
          <span className="ov-spark" />
          <span className="ov-spark" />
          <span className="ov-spark" />
          <span className="ov-spark" />
          <span className="ov-spark" />
          <span className="ov-spark" />
          <span className="ov-spark" />
        </div>
      </div>

      <div className="overview-container">
        {/* Compact Header */}
        <div className="overview-header ov-reveal" style={{ '--ov-delay': '0ms' }}>
          <div className="overview-pill">
            <MdDns className="overview-pill-icon" />
            <span>Server Information &amp; Specs</span>
          </div>
          <h2 className="overview-title">
            About <span>AlooSMP</span> — India&apos;s Premier Network
          </h2>
          <p className="overview-subtitle">
            24/7 public Java &amp; Bedrock Survival SMP + 2b2t India Anarchy hosted on low-ping Indian servers.
          </p>
        </div>

        {/* Compact 3x2 Specs Grid */}
        <div className="overview-specs-grid">
          {SERVER_SPECS.map((spec, idx) => (
            <div
              className="spec-card ov-reveal"
              key={idx}
              style={{ '--spec-accent': spec.accent, '--ov-delay': `${(idx % 3) * 70}ms` }}
            >
              <div className="spec-icon-wrap">{spec.icon}</div>
              <div className="spec-details">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">
                  {spec.live && <span className="spec-live-dot" />}
                  {spec.value}
                </span>
                <span className="spec-sub">{spec.sub}</span>
              </div>
              {spec.copyText && (
                <button
                  type="button"
                  className={`spec-copy-btn ${copiedKey === spec.label ? 'copied' : ''}`}
                  onClick={() => handleCopy(spec.copyText, spec.label)}
                  title={`Copy ${spec.label}`}
                  aria-label={`Copy ${spec.label}`}
                >
                  {copiedKey === spec.label ? <MdCheckCircle /> : <MdContentCopy />}
                  <span>{copiedKey === spec.label ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Compact Feature Pillars */}
        <div className="overview-pillars-wrap">
          <div className="overview-pillars-header ov-reveal" style={{ '--ov-delay': '40ms' }}>
            <h3 className="pillars-heading">
              Why Players Choose <span>AlooSMP</span>
            </h3>
          </div>

          <div className="overview-pillars-grid">
            {SERVER_PILLARS.map((pillar, idx) => {
              const cardContent = (
                <>
                  <div className="pillar-card-top">
                    <div className="pillar-icon">{pillar.icon}</div>
                    <span className="pillar-badge">{pillar.badge}</span>
                  </div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-desc">{pillar.description}</p>
                </>
              );

              if (pillar.to) {
                return (
                  <Link
                    to={pillar.to}
                    className="pillar-card pillar-card-link ov-reveal"
                    key={idx}
                    style={{ '--pillar-accent': pillar.accent, '--ov-delay': `${(idx % 4) * 65}ms` }}
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  className="pillar-card ov-reveal"
                  key={idx}
                  style={{ '--pillar-accent': pillar.accent, '--ov-delay': `${(idx % 4) * 65}ms` }}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Single-Row Official Directories Strip */}
        <div className="overview-directories-strip ov-reveal" style={{ '--ov-delay': '60ms' }}>
          <div className="directories-label">
            <MdVerified className="dir-verified-ico" />
            <span>Verified Listings</span>
          </div>
          <div className="directories-pills">
            {DIRECTORY_LINKS.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="directory-pill"
              >
                <span>{item.name}</span>
                <MdOpenInNew />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerOverview;
