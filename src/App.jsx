import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import fetchPhotosWithTopic from './components/gallery-api';
import { useEffect, useState } from 'react';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPhoto, setCurrentPhoto] = useState({
    url: '',
    alt: '',
  });

  useEffect(() => {
    async function fetchPhotos(query) {
      try {
        setError(false);
        setIsLoading(true);
        if (inputValue === null) return;
        const data = await fetchPhotosWithTopic(query, currentPage);
        if (totalPages < currentPage) return;
        if (data.results.length === 0) {
          setError(true);
        } else {
          setPhotos(prev =>
            currentPage === 1 ? data.results : [...prev, ...data.results]
          );
          setTotalPages(data.total_pages);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos(inputValue);
  }, [inputValue, currentPage, totalPages]);

  const onSubmit = evt => {
    const form = evt.currentTarget;
    setCurrentPage(1);
    setInputValue(form.elements.query.value);
    form.reset();
  };

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [modalIsOpen]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery
          photos={photos}
          setCurrentPhoto={setCurrentPhoto}
          openModal={openModal}
        />
      )}
      {totalPages < currentPage && (
        <p
          style={{
            color: 'red',
            margin: 'auto',
            width: '500px',
            display: 'flex',
            margin: 'auto',
            justifyContent: 'center',
          }}
        >
          За вашим запитом не знайдено більше фотографій
        </p>
      )}
      {Array.isArray(photos) && photos.length === 0 && (
        <p style={{ color: 'red', margin: 'auto', width: '500px' }}>
          За вашим запитом не знайдено фотографій, спробуйте ще раз
        </p>
      )}
      {isLoading && <Loader />}
      {Array.isArray(photos) && photos.length > 0 && !error && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentPhoto={currentPhoto}
        />
      )}
    </div>
  );
};
export default App;
