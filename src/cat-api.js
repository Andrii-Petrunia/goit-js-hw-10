import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_h5tLJWp2H6wNj7kQsm7neKAJNEI9CIDxrHSPffsB1lMuqRYhpp8IQyBQaZ2Mk6jj';


export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
}
