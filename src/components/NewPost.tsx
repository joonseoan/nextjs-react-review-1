import classes from './NewPost.module.css';
import { ChangeEvent, useState } from 'react';

interface NewPostProps {
  setTextHandler: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  text?: string;
  setAuthorHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  author?: string;
}

function NewPost({
  setTextHandler,
  text,
  setAuthorHandler,
  author 
}: NewPostProps) {
  // const [text, setText] = useState<string>('');

  // function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   // console.log(event.target.value);
  //   setText(event.target.value);
  // }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={setTextHandler}
          // why it is not required? What is the difference between required and not required?
          // Even if your state changes later, the textarea will not automatically display the new state.

          // Example:

          // const [text, setText] = useState("");

          // function clear() {
          //     setText("");
          // }

          // Clicking clear() will not empty the textarea because React isn't controlling its value.
          value={text} 
        />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={setAuthorHandler} 
          value={author}
        />
      </p>
    </form>
  );
}

export default NewPost;