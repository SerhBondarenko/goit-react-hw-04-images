import { useState} from "react";
import { ImSearch } from "react-icons/im";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import s from "../Searchbar/Searchbar.module.css";

  export default function Searchbar({onSubmit}) {
  
  const [imageName, setImageName] = useState("");

  //записывает в стейт данные с инпута при каждом клике
  const handleNameChange = (event) => {
    setImageName(event.currentTarget.value.toLowerCase().trim());
  };
  //записывает данные с формы в стейт при сабмите
  //передает данные в App
  const handleSubmit = (event) => {
    event.preventDefault();
    if (imageName.trim() === "") {
      return toast.error("Введите название изображения");
    }
    onSubmit(imageName);
    setImageName('');
  };

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            value={imageName}
            onChange={handleNameChange}
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
            <ImSearch style={{ marginRight: 8 }} />
          </button>
        </form>
      </header>
    );
};

 Searchbar.propTypes = {
   onSubmit: PropTypes.func,
 };