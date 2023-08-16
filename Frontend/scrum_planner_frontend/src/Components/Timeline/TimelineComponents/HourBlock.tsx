import { useContext } from "react";

import styles from "./HourBlock.module.css";
import { calculateTimeAfter } from "./Helpers/ValidateScheduleHelpers/calculateElapsedTime";
import { ITaskSchedule, TaskContext } from "../../../Store/Tasks/TaskContext";
import TaskBlock from "./TaskBlock";
import { validatePlacementTime } from "./Helpers/ValidateScheduleHelpers/validatePlacementTime";

interface IHourBlockProps {
  time: string;
  scheduledStatus: string;
  date: string;
}

const HourBlock = ({ time, scheduledStatus, date }: IHourBlockProps) => {
  const taskCTX = useContext(TaskContext);
  let taskName = "";

  const dragEnterHandler = (event: React.DragEvent) => {
    event.preventDefault();

    //TODO figure out how to update the drag and drop cursor to represent when you cannot drop
    //Dont allow dropping on scheduled item
    if (scheduledStatus !== "free" && scheduledStatus !== "scheduled") {
      event.dataTransfer.dropEffect = "none";
    } else {
      event.dataTransfer.dropEffect = "move";
    }
  };

  const dropHandler = (event: React.DragEvent) => {
    event.preventDefault();
    let delPrev = false; //lets us know if the task is already scheduled and will delete the previous instance of it being scheduled on reschedule
    const dataTransfer = event.dataTransfer.getData("txt/plain");
    if (dataTransfer !== "") {
      delPrev = true;
    }

    //Dont allow dropping on scheduled item
    if (scheduledStatus !== "free" && scheduledStatus !== "scheduled") {
      return;
    }

    //defining information of task to schedule and updating the task scheduled status
    const currDragItem: string =
      typeof taskCTX.dragging === "string" ? taskCTX.dragging : "Error";
    const thisTask = taskCTX.tasks[currDragItem];

    taskName = currDragItem;
    const scheduleInfo = thisTask.schedule;
    const newSchedule: ITaskSchedule = {
      schedule: {
        isScheduled: true,
        time: time,
        date: date,
        taskLengthInHours: scheduleInfo.taskLengthInHours,
      },
    };

    //additional checks for valid drop placement
    const endTime = calculateTimeAfter(
      newSchedule.schedule.time,
      newSchedule.schedule.taskLengthInHours
    );
    const daysSchedule = { ...taskCTX.schedule[date] };
    const validDropTarget: boolean = validatePlacementTime(
      daysSchedule,
      newSchedule.schedule.time,
      endTime,
      taskName
    );
    if (!validDropTarget) {
      return;
    }

    //handling drop events for either adding new task or rescheduling existing task(delPrev = true)
    if (delPrev === true) {
      const delTask = dataTransfer.split("-") as [date: string, time: string];
      if (delTask.length === 2) {
        taskCTX.actions.addTaskToSchedule(taskName, newSchedule, delTask);
      }
    }
    taskCTX.actions.addTaskToSchedule(taskName, newSchedule);
    taskCTX.actions.updateDragging(false);
  };

  return (
    <div
      style={{
        backgroundColor:
          scheduledStatus === "free"
            ? "transparent"
            : scheduledStatus === "scheduled"
            ? "cyan"
            : "red",
      }}
      onDragEnter={dragEnterHandler}
      onDragOver={(event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={dropHandler}
      className={styles.hourBlock}
    >
      {scheduledStatus.includes("head") && (
        <TaskBlock
          taskDate={date}
          taskTimeStart={time}
          durationInHours={scheduledStatus.slice(5)}
        />
      )}
      {time}
    </div>
  );
};

export default HourBlock;
