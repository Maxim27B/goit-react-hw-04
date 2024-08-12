const ImageGallery = ({ photos }) => {
  return (
    <ul>
      {Array.isArray(photos) &&
        photos.map(photo => {
          return (
            <li key={photo.id}>
              <div>
                <img src={photo.urls.small} alt={photo.description} />
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
