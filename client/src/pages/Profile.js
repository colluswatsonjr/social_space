import { useContext, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import PostsGrid from "../components/PostsGrid";
import { UserContext } from "../context/UserContext";

import { Card, CardContent, CardActions, Button, Box, Typography, Grid } from '@mui/material';
import UserFollowers from "../components/UserFollowers";
import { useNavigate } from "react-router";

const Profile = ({removeUserPost}) => {
    let navigate = useNavigate()
    const { my, login } = useContext(UserContext);
    const [editing, setEditing] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setEditing(false)
        setPosts(my.posts)
    }, [my])

    function onRemovePost(postId, spaceId) {
        const edit = posts.filter((post) => post.id !== postId)
        setPosts(edit)
        login({...my, posts: edit})
        removeUserPost(postId, spaceId)
    }

    return (
        <Grid item>
            {editing ?
                <>
                    <button onClick={() => setEditing(false)}>Back</button>
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
                        <EditForm />
                    </Box>
                </>
                :
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {my.fname} {my.lname}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {my.username}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {my.bio}
                            </Typography>
                            <UserFollowers followees={my.followees} followers={my.followers} />
                        </CardContent>

                        <CardActions>
                            <Button onClick={() => setEditing(true)}>Edit Account</Button>
                        </CardActions>
                    </Card>
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {posts.map(post => (
                                <Grid item xs={2} sm={4} md={4} key={post.id}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography variant="h5" component="div" onClick={() => navigate(`/space/${post.space.title}`)}>{post.space.title}</Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary" onClick={() => navigate(`/user/${post.user.username}`)}>{post.user.username}</Typography>
                                            <Typography variant="body2">{post.text}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => onRemovePost(post.id, post.space.id)}> Remove </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            }
        </Grid>
    );
}

export default Profile;