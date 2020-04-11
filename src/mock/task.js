import {COLORS, DAYS, DATE_RANGE, POSITIVE, NEGATIVE} from "../components/consts";
import {isTrue, getRandomIntegerNumber, getRandomArrayItem} from "../components/utils";

const DESCRIPTION_ITEMS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DEFAULT_REPEAT_DAYS = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const getDay = (days, day) => Object.assign(days, {[day]: isTrue()});

const generateRepeatingDays = () => DAYS.reduce(getDay, {});

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = isTrue() ? POSITIVE : NEGATIVE;
  const diffValue = sign * getRandomIntegerNumber(DATE_RANGE);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateTask = () => {
  const dueDate = isTrue() ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DESCRIPTION_ITEMS),
    dueDate,
    repeatingDays: dueDate ? DEFAULT_REPEAT_DAYS : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: isTrue(),
    isFavorite: isTrue(),
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
