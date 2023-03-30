import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import { TextField, Button, Typography, Grid } from '@mui/material';
import { ErrorContext } from "../context/ErrorContext";


const RegisterForm = () => {
    const { showError } = useContext(ErrorContext)
    const { login } = useContext(UserContext);
    const [form, setForm] = useState({ username: '', fname: '', lname: '', password: '', password_confirmation: '' })

    function handleRegister(e) {
        e.preventDefault()
        console.log(form)
        fetch("/register", {
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

        <form onSubmit={handleRegister}>
            <Typography variant="h5">Register:</Typography>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TextField label="Username" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
                </Grid>
                <Grid item>
                    <TextField label="First Name" name="first name" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} />
                </Grid>
                <Grid item>
                    <TextField label="Last Name" name="last name" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} />
                </Grid>
                <Grid item>
                    <TextField label="Password" name="password" type='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </Grid>
                <Grid item>
                    <TextField label="Password Confirmation" type='password' name="password confirmation" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} required />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default RegisterForm;