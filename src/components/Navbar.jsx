import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import {
  MdHome,
  MdMap,
  MdLeaderboard,
  MdHowToVote,
  MdRule,
  MdEmail,
  MdStorefront,
  MdMenu,
  MdClose,
  MdGroups,
  MdContentCopy,
  MdCheckCircle,
  MdWorkspacePremium,
} from 'react-icons/md';
import { fetchPlayers } from '../utils/api';

const LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='25' fill='%231a6fff'/%3E%3Ctext x='25' y='31' font-size='13' font-weight='900' font-family='Arial' fill='white' text-anchor='middle'%3ESMP%3C/text%3E%3C/svg%3E";

const NAV_LINKS = [
  { id: 'home',        label: 'Home',        icon: <MdHome />,             path: '/',            special: null   },
  { id: 'maps',        label: 'Maps',        icon: <MdMap />,              path: '/maps',        special: null   },
  { id: 'leaderboard', label: 'Leaderboard', icon: <MdLeaderboard />,      path: '/leaderboard', special: null   },
  { id: 'donators',   label: 'Donators',    icon: <MdWorkspacePremium />, path: '/donators',     special: null   },
  { id: 'rules',       label: 'Rules',       icon: <MdRule />,             path: '/rules',       special: null   },
  { id: 'contact',     label: 'Contact',     icon: <MdEmail />,            path: '/contact',     special: null   },
];

const SERVER_IP = 'play.aloosmp.fun';

const Navbar = () => {
  const [drawerOpen, setDrawer] = useState(false);
  const [onlineCount, setOnlineCount] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [drawerAnimating, setDrawerAnimating] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch live online count
  useEffect(() => {
    fetchPlayers(200)
      .then(players => {
        const online = players.filter(p => p.is_online).length;
        setOnlineCount(online);
      })
      .catch(() => setOnlineCount(null));
  }, []);

  // Smart scroll handler
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progress bar
    setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);
    
    // Scrolled state (for glassmorphism)
    setScrolled(currentY > 30);
    
    // Smart show/hide: only hide after scrolling 80px down, show immediately on scroll up
    const delta = currentY - lastScrollY.current;
    if (delta > 0) {
      // Scrolling down
      scrollThreshold.current += delta;
      if (scrollThreshold.current > 80 && currentY > 120) {
        setNavVisible(false);
      }
    } else {
      // Scrolling up
      scrollThreshold.current = 0;
      setNavVisible(true);
    }
    
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close drawer on route change
  useEffect(() => {
    setDrawer(false);
  }, [location]);

  // Close drawer on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setDrawer(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Copy IP
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  // Drawer open with animation
  const openDrawer = () => {
    setDrawerAnimating(true);
    setDrawer(true);
    // Reset animation state after links animate in
    setTimeout(() => setDrawerAnimating(false), 600);
  };

  const getLinkClass = (isActive, special) => {
    let cls = 'nav-btn';
    if (isActive) cls += ' nav-active';
    if (special === 'vote') cls += ' nav-vote';
    return cls;
  };

  const getDrawerClass = (isActive, special) => {
    let cls = 'drawer-btn';
    if (isActive) cls += ' nav-active';
    if (special === 'vote') cls += ' nav-vote';
    return cls;
  };

  return (
    <>
      {/* ════════ NAVBAR ════════ */}
      <div className={`navbar-outer ${scrolled ? 'navbar-scrolled' : ''} ${navVisible ? '' : 'navbar-hidden'}`}>
        {/* Scroll Progress Bar */}
        <div className="navbar-progress" style={{ width: `${scrollProgress}%` }} />
        
        <div className="navbar-inner">
          {/* Logo */}
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <div className="navbar-logo-img">
              <img src={LOGO} alt="AlooSMP" />
            </div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-name">
                Aloo<span>SMP</span>
              </span>
              <span className="navbar-logo-tag">Season 5 • Live</span>
            </div>
          </div>

          {/* Center links */}
          <div className="navbar-links">
            {NAV_LINKS.map(({ id, label, icon, path, special }) => (
              <NavLink
                key={id}
                to={path}
                end={path === '/'}
                className={({ isActive }) => getLinkClass(isActive, special)}
              >
                {icon}
                <span className="nav-label">{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="navbar-actions">
            {/* Live online pill */}
            {onlineCount !== null && (
              <div className="navbar-online-pill">
                <span className="navbar-online-dot" />
                <MdGroups style={{ fontSize: '14px' }} />
                {onlineCount} online
              </div>
            )}

            {/* Copy IP Button */}
            <button
              className={`navbar-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              title="Copy server IP"
            >
              {copied ? <MdCheckCircle /> : <MdContentCopy />}
              <span className="nav-label">{copied ? 'Copied!' : SERVER_IP}</span>
            </button>

            {/* Store button */}
            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn-store"
            >
              <MdStorefront />
              <span className="nav-label">Store</span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className={`navbar-hamburger ${drawerOpen ? 'active' : ''}`}
              onClick={() => drawerOpen ? setDrawer(false) : openDrawer()}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </div>

      {/* ════════ COPY TOAST ════════ */}
      <div className={`copy-toast ${copied ? 'show' : ''}`}>
        <MdCheckCircle />
        IP Copied to clipboard!
      </div>

      {/* ════════ MOBILE DRAWER ════════ */}
      <div
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-overlay" onClick={() => setDrawer(false)} />

        <div className="drawer-panel">
          {/* Decorative gradient orbs */}
          <div className="drawer-orb drawer-orb-1" />
          <div className="drawer-orb drawer-orb-2" />

          {/* Drawer header */}
          <div className="drawer-header">
            <div className="drawer-logo-row">
              <div className="drawer-logo">
                <img src={LOGO} alt="AlooSMP" />
              </div>
              <span className="drawer-logo-name">
                Aloo<span>SMP</span>
              </span>
            </div>
            <button
              className="drawer-close"
              onClick={() => setDrawer(false)}
              aria-label="Close menu"
            >
              <MdClose />
            </button>
          </div>

          {/* Nav links */}
          <nav className="drawer-nav">
            <span className="drawer-section-label">Navigation</span>
            {NAV_LINKS.map(({ id, label, icon, path, special }, index) => (
              <NavLink
                key={id}
                to={path}
                end={path === '/'}
                className={({ isActive }) => getDrawerClass(isActive, special)}
                onClick={() => setDrawer(false)}
                style={drawerAnimating ? {
                  animationDelay: `${0.05 + index * 0.06}s`,
                } : undefined}
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Drawer footer */}
          <div className="drawer-footer">
            {onlineCount !== null && (
              <div className="drawer-online-pill">
                <span className="navbar-online-dot" />
                <MdGroups style={{ fontSize: '15px' }} />
                {onlineCount} players online
              </div>
            )}

            {/* Copy IP in drawer */}
            <button
              className={`drawer-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <MdCheckCircle /> : <MdContentCopy />}
              {copied ? 'Copied!' : `Copy IP — ${SERVER_IP}`}
            </button>

            <a
              href="https://discord.gg/Ecf6UJq8MR"
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-store-btn"
              onClick={() => setDrawer(false)}
            >
              <MdStorefront />
              Visit Store
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;