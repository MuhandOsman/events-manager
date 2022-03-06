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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, autem nam. Sint a atque quisquam unde dolore tenetur ratione consectetur reiciendis. Veritatis provident omnis quod enim deleniti cupiditate optio, corporis quaerat, aliquam iusto ut nulla odio vel dolores. Unde autem a qui provident nesciunt deleniti quibusdam numquam. Amet perferendis quasi optio quam iusto eveniet voluptates totam, neque minima suscipit dolor ipsum sequi repellendus porro aut maiores vitae unde eligendi nemo provident id delectus qui. Vero consectetur ipsam, fugiat facere non harum reiciendis, deleniti in labore et architecto asperiores expedita ex incidunt sint ut. Neque nostrum totam fugiat accusantium repellat voluptatem?</p>

            </div>
            <div className="event-img">
                <img src="https://picsum.photos/318/180" alt="" />
            </div>
        </div>

    </section>
  )
}

export default EventDetail