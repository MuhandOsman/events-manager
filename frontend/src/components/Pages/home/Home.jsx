import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import MyContext from "../../../context/MyContext"

const Home = () => {
  const context = useContext(MyContext)
  const {events} = context
  return (
    <section>
      <h1 >Events on Fire</h1>
      <div className="filter">
        <p>Filter here</p>
      </div>
      
      <CardGroup>
        {events && events.map((item)=> 
  <Card key= {item.id} color="dark">
    <Link to= "/event-detail" state={item} >
    <CardImg
      alt="Card image cap"
      src={`${item.thumbnail}`}
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5" >
        {item.title} <br />
        <small>{item.date}</small>
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        {item.category}
      </CardSubtitle>
      <CardText>
       {item.description}
       {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem accusantium laboriosam itaque error delectus maxime architecto nihil, officiis aspernatur quam, praesentium eveniet alias neque ea consectetur repellat blanditiis provident quibusdam. */}
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
    </Link>
  </Card>)}
</CardGroup> 
    </section>
  )
}

export default Home