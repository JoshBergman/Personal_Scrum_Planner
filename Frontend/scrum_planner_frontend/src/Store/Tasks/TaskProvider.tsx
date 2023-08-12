import { useState } from "react";

import {
  TaskContext,
  ITask,
  ITaskContext,
  ISchedule,
  ITaskSchedule,
} from "./TaskContext";

interface IProviderProps {
  children: React.ReactNode;
}
const defaultAndTestingTasks: ITask = {
  Test: {
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 4,
    },
  },
  DummyTask1UnSche: {
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 3,
    },
  },
  "20 Hours": {
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 20,
    },
  },
  DummyTask1Scheduled: {
    schedule: {
      isScheduled: false,
      date: "n/a",
      time: "n/a",
      taskLengthInHours: 3,
    },
  },
};

const defaultSchedule: ISchedule = {
  "08/04/2023": {
    "6 PM": ["DummyTask1Scheduled", 3],
  },
};

export const TaskContextProvider = ({ children }: IProviderProps) => {
  const [schedule, setSchedule] = useState<ISchedule>(defaultSchedule);
  const [tasks, setTasks] = useState<ITask>(defaultAndTestingTasks);
  const [dragging, setDragging] = useState<boolean | string>(false);

  const addTask = (newTaskName: string, newTask: ITaskSchedule) => {
    const tasksCopy = { ...tasks };
    tasksCopy[newTaskName] = newTask;
    setTasks(tasksCopy);
  };

  const addTaskToSchedule = (
    taskName: string,
    newSchedule: ITask["schedule"]
  ) => {
    const scheduleCopy = { ...schedule };
    const tasksCopy = { ...tasks };

    const date = newSchedule.schedule.date;
    const hour = newSchedule.schedule.time;
    const taskDuration = newSchedule.schedule.taskLengthInHours;

    scheduleCopy[date][hour] = [taskName, taskDuration];
    setSchedule(scheduleCopy);

    tasksCopy[taskName].schedule = newSchedule.schedule;
    setTasks(tasksCopy);
  };

  const updateDragging = (newDraggingState: boolean | string) => {
    setDragging(newDraggingState);
  };

  const taskContextFinal: ITaskContext = {
    actions: {
      addTask,
      updateDragging,
      addTaskToSchedule,
    },
    dragging: dragging,
    tasks,
    schedule,
  };

  return (
    <TaskContext.Provider value={taskContextFinal}>
      {children}
    </TaskContext.Provider>
  );
};
