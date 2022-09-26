let refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {
  location.reload();
});

// uppg 1
let oldParagraph = document.getElementById("oldParagraph");
let updateParagraphBtn = document.getElementById("updateParagraphBtn");

updateParagraphBtn.addEventListener("click", () => {
  oldParagraph.innerText = "Denna paragraf är ny och fräsch.";
  oldParagraph.classList.add("rainbow-text");
  updateParagraphBtn.style.display = "none";
});

// uppg 2
let changeLinkBtn = document.getElementById("changeLinkBtn");
let link = document.getElementById("link");

changeLinkBtn.addEventListener("click", () => {
  link.href = "https://google.com";
  link.innerText = "https://google.com";
  changeLinkBtn.innerText = "Länken ändrad!";
  changeLinkBtn.disabled = true;
});

// uppg 3
let xLength = document.getElementById("xLength");
let yLength = document.getElementById("yLength");
let zLength = document.getElementById("zLength");
let buildDivBtn = document.getElementById("buildDivBtn");
let buildHere = document.getElementById("buildHere");

buildDivBtn.addEventListener("click", () => {

  if (xLength.value < 100 || xLength.value > 500) {
    xLength.value = 200;
  }
  if (yLength.value < 100 || yLength.value > 500) {
    yLength.value = 200;
  }
  if (zLength.value < 100 || zLength.value > 500) {
    zLength.value = 200;
  }

  const userDiv = document.createElement("div");
  userDiv.style.width = `${xLength.value}px`;
  userDiv.style.height = `${yLength.value}px`;
  userDiv.style.backgroundColor = "blue";
  buildHere.appendChild(userDiv);
  userDiv.innerText = `z: ${zLength.value}px`;
  userDiv.style.border = "2px solid black"
  userDiv.style.padding = "1em";
  userDiv.style.margin = "0.4em";

  buildDivBtn.disabled = true;
});
