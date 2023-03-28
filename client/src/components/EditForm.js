import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router";
import { ErrorContext } from "../context/ErrorContext";


const EditForm = () => {
    const { showError } = useContext(ErrorContext)

    const { user, login, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: user.username, fname: user.fname, lname: user.lname, bio: user.bio, password: '', password_confirmation: '' })

    function handleRegister(e) {
        e.preventDefault()
        fetch("/edit_user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    login(user)
                    navigate(`/user/${user.username}`)
                })
            } else {
                r.json().then((error) => showError(error))
            }
        })
    }

    function handleDelete() {
        navigate(`/`)
        fetch(`/delete_user`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                logout();
            }
        });
    }
    return (
        <div>
            <h2>User Edit Form</h2>
            {user ?
                <form onSubmit={handleRegister}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <TextField label="Username" name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                        </Grid>
                        <Grid item>
                            <TextField label="First Name" name="first name" value={form.fname} onChange={(e) => setForm({ ...form, fname: e.target.value })} />
                        </Grid>
                        <Grid item>
                            <TextField label="Last Name" name="last name" value={form.lname} onChange={(e) => setForm({ ...form, lname: e.target.value })} />
                        </Grid>
                        <Grid item>
                            <TextField label="Bio" name="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
                        </Grid>
                        <Grid item>
                            <TextField label="Password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                        </Grid>
                        <Grid item>
                            <TextField label="Password Confirmation" name="password confirmation" value={form.password_confirmation} onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })} />
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Update</Button>
                        </Grid>
                    </Grid>
                    <br />
                    <button onClick={() => handleDelete()}>Delete Account</button>
                </form>
                : null}
        </div>
    );
}

export default EditForm;