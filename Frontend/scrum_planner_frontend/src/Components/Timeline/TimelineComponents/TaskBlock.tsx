import { useContext, useState } from "react";

import styles from "./TaskBlock.module.css";
import { TaskContext } from "../../../Store/Tasks/TaskContext";

interface ITaskBlocksProps {
  taskName: string;
  durationInHours: string;
}

const TaskBlock = ({ durationInHours, taskName }: ITaskBlocksProps) => {
  const [taskNameState, setTaskNameState] = useState(taskName);
  const taskCTX = useContext(TaskContext);

  const onDragStartHandler = (event: React.DragEvent) => {
    taskCTX.actions.updateDragging(taskNameState);
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
