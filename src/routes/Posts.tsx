import { Outlet } from 'react-router-dom';
import PostList from '../components/PostList';

function Posts() {
  return (
    <>
      <main className="App">
        {/* Make NewPost to be on top of the PostList */}
        <Outlet />
        <PostList />
      </main>
    </>
  );
}

export default Posts;
