import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";



const Navbar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to={`/user/${user.username}`}>Profile</Link>
        </nav>
    );
}

export default Navbar;