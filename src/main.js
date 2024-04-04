import { fetchImagesFromPixabay } from './js/pixabay-api';
import { renderImages } from './js/render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const inputElement = document.querySelector('.search-input');
export const listOfGallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.load-more-btn');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

lightbox.refresh();

hideLoader();
hideLoadMoreButton();

let searchTerm = '';
let currentPage = 1;
const perPage = 15;

form.addEventListener('submit', submitHandle);
async function submitHandle(event) {
  event.preventDefault();
  searchTerm = inputElement.value.trim();
  currentPage = 1;

  listOfGallery.innerHTML = '';

  if (searchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    hideLoader();
    return;
  }

  hideEndMessage();

  showLoader();
  try {
    const images = await fetchImagesFromPixabay(
      searchTerm,
      currentPage,
      perPage
    );
    const totalHits = images.totalHits;

    if (images.hits.length === 0) {
      listOfGallery.innerHTML = '';
      iziToast.info({
        title: 'Info',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    } else {
      renderImages(images.hits);
      inputElement.value = '';
      showLoadMoreButton();
    }
    if (perPage * currentPage >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  try {
    if (loadMoreBtn) {
      currentPage += 1;
    }
    const images = await fetchImagesFromPixabay(
      searchTerm,
      currentPage,
      perPage
    );
    const totalHits = images.totalHits;

    renderImages(images.hits);
    showLoader();
    if (currentPage * perPage >= totalHits) {
      hideLoadMoreButton();
      showEndMessage();
    }
    const galleryCardHeight =
      listOfGallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: galleryCardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error fetching more images:', error);
    iziToast.error({
      title: 'Error',
      message: `Error fetching more images: ${error}`,
    });
  } finally {
    hideLoader();
  }
});

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
function hideEndMessage() {
  const endMessage = document.querySelector('.end-message');
  if (endMessage) {
    endMessage.remove();
  }
}
function showEndMessage() {
  const endMessage = document.createElement('p');
  endMessage.style.display = 'flex';
  endMessage.style.alignItems = 'center';
  endMessage.style.justifyContent = 'center';

  endMessage.style.margin = '20px auto';
  endMessage.classList.add('end-message');
  endMessage.textContent =
    "We're sorry, but you've reached the end of search results.";
  listOfGallery.insertAdjacentElement('beforeend', endMessage);
}
