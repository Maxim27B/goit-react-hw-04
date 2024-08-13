import css from './ImageCard.module.css';

const ImageCard = ({ urls, small, alt, openModal, likes, setCurrentPhoto }) => {
  const handleClick = () => {
    setCurrentPhoto({ url: urls.full, alt: alt });
    openModal();
  };
  return (
    <div className={css.imageContainer}>
      <img className={css.image} src={small} alt={alt} onClick={handleClick} />
      <div className={css.descriptionWrapper}>
        <p className={css.likes}>Likes: {likes}</p>
      </div>
    </div>
  );
};

export default ImageCard;
