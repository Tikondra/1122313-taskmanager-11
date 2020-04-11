import {createTask} from "./task";
import {generateTasks} from "../mock/task";
import {TASK_COUNT, Place, MONTH, LESS_TEN} from "./consts";

const tasks = generateTasks(TASK_COUNT);

export const renderCard = (container, count) => {
  for (let i = 0; i < count; i++) {
    render(container, createTask(tasks[i]), Place.BEFOREEND);
  }
};

export const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const castTimeFormat = (value) => value < LESS_TEN ? `0${value}` : String(value);

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getDataTask = (dueDate, repeatingDays) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return {
    date,
    time,
    repeatClass,
    deadlineClass,
    isDateShowing,
    isRepeatingTask,
  };
};
