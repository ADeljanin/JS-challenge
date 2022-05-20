"use strict";

///////////////////// GLOBAL VARIABLES //////////////////////

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

const messagesDate = document.querySelector(".day-date-message");
const appSend = document.querySelectorAll(".app-window__send");
const sendMessageInput = document.getElementById("typing");
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

let userJsonData;
let activeUser;
let filteredUserJsonData;
let activeUserId;
let children;
let editedChildren;

let fileName = "chat.json";

///////////////////////////// GET ALL THE DATA //////////////////////
getData(fileName);

function getData(fileName) {
  fetch(fileName)
    .then((response) => response.json())
    .then((data) => {
      userJsonData = data;
      filteredUserJsonData = [...data];
      addUsersToTheChatList(filteredUserJsonData);
    })
    .catch(function (err) {
      alert(err);
    });
}

/////////////// ADD ALL USERS TO THE CHAT LIST ///////////////
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

  const groupedMessagesByDate = groupMessagesByDate(userMessages);
  renderMessagesInContainer(groupedMessagesByDate, userId);

  // adding some style on user click
  if (window.matchMedia("(max-width: 600px)").matches) {
    userContainer.classList.add("hide");
    appMessages.classList.add("show");
  }
  appSentRecieved.scrollTop = appSentRecieved.scrollHeight;

  children = appSentRecieved.childNodes.length;
  btnSend.disabled = true;
}

function renderMessagesInContainer(groupedMessagesByDate, userId) {
  let messagesContent = "";

  for (let groupedDate in groupedMessagesByDate) {
    messagesContent += `<p class="day-sent-recieved">${groupedDate}</p>`;

    const groupedMessages = groupedMessagesByDate[groupedDate];

    groupedMessages.forEach((message) => {
      const time = dayjs(message.time).format("hh:mm");
      if (message.type === "received") {
        const username = userJsonData[userId - 1].username;
        messagesContent += getReceivedMessageTemplate(message, time, username);
      } else {
        messagesContent += getSentMessageTemplate(message, time);
      }
    });
  }

  appSentRecieved.innerHTML = messagesContent;
}

function groupMessagesByDate(userMessages) {
  const groupedMessagesByDate = {};

  userMessages.forEach((message) => {
    const newDate = new Date(message.time);
    let currentDay = weekday[newDate.getDay()];
    const justDate = `${currentDay}, ${newDate.getDate()}.${
      newDate.getMonth() + 1
    }.${newDate.getFullYear()}`;

    if (groupedMessagesByDate[justDate]) {
      groupedMessagesByDate[justDate].push(message);
    } else {
      groupedMessagesByDate[justDate] = [message];
    }
  });

  return groupedMessagesByDate;
}

function getReceivedMessageTemplate(message, time, username) {
  return `
    <div class="app-window__one-message-${message.type}">
      <img
      class="app-window__avatar-small"
      src="./img/img_avatar_${username}.png"
      alt="user picture"
      />
      <div>
        <p class="${message.type}">${message.text}</p>
        <p class="time-delivery">${time}</p>
      </div>
    </div>`;
}

function getSentMessageTemplate(message, time) {
  return `
    <div class="app-window__one-message-${message.type}">
      <img
      class="app-window__avatar-small"
      src="./img/img_avatar.png"
      alt="user picture"
      />
      <div>
        <p class="${message.type}">${message.text}</p>
        <p class="time-delivery">${time}</p>
      </div>
    </div>`;
}

///////////////////////// SEARCH BAR ////////////////////////////

searchInput.addEventListener("keyup", function (e) {
  const searchString = e.target.value.toLowerCase();
  const filteredUserJsonData = userJsonData.filter((item) => {
    return item.name.toLowerCase().includes(searchString);
  });
  addUsersToTheChatList(filteredUserJsonData);
});

//////////////////////////// INPUT MESSAGE /////////////////////
sendMessageInput.addEventListener("keyup", function () {
  btnSend.disabled = false;
  if (sendMessageInput.value != "") {
    btnSend.style.backgroundColor = "rgb(252, 170, 170)";
    btnSend.style.transition = "all 1s";
  }
});

////////////////////// SEND BUTTON ////////////////////////////
btnSend.addEventListener("click", function () {
  let message = sendMessageInput.value;
  if (message.length) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentDay = weekday[currentDate.getDay()];
    let currentDayInMonth = currentDate.getDate();
    let currentMonth = month[currentDate.getMonth()];
    let currentHours = currentDate.getHours();
    currentHours = ("0" + currentHours).slice(-2);
    let currentMins = currentDate.getMinutes();
    currentMins = ("0" + currentMins).slice(-2);

    const newMessage = {
      type: "sent",
      time: currentDate.toISOString(),
      text: message,
    };
    activeUser = userJsonData.find(
      (item) => item.id.toString() === activeUserId
    );
    activeUser.messages.push(newMessage);
    let activeUserLastMessage = activeUser.messages.slice(-1);

    let newHtml = "";

    if (
      dayjs(newMessage.time).format("DD.MM.YYYY") !==
      dayjs(activeUserLastMessage[0].time).format("DD.MM.YYYY")
    ) {
      newHtml += `<p class="day-sent-recieved">${currentDay}, ${currentDayInMonth}.${currentMonth}.${currentYear}</p>`;
    }
    const time = `${currentHours}:${currentMins}`;
    newHtml += `${getSentMessageTemplate(newMessage, time)}`;

    appSentRecieved.insertAdjacentHTML("beforeend", newHtml);

    const groupedMessagesByDate = groupMessagesByDate(activeUser.messages);

    renderMessagesInContainer(groupedMessagesByDate, activeUserId);

    // clear message
    sendMessageInput.value = "";

    //add message to the left of the screen, just bellow the user name
    document.querySelector(".app-window__info.active p").textContent = message;
  }

  // scroll to the last message in chat history
  appSentRecieved.scrollTop = appSentRecieved.scrollHeight;

  // active user goes on top of chat history
  let content = document.querySelector(".app-window__info.active");
  let parent = content.parentNode;
  parent.insertBefore(content, parent.firstChild);
  addActiveUserChangeAnimation(content);
  btnSend.disabled = true;
  btnSend.style.backgroundColor = "rgb(133, 133, 133)";
  focusOnActiveUser();
});

function addActiveUserChangeAnimation(content) {
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
}

////////////////////// BACK BUTTON ////////////////////
btnBack.addEventListener("click", function () {
  userContainer.classList.remove("hide");
  appMessages.classList.remove("show");

  focusOnActiveUser();
});

function focusOnActiveUser() {
  editedChildren = appSentRecieved.childNodes.length;
  if (editedChildren == children) {
  } else {
    appUsers.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
}

//////////////////////////////////////////////////////////
/// RESPONSIVE DESIGN - CHANGES MADE BY addEventListener//

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    userContainer.classList.remove("hide");
    btnBack.classList.add("hide");
  }
  if (window.innerWidth < 600) {
    btnBack.classList.remove("hide");
  }
});
