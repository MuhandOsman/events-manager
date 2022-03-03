import React, {useContext} from 'react'
import { Button, Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import MyContext from "../../context/MyContext"

const Home = () => {
  const context = useContext(MyContext)
  const {events} = context
  return (
    <section>
      <h1 >UNDER CONSTRUCTION</h1>
      {/* {events && events.map((item) => (
        <div key={item.id} className="events">
          <h2>{item.title}</h2>
          <h3>{item.description}</h3>
        </div>
      ))} */}
      <CardGroup>
        {events && events.map((item)=> 
  <Card key= {item.id}>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        {item.title}
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        {item.eventCategory}
      </CardSubtitle>
      <CardText>
        {item.description}
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>)}
  {/* <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This card has supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>*/}
</CardGroup> 
    </section>
  )
}

export default Home