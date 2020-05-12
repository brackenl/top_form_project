const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const country = document.getElementById("country");
const countryError = document.getElementById("country-error");
const postCode = document.getElementById("post-code");
const postCodeError = document.getElementById("post-code-error");
const postCodeRegExp = RegExp(
  "^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$"
);
const password = document.getElementById("passwordinput");
const passwordError = document.getElementById("password-error");
const digitRegExp = RegExp("\\d+");
const punctuationRegExp = RegExp("\\W+");
const checkPassword = document.getElementById("check-password");
const checkPasswordError = document.getElementById("check-password-error");
const form = document.querySelector("form");

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
}

function showCountryError() {
  if (country.validity.valueMissing) {
    countryError.textContent = "You need to enter a country.";
  } else if (country.validity.tooShort || country.validity.tooLong) {
    countryError.textContent = `Country should be at least ${country.minLength} and a maximum of ${country.maxLength} characters. You entered ${country.value.length}.`;
  }
}

function showPostCodeError() {
  if (postCode.validity.valueMissing) {
    postCodeError.textContent = "You need to enter a post code.";
  } else if (!postCodeRegExp.test(postCode.value)) {
    postCodeError.textContent = "You need to enter a valid post code.";
  }
}

function showPasswordError() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to enter a password.";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Your password must be at least ${password.minLength} characters.`;
  } else if (!punctuationRegExp.test(password.value)) {
    passwordError.textContent =
      "Your password must contain at least one digit and at least one symbol.";
  } else if (!digitRegExp.test(password.value)) {
    passwordError.textContent =
      "Your password must contain at least one digit and at least one symbol.";
  } else if (password.validity.tooShort) {
    passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
  }
}

function showCheckPasswordError() {
  if (checkPassword.validity.valueMissing) {
    checkPasswordError.textContent = "You need to verify your password.";
  }
  comparePasswords();
}

function comparePasswords() {
  let password1 = password.value;
  let password2 = checkPassword.value;
  if (password1 == password2) {
    return true;
  } else {
    checkPasswordError.textContent =
      "The passwords you have entered do not match.";
    return false;
  }
}

function showError() {
  showEmailError();
  showCountryError();
  showPostCodeError();
  showPasswordError();
  showCheckPasswordError();
}

email.addEventListener("input", function (event) {
  if (email.validity.valid) {
    emailError.innerHTML = "";
    emailError.className = "error";
  } else {
    showEmailError();
  }
});

country.addEventListener("input", function (event) {
  if (country.validity.valid) {
    countryError.innerHTML = "";
    countryError.className = "error";
  } else {
    showCountryError();
  }
});

postCode.addEventListener("input", function (event) {
  if (postCode.validity.valid && postCodeRegExp.test(postCode.value)) {
    postCodeError.innerHTML = "";
    postCodeError.className = "error";
  } else {
    showPostCodeError();
  }
});

password.addEventListener("input", function (event) {
  if (
    password.validity.valid &&
    punctuationRegExp.test(password.value) &&
    digitRegExp.test(password.value)
  ) {
    passwordError.innerHTML = "";
    passwordError.className = "error";
  } else {
    showPasswordError();
  }
});

checkPassword.addEventListener("input", function (event) {
  if (checkPassword.validity.valid && comparePasswords()) {
    checkPasswordError.innerHTML = "";
    checkPasswordError.className = "error";
  } else {
    showCheckPasswordError();
  }
});

form.addEventListener("submit", function (event) {
  if (
    !email.validity.valid ||
    !country.validity.valid ||
    !postCode.validity.valid ||
    !password.validity.valid ||
    !checkPassword.validity.valid
  ) {
    showError();
    event.preventDefault();
  } else {
    alert("Form complete. High five!");
  }
});
