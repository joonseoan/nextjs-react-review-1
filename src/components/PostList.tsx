import { json } from 'node:stream/consumers';
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
  const [posts, setPosts] = useState<{ text: string; author: string, id: string }[]>([]);

  async function handleAddPost(text: string, author: string) {
    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify({
          body: text,
          author,
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Unable to get response');
      }

      const { post = {} } = await response.json() ?? { post: {} } as { message: string, post: { body: string, author: string, id: string }};
      
      if (!Object.keys(post).length) {
        throw new Error('Should have key');
      }
      
      setPosts((prev) => [{ text: post.body , author: post.author, id: post.id }, ...prev]);

    } catch(err) {
      throw new Error(err instanceof Error ? err.message : 'Unable to get posts.');
    }

    // setPosts((prevPosts) => [{ text, author, id: new Date().getTime() }, ...prevPosts]);
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

  console.log('posts: ', posts)

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
      {!!posts.length &&
        <ul className={classes.posts}>
          {posts.map(({ text, author, id }) => <Post key={id} name={author} message={text} />)}
        </ul>
      }
      {posts.length === 0 && 
        <div style={{ textAlign: "center"}}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some posts!</p>
        </div>
      }
    </>
  ) 
}

export default PostList