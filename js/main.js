import {
  generateAds,
  ADS_COUNT
} from './data.js';

import {
  generateCard
} from './card.js';

import {
  diactivateForm,
  activateForm
} from './form.js';

const datasAds = generateAds(ADS_COUNT);
generateCard(datasAds[0]);

const cardForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
diactivateForm(cardForm, mapFilters);
activateForm(cardForm, mapFilters);
