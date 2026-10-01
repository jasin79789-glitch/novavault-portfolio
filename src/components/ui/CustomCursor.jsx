import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor for non-touch pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .interactive');
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300">
      {/* Outer Halo */}
      <div
        className="fixed rounded-full transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.6 : 1})`,
          width: '36px',
          height: '36px',
          border: isHovering ? '1.5px solid #00F5FF' : '1px solid rgba(0, 245, 255, 0.4)',
          boxShadow: isHovering ? '0 0 20px rgba(0, 245, 255, 0.5)' : 'none',
          backgroundColor: isHovering ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
        }}
      />
      {/* Core Dot */}
      <div
        className="fixed rounded-full transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${isClicking ? 1.4 : 1})`,
          width: '6px',
          height: '6px',
          backgroundColor: isHovering ? '#7B2CBF' : '#00F5FF',
          boxShadow: '0 0 10px #00F5FF',
        }}
      />
    </div>
  );
};
