import { StyleContextProvider } from "../Store/Style/StyleProvider";
import { TaskContextProvider } from "../Store/Tasks/TaskProvider";
import "./App.css";
import TasksManager from "./TasksManager/TasksManager";
import Calendars from "./Timeline/Calendars";

const App = () => {
  return (
    <div className="App">
      <StyleContextProvider>
        <TaskContextProvider>
          <header className="App-header">
            Find something useful to put in header
          </header>
          <div className="pageGrid">
            <TasksManager />
            <Calendars />
          </div>
        </TaskContextProvider>
      </StyleContextProvider>
    </div>
  );
};

export default App;
