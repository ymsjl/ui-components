import React, { FC, useState } from "react";
import "./index.css";
import cls from "classnames";

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
        className={cls("box back flex-center-column", {
          "out-back": isTripped,
          "in-back": !isTripped,
        })}
        onClick={onBackClick}
        onAnimationEnd={() => setIsAnimationEnd(true)}
        hidden={isAnimationEnd && !isTripped}
      >
        BACK
      </div>
      <div
        className={cls("box front flex-center-column", {
          out: isTripped,
          in: !isTripped,
        })}
        onClick={onFrontClick}
        onAnimationEnd={() => setIsAnimationEnd(true)}
        hidden={isAnimationEnd && isTripped}
      >
        FRONT
      </div>
    </div>
  );
};
