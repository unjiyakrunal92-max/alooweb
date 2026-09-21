import React, { useState, useEffect, useRef } from 'react';
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
  MdTrendingUp,
  MdFlag,
  MdDiamond,
} from 'react-icons/md';
import { getAvatarUrl } from '../utils/api';

// ─────────────────────────────────────────────────────────
// CONFIGURATION — Edit these values to update the page
// ─────────────────────────────────────────────────────────
const DONATION_GOAL = 2000; // ₹2000 goal

// MANUALLY ADD / EDIT DONATORS HERE
// Simply add new player objects whenever a purchase is made!
export const DONATORS = [
  {
    id: 'donator-2',
    username: 'Mr_ANKIT_322',
    purchases: [
      { item: 'Aloo Rank', amount: 300, date: '2026-08-19' },
      { item: 'Banana Rank', amount: 59, date: '2026-08-12' },

    ],
    tier: 'Aloo Supporter',
    badge: '🥈 Top Donator',
    badgeClass: 'badge-gold',
  },
  {
    id: 'donator-1',
    username: 'rayyan',
    purchases: [
      { item: 'Spawner Key', amount: 520, date: '2026-08-27' },
        { item: 'Ultimate Key', amount: 160, date: '2026-09-21' },
    ],
    tier: 'Supporter',
    badge: '🥇 Supporter',
    badgeClass: 'badge-diamond',
  },  
    {
    id: 'donator-1',
    username: 'Shorekeeper12',
    purchases: [
      { item: 'Spawner Key', amount: 180, date: '2026-08-01' },
    ],
    tier: 'Supporter',
    badge: '🥉 Supporter',
    badgeClass: 'badge-silver',
  },
    {
    id: 'donator-4',
    username: '.Devendra_422',
    purchases: [
      { item: 'Banana Rank', amount: 59, date: '2026-08-01' },
      { item: 'Warrior Rank', amount: 149, date: '2026-09-19'}
    ],
    tier: 'Supporter',
    badge: 'Supporter',
    badgeClass: 'badge-silver',
  },
    {
    id: 'donator-5',
    username: '.GamesBond5411',
    purchases: [

      { item: 'Warrior Rank', amount: 149, date: '2026-09-20'}
    ],
    tier: 'Supporter',
    badge: 'Supporter',
    badgeClass: 'badge-silver',
  },
];

// ─────────────────────────────────────────────────────────

