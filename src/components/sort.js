import AbstractComponent from "./abstract-component.js";
import {SortType} from "./consts";

const createSortTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sort-type="${SortType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sort-type="${SortType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sort-type="${SortType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};


class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this.onSortType = this.onSortType.bind(this);
  }

  onSortType(handler, evt) {
    evt.preventDefault();

    if (!evt.target.hasAttribute(`data-sort-type`)) {
      return;
    }

    const sortType = evt.target.dataset.sortType;

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    handler(this._currentSortType);
  }

  getTemplate() {

    return createSortTemplate();
  }

  getSortType() {

    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, this.onSortType.bind(this, handler));
  }
}

export default Sort;
