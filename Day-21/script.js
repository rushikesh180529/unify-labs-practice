// ================= SETTINGS MODULE (Inside Same File) =================

const STORAGE_KEY = "app_settings";

// Save settings to localStorage
function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettings() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return {
      theme: "light",
      language: "English"
    };
  }

  return JSON.parse(data);
}

// ================= UI LOGIC =================

const themeToggle = document.getElementById("themeToggle");
const languageSelect = document.getElementById("languageSelect");
const welcomeText = document.getElementById("welcomeText");

// Apply settings to UI
function applySettings(settings) {

  // Theme logic
  if (settings.theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  } else {
    document.body.classList.remove("dark");
    themeToggle.checked = false;
  }

  // Language logic
  languageSelect.value = settings.language;
  updateLanguage(settings.language);
}

// Update welcome message
function updateLanguage(language) {
  if (language === "Hindi") {
    welcomeText.innerText = "स्वागत है!";
  } else if (language === "Spanish") {
    welcomeText.innerText = "¡Bienvenido!";
  } else {
    welcomeText.innerText = "Welcome!";
  }
}

// ================= EVENT LISTENERS =================

themeToggle.addEventListener("change", () => {
  const newSettings = {
    theme: themeToggle.checked ? "dark" : "light",
    language: languageSelect.value
  };

  applySettings(newSettings);
  saveSettings(newSettings);
});

languageSelect.addEventListener("change", () => {
  const newSettings = {
    theme: themeToggle.checked ? "dark" : "light",
    language: languageSelect.value
  };

  updateLanguage(newSettings.language);
  saveSettings(newSettings);
});

// ================= LOAD SAVED SETTINGS ON START =================

const savedSettings = loadSettings();
applySettings(savedSettings);