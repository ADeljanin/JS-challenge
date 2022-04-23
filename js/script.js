"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelectorAll(".app-window__info");
const appHeader = document.querySelector(".app-window__header");
const appMessages = document.querySelector(".app-window__messages");
const appSentRecieved = document.querySelector(".app-window__sent-recieved");
const searchInput = document.querySelector(".app-window__search");
const btnSend = document.querySelector(".app-window__button");
const appSend = document.querySelectorAll(".app-window__send");
let userJsonData;

let users = [];

fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    userJsonData = data;
    addUsersToTheChatList(userJsonData);
    users = userJsonData.map((user) => {
      return { fullName: user.name };
    });
  }); //

/////////////// ALL USERS TO THE CHAT LIST ///////////////
function addUsersToTheChatList(users) {
  let allUsersHtml = "";
  // List of all usernames
  users.forEach((element) => {
    //Adding all users names from json file
    allUsersHtml += `
    
    <div class="app-window__info" data-id="${
      element.id
    }" onclick="onUserClick('${element.id}', this)">
      <img
      class="app-window__avatar"
      src="./img/img_avatar_${element.username}.png"
      alt="user picture"
      />
      <div>
        <h3 id="#username">${element.name}</h3>
        <p class="app-window__last-msg">${
          element.messages[element.messages.length - 1].text
        }</p>
      </div>
    </div>
    `;
  });
  appUsers.insertAdjacentHTML("beforeend", allUsersHtml);
}

/////// CLICK ON USER ////////

function onUserClick(userId, element) {
  let infos = document.querySelectorAll(".app-window__info");

  for (const info of infos) {
    info.classList.remove("active");
    info.addEventListener("click", function handleClick() {
      info.classList.add("active");
    });
  }

  document.querySelector(".app-window__send").classList.remove("hide");

  const userMessages = userJsonData[userId - 1].messages;
  appHeader.textContent = userJsonData[userId - 1].name;

  function insertUserMessages(userMessages) {
    let allMessages = userMessages.map(function (item) {
      const time = dayjs(item.time).format("hh:mm");

      if (item.type === "received") {
        return `<div class="app-window__one-message-${item.type}">
                <img
                class="app-window__avatar-small"
                src="./img/img_avatar_${userJsonData[userId - 1].username}.png"
                alt="user picture"
                />
                <div>
                  <p class="${item.type}">${item.text}</p>
                  <p class="time-delivery">${time}</p>
                </div>
              </div>`;
      } else {
        return `<div class="app-window__one-message-${item.type}">
                <img
                class="app-window__avatar-small"
                src="./img/img_avatar.png"
                alt="user picture"
                />
                <div>
                  <p class="${item.type}">${item.text}</p>
                  <p class="time-delivery">${time}</p>
                </div>
              </div>`;
      }
    });
    allMessages = allMessages.join("");
    appSentRecieved.innerHTML = allMessages;
  }
  insertUserMessages(userMessages);
}
////////// SEARCH //////////

searchInput.addEventListener("keyup", function (e) {
  console.log(users);
  const searchString = e.target.value.toLowerCase();
  let infos = document.querySelector(".app-window__info");
  // const value = e.target.value.toLowerCase();
  const filteredUsers = users.filter((user) => {
    return user.fullName.toLowerCase().includes(searchString);
  });
  console.log(filteredUsers);
  console.log(users);
  users.forEach((user) => {
    // for (const user of users) {
    const isVisible = user.fullName.toLowerCase().includes(searchString);
    console.log(isVisible);
    console.log(user.classList);
    infos.forEach((info) => {
      info.classList.toggle("hide", !isVisible);
    });

    // info.classList.remove("active");
    // info.addEventListener("click", function handleClick() {
    //   info.classList.add("active");
  });
});

//  for (const info of infos) {
//    info.classList.remove("active");
//    info.addEventListener("click", function handleClick(e) {
//      info.classList.add("active");
//    });
//  }
//this line up doesnt work because appInfo/user.element is loaded from JS file, and it is unknown at this time, you should find the way to see all loaded elements from JS file

// });

////////////////////// SEND BUTTON /////////////////
btnSend.addEventListener("click", function () {
  let message = document.getElementById("typing").value;
  let currentDate = new Date();
  let currentHours = currentDate.getHours();
  currentHours = ("0" + currentHours).slice(-2);
  let currentMins = currentDate.getMinutes();
  currentMins = ("0" + currentMins).slice(-2);
  let newHtml = `<div class="app-window__one-message-sent">
                <img
                class="app-window__avatar-small"
                src="./img/img_avatar.png"
                alt="user picture"
                />
                <div>
                  <p class="sent">${message}</p>
                  <p class="time-delivery">${currentHours}:${currentMins}</p>
                </div>
              </div>`;
  if (appSentRecieved.childNodes.length !== 0) {
    appSentRecieved.insertAdjacentHTML("beforeend", newHtml);
  }
  document.getElementById("typing").value = "";
  console.log(newHtml);
  document.querySelector(".app-window__last-msg").innerHTML = message;
});
