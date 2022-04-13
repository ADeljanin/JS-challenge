"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelectorAll(".app-window__info");
const appHeader = document.querySelector(".app-window__header");
const appMessages = document.querySelector(".app-window__messages");
const allMessages = document.querySelector(".app-window__all-messages");
let userJsonData;

console.log();
fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    userJsonData = data;
    addUsersToTheChatList(data);

    appUsers.addEventListener("click", function (e) {
      //Add all messages to right of the window
      function addAllMessages(messages) {
        let totalMessages = "";
        messages.forEach((element) => {
          totalMessages += `
        <div class="app-window__all-messages active" >
            ${element.messages[0].text}
          </div>   
          `;
        });

        appMessages.insertAdjacentHTML("afterbegin", totalMessages);
      }
      addAllMessages(data);

      //Add username to top of the chat
      function addUsernameToTop(username) {
        let user = "";
        username.forEach((element) => {
          user += `
          <header class="app-window__header active" data-id="${element.id}">${element.name}</header>    
          `;
        });
        appMessages.insertAdjacentHTML("afterbegin", user);
      }
      addUsernameToTop(data);
    });
  });

/////////////// all users to the chat list ///////////////
function addUsersToTheChatList(users) {
  let allUsersHtml = "";
  // List of all usernames
  users.forEach((element) => {
    //Adding all users names from json file
    allUsersHtml += `
    
    <div class="app-window__info active" id="user-info">
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
