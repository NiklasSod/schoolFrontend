let refreshBtn = document.getElementById("refreshBtn");
let oldParagraph = document.getElementById("oldParagraph");
let updateParagraphBtn = document.getElementById("updateParagraphBtn");

refreshBtn.addEventListener("click", () => {
  location.reload();
});

updateParagraphBtn.addEventListener("click", () => {
  oldParagraph.innerText = "Denna paragraf är ny och fräsch.";
  oldParagraph.classList.add("rainbow-text");
  updateParagraphBtn.style.display = "none";
});

