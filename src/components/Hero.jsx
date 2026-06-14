import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import {
  MdContentCopy,
  MdCheckCircle,
  MdDns,
  MdPeople,
  MdSignalWifi4Bar,
  MdStar,
  MdPlayArrow,
  MdLeaderboard,
  MdTerminal,
  MdDesktopWindows,
  MdPhoneAndroid,
  MdPublic,
  MdBolt,
  MdShield,
} from 'react-icons/md';
import { fetchPlayers, fetchServerInfo } from '../utils/api';

// ── Server Info ──
const JAVA_IP      = 'play.mralooyt.fun';
const BEDROCK_IP   = 'play.mralooyt.fun';
const BEDROCK_PORT = '25573';
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

    Promise.all([
      fetchPlayers(200),
      fetchServerInfo(),
    ])
      .then(([players, server]) => {
        if (cancelled) return;
        const online = players.filter(p => p.is_online).length;
        setOnlineCount(online);
        setTotalPlayers(players.length);
        // server.online may come from the API; fall back to "true if we have data"
        setServerOnline(server?.online !== undefined ? server.online : true);
      })
      .catch(() => {
        if (cancelled) return;
        setServerOnline(false);
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
              <MdBolt style={{ fontSize: '13px', marginRight: '4px', verticalAlign: 'middle' }} />
              Season 1 is Live
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Welcome to
            <span className="hero-title-accent">AlooSMP</span>
            <span className="hero-title-outline">Survive.</span>
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
                  <MdDns style={{ fontSize: '11px', verticalAlign: 'middle', marginRight: '3px' }} />
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

          {/* Online status — live from API */}
          <div className="hero-stat-row">
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdSignalWifi4Bar /></div>
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

          {/* Players online — live from API */}
          <div className="hero-stat-row">
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdPeople /></div>
              Players Online
            </div>
            <span className="stat-row-value green">
              {statsLoading ? '...' : `${onlineCount} / ${MAX_PLAYERS}`}
            </span>
          </div>

          {/* Total players — live from API */}
          <div className="hero-stat-row">
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdStar /></div>
              Total Players
            </div>
            <span className="stat-row-value blue">
              1024+
            </span>
          </div>

          {/* Season */}
          <div className="hero-stat-row">
            <div className="stat-row-label">
              <div className="stat-row-icon"><MdShield /></div>
              Current Season
            </div>
            <span className="stat-row-value">Season 1</span>
          </div>

          <div className="hero-card-divider" />

          {/* Version tags */}
          <div>
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

        </div>

      </div>
    </section>
  );
};

export default Hero;