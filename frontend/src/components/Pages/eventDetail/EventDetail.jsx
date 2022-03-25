import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./eventDetail.css";

const EventDetail = () => {
  const location = useLocation();
  const item = location.state;
  const [promoter, setPromoter] = useState("");
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${item.user}`);
        const userData = await response.json();
        setPromoter(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [item.user]);

  return (
    <section>
      <div className="event-container">
        <div className="event-details">
          <p className="date-location">
            {" "}
            <span>Date: 
              {item.date
                .slice(0, 16)
                .split(".")
                .slice(0, 1)
                .join("")
                .split("T")
                .join(" ")}
            </span>{" "}
            <span>Location: {item.location}</span>{" "}
          </p>

          <h5>
            {" "}
            About this event: <br /> <br /> {item.description} <br /> This event
            will be a phone-free experience. Use of cellphones, smart watches,
            smart accessories, cameras or recording devices will not be
            permitted in the performance space. Upon arrival at the venue, all
            phones and smart watches will be secured in Your cases that will be
            opened at the end of the event. Guests maintain possession of their
            phones at all times, and can access their phones throughout the show
            at designated Phone Use Areas in the venue. All phones will be
            re-secured in Yondr cases before returning to the performance space.
          </h5>

          <p>
            Ticket price:{item.price} <br />
            subscribe now and reserve your place <br />
            Tickets at the door
          </p>
        </div>
        <div className="event-right">
          <div
            className="event-img"
            style={{ backgroundImage: `url(${item.thumbnail_url})` }}
          ></div>
          <div>
            <h3>{item.title} </h3>
            <p className="organizer">
              from {`${promoter.firstName} ${promoter.lastName}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
