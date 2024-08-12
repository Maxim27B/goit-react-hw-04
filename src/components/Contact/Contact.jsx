import css from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';

const Contact = ({ name, number, onDeleteContact, id }) => {
  return (
    <div className={css.contactContainer}>
      <p className={css.text}>
        <FaUser className={css.icon} />
        {name}
      </p>
      <p className={css.text}>
        <BsFillTelephoneFill className={css.icon} />
        {number}
      </p>
      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => onDeleteContact(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
