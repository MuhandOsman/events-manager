import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../../context/MyContext';
import "./user.css";

const User = () => {

    const store = useContext(MyContext);
    const {storedId,loading, setLoading} = store;

    const [user, setUser] = useState("");
    const [created, setCreated] = useState([]);
    const [subscribed, setSubscribed] = useState([]);

    useEffect(()=>{
        const getUser = async() => {
            try {
                const response = await fetch(`/api/user/${storedId.userId}`)
            const userData = await response.json();
            setUser(userData);
            setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
        
    } , [storedId,setLoading])

    useEffect(()=> {
       const getCreated = async() => {
        const response2 = await fetch(`/api/eventbyuserid/${storedId.userId}`)
        const createdEvents = await response2.json();
        setCreated(createdEvents)
       }
       getCreated()
    },[storedId.userId])

    useEffect(()=> {
        const getSubscribed = async() => {
            const response3 = await fetch(`/api/subscribeByuserid/${storedId.userId}`)
            const subscribedEvents = await response3.json();    
            setSubscribed(subscribedEvents)
        }
        getSubscribed()
    },[storedId.userId])


    
    if (loading) return ( "loading...")

  return (
    <section className="profile">
        <h3 className="title">welcome {user.firstName}</h3>
        <div className="avatar">
            <div className="userImg"></div>
            <div className="userInfo">
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <p>{user.email}</p>    
            </div>    
        </div>
        <div className="eventContainer">
            {subscribed.length > 0 &&  <div className="subscribed">
                <h4>Events you subscribed to</h4>
                <ul>
                 {subscribed.map(element => 
                    
                    <li key={element.title}>
                        <p>{element.title}</p>
                        <p >{element.price}</p>
                        <img src={element.thumbnail_url} alt="" />
                    </li> ) }    
                </ul>    
            </div>}
            { created.length > 0 && <div className="created">
                <h4>Events you created</h4>  
                <ul>
                    {created.map(item => 
                        <li key={item.title}>{item.title}</li>
                    )}    
                </ul>  
            </div> }   
        </div>
    </section>
  )
}

export default User