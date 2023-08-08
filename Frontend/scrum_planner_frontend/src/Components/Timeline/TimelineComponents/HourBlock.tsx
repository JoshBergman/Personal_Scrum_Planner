import { useContext } from "react";

import styles from "./HourBlock.module.css";
import { ITask, TaskContext } from "../../../Store/Tasks/TaskContext";

interface IHourBlockProps {
  time: string;
  scheduledStatus: string;
}

const HourBlock = ({ time, scheduledStatus }: IHourBlockProps) => {
  const taskCTX = useContext(TaskContext);

  const dragEnterHandler = () => {
    console.log("Drag Entered! - " + time + ": " + taskCTX.dragging);
  };

  const dragLeaveHandler = () => {
    console.log("Drag Left!");
  };

  const dropHandler = (event: React.DragEvent) => {
    event.preventDefault();
    console.log("Dropped!");
    const currDragItem: string =
      typeof taskCTX.dragging === "string" ? taskCTX.dragging : "Error";
    const thisTask = taskCTX.tasks.filter(
      (task) => task.taskName === currDragItem
    );
    const scheduleInfo = thisTask[0].schedule;
    const newSchedule: ITask["schedule"] = {
      isScheduled: true,
      time: time,
      date: "08/08/2023",
      taskLengthInHours: scheduleInfo.taskLengthInHours,
    };

    taskCTX.actions.setTaskSchedule(currDragItem, newSchedule);
    taskCTX.actions.updateDragging(false);
  };

  return (
    <div
      style={{
        backgroundColor: scheduledStatus === "free" ? "transparent" : "red",
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
      {time}
    </div>
  );
};

export default HourBlock;
