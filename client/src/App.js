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
  const [my, setMy] = useState({})
  const [users, setUsers] = useState([])
  const [spaces, setSpaces] = useState([])
  const [posts, setPosts] = useState([])

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
          r.json().then((user) => setMy(user))
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
    fetch('/posts')
      .then((r) => {
        if (r.ok) {
          r.json().then((posts) => setPosts(posts))
        } else {
          r.json().then((error) => showError(error))
        }
      })
  }, [])

  const login = (user) => {
    setMy(user)
  };

  const logout = () => {
    setMy(null)
  };

  function deletePost(postId){
    fetch(`/posts/${postId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => console.log(data))
      } else {
        r.json().then((error) => showError(error))
      }
    });
  }

  function handleRemovePost(postId, spaceId, newArr) {
    deletePost(postId)
    const updateSpaces = spaces.map((space) => {
      if (space.id === spaceId) {
        return ({ ...space, posts: newArr })
      } else {
        return space
      }
    })
    setSpaces(updateSpaces)
  }
  function handleAddPost(spaceId, newArr){
    const updateSpaces = spaces.map((space) => {
      if (space.id === spaceId) {
        return ({ ...space, posts: newArr })
      } else {
        return space
      }
    })
    setSpaces(updateSpaces)
  }

  function removeUserPost(postId, spaceId){
    deletePost(postId)
    console.log('here', spaceId)
    const updatedSpaces = spaces.map((space)=>{
      if(space.id === spaceId){
        const update = space.posts.filter((post)=>post.id !== postId)
        return({...space, posts:update})
      }else{
        return space
      }
    })
    setSpaces(updatedSpaces)
  }

  function addSub(sub, spaceId){
    const updatedSpaces = spaces.map((space)=>{
      if(space.id === spaceId){
        return ({...space, subscribes:[...space.subscribes, sub]})
      }else{
        return space
      }
    })
    setSpaces(updatedSpaces)
  }

  function removeSub(sub, spaceId){
    const updatedSpaces = spaces.map((space)=>{
      if(space.id === spaceId){
        const updatedSubs = space.subscribes.filter(x => x.id !== sub.id);
        return({...space, subscribes: updatedSubs})
      }else{
        return space
      }
    })
    setSpaces(updatedSpaces)
  }

  function updateUser(newUser, userId){
    const newUsers = users.map((x)=>{
      if(x.id === userId){
        return newUser
      }else{
        return x
      }
    })
    setUsers(newUsers)
  }

  return (
    <Container sx={{ textAlign: 'center' }}>
      <UserContext.Provider value={{ my, login, logout }}>
        <ErrorContext.Provider value={{ error, showError }}>
          {error ? <Alert severity="warning">{error.error}</Alert> : null}
          <Router>
            {my ?
              <>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/create' element={<Create setSpaces={(space) => setSpaces([...spaces, space])} />} />
                  <Route path={`user/${my.username}`} element={<Profile removeUserPost={(postId, spaceId)=>removeUserPost(postId, spaceId)} />} />
                  {users.map(user => (
                    <Route
                      key={user.id}
                      path={`/user/${user.username}`}
                      element={<UserPage user={user} updateUser={updateUser}/>}
                    />
                  ))}
                  {spaces.map(space => (
                    <Route
                      key={space.id}
                      path={`/space/${space.title}`}
                      element={<SpacePage 
                        space={space} 
                        handleRemovePost={(postId, spaceId, newArr) => handleRemovePost(postId, spaceId, newArr)}
                        handleAddPost={(spaceId, newArr)=>handleAddPost(spaceId, newArr)} 
                        addSub={addSub}
                        removeSub={removeSub}
                        />
                      }
                    />
                  ))}
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
