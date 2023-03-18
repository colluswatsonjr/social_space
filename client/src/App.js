import React, { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './stylesheets/App.css'

import Profile from './pages/Profile';
import LoginRegister from './pages/LoginRegister';
import PageNotFound from './pages/PageNotFound';
import UserPage from './pages/UserPage';
import Navbar from './components/Navbar';
import Home from './pages/Home';

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
          <div className="header-bar">
            <div className="header-text">
              {user ? `Logged in as ${user.username}` : 'Not logged in'}
            </div>
            {user && (
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>

          {user ?
            <>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='profile' element={null}>
                  <Route path={user.username} element={<Profile />} />
                  <Route path=':username' element={<UserPage />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </>
            :
            <Routes>
              <Route path='/' element={<LoginRegister />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          }
          {/* <EditForm /> */}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
