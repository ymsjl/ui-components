import React, { useRef, useState, FC } from "react";
import "./index.css";

const TOUCH_TOP = 0;
const SCROLLING_BETWEEN = 1;
const TOUCH_BOTTOM = 2;

export interface OverScrollProps {
  className?: string;
  innerClassName?: string;
  onScrollOverUp?: () => void;
  onScrollOverDown?: () => void;
  disableScroll?: boolean;
  children: React.ReactNode;
}

export const OverScroll: FC<OverScrollProps> = ({
  className = "",
  innerClassName = "",
  onScrollOverUp,
  onScrollOverDown,
  disableScroll,
  children,
}) => {
  const [overScrollOffset, setOverScrollOffset] = useState(0); // 滚动到达边界后，滚动的元素与边界之间的位移
  const scrollAreaRef = useRef<HTMLDivElement | null>(null); // 保存拥有滚动条的元素的引用
  const scrollContentRef = useRef<HTMLDivElement | null>(null); // 保存滚动的元素的引用
  const reboundTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 保存滚动的元素的引用
  const scrollPositionRef = useRef(TOUCH_TOP); // 保存滚动的条所处的位置，顶部，底部，或者之间

  // 延迟回弹，等待一段事件后将超出滚动距离归零
  const delayedRebound = (duration: number) => {
    if (reboundTimeoutRef.current) {
      clearTimeout(reboundTimeoutRef.current);
    }

    reboundTimeoutRef.current = setTimeout(() => {
      if (overScrollOffset !== 0) {
        setOverScrollOffset(0);
      }
      if (reboundTimeoutRef.current) {
        clearTimeout(reboundTimeoutRef.current);
      }
    }, duration);
  };

  const resetScrollPosition = () => {
    setOverScrollOffset(0);
    scrollPositionRef.current = TOUCH_TOP;
  };

  const handleOnScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const element = e.target as HTMLElement;
    if (element.scrollTop === 0) {
      scrollPositionRef.current = TOUCH_TOP;
    } else if (
      Math.floor(element.scrollHeight - element.scrollTop) + 1 >=
      Math.floor(element.clientHeight)
    ) {
      scrollPositionRef.current = TOUCH_BOTTOM;
    } else {
      scrollPositionRef.current = SCROLLING_BETWEEN;
    }
  };

  function easeOutCubic(x: number) {
    return 1 - Math.pow(1 - x, 3);
  }

  const handleOverScroll = (direction: boolean) => {
    const threshold = 125; // 滚动超出距离的阈值，必须大于等于 0
    const directionCoefficient = direction ? -1 : 1;

    if (directionCoefficient * overScrollOffset < 0) {
      // 如果上一次鼠标滚轮事件触发时，处于的运动状态与当前要移动的方向相反，则把将滚动的距离复位
      setOverScrollOffset(0);
    } else if (Math.abs(overScrollOffset) < threshold) {
      const baseStep = 47; // 到达滚动条边界后，每次触发的鼠标滚轮滚动事件滚动的距离
      const step =
        directionCoefficient *
        baseStep *
        easeOutCubic((threshold - overScrollOffset) / threshold);
      setOverScrollOffset(overScrollOffset + step);

      const reboundDuration = 140; // 到达滚动条边界后回弹的等待时间 (ms) 毫秒为单位
      delayedRebound(reboundDuration);
    } else {
      const callback = direction ? onScrollOverUp : onScrollOverDown;
      if (callback) {
        callback();
      }
      resetScrollPosition();
    }
  };

  const handleOnWheel: React.WheelEventHandler<HTMLDivElement> = async (e) => {
    if (disableScroll) {
      return undefined;
    }

    if (!scrollContentRef.current) {
      return;
    }

    if (!scrollAreaRef.current) {
      return;
    }

    const scrollContentRect = scrollContentRef.current.getBoundingClientRect();
    const scrollAreaRect = scrollAreaRef.current.getBoundingClientRect();

    if (scrollContentRect.height <= scrollAreaRect.height) {
      if (e.deltaY < 0) {
        handleOverScroll(true);
      } else if (e.deltaY > 0) {
        handleOverScroll(false);
      }
    } else if (scrollPositionRef.current === TOUCH_TOP && e.deltaY < 0) {
      // 触发在顶部向上滑动
      handleOverScroll(true);
    } else if (scrollPositionRef.current === TOUCH_BOTTOM && e.deltaY > 0) {
      // 触发在底部向下滑动
      handleOverScroll(false);
    }
  };

  return (
    <div
      className={`scrollable-wrapper ${className}`}
      ref={scrollAreaRef}
      onScroll={handleOnScroll}
      onWheel={handleOnWheel}
      style={{ overflowY: "scroll" }}
    >
      <div
        className={`scrollable-inner ${innerClassName}`}
        style={{
          transform: `translateY(${-overScrollOffset}px)`,
          transition: "transform 100ms linear",
        }}
        ref={scrollContentRef}
      >
        {children}
      </div>
    </div>
  );
};
