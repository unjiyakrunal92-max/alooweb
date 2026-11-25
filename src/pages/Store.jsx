import React, { useState, useEffect, useRef } from 'react';
import '../styles/Store.css';
import bgImg from '../assets/bg.jpg';
import Footer from '../components/Footer';
import {
  MdStorefront,
  MdCheckCircle,
  MdKey,
  MdDiamond,
  MdAutoAwesome,
  MdWorkspacePremium,
  MdFavorite,
  MdOpenInNew,
  MdBolt,
  MdLocalOffer,
  MdAttachMoney,
  MdAcUnit,
  MdEdit,
  MdRestaurant,
  MdDeleteOutline,
  MdHome,
  MdCardGiftcard,
  MdHealing,
  MdBuild,
  MdFlightTakeoff,
  MdRadar,
  MdInventory2,
  MdWbSunny,
  MdStar,
  MdPublic,
} from 'react-icons/md';
import {
  GiBanana,
  GiCrossedSwords,
  GiCrown,
  GiPotato,
  GiKey,
  GiLockedChest,
  GiSparkles,
  GiDiamondTrophy,
  GiCoins,
} from 'react-icons/gi';
import { RiDiscordFill } from 'react-icons/ri';

const DISCORD_INVITE = 'https://discord.gg/Ecf6UJq8MR';

const RANKS = [
  {
    id: 'banana',
    icon: <GiBanana />,
    name: 'Banana Rank',
    price: 59,
    tag: '🍌 Banana',
    money: '$50,000',
    shards: 'None',
    accent: '#facc15',
    featured: false,
    perks: [
      { text: '/nick', icon: <MdEdit />, inherited: false },
      { text: '/feed', icon: <MdRestaurant />, inherited: false },
      { text: '/disposal', icon: <MdDeleteOutline />, inherited: false },
      { text: '3 Homes', icon: <MdHome />, inherited: false },
      { text: 'Banana Rank Kit', icon: <MdCardGiftcard />, inherited: false },
    ],
  },
  {
    id: 'warrior',
    icon: <GiCrossedSwords />,
    name: 'Warrior Rank',
    price: 149,
    tag: '⚔️ Warrior',
    money: '$500,000',
    shards: '200',
    accent: '#fb7185',
    featured: false,
    perks: [
      { text: 'Includes all Banana Rank perks', icon: <MdCheckCircle />, inherited: true },
      { text: '/heal', icon: <MdHealing />, inherited: false },
      { text: '/craft', icon: <MdBuild />, inherited: false },
      { text: '/fly (1h everyday)', icon: <MdFlightTakeoff />, inherited: false },
      { text: '10 Homes', icon: <MdHome />, inherited: false },
      { text: 'Warrior Rank Kit', icon: <MdCardGiftcard />, inherited: false },
    ],
  },
  {
    id: 'champion',
    icon: <GiCrown />,
    name: 'Champion Rank',
    price: 199,
    tag: '👑 Champion',
    money: '$1,500,000',
    shards: '500',
    accent: '#38bdf8',
    featured: false,
    perks: [
      { text: 'Includes all Warrior Rank perks', icon: <MdCheckCircle />, inherited: true },
      { text: '/near', icon: <MdRadar />, inherited: false },
      { text: '/enderchest', icon: <MdInventory2 />, inherited: false },
      { text: '/ptime', icon: <MdWbSunny />, inherited: false },
      { text: '/fly (3h everyday)', icon: <MdFlightTakeoff />, inherited: false },
      { text: 'Champion Rank Kit', icon: <MdCardGiftcard />, inherited: false },
    ],
  },
  {
    id: 'aloo',
    icon: <GiPotato />,
    name: 'Aloo Rank',
    price: 299,
    tag: '🌟 Aloo',
    money: '$3,000,000',
    shards: '1,000',
    accent: '#ffd700',
    featured: true,
    perks: [
      { text: 'Includes all Champion Rank perks', icon: <MdCheckCircle />, inherited: true },
      { text: '/fly (unlimited)', icon: <MdFlightTakeoff />, inherited: false },
      { text: 'Access to All Rank Commands', icon: <MdAutoAwesome />, inherited: false },
      { text: 'Unlimited Homes', icon: <MdHome />, inherited: false },
      { text: 'Exclusive Server Benefits', icon: <MdStar />, inherited: false },
      { text: 'Aloo Rank Kit', icon: <MdCardGiftcard />, inherited: false },
    ],
  },
];

