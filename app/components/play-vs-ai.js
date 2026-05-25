let gameId = null;

async function postJson(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur serveur');
  return data;
}

export async function startGame() {
  try {
    const playerColor = document.getElementById('playerColor').value;
    const level = Number(document.getElementById('level').value || 3);
    const data = await postJson('/api/play/start', { playerColor, level });
    gameId = data.gameId;
    renderPlayArea(data);
  } catch (e) {
    renderPlayArea({ status: `ERROR: ${e.message}`, history: [], fen: '-' });
  }
}

export async function submitMove(move) {
  if (!gameId) return;
  try {
    const data = await postJson('/api/play/move', { gameId, move });
    renderPlayArea(data);
  } catch (e) {
    const err = document.getElementById('play-error');
    if (err) err.textContent = e.message;
  }
}

export function renderPlayArea(state) {
  const root = document.getElementById('play-area');
  root.innerHTML = `
    <p><strong>Partie:</strong> ${state.gameId || 'en cours'} — <strong>Statut:</strong> ${state.status || 'ONGOING'}</p>
    <p><strong>Position:</strong> ${state.fen}</p>
    <p><strong>Historique:</strong> ${(state.history || []).join(' ') || '(vide)'}</p>
    <p id="play-error" class="error"></p>
    <input id="moveInput" placeholder="Ex: 32-28" />
    <button id="sendMoveBtn">Jouer le coup</button>
  `;
  document.getElementById('sendMoveBtn')?.addEventListener('click', () => {
    const move = document.getElementById('moveInput').value.trim();
    if (move) submitMove(move);
  });
}
