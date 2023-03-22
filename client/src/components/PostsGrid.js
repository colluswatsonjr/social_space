import { useNavigate } from "react-router-dom";

const PostsGrid = ({ posts }) => {
  let navigate = useNavigate()
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p onClick={() => navigate(`/space/${post.space.title}`)}>Space: <strong>{post.space.title}</strong></p>
          <p onClick={() => navigate(`/user/${post.user.username}`)}>Username: <strong>{post.user.username}</strong></p>
          <p>Text: {post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsGrid;