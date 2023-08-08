import { useContext } from "react";

import styles from "./HourBlock.module.css";
import { TaskContext } from "../../../Store/Tasks/TaskContext";

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
