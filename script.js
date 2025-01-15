let score = JSON.parse(localStorage.getItem('score')) || { //takes JSON string and converts to object.
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

// To start an interval, we use setInterval and store the returned ID in intervalId.
// This ID is needed to stop the interval later using clearInterval(intervalId).
// isAutoPlaying keeps track of whether autoplay is currently active, preventing multiple intervals from being created.

let isAutoPlaying = false;
let intervalId;

function autoPlay() { 
  const autoPlayButton = document.querySelector('.auto-play-button');
  if (!isAutoPlaying) {
    intervalId = setInterval(() => { 
      const playerMove = pickComputerMove(); 
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayButton.textContent = 'Stop Auto Play'

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayButton.textContent = "Auto Play"
  }
}

function resetGame() {
  document.querySelector('.reset-game-button').addEventListener('click', () => {
    score = {
      wins: 0,
      losses: 0,
      ties: 0,
    }
    localStorage.removeItem('score');
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
  })
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock')
})

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper')
})

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors')
})

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
})

// Object storing all possible outcomes based on player and computer moves in nested object.
// Delcared outside the function since globally scoped. 
const outcomes = {
  rock: { rock: 'Tie.', paper: 'You lose.', scissors: 'You win.' },
  paper: { rock: 'You win.', paper: 'Tie.', scissors: 'You lose.' },
  scissors: { rock: 'You lose.', paper: 'You win.', scissors: 'Tie.' }
};

function playGame(playerMove) {
  const computerMove = pickComputerMove();

// Determine the result of the game by looking up the player's move (playerMove) 
// and the computer's move (computerMove) in the outcomes object.
// outcomes[playerMove][computerMove] accesses the result string.
  const result = outcomes[playerMove][computerMove];

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML 
  = ` You <img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

resetGame();