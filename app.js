const guessedNumber = document.getElementById('guessedNumber');
const guessRemaining = document.getElementById('guessRemaining');
const guesses = document.getElementById('guesses');
const modal = document.getElementById('modal');

let remainingGuesses = 10;
let numberOfGuesses = 1;

const randomNumber = generateRandomNumber();

function guessNumber(number) {
  if (remainingGuesses > 0) {
    remainingGuesses--;
    guessRemaining.innerText = remainingGuesses;

    if (number > randomNumber) {
      if ((randomNumber - number) >= -5) {
        createGuesses(numberOfGuesses, number, 'Your guess is high!');
      } else {
        createGuesses(numberOfGuesses, number, 'Your guess is too high!');
      }
    } else if (number < randomNumber) {
      if ((randomNumber - number) <= 5) {
        createGuesses(numberOfGuesses, number, 'Your guess is low!');
      } else {
        createGuesses(numberOfGuesses, number, 'Your guess is too low!');
      }
    } else {
      createGuesses(numberOfGuesses, number, 'Your guess is right!');
      guessedNumber.blur();
      popup("win");
    }
    guessedNumber.value = '';
  }
  if ((remainingGuesses == 0) && (randomNumber != number)) {
    guessedNumber.blur();
    popup("lose", randomNumber);
  }
}

function catchGuessedNumber(number) {
  if (number) {
    guessNumber(number);
  }
}

function catchGuessedNumberHandler() {
  catchGuessedNumber();
}

function createGuesses(guessNumber, number, message) {
  const guess = document.createElement('div');
  guess.innerHTML = `
      <div>
        <div class="bg-red-300 inline-block px-2 rounded-full text-sm">Attempt ${guessNumber}</div>
        <div class="flex items-center justify-center text-md">
          <span class="bg-red-200 text-red-400 rounded-full px-2 mr-1">${number}</span> ${message}
        </div>
      </div>
  `;
  guesses.appendChild(guess);
  numberOfGuesses++;
}

function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return randomNumber;
}

function popup(result, actualNumber) {
  modal.style.display = 'block';
  message(result, actualNumber);
}

function reset() {
  modal.style.display = "none";
  location.reload();
}

function message(result, actualNumber) {
  const modalContent = document.createElement('div');
  modalContent.classList.add('h-screen', 'flex', 'items-center', 'justify-center');
  modalContent.innerHTML = `
    <div id="modal" class="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full ${result === 'win' && "bg-green-100"} ${result === 'lose' && "bg-red-100"}">
          ${result === 'win' ? (
      `<svg class="text-green-600" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" /></svg>`
    ) : (
      `<svg class="text-red-600" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m12.55 37.05-1.6-1.6L22.4 24 10.95 12.55l1.6-1.6L24 22.4l11.45-11.45 1.6 1.6L25.6 24l11.45 11.45-1.6 1.6L24 25.6Z" /></svg>`
    )}
        </div>
        <h3 class="mt-3 text-lg leading-6 font-medium text-gray-900 uppercase">${result === 'win' ? "Congratulations" : "Sorry"}</h3>
        <div class="mt-2 px-7">
          <p class="text-sm text-gray-500">
            ${result === 'win' ? "Your guess is correct" : `Oops! You've lost the game. Actually the number is ${actualNumber}.`}
          </p>
        </div>
        <div class="items-center px-4 mt-4">
          <button id="playAgainBtn"
            class="px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 ${result === 'win' ? "bg-green-500 hover:bg-green-600 focus:ring-green-300" : 'bg-red-500 hover:bg-red-600 focus:ring-red-300'}" onclick="reset()">
            ${result === 'win' ? 'Play Again' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  `;
  modal.appendChild(modalContent);
}
