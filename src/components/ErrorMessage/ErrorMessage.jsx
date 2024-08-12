import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <p className={css.error}>Виникла помилка, спробуйте, будь ласка, ще раз</p>
  );
};

export default ErrorMessage;
