import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  headers: {
    Authorization: 'Client-ID wd1bdipkEtNjAx-zjCaDYCk9jeCG1Bp4TaQBgXu7zEI',
  },
});

const fetchPhotosWithTopic = async (topic, page) => {
  const response = await instance.get(
    `?query=${topic}&orientation=squarish&per_page=12&page=${page}`
  );
  return response.data.results;
};

export default fetchPhotosWithTopic;
