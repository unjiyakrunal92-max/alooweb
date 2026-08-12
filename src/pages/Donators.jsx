import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Donators.css';
import bgImg from '../assets/bg.jpg';
import {
  MdFavorite,
  MdWorkspacePremium,
  MdShoppingBag,
  MdSearch,
  MdCheckCircle,
  MdOpenInNew,
  MdStar,
  MdEmojiEvents,
  MdCardMembership,
  MdAutoAwesome,
  MdVolunteerActivism,
} from 'react-icons/md';
import { getAvatarUrl } from '../utils/api';

// ─────────────────────────────────────────────────────────
// MANUALLY ADD / EDIT DONATORS HERE
// Simply add new player objects to this array whenever a purchase is made!
// ─────────────────────────────────────────────────────────
export const DONATORS = [
  {
    id: 'donator-1',
    username: 'Ryannnn',
    amount: 120,
    items: ['Spawner Key'],
    tier: 'VIP Supporter',
    badge: '🥇 Top Donator',
    badgeClass: 'badge-gold',
    note: '120 rs Spawner Key',
  },
  {
    id: 'donator-2',
    username: 'MR_ANKIT_Yt',
    amount: 59,
    items: ['BANANA RANK'],
    tier: 'Banana Supporter',
    badge: '🥈 Supporter',
    badgeClass: 'badge-amber',
    note: 'BANANA RANK 59 rs',
  },
];

const Donators = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate totals
  const totalRaised = DONATORS.reduce((sum, d) => sum + d.amount, 0);
  const totalDonators = DONATORS.length;

  // Filter donators by search term
  const filteredDonators = DONATORS.filter(d => {
    const term = searchTerm.toLowerCase();
    return (
      d.username.toLowerCase().includes(term) ||
      d.items.some(item => item.toLowerCase().includes(term)) ||
      d.tier.toLowerCase().includes(term)
    );
  });

  return (
    <div className="donators-page">
      {/* Background Image with Dark Gradient Overlays */}
      <div className="donators-bg-wrap">
        <img src={bgImg} alt="AlooSMP Background" className="donators-bg-img" />
        <div className="donators-bg-overlay" />
        <div className="donators-grid-pattern" />
      </div>

      <div className="donators-container">

        {/* ── HEADER ── */}
        <div className="donators-header">
          <div className="donators-tag">
            <MdVolunteerActivism /> Server Wall of Fame
          </div>
          <h1 className="donators-title">
            Server <span>Donators</span>
          </h1>
          <p className="donators-sub">
            Honoring the legendary supporters of <strong>AlooSMP</strong>. Every purchase directly helps maintain high-performance hardware, custom plugins, and lag-free gameplay!
          </p>

          {/* STATS OVERVIEW CARDS */}
          <div className="donators-stats-grid">
            <div className="donators-stat-card">
              <div className="donators-stat-icon gold">
                <MdWorkspacePremium />
              </div>
              <div className="donators-stat-info">
                <span className="donators-stat-value">₹{totalRaised}</span>
                <span className="donators-stat-label">Total Raised</span>
              </div>
            </div>

            <div className="donators-stat-card">
              <div className="donators-stat-icon green">
                <MdFavorite />
              </div>
              <div className="donators-stat-info">
                <span className="donators-stat-value">{totalDonators}</span>
                <span className="donators-stat-label">Total Donators</span>
              </div>
            </div>

            <div className="donators-stat-card">
              <div className="donators-stat-icon blue">
                <MdEmojiEvents />
              </div>
              <div className="donators-stat-info">
                <span className="donators-stat-value">Ryannnn</span>
                <span className="donators-stat-label">Top Supporter (₹120)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── TOP SUPPORTERS PODIUM / FEATURED SHOWCASE ── */}
        <div className="donators-featured-section">
          <div className="section-heading">
            <MdAutoAwesome className="heading-icon" />
            <h2>Featured <span>Supporters</span></h2>
          </div>

          <div className="featured-cards-grid">
            {DONATORS.map((donator, idx) => (
              <div key={donator.id} className={`featured-donator-card ${donator.badgeClass}`}>
                <div className="featured-card-glow" />
                <div className="featured-badge-tag">{donator.badge}</div>

                <div className="featured-avatar-frame">
                  <img
                    src={getAvatarUrl(donator.username)}
                    alt={donator.username}
                    className="featured-avatar-img"
                  />
                </div>

                <h3 className="featured-player-name">{donator.username}</h3>
                <span className="featured-tier-label">{donator.tier}</span>

                <div className="featured-items-list">
                  {donator.items.map((item, i) => (
                    <span key={i} className="featured-item-tag">
                      <MdShoppingBag /> {item}
                    </span>
                  ))}
                </div>

                <div className="featured-amount-badge">
                  <span className="amount-label">Contributed</span>
                  <span className="amount-value">₹{donator.amount}</span>
                </div>

                {/* <Link to={`/profile/${donator.username}`} className="featured-profile-btn">
                  View Profile <MdOpenInNew />
                </Link> */}
              </div>
            ))}
          </div>
        </div>

        {/* ── SEARCH & FULL DONATOR LIST TABLE ── */}
        <div className="donators-list-section">
          <div className="list-toolbar">
            <div className="toolbar-title">
              <MdCardMembership />
              <span>All Purchases & Donations ({filteredDonators.length})</span>
            </div>

            <div className="donators-search-box">
              <MdSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search player name or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="donators-table-wrapper">
            <table className="donators-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Tier & Status</th>
                  <th>Purchased Items</th>
                  <th>Amount</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonators.length > 0 ? (
                  filteredDonators.map((d, index) => (
                    <tr key={d.id} className="donator-table-row">
                      <td className="col-rank">
                        <span className={`rank-num ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : ''}`}>
                          #{index + 1}
                        </span>
                      </td>

                      <td className="col-player">
                        <Link to={`/profile/${d.username}`} className="player-cell-link">
                          <div className="player-avatar-box">
                            <img src={getAvatarUrl(d.username)} alt={d.username} />
                          </div>
                          <span className="player-ign">{d.username}</span>
                        </Link>
                      </td>

                      <td className="col-tier">
                        <span className={`tier-badge ${d.badgeClass}`}>
                          <MdStar /> {d.tier}
                        </span>
                      </td>

                      <td className="col-items">
                        <div className="items-tags-group">
                          {d.items.map((item, i) => (
                            <span key={i} className="purchase-item-chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="col-amount">
                        <span className="amount-pill">₹{d.amount}</span>
                      </td>

                      <td className="col-action">
                        <Link to={`/profile/${d.username}`} className="table-profile-link">
                          Profile
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-donators-found">
                      No donators found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── CALL TO ACTION / STORE BANNER ── */}
        <div className="donators-cta-banner">
          <div className="cta-content">
            <div className="cta-icon">💎</div>
            <div className="cta-text">
              <h3>Want to Support AlooSMP?</h3>
              <p>
                Get exclusive ranks, keys, kits, and special perks while supporting the server! Open a support ticket on Discord or visit our store.
              </p>
            </div>
          </div>
          <a
            href="https://discord.gg/Ecf6UJq8MR"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-store-btn"
          >
            <MdShoppingBag /> Visit Store / Buy Ranks
          </a>
        </div>

      </div>
    </div>
  );
};

export default Donators;
