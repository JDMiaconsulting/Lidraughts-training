const SIZE = 10;
const PIECES = ['.', 'w', 'W', 'b', 'B'];
let board = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => '.'));

function cellId(r, c) {
  return `cell-${r}-${c}`;
}

function renderGrid(root) {
  const rows = board.map((row, r) => {
    const cols = row.map((piece, c) => {
      const dark = (r + c) % 2 === 1;
      return `<button class="cell ${dark ? 'dark' : 'light'}" id="${cellId(r, c)}" data-r="${r}" data-c="${c}">${piece === '.' ? '' : piece}</button>`;
    }).join('');
    return `<div class="row">${cols}</div>`;
  }).join('');
  root.innerHTML = `<div class="board">${rows}</div>`;

  root.querySelectorAll('.cell').forEach(el => {
    el.addEventListener('click', () => {
      const r = Number(el.dataset.r);
      const c = Number(el.dataset.c);
      const current = board[r][c];
      const next = PIECES[(PIECES.indexOf(current) + 1) % PIECES.length];
      board[r][c] = next;
      el.textContent = next === '.' ? '' : next;
    });
  });
}

export function initBoardEditor(root) {
  root.innerHTML = `
    <p class="hint">Cliquez sur une case pour faire défiler: vide → w → W → b → B.</p>
    <div id="boardGrid"></div>
    <div class="editor-actions">
      <button id="clearBoardBtn" type="button">Vider le damier</button>
      <button id="startPositionBtn" type="button">Position initiale 10x10</button>
    </div>
  `;

  const grid = root.querySelector('#boardGrid');
  renderGrid(grid);

  root.querySelector('#clearBoardBtn').addEventListener('click', () => {
    board = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => '.'));
    renderGrid(grid);
  });

  root.querySelector('#startPositionBtn').addEventListener('click', () => {
    board = Array.from({ length: SIZE }, (_, r) => Array.from({ length: SIZE }, (_, c) => {
      const dark = (r + c) % 2 === 1;
      if (!dark) return '.';
      if (r <= 3) return 'b';
      if (r >= 6) return 'w';
      return '.';
    }));
    renderGrid(grid);
  });
}

export function getCurrentPosition() {
  return board.map(row => row.join('')).join('/');
}
