import { useContext } from "react";

import styles from "./CalendarDay.module.css";
import { TaskContext } from "../../../Store/Tasks/TaskContext";
import { hours } from "./Helpers/ValidateScheduleHelpers/Hours";

import HourBlock from "./HourBlock";
import CalednarDayDateKey from "./CalendarDayDateKey";

interface ICalendarDayProps {
  date: string;
  showTimeKey?: boolean;
}

const CalendarDay = ({ date, showTimeKey }: ICalendarDayProps) => {
  const tasksCTX = useContext(TaskContext);
  const todaysTasks = { ...tasksCTX.schedule[date] };

  const getTimeBlocks = () => {
    const hourBlocks = []; //holds <HourBlock/> components and is returned
    let scheduledCounter = 0;
    let currentScheduleItemTime = "";

    //generates each hour of the day (as <HourBlock/> component) and populates with tasks accordingly
    for (let i = 0; i < hours.length; i++) {
      let scheduleStatus = "free"; //indicates the status of the current hour: "free" | "head-X"(start of new task - duration of task in hours) | "scheduled" (continuous hour of started task)
      const thisHour = hours[i];
      const tasksThisHour = todaysTasks[thisHour];

      //updates the schedule status of the current hour and sets counter for duration of any tasks (scheduledCounter)
      if (tasksThisHour) {
        const taskThisHourLengthInHours = tasksThisHour[1];
        scheduleStatus = "head-" + taskThisHourLengthInHours;

        if (scheduledCounter > 0) {
          console.error("Overscheduled"); //Theoretically should be impossible to get this
        }
        scheduledCounter = taskThisHourLengthInHours;
        currentScheduleItemTime = thisHour;
      }

      //mark following hours as scheduled with taskName
      if (scheduledCounter > 0 && scheduleStatus === "free") {
        scheduleStatus = "scheduled";
      }

      const thisBlock = (
        <HourBlock
          scheduledStatus={scheduleStatus}
          time={thisHour}
          date={date}
          key={"halfHourBlock-" + i}
          followingScheduled={currentScheduleItemTime}
          showTimeKey={showTimeKey}
        />
      );

      hourBlocks.push(thisBlock);
      if (scheduledCounter > 0) {
        scheduledCounter--;
      }
    }
    return hourBlocks;
  };

  return (
    <div className={styles.gridContainer}>
      <CalednarDayDateKey displayDate={date} />
      {getTimeBlocks()}
    </div>
  );
};

export default CalendarDay;
