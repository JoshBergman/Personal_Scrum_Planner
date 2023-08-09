import styles from "./CalendarDay.module.css";
import { ITask } from "../../../Store/Tasks/TaskContext";
import { hours } from "./Helpers/Hours";

import HourBlock from "./HourBlock";

interface ICalendarDayProps {
  thisDaysTasks: [string, ITask["schedule"]][];
}

const CalendarDay = ({ thisDaysTasks }: ICalendarDayProps) => {
  const getTimeBlocks = () => {
    const hourBlocks = []; //holds <HourBlock/> components and is returned
    let scheduledCounter = 0;

    //generates each hour of the day (as <HourBlock/> component) and populates with tasks accordingly
    for (let i = 0; i < hours.length; i++) {
      let scheduleStatus = "free"; //indicates the status of the current hour: "free" | "head-X"(start of new task - duration of task in hours) | "scheduled" (continuous hour of started task)
      const thisHour = hours[i];
      const tasksThisHour = thisDaysTasks.filter(
        (task) => task[1].time === thisHour
      );

      //updates the schedule status of the current hour and sets counter for duration of any tasks (scheduledCounter)
      if (tasksThisHour.length >= 1) {
        const taskThisHourLengthInHours = tasksThisHour[0][1].taskLengthInHours;
        scheduleStatus = "head-" + taskThisHourLengthInHours;

        if (scheduledCounter > 0) {
          console.error("Overscheduled"); //Theoretically should be impossible to get this
        }
        scheduledCounter = tasksThisHour[0][1].taskLengthInHours;
      }

      //mark following hours as scheduled
      if (scheduledCounter > 0 && scheduleStatus === "free") {
        scheduleStatus = "scheduled";
      }

      const thisBlock = (
        <HourBlock
          scheduledStatus={scheduleStatus}
          time={thisHour}
          key={"halfHourBlock-" + i}
        />
      );

      hourBlocks.push(thisBlock);
      if (scheduledCounter > 0) {
        scheduledCounter--;
      }
    }
    return hourBlocks;
  };

  return <div className={styles.gridContainer}>{getTimeBlocks()}</div>;
};

export default CalendarDay;
