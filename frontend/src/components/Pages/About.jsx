import React from "react";
import Images from "../images/img2.jpeg";
import Images2 from "../images/img3.jpeg";
import { useState } from "react";

const About = () => {

    const [display, setDisplay] = useState(false);
    const toggle = () => setDisplay((display) => !display);
  
  return (
    <section className="About-section">
      <h1>Welcome To The Events Page</h1>
      <button onClick={toggle}>Click Here to publish Your Events</button>
      {display && <img src={Images}  alt="pic"  width="50%"  /> }
     
      
    </section>
  );
};

export default  About