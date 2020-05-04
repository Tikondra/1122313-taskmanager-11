import {SortType, EvtKey} from "../components/consts";
import moment from "moment";

export const isTrue = () => Math.random() > 0.5;

export const isEscKey = (currentKey) => currentKey === EvtKey.ESC;

export const getRandomIntegerNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const getDataTask = (dueDate, isRepeatingTask, isDateShowing) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return {
    date,
    time,
    repeatClass,
    deadlineClass
  };
};

export const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};
