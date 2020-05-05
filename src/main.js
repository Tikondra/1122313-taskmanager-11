import BoardComponent from "./components/board.js";
import FilterController from "./controllers/filter";
import SiteMenuComponent from "./components/menu.js";
import BoardController from "./controllers/board";
import TasksModel from "./models/tasks.js";

import {generateTasks} from "./mock/task";

import {OptionTasks, Place} from "./components/consts";

import {render} from "./utils/render";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), Place.BEFOREEND);

const tasks = generateTasks(OptionTasks.COUNT);
const tasksModel = new TasksModel();

tasksModel.setTasks(tasks);

const filterController = new FilterController(siteMainElement, tasksModel);

filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, Place.BEFOREEND);

boardController.render(tasks);
