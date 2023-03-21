import { useNavigate } from "react-router-dom";

const PostsGrid = ({ posts }) => {
  let navigate = useNavigate()

  return (
    <div className="post-grid">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <p onClick={() => navigate(`/space/${post.space.title}`)}>Space: <strong>{post.space.title}</strong></p>
          <p onClick={() => navigate(`/profile/${post.user.username}`)}>Username: <strong>{post.user.username}</strong></p>
          <p>Text: {post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsGrid;