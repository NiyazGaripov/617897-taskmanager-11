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

const renderTaskCards = (taskCardsElement, cards, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const taskController = new TaskController(taskCardsElement, onDataChange, onViewChange);

    taskController.render(card);

    return taskController;
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
    this._cards = [];
    this._showedTaskControllers = [];
    this._showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;
    this._container = container;
    this._noTasksComponent = new NoTaskList();
    this._sortComponent = new Sort();
    this._taskListComponent = new TaskList();
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(cards) {
    this._cards = cards;
    const container = this._container.getElement();
    const isAllTasksArchived = this._cards.every((card) => card.isArchive);

    if (isAllTasksArchived) {
      renderComponent(container, this._noTasksComponent);
      return;
    }

    renderComponent(container, this._sortComponent);
    renderComponent(container, this._taskListComponent);

    const taskCardsElement = this._taskListComponent.getElement();
    const newTasks = renderTaskCards(taskCardsElement, this._cards.slice(BEGIN_INDEX, this._showingTasksAmount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    const container = this._container.getElement();

    if (this._showingTasksAmount >= this._cards.length) {
      return;
    }

    renderComponent(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksAmount;
      const taskCardsElement = this._taskListComponent.getElement();
      this._showingTasksAmount = this._showingTasksAmount + TASK_CARDS_AMOUNT_LOAD_MORE;

      const sortedTasks = sortTasks(this._cards, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksAmount);

      const newTasks = renderTaskCards(taskCardsElement, sortedTasks, this._onDataChange, this._onViewChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksAmount >= this._cards.length) {
        removeComponent(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    taskController.render(this._cards[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;
    const taskCardsElement = this._taskListComponent.getElement();

    const sortedTasks = sortTasks(this._cards, sortType, BEGIN_INDEX, this._showingTasksAmount);

    taskCardsElement.innerHTML = ``;

    const newTasks = renderTaskCards(taskCardsElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;
    this._renderLoadMoreButton();
  }
}

export {BoardController};
