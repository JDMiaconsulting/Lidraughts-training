import { aiReplyMove } from '../engine/scan-adapter.js';
import { v4 as uuidv4 } from 'uuid';

const games = new Map();
const MOVE_RE = /^\d{1,2}(?:[-x])\d{1,2}$/;

export function handleStart(req, res) {
  const { playerColor = 'white', level = 3 } = req.body || {};
  if (!['white', 'black'].includes(playerColor)) {
    return res.status(400).json({ error: 'playerColor invalide' });
  }
  if (!Number.isInteger(level) || level < 1 || level > 8) {
    return res.status(400).json({ error: 'level invalide (1..8)' });
  }

  const gameId = uuidv4();
  const state = {
    gameId,
    fen: 'bbbbbbbbbb/bbbbbbbbbb/bbbbbbbbbb/bbbbbbbbbb/........../........../wwwwwwwwww/wwwwwwwwww/wwwwwwwwww/wwwwwwwwww',
    toMove: 'white',
    history: [],
    playerColor,
    level,
    status: 'ONGOING'
  };
  games.set(gameId, state);
  return res.json(state);
}

export function handleMove(req, res) {
  const { gameId, move } = req.body || {};
  const game = games.get(gameId);
  if (!game) return res.status(404).json({ error: 'Game not found' });
  if (!MOVE_RE.test(move || '')) return res.status(400).json({ error: 'Format coup invalide (ex: 32-28, 22x31)' });

  game.history.push(move);
  const aiMove = aiReplyMove(game);
  game.history.push(aiMove);
  game.fen = `after-${game.history.length}-plies`;

  return res.json({ ...game, aiMove });
}
