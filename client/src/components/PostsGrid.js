import { useNavigate } from "react-router-dom";

import { Typography, Button, Grid, Card } from '@mui/material';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const PostsGrid = ({ posts, onEdit }) => {

  const { user, login } = useContext(UserContext);
  let navigate = useNavigate()

  const [allPosts, setAllPosts] = useState([])

  useEffect(()=>{
    setAllPosts(posts)
  },[posts])

  function removePost(id) {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const edit = posts.filter((post) => post.id !== id)
        setAllPosts(edit)
        onEdit(id)
        // setPosts(edit)
        // setAllPosts(edit)
        login({ ...user, posts: edit })
      }
    });
  }


  return (
    <Grid container spacing={2}>
      {allPosts.map(post => (
        <Grid item key={post.id} sx={{ width: '50%', height: '50%' }} alignItems="center">
          <Card>
            <Typography onClick={() => navigate(`/space/${post.space.title}`)}>{post.space.title}</Typography>
            <Typography onClick={() => navigate(`/user/${post.user.username}`)}>{post.user.username}</Typography>
            <Typography>{post.text}</Typography>
            {post.user.id === user.id ? <Button onClick={() => removePost(post.id)}> Remove </Button> : null}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PostsGrid;