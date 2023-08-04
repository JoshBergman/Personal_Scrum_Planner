import { useState } from "react";
import NewTaskForm from "./NewTaskForm";

const AddTask = () => {
  const [makingTask, setMakingTask] = useState(false);

  const toggleMakingTask = () => {
    setMakingTask((prevState) => !prevState);
  };

  return (
    <div>
      {makingTask && <NewTaskForm toggleMakingTask={toggleMakingTask} />}
      {!makingTask && <button onClick={toggleMakingTask}>Add Task</button>}
    </div>
  );
};

export default AddTask;
