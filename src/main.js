import {createMenu} from "./components/menu";
import {createFilters} from "./components/filter";
import {createBoard} from "./components/board";
import {createTaskEdit} from "./components/task-edit";
import {createButtonMore} from "./components/button-more";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

import {TASK_COUNT, Place, START_SHOW_TASK, MORE_SHOW_TASK} from "./components/consts";

import {renderCard, render} from "./components/utils";
import {createTask} from "./components/task";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
const tasksCopy = tasks.slice(START_SHOW_TASK);

const init = () => {
  render(siteHeaderElement, createMenu(), Place.BEFOREEND);
  render(siteMainElement, createFilters(filters), Place.BEFOREEND);
  render(siteMainElement, createBoard(), Place.BEFOREEND);

  const taskListElement = siteMainElement.querySelector(`.board__tasks`);
  const boardElement = siteMainElement.querySelector(`.board`);

  render(taskListElement, createTaskEdit(tasks[0]), Place.BEFOREEND);
  renderCard(taskListElement, START_SHOW_TASK);
  render(boardElement, createButtonMore(), Place.BEFOREEND);

  const loadMoreButton = boardElement.querySelector(`.load-more`);
  const onMoreView = () => {
    tasksCopy.splice(0, MORE_SHOW_TASK)
      .forEach((task) => render(taskListElement, createTask(task), Place.BEFOREEND));

    if (tasksCopy.length === 0) {
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener(`click`, onMoreView);
};

init();
