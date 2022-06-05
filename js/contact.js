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
  let hasErrors = false;

  // cleaning all error messages
  const errorMsg = document.querySelectorAll(".error-msg");
  errorMsg.forEach(function (msg) {
    msg.innerHTML = "";
  });

  const errors = [];

  // test name field
  if (name.value.trim().length < 1) {
    hasErrors = true;
    const nameError = document.querySelector(".name-error");
    nameError.innerHTML = "Name required.";
  }

  //test order field
  if (order.value.trim().length < 5) {
    hasErrors = true;
    const orderError = document.querySelector(".order-error");
    orderError.innerHTML = "order number required.";
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

  // test text-area field
  if (textArea.value.trim().length < 1) {
    hasErrors = true;
    const textAreaError = document.querySelector(".textarea-error");
    textAreaError.innerHTML = "Message required.";
  }

  // loop to look for errors
  if (!hasErrors) {
    // no errors then success message
    success.innerHTML = "Form submitted with success!";
    document.getElementById("contact-form").reset();
  }
};
