import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import NoTasksComponent from "../components/no-task";
import TasksComponent from "../components/tasks";
import MoreButtonComponent from "../components/button-more";
import SortComponent from "../components/sort";

import {OptionTasks, Place} from "../components/consts";

import {remove, render, replace} from "../utils/render";
import {getSortedTasks, isEscKey} from "../utils/common";

let openTask;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
    openTask = true;
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
    openTask = null;
  };

  const onEscKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
      openTask = null;
    }
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    if (!openTask) {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, Place.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new MoreButtonComponent();

    this._state = OptionTasks.MORE_SHOW;

    this.onMoreView = this.onMoreView.bind(this);
    this.onSortRender = this.onSortRender.bind(this);
    this.renderLoadMoreButton = this.renderLoadMoreButton.bind(this);
  }

  onMoreView(taskListElement, tasks) {
    const prevTasksCount = this._state;
    this._state += OptionTasks.MORE_SHOW;

    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._state);

    renderTasks(taskListElement, sortedTasks);

    if (this._state >= tasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  onSortRender(taskListElement, tasks, sortType) {
    this._state = OptionTasks.MORE_SHOW;

    const sortedTasks = getSortedTasks(tasks, sortType, 0, this._state);

    taskListElement.innerHTML = ``;

    renderTasks(taskListElement, sortedTasks);
    this.renderLoadMoreButton(tasks, taskListElement);
  }

  renderLoadMoreButton(tasks, taskListElement) {
    const container = this._container.getElement();

    if (OptionTasks.START_SHOW >= tasks.length) {
      return;
    }

    render(container, this._loadMoreButtonComponent, Place.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this.onMoreView.bind(this, taskListElement, tasks));
  }

  render(tasks) {
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    const container = this._container.getElement();
    const taskListElement = this._tasksComponent.getElement();

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, Place.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, Place.BEFOREEND);
    render(container, this._tasksComponent, Place.BEFOREEND);

    renderTasks(taskListElement, tasks.slice(0, this._state));
    this.renderLoadMoreButton(tasks, taskListElement);

    this._loadMoreButtonComponent.setClickHandler(this.onMoreView.bind(this, taskListElement, tasks));
    this._sortComponent.setSortTypeChangeHandler(this.onSortRender.bind(this, taskListElement, tasks));
  }
}

export default BoardController;
