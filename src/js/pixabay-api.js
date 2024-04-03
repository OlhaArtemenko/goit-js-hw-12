export function fetchImagesFromPixabay(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '42959666-b225ac6c9c40b570269fe0b4e',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
