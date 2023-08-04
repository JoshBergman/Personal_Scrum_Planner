import { ITask } from "../../../Store/Tasks/TaskContext";

const TaskDiv = ({ taskName }: ITask) => {
  return <div>{taskName}</div>;
};

export default TaskDiv;
