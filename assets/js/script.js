// Function that returns a random number between min and max
function getRandomNumber(min, max) {
  // Check if 'min' and 'max' values are valid
  if (typeof min !== 'number' || typeof max !== 'number' || min < 0 || max <= min) {
    console.error('Valori non validi per min e max.');
  }
  
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to generate an array of 5 unique random numbers between 0 and 100
function generateRandomNumbers() {
  let numbers = [];
  const maxAttempts = 200; // To avoid infinite loops
  let attempts = 0;

  while (numbers.length < 5) {
    let randomNumber = getRandomNumber(0, 100);
    attempts++;

    // Adds the random number to the array only if it's not already present
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }

    // Check if attempts is greater or equals to maxAttempts
    if (attempts >= maxAttempts) {
      console.error('Impossibile generare numeri casuali univoci.');
    }
  }
  return numbers;
}

// Function to display the generated numbers within an HTML Element
function displayNumbers(numbers) {
  let numbersDiv = document.getElementById('numbers');

  // If HTML Element does not exists throw and error
  if (!numbersDiv) {
    console.error('Elemento HTML non trovato.');
  }

  numbersDiv.innerHTML = `Numeri: <strong>${numbers.join(' ')}</strong>`;
}

// Function to get user input via prompts to enter 5 numbers
function getUserInput(callback, userNumbers = [], index = 0) {
  let numbersDiv = document.getElementById('numbers');
  numbersDiv.style.display = 'none';

  // If HTML Element does not exists throw and error
  if (!numbersDiv) {
    console.error('Elemento HTML non trovato.');
  }

  // Delays user input by 100 milliseconds
  setTimeout(function () {
    if (index < 5) {
      let userInput = prompt(`Inserisci il numero ${(index + 1)}`);

      // Check if userInput is a valid number
      if (!isNaN(userInput) && userInput !== null) {
        userNumbers.push(parseInt(userInput));
        getUserInput(callback, userNumbers, index + 1);
      } else {
        alert('Inserisci un numero valido.');
        getUserInput(callback, userNumbers, index);
      }
    } else {
      numbersDiv.style.display = 'block';
      // Calls the callback function with user input
      callback(userNumbers);
    }
  }, 100);
}

// Function to compare the generated numbers with user input
function compareNumbers(randomNumbers, userNumbers) {
  return randomNumbers.filter(number => userNumbers.includes(number));
}

// Function to update the countdown display
function updateCountdown(seconds) {
  let countdownDiv = document.getElementById('countdown');
  countdownDiv.innerHTML = `<i class="fas fa-stopwatch"></i> ${seconds}s`;

  // If HTML Element does not exists throw and error
  if (!countdownDiv) {
    throw new Error('Elemento HTML non trovato.');
  }

  if (seconds === 0) {
    countdownDiv.textContent = ''
  }
}

// Function to handle the entire process
function startGame() {
  // *--------------------------------------------------*
  // * TODO: Implement Try Catch Block to handle Errors *
  // *--------------------------------------------------*

  // Generate 5 unique random numbers and display them
  let randomNumbers = generateRandomNumbers();
  displayNumbers(randomNumbers);

  let secondsLeft = 29;

  // Countdown timer
  let countdownInterval = setInterval(function () {
    updateCountdown(secondsLeft);
    secondsLeft--;

    if (secondsLeft < 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // After 30 seconds, asks the user to input 5 numbers and compares them with the generated ones
  setTimeout(function () {
    document.getElementById('numbers').innerText = '';
    clearInterval(countdownInterval); // Clear the countdown interval

    getUserInput(function (userNumbers) {
      let correctNumbers = compareNumbers(randomNumbers, userNumbers);

      /*
       * Shows a message to the user based on the guessed numbers
       * Using if structure instead of Thernary Operator
      */
      if (correctNumbers.length == 1) {
        alert(`Hai indovinato ${correctNumbers.length} numero: ${correctNumbers}`); // Output -> Hai indovinato 1 numero: 34
      } else if (correctNumbers.length > 0 && correctNumbers.length !== 1) {
        alert(`Hai indovinato ${correctNumbers.length} numeri: ${correctNumbers.join(', ')}`); // Output -> Hai indovinato 4 numeri: 1, 2, 3, 4
      } else {
        alert('Nessun numero indovinato. Ritenta!'); // Output -> Nessun numero indovinato. Ritenta!
      }
    });
  }, (secondsLeft + 1) * 1000);
}

// Start the game
startGame();
