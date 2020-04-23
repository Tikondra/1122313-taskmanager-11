import AbstractComponent from "./abstract-component";

const createBoard = () => `<section class="board container"></section>`;

class Board extends AbstractComponent {
  getTemplate() {
    return createBoard();
  }
}

export default Board;
