import {getRandomIntegerNumber, getRandomArrayItem} from './../utils.js';
import {DESCRIPTION_CARDS, COLORS} from './../data.js';

const DefaultRepeatingDays = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    "mo": Math.random() > 0.5,
  });
};

const generateCard = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DESCRIPTION_CARDS),
    dueDate,
    color: getRandomArrayItem(COLORS),
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateCards = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};
