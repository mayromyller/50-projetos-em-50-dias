const buttonsFaq = document.querySelectorAll(".faq-icons");

buttonsFaq.forEach((button) =>
  button.addEventListener("click", () => {
    button.parentNode.classList.toggle("active");
  })
);
