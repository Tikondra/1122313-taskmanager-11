import {createElement, getDataTask} from "./utils";

const createTask = (task) => {
  const {description, dueDate, color, repeatingDays, isArchive, isFavorite, index} = task;
  const {date, time, repeatClass, deadlineClass} = getDataTask(dueDate, repeatingDays);

  const archiveButtonInactiveClass = isArchive ? `` : `card__btn--disabled`;
  const favoriteButtonInactiveClass = isFavorite ? `` : `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}" id="${index}">
          <div class="card__form">
            <div class="card__inner">
              <div class="card__control">
                <button type="button" class="card__btn card__btn--edit">
                  edit
                </button>
                <button type="button" class="card__btn card__btn--archive ${archiveButtonInactiveClass}">
                  archive
                </button>
                <button
                  type="button"
                  class="card__btn card__btn--favorites ${favoriteButtonInactiveClass}"
                >
                  favorites
                </button>
              </div>

              <div class="card__color-bar">
                <svg class="card__color-bar-wave" width="100%" height="10">
                  <use xlink:href="#wave"></use>
                </svg>
              </div>

              <div class="card__textarea-wrap">
                <p class="card__text">${description}</p>
              </div>

              <div class="card__settings">
                <div class="card__details">
                  <div class="card__dates">
                    <div class="card__date-deadline">
                      <p class="card__input-deadline-wrap">
                        <span class="card__date">${date}</span>
                        <span class="card__time">${time}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>`
  );
};

export default class Task {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTask(this._task);
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
