import { useState } from "react";

import { TaskContext, ITask, ITaskContext } from "./TaskContext";

interface IProviderProps {
  children: React.ReactNode;
}
const defaultAndTestingTasks: ITask[] = [
  {
    taskName: "Test",
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 4,
    },
  },
  {
    taskName: "DummyTask1UnSche",
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 3,
    },
  },
  {
    taskName: "DummyTask1Scheduled",
    schedule: {
      isScheduled: true,
      date: "08/08/2023",
      time: "2 PM",
      taskLengthInHours: 3,
    },
  },
];

export const TaskContextProvider = ({ children }: IProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>(defaultAndTestingTasks);
  const [dragging, setDragging] = useState<boolean | string>(false);

  const addTask = (newTask: ITask) => {
    setTasks(tasks.concat(newTask));
  };

  const updateDragging = (newDraggingState: boolean | string) => {
    setDragging(newDraggingState);
  };

  const taskContextFinal: ITaskContext = {
    actions: {
      addTask,
      updateDragging,
    },
    dragging: dragging,
    tasks,
  };

  return (
    <TaskContext.Provider value={taskContextFinal}>
      {children}
    </TaskContext.Provider>
  );
};
