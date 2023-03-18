import { useEffect, useState } from "react"
import SpaceList from "../components/SpaceList"
import UserList from "../components/UserList"


const Home = () => {

    const [users, setUsers] = useState(null)
    const [spaces, setSpaces] = useState(null)

    useEffect(() => {
        fetch('/users')
            .then((r) => {
                if (r.ok) {
                    r.json().then((users) => setUsers(users))
                } else {
                    r.json().then((error) => console.log('Fetch users error', error))
                }
            })
        fetch('/spaces')
            .then((r) => {
                if (r.ok) {
                    r.json().then((spaces) => setSpaces(spaces))
                } else {
                    r.json().then((error) => console.log('Fetch spaces error', error))
                }
            })
    }, [])


    return (
        <div>
            Home
            {users ? <UserList users={users} /> : null}
            {spaces ? <SpaceList spaces={spaces} /> : null}
        </div>
    );
}

export default Home;