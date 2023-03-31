import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ErrorContext } from "../context/ErrorContext";


const Navbar = () => {
    const { showError } = useContext(ErrorContext)
    const { my, logout } = useContext(UserContext);

    let navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                logout(null)
                navigate('/')
            }else{
                 r.json().then((error) => showError(error))
            }
        });
    }

    return (
        <AppBar position="static" sx={{ flexGrow: 1 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    Social Space
                </IconButton>
                <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>HOME</Button>
                <Button color="inherit" component={Link} to="/create" sx={{ mr: 2 }}>CREATE</Button>
                <Button color="inherit" component={Link} to={`/user/${my.username}`} sx={{ mr: 'auto' }}>PROFILE</Button>
                <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
