import { useState } from "react";

import { TaskContext, ITask, ITaskContext } from "./TaskContext";

interface IProviderProps {
  children: React.ReactNode;
}
const defaultAndTestingTasks = [
  {
    taskName: "Test",
    taskLengthInHours: 4,
    isScheduled: false,
  },
  {
    taskName: "DummyTask1UnSche",
    taskLengthInHours: 3,
    isScheduled: false,
  },
  {
    taskName: "DummyTask1Scheduled",
    taskLengthInHours: 3,
    isScheduled: "08/04/2023",
  },
];

export const TaskContextProvider = ({ children }: IProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>(defaultAndTestingTasks);

  const addTask = (newTask: ITask) => {
    setTasks(tasks.concat(newTask));
  };

  const taskContextFinal: ITaskContext = {
    actions: {
      addTask: addTask,
    },
    tasks,
  };

  return (
    <TaskContext.Provider value={taskContextFinal}>
      {children}
    </TaskContext.Provider>
  );
};
