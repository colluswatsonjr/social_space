import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FollowButton from "../components/FollowButton";
import PostsGrid from "../components/PostsGrid";
import UserFollowers from "../components/UserFollowers";

import { Grid, Card, CardContent, CardActions, Typography } from '@mui/material';

const UserPage = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/find_user/${username}`);
            const data = await response.json();
            setUser(data);
        }
        fetchUser();
    }, [username]);

    function handleRemove(x) {
        const edit = user.followers.filter((user) => user.id !== x.id)
        setUser({ ...user, followers: edit })
    }

    function handleAdd(x) {
        setUser({ ...user, followers: [...user.followers, x] })
    }

    function handleEdit(x){
        console.log('handle', x)
    }

    return (
        <Grid item> 
            {user ? (
                <>
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
                            <UserFollowers followees={user.followees} followers={user.followers} />
                        </CardContent>
                        <CardActions>
                                <FollowButton accountId={user.id} onAdd={handleAdd} onRemove={handleRemove} />
                            </CardActions>
                    </Card>
                    <PostsGrid posts={user.posts} onEdit={handleEdit} />
                </>
            ) : (
                <p>Loading user...</p>
            )}
        </Grid>
    );
}

export default UserPage;