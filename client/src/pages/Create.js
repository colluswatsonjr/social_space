import { useContext, useState } from "react"
import { useNavigate } from "react-router"

import { TextField, Button, Box, Typography } from '@mui/material';
import { ErrorContext } from "../context/ErrorContext";


const Create = ({ setSpaces }) => {
    const { showError } = useContext(ErrorContext)
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
                    setSpaces(space)
                    navigate(`/space/${space.title}`)
                })
            } else {
                r.json().then((error) => showError(error))
            }
        })
    }
    return (
        <>
            <form onSubmit={handleCreate}>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6">Create Space:</Typography>
                    <TextField label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    <TextField label="Bio" name="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </form>
        </>

    );
}

export default Create;