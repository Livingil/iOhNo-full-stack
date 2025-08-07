const mongoose = require("mongoose");

module.exports = function (reminder) {
  return {
    id: reminder.id,
    title: reminder.title,
    content: reminder.content,
    creationAt: reminder.createdAt,
    authorId: reminder.author_id,
  };
};
