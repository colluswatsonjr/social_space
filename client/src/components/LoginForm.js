import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import { TextField, Button, Typography, Grid } from '@mui/material';


const LoginForm = () => {
    const { login } = useContext(UserContext);

    const [form, setForm] = useState({ username: '', password: '' })

    function handleLogin(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    login(user)
                })
            } else {
                r.json().then((error) => console.log('Login error', error))
            }
        })
    }

    return (
        <form onSubmit={handleLogin}>
            <Typography variant="h5">Login:</Typography>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TextField label="Username" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                </Grid>
                <Grid item>
                    <TextField label="Password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default LoginForm;