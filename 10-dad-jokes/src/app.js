const url = "https://icanhazdadjoke.com/";

const options = {
  headers: {
    Accept: "application/json",
  },
};

const jokeElement = document.querySelector(".joke");
const buttonGetJoke = document.querySelector(".get-joke");

async function getJoke() {
  const response = await fetch(url, options);
  const data = await response.json();

  jokeElement.innerHTML = data.joke;
}

buttonGetJoke.addEventListener("click", getJoke);

getJoke();
