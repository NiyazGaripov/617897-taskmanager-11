import {renderComponent} from './utils.js';
import {createNavigationMenuComponent} from './components/nav-menu.js';
import {createFilterComponent} from './components/filter.js';
import {createSortComponent} from './components/sorting.js';
import {createTaskEditCardComponent} from './components/task-edit-card.js';
import {createTaskCardComponent} from './components/task-card.js';
import {createLoadMoreButtonComponent} from './components/load-more-button.js';
import {generateCards} from './mock/card.js';

const TASK_CARDS_AMOUNT = 22;
const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;
const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);
const cards = generateCards(TASK_CARDS_AMOUNT);

renderComponent(pageMenuElement, createNavigationMenuComponent());
renderComponent(pageMainElement, createFilterComponent());
renderComponent(pageMainElement, createSortComponent());

const taskCardsElement = pageMainElement.querySelector(`.board__tasks`);
const boardElement = pageMainElement.querySelector(`.board`);

renderComponent(taskCardsElement, createTaskEditCardComponent(cards[0]));

for (let i = 0; i < cards.length; i++) {
  renderComponent(taskCardsElement, createTaskCardComponent(cards[i]));
}

renderComponent(boardElement, createLoadMoreButtonComponent());
