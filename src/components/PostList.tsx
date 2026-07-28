import NewPost from './NewPost';
import Post from './Post';
import classes from './PostList.module.css';
import { useState, ChangeEvent } from 'react';

function PostList () {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  function setTextHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function setAuthorHandler(event: ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  return (
    <>
      <NewPost
        setTextHandler={setTextHandler}
        text={text}
        setAuthorHandler={setAuthorHandler}
        author={author} 
      />
      <ul className={classes.posts}>
        <Post name={author} message={text} />
        <Post name="Manuel" message="I love React!" />
        <Post name="Anna" message="React is awesome!" />
        <Post name="John" message="React is great!" />
      </ul>
    </>
  ) 
}

export default PostList