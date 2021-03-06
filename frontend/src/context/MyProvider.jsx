import MyContext from "./MyContext";
import { useState, useEffect } from "react";
import axios from "axios";

const MyProvider = (props) => {
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState("");
  const [eventToUpdate, setEventToUpdate] = useState({});
  const [events, setEvents] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [errorOrSuccess, setErrorOrSuccess] = useState(false); 

  const storedId = JSON.parse(localStorage.getItem("user-id")) || "";
  
  /* // user profile states
    const [user, setUser] = useState("");
    const [created, setCreated] = useState([]);
    const [subscribed, setSubscribed] = useState([]); */

    useEffect(() => {
        getEvents();
    }, []);
    
    
    const getEvents = async () => {
        try {
            
            // we can use axios here instead of fetch
            const response = await fetch("/api/dashboard");
            const data = await response.json();
            setEvents(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
  };


  const postForm = async (url = "", data = {}) => {
    try {
      const sendReq = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          //'Content-Type': 'multipart/form-data'
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const info = await sendReq.json();
      return info;
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(()=> {
    error && setErrorOrSuccess(true)
  },[error])

  const openModal = (id) => {
    setOpenDeleteModal(true);
    setEventId(id);
  };
  const openUpdate = (item) => {
    setOpenUpdateModal(true);
    setEventToUpdate(item);
  };
  const subscribe = (item) => {
    setErrorOrSuccess(true);
     try {
      axios
        .post(`/api/registration/${item.id}`)
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          if (error.response) setError(error.response.data.message); // access the error message error.response.data.message
          console.log(error.response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        events,
        setEvents,
        postForm,
        storedId,
        eventId,
        setEventId,
        openDeleteModal,
        setOpenDeleteModal,
        openModal,
        openUpdateModal,
        setOpenUpdateModal,
        openUpdate,
        eventToUpdate,
        setEventToUpdate,
        login,
        setLogin,
        loading,
        setLoading,
        error,
        setError,
        subscribe,
        errorOrSuccess,
        setErrorOrSuccess,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyProvider;
