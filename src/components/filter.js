import {AbstractComponent} from './abstract-component.js';

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

class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterComponent(this._filters);
  }
}

export {Filter};
