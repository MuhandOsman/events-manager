import  {AiOutlineMail}  from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>

      <div className="footer-icons">
        <a  rel="noreferrer" href="https://linkedin.com/in/muhanadosman" target="_blank"  className="linked-in"><AiFillLinkedin /></a>
        <a href="mailto:mo1981ot@gmail.com" className="mail"><AiOutlineMail color="white" /></a>
        
        
      </div>
      <div className="copyright">Written with React by Event Team ©2022</div>
    </footer>
  );
}

export default Footer