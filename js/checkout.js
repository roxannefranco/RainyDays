const form = document.querySelector("#contact-form");
form.onsubmit = (event) => {
  // prevention default submission occurs
  event.preventDefault();

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const number = document.querySelector("#number");
  const address = document.querySelector("#address");
  const zipCode = document.querySelector("#zip-code");
  const city = document.querySelector("#city");
  const country = document.querySelector("#country");
  const nameCard = document.querySelector("#name-card");
  const cardNumber = document.querySelector("#card-number");
  const cardDate = document.querySelector("#card-date");
  const cardCvc = document.querySelector("#card-cvc");

  // cleaning all error messages
  const errorMsg = document.querySelectorAll(".error-msg");
  errorMsg.forEach(function (msg) {
    msg.innerHTML = "";
  });

  const errorsContainer = document.querySelector("#errors");
  const success = document.querySelector("#success");
  let hasErrors = false;

  // to clean previous submission
  errorsContainer.innerHTML = "";
  success.innerHTML = "";

  const errors = [];

  // test name field
  if (name.value.trim().length < 1) {
    hasErrors = true;
    const nameError = document.querySelector(".name-error");
    nameError.innerHTML = "Name required.";
  }

  // test email field using regex
  const emailValue = email.value.trim();
  if (
    !emailValue.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    hasErrors = true;
    const emailError = document.querySelector(".email-error");
    emailError.innerHTML = "Please insert valid email.";
  }

  // test number field
  if (number.value.trim().length < 7) {
    hasErrors = true;
    const numberError = document.querySelector(".number-error");
    numberError.innerHTML = "Phone number requires at least 7 digits.";
  }

  // test address field
  if (address.value.trim().length < 10) {
    hasErrors = true;
    const addressError = document.querySelector(".address-error");
    addressError.innerHTML = "Address requires at least 10 characters";
  }

  // test zip-code field
  if (zipCode.value.trim().length != 4) {
    hasErrors = true;
    const zipError = document.querySelector(".zip-error");
    zipError.innerHTML = "Zip-code must have 4 digits.";
  }

  // test city field
  if (city.value.trim().length < 1) {
    hasErrors = true;
    const cityError = document.querySelector(".city-error");
    cityError.innerHTML = "City required.";
  }

  // test country field
  if (country.value.trim().length < 1) {
    hasErrors = true;
    const countryError = document.querySelector(".country-error");
    countryError.innerHTML = "Country required.";
  }

  // test name-card field
  if (nameCard.value.trim().length < 1) {
    hasErrors = true;
    const nameCardError = document.querySelector(".name-card-error");
    nameCardError.innerHTML = "Name required.";
  }

  // test card-number field
  if (cardNumber.value.trim().length < 16) {
    hasErrors = true;
    const numberCardError = document.querySelector(".number-card-error");
    numberCardError.innerHTML = "Please insert valid Card Number.";
  }

  // test card-date field
  const dateValue = cardDate.value.trim();
  if (!dateValue.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
    hasErrors = true;
    const dateCardError = document.querySelector(".date-card-error");
    dateCardError.innerHTML = "Please insert expiration date with format MM/YY.";
  }

  // test card-cvc field
  if (cardCvc.value.trim().length < 3) {
    hasErrors = true;
    const cvcCardError = document.querySelector(".cvc-card-error");
    cvcCardError.innerHTML = "3 digits CVC required.";
  }

  // loop to look for errors
  if (!hasErrors) {
    // no errors then success message
    success.innerHTML = "Form submitted with success!";
    window.location.href = "/success.html";
  }
};
