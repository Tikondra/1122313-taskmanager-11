import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import NoTasksComponent from "../components/no-task";
import TasksComponent from "../components/tasks";
import MoreButtonComponent from "../components/button-more";
import SortComponent from "../components/sort";

import {OptionTasks, Place} from "../components/consts";

import {remove, render, replace} from "../utils/render";

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
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
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

class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new MoreButtonComponent();
  }

  render(tasks) {
    const tasksCopy = tasks.slice(OptionTasks.START_SHOW);
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    const container = this._container.getElement();

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, Place.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, Place.BEFOREEND);
    render(container, this._tasksComponent, Place.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    tasks.slice(0, OptionTasks.START_SHOW)
      .forEach((task) => {
        renderTask(taskListElement, task);
      });

    render(container, this._loadMoreButtonComponent, Place.BEFOREEND);

    const onMoreView = () => {
      tasksCopy.splice(0, OptionTasks.MORE_SHOW)
        .forEach((task) => renderTask(taskListElement, task));

      if (tasksCopy.length === 0) {
        remove(this._loadMoreButtonComponent);
      }
    };

    this._loadMoreButtonComponent.setClickHandler(onMoreView);
  }
}

export default BoardController;
