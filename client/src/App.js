import React, { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Grid, Container} from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';
import SpacePage from './pages/SpacePage';
import LoginRegister from './pages/LoginRegister';
import PageNotFound from './pages/PageNotFound';


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
        } else {
          r.json().then((error) => console.log('Autologin error', error))
        }
      })
  }, [])

  const login = (user) => {
    setUser(user)
  };

  const logout = () => {
    setUser(null)
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
          {user ?
            <>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<Create />} />
                <Route path={`user/${user.username}`} element={<Profile />} />
                <Route path={`user/:username`} element={<UserPage />} />
                <Route path={`space/:title`} element={<SpacePage />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </>
            :
            <Routes>
              <Route path='/' element={<LoginRegister />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          }
      </Router>
    </UserContext.Provider>
    </Container>

  );
}

export default App;
