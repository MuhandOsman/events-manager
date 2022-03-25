import { Link } from "react-router-dom";
import "./about.css";
import {BsFillTelephoneOutboundFill} from "react-icons/bs"
import {IoIosMailOpen} from "react-icons/io"
import {AiFillLinkedin} from "react-icons/ai"

const About = () => {
  return (
    <section className="about-container">
      <h1>About this project</h1>
      <p className="ani-1">
        EVENTLIT help to connect Event's organizers/Promoters with people trough
        their favorite local events.{" "}
      </p>
      <p className="ani-2">
        Users will be able to attend the events and they will be able to see how
        many attendings and tickets being sold on your event.
      </p>
      <p className="ani-3">
        Register a new profile and start immediately posting your events. Or
        reserve a place in your favorite events{" "}
      </p>
      <Link to="/form" className="ani-4">
        <p className="joinUs">Join our community now!</p>
      </Link>
        <h3>Contact us</h3>
        <h5>if you have any questions or notes I will be happy to hear from you </h5>
      <div className="contact-me">
          <BsFillTelephoneOutboundFill size="50" className="contact1" /> 
          <IoIosMailOpen size="50" className="contact2"/> 
          <AiFillLinkedin size="50" className="contact3"/>

          
           
      </div>
    </section>
  );
};

export default About;
