// =====================================================
// =====================================================
let playerCount = 1;        
let gameStyle = null;       


const TIMER_DURATION = 20;

const questions = [
  {
    id: 1,
    question: 'What does "proactive" mean in a workplace context?',
    options: [
      'Waiting for instructions before acting',
      'Taking initiative and acting in advance',
      'Reacting quickly to problems',
      'Following a set schedule',
    ],
    correctAnswer: 1,
    category: 'Vocabulary',
  },
  {
    id: 2,
    question: 'Complete the sentence: "Could you please _____ me know when you are available?"',
    options: ['let', 'make', 'tell', 'give'],
    correctAnswer: 0,
    category: 'Grammar',
  },
  {
    id: 3,
    question: 'Which phrase is most appropriate for asking for feedback from your manager?',
    options: [
      'Give me your thoughts.',
      'Tell me what you think.',
      'I would appreciate your feedback on this.',
      'What do you think about it?',
    ],
    correctAnswer: 2,
    category: 'Communication',
  },
  {
    id: 4,
    question: 'What is the meaning of "to collaborate"?',
    options: [
      'To work independently',
      'To compete with others',
      'To work together with others',
      'To supervise a team',
    ],
    correctAnswer: 2,
    category: 'Vocabulary',
  },
  {
    id: 5,
    question: 'Which sentence demonstrates active listening?',
    options: [
      'I understand what you mean, and I have a different perspective.',
      'You are wrong about that.',
      'Let me tell you what I think.',
      "I wasn't paying attention, can you repeat?",
    ],
    correctAnswer: 0,
    category: 'Communication',
  },
  {
    id: 6,
    question: 'Choose the correct form: "The team _____ working on the project since Monday."',
    options: ['has been', 'have been', 'is been', 'are been'],
    correctAnswer: 0,
    category: 'Grammar',
  },
  {
    id: 7,
    question: 'What does "think outside the box" mean?',
    options: [
      'To organize things properly',
      'To think creatively and differently',
      'To focus on details',
      'To work in a confined space',
    ],
    correctAnswer: 1,
    category: 'Idioms',
  },
  {
    id: 8,
    question: 'Which is the most professional way to disagree in a meeting?',
    options: [
      "That's not right.",
      "I don't think so.",
      'I see your point, however, I have a different view.',
      "You're mistaken.",
    ],
    correctAnswer: 2,
    category: 'Communication',
  },
  {
    id: 9,
    question: 'What does "to meet a deadline" mean?',
    options: [
      'To schedule a meeting',
      'To complete work by a specified time',
      'To extend the timeframe',
      'To cancel an appointment',
    ],
    correctAnswer: 1,
    category: 'Vocabulary',
  },
  {
    id: 10,
    question: 'Complete: "I am looking forward _____ working with you."',
    options: ['to', 'for', 'at', 'in'],
    correctAnswer: 0,
    category: 'Grammar',
  },
];

// =====================================================

// =====================================================
function getPlayerColor(index) {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
    'from-teal-400 to-teal-600',
    'from-red-400 to-red-600',
    'from-indigo-400 to-indigo-600',
    'from-yellow-400 to-yellow-600',
    'from-cyan-400 to-cyan-600',
  ];
  return colors[index % colors.length];
}

// =====================================================

// =====================================================
const Screens = {
  WELCOME: "WELCOME",
  PLAYER_NAMES: "PLAYER_NAMES",
  GAME: "GAME",
};
let currentScreen = Screens.WELCOME;

// داده‌های جمع‌آوری‌شده
let playerNames = [];

// =====================================================

// =====================================================
const gameStyles = [
  {
    id: 'quick-quiz',
    name: 'Quick Quiz',
    description: 'Fast-paced questions for quick learning',
    icon: '⚡',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'challenge',
    name: 'Challenge Mode',
    description: 'Test your skills with difficult questions',
    icon: '🏆',
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 'practice',
    name: 'Practice Mode',
    description: 'Learn at your own pace without pressure',
    icon: '🧠',
    color: 'from-green-400 to-teal-500',
  },
  {
    id: 'timed',
    name: 'Timed Battle',
    description: 'Race against the clock!',
    icon: '⏱️',
    color: 'from-red-400 to-rose-500',
  },
];

