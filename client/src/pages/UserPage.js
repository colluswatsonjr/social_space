import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import PageNotFound from "./PageNotFound";


const UserPage = () => {
    const { user } = useContext(UserContext);
    const { username } = useParams();
    const [account, setAccount] = useState({})

    useEffect(() => {
        fetch(`find_user/${username}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((account) => setAccount(account))
                } else {
                    r.json().then((error) => console.log('Autologin error', error))
                }
            })
    }, [username])
    console.log(user)

    return (
        <div>
            {account ?
                <div className="user-card">
                    <h2>{account.username}</h2>
                    <h3>{account.fname} {account.lname}</h3>
                    <p>{account.bio}</p>
                    <div className="user-followers">
                        {/* <p><strong>{account.followers.length}</strong> followers</p> */}
                        {/* <p><strong>{account.followees.length}</strong> following</p> */}
                    </div>
                    {/* <button onClick={() => setEditing(true)}>Edit Account</button> */}
                </div>
                :
                <PageNotFound />
            }
        </div>
    );
}

export default UserPage;