import {renderComponent, removeComponent} from './../utils/render.js';
import {TaskList} from './../components/task-list.js';
import {Sort} from './../components/sort.js';
import {TaskController} from './../controllers/task.js';
import {LoadMoreButton} from './../components/load-more-button.js';
import {NoTaskList} from './../components/no-tasks.js';
import {SortType} from './../constants.js';

const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;
const BEGIN_INDEX = 0;

const renderTaskCards = (taskCardsElement, cards) => {
  cards.forEach((card) => {
    renderTaskCard(taskCardsElement, card);
  });
};

const sortTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTaskList();
    this._sortComponent = new Sort();
    this._taskListComponent = new TaskList();
    this._loadMoreButtonComponent = new LoadMoreButton();
  }

  render(cards) {
    const container = this._container.getElement();
    const isAllTasksArchived = cards.every((card) => card.isArchive);

    if (isAllTasksArchived) {
      renderComponent(container, this._noTasksComponent);
      return;
    }

    renderComponent(container, this._sortComponent);
    renderComponent(container, this._taskListComponent);

    const taskCardsElement = this._taskListComponent.getElement();

    let showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;

    renderTaskCards(taskCardsElement, cards.slice(BEGIN_INDEX, showingTasksAmount));
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (showingTasksAmount >= cards.length) {
      return;
    }

    renderComponent(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksAmount;
      showingTasksAmount = showingTasksAmount + TASK_CARDS_AMOUNT_LOAD_MORE;

      const sortedTasks = sortTasks(cards, this._sortComponent.getSortType(), prevTasksCount, showingTasksAmount);

      renderTaskCards(taskCardsElement, sortedTasks);

      if (showingTasksAmount >= cards.length) {
        removeComponent(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange() {
    showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;

    const sortedTasks = sortTasks(cards, sortType, BEGIN_INDEX, showingTasksAmount);

    taskCardsElement.innerHTML = ``;

    renderTaskCards(taskCardsElement, sortedTasks);
    this._renderLoadMoreButton();
  }
}

export {BoardController};
