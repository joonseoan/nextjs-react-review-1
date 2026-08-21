import { json } from 'node:stream/consumers';
import Modal from './Modal';
import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';
import { useState, ChangeEvent, useEffect } from 'react';

export interface PostListProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export interface PostObj {
  body: string;
  author: string;
  id: string;
}

function PostList ({ isModalOpen, onCloseModal }: PostListProps) {
  const [posts, setPosts] = useState<{ text: string; author: string, id: string }[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching((pre) => !pre);
      const response = await fetch('http://localhost:8080/posts');
      
      if (!response.ok) {
        setIsFetching((pre) => !pre);
        throw new Error('Unable to get response');
      }

      const data = await response.json() as { posts: PostObj[] };
      const posts = data.posts.map(({ id, body, author }) => ({ text: body, author, id }));
      setPosts(posts);
      setIsFetching((pre) => !pre);
    }

    fetchPosts();
  }, []);

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

      const { post } = await response.json() as { message: string, post: PostObj };
      
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
      {!isFetching && !!posts.length &&
        <ul className={classes.posts}>
          {posts.map(({ text, author, id }) => <Post key={id} name={author} message={text} />)}
        </ul>
      }
      {!isFetching && posts.length === 0 && 
        <div style={{ textAlign: "center" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some posts!</p>
        </div>
      }
      {
        isFetching && <div style={{ textAlign: "center" }}><p>Loading...</p></div>
      }
    </>
  ) 
}

export default PostList