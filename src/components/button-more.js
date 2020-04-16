import {createElement} from "./utils";

const createButtonMore = () => (`<button class="load-more" type="button">load more</button>`);

export default class ButtonMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonMore();
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
