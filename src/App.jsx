import css from './App.module.css';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
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
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPhoto, setCurrentPhoto] = useState({
    url: '',
    alt: '',
  });

  useEffect(() => {
    async function fetchPhotos(query) {
      try {
        if (inputValue === null) return;
        setIsLoading(true);
        const data = await fetchPhotosWithTopic(query, pageNumber);
        setPhotos(prevPhotos => {
          if (prevPhotos !== null) {
            return [...prevPhotos, ...data];
          }
          return data;
        });
      } catch {
        setError(false);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos(inputValue);
  }, [inputValue, pageNumber]);

  const onSubmit = evt => {
    const form = evt.currentTarget;
    setPageNumber(1);
    setInputValue(form.elements.query.value);
    form.reset();
  };

  const onLoadMore = () => {
    setPageNumber(pageNumber + 1);
    console.log(currentPhoto);
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
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery photos={photos} setCurrentPhoto={setCurrentPhoto} />
      )}
      {Array.isArray(photos) && photos.length === 0 && (
        <p style={{ color: 'red', margin: 'auto', width: '500px' }}>
          За вашим запитом не знайдено фотографій, спробуйте ще раз
        </p>
      )}
      {isLoading && <Loader />}
      {Array.isArray(photos) && photos.length > 0 && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
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
