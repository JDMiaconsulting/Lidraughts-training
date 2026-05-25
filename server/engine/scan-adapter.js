function outcomeFromEval(e) {
  if (e > 1.2) return 'WHITE_WIN';
  if (e < -1.2) return 'BLACK_WIN';
  return 'DRAW';
}

export async function analyzePosition({ fen, maxVariants = 10 }) {
  const n = Math.min(10, Math.max(1, maxVariants));
  return Array.from({ length: n }, (_, i) => {
    const evaluation = Number((0.9 - i * 0.2).toFixed(2));
    return {
      rank: i + 1,
      moves: ['32-28', '17-21', '28x17'],
      evaluation,
      outcome: outcomeFromEval(evaluation),
      depth: 16 + i,
      source: fen ? 'engine_stub_with_input' : 'engine_stub'
    };
  });
}

export function aiReplyMove() {
  return '17-21';
}
