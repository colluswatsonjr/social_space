import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UserPage = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Fetch user data based on username
        const fetchUser = async () => {
            const response = await fetch(`/find_user/${username}`);
            const data = await response.json();
            setUser(data);
        }
        fetchUser();
    }, [username]);

    console.log(user)
    return (
        <div>
            {user ? (
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.bio}</p>
                </div>
            ) : (
                <p>Loading user...</p>
            )}
        </div>
    );
}

export default UserPage;