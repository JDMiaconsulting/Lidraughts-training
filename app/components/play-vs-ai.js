let gameId = null;

export async function startGame() {
  const playerColor = document.getElementById('playerColor').value;
  const level = Number(document.getElementById('level').value || 3);
  const res = await fetch('/api/play/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerColor, level })
  });
  const data = await res.json();
  gameId = data.gameId;
  renderPlayArea(data);
}

export async function submitMove(move) {
  if (!gameId) return;
  const res = await fetch('/api/play/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, move })
  });
  const data = await res.json();
  renderPlayArea(data);
}

export function renderPlayArea(state) {
  const root = document.getElementById('play-area');
  root.innerHTML = `
    <p><strong>Partie:</strong> ${state.gameId || 'en cours'} — <strong>Statut:</strong> ${state.status || 'ONGOING'}</p>
    <p><strong>Position:</strong> ${state.fen}</p>
    <p><strong>Historique:</strong> ${(state.history || []).join(' ') || '(vide)'}</p>
    <input id="moveInput" placeholder="Ex: 32-28" />
    <button id="sendMoveBtn">Jouer le coup</button>
  `;
  document.getElementById('sendMoveBtn')?.addEventListener('click', () => {
    const move = document.getElementById('moveInput').value.trim();
    if (move) submitMove(move);
  });
}
