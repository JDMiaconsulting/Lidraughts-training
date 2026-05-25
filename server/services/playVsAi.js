import { aiReplyMove } from '../engine/scan-adapter.js';
import { v4 as uuidv4 } from 'uuid';

const games = new Map();

export function handleStart(req, res) {
  const { playerColor = 'white', level = 3 } = req.body || {};
  const gameId = uuidv4();
  const state = {
    gameId,
    fen: 'initial-10x10-position',
    toMove: 'white',
    history: [],
    playerColor,
    level,
    status: 'ONGOING'
  };
  games.set(gameId, state);
  res.json(state);
}

export function handleMove(req, res) {
  const { gameId, move } = req.body || {};
  const game = games.get(gameId);
  if (!game) return res.status(404).json({ error: 'Game not found' });

  game.history.push(move);
  const aiMove = aiReplyMove(game);
  game.history.push(aiMove);
  game.fen = `after-${game.history.length}-plies`;

  return res.json({ ...game, aiMove });
}
