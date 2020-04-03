import {createTask} from "./task";
import {Place} from "./consts";

const renderCard = (container, count) => {
  for (let i = 0; i < count; i++) {
    render(container, createTask(), Place.BEFOREEND);
  }
};

const render = (container, template, place) => container.insertAdjacentHTML(place, template);

export {renderCard, render};
