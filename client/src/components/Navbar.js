import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


const Navbar = () => {
    const { user, logout } = useContext(UserContext);

    let navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                logout(null)
                navigate('/')
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
                <Button color="inherit" component={Link} to={`/user/${user.username}`} sx={{ mr: 'auto' }}>PROFILE</Button>
                <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
