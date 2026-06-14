import React from 'react';
import '../styles/Features.css';
import {
  MdStar,
  MdShield,
  MdTrendingUp,
  MdGroups,
  MdStorefront,
  MdMap,
  MdBolt,
} from 'react-icons/md';

// ── Features Data ──
const FEATURES = [
  {
    id: 'hardcore',
    icon: <MdShield />,
    iconColor: 'red',
    tag: 'Core Gameplay',
    title: 'Hardcore Survival',
    desc: 'One life. No respawns. Every decision matters — die once and your journey on AlooSMP ends permanently.',
  },
  {
    id: 'economy',
    icon: <MdStorefront />,
    iconColor: 'green',
    tag: 'Economy',
    title: 'Custom Economy',
    desc: 'A fully player-driven marketplace. Buy, sell, and trade resources. Open your own shop and dominate the market.',
  },
  {
    id: 'clans',
    icon: <MdGroups />,
    iconColor: '',
    tag: 'Social',
    title: 'Clan Wars',
    desc: 'Form powerful clans, claim territory, and launch seasonal wars against rival factions across the map.',
  },
  {
    id: 'leaderboard',
    icon: <MdTrendingUp />,
    iconColor: 'green',
    tag: 'Competitive',
    title: 'Live Leaderboards',
    desc: 'Real-time kill counts, wealth rankings, and survival streaks. Climb the charts and earn your legend.',
  },
  {
    id: 'events',
    icon: <MdStar />,
    iconColor: '',
    tag: 'Events',
    title: 'Season Events',
    desc: 'Exclusive seasonal events, limited-time challenges and special rewards only available during each season.',
  },
  {
    id: 'performance',
    icon: <MdBolt />,
    iconColor: '',
    tag: 'Performance',
    title: 'India Hosted',
    desc: 'Mumbai-based servers with ultra-low ping across India. Smooth, lag-free gameplay every single session.',
  },
];

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="features-inner">

        {/* ── Header ── */}
        <div className="features-header">
          <div className="features-tag">
            <MdMap />
            What We Offer
          </div>
          <h2 className="features-title">
            Built for <span>Warriors</span>
          </h2>
          <p className="features-subtitle">
            Everything you need for the ultimate survival experience.
            Custom-built from the ground up for AlooSMP.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="features-grid">
          {FEATURES.map(({ id, icon, iconColor, tag, title, desc }) => (
            <div className="feature-card" key={id}>
              <div className={`feature-icon-wrap ${iconColor}`}>
                {icon}
              </div>
              <span className="feature-card-tag">{tag}</span>
              <h3 className="feature-card-title">{title}</h3>
              <p className="feature-card-desc">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;