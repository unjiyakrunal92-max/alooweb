import React, { useState } from 'react';
import '../styles/FAQ.css';
import { RiDiscordFill } from 'react-icons/ri';
import {
  MdHelpOutline as MdHelp,
  MdExpandMore as MdExpand,
  MdDns as MdDnsIcon,
  MdDesktopWindows as MdDesktop,
  MdPhoneAndroid as MdPhone,
  MdPayment as MdPay,
  MdSecurity as MdSec,
  MdBugReport as MdBug,
  MdPeople as MdPeep,
  MdStorefront as MdStore,
  MdShield as MdProtect,
  MdLayers as MdVersion,
} from 'react-icons/md';

export const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const FAQS = [
    {
      id: 'ip-address',
      icon: <MdDnsIcon />,
      question: 'What is the server IP and port for AlooSMP?',
      answer:
        'The Java Edition IP address is play.aloosmp.fun (port 25565). For Minecraft Bedrock Edition (Pocket Edition / MCPE, Windows, Consoles, and PojavLauncher), use IP play.aloosmp.fun with Port 19132.',
    },
    {
      id: 'crossplay',
      icon: <MdPhone />,
      question: 'Can I play Aloo SMP from Mobile (Bedrock/PE) or PojavLauncher?',
      answer:
        'Yes! AlooSMP features seamless cross-play integration. Java Edition, Bedrock Edition, MCPE, and PojavLauncher players can all connect together in the same world with zero issues.',
    },
    {
      id: 'cracked-free',
      icon: <MdPay />,
      question: 'Is AlooSMP free to join and does it support cracked accounts?',
      answer:
        'Yes! AlooSMP is 100% free to join and there is no whitelist. We warmly welcome both premium and cracked Minecraft players (including TLauncher, Pojav, and official launchers).',
    },
    {
      id: 'version',
      icon: <MdVersion />,
      question: 'What Minecraft version do I need to connect?',
      answer:
        'AlooSMP supports Minecraft 1.16 through 1.21.x on both Java and Bedrock. The server world runs natively on 1.21.10 featuring stunning custom TerraformGenerator biomes.',
    },
    {
      id: 'features-economy',
      icon: <MdStore />,
      question: 'What gameplay features and plugins are on AlooSMP?',
      answer:
        'AlooSMP offers custom player shops (EconomyShopGUI), an active live auction house (AxAuctions), legendary crates (ExcellentCrates), balanced PvP combat (DeluxeCombat & PvPManager), bounties (DonutBounty), and live web leaderboards.',
    },
    {
      id: 'land-claim',
      icon: <MdProtect />,
      question: 'How do I protect my base and claim land against griefing?',
      answer:
        'Our GriefPrevention system allows you to easily claim territory with a golden shovel or via commands. All chests, builds, and farms inside your claim are completely safe from griefing or theft.',
    },
    {
      id: 'discord-support',
      icon: <RiDiscordFill />,
      question: 'How do I join the Discord or get staff support?',
      answer:
        'Join our active Discord community at discord.gg/Ecf6UJq8MR. You can chat with other players, get the latest season news, participate in giveaways, or open a support ticket with our 24/7 staff team.',
    },
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="faq-inner">
        <div className="faq-header">
          <div className="faq-tag">
            <MdHelp />
            Frequently Asked Questions
          </div>
          <h2 className="faq-title">
            Everything About <span>Aloo SMP</span>
          </h2>
          <p className="faq-subtitle">
            Quick answers to the most common questions about connecting, crossplay, and gameplay.
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
                <MdExpand className="faq-chevron" />
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
