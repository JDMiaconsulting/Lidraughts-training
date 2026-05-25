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

## État actuel

- Éditeur 10x10 interactif (clic sur case: `. -> w -> W -> b -> B`).
- Analyse: API `POST /api/analyze`, maximum 10 variantes.
- Jeu contre IA: API `POST /api/play/start` + `POST /api/play/move`.
- Le moteur reste un **stub amélioré** (dépend de la position en entrée) et doit être connecté au moteur réel ensuite.

## Format position

La position envoyée à l'API suit 10 rangées de 10 caractères séparées par `/`.
Caractères autorisés: `.` (vide), `w` (pion blanc), `W` (dame blanche), `b` (pion noir), `B` (dame noire).
