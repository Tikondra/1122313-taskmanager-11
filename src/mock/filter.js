import {FILTER_NAMES} from "../components/consts";

const MAX_FILTER_COUNT = 15;

const getFilter = (filter) => ({name: filter, count: Math.floor(Math.random() * MAX_FILTER_COUNT)});

const generateFilters = () => FILTER_NAMES.map((name) => getFilter(name));

export {generateFilters};
