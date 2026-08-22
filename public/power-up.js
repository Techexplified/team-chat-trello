/* global TrelloPowerUp */

// ---------------------------------------------------------------------
// 1. Get this from https://trello.com/power-ups/admin
//    -> select "Team Chat" -> "API Key" tab -> "Generate a new API Key"
//    Also add https://team-chat-trello.vercel.app to that key's
//    "Allowed Origins" list.
// ---------------------------------------------------------------------
var APP_KEY = "ae89c42ec46dffc9aa9823aa7d578b3a";
var APP_NAME = "Team Chat";

// Icon shown in the board navbar. Trello recommends a small (16-24px),
// mostly-monochrome PNG/SVG. Points at the icon you already have in
// public/images/icon.png.
var ICON = "./images/icon.png";

function showAuthorizePopup(t) {
  return t.popup({
    title: "Team Chat",
    url: "./authorize.html",
    height: 184,
  });
}

function showChat(t) {
  // Placeholder until the real chat UI exists. Swap this popup's url
  // for your actual chat interface page when it's ready.
  return t.popup({
    title: "Team Chat",
    url: "./chat.html",
    height: 400,
  });
}

TrelloPowerUp.initialize(
  {
    "board-buttons": function (t) {
      return t
        .getRestApi()
        .isAuthorized()
        .then(function (isAuthorized) {
          return [
            {
              icon: ICON,
              text: "Team Chat",
              callback: isAuthorized ? showChat : showAuthorizePopup,
            },
          ];
        });
    },
    "card-back-section": function (t) {
      return {
        title: "Team Chat",
        icon: ICON,
        content: {
          type: "iframe",
          url: "./card-chats.html",
          height: 240,
        },
      };
    },
  },
  {
    appKey: APP_KEY,
    appName: APP_NAME,
  },
);
