

const SpaceList = ({ spaces }) => {
    console.log(spaces)
    return (
        <ul>
            {spaces.map((space, index) => (
                <li key={index}>{space.title} - {space.bio}</li>
            ))}
        </ul>
    );
}

export default SpaceList;