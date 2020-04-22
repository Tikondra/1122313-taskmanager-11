import {createFilterMarkup} from "./filter-markup";
import AbstractComponent from "./abstract-component";

const createFilters = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};

class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilters(this._filters);
  }
}

export default Filter;
