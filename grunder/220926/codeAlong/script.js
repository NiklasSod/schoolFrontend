// var headOne = document.querySelector("#one");
// var headTwo = document.querySelector("#two");
// var headThree = document.querySelector("#three");

// headOne.addEventListener("mouseover", () => {
//   headOne.textContent = "Mouse over me";
//   headOne.style.color = "red";
// });

// headOne.addEventListener("mouseout", () => {
//   headOne.textContent = "Mouse not over me";
//   headOne.style.color = "blue";
// });

// headTwo.addEventListener("click", () => {
//   headTwo.textContent = "Clicked!";
//   headTwo.style.color = "yellow";
// });

// headThree.addEventListener("dblclick", () => {
//   headThree.textContent = "double clicked!";
//   headThree.style.color = "green";
// });

function validateForm() {
  var name = document.myform.name.value;
  var password = document.myform.password.value;

  if(name == ""){
    alert("name is empty")
    return;
  }
  if(password.length < 5){
    alert("password needs to be 5 characters or longer")
    return;
  }
}