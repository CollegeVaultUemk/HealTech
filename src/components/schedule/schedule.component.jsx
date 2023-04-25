import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user.context";
import { getSchedule } from "../../utils/firebase.utils";
import "./schedule.styles.scss";

const Schedule = () => {
  const { currentUser } = useContext(UserContext);
  const [scheduleObj, setScheduleObj] = useState(null);

  const getScheduleObj = async () => {
    const response = await getSchedule(currentUser.uid);
    console.log(response);
    setScheduleObj(response);
  };

  useEffect(() => {
    if (currentUser) {
      getScheduleObj();
    }
  }, [currentUser]);

  return (
    <div className="schedule">
      <h2>My Schedule</h2>
      <div className="card-container">
        {scheduleObj ? (
          <div className="card">
            <h3>Meeting with {scheduleObj.doctorName}</h3>
            <p>Date of Meeting : {scheduleObj.date}</p>
            <p>Time of Meeting : {scheduleObj.time}</p>
            <p>Message sent to The Doctor : {scheduleObj.message}</p>
          </div>
        ) : (
          <div className="card">No Schedules booked</div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
