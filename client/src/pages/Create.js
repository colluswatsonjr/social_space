import { useState } from "react"
import { useNavigate } from "react-router"


const Create = () => {
    const [form, setForm] = useState({ title: '', bio: '' })
    let navigate = useNavigate()

    function handleCreate(e) {
        e.preventDefault()
        fetch("/spaces", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then((r) => {
            if (r.ok) {
                r.json().then((space) => {
                    navigate(`/space/${space.title}`)
                })
            } else {
                r.json().then((error) => console.log('Create Space Error', error))
            }
        })
    }
        return (
        <form onSubmit={handleCreate}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
            />
            <br />
            <br />
            <label htmlFor="bio">Bio:</label>
            <input
                type="text"
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                required
            />
            <br />
            <br />
            <button type="submit">Create</button>
        </form>
    );
}

export default Create;