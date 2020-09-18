const { v4: uuid } = require("uuid");

const bookmarks = [
  {
    id: uuid(),
    name: "Task One",
    url: "Task One",
    description: "This is card one"
  },
  {
    id: uuid(),
    name: "List One",
    url: "List One",
    description: "This is card two"
  }
];

module.exports = bookmarks;
