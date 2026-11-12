import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AnarchyPopup.css';
import {
  MdClose,
  MdLocalFireDepartment,
  MdContentCopy,
  MdCheckCircle,
  MdOpenInNew,
} from 'react-icons/md';

const STORAGE_KEY = 'aloosmp_2b2t_popup_seen';
const AUTO_CLOSE_MS = 5000;

export const AnarchyPopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const navigate = useNavigate();
  const timerRef = useRef(null);
  const remainingRef = useRef(AUTO_CLOSE_MS);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Check if user has already seen and dismissed the popup
    const hasSeen = localStorage.getItem(STORAGE_KEY);
    if (hasSeen === 'true') {
      return;
    }

    // Delay 600ms before showing for a smooth entrance
    const initialDelay = setTimeout(() => {
      setVisible(true);
      startTimeRef.current = Date.now();

      // Start 5 second auto-close timer
      timerRef.current = setTimeout(() => {
        closePopup();
      }, AUTO_CLOSE_MS);
    }, 600);

    return () => {
      clearTimeout(initialDelay);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const closePopup = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    localStorage.setItem(STORAGE_KEY, 'true');
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - (startTimeRef.current || Date.now());
      remainingRef.current = Math.max(1000, remainingRef.current - elapsed);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      closePopup();
    }, remainingRef.current);
  };

  const handleCopyCmd = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('/server 2b2t');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    closePopup();
    navigate('/2b2t-india');
  };

  if (!visible) return null;

  return (
    <aside
      className={`anarchy-popup-wrap ${closing ? 'closing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="2b2t India Announcement"
    >
      <div className="anarchy-popup-card">
        {/* Close Button on Side */}
        <button
          className="ap-close-btn"
          onClick={closePopup}
          aria-label="Close notification"
          title="Close (will not show again)"
        >
          <MdClose />
        </button>

        {/* Live Pill */}
        <div className="ap-pill">
          <span className="ap-pill-dot" />
          <MdLocalFireDepartment /> 2b2t India Anarchy
        </div>

        {/* Headline & Body */}
        <h4 className="ap-title">
          Join <span>2b2t India</span> Now!
        </h4>
        <p className="ap-desc">
          Pure raw anarchy with <strong>0 rules</strong> & hacks allowed. Use <strong>/server 2b2t</strong> to enter!
        </p>

        {/* Action Buttons */}
        <div className="ap-actions">
          <button className="ap-btn-join" onClick={handleJoinClick}>
            Join 2b2t Now <MdOpenInNew />
          </button>
          <button
            className="ap-btn-cmd"
            onClick={handleCopyCmd}
            title="Copy /server 2b2t command"
          >
            {copied ? <MdCheckCircle style={{ color: '#22c55e' }} /> : <MdContentCopy />}
            {copied ? 'Copied!' : '/server 2b2t'}
          </button>
        </div>

        {/* 5-Second Animated Progress Bar */}
        <div className="ap-timer-track">
          <div
            className="ap-timer-fill"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          />
        </div>
      </div>
    </aside>
  );
};

export default AnarchyPopup;
