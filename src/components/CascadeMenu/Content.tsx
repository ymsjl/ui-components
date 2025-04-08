import React from "react";
import { useInstanceListRef } from "./useInstanceListRef";

// 定义组件的属性类型
interface ContentProps<T = any> {
  sections: T[];
  sectionItemRender?: (item: T, index: number) => React.ReactNode;
}

const Content = React.forwardRef<HTMLElement[], ContentProps>(
  ({ sections, sectionItemRender }, ref) => {
    const [instanceListRef, getInstanceRef] = useInstanceListRef<HTMLElement>();
    React.useImperativeHandle(ref, () => instanceListRef.current);

    return (
      <div className="content">
        {sections.map((item, index) => (
          <section
            key={index}
            ref={(ref) => {
              if (ref) getInstanceRef(ref, index);
            }}
            data-index={index}
          >
            {typeof sectionItemRender === "function"
              ? sectionItemRender(item, index)
              : null}
          </section>
        ))}
        <div className="empty"></div>
      </div>
    );
  }
);

export default React.memo(Content);
