import React, { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter as Router } from "react-router-dom";

import './stylesheets/App.css'

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Profile from './pages/Profile';
import EditForm from './components/EditForm';
import LoginRegister from './pages/LoginRegister';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // autologin user
    fetch('/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
        } else {
          r.json().then((error) => console.log('Autologin error', error))
        }
      })
  }, [])

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    });
  }

  const login = (user) => {
    setUser(user)
  };

  const logout = () => {
    setUser(null)
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="App">
          {user ? <>Logged in: {user.username}<br /><button onClick={handleLogout}>Logout</button></> : `Logged out:`}
          {user ?
            <>
            </>
            :
            <>
            </>
          }
          <LoginRegister />
          <Profile />
          {/* <EditForm /> */}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
