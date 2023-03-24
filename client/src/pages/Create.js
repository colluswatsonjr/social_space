import { useState } from "react"
import { useNavigate } from "react-router"

import { TextField, Button, Typography, Grid } from '@mui/material';


const Create = () => {
    const [form, setForm] = useState({ title: '', bio: '' })
    let navigate = useNavigate()

    function handleCreate(e) {
        e.preventDefault()
        fetch("/spaces", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then((r) => {
            if (r.ok) {
                r.json().then((space) => {
                    navigate(`/space/${space.title}`)
                })
            } else {
                r.json().then((error) => console.log('Create Space Error', error))
            }
        })
    }
    return (
        <form onSubmit={handleCreate}>
            <Typography variant="h6">Create Space:</Typography>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TextField label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </Grid>
                <Grid item>
                    <TextField label="Bio" name="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Create;