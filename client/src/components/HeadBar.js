import { useContext } from "react";
import { useNavigate } from "react-router";
import { ErrorContext } from "../context/ErrorContext";
import { UserContext } from "../context/UserContext";

const HeadBar = () => {
    const { showError } = useContext(ErrorContext)
    const { user, logout } = useContext(UserContext);

    let navigate = useNavigate()

    function handleLogout() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            logout(null)
            navigate('/')
          }else{
            r.json().then((error) => showError( error))
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