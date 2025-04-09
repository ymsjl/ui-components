import React, { useState, useEffect } from "react";
import "./index.css";

interface Props {
  className?: string;
  frontSurfaceRender?: () => React.ReactNode;
  backSurfaceRender?: () => React.ReactNode;
}

export const FilpCard: React.FC<Props> = ({
  className = "",
  frontSurfaceRender = () => null,
  backSurfaceRender = () => null,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      const activeRef = isFlipped ? backRef.current : frontRef.current;
      if (activeRef) {
        setContainerHeight(activeRef.offsetHeight);
      }
    };

    updateHeight();
  }, [isFlipped]);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={`c-card ${isFlipped ? "is-flipped" : ""}`}
      onClick={handleClick}
      style={{ height: containerHeight ? `${containerHeight}px` : "auto" }}
    >
      <div className="c-card__face c-card__face--front" ref={frontRef}>
        {frontSurfaceRender()}
      </div>
      <div className="c-card__face c-card__face--back" ref={backRef}>
        {backSurfaceRender()}
      </div>
    </div>
  );
};
