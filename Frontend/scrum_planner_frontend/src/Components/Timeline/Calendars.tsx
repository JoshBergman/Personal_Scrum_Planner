import { useRef, useEffect } from "react";

import styles from "./Calendar.module.css";

import CalendarDay from "./TimelineComponents/CalendarDay";

const Calendars = () => {
  //everything below this is to set the pre-scrolled distance for the calendar
  // (Ideally showing 7 am as the start of the day, but allowing the user to scroll up for ealier times)
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
      <CalendarDay date={"08/04/2023"} />
    </section>
  );
};

export default Calendars;
