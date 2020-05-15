import API from "./api";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import SiteMenuComponent from "./components/menu.js";
import StatisticsComponent from "./components/statistics";
import TasksModel from "./models/tasks.js";
import {render} from "./utils/render";
import {getDateFrom} from "./utils/common";
import {Place, MenuItem, AUTHORIZATION} from "./components/consts";

const dateTo = new Date();
const dateFrom = getDateFrom(dateTo);

const api = new API(AUTHORIZATION);
const tasksModel = new TasksModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
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

api.getTasks()
.then((tasks) => {
  tasksModel.setTasks(tasks);
  boardController.render();
});
