/*
 * Create a list that holds all of your cards
 */

const cards = [
	"fa-diamond",
	"fa-diamond",
	"fa-paper-plane-o",
	"fa-paper-plane-o",
	"fa-anchor",
	"fa-anchor",
	"fa-bolt",
	"fa-bolt",
	"fa-cube",
	"fa-cube",
	"fa-leaf",
	"fa-leaf",
	"fa-bicycle",
	"fa-bicycle",
	"fa-bomb",
	"fa-bomb"
];

function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


function shuffle(array) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const moveCounter = document.querySelector(".moves");
let startTime;

let openCards = [];
const resetButton = document.querySelector(".restart");
let allCards = document.querySelectorAll(".card");
let timeCounter = 0;

//setup game
function initGame() {
	const deck = document.querySelector(".deck");
	const cardHTML = shuffle(cards).map(function(card) {
		return generateCard(card);
	});
	deck.innerHTML = cardHTML.join("");
	timeCounter.innerHTML = 0;
	moveCounter.innerHTML = 0;
	startTime = new Date();

	allCards = document.querySelectorAll(".card");
	allCards.forEach(card => {
		card.addEventListener("click", () => {
			if (
				!card.classList.contains("open") &&
				!card.classList.contains("show") &&
				!card.classList.contains("match")
			) {
				openCards.push(card);
				card.classList.add("open", "show");

				if (openCards.length === 2) {
					//increment the counter
					incrementCounter();
					//check match
					if (openCards[0].dataset.card === openCards[1].dataset.card) {
						openCards[0].classList.add("match", "open", "show");

						openCards[1].classList.add("match", "open", "show");

						openCards = [];
						setTimeout(() => {
							if (checkWin()) {
								const finishTime = new Date();

								// compare the two
								const diffTime = finishTime - startTime;

								let resetGame = window.confirm(
									`You win! That took you ${Math.round(
										diffTime / 1000
									)} seconds and you have ${numberOfStars} stars left! Do you want to play again?`
								);
								//reset
								if (resetGame) {
									timeInt = 0;
									openCards = [];
									initGame();

									document
										.getElementById("star-1", "star-2", "star-3")
										.classList.remove("hidden");
								}
							}
						}, 500);
					} else {
						//clear cards if no match
						setTimeout(() => {
							openCards.forEach(card => {
								card.classList.remove("open", "show");
							});
							openCards = [];
						}, 500);
					}
				}
			}
		});
	});
}
//timer
const secondsCounter = document.querySelector(".time");
let timeInt = parseInt(secondsCounter.innerHTML);
let gameTimer = setInterval(() => {
	secondsCounter.innerHTML = timeInt += 1;
	console.log(timeInt);
}, 1000);

initGame();

let numberOfStars = 3;

const incrementCounter = () => {
	const countInt = parseInt(moveCounter.innerHTML);
	moveCounter.innerHTML = countInt + 1;
	if (countInt >= 10) {
		document.getElementById("star-1").classList.add("hidden");
		numberOfStars = 2;
	}
	if (countInt >= 20) {
		document.getElementById("star-2").classList.add("hidden");
		numberOfStars = 1;
	}
	if (countInt >= 30) {
		document.getElementById("star-3").classList.add("hidden");
		numberOfStars = 0;
	}
};

resetButton.addEventListener("click", () => {
	timeInt = 0;
	openCards = [];
	initGame();

	document
		.getElementById("star-1", "star-2", "star-3")
		.classList.remove("hidden");
});

const checkWin = () => {
	let isWin = true;
	allCards.forEach(card => {
		if (!card.classList.contains("match")) {
			isWin = false;
		}
	});
	return isWin;
};
