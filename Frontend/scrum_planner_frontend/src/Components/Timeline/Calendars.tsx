import { useRef, useEffect, useContext } from "react";

import styles from "./Calendar.module.css";

import CalendarDay from "./TimelineComponents/CalendarDay";
import { ITask, TaskContext } from "../../Store/Tasks/TaskContext";

const Calendars = () => {
  const taskCTX = useContext(TaskContext);
  const scheduledTasks: [string, ITask["schedule"]][] = [];
  taskCTX.tasks.forEach((task) => {
    if (task.schedule.isScheduled) {
      scheduledTasks.push([task.taskName, task.schedule]);
    }
  });

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
      <CalendarDay
        thisDaysTasks={scheduledTasks.filter(
          (task) => task[1].date === "08/08/2023"
        )}
      />
    </section>
  );
};

export default Calendars;
