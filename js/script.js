"use strict";

const appUsers = document.querySelector(".app-window__users");
const appInfo = document.querySelectorAll(".app-window__info");
const userContainer = document.querySelector(".app-window__left");
const appHeader = document.querySelector(".app-window__header");
const appMessages = document.querySelector(".app-window__messages");
const lastInputMessage = document.querySelectorAll(".app-window__last-msg");
const appSentRecieved = document.querySelector(".app-window__sent-recieved");
const searchInput = document.querySelector(".app-window__search");
const btnSend = document.querySelector(".app-window__button");
const btnBack = document.querySelector(".btn-arrow");

const appSend = document.querySelectorAll(".app-window__send");
const sendMessageInput = document.getElementById("typing");
let userJsonData;
let activeUser;
let filteredUserJsonData;
let activeUserId;
let children;
let editedChildren;

fetch("chat.json")
  .then((response) => response.json())
  .then((data) => {
    userJsonData = data;
    filteredUserJsonData = [...data];
    addUsersToTheChatList(filteredUserJsonData);
  })
  .catch(function (err) {
    alert(err);
  });

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
  appUsers.innerHTML = allUsersHtml;
}

//////////////////// CLICK ON USER //////////////////////////

function onUserClick(userId, element) {
  activeUserId = userId;
  activeUser = userJsonData.find((item) => item.id.toString() === activeUserId);

  // set active background
  let infos = document.querySelectorAll(".app-window__info");

  for (const info of infos) {
    info.classList.remove("active");
    element.classList.add("active");
  }
  // render user messages
  document.querySelector(".app-window__send").classList.remove("hide");

  const userMessages = userJsonData[userId - 1].messages;
  appHeader.textContent = userJsonData[userId - 1].name;

  function insertUserMessages(userMessages) {
    let firstDateMessages = dayjs(activeUser.messages[0].time).format(
      "dddd, DD MMMM YYYY"
    );
    let nextDateMessages;
    let day;

    //   nextDateMessages = dayjs(activeUser.messages[i].time).format(
    //     "dddd, DD MMMM YYYY"
    //   );
    //   console.log(nextDateMessages);
    // }
    // console.log(firstDateMessages);
    let allMessages = userMessages.map(function (item) {
      const time = dayjs(item.time).format("hh:mm");
      // day = dayjs(item.time).format("dddd, DD MMMM YYYY");

      for (let i = 0; i < activeUser.messages.length; i++) {
        for (let k = i + 1; k < activeUser.messages.length; k++) {
          if (activeUser.messages[i] != activeUser.messages[k]) {
            day = dayjs(item.time).format("dddd, DD MMMM YYYY");
          } else {
            day = "milena";
          }
          // console.log(
          //   dayjs(activeUser.messages[k].time).format("dddd, DD MMMM YYYY")
          // );
        }
        // console.log(
        //   dayjs(activeUser.messages[i].time).format("dddd, DD MMMM YYYY")
        // );
      }

      if (item.type === "received") {
        return `
              <p class="day-sent-recieved">${day}</p>
              <div class="app-window__one-message-${item.type}">
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
        return `
              <p class="day-sent-recieved">${day}</p>
              <div class="app-window__one-message-${item.type}">
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
  appSentRecieved.scrollTop = appSentRecieved.scrollHeight;

  if (window.matchMedia("(max-width: 600px)").matches) {
    userContainer.classList.add("hide");
    appMessages.classList.add("show");
  }

  children = appSentRecieved.childNodes.length;
  console.log(children);
}

///////////////////////// SEARCH ///////////////////////////////

searchInput.addEventListener("keyup", function (e) {
  const searchString = e.target.value.toLowerCase();

  const filteredUserJsonData = userJsonData.filter((item) => {
    return item.name.toLowerCase().includes(searchString);
  });
  addUsersToTheChatList(filteredUserJsonData);
});

////////////////////// SEND BUTTON ////////////////////////////

btnSend.addEventListener("click", function () {
  let message = sendMessageInput.value;
  if (message.length) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentDay = weekday[currentDate.getDay()];
    let currentDayInMonth = currentDate.getDate();
    let currentMonth = month[currentDate.getMonth()];
    let currentHours = currentDate.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    let currentMins = currentDate.getMinutes();
    currentMins = ("0" + currentMins).slice(-2);
    let newHtml = `<p class="day-sent-recieved">${currentDay}, ${currentDayInMonth}.${currentMonth}.${currentYear}</p>
                  <div class="app-window__one-message-sent" id="test">
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

    appSentRecieved.insertAdjacentHTML("beforeend", newHtml);

    activeUser = userJsonData.find(
      (item) => item.id.toString() === activeUserId
    );
    activeUser.messages.push({
      type: "sent",
      time: currentDate.toISOString(),
      text: message,
    });

    // clear message
    sendMessageInput.value = "";

    //add message to the left of the screen, just bellow the user name
    document.querySelector(".app-window__info.active p").textContent = message;
  }

  // active user first message date and time

  // scroll to the last message in chat history
  appSentRecieved.scrollTop = appSentRecieved.scrollHeight;

  // active user goes on top of chat history
  let content = document.querySelector(".app-window__info.active");
  let parent = content.parentNode;
  parent.insertBefore(content, parent.firstChild);

  // active user animation
  const userBubble = [{ transform: "scale(1.1)" }, { transform: "scale(1)" }];

  const userTiming = {
    duration: 750,
    iterations: 1,
  };
  content.animate(userBubble, userTiming);
  userContainer.scroll({
    top: 0,
    behavior: "smooth",
  });
  // console.log(dayjs(activeUser.messages[0].time).format("dddd, DD MMMM YYYY"));
});

////////////////////// BACK BUTTON ////////////////////

btnBack.addEventListener("click", function () {
  userContainer.classList.remove("hide");
  appMessages.classList.remove("show");

  //if there is some new message sent, user goes on top, if you just look at messages, on back button the current user is highlighted and there is no scroll on top
  editedChildren = appSentRecieved.childNodes.length;
  console.log(editedChildren);
  if (editedChildren == children) {
  } else {
    userContainer.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
});

/////////////// RESPONSIVE DESIGN ////////////////////////

if (window.matchMedia("(max-width: 600px)").matches) {
  btnBack.classList.remove("hide");
}

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    userContainer.classList.remove("hide");
    appMessages.classList.remove("show");
    btnBack.classList.add("hide");
  }
});
window.addEventListener("resize", function () {
  if (window.innerWidth < 600) {
    btnBack.classList.remove("hide");
  }
});
