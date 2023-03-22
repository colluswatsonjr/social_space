import { useEffect, useState } from "react";
import PostsGrid from "../components/PostsGrid";

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
        <div>
            <PostsGrid posts={posts} />
        </div>
    );
}

export default Home;