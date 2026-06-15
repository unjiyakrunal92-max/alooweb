import React, { useState } from 'react';
import '../styles/Maps.css';
import {
  MdMap,
  MdPublic,
  MdLocalFireDepartment,
  MdAutoAwesome,
  MdFullscreen,
  MdStraighten,
  MdLocationOn,
  MdTerrain,
  MdGroups,
  MdShield,
} from 'react-icons/md';
import Footer from '../components/Footer';

// ── World Tabs ──
// These IDs match exactly what Squaremap uses to load your worlds
const WORLDS = [
  { id: 'playworld',         label: 'Overworld', icon: <MdPublic />,            cls: '' },
  { id: 'playworld_nether',  label: 'Nether',    icon: <MdLocalFireDepartment />, cls: 'nether' },
  { id: 'playworld_the_end', label: 'The End',   icon: <MdAutoAwesome />,       cls: 'end' },
];

// ── World Info ──
const WORLD_INFO = {
  playworld: [
    { icon: <MdStraighten />, val: '6000 x 6000', label: 'World Border', color: '' },
    { icon: <MdTerrain />,    val: 'Day 47',      label: 'World Age',    color: 'green' },
    { icon: <MdGroups />,     val: '24',          label: 'Players Here', color: '' },
    { icon: <MdShield />,     val: 'Protected',   label: 'Spawn Zone',   color: 'green' },
  ],
  playworld_nether: [
    { icon: <MdStraighten />, val: '1500 x 1500', label: 'World Border', color: 'red' },
    { icon: <MdTerrain />,    val: 'Day 47',      label: 'World Age',    color: '' },
    { icon: <MdGroups />,     val: '6',           label: 'Players Here', color: 'red' },
    { icon: <MdShield />,     val: 'PvP Zone',    label: 'Combat Status', color: 'red' },
  ],
  playworld_the_end: [
    { icon: <MdStraighten />, val: '1000 x 1000', label: 'World Border', color: 'purple' },
    { icon: <MdTerrain />,    val: 'Day 47',      label: 'World Age',    color: '' },
    { icon: <MdGroups />,     val: '2',           label: 'Players Here', color: 'purple' },
    { icon: <MdShield />,     val: 'PvP Zone',    label: 'Combat Status', color: 'red' },
  ],
};

// ── Points of Interest ──
const POI = {
  playworld: [
    { name: 'Spawn Town',   coords: 'X: 0, Z: 0',       desc: 'The main hub — shops, portals, and player markets.' },
    { name: 'Mining Valley',coords: 'X: 850, Z: -320',  desc: 'Resource-rich biome with diamond and ancient debris veins.' },
    { name: 'Sky Islands',  coords: 'X: -600, Z: 1200', desc: 'Floating islands with rare loot chests and elytra routes.' },
  ],
  playworld_nether: [
    { name: 'Fortress Alpha',  coords: 'X: 120, Z: 80',   desc: 'Largest nether fortress — blaze farms and wither skeletons.' },
    { name: 'Bastion Remnant', coords: 'X: -300, Z: 410', desc: 'Piglin outpost with netherite gear and ancient debris.' },
    { name: 'Lava Ocean',      coords: 'X: 0, Z: -500',   desc: 'Massive lava sea — dangerous but rich in resources.' },
  ],
  playworld_the_end: [
    { name: 'Main Island',  coords: 'X: 0, Z: 0',     desc: 'The dragon\'s lair — defeated weekly by top clans.' },
    { name: 'End City East', coords: 'X: 1100, Z: 250', desc: 'Elytra and shulker shells, heavily guarded by shulkers.' },
    { name: 'Void Bridge',  coords: 'X: -800, Z: 0',  desc: 'PvP hotspot — bridge wars between rival clans.' },
  ],
};

const Maps = () => {
  const [world, setWorld] = useState('playworld');

  // Your server IP and Squaremap port
  const MAP_BASE_URL = "/live-map-proxy/";

  // The URL changes dynamically when a user clicks a tab
  const currentMapUrl = `${MAP_BASE_URL}/?world=${world}`;

  return (
    <div className="maps-page">
      <div className="maps-inner">

        {/* Header */}
        <div className="maps-header">
          <div>
            <div className="maps-tag">
              <MdMap /> Live World Map
            </div>
            <h1 className="maps-title">
              Explore <span>AlooSMP</span>
            </h1>
            <p className="maps-sub">
              Real-time interactive map powered by Squaremap. Find bases, claims, and hidden treasures.
            </p>
          </div>
          <div className="maps-live-pill">
            <span className="maps-live-dot" />
            Map Live
          </div>
        </div>

        {/* World Tabs */}
        <div className="maps-tabs">
          {WORLDS.map(w => (
            <button
              key={w.id}
              className={`maps-tab-btn ${w.cls} ${world === w.id ? 'active' : ''}`}
              onClick={() => setWorld(w.id)}
            >
              {w.icon} {w.label}
            </button>
          ))}
        </div>

        {/* Map Viewer */}
        <div className="maps-viewer-frame">
          <div className="maps-viewer">
            
            {/* ── SQUAREMAP IFRAME ── */}
            <iframe
              className="maps-iframe"
              src={currentMapUrl}
              title="AlooSMP Live Map"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
            />

            <a
              href={currentMapUrl}
              className="maps-fullscreen-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdFullscreen />
              Fullscreen
            </a>
          </div>
        </div>

        {/* World Info Cards */}
        <div className="maps-info-grid">
          {WORLD_INFO[world].map((info, i) => (
            <div className={`maps-info-card ${info.color}`} key={i}>
              <div className="maps-info-icon">{info.icon}</div>
              <div>
                <div className="maps-info-val">{info.val}</div>
                <div className="maps-info-label">{info.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Points of Interest */}
    
        
        <Footer />

      </div>
    </div>
  );
};

export default Maps;