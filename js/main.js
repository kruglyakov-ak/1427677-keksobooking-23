const getRundomNumberInRange = (min, max, numberSimbolsAfterComma) => {
  const rundomNumber = Math.random() * (max - min) + min;
  if (min < max && min >= 0) {
    return rundomNumber.toFixed(numberSimbolsAfterComma);
  }
  throw new Error('Передан неправильный диапазон, число "min" должно быть положительным и меньше числа "max".');
};

getRundomNumberInRange(0, 1, 2);
