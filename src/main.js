import {createMenu} from "./components/menu";
import {createFilter} from "./components/filter";
import {createBoard} from "./components/board";
import {createTask} from "./components/task";
import {createTaskEdit} from "./components/task-edit";
import {createButtonMore} from "./components/button-more";

const TASK_COUNT = 3;

const Place = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderCard = (container, count) => {
  for (let i = 0; i < count; i++) {
    render(container, createTask(), Place.BEFOREEND);
  }
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

const init = () => {
  render(siteHeaderElement, createMenu(), Place.BEFOREEND);
  render(siteMainElement, createFilter(), Place.BEFOREEND);
  render(siteMainElement, createBoard(), Place.BEFOREEND);

  const taskListElement = siteMainElement.querySelector(`.board__tasks`);
  const boardElement = siteMainElement.querySelector(`.board`);

  render(taskListElement, createTaskEdit(), Place.BEFOREEND);
  renderCard(taskListElement, TASK_COUNT);
  render(boardElement, createButtonMore(), Place.BEFOREEND);
};

init();
