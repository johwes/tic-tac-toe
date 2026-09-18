# tic-tac-toe (public Ralph-loop demo target)

Small, zero-dependency target that the
[agentic-sdlc](https://github.com/johwes/agentic-sdlc) Ralph loop fixes in
public.

- `tictactoe.js` — pure game core (`createBoard`, `makeMove`,
  `checkWinner`, `isDraw`). No I/O, no deps.
- `tictactoe.test.js` — stdlib suite (`node:test` +
  `node:assert/strict`). Run `node --test tictactoe.test.js` or `npm test`.
- `package.json` — `private`, zero `dependencies`, `engines.node >= 18`.

Planted bug (TASK-403): `WIN_LINES` omits the anti-diagonal `[2, 4, 6]`,
so `checkWinner` returns `null` for a 2-4-6 win. The
`detects the anti-diagonal win` test is red until a worker adds the line
back. Never edit the tests to green.

Branches named `feat/TASK-*` are autonomous-worker candidates. `main`
carries the planted bug, so the anti-diagonal test is red there by design;
the fix lands via a draft PR.
