// import { createContext, useContext } from "react";
import { useState } from "react";
import FollowButton from "../components/FollowButton";
import PostsGrid from "../components/PostsGrid";
import UserFollowers from "../components/UserFollowers";
import PageNotFound from "./PageNotFound";


const UserPage = ({ account }) => {

    const [info, setInfo] = useState(account)
    console.log(info)
    return (
        <div>
            {account ?
                <div>
                    <div className="user-card">
                        <h2>{account.username}</h2>
                        <h3>{account.fname} {account.lname}</h3>
                        <p>{account.bio}</p>
                        <UserFollowers followers={account.followers} followees={account.followees} />
                        <FollowButton accountId={account.id} />
                    </div>
                    <PostsGrid posts={account.posts} />
                </div>

                :
                <PageNotFound />
            }
        </div>
    );
}

export default UserPage;