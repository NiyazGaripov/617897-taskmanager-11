import {renderComponent, replaceComponent} from './../utils/render.js';
import {TaskCard} from './../components/task-card.js';
import {TaskEditCard} from './../components/task-edit-card.js';
import {onEscKeyDown} from './../utils/common.js';

class TaskController {
  constructor(container) {
    this._container = container;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._onEscKeyDown = onEscKeyDown.bind(this);
  }

  render(card) {
    this._taskComponent = new TaskCard(card);
    this._taskEditComponent = new TaskEditCard(card);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onCardCloseEsc);
    });

    this._taskEditComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    renderComponent(this._container, this._taskComponent);
  }

  _replaceTaskToEdit() {
    replaceComponent(this._taskEditComponent, this._taskComponent);
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onCardCloseEsc);
    replaceComponent(this._taskComponent, this._taskEditComponent);
  }

  _onCardCloseEsc(evt) {
    this._onEscKeyDown(evt, this._replaceEditToTask);
    document.removeEventListener(`keydown`, this._onCardCloseEsc);
  }
}

export {TaskController};
