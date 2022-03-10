import "./home.css"
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {RiDeleteBinFill} from "react-icons/ri";
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import MyContext from "../../../context/MyContext"

const Home = () => {
  const context = useContext(MyContext)
  const {events,storedId} = context;
  
  return (
    <section>
      <h1 >Events on Fire</h1>
      <div className="filter">
        <p>Filter here</p>
      </div>
      
      <CardGroup className="card-group">
        {events && events.map((item)=> 
        
        <Card key= {item.id} color="dark" className="event-card " >
        <Link to= "/event-detail" state={item} >
        <CardImg
        alt="Card image cap"
        src={`${item.thumbnail}`}
        top
        width="100%"
        />
        </Link>
        <CardBody>
        <CardTitle tag="h5" className="text-light" >
        {item.title} <br />
        <small>{item.date.split(".").slice(0,1).join("").split("T").join(" ")}</small>
        </CardTitle>
        <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
        >
        {item.category}
        </CardSubtitle>
        <CardText className="text-light">
          {item.description}
          {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem accusantium laboriosam itaque error delectus maxime architecto nihil, officiis aspernatur quam, praesentium eveniet alias neque ea consectetur repellat blanditiis provident quibusdam. */}
        </CardText>
        <Button>
        Button
        </Button>
          {item.user === storedId.userId && <RiDeleteBinFill size={32} style={{ fill: 'red' }}/>}
          
      </CardBody>
    
  </Card>)}
</CardGroup> 
    </section>
  )
}

export default Home