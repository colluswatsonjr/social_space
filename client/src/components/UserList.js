import { useNavigate } from "react-router-dom";

const UserList = ({ users }) => {
    let navigate = useNavigate()
    
    return (
        <ul className="user-card-list">
            {users.map((account, index) => (
                <div key={index} className="user-card" onClick={() => navigate(`/profile/${account.username}`)}>
                    <h2>{account.username}</h2>
                    <p>{account.fname} {account.lname}</p>
                    <p>{account.bio}</p>
                </div>
            ))}
        </ul>
    );
}

export default UserList;