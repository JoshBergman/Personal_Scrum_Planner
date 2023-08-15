import { ISchedule } from "../../../../Store/Tasks/TaskContext";
import { hours } from "./Hours";

export const validatePlacementTime = (
  daysSchedule: ISchedule["date"],
  startTime: string,
  endTime: string,
  taskName: string
) => {
  let validPlacement: boolean = true;
  const currentScheduleOutlook: { [hour: string]: string } = {
    "4 AM": "scheduled",
  };

  let currCountedTask = "";
  let scheduleCounter = 0;
  hours.forEach((hour) => {
    //check for head of scheduled item and set duration counter if found
    if (daysSchedule[hour]) {
      const scheduledItem: [taskName: string, taskDuration: number] =
        daysSchedule[hour];
      currentScheduleOutlook[hour] = scheduledItem[0];

      //used for tracking this task during later hours
      currCountedTask = scheduledItem[0];
      scheduleCounter = scheduledItem[1];
    }

    //if a task is being counted down mark hour as busy and decrement the counter
    if (scheduleCounter >= 1) {
      currentScheduleOutlook[hour] = currCountedTask;
      scheduleCounter--;
    } else {
      //when no task is being counted down, mark as free
      currCountedTask = "";
      currentScheduleOutlook[hour] = "free";
    }
  });

  const compareTaskHours = hours.slice(
    hours.indexOf(startTime),
    hours.indexOf(endTime)
  );

  compareTaskHours.forEach((hour) => {
    const currHourStatus = currentScheduleOutlook[hour];
    if (!(currHourStatus === "free" || currHourStatus === taskName)) {
      validPlacement = false;
    }
  });

  return validPlacement;
};
