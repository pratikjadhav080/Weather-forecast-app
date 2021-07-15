"use strict";

function click1() {
  let a = document.querySelector(".inputText").value;
  let b = document.querySelector(".inputDate").value;

  fetch(`https://meta-weather.vercel.app/api/location/search/?query=${a}`)
    .then(function weather(data) {
      return data.json();
    })
    .then(function weather(data) {
      console.log(data);
      let WoeID = data[0].woeid;
      console.log(WoeID);

      fetch(`https://meta-weather.vercel.app/api/location/${WoeID}/`)
        .then(function weather(data) {
          return data.json();
        })
        .then(function weather(data) {
          let city = data.title;
          let country = data.parent.title;

          document.querySelector(".city-name").textContent = city;

          document.querySelector(".country-name").textContent = country;
        });

      fetch(`https://meta-weather.vercel.app/api/location/${WoeID}/${b}/`)
        .then(function weather(data) {
          return data.json();
        })
        .then(function weather(data) {
          console.log(data);

          let main = data[0];
          let Weather_state = main.weather_state_name;
          let Humidity = main.humidity;
          let Temperature = main.the_temp.toFixed(2);
          let Date = getDate(main.applicable_date);
          let Wind_speed = main.wind_speed.toFixed(2);

          document.querySelector(
            ".subtitle"
          ).textContent = `${Date},${Weather_state}`;

          document.querySelector(
            "#humid"
          ).textContent = `Humidity: ${Humidity}%`;

          document.querySelector(
            ".temperature"
          ).textContent = `${Temperature}° C`;

          document.querySelector(
            "#wind"
          ).textContent = `Wind: ${Wind_speed} Km/h`;

          if (Weather_state == "Clear") {
            document.weather.src =
              "https://meta-weather.vercel.app/static/img/weather/c.svg";
          } else if (
            Weather_state == "Showers" ||
            Weather_state == "Heavy Rain"
          ) {
            document.weather.src =
              "https://meta-weather.vercel.app/static/img/weather/h.svg";
          } else if (
            Weather_state == "Light Cloud" ||
            Weather_state == "Heavy Cloud"
          ) {
            document.weather.src =
              "https://meta-weather.vercel.app/static/img/weather/t.svg";
          } else if (Weather_state == "Light Rain") {
            document.weather.src =
              "https://meta-weather.vercel.app/static/img/weather/s.svg";
          } else {
            document.weather.src =
              "https://meta-weather.vercel.app/static/img/weather/s.svg";
          }
        });
    });
}

function getDate(dateString) {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var d = new Date(dateString);
  console.log(d.getDay(), d.getDate(), d.getMonth());
  return `${days[d.getDay()]},${month[d.getMonth()]} ${d.getDate()}`;
}
