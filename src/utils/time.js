import {MONTH_NAMES} from './../constants.js';

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getDate = (date) => {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
};

const getTime = (date) => {
  const hours = setTimeFormat(date.getHours() % 24);
  const minutes = setTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export {getDate, getTime};
