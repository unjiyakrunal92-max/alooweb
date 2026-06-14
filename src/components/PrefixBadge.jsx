import React from 'react';
import { parsePrefix } from '../utils/api';

// Renders MC-style hex-gradient rank prefixes (e.g. "MEMBER", "ADMIN")
// Input format: "&#AAAAAA&lM&#BBBBBB&lE..."
const PrefixBadge = ({ prefix, style = {} }) => {
  const parts = parsePrefix(prefix);
  if (parts.length === 0) return null;

  return (
    <span style={{ fontWeight: 900, letterSpacing: '0.5px', ...style }}>
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.color }}>{p.char}</span>
      ))}
    </span>
  );
};

export default PrefixBadge;