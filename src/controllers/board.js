import {renderComponent, replaceComponent, removeComponent} from './../utils/render.js';
import {onEscKeyDown} from './../utils/common.js';
import {TaskList} from './../components/task-list.js';
import {Sort} from './../components/sort.js';
import {TaskEditCard} from './../components/task-edit-card.js';
import {TaskCard} from './../components/task-card.js';
import {LoadMoreButton} from './../components/load-more-button.js';
import {NoTaskList} from './../components/no-tasks.js';

const TASK_CARDS_AMOUNT_ON_START = 8;
const TASK_CARDS_AMOUNT_LOAD_MORE = 8;
const BEGIN_INDEX = 0;

const renderTaskCards = (taskCardsElement, card) => {
  const replaceTaskToEdit = () => {
    replaceComponent(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replaceComponent(taskComponent, taskEditComponent);
  };

  const onCardCloseEsc = (evt) => {
    onEscKeyDown(evt, replaceEditToTask);
    document.removeEventListener(`keydown`, onCardCloseEsc);
  };

  const taskComponent = new TaskCard(card);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onCardCloseEsc);
  });

  const taskEditComponent = new TaskEditCard(card);

  taskEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onCardCloseEsc);
  });

  renderComponent(taskCardsElement, taskComponent);
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

    const renderLoadMoreButton = () => {
      if (showingTasksAmount >= cards.length) {
        return;
      }

      renderComponent(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksAmount;
        showingTasksAmount = showingTasksAmount + TASK_CARDS_AMOUNT_LOAD_MORE;

        cards.slice(prevTasksCount, showingTasksAmount)
          .forEach((card) => renderTaskCards(taskCardsElement, card));

        if (showingTasksAmount >= cards.length) {
          removeComponent(this._loadMoreButtonComponent);
        }
      });
    };

    if (isAllTasksArchived) {
      renderComponent(container, this._noTasksComponent);
      return;
    }

    renderComponent(container, this._sortComponent);
    renderComponent(container, this._taskListComponent);

    const taskCardsElement = this._taskListComponent.getElement();

    let showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;
    cards.slice(BEGIN_INDEX, showingTasksAmount)
      .forEach((card) => {
        renderTaskCards(taskCardsElement, card);
      });

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler(() => {
      showingTasksAmount = TASK_CARDS_AMOUNT_ON_START;

      taskCardsElement.innerHTML = ``;

      cards.slice(BEGIN_INDEX, showingTasksAmount)
        .forEach((card) => {
          renderTaskCards(taskCardsElement, card);
        });

      renderLoadMoreButton();
    });
  }
}

export {BoardController};
