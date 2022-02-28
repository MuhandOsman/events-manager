import React, {useContext} from 'react'
import MyContext from "../../context/MyContext"

const Home = () => {
  const context = useContext(MyContext)
  const {events} = context
  return (
    <section>
      <h1 >UNDER CONSTRUCTION</h1>
      {events && events.map((item) => (
        <div key={item.id} className="events">
          <h2>{item.title}</h2>
          <h3>{item.description}</h3>
        </div>
      ))}
    </section>
  )
}

export default Home