const generateCard = () => {
  return {
    description: `Example default task with default color.`,
    dueDate: new Date(),
    color: `black`,
    repeatingDays: null,
    isArchive: true,
    isFavorite: false,
  };
};

const generateCards = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateCard);
};

export {generateCard, generateCards};
