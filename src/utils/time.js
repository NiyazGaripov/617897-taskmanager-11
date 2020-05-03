const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getTime = (date) => {
  const hours = setTimeFormat(date.getHours() % 12);
  const minutes = setTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export {getTime};
