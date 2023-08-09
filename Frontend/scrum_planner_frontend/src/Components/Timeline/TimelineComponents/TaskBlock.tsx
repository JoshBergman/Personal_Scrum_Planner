import { useContext } from "react";

import styles from "./TaskBlock.module.css";
import { TaskContext } from "../../../Store/Tasks/TaskContext";

interface ITaskBlocksProps {
  durationInHours: string;
}

const TaskBlock = ({ durationInHours }: ITaskBlocksProps) => {
  const taskCTX = useContext(TaskContext);

  const onDragStartHandler = (event: React.DragEvent) => {
    taskCTX.actions.updateDragging("Test");
  };

  return (
    <div
      style={{ height: parseInt(durationInHours) * 36 + "px" }}
      className={styles.taskBlock}
      onDragStart={onDragStartHandler}
      draggable
    />
  );
};

export default TaskBlock;
