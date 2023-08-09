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
      isScheduled: false,
      time: "n/a",
      date: "n/a",
      taskLengthInHours: scheduleInfo.taskLengthInHours,
    };

    taskCTX.actions.setTaskSchedule(currDragItem, newSchedule);
    taskCTX.actions.updateDragging(false);
  };

  return (
    <section
      className={styles.taskSection}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
    >
      <TasksDisplay />
      <AddTask />
    </section>
  );
};

export default TasksManager;
