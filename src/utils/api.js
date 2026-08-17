/* =============================================
   api.js — AlooSMP API Layer
   Centralized config, fetchers & formatters
   Auto-falls back to mock data if API is offline
   ============================================= */

import { MOCK_PLAYERS, getMockPlayer } from './mockData';

// ── Config ──
export const API_BASE = '/api/proxy';
export const API_KEY  = 'mralooyt-2026-x7Kp9-secret';

const FETCH_TIMEOUT_MS = 15000;
const DEBUG = true;

let usingMockData = false;
export const isUsingMockData = () => usingMockData;

export const getAvatarUrl = (username) =>
  `https://mc-heads.net/avatar/${username}/64`;

export const getBodyUrl = (username) =>
  `https://mc-heads.net/body/${username}/100`;

function log(...args) {
  if (DEBUG) console.log('[api.js]', ...args);
}

// ── In-Flight Request Deduplication & Response Caching ──
const inFlightPromises = new Map();
const responseCache = new Map();
const CACHE_TTL_MS = 10000; // 10 second cache

async function fetchWithTimeout(url, ms = FETCH_TIMEOUT_MS) {
  // 1. Return cached data if fresh
  const cached = responseCache.get(url);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    log('Cache HIT for:', url);
    return cached.data;
  }

  // 2. Return pending in-flight promise if identical request is running
  if (inFlightPromises.has(url)) {
    log('Deduplicating in-flight fetch for:', url);
    return inFlightPromises.get(url);
  }

  // 3. Initiate fetch with auto-retry
  const fetchPromise = (async () => {
    let lastErr = null;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), ms);
      try {
        log(`Fetching (attempt ${attempt}):`, url);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        log('Response status:', res.status, 'for', url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        responseCache.set(url, { data, timestamp: Date.now() });
        return data;
      } catch (err) {
        clearTimeout(timer);
        lastErr = err;
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 300));
        }
      }
    }
    throw lastErr;
  })();

  inFlightPromises.set(url, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    inFlightPromises.delete(url);
  }
}

// GET /api/players?limit=N — Unified fetch combining /players + leaderboards so all players are captured
export async function fetchPlayers(limit = 200) {
  try {
    // Fetch players list and leaderboards in parallel to capture all players (Bedrock + Java)
    const [playersRes, moneyRes, killsRes, timeRes] = await Promise.allSettled([
      fetchWithTimeout(`${API_BASE}/players?api_key=${API_KEY}&limit=100`),
      fetchWithTimeout(`${API_BASE}/leaderboard/money?api_key=${API_KEY}`),
      fetchWithTimeout(`${API_BASE}/leaderboard/kills?api_key=${API_KEY}`),
      fetchWithTimeout(`${API_BASE}/leaderboard/playtime?api_key=${API_KEY}`),
    ]);

    const playerMap = new Map();

    const addPlayers = (res) => {
      if (res.status === 'fulfilled' && res.value) {
        const list = Array.isArray(res.value) ? res.value : (res.value.players || res.value.leaderboard || []);
        list.forEach(p => {
          if (p && p.username) {
            const key = p.username.toLowerCase();
            playerMap.set(key, { ...(playerMap.get(key) || {}), ...p });
          }
        });
      }
    };

    addPlayers(playersRes);
    addPlayers(moneyRes);
    addPlayers(killsRes);
    addPlayers(timeRes);

    const merged = Array.from(playerMap.values());
    if (merged.length > 0) {
      usingMockData = false;
      log('fetchPlayers SUCCESS — real merged count:', merged.length);
      return merged.slice(0, limit);
    }
    throw new Error('No players found in API');
  } catch (err) {
    usingMockData = true;
    log('fetchPlayers FALLBACK to mock data. Reason:', err.message);
    return MOCK_PLAYERS.slice(0, limit).map(p => ({ ...p, is_online: false }));
  }
}

// GET /api/player/:username
export async function fetchPlayer(username) {
  if (!username) throw new Error('No username provided');

  // Strategy 1: Direct player endpoint (/api/player/:username)
  try {
    const data = await fetchWithTimeout(`${API_BASE}/player/${encodeURIComponent(username)}?api_key=${API_KEY}`);
    const pData = data?.player || data;
    if (pData && !pData.error && pData.username) {
      log('fetchPlayer direct SUCCESS for:', username);
      usingMockData = false;
      return pData;
    }
  } catch (err) {
    log('fetchPlayer direct fetch failed for:', username, 'Reason:', err.message);
  }

  // Strategy 2: Lookup in merged players list
  try {
    const playersList = await fetchPlayers(200);
    const found = playersList.find(
      p => p.username && p.username.toLowerCase() === username.toLowerCase()
    );
    if (found) {
      log('fetchPlayer found in players list for:', username);
      usingMockData = false;
      return found;
    }
  } catch (err) {
    log('fetchPlayer lookup in players list failed:', err.message);
  }

  // Strategy 3: Mock data fallback
  const mock = getMockPlayer(username);
  if (mock) {
    usingMockData = true;
    log('fetchPlayer fallback to mock for:', username);
    return mock;
  }

  // Strategy 4: Clean default profile
  usingMockData = false;
  return {
    uuid: `player-${username}`,
    username: username,
    money: 0,
    kills: 0,
    deaths: 0,
    mob_kills: 0,
    playtime_minutes: 0,
    blocks_mined: 0,
    rank: 'default',
    prefix: '',
    first_join: Date.now(),
    last_join: Date.now(),
    last_seen: Date.now(),
    is_online: false,
    ping: 0,
    world: 'world',
    player_level: 1,
    score: 0,
  };
}

// GET /api/server
export async function fetchServerInfo() {
  try {
    const data = await fetchWithTimeout(`${API_BASE}/server?api_key=${API_KEY}`);
    usingMockData = false;
    log('fetchServerInfo SUCCESS — real data:', data);
    return { ...(data || {}), online: true };
  } catch (err) {
    usingMockData = true;
    log('fetchServerInfo FALLBACK to mock data. Reason:', err.message);
    return {
      online: false,
      players_online: 0,
      max_players: 100,
      version: '1.21.4',
      motd: 'AlooSMP — Offline',
    };
  }
}

// GET /api/leaderboard/:type (money | kills | playtime)
export async function fetchLeaderboard(type = 'money', page = 1, limit = 50) {
  const endpointType = (type === 'time' || type === 'playtime') ? 'playtime' : type;
  try {
    const data = await fetchWithTimeout(`${API_BASE}/leaderboard/${endpointType}?api_key=${API_KEY}&page=${page}&limit=${limit}`);
    usingMockData = false;
    const list = Array.isArray(data) ? data : (data && (data.players || data.leaderboard) ? (data.players || data.leaderboard) : []);
    if (list.length > 0) {
      return list;
    }
    throw new Error('Empty leaderboard response');
  } catch (err) {
    usingMockData = true;
    log('fetchLeaderboard FALLBACK to mock data. Reason:', err.message);
    const sorted = sortPlayers(MOCK_PLAYERS, type === 'money' ? 'money' : (type === 'time' ? 'playtime' : 'kills'));
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