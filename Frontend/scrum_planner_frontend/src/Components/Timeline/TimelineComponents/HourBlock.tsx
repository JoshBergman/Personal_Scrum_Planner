import { useContext } from "react";

import styles from "./HourBlock.module.css";
import { ITaskSchedule, TaskContext } from "../../../Store/Tasks/TaskContext";
import TaskBlock from "./TaskBlock";

interface IHourBlockProps {
  time: string;
  scheduledStatus: string;
}

const HourBlock = ({ time, scheduledStatus }: IHourBlockProps) => {
  const taskCTX = useContext(TaskContext);
  let taskName = "";

  const dragEnterHandler = (event: React.DragEvent) => {
    event.preventDefault();
    console.log("Drag Entered! - " + time + ": " + taskCTX.dragging);
    //Dont allow dropping on scheduled item
    //TODO figure out how to update the drag and drop cursor to represent when you cannot drop
    if (scheduledStatus !== "free" && scheduledStatus !== "scheduled") {
      event.dataTransfer.dropEffect = "none";
    } else {
      event.dataTransfer.dropEffect = "move";
    }
  };

  const dragLeaveHandler = () => {
    console.log("Drag Left!");
  };

  const dropHandler = (event: React.DragEvent) => {
    event.preventDefault();
    let delPrev = false;
    const dataTransfer = event.dataTransfer.getData("txt/plain");
    if (dataTransfer !== "") {
      delPrev = true;
    }

    //Dont allow dropping on scheduled item
    if (scheduledStatus !== "free" && scheduledStatus !== "scheduled") {
      return;
    }
    console.log("Dropped!");

    const currDragItem: string =
      typeof taskCTX.dragging === "string" ? taskCTX.dragging : "Error";
    const thisTask = taskCTX.tasks[currDragItem];

    taskName = currDragItem;
    const scheduleInfo = thisTask.schedule;
    const newSchedule: ITaskSchedule = {
      schedule: {
        isScheduled: true,
        time: time,
        date: "08/04/2023",
        taskLengthInHours: scheduleInfo.taskLengthInHours,
      },
    };

    if (delPrev === true) {
      const delTask = dataTransfer.split("-") as [date: string, time: string];
      console.log(delTask);
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
      onDragLeave={dragLeaveHandler}
      onDragOver={(event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
      onDrop={dropHandler}
      className={styles.hourBlock}
    >
      {scheduledStatus.includes("head") && (
        <TaskBlock
          taskDate={"08/04/2023"}
          taskTimeStart={time}
          durationInHours={scheduledStatus.slice(5)}
        />
      )}
      {time}
    </div>
  );
};

export default HourBlock;