const CRATE_KEYS = [
  {
    id: 'crate',
    icon: <GiKey />,
    name: 'Spawner Keys',
    sub: 'Great starter crate rewards',
    accent: '#4ade80',
    bundles: [
      { count: 2,  price: 55 },
      { count: 4,  price: 100 },
      { count: 8,  price: 190 },
      { count: 12, price: 275 },
      { count: 16, price: 360 },
    ],
  },
  {
    id: 'rare',
    icon: <MdDiamond />,
    name: 'Rare Keys',
    sub: 'Upgraded gear & crate loot',
    accent: '#38bdf8',
    bundles: [
      { count: 2,  price: 65 },
      { count: 4,  price: 120 },
      { count: 8,  price: 230 },
      { count: 12, price: 335 },
      { count: 16, price: 440 },
    ],
  },
  {
    id: 'ultimate',
    icon: <GiLockedChest />,
    name: 'Ultimate Keys',
    sub: 'High-tier weapons & armor',
    accent: '#fb7185',
    bundles: [
      { count: 2,  price: 80 },
      { count: 4,  price: 150 },
      { count: 8,  price: 290 },
      { count: 12, price: 425 },
      { count: 16, price: 560 },
    ],
  },
  {
    id: 'fortune',
    icon: <GiSparkles />,
    name: 'Fortune Keys',
    sub: 'Best jackpots & vouchers',
    accent: '#facc15',
    bundles: [
      { count: 2,  price: 85 },
      { count: 4,  price: 160 },
      { count: 8,  price: 310 },
      { count: 12, price: 455 },
      { count: 16, price: 600 },
    ],
  },
];

const GLOBAL_BENEFITS = [
  {
    icon: <MdPublic />,
    color: '#38bdf8',
    title: 'Spawn Recognition',
    desc: 'Your customized Ranked Player NPC will be showcased right at the spawn!',
  },
  {
    icon: <RiDiscordFill />,
    color: '#818cf8',
    title: 'Discord Perks',
    desc: 'Get the exclusive VIP Role automatically assigned in our Discord server.',
  },
  {
    icon: <GiDiamondTrophy />,
    color: '#ffd700',
    title: 'Hall of Fame',
    desc: 'Features your name on the Aloo SMP Official Website rank leaderboards.',
  },
];

