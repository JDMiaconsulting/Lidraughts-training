import { initBoardEditor, getCurrentPosition } from './components/board-editor.js';
import { renderAnalysis } from './components/analysis-view.js';
import { startGame } from './components/play-vs-ai.js';

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
  }));
}

async function analyze() {
  const fen = getCurrentPosition();
  const sideToMove = document.getElementById('sideToMove').value;
  const maxVariants = Math.min(10, Math.max(1, Number(document.getElementById('maxVariants').value || 10)));

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fen, sideToMove, maxVariants, maxTimeMs: 3000 })
    });
    const data = await res.json();
    if (!res.ok) {
      renderAnalysis([], data.error || 'Échec analyse');
      return;
    }
    renderAnalysis(data.variants || []);
  } catch {
    renderAnalysis([], 'Erreur réseau pendant analyse');
  }
}

initTabs();
initBoardEditor(document.getElementById('board-editor'));
document.getElementById('analyzeBtn').addEventListener('click', analyze);
document.getElementById('startGameBtn').addEventListener('click', startGame);
