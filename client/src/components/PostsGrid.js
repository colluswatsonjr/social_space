import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import { Typography, Button, Grid, Box, Card, CardActions, CardContent } from '@mui/material';
import { ErrorContext } from "../context/ErrorContext";


const PostsGrid = ({ posts, onEdit }) => {
const { showError } = useContext(ErrorContext)
  const { user, login } = useContext(UserContext);
  let navigate = useNavigate()

  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    setAllPosts(posts)
  }, [posts])

  function removePost(id) {
    fetch(`/posts/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const edit = posts.filter((post) => post.id !== id)
        setAllPosts(edit)
        const userPosts = user.posts.filter((post)=>post.id !== id)
        login({ ...user, posts: userPosts })
      }else{
                 r.json().then((error) => showError(error))
      }
    });
  }


  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {allPosts.map(post => (
          <Grid item xs={2} sm={4} md={4} key={post.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div" onClick={() => navigate(`/space/${post.space.title}`)}>{post.space.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" onClick={() => navigate(`/user/${post.user.username}`)}>{post.user.username}</Typography>
                <Typography variant="body2">{post.text}</Typography>
              </CardContent>
              <CardActions>
              {post.user.id === user.id ? <Button onClick={() => removePost(post.id)}> Remove </Button> : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PostsGrid;