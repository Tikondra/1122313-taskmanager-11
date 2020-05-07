import BoardComponent from "./components/board.js";
import FilterController from "./controllers/filter";
import SiteMenuComponent from "./components/menu.js";
import BoardController from "./controllers/board";
import TasksModel from "./models/tasks.js";

import {generateTasks} from "./mock/task";

import {OptionTasks, Place, MenuItem} from "./components/consts";

import {render} from "./utils/render";

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

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
