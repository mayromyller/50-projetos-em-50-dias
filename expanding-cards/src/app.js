const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeAllActiveClass();
    panel.classList.add("active");
  });
});

function removeAllActiveClass() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}
