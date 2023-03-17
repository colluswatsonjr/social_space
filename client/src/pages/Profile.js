import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";


const Profile = () => {
    const { user } = useContext(UserContext);
    const [account, setAccount] = useState({
        username: 'default',
        fname: 'default',
        lname: 'account',
        bio: 'living my best life'
    })
    useEffect(() => {
        setAccount(user)
    }, [user])
    console.log(user)
    return (
        <>
            <h2>User Registration Form</h2>
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