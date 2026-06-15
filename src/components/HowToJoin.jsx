import React, { useState } from 'react';
import '../styles/Howtojoin.css';
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
const FAQS = [
  {
    id: 'version',
    icon: <MdDesktopWindows />,
    question: 'What version do I need to join?',
    answer: 'Java Edition 1.21 or above is required. Bedrock Edition players can join using IP play.mralooyt.fun and port 25573.',
  },
  {
    id: 'free',
    icon: <MdPayment />,
    question: 'Is AlooSMP free to join?',
    answer: 'Yes! AlooSMP is completely free to join and play. We have optional donor ranks available in our store that give cosmetic perks.',
  },
  {
    id: 'hardcore',
    icon: <MdSecurity />,
    question: 'What happens when I die in Hardcore mode?',
    answer: 'In Hardcore mode your character is permanently banned from the current season. Your stats and kills are preserved on the leaderboard. You can return next season.',
  },
  {
    id: 'discord',
    icon: <RiDiscordFill />,
    question: 'Do I have to join the Discord?',
    answer: 'It\'s not required to play but highly recommended! Discord is where we post server updates, events, and community news. Join at discord.gg/aloosmp.',
  },
  {
    id: 'report',
    icon: <MdBugReport />,
    question: 'How do I report a bug or a hacker?',
    answer: 'Open a ticket in our Discord server under #support. Provide screenshots or video evidence. Our staff team responds within 24 hours.',
  },
  {
    id: 'clans',
    icon: <MdPeople />,
    question: 'How do I create or join a clan?',
    answer: 'Use /clan create <name> in-game to start your own clan, or ask a clan leader for an invite. Clan features unlock after surviving your first 3 days.',
  },
];

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

// ══════════════════════════════════════════
//   FAQ
// ══════════════════════════════════════════
export const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">

        <div className="faq-header">
          <div className="faq-tag">
            <MdHelpOutline />
            Got Questions?
          </div>
          <h2 className="faq-title">
            Frequently <span>Asked</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about AlooSMP
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map(({ id, icon, question, answer }) => (
            <div
              className={`faq-item ${openId === id ? 'open' : ''}`}
              key={id}
            >
              <button
                className="faq-question"
                onClick={() => toggle(id)}
                aria-expanded={openId === id}
              >
                <div className="faq-q-left">
                  <div className="faq-q-icon">{icon}</div>
                  <span className="faq-q-text">{question}</span>
                </div>
                <MdExpandMore className="faq-chevron" />
              </button>
              <div className="faq-answer">
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// default export both as one
const HowToJoinAndFAQ = () => (
  <>
    <HowToJoin />
    <FAQ />
  </>
);

export default HowToJoinAndFAQ;