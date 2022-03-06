import React from 'react'
import  {AiFillGithub}  from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>

      <div className="footer-icons">
        <AiFillGithub />
        <AiOutlineInstagram />
      </div>
      <div className="copyright">Written with React by Event Team ©2022</div>
    </footer>
  );
}

export default Footer