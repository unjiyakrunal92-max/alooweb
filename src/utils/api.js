/* =============================================
   api.js — AlooSMP API Layer
   Centralized config, fetchers & formatters
   Auto-falls back to mock data if API is offline
   ============================================= */

import { MOCK_PLAYERS, getMockPlayer } from './mockData';

// ── Config ──
export const API_BASE = 'http://premium-01.gladbyte.in:25841/api';
export const API_KEY  = 'mralooyt-2026-x7Kp9-secret';

const FETCH_TIMEOUT_MS = 5000;

let usingMockData = false;
export const isUsingMockData = () => usingMockData;

export const getAvatarUrl = (username) =>
  `https://mc-heads.net/avatar/${username}/64`;

export const getBodyUrl = (username) =>
  `https://mc-heads.net/body/${username}/100`;

async function fetchWithTimeout(url, ms = FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// GET /api/players?limit=N
export async function fetchPlayers(limit = 100) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/players?api_key=${API_KEY}&limit=${limit}`);
    const data = await res.json();
    usingMockData = false;
    return Array.isArray(data) ? data : (data.players || []);
  } catch (err) {
    usingMockData = true;
    return MOCK_PLAYERS.slice(0, limit);
  }
}

// GET /api/player/:username
export async function fetchPlayer(username) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/player/${encodeURIComponent(username)}?api_key=${API_KEY}`);
    const data = await res.json();
    usingMockData = false;
    return data.player || data;
  } catch (err) {
    usingMockData = true;
    const mock = getMockPlayer(username);
    if (mock) return mock;
    throw new Error('Server offline — demo data only has sample players');
  }
}

// GET /api/server
export async function fetchServerInfo() {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/server?api_key=${API_KEY}`);
    usingMockData = false;
    return res.json();
  } catch (err) {
    usingMockData = true;
    return {
      online: true,
      players_online: MOCK_PLAYERS.filter(p => p.is_online).length,
      max_players: 100,
      version: '1.21.4',
      motd: 'AlooSMP — Demo Mode',
    };
  }
}

// GET /api/leaderboard/:type  (money | kills)
export async function fetchLeaderboard(type = 'kills', page = 1, limit = 10) {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/leaderboard/${type}?api_key=${API_KEY}&page=${page}&limit=${limit}`);
    const data = await res.json();
    usingMockData = false;
    return Array.isArray(data) ? data : (data.players || data.leaderboard || []);
  } catch (err) {
    usingMockData = true;
    const sorted = sortPlayers(MOCK_PLAYERS, type === 'money' ? 'money' : 'kills');
    return sorted.slice((page - 1) * limit, page * limit);
  }
}

/* ─────────────────────────────────────────
   FORMATTERS
───────────────────────────────────────── */

export function formatMoney(amount = 0) {
  const num = Number(amount) || 0;
  if (num >= 1_000_000) return `₹${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000)     return `₹${(num / 1_000).toFixed(1)}K`;
  return `₹${num.toFixed(0)}`;
}

export function formatPlaytime(minutes = 0) {
  const mins = Number(minutes) || 0;
  const days  = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  const rem   = Math.floor(mins % 60);

  if (days > 0)  return `${days}D ${hours}H`;
  if (hours > 0) return `${hours}H ${rem}M`;
  return `${rem}M`;
}

export function formatKD(kills = 0, deaths = 0) {
  const k = Number(kills) || 0;
  const d = Number(deaths) || 0;
  if (d === 0) return k > 0 ? k.toFixed(1) : '0.0';
  return (k / d).toFixed(1);
}

export function formatDate(timestampMs) {
  if (!timestampMs) return 'Unknown';
  const d = new Date(Number(timestampMs));
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function timeAgo(timestampMs) {
  if (!timestampMs) return 'Unknown';
  const diffMs = Date.now() - Number(timestampMs);
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function parsePrefix(prefix = '') {
  const regex = /&#([0-9A-Fa-f]{6})&l(.)/g;
  const parts = [];
  let match;
  while ((match = regex.exec(prefix)) !== null) {
    parts.push({ char: match[2], color: `#${match[1]}` });
  }
  return parts;
}

export function prefixToText(prefix = '') {
  return parsePrefix(prefix).map(p => p.char).join('').trim();
}

export function sortPlayers(players, key) {
  const arr = [...players];
  switch (key) {
    case 'money':
      return arr.sort((a, b) => (b.money || 0) - (a.money || 0));
    case 'kills':
      return arr.sort((a, b) => (b.kills || 0) - (a.kills || 0));
    case 'time':
    case 'playtime':
      return arr.sort((a, b) => (b.playtime_minutes || 0) - (a.playtime_minutes || 0));
    case 'level':
      return arr.sort((a, b) => (b.player_level || 0) - (a.player_level || 0));
    case 'score':
      return arr.sort((a, b) => (b.score || 0) - (a.score || 0));
    default:
      return arr;
  }
}