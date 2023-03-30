import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import { TextField, Button, Typography, Grid } from '@mui/material';
import { ErrorContext } from "../context/ErrorContext";


const LoginForm = () => {
    const { showError } = useContext(ErrorContext)
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
                r.json().then((error) => showError(error))
            }
        })
    }

    return (
        <Grid item>
        <form onSubmit={handleLogin}>
            <Typography variant="h5">Login:</Typography>
                <Grid item>
                    <TextField label="Username" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                </Grid>
                <Grid item>
                    <TextField label="Password" name="password" type='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </Grid>
                <br/>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>
        </form>
        </Grid>
    );
}

export default LoginForm;