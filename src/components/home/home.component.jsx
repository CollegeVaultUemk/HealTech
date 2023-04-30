import React, { Fragment } from "react";
import "./home.styles.scss";
import HomePic from "../../assets/medpic.png";
import AboutPic from "../../assets/aboutus.svg";
import ContactPic from "../../assets/contactus.svg";

const Home = () => {
  const [formStatus, setFormStatus] = React.useState("Send");
  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitted");
    const { name, email, message } = e.target.elements;
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(conFom);
  };
  return (
    <Fragment>
      <div className="home-container">
        <div id="home" className="home">
          <div className="intro">
            <p className="intro-1">
              Welcome To Our <br /> Healthcare Platform!
            </p>
            <p className="intro-2">
              Connect with licensed doctors for trusted medical consultations
              and personalized support. Our user-friendly interface ensures
              seamless communication and privacy. Get access to quality
              healthcare from the comfort of your home or on-the-go.
            </p>
          </div>
          <img src={HomePic} alt="home-pic" />
        </div>
        <div className="about">
          <div className="intro">
            <p className="about-head">About Us</p>
            <p className="about-info">
              We are a team passionate software engineers who believe that
              everyone should have access to quality healthcare. We created this
              platform to help people connect with licensed doctors for trusted
              medical consultations and personalized support. Our user-friendly
              interface ensures seamless communication and privacy.
              <br />
              Our chat feature allows you to communicate with your doctor in
              real time. You can also upload your medical records and images for
              consultation. Our platform is HIPAA compliant and ensures the
              confidentiality of your data. We are committed to providing
              quality healthcare to everyone.
            </p>
          </div>
          <div className="aboutpic">
            <img src={AboutPic} alt="about-pic" />
          </div>
        </div>
        <div className="contact">
          <img src={ContactPic} alt="contact-pic" />
          <div className="contact-wrapper">
            <h2 className="mb-3">Contact Us</h2>
            <form onSubmit={onSubmit}>
              <div className="input-field">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="message">Message</label>
                <textarea rows={6} id="message" required />
              </div>
              <button className="btn" type="submit">
                {formStatus}
              </button>
            </form>
          </div>
        </div>
        <div className="footer">Created with ❤️ by Team HealTech.</div>
      </div>
    </Fragment>
  );
};

export default Home;
