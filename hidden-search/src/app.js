const search = document.querySelector(".search");
const searchAction = document.querySelector(".search-action");
const input = document.querySelector(".input");

searchAction.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});
