import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Leaderboard.css';
import {
  MdLeaderboard,
  MdSearch,
  MdStar,
  MdAccessTime,
  MdAttachMoney,
  MdFlashOn,
  MdNavigateBefore,
  MdNavigateNext,
  MdEmojiEvents,
  MdPeople,
  MdClose,
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

const PAGE_SIZE = 10;

const TABS = [
  { id: 'money',  label: 'Net Worth', icon: <MdAttachMoney />,  sortKey: 'money',    color: '#4ade80' },
  { id: 'kills',  label: 'Kills',     icon: <MdFlashOn />,      sortKey: 'kills',    color: '#f97316' },
  { id: 'time',   label: 'Playtime',  icon: <MdAccessTime />,   sortKey: 'time',     color: '#818cf8' },
];

const RANK_MEDALS = ['🥇', '🥈', '🥉'];

const getRankBadgeClass = (rank) => {
  if (rank === 1) return 'gold';
  if (rank === 2) return 'silver';
  if (rank === 3) return 'bronze';
  return 'normal';
};

const getStatValue = (player, tabId) => {
  if (tabId === 'money')  return formatMoney(player.money);
  if (tabId === 'kills')  return player.kills ?? 0;
  if (tabId === 'time')   return formatPlaytime(player.playtime_minutes);
  return '—';
};

// ── Skeleton row ──
const SkeletonRow = ({ index }) => (
  <div className="lb-row lb-row-skeleton" style={{ animationDelay: `${index * 0.06}s` }}>
    <div className="sk-rank" />
    <div className="lb-player">
      <div className="sk-avatar" />
      <div className="sk-info">
        <div className="sk-name" />
        <div className="sk-level" />
      </div>
    </div>
    <div className="sk-cell" />
    <div className="sk-cell" />
    <div className="sk-cell" />
    <div className="sk-cell" />
  </div>
);

const Leaderboard = () => {
  const [players,   setPlayers]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [tab,       setTab]       = useState('money');   // default: Net Worth
  const [search,    setSearch]    = useState('');
  const [page,      setPage]      = useState(1);
  const [demoMode,  setDemoMode]  = useState(false);
  const [animKey,   setAnimKey]   = useState(0);        // triggers row re-animation
  const tableRef = useRef(null);

  // ── Fetch all players once ──
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPlayers(200)
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

  // Sort + rank all players
  const sorted = sortPlayers(players, TABS.find(t => t.id === tab)?.sortKey);
  const ranked = sorted.map((p, i) => ({ ...p, rank: i + 1 }));

  // Search filter
  const filtered = search
    ? ranked.filter(p => p.username?.toLowerCase().includes(search.toLowerCase()))
    : ranked;

  const top3    = ranked.slice(0, 3);
  const listAll = search ? filtered : ranked.filter(p => p.rank > 3);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(listAll.length / PAGE_SIZE));
  const pageRows   = listAll.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleTabChange = (id) => {
    setTab(id);
    setPage(1);
    setAnimKey(k => k + 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setAnimKey(k => k + 1);
    // Scroll to table
    setTimeout(() => tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ── Error State ──
  if (error) {
    return (
      <div className="lb-page">
        <div className="lb-inner">
          <div className="lb-error-state">
            <div className="lb-error-icon">⚠️</div>
            <div className="lb-error-title">Failed to Load</div>
            <div className="lb-error-sub">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lb-page">
      {/* Ambient background */}
      <div className="lb-bg-orb lb-bg-orb-1" />
      <div className="lb-bg-orb lb-bg-orb-2" />
      <div className="lb-bg-orb lb-bg-orb-3" />

      <div className="lb-inner">
        {demoMode && <DemoBanner />}

        {/* ════ HEADER ════ */}
        <div className="lb-header">
          <div className="lb-header-left">
            <div className="lb-tag">
              <MdLeaderboard />
              Live Rankings
            </div>
            <h1 className="lb-title">
              Leader<span>board</span>
            </h1>
            <p className="lb-subtitle">
              Top survivors of AlooSMP • Season 5 • Updated live
            </p>
          </div>
          <div className="lb-header-right">
            <div className="lb-stat-pill green">
              <span className="lb-live-dot" />
              <MdPeople />
              {loading ? '...' : `${onlineCount} Online`}
            </div>
            <div className="lb-stat-pill blue">
              <MdEmojiEvents />
              {loading ? '...' : `${players.length} Players`}
            </div>
          </div>
        </div>

        {/* ════ TOP 3 PODIUM ════ */}
        {!loading && top3.length > 0 && (
          <div className="lb-podium">
            {/* Render order: 2nd | 1st | 3rd */}
            {[top3[1], top3[0], top3[2]].map((p, i) => {
              const r = i === 0 ? 2 : i === 1 ? 1 : 3;
              if (!p) return null;
              return (
                <Link
                  to={`/profile/${p.username}`}
                  className={`podium-card rank-${r}`}
                  key={p.uuid || p.username}
                >
                  <div className="podium-medal">{RANK_MEDALS[r - 1]}</div>
                  <div className="podium-crown-wrap">
                    <div className={`podium-avatar-ring rank-${r}`}>
                      <img
                        src={getAvatarUrl(p.username)}
                        alt={p.username}
                        className="podium-avatar-img"
                      />
                      {p.is_online && <span className="podium-online-dot" />}
                    </div>
                  </div>
                  <div className="podium-name">{p.username}</div>
                  <div className="podium-level">
                    <MdStar /> Lvl {p.player_level ?? '?'}
                  </div>
                  <div className="podium-stats-grid">
                    <div className="podium-stat-chip green">
                      <span className="psc-val">
                        {p.kills ?? 0}
                      </span>
                      <span className="psc-lbl">Kills</span>
                    </div>
                    <div className="podium-stat-chip blue">
                      <span className="psc-val">
                        {formatMoney(p.money)}
                      </span>
                      <span className="psc-lbl">Worth</span>
                    </div>
                    <div className="podium-stat-chip purple">
                      <span className="psc-val">
                        {formatPlaytime(p.playtime_minutes)}
                      </span>
                      <span className="psc-lbl">Time</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ════ FILTERS ════ */}
        <div className="lb-controls" ref={tableRef}>
          <div className="lb-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`lb-tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => handleTabChange(t.id)}
                style={tab === t.id ? { '--tab-color': t.color } : {}}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
          <div className="lb-search-wrap">
            <MdSearch className="lb-search-icon" />
            <input
              className="lb-search"
              placeholder="Search player..."
              value={search}
              onChange={handleSearch}
            />
            {search && (
              <button className="lb-search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>

        {/* ════ TABLE HEADER ════ */}
        <div className="lb-table-head">
          <span>#</span>
          <span>Player</span>
          <span><MdAttachMoney /> Net Worth</span>
          <span><MdFlashOn /> Kills</span>
          <span><MdClose /> Deaths</span>
          <span><MdAccessTime /> Playtime</span>
        </div>

        {/* ════ ROWS ════ */}
        <div className="lb-rows" key={animKey}>
          {loading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonRow key={i} index={i} />
              ))
            : pageRows.length > 0
              ? pageRows.map((p, idx) => (
                  <Link
                    to={`/profile/${p.username}`}
                    className={`lb-row rank-${getRankBadgeClass(p.rank)}`}
                    key={p.uuid || p.username}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Rank */}
                    <div className="lb-rank">
                      <div className={`lb-rank-badge ${getRankBadgeClass(p.rank)}`}>
                        {p.rank <= 3 ? RANK_MEDALS[p.rank - 1] : p.rank}
                      </div>
                    </div>

                    {/* Player */}
                    <div className="lb-player">
                      <div className="lb-avatar-wrap">
                        <img
                          src={getAvatarUrl(p.username)}
                          alt={p.username}
                          className="lb-avatar-img"
                        />
                        {p.is_online && <span className="lb-online-dot" />}
                      </div>
                      <div className="lb-player-info">
                        <div className="lb-player-name">{p.username}</div>
                        <div className="lb-player-meta">
                          <span className="lb-level-badge">
                            <MdStar /> Lvl {p.player_level ?? '?'}
                          </span>
                          {p.is_online && (
                            <span className="lb-online-badge">● Online</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Net Worth */}
                    <div className="lb-cell lb-cell-worth">
                      <span className="lbc-val">{formatMoney(p.money)}</span>
                      <span className="lbc-lbl">Net Worth</span>
                    </div>

                    {/* Kills */}
                    <div className="lb-cell lb-cell-kills">
                      <span className="lbc-val">{p.kills ?? 0}</span>
                      <span className="lbc-lbl">Kills</span>
                    </div>

                    {/* Deaths */}
                    <div className="lb-cell lb-cell-deaths">
                      <span className="lbc-val">{p.deaths ?? 0}</span>
                      <span className="lbc-lbl">Deaths</span>
                    </div>

                    {/* Playtime */}
                    <div className="lb-cell lb-cell-time">
                      <span className="lbc-val">{formatPlaytime(p.playtime_minutes)}</span>
                      <span className="lbc-lbl">Playtime</span>
                    </div>
                  </Link>
                ))
              : (
                <div className="lb-empty">
                  <div className="lb-empty-icon">🔍</div>
                  <div className="lb-empty-text">No players found</div>
                </div>
              )
          }
        </div>

        {/* ════ PAGINATION ════ */}
        {!loading && totalPages > 1 && (
          <div className="lb-pagination">
            <button
              className="lb-page-btn"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <MdNavigateBefore />
            </button>

            <div className="lb-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                // Show first, last, current, and neighbors
                const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                const ellipsis = !show && (p === 2 || p === totalPages - 1);
                if (ellipsis) return <span key={p} className="lb-page-ellipsis">…</span>;
                if (!show)    return null;
                return (
                  <button
                    key={p}
                    className={`lb-page-num ${p === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              className="lb-page-btn"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              <MdNavigateNext />
            </button>

            <span className="lb-page-info">
              Page {page} of {totalPages}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default Leaderboard;