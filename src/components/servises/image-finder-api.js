const API_KEY = '24634103-ccaa1178ad9ce2c93fc6cee88';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImage(name, page) {
    return(
  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нет изображения по такому запросу ${name}`)
    );
  }));
};

const api = {
  fetchImage,
};

export default api;
