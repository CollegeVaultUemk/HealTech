import React, { useState, useEffect } from "react";
import "./doctors.styles.scss";
import doctors_list from "./doctor.list.component";
import { useContext } from "react";
import { ScheduleContext } from "../contexts/schedule.context";
import { UserContext } from "../contexts/user.context";
import { updateSchedule } from "../../utils/firebase.utils";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingMessage, setMeetingMessage] = useState("");
  const { schedule, addMeeting } = useContext(ScheduleContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser && schedule.length > 0) {
      console.log(schedule);
      updateSchedule(currentUser.uid, schedule[schedule.length - 1]);
    }
  }, [currentUser, schedule]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleBookMeetingClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
    setMeetingDate("");
    setMeetingTime("");
    setMeetingMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMeeting = {
      doctorName: selectedDoctor.name,
      date: meetingDate,
      time: meetingTime,
      message: meetingMessage,
      userId: currentUser.uid,
    };

    // Add the new meeting to the existing schedule
    addMeeting(newMeeting);
    handleModalClose();
  };

  const sortedDoctors = doctors_list.sort((a, b) => b.rating - a.rating);

  const filteredDoctors = sortedDoctors.filter((doctor) =>
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by specialization"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="doctors-list">
        {filteredDoctors.map((doctor) => (
          <div className="doctor" key={doctor.id}>
            <div className="doctor-wrapper">
              <div className="button-separator">
                <div className="doctor-image">
                  <img src={doctor.image} alt={doctor.name} />
                </div>
                <p>Name: {doctor.name}</p>
                <p>Field: {doctor.specialization}</p>
                <p>Rating: {doctor.rating}</p>
                <p>Reviews: {doctor.reviews}</p>
              </div>
              <div className="button-wrapper">
                <button onClick={() => handleBookMeetingClick(doctor)}>
                  Book a Meeting
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">
              <h3>Book a Meeting with {selectedDoctor.name}</h3>
              <button className="close-button" onClick={handleModalClose}>
                X
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date : </label>
                <input
                  type="date"
                  id="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  required
                />

                <label htmlFor="time">Time : </label>
                <input
                  type="time"
                  id="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  required
                />

                <label htmlFor="message">Message : </label>
                <input
                  type="text"
                  id="message"
                  value={meetingMessage}
                  onChange={(e) => setMeetingMessage(e.target.value)}
                  required
                />
                <div className="button-wrapper">
                  <button type="submit">Book Meeting</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
