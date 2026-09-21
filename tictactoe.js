'use strict';

/**
 * Minimal tic-tac-toe core — public demo target for the agentic-sdlc
 * Ralph loop (see https://github.com/johwes/agentic-sdlc).
 *
 * Board representation: Array(9) of 'X' | 'O' | null, row-major:
 *
 *   0 | 1 | 2
 *   3 | 4 | 5
 *   6 | 7 | 8
 *
 * Zero dependencies. Pure functions only (no I/O) so the worker cell can
 * test them deterministically via `node --test`.
 */

function createBoard() {
  return Array(9).fill(null);
}

function availableMoves(board) {
  const moves = [];
  for (let i = 0; i < 9; i += 1) {
    if (board[i] == null) moves.push(i);
  }
  return moves;
}

function makeMove(board, index, player) {
  if (player !== 'X' && player !== 'O') {
    throw new Error(`invalid player: ${String(player)} (expected 'X' or 'O')`);
  }
  if (!Number.isInteger(index) || index < 0 || index > 8) {
    throw new Error(`invalid index: ${String(index)} (expected 0-8)`);
  }
  if (board[index] != null) {
    throw new Error(`cell ${index} already occupied by ${board[index]}`);
  }
  const next = board.slice();
  next[index] = player;
  return next;
}

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  // PLANTED BUG (TASK-403): the anti-diagonal [2, 4, 6] is missing, so a
  // win on 2-4-6 is reported as null. The worker's job is to add it back
  // without touching anything else. Do not "fix" the tests instead.
];

function checkWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] != null && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function isDraw(board) {
  return checkWinner(board) == null && availableMoves(board).length === 0;
}

module.exports = {
  createBoard,
  availableMoves,
  makeMove,
  checkWinner,
  isDraw,
  WIN_LINES,
};
