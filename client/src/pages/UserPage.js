import { useContext, useState } from "react";
import FollowButton from "../components/FollowButton";
import PostsGrid from "../components/PostsGrid";
import UserFollowers from "../components/UserFollowers";

import { Box, Button, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";

const UserPage = ({ user, updateUser }) => {

    let navigate = useNavigate()

    const { my, login } = useContext(UserContext);

    const [posts, setPosts] = useState(user.posts);
    const [followers, setFollowers] = useState(user.followers)
    const [following, setFollowing] = useState(user.followees)

    function handleRemove(y) {
        const updatedFollowers = followers.filter((follow) => follow.id !== y.id)
        setFollowers(updatedFollowers)
        updateUser({...user, followers: updatedFollowers}, user.id)
    }

    function handleAdd(x) {
        setFollowers([...user.followers, x])
        updateUser({...user, followers:[...followers, x]}, user.id)
    }

    if (user) {
        return (
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            {user.fname} {user.lname}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {user.username}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {user.bio}
                        </Typography>
                        {followers && following ? <p><strong>{followers.length}</strong> followers<br /><strong>{following.length}</strong> following</p> : null}
                    </CardContent>
                    <CardActions>
                        <FollowButton accountId={user.id} onAdd={handleAdd} onRemove={handleRemove} />
                    </CardActions>
                </Card>
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {user.posts.map(post => (
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
            </Box>
        )
    }
}

export default UserPage;