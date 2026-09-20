import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Vote.css';
import {
  MdHowToVote,
  MdOpenInNew,
  MdContentCopy,
  MdCheckCircle,
  MdStar,
  MdCardGiftcard,
  MdStorefront,
  MdLeaderboard,
  MdHelpOutline,
  MdWorkspacePremium,
  MdDiamond,
  MdKey,
  MdAttachMoney,
  MdBolt,
  MdArrowForward,
  MdCampaign,
} from 'react-icons/md';
import { getAvatarUrl } from '../utils/api';

// ══════════════════════════════════════════════════════════════════
// 📢 ACTIVE AD / PROMOTION BANNER CONFIGURATION
//
// 1. IF NO AD (Default):
//    Leave enabled: false (or mediaSrc: '')
//    -> It will automatically show the "You Can Ad Here" default banner
//       with the "Advertise Here" button linking to your Discord!
//
// 2. IF YOU HAVE AN AD / SPONSOR:
//    - Set enabled: true
//    - mediaType: 'image' (for png, jpg, gif, webp) or 'video' (for mp4, webm)
//    - mediaSrc: 'https://...' (paste image or video URL here)
//    - link: 'https://...' (promoter's target link: Discord, store, website, etc.)
//    - altText: 'Promoter Name / Brand'
// ══════════════════════════════════════════════════════════════════
export const ACTIVE_AD = {
  enabled: false, // Set to true to show your custom ad banner, false to show default "You Can Ad Here"
  mediaType: 'image', // 'image' or 'video'
  mediaSrc: '', // Paste image/gif URL or video URL here (e.g. 'https://i.imgur.com/example.png' or '/banners/ad.gif')
  link: 'https://discord.gg/gXPwdwdB7F', // Promoter's target redirect URL
  altText: 'Sponsored Partner Banner', // Accessibility / hover title text
  showBadge: true, // Shows small "SPONSORED" badge on the banner
};

// ── VOTE SITES (Supplied by Server Owner) ──
export const VOTE_LINKS = [
  {
    id: 1,
    number: '#1',
    name: 'Vote Link #1',
    site: 'Minecraft-MP',
    domain: 'minecraft-mp.com',
    url: 'https://minecraft-mp.com/server/362586/vote',
    reward: '5k Money + Vote Key',
    badgeColor: '#8b5cf6', // Vibrant purple like PikaNetwork
  },
  {
    id: 2,
    number: '#2',
    name: 'Vote Link #2',
    site: 'Minecraft ServerList',
    domain: 'minecraft-serverlist.com',
    url: 'https://minecraft-serverlist.com/server/6140/vote',
    reward: '5k Money + Vote Key',
    badgeColor: '#6366f1', // Indigo
  },
  {
    id: 3,
    number: '#3',
    name: 'Vote Link #3',
    site: 'Minecraft Buzz',
    domain: 'minecraft.buzz',
    url: 'https://minecraft.buzz/vote/aloo-smp',
    reward: '5k Money + Vote Key',
    badgeColor: '#3b82f6', // Royal blue
  },
  {
    id: 4,
    number: '#4',
    name: 'Vote Link #4',
    site: 'TopG Servers',
    domain: 'topg.org',
    url: 'https://topg.org/minecraft-servers/server-685238',
    reward: '5k Money + Vote Key',
    badgeColor: '#0ea5e9', // Sky blue
  },
  {
    id: 5,
    number: '#5',
    name: 'Vote Link #5',
    site: 'Minecraft Servers Org',
    domain: 'minecraftservers.org',
    url: 'https://minecraftservers.org/vote/691896',
    reward: '5k Money + Vote Key',
    badgeColor: '#10b981', // Emerald
  },
  {
    id: 6,
    number: '#6',
    name: 'Vote Link #6',
    site: 'Planet Minecraft',
    domain: 'planetminecraft.com',
    url: 'https://www.planetminecraft.com/server/aloo-smp/vote/',
    reward: '5k Money + Vote Key',
    badgeColor: '#FB2910', // maroon
  },
  {
    id: 7,
    number: '#7',
    name: 'Vote Link #7',
    site: 'Best Minecraft Servers',
    domain: 'best-minecraft-servers.co',
    url: 'https://best-minecraft-servers.co/server-aloo-smp.33349/vote',
    reward: '5k Money + Vote Key',
    badgeColor: '#FB7E10', // Orange
  },
  {
    id: 8,
    number: '#8',
    name: 'Vote Link #8',
    site: 'Minecraft Pocket-Servers',
    domain: 'minecraftpocket-servers.com',
    url: 'https://minecraftpocket-servers.com/server/134299/vote/',
    reward: '5k Money + Vote Key',
    badgeColor: '#FBBF24', // Yellow
  }
];

