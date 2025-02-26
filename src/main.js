import { fetchImages } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import { renderImg } from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('#search-input'),
  loader: document.querySelector('#loader'),
  gallery: document.querySelector('#gallery'),
};

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const query = refs.input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 2000,
    });
    return;
  }

  showLoader();

  fetchImages(query)
    .then(images => {
      hideLoader();

      if (images.length === 0) {
        iziToast.info({
          title: 'Oops!',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 3000,
        });
      } else {
        renderImg(images);
      }
    })
    .catch(error => {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong! Please try again later.',
        position: 'topRight',
        timeout: 3000,
      });
      
      console.error('Error fetching images:', error);
    });
});