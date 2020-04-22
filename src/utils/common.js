import {OptionTasks, Format} from "../components/consts";

export const isTrue = () => Math.random() > 0.5;

export const getRandomIntegerNumber = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const castTimeFormat = (value) => value < Format.LESS_TEN ? `0${value}` : String(value);

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getDataTask = (dueDate, repeatingDays) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${OptionTasks.MONTH[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return {
    date,
    time,
    repeatClass,
    deadlineClass,
    isDateShowing,
    isRepeatingTask,
  };
};
