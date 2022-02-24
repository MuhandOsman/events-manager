import {NavLink} from "react-router-dom"

const LinksList = () => {
  return (
    <ul>
     <NavLink to="/" ><li>HOME</li> </NavLink> 
      <NavLink to="/about"><li >ABOUT</li> </NavLink>
      <NavLink to="/form"><li >LOGIN/REGISTER</li> </NavLink>
      <NavLink to="/pageNotFound"><li >SOMETHING ELSE</li> </NavLink>
  
    </ul>
  )
}

export default LinksList