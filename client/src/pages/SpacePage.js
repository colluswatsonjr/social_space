import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CreatePost from "../components/CreatePost";
import PostsGrid from "../components/PostsGrid";

import { Box} from '@mui/material';


const SpacePage = () => {

    const { title } = useParams();
    const [space, setSpace] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        // Fetch user data based on username
        const fetchUser = async () => {
            const response = await fetch(`/find_space/${title}`);
            const data = await response.json();
            setSpace(data);
            setPosts(data.posts)
        }
        fetchUser();
    }, [title]);

    function addPost(post) {
        setPosts([...posts, post])
    }

    return (
        <Box>
            {space ? (
                <div>
                    <h2>{space.title}</h2>
                    <p>{space.bio}</p>
                    <CreatePost spaceId={space.id} addPost={addPost} />
                    <PostsGrid posts={posts} />
                </div>
            ) : (
                <p>Loading space...</p>
            )}
        </Box>
    );
}

export default SpacePage;