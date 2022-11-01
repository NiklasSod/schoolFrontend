let displayPageWidth = document.getElementById('displayPageWidth');
displayPageWidth.innerText = 'Resize me!'

addEventListener('resize', (event) => {
  let width = event.target.innerWidth;
  if (width < 768) {
    displayPageWidth.innerText = `The width of this page is tight! (${event.target.innerWidth}px)`;
    return;
  };
  displayPageWidth.innerText = `The width of this page is huge! (${event.target.innerWidth}px)`;
});

const menuBtn = () => {
  let x = document.getElementById("nav__links__open");
  if (x.className === "hidden") {
    x.className += " nav__links__open";
    return;
  };
  x.className = "hidden";
};
