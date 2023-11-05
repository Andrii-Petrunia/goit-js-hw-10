import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './styles.css';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelectElement = document.querySelector('.breed-select');

const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function clearSelectOptions() {
  breedSelectElement.innerHTML = '';
}

function populateSelectOptions(breeds) {
  clearSelectOptions();

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelectElement.appendChild(option);
  });
}

function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
  catInfo.style.display = 'none';
}

function showError() {
  loader.style.display = 'none';
  error.style.display = 'block';
  catInfo.style.display = 'none';

  Notiflix.Report.failure(
    'Oops!',
    'Something went wrong. Try reloading the page!',
    'Reload',
    () => {
      location.reload();
    }
  );
}

function showCatInfo(cat) {
  loader.style.display = 'none';
  error.style.display = 'none';
  catInfo.style.display = 'block';

  const breedName = cat.breeds[0].name;
  const description = cat.breeds[0].description;
  const temperament = cat.breeds[0].temperament;

  catInfo.innerHTML = `
    <h2>Cat Information</h2>
    <p><strong>Name:</strong> ${breedName}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Temperament:</strong> ${temperament}</p>
    <img src="${cat.url}" alt="${breedName}" />
  `;
}

function hideLoader() {
  loader.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', async () => {
  showLoader();

  try {
    const breeds = await fetchBreeds();
    populateSelectOptions(breeds);

    new SlimSelect({
      select: '.breed-select',
    });

    hideLoader();
  } catch (error) {
    showError();
  }
});

breedSelectElement.addEventListener('change', async () => {
  showLoader();

  const selectedBreedId = breedSelectElement.value;

  try {
    const cat = await fetchCatByBreed(selectedBreedId);
    showCatInfo(cat);
    hideLoader();
  } catch (error) {
    showError();
  }
});
