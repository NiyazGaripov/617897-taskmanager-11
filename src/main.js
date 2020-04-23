import {renderComponent} from './utils.js';
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

const renderTaskCards = (taskCardsElement, card) => {
  const onEditButtonClick = () => {
    taskCardsElement.replaceChild(TaskEditCard.getElement(), TaskCard.getElement());
  };

  const onEditFormSubmit = () => {
    taskCardsElement.replaceChild(TaskCard.getElement(), TaskEditCard.getElement());
  };

  const taskComponent = new TaskCard(card);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditCard(card);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  renderComponent(taskCardsElement, taskComponent.getElement());
};

const pageMainElement = document.querySelector(`.main`);
const pageMenuElement = pageMainElement.querySelector(`.main__control`);
const cards = generateCards(TASK_CARDS_AMOUNT);
const filters = generateFilters();

renderComponent(pageMenuElement, new NavigationMenu().getElement());
renderComponent(pageMainElement, new Filter(filters).getElement());
