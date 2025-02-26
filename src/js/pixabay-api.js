import axios from 'axios';

const API_KEY = '49070628-cf42e4c64cc07d7e6ab81af9e';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return axios
    .get(url)
    .then(response => response.data.hits)
    .catch(error => {
      console.error('Error fetching data from Pixabay API:', error);
      throw error;
    });
}