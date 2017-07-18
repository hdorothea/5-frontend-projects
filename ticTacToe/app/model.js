class Cell {
  constructor(i, mark = '') {
    this.i = i;
    this.mark = mark;
  }
}

class Board {
  constructor() {
    this.rows = [
      [new Cell([0, 0]), new Cell([0, 1]), new Cell([0, 2])],
      [new Cell([1, 0]), new Cell([1, 1]), new Cell([1, 2])],
      [new Cell([2, 0]), new Cell([2, 1]), new Cell([2, 2])],
    ];

    this.columns = [
      [this.rows[0][0], this.rows[1][0], this.rows[2][0]],
      [this.rows[0][1], this.rows[1][1], this.rows[2][1]],
      [this.rows[0][2], this.rows[1][2], this.rows[2][2]],
    ];

    this.diagonals = [
      [this.rows[0][0], this.rows[1][1], this.rows[2][2]],
      [this.rows[0][2], this.rows[1][1], this.rows[2][0]],
    ];

    this.lines = [...this.rows, ...this.columns, ...this.diagonals];
  }
}

class Model {
  constructor() {
    this.board = new Board();
    this.currentPlayer = 'X';
    this.scores = { X: 0, O: 0 };
  }

  doMark(i0, i1) {
    this.board.rows[i0][i1].mark = this.currentPlayer;
  }

  toggleCurrentPlayer() {
    if (this.currentPlayer === 'X') {
      this.currentPlayer = 'O';
    } else {
      this.currentPlayer = 'X';
    }
  }

  reset() {
    this.board = new Board();
    this.winner = undefined;
    this.winningIs = undefined;
    this.toggleCurrentPlayer();
  }

  checkFinished() {
    return this.board.rows.map(row => row.every(cell => cell.mark !== '')).every(e => e);
  }

  checkWinner() {
    for (const line of [...this.board.lines]) {
      if ((line.every(cell => cell.mark !== '')) && line.every(cell => cell.mark === line[0].mark)) {
        this.winner = line[0].mark;
        this.scores[this.winner] += 1;
        this.winningIs = line.map(cell => cell.i);
        return true;
      }
    }
    return false;
  }
}

const model = new Model();
export default model;
