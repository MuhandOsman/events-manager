import MyContext from "./MyContext"
import {useState, useEffect} from "react";

const MyProvider = (props) => {
    // note my thought ... 
    // we need for start at least these var(state): users , events ...
    const [events, setEvents]= useState([]);
    //const [users, setUsers]= useState([]);

    useEffect(()=> {
        // we can use axios here instead of fetch
        try {
            const getEvents = async () => {
                const response = await fetch("http://localhost:8000/dashboard");
                const data = await response.json();
                setEvents(data);
                console.log(data);
            }
            getEvents();
        } catch (error) {
            console.error(error);
        }
    },[])

    const postForm = async (url = '', data = {}) => {
        const response = await fetch(url , {method:"POST" , 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        return response.json()
      }



  return (
    <MyContext.Provider value={{events, postForm}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default MyProvider