import { useRef, useEffect } from "react";

import styles from "./Timeline.module.css";

import CalendarDay from "./TimelineComponents/CalendarDay";

const Calendars = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const setHeightOfScroll = () => {
    const setInitialScrollBuffer = 3.5; // container height / setInitialScrollBuffer === position scroller is set to

    const container = containerRef.current;
    if (container !== null) {
      const contentHeight = container.scrollHeight;
      container.scrollTop = contentHeight / setInitialScrollBuffer;
    }
  };

  useEffect(() => {
    setHeightOfScroll();
  }, []);

  return (
    <section ref={containerRef} className={styles.calendarContainer}>
      <CalendarDay />
    </section>
  );
};

export default Calendars;
