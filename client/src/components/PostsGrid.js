import { useNavigate } from "react-router-dom";

import { Typography, Button, Grid, Card } from '@mui/material';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PostsGrid = ({ posts }) => {
  const { user } = useContext(UserContext);
  let navigate = useNavigate()
  function removePost(post) {
    console.log(post)
  }

  return (
    <Grid container spacing={2}>
      {posts.map(post => (
        <Grid item key={post.id} sx={{width:'50%', height:'50%'}} alignItems="center">
          <Card sx={{ }}>
            <Typography onClick={() => navigate(`/space/${post.space.title}`)}>{post.space.title}</Typography>
            <Typography onClick={() => navigate(`/user/${post.user.username}`)}>{post.user.username}</Typography>
            <Typography>{post.text}</Typography>
            {post.user.id == user.id ? <Button onClick={() => removePost(post)}> Remove </Button> : null}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PostsGrid;