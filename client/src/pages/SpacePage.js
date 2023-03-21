import PostsGrid from "../components/PostsGrid";



const SpacePage = ({space}) => {
    console.log(space.posts[0])
    return ( 
        <div>
            <h4>{space.title}</h4>
            <PostsGrid posts={space.posts}/>
            </div>
        
     );
}
 
export default SpacePage;