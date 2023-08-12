import React from "react";

export interface ITaskSchedule {
  schedule: {
    isScheduled: boolean;
    taskLengthInHours: number;
    date: string;
    time: string;
  };
}

export interface ITask {
  [taskName: string]: ITaskSchedule;
}

export interface ISchedule {
  [date: string]: {
    [hour: string]: [taskName: string, taskDuration: number];
  };
}
export interface ITaskContext {
  actions: {
    addTask: (newTaskName: string, newTaskSchedule: ITaskSchedule) => void;
    updateDragging: (newDragState: boolean | string) => void;
    addTaskToSchedule: (
      taskName: string,
      newSchedule: ITask["schedule"]
    ) => void;
  };
  dragging: boolean | string;
  tasks: ITask;
  schedule: ISchedule;
}

export const TaskContext = React.createContext<ITaskContext>({
  actions: {
    addTask: (newTaskName: string, newTaskSchedule: ITaskSchedule) => {},
    updateDragging: (newDragState: boolean | string) => {},
    addTaskToSchedule: (taskName: string, newSchedule: ITask["schedule"]) => {},
  },
  dragging: false,
  tasks: {},
  schedule: {},
});
