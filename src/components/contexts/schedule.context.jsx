import { createContext, useState } from "react";

export const ScheduleContext = createContext({
  schedule: [],
  addMeeting: () => {},
});

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([]);

  const addMeeting = (meeting) => {
    setSchedule([...schedule, meeting]);
  };

  const value = { schedule, addMeeting };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
