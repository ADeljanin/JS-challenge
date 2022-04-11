"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelector(".app-window__info");
const appHeader = document.querySelector(".app-window__header");
const appMessages = document.querySelector(".app-window__messages");
const allMessages = document.querySelector(".app-window__all-messages");

fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    addUsersToTheChatList(data);

    appUsers.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      if (id) {
        appInfo.forEach(function (info) {
          info.classList.remove("active");
        });
        e.target.classList.add("active");
        allMessages.forEach(function (message) {
          allMessages.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
      }

      //Add username to top of the chat
      function addUsernameToTop(username) {
        let user = "";
        username.forEach((element) => {
          user = `
        <header class="app-window__header active" data-id="${element.id}">${element.name}</header>    
        `;
        });

        appMessages.insertAdjacentHTML("afterbegin", user);
      }
      addUsernameToTop(data);

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

        appMessages.insertAdjacentHTML("beforeend", totalMessages);
      }
      addAllMessages(data);
    });
  });

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

// Selecting a user from the JSON file

/* <header class="app-window__header" data-id="${element.id}">NAME</header>
     <div>ALL MESSAGES BETWEEN USER AND OWNER</div> */
