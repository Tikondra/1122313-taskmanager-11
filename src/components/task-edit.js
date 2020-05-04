import {OptionTasks} from "./consts";
import {getDataTask} from "../utils/common";
import {creatColorMarkup} from "./color-markup";
import {createRepeatDays} from "./repeat-days";
import {renderDateShow} from "./date-show";
import {renderRepeatTask} from "./repeat-task";
import AbstractSmartComponent from "./abstract-smart-component";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const createTaskEdit = (task, options = {}) => {
  const {description, dueDate} = task;
  const {isDateShowing, isRepeatingTask, activeRepeatingDays, activeColor} = options;
  const {date, time, repeatClass, deadlineClass} = getDataTask(dueDate, isRepeatingTask, isDateShowing);

  const isBlockSaveButton = (isDateShowing && isRepeatingTask) ||
    (isRepeatingTask && !isRepeating(activeRepeatingDays));

  const colorsMarkup = creatColorMarkup(OptionTasks.COLORS, activeColor);
  const repeatDays = createRepeatDays(OptionTasks.DAYS, activeRepeatingDays);

  const getFlag = (exist) => exist ? `yes` : `no`;

  return (
    `<article class="card card--edit card--${activeColor} ${repeatClass} ${deadlineClass}">
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
                date: <span class="card__date-status">${getFlag(isDateShowing)}</span>
              </button>
              ${renderDateShow(isDateShowing, date, time)}
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${getFlag(isRepeatingTask)}</span>
              </button>
              ${renderRepeatTask(isRepeatingTask, repeatDays)}
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${colorsMarkup}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit" ${isBlockSaveButton ? `disabled` : ``}>save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );
};

class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._activeColor = task.color;
    this._flatpickr = null;
    this._submitHandler = null;

    this._onDateShowing = this._onDateShowing.bind(this);
    this._onRepeatDaysShowing = this._onRepeatDaysShowing.bind(this);
    this._onChangeRepeatDays = this._onChangeRepeatDays.bind(this);
    this._onChangeColor = this._onChangeColor.bind(this);

    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTaskEdit(this._task, {
      isDateShowing: this._isDateShowing,
      isRepeatingTask: this._isRepeatingTask,
      activeRepeatingDays: this._activeRepeatingDays,
      activeColor: this._activeColor
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    this._activeRepeatingDays = Object.assign({}, task.repeatingDays);
    this._activeColor = task.color;

    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._dellFlatpickr();
    }

    if (this._isDateShowing) {
      this._initFlatpickr();
    }
  }

  _initFlatpickr() {
    const dateElement = this.getElement().querySelector(`.card__date`);

    this._flatpickr = flatpickr(dateElement, this._optionsFlatpickr());
  }

  _optionsFlatpickr() {
    return {
      altInput: true,
      allowInput: true,
      defaultDate: this._task.dueDate || OptionTasks.SELECT_DAY,
    };
  }

  _dellFlatpickr() {
    this._flatpickr.destroy();
    this._flatpickr = null;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onDateShowing);

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onRepeatDaysShowing);

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, this._onChangeRepeatDays);
    }

    const colors = element.querySelector(`.card__colors-wrap`);

    colors.addEventListener(`click`, this._onChangeColor);
  }

  _onDateShowing() {
    this._isDateShowing = !this._isDateShowing;

    this.rerender();
  }

  _onRepeatDaysShowing() {
    this._isRepeatingTask = !this._isRepeatingTask;

    this.rerender();
  }

  _onChangeRepeatDays(evt) {
    this._activeRepeatingDays[evt.target.value] = evt.target.checked;
    this.rerender();
  }

  _onChangeColor(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._activeColor = evt.target.value;
      this.rerender();
    }
  }
}

export default TaskEdit;
