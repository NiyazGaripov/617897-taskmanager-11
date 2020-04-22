import {createElement} from './../utils.js';

const createFiltersComponent = (filters, isChecked) => {
  const {name, count} = filters;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const createFilterComponent = (filters) => {
  const filtersComponent = filters.map((filter, index) => createFiltersComponent(filter, index === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersComponent}
    </section>`
  );
};

class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterComponent(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {Filter};
