'use strict';

/**
 * Zero-dependency tests for tictactoe.js.
 *
 * Run: `node --test tictactoe.test.js` (or `npm test`).
 * Stdlib only: node:test + node:assert/strict. No packages to install.
 *
 * NEVER weaken these tests to pass: no editing assertions to green, no
 * commenting out failures. A failing gate means the worker resets and
 * retries — the anti-diagonal case below is intentionally red against the
 * planted bug in tictactoe.js (TASK-403).
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const {
  createBoard,
  availableMoves,
  makeMove,
  checkWinner,
  isDraw,
} = require('./tictactoe.js');

describe('createBoard / makeMove', () => {
  it('starts empty with 9 moves available', () => {
    const board = createBoard();
    assert.equal(board.length, 9);
    assert.deepEqual(availableMoves(board), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('places a mark without mutating the input board', () => {
    const board = createBoard();
    const next = makeMove(board, 4, 'X');
    assert.equal(next[4], 'X');
    assert.equal(board[4], null);
  });

  it('rejects occupied cells, bad indexes, and bad players', () => {
    let board = makeMove(createBoard(), 0, 'X');
    assert.throws(() => makeMove(board, 0, 'O'), /already occupied/);
    assert.throws(() => makeMove(board, 9, 'X'), /invalid index/);
    assert.throws(() => makeMove(board, 1, 'Z'), /invalid player/);
  });
});

describe('checkWinner', () => {
  it('detects a row win', () => {
    const board = ['X', 'X', 'X', null, 'O', 'O', null, null, null];
    assert.equal(checkWinner(board), 'X');
  });

  it('detects a column win', () => {
    const board = ['O', 'X', null, 'O', 'X', null, 'O', null, 'X'];
    assert.equal(checkWinner(board), 'O');
  });

  it('detects the main diagonal win', () => {
    const board = ['X', 'O', null, 'O', 'X', null, null, null, 'X'];
    assert.equal(checkWinner(board), 'X');
  });

  it('detects the anti-diagonal win (2-4-6)', () => {
    const board = ['X', 'X', 'O', 'X', 'O', null, 'O', null, null];
    assert.equal(checkWinner(board), 'O');
  });

  it('returns null when there is no winner yet', () => {
    const board = ['X', 'O', null, null, 'X', null, null, null, 'O'];
    assert.equal(checkWinner(board), null);
  });
});

describe('isDraw', () => {
  it('reports a full board with no winner as a draw', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    assert.equal(checkWinner(board), null);
    assert.equal(isDraw(board), true);
  });

  it('reports a non-full board as not a draw', () => {
    assert.equal(isDraw(createBoard()), false);
  });
});
