import { useContext, useRef, useState } from "react";
import { ITaskSchedule, TaskContext } from "../../../Store/Tasks/TaskContext";

interface INewTaskFormProps {
  toggleMakingTask: () => void;
}

const NewTaskForm = ({ toggleMakingTask }: INewTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(1);
  const taskActions = useContext(TaskContext).actions;

  const titleRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);

  const formCancelHandler = () => {
    toggleMakingTask();
  };

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTaskSchedule: ITaskSchedule = {
      schedule: {
        isScheduled: false,
        date: "N/A",
        time: "N/A",
        taskLengthInHours: duration,
      },
    };

    // add input validity checks before adding tasks
    taskActions.addTask(title, newTaskSchedule);

    toggleMakingTask();
  };

  const onTitleChange = () => {
    if (titleRef.current == null) {
      return;
    }
    setTitle(titleRef.current.value);
  };

  const onDurationChange = () => {
    if (durationRef.current == null) {
      return;
    }
    setDuration(parseInt(durationRef.current.value));
  };

  return (
    <form id="newTaskForm" onSubmit={formSubmitHandler}>
      <h2>New Task:</h2>
      <input
        type="text"
        placeholder="Name"
        ref={titleRef}
        onChange={onTitleChange}
      />
      <input
        onChange={onDurationChange}
        ref={durationRef}
        type="number"
        id="durationInHoursInput"
        step="0.5"
        min="0"
        max="24"
      />
      <label htmlFor="durationInHoursInput">Duration: (Hours)</label>
      <button type="submit">Confirm</button>
      <button onClick={formCancelHandler}>Cancel</button>
      <button
        type="button"
        onClick={() => {
          console.log(title, duration);
        }}
      >
        Delete Me
      </button>
    </form>
  );
};

export default NewTaskForm;
