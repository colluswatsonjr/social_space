import { useContext } from "react";
import { UserContext } from "../context/UserContext";


const Profile = () => {
    const { user } = useContext(UserContext);

    console.log(user)
    return (
        <>
            <h2>User Profile Page</h2>
            {user ?
                <div className="user-card">
                    <h2>{user.username}</h2>
                    <h3>{user.fname} {user.lname}</h3>
                    <p>{user.bio}</p>
                </div>
                :
                null
            }
        </>
    );
}

export default Profile;