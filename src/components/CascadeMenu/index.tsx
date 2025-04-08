import React from "react";
import Nav, { NavItemClickHandler, NavItemRender } from "./Nav";
import Content, { SectionItemRender } from "./Content";
import "./index.css";

export interface CascadeMenuProps<T = any> {
  sections: T[];
  sectionItemRender?: SectionItemRender<T>;
  navItemRender: NavItemRender<T>;
}

function CascadeMenu<T = any>({
  sections,
  sectionItemRender,
  navItemRender,
}: CascadeMenuProps<T>) {
  const [activeSectiondIdx, setActiveSectiondIdx] = React.useState(0);
  const navItemElsRef = React.useRef<HTMLElement[]>([]);
  const sectionElsRef = React.useRef<HTMLElement[]>([]);
  const firstIndexRef = React.useRef<number>(0);
  const isScrollingRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.length === sections.length) {
          firstIndexRef.current = 0;
          return;
        }

        entries.forEach((entry) => {
          const idx = parseInt(
            entry.target.getAttribute("data-index") ?? "0",
            10
          );
          if (isScrollingRef.current) {
            if (idx === firstIndexRef.current && entry.isIntersecting) {
              isScrollingRef.current = false;
            }
          } else {
            if (idx < firstIndexRef.current && entry.isIntersecting) {
              firstIndexRef.current = idx;
            }
            if (idx === firstIndexRef.current && !entry.isIntersecting) {
              firstIndexRef.current = idx + 1;
            }
          }
        });
        setActiveSectiondIdx(firstIndexRef.current);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );
    if (Array.isArray(sectionElsRef.current)) {
      sectionElsRef.current.forEach((section) => {
        intersectionObserver.observe(section);
      });
    }
    return () => {
      intersectionObserver.disconnect();
    };
  }, [sections]);

  React.useEffect(() => {
    if (navItemElsRef.current && Array.isArray(navItemElsRef.current)) {
      const navItemEl = navItemElsRef.current[activeSectiondIdx];
      if (navItemEl instanceof HTMLElement) {
        navItemEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (
      isScrollingRef.current &&
      sectionElsRef &&
      Array.isArray(sectionElsRef.current)
    ) {
      const sectionEl = sectionElsRef.current[activeSectiondIdx];
      if (sectionEl instanceof HTMLElement) {
        sectionEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [activeSectiondIdx]);

  const handleNavItemClick: NavItemClickHandler = React.useCallback(
    (e, index) => {
      firstIndexRef.current = index;
      isScrollingRef.current = true;
      setActiveSectiondIdx(index);
    },
    []
  );

  return (
    <div className="container">
      <Nav
        ref={navItemElsRef}
        sections={sections}
        onNavItemClick={handleNavItemClick}
        activeSectiondIdx={activeSectiondIdx}
        navItemRender={navItemRender}
      />
      <Content
        sections={sections}
        ref={sectionElsRef}
        sectionItemRender={sectionItemRender}
      />
    </div>
  );
}

export default CascadeMenu;
