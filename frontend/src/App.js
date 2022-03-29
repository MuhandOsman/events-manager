
import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import MyProvider from "./context/MyProvider"
import UsersProfile from "./components/Pages/user/UsersProfile"
import Login from './components/Pages/login/Login';
import About from './components/Pages/about/About';
import Home from './components/Pages/home/Home';
import EventDetail from "./components/Pages/eventDetail/EventDetail"
import NewEvent from "./components/Pages/newEvent/NewEvent"
import NotFound from './components/Pages/NotFound'
import Footer from './components/Footer';
import Header from "./components/Header";

function App() {
  return (
    <MyProvider >
      <Router basename="/app" >
        <Header />
      <Routes  >
        <Route path="/" element={<Home/>} />
        <Route path="/event-detail" element={<EventDetail/>} />
        <Route path="/form" element={<Login />} />
        <Route path="/user" element={<UsersProfile />} />
        <Route path="/create-event" element={<NewEvent/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/pageNotFound" element={<NotFound/>} />
      </Routes>
        <Footer />
    </Router>
    </MyProvider>
  )
}

export default App;
