import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import MoreButtonComponent from "./components/button-more.js";
import TaskEditComponent from "./components/task-edit.js";
import TaskComponent from "./components/task.js";
import TasksComponent from "./components/tasks.js";
import SiteMenuComponent from "./components/menu.js";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

import {OptionTasks, Place} from "./components/consts";

import {render} from "./components/utils";

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, replaceTaskToEdit);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), Place.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new TasksComponent().getElement(), Place.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  tasks.slice(0, OptionTasks.START_SHOW)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new MoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), Place.BEFOREEND);

  const onMoreView = () => {
    tasksCopy.splice(0, OptionTasks.MORE_SHOW)
      .forEach((task) => renderTask(taskListElement, task));

    if (tasksCopy.length === 0) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  };

  loadMoreButtonComponent.getElement().addEventListener(`click`, onMoreView);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(OptionTasks.COUNT);
const tasksCopy = tasks.slice(OptionTasks.START_SHOW);

render(siteHeaderElement, new SiteMenuComponent().getElement(), Place.BEFOREEND);
render(siteMainElement, new FilterComponent(filters).getElement(), Place.BEFOREEND);

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent.getElement(), Place.BEFOREEND);

renderBoard(boardComponent, tasks);
