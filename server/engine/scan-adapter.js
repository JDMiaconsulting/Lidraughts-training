function outcomeFromEval(e) {
  if (e > 1.2) return 'WHITE_WIN';
  if (e < -1.2) return 'BLACK_WIN';
  return 'DRAW';
}

function pseudoMoves(seed) {
  const base = ['32-28', '17-21', '28x17', '11x22', '34-30', '21-27', '30x19'];
  const shift = seed % base.length;
  return [...base.slice(shift), ...base.slice(0, shift)].slice(0, 5);
}

export async function analyzePosition({ fen, maxVariants = 10 }) {
  const n = Math.min(10, Math.max(1, maxVariants));
  const seed = (fen || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: n }, (_, i) => {
    const evaluation = Number((1.4 - i * 0.28).toFixed(2));
    return {
      rank: i + 1,
      moves: pseudoMoves(seed + i),
      evaluation,
      outcome: outcomeFromEval(evaluation),
      depth: 16 + i
    };
  });
}

export function aiReplyMove(game) {
  const idx = (game.history.length + (game.level || 1)) % 4;
  return ['17-21', '18-22', '19-24', '16-21'][idx];
}
