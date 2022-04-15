import React, { useContext, useEffect, useState } from 'react'
import "./user.css";
import {Link} from "react-router-dom";
import { BsCloudUploadFill } from "react-icons/bs"
import { RiDeleteBinFill } from 'react-icons/ri';
import {FaHeartBroken} from 'react-icons/fa'
import { ImSpinner } from 'react-icons/im';
import axios from 'axios';

import MyContext from '../../../context/MyContext';
import UpdateModal from '../modals/UpdateModal';
import DeleteModal from "../modals/DeleteModal"


const UsersProfile = () => {

    const store = useContext(MyContext);
    const {loading, setLoading, openUpdate,openModal} = store;
    const storedId = JSON.parse(localStorage.getItem("user-id")) || "";

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
        const abortCont = new AbortController();

        const getUser = async() => {
            try {
                const response = await fetch(`/api/user/${storedId.userId}`,{signal:abortCont.signal})
            const userData = await response.json();
            setUser(userData);
            setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
        return () => abortCont.abort();
        
    } , [setLoading, storedId.userId])

    useEffect(()=> {
        const abortCont = new AbortController();

       const getCreated = async() => {
        const response2 = await fetch(`/api/eventbyuserid/${storedId.userId}`,{signal:abortCont.signal})
        const createdEvents = await response2.json();
        setCreated(createdEvents)
       }
       getCreated()
       return () => abortCont.abort();
    },[storedId.userId])

    useEffect(()=> {
        const abortCont = new AbortController();
        
        const getSubscribed = async() => {
            const response3 = await fetch(`/api/subscribeByuserid/${storedId.userId}`,{signal:abortCont.signal})
            const subscribedEvents = await response3.json();    
            setSubscribed(subscribedEvents)
        }
        getSubscribed()
        return () => abortCont.abort();
    },[storedId.userId])
      
   

    const unsubscribe = (element) => {
         /* const findEvent = subscribed.filter(item => item.id !== element.id)
        setSubscribed(findEvent) */
        try {
            axios.post(`/api/unsubscribe/${element.id}`)
            .then(response => console.log(response))
            .then(response => {
                const findEvent = subscribed.filter(item => item.id !== element.id)
                setSubscribed(findEvent)
            } )
        } catch (error) {
            console.log(error);
        }
    }


  return (
      <section >
      {!loading ?<div className="profile">
        <h3 className="title titles">Welcome, {user.firstName}</h3>
        <div className="avatar">
            <aside className="userImg">
                <img src={avatar ||user.avatar_url} alt="user" className="avatar-photo" />
                <label htmlFor="upload"><BsCloudUploadFill size="32"style={{color:"white", border:"2px grey solid", borderRadius:"20px"}} /><input type="file" name="upload" id="upload" onChange={ (e)=> { 
              const file = e.target.files[0]
              setPhoto(file)}} /></label>
                
            </aside>
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
                            <p >Price: {element.price}{!isNaN(element.price)  && <span> €</span>}</p>
                            <div className="unsubscribe" onClick={()=>unsubscribe(element)}>
                                <FaHeartBroken size="25" />
                                <span>unsubscribe</span>
                            </div>
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
                                <p >Price: {item.price}{!isNaN(item.price)  && <span> €</span>}</p>
                                <div className="user-buttons">
                                    <button
                                    className="custom-btn btn-7"
                                    onClick={() => {
                                    openUpdate(item);
                                    }}
                                    >
                                    <span>Update</span>
                                    </button>
                                    <RiDeleteBinFill
                                    title="Delete Event"
                                    className="delete-icon"
                                    size={32}
                                    style={{ fill: "red" }}
                                    onClick={() => {
                                    openModal(item.id);
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}    
                </div>  
            </div> }   
            <img src={avatar ||user.avatar_url} alt="user" className="avatar-photo-small" style={{ width:"70px" , height:"70px"}}/>
        </div>
        <UpdateModal />
        <DeleteModal /> </div> : <ImSpinner className="loading" size={80} style={{ fill: "red" }} /> }
    </section>
  )
}

export default UsersProfile