import MyContext from "./MyContext"
import {useState, useEffect} from "react";

const MyProvider = (props) => {
    // note my thought ... 
    // we need for start at least these var(state): users , events ...
    const [login, setLogin] = useState(false);
    const [eventId, setEventId] = useState("")
    const [eventToUpdate, setEventToUpdate] = useState({})
    const [events, setEvents]= useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const storedId =JSON.parse(localStorage.getItem("user-id")) || "";
    

    useEffect(()=> {
        // we can use axios here instead of fetch
        try {
            const getEvents = async () => {
                const response = await fetch("/api/dashboard");
                const data = await response.json();
                setEvents(data);
                console.log(data);
            }
            getEvents();
        } catch (error) {
            console.error(error);
        }
    },[login])

    const postForm = async (url = '', data = {}) => {
        try {
            const sendReq = await fetch(url , {method:"POST" , 
            credentials: "same-origin",
            headers: {
              //'Content-Type': 'multipart/form-data'
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            const info = await sendReq.json()
            return info 
        } catch (error) {
            console.error(error.message)
        }
    }

    const openModal = (id) => {
        setOpenDeleteModal(true);
        setEventId(id)
    }
    const openUpdate = (item) => {
        setOpenUpdateModal(true);
        setEventToUpdate(item)
    }
    

  return (
    <MyContext.Provider value={{events, postForm,storedId , eventId, setEventId,openDeleteModal, setOpenDeleteModal,openModal,openUpdateModal, setOpenUpdateModal,openUpdate,eventToUpdate, setEventToUpdate,login, setLogin}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider