import React from "react";
import { useState } from "react";
import {NavLink} from "react-router-dom"
import About from "./About";

function Login() {
  // const isLoggedIn =false
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div>
      <h4> Enter your details .. </h4>
      <button onClick={() => setisLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "log out" : "log in"}
      </button>

      {isLoggedIn ? (
        <NavLink to={("/about")}>{About}</NavLink>
      ) : (
        <div>
          <h1>You Please Need To Log In.........</h1>

          <form>
            <label>
              Email:
              <input type="text" name="name" />
            </label>
            <label>
              Password:
              <input type="text" password="Password" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button color="#841584"> Loging</button>
        </div>
      )}
    </div>
  );
}

export default Login;
