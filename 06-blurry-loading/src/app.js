const hero = document.querySelector(".hero");
const loading = document.querySelector(".loading");

let load = 0;

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const int = setInterval(blur, 30);

function blur() {
  load++;

  if (load > 99) {
    clearInterval(int);
  }

  loading.innerText = `${load}%`;
  loading.style.opacity = scale(load, 0, 100, 1, 0);
  hero.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}
