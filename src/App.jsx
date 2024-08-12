import css from './App.module.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import fetchPhotosWithTopic from './components/gallery-api';
import { useEffect, useState } from 'react';

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setIsLoading(true);
        // const data = await fetchPhotosWithTopic();
        // setPhotos(data);
        // console.log(data);
      } catch {
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    }
    fetchPhotos();
  }, []);

  const handleSubmit = evt => {
    evt.preventDefault();
  };
  return (
    <div className={css.appContainer}>
      {/* <ImageGallery photos={data} /> */}
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSubmit} />
    </div>
  );
};
export default App;
