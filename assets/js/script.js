// Function that returns a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to generate an array of 5 unique random numbers between 0 and 100
function generateRandomNumbers() {
  let numbers = [];
  while (numbers.length < 5) {
    let randomNumber = getRandomNumber(0, 100);

    // Adds the random number to the array only if it's not already present
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}

// Function to display the generated numbers within an HTML Element
function displayNumbers(numbers) {
  let numbersDiv = document.getElementById('numbers');
  numbersDiv.innerHTML = `Numeri: <strong>${numbers.join(' ')}</strong>`;
}

// Function to get user input via prompts to enter 5 numbers
function getUserInput(callback) {
  let numbersDiv = document.getElementById('numbers');
  numbersDiv.style.display = 'none';

  // Delays user input by 100 milliseconds
  setTimeout(function () {
    let userNumbers = [];
    for (let i = 0; i < 5; i++) {
      let number = parseInt(prompt(`Inserisci il numero ${(i + 1)}`));
      userNumbers.push(number);
    }

    numbersDiv.style.display = 'block';

    // Calls the callback function with user input
    callback(userNumbers);
  }, 100);
}

// Function to compare the generated numbers with user input
function compareNumbers(randomNumbers, userNumbers) {
  let correctNumbers = [];
  for (let i = 0; i < 5; i++) {
    // If a generated number and a user input number are equal, they are added to the correctNumbers array
    if (randomNumbers[i] === userNumbers[i]) {
      correctNumbers.push(randomNumbers[i]);
    }
  }
  return correctNumbers;
}

// Function to update the countdown display
function updateCountdown(seconds) {
  let countdownDiv = document.getElementById('countdown');
  countdownDiv.innerHTML = `<i class="fas fa-stopwatch"></i> ${seconds}s`;
  if (seconds === 0) {
    countdownDiv.textContent = ''
  }
}

// Function to handle the entire process
function startGame() {
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
