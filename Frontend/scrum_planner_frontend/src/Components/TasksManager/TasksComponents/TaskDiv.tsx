import { useContext } from "react";

import styles from "./TaskDiv.module.css";
import { ITask, TaskContext } from "../../../Store/Tasks/TaskContext";

const TaskDiv = ({ taskName }: ITask) => {
  const taskCTX = useContext(TaskContext);

  const onDragStartHandler = (event: React.DragEvent) => {
    taskCTX.actions.updateDragging(taskName);
  };

  return (
    <div draggable onDragStart={onDragStartHandler} className={styles.task}>
      {taskName}
    </div>
  );
};

export default TaskDiv;
