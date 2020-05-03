import {AbstractComponent} from './abstract-component.js';

const createBoardComponent = () => {
  return (
    `<section class="board container"></section>`
  );
};

class Board extends AbstractComponent {
  getTemplate() {
    return createBoardComponent();
  }
}

export {Board};
