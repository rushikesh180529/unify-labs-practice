// ================= TITLE CASE FUNCTION =================
const toTitleCase = (text) => {
  return text
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function formatTitle() {
  const text = document.getElementById("textInput").value;
  const result = toTitleCase(text);
  document.getElementById("result").innerText = result;
}

// ================= VOWEL COUNT FUNCTION =================
const countVowelsFunc = (text) => {
  const vowels = "aeiou";
  let count = 0;

  for (let char of text.toLowerCase()) {
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
};

function countVowels() {
  const text = document.getElementById("textInput").value;
  const total = countVowelsFunc(text);

  document.getElementById("result").innerText =
    "Total vowels: " + total +
    " | Text length: " + text.length +
    " | Avg vowels per word: " +
    Math.round(total / (text.split(" ").length || 1));
}

// ================= SECRET MESSAGE =================
const generateSecret = (text) => {
  const bannedWords = ["password", "secret", "bank"];

  let words = text.split(" ");

  words = words.map(word => {
    if (bannedWords.includes(word.toLowerCase())) {
      return "***";
    }
    return word;
  });

  return words.join(" ");
};

function secretMessage() {
  const text = document.getElementById("textInput").value;
  const result = generateSecret(text);
  document.getElementById("result").innerText = result;
}
