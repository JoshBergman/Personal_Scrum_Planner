import { useContext } from "react";

import styles from "./TaskBlock.module.css";
import { TaskContext } from "../../../Store/Tasks/TaskContext";

interface ITaskBlocksProps {
  taskDate: string;
  taskTimeStart: string;
  durationInHours: string;
}

const TaskBlock = ({
  taskDate,
  taskTimeStart,
  durationInHours,
}: ITaskBlocksProps) => {
  const taskCTX = useContext(TaskContext);

  const onDragStartHandler = (event: React.DragEvent) => {
    const getThisTaskName = () => {
      const taskSchedule = { ...taskCTX.schedule[taskDate] };
      const taskName = taskSchedule[taskTimeStart][0];
      return taskName;
    };
    event.dataTransfer.setData("txt/plain", taskDate + "-" + taskTimeStart);
    taskCTX.actions.updateDragging(getThisTaskName());
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
