export const FILTER_NAMES = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];
export const HIDDEN_CLASS = `visually-hidden`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;

export const Color = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

export const Month = {
  JANUARY: `January`,
  FEBRUARY: `February`,
  MARCH: `March`,
  APRIL: `April`,
  MAY: `May`,
  JUNE: `June`,
  JULY: `July`,
  AUGUST: `August`,
  SEPTEMBER: `September`,
  OCTOBER: `October`,
  NOVEMBER: `November`,
  DECEMBER: `December`
};

export const OptionTasks = {
  COUNT: 17,
  START_SHOW: 8,
  MORE_SHOW: 8,
  SELECT_DAY: `today`,
  DAYS: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`],
  COLORS: Object.values(Color),
  MONTH: Object.values(Month),
  MIN_DESCRIPTION_LENGTH: 1,
  MAX_DESCRIPTION_LENGTH: 240
};

export const ApiOption = {
  TASKS: `tasks`,
  END_POINT: `https://11.ecmascript.pages.academy/task-manager`,
  AUTHORIZATION: `Basic hgdjfh786kjds55fsldjfls`,
  CONTENT_TYPE: {"Content-Type": `application/json`},
  STORE_NAME: `${STORE_PREFIX}-${STORE_VER}`,
  SUNC: `tasks/sync`
};

export const Format = {
  LESS_TEN: 10,
  DATE_RANGE: 8,
  POSITIVE: 1,
  NEGATIVE: -1,
  TIME: `hh:mm`,
  DATE: `DD MMMM`,
  SHAKE_ANIMATION_TIMEOUT: 600,
};

export const Place = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

export const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TODAY: `today`,
};

export const EvtKey = {
  ESC: `Escape`
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`
};

export const MenuItem = {
  NEW_TASK: `control__new-task`,
  STATISTICS: `control__statistic`,
  TASKS: `control__task`,
};

export const emptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    "mo": false,
    "tu": false,
    "we": false,
    "th": false,
    "fr": false,
    "sa": false,
    "su": false,
  },
  color: Color.BLACK,
  isFavorite: false,
  isArchive: false,
};

export const ColorToHex = {
  black: `#000000`,
  blue: `#0c5cdd`,
  green: `#31b55c`,
  pink: `#ff3cb9`,
  yellow: `#ffe125`,
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const Code = {
  OK: 200,
  NOT_OK: 300
};

export const DefaultData = {
  DELETE_BTN: `Delete`,
  SAVE_BTN: `Save`,
};