let welcomeSelectedStyle = null;

function renderWelcomeScreen() {
  return `
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg text-white text-3xl">
          📘
        </div>
        <h1 class="text-slate-900 mb-2 text-3xl font-bold">Welcome to English Quest</h1>
        <p class="text-slate-600">
          Master English through fun and interactive tests!
        </p>
      </div>

      <!-- Player Count -->
      <div class="p-6 mb-6 shadow-lg border-2 bg-white rounded-2xl">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg text-blue-600 text-2xl">
            👥
          </div>
          <div class="flex-1">
            <label for="player-count" class="block text-slate-700 mb-2">
              Number of Players
            </label>
            <input
              id="player-count"
              type="number"
              min="1"
              max="10"
              value="${playerCount}"
              class="max-w-xs w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-400"
              placeholder="Enter number of players"
            />
          </div>
        </div>
      </div>

      <!-- Game Style Selection -->
      <div class="mb-8">
        <h2 class="text-slate-900 mb-4 text-xl font-bold">Choose Your Game Style</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${gameStyles.map(style => `
            <div
              class="game-style-card p-6 cursor-pointer transition-all duration-200 hover:scale-105 bg-white rounded-2xl
                ${welcomeSelectedStyle === style.id ? "ring-4 ring-blue-500 shadow-xl" : "hover:shadow-lg"}"
              data-style="${style.id}"
            >
              <div class="flex items-start gap-4">
                <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br ${style.color} rounded-xl text-white shadow-md text-3xl">
                  ${style.icon}
                </div>

                <div class="flex-1">
                  <h3 class="text-slate-900 mb-1 text-lg font-bold">${style.name}</h3>
                  <p class="text-slate-600">${style.description}</p>
                </div>

                ${welcomeSelectedStyle === style.id ? `
                  <div class="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full text-white text-sm">
                    ✓
                  </div>
                ` : ""}
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Start Button -->
      <div class="flex justify-center">
        <button id="start-game-btn"
          class="px-12 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          Start Game
        </button>
      </div>

    </div>
  </div>
  `;
}

function bindWelcomeEvents() {
  const countInput = document.getElementById("player-count");
  countInput.addEventListener("input", (e) => {
    playerCount = Math.max(1, Math.min(10, Number(e.target.value || 1)));
    e.target.value = playerCount;
  });

  document.querySelectorAll(".game-style-card").forEach(card => {
    card.addEventListener("click", () => {
      welcomeSelectedStyle = card.dataset.style;
      renderApp();
    });
  });

  document.getElementById("start-game-btn").addEventListener("click", () => {
    if (!welcomeSelectedStyle || !playerCount || playerCount < 1) {
      alert("Please enter the number of players and select a game style");
      return;
    }
    gameStyle = welcomeSelectedStyle;

    currentScreen = Screens.PLAYER_NAMES;
    playerNames = Array(playerCount).fill("");
    renderApp();
  });
}

// =====================================================

// =====================================================
function renderPlayerNamesScreen() {
  const inputs = Array.from({ length: playerCount }).map((_, i) => {
    return `
      <div class="p-6 shadow-lg border-2 hover:shadow-xl transition-shadow bg-white rounded-2xl">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br ${getPlayerColor(i)} rounded-xl text-white shadow-md flex-shrink-0 text-2xl">
            👤
          </div>

          <div class="flex-1">
            <label for="player-${i}" class="block text-slate-700 mb-2">
              Player ${i + 1}
            </label>
            <input
              id="player-${i}"
              type="text"
              placeholder="Enter name for Player ${i + 1}"
              class="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-blue-400"
              value="${playerNames[i] ?? ""}"
            />
          </div>

          <div id="check-${i}" class="${(playerNames[i]||"").trim() ? "" : "hidden"} flex items-center justify-center w-8 h-8 bg-green-500 rounded-full flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </div>
    `;
  }).join("");

  const prettyMode = gameStyle
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-3xl">

        <div class="text-center mb-8">
          <h1 class="text-slate-900 mb-2 text-3xl font-bold">Enter Player Names</h1>
          <p class="text-slate-600">
            Let's get to know everyone before we start the game
          </p>
        </div>

        <div class="space-y-4 mb-8">
          ${inputs}
        </div>

        <div class="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
          <div class="flex items-center justify-center gap-2 text-slate-700">
            <span>Game Mode:</span>
            <span class="px-3 py-1 bg-white rounded-lg shadow-sm">
              ${prettyMode}
            </span>
          </div>
        </div>

        <div class="flex justify-center gap-4">
          <button id="continue-btn"
            class="px-12 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg flex items-center gap-2">
            Continue to Game
            <span class="text-lg">➡️</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

function bindPlayerNamesEvents() {
  for (let i = 0; i < playerCount; i++) {
    const input = document.getElementById(`player-${i}`);
    const check = document.getElementById(`check-${i}`);

    input.addEventListener("input", (e) => {
      playerNames[i] = e.target.value;
      if (playerNames[i].trim() !== "") check.classList.remove("hidden");
      else check.classList.add("hidden");
    });
  }

  document.getElementById("continue-btn").addEventListener("click", () => {
    const empty = playerNames.filter(n => !n || n.trim() === "");
    if (empty.length > 0) {
      alert("Please enter names for all players");
      return;
    }

    currentScreen = Screens.GAME;
    initGameStates();
    renderApp();
    startTimerIfNeeded();
  });
}

// =====================================================

// =====================================================
let currentQuestionIndex = 0;
let currentPlayerIndex = 0;
let selectedAnswer = null;
let timeLeft = TIMER_DURATION;  
let isAnswered = false;
let scores = [];
let gameFinished = false;
let showPlayerTransition = false;
let timerId = null;

function initGameStates() {
  currentQuestionIndex = 0;
  currentPlayerIndex = 0;
  selectedAnswer = null;
  timeLeft = TIMER_DURATION;     
  isAnswered = false;
  scores = Array(playerNames.length).fill(0);
  gameFinished = false;
  showPlayerTransition = false;
}

const totalQuestions = questions.length;

function getTimerColor() {

  if (timeLeft > (TIMER_DURATION * 2) / 3) return 'from-green-500 to-green-600';
  if (timeLeft > TIMER_DURATION / 3) return 'from-yellow-500 to-yellow-600';
  return 'from-red-500 to-red-600';
}

function getAnswerClassName(index, correctAnswer) {
  if (!isAnswered) {
    return 'bg-white hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-400';
  }
  if (index === correctAnswer) {
    return 'bg-green-100 border-2 border-green-500';
  }
  if (index === selectedAnswer && index !== correctAnswer) {
    return 'bg-red-100 border-2 border-red-500';
  }
  return 'bg-slate-100 border-2 border-slate-200';
}

function startTimerIfNeeded() {
  stopTimer();
  if (gameStyle === "practice" || isAnswered || gameFinished || showPlayerTransition) return;

  timerId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      handleTimeUp();
    }
    renderApp();
  }, 1000);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

function handleTimeUp() {
  isAnswered = true;
  stopTimer();
  renderApp();
  setTimeout(moveToNextQuestion, 2000);
}

function handleAnswerSelect(answerIndex) {
  if (isAnswered) return;

  selectedAnswer = answerIndex;
  isAnswered = true;
  stopTimer();

  const currentQuestion = questions[currentQuestionIndex];
  if (answerIndex === currentQuestion.correctAnswer) {
    scores[currentPlayerIndex] += 1;
  }

  renderApp();
  setTimeout(moveToNextQuestion, 2000);
}

function moveToNextQuestion() {
  if (currentQuestionIndex + 1 >= totalQuestions) {
    if (currentPlayerIndex + 1 >= playerNames.length) {
      gameFinished = true;
    } else {
      showPlayerTransition = true;
    }
  } else {
    currentQuestionIndex += 1;
    selectedAnswer = null;
    isAnswered = false;
    timeLeft = TIMER_DURATION;  
  }

  renderApp();
  startTimerIfNeeded();
}

function startNextPlayer() {
  currentPlayerIndex += 1;
  currentQuestionIndex = 0;
  showPlayerTransition = false;
  selectedAnswer = null;
  isAnswered = false;
  timeLeft = TIMER_DURATION;    

  renderApp();
  startTimerIfNeeded();
}

// ------------------
function renderGameOver() {
  const maxScore = Math.max(...scores);
  const winnerIndices = scores
    .map((s, i) => (s === maxScore ? i : -1))
    .filter(i => i !== -1);

  const winnersText =
    winnerIndices.length === 1
      ? `🏆 ${playerNames[winnerIndices[0]]} 🏆`
      : `🏆 ${winnerIndices.map(i => playerNames[i]).join(" & ")} 🏆`;

  return `
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <div class="p-8 text-center shadow-xl bg-white rounded-2xl">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 text-white text-3xl">
          🏆
        </div>

        <h1 class="text-slate-900 mb-2 text-3xl font-bold">Game Over!</h1>

        <div class="mb-8">
          <p class="text-slate-600 mb-4">
            ${winnerIndices.length === 1 ? "Congratulations to the winner!" : "It's a tie!"}
          </p>
          <div class="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white shadow-lg">
            <span class="text-2xl">${winnersText}</span>
          </div>
        </div>

        <p class="text-slate-600 mb-8">Final Scores:</p>

        <div class="space-y-4">
          ${playerNames.map((name, index) => `
            <div class="p-4 rounded-xl ${
              winnerIndices.includes(index)
                ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400"
                : "bg-gradient-to-r from-slate-50 to-slate-100"
            }">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br ${getPlayerColor(index)} rounded-lg flex items-center justify-center text-white">
                    ${winnerIndices.includes(index) ? "🏆" : "👤"}
                  </div>
                  <span class="text-slate-900 font-semibold">${name}</span>
                </div>
                <div class="text-slate-900 font-bold">
                  ${scores[index]} / ${totalQuestions}
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>`;
}

function renderPlayerTransition() {
  const currentPlayer = playerNames[currentPlayerIndex];

  return `
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-2xl">
      <div class="p-8 text-center shadow-xl bg-white rounded-2xl">

        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${getPlayerColor(currentPlayerIndex)} rounded-full mb-6 text-white text-3xl">
          ✅
        </div>

        <h1 class="text-slate-900 mb-4 text-2xl font-bold">${currentPlayer} Finished!</h1>

        <p class="text-slate-600 mb-6">
          Score: ${scores[currentPlayerIndex]} / ${totalQuestions}
        </p>

        <div class="mb-8">
          <h2 class="text-slate-700 mb-4 font-semibold">Current Scores:</h2>
          <div class="space-y-3">
            ${playerNames.slice(0, currentPlayerIndex + 1).map((name, index) => `
              <div class="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br ${getPlayerColor(index)} rounded-lg flex items-center justify-center text-white">
                      👤
                    </div>
                    <span class="text-slate-900 font-semibold">${name}</span>
                  </div>
                  <div class="text-slate-900 font-bold">
                    ${scores[index]} / ${totalQuestions}
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="text-center mb-6">
          <p class="text-slate-700">Next Player:</p>
          <div class="inline-flex items-center gap-3 mt-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div class="w-10 h-10 bg-gradient-to-br ${getPlayerColor(currentPlayerIndex + 1)} rounded-lg flex items-center justify-center text-white">
              👤
            </div>
            <span class="text-slate-900 font-semibold">${playerNames[currentPlayerIndex + 1]}</span>
          </div>
        </div>

        <button id="start-next-player"
          class="px-12 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          Start ${playerNames[currentPlayerIndex + 1]}'s Turn
        </button>

      </div>
    </div>
  </div>`;
}

function renderMainGame() {
  const currentQuestion = questions[currentQuestionIndex];
  const currentPlayer = playerNames[currentPlayerIndex];
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return `
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">

      <div class="mb-6 flex items-center justify-between gap-4">
        <div class="flex-1 p-4 shadow-lg bg-white rounded-2xl">
          <div class="flex items-center justify-between mb-2">
            <span class="text-slate-700">
              Question ${currentQuestionIndex + 1} of ${totalQuestions}
            </span>
            <span class="text-slate-500">${currentQuestion.category}</span>
          </div>
          <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-blue-600" style="width:${progressPercent}%"></div>
          </div>
        </div>

        ${gameStyle !== "practice" ? `
        <div class="p-4 shadow-lg bg-white rounded-2xl">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br ${getTimerColor()} rounded-lg flex items-center justify-center text-white">
              ⏱️
            </div>
            <div>
              <div class="text-slate-500 text-sm">Time Left</div>
              <div class="text-slate-900 font-bold text-lg">${timeLeft}s</div>
            </div>
          </div>
        </div>` : ""}
      </div>

      <div class="p-4 mb-6 shadow-lg rounded-2xl bg-gradient-to-r ${getPlayerColor(currentPlayerIndex)} bg-opacity-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br ${getPlayerColor(currentPlayerIndex)} rounded-lg flex items-center justify-center text-white">
            👤
          </div>
          <span class="text-slate-900 font-semibold">Current Player: ${currentPlayer}</span>
        </div>
      </div>

      <div class="p-8 mb-6 shadow-xl bg-white rounded-2xl">
        <h2 class="text-slate-900 mb-8 text-xl font-bold">${currentQuestion.question}</h2>

        <div class="grid gap-4">
          ${currentQuestion.options.map((option, index) => `
            <button
              class="answer-btn p-5 rounded-xl text-left transition-all duration-200
                     ${getAnswerClassName(index, currentQuestion.correctAnswer)}
                     ${!isAnswered ? "cursor-pointer hover:scale-[1.02]" : "cursor-not-allowed"}"
              data-index="${index}"
              ${isAnswered ? "disabled" : ""}>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 font-bold">
                    ${String.fromCharCode(65 + index)}
                  </div>
                  <span class="text-slate-900">${option}</span>
                </div>
                ${isAnswered && index === currentQuestion.correctAnswer ? 
                  `<span class="text-green-600 text-xl">✅</span>` : ""}
              </div>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${playerNames.map((name, index) => `
          <div class="p-4 text-center bg-white rounded-2xl shadow">
            <div class="text-slate-600 mb-1">${name}</div>
            <div class="text-slate-900 font-bold">Score: ${scores[index]}</div>
          </div>
        `).join("")}
      </div>

    </div>
  </div>`;
}

function bindGameEvents() {
  if (gameFinished) return;

  if (showPlayerTransition) {
    document.getElementById("start-next-player")
      .addEventListener("click", startNextPlayer);
    return;
  }

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      handleAnswerSelect(idx);
    });
  });
}

// =====================================================

// =====================================================
function renderApp() {
  const root = document.getElementById("app-root");

  if (currentScreen === Screens.WELCOME) {
    root.innerHTML = renderWelcomeScreen();
    bindWelcomeEvents();
    return;
  }

  if (currentScreen === Screens.PLAYER_NAMES) {
    root.innerHTML = renderPlayerNamesScreen();
    bindPlayerNamesEvents();
    return;
  }

  // GAME
  if (gameFinished) {
    root.innerHTML = renderGameOver();
    return;
  }

  if (showPlayerTransition) {
    root.innerHTML = renderPlayerTransition();
    bindGameEvents();
    return;
  }

  root.innerHTML = renderMainGame();
  bindGameEvents();
}

////
renderApp();
