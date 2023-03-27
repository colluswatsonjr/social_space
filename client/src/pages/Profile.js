import { useContext, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import PostsGrid from "../components/PostsGrid";
import { UserContext } from "../context/UserContext";

import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import UserFollowers from "../components/UserFollowers";

const Profile = () => {

    const { user } = useContext(UserContext);
    const [editing, setEditing] = useState(null)

    useEffect(() => {
        setEditing(false)
    }, [user])

    return (
        <Grid item>
            {editing ?
                <>
                    <button onClick={() => setEditing(false)}>Back</button>
                    <EditForm />
                </>
                :
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
                            <Button onClick={() => setEditing(true)}>Edit Account</Button>
                        </CardActions>
                    </Card>
                    <PostsGrid posts={user.posts} />
                </>
            }
        </Grid>
    );
}

export default Profile;