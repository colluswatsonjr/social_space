import React, { useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from './components/LoginForm';

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

  const login = (user) => {
    setUser(user)
  };

  const logout = () => {
    setUser(null)
  };

  console.log(user)

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="App">
          Hello World!<br />
          {user ? <>Logged in: {user.username}<br/><button onClick={logout}>Logout</button></> : `Logged out:`}
          <LoginForm />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
