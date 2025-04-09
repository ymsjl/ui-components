import React, { useRef, useState } from "react";
import "./index.css";

const SlideOverlay: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const threshold = 100;
  const openedOverlayHeight = window.innerHeight * 0.8;
  const closedOverlayHeight = 50;
  const initTranslateY = openedOverlayHeight - closedOverlayHeight;

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [startPositionY, setStartPositionY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setStartPositionY(e.touches[0].pageY);
    overlayRef.current?.classList.add("touch-start");
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const diff = e.touches[0].pageY - startPositionY;
    if (
      diff === 0 ||
      (isOverlayOpen && diff < 0) ||
      (!isOverlayOpen && diff > 0)
    ) {
      return;
    }

    const distance = Math.abs(diff);
    if (overlayRef.current) {
      overlayRef.current.style.transform = isOverlayOpen
        ? `translateY(${Math.min(initTranslateY, distance)}px)`
        : `translateY(${Math.max(0, initTranslateY - distance)}px)`;
    }

    overlayRef.current?.classList.remove("touch-start", "touch-end");
    overlayRef.current?.classList.add("touch-move");
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const endPositionY = e.changedTouches[0].pageY;
    const diff = endPositionY - startPositionY;

    if (
      diff === 0 ||
      (isOverlayOpen && diff < 0) ||
      (!isOverlayOpen && diff > 0)
    ) {
      return;
    }

    overlayRef.current?.classList.remove("touch-move");

    if (Math.abs(diff) < threshold) {
      overlayRef.current!.style.transform = isOverlayOpen
        ? `translateY(0)`
        : `translateY(${initTranslateY}px)`;
      return;
    }

    if (isOverlayOpen) {
      overlayRef.current!.style.transform = `translateY(${initTranslateY}px)`;
      setIsOverlayOpen(false);
    } else {
      overlayRef.current!.style.transform = `translateY(0)`;
      setIsOverlayOpen(true);
    }

    overlayRef.current?.classList.add("touch-end");
  };

  return (
    <div id="layer-container" className="layer-container">
      <div
        ref={overlayRef}
        className="layer overlay flex-center"
        style={{
          height: openedOverlayHeight,
          transform: `translateY(${initTranslateY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        This is overlay
      </div>
    </div>
  );
};

export default SlideOverlay;
