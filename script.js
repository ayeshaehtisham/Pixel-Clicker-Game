// Game Variables
let score = 0;
let timeLeft = 10;
let timerId = null;
let isPlaying = false;
let userBestScore = 0;

const API_URL = 'http://localhost:3000/api/scores';

// DOM Elements
const currentScoreEl = document.getElementById('currentScore');
const timerEl = document.getElementById('timer');
const coinEl = document.getElementById('coin');
const playNavBtn = document.getElementById('playNavBtn');
const gameMessageEl = document.getElementById('gameMessage');
const leaderboardListEl = document.getElementById('leaderboardList');
const userBestScoreEl = document.getElementById('userBestScore');
const scoreModal = document.getElementById('scoreModal');
const finalScoreEl = document.getElementById('finalScore');
const playerNameInput = document.getElementById('playerName');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  fetchLeaderboard();
  
  // Load local best score
  const savedBest = localStorage.getItem('pixel_best_score');
  if (savedBest) {
    userBestScore = parseInt(savedBest);
    userBestScoreEl.textContent = userBestScore.toLocaleString();
  }
});

// Sound Effect generate karne ka function (Web Audio API)
function playClickSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Pehla note (Quick high pitch)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'square'; // Retro 8-bit style sound ke liye square wave
    osc1.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5 note
    
    gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    
    osc1.start();
    osc1.stop(audioCtx.currentTime + 0.08);

    // Dusra note (Thora sa agay mazeed high pitch - Classic coin ping)
    setTimeout(() => {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1318.51, audioCtx.currentTime); // E6 note
      
      gain2.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.15);
    }, 80); // 80 milliseconds ke baad second note bajega

  } catch (err) {
    console.log('Audio error:', err);
  }
}

// Click Handlers
coinEl.addEventListener('click', () => {
  if (!isPlaying) {
    startGame();
  }
  score++;
  currentScoreEl.textContent = score;
  
  // Coin click par sound play hogi
  playClickSound();
});

// Start Game Loop
function startGame() {
  if (isPlaying) return;

  isPlaying = true;
  score = 0;
  timeLeft = 10;
  currentScoreEl.textContent = score;
  timerEl.textContent = `${timeLeft}s`;
  gameMessageEl.textContent = 'Keep Clicking!';
  playNavBtn.disabled = true;

  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// End Game
function endGame() {
  clearInterval(timerId);
  isPlaying = false;
  playNavBtn.disabled = false;
  gameMessageEl.textContent = 'Click as fast as you can!';

  // Update personal best score
  if (score > userBestScore) {
    userBestScore = score;
    localStorage.setItem('pixel_best_score', userBestScore);
    userBestScoreEl.textContent = userBestScore.toLocaleString();
  }

  // Show Modal to record name
  finalScoreEl.textContent = score;
  scoreModal.style.display = 'flex';
}

// Submit Score to Backend API
async function submitScore() {
  const name = playerNameInput.value.trim() || 'Anonymous';
  
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, score: score })
    });

    scoreModal.style.display = 'none';
    playerNameInput.value = '';
    fetchLeaderboard(); // Refresh leaderboard ranking
  } catch (err) {
    console.error('Error submitting score:', err);
    scoreModal.style.display = 'none';
  }
}

// Fetch Leaderboard data from backend Node.js API
async function fetchLeaderboard() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderLeaderboard(data);
  } catch (err) {
    console.log('Using fallback dummy data (Backend API server offline)');
    // Fallback static demo data matching the visual format
    const mockData = [
      { name: 'ShadowX', score: 8420 },
      { name: 'Blaze', score: 7950 },
      { name: 'Nova', score: 6780 },
      { name: 'Raptor', score: 6120 },
      { name: 'Zenith', score: 5430 }
    ];
    renderLeaderboard(mockData);
  }
}

// Render dynamic elements to Leaderboard UI
function renderLeaderboard(scores) {
  leaderboardListEl.innerHTML = '';

  scores.slice(0, 5).forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'leaderboard-item';

    const rankClass = index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : '';

    li.innerHTML = `
      <span class="rank ${rankClass}">${index + 1}</span>
      <div class="player-info">
        <div class="avatar"><i class="fa-solid fa-user"></i></div>
        <span>${item.name}</span>
      </div>
      <span class="player-score">${item.score.toLocaleString()}</span>
    `;

    leaderboardListEl.appendChild(li);
  });
}