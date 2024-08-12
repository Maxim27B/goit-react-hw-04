import css from './App.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import fetchPhotosWithTopic from './components/gallery-api';
import { useEffect, useState } from 'react';

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPhotos(query) {
      try {
        if (inputValue === null) return;
        setError(false);
        setIsLoading(true);
        const data = await fetchPhotosWithTopic(query);
        setPhotos(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos(inputValue);
  }, [inputValue]);

  const onSubmit = evt => {
    const form = evt.currentTarget;
    setInputValue(form.elements.query.value);
    form.reset();
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <div className={css.appContainer}>
      <SearchBar onSubmit={onSubmit} />
      {error ? <ErrorMessage /> : <ImageGallery photos={photos} />}
      {isLoading && <Loader />}
      {<LoadMoreBtn />}
      {modalIsOpen && (
        <ImageModal
          styles={modalStyles}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
export default App;
