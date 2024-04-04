import { listOfGallery, lightbox, loadMoreBtn } from '../main';

export function renderImages(array) {
  if (array.length == 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      progressBarColor: '#FFFFFF',
      icon: null,
      backgroundColor: '#ef4040',
      titleColor: '#fff',
      messageColor: '#fff',
    });
  } else {
    const markup = array
      .map(image => {
        return `<li class="image-item">
          <a class="image-link" href="${image.largeImageURL}">
          <img class="image" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <ul class="image-information-box">
          <li class="item-information"><p><span class="info-title">Likes</span></br>${image.likes}</p></li>
          <li class="item-information"><p><span class="info-title">Views</span></br>${image.views}</p></li>
          <li class="item-information"><p><span class="info-title">Comments</span></br>${image.comments}</p></li>
          <li class="item-information"><p><span class="info-title">Downloads</span></br>${image.downloads}</p></li>
          </ul>
          </li >`;
      })
      .join('');
    listOfGallery.insertAdjacentHTML('beforeend', markup);
    listOfGallery.insertAdjacentElement('beforeend', loadMoreBtn);
    lightbox.refresh();
  }
}
