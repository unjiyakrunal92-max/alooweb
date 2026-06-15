import React, { useState } from 'react';
import '../styles/HowToJoin.css'
import {
  MdDownload,
  MdDns,
  MdMenuBook,
  MdEmojiEvents,
  MdRocketLaunch,
  MdPlayArrow,
  MdHelpOutline,
  MdExpandMore,
  MdDesktopWindows,
  MdPhoneAndroid,
  MdSecurity,
  MdPeople,
  MdPayment,
  MdBugReport,
} from 'react-icons/md';
import { RiDiscordFill } from 'react-icons/ri';

// ── Steps ──
const STEPS = [
  {
    id: 1,
    icon: <MdDownload />,
    title: 'Get Minecraft',
    desc: 'Purchase and install Minecraft Java or Bedrock Edition. Java requires version 1.21+.',
  },
  {
    id: 2,
    icon: <MdDns />,
    title: 'Add Server',
    desc: (<>Go to Multiplayer → Add Server. Enter IP: <strong>play.mralooyt.fun</strong> Bedrock port: <strong>25573</strong></>),
  },
  {
    id: 3,
    icon: <MdMenuBook />,
    title: 'Read The Rules',
    desc: 'Join our Discord and read the server rules carefully. Violations result in permanent bans.',
  },
  {
    id: 4,
    icon: <MdEmojiEvents />,
    title: 'Survive & Thrive',
    desc: 'Connect and begin your journey. Build, trade, fight and become a legend on AlooSMP.',
  },
];

// ── FAQ Data ──


// ══════════════════════════════════════════
//   HOW TO JOIN
// ══════════════════════════════════════════
export const HowToJoin = () => (
  <section className="join-section" id="join">
    <div className="join-inner">

      <div className="join-header">
        <div className="join-tag">
          <MdRocketLaunch />
          Getting Started
        </div>
        <h2 className="join-title">
          How to <span>Join</span>
        </h2>
        <p className="join-desc">
          Four simple steps to start your AlooSMP adventure.
          Java and Bedrock both welcome.
        </p>
      </div>

      <div className="join-steps">
        {STEPS.map(({ id, icon, title, desc }) => (
          <div className="join-step" key={id}>
            <div className="step-circle">
              <div className="step-circle-icon">{icon}</div>
              <span className="step-num-badge">{id}</span>
            </div>
            <h3 className="step-title">{title}</h3>
            <p className="step-desc">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="join-cta-box">
        <div className="join-cta-left">
          <p className="join-cta-label">Server IP</p>
          <p className="join-cta-ip">
            <span>play</span>.mralooyt.fun
          </p>
        </div>
        <div className="join-cta-right">
          <a href="#" className="btn-join-primary">
            <MdPlayArrow />
            Play Now
          </a>
          <a
            href="https://discord.gg/your-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-join-secondary"
          >
            <RiDiscordFill />
            Join Discord
          </a>
        </div>
      </div>

    </div>
  </section>
);

export default HowToJoin;
