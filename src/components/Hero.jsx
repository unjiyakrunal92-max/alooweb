import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import {
  MdContentCopy,
  MdCheckCircle,
  MdStorage,
  MdGroups,
  MdWhatshot,
  MdPersonPin,
  MdPlayArrow,
  MdLeaderboard,
  MdTerminal,
  MdDesktopWindows,
  MdPhoneAndroid,
  MdPublic,
  MdEmojiEvents,
  MdSatelliteAlt,
} from 'react-icons/md';
import { fetchPlayers, fetchServerInfo } from '../utils/api';
import CountUp from './CountUp';

// ── Server Info ──
const JAVA_IP      = 'play.aloosmp.fun';
const BEDROCK_IP   = 'play.aloosmp.fun';
const BEDROCK_PORT = '19132';
const MAX_PLAYERS  = 100; // shown as "X / 100" — change if your server slots differ

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [tab, setTab]       = useState('java'); // 'java' | 'bedrock'

  // ── Live server data ──
  const [onlineCount, setOnlineCount]   = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [serverOnline, setServerOnline] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([
      fetchPlayers(200),
      fetchServerInfo(),
    ])
      .then(([playersResult, serverResult]) => {
        if (cancelled) return;

        // ── Players ──
        if (playersResult.status === 'fulfilled') {
          const players = playersResult.value;
          const online = players.filter(p => p.is_online).length;
          setOnlineCount(online);
          setTotalPlayers(players.length);
        } else {
          console.error('[Hero] fetchPlayers failed:', playersResult.reason);
          setOnlineCount(0);
          setTotalPlayers(0);
        }

        // ── Server status ──
        if (serverResult.status === 'fulfilled') {
          const server = serverResult.value;
          // fetchServerInfo always injects online:true on success, online:false on failure
          setServerOnline(server.online === true);
        } else {
          console.error('[Hero] fetchServerInfo failed:', serverResult.reason);
          setServerOnline(false);
        }
      })
      .finally(() => { if (!cancelled) setStatsLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const currentIP   = tab === 'java' ? JAVA_IP : BEDROCK_IP;
  const currentPort = tab === 'bedrock' ? BEDROCK_PORT : null;

  const handleCopy = () => {
    const text = tab === 'bedrock'
      ? `${BEDROCK_IP}:${BEDROCK_PORT}`
      : JAVA_IP;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="hero-section">

      {/* Top Right Floating Corner Badge */}
      <div className="hero-corner-dev-pill">
        <span className="dev-pill-icon">⚡</span>
        <div className="dev-pill-content">
          <span className="dev-pill-title">Website Created by <strong>Krunal Patel</strong></span>
          <span className="dev-pill-sub">AlooSMP Co-Owner & Dev • Discord: <strong>ITZ_KRUNAL</strong></span>
        </div>
      </div>

      {/* Animated background */}
      <div className="hero-grid-bg" />
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      <div className="hero-inner">

        {/* ════ LEFT — Main Content ════ */}
        <div className="hero-content">
          {/* Season badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">
              <MdWhatshot style={{ fontSize: '14px', marginRight: '4px', verticalAlign: 'middle' }} />
              Season 5 is Live
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Welcome to
            <span className="hero-title-accent">AlooSMP</span>
            <span className="hero-title-outline">Survival.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            India's most exciting Hardcore Survival SMP. Custom economy,
            clan wars, live leaderboards and a community built for warriors.
            Free to join — one life only.
          </p>

          {/* Java / Bedrock tabs */}
          <div className="hero-ip-tabs">
            <button
              className={`ip-tab-btn ${tab === 'java' ? 'active' : ''}`}
              onClick={() => setTab('java')}
            >
              <MdDesktopWindows />
              Java
            </button>
            <button
              className={`ip-tab-btn ${tab === 'bedrock' ? 'active' : ''}`}
              onClick={() => setTab('bedrock')}
            >
              <MdPhoneAndroid />
              Bedrock
            </button>
          </div>

          {/* IP Copy Box */}
          <div className="hero-ip-box">
            <div className="ip-box-icon">
              <MdTerminal />
            </div>
            <div className="ip-box-text">
              {currentIP}
              {currentPort && (
                <span className="ip-box-port">
                  <MdStorage style={{ fontSize: '11px', verticalAlign: 'middle', marginRight: '3px' }} />
                  Port: {currentPort}
                </span>
              )}
            </div>
            <button
              className={`ip-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <MdCheckCircle /> : <MdContentCopy />}
              {copied ? 'Copied!' : 'Copy IP'}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <a href="#join" className="btn-hero-primary">
              <MdPlayArrow />
              How to Join
            </a>
            <a href="#leaderboard" className="btn-hero-secondary">
              <MdLeaderboard />
              Leaderboard
            </a>
          </div>

        </div>

        {/* ════ RIGHT — Live Stats Card ════ */}
        <div className="hero-card">

          <div className="hero-card-title">
            Live Server Stats
          </div>

          {/* Online status — live from API, animated entrance */}
          <div className="hero-stat-row stat-anim" style={{ animationDelay: '0.05s' }}>
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdSatelliteAlt /></div>
              Server Status
            </div>
            {statsLoading ? (
              <span className="stat-row-value">...</span>
            ) : (
              <span className={`online-badge ${!serverOnline ? 'offline' : ''}`}>
                <span className={`online-dot ${!serverOnline ? 'offline' : ''}`} />
                {serverOnline ? 'Online' : 'Offline'}
              </span>
            )}
          </div>

          {/* Players online — live from API, animated */}
          <div className="hero-stat-row stat-anim" style={{ animationDelay: '0.15s' }}>
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdGroups /></div>
              Players Online
            </div>
            <span className="stat-row-value green">
              {statsLoading ? '...' : (
                <>
                  <CountUp value={onlineCount} format={false} /> / {MAX_PLAYERS}
                </>
              )}
            </span>
          </div>

          {/* Total players — live from API, animated */}
          <div className="hero-stat-row stat-anim" style={{ animationDelay: '0.25s' }}>
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdPersonPin /></div>
              Total Players
            </div>
            <span className="stat-row-value blue">
              {statsLoading ? '...' : (
                <CountUp value={totalPlayers} suffix="+" />
              )}
            </span>
          </div>

          {/* Season */}
          <div className="hero-stat-row stat-anim" style={{ animationDelay: '0.35s' }}>
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdEmojiEvents /></div>
              Current Season
            </div>
            <span className="stat-row-value">Season 5</span>
          </div>

          <div className="hero-card-divider" />

          {/* Version tags */}
          <div className="stat-anim" style={{ animationDelay: '0.45s' }}>
            <div className="hero-card-title" style={{ paddingBottom: '12px', marginBottom: '12px' }}>
              Supported Versions
            </div>
            <div className="hero-version-row">
              <span className="version-tag">
                <MdDesktopWindows /> Java 1.21+
              </span>
              <span className="version-tag bedrock">
                <MdPhoneAndroid /> Bedrock
              </span>
              <span className="version-tag">
                <MdPublic /> India Hosted
              </span>
            </div>
          </div>

          {/* Developer / Co-Owner Credit Badge */}
          <div className="hero-dev-card stat-anim" style={{ animationDelay: '0.55s' }}>
            <div className="dev-card-left">
              <div className="dev-card-badge">DEV</div>
            </div>
            <div className="dev-card-info">
              <div className="dev-card-by">Website Created by <span>Krunal Patel</span></div>
              <div className="dev-card-role">AlooSMP Co-Owner & Dev</div>
              <div className="dev-card-discord">Discord: <span>ITZ_KRUNAL</span></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;