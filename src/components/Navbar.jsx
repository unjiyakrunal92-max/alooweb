import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import {
  MdHome,
  MdMap,
  MdLeaderboard,
  MdFavorite,
  MdHowToVote,
  MdRule,
  MdEmail,
  MdStorefront,
  MdMenu,
  MdClose,
} from 'react-icons/md';

const LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='25' fill='%231a6fff'/%3E%3Ctext x='25' y='31' font-size='13' font-weight='900' font-family='Arial' fill='white' text-anchor='middle'%3ESMP%3C/text%3E%3C/svg%3E";

// ── Nav config — path: null = no route (external/anchor) ──
const NAV_LINKS = [
  { id: 'home',        label: 'Home',        icon: <MdHome />,        path: '/',            special: null    },
  { id: 'maps',        label: 'Maps',        icon: <MdMap />,         path: '/maps',        special: null    },
  { id: 'leaderboard', label: 'Leaderboard', icon: <MdLeaderboard />, path: '/leaderboard', special: null    },
   // { id: 'patrons',     label: 'Patrons',     icon: <MdFavorite />,    path: null,           special: 'patrons' },
  { id: 'vote',        label: 'Vote',        icon: <MdHowToVote />,   path: '/vote',        special: null    },
  { id: 'rules',       label: 'Rules',       icon: <MdRule />,        path: '/rules',       special: null    },
  { id: 'contact',     label: 'Contact',     icon: <MdEmail />,       path: '/contact',     special: null    },
];

const Navbar = () => {
  const [drawerOpen, setDrawer] = useState(false);
  const navigate = useNavigate();

  const handleNoRoute = (id) => {
    // placeholder — wire up modals/anchors later
    setDrawer(false);
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <div className="navbar-outer">
        <nav className="navbar-pill" role="navigation" aria-label="Main Navigation">

          {/* Logo → goes home */}
          <div className="navbar-logo" onClick={() => navigate('/')}>
            <img src={LOGO} alt="AlooSMP Logo" />
          </div>

          {/* Desktop links */}
          <div className="navbar-links">
            {NAV_LINKS.map(({ id, label, icon, path, special }) => {
              if (path) {
                return (
                  <NavLink
                    key={id}
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `nav-btn${special === 'patrons' ? ' nav-patrons' : isActive ? ' nav-active' : ''}`
                    }
                  >
                    {icon}
                    <span className="nav-label">{label}</span>
                  </NavLink>
                );
              }
              return (
                <button
                  key={id}
                  className={`nav-btn${special === 'patrons' ? ' nav-patrons' : ''}`}
                  onClick={() => handleNoRoute(id)}
                >
                  {icon}
                  <span className="nav-label">{label}</span>
                </button>
              );
            })}

            <div className="navbar-spacer" />

            {/* Store */}
            <button className="nav-btn nav-store">
              <MdStorefront />
              <span className="nav-label">Store</span>
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
          >
            <MdMenu />
          </button>

        </nav>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="drawer-overlay" onClick={() => setDrawer(false)} />
        <div className="drawer-panel">

          <div className="drawer-header">
            <div className="drawer-logo">
              <img src={LOGO} alt="AlooSMP Logo" />
            </div>
            <button className="drawer-close" onClick={() => setDrawer(false)} aria-label="Close menu">
              <MdClose />
            </button>
          </div>

          {NAV_LINKS.map(({ id, label, icon, path, special }) => {
            if (path) {
              return (
                <NavLink
                  key={id}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `drawer-btn${special === 'patrons' ? ' nav-patrons' : isActive ? ' nav-active' : ''}`
                  }
                  onClick={() => setDrawer(false)}
                >
                  {icon}
                  {label}
                </NavLink>
              );
            }
            return (
              <button
                key={id}
                className={`drawer-btn${special === 'patrons' ? ' nav-patrons' : ''}`}
                onClick={() => handleNoRoute(id)}
              >
                {icon}
                {label}
              </button>
            );
          })}

          <button className="drawer-btn nav-store" onClick={() => setDrawer(false)}>
            <MdStorefront />
            Store
          </button>

        </div>
      </div>
    </>
  );
};

export default Navbar;