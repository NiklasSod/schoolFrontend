const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const favoriteColor = document.getElementById("favoriteColor");
const likeFlowers = document.getElementById("flowers");
const likeSwimming = document.getElementById("swimming");

const registerBtn = document.getElementById("registerBtn");

const error__msg = document.getElementById("error__msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let messages = [];
  
  // check user input
  if (textInput.value === "" || textInput.value == null) {
    messages.push("Name is required");
  };
  if (emailInput.value === "" || emailInput.value == null) {
    messages.push("Email is required");
  };
  if (passwordInput.value === "" || emailInput.value == null) {
    messages.push("Password is required");
  };
  if (favoriteColor.value === "" || favoriteColor.value == null) {
    messages.push("Please pick a favorite color");
  };

  // if error user input
  if (messages.length > 0) {
    error__msg.classList.add("error__msg");
    for (let i = 0; i < messages.length; i++) {
      let errMsgText = document.createElement("p");
      errMsgText.classList.add("error__msg__text");
      errMsgText.innerText = messages[i];
      if (i % 2 === 0) {
        errMsgText.style.backgroundColor = "rgb(255, 52, 52)";
      }
      errMsgText.style.borderRadius = "10px";
      errMsgText.style.padding = "10px";
      error__msg.appendChild(errMsgText);
      setTimeout(() => {
      errMsgText.classList.remove("error__msg__text");
      error__msg.removeChild(errMsgText);
      },3000 + (i * 1500));
    };
    return;
  };

  // if ok user input
  let userInput = [];
  userInput.push(`User name: ${textInput.value}`);
  userInput.push(`User email: ${emailInput.value}`);
  userInput.push(`User password: ${passwordInput.value}`);
  userInput.push("Ok.., why did you not salt and hash the password!?");
  userInput.push(`User favorite color: ${favoriteColor.value}`);
  if (likeFlowers.checked) {
    userInput.push(`User like - ${likeFlowers.value}.`)
  }
  if (likeSwimming.checked) {
    userInput.push(`User like - ${likeSwimming.value}.`)
  }
  console.log(userInput);
});
