const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getTime = (date) => {
  const hours = setTimeFormat(date.getHours() % 12);
  const minutes = setTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);

  return array[randomItem];
};

export {renderComponent, getTime, getRandomIntegerNumber, getRandomArrayItem}
