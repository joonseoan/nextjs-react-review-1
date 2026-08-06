import Modal from './Modal';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';
import { useState, ChangeEvent } from 'react';

export interface PostListProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

function PostList ({ isModalOpen, onCloseModal }: PostListProps) {
  const [posts, setPosts] = useState<{ text: string; author: string, id: number }[]>([]);

  function handleAddPost(text: string, author: string) {
    setPosts((prevPosts) => [{ text, author, id: new Date().getTime() }, ...prevPosts]);
  }
  // const [text, setText] = useState<string>('');
  // const [author, setAuthor] = useState<string>('');

  // function setTextHandler(event: ChangeEvent<HTMLTextAreaElement>) {
  //   setText(event.target.value);
  // }

  // function setAuthorHandler(event: ChangeEvent<HTMLInputElement>) {
  //   setAuthor(event.target.value);
  // }

  // function addPosts() {
  //   if (text.trim() === '' || author.trim() === '') {
  //     return; // Don't add empty posts
  //   }


  //   setPosts((prevPosts) => [...prevPosts, { text, author, id: new Date().getTime() }]);
  //   setText(''); // Clear the text after adding
  //   setAuthor(''); // Clear the author after adding
  // }

  return (
    <>
      {isModalOpen && (
        <Modal onClose={onCloseModal}>
          <NewPost
            // setTextHandler={setTextHandler}
            // text={text}
            // setAuthorHandler={setAuthorHandler}
            // author={author}
            onCancel={onCloseModal}
            addPost={handleAddPost}
            // addPosts={addPosts} 
          />
        </Modal>
      )}
      <ul className={classes.posts}>
        {posts.map(({ text, author, id }) => <Post key={id} name={author} message={text} />)}
        {/* Example posts */}
        {/* <Post name={author} message={text} />
        <Post name="Manuel" message="I love React!" />
        <Post name="Anna" message="React is awesome!" />
        <Post name="John" message="React is great!" /> */}
      </ul>
    </>
  ) 
}

export default PostList