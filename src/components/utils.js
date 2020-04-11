import {createTask} from "./task";
import {generateTasks} from "../mock/task";
import {TASK_COUNT, Place, MONTH} from "./consts";

const tasks = generateTasks(TASK_COUNT);

const renderCard = (container, count) => {
  for (let i = 1; i < count; i++) {
    render(container, createTask(tasks[i]), Place.BEFOREEND);
  }
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getDataTask = (dueDate, repeatingDays) => {
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

export {renderCard, render, formatTime, getDataTask};
