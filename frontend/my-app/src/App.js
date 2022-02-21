
import './App.css';
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import Users from './components/Users';
import Events from './components/Events';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router className="App">
    <Link activeClassName="active-link" to="/"></Link>
      <Link to="/home">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/events">Events</Link>
      <Link to="/footer">Footer</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="users" element={<Users />} />
        <Route path="events" element={<Events/>} />
        <Route path="footer" element={<Footer/>} />
      </Routes>

    </Router>
  );
}

export default App;
