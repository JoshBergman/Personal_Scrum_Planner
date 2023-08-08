import React from "react";

export interface ITask {
  taskName: string;
  schedule: {
    isScheduled: boolean;
    taskLengthInHours: number;
    date: string;
    time: string;
  };
}

export interface ITaskContext {
  actions: {
    addTask: (newTask: ITask) => void;
    updateDragging: (newDragState: boolean | string) => void;
  };
  dragging: boolean | string;
  tasks: ITask[];
}

export const TaskContext = React.createContext<ITaskContext>({
  actions: {
    addTask: (newTask: ITask) => {},
    updateDragging: (newDragState: boolean | string) => {},
  },
  dragging: false,
  tasks: [],
});
