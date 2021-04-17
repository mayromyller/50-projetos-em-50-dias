const container = document.querySelector(".container");

window.addEventListener("keydown", (pressed) => {
  container.innerHTML = `
    <div class="key-container">
      <h3 class="title">event.key</h3>
      <div class="box">
      ${pressed.key === " " ? "Space" : pressed.key}
      </div>
    </div>
    <div class="key-container">
      <h3 class="title">event.keyCode</h3>
      <div class="box">
      ${pressed.keyCode}
      </div>
    </div>
    <div class="key-container">
      <h3 class="title">event.code</h3>
      <div class="box">
      ${pressed.code}
      </div>
    </div>
  `;
});
