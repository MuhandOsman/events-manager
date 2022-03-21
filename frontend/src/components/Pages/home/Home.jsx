import "./home.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { ImSpinner } from "react-icons/im";
import { BsPersonCheck } from "react-icons/bs";
import { GiGlassHeart } from "react-icons/gi";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";

import MyContext from "../../../context/MyContext";
import DeleteModal from "../modals/DeleteModal";
import UpdateModal from "../modals/UpdateModal";

const Home = () => {
  const context = useContext(MyContext);
  const {
    events,
    storedId,
    openModal,
    openUpdate,
    loading,
    subscribe,
    error,
  } = context;

  const [selectInput, setSelectInput] = useState(null)
  const [nameFilter, setNameFilter] = useState(null)
  const [rendered , setRendered] = useState(events)
  

  const filterByKeyWords = (e) => {
    
    if(!nameFilter) { return(
      selectInput !== "All"
      ? setRendered(events.filter((event) => event.category === selectInput))
      : setRendered(events))
    }else if(selectInput=== "All" ) { return(
      setRendered(events.filter(event => (event.description.includes(nameFilter) || event.title.includes(nameFilter))))
      )
    } else {
      const byCategory = events.filter((event) => event.category === selectInput)
      const by2filters = byCategory.filter(event => (event.description.includes(nameFilter) || event.title.includes(nameFilter)))
      setRendered(by2filters)
      console.log("2filters",by2filters);
    }
    
  };


  if (loading)
    return <ImSpinner className="loading" size={50} style={{ fill: "red" }} />;

  return (
    <section>
      <h1>EVENTLIT</h1>


      <div className="container-xl">
        <div className="filter">
          <span>filter</span>
          <Input
            bsSize="sm"
            type="text"
            name="category"
            className="filter-input"
            
            onChange={(e) =>setNameFilter(e.target.value)}
          />
          <Input
            className="filter-input select-input"
            type="select"
            bsSize="sm"
            name="category"
            id="name"
            onChange={(e) => setSelectInput(e.target.value)}
          >
            <option value="All">All</option>
            <option value="music">Music</option>
            <option value="sport">Sport</option>
            <option value="family">Family</option>
          </Input>
          <Button onClick={filterByKeyWords}>search</Button>
        </div>
        {events &&
          rendered.map((item) => (
              <Card key={item.id} color="dark" className="event-card ">
                <Link to="/event-detail" state={item}>
                  <CardImg
                    title="click for details"
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
                      {item.date
                        .slice(0, 16)
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
                      <Button
                        color="primary"
                        onClick={() => {
                          openUpdate(item);
                        }}
                      >
                        Update Event
                      </Button>
                      <RiDeleteBinFill
                        title="Delete Event"
                        className="delete-icon"
                        size={32}
                        style={{ fill: "red" }}
                        onClick={() => {
                          openModal(item.id);
                        }}
                      />
                      <div>
                        <DeleteModal />
                        <UpdateModal />
                      </div>
                    </div>
                  ) : (
                    <GiGlassHeart
                      size={32}
                      title="Subscribe"
                      className="subscribe"
                      onClick={() => subscribe(item)}
                      style={{ fill: "lightgreen" }}
                    />
                  )}
                </CardBody>
                <div className="check-item">
                  <span style={{ color: "lightgreen", fontSize: "16px" }}>
                    {item.subscribers.length + 5}
                  </span>
                  <BsPersonCheck
                    size={32}
                    title="Subscribers"
                    style={{ fill: "lightgreen" }}
                  />
                </div>
              </Card>
            
          ))}
        {error && <div className="show-error">{error}</div>}
      </div>
    </section>
  );
};

export default Home;
