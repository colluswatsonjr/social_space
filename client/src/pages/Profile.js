import { useContext, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import PostsGrid from "../components/PostsGrid";
import { UserContext } from "../context/UserContext";

import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';



const Profile = () => {
    const { user } = useContext(UserContext);
    const [editing, setEditing] = useState(null)
    useEffect(()=>{
        setEditing(false)
    },[user])
    console.log(user)
    return (
        <Box>
            {editing ?
                <>
                    <button onClick={() => setEditing(false)}>Back</button>
                    <EditForm />
                </>
                :
                <div>
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
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => setEditing(true)}>Edit Account</Button>
                        </CardActions>
                    </Card>
                    <PostsGrid posts={user.posts} />
                </div>
            }
        </Box>
    );
}

export default Profile;