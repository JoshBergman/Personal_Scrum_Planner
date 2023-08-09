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
    taskName: "20 Hours",
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 20,
    },
  },
  {
    taskName: "DummyTask1Scheduled",
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
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

  const setTaskSchedule = (
    taskName: string,
    newSchedule: ITask["schedule"]
  ) => {
    const tasksCopy = tasks.concat([]);
    const modifyIndex: number = tasksCopy.findIndex(
      (task) => task.taskName === taskName
    );
    if (modifyIndex < 0) {
      return;
    }

    //update information to task
    const newTaskValue = tasksCopy[modifyIndex];
    newTaskValue.schedule = {
      ...newSchedule,
    };

    //apply new task to tasks
    tasksCopy[modifyIndex] = newTaskValue;
    setTasks(tasksCopy);
  };

  const updateDragging = (newDraggingState: boolean | string) => {
    setDragging(newDraggingState);
  };

  const taskContextFinal: ITaskContext = {
    actions: {
      addTask,
      updateDragging,
      setTaskSchedule,
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
