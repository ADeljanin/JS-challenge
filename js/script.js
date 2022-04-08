"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelector(".app-window__info");

fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);

    // List of all usernames
    data.forEach((element) => {
      // console.log(element.name);

      //Adding all users names from json file
      const html = `
      <div class="app-window__info">
            <img
              class="app-window__avatar"
              src="./img/img_avatar_${element.username}.png"
              alt="user picture"
            />
            <div>
              <h3 id="#username">${element.name}</h3>
              <p>${element.email}</p>
            </div>`;

      appUsers.insertAdjacentHTML("beforeend", html);
    });

    // let currentItem = 0;

    // window.addEventListener("DOMContentLoaded", function () {
    //   let element = document.getElementById("hidden");
    //   console.log(element);
    //   // element.classList.add("hidden");
    // });
  });

//Remove hardcoded element from HTML file
let removeElement = document.getElementById("#hidden");
removeElement.className += " hidden";
