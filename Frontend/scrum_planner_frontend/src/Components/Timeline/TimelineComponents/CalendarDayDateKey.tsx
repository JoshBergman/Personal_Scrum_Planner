import React from "react";

import styles from "./CalendarDayDate.module.css";

interface ICalendarDayDateKeyProps {
  displayDate: string;
}

const CalednarDayDateKey = ({ displayDate }: ICalendarDayDateKeyProps) => {
  const isCurrentDate = (date: string) => {
    const inputDate = new Date(date);
    const currentDate = new Date();

    // Compare year, month, and day
    return (
      inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getDate() === currentDate.getDate()
    );
  };

  const keyStyle: React.StyleHTMLAttributes<HTMLDivElement> = {
    color: isCurrentDate(displayDate) ? "blue" : "inherit",
  };

  return (
    <div style={keyStyle} className={styles.dateKeyDiv}>
      {displayDate}
    </div>
  );
};

export default CalednarDayDateKey;
