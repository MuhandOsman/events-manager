import "./home.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
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

const Home = () => {
  const context = useContext(MyContext);
  const { events, storedId } = context;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <section>
      <h1>Events on Fire</h1>
      <div className="filter">
        <p>Filter here</p>
      </div>
      <div className="container-xl">
        <CardGroup className="card-group">
          {events &&
            events.map((item) => (
              <Card key={item.id} color="dark" className="event-card ">
                <Link to="/event-detail" state={item}>
                  <CardImg
                    alt="Card image cap"
                    src={`${item.thumbnail}`}
                    top
                    width="100%"
                  />
                </Link>
                <CardBody>
                  <CardTitle tag="h5" className="text-light">
                    {item.title} <br />
                    <small>
                      {item.date
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

                  {item.user === storedId.userId && (
                    <div className="flex">
                      <Link to="/update-event" state={item}>
                        <Button color="primary">update your Event</Button>
                      </Link>

                      <RiDeleteBinFill
                        size={32}
                        style={{ fill: "red" }}
                        onClick={() => {
                          setOpenDeleteModal(true);
                        }}
                      />
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          <div>
            <DeleteModal
              setOpenDeleteModal={setOpenDeleteModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
        </CardGroup>
      </div>
    </section>
  );
};

export default Home;
