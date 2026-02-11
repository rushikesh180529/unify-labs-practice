// ================= GLOBAL STATE =================
const MASTER_PIN = 9999;
let balance = 1000;
const SECRET_WORD = "core";
const SECRET_MESSAGE = "🔐 Hidden link unlocked: https://example.com";

// ================= SCREEN OUTPUT =================
function print(text) {
  document.getElementById("screen").innerText += text + "\n";
}

// ================= BOOT SYSTEM =================
function bootSystem() {
  document.getElementById("screen").innerText = "";

  let attempts = 3;
  let loggedIn = false;

  while (attempts > 0) {
    let pin = Number(prompt("ENTER MASTER PIN:"));

    if (pin === MASTER_PIN) {
      loggedIn = true;
      break;
    } else {
      attempts--;
      alert("WRONG PIN. Attempts left: " + attempts);
    }
  }

  if (!loggedIn) {
    print("💀 SYSTEM SELF-DESTRUCT 💀");
    return;
  }

  // ASCII Banner
  print("================================");
  print("   WELCOME TO VIRTUAL CORE v1.0");
  print("================================");

  mainKernel();
}

// ================= MAIN TERMINAL LOOP =================
function mainKernel() {
  while (true) {
    let cmd = prompt("[V-CORE]> Type command: (bank, shop, vault, exit)");

    if (!cmd) continue;
    cmd = cmd.toLowerCase();

    switch (cmd) {
      case "bank":
        bankModule();
        break;

      case "shop":
        shopModule();
        break;

      case "vault":
        vaultModule();
        break;

      case "exit":
        print("SYSTEM SHUTDOWN...");
        return;

      default:
        alert("UNKNOWN COMMAND");
    }
  }
}

// ================= BANK MODULE =================
function bankModule() {
  while (true) {
    let cmd = prompt("BANK: deposit, withdraw, balance, back");

    if (!cmd) continue;
    cmd = cmd.toLowerCase();

    if (cmd === "deposit") {
      let amount = parseFloat(prompt("Enter amount:"));
      if (!isNaN(amount) && amount > 0) {
        balance += amount;
        alert("Deposited! New balance: " + balance);
      }

    } else if (cmd === "withdraw") {
      let amount = parseFloat(prompt("Enter amount:"));
      if (amount > balance) {
        alert("INSUFFICIENT FUNDS");
      } else if (!isNaN(amount) && amount > 0) {
        balance -= amount;
        alert("Withdrawn! Balance: " + balance);
      }

    } else if (cmd === "balance") {
      alert("Balance: " + balance);

    } else if (cmd === "back") {
      return;
    }
  }
}

// ================= SHOP MODULE =================
function shopModule() {
  const UNIT_PRICE = 50;

  let qty = Number(prompt("Enter quantity:"));
  if (isNaN(qty) || qty <= 0) return;

  let discount = 0;

  if (qty <= 5) {
    discount = 0;
  } else if (qty <= 10) {
    discount = 0.1;
  } else {
    discount = 0.2;
  }

  let total = qty * UNIT_PRICE;
  total = total - total * discount;

  if (total > balance) {
    alert("Not enough balance!");
    return;
  }

  balance -= total;
  alert("Purchased! Total: " + total + " | Balance: " + balance);
}

// ================= VAULT MODULE =================
function vaultModule() {
  alert("Hint: It's the system name...");

  let guess = prompt("Enter secret word:");

  if (guess && guess.toLowerCase() === SECRET_WORD) {
    alert("ACCESS GRANTED\n" + SECRET_MESSAGE);
  } else {
    alert("WRONG! Returning to main menu.");
  }
}
