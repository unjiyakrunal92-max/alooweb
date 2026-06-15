import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Profile.css';
import {
  MdArrowBack,
  MdStar,
  MdShield,
  MdGavel,
  MdAccessTime,
  MdAttachMoney,
  MdTrendingUp,
  MdCalendarToday,
  MdLeaderboard,
  MdFlashOn,
  MdFavorite,
  MdPublic,
  MdSignalWifi4Bar,
  MdConstruction,
  MdPets,
  MdHistory,
  MdBadge,
} from 'react-icons/md';
import {
  fetchPlayer,
  fetchPlayers,
  getAvatarUrl,
  formatMoney,
  formatPlaytime,
  formatDate,
  timeAgo,
  sortPlayers,
  isUsingMockData,
} from '../utils/api';
import PrefixBadge from '../components/PrefixBadge';
import DemoBanner from '../components/DemoBanner';
import CountUp from '../components/CountUp';

const Profile = () => {
  const { username } = useParams();
  const [player, setPlayer]   = useState(null);
  const [rank, setRank]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      fetchPlayer(username),
      fetchPlayers(200),
    ])
      .then(([playerData, allPlayers]) => {
        if (cancelled) return;
        setPlayer(playerData);
        setDemoMode(isUsingMockData());

        const sorted = sortPlayers(allPlayers, 'kills');
        const idx = sorted.findIndex(
          p => p.username.toLowerCase() === username.toLowerCase()
        );
        setRank(idx >= 0 ? idx + 1 : null);
        setError(null);
      })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [username]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-inner">
          <div style={{
            textAlign: 'center', padding: '100px 20px',
            color: '#4a6fa0', fontFamily: 'var(--font-display)',
            fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px'
          }}>
            Loading player...
          </div>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="profile-page">
        <div className="profile-inner">
          <Link to="/leaderboard" className="profile-back">
            <MdArrowBack /> Back to Leaderboard
          </Link>
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            color: 'var(--accent-red)', fontFamily: 'var(--font-display)',
            fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            Player "{username}" not found.
            <br /><br />
            <span style={{ color: '#4a6fa0', fontSize: '11px' }}>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── ALL stat cards — raw value + optional formatter for CountUp animation ──
  const STAT_CARDS = [
    { icon: <MdFlashOn />,      value: player.kills,            label: 'Kills',       color: 'green'  },
    { icon: <MdGavel />,        value: player.deaths,           label: 'Deaths',      color: 'red'    },
    { icon: <MdAttachMoney />,  value: player.money,            label: 'Net Worth',   color: 'gold',   formatter: formatMoney },
    { icon: <MdAccessTime />,   value: player.playtime_minutes, label: 'Playtime',    color: 'blue',   formatter: formatPlaytime },
    { icon: <MdTrendingUp />,   value: player.deaths === 0 ? player.kills : player.kills / player.deaths, label: 'K/D Ratio', color: 'cyan', decimals: 1 },
    { icon: <MdPets />,         value: player.mob_kills,        label: 'Mob Kills',   color: 'purple' },
    { icon: <MdConstruction />, value: player.blocks_mined / 1000, label: 'Blocks Mined', color: 'orange', decimals: 1, suffix: 'K', format: false },
    { icon: <MdStar />,         value: Number(player.score),    label: 'Total Score', color: 'pink' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-inner">

        <Link to="/leaderboard" className="profile-back">
          <MdArrowBack /> Back to Leaderboard
        </Link>

        {demoMode && <DemoBanner />}

        {/* ══ HERO CARD — compact ══ */}
        <div className="profile-hero-card">

          <div className="profile-banner">
            <div className="profile-banner-rank">
              <MdLeaderboard /> {rank ? `Rank #${rank}` : 'Unranked'}
            </div>
          </div>

          <div className="profile-hero-body">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <img src={getAvatarUrl(player.username)} alt={player.username} />
              </div>
              <span className={`profile-status-dot ${player.is_online ? 'alive' : 'dead'}`} />
            </div>

            <div className="profile-identity">
              <div className="profile-name-row">
                <h1 className="profile-username">{player.username}</h1>
                <span className="profile-level-badge">
                  <MdStar /> Level {player.player_level}
                </span>
                <span className={`profile-status-badge ${player.is_online ? 'alive' : 'dead'}`}>
                  <MdSignalWifi4Bar />
                  {player.is_online ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className="profile-joined">
                Joined {formatDate(player.first_join)} · Last seen {timeAgo(player.last_seen)} · World: <strong>{player.world}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* ══ ALL STATS — 8 cards, staggered animation ══ */}
        <div className="profile-stats-grid">
          {STAT_CARDS.map((s, i) => (
            <div className="profile-stat-card" key={s.label} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`profile-stat-icon ${s.color}`}>{s.icon}</div>
              <div className="profile-stat-text">
                <div className={`profile-stat-val ${s.color}`}>
                  <CountUp
                    value={s.value}
                    formatter={s.formatter}
                    decimals={s.decimals || 0}
                    suffix={s.suffix || ''}
                    format={s.format !== undefined ? s.format : true}
                  />
                </div>
                <div className="profile-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ BOTTOM ROW ══ */}
        <div className="profile-bottom-row">

          {/* Activity Panel */}
          <div className="profile-panel">
            <div className="profile-panel-title">
              <MdHistory /> Activity
            </div>
            <div className="profile-info-list">
              <div className="profile-info-row">
                <span className="profile-info-label"><MdCalendarToday /> First Joined</span>
                <span className="profile-info-val">{formatDate(player.first_join)}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdAccessTime /> Last Join</span>
                <span className="profile-info-val">{timeAgo(player.last_join)}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdSignalWifi4Bar /> Last Seen</span>
                <span className="profile-info-val">{timeAgo(player.last_seen)}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdPublic /> Current World</span>
                <span className="profile-info-val">{player.world}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdSignalWifi4Bar /> Ping</span>
                <span className="profile-info-val">{player.ping}ms</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdFavorite /> Status</span>
                <span className={`profile-info-val ${player.is_online ? 'green' : 'red'}`}>
                  {player.is_online ? '● Online' : '○ Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Player Info */}
          <div className="profile-panel">
            <div className="profile-panel-title">
              <MdBadge /> Player Info
            </div>
            <div className="profile-info-list">
              <div className="profile-info-row">
                <span className="profile-info-label"><MdLeaderboard /> Kill Rank</span>
                <span className="profile-info-val">{rank ? `#${rank}` : '—'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdStar /> Level</span>
                <span className="profile-info-val">{player.player_level}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdShield /> Rank</span>
                <span className="profile-info-val">
                  {player.prefix ? <PrefixBadge prefix={player.prefix} style={{ fontSize: '13px' }} /> : player.rank}
                </span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdTrendingUp /> Score</span>
                <span className="profile-info-val">{Number(player.score).toFixed(1)}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdAccessTime /> Playtime</span>
                <span className="profile-info-val">{formatPlaytime(player.playtime_minutes)}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label"><MdConstruction /> Blocks Mined</span>
                <span className="profile-info-val">{player.blocks_mined?.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;