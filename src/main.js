import API from "./api/api";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import Provider from "./api/provider";
import SiteMenuComponent from "./components/menu.js";
import StatisticsComponent from "./components/statistics";
import Store from "./api/store";
import TasksModel from "./models/tasks.js";
import {render} from "./utils/render";
import {getDateFrom} from "./utils/common";
import {Place, MenuItem, ApiOption} from "./components/consts";

const dateTo = new Date();
const dateFrom = getDateFrom(dateTo);

const api = new API(ApiOption.END_POINT, ApiOption.AUTHORIZATION);
const store = new Store(ApiOption.STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel, apiWithProvider);
const filterController = new FilterController(siteMainElement, tasksModel);

render(siteHeaderElement, siteMenuComponent, Place.BEFOREEND);
filterController.render();
render(siteMainElement, boardComponent, Place.BEFOREEND);
render(siteMainElement, statisticsComponent, Place.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});

apiWithProvider.getTasks()
.then((tasks) => {
  tasksModel.setTasks(tasks);
  boardController.render();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/1122313-taskmanager-11/14/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
