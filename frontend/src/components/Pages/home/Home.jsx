import "./home.css";
import React, { useContext} from "react";
import { Link } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { ImSpinner } from "react-icons/im";
import {BsPersonCheck} from "react-icons/bs"
import {GiGlassHeart} from "react-icons/gi"
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  
} from "reactstrap";

import MyContext from "../../../context/MyContext";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal"

const Home = () => {
  const context = useContext(MyContext);
  const { events, storedId,openModal,openUpdate,loading,subscribe} = context;

  if(loading) return (<ImSpinner className="loading" size={50} style={{ fill: "red" }}/>)

  return (
    <section>
      
      <h1>Events on Fire</h1>
      <div className="filter">
        <div>Filter here</div>
      </div>
      <div className="container-xl">
        <CardGroup className="card-group">
          {events &&
            events.map((item) => (
              <Card key={item.id} color="dark" className="event-card ">
                <Link to="/event-detail" state={item}>
                  <CardImg title="click for details"
                    alt="Card image cap"
                    src={`${item.thumbnail}`}
                    top
                    width="100%"
                  />
                </Link>
                <CardBody className="card-body">
                  <CardTitle tag="h5" className="text-light">
                    {item.title} <br />
                    <small>
                      {item.date.slice(0,16)
                        .split(".")
                        .slice(0, 1)
                        .join("")
                        .split("T")
                        .join(" ")}
                    </small>
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.category}
                  </CardSubtitle>
                  <CardText className="text-light">
                    Entry price :{item.price}
                  </CardText>

                  {item.user === storedId.userId ? (
                    <div className="flex">
                        <Button color="primary" onClick={() =>{openUpdate(item)} }>Update Event</Button>
                        <RiDeleteBinFill title="Delete Event"
                        size={32}
                        style={{ fill: "red" }}
                        onClick={() => {
                          openModal(item.id)
                        }}
                      />
                      <div>
                        <DeleteModal />
                        <UpdateModal />
                      </div>
                    </div>
                  ) :
                  <GiGlassHeart size={32} title="Subscribe" className="subscribe" onClick={()=>subscribe(item)}
                    style={{ fill: "lightgreen" }}/>
                }
                </CardBody>
                <div className="check-item">
                  <span style={{ color: "lightgreen" ,fontSize:"16px" }}>{item.subscribers.length +5}</span>
                  <BsPersonCheck size={32} title="Subscribers"
                        style={{ fill: "lightgreen" }} />
                </div>
              </Card>
            ))}
        </CardGroup>
      </div>  
    </section>
  );
};

export default Home;
