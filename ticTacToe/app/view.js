const view = {
  body: document.body,
  cells: document.getElementById('board').getElementsByTagName('td'),
  xPlayerLabel: document.querySelector('#labels .x'),
  oPlayerLabel: document.querySelector('#labels .o'),
  oPlayerScore: document.querySelector('.o-score'),
  xPlayerScore: document.querySelector('.x-score'),
  modal: document.querySelector('#round-end-modal'),
  message: document.querySelector('#win-message'),
  continue: document.querySelector('#round-end-modal #continue'),

  setWinningMessage(message) {
    this.message.textContent = message;
  },

  doMarkCell(cell, mark) {
    cell.classList.add(mark.toLowerCase());
    cell.textContent = mark;
  },

  unHighlightCurrentPlayer(currentPlayer) {
    this.getPlayerLabel(currentPlayer).classList.remove('current-player');
  },

  highlightCurrentPlayer(currentPlayer) {
    this.getPlayerLabel(currentPlayer).classList.add('current-player');
  },

  showModal() {
    this.modal.style.display = 'flex';
  },

  reset() {
    for (const cell of this.cells) {
      cell.textContent = '';
      cell.classList.remove('winning-cell');
      cell.classList.remove('x');
      cell.classList.remove('o');
    }
    this.message.textContent = '';
    this.modal.style.display = 'none';
  },

  getCellByI(i0, i1) {
    return document.getElementById('board').rows[i0].cells[i1];
  },

  highlightCells(cellIs) {
    for (const cellI of cellIs) {
      this.getCellByI(...cellI).classList.add('winning-cell');
    }
  },

  getPlayerLabel(player) {
    if (player === 'X') {
      return this.xPlayerLabel;
    } else {
      return this.oPlayerLabel;
    }
  },

  setPlayerScore(player, score) {
    this.getPlayerScore(player).textContent = score;
  },

  getPlayerScore(player) {
    if (player === 'X') {
      return this.xPlayerScore;
    } else {
      return this.oPlayerScore;
    }
  }
};

export default view;