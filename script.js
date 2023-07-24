"using strict";

//input
const form = document.getElementById("form");
const firtsName = document.getElementById("first_name");
const cardNumber = document.getElementById("card_info");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvcNumber = document.getElementById("cvc_number");

//labels
const cardNameLabel = document.querySelector(".card_name--label");
const cardNumberLabel = document.querySelector(".card__number--label");
const monthLabel = document.querySelector(".month_label");
const yearLabel = document.querySelector(".year_label");
const cvcLabel = document.querySelector(".cvc_label");
const inputForm = document.querySelectorAll(".form_input");

//error masages
const errorMessage = document.querySelector(".error_meassage");
const errMsgCn = document.querySelector(".error_meassage--cn");
const errMsgMm = document.querySelector(".error_meassage--mm");
const errMsgYy = document.querySelector(".error_meassage--yy");
const errMsgCvc = document.querySelector(".error_meassage--cvc");

//buttons
const buttonConfirm = document.querySelector(".button");
const buttonContinue = document.querySelector(".button_continue");

//states
const idleState = document.querySelector(".idle_state");
const compliteState = document.querySelector(".complete_state");
let errCounter = [];

////////////////////////////////////////////////////////////////

const inputElements = [];

//Functions
function errorChecker(inputEl) {
  if (inputEl.length === 0) {
    errCounter.push("failed");
  } else {
    console.log("succes");
  }
}

function cardErrorChecker(inputEl, err) {
  if (inputEl.length !== 3) {
    err.innerHTML = "wrong fromat,must be 3 numbers";
    errCounter.push("failed");
  } else {
    console.log("succes");
  }
}

function formatChecker(inputEl, err) {
  if (inputEl.value.length !== 16) {
    err.innerHTML = "wrong fromat,must be 16 numbers";
    console.log(inputEl);
    errCounter.push("failed");
  } else {
    console.log("succes");
  }
}

function formatChecker(inputEl, err) {
  if (inputEl.value.length !== 16) {
    err.innerHTML = "wrong fromat";
    console.log(inputEl);
    errCounter.push("failed");
  } else {
    console.log("succes");
  }
}

function myFormatChecker(inputEl, err) {
  if (inputEl.value.length > 2) {
    err.innerHTML = "wrong fromat";
    errCounter.push("failed");
  } else if (inputEl === month && month.value > 12) {
    err.innerHTML = "wrong fromat";
    errCounter.push("failed");
  } else {
    console.log("succes");
  }
}

function errorStyleAdder(imputEl, err) {
  imputEl.classList.add("invalid");
  imputEl.style.border = "2px solid red";
  err.innerHTML = "cant be blank";
}

function errorStyleRemover(imputEl, err) {
  imputEl.classList.remove("invalid");
  imputEl.style.border = "2px solid green";
  err.innerHTML = "";
}

function cardNumberConverter(inputEl, chunkSize = 4) {
  const chunkedArr = [];
  for (let i = 0; i < inputEl.length; i += chunkSize) {
    const chunk = inputEl.slice(i, i + chunkSize);
    chunkedArr.push(chunk);
  }

  return chunkedArr.join(" ");
}

//submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
  if (errCounter.length > 0) {
    errCounter = [];
    console.log("failed");
  } else {
    idleState.classList.add("hidden");
    idleState.style.display = "none";
    compliteState.classList.remove("hidden");
  }
});

function validate() {
  if (firtsName.value === "") {
    errorChecker(firtsName.value);
    errorStyleAdder(firtsName, errorMessage);
  } else {
    cardNameLabel.innerHTML = firtsName.value;
    errorStyleRemover(firtsName, errorMessage);
  }

  if (cardNumber.value.length === 0) {
    errorChecker(cardNumber.value);
    errorStyleAdder(cardNumber, errMsgCn);
  } else if (cardNumber.value.length !== 16) {
    errorStyleAdder(cardNumber, errMsgCn);
    formatChecker(cardNumber, errMsgCn);
  } else {
    cardNumberLabel.innerHTML = cardNumberConverter(cardNumber.value);
    errorStyleRemover(cardNumber, errMsgCn);
  }

  if (month.value < 1) {
    errorChecker(month.value);
    errorStyleAdder(month, errMsgMm);
  } else if (month.value > 12 || month.value < 0) {
    errorStyleAdder(month, errMsgMm);
    myFormatChecker(month, errMsgMm);
  } else if (month.value.length < 2) {
    monthLabel.innerHTML = `0${month.value} /`;
    errorStyleRemover(month, errMsgMm);
  } else {
    monthLabel.innerHTML = `${month.value} /`;
    errorStyleRemover(month, errMsgMm);
  }

  if (year.value < 1 || year.value.length > 2) {
    errorChecker(year.value);
    errorStyleAdder(year, errMsgMm);
    myFormatChecker(year, errMsgMm);
  } else if (year.value.length < 2) {
    yearLabel.innerHTML = `0${year.value}`;
    errorStyleRemover(year, errMsgYy);
  } else {
    yearLabel.innerHTML = year.value;
    errorStyleRemover(year, errMsgYy);
  }

  if (cvcNumber.value === "") {
    errorChecker(cvcNumber.value);
    errorStyleAdder(cvcNumber, errMsgCvc);
  } else if (cvcNumber.value.length !== 3) {
    errorStyleAdder(cvcNumber, errMsgCvc);
    cardErrorChecker(cvcNumber.value.length, errMsgCvc);
  } else {
    cvcLabel.innerHTML = cvcNumber.value;
    errorStyleRemover(cvcNumber, errMsgCvc);
  }
}

//complete state
buttonContinue.addEventListener("click", (e) => {
  idleState.classList.remove("hidden");
  compliteState.classList.add("hidden");
  window.location.reload();
});
