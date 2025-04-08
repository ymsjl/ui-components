import React, { FC, PropsWithChildren } from "react";
import "./index.css";

export const BorderWithRadiusAndGradient: FC<PropsWithChildren> = ({children}) => {
  return <div className="pretty-border">{children}</div>;
};
