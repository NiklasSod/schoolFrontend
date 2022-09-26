let refreshBtn = document.getElementById("refreshBtn");
let oldParagraph = document.getElementById("oldParagraph");
let updateParagraphBtn = document.getElementById("updateParagraphBtn");
let changeLinkBtn = document.getElementById("changeLinkBtn");
let link = document.getElementById("link");

refreshBtn.addEventListener("click", () => {
  location.reload();
});

updateParagraphBtn.addEventListener("click", () => {
  oldParagraph.innerText = "Denna paragraf är ny och fräsch.";
  oldParagraph.classList.add("rainbow-text");
  updateParagraphBtn.style.display = "none";
});

changeLinkBtn.addEventListener("click", () => {
  link.href = "https://google.com";
  link.innerText = "https://google.com";
  changeLinkBtn.innerText = "Länken ändrad!";
  changeLinkBtn.disabled = true;
});
