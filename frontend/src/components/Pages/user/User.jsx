import React from 'react'
import "./user.css";

const User = () => {
  return (
    <section>
        <h3 className="title">welcome $ \user\ </h3>
        <div className="avatar">
            <div className="userImg"></div>
            <div className="userInfo">
                <p>full name</p>
                <p>Email</p>    
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