// Top voters list
const TOP_VOTERS = [
  // { name: 'HARISHMEENA7777', votes: 145, rank: 1 },
  // { name: 'rayyan',          votes: 132, rank: 2 },
  // { name: 'HyperPRO',        votes: 118, rank: 3 },
  // { name: 'Mr_ANKIT_322',    votes: 98,  rank: 4 },
  // { name: 'krunal23',        votes: 84,  rank: 5 },
];

const VOTE_REWARDS = [
  { icon: <MdAttachMoney />, label: '5k Server Money', desc: 'Instant in-game cash deposited per vote' },
  { icon: <MdKey />,         label: '1x Vote Crate Key', desc: 'Open vote crates for rare loot' },
  { icon: <MdBolt />,        label: '+250 Level XP', desc: 'Level up faster & unlock perks' },
  { icon: <MdDiamond />,     label: 'Rank Voucher Chance', desc: 'Rare drop for lucky voters' },
];

const Vote = () => {
  // Copy feedback state per link ID
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Voted tracking in current session
  const [votedMap, setVotedMap] = useState({});

  // Floating particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Load voted session state
    try {
      const storedVoted = JSON.parse(sessionStorage.getItem('aloosmp_voted_map') || '{}');
      setVotedMap(storedVoted);
    } catch {
      // ignore
    }

    // Generate background particles
    const arr = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 6,
      drift: (Math.random() - 0.5) * 60,
    }));
    setParticles(arr);
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleCopyLink = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    triggerToast('Vote link copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleVoteClick = (id) => {
    const updated = { ...votedMap, [id]: true };
    setVotedMap(updated);
    try {
      sessionStorage.setItem('aloosmp_voted_map', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const votedCount = Object.keys(votedMap).length;

  return (
    <div className="vote-page">
      {/* Ambient background particles */}
      <div className="vote-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="vote-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="vote-inner">

        {/* ════════ HEADER ════════ */}
        <div className="vote-header">
          <div className="vote-tag">
            <MdStar /> Daily Support & Rewards
          </div>
          <h1 className="vote-title">
            Vote for <span>AlooSMP</span>: Best Server 2026
          </h1>
          <p className="vote-desc">
            Vote daily on all 5 server lists below to claim free in-game coins, vote keys, crate vouchers, and XP. Every single vote helps our community grow!
          </p>
        </div>

        {/* ════════ MAIN LAYOUT (Links + Sidebar) ════════ */}
        <div className="vote-layout">

          {/* ── LEFT COLUMN: Links & Username ── */}
          <div className="vote-main-col">

            {/* ── Advertisement / Promotion Banner ── */}
            {ACTIVE_AD.enabled && ACTIVE_AD.mediaSrc ? (
              /* ACTIVE SPONSOR BANNER (Custom Image or Video with Promoter Link) */
              <a
                href={ACTIVE_AD.link || 'https://discord.gg/gXPwdwdB7F'}
                target="_blank"
                rel="noopener noreferrer"
                className="vote-custom-ad-banner"
                title={ACTIVE_AD.altText || 'Sponsored Partner Banner'}
              >
                {ACTIVE_AD.showBadge && (
                  <span className="vcab-badge">
                    <MdCampaign /> SPONSORED
                  </span>
                )}
                <div className="vcab-media-wrap">
                  {ACTIVE_AD.mediaType === 'video' ? (
                    <video
                      src={ACTIVE_AD.mediaSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="vcab-media"
                    />
                  ) : (
                    <img
                      src={ACTIVE_AD.mediaSrc}
                      alt={ACTIVE_AD.altText || 'Sponsored Partner Banner'}
                      className="vcab-media"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="vcab-hover-overlay">
                  <span className="vcab-hover-btn">
                    Visit Sponsor <MdOpenInNew />
                  </span>
                </div>
              </a>
            ) : (
              /* DEFAULT "YOU CAN AD HERE" BANNER */
              <a
                href="https://discord.gg/gXPwdwdB7F"
                target="_blank"
                rel="noopener noreferrer"
                className="vote-ad-banner"
                title="You can ad here — Promote your server or brand on Website & Discord both!"
              >
                <div className="vab-shimmer" />
                <div className="vab-glow" />

                <div className="vab-left">
                  <div className="vab-icon-wrap">
                    <MdCampaign className="vab-promo-icon" />
                  </div>
                  <div className="vab-info">
                    <div className="vab-top-row">
                      <span className="vab-badge">
                        <MdCampaign className="vab-badge-icon" /> Ad Promotion
                      </span>
                      <span className="vab-tag">Website & Discord Both</span>
                    </div>
                    <h3 className="vab-title">
                      You Can <span>Ad Here</span>
                    </h3>
                    <p className="vab-desc">
                      Promote your Minecraft server, Discord, YouTube, or brand across our <strong>Website & Discord</strong>!
                    </p>
                  </div>
                </div>

                <div className="vab-cta">
                  <span className="vab-cta-btn">
                    <span>Advertise Here</span>
                    <MdOpenInNew className="vab-cta-arrow" />
                  </span>
                </div>
              </a>
            )}

            {/* Voting Progress Banner */}
            <div className="vote-progress-banner">
              <div className="vpb-left">
                <span className="vpb-dot" />
                <span className="vpb-text">
                  You've voted on <strong>{votedCount}</strong> of <strong>{VOTE_LINKS.length}</strong> links this session
                </span>
              </div>
              <span className="vpb-hint">Links reset every 12–24h</span>
            </div>

            {/* Vote Links List (Cards 1 to 5) */}
            <div className="vote-links-list">
              {VOTE_LINKS.map((link) => {
                const isVoted = votedMap[link.id];
                const isCopied = copiedId === link.id;

                return (
                  <div
                    key={link.id}
                    className={`pika-vote-card ${isVoted ? 'voted' : ''}`}
                    style={{ '--badge-color': link.badgeColor }}
                  >
                    <div className="pvc-main">
                      {/* Left Purple Badge (#1, #2, etc.) */}
                      <div className="pvc-number-badge">
                        <span>{link.number}</span>
                      </div>

                      {/* Middle Info */}
                      <div className="pvc-info">
                        <div className="pvc-title-row">
                          <h3 className="pvc-title">{link.name}</h3>
                          <span className="pvc-site-pill">{link.site}</span>
                          {isVoted && (
                            <span className="pvc-voted-pill">
                              <MdCheckCircle /> Voted
                            </span>
                          )}
                        </div>

                        <div className="pvc-url-row">
                          <span className="pvc-url">{link.url}</span>
                        </div>

                        <div className="pvc-reward-row">
                          <MdCardGiftcard className="pvc-reward-icon" />
                          <span>Reward: <strong>{link.reward}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pvc-actions">
                      {/* Copy Link button */}
                      <button
                        className={`pvc-copy-btn ${isCopied ? 'copied' : ''}`}
                        onClick={() => handleCopyLink(link.url, link.id)}
                        title="Copy Vote URL"
                      >
                        {isCopied ? <MdCheckCircle /> : <MdContentCopy />}
                        <span className="btn-text">{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>

                      {/* Click To Vote button */}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pvc-vote-btn"
                        onClick={() => handleVoteClick(link.id)}
                        title="Open vote site"
                      >
                        <span className="btn-text">Click To Vote</span>
                        <MdOpenInNew className="btn-icon" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voting Rewards Grid */}
            <div className="vote-rewards-section">
              <div className="vrs-header">
                <MdWorkspacePremium className="vrs-icon" />
                <h3>Every Vote Counts · In-Game Rewards</h3>
              </div>
              <div className="vrs-grid">
                {VOTE_REWARDS.map((rew, i) => (
                  <div className="vrs-card" key={i}>
                    <div className="vrs-card-icon">{rew.icon}</div>
                    <div className="vrs-card-info">
                      <span className="vrs-card-title">{rew.label}</span>
                      <span className="vrs-card-desc">{rew.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Sidebar (Store + Top Voters + Help) ── */}
          <div className="vote-sidebar-col">

            {/* Gold Store CTA Banner (Like Pika's top right yellow button) */}
            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="vote-store-cta"
            >
              <div className="vsc-icon">
                <MdStorefront />
              </div>
              <div className="vsc-text">
                <span className="vsc-title">Click here to buy Ranks & Keys</span>
                <span className="vsc-sub">Support AlooSMP · Exclusive in-game perks</span>
              </div>
              <MdOpenInNew className="vsc-arrow" />
            </a>

            {/* Server Leaderboard Card with Button & Description */}
            <div className="vote-sidebar-card vote-lb-card">
              <div className="vsc-card-header">
                <div className="vsc-header-left">
                  <MdLeaderboard className="vsc-header-icon lb-icon" />
                  <h4>Server Leaderboard</h4>
                </div>
                <span className="vsc-header-tag lb">Rankings</span>
              </div>
              <p className="vsc-card-text">
                Check where you stand among the richest tycoons and top fighters on AlooSMP! View live stats for Net Worth, Player Kills, and Playtime.
              </p>
              <Link to="/leaderboard" className="vote-lb-cta-btn">
                <MdLeaderboard className="btn-icon" />
                <span>View Full Leaderboard</span>
                <MdArrowForward className="btn-arrow" />
              </Link>
            </div>

            {/* Top Voters Card */}
            <div className="vote-sidebar-card">
              <div className="vsc-card-header">
                <div className="vsc-header-left">
                  <MdLeaderboard className="vsc-header-icon" />
                  <h4>Top Voters This Month</h4>
                </div>
                <span className="vsc-header-tag">Live</span>
              </div>

              <div className="vsc-voters-list">
                {TOP_VOTERS.length > 0 ? (
                  TOP_VOTERS.map((voter) => {
                    const medal = voter.rank === 1 ? '🥇' : voter.rank === 2 ? '🥈' : voter.rank === 3 ? '🥉' : `#${voter.rank}`;
                    const rankClass = voter.rank === 1 ? 'top-1' : voter.rank === 2 ? 'top-2' : voter.rank === 3 ? 'top-3' : '';

                    return (
                      <div className={`vsc-voter-row ${rankClass}`} key={voter.name}>
                        <div className="vsc-voter-rank">{medal}</div>
                        <div className="vsc-voter-avatar">
                          <img src={getAvatarUrl(voter.name)} alt={voter.name} />
                        </div>
                        <div className="vsc-voter-info">
                          <span className="vsc-voter-name">{voter.name}</span>
                          <span className="vsc-voter-sub">{voter.votes} votes</span>
                        </div>
                        <div className="vsc-voter-badge">
                          {voter.votes}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="vsc-empty-voters">
                    <p>Monthly voter rankings reset every month. Vote on all links above to claim #1!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Vote FAQ Card */}
            <div className="vote-sidebar-card faq-card">
              <div className="vsc-card-header">
                <div className="vsc-header-left">
                  <MdHelpOutline className="vsc-header-icon" />
                  <h4>Voting Guide & FAQ</h4>
                </div>
              </div>

              <div className="vsc-faq-list">
                <div className="vsc-faq-item">
                  <span className="faq-q">How often can I vote?</span>
                  <p className="faq-a">
                    Most sites allow 1 vote per 24 hours. Vote on all 5 links daily for maximum rewards!
                  </p>
                </div>
                <div className="vsc-faq-item">
                  <span className="faq-q">Bedrock Edition Players</span>
                  <p className="faq-a">
                    Add a dot in front of your Gamertag, for example <code>.Steve</code>, so rewards are delivered to your Bedrock character.
                  </p>
                </div>
                <div className="vsc-faq-item">
                  <span className="faq-q">How to claim in-game?</span>
                  <p className="faq-a">
                    Rewards are credited automatically within 60 seconds! If you were offline, type <code>/vote claim</code> when you log in.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Toast Alert */}
      <div className={`vote-toast ${showToast ? 'show' : ''}`}>
        <MdCheckCircle className="toast-icon" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

export default Vote;