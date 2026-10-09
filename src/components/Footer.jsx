import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import {
  MdDns,
  MdChevronRight,
  MdHome,
  MdMap,
  MdLeaderboard,
  MdRule,
  MdEmail,
  MdStorefront,
  MdFavorite,
  MdHowToVote,
  MdChat,
  MdOndemandVideo,
  MdTag,
  MdCameraAlt,
} from 'react-icons/md';

import LOGO from '../assets/potato.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── Brand Column ── */}
        <div className="footer-brand">
          <div className="footer-logo-row">
            <div className="footer-logo-img">
              <img src={LOGO} alt="AlooSMP" />
            </div>
            <span className="footer-logo-name">
              <span>Aloo</span>SMP
            </span>
          </div>

          <p className="footer-brand-desc">
            India's most exciting Hardcore Survival SMP.
            Custom economy, clan wars, and live leaderboards.
            One life — make it count.
          </p>

          <div className="footer-ip-pill">
            <MdDns />
            <span>play.aloosmp.fun</span>
          </div>

          {/* Socials */}
          <div className="footer-socials">
            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn discord"
              aria-label="Discord"
            >
              <MdChat />
            </a>
            <a
              href="https://youtube.com/@mralooyt"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn youtube"
              aria-label="YouTube"
            >
              <MdOndemandVideo />
            </a>
            <a
              href="https://twitter.com/mralooyt"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn twitter"
              aria-label="Twitter / X"
            >
              <MdTag />
            </a>
            <a
              href="https://instagram.com/mralooyt"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn instagram"
              aria-label="Instagram"
            >
              <MdCameraAlt />
            </a>
          </div>
        </div>

        {/* ── Navigation Column ── */}
        <div className="footer-col">
          <p className="footer-col-title">Navigation</p>
          <ul className="footer-links">
            <li><Link to="/"><MdChevronRight /><MdHome /> Home</Link></li>
            <li><Link to="/maps"><MdChevronRight /><MdMap /> Maps</Link></li>
            <li><Link to="/leaderboard"><MdChevronRight /><MdLeaderboard /> Leaderboard</Link></li>
            <li><Link to="/vote"><MdChevronRight /><MdHowToVote /> Vote</Link></li>
            <li><Link to="/"><MdChevronRight /><MdStorefront /> Features</Link></li>
          </ul>
        </div>

        {/* ── Server Column ── */}
        <div className="footer-col">
          <p className="footer-col-title">Server</p>
          <ul className="footer-links">
            <li><Link to="/"><MdChevronRight /><MdDns /> How to Join</Link></li>
            <li><Link to="/rules"><MdChevronRight /><MdRule /> Rules</Link></li>
            <li><Link to="/"><MdChevronRight /><MdHowToVote /> FAQ</Link></li>
            <li><Link to="/"><MdChevronRight /><MdFavorite /> Patrons</Link></li>
            <li><Link to="/contact"><MdChevronRight /><MdEmail /> Contact</Link></li>
          </ul>
        </div>

        {/* ── Status Column ── */}
        <div className="footer-col">
          <p className="footer-col-title">Server Status</p>

          <div className="footer-status-badge">
            <span className="footer-status-dot" />
            Online
          </div>

          <ul className="footer-links">
            <li><a href="#"><MdChevronRight /> Java 1.21+</a></li>
            <li><a href="#"><MdChevronRight /> Bedrock Support</a></li>
            <li><a href="#"><MdChevronRight /> India Hosted</a></li>
            <li><a href="#"><MdChevronRight /> 99.9% Uptime</a></li>
            <li><a href="https://discord.gg/Ecf6UJq8MR" target="_blank" rel="noopener noreferrer">
              <MdChevronRight /> Support Ticket
            </a></li>
          </ul>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <p className="footer-copy">
          © 2025 <span>AlooSMP</span> · Not affiliated with Mojang or Microsoft ·
          Made with ❤️ in India
        </p>
        <ul className="footer-bottom-links">
          <li><Link to="/rules">Rules</Link></li>
          <li><Link to="/vote">Vote</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </div>

    </footer>
  );
};

export default Footer;  