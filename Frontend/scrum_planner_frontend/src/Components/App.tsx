import { StyleContextProvider } from "../Store/Style/StyleProvider";
import { TaskContextProvider } from "../Store/Tasks/TaskProvider";
import "./App.css";
import Calendars from "./Timeline/Calendars";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Find something useful to put in header
      </header>
      <StyleContextProvider>
        <TaskContextProvider>
          <Calendars />
        </TaskContextProvider>
      </StyleContextProvider>
    </div>
  );
};

export default App;
