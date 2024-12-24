import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './assets/FComponents/Register';
import Login from './assets/FComponents/Login';
import EditDetails from './assets/FComponents/EditDetails';
import Profile from './assets/FComponents/Profile';
import SystemAdmin from './assets/FComponents/SystemAdmin';
import { useState } from 'react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //login in case you admin user/regular user
  const handleLogin = (userName, password) => {
    if (userName === 'admin' && password === 'ad12343211ad') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsLoggedIn(true);
  };
// handle with logout
  const handleLogout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Management System</h1>
      <Router>
        <nav>
          <Link to="/EditDetails">EditDetails</Link> 
          <Link to="/Login">Login</Link>  
          {!isAdmin && isLoggedIn && <Link to="/Profile">Profile</Link>} {isAdmin && <Link to="/SystemAdmin">SystemAdmin</Link>}
          <Link to="/Register">Register</Link> 
      
        </nav>
        <Routes>
          <Route path="/EditDetails" element={<EditDetails />} />
          <Route path="/Login" element={<Login onLogin={handleLogin} />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
          {isAdmin && <Route path="/SystemAdmin" element={<SystemAdmin />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
