import { analyzePosition } from '../engine/scan-adapter.js';

export async function handleAnalyze(req, res) {
  const { fen = '', sideToMove = 'white', maxVariants = 10, maxTimeMs = 3000 } = req.body || {};
  const variants = await analyzePosition({ fen, sideToMove, maxVariants, maxTimeMs });
  res.json({ variants });
}
