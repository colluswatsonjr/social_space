import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CreatePost from "../components/CreatePost";
import PostsGrid from "../components/PostsGrid";

import { Grid, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import SubscribeButton from "../components/SubscribeButton";

const SpacePage = ({spaces}) => {

    const { title } = useParams();
    const [space, setSpace] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // Fetch user data based on username
        // const fetchUser = async () => {
        //     const response = await fetch(`/find_space/${title}`);
        //     const data = await response.json();
        //     setSpace(data);
        //     setPosts(data.posts)
        // }
        // fetchUser();
        const find = spaces.filter((space)=>space.title === title)
        setSpace(find[0])
        setPosts(find[0].posts)
    }, [title, spaces]);


    function addPost(x) {
        // setSpace({ ...space, posts: [...space.posts, x] })
        setPosts([...posts,x])
    }

    function handleEditPosts(x) {
        const edit = posts.filter((post) => post.id !== x)
        setPosts(edit)
    }

    function handleSub(x) {
        setSpace({ ...space, subscribes: [...space.subscribes, x] })
    }

    function handleUnsub(x) {
        const edit = space.subscribes.filter((space) => space.id !== x.id)
        setSpace({ ...space, subscribes: edit })
    }

    return (
        <Grid item>
            {space ? (
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
                        <CreatePost spaceId={space.id} addPost={addPost} />
                        <PostsGrid posts={posts} editPosts={handleEditPosts}/>
                </Box>

            ) : (
                <Typography>Loading space...</Typography>
            )}
        </Grid>
    );
}

export default SpacePage;