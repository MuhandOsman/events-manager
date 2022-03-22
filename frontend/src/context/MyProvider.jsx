import MyContext from "./MyContext"
import {useState, useEffect} from "react";
import axios from "axios";


const MyProvider = (props) => {
    
    const [error, setError] = useState(null);
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eventId, setEventId] = useState("")
    const [eventToUpdate, setEventToUpdate] = useState({})
    const [events, setEvents]= useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const storedId =JSON.parse(localStorage.getItem("user-id")) || "";

    /* // user profile states
    const [user, setUser] = useState("");
    const [created, setCreated] = useState([]);
    const [subscribed, setSubscribed] = useState([]); */
    

    useEffect(()=> {
        // we can use axios here instead of fetch
        try {
            const getEvents = async () => {
                const response = await fetch("/api/dashboard");
                const data = await response.json();
                setEvents(data);
                setLoading(false)
                }
            getEvents();
        } catch (error) {
            console.error(error);
        }
    },[login])
    console.log(events);
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
    const subscribe = (item) => {
        try {
            axios.post(`/api/registration/${item.id}`)
            .then(resp => {  
                console.log(resp);
                }
            )
            .catch(error => {
                if(error.response)
                setError(error.response.data.message) // access the error message error.response.data.message
            })
                  
        } catch (error) {
            
            console.log(error.message);
        }
    }
    
    if (loading) return ( "loading...")
  return (
    <MyContext.Provider value={{events, postForm,storedId , eventId, setEventId,openDeleteModal, setOpenDeleteModal,openModal,openUpdateModal, setOpenUpdateModal,openUpdate,eventToUpdate, setEventToUpdate,login, setLogin,loading, setLoading,error, setError,subscribe,}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider