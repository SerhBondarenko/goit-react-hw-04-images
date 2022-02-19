import react from 'react';
import s from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';


function ImageGalleryItem({ largeImageURL, tags, webformatURL, toggleModal}) {
  return (
    <li className={s.ImageGalleryItem} onClick={() => toggleModal(largeImageURL)}>
      <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem

 ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };