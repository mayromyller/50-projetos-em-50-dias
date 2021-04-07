const slideItems = document.querySelectorAll(".slide-items > *");
const thumb = document.querySelector(".slide-thumb");

const nextButton = document.querySelector(".slide-next");
const prevButton = document.querySelector(".slide-prev");

let active = 0;
let thumbItems;
let timeout;

function addThumbItems() {
  slideItems.forEach(() => {
    thumb.innerHTML += `<span></span>`;
    thumbItems = Array.from(thumb.children);
  });
}

addThumbItems();

function activeSlide(index) {
  active = index;

  slideItems.forEach((item) => item.classList.remove("active"));
  slideItems[index].classList.add("active");

  thumbItems.forEach((item) => item.classList.remove("active"));
  thumbItems[index].classList.add("active");
  autoSlide();
}

function previousSlide() {
  active > 0 ? activeSlide(active - 1) : activeSlide(slideItems.length - 1);
}

function nextSlide() {
  active < slideItems.length - 1 ? activeSlide(active + 1) : activeSlide(0);
}

function navigation() {
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", previousSlide);
}

function autoSlide() {
  clearTimeout(timeout);
  timeout = setTimeout(nextSlide, 5000);
}

navigation();

nextSlide();
previousSlide();

autoSlide();

activeSlide(0);
