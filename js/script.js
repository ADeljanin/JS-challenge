"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelectorAll(".app-window__info");
const appHeader = document.querySelector(".app-window__header");
const appMessages = document.querySelector(".app-window__messages");
const appSentRecieved = document.querySelector(".app-window__sent-recieved");
let userJsonData;

console.log();
fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    userJsonData = data;
    addUsersToTheChatList(userJsonData);
  }); //
/////////////// all users to the chat list ///////////////
function addUsersToTheChatList(users) {
  let allUsersHtml = "";
  // List of all usernames
  users.forEach((element) => {
    //Adding all users names from json file
    allUsersHtml += `
    
    <div class="app-window__info active" data-id="${
      element.id
    }" onclick="onUserClick('${element.id}')">
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

function onUserClick(userId) {
  const userMessages = userJsonData[userId - 1].messages;
  appHeader.textContent = userJsonData[userId - 1].name;
  let allMessages = "";

  userMessages.forEach((element) => {
    let x = element.text;
    console.log(x);
    allMessages += `
      <div class="test"><p class="${element.type}">${x}</p></div>`;
  });

  appSentRecieved.insertAdjacentHTML("beforeend", allMessages);
}
// appSentRecieved.textContent = x;

// console.log(userMessages);
// insert all users in one container and use data-id to select it on

// appUsers.addEventListener("click", function (e) {
//Add all messages to right of the window
// function addAllMessages(messages) {
//   let totalMessages = "";
//   messages.forEach((element) => {
//     totalMessages += `
//    <div class="app-window__all-messages active" >
//        ${element.messages[0].text}
//      </div>
//      `;
//   });
//   appMessages.insertAdjacentHTML("afterbegin", totalMessages);
// }
// addAllMessages(userJsonData);
