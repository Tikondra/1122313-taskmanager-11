import {isRepeating, isOneDay, isOverdueDate} from "./common.js";

export const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

export const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

export const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

export const getOverdueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

export const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

export const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

const tasksByFilter = {
  all: getNotArchiveTasks,
  archive: getArchiveTasks,
  favorites: getFavoriteTasks,
  overdue: getOverdueTasks,
  repeating: getRepeatingTasks,
  today: getTasksInOneDay,
};

export const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  return tasksByFilter[filterType](tasks, nowDate);
};
