// ===============================
// WELCOME MESSAGE
// ===============================
function showWelcome() {
  const userName = document.getElementById("username").value;
  const message = "Welcome, " + userName + "!";
  document.getElementById("welcomeText").innerText = message;

  console.log("Type of username:", typeof userName);
}

// ===============================
// CALCULATOR
// ===============================
function calculate() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  let sum = num1 + num2;
  let product = num1 * num2;
  let remainder = num1 % num2;

  document.getElementById("sum").innerText = "Sum: " + sum;
  document.getElementById("product").innerText = "Product: " + product;
  document.getElementById("remainder").innerText = "Remainder: " + remainder;

  console.log("Type of num1:", typeof num1);
  console.log("Type of sum:", typeof sum);
}

// ===============================
// MAGIC 8 BALL
// ===============================
function magicBall() {
  let randomNumber = Math.floor(Math.random() * 3);
  let answer = "";

  if (randomNumber === 0) {
    answer = "Yes 👍";
  } else if (randomNumber === 1) {
    answer = "No ❌";
  } else {
    answer = "Maybe 🤔";
  }

  document.getElementById("magicAnswer").innerText = answer;
}
