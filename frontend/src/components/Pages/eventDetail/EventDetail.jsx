import React from 'react'
import {useLocation} from "react-router-dom";

import "./eventDetail.css"

const EventDetail = () => {
    const location = useLocation();
    const item = location.state;

  return (
    <section>
        <div className="event-container">
            <div className="event-details">
                <p>  <span>event date and time</span> <span>event address</span> </p>
                <h3>{item.title} </h3>
                <p>from (organizer)</p>
                <p>Ticket price:{item.price} €</p>
                <h4> about this event: {item.description} </h4>
                

            </div>
            <div className="event-img">
                <img src={item.thumbnail} alt="" />
            </div>
        </div>

    </section>
  )
}

export default EventDetail