import "./home.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { RiDeleteBinFill } from "react-icons/ri";
import { ImSpinner } from "react-icons/im";
import { MdOutlineFollowTheSigns, MdPersonAdd } from "react-icons/md";
import { BsSearch } from "react-icons/bs";

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
import ErrorOrSuccess from "../modals/ErrorOrSuccess"

const Home = () => {
  const context = useContext(MyContext);
  const {
    events,
    login,
    // storedId,
    openModal,
    openUpdate,
    loading,
    subscribe,
    
    setEvents,
    
  } = context;

  const [selectInput, setSelectInput] = useState("All");
  const [nameFilter, setNameFilter] = useState("");
  const [rendered, setRendered] = useState([]);

  const filterByKeyWords = () => {
    if (nameFilter === "") {
      return selectInput !== "All"
        ? setRendered(events.filter((event) => event.category === selectInput))
        : setRendered(events);
    } else if (selectInput === "All" && nameFilter !== "") {
      return setRendered(
        events.filter(
          (event) =>
            event.description.includes(nameFilter) ||
            event.title.includes(nameFilter)
        )
      );
    } else {
      const byCategory = events.filter(
        (event) => event.category === selectInput
      );
      const by2filters = byCategory.filter(
        (event) =>
          event.description.includes(nameFilter) ||
          event.title.includes(nameFilter)
      );
      setEvents(by2filters);
      // console.log("2filters", by2filters);
    }
  };
  const storedId = JSON.parse(localStorage.getItem("user-id")) || "";
  
  return (
    <section>
      {/* <h1>EVENTLIT</h1> */}

      {!loading ? (
        <div className="container-xl">
          <div className="filter">
            <Input
              placeholder="Filter"
              bsSize="sm"
              type="text"
              name="category"
              className="filter-input"
              onChange={(e) => setNameFilter(e.target.value)}
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
              <option value="culture">Culture</option>
              <option value="commerce">Commerce</option>
            </Input>
            <BsSearch
              size="28"
              className="search-lens"
              onClick={filterByKeyWords}
            />
          </div>
          {((events.length > 0 && rendered.length===0) ? events : rendered)
            .map((item) => (
              <Card key={item.id} color="dark" className="event-card ">
                <Link to="/event-detail" state={item}>
                  <CardImg
                    title="click for details"
                    alt="Card image cap"
                    className="card-img"
                    src={item.thumbnail_url}
                    top
                    width="100%"
                  />
                </Link>
                <CardBody className="card-body" tag="div">
                 <Link to="/event-detail" state={item}>
                  <CardTitle className="text-light title-event">
                   <h4 className="title-event">{item.title} <br /></h4>
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
                  </Link>
                  <CardSubtitle className="mb-2 text-light" tag="h6">
                    {" "}
                    Category:
                    {item.category}
                  </CardSubtitle>
                  <CardText className="text-light" tag="h6">
                    Entry price : {item.price}{!isNaN(item.price)  && <span> €</span>}
                  </CardText>

                  {item.user === storedId.userId ? (
                    <div className="flex">
                      <Button
                        className="custom-btn btn-7"
                        onClick={() => {
                          openUpdate(item);
                        }}
                      >
                        <span>Update Event</span>
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
                    </div>
                  ) : (
                     login &&  (
                      <div className="attend" onClick={() => subscribe(item)}>
                        <span className="text">  Follow Event  </span>
                      <MdOutlineFollowTheSigns
                      size={32}
                        title="Subscribe"
                        className="subscribe" 
                      /></div>
                    )
                  )}
                <div className="check-item">
                
                  <span style={{ color: "white", fontSize: "16px" }}>
                  Attending  {item.subscribers.length + 5} 
                  </span>
                  <MdPersonAdd
                    size={32}
                    title="Subscribers"
                    style={{ fill: "white" }}
                  />
                </div>
                </CardBody>
                      <div>
                        <DeleteModal />
                        <UpdateModal />
                        <ErrorOrSuccess />
                      </div>
              </Card>
            ))}
            {/* {error && <div className="show-error">{error}</div>} */}
        </div>
      ) : (
        <ImSpinner className="loading" size={80} style={{ fill: "red" }} />
      )}
    </section>
  );
};

export default Home;
