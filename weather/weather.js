/* eslint-disable no-unused-vars */
let main = document.querySelector(".main");
let head = document.querySelector(".head");
let temp = document.querySelector(".temp");
let button = document.querySelector(".switch");
let feel = document.querySelector(".feel");
let pressure = document.querySelector(".pressure");
let input = document.querySelector(".input");
let submit = document.querySelector(".get");
let globe = "";
let feeling = "";

function handleDom(data) {
  head.textContent = "name: " + data.name;
  temp.textContent = "temp: " + data.temp;
  feel.textContent = "feels like: " + data.feel;
  pressure.textContent = "pressure: " + data.pressure;
}

function process(json) {
  let eq = ((json.main.temp - 273.15) * 9) / 5 + 32;
  let other = Math.round(((json.main.feels_like - 273.15) * 9) / 5 + 32);

  if (eq < 30) {
    feeling = "sad";
  } else if (eq > 30) {
    feeling = "happy";
  }

  return {
    name: json.name,
    temp: Math.round(eq),
    cel: Math.round(((eq - 32) * 5) / 9),
    feel: other,
    pressure: json.main.pressure,
    feelCel: Math.round(((other - 32) * 5) / 9),
  };
}

button.addEventListener("click", () => {
  if (temp.textContent == "temp: " + globe.temp) {
    temp.textContent = "temp: " + globe.cel;
    button.textContent = "switch to farenheight";
    feel.textContent = "feels like " + globe.feelCel;
  } else if (temp.textContent == "temp: " + globe.cel) {
    temp.textContent = "temp: " + globe.temp;
    button.textContent = "switch to celsuis";
    feel.textContent = "feels like " + globe.feel;
  }
});

async function getData(location) {
  try {
    let data = await fetch(
      `http:/api.openweathermap.org/data/2.5/weather?q=${location}&appid=079e09430afffccd36228b13aa3fb343`
    );
    let json = await data.json();
    let processed = process(json);
    globe = processed;
    handleDom(processed);
    if (feeling == "happy") {
      document.body.style.backgroundColor = "yellow";
    } else if (feeling == "sad") {
      document.body.style.backgroundColor = "blue";
    }
  } catch (e) {
    alert("cannot find your city");
  }
}

getData("antarctica");

submit.addEventListener("click", () => {
  input.value == ""
    ? alert("please dont leave it blank")
    : getData(input.value);
});
