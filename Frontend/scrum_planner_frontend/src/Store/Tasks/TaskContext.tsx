import React from "react";

export interface ITask {
  taskName: string;
  taskLengthInHours: number;
  isScheduled: boolean | string; // False is not schedule otherwise the scheduled date
}

export interface ITaskContext {
  actions: {
    addTask: (newTask: ITask) => void;
  };
  tasks: ITask[];
}

export const TaskContext = React.createContext<ITaskContext>({
  actions: {
    addTask: () => {},
  },
  tasks: [],
});
