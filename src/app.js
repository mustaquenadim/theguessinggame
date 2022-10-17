const numberInput = document.getElementById('numberInput');
const guessBtn = document.getElementById('guessBtn');
const guessRemaining = document.getElementById('guessRemaining');
const guessedNumber = document.getElementById('guessedNumber');
const guesses = document.getElementById('guesses');

let remainingGuesses = 10;
let numberOfGuesses = 1;
console.log('remaining guess______', remainingGuesses);

const randomNumber = generateRandomNumber();
console.log('random number______', randomNumber);

function guessNumber(number) {
  if (remainingGuesses > 1) {
    remainingGuesses--;
    guessRemaining.innerText = remainingGuesses;

    if (number > randomNumber) {
      // console.log("Your guess is too high!");
      createGuesses(numberOfGuesses, number, 'Your guess is too high!');
    } else if (number < randomNumber) {
      // console.log("Your guess is too low!");
      createGuesses(numberOfGuesses, number, 'Your guess is too low!');
    } else {
      // console.log("Your guess is right!");
      createGuesses(numberOfGuesses, number, 'Your guess is right!');
      success();
    }
    numberInput.value = '';
    // guessBtn.disabled = true;
  } else {
    remainingGuesses--;
    guessRemaining.innerText = remainingGuesses;
    console.log("Sorry! You've no guess remaining!");
  }
}

function myFunc(value) {
  if (value) {
    console.log('first', value);
    guessNumber(value);
  }
}

/**
 * "Guess" Button onClick function
 */
function myBtn() {
  myFunc();
}

/**
 * create guesses element
 */
function createGuesses(guessNumber, number, message) {
  const guess = document.createElement('div');
  // guess.classList.add("guesses");
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

/**
 * generate random number
 */
function generateRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  return randomNumber;
}

// Grabs all the Elements by their IDs which we had given them
const modal = document.getElementById('modal');
const btn = document.getElementById('open-btn');
const playAgainBtn = document.getElementById('play-again-btn');

function success() {
  modal.style.display = 'block';
  message();
}
// We want the modal to close when the OK button is clicked
// button.onclick = function () {
//   modal.style.display = "none";
// }

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function message(result = "win") {
  const mod = document.createElement('div');
  mod.classList.add('modal-content');
  mod.innerHTML = `
  <div id="modal" class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
  <div class="mt-3 text-center">
    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
      <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <h3 class="mt-3 text-lg leading-6 font-medium text-gray-900 uppercase">Congratulations</h3>
    <div class="mt-2 px-7">
      <p class="text-sm text-gray-500">
        Your guess is correct
      </p>
    </div>
    <div class="items-center px-4 mt-4">
      <button id="play-again-btn"
        class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
        ${result === "win" ? "Play Again" : "Try Again"}
      </button>
    </div>
  </div>
</div>
  `;
  modal.appendChild(mod);
}
