import { fetchImagesFromPixabay } from './js/pixabay-api';
import { renderImages } from './js/render-function';
import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
export const listOfGallery = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

const preloader = document.querySelector('.loader');
function showLoader() {
  preloader.classList.remove('is-hidden');
}
function hideLoader() {
  preloader.classList.add('is-hidden');
}
form.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  showLoader();
  listOfGallery.innerHTML = '';
  const inputValue = event.target.elements.search.value.trim();
  if (inputValue !== '') {
    fetchImagesFromPixabay(inputValue)
      .then(resolve => {
        renderImages(resolve.hits);
        hideLoader();
        form.reset();
      })
      .catch(error => {
        console.log(error);
        iziToast.error({
          message: 'Sorry, an error occurred while loading. Please try again!',
          theme: 'dark',
          progressBarColor: '#FFFFFF',
          color: '#EF4040',
          position: 'topRight',
        });
        hideLoader();
      });
  } else {
    iziToast.show({
      message: 'Please complete the field!',
      theme: 'dark',
      progressBarColor: '#FFFFFF',
      color: '#EF4040',
      position: 'topRight',
    });
    hideLoader();
  }
}
