"use strict";

fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

document.getElementById("#username").innerHTML = "Nigga";
