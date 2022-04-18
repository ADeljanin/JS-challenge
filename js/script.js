"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelectorAll(".app-window__info");
const appHeader = document.querySelector(".app-window__header");
const appMessages = document.querySelector(".app-window__messages");
const appSentRecieved = document.querySelector(".app-window__sent-recieved");
const searchInput = document.querySelector(".app-window__search");
let userJsonData;

console.log();
fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    userJsonData = data;
    addUsersToTheChatList(userJsonData);
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
searchInput.addEventListener("input", function (e) {
  const value = e.target.value;
  console.log(value);
});
