import { useState, useEffect } from "react";
import "./styles.css";
import Searchbar from "../components/Searchbar/Searchbar";
import {ToastContainer} from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";
import imageFinderAPI from "./servises/image-finder-api";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [imageName, setImageName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("null");
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [activeImgUrl, setActiveImgUrl] = useState("");

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus("pending");
    fetchQuery();
  }, [imageName]);

  const fetchQuery = () => {
    imageFinderAPI
      .fetchImage(imageName, page)
      .then((data) => {
        setData(data);
        setImages([...images, ...data.hits]);
        setPage(page + 1);
        setStatus("resolved");
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      });
  };

  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    setPage(1);
  };

  const openModal = (imageUrl) => {
    setShowModal(true);
    setLargeImageURL(imageUrl);
  };
  const closeModal = () => {
    setShowModal(false);
    setActiveImgUrl("");
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={2000} />
      {status === "idle" && <h2 className="title">Введите имя запроса</h2>}
      {status === "pending" && <Loader />}
      {status === "rejected" && <h1>{error.message}</h1>}
      {status === "resolved" && (
        <main>
          <ImageGallery images={images} toggleModal={openModal} showModal={showModal} />
          {images.length !== data.totalHits && (
            <div className="LoadMoreBtn">
              <Button onClickBtn={fetchQuery} />
            </div>
          )}
        </main>
      )}
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="images"></img>;
        </Modal>
      )}
    </div>
  );
}
