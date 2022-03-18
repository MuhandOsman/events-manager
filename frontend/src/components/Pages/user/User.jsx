import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../../context/MyContext';
import "./user.css";

const User = () => {

    const store = useContext(MyContext);
    const {storedId,loading, setLoading} = store;

    const [user, setUser,] = useState("");

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
        
    } , [storedId])

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
            <div className="created">
                <h4>Events you created</h4>  
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>    
                </ul>  
            </div>    
        </div>
    </section>
  )
}

export default User