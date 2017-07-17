import model from './model';
import view from './view';

const controller = {
  view,
  model,

  reset() {
    this.model.reset();
    this.view.reset();
  },

  makeMove(event) {
    if (event.target.textContent === '') {
      this.view.doMarkCell(event.target, this.model.currentPlayer);
      this.model.doMark(event.target.parentNode.rowIndex, event.target.cellIndex);
      if (this.model.checkWinner()) {
        this.view.setPlayerScore(this.model.winner, this.model.scores[this.model.winner]);
        this.view.highlightCells(this.model.winningIs);
        this.view.setWinningMessage(`${this.model.winner} won!`);
        this.view.showModal();
        return;
      }
      this.toggleCurrentPlayer();
    }
  },

  toggleCurrentPlayer() {
    this.view.unHighlightCurrentPlayer(this.model.currentPlayer);
    this.model.toggleCurrentPlayer();
    this.view.highlightCurrentPlayer(this.model.currentPlayer);
  },

  run() {
    for (const cell of this.view.cells) {
      cell.addEventListener('click', this.makeMove.bind(this));
    }

    view.modal.addEventListener('click',
      () => {
        this.reset();
      });
  }

};

controller.run();
