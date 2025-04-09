import React, { useRef, useState } from "react";
import "./index.css";

const isPoint = (a: any) =>
  a !== null &&
  typeof a === "object" &&
  typeof a.x === "number" &&
  typeof a.y === "number";

const makePoint = (x: number, y: number) => ({ x, y });

const pointAdd = (
  a: { x: number; y: number },
  b: { x: number; y: number },
  ignore?: "X" | "Y"
) => ({
  x: ignore === "X" ? a.x : a.x + b.x,
  y: ignore === "Y" ? a.y : a.y + b.y,
});

const pointSub = (
  a: { x: number; y: number },
  b: { x: number; y: number },
  ignore?: "X" | "Y"
) => ({
  x: ignore === "X" ? a.x : a.x - b.x,
  y: ignore === "Y" ? a.y : a.y - b.y,
});

export const Moving: React.FC = () => {
  const movableViewRef = useRef<HTMLDivElement>(null);
  const movableAreaRef = useRef<HTMLDivElement>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [holdPoint, setHoldPoint] = useState(makePoint(0, 0));
  const [touchOrigin, setTouchOrigin] = useState(makePoint(0, 0));
  const direction = "all"; // 有效值 'horizontal' || 'vertical' || 'all'

  const moveTo = (p: { x: number; y: number }) => {
    if (movableViewRef.current && isPoint(p)) {
      movableViewRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMoving(true);
    setHoldPoint(makePoint(e.clientX, e.clientY));
    setTouchOrigin(makePoint(e.clientX, e.clientY));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMoving || !movableViewRef.current || !movableAreaRef.current) return;

    const currentPoint = makePoint(e.clientX, e.clientY);
    const delta = pointSub(
      currentPoint,
      holdPoint,
      direction === "horizontal"
        ? "Y"
        : direction === "vertical"
        ? "X"
        : undefined
    );
    const newPoint = pointAdd(touchOrigin, delta);

    moveTo(newPoint);
  };

  const handleMouseUp = () => {
    setIsMoving(false);
  };

  return (
    <div
      className="movable-area"
      ref={movableAreaRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="movable-view"
        ref={movableViewRef}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};
