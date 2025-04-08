import React, { FC, useState } from "react";
import "./index.css";

export const Zoom: FC = ({}) => {
  const [isTripped, setIsTripped] = useState(false);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);

  const onFrontClick = () => {
    setIsAnimationEnd(false);
    setIsTripped(true);
  };

  const onBackClick = () => {
    setIsAnimationEnd(false);
    setIsTripped(false);
  };

  return (
    <div className="card">
      <div
        className={`box back flex-center-column ${
          isTripped ? "out-back" : "in-back"
        }`}
        onClick={onBackClick}
        onAnimationEnd={() => setIsAnimationEnd(true)}
        hidden={isAnimationEnd && !isTripped}
      >
        BACK
      </div>
      <div
        className={`box front flex-center-column ${isTripped ? "out" : "in"}`}
        onClick={onFrontClick}
        onAnimationEnd={() => setIsAnimationEnd(true)}
        hidden={isAnimationEnd && isTripped}
      >
        FRONT
      </div>
    </div>
  );
};
