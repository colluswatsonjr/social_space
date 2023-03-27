

const UserFollowers = ({ followers, followees }) => {

    return (
        <div>
            <p><strong>{followers.length}</strong> followers</p>
            <p><strong>{followees.length}</strong> following</p>
        </div>
    );
}

export default UserFollowers;