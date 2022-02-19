import { Component } from 'react';
import './styles.css';
import Searchbar from '../components/Searchbar/Searchbar'
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from './ImageGallery/ImageGallery';
import imageFinderAPI from './servises/image-finder-api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';


export default class App extends Component {
  state = {
    images: [],
    loading: false,
    imageName: '',
    showModal: false,
    error: null,
    status: 'idle',
    page: 1,
    largeImageURL: {},
  };

  fetchQuery = () => {
    const { imageName, page } = this.state;
    imageFinderAPI
      .fetchImage(imageName, page)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
          status: 'resolved',
          data,
        }))
      }).catch(error => this.setState({ error, status: 'rejected' }))
  };
  
  componentDidUpdate(prevProps, prevState) {
  
   if (prevState.imageName !== this.state.imageName) {
   this.setState({ images: [] });
     this.fetchQuery(this.state.imageName, this.state.page)
   } 
  };

// принимает данные с формы 
  handleFormSubmit = imageName => {
    this.setState({ imageName,page:1  });
  };
   openModal = (imageUrl) => {
    this.setState({ showModal: true, largeImageURL: imageUrl});
  };
 closeModal = () => {
    this.setState({ showModal: false, activeImgUrl: "" });
  };
  render() {
    const { images, status, error, data,showModal,largeImageURL} = this.state;
    return (
      
      <div className='App'><Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={2000} />
        {status === 'idle' && <h2 className='title'>Введите имя запроса</h2>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <h1>{error.message}</h1>}
        {status === 'resolved' && <main> <ImageGallery images={images} toggleModal={this.openModal} showModal={showModal }/> {images.length !== data.totalHits && <div className='LoadMoreBtn'><Button onClickBtn={this.fetchQuery} /> </div>}</main>}
     {showModal && (
          <Modal onClose={this.closeModal}>
           <img src={largeImageURL} alt="images"></img>;</Modal>
      )}
    </div>)
  };
};
