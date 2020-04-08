import {createTask} from "./task";
import {generateTasks} from "../mock/task";
import {TASK_COUNT, Place} from "./consts";

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

export {renderCard, render, formatTime};
