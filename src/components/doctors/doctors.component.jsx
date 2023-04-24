import React, { useState } from "react";
import "./doctors.styles.scss";
import doctors_list from "./doctor.list.component";

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
  };

  const filteredDoctors = doctors_list.filter((doctor) =>
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by specialization..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="doctors-list">
        {filteredDoctors.map((doctor) => {
          return (
            <div key={doctor.id} className="doctor">
              <div className="doctor-wrapper">
                <div className="button-separator">
                  <div className="doctor-image">
                    <img src={doctor.image} alt="doctor" />
                  </div>
                  <div className="doctor-info">
                    <div className="doctor-info-name">
                      <p>Name : {doctor.name}</p>
                    </div>
                    <div className="doctor-info-specialization">
                      <p>Field : {doctor.specialization}</p>
                    </div>
                    <div className="doctor-info-rating">
                      <p>Rating : {doctor.rating}</p>
                    </div>
                    <div className="doctor-info-reviews">
                      <p>Reviews : {doctor.reviews}</p>
                    </div>
                  </div>
                </div>
                <div className="button-wrapper">
                  <button onClick={() => handleBookMeetingClick(doctor)}>
                    BOOK MEETING
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">
              <h3>Book meeting with {selectedDoctor.name}</h3>
              <button onClick={handleModalClose}>X</button>
            </div>
            <div className="modal-body">
              <form>
                <div>
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" required />
                </div>
                <div>
                  <label htmlFor="time">Time:</label>
                  <input type="time" id="time" name="time" required />
                </div>
                <div>
                  <label htmlFor="message">Message:</label>
                  <input type="text" id="message" name="message" />
                </div>
                <div className="button-wrapper">
                  <button type="submit">Submit</button>
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
