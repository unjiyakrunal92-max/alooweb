import React, { useState, useRef, useEffect } from 'react';
import '../styles/Gallery.css';
import {
  MdImage,
  MdLocationOn,
  MdChevronLeft,
  MdChevronRight,
  MdPlayArrow,
} from 'react-icons/md';

// ── Slides config ──
// Replace src with your actual screenshot paths e.g. import img1 from '../assets/gallery/spawn.jpg'
// For now using placeholder gradients
const SLIDES = [
  { id: 1, location: 'Spawn',    src: "https://i.ibb.co/SX37s3vD/2026-08-11-20-07-12.png", gradient: 'linear-gradient(135deg,#0d2a4a,#1a4a7a,#0d2a4a)' },
  { id: 2, location: 'District',   src: "https://i.ibb.co/jP6qHRn6/2026-08-11-20-08-05.png", gradient: 'linear-gradient(135deg,#1a0d2e,#3d1a6e,#1a0d2e)' },
  { id: 3, location: 'Leaderboard',   src: "https://i.ibb.co/rK09sLrk/2026-08-11-20-08-56.png", gradient: 'linear-gradient(135deg,#2e0d0d,#6e1a1a,#2e0d0d)' },
  { id: 4, location: 'PvP Arena',src: "https://i.ibb.co/Qv8Djkkm/2026-08-11-20-08-27.png", gradient: 'linear-gradient(135deg,#1a1a0d,#3d3a1a,#1a1a0d)' },
];

const Gallery = () => {
  const [current, setCurrent]   = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart               = useRef(0);
  const total                   = SLIDES.length;

  // auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  // drag/swipe support
  const onDragStart = (e) => {
    dragStart.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragging(true);
  };
  const onDragEnd = (e) => {
    if (!dragging) return;
    const end = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart.current - end;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setDragging(false);
  };

  return (
    <section className="gallery-section" id="gallery">

      {/* Header */}
      <div className="gallery-header">
        <div className="gallery-header-icon">
          <MdImage />
        </div>
        <div className="gallery-header-text">
          <h2 className="gallery-title">Server Gallery</h2>
          <p className="gallery-subtitle">Glimpses of the Adventure</p>
        </div>
      </div>

      {/* Device Frame */}
      <div className="gallery-device">
        <div
          className="gallery-viewport"
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          {/* Track */}
          <div
            className="gallery-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div className="gallery-slide" key={slide.id}>
                {slide.src ? (
                  <img src={slide.src} alt={slide.location} draggable={false} />
                ) : (
                  <div
                    className="gallery-slide-placeholder"
                    style={{ background: slide.gradient }}
                  >
                    <MdImage />
                    <span>Add your screenshot here</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Arrow Prev */}
          <button className="gallery-arrow prev" onClick={prev} aria-label="Previous">
            <MdChevronLeft />
          </button>

          {/* Arrow Next */}
          <button className="gallery-arrow next" onClick={next} aria-label="Next">
            <MdChevronRight />
          </button>

          {/* Location label */}
          <div className="gallery-location">
            <MdLocationOn />
            {SLIDES[current].location}
          </div>

          {/* Ambient button */}
          <button className="gallery-ambient">
            <MdPlayArrow />
            <span className="gallery-ambient-dot" />
            Ambient
          </button>

          {/* Dot nav */}
          <div className="gallery-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default Gallery;