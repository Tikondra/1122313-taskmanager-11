import {getDataTask} from "../utils/common";
import {encode} from "he";
import AbstractComponent from "./abstract-component";

const createButtonMarkup = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
     >
      ${name}
    </button>`
  );
};

const createTask = (task) => {
  const {description: notSanitizedDescription, dueDate, color, repeatingDays} = task;
  const {date, time, repeatClass, deadlineClass} = getDataTask(dueDate, repeatingDays);

  const editButton = createButtonMarkup(`edit`);
  const archiveButton = createButtonMarkup(`archive`, !task.isArchive);
  const favoritesButton = createButtonMarkup(`favorites`, !task.isFavorite);
  const description = encode(notSanitizedDescription);

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
          <div class="card__form">
            <div class="card__inner">
              <div class="card__control">
                ${editButton}
                ${archiveButton}
                ${favoritesButton}
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

class Task extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTask(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }
}

export default Task;
