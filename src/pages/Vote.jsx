import React, { useState, useEffect } from 'react';
import '../styles/Vote.css';
import {
  MdHowToVote,
  MdLocalFireDepartment,
  MdStar,
  MdAccessTime,
  MdLink,
  MdCardGiftcard,
  MdLeaderboard,
  MdCheckCircle,
  MdPublic,
  MdGames,
  MdRocketLaunch,
  MdAttachMoney,
  MdInventory,
  MdEmojiEvents,
  MdSchedule,
} from 'react-icons/md';

const getAvatarUrl = (name) => `https://mc-heads.net/avatar/${name}/64`;

// ── Vote Sites Config ──
// Replace href with your real vote links!
const VOTE_SITES = [
  {
    id: 'minecraft-mp',
    name: 'Minecraft-MP',
    desc: 'Vote on the largest Minecraft server list and help us climb the rankings.',
    icon: <MdPublic />,
    reward: '+500 Coins',
    cooldown: false,
    href: 'https://minecraft-mp.com/server/your-id/vote/',
  },
  {
    id: 'topg',
    name: 'TopG',
    desc: 'A quick vote here boosts our visibility on TopG server list.',
    icon: <MdRocketLaunch />,
    reward: '+500 Coins',
    cooldown: false,
    href: 'https://topg.org/minecraft-servers/server-your-id',
  },
  {
    id: 'minecraftservers',
    name: 'Minecraft Servers',
    desc: 'Help AlooSMP trend on MinecraftServers.org with one click.',
    icon: <MdGames />,
    reward: '+750 Coins',
    cooldown: true,
    href: 'https://minecraftservers.org/server/your-id',
  },
  {
    id: 'planetminecraft',
    name: 'Planet Minecraft',
    desc: 'Support us on PMC — the home of the Minecraft community.',
    icon: <MdEmojiEvents />,
    reward: '+500 Coins',
    cooldown: false,
    href: 'https://planetminecraft.com/server/aloosmp/vote',
  },
  {
    id: 'servers-minecraft',
    name: 'Servers-Minecraft',
    desc: 'Daily vote = daily rewards. Quick and easy.',
    icon: <MdInventory />,
    reward: '+500 Coins',
    cooldown: false,
    href: 'https://servers-minecraft.net/server-aloosmp.html',
  },
  {
    id: 'minecraft-server-list',
    name: 'MC Server List',
    desc: 'One of the oldest server lists — vote and earn instantly.',
    icon: <MdLink />,
    reward: '+500 Coins',
    cooldown: true,
    href: 'https://minecraft-server-list.com/server/your-id/vote/',
  },
];

// ── How it works steps ──
const HOW_STEPS = [
  {
    icon: <MdHowToVote />,
    title: 'Click & Vote',
    desc: 'Click any vote button above. You\'ll be redirected to the voting site — sign in or complete a captcha.',
  },
  {
    icon: <MdCardGiftcard />,
    title: 'Claim Rewards',
    desc: 'Rewards are sent automatically to your in-game account within 1-2 minutes of voting.',
  },
  {
    icon: <MdLocalFireDepartment />,
    title: 'Build Your Streak',
    desc: 'Vote on all sites every day to build your streak. 7-day streaks unlock bonus crates!',
  },
];

// ── Mock top voters ──
const TOP_VOTERS = [
  { name: 'xDarkKnight',  votes: 142 },
  { name: 'ShadowArcher', votes: 128 },
  { name: 'CrimsonBlade', votes: 109 },
  { name: 'PyroStrike',   votes: 94 },
  { name: 'NightWalker',  votes: 81 },
];

const Vote = () => {
  const [particles, setParticles] = useState([]);

  // Generate floating particles once
  useEffect(() => {
    const arr = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 80,
    }));
    setParticles(arr);
  }, []);

  // Mock streak — replace with real player data via API later
  const currentStreak = 4;

  return (
    <div className="vote-page">

      {/* Floating particles */}
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

        {/* ══ HEADER ══ */}
        <div className="vote-header">
          <div className="vote-tag">
            <MdStar /> Support The Server
          </div>
          <h1 className="vote-title">
            Vote for <span>AlooSMP</span>
          </h1>
          <p className="vote-desc">
            Help us grow by voting daily on the sites below. Every vote
            earns you in-game rewards and helps new players discover the server.
          </p>
        </div>

        {/* ══ STREAK BAR ══ */}
        <div className="vote-streak-bar">
          <div className="vote-streak-left">
            <div className="vote-streak-icon">
              <MdLocalFireDepartment />
            </div>
            <div>
              <div className="vote-streak-num">
                {currentStreak} <span>Day Streak</span>
              </div>
              <div className="vote-streak-label">
                Vote daily to keep your streak alive!
              </div>
            </div>
          </div>

          <div className="vote-streak-days">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`vote-streak-day ${i < currentStreak ? 'done' : ''}`}
              >
                {i < currentStreak ? <MdCheckCircle /> : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* ══ VOTE SITES GRID ══ */}
        <p className="vote-section-title">
          <MdHowToVote /> Vote Links
        </p>
        <div className="vote-grid">
          {VOTE_SITES.map((site, i) => (
            <div
              className="vote-card"
              key={site.id}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="vote-card-top">
                <div className="vote-card-icon">{site.icon}</div>
                <div className="vote-reward-badge">
                  <MdAttachMoney />
                  {site.reward}
                </div>
              </div>

              <h3 className="vote-card-title">{site.name}</h3>
              <p className="vote-card-desc">{site.desc}</p>

              {site.cooldown ? (
                <button className="vote-btn cooldown" disabled>
                  <MdSchedule />
                  Voted — 12h left
                </button>
              ) : (
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vote-btn available"
                >
                  <MdHowToVote />
                  Vote Now
                </a>
              )}
            </div>
          ))}
        </div>

        {/* ══ HOW VOTING WORKS ══ */}
        <div className="vote-how-section">
          <h2 className="vote-how-title">
            How <span>Voting</span> Works
          </h2>
          <div className="vote-how-steps">
            {HOW_STEPS.map((step, i) => (
              <div className="vote-how-step" key={i}>
                <div className="vote-how-icon">{step.icon}</div>
                <div className="vote-how-step-title">{step.title}</div>
                <p className="vote-how-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TOP VOTERS ══ */}
        <p className="vote-section-title">
          <MdLeaderboard /> Top Voters This Month
        </p>
        <div className="vote-top-list">
          {TOP_VOTERS.map((voter, i) => {
            const rankCls = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
            return (
              <div className={`vote-top-card ${rankCls}`} key={voter.name}>
                <div className="vote-top-rank">{i + 1}</div>
                <div className="vote-top-avatar">
                  <img src={getAvatarUrl(voter.name)} alt={voter.name} />
                </div>
                <div className="vote-top-name">{voter.name}</div>
                <div className="vote-top-count">{voter.votes}</div>
                <div className="vote-top-count-label">Votes</div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Vote;