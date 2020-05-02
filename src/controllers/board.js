import NoTasksComponent from "../components/no-task";
import TasksComponent from "../components/tasks";
import MoreButtonComponent from "../components/button-more";
import SortComponent from "../components/sort";
import TaskController from "./task";

import {OptionTasks, Place} from "../components/consts";

import {remove, render} from "../utils/render";
import {getSortedTasks} from "../utils/common";

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);

    return taskController;
  });
};

class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._state = OptionTasks.MORE_SHOW;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new MoreButtonComponent();

    this._onSortRender = this._onSortRender.bind(this);
    this._onMoreView = this._onMoreView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortRender);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, Place.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, Place.BEFOREEND);
    render(container, this._tasksComponent, Place.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._state), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    const container = this._container.getElement();

    if (OptionTasks.START_SHOW >= this._tasks.length) {
      return;
    }

    render(container, this._loadMoreButtonComponent, Place.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._onMoreView);
  }

  _onMoreView() {
    const taskListElement = this._tasksComponent.getElement();
    const prevTasksCount = this._state;
    this._state += OptionTasks.MORE_SHOW;

    const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._state);
    const newTask = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);

    this._showedTaskControllers = this._showedTaskControllers.concat(newTask);

    if (this._state >= this._tasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onSortRender(sortType) {
    const taskListElement = this._tasksComponent.getElement();
    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._state);
    this._state = OptionTasks.MORE_SHOW;

    taskListElement.innerHTML = ``;

    this._showedTaskControllers = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}

export default BoardController;
