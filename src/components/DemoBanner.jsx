import React from 'react';
import { MdInfo } from 'react-icons/md';

// Small banner shown when API is offline and mock/demo data is being used
const DemoBanner = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255,215,0,0.08)',
    border: '1px solid rgba(255,215,0,0.25)',
    borderRadius: '12px',
    padding: '12px 18px',
    marginBottom: '24px',
    fontFamily: 'var(--font-display)',
    fontSize: '11px',
    fontWeight: 800,
    color: '#FFD700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  }}>
    <MdInfo style={{ fontSize: '18px', flexShrink: 0 }} />
    Demo Mode — Server is currently offline. Showing sample data.
  </div>
);

export default DemoBanner;