import classes from './NewPost.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

interface NewPostProps {
  onCancel: () => void;
  addPost: (text: string, author: string) => void;
}

function NewPost({ onCancel, addPost }: Readonly<NewPostProps>) {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  function setTextHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function setAuthorHandler(event: ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value);
  }

  function addPostFunc() {
    if (text.trim() === '' || author.trim() === '') {
      return;
    }
    addPost(text, author);
    setText('');
    setAuthor('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addPostFunc();
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea 
          id="body" 
          required 
          rows={3} 
          onChange={setTextHandler}
          value={text} 
        />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input 
          type="text" 
          id="name" 
          required 
          onChange={setAuthorHandler} 
          value={author}
        />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default NewPost;

