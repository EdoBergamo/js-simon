function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomNumbers() {
  let numbers = [];
  for (let i = 0; i < 5; i++) {
    numbers.push(getRandomNumber(1, 9));
  }
  return numbers;
}

function displayNumbers(numbers) {
  let numbersDiv = document.getElementById('numbers');
  numbersDiv.innerText = 'Numeri: ' + numbers.join(' ');
}

function getUserInput() {
  let userNumbers = [];
  for (let i = 0; i < 5; i++) {
    let number = parseInt(prompt('Inserisci il numero ' + (i + 1)));
    userNumbers.push(number);
  }
  return userNumbers;
}

function compareNumbers(randomNumbers, userNumbers) {
  let correctNumbers = [];
  for (let i = 0; i < 5; i++) {
    if (randomNumbers[i] === userNumbers[i]) {
      correctNumbers.push(randomNumbers[i]);
    }
  }
  return correctNumbers;
}

let randomNumbers = generateRandomNumbers();
displayNumbers(randomNumbers);

setTimeout(function() {
  document.getElementById('numbers').innerText = '';

  let userNumbers = getUserInput();

  let correctNumbers = compareNumbers(randomNumbers, userNumbers);

  if (correctNumbers.length > 0) {
    alert('Hai indovinato ' + correctNumbers.length + ' numeri: ' + correctNumbers.join(', '));
  } else {
    alert('Nessun numero indovinato. Ritenta!');
  }
}, 30000);