/*
 * Create a list that holds all of your cards
 */
var gameCards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
// to store number of moves and matches found
var moves = 0;
var matchFound = 0;

// variable that holds the status of the game: gameInProgress or gameNotInProgress
var gameStarted = false;

// Array to keep track of open cards
openCards = [];

//  create a timer object for js timer
var timer = new Timer();
timer.addEventListener('secondsUpdated', function (e) {
    $('#game-timer').html(timer.getTimeValues().toString());
});

// function to shuffle an array from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//reset the game if the user clicks the restart button
$('#resetGame').click(resetGame);

// function to create the card dynamically and display it in html
function createCard(card) {
    $('#card-deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
}

// function to generate random cards by shuffling the cards and assign them to the deck in html
function createGameCards() {
    for (var i = 0; i < 2; i++) {
        gameCards = shuffle(gameCards);
        gameCards.forEach(createCard);
    }
}

// function that starts the game
function startGame() {
    createGameCards();
    $('.card').click(toggleCard);
    $('#moves').html("Moves: 0"); //0 moves initially
    numOfStars(3); //initially, 3 stars in the beginning
}

// function that gives stars based on performance
function numOfStars(n) {
    for (var i = 0; i < n; i++) {
        $('#stars').append('<li><i class="fa fa-star"></i></li>');
    }
}

// function to implement the toggle of a card.
// if a card is clicked, open the card.
// if two cards are open, and they don't match, close them.
// if two cards are open, and they match, keep them open.
function toggleCard() {
    
    // start the timer when the game starts by the user click
    if (gameStarted == false) {
        gameStarted = true;
        timer.start();
    }
    // if the array that holds the open cards is 0, then add the clicked card to the array and open the card
    if (openCards.length === 0) {
        $(this).toggleClass("show open").animateCss('flipInY');
        openCards.push($(this));
        keepCardsOpen();
    }
    //if the array that holds the open cards already has a card in it, then check if the next card forms a set
    // if yes, then keep both the cards open, else close both cards and pop the card out of the array
    else if (openCards.length === 1) {
        // increment moves
        numOfMoves();
        $(this).toggleClass("show open").animateCss('flipInY');
        openCards.push($(this));
        setTimeout(pairOpenCards, 500); // set animation time for the paired cards and keep them open.
    }
}

// function to keep open the cards that form a set
function keepCardsOpen() {
    openCards.forEach(function (card) {
        card.off('click');
    });
}

// function to allow clicks
function allowClick() {
    openCards[0].click(toggleCard);
}

// function to check if the opened cards are matched or not.
function pairOpenCards() {
    if (openCards[0][0].firstChild.className == openCards[1][0].firstChild.className) {
        // console.log("The cards match"); //to check in console if we are logging 8 statements for each set
        openCards[0].addClass("match").animateCss('pulse');
        openCards[1].addClass("match").animateCss('pulse');
        keepCardsOpen();
        clearOpenCards();
        setTimeout(isWinner, 500); //decrease the time of animation to make user less irritated because there is a timer
    }
    else {
        openCards[0].toggleClass("show open").animateCss('flipInY');
        openCards[1].toggleClass("show open").animateCss('flipInY');
        allowClick();
        clearOpenCards();
    }
}

// function to clear opened cards when the user restarts the game
function clearOpenCards() {
    openCards = [];
}

// function to remove stars based on the number of moves
function removeStar() {
    $('#stars').children()[0].remove();
    $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
}

// function to add animations
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass(animationName).one(animationEnd, function () {
            $(this).removeClass(animationName);
        });
        return this;
    }
});

// function to update the number of moves for every two card openings
function numOfMoves() {
    //increment moves by 1
    moves += 1;
    //display num of moves in html to user
    $('#moves').html(`${moves} Moves`);
    // Also, remove stars if the user is taking many moves
    // All moves below are one more than the desired number of moves
    if (moves == 33){
        removeStar();
    }
    else if (moves == 17){
        removeStar();
    }
}

// function to check if the user has won after every two card openings
function isWinner() {
    matchFound += 1;
    //Show the results to the user if all sets have been matched
    //Since the card deck has 16 cards, we have 8 sets
    if (matchFound == 8) {
        showResult();
    }
}

// function to show the result after game ends
function showResult() {
    $('#game-success').empty();
    timer.pause(); //pause the timer. Don't stop as it will reset the timer.
    var scoreBoard = `
        <p class="success"> Congratulations, you won the game!!! </p>
        <p>
            <span class="score-titles">Moves:</span>
            <span class="score-values">${moves}</span>
            <span class="score-titles">Time:</span>
            <span class="score-values">${timer.getTimeValues().toString()}</span>
        </p>
        <div class="text-center margin-top-2">
             <div class="star">
                <i class="fa fa-star fa-3x"></i>    
             </div>
             <div class="star">
                <i class="fa ${ (moves > 32) ? "fa-star-o" : "fa-star"}  fa-3x"></i>    
             </div>
            <div class="star">
                <i class="fa ${ (moves > 16) ? "fa-star-o" : "fa-star"} fa-3x"></i>    
             </div>
        </div>
        <div class="text-center margin-top-2" id="restart">
            <i class="fa fa-repeat fa-2x"></i>
        </div>
    `;
    $('#game')[0].style.display = "none";
    $('#game-success')[0].style.display = "block";
    $('#game-success').append($(scoreBoard));
    $('#restart').click(resetGame);
}

// function that resets the game
function resetGame() {
    moves = 0;
    matchFound = 0;
    $('#card-deck').empty();
    $('#stars').empty();
    $('#game')[0].style.display = "";
    $('#game-success')[0].style.display = "none";
    gameStarted=false;
    timer.stop();
    $('#game-timer').html("00:00:00");
    startGame();
}

// Game starts here
startGame();