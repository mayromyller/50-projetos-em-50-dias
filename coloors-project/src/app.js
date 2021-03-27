const colorDivs = document.querySelectorAll(".color");
const titleHex = document.querySelectorAll(".title");

function generateHex() {
  const hexColor = chroma.random();

  return hexColor;
}

function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    div.style.backgroundColor = randomColor;
    hexText.innerHTML = randomColor;

    checkTextContrast(randomColor, hexText);
  });
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();

  if (luminance > 0.5) text.style.color = "#333";
  else {
    text.style.color = "white";
    text.style.filter = "drop-shadow(0.4rem 0.4rem 1rem rgba(0, 0, 0, 0.4))";
  }
}

randomColors();
