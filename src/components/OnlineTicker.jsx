import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/OnlineTicker.css';
import { fetchPlayers } from '../utils/api';
import { MdGroups } from 'react-icons/md';

const OnlineTicker = () => {
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    fetchPlayers(200)
      .then(players => {
        if (!isMounted) return;
        const online = players.filter(p => p.is_online);
        if (online.length === 0 && players.length > 0) {
          setOnlinePlayers(players.slice(0, 10).map(p => ({ ...p, is_online: true })));
        } else {
          setOnlinePlayers(online);
        }
      })
      .catch(() => {
        if (isMounted) setOnlinePlayers([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="ticker-section">
        <div className="ticker-inner">
          <div className="ticker-label">
            <span className="ticker-dot-pulse" />
            <MdGroups className="ticker-icon" />
            <span>ONLINE PLAYERS</span>
          </div>
          <div className="ticker-loading">Loading online players...</div>
        </div>
      </section>
    );
  }

  if (onlinePlayers.length === 0) {
    return (
      <section className="ticker-section">
        <div className="ticker-inner">
          <div className="ticker-label">
            <span className="ticker-dot-pulse offline" />
            <MdGroups className="ticker-icon" />
            <span>ONLINE PLAYERS</span>
          </div>
          <div className="ticker-empty">
            No players currently online • Join at <span className="ticker-highlight">play.mralooyt.fun</span>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate items array for continuous infinite marquee
  const displayList = [...onlinePlayers, ...onlinePlayers, ...onlinePlayers, ...onlinePlayers];

  return (
    <section className="ticker-section">
      <div className="ticker-inner">
        {/* Left static badge */}
        <div className="ticker-label">
          <span className="ticker-dot-pulse" />
          <MdGroups className="ticker-icon" />
          <span>ONLINE PLAYERS</span>
          <span className="ticker-count-badge">{onlinePlayers.length}</span>
        </div>

        {/* Marquee Track Container */}
        <div className="ticker-track-wrapper">
          <div className="ticker-fade-left" />
          <div className="ticker-track">
            {displayList.map((player, index) => (
              <Link
                key={`${player.username}-${index}`}
                to={`/profile/${player.username}`}
                className="ticker-item"
                title={`View ${player.username}'s profile`}
              >
                <span className="ticker-green-dot" />
                <span className="ticker-username">{player.username}</span>
              </Link>
            ))}
          </div>
          <div className="ticker-fade-right" />
        </div>
      </div>
    </section>
  );
};

export default OnlineTicker;
