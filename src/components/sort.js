import {AbstractComponent} from './abstract-component.js';
import {SortType} from './../constants.js';

const createSortComponent = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" class="board__filter">SORT BY DATE up</a>
      <a href="#" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

class Sort extends AbstractComponent {
  getTemplate() {
    return createSortComponent();
  }
}

export {Sort};
