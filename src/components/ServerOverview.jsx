import React, { useState } from 'react';
import '../styles/ServerOverview.css';
import bg2 from '../assets/bg-2.jpg';
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
  MdHelpOutline,
} from 'react-icons/md';
import { RiDiscordFill } from 'react-icons/ri';

const SERVER_SPECS = [
  {
    label: 'Java Edition IP',
    value: 'play.aloosmp.fun',
    sub: 'Port: 25565 (Default)',
    icon: <MdDesktopWindows />,
    copyText: 'play.aloosmp.fun',
  },
  {
    label: 'Bedrock / PE / Pojav',
    value: 'play.aloosmp.fun',
    sub: 'Port: 19132',
    icon: <MdPhoneAndroid />,
    copyText: 'play.aloosmp.fun:19132',
  },
  {
    label: 'Supported Versions',
    value: '1.16 - 1.21.x',
    sub: 'Latest 1.21.10 Native',
    icon: <MdLayers />,
  },
  {
    label: 'Account Access',
    value: 'Cracked & Premium',
    sub: 'No Whitelist • Free to Join',
    icon: <MdLockOpen />,
  },
  {
    label: 'Server Location',
    value: 'India 🇮🇳',
    sub: 'Ultra-low ping Mumbai host',
    icon: <MdPublic />,
  },
  {
    label: 'Uptime & Status',
    value: '24/7 Online',
    sub: '100% Monitored Uptime',
    icon: <MdCheckCircle />,
  },
];

const SERVER_PILLARS = [
  {
    icon: <MdTerrain />,
    title: 'Custom Terrain World (1.21.x)',
    description:
      'Explore breathtaking custom landscapes powered by TerraformGenerator with unique biomes, realistic mountains, deep cavern networks, and endless exploration.',
    badge: 'World Gen',
  },
  {
    icon: <MdMilitaryTech />,
    title: 'DeluxeCombat & Balanced PvP',
    description:
      'Balanced combat mechanics with PvPManager and anti-cheat, bounty hunting via DonutBounty, and high-stakes clan wars without griefing.',
    badge: 'PvP & Combat',
  },
  {
    icon: <MdStars />,
    title: 'Custom Crates & Enchantments',
    description:
      'Unlock overpowered abilities and open legendary ExcellentCrates to claim rare items, special weapons, and prestige rank vouchers.',
    badge: 'Rewards',
  },
  {
    icon: <MdStorefront />,
    title: 'Player-Driven Economy & Auctions',
    description:
      'Buy and sell items through clean GUI shops (EconomyShopGUI), create player chest shops, and bid on rare loot on the AxAuctions market.',
    badge: 'Economy',
  },
  {
    icon: <MdShield />,
    title: 'Grief Prevention & Land Claims',
    description:
      'Protect your massive bases, chests, and farms from griefers and raiders. Build freely knowing your hard work is 100% secure.',
    badge: 'Security',
  },
  {
    icon: <RiDiscordFill />,
    title: 'Discord Synced Community',
    description:
      'In-game chat synchronized with Discord, interactive ChatGames, community giveaways, active staff support, and weekly community events.',
    badge: 'Community',
  },
];

const DIRECTORY_LINKS = [
  {
    name: 'PlanetMinecraft',
    url: 'https://www.planetminecraft.com/server/aloo-smp/',
    desc: 'Official Aloo SMP PlanetMinecraft Listing',
  },
  {
    name: 'Minecraft-MP',
    url: 'https://minecraft-mp.com/server-s362586/',
    desc: 'Ranked & Verified Server Listing',
  },
  {
    name: 'Minecraft Pocket Servers',
    url: 'https://minecraftpocket-servers.com/server/134299/ping/',
    desc: 'Bedrock & Pocket Edition Listing',
  },
];

export const ServerOverview = () => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  return (
    <section
      className="overview-section"
      id="about-server"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(6, 10, 20, 0.72) 0%, rgba(8, 14, 26, 0.52) 50%, rgba(6, 10, 20, 0.78) 100%), url(${bg2})`,
      }}
    >
      <div className="overview-container">

        {/* Section Header */}
        <div className="overview-header">
          <div className="overview-pill">
            <MdDns className="overview-pill-icon" />
            <span>Server Information &amp; Specs</span>
          </div>
          <h2 className="overview-title">
            About <span>AlooSMP</span> — India's Premier Minecraft SMP
          </h2>
          <p className="overview-subtitle">
            Aloo SMP is an active, public 24/7 Survival Multiplayer (SMP) network designed for Java, Bedrock, and Pocket Edition players worldwide. Explore custom terrain, build thriving kingdoms, and dominate the economy.
          </p>
        </div>

        {/* Quick Specs Grid */}
        <div className="overview-specs-grid">
          {SERVER_SPECS.map((spec, idx) => (
            <div className="spec-card" key={idx}>
              <div className="spec-icon-wrap">
                {spec.icon}
              </div>
              <div className="spec-details">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
                <span className="spec-sub">{spec.sub}</span>
              </div>
              {spec.copyText && (
                <button
                  className={`spec-copy-btn ${copiedKey === spec.label ? 'copied' : ''}`}
                  onClick={() => handleCopy(spec.copyText, spec.label)}
                  title={`Copy ${spec.label}`}
                  aria-label={`Copy ${spec.label}`}
                >
                  {copiedKey === spec.label ? (
                    <>
                      <MdCheckCircle /> Copied
                    </>
                  ) : (
                    <>
                      <MdContentCopy /> Copy
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Server Highlights Pillars */}
        <div className="overview-pillars-header">
          <h3 className="pillars-heading">
            Why Players Choose <span>Aloo SMP</span>
          </h3>
          <p className="pillars-subheading">
            Built from scratch for peak performance, fair competition, and endless adventures.
          </p>
        </div>

        <div className="overview-pillars-grid">
          {SERVER_PILLARS.map((pillar, idx) => (
            <div className="pillar-card" key={idx}>
              <div className="pillar-card-top">
                <div className="pillar-icon">{pillar.icon}</div>
                <span className="pillar-badge">{pillar.badge}</span>
              </div>
              <h4 className="pillar-title">{pillar.title}</h4>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Verified Server Directory Citations & Trust Links */}
        <div className="overview-directories-card">
          <div className="directories-info">
            <h4 className="directories-title">
              <MdHelpOutline /> Official Server Listings &amp; Community Directories
            </h4>
            <p className="directories-desc">
              Find and support AlooSMP on verified global Minecraft server lists. Vote daily to unlock exclusive in-game crate keys and currency!
            </p>
          </div>
          <div className="directories-links">
            {DIRECTORY_LINKS.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="directory-item"
              >
                <div className="directory-content">
                  <span className="directory-name">{item.name}</span>
                  <span className="directory-sub">{item.desc}</span>
                </div>
                <MdOpenInNew className="directory-external-icon" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServerOverview;
