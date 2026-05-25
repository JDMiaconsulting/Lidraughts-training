export function initBoardEditor(root) {
  root.innerHTML = `
    <label>Position (format libre pour MVP):</label>
    <textarea id="positionInput" placeholder="Ex: W:W31,32,K10:B1,2"></textarea>
  `;
}

export function getCurrentPosition() {
  return document.getElementById('positionInput')?.value?.trim() || '';
}
