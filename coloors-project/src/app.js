const colorDivs = document.querySelectorAll(".color");
const sliders = document.querySelectorAll('input[type="range"]');
const initialTitleHex = document.querySelectorAll(".title");
const copyPopup = document.querySelector(".copy-container");
const sliderPanel = document.querySelectorAll(".sliders");

const adjustButton = document.querySelectorAll(".adjust");
const closeAdjustButton = document.querySelectorAll(".close-adjustment");

const lockIcons = document.querySelectorAll(".fa-lock-open");
const lockButton = document.querySelectorAll(".lock");

const generateButton = document.querySelector(".generate");

const saveButton = document.querySelector(".save");
const saveContainer = document.querySelector(".save-container");
const closeSave = document.querySelector(".close-save");

const libraryContainer = document.querySelector(".library-container");
const libraryButton = document.querySelector(".library");
const closeLibrary = document.querySelector(".close-library");

let initialColors;

sliders.forEach((slider) => slider.addEventListener("input", hslControls));

colorDivs.forEach((div, index) =>
  div.addEventListener("change", () => {
    updateTextUI(index);
  })
);

initialTitleHex.forEach((titleHex) =>
  titleHex.addEventListener("click", () => copyToClipBoard(titleHex))
);

copyPopup.addEventListener("transitionend", () => {
  const popupBox = copyPopup.children[0];

  popupBox.classList.remove("active");
  copyPopup.classList.remove("active");
});

adjustButton.forEach((button, index) =>
  button.addEventListener("click", () => openAdjustmentPanel(index))
);

closeAdjustButton.forEach((button, index) =>
  button.addEventListener("click", () => closeAdjustmentPanel(index))
);

generateButton.addEventListener("click", randomColors);

lockButton.forEach((button) => {
  button.addEventListener("click", () => {
    button.children[0].classList.toggle("fa-lock-open");
    button.children[0].classList.toggle("fa-lock");

    button.parentElement.parentElement.classList.toggle("locked");
  });
});

function generateHex() {
  const hexColor = chroma.random();

  return hexColor;
}

function randomColors() {
  initialColors = [];

  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    if (div.classList.contains("locked")) {
      initialColors.push(hexText.innerText);

      return;
    } else initialColors.push(chroma(randomColor).hex());

    div.style.backgroundColor = randomColor;
    hexText.innerHTML = randomColor;

    checkTextContrast(randomColor, hexText);
    updateTextUI(index);

    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");

    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorize(color, hue, brightness, saturation);
  });
  resetInputs();
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

function hslControls(element) {
  const index =
    element.target.getAttribute("data-brigh") ||
    element.target.getAttribute("data-sat") ||
    element.target.getAttribute("data-hue");

  let sliders = element.target.parentElement.querySelectorAll(
    'input[type="range"]'
  );

  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  const backgroundColor = initialColors[index];

  let color = chroma(backgroundColor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);

  colorDivs[index].style.backgroundColor = color;
  colorize(color, hue, brightness, saturation);
}

function updateTextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor);

  const titleHex = activeDiv.querySelector("h2");
  const iconsControls = activeDiv.querySelectorAll(".controls button");

  titleHex.innerText = color.hex();

  checkTextContrast(color, titleHex);
  for (icon of iconsControls) {
    checkTextContrast(color, icon);
  }
}

function resetInputs() {
  const sliders = document.querySelectorAll(".sliders input");
  sliders.forEach((slider) => {
    if (slider.name === "hue") {
      const hueColor = initialColors[slider.getAttribute("data-hue")];
      const hueValue = chroma(hueColor).hsl()[0];
      slider.value = Math.floor(hueValue);
    }
    if (slider.name === "saturation") {
      const saturationColor = initialColors[slider.getAttribute("data-sat")];
      const saturationValue = chroma(saturationColor).hsl()[1];
      slider.value = Math.floor(saturationValue * 100) / 100;
    }
    if (slider.name === "brightness") {
      const brightnessColor = initialColors[slider.getAttribute("data-brigh")];
      const brightnessValue = chroma(brightnessColor).hsl()[2];
      slider.value = Math.floor(brightnessValue * 100) / 100;
    }
  });
}

function copyToClipBoard(titleHex) {
  const element = document.createElement("textarea");
  element.value = titleHex.innerText;

  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);

  const popupBox = copyPopup.children[0];
  console.log(popupBox);

  copyPopup.classList.add("active");
  popupBox.classList.add("active");
}

function openAdjustmentPanel(index) {
  sliderPanel[index].classList.toggle("active");
}
function closeAdjustmentPanel(index) {
  sliderPanel[index].classList.remove("active");
}

function openCloseButton(container, button) {
  const popup = container.children[0];
  container.classList.add("active");
  popup.classList.add("active");

  button.addEventListener("click", () => container.classList.remove("active"));
}

saveButton.addEventListener("click", () =>
  openCloseButton(saveContainer, closeSave)
);

libraryButton.addEventListener("click", () =>
  openCloseButton(libraryContainer, closeLibrary)
);

randomColors();
