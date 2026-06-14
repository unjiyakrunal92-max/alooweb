import React from 'react';
import '../styles/ServerStats.css';
import {
  MdPeople,
  MdPublic,
  MdEmojiEvents,
  MdBolt,
} from 'react-icons/md';

// ── Stats Data ──
// Update these numbers as your server grows!
const STATS = [
  {
    id: 'online',
    icon: <MdPeople />,
    number: '24',
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
    number: 'S1',
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

const ServerStats = () => {
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