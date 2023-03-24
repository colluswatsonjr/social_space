import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FollowButton from "../components/FollowButton";
import PostsGrid from "../components/PostsGrid";
import UserFollowers from "../components/UserFollowers";

import { Box} from '@mui/material';


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
        console.log(x)
        console.log(user)
        const edit = user.followers.filter((user) => user.id !== x.id)
        setUser({ ...user, followers: edit })
    }

    function handleAdd(x) {
        console.log(x)
        console.log(user)
        setUser({ ...user, followers: [...user.followers, x] })
    }
    
    return (
        <Box>
            {user ? (
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.bio}</p>
                    <UserFollowers followees={user.followees} followers={user.followers} />
                    <FollowButton accountId={user.id} onAdd={handleAdd} onRemove={handleRemove} />
                    <PostsGrid posts={user.posts} />
                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </Box>
    );
}

export default UserPage;