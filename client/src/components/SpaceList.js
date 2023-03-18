

const SpaceList = ({ spaces }) => {
    console.log(spaces)
    return (
        <ul className="space-card-list">
            {spaces.map((space, index) => (
                <div key={index} className="space-card">
                    <h2>{space.title}</h2>
                    <p>{space.bio}</p>
                </div>
            ))}
        </ul>
    );
}

export default SpaceList;