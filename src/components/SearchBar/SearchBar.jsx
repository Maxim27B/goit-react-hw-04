import { useState } from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const [notification, setNotification] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.currentTarget.elements.query.value.trim() === '') {
      setNotification(true);
    } else {
      setNotification(false);
      onSubmit(evt);
    }
  };

  const notify = () => {
    toast.dismiss();
    toast.error('Поле пошуку не може бути порожнім.');
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit" onClick={notify}>
          Search
        </button>
        {notification && (
          <Toaster
            toastOptions={{
              style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
              },
            }}
          />
        )}
      </form>
    </header>
  );
};

export default SearchBar;
