import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext";

import { Grid, TextField, Button } from '@mui/material';

const CreatePost = ({ spaceId, addPost }) => {
    const { user, login } = useContext(UserContext);
    const [form, setForm] = useState({ text: '' })

    function handleComment(e) {
        e.preventDefault()

        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ space_id: spaceId, ...form })
        })
            .then(r => r.json())
            .then(post => {
                addPost(post)
                login({ ...user, posts: [...user.posts, post] })
            })
            .catch(err => console.log(err))

        setForm({ text: '' })
    }

    return (
        <form onSubmit={handleComment}>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TextField label="Username" name="username" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
                </Grid>
                <Grid item>
                    <Button type="submit" variant="contained" color="primary">Leave Comment</Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default CreatePost;