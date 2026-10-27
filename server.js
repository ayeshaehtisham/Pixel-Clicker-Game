const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-Memory Leaderboard Store
let leaderboard = [
  { name: 'ShadowX', score: 8420 },
  { name: 'Blaze', score: 7950 },
  { name: 'Nova', score: 6780 },
  { name: 'Raptor', score: 6120 },
  { name: 'Zenith', score: 5430 }
];

// GET: Fetch Top Leaderboard Rankings
app.get('/api/scores', (req, res) => {
  // Sort descending by score
  const sortedScores = leaderboard.sort((a, b) => b.score - a.score);
  res.json(sortedScores);
});

// POST: Add new high score entry
app.post('/api/scores', (req, res) => {
  const { name, score } = req.body;

  if (!name || score === undefined) {
    return res.status(400).json({ error: 'Name and score are required.' });
  }

  leaderboard.push({ name, score: Number(score) });
  // Keep only top 10 scores
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);

  res.status(201).json({ message: 'Score saved successfully!', leaderboard });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});