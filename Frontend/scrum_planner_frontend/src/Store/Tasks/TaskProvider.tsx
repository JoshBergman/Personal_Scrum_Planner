import { TaskContext } from "./TaskContext";

interface IProviderProps {
  children: React.ReactNode;
}

export const TaskContextProvider = ({ children }: IProviderProps) => {
  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
};
