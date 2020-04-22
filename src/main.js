import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import MoreButtonComponent from "./components/button-more.js";
import TaskEditComponent from "./components/task-edit.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/tasks.js";
import SiteMenuComponent from "./components/menu.js";
import NoTasksComponent from "./components/no-task.js";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

import {OptionTasks, Place} from "./components/consts";

import {render, replace, remove} from "./utils/render";

let openTask;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    if (openTask) {
      replace(taskListElement, openTask[0], openTask[1]);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
    openTask = [taskComponent.getElement(), taskEditComponent.getElement()];
    replace(taskListElement, taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    replace(taskListElement, taskComponent.getElement(), taskEditComponent.getElement());
    openTask = null;
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
      openTask = null;
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, Place.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasksComponent(), Place.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new TasksComponent(), Place.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  tasks.slice(0, OptionTasks.START_SHOW)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new MoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent, Place.BEFOREEND);

  const onMoreView = () => {
    tasksCopy.splice(0, OptionTasks.MORE_SHOW)
      .forEach((task) => renderTask(taskListElement, task));

    if (tasksCopy.length === 0) {
      remove(loadMoreButtonComponent);
    }
  };

  loadMoreButtonComponent.getElement().addEventListener(`click`, onMoreView);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(OptionTasks.COUNT);
const tasksCopy = tasks.slice(OptionTasks.START_SHOW);

render(siteHeaderElement, new SiteMenuComponent(), Place.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), Place.BEFOREEND);

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent, Place.BEFOREEND);

renderBoard(boardComponent, tasks);
