import {createElement} from './../utils.js';

const createBoardComponent = () => {
  return (
    `<section class="board container">
      <div class="board__tasks"></div>
    </section>`
  );
};

class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardComponent();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {Board};
