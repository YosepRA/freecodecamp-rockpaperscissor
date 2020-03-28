const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const scoreBoard = document.querySelector('.score-board');
const resultFeedback = document.querySelector('.result p');
const choice = document.querySelectorAll('.choice');

let userChoice = '';
let computerChoice = '';
let userScore = 0;
let computerScore = 0;
let gameStatus = '';

let signs = ['r', 'p', 's'];
let signMap = new Map();
signMap.set('r', 'Rock');
signMap.set('p', 'Paper');
signMap.set('s', 'Scissor');

let gameMap = new Map();
// Key: userChoice, 0: Win, 1: Lose
gameMap.set('r', ['s', 'p']);
gameMap.set('p', ['r', 's']);
gameMap.set('s', ['p', 'r']);

choice.forEach(c => {
  c.addEventListener('click', ({ target }) => {
    let el = target.className.includes('choice')
      ? target
      : target.closest('.choice');

    userChoice = el.id;
    computerChoice = signs[Math.floor(Math.random() * 3)];

    if (userChoice === computerChoice) {
      gameStatus = 'draw';
    } else if (computerChoice === gameMap.get(userChoice)[1]) {
      gameStatus = 'lose';
      computerScore++;
    } else {
      gameStatus = 'win';
      userScore++;
    }

    updateDisplay(userChoice, computerChoice);
  });
});

function updateDisplay(userChoice, computerChoice) {
  userChoice = signMap.get(userChoice);
  computerChoice = signMap.get(computerChoice);

  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;

  if (gameStatus === 'draw') {
    scoreBoard.style.borderColor = 'grey';
    resultFeedback.textContent = 'Draw';
  } else if (gameStatus === 'lose') {
    scoreBoard.style.borderColor = 'red';
    resultFeedback.textContent = `${userChoice}(user) beaten by ${computerChoice}(comp)`;
  } else {
    scoreBoard.style.borderColor = 'green';
    resultFeedback.textContent = `${userChoice}(user) beats ${computerChoice}(comp)`;
  }

  setTimeout(() => {
    scoreBoard.style.borderColor = '';
  }, 300);
}
