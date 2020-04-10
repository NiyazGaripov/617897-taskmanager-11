export const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const getTime = (date) => {
  const hours = setTimeFormat(date.getHours() % 12);
  const minutes = setTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};
