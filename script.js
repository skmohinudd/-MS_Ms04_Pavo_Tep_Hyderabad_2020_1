var suits = ["spades", "hearts", "clubs", "diams"];
var cardFace = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var cards = [];
var players = [[], []];
var firstRun = true;
var gameover = false;


//to add functionality of doing many rounds automatically:
var timer;
var r = 0;

//DOM ELEMENTS from the HTML

var fightButton = document.querySelector("#btnBattle");
var fightButton10 = document.querySelector("#btnBattle10");

var p1 = document.querySelector("#player1 .hand");
var p2 = document.querySelector("#player2 .hand");
var s1 = document.querySelector("#player1 .score");
var s2 = document.querySelector("#player2 .score");

//event listeners
fightButton.addEventListener('click', battle);

fightButton10.addEventListener('click', function () {
  rounds(10);
});

function rounds(a) {
  r = a;
  timer = setInterval(function () {
    battle()
  }, 400);
}


function battle() {
  if (timer) {
    r--;
    outputMessage("Rounds left " + r);
    if (r < 1) {
      window.clearInterval(timer);
    }
  }
  //if first run is true, game is brand new and needs more steps
  if (firstRun) {

    firstRun = false;//it will only be reset once game is reset
    buildCards();
    shuffleArray(cards);
    dealCards(cards);
  }
  attack();
}


function attack() {

  if (!gameover) {
    var card1 = players[0].shift();
    var card2 = players[1].shift();
    var pot = [card1, card2];

    p1.innerHTML = showCard(card1, 0);
    p2.innerHTML = showCard(card2, 0);

    checkWinner(card1, card2, pot);

    //update scores
    
    s1.innerHTML = players[0].length;
    s2.innerHTML = players[1].length;
  } else {
    outputMessage("Game Over");
  }
}

function outputMessage(message) {

  document.getElementById("message").innerHTML = message;
}

// check winner

function checkWinner(card1, card2, pot) {

  if ((players[0].length <= 4) || (players[1].length <= 4)) {
    gameover = true;

    return;
  }

  if (card1.cardValue > card2.cardValue) {

    outputMessage("Player 1 wins");
    players[0] = players[0].concat(pot);
  }
  else if (card1.cardValue < card2.cardValue) {
    outputMessage("Player 2 wins");
    players[1] = players[1].concat(pot);
  } else {
    battlemode(pot);
    outputMessage("Tie! BattleMode: Both players add 3 cards to pot");
  }

}
//play battle mode

function battlemode(pot) {

  var card1, card2;
  var pos = (pot.length / 2);

  if ((players[0].length < 4) || (players[1].length < 4)) {

    return;

  }
  else {
    //both players have enough cards, add 3 cards each to the pot:
    for (i = 0; i < 4; i++) {

      card1 = players[0].shift();
      pot = pot.concat(card1);
      p1.innerHTML += showCard(card1, (pos + i));

    }
    for (i = 0; i < 4; i++) {
      
      card2 = players[1].shift();
      pot = pot.concat(card2);
      p2.innerHTML += showCard(card2, (pos + i));
    }
    checkWinner(card1, card2, pot);
  }
}

//visuals of the cards:

function showCard(c, p) {

  var move = p * 40;
  var bCard = '<div class="icard ' + c.suit + ' " style="left: ' + move + 'px">';
  bCard += '<div class="cardtop suit">' + c.num + '<br></div>';
  bCard += '<div class="cardmid suit"></div>';
  bCard += '<div class="cardbottom suit">' + c.num + '<br></div></div>'


  return bCard;
}

//build a full deck of 52 cards

function buildCards() {
  cards = [];
  for (s in suits) {
    var suitNew = suits[s][0].toUpperCase()
    for (n in cardFace) {
      var card = {
        suit: suits[s],
        icon: suitNew,
        num: cardFace[n],
        cardValue: parseInt(n) + 2
        //num and cardValue are the same,

      }
      cards.push(card);
    }
  }

}
//share the cards to players

function dealCards(array) {


  for (i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      players[0].push(array[i]);
    } else {
      players[1].push(array[i]);
    }

  }
  //console.log(players);
}

//Shuffle an array

function shuffleArray(array) {
  for (var x = array.length - 1; x > 0; x--) {
    //Math.floor(Math.random()*10) +1;  gives 1-10
    var ii = Math.floor(Math.random() * (x + 1));
    var temp = array[x];
    array[x] = array[ii];
    array[ii] = temp;

  }
  return array;
}
