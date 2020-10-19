/*
GAME RULES:
v1
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
-----
v2
- A player loses his ENTIRE score when he rolls 2 6's in a row. After that, next player turn
- Add an input field where players can set the winning score, so they could change the predefined score of 100
- Add another dice to the game so there are 2 dices. The player loses current score if one of them is a 1.
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
var scores, activePlayer, roundScore, gamePlaying;
// function: start new game
function newGame() {
    // set variables to 0
    gamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    // set all displays to 0
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneRound.textContent = 0;
    playerTwoRound.textContent = 0;
    // hide dice
    dice.style.display = 'none';
    // active player visual treatment
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    playerOne.textContent = 'Player 1';
    playerTwo.textContent = 'Player 2';
    btnHold.style.display = 'block';
    btnRollDice.style.display = 'block';
}
// next player
function nextPlayer() {
    // set roundScore to 0
    roundScore = 0;
    // display current score as 0
    document.getElementById('current-' + activePlayer).textContent = 0;
    // change active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // update active player UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// ---------- FLOW ----------
// start new game
newGame();

// roll dice
btnRollDice.addEventListener('click', function() {
    // generate random number
    var roll = Math.floor(Math.random() * 6) + 1;
    // display dice
    dice.src = 'dice-' + roll + '.png';
    dice.style.display = 'block';
    // if not 1, add number to current score; if 1, set current score to 0, change active player
    if (roll !== 1) {
        roundScore += roll;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
})

// hold
btnHold.addEventListener('click', function() {
    // add current score to player score
    scores[activePlayer] += roundScore;
    // display update player UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // check if player won game
    if (scores[activePlayer] >= 100) {
        document.querySelector('.player-' + [activePlayer] + '-panel').classList.add('winner');
        document.querySelector('.player-' + [activePlayer] + '-panel').classList.remove('active');
        dice.style.display = 'none';
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        gamePlaying = false;
        btnHold.style.display = 'none';
        btnRollDice.style.display = 'none';
    } else {
        dice.style.display = 'none';
        nextPlayer();   
    }
})

// new game
btnNewGame.addEventListener('click', newGame);