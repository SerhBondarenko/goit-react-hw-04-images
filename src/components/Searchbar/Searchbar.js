import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import s from '../Searchbar/Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  static propTypes = {
    webformatURL: PropTypes.func
  };
  //записывает в стейт данные с инпута при каждом клике
  handleNameChange = event => {
    this.setState({
      imageName: event.currentTarget.value.toLowerCase().trim(),
    });
  };
  //записывает данные с формы в стейт при сабмите
  //передает данные в App
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      return toast.error('Введите название изображения');
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            value={this.state.imageName}
            onChange={this.handleNameChange}
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
  }
};