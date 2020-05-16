import TaskComponent from "../components/task";
import TaskEditComponent from "../components/task-edit";
import TaskModel from "../models/task";
import {render, replace, remove} from "../utils/render";
import {isEscKey} from "../utils/common";
import {Place, Mode, emptyTask, OptionTasks, Format} from "../components/consts";

const parseFormData = (formData) => {
  const date = formData.get(`date`);
  const repeatingDays = OptionTasks.DAYS.reduce((acc, day) => {
    acc[day] = false;
    return acc;
  }, {});

  return new TaskModel({
    "description": formData.get(`text`),
    "due_date": date ? new Date(date) : null,
    "repeating_days": formData.getAll(`repeat`).reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, repeatingDays),
    "color": formData.get(`color`),
    "is_favorite": false,
    "is_done": false,
  });
};

class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._taskComponent = null;
    this._taskEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(task, mode) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;
    this._mode = mode;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._addListeners(task);

    switch (mode) {
      case Mode.DEFAULT:
        if (oldTaskEditComponent && oldTaskComponent) {
          replace(this._taskComponent, oldTaskComponent);
          replace(this._taskEditComponent, oldTaskEditComponent);
          this._replaceEditToTask();
        } else {
          render(this._container, this._taskComponent, Place.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldTaskEditComponent && oldTaskComponent) {
          remove(oldTaskComponent);
          remove(oldTaskEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._taskEditComponent, Place.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  destroy() {
    remove(this._taskEditComponent);
    remove(this._taskComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._taskEditComponent.getElement().style.animation = `shake ${Format.SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._taskComponent.getElement().style.animation = `shake ${Format.SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(this._setTimeout, Format.SHAKE_ANIMATION_TIMEOUT);
  }

  _setTimeout() {
    this._taskEditComponent.getElement().style.animation = ``;
    this._taskComponent.getElement().style.animation = ``;

    this._taskEditComponent.setData({
      saveButtonText: `Save`,
      deleteButtonText: `Delete`,
    });
  }

  _addListeners(task) {
    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isArchive = !newTask.isArchive;

      this._onDataChange(this, task, newTask);
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isFavorite = !newTask.isFavorite;

      this._onDataChange(this, task, newTask);
    });

    this._taskEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._taskEditComponent.getData();
      const data = parseFormData(formData);

      this._taskEditComponent.setData({
        SAVE_BTN: `Saving...`,
      });

      this._onDataChange(this, task, data);
    });

    this._taskEditComponent.setDeleteButtonClickHandler(() => {
      this._taskEditComponent.setData({
        DELETE_BTN: `Deleting...`,
      });

      this._onDataChange(this, task, null);
    });
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _replaceEditToTask() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._taskEditComponent.reset();

    if (document.contains(this._taskEditComponent.getElement())) {
      replace(this._taskComponent, this._taskEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt.key)) {
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, emptyTask, null);
      }
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default TaskController;
