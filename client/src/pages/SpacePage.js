import { useContext, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostsGrid from "../components/PostsGrid";

import { Grid, Button, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import SubscribeButton from "../components/SubscribeButton";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { ErrorContext } from "../context/ErrorContext";

const SpacePage = ({ space, handleRemovePost, handleAddPost, removeSub, addSub }) => {
    let navigate = useNavigate()
    const { my, login } = useContext(UserContext);
    const { showError } = useContext(ErrorContext); // Importing the showError function from ErrorContext.

    const [posts, setPosts] = useState(space.posts);

    function onRemovePost(postId) {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        const userPosts = my.posts.filter(post=> post.id !== postId)
        login({...my, posts: userPosts})
        handleRemovePost(postId, space.id, updatedPosts)
    }
    function onAddPost(post){
        setPosts([...posts, post])
        login({...my, posts: [...my.posts, post]})
        handleAddPost(space.id, [...posts, post] )
    }

    function handleSub(x) {
        addSub(x, space.id)
    }

    function handleUnsub(x) {
        removeSub(x, space.id)
    }

    if (space) {
        return (
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {space.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {space.bio}
                        </Typography>
                        <Typography variant="body2">{space.subscribes.length} subscribers</Typography>
                    </CardContent>
                    <CardActions>
                        <SubscribeButton spaceId={space.id} space={space} onSub={(x) => handleSub(x)} onUnsub={(x) => handleUnsub(x)} />
                    </CardActions>
                </Card>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CreatePost spaceId={space.id} addPost={(post)=>onAddPost(post)} />
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
                                <CardActions>
                                    {post.user.id === my.id ? <Button onClick={() => onRemovePost(post.id)}> Remove </Button> : null}
                                </CardActions>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        )
    }
}

export default SpacePage;