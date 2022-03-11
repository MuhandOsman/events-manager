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
        </CardText>
        
          {item.user === storedId.userId && <div className="flex">
            <Button>
              update your Event
            </Button>
            <RiDeleteBinFill size={32} style={{ fill: 'red' }}/>
          </div> }
          
      </CardBody>
    
  </Card>)}
</CardGroup> 
    </section>
  )
}

export default Home