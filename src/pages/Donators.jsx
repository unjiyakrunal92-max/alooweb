import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Donators.css';
import bgImg from '../assets/bg.jpg';
import Footer from '../components/Footer';
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
  MdDns,
  MdBolt,
  MdCelebration,
  MdRocketLaunch,
} from 'react-icons/md';
import { getAvatarUrl } from '../utils/api';

// ─────────────────────────────────────────────────────────
// CONFIGURATION — Edit these values to update the page
// ─────────────────────────────────────────────────────────
const DONATION_GOAL = 3000; // ₹3000 goal
 
// MANUALLY ADD / EDIT DONATORS HERE
// Simply add new player objects whenever a purchase is made!
export const DONATORS = [
  {
    id: 'donator-suuvo5750',
    username: '.Suuvo5750',
    purchases: [
      { item: 'Aloo Rank', amount: 299, date: '2026-11-24' },
    ],
    tier: 'Aloo Supporter',
    badge: '👑 Aloo Rank',
    badgeClass: 'badge-gold',
  },
  {
    id: 'donator-ajstars',
    username: 'AJStars',
    purchases: [
      { item: 'Aloo Rank', amount: 299, date: '2026-10-30' },
    ],
    tier: 'Aloo Supporter',
    badge: '👑 Aloo Rank',
    badgeClass: 'badge-gold',
  },
  {
    id: 'donator-not-dip-patel',
    username: 'NOT_DIP_PATEL',
    purchases: [
      { item: 'Aloo Rank', amount: 299, date: '2026-10-30' },
    ],
    tier: 'Aloo Supporter',
    badge: '👑 Aloo Rank',
    badgeClass: 'badge-gold',
  },
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
    id: 'donator-3',
    username: 'Shorekeeper12',
    purchases: [
      { item: 'Spawner Key', amount: 180, date: '2026-08-01' },
    ],
    tier: 'Supporter',
    badge: 'Supporter',
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
  const [tierFilter, setTierFilter] = useState('all');
  const pageRef = useRef(null);

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

  // Filter donators by tier and search term
  const filteredDonators = sortedDonators.filter(d => {
    const matchesTier = tierFilter === 'all' || d.tier === tierFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      d.username.toLowerCase().includes(term) ||
      d.purchases.some(p => p.item.toLowerCase().includes(term)) ||
      d.tier.toLowerCase().includes(term);
    return matchesTier && matchesSearch;
  });

  // Animated counters & bar sweep
  const [animRaised, raisedRef] = useAnimatedCounter(totalRaised);
  const [animPercent, percentRef] = useAnimatedCounter(Math.round(goalPercent));
  const [animBarWidth, setAnimBarWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimBarWidth(goalPercent);
    }, 220);
    return () => clearTimeout(timer);
  }, [goalPercent]);

  // Curved left-to-right scroll reveal observer
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll('.reveal-curve'));
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
  }, [filteredDonators.length, tierFilter, searchTerm]);

  return (
    <div className="donators-page" ref={pageRef}>
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
        <div className="donators-header reveal-curve" style={{ '--reveal-delay': '0ms' }}>
          <div className="donators-tag">
            <MdVolunteerActivism /> Wall of Fame • Official Patrons
          </div>
          <h1 className="donators-title">
            Server <span>Donators</span>
          </h1>
          <p className="donators-sub">
            Honoring the legendary supporters powering <strong>AlooSMP</strong>. Every rank and key contribution directly funds high-performance hardware, custom features, and lag-free gameplay!
          </p>
        </div>

        {/* ── DONATION GOAL PROGRESS ── */}
        <div className="goal-section reveal-curve" style={{ '--reveal-delay': '80ms' }} ref={raisedRef}>
          <div className="goal-header">
            <div className="goal-title-col">
              <div className="goal-title-row">
                <div className="goal-flag-badge">
                  <MdFlag className="goal-flag-icon" />
                </div>
                <div>
                  <h2 className="goal-title">Monthly Server <span>Goal</span></h2>
                  <p className="goal-subtitle">
                    Supporting 24/7 low-ping India servers, crate events &amp; new updates
                  </p>
                </div>
              </div>
            </div>

            <div className="goal-amounts-box">
              <div className="goal-amounts">
                <span className="goal-raised">₹{animRaised.toLocaleString('en-IN')}</span>
                <span className="goal-separator">/</span>
                <span className="goal-target">₹{DONATION_GOAL.toLocaleString('en-IN')}</span>
              </div>
              <span className="goal-funded-pill">{animPercent}% Funded</span>
            </div>
          </div>

          <div className="goal-bar-wrap">
            <div className="goal-bar-floating-tag" style={{ left: `${animBarWidth}%` }}>
              <span>{animPercent}%</span>
            </div>
            <div className="goal-bar-track">
              {/* Vertical Milestone Ticks */}
              {[25, 50, 75].map((tick) => (
                <span
                  key={tick}
                  className={`goal-track-tick ${goalPercent >= tick ? 'passed' : ''}`}
                  style={{ left: `${tick}%` }}
                />
              ))}

              <div
                className="goal-bar-fill"
                style={{ width: `${animBarWidth}%` }}
              >
                <div className="goal-bar-stripes" />
                <div className="goal-bar-shimmer" />
              </div>
              <div className="goal-bar-glow" style={{ left: `${animBarWidth}%` }} />
            </div>
          </div>

          <div className="goal-actions-bar" ref={percentRef}>
            <div className="goal-stats-row">
              <div className="goal-stat-chip">
                <MdTrendingUp />
                <span>{animPercent}% Goal Reached</span>
              </div>
              <div className="goal-stat-chip remaining">
                <MdDiamond />
                <span>₹{goalRemaining.toLocaleString('en-IN')} Left to Target</span>
              </div>
              <div className="goal-stat-chip donors">
                <MdFavorite />
                <span>{totalDonators} Active Patrons</span>
              </div>
            </div>

            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="goal-boost-btn"
            >
              <MdBolt /> Boost Server Goal
            </a>
          </div>

          {/* Goal Milestone Perks */}
          <div className="goal-milestones">
            {[
              { pct: 25,  icon: <MdDns />,          title: 'Host Active',      desc: 'Core 24/7 upkeep' },
              { pct: 50,  icon: <MdBolt />,         title: 'Plugin Upgrades',  desc: 'New custom crates & features' },
              { pct: 75,  icon: <MdCelebration />,  title: 'Drop Party Event', desc: 'Server-wide key giveaways' },
              { pct: 100, icon: <MdRocketLaunch />, title: 'Mega Boost',       desc: 'Next-tier CPU & RAM upgrade' },
            ].map((m, idx, arr) => {
              const reached = goalPercent >= m.pct;
              const isNext = !reached && (idx === 0 || goalPercent >= arr[idx - 1].pct);
              return (
                <div
                  key={m.pct}
                  className={`milestone-card ${reached ? 'reached' : ''} ${isNext ? 'next-target' : ''}`}
                >
                  <div className="milestone-top">
                    <div className="milestone-icon-box">
                      {m.icon}
                    </div>
                    {reached ? (
                      <span className="milestone-badge unlocked">
                        <MdCheckCircle /> Unlocked
                      </span>
                    ) : isNext ? (
                      <span className="milestone-badge next">
                        Next Target
                      </span>
                    ) : (
                      <span className="milestone-badge locked">
                        {m.pct}%
                      </span>
                    )}
                  </div>
                  <div className="milestone-body">
                    <span className="milestone-pct">{m.pct}% Milestone</span>
                    <div className="milestone-name">{m.title}</div>
                    <div className="milestone-desc">{m.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── STATS OVERVIEW CARDS ── */}
        <div className="donators-stats-grid">
          <div className="donators-stat-card stat-raised reveal-curve" style={{ '--reveal-delay': '0ms' }}>
            <div className="donators-stat-icon gold">
              <MdWorkspacePremium />
            </div>
            <div className="donators-stat-info">
              <span className="donators-stat-value">₹{totalRaised}</span>
              <span className="donators-stat-label">Total Raised</span>
            </div>
          </div>

          <div className="donators-stat-card stat-donators reveal-curve" style={{ '--reveal-delay': '90ms' }}>
            <div className="donators-stat-icon green">
              <MdFavorite />
            </div>
            <div className="donators-stat-info">
              <span className="donators-stat-value">{totalDonators}</span>
              <span className="donators-stat-label">Total Donators</span>
            </div>
          </div>

          <div className="donators-stat-card stat-items reveal-curve" style={{ '--reveal-delay': '180ms' }}>
            <div className="donators-stat-icon purple">
              <MdShoppingBag />
            </div>
            <div className="donators-stat-info">
              <span className="donators-stat-value">{totalItems}</span>
              <span className="donators-stat-label">Items Purchased</span>
            </div>
          </div>

          <div className="donators-stat-card stat-top reveal-curve" style={{ '--reveal-delay': '270ms' }}>
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
              <div
                key={donator.id}
                className={`featured-donator-card ${donator.badgeClass} reveal-curve`}
                style={{ '--reveal-delay': `${(idx % 3) * 110}ms` }}
              >
                <div className="featured-card-glow" />
                <div className="featured-rank-pill">#{idx + 1}</div>
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
        <div className="donators-list-section reveal-curve" style={{ '--reveal-delay': '60ms' }}>
          <div className="list-toolbar">
            <div className="toolbar-title">
              <MdCardMembership />
              <span>All Purchases & Donations ({filteredDonators.length})</span>
            </div>

            <div className="toolbar-controls">
              <div className="tier-filter-pills">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'Aloo Supporter', label: 'Aloo Rank' },
                  { id: 'Supporter', label: 'Supporters' },
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tier-filter-btn ${tierFilter === t.id ? 'active' : ''}`}
                    onClick={() => setTierFilter(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
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
                  <button type="button" className="clear-search" onClick={() => setSearchTerm('')}>
                    ✕
                  </button>
                )}
              </div>
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
                    <tr
                      key={d.id}
                      className="donator-table-row reveal-curve"
                      style={{ '--reveal-delay': `${index * 45}ms` }}
                    >
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
        <div className="donators-cta-banner reveal-curve" style={{ '--reveal-delay': '80ms' }}>
          <div className="cta-content">
            <div className="cta-icon">💎</div>
            <div className="cta-text">
              <h3>Want to Support AlooSMP?</h3>
              <p>
                Get exclusive ranks, keys, kits, and special perks while supporting the server! Open a support ticket on Discord or visit our store.
              </p>
            </div>
          </div>
          <Link
            to="/store"
            className="cta-store-btn"
          >
            <MdShoppingBag /> Visit Store / Buy Ranks
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Donators;
