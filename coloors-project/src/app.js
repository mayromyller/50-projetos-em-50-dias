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

    checkTextContrast(randomColor, hexText);

    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");

    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorize(color, hue, brightness, saturation);
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

function colorize(color, hue, brightness, saturation) {
  const noSaturation = color.set("hsl.s", 0);
  const fullSaturation = color.set("hsl.s", 1);
  const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);

  const midBrightness = color.set("hsl.l", 0.5);
  const scaleBrightness = chroma.scale(["black", midBrightness, "white"]);

  saturation.style.backgroundImage = `linear-gradient(
    to right, 
    ${scaleSaturation(0)}, 
    ${scaleSaturation(1)}
  )`;

  brightness.style.backgroundImage = `linear-gradient(
    to right, 
    ${scaleBrightness(0)},
    ${scaleBrightness(0.5)}, 
    ${scaleBrightness(1)}
  )`;

  hue.style.backgroundImage = `linear-gradient(
    to right, 
    rgb(204,75,75),
    rgb(204,204,75),
    rgb(75,204,75),
    rgb(75,204,204),
    rgb(75,75,204),
    rgb(204,75,204),
    rgb(204,75,74)
  )`;

  boxshadowOnFocus(saturation, color);
  boxshadowOnFocus(brightness, color);
  boxshadowOnFocus(hue, color);
}

function boxshadowOnFocus(item, color) {
  item.addEventListener(
    "focusin",
    (element) => (element.target.style.boxShadow = `0 0 0 3px ${color}`)
  );
  item.addEventListener(
    "focusout",
    (element) => (element.target.style.boxShadow = "none")
  );
}

randomColors();
