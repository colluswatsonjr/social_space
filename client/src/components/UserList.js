

const UserList = ({ users }) => {
    console.log(users)
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index}>{user.username} - {user.fname} {user.lname}</li>
            ))}
        </ul>
    );
}

export default UserList;