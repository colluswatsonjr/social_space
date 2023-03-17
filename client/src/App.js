import React, { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './stylesheets/App.css'

import Profile from './pages/Profile';
import EditForm from './components/EditForm';
import LoginRegister from './pages/LoginRegister';
import PageNotFound from './pages/PageNotFound';

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
            <Routes>
              <Route path='/' element={<LoginRegister />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          }
          <Profile />
          {/* <EditForm /> */}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
