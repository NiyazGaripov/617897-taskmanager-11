const ESC_KEYCODE = 27;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);

  return array[randomItem];
};

const onEscKeyDown = (evt, calback) => {
  if (evt.keyCode === ESC_KEYCODE) {
    calback();
  }
};

export {getRandomIntegerNumber, getRandomArrayItem, onEscKeyDown};
