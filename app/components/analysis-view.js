export function renderAnalysis(variants = [], error = '') {
  const root = document.getElementById('analysis-results');
  if (error) {
    root.innerHTML = `<p class="error">${error}</p>`;
    return;
  }
  if (!variants.length) {
    root.innerHTML = '<p>Aucune variante renvoyée.</p>';
    return;
  }
  root.innerHTML = variants.map(v => `
    <div class="card">
      <strong>#${v.rank}</strong> — Eval: ${v.evaluation} — Résultat: ${v.outcome} — Profondeur: ${v.depth}<br/>
      <small>${v.moves.join(' ')}</small>
    </div>
  `).join('');
}
