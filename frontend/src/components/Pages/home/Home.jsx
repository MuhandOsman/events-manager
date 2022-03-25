import "./home.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { ImSpinner } from "react-icons/im";
import { BsPersonCheck } from "react-icons/bs";
import { GiGlassHeart } from "react-icons/gi";
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

const Home = () => {
  const context = useContext(MyContext);
  const {
    events,
    login,
    storedId,
    openModal,
    openUpdate,
    loading,
    subscribe,
    error,
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
    } else if (selectInput === "All") {
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
      console.log("2filters", by2filters);
    }
  };

  console.log("rendered", rendered);
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
                  <CardTitle tag="h4" className="text-light">
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
                  <CardSubtitle className="mb-2 text-light" tag="h6">
                    {" "}
                    Category:
                    {item.category}
                  </CardSubtitle>
                  <CardText className="text-light" tag="h6">
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
                    /* login &&  */(
                      <GiGlassHeart
                        size={32}
                        title="Subscribe"
                        className="subscribe"
                        onClick={() => subscribe(item)}
                        style={{ fill: "lightgreen" }}
                      />
                    )
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
      ) : (
        <ImSpinner className="loading" size={80} style={{ fill: "red" }} />
      )}
    </section>
  );
};

export default Home;
