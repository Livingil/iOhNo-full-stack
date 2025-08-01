const mongoose = require("mongoose");

module.exports = function (note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    creationAt: note.createdAt,
    authorId: note.author_id,
  };
};
