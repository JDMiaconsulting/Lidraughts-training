import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAnalyze } from './services/analyzePosition.js';
import { handleMove, handleStart } from './services/playVsAi.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'app')));

app.post('/api/analyze', handleAnalyze);
app.post('/api/play/start', handleStart);
app.post('/api/play/move', handleMove);

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
});

const port = process.env.PORT || 9663;
app.listen(port, () => {
  console.log(`Training app listening on http://localhost:${port}`);
});
