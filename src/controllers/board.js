import NoTasksComponent from "../components/no-task";
import TasksComponent from "../components/tasks";
import MoreButtonComponent from "../components/button-more";
import SortComponent from "../components/sort";
import TaskController from "./task";

import {OptionTasks, Place, Mode as TaskControllerMode, emptyTask} from "../components/consts";

import {remove, render} from "../utils/render";
import {getSortedTasks} from "../utils/common";

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task, TaskControllerMode.DEFAULT);

    return taskController;
  });
};

class BoardController {
  constructor(container, tasksModel, api) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._api = api;

    this._showedTaskControllers = [];
    this._state = OptionTasks.MORE_SHOW;
    this._creatingTask = null;

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

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
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

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._tasksComponent.getElement();
    this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingTask.render(emptyTask, TaskControllerMode.ADDING);
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
    remove(this._loadMoreButtonComponent);

    if (OptionTasks.START_SHOW >= this._tasksModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, Place.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._onMoreView);
  }

  _editTask(taskModel, id, taskController) {
    const isSuccess = this._tasksModel.updateTask(id, taskModel);

    if (isSuccess) {
      taskController.render(taskModel, TaskControllerMode.DEFAULT);
      this._updateTasks(this._state);
    }
  }

  _changeTask(taskController, oldData, newData) {
    this._api.updateTask(oldData.id, newData)
      .then((response) => this._editTask(response, oldData.id, taskController))
      .catch(taskController.shake);
  }

  _addTaskCallback(taskModel, taskController) {
    this._tasksModel.addTask(taskModel);
    taskController.render(taskModel, TaskControllerMode.DEFAULT);

    if (this._state % OptionTasks.MORE_SHOW === 0) {
      const destroyedTask = this._showedTaskControllers.pop();
      destroyedTask.destroy();
    }

    this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
    this._state = this._showedTaskControllers.length;

    this._renderLoadMoreButton();
  }

  _addTask(taskController, oldData, newData) {
    this._creatingTask = null;

    if (newData === null) {
      taskController.destroy();
      this._updateTasks(this._state);
    } else {
      this._api.createTask(newData)
        .then((response) => this._addTaskCallback(response, taskController))
        .catch(taskController.shake);
    }
  }

  _deleteApiTask(id) {
    this._tasksModel.removeTask(id);
    this._updateTasks(this._state);
  }

  _deleteTask(taskController, oldData) {
    this._api.deleteTask(oldData.id)
      .then(() => this._deleteApiTask(oldData.id))
      .catch(taskController.shake);
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
    this._state = OptionTasks.MORE_SHOW;
    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._state);

    this._removeTasks();
    this._renderTasks(sortedTasks);

    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    if (oldData === emptyTask) {
      this._addTask(taskController, oldData, newData);
    } else if (newData === null) {
      this._deleteTask(taskController, oldData);
    } else {
      this._changeTask(taskController, oldData, newData);
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
