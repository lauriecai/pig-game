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
let btnRollDice = document.querySelector('.btn-roll');
let btnNewGame = document.querySelector('.btn-new');
let btnHold = document.querySelector('.btn-hold');
let dice = document.querySelector('.dice');
// variables
var scores, activePlayer, roundScore, gamePlaying, prevRoll, winningScore;
// function: start new game
function newGame() {
    // set variables to 0
    gamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    // set all displays to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    // hide dice & buttons
    dice.style.display = 'none';
    btnRollDice.style.display = 'none';
    btnHold.style.display = 'none';
    // show winning score input
    document.querySelector('.label-group').style.display = 'block';
    // active player visual treatment
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
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

// set winning score
document.querySelector('.btn-set').addEventListener('click', function() {
    winningScore = document.querySelector('.winScoreInput').value;
    console.log(winningScore);
    document.querySelector('.instructions').textContent = 'Score ' + winningScore + ' to win!'
    // show game buttons
    btnRollDice.style.display = 'block';
    btnHold.style.display = 'block';
    document.querySelector('.label-group').style.display = 'none';
})

// roll dice
btnRollDice.addEventListener('click', function() {
    // generate random number
    var roll = Math.floor(Math.random() * 6) + 1;
    // display dice
    dice.src = 'dice-' + roll + '.png';
    document.querySelector('.instructions').style.display = 'none';
    dice.style.display = 'block';
    // if 6 & previous roll was 6, erase global score, then next playaer
    if (roll === 6 && prevRoll === 6) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        nextPlayer();
    // if not 1, add number to current score; if 1, set current score to 0, change active player
    } else if (roll !== 1) {
        roundScore += roll;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
    // assign roll to previous roll
    prevRoll = roll;
    console.log(prevRoll);
})

// hold
btnHold.addEventListener('click', function() {
    // add current score to player score
    scores[activePlayer] += roundScore;
    // display update player UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // check if player won game
    if (scores[activePlayer] >= winningScore) {
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