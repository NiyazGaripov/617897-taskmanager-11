import {AbstractComponent} from './abstract-component.js';

const createLoadMoreButtonComponent = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonComponent();
  }
}

export {LoadMoreButton};
