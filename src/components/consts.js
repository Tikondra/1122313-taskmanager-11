export const FILTER_NAMES = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

export const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};
export const OptionTasks = {
  COUNT: 17,
  START_SHOW: 8,
  MORE_SHOW: 8,
  SELECT_DAY: `today`,
  DAYS: [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`],
  COLORS: Object.values(COLOR),
  MONTH: [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ],
  MIN_DESCRIPTION_LENGTH: 1,
  MAX_DESCRIPTION_LENGTH: 240
};
export const Format = {
  LESS_TEN: 10,
  DATE_RANGE: 8,
  POSITIVE: 1,
  NEGATIVE: -1,
  TIME: `hh:mm`,
  DATE: `DD MMMM`
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
export const EmptyTask = {
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
  color: COLOR.BLACK,
  isFavorite: false,
  isArchive: false,
};
