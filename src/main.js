import BoardComponent from "./components/board.js";
import FilterController from "./controllers/filter";
import SiteMenuComponent from "./components/menu.js";
import StatisticsComponent from "./components/statistics";
import BoardController from "./controllers/board";
import TasksModel from "./models/tasks.js";

import {generateTasks} from "./mock/task";

import {OptionTasks, Place, MenuItem} from "./components/consts";

import {render} from "./utils/render";
import {getDateFrom} from "./utils/common";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

render(siteHeaderElement, siteMenuComponent, Place.BEFOREEND);

const tasks = generateTasks(OptionTasks.COUNT);
const tasksModel = new TasksModel();

tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);

filterController.render();

const boardComponent = new BoardComponent();

render(siteMainElement, boardComponent, Place.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render();

const dateTo = new Date();
const dateFrom = getDateFrom(dateTo);

const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});
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

