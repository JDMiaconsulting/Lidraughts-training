import { analyzePosition } from '../engine/scan-adapter.js';

const BOARD_RE = /^([.wWbB]{10}\/){9}[.wWbB]{10}$/;

export async function handleAnalyze(req, res) {
  const { fen = '', sideToMove = 'white', maxVariants = 10, maxTimeMs = 3000 } = req.body || {};

  if (!BOARD_RE.test(fen)) {
    return res.status(400).json({ error: 'Position invalide: format damier 10x10 attendu' });
  }
  if (!['white', 'black'].includes(sideToMove)) {
    return res.status(400).json({ error: 'sideToMove invalide' });
  }

  const variants = await analyzePosition({ fen, sideToMove, maxVariants, maxTimeMs });
  return res.json({ variants });
}
