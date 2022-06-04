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

  const errorsContainer = document.querySelector("#errors");
  const success = document.querySelector("#success");

  // to clean previous submission
  errorsContainer.innerHTML = "";
  success.innerHTML = "";

  const errors = [];

  // test name field
  if (name.value.trim().length < 1) {
    errors.push("Name required.");
  }

  // test email field using regex
  const emailValue = email.value.trim();
  if (
    !emailValue.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errors.push("Please insert valid email.");
  }

  // test number field
  if (number.value.trim().length === 9) {
    errors.push("Phone number must have 9 digits.");
  }

  // test address field
  if (address.value.trim().length < 15) {
    errors.push("Address requires at least 15 characters");
  }

  // test zip-code field
  if (zipCode.value.trim().length != 4) {
    errors.push("Zip-code must have 4 digits.");
  }

  console.log(zipCode.value);
  console.log(zipCode.value.length);

  // test city field
  if (city.value.trim().length < 1) {
    errors.push("City required.");
  }

  // test country field
  if (country.value.trim().length < 1) {
    errors.push("City required.");
  }

  // test name-card field
  if (nameCard.value.trim().length < 1) {
    errors.push("Insert valid card name.");
  }

  // test card-number field
  if (cardNumber.value.trim().length < 16) {
    errors.push("Insert valid Card Number.");
  }

  // test card-date field
  if (cardDate.value.trim().length != 6) {
    errors.push("Insert valid Card date.");
  }

  // test card-cvc field
  if (cardCvc.value.trim().length != 3) {
    errors.push("Insert valid CVC.");
  }

  // loop to look for errors
  if (errors.length) {
    let content = "";
    for (let i = 0; i < errors.length; i++) {
      content += `<li><strong>${errors[i]}</strong></li>`;
    }
    errorsContainer.innerHTML = content;
  } else {
    // no errors then success message
    success.innerHTML = "Form submitted with success!";
    window.location.href = "/success.html";
  }
};
