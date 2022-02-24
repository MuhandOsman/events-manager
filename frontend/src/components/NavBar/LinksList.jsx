import {NavLink} from "react-router-dom";

const LinksList = () => {
  return (
    <ul>
      <NavLink to="/" ><li>HOME</li></NavLink> 
      <NavLink to="/about"><li>ABOUT US</li></NavLink>
      <NavLink to="/form"><li>LOGIN/REGISTER</li></NavLink>
      {/* <NavLink to="/contacts" ><li>CONTACT US</li></NavLink> */}
      <NavLink to="/pageNotFound"><li>SOMTHING ELSE</li></NavLink>
      </ul>
  )
}

export default LinksList