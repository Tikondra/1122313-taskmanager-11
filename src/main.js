import BoardComponent from "./components/board.js";
import FilterComponent from "./components/filter.js";
import SiteMenuComponent from "./components/menu.js";
import BoardController from "./controllers/board";
import TasksModel from "./models/tasks.js";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

import {OptionTasks, Place} from "./components/consts";

import {render} from "./utils/render";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(OptionTasks.COUNT);
const tasksModel = new TasksModel();

tasksModel.setTasks(tasks);

render(siteHeaderElement, new SiteMenuComponent(), Place.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), Place.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

render(siteMainElement, boardComponent, Place.BEFOREEND);

boardController.render(tasks);
