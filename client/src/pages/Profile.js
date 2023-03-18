import { useContext, useState } from "react";
import EditForm from "../components/EditForm";
import { UserContext } from "../context/UserContext";


const Profile = () => {
    const { user } = useContext(UserContext);
    const [editing, setEditing] = useState(false)

    return (
        <>
            <h2>User Profile Page</h2>
            {editing ?
                <>
                    <button onClick={() => setEditing(false)}>Back</button>
                    <EditForm />
                </>
                :
                <div className="user-card">
                    <h2>{user.username}</h2>
                    <h3>{user.fname} {user.lname}</h3>
                    <p>{user.bio}</p>
                    <div className="user-followers">
                        <p><strong>{user.followers.length}</strong> followers</p>
                        <p><strong>{user.followees.length}</strong> following</p>
                    </div>
                    <button onClick={() => setEditing(true)}>Edit Account</button>
                </div>
            }
        </>
    );
}

export default Profile;