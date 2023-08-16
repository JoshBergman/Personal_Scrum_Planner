import { useRef, useEffect, useState } from "react";

import styles from "./Calendar.module.css";
import { formatDate } from "./TimelineComponents/Helpers/DateManageHelpers/formatDate";

import CalendarDay from "./TimelineComponents/CalendarDay";

const Calendars = () => {
  const todaysDateAsDDMMYYYY = formatDate(new Date());
  const [date1, setDate1] = useState(todaysDateAsDDMMYYYY);

  //everything below this is to set the pre-scrolled distance for the calendar
  // (Ideally showing 7 am as the start of the day, but allowing the user to scroll up for ealier times)
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPercentage = (percentage: number) => {
    const container = containerRef.current;
    if (!container) return;

    const totalScrollableHeight =
      container.scrollHeight - container.clientHeight;
    const targetScrollPosition = (percentage / 100) * totalScrollableHeight;
    container.scrollTop = targetScrollPosition;
  };

  useEffect(() => {
    scrollToPercentage(65); // number is percentage of element scrolled, and it will theoretically always align to the percentage of hours
  }, []);

  return (
    <section ref={containerRef} className={styles.calendarContainer}>
      <CalendarDay date={date1} />
    </section>
  );
};

export default Calendars;
