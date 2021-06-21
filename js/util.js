const getRandomNumberInRange = (min = 0, max = 1, numberSymbolsAfterComma = 0) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const randomNumber = Math.random() * (upper - lower) + lower;
  return +randomNumber.toFixed(numberSymbolsAfterComma);
};

const getArrayRandomElement = (array) => array[getRandomNumberInRange(0, array.length - 1)];
const getRandomArrayLength = (array) => array.slice(0, getRandomNumberInRange(1, array.length));

const makeUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomNumberInRange(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomNumberInRange(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

export {
  getRandomNumberInRange,
  getArrayRandomElement,
  getRandomArrayLength,
  makeUniqueRandomIntegerGenerator,
  enableElements,
  disableElements
};
