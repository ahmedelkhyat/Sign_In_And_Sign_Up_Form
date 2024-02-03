// Switch between Sign In and Sign Up
const container = document.querySelector(".container");
const signInButton = document.getElementById("sign-in-btn");
const signUpButton = document.getElementById("sign-up-btn");

signUpButton.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Sign In validation and Sign Up validation
const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");

signInForm.addEventListener("submit", (event) => {
  validateSignInForm(event);
});

signUpForm.addEventListener("submit", (event) => {
  validateSignUpForm(event);
});

// Input fields validation for Sign In
const signInEmail = document.querySelector("[name='sign-in-email']");
const signInEmailError = document.getElementById("sign-in-email-error");

const signInPassword = document.querySelector("[name='sign-in-password']");
const signInPasswordError = document.getElementById("sign-in-password-error");

signInEmail.addEventListener("blur", () => {
  validateEmail(signInEmail.value, signInEmailError);
});

signInPassword.addEventListener("blur", () => {
  validatePassword(signInPassword.value, signInPasswordError);
});

// Input fields validation for Sign Up
const firstName = document.querySelector("[name='first-name']");
const firstNameError = document.getElementById("first-name-error");

const lastName = document.querySelector("[name='last-name']");
const lastNameError = document.getElementById("last-name-error");

const email = document.querySelector("[name='email']");
const emailError = document.getElementById("email-error");

const password = document.querySelector("[name='password']");
const passwordError = document.getElementById("password-error");

const confirmPassword = document.querySelector("[name='confirm-password']");
const confirmPasswordError = document.getElementById("confirm-password-error");

const male = document.getElementById("male");
const female = document.getElementById("female");
const genderError = document.getElementById("gender-error");

firstName.addEventListener("blur", () => {
  validateFirstName(firstName.value, firstNameError);
});

lastName.addEventListener("blur", () => {
  validateLastName(lastName.value, lastNameError);
});

email.addEventListener("blur", () => {
  validateEmail(email.value, emailError);
});

password.addEventListener("blur", () => {
  validatePassword(password.value, passwordError);
});

confirmPassword.addEventListener("blur", () => {
  validateConfirmPassword(
    password.value,
    confirmPassword.value,
    confirmPasswordError
  );
});

male.addEventListener("change", () => {
  validateGender(genderError);
});

female.addEventListener("change", () => {
  validateGender(genderError);
});

// Validation Functions
function showError(element, message) {
  element.classList.add("error");
  element.innerHTML = message;
}

function showSuccess(element) {
  element.classList.remove("error");
  element.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
}

function validateEmail(email, emailError) {
  if (email.length === 0) {
    showError(emailError, "Email is required");
    return false;
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email.toLowerCase().match(emailRegex)) {
    showError(emailError, "Email Invalid");
    return false;
  }

  showSuccess(emailError);
  return true;
}

function validatePassword(password, passwordError) {
  if (password.length === 0) {
    showError(passwordError, "Password is required");
    return false;
  }

  if (password.length < 8) {
    showError(passwordError, "Password must be at least 8 characters long");
    return false;
  }

  showSuccess(passwordError);
  return true;
}

function validateFirstName(firstName, firstNameError) {
  if (firstName.length === 0) {
    firstNameError.classList.add("error");
    showError(firstNameError, "First Name is required");
    return false;
  }

  if (!firstName.match(/^[a-zA-Z]{2,30}$/)) {
    showError(firstNameError, "First Name Invalid");
    return false;
  }

  showSuccess(firstNameError);
  return true;
}

function validateLastName(lastName, lastNameError) {
  if (lastName.length === 0) {
    lastNameError.classList.add("error");
    showError(lastNameError, "Last Name is required");
    return false;
  }

  if (!lastName.match(/^[a-zA-Z]{2,30}$/)) {
    showError(lastNameError, "Last Name Invalid");
    return false;
  }

  showSuccess(lastNameError);
  return true;
}

function validateConfirmPassword(
  password,
  confirmPassword,
  confirmPasswordError
) {
  if (confirmPassword.length === 0) {
    showError(confirmPasswordError, "Confirm Password is required");
    return false;
  }

  if (confirmPassword !== password) {
    showError(confirmPasswordError, "Passwords don't match");
    return false;
  }

  showSuccess(confirmPasswordError);
  return true;
}

function validateGender(genderError) {
  if (!(male.checked || female.checked)) {
    showError(genderError, "Gender is required");
    return false;
  }

  showSuccess(genderError);
  return true;
}

// Sign In Form Validation
function validateSignInForm(event) {
  const signInEmailValid = validateEmail(signInEmail.value, signInEmailError);

  const signInPasswordValid = validatePassword(
    signInPassword.value,
    signInPasswordError
  );

  if (!signInEmailValid || !signInPasswordValid) {
    event.preventDefault();
  }
}

// Sign Up Form Validation
function validateSignUpForm(event) {
  const firstNameValid = validateFirstName(firstName.value, firstNameError);

  const lastNameValid = validateLastName(lastName.value, lastNameError);

  const emailValid = validateEmail(email.value, emailError);

  const passwordValid = validatePassword(password.value, passwordError);

  const confirmPasswordValid = validateConfirmPassword(
    password.value,
    confirmPassword.value,
    confirmPasswordError
  );

  const genderValid = validateGender(genderError);

  if (
    !firstNameValid ||
    !lastNameValid ||
    !emailValid ||
    !passwordValid ||
    !confirmPasswordValid ||
    !genderValid
  ) {
    event.preventDefault();
  }
}

// Toggle Password Visibility
const toggleVisibilityButton = document.getElementsByClassName(
  "toggle-password-visibility"
);
const icon = document.querySelectorAll(".icon");

function togglePasswordVisibility(input, icon) {
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

for (let i = 0; i < toggleVisibilityButton.length; i++) {
  toggleVisibilityButton[i].addEventListener("click", function (event) {
    const targetInput = [signInPassword, password, confirmPassword][i];
    const targetIcon = icon[i];

    event.preventDefault();

    togglePasswordVisibility(targetInput, targetIcon);
  });
}
