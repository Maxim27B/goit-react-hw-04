import Modal from 'react-modal';
import css from './ImageModal.module.css';
Modal.setAppElement('#root');

const ImageModal = ({ modalIsOpen, closeModal, currentPhoto }) => {
  return (
    <Modal
      className={css.backdrop}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <img
        className={css.photo}
        src={currentPhoto.url}
        alt={currentPhoto.alt}
      />
    </Modal>
  );
};

export default ImageModal;
