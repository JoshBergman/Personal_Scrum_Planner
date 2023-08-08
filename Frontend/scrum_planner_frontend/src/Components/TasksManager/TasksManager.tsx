import AddTask from "./TasksComponents/AddTask";
import TasksDisplay from "./TasksComponents/TasksDisplay";

import styles from "./TasksManager.module.css";

const TasksManager = () => {
  return (
    <section className={styles.taskSection}>
      <TasksDisplay />
      <AddTask />
    </section>
  );
};

export default TasksManager;
