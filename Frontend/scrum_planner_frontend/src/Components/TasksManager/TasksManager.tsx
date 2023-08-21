import { useContext } from "react";
import AddTask from "./TasksComponents/AddTask";
import TasksDisplay from "./TasksComponents/TasksDisplay";

import styles from "./TasksManager.module.css";
import { ITask, TaskContext } from "../../Store/Tasks/TaskContext";

const TasksManager = () => {
  const taskCTX = useContext(TaskContext);

  const dragEnterHandler = (event: React.DragEvent) => {
    console.log("Drag Entered! - " + taskCTX.dragging);
  };

  const dragLeaveHandler = () => {
    console.log("Drag Left!");
  };

  //drop handler for when moving tasks from the schedule => back to the product backlog
  const dropHandler = (event: React.DragEvent) => {};

  return (
    <section
      className={styles.taskSection}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      <h2>Task Backlog</h2>
      <TasksDisplay />
      <AddTask />
    </section>
  );
};

export default TasksManager;
