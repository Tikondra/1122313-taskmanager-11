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
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortRender);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, Place.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, Place.BEFOREEND);
    render(container, this._tasksComponent, Place.BEFOREEND);

    this._renderTasks(tasks.slice(0, this._state));
    this._renderLoadMoreButton();
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _renderTasks(tasks) {
    const taskListElement = this._tasksComponent.getElement();

    const newTasks = renderTasks(taskListElement, tasks, this._onDataChange, this._onViewChange);

    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._state = this._showedTaskControllers.length;
  }

  _renderLoadMoreButton() {
    const container = this._container.getElement();

    if (OptionTasks.START_SHOW >= this._tasksModel.getTasks().length) {
      return;
    }

    render(container, this._loadMoreButtonComponent, Place.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._onMoreView);
  }

  _onMoreView() {
    const taskListElement = this._tasksComponent.getElement();
    const prevTasksCount = this._state;
    const tasks = this._tasksModel.getTasks();
    this._state += OptionTasks.MORE_SHOW;

    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._state);
    const newTask = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);

    this._showedTaskControllers = this._showedTaskControllers.concat(newTask);

    if (this._state >= tasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onSortRender(sortType) {
    const taskListElement = this._tasksComponent.getElement();
    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._state);
    this._state = OptionTasks.MORE_SHOW;

    taskListElement.innerHTML = ``;

    this._showedTaskControllers = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

    if (isSuccess) {
      taskController.render(newData);
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updateTasks(OptionTasks.START_SHOW);
  }
}

export default BoardController;
