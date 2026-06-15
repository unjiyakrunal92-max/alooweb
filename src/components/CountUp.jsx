import React, { useEffect, useRef, useState } from 'react';

/**
 * CountUp — animates a number from 0 → value when it scrolls into view.
 *
 * Usage:
 *   <CountUp value={1240} />                       → "1240"
 *   <CountUp value={99.9} decimals={1} suffix="%" /> → "99.9%"
 *   <CountUp value={24} prefix="₹" />              → "₹24"
 *   <CountUp value={1240} format />                → "1,240"  (thousands separator)
 *   <CountUp value={980000} formatter={formatMoney} /> → "₹0" → "₹980.0K" (animated!)
 *   <CountUp value={14260} formatter={formatPlaytime} /> → "0M" → "9D 22H" (animated!)
 *
 * Props:
 *  - value     (number, required) — final number to count up to
 *  - duration  (ms, default 1500) — animation length
 *  - decimals  (number, default 0) — decimal places to show
 *  - prefix    (string) — text before the number (e.g. "₹")
 *  - suffix    (string) — text after the number (e.g. "%", "+", "K")
 *  - format    (bool, default true) — add thousands separators (1,240)
 *  - formatter (fn) — custom function(currentValue) => string, runs every frame.
 *                      Overrides prefix/suffix/format/decimals when provided.
 *                      Great for formatMoney, formatPlaytime, formatKD, etc.
 */
const CountUp = ({
  value,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  format = true,
  formatter = null,
}) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = () => {
    const target = Number(value) || 0;
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setDisplay(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(target); // snap to exact final value
      }
    };

    requestAnimationFrame(step);
  };

  // ── Format the number for display ──
  let output;

  if (formatter) {
    // custom formatter (e.g. formatMoney, formatPlaytime) — gets raw animated value
    output = formatter(display);
  } else {
    const rounded = decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toString();

    const formatted = format
      ? Number(rounded).toLocaleString('en-IN', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : rounded;

    output = `${prefix}${formatted}${suffix}`;
  }

  return (
    <span ref={ref}>
      {output}
    </span>
  );
};

export default CountUp;