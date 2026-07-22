import React from 'react';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <Post name="Max" message="Hello, React!" />
      <Post name="Manuel" message="I love React!" />
      <Post name="Anna" message="React is awesome!" />
      <Post name="John" message="React is great!" />
    </div>
  );
}

export default App;