// Animated counter hook
function useAnimatedCounter(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

const Donators = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate totals
  const totalRaised = DONATORS.reduce(
    (sum, d) => sum + d.purchases.reduce((s, p) => s + p.amount, 0),
    0
  );
  const totalDonators = DONATORS.length;
  const totalItems = DONATORS.reduce((sum, d) => sum + d.purchases.length, 0);
  const goalPercent = Math.min((totalRaised / DONATION_GOAL) * 100, 100);
  const goalRemaining = Math.max(DONATION_GOAL - totalRaised, 0);

  // Sort donators by total amount (highest first)
  const sortedDonators = [...DONATORS]
    .map(d => ({
      ...d,
      totalAmount: d.purchases.reduce((s, p) => s + p.amount, 0),
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const topDonator = sortedDonators[0];

  // Filter donators by search term
  const filteredDonators = sortedDonators.filter(d => {
    const term = searchTerm.toLowerCase();
    return (
      d.username.toLowerCase().includes(term) ||
      d.purchases.some(p => p.item.toLowerCase().includes(term)) ||
      d.tier.toLowerCase().includes(term)
    );
  });

  // Animated counters
  const [animRaised, raisedRef] = useAnimatedCounter(totalRaised);
  const [animPercent, percentRef] = useAnimatedCounter(Math.round(goalPercent));

  return (
    <div className="donators-page">
      {/* Background Image with Dark Gradient Overlays */}
      <div className="donators-bg-wrap">
        <img src={bgImg} alt="AlooSMP Background" className="donators-bg-img" />
        <div className="donators-bg-overlay" />
        <div className="donators-grid-pattern" />
      </div>

      {/* Floating particles */}
      <div className="donators-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`d-particle d-particle-${i + 1}`} />
        ))}
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
        </div>

        {/* ── DONATION GOAL PROGRESS ── */}
        <div className="goal-section" ref={raisedRef}>
          <div className="goal-header">
            <div className="goal-title-row">
              <MdFlag className="goal-flag-icon" />
              <h2 className="goal-title">Donation <span>Goal</span></h2>
            </div>
            <div className="goal-amounts">
              <span className="goal-raised">₹{animRaised}</span>
              <span className="goal-separator">/</span>
              <span className="goal-target">₹{DONATION_GOAL}</span>
            </div>
          </div>

          <div className="goal-bar-track">
            <div
              className="goal-bar-fill"
              style={{ width: `${goalPercent}%` }}
            >
              <div className="goal-bar-shimmer" />
            </div>
            <div className="goal-bar-glow" style={{ left: `${goalPercent}%` }} />
          </div>

          <div className="goal-stats-row" ref={percentRef}>
            <div className="goal-stat-chip">
              <MdTrendingUp />
              <span>{animPercent}% Complete</span>
            </div>
            <div className="goal-stat-chip remaining">
              <MdDiamond />
              <span>₹{goalRemaining} Remaining</span>
            </div>
            <div className="goal-stat-chip donors">
              <MdFavorite />
              <span>{totalDonators} Supporters</span>
            </div>
          </div>

          {/* Goal milestones */}
          <div className="goal-milestones">
            {[25, 50, 75, 100].map(milestone => {
              const reached = goalPercent >= milestone;
              return (
                <div
                  key={milestone}
                  className={`milestone-marker ${reached ? 'reached' : ''}`}
                >
                  <div className="milestone-dot" />
                  <span className="milestone-label">
                    {milestone === 100 ? '🎯' : `${milestone}%`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STATS OVERVIEW CARDS ── */}
        <div className="donators-stats-grid">
          <div className="donators-stat-card stat-raised">
            <div className="donators-stat-icon gold">
              <MdWorkspacePremium />
            </div>
            <div className="donators-stat-info">
              <span className="donators-stat-value">₹{totalRaised}</span>
              <span className="donators-stat-label">Total Raised</span>
            </div>
          </div>

          <div className="donators-stat-card stat-donators">
            <div className="donators-stat-icon green">
              <MdFavorite />
            </div>
            <div className="donators-stat-info">
              <span className="donators-stat-value">{totalDonators}</span>
              <span className="donators-stat-label">Total Donators</span>
            </div>
          </div>

          <div className="donators-stat-card stat-items">
            <div className="donators-stat-icon purple">
              <MdShoppingBag />
            </div>
            <div className="donators-stat-info">
              <span className="donators-stat-value">{totalItems}</span>
              <span className="donators-stat-label">Items Purchased</span>
            </div>
          </div>

          <div className="donators-stat-card stat-top">
            <div className="donators-stat-icon blue">
              <MdEmojiEvents />
            </div>
            <div className="donators-stat-info">
              <Link to={`/profile/${topDonator?.username}`} className="stat-top-link">
                {topDonator?.username}
              </Link>
              <span className="donators-stat-label">Top Supporter (₹{topDonator?.totalAmount})</span>
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
            {sortedDonators.map((donator, idx) => (
              <div key={donator.id} className={`featured-donator-card ${donator.badgeClass}`}>
                <div className="featured-card-glow" />
                <div className="featured-badge-tag">{donator.badge}</div>

                <Link to={`/profile/${donator.username}`} className="featured-avatar-link">
                  <div className="featured-avatar-frame">
                    <img
                      src={getAvatarUrl(donator.username)}
                      alt={donator.username}
                      className="featured-avatar-img"
                    />
                  </div>
                </Link>

                <Link to={`/profile/${donator.username}`} className="featured-player-name-link">
                  <h3 className="featured-player-name">{donator.username}</h3>
                </Link>
                <span className="featured-tier-label">{donator.tier}</span>

                <div className="featured-purchases-list">
                  {donator.purchases.map((purchase, i) => (
                    <div key={i} className="featured-purchase-row">
                      <span className="purchase-item-name">
                        <MdShoppingBag /> {purchase.item}
                      </span>
                      <span className="purchase-item-amount">₹{purchase.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="featured-amount-badge">
                  <span className="amount-label">Total Contributed</span>
                  <span className="amount-value">₹{donator.totalAmount}</span>
                </div>

                <Link to={`/profile/${donator.username}`} className="featured-profile-btn">
                  View Profile <MdOpenInNew />
                </Link>
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
                        <span className={`rank-num ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`}>
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
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
                          {d.purchases.map((p, i) => (
                            <span key={i} className="purchase-item-chip">
                              {p.item} — ₹{p.amount}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="col-amount">
                        <span className="amount-pill">₹{d.totalAmount}</span>
                      </td>

                      <td className="col-action">
                        <Link to={`/profile/${d.username}`} className="table-profile-link">
                          View <MdOpenInNew />
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
