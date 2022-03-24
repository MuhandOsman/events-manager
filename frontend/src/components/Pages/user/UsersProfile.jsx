import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../../context/MyContext';
import "./user.css";
import {Link} from "react-router-dom";
import { BsCloudUploadFill } from "react-icons/bs"
import axios from 'axios';

const UsersProfile = () => {

    const store = useContext(MyContext);
    const {storedId,loading, setLoading} = store;

    const [photo,setPhoto ] = useState({})
    const [avatar,setAvatar ] = useState("")
    const [user, setUser] = useState({});
    const [created, setCreated] = useState([]);
    const [subscribed, setSubscribed] = useState([]);

    useEffect(()=> {
        const data = new FormData();
        data.append("upload", photo);
        try {
            if (photo.name){axios.post("/api/userPhoto", data , {
                headers: { "Content-Type": "multipart/form-data"}
              })
              .then(resp => {
                setAvatar(resp.data.avatar_url)})}
        } catch (error) {
            console.log(error);
        }
       
    }, [photo])

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
        <h3 className="title titles">welcome {user.firstName}</h3>
        <div className="avatar">
            <div className="userImg">
                <img src={avatar ||user.avatar_url} alt="user-img" className="avatar-photo" />
                <label htmlFor="upload-img"><BsCloudUploadFill size="32"style={{color:"white", border:"2px grey solid", borderRadius:"20px"}} /><input type="file" name="upload" id="upload-img" onChange={ (e)=> { 
              const file = e.target.files[0]
              setPhoto(file)}} /></label>
                
            </div>
            <div className="userInfo">
                <p>{`${user.firstName} ${user.lastName}`}</p>
                <p>{user.email}</p>    
            </div>    
        </div>
        <div className="eventContainer">
            {subscribed.length > 0 &&  <div className="subscribed">
                <h4 className="titles">Events you subscribed to</h4>
                <div>
                 {subscribed.map(element => 
                    
                    <div key={element.title} className="sub-container" >
                        
                        <Link to="/event-detail" state={element}>
                                <div className="img-sub" style={{backgroundImage:`url(${element.thumbnail_url})`}}></div>
                            </Link>
                        <div className="sub-data">
                            <p >{element.title}</p>
                            <p >Price: {element.price}</p>
                        </div>
                        
                    </div> ) }    
                </div>    
            </div>}
            { created.length > 0 && <div className="created">
                <h4 className="titles">Events you created</h4>  
                <div>
                    {created.map(item => 
                        <div key={item.title} className="sub-container">
                            <Link to="/event-detail" state={item}>
                                <div className="img-sub" style={{backgroundImage:`url(${item.thumbnail_url})`}}></div>
                            </Link>
                            
                            <div className="sub-data">
                            <p >{item.title}</p>
                            <p >Price: {item.price}</p>
                        </div>
                        </div>
                    )}    
                </div>  
            </div> }   
        </div>
    </section>
  )
}

export default UsersProfile