// Better.
// We can use CSS Modules to scope the class names locally. This way, we can avoid class name collisions and keep our styles organized. We can import the CSS module and use the imported classes object to access the class names. This is a better approach than using global CSS.
import classes from './Post.module.css';

// It works. But we can't directly use the class name in the JSX. We need to use the imported classes object to access the class name. This is because of CSS Modules. The class names are scoped locally by default. So, we need to use the imported classes object to access the class name.
// import './index.css';

const names = ['Max', 'Manuel'];

export interface PostProps {
  name: string;
  message: string;
}

function Post({ name, message }: PostProps) {
  // const name = names[Math.random() > 0.5 ? 0 : 1];

  return (
    <li className={classes.post}>
      <p className={classes.author}>{name}</p>
      <p className={classes.text}>{message}</p>
    </li>
  )
}

export default Post;