function startGame() {

  // Generate random number 1–100
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  let attempts = 0;
  const maxAttempts = 7;
  let guess = null;

  // While loop for continuous gameplay
  while (guess !== randomNumber && attempts < maxAttempts) {

    let input = prompt("Enter your guess (1-100):");

    // Convert string → number
    guess = Number(input);
    attempts++;

    console.log("User guess type:", typeof guess);

    if (guess === randomNumber) {
      document.getElementById("result").innerText =
        "🎉 Correct! You guessed the number!";
      document.getElementById("attempts").innerText =
        "Attempts used: " + attempts;
      return;
    }

    if (guess > randomNumber) {
      alert("Too High!");
    } else if (guess < randomNumber) {
      alert("Too Low!");
    }
  }

  // Game over
  document.getElementById("result").innerText =
    "❌ Game Over! The number was " + randomNumber;
  document.getElementById("attempts").innerText =
    "Attempts used: " + attempts;
}

