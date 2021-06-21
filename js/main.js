import {
  generateAds,
  ADS_COUNT
} from './data.js';

import {
  generateCard
} from './card.js';

import {
  activateMapFilters,
  deactivateMapFilters
} from './map-filters.js';

import {
  activateCardForm,
  deactivateCardForm
} from './card-form.js';

const datasAds = generateAds(ADS_COUNT);
generateCard(datasAds[0]);

const activatePage = () => {
  activateMapFilters();
  activateCardForm();
};

const deactivatePage = () => {
  deactivateMapFilters();
  deactivateCardForm();
};

deactivatePage();
activatePage();
