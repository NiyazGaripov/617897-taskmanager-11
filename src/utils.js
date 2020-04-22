const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderComponent = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
  }
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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RenderPosition, renderComponent, getTime, getRandomIntegerNumber, getRandomArrayItem, createElement};
