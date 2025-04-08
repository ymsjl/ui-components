import React from "react";
import { useInstanceListRef } from "./useInstanceListRef";

export type NavItemClickHandler = (
  event: React.MouseEvent,
  index: number
) => void;

export type NavItemRender<T> = (
  item: T,
  index: number,
  isActive: boolean
) => React.ReactNode;

export interface NavProps<T = any> {
  activeSectiondIdx?: number;
  sections: T[];
  onNavItemClick: NavItemClickHandler;
  navItemRender: NavItemRender<T>;
}

type ListElement = HTMLElement | null;

const Nav = React.forwardRef<ListElement[], NavProps>(
  ({ activeSectiondIdx = 0, sections, onNavItemClick, navItemRender }, ref) => {
    const [instanceListRef, getInstanceRef] = useInstanceListRef<ListElement>();
    React.useImperativeHandle(ref, () => instanceListRef.current);

    return (
      <nav className="nav">
        <ul className="navList">
          {sections.map((item, index) => (
            <li
              key={index}
              onClick={(e) => onNavItemClick(e, index)}
              ref={(ref) => getInstanceRef(ref, index)}
            >
              {typeof navItemRender === "function"
                ? navItemRender(item, index, index === activeSectiondIdx)
                : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

export default React.memo(Nav);