const Store = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ranks' | 'keys'
  const [selectedBundles, setSelectedBundles] = useState({
    crate: 0,
    rare: 0,
    ultimate: 0,
    fortune: 0,
  });

  const pageRef = useRef(null);

  // Curved left-to-right scroll reveal observer
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll('.store-reveal-curve'));
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
  }, [activeTab]);

  return (
    <div className="store-page" ref={pageRef}>
      {/* Background */}
      <div className="store-bg-wrap">
        <img src={bgImg} alt="AlooSMP Store Background" className="store-bg-img" />
        <div className="store-bg-overlay" />
        <div className="store-grid-pattern" />
      </div>

      <div className="store-container">
        {/* ════════ HEADER ════════ */}
        <div className="store-header store-reveal-curve" style={{ '--reveal-delay': '0ms' }}>
          <div className="store-tag">
            <MdStorefront /> AlooSMP Official Store
          </div>
          <h1 className="store-title">
            Ranks &amp; <span>Crate Keys</span>
          </h1>
          <p className="store-sub">
            Unlock powerful perks, starting cash, shards, and rare crate keys on <strong>AlooSMP</strong>. Clicking purchase takes you straight to our <strong>Discord</strong> to complete your order!
          </p>

          <div className="store-tabs">
            {[
              { id: 'all',   label: 'All Items',   icon: <MdAutoAwesome /> },
              { id: 'ranks', label: 'Ranks',       icon: <MdWorkspacePremium /> },
              { id: 'keys',  label: 'Crate Keys',  icon: <MdKey /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`store-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ════════ SERVER RANKS SECTION ════════ */}
        {(activeTab === 'all' || activeTab === 'ranks') && (
          <section className="store-section">
            <div className="store-sec-header store-reveal-curve">
              <div>
                <div className="store-sec-tag">
                  <MdWorkspacePremium /> Monthly VIP Tiers
                </div>
                <h2 className="store-sec-title">
                  Server <span>Ranks</span>
                </h2>
              </div>
              <div className="store-sec-note">
                <RiDiscordFill style={{ color: '#818cf8', fontSize: '18px' }} />
                Instant ticket delivery on Discord
              </div>
            </div>

            <div className="ranks-grid">
              {RANKS.map((rank, idx) => (
                <div
                  key={rank.id}
                  className={`rank-card ${rank.featured ? 'featured' : ''} store-reveal-curve`}
                  style={{ '--rank-accent': rank.accent, '--reveal-delay': `${idx * 90}ms` }}
                >
                  <div className="rank-card-glow" />
                  {rank.featured && (
                    <span className="rank-popular-ribbon">
                      <GiSparkles /> Top Rank
                    </span>
                  )}

                  <div className="rank-header">
                    <div className="rank-icon-badge">{rank.icon}</div>
                    <h3 className="rank-name">{rank.name}</h3>
                    <div className="rank-price-row">
                      <span className="rank-price">₹{rank.price}</span>
                      <span className="rank-period">/ month</span>
                    </div>
                  </div>

                  <div className="rank-meta-box">
                    <div className="rank-meta-row">
                      <span className="rank-meta-lbl">
                        <MdLocalOffer className="meta-ico tag" /> Chat Tag
                      </span>
                      <span className="rank-meta-val tag-pill">{rank.tag}</span>
                    </div>
                    <div className="rank-meta-row">
                      <span className="rank-meta-lbl">
                        <MdAttachMoney className="meta-ico money" /> Starting Money
                      </span>
                      <span className="rank-meta-val money">{rank.money}</span>
                    </div>
                    <div className="rank-meta-row">
                      <span className="rank-meta-lbl">
                        <MdAcUnit className="meta-ico shards" /> Shards
                      </span>
                      <span className="rank-meta-val shards">{rank.shards}</span>
                    </div>
                  </div>

                  <div className="rank-perks-title">
                    <GiSparkles /> Perks Included
                  </div>
                  <ul className="rank-perks-list">
                    {rank.perks.map((perk, i) => (
                      <li
                        key={i}
                        className={`rank-perk-item ${perk.inherited ? 'inherited' : ''}`}
                      >
                        <span className="rank-perk-icon">{perk.icon}</span>
                        <span>{perk.text}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={DISCORD_INVITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rank-buy-btn"
                  >
                    <RiDiscordFill style={{ fontSize: '18px' }} />
                    Buy {rank.name} — ₹{rank.price}
                    <MdOpenInNew />
                  </a>
                </div>
              ))}
            </div>

            {/* Extra Rank Benefits Banner */}
            <div className="global-perks-card store-reveal-curve" style={{ '--reveal-delay': '80ms' }}>
              <div className="global-perks-head">
                <h3>
                  <MdDiamond /> Extra Rank Benefits
                </h3>
                <span className="store-sec-note">
                  <MdBolt style={{ color: '#ffd700' }} /> Included with ALL ranked players
                </span>
              </div>

              <div className="global-perks-grid">
                {GLOBAL_BENEFITS.map((b) => (
                  <div
                    className="global-perk-item"
                    key={b.title}
                    style={{ '--gp-color': b.color }}
                  >
                    <div className="gp-icon-box">{b.icon}</div>
                    <div>
                      <div className="gp-title">{b.title}</div>
                      <p className="gp-desc">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="global-perks-footer">
                <MdFavorite style={{ color: '#ff6b7d', fontSize: '18px', flexShrink: 0 }} />
                <span>
                  Every purchase directly helps us pay for hosting, maintain the server, and bring exciting new updates to <strong>AlooSMP</strong>. Thank you for supporting us!
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ════════ CRATE KEYS SECTION ════════ */}
        {(activeTab === 'all' || activeTab === 'keys') && (
          <section className="store-section">
            <div className="store-sec-header store-reveal-curve">
              <div>
                <div className="store-sec-tag">
                  <GiCoins /> ExcellentCrates Bundles
                </div>
                <h2 className="store-sec-title">
                  Crate <span>Keys</span>
                </h2>
              </div>
              <div className="store-sec-note">
                Select a bundle size &amp; purchase on Discord
              </div>
            </div>

            <div className="keys-grid">
              {CRATE_KEYS.map((keyTier, idx) => {
                const activeBundleIdx = selectedBundles[keyTier.id] || 0;
                const activeBundle = keyTier.bundles[activeBundleIdx];

                return (
                  <div
                    key={keyTier.id}
                    className="key-card store-reveal-curve"
                    style={{ '--key-accent': keyTier.accent, '--reveal-delay': `${idx * 90}ms` }}
                  >
                    <div className="key-card-glow" />
                    <div className="key-header">
                      <div className="key-icon-box">{keyTier.icon}</div>
                      <div>
                        <h3 className="key-title">{keyTier.name}</h3>
                        <p className="key-sub">{keyTier.sub}</p>
                      </div>
                    </div>

                    <div className="key-bundles-list">
                      {keyTier.bundles.map((bundle, bIdx) => (
                        <button
                          key={bundle.count}
                          type="button"
                          className={`key-bundle-row ${activeBundleIdx === bIdx ? 'selected' : ''}`}
                          onClick={() =>
                            setSelectedBundles((prev) => ({ ...prev, [keyTier.id]: bIdx }))
                          }
                        >
                          <span className="bundle-qty">
                            <GiKey className="bundle-key-ico" /> {bundle.count} Keys
                          </span>
                          <span className="bundle-price">₹{bundle.price}</span>
                        </button>
                      ))}
                    </div>

                    <a
                      href={DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="key-buy-btn"
                    >
                      <RiDiscordFill style={{ fontSize: '17px' }} />
                      Buy {activeBundle.count} Keys — ₹{activeBundle.price}
                      <MdOpenInNew />
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;
