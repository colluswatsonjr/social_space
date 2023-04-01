
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { ErrorContext } from '../context/ErrorContext';

import { Box, Button, Grid, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const Home = () => {
  const { showError } = useContext(ErrorContext)
  const { user } = useContext(UserContext);
  let navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [showFollowedPosts, setShowFollowedPosts] = useState(false);

  // const filteredPosts = showFollowedPosts ? posts.filter((post) => followedUsers.includes(post.author)) : posts;

  useEffect(() => {
    fetch('/posts')
      .then((r) => {
        if (r.ok) {
          r.json().then((posts) => setPosts(posts))
        } else {
          r.json().then((error) => showError(error))
        }
      })
  }, [user])

  return (
    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button onClick={() => setShowFollowedPosts(!showFollowedPosts)}>
        {/* {showFollowedPosts ? "Show all posts" : "Show following posts"} */}
      </Button>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts.map(post => (
          <Grid item xs={2} sm={4} md={4} key={post.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div" onClick={() => navigate(`/space/${post.space.title}`)}>{post.space.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" onClick={() => navigate(`/user/${post.user.username}`)}>{post.user.username}</Typography>
                <Typography variant="body2">{post.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;