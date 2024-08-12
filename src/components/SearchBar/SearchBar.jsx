import { useRef } from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSubmit }) => {
  const formRef = useRef();

  const notify = () => toast('Here is your toast.');
  return (
    <header>
      <form onSubmit={onSubmit} ref={formRef}>
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
        {/* {formRef.current.elements.query.value === '' && <Toaster />} */}
      </form>
    </header>
  );
};

export default SearchBar;
