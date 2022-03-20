import { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom";

import "./eventDetail.css"

const EventDetail = () => {
    const location = useLocation();
    const item = location.state;
    const [promoter , setPromoter] = useState("")
    useEffect(()=>{
      const getUser = async() => {
          try {
              const response = await fetch(`/api/user/${item.user}`)
          const userData = await response.json();
          setPromoter(userData);
          

          } catch (error) {
              console.log(error);
          }
      }
      getUser()
      
  } , [])
  
    

  return (
    <section>
        <div className="event-container">
            <div className="event-details">
                <h3>{item.title} </h3>
                <p>from {`${promoter.firstName} ${promoter.lastName}` }</p>
                <p>Ticket price:{item.price} </p>
                <h5> about this event: <br/>{item.description} 
                </h5>
                

                <p className="date-location">  <span>{item.date
                        .slice(0, 16)
                        .split(".")
                        .slice(0, 1)
                        .join("")
                        .split("T")
                        .join(" ")}</span> <span>{item.location}</span> </p>
            </div>
            <div className="event-img">
                <img src={item.thumbnail} alt="event-img" />
            </div>
        </div>

    </section>
  )
}

export default EventDetail