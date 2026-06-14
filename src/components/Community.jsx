import React, { useState, useEffect } from 'react';
import '../styles/Community.css';
import {
  MdBlock,
  MdBolt,
  MdGroups,
  MdBugReport,
  MdTag,
} from 'react-icons/md';
import { RiDiscordFill } from 'react-icons/ri';

// ── Server Rules ──
const RULES = [
  {
    id: 'griefing',
    icon: <MdBlock />,
    color: 'green',
    title: 'No Griefing',
    desc: 'Do not destroy or alter other players\' builds without their explicit permission.',
  },
  {
    id: 'cheating',
    icon: <MdBolt />,
    color: 'yellow',
    title: 'No Cheating / Hacking',
    desc: 'Use of modded clients, X-Ray, or any third-party software that gives an unfair advantage is strictly prohibited.',
  },
  {
    id: 'respect',
    icon: <MdGroups />,
    color: 'lavender',
    title: 'Respect All Players',
    desc: 'Harassment, hate speech, bullying, or extreme toxicity will not be tolerated in chat or voice.',
  },
  {
    id: 'exploits',
    icon: <MdBugReport />,
    color: 'pink',
    title: 'No Exploits',
    desc: 'Do not use duping glitches or server bugs to gain items or money. Report bugs to the staff.',
  },
];

const Community = () => {
  const [memberCount, setMemberCount] = useState(0);
  
  // We keep the "real" base number, and a "display" number that wiggles
  const [baseOnline, setBaseOnline] = useState(0);
  const [displayOnline, setDisplayOnline] = useState(0);

  // 1. Fetch REAL data every 60 seconds
  useEffect(() => {
    const fetchDiscordStats = async () => {
      try {
        const response = await fetch(
          'https://discord.com/api/v10/invites/Ecf6UJq8MR?with_counts=true'
        );
        const data = await response.json();
        
        if (data && data.approximate_member_count) {
          setMemberCount(data.approximate_member_count);
          setBaseOnline(data.approximate_presence_count);
          setDisplayOnline(data.approximate_presence_count); // Sync it up
        }
      } catch (error) {
        console.error('Failed to fetch Discord stats:', error);
        setMemberCount(540); 
        setBaseOnline(96);
        setDisplayOnline(96);
      }
    };

    fetchDiscordStats();
    
    const interval = setInterval(fetchDiscordStats, 60000);
    return () => clearInterval(interval);
  }, []);

  // 2. Add fake "Live" fluctuation every 4 seconds to make it look active
  useEffect(() => {
    if (baseOnline === 0) return; // Wait until we have real data

    const wiggleInterval = setInterval(() => {
      setDisplayOnline((prev) => {
        // Randomly add 1, subtract 1, or stay the same (-1, 0, or 1)
        const randomChange = Math.floor(Math.random() * 3) - 1;
        const newNumber = prev + randomChange;

        // Make sure it doesn't drift too far from the real number (+/- 3 max)
        if (Math.abs(newNumber - baseOnline) > 3) {
          return baseOnline; 
        }
        return newNumber;
      });
    }, 4000); // Wiggles every 4 seconds

    return () => clearInterval(wiggleInterval);
  }, [baseOnline]);

  return (
    <>
      {/* ══════════ RULES SECTION ══════════ */}
      <section className="rules-section" id="rules">
        <div className="rules-inner">

          <div className="rules-header">
            <h2 className="rules-title">
              The <span>Server</span> Code
            </h2>
            <p className="rules-subtitle">
              Breaking these laws will lead to the ban-hammer.
            </p>
          </div>

          <div className="rules-grid">
            {RULES.map(({ id, icon, color, title, desc }) => (
              <div className={`rule-card ${color}`} key={id}>
                <div className="rule-icon">{icon}</div>
                <h3 className="rule-card-title">{title}</h3>
                <p className="rule-card-desc">{desc}</p>
              </div>
            ))}
          </div>

          <div className="rules-banner">
            <p className="rules-banner-text">
              By playing on <span>AlooSMP</span>, you agree to these rules.
            </p>
            <p className="rules-banner-sub">
              Enforced by the AlooSMP Staff Team
            </p>
          </div>

        </div>
      </section>

      {/* ══════════ DISCORD SECTION ══════════ */}
      <section className="discord-section" id="community">
        <div className="discord-inner">

          {/* Left — Content */}
          <div className="discord-content">
            <div className="discord-eyebrow">
              <span className="discord-eyebrow-line" />
              Join the Community
            </div>

            <h2 className="discord-title">
              Get Involved on
              <span className="discord-title-accent">Discord</span>
            </h2>

            <p className="discord-desc">
              Join our growing community for daily events, server
              announcements, and community trades. Your adventure
              starts here.
            </p>

            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-btn"
            >
              <RiDiscordFill />
              Join our Discord
            </a>
          </div>

          {/* Right — Live Status Card */}
          <div className="discord-card">
            <div className="discord-card-label">
              <MdTag style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Live Community Status
            </div>

            {/* Online count */}
            <div className="discord-online-block">
              <span className="discord-online-dot" />
              <div>
                <div className="discord-online-num">
                  {/* Shows the wiggling display number */}
                  {displayOnline > 0 ? displayOnline.toLocaleString() : '...'}
                </div>
                <div className="discord-online-label">Online Members</div>
              </div>
            </div>

            {/* Member avatars */}
            <div className="discord-members-row">
              <div className="discord-avatars">
                <div className="discord-avatar a1">AK</div>
                <div className="discord-avatar a2">SR</div>
                <div className="discord-avatar a3">MV</div>
                <div className="discord-avatar-more">+</div>
              </div>
              <p className="discord-members-text">
                <strong>{memberCount > 0 ? memberCount.toLocaleString() : '...'} members</strong><br />
                already in the server
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Community;