import AbstractComponent from "./abstract-component";

const createButtonMore = () => (`<button class="load-more" type="button">load more</button>`);

class ButtonMore extends AbstractComponent {
  getTemplate() {
    return createButtonMore();
  }
}

export default ButtonMore;
