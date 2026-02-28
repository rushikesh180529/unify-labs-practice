// ==========================================
// SAFE LOCAL STORAGE WRAPPER
// ==========================================
function safeGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail in sandbox
  }
}

// ==========================================
// STATE MODULE
// ==========================================
const State = (() => {

  const state = {
    coins: [],
    filtered: [],
    favorites: safeGet("favorites", []),
    theme: safeGet("theme", "light")
  };

  const setCoins = (data) => {
    state.coins = data;
    state.filtered = [...data];
  };

  const setFiltered = (data) => {
    state.filtered = data;
  };

  const toggleFavorite = (id) => {
    if (state.favorites.includes(id)) {
      state.favorites = state.favorites.filter(f => f !== id);
    } else {
      state.favorites.push(id);
    }
    safeSet("favorites", state.favorites);
  };

  const toggleTheme = () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    safeSet("theme", state.theme);
  };

  return {
    state,
    setCoins,
    setFiltered,
    toggleFavorite,
    toggleTheme
  };

})();

// ==========================================
// API MODULE
// ==========================================
const API = (() => {

  const URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20";

  const fetchCoins = async () => {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  };

  return { fetchCoins };

})();

// ==========================================
// UI MODULE
// ==========================================
const UI = (() => {

  const container = document.getElementById("container");
  const loading = document.getElementById("loading");
  const errorDiv = document.getElementById("error");

  const render = (coins, favorites) => {
    container.innerHTML = "";

    coins.forEach(coin => {

      const card = document.createElement("div");
      card.className = "card";

      const isFav = favorites.includes(coin.id);

      card.innerHTML = `
        <h3>${coin.name}</h3>
        <p>💲 $${coin.current_price}</p>
        <p>🏦 Market Cap: $${coin.market_cap}</p>
        <button data-id="${coin.id}">
          ${isFav ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      `;

      container.appendChild(card);
    });
  };

  const showLoading = (status) => {
    loading.style.display = status ? "block" : "none";
  };

  const showError = (msg) => {
    errorDiv.innerText = msg;
  };

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark", theme === "dark");
  };

  return { render, showLoading, showError, applyTheme };

})();

// ==========================================
// APP CONTROLLER
// ==========================================
const App = (() => {

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const themeToggle = document.getElementById("themeToggle");

  const init = async () => {

    UI.applyTheme(State.state.theme);
    UI.showLoading(true);

    try {
      const data = await API.fetchCoins();
      State.setCoins(data);
      UI.render(State.state.filtered, State.state.favorites);
    } catch (error) {
      UI.showError("Failed to load data.");
    } finally {
      UI.showLoading(false);
    }
  };

  const setupEvents = () => {

    // SEARCH
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();

      const filtered = State.state.coins.filter(c =>
        c.name.toLowerCase().includes(query)
      );

      State.setFiltered(filtered);
      UI.render(State.state.filtered, State.state.favorites);
    });

    // SORT
    sortSelect.addEventListener("change", () => {

      const sorted = [...State.state.filtered];

      if (sortSelect.value === "price") {
        sorted.sort((a, b) => b.current_price - a.current_price);
      } else {
        sorted.sort((a, b) => b.market_cap - a.market_cap);
      }

      State.setFiltered(sorted);
      UI.render(State.state.filtered, State.state.favorites);
    });

    // FAVORITES (EVENT DELEGATION)
    document.getElementById("container")
      .addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
          State.toggleFavorite(e.target.dataset.id);
          UI.render(State.state.filtered, State.state.favorites);
        }
      });

    // THEME
    themeToggle.addEventListener("click", () => {
      State.toggleTheme();
      UI.applyTheme(State.state.theme);
    });

  };

  return { init, setupEvents };

})();

// ==========================================
// START APP
// ==========================================
App.init();
App.setupEvents();