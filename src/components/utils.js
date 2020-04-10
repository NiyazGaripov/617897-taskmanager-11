export const renderComponent = (container, component, place = `beforeend`) => {
  container.insertAdjacentHTML(place, component);
};

const setTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};
