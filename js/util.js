function getRandomNumberInRange(min = 0, max = 1, numberSymbolsAfterComma = 0) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = Math.random() * (upper - lower) + lower;
  return +randomNumber.toFixed(numberSymbolsAfterComma);
}

function getArrayRandomElement(array) {
  return array[getRandomNumberInRange(0, array.length - 1)];
}

function getArrayRandomLength(array) {
  return array.slice(0, getRandomNumberInRange(1, array.length - 1));
}

export {getRandomNumberInRange, getArrayRandomElement, getArrayRandomLength};
