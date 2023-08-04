import { useContext } from "react";
import { TaskContext } from "../../../Store/Tasks/TaskContext";
import TaskDiv from "./TaskDiv";

const TasksDisplay = () => {
  const tasks = useContext(TaskContext).tasks;

  const getTasks = () => {
    const renderToTaskBacklog: React.ReactNode[] = [];
    tasks.forEach((task) => {
      if (task.isScheduled === false) {
        renderToTaskBacklog.push(
          <TaskDiv
            taskName={task.taskName}
            taskLengthInHours={0}
            isScheduled={""}
            key={task.taskName}
          />
        );
      }
    });
    return renderToTaskBacklog;
  };

  return <div>{getTasks()}</div>;
};

export default TasksDisplay;
