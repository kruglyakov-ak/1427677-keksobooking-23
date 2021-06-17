import {
  generateAds,
  ADS_COUNT
} from './data.js';

import {
  generateCard
} from './generator-elems.js';

const datasAds = generateAds(ADS_COUNT);
generateCard(datasAds[0]);
