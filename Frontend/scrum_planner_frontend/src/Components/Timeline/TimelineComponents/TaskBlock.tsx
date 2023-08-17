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

  const getThisTaskName = () => {
    const taskSchedule = { ...taskCTX.schedule[taskDate] };
    const taskName = taskSchedule[taskTimeStart][0];
    return taskName;
  };

  const onDragStartHandler = (event: React.DragEvent) => {
    event.dataTransfer.setData("txt/plain", taskDate + "-" + taskTimeStart);
    taskCTX.actions.updateDragging(getThisTaskName());
  };

  return (
    <div
      style={{ height: parseInt(durationInHours) * 45 + "px" }}
      className={styles.taskBlock}
      onDragStart={onDragStartHandler}
      draggable
    >
      {getThisTaskName()}
    </div>
  );
};

export default TaskBlock;
