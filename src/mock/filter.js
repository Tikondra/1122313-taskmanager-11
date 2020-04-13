import {FILTER_NAMES} from "../components/consts";

const MAX_FILTER_COUNT = 15;

const generateFilters = () => {
  return FILTER_NAMES.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * MAX_FILTER_COUNT),
    };
  });
};

export {generateFilters};
