const getRundomNumberInRange = (min, max, numberSimbolsAfterComma) => {
  const rundomNumber = Math.random() * (max - min) + min;
  if (min < max && min >= 0) {
    return rundomNumber.toFixed(numberSimbolsAfterComma);
  }
return;
};

getRundomNumberInRange(0, 1, 2);
