import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_SEO = {
  '/': {
    title: 'AlooSMP | Official Minecraft SMP Server — Java & Bedrock (play.aloosmp.fun)',
    description:
      'Welcome to AlooSMP (Aloo SMP), India\'s premier public 24/7 Minecraft Survival SMP network! Cross-play support for Java & Bedrock (Port 19132), custom economy, crates, land claiming & lag-free PvP.',
  },
  '/vote': {
    title: 'Vote for AlooSMP | Free Daily In-Game Rewards, Keys & Currency',
    description:
      'Vote for AlooSMP every 24 hours across top Minecraft server lists to earn free ExcellentCrate keys, in-game cash, and rank vouchers. Help Aloo SMP climb the ranks!',
  },
  '/leaderboard': {
    title: 'AlooSMP Live Leaderboard | Top Players, Kills, Balance & Stats',
    description:
      'Check live real-time rankings on AlooSMP. Track top players by kills, balance, playtime, and survival streaks directly synced with the in-game server.',
  },
  '/maps': {
    title: 'AlooSMP Live Dynamic Map | Real-time Interactive World Map',
    description:
      'Explore the official AlooSMP Squaremap live dynamic map. View world claims, biomes, landmarks, and online player locations in real time.',
  },
  '/rules': {
    title: 'AlooSMP Server Rules & Code of Conduct | Fair Play Guidelines',
    description:
      'Read the official rules and guidelines for playing on AlooSMP. Learn about our strict anti-cheat, no-griefing, and respectful community policies.',
  },
  '/donators': {
    title: 'AlooSMP Store & Patrons | VIP Ranks, Cosmetics & Perks',
    description:
      'Support the AlooSMP network and unlock exclusive VIP ranks, cosmetic titles, chat badges, and perks in our official server store.',
  },
  '/contact': {
    title: 'Contact AlooSMP Staff & Support | Discord Ticket System',
    description:
      'Get in touch with the AlooSMP team. Report bugs, report rule breakers, ask questions, or partner with India\'s top Minecraft SMP network.',
  },
};

export const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle dynamic profile routes /profile/:username
    let routeInfo = ROUTE_SEO[location.pathname];
    if (!routeInfo && location.pathname.startsWith('/profile/')) {
      const username = location.pathname.split('/')[2];
      routeInfo = {
        title: `${username}'s Player Profile | AlooSMP Stats & History`,
        description: `View real-time player stats, kills, deaths, balance, and playtime for ${username} on AlooSMP Minecraft Server.`,
      };
    }

    if (routeInfo) {
      document.title = routeInfo.title;

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', routeInfo.description);
      }

      // Update OpenGraph title and description
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', routeInfo.title);
      }
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', routeInfo.description);
      }

      // Update Twitter title and description
      let twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) {
        twTitle.setAttribute('content', routeInfo.title);
      }
      let twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) {
        twDesc.setAttribute('content', routeInfo.description);
      }
    }
  }, [location.pathname]);

  return null;
};

export default SEOHead;
