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
  activateForm,
  deactivateForm
} from './form.js';

import {
} from './form-validation.js';

const datasAds = generateAds(ADS_COUNT);
generateCard(datasAds[0]);

const activatePage = () => {
  activateMapFilters();
  activateForm();
};

const deactivatePage = () => {
  deactivateMapFilters();
  deactivateForm();
};

deactivatePage();
activatePage();
