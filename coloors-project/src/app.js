const colorDivs = document.querySelectorAll(".color");

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
  });
}

randomColors();
