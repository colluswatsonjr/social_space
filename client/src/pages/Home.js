import SpaceList from "../components/SpaceList"
import UserList from "../components/UserList"


const Home = ({users, spaces}) => {


    return (
        <div>
            Home
            {users ? <UserList users={users} /> : null}
            {spaces ? <SpaceList spaces={spaces} /> : null}
        </div>
    );
}

export default Home;