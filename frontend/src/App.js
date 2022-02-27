
import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import MyProvider from "./context/MyProvider"

import Users from './components/Pages/Users';
import About from './components/Pages/About';
import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound'
import Footer from './components/Footer';
import Header from "./components/Header";

function App() {
  return (
    <MyProvider >
      <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/form" element={<Users />} />
        <Route path="/about" element={<About/>} />
        <Route path="/pageNotFound" element={<NotFound/>} />
      </Routes>
        <Footer />
    </Router>
    </MyProvider>
  )
}

export default App;
