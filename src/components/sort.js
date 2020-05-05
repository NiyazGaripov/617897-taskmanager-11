import {AbstractComponent} from './abstract-component.js';
import {SortType} from './../constants.js';

const createSortComponent = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

class Sort extends AbstractComponent {
  getTemplate() {
    return createSortComponent();
  }
}

export {Sort};
