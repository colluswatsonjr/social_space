import { useEffect, useState } from "react";
import PostsGrid from "../components/PostsGrid";

import {Box} from '@mui/material';

const Home = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('/posts')
            .then((r) => {
                if (r.ok) {
                    r.json().then((posts) => setPosts(posts))
                } else {
                    r.json().then((error) => console.log('Fetch Posts', error))
                }
            })
    }, [])

    return (
        <Box sx={{textAlign:'center'}}>
            <PostsGrid posts={posts} />
        </Box>
    );
}

export default Home;