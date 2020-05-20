import Task from "../models/task";
import {Code, Method, ApiOption} from "../components/consts";

const checkStatus = (response) => {
  if (response.status >= Code.OK && response.status < Code.NOT_OK) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const getConfigFetch = (data, url, method) => {
  return {
    url,
    method,
    body: JSON.stringify(data.toRAW()),
    headers: new Headers(ApiOption.CONTENT_TYPE)
  };
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({url: ApiOption.TASKS})
      .then((response) => response.json())
      .then(Task.parseTasks)
      .catch((err) => {
        throw err;
      });
  }

  createTask(task) {
    return this._load(getConfigFetch(task, ApiOption.TASKS, Method.POST))
      .then((response) => response.json())
      .then(Task.parseTask)
      .catch((err) => {
        throw err;
      });
  }

  updateTask(id, data) {
    return this._load(getConfigFetch(data, `${ApiOption.TASKS}/${id}`, Method.PUT))
      .then((response) => response.json())
      .then(Task.parseTask)
      .catch((err) => {
        throw err;
      });
  }

  deleteTask(id) {
    return this._load({url: `${ApiOption.TASKS}/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._load({
      url: `tasks/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
