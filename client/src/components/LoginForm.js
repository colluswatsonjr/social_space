import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";


const LoginForm = () => {
    const { login } = useContext(UserContext);

    const [form, setForm] = useState({ username: '', password: '' })

    function handleLogin(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "applcation/json" },
            body: JSON.stringify(form)
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    console.log(user)
                    login(user)
                })
            } else {
                r.json().then((error) => console.log('Login error', error))
            }
        })
    }

    return (
        <div>
            <h2>User Login Form</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                />
                <br />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;