import React from "react";

export interface IStyleContext {
  isMobile: boolean;
}

export const StyleContext = React.createContext({ isMobile: false });
