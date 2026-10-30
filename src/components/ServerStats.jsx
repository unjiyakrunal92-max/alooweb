import React, { useState, useEffect } from 'react';
import '../styles/ServerStats.css';
import {
  MdPeople,
  MdPublic,
  MdEmojiEvents,
  MdBolt,
} from 'react-icons/md';
import { fetchPlayers } from '../utils/api';

const ServerStats = () => {
  const [onlineCount, setOnlineCount] = useState(38);

  useEffect(() => {
    fetchPlayers(200)
      .then(players => {
        const count = players.filter(p => p.is_online).length;
        if (count > 0) setOnlineCount(count);
      })
      .catch(() => {});
  }, []);

  const STATS = [
    {
      id: 'online',
      icon: <MdPeople />,
      number: onlineCount.toString(),
      suffix: '/ 100',
      label: 'Players Online',
      color: 'green',
    },
    {
      id: 'total',
      icon: <MdPublic />,
      number: '1,240',
      suffix: '+',
      label: 'Total Players',
      color: 'blue',
    },
    {
      id: 'season',
      icon: <MdEmojiEvents />,
      number: 'S5',
      suffix: '',
      label: 'Current Season',
      color: 'white',
    },
    {
      id: 'uptime',
      icon: <MdBolt />,
      number: '99.9',
      suffix: '%',
      label: 'Uptime',
      color: 'blue',
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-inner">
        {STATS.map(({ id, icon, number, suffix, label, color }) => (
          <div className="stat-card" key={id}>
            <div className="stat-icon">{icon}</div>
            <div className={`stat-number ${color}`}>
              {number}
              {suffix && (
                <span style={{ fontSize: '0.55em', opacity: 0.7, marginLeft: '2px' }}>
                  {suffix}
                </span>
              )}
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServerStats;