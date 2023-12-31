// Jelszó generálás
const generatePassword = () => {
  let random = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "!@#$%^&*",
  ];

  let randompass = "";

  while (!isValidPassword(randompass)[0]) {
    randompass = "";
    for (let i = 0; i < 16; i++) {
      let randomkeys = random[Math.floor(Math.random() * random.length)];
      let current = Math.floor(Math.random() * randomkeys.length + 1);
      randompass += randomkeys.charAt(current);
    }
  }

  document.getElementById("password").value = randompass;
};

// Név validálás
const isValidName = (name) => {
  if (name.length === 0) {
    return [false, "A név megadása kötelező."];
  }

  if (!name[0].match(/[A-Z]/)) {
    return [false, "A név nagybetűvel kell kezdődjön."];
  }

  if (name.match(/\d/)) {
    return [false, "A név nem tartalmazhat számot."];
  }

  return [true, ""];
};

// Email validálás
const isValidEmail = (email) => {
  if (!email.includes("@")) {
    return [false, "Az email címnek tartalmaznia kell a @ jelet."];
  }

  const [local, domain] = email.split("@");

  if (local.length === 0 || domain.length === 0) {
    return [false, "Az email címnek tartalmaznia kell a @ jelet."];
  }

  if (!domain.includes(".")) {
    return [false, "Az email címnek tartalmaznia kell a . jelet."];
  }

  const [_, domainExtension] = domain.split(".");

  if (!["com", "hu", "net", "edu"].includes(domainExtension)) {
    return [false, "Az email címnek csak com, hu, net, edu lehet a vége."];
  }

  return [true, ""];
};

// Jelszó validálás
const isValidPassword = (password) => {
  if (password.length < 8) {
    return [false, "A jelszónak legalább 8 karakter hosszúnak kell lennie."];
  }

  if (!password.match(/[A-Z]/)) {
    return [false, "A jelszónak tartalmaznia kell legalább egy nagybetűt."];
  }

  if (!password.match(/[a-z]/)) {
    return [false, "A jelszónak tartalmaznia kell legalább egy kisbetűt."];
  }

  if (!password.match(/\d/)) {
    return [false, "A jelszónak tartalmaznia kell legalább egy számot."];
  }

  if (!password.match(/[!@#$%^&*]/)) {
    return [
      false,
      "A jelszónak tartalmaznia kell legalább egy speciális karaktert.",
    ];
  }

  return [true, ""];
};

// Foglalkozás validálás
const isValidProfession = (profession) => {
  if (profession.length < 3) {
    return [
      false,
      "A foglalkozásnak legalább 3 karakter hosszúnak kell lennie.",
    ];
  }

  return [true, ""];
};

// Ágazat validálás
const isValidSector = (sector) => {
  if (sector.length === 0) {
    return [false, "Az ágazat megadása kötelező."];
  }

  return [true, ""];
};
// Jelszó bevitel / generálás
var isRandomlyGenerated = true;

generatePassword();

document
  .getElementById("switch-password-mode")
  .addEventListener("click", function () {
    if (isRandomlyGenerated) {
      document.getElementById("password").value = "";
      document
        .getElementById("password")
        .attributes.removeNamedItem("readonly");
      this.innerHTML = "inkább automatikusan generálok egyet...";
    } else {
      generatePassword();
      document.getElementById("password").setAttribute("readonly", true);
      this.innerHTML = "inkább megadok egyet...";
    }

    isRandomlyGenerated = !isRandomlyGenerated;
  });

// Error üzenetek
const toggleError = (id, message) => {
  const label = document.querySelector(`label[for="${id}"]`);
  const labelIcon = document.querySelector(`label[for="${id}"] svg`);
  const input = document.getElementById(id);
  const error = document.getElementById(`${id}-error`);

  const shouldHide = message === undefined;

  if (label) {
    if (shouldHide) {
      label.classList.remove("error-msg");
    } else {
      label.classList.add("error-msg");
    }
  }

  if (labelIcon) {
    if (shouldHide) {
      labelIcon.classList.remove("error-msg");
    } else {
      labelIcon.classList.add("error-msg");
    }
  }

  if (input) {
    if (shouldHide) {
      input.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
    }
  }

  if (error) {
    error.innerHTML = message || "";
    if (shouldHide) {
      error.classList.add("hide");
    } else {
      error.classList.remove("hide");
    }
  }
};

const runValidation = (id, value, validator, event) => {
  let [success, message] = validator(value);

  if (!success) {
    toggleError(id, message);
    event.preventDefault();
  } else {
    toggleError(id, undefined);
  }
};

//Validáció lefuttatása.
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    let data = new FormData(e.target);

    runValidation("username", data.get("username"), isValidName, e);
    runValidation("email", data.get("email"), isValidEmail, e);
    runValidation("profession", data.get("profession"), isValidProfession, e);
    runValidation("sector", data.get("sector"), isValidSector, e);
    runValidation("password", data.get("password"), isValidPassword, e);
  });
