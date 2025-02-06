document.addEventListener("DOMContentLoaded", function () {
  const title = document.querySelector("#navbarTitle");
  const colors = ["red", "blue", "green", "orange", "purple"];
  let currentColorIndex = 0;

  setInterval(() => {
    title.style.color = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length;
  }, 1000);
});
