import styles from "./CalendarDay.module.css";

import HourBlock from "./HourBlock";
import { ITask } from "../../../Store/Tasks/TaskContext";

interface ICalendarDayProps {
  thisDaysTasks: [string, ITask["schedule"]][];
}

const CalendarDay = ({ thisDaysTasks }: ICalendarDayProps) => {
  const getTimeBlocks = (isAM: boolean) => {
    const hourBlocks = [];
    let scheduledCounter = 0;

    //generates each hour of the day and populates with any scheduled tasks
    for (let i = 1; i < 13; i++) {
      const thisTime = Math.floor(i) + (isAM ? " AM" : " PM");
      const tasksThisHour = thisDaysTasks.filter(
        (task) => task[1].time === thisTime
      );
      if (tasksThisHour.length >= 1) {
        scheduledCounter = tasksThisHour[0][1].taskLengthInHours;
      }
      const thisBlock = (
        <HourBlock
          scheduledStatus={scheduledCounter === 0 ? "free" : "scheduled"}
          time={thisTime}
          key={"halfHourBlock-" + i}
        />
      );

      // deals with the whole 12 AM / 12 PM offset
      i !== 12 ? hourBlocks.push(thisBlock) : hourBlocks.unshift(thisBlock);
      if (scheduledCounter > 0) {
        scheduledCounter--;
      }
    }

    return hourBlocks;
  };

  return (
    <div className={styles.gridContainer}>
      {getTimeBlocks(true)}
      {getTimeBlocks(false)}
    </div>
  );
};

export default CalendarDay;
