// ================= MOCK DATABASE =================

// Student tasks
const tasks = [
  { name: "Login Page", status: "Completed" },
  { name: "API Integration", status: "Pending" },
  { name: "Dashboard UI", status: "Completed" },
  { name: "Testing", status: "Pending" }
];

// Product prices
const prices = [100, 250, 80, 500];

// Company expenses
const expenses = [1200, 800, 450, 300];

// ================= FILTER TASKS =================
function showTasks() {
  const completed = tasks.filter(task => task.status === "Completed");
  const pending = tasks.filter(task => task.status === "Pending");

  let text = "✅ Completed Tasks:\n";
  completed.forEach(t => text += "- " + t.name + "\n");

  text += "\n⏳ Pending Tasks:\n";
  pending.forEach(t => text += "- " + t.name + "\n");

  document.getElementById("output").innerText = text;
}

// ================= MAP PRICES =================
function calculatePrices() {
  const TAX = 0.18;

  const newPrices = prices.map(p => {
    return p + p * TAX;
  });

  let text = "Prices with 18% tax:\n";
  newPrices.forEach(p => text += "₹" + p.toFixed(2) + "\n");

  document.getElementById("output").innerText = text;
}

// ================= REDUCE EXPENSES =================
function totalBudget() {
  const total = expenses.reduce((sum, val) => sum + val, 0);

  document.getElementById("output").innerText =
    "💰 Total Company Budget: ₹" + total;
}
