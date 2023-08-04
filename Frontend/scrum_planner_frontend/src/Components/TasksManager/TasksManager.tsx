import AddTask from "./TasksComponents/AddTask";
import TasksDisplay from "./TasksComponents/TasksDisplay";

const TasksManager = () => {
  return (
    <section>
      <TasksDisplay />
      <AddTask />
    </section>
  );
};

export default TasksManager;
