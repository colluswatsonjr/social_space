import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";



const EditForm = () => {
    const { user, login, logout } = useContext(UserContext);
    const [form, setForm] = useState({ username: user.username, fname: user.fname, lname: user.lname, password: '', password_confirmation: '' })

    function handleRegister(e) {
        e.preventDefault()
        fetch("/edit_user", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    login(user)
                })
            } else {
                r.json().then((error) => console.log('Register error', error))
            }
        })
    }

    function handleDelete() {
        fetch(`/delete_user`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                logout();
            }
        });
    }
    return (
        <div>
            <h2>User Edit Form</h2>
            {user ?
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder={user.username}
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <br />
                    <br />
                    <label htmlFor="fname">First Name:</label>
                    <input
                        type="text"
                        id="fname"
                        placeholder={user.fname}
                        value={form.fname}
                        onChange={(e) => setForm({ ...form, fname: e.target.value })}
                    />
                    <br />
                    <br />
                    <label htmlFor="lname">Last Name:</label>
                    <input
                        type="text"
                        id="lname"
                        placeholder={user.lname}
                        value={form.lname}
                        onChange={(e) => setForm({ ...form, lname: e.target.value })}
                    />
                    <br />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <br />
                    <br />
                    <label htmlFor="password_confirmation">Password Confirmation:</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={form.password_confirmation}
                        onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    />
                    <br />
                    <br />
                    <button type="submit">Update</button>
                    <button onClick={handleDelete}>Delete Account</button>
                </form>
                : null}
        </div>
    );
}

export default EditForm;