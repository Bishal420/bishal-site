const buttons = document.querySelectorAll(".product button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Added to cart!");
  });
});
