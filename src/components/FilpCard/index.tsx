import React, { useState } from "react";
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
  const handleClick = () => {
    const card = document.querySelector(".c-card");
    card?.classList.toggle("is-flipped");
    document
      .querySelector(".c-card__face--back")
      ?.classList.toggle("c-card__face--flipped");
  };

  return (
    <div
      className={`c-card ${isFlipped ? "is-flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="c-card__face c-card__face--front">
        {frontSurfaceRender()}
      </div>
      <div className="c-card__face c-card__face--back">
        {backSurfaceRender()}
      </div>
    </div>
  );
};
