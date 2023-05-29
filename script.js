'use strict';

//making cosnt variable to avoid selecting scoreelement each time
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let currentScore = 0;
let activePlayer = 0;
let SCORE = [0, 0];
let gameState = true;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  SCORE = [0, 0];
  gameState = true;
  //setting all scores to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  //setting all player to non winners
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  //setting player 1 as active:
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceImg.classList.add('hidden');
};

//at the beginning
init();

//switching fn
const switching = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//initialization fn

//On clicking btn roll or dice rolling
btnRoll.addEventListener('click', function () {
  if (gameState) {
    const randomNo = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomNo}.png`;
    if (randomNo !== 1) {
      currentScore += randomNo;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switching();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gameState) {
    //add active score to SCORE
    SCORE[activePlayer] += currentScore;
    //Updating Score on respective player
    document.querySelector(`#score--${activePlayer}`).textContent =
      SCORE[activePlayer];
    //winning

    if (SCORE[activePlayer] >= 100) {
      gameState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceImg.classList.add('hidden');
    }
    //switching
    switching();
  }
});

btnNew.addEventListener('click', init);
