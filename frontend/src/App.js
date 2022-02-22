
import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Users from './components/Pages/Users';
import Events from './components/Pages/Events';
import Home from './components/Pages/Home';
import Footer from './components/Footer';
import Header from "./components/Header";

function App() {
  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="users" element={<Users />} />
        <Route path="events" element={<Events/>} />
      </Routes>
        <Footer />
    </Router>
  )
}

export default App;
