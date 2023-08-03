import { useState, useEffect } from "react";
import { StyleContext, IStyleContext } from "./StyleContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const StyleContextProvider = ({ children }: IProviderProps) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const windowIsMobileThreshold = 600;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <StyleContext.Provider
      value={{ isMobile: windowWidth <= windowIsMobileThreshold }}
    >
      {children}
    </StyleContext.Provider>
  );
};
