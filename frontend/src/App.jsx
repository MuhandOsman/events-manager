
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from "./components/Header";
import About from './components/Pages/about/About';
import EventDetail from "./components/Pages/eventDetail/EventDetail";
import Home from './components/Pages/home/Home';
import Login from './components/Pages/login/Login';
import NewEvent from "./components/Pages/newEvent/NewEvent";
import NotFound from './components/Pages/NotFound';
import UsersProfile from "./components/Pages/user/UsersProfile";
import MyProvider from "./context/MyProvider";

function App() {
  return (
    <MyProvider >
      <Router basename="/app">
        <Header />
      <Routes  >
        <Route path="/" element={<Home/>} />
        <Route path="/event-detail" element={<EventDetail/>} />
        <Route path="/form" element={<Login />} />
        <Route path="/user" element={<UsersProfile />} />
        <Route path="/create-event" element={<NewEvent/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
        <Footer />
    </Router>
    </MyProvider>
  )
}

export default App;
