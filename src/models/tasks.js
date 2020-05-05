class Tasks {
  constructor() {
    this._tasks = [];

    this._dataChangeHandlers = [];
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);
    const from = this._tasks.slice(0, index);
    const to = this._tasks.slice(index + 1);

    if (index === -1) {
      return false;
    }

    this._tasks = [...from, task, ...to];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Tasks;
