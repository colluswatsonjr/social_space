import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";


const RegisterForm = () => {

    const { login } = useContext(UserContext);

    const [form, setForm] = useState({ username: '', fname: '', lname: '', password: '', password_confirmation: '' })

    function handleRegister(e) {
        e.preventDefault()
        console.log(form)
        fetch("/register", {
            method: "POST",
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

    return (
        <div>
            <h2>User Registration Form</h2>
            <form onSubmit={handleRegister}>
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
                <label htmlFor="fname">First Name:</label>
                <input
                    type="text"
                    id="fname"
                    value={form.fname}
                    onChange={(e) => setForm({ ...form, fname: e.target.value })}
                    required
                />
                <br />
                <br />
                <label htmlFor="lname">Last Name:</label>
                <input
                    type="text"
                    id="lname"
                    value={form.lname}
                    onChange={(e) => setForm({ ...form, lname: e.target.value })}
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
                <label htmlFor="password_confirmation">Password Confirmation:</label>
                <input
                    type="password"
                    id="password_confirmation"
                    value={form.password_confirmation}
                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    required
                />
                <br />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;