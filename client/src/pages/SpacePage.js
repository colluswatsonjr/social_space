import { useEffect, useState } from "react";
import { useParams } from "react-router";

const SpacePage = () => {

    const { title } = useParams();
    const [space, setSpace] = useState(null)

    useEffect(() => {
        // Fetch user data based on username
        const fetchUser = async () => {
            const response = await fetch(`/find_space/${title}`);
            const data = await response.json();
            setSpace(data);
        }
        fetchUser();
    }, [title]);

    return (
        <div>
            {space ? (
                <div>
                    <h2>{space.title}</h2>
                    <p>{space.bio}</p>
                </div>
            ) : (
                <p>Loading space...</p>
            )}
        </div>
    );
}

export default SpacePage;