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
        <Grid item>
            <TextField label="Leave a comment" name="username" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
            <Button onClick={(e)=>handleComment(e)} type="submit" variant="contained" color="primary">Leave Comment</Button>
        </Grid>
    );
}

export default CreatePost;