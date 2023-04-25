import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/contexts/user.context";
import { ScheduleProvider } from "./components/contexts/schedule.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ScheduleProvider>
          <App />
        </ScheduleProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
