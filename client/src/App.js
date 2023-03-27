import React, { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { ErrorContext } from './context/ErrorContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Alert, Container } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Profile from './pages/Profile';
import UserPage from './pages/UserPage';
import SpacePage from './pages/SpacePage';
import LoginRegister from './pages/LoginRegister';
import PageNotFound from './pages/PageNotFound';


function App() {
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [spaces, setSpaces] = useState(null)

  const showError = (error) => {
    setError(error)
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      showError(null);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  useEffect(() => {
    fetch('/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user))
        } else {
          r.json().then((error) => showError(error))
        }
      })
    fetch('/spaces')
      .then((r) => {
        if (r.ok) {
          r.json().then((spaces) => setSpaces(spaces))
        } else {
          r.json().then((error) => showError(error))
        }
      })
    fetch('/users')
      .then((r) => {
        if (r.ok) {
          r.json().then((users) => setUsers(users))
        } else {
          r.json().then((error) => showError(error))
        }
      })
  }, [])

  const login = (user) => {
    setUser(user)
  };

  const logout = () => {
    setUser(null)
  };



  console.log('error',error)

  return (
    <Container sx={{ textAlign: 'center' }}>
      <UserContext.Provider value={{ user, login, logout }}>
        <ErrorContext.Provider value={{ error, showError }}>
          {error?<Alert severity="warning">{error.error}</Alert>:null}
          <Router>
            {user ?
              <>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Home spaces={spaces} users={users} />} />
                  <Route path='/create' element={<Create setSpace={(space) => setSpaces([...spaces, space])} />} />
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
        </ErrorContext.Provider>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
