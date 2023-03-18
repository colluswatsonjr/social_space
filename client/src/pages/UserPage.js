// import { createContext, useContext } from "react";
import FollowButton from "../components/FollowButton";
import UserFollowers from "../components/UserFollowers";
import PageNotFound from "./PageNotFound";


const UserPage = ({ account }) => {

    console.log(account)

    return (
        <div>
            {account ?
                <div className="user-card">
                    <h2>{account.username}</h2>
                    <h3>{account.fname} {account.lname}</h3>
                    <p>{account.bio}</p>
                    <UserFollowers followers={account.followers} followees={account.followees} />
                    <FollowButton accountId={account.id}/>
                </div>
                :
                <PageNotFound />
            }
        </div>
    );
}

export default UserPage;