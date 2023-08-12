import { useContext } from "react";
import { TaskContext } from "../../../Store/Tasks/TaskContext";
import TaskDiv from "./TaskDiv";

const TasksDisplay = () => {
  const tasks = useContext(TaskContext).tasks;

  const getTasks = () => {
    const renderToTaskBacklog: React.ReactNode[] = [];
    Object.keys(tasks).forEach((taskKey) => {
      if (!tasks[taskKey].schedule.isScheduled) {
        renderToTaskBacklog.push(
          <TaskDiv taskName={taskKey} key={taskKey + "-tasksdisplay"} />
        );
      }
    });
    return renderToTaskBacklog;
  };

  return <div>{getTasks()}</div>;
};

export default TasksDisplay;
