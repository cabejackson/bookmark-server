const logger = require("./logger");
const bookmarks = require("./dataStore");
const express = require("express");
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const { v4: uuid } = require("uuid");

bookmarkRouter
  .route("/bookmark")
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { name, description, url } = req.body;
    if (!name || !description) {
      logger.error("name and description are required");
      return res.status(400).send("The name and description are required");
    }

    const id = uuid(); // generate a unique id
    const newBookmark = {
      id,
      name,
      url,
      description
    };

    bookmarks.push(newBookmark);
    res
      .status(201)
      .location(`http://localhost:8000/bookmark/${id}`)
      .json(newBookmark);
  });
bookmarkRouter
  .route("/bookmark/:id")
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find((b) => b.id === id);
    if (!bookmark) {
      logger.error(`bookmark with id:${id} not found`);
      return res.status(404).send("Bookmark not found. Enter valid Id");
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex((b) => b.id === id);
    if (bookmarkIndex === -1) {
      //took out "!"
      logger.error(`Bookmark with id:${id} not found`);
      return res.status(404).send("Bookmark not found.");
    }

    bookmarks.splice(bookmarkIndex, 1);
    logger.info(`bookmark id:${id} was deleted`);
    res.status(204).end();
  });

module.exports = bookmarkRouter;
