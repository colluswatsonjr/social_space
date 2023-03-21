import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";



const HeadBar = () => {
    const { user, logout } = useContext(UserContext);

    let navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            logout(null)
            navigate('/')
          }
        });
      }
    return (
        <div className="header-bar">
            <div className="header-text">
                {user ? `Logged in as ${user.username}` : 'Not logged in'}
            </div>
            {user && (
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    );
}

export default HeadBar;