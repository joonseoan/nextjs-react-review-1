const names = ['Max', 'Manuel'];

export interface PostProps {
  name: string;
  message: string;
}

function Post({ name, message }: PostProps) {
  // const name = names[Math.random() > 0.5 ? 0 : 1];

  return (
    <div>
      <p>{name}</p>
      <p>{message}</p>
    </div>
  )
}

export default Post;