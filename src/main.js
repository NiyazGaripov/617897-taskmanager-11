import {RenderPosition, renderComponent} from './utils.js';
import {NavigationMenu} from './components/nav-menu.js';
import {Filter} from './components/filter.js';
import {Board} from './components/board.js';
import {TaskList} from './components/task-list.js';
import {Sort} from './components/sort.js';
import {TaskEditCard} from './components/task-edit-card.js';
import {TaskCard} from './components/task-card.js';
import {LoadMoreButton} from './components/load-more-button.js';
import {generateCards} from './mock/card.js';
import {generateFilters} from './mock/filter.js';

const TASK_CARDS_AMOUNT = 22;
const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;
const BEGIN_INDEX = 0;
const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);
const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

// renderComponent(pageMenuElement, createNavigationMenuComponent());
// renderComponent(pageMainElement, createFilterComponent(filters));
// renderComponent(pageMainElement, createSortComponent());

// const taskCardsElement = pageMainElement.querySelector(`.board__tasks`);
// const boardElement = pageMainElement.querySelector(`.board`);

// renderComponent(taskCardsElement, createTaskEditCardComponent(cards[0]));

// let showingTaskCards = TASK_CARDS_AMOUNT_ON_START;

// cards
//   .slice(BEGIN_INDEX, showingTaskCards)
//   .forEach((card) => {
//     renderComponent(taskCardsElement, createTaskCardComponent(card));
//   });

// renderComponent(boardElement, createLoadMoreButtonComponent());

// const loadMoreButton = boardElement.querySelector(`.load-more`);

// loadMoreButton.addEventListener(`click`, () => {
//   const prevTaskCards = showingTaskCards;
//   showingTaskCards = showingTaskCards + TASK_CARDS_AMOUNT_LOAD_MORE;

//   cards
//     .slice(prevTaskCards, showingTaskCards)
//     .forEach((card) => {
//       renderComponent(taskCardsElement, createTaskCardComponent(card));
//     });
//   if (showingTaskCards >= cards.length) {
//     loadMoreButton.remove();
//   }
// });
