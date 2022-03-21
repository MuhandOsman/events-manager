import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../../context/MyContext';
import "./user.css";

const User = () => {

    const store = useContext(MyContext);
    const {storedId,loading, setLoading} = store;

    const [user, setUser] = useState("");
    const [created, setCreated] = useState([]);
    const [subscribed, setSubscribed] = useState([]);

    console.log(created);

    useEffect(()=>{
        const getUser = async() => {
            try {
                const response = await fetch(`/api/user/${storedId.userId}`)
            const userData = await response.json();
            setUser(userData);
            setLoading(false);

            const response2 = await fetch(`/api/eventbyuserid/${storedId.userId}`)
            const createdEvents = await response2.json();
            setCreated(createdEvents)


            } catch (error) {
                console.log(error);
            }
        }
        getUser()
        
    } , [storedId,setLoading])





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
            <div className="subscribed">
                <h4>Events you subscribed to</h4>
                <ul>
                 <li>1</li>
                 <li>2</li>
                 <li>3</li>
                 <li>4</li>    
                </ul>    
            </div>
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