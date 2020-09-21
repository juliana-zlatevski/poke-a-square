// == User stories/game logic == //
// When the user clicks begin, the timer should start and the squares should populate with a random color

// how many squares should we create? 
//      => round 1 = 50, additional rounds = multiply by round
// how much time should the timer start with?
//      => 30s to start, divide by 2 each round
// which colors should be used?
//      => red, green, blue, purple
// what is the purpose of these colors?
//      => blue will be "correct" color, player can only click blue to score points.
//          clicking on different color will decrement score
// how should rounds be handled?
//      => increment rounds at the end of time.

// When the user clicks on a color: the color should disapear and score should be added or subtracted.

//      => player can only click blue to score. diff color will decrement score.
//      => score should carry over to next round.
//      => when score reaches zero, game over = stop decrementing.


// When the round is over, the scores, round, and timer should be updated for the user to start over with increased difficulty.

// how many rounds?
//      => 3 rounds.
// what should round and timer update to?
//      => 
// what is increased difficulty specifically?
//      => decreasing amount of time and increasing squares per round
// when does game end?
//      => after round 3.
// what happens after round 3?
//      => show score, allow user to play again

// --------------------------------------- CODE ORGANIZATION
// 1. Core Libraries, 3rd Party Libraries
// Global Variables
// Functions
// Event listeners can be either last, or before functions

// ---------------------------------------- STEPS 1 and 2
// Add event listener to "begin" button
// Make a createSquares function
//      it will take a parameter for number of squares
//      it will create a div class with class of 'square'
//      it should select parent container and append the square

let score = 0;
const startTime = 30;
const startCount = 50;
let time = startTime;
let round = 1;

$('button').on('click', function() {
    setRound();
});

const createSquares = function (numberOfSquares) {
    const $squaresContainer = $('.squares');

// clear parent container
    $squaresContainer.empty();

    for (let i = 1; i <= numberOfSquares; i++) {
        const $square = $('<div />');
        $square.addClass('square');
        $square.css('background-color', getRandomColor());
        $squaresContainer.append($square);
    }
}

// ---------------------------------------- STEP 3
// random color function, define an array of colors:
// red => rgb(255, 65, 54)
// blue => rgb(127, 219, 255)
// white => rgb(255, 255, 255)
// purple => rgb(133, 20, 75)

const getRandomColor = function() {
    const colors = ['white', '#85144B', '#FF4136', '#7FDBFF'];
    const getRandomNum = Math.floor(Math.random() * colors.length);
    return colors[getRandomNum];
};


// ---------------------------------------- STEP 4
// add event listener to squares
// check the square color
// if the color is blue, remove square and add point
// if the color is not blue, remove a point
// update DOM

// Event delegation

$('.squares').on('click', '.square', function(event) {
    const $squareColor = $(this).css('background-color');
    if ($squareColor === 'rgb(127, 219, 255)') {
        $(this).remove();
        score++;
    } else {
        if (score > 0) {
        score--;
        console.log(score);
        }
    }
    $('h1').text(`Scoreboard: ${score}`);
});

// ---------------------------------------- STEP 5
// timer function
// initialize a global time variable
// user setInterval() to decrement time by 1 every second
// update DOM
// check time: 
//      => if time is equal to 0, stop timer, reset time & squares, 
//      => and restart timer.

const startTimer = function() {
    const timer = setInterval(function() {
        if (time === 0) {
            clearInterval(timer);
            round++;
            $('#round').text(`round: ${round}`);
            setRound();
            return;
        }
        time--;
        $('#timer').text(`timer: ${time}s`);
    }, 1000);
};

// ---------------------------------------- STEP 6
// set round function 
// reset time and number of squares based on round
// reset timer function
// check round:
//      => if round is greater than 3, stop game and show score
//      => if round is less than 3, multiply number of squares by round
//      => and divide time by round.

const setRound = function() {
    if (round > 3) {
        alert(`Game over!\nYour score = ${score}`);
    } else {
        time = Math.floor(startTime / round);
        createSquares(startCount * round);
        $('#timer').text(`timer: ${time}s`); 
        startTimer();
    }
}