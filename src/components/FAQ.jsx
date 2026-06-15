import React, { useState } from 'react';
import '../styles/FAQ.css';
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

export const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

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

export default FAQ;
