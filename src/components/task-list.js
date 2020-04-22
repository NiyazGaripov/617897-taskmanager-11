import {createElement} from '../utils.js';

const createTaskListComponent = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskListComponent();
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

export {TaskList};
