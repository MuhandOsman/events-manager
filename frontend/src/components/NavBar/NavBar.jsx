import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation"
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
        <Navigation className="navigation" />
        <MobileNavigation />
    </>
  )
}

export default NavBar