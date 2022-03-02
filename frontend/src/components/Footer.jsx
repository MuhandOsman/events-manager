import React from 'react'
import  {AiFillGithub}  from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="copyright">Made by @The Events Team 21.02.22</div>

      <div className="footer-icons">
        <AiFillGithub />
        <AiOutlineInstagram />
      </div>
    </footer>
  );
}

export default Footer