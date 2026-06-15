import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Leaderboard.css';
import {
  MdLeaderboard,
  MdSearch,
  MdStar,
  MdAccessTime,
  MdAttachMoney,
  MdFlashOn,
} from 'react-icons/md';
import {
  fetchPlayers,
  getAvatarUrl,
  formatMoney,
  formatPlaytime,
  sortPlayers,
  isUsingMockData,
} from '../utils/api';
import PrefixBadge from '../components/PrefixBadge';
import DemoBanner from '../components/DemoBanner';
import CountUp from '../components/CountUp';

const getRankClass = (rank) => {
  if (rank === 1) return 'r1';
  if (rank === 2) return 'r2';
  if (rank === 3) return 'r3';
  return 'rn';
};

const TABS = [
  { id: 'kills', label: 'Kills',     icon: <MdFlashOn />,    sortKey: 'kills' },
  { id: 'money', label: 'Net Worth', icon: <MdAttachMoney />, sortKey: 'money' },
  { id: 'time',  label: 'Playtime',  icon: <MdAccessTime />,  sortKey: 'time' },
];

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [tab, setTab]         = useState('kills');
  const [search, setSearch]   = useState('');
  const [demoMode, setDemoMode] = useState(false);

  // ── Fetch all players once ──
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPlayers(100)
      .then(data => {
        if (!cancelled) {
          setPlayers(data);
          setError(null);
          setDemoMode(isUsingMockData());
        }
      })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const onlineCount = players.filter(p => p.is_online).length;

  // sort according to active tab
  const sorted = sortPlayers(players, TABS.find(t => t.id === tab)?.sortKey);

  // attach rank number based on current sort
  const ranked = sorted.map((p, i) => ({ ...p, rank: i + 1 }));

  const filtered = ranked.filter(p =>
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = ranked.slice(0, 3);
  const rest = filtered.filter(p => p.rank > 3);

  // ── Loading State ──
  if (loading) {
    return (
      <div className="lb-page">
        <div className="lb-inner">
          <div style={{
            textAlign: 'center', padding: '120px 20px',
            color: '#4a6fa0', fontFamily: 'var(--font-display)',
            fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px'
          }}>
            <div className="lb-live-dot" style={{ margin: '0 auto 16px' }} />
            Loading leaderboard...
          </div>
        </div>
      </div>
    );
  }

  // ── Error State ──
  if (error) {
    return (
      <div className="lb-page">
        <div className="lb-inner">
          <div style={{
            textAlign: 'center', padding: '120px 20px',
            color: 'var(--accent-red)', fontFamily: 'var(--font-display)',
            fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            Failed to load leaderboard: {error}
            <br /><br />
            <span style={{ color: '#4a6fa0', fontSize: '11px' }}>
              Check that the API server is reachable and CORS is enabled.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lb-page">
      <div className="lb-inner">

        {demoMode && <DemoBanner />}

        {/* Header */}
        <div className="lb-page-header">
          <div className="lb-page-title-group">
            <div className="lb-page-tag"><MdLeaderboard /> Live Rankings</div>
            <h1 className="lb-page-title">Leader<span>board</span></h1>
            <p className="lb-page-sub">Top survivors of AlooSMP. Updated live from the server.</p>
          </div>
          <div className="lb-live-pill">
            <span className="lb-live-dot" />
            {onlineCount} players online
          </div>
        </div>

        {/* TOP 3 PODIUM — order: 2nd | 1st | 3rd */}
        <div className="lb-podium">
          {[top3[1], top3[0], top3[2]].map((p, i) => {
            const r = i === 0 ? 2 : i === 1 ? 1 : 3;
            if (!p) return null;
            return (
              <Link to={`/profile/${p.username}`} className={`podium-card rank-${r}`} key={p.uuid}>
                <div className={`podium-rank r${r}`}>{r}</div>
                <div className="podium-avatar">
                  <img src={getAvatarUrl(p.username)} alt={p.username} />
                </div>
                <div className="podium-name">{p.username}</div>
                <div className="podium-level"><MdStar /> Level {p.player_level}</div>
                <div className="podium-stats">
                  <div className="podium-stat">
                    <span className="podium-stat-val green"><CountUp value={p.kills} format={false} /></span>
                    <span className="podium-stat-lbl">Kills</span>
                  </div>
                  <div className="podium-stat">
                    <span className="podium-stat-val red"><CountUp value={p.deaths} format={false} /></span>
                    <span className="podium-stat-lbl">Deaths</span>
                  </div>
                  <div className="podium-stat">
                    <span className="podium-stat-val blue"><CountUp value={p.money} formatter={formatMoney} /></span>
                    <span className="podium-stat-lbl">Worth</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* FILTERS */}
        <div className="lb-filters">
          <div className="lb-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`lb-tab-btn ${tab===t.id?'active':''}`} onClick={() => setTab(t.id)}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <div className="lb-search-wrap">
            <MdSearch />
            <input className="lb-search" placeholder="Search player..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="lb-table-head">
          <span>Rank</span>
          <span>Player</span>
          <span>Net Worth</span>
          <span>Kills</span>
          <span>Deaths</span>
          <span>Playtime</span>
        </div>

        {/* ROWS */}
        <div className="lb-rows">
          {(search ? filtered : rest).map(p => (
            <Link to={`/profile/${p.username}`} className="lb-row" key={p.uuid}>
              <div className="lb-rank">
                <div className={`lb-rank-badge ${getRankClass(p.rank)}`}>{p.rank}</div>
              </div>
              <div className="lb-player">
                <div className="lb-avatar">
                  <img src={getAvatarUrl(p.username)} alt={p.username} />
                  {p.is_online && (
                    <span style={{
                      position: 'absolute', bottom: '-2px', right: '-2px',
                      width: '10px', height: '10px', borderRadius: '50%',
                      background: 'var(--accent-green)', border: '2px solid #0d1a2e'
                    }} />
                  )}
                </div>
                <div className="lb-player-info">
                  <div className="lb-player-name">{p.username}</div>
                  <div className="lb-player-level"><MdStar /> Level {p.player_level}</div>
                </div>
              </div>
              <div className="lb-cell green worth-col"><CountUp value={p.money} formatter={formatMoney} /></div>
              <div className="lb-cell"><CountUp value={p.kills} format={false} /><span className="lb-cell-sub">kills</span></div>
              <div className="lb-cell red"><CountUp value={p.deaths} format={false} /><span className="lb-cell-sub">deaths</span></div>
              <div className="lb-cell muted time-col">
                <MdAccessTime style={{verticalAlign:'middle',marginRight:'4px',fontSize:'13px'}} />
                <CountUp value={p.playtime_minutes} formatter={formatPlaytime} />
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div style={{textAlign:'center',padding:'40px',color:'#2a3f58',fontFamily:'var(--font-display)',fontSize:'13px',textTransform:'uppercase',letterSpacing:'2px'}}>
              No players found
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;