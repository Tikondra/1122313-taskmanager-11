import {OptionTasks} from "./consts";
import {getDataTask} from "./utils";
import {creatColorMarkup} from "./color-markup";
import {createRepeatDays} from "./repeat-days";
import {renderDateShow} from "./date-show";
import {renderRepeatTask} from "./repeat-task";
import AbstractComponent from "./abstract-component";

const createTaskEdit = (task) => {
  const {description, dueDate, color, repeatingDays} = task;
  const {date, time, repeatClass, deadlineClass, isDateShowing, isRepeatingTask} = getDataTask(dueDate, repeatingDays);

  const colorsMarkup = creatColorMarkup(OptionTasks.COLORS, color);
  const repeatDays = createRepeatDays(OptionTasks.DAYS, repeatingDays);

  const getFlag = (exist) => exist ? `yes` : `no`;

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
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );
};

class TaskEdit extends AbstractComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskEdit(this._task);
  }
}

export default TaskEdit;
