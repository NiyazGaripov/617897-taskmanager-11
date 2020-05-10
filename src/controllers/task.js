import {renderComponent, replaceComponent} from './../utils/render.js';
import {TaskCard} from './../components/task-card.js';
import {TaskEditCard} from './../components/task-edit-card.js';
import {ESC_KEYCODE} from './../constants.js';

class TaskController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
    this._taskComponent = new TaskCard(card);
    this._taskEditComponent = new TaskEditCard(card);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isArchive: !card.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
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
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replaceComponent(this._taskComponent, this._taskEditComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export {TaskController};
