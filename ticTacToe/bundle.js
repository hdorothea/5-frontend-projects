/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _model = __webpack_require__(1);

var _model2 = _interopRequireDefault(_model);

var _view = __webpack_require__(2);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {
  view: _view2.default,
  model: _model2.default,

  reset: function reset() {
    this.model.reset();
    this.view.reset();
  },
  makeMove: function makeMove(event) {
    if (event.target.textContent === '') {
      this.view.doMarkCell(event.target, this.model.currentPlayer);
      this.model.doMark(event.target.parentNode.rowIndex, event.target.cellIndex);
      if (this.model.checkWinner()) {
        this.view.setPlayerScore(this.model.winner, this.model.scores[this.model.winner]);
        this.view.highlightCells(this.model.winningIs);
        this.view.setWinningMessage(this.model.winner + ' won!');
        this.view.showModal();
        return;
      }
      this.toggleCurrentPlayer();
    }
  },
  toggleCurrentPlayer: function toggleCurrentPlayer() {
    this.view.unHighlightCurrentPlayer(this.model.currentPlayer);
    this.model.toggleCurrentPlayer();
    this.view.highlightCurrentPlayer(this.model.currentPlayer);
  },
  run: function run() {
    var _this = this;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.view.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var cell = _step.value;

        cell.addEventListener('click', this.makeMove.bind(this));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    _view2.default.modal.addEventListener('click', function () {
      _this.reset();
    });
  }
};

controller.run();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = function Cell(i) {
  var mark = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  _classCallCheck(this, Cell);

  this.i = i;
  this.mark = mark;
};

var Board = function Board() {
  _classCallCheck(this, Board);

  this.rows = [[new Cell([0, 0]), new Cell([0, 1]), new Cell([0, 2])], [new Cell([1, 0]), new Cell([1, 1]), new Cell([1, 2])], [new Cell([2, 0]), new Cell([2, 1]), new Cell([2, 2])]];

  this.columns = [[this.rows[0][0], this.rows[1][0], this.rows[2][0]], [this.rows[0][1], this.rows[1][1], this.rows[2][1]], [this.rows[0][2], this.rows[1][2], this.rows[2][2]]];

  this.diagonals = [[this.rows[0][0], this.rows[1][1], this.rows[2][2]], [this.rows[0][2], this.rows[1][1], this.rows[2][0]]];

  this.lines = [].concat(_toConsumableArray(this.rows), _toConsumableArray(this.columns), _toConsumableArray(this.diagonals));
};

var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.board = new Board();
    this.currentPlayer = 'X';
    this.scores = { X: 0, O: 0 };
  }

  _createClass(Model, [{
    key: 'doMark',
    value: function doMark(i0, i1) {
      this.board.rows[i0][i1].mark = this.currentPlayer;
    }
  }, {
    key: 'toggleCurrentPlayer',
    value: function toggleCurrentPlayer() {
      if (this.currentPlayer === 'X') {
        this.currentPlayer = 'O';
      } else {
        this.currentPlayer = 'X';
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.board = new Board();
      this.winner = undefined;
      this.winningIs = undefined;
      this.toggleCurrentPlayer();
    }
  }, {
    key: 'checkWinner',
    value: function checkWinner() {
      var _this = this;

      var _loop = function _loop(line) {
        if (line.every(function (cell) {
          return cell.mark !== '';
        }) && line.every(function (cell) {
          return cell.mark === line[0].mark;
        })) {
          _this.winner = line[0].mark;
          _this.scores[_this.winner] += 1;
          _this.winningIs = line.map(function (cell) {
            return cell.i;
          });
          return {
            v: true
          };
        }
      };

      var _arr = [].concat(_toConsumableArray(this.board.lines));

      for (var _i = 0; _i < _arr.length; _i++) {
        var line = _arr[_i];
        var _ret = _loop(line);

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
      return false;
    }
  }]);

  return Model;
}();

var model = new Model();
exports.default = model;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var view = {
  body: document.body,
  cells: document.getElementById('board').getElementsByTagName('td'),
  xPlayerLabel: document.querySelector('#labels .x'),
  oPlayerLabel: document.querySelector('#labels .o'),
  oPlayerScore: document.querySelector('.o-score'),
  xPlayerScore: document.querySelector('.x-score'),
  modal: document.querySelector('#round-end-modal'),
  message: document.querySelector('#win-message'),
  continue: document.querySelector('#round-end-modal #continue'),

  setWinningMessage: function setWinningMessage(message) {
    this.message.textContent = message;
  },
  doMarkCell: function doMarkCell(cell, mark) {
    cell.classList.add(mark.toLowerCase());
    cell.textContent = mark;
  },
  unHighlightCurrentPlayer: function unHighlightCurrentPlayer(currentPlayer) {
    this.getPlayerLabel(currentPlayer).classList.remove('current-player');
  },
  highlightCurrentPlayer: function highlightCurrentPlayer(currentPlayer) {
    this.getPlayerLabel(currentPlayer).classList.add('current-player');
  },
  showModal: function showModal() {
    this.modal.style.display = 'flex';
  },
  reset: function reset() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.cells[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var cell = _step.value;

        cell.textContent = '';
        cell.classList.remove('winning-cell');
        cell.classList.remove('x');
        cell.classList.remove('o');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.message.textContent = '';
    this.modal.style.display = 'none';
  },
  getCellByI: function getCellByI(i0, i1) {
    return document.getElementById('board').rows[i0].cells[i1];
  },
  highlightCells: function highlightCells(cellIs) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = cellIs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var cellI = _step2.value;

        this.getCellByI.apply(this, _toConsumableArray(cellI)).classList.add('winning-cell');
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  },
  getPlayerLabel: function getPlayerLabel(player) {
    if (player === 'X') {
      return this.xPlayerLabel;
    } else {
      return this.oPlayerLabel;
    }
  },
  setPlayerScore: function setPlayerScore(player, score) {
    this.getPlayerScore(player).textContent = score;
  },
  getPlayerScore: function getPlayerScore(player) {
    if (player === 'X') {
      return this.xPlayerScore;
    } else {
      return this.oPlayerScore;
    }
  }
};

exports.default = view;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map