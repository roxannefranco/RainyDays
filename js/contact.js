const form = document.querySelector("#contact-form");
form.onsubmit = (event) => {
  // prevention default submission occurs
  event.preventDefault();
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const order = document.querySelector("#order");
  const textArea = document.querySelector("#text-area");

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

  //test order field
  if (order.value.trim().length < 5) {
    errors.push("Order number must have 5 characters.");
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

  // test text-area field
  if (textArea.value.trim().length < 1) {
    errors.push("Message required.");
  }

  // verifying if there is errors
  if (errors.length) {
    let content = "";
    for (let i = 0; i < errors.length; i++) {
      content += `<li><strong>${errors[i]}</strong></li>`;
    }
    errorsContainer.innerHTML = content;
  } else {
    // if there is no error, then success
    success.innerHTML = "Form submitted with success!";
  }
};
