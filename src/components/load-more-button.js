import {createElement} from './../utils.js';

const createLoadMoreButtonComponent = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadMoreButtonComponent();
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

export {LoadMoreButton};
