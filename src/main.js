import {createMenu} from "./components/menu";
import {createFilter} from "./components/filter";
import {createBoard} from "./components/board";
import {createTaskEdit} from "./components/task-edit";
import {createButtonMore} from "./components/button-more";

import {TASK_COUNT, Place} from "./components/consts";

import {renderCard, render} from "./components/utils";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

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
