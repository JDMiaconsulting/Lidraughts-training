# Lidraughts Training (Minimal)

Application minimale avec **2 options uniquement**:

1. **ANALYSER UNE POSITION**
2. **JOUER CONTRE L'ORDINATEUR**

## Lancer localement

```bash
npm install
npm run start
```

Puis ouvrir `http://localhost:9663`.

## Notes

- API d'analyse: `POST /api/analyze` (retourne max 10 variantes).
- API partie: `POST /api/play/start`, `POST /api/play/move`.
- Le moteur IA est actuellement un **stub** (`server/engine/scan-adapter.js`) et doit être branché au moteur réel ensuite.
