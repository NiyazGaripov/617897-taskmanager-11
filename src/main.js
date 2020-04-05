import {renderComponent} from './components/utils.js';
import {createNavigationMenuComponent} from './components/nav-menu.js';
import {createFilterComponent} from './components/filter.js';
import {createSortComponent} from './components/sorting.js';
import {createTaskEditCardComponent} from './components/task-edit-card.js';
import {createTaskCardComponent} from './components/task-card.js';
import {createLoadMoreButtonComponent} from './components/load-more-button.js';

const TASK_CARDS_AMOUNT = 3;
const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);

renderComponent(pageMenuElement, createNavigationMenuComponent());
renderComponent(pageMainElement, createFilterComponent());
renderComponent(pageMainElement, createSortComponent());

const taskCardsElement = pageMainElement.querySelector(`.board__tasks`);
const boardElement = pageMainElement.querySelector(`.board`);

renderComponent(taskCardsElement, createTaskEditCardComponent());

for (let i = 0; i < TASK_CARDS_AMOUNT; i++) {
  renderComponent(taskCardsElement, createTaskCardComponent());
}

renderComponent(boardElement, createLoadMoreButtonComponent());
