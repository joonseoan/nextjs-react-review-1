import { useState } from 'react';
import PostList from './components/PostList';
import MainHeader from './components/MainHeader';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function setIsModalOpenHandler() {
    setIsModalOpen(true);
  }

  function closeModalHandler() {
    setIsModalOpen(false);
  }

  return (
    <>
      <MainHeader onOpenModal={setIsModalOpenHandler} />
      <main className="App">
        <PostList isModalOpen={isModalOpen} onCloseModal={closeModalHandler} />
      </main>
    </>
  );
}

export default App;
