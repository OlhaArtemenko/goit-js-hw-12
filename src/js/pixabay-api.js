import axios from 'axios';

const API_KEY = '42959666-b225ac6c9c40b570269fe0b4e';
const baseURL = 'https://pixabay.com/api/';

export async function fetchImagesFromPixabay(searchQuery, page, perPage) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
