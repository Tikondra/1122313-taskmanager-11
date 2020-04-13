import {createMenu} from "./components/menu";
import {createFilters} from "./components/filter";
import {createBoard} from "./components/board";
import {createTaskEdit} from "./components/task-edit";
import {createButtonMore} from "./components/button-more";
import {createTask} from "./components/task";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

import {OptionTasks, Place} from "./components/consts";

import {renderCard, render} from "./components/utils";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(OptionTasks.COUNT);
const tasksCopy = tasks.slice(OptionTasks.START_SHOW);

const init = () => {
  render(siteHeaderElement, createMenu(), Place.BEFOREEND);
  render(siteMainElement, createFilters(filters), Place.BEFOREEND);
  render(siteMainElement, createBoard(), Place.BEFOREEND);

  const taskListElement = siteMainElement.querySelector(`.board__tasks`);
  const boardElement = siteMainElement.querySelector(`.board`);

  render(taskListElement, createTaskEdit(tasks[0]), Place.BEFOREEND);
  renderCard(taskListElement, OptionTasks.START_SHOW);
  render(boardElement, createButtonMore(), Place.BEFOREEND);

  const loadMoreButton = boardElement.querySelector(`.load-more`);
  const onMoreView = () => {
    tasksCopy.splice(0, OptionTasks.MORE_SHOW)
      .forEach((task) => render(taskListElement, createTask(task), Place.BEFOREEND));

    if (tasksCopy.length === 0) {
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener(`click`, onMoreView);
};

init();
