/*
 * Create a list that holds all of your cards
 */

const cards = ['fa-diamond', 'fa-diamond',
               'fa-paper-plane-o', 'fa-paper-plane-o',
               'fa-anchor', 'fa-anchor',
               'fa-bolt', 'fa-bolt',
               'fa-cube', 'fa-cube',
               'fa-leaf','fa-leaf',
               'fa-bicycle', 'fa-bicycle',
               'fa-bomb', 'fa-bomb'
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

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

const moveCounter = document.querySelector('.moves');
let startTime;

let openCards = [];
const resetButton = document.querySelector('.restart');

//setup game
function initGame(){
      const deck = document.querySelector('.deck');
      const cardHTML = shuffle(cards).map(function(card){
          return generateCard(card);
      });
      deck.innerHTML = cardHTML.join('');
      moveCounter.innerHTML = 0;
      startTime = new Date()

const allCards = document.querySelectorAll('.card');
      allCards.forEach((card) => {
          card.addEventListener('click', () => {
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
              openCards.push(card);
              card.classList.add('open', 'show');

              if (openCards.length === 2){
                //increment the counter
                incrementCounter()
                //check match
                if (openCards[0].dataset.card === openCards[1].dataset.card){
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');

                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    openCards = [];
                      setTimeout(() => {

                        if (checkWin()){
                          const finishTime = new Date()

                          // compare the two
                          const diffTime = finishTime - startTime

                          console.log(Math.round(diffTime/1000))

                          let resetGame = window.confirm(`You win! That took you ${Math.round(diffTime/1000)} seconds. Do you want to play again?`);
                          if (resetGame) {
                            initGame();
                          }
                        }
                      }, 500);

                } else {
                //clear cards if no match
                setTimeout(() => {
                  openCards.forEach((card) => {
                    card.classList.remove('open', 'show');
                });
                openCards = [];

              }, 500);
             }

             }


          }

        });
      });
}

const incrementCounter = () => {
    const countInt = parseInt(moveCounter.innerHTML)
    moveCounter.innerHTML = countInt+1;
}

initGame();




resetButton.addEventListener('click', () => {
  initGame();
});



const checkWin = () => {
  let isWin = true
  allCards.forEach((card) => {
    if(!card.classList.contains('match')) {
      isWin = false
    }
  })
  return isWin;
}