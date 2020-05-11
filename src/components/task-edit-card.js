import {MONTH_NAMES, DAYS, COLORS} from './../constants.js';
import {getTime} from './../utils/time.js';
import {createRepeatingDaysComponent} from './days.js';
import {createColorsComponent} from './colors.js';
import {AbstractSmartComponent} from './abstract-smart-component.js';

const createTaskEditCardComponent = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? getTime(dueDate) : ``;
  const repeatingDaysComponent = createRepeatingDaysComponent(DAYS, repeatingDays);
  const colorsComponent = createColorsComponent(COLORS, color);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>

                ${isDateShowing ?
      `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${date} ${time}"
          />
        </label>
      </fieldset>`
      : ``}
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>

                ${isRepeatingTask ?
      `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${repeatingDaysComponent}
        </div>
      </fieldset>`
      : ``}

              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsComponent}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

class TaskEditCard extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskEditCardComponent(this._task);
  }

  setFormSubmitHandler(callback) {
    this.getElement()
      .querySelector(`form`)
      .addEventListener(`submit`, callback);
  }
}

export {TaskEditCard};
