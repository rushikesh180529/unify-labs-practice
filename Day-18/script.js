let myPet = null;

// ================= PET CLASS =================
class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this._health = 50; // private-like property
  }

  // Getter
  get health() {
    return this._health;
  }

  // Setter (keeps health between 0 and 100)
  set health(value) {
    if (value > 100) {
      this._health = 100;
    } else if (value < 0) {
      this._health = 0;
    } else {
      this._health = value;
    }
  }

  feed() {
    this.health += 10;
    return `${this.name} has been fed! 🍖`;
  }

  play() {
    this.health -= 15;
    return `${this.name} played too much! 🎾`;
  }

  getStatus() {
    return `
Name: ${this.name}
Type: ${this.type}
Health: ${this.health}
`;
  }
}

// ================= UI FUNCTIONS =================
function createPet() {
  const name = document.getElementById("petName").value;
  const type = document.getElementById("petType").value;

  if (!name || !type) return;

  myPet = new Pet(name, type);

  document.getElementById("controls").style.display = "block";
  document.getElementById("output").innerText =
    `🎉 ${name} the ${type} is born!\nHealth: ${myPet.health}`;
}

function feedPet() {
  if (!myPet) return;
  const msg = myPet.feed();
  document.getElementById("output").innerText =
    msg + "\nHealth: " + myPet.health;
}

function playPet() {
  if (!myPet) return;
  const msg = myPet.play();
  document.getElementById("output").innerText =
    msg + "\nHealth: " + myPet.health;
}

function showStatus() {
  if (!myPet) return;
  document.getElementById("output").innerText = myPet.getStatus();
}