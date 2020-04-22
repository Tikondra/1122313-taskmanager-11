import {Place} from "../components/consts";

export const render = (container, component, place) => {
  switch (place) {
    case Place.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case Place.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
