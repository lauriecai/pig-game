/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// ---------- REFERENCE ----------
// selectors
let playerOne = document.getElementById('name-0');
let playerTwo = document.getElementById('name-1');
let playerOneScore = document.getElementById('score-0');
let playerTwoScore = document.getElementById('score-1');
let playerOneRound = document.getElementById('current-0');
let playerTwoRound = document.getElementById('current-1');
let btnRollDice = document.querySelector('.btn-roll');
let btnNewGame = document.querySelector('.btn-new');
let btnHold = document.querySelector('.btn-hold');
let dice = document.querySelector('.dice');
// variables
var scores, activePlayer, roundScore;
// function: start new game
function newGame() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneRound.textContent = 0;
    playerTwoRound.textContent = 0;
    dice.style.display = 'none';
}

// ---------- FLOW ----------
// start new game
newGame();

// roll dice




