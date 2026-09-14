import Post from './Post';
import classes from './PostList.module.css';
import { useState, ChangeEvent, useEffect } from 'react';
import { HttpError } from '../error/HttpError'

export interface PostListProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export interface PostObj {
  body: string;
  author: string;
  id: string;
}

function PostList() {
  const [posts, setPosts] = useState<{ text: string; author: string, id: string }[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    function toggleOpenCloseModal() {
      setIsFetching((pre) => !pre);
    }

    async function fetchPosts() {
      toggleOpenCloseModal();
      try {
        const response = await fetch(
          'http://localhost:8080/posts'
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch posts: ${response.status}` +
            `${response.statusText}`
          );
        }

        const data = await response.json() as { posts: PostObj[] };
        const posts = data.posts.map(({ id, body, author }) => ({ text: body, author, id }));
        setPosts(posts);
      } catch (error) {
        // Server response
        if (error instanceof HttpError) {
          console.error(
            `HTTP ${error.status}: ${error.message}`
          )

          if (error.status === 404) {
            setErrorMessage('Posts could not found');
          } else {
            setErrorMessage('Unable to load the posts');
          }
        // Server does not response
        } else if (error instanceof TypeError) {
          console.error('Network Error: ', error.message);
          setErrorMessage('Unable to connect to the server');
        // Any other error
        } else {
          // Error type
          console.error('Unexpected Error: ', error);
          setErrorMessage('Something went wrong. Please try again.')
        }
      } finally {
        toggleOpenCloseModal();
      }
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
        throw new Error(
          `
           Failed to upload the post
           ${response.status}: ${response.statusText}
          `
        );
      }

      const { post } = await response.json() as { message: string, post: PostObj };
      
      if (!Object.keys(post).length) {
        throw new Error('Should have key');
      }
      
      setPosts((prev) => [{ text: post.body , author: post.author, id: post.id }, ...prev]);

    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`HTTP Error: ${error.status}, ${error.message}`)

        if (error.status === 404) {
          console.error('Could not find the post upload.');
          setErrorMessage('Could not find the post upload');
        } else {
          console.error(error);
          setErrorMessage('Unexpected Server Error');
        }
      } else if (error instanceof TypeError) {
        console.error(error);
        setErrorMessage('Could not reach to the server');
      } else {
        console.log(error);
        setErrorMessage('Unexpected error occurred.');
      }
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