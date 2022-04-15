import { Link } from "react-router-dom";
import "./about.css";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { IoIosMailOpen } from "react-icons/io";
import { AiFillLinkedin } from "react-icons/ai";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h1>About this project</h1>
        <p className="ani-1">
          EVENTLIT help to connect Event's organizers/Promoters with people
          through their favorite local events.
        </p>
        <p className="ani-2">
          Users will be able to search for events, check description, see how
          many attendings and tickets being sold, and by subscribing <br /> to
          an event you reserve your ticket which you reserve at location.
        </p>
        <p className="ani-3">
          Register a new profile and start immediately posting your events. Or
          reserve a place in your favorite events.
        </p>
        <Link to="/form" className="ani-4">
          <p className="joinUs">Join our community now!</p>
        </Link>
        <h4>Contact us</h4>
        <h5>
          if you have any questions or notes I will be happy to hear from you{" "}
        </h5>
        <div className="contact-me">
          <a rel="noreferrer" href="tel:+491791070118" className="contact1"><BsFillTelephoneOutboundFill title="+491791070118" href="tel:+491791070118" size="40"  /></a>
          <a rel="noreferrer" href="mailto:mo1981ot@gmail.com"  ><IoIosMailOpen size="40" className="contact2" title="mo1981ot@gmail.com" /></a>
          <a rel="noreferrer" href="https://linkedin.com/in/muhanadosman" target="_blank"><AiFillLinkedin size="40" className="contact3" /></a>
          
        </div>
      </div>
    </section>
  );
};

export default About;
