import {createMenu} from "./components/menu";
import {createFilter} from "./components/filter";
import {createBoard} from "./components/board";
import {createTaskEdit} from "./components/task-edit";
import {createButtonMore} from "./components/button-more";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

import {TASK_COUNT, Place} from "./components/consts";

import {renderCard, render} from "./components/utils";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const init = () => {
  render(siteHeaderElement, createMenu(), Place.BEFOREEND);
  render(siteMainElement, createFilter(filters), Place.BEFOREEND);
  render(siteMainElement, createBoard(), Place.BEFOREEND);

  const taskListElement = siteMainElement.querySelector(`.board__tasks`);
  const boardElement = siteMainElement.querySelector(`.board`);

  render(taskListElement, createTaskEdit(tasks[0]), Place.BEFOREEND);
  renderCard(taskListElement, tasks.length);
  render(boardElement, createButtonMore(), Place.BEFOREEND);
};

init();